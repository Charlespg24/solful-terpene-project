"""
Enrich TerpQuery database with pharmacological data from Solful monographs.

Adds:
- New pharmacology tables (receptors, clinical_evidence, botanical_sources)
- Missing terpenes (linalool, bisabolol, eucalyptol, eugenol, menthol, citronellol)
- Deep monograph data for existing terpenes (IUPAC, CAS, descriptions, receptor activity)
"""

import sqlite3
import shutil
from pathlib import Path

DB_SRC = Path("terpquery/terpquery.db")
DB_OUT = Path("terpquery_enriched.db")

# Copy the original DB so we don't modify the submodule
shutil.copy2(DB_SRC, DB_OUT)

conn = sqlite3.connect(DB_OUT)
conn.execute("PRAGMA journal_mode=WAL")
conn.execute("PRAGMA foreign_keys=ON")

# ── New schema: pharmacology tables ──────────────────────────────────

conn.executescript("""
CREATE TABLE IF NOT EXISTS receptors (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    full_name   TEXT,
    category    TEXT  -- e.g. 'cannabinoid', 'TRP', 'nuclear', 'enzyme', 'ion_channel'
);

CREATE TABLE IF NOT EXISTS terpene_receptors (
    terpene_id    INTEGER REFERENCES terpenes(id),
    receptor_id   INTEGER REFERENCES receptors(id),
    action        TEXT,          -- 'agonist', 'antagonist', 'modulator', 'inhibitor'
    affinity      TEXT,          -- e.g. 'Ki = 155 nM', 'IC50 = 3.2 uM'
    selectivity   TEXT,          -- notes on selectivity
    evidence_tier TEXT DEFAULT 'preclinical',  -- 'in_vitro', 'preclinical', 'clinical'
    PRIMARY KEY (terpene_id, receptor_id)
);

CREATE TABLE IF NOT EXISTS clinical_evidence (
    id          INTEGER PRIMARY KEY,
    terpene_id  INTEGER REFERENCES terpenes(id),
    condition   TEXT NOT NULL,
    model       TEXT,           -- 'human_RCT', 'mouse', 'rat', 'in_vitro'
    dose        TEXT,
    outcome     TEXT,
    citation    TEXT,
    evidence_tier TEXT DEFAULT 'preclinical'
);

CREATE TABLE IF NOT EXISTS botanical_sources (
    id            INTEGER PRIMARY KEY,
    terpene_id    INTEGER REFERENCES terpenes(id),
    plant_name    TEXT NOT NULL,
    common_name   TEXT,
    family        TEXT,
    concentration TEXT,          -- e.g. '12-20%', '40-55%'
    notes         TEXT,
    UNIQUE(terpene_id, plant_name)
);

CREATE TABLE IF NOT EXISTS monograph_metadata (
    terpene_id      INTEGER PRIMARY KEY REFERENCES terpenes(id),
    chemical_class  TEXT,
    biosynthetic_pathway TEXT,   -- 'mevalonate', 'MEP', 'shikimic'
    pre_loading_rank INTEGER,   -- 1-14 priority ranking
    evidence_summary TEXT,
    sensory_profile  TEXT
);

CREATE INDEX IF NOT EXISTS idx_clin_terpene ON clinical_evidence(terpene_id);
CREATE INDEX IF NOT EXISTS idx_botsrc_terpene ON botanical_sources(terpene_id);
""")

# ── Receptors reference table ────────────────────────────────────────

receptors = [
    ("CB2", "Cannabinoid Receptor Type 2", "cannabinoid"),
    ("CB1", "Cannabinoid Receptor Type 1", "cannabinoid"),
    ("TRPV1", "Transient Receptor Potential Vanilloid 1", "TRP"),
    ("TRPV3", "Transient Receptor Potential Vanilloid 3", "TRP"),
    ("TRPA1", "Transient Receptor Potential Ankyrin 1", "TRP"),
    ("TRPM8", "Transient Receptor Potential Melastatin 8", "TRP"),
    ("PPARgamma", "Peroxisome Proliferator-Activated Receptor Gamma", "nuclear"),
    ("NF-kB", "Nuclear Factor Kappa-B", "transcription_factor"),
    ("GABA-A", "Gamma-Aminobutyric Acid Receptor Type A", "ion_channel"),
    ("AChE", "Acetylcholinesterase", "enzyme"),
    ("COX-2", "Cyclooxygenase-2", "enzyme"),
    ("A2A", "Adenosine A2A Receptor", "GPCR"),
    ("5-HT", "Serotonin Receptors", "GPCR"),
    ("mu-opioid", "Mu-Opioid Receptor (via beta-endorphin)", "GPCR"),
    ("BDNF-TrkB", "Brain-Derived Neurotrophic Factor / TrkB", "growth_factor"),
]

conn.executemany(
    "INSERT OR IGNORE INTO receptors (name, full_name, category) VALUES (?,?,?)",
    receptors,
)

# ── Helper: get or create terpene ────────────────────────────────────

def get_or_create_terpene(name, **kwargs):
    row = conn.execute("SELECT id FROM terpenes WHERE name = ? COLLATE NOCASE", (name,)).fetchone()
    if row:
        tid = row[0]
        # Update with monograph data
        updates = []
        params = []
        for col, val in kwargs.items():
            if val is not None:
                updates.append(f"{col} = ?")
                params.append(val)
        if updates:
            params.append(tid)
            conn.execute(f"UPDATE terpenes SET {', '.join(updates)} WHERE id = ?", params)
        return tid
    else:
        cols = ["name"] + [k for k, v in kwargs.items() if v is not None]
        vals = [name] + [v for v in kwargs.values() if v is not None]
        placeholders = ",".join(["?"] * len(cols))
        cur = conn.execute(
            f"INSERT INTO terpenes ({','.join(cols)}) VALUES ({placeholders})", vals
        )
        return cur.lastrowid

def get_receptor_id(name):
    row = conn.execute("SELECT id FROM receptors WHERE name = ?", (name,)).fetchone()
    return row[0] if row else None

def add_receptor_binding(terpene_id, receptor_name, action, affinity=None, selectivity=None, evidence="preclinical"):
    rid = get_receptor_id(receptor_name)
    if rid:
        conn.execute(
            "INSERT OR REPLACE INTO terpene_receptors VALUES (?,?,?,?,?,?)",
            (terpene_id, rid, action, affinity, selectivity, evidence),
        )

def add_clinical(terpene_id, condition, model, dose, outcome, citation, tier="preclinical"):
    conn.execute(
        "INSERT INTO clinical_evidence (terpene_id, condition, model, dose, outcome, citation, evidence_tier) VALUES (?,?,?,?,?,?,?)",
        (terpene_id, condition, model, dose, outcome, citation, tier),
    )

def add_botanical(terpene_id, plant, common, family, conc, notes=None):
    conn.execute(
        "INSERT OR IGNORE INTO botanical_sources (terpene_id, plant_name, common_name, family, concentration, notes) VALUES (?,?,?,?,?,?)",
        (terpene_id, plant, common, family, conc, notes),
    )

def add_monograph_meta(terpene_id, chem_class, pathway, rank, evidence_summary, sensory):
    conn.execute(
        "INSERT OR REPLACE INTO monograph_metadata VALUES (?,?,?,?,?,?)",
        (terpene_id, chem_class, pathway, rank, evidence_summary, sensory),
    )

# ══════════════════════════════════════════════════════════════════════
# TERPENE ENRICHMENT DATA (from Solful monographs)
# ══════════════════════════════════════════════════════════════════════

# ── 1. Beta-Caryophyllene ────────────────────────────────────────────
tid = get_or_create_terpene(
    "Caryophyllene",
    iupac_name="Bicyclo[7.2.0]undec-4-ene, 4,11,11-trimethyl-8-methylene-, [1R-(1R*,4E,9S*)]-",
    cas_number="87-44-5",
    molecular_formula="C15H24",
    molecular_weight=204.35,
    boiling_point_c=250.0,
    aroma="Spicy, peppery, woody, warm",
    description="Bicyclic sesquiterpene; first dietary cannabinoid. Full CB2 agonist with no CB1 binding. FDA GRAS status.",
)
add_receptor_binding(tid, "CB2", "full_agonist", "Ki = 155 ± 4 nM", "No CB1 binding", "clinical")
add_receptor_binding(tid, "PPARgamma", "agonist", None, "GW9662 reverses effects 60-80%", "preclinical")
add_receptor_binding(tid, "NF-kB", "inhibitor", None, "Reduces p65 phosphorylation", "preclinical")
add_receptor_binding(tid, "mu-opioid", "indirect_agonist", None, "CB2→beta-endorphin→mu-opioid pathway", "preclinical")
add_clinical(tid, "Food addiction", "human_RCT", "8 weeks", "Reduced food addiction symptoms; no metabolic effects", "Effects of BCP on food addiction in women with obesity, 2022", "clinical")
add_clinical(tid, "Anxiety", "mouse_EPM", "25-50 mg/kg", "Anxiolytic, similar to diazepam", "Machado et al., 2020", "preclinical")
add_clinical(tid, "Inflammatory arthritis", "mouse_CAIA", "10 mg/kg/day oral", "Reduced paw swelling, TNF-a, IL-1b, IL-6; increased IL-13", "Alves AR et al., J Immunol, 2019", "preclinical")
add_clinical(tid, "IBD/Colitis", "mouse_DSS", "50 mg/kg 2x/day", "Dose-dependent protection; PPARgamma reversal 60-70%", "Sandor K et al., Am J Pathol, 2011", "preclinical")
add_clinical(tid, "Pain (opioid-sparing)", "mouse", "Various", "CB2→beta-endorphin release; blocked by naloxone", "Pubmed 23138934", "preclinical")
add_botanical(tid, "Copaifera officinalis", "Copaiba balsam", "Fabaceae", "40-55%", "Highest natural BCP source")
add_botanical(tid, "Syzygium aromaticum", "Clove", "Myrtaceae", "12-20%", "Reference standard source")
add_botanical(tid, "Piper nigrum", "Black pepper", "Piperaceae", "7-35%", "Variable by cultivar")
add_botanical(tid, "Humulus lupulus", "Hops", "Cannabaceae", "6-15%", "Phylogenetic sibling of Cannabis")
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "1-3%", "CsTPS9FN produces BCP:humulene 2.5:1")
add_monograph_meta(tid, "Bicyclic sesquiterpene", "mevalonate", 1, "Strong preclinical; 1 human RCT; FDA GRAS", "Spicy, peppery, woody, warm")

# ── 2. Myrcene ───────────────────────────────────────────────────────
tid = get_or_create_terpene(
    "Myrcene",
    iupac_name="7-Methyl-3-methylene-1,6-octadiene",
    cas_number="123-35-3",
    molecular_formula="C10H16",
    molecular_weight=136.23,
    boiling_point_c=167.0,
    aroma="Earthy, musky, herbal, clove-like",
    description="Acyclic monoterpene; most abundant terpene in cannabis. GABA-A potentiation and entourage effect baseline.",
)
add_receptor_binding(tid, "GABA-A", "positive_allosteric_modulator", None, "Potentiates GABAergic sedation", "preclinical")
add_receptor_binding(tid, "TRPV1", "modulator", None, "Indirect modulation", "preclinical")
add_receptor_binding(tid, "mu-opioid", "modulator", None, "Opioid receptor interaction", "preclinical")
add_clinical(tid, "Sedation/Sleep", "mouse", "200 mg/kg", "Increased barbiturate sleep time", "do Vale et al., 2002", "preclinical")
add_clinical(tid, "Pain", "mouse", "10-20 mg/kg", "Antinociceptive in writhing and hot plate tests", "Rao et al., 1990", "preclinical")
add_botanical(tid, "Humulus lupulus", "Hops", "Cannabaceae", "30-50%", "Dominant terpene in hops")
add_botanical(tid, "Mangifera indica", "Mango", "Anacardiaceae", "Variable", "Popular entourage effect pairing")
add_botanical(tid, "Cymbopogon citratus", "Lemongrass", "Poaceae", "12-25%", None)
add_monograph_meta(tid, "Acyclic monoterpene", "MEP", 2, "Strong preclinical for sedation/analgesia; no human RCTs", "Earthy, musky, herbal, clove-like")

# ── 3. d-Limonene ───────────────────────────────────────────────────
tid = get_or_create_terpene(
    "Limonene",
    iupac_name="1-methyl-4-(1-methylethenyl)-cyclohexene",
    cas_number="5989-27-5",
    molecular_formula="C10H16",
    molecular_weight=136.23,
    boiling_point_c=176.0,
    aroma="Citrus, bright, fresh, orange peel",
    description="Monocyclic monoterpene; second most abundant terpene in nature. Enantioselective bioactivity (D vs L). Anxiolytic via A2A/serotonin.",
)
add_receptor_binding(tid, "A2A", "modulator", None, "Adenosine receptor interaction", "preclinical")
add_receptor_binding(tid, "5-HT", "modulator", None, "Serotonergic anxiolytic pathway", "preclinical")
add_receptor_binding(tid, "COX-2", "inhibitor", None, "Anti-inflammatory", "preclinical")
add_clinical(tid, "Anxiety", "mouse", "Various", "Anxiolytic in elevated plus-maze", "Multiple studies", "preclinical")
add_clinical(tid, "Gastric reflux", "human", "1000 mg/day", "Improved GERD symptoms", "Sun J, 2007", "clinical")
add_botanical(tid, "Citrus sinensis", "Orange", "Rutaceae", "90-95%", "Dominant in citrus oils")
add_botanical(tid, "Citrus limon", "Lemon", "Rutaceae", "65-75%", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.5-2%", None)
add_monograph_meta(tid, "Monocyclic monoterpene", "MEP", 3, "Moderate clinical evidence; GERD human study; strong preclinical", "Citrus, bright, fresh, orange peel")

# ── 4. Alpha-Humulene ────────────────────────────────────────────────
tid = get_or_create_terpene(
    "Humulene",
    iupac_name="(1E,4E,8E)-2,6,6,9-Tetramethyl-1,4,8-cycloundecatriene",
    cas_number="6753-98-6",
    molecular_formula="C15H24",
    molecular_weight=204.35,
    boiling_point_c=166.0,
    aroma="Earthy, woody, hoppy, herbal",
    description="Monocyclic sesquiterpene; ring-opened isomer of beta-caryophyllene. Appetite suppressant. CB1 priming activity.",
)
add_receptor_binding(tid, "CB1", "weak_modulator", None, "Priming activity, not full agonism", "preclinical")
add_receptor_binding(tid, "NF-kB", "inhibitor", None, "Anti-inflammatory pathway", "preclinical")
add_clinical(tid, "Appetite suppression", "mouse", "Various", "Reduced food intake vs control", "Preclinical models", "preclinical")
add_clinical(tid, "Cancer (synergy)", "in_vitro", "Combined w/ paclitaxel", "Synergistic anticancer with caryophyllene", "In vitro studies", "in_vitro")
add_botanical(tid, "Humulus lupulus", "Hops", "Cannabaceae", "15-40%", "Named after Humulus")
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.5-1.5%", "CsTPS9FN co-product with BCP")
add_botanical(tid, "Salvia officinalis", "Sage", "Lamiaceae", "5-10%", None)
add_monograph_meta(tid, "Monocyclic sesquiterpene", "mevalonate", 4, "Moderate preclinical; appetite/anti-inflammatory focus", "Earthy, woody, hoppy, herbal")

# ── 5. Linalool (NEW) ───────────────────────────────────────────────
tid = get_or_create_terpene(
    "Linalool",
    iupac_name="3,7-dimethylocta-1,6-dien-3-ol",
    cas_number="78-70-6",
    molecular_formula="C10H18O",
    molecular_weight=154.25,
    boiling_point_c=198.0,
    aroma="Floral, lavender, sweet, calming",
    description="Oxygenated acyclic monoterpene alcohol. GABA-A positive allosteric modulator. Anxiolytic/sedative. Key lavender component.",
)
add_receptor_binding(tid, "GABA-A", "positive_allosteric_modulator", None, "Anxiolytic mechanism", "preclinical")
add_clinical(tid, "Anxiety", "mouse_EPM", "25-100 mg/kg", "Anxiolytic comparable to diazepam", "Guimaraes et al., 2013", "preclinical")
add_clinical(tid, "Sleep", "human_inhalation", "Lavender oil inhalation", "Improved sleep quality metrics", "Multiple aromatherapy RCTs", "clinical")
add_clinical(tid, "Seizure", "mouse", "100-300 mg/kg", "Anticonvulsant activity", "Elisabetsky et al., 1999", "preclinical")
add_botanical(tid, "Lavandula angustifolia", "Lavender", "Lamiaceae", "25-45%", "Primary commercial source")
add_botanical(tid, "Coriandrum sativum", "Coriander", "Apiaceae", "60-70%", "Coriander seed oil dominant")
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.5-1.5%", None)
add_monograph_meta(tid, "Acyclic monoterpene alcohol", "MEP", 5, "Strong preclinical; human aromatherapy RCTs for sleep", "Floral, lavender, sweet, calming")
# Add effects for linalool
for eff_name in ["anti-inflammatory", "sedative", "anxiolytic"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.7)", (tid, eid[0]))

# ── 6. Alpha-Pinene ─────────────────────────────────────────────────
tid = get_or_create_terpene(
    "alpha-Pinene",
    iupac_name="2,6,6-trimethylbicyclo[3.1.1]hept-2-ene",
    cas_number="2437-95-8",
    molecular_formula="C10H16",
    molecular_weight=136.23,
    boiling_point_c=155.0,
    aroma="Piney, turpentine, fresh, resinous",
    description="Bicyclic monoterpene; most abundant terpene in the biosphere. AChE inhibitor (memory). Bronchodilator. Forest bathing active compound.",
)
add_receptor_binding(tid, "AChE", "inhibitor", None, "Counters THC short-term memory deficit", "preclinical")
add_receptor_binding(tid, "BDNF-TrkB", "upregulator", None, "Neuroprotective via BDNF", "preclinical")
add_clinical(tid, "Memory/Cognition", "mouse", "Various", "AChE inhibition; counters scopolamine-induced amnesia", "Perry et al., 2000", "preclinical")
add_clinical(tid, "Bronchodilation", "human", "Inhalation", "Bronchodilatory effects in forest bathing studies", "Li Q, 2010", "clinical")
add_clinical(tid, "Immune (NK cells)", "human_field", "Forest bathing 3-day", "NK cell activity increased; effect lasted 30 days", "Li Q et al., forest bathing studies", "clinical")
add_botanical(tid, "Pinus spp.", "Pine trees", "Pinaceae", "40-60%", "Most abundant natural source")
add_botanical(tid, "Rosmarinus officinalis", "Rosemary", "Lamiaceae", "15-25%", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.5-1.5%", None)
add_monograph_meta(tid, "Bicyclic monoterpene", "MEP", 6, "Clinical forest bathing data; AChE inhibition preclinical", "Piney, turpentine, fresh, resinous")

# ── 7. Terpinolene ──────────────────────────────────────────────────
tid = get_or_create_terpene(
    "Terpinolene",
    iupac_name="1-methyl-4-(propan-2-ylidene)cyclohex-1-ene",
    cas_number="586-62-9",
    molecular_formula="C10H16",
    molecular_weight=136.23,
    boiling_point_c=185.0,
    aroma="Piney, herbal, citrus, floral",
    description="Monocyclic monoterpene. Sedative at moderate doses. Strong antioxidant. Least common of the major cannabis terpenes.",
)
add_clinical(tid, "Sedation", "mouse", "Various", "CNS depressant; potentiates barbiturate sleep", "Preclinical models", "preclinical")
add_clinical(tid, "Antioxidant", "in_vitro", "Various", "Strong radical scavenging activity", "In vitro studies", "in_vitro")
add_botanical(tid, "Melaleuca alternifolia", "Tea tree", "Myrtaceae", "3-5%", None)
add_botanical(tid, "Myristica fragrans", "Nutmeg", "Myristicaceae", "Variable", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.5-1%", "Sativa-dominant strains (Jack Herer)")
add_monograph_meta(tid, "Monocyclic monoterpene", "MEP", 7, "Limited preclinical; sedative/antioxidant focus", "Piney, herbal, citrus, floral")

# ── 8. Beta-Ocimene ─────────────────────────────────────────────────
tid = get_or_create_terpene(
    "Ocimene",
    iupac_name="trans-3,7-dimethyl-1,3,6-octatriene",
    cas_number="13877-91-3",
    molecular_formula="C10H16",
    molecular_weight=136.23,
    boiling_point_c=177.0,
    aroma="Herbal, fruity, fresh, sweet",
    description="Acyclic monoterpene with triene structure. Herbivore-induced plant volatile (HIPV). Extreme volatility. Mucous membrane tonicity.",
)
add_clinical(tid, "Anti-inflammatory", "in_vitro", "Various", "Moderate anti-inflammatory activity", "In vitro studies", "in_vitro")
add_clinical(tid, "Antifungal", "in_vitro", "Various", "Antifungal against Candida spp.", "Essential oil studies", "in_vitro")
add_botanical(tid, "Ocimum basilicum", "Basil", "Lamiaceae", "5-15%", "Named after Ocimum")
add_botanical(tid, "Mentha spp.", "Mint", "Lamiaceae", "Variable", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.3-0.8%", None)
add_monograph_meta(tid, "Acyclic monoterpene (triene)", "MEP", 8, "Limited; mostly in vitro anti-inflammatory/antifungal", "Herbal, fruity, fresh, sweet")

# ── 9. Alpha-Bisabolol (NEW) ────────────────────────────────────────
tid = get_or_create_terpene(
    "alpha-Bisabolol",
    iupac_name="3-Cyclohexene-1-methanol, alpha,4-dimethyl-alpha-(4-methyl-3-pentenyl)",
    cas_number="23089-26-1",
    molecular_formula="C15H26O",
    molecular_weight=222.37,
    boiling_point_c=314.0,
    aroma="Sweet, floral, honey, chamomile",
    description="Monocyclic sesquiterpene alcohol. GABA-A modulation. Neuroprotective. Key chamomile active compound. Skin penetration enhancer.",
)
add_receptor_binding(tid, "GABA-A", "modulator", None, "Neuroprotective/sedative pathway", "preclinical")
add_clinical(tid, "Neuroprotection", "mouse", "Various", "Protection against ischemic brain injury", "Preclinical models", "preclinical")
add_clinical(tid, "Skin healing", "human", "Topical 0.1-1%", "Enhanced wound healing and anti-irritant", "Cosmetic/dermatology studies", "clinical")
add_clinical(tid, "Pain", "mouse", "Various", "Antinociceptive in inflammatory pain models", "Preclinical models", "preclinical")
add_botanical(tid, "Matricaria chamomilla", "German chamomile", "Asteraceae", "10-25%", "Primary commercial source")
add_botanical(tid, "Salvia runcinata", "South African sage", "Lamiaceae", "Variable", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "0.1-0.5%", None)
add_monograph_meta(tid, "Monocyclic sesquiterpene alcohol", "mevalonate", 9, "Moderate preclinical; clinical skin healing; GABA modulation", "Sweet, floral, honey, chamomile")
for eff_name in ["anti-inflammatory", "analgesic"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.6)", (tid, eid[0]))

# ── 10. Farnesene ────────────────────────────────────────────────────
# Already exists as alpha-Farnesene and beta-Farnesene
for fname in ["alpha-Farnesene", "beta-Farnesene"]:
    tid = get_or_create_terpene(
        fname,
        molecular_formula="C15H24",
        molecular_weight=204.35,
        boiling_point_c=279.6,
        description=f"Acyclic sesquiterpene. Mast cell modulation. Antioxidant. {'Apple skin coating compound.' if 'alpha' in fname else 'Aphid alarm pheromone.'}",
    )
    add_clinical(tid, "Immune modulation", "in_vitro", "Various", "Mast cell stabilization", "In vitro studies", "in_vitro")
    add_clinical(tid, "Antioxidant", "in_vitro", "Various", "Oxidative stress mitigation", "In vitro studies", "in_vitro")
    add_monograph_meta(tid, "Acyclic sesquiterpene", "mevalonate", 10, "Limited; mast cell/antioxidant in vitro", "Fruity, green, fresh")

# ── 11. 1,8-Cineole / Eucalyptol (NEW) ──────────────────────────────
tid = get_or_create_terpene(
    "Eucalyptol",
    iupac_name="1,3,3-Trimethyl-2-oxabicyclo[2.2.2]octane",
    cas_number="470-82-6",
    molecular_formula="C10H18O",
    molecular_weight=154.25,
    boiling_point_c=176.0,
    aroma="Camphoraceous, minty, eucalyptus, cooling",
    description="Bicyclic monoterpene oxide (ether). AChE inhibitor for cognitive enhancement. TRPV3 modulator. Key eucalyptus active compound.",
)
add_receptor_binding(tid, "AChE", "inhibitor", None, "Cognitive enhancement pathway", "clinical")
add_receptor_binding(tid, "TRPV3", "modulator", None, "Warming/cooling sensation", "preclinical")
add_clinical(tid, "Cognition", "human", "Various", "Improved cognitive performance in aromatherapy studies", "Moss et al., 2003", "clinical")
add_clinical(tid, "Respiratory", "human_RCT", "200mg 3x/day", "Reduced exacerbations in COPD/asthma", "Worth et al., 2009", "clinical")
add_clinical(tid, "Sinusitis", "human_RCT", "200mg 3x/day", "Improved symptoms vs placebo", "Kehrl et al., 2004", "clinical")
add_botanical(tid, "Eucalyptus globulus", "Eucalyptus", "Myrtaceae", "60-90%", "Primary commercial source")
add_botanical(tid, "Rosmarinus officinalis", "Rosemary", "Lamiaceae", "15-35%", None)
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "Trace-0.5%", None)
add_monograph_meta(tid, "Bicyclic monoterpene oxide", "MEP", 11, "Strong clinical: COPD RCTs, cognition studies, sinusitis RCT", "Camphoraceous, minty, cooling")
for eff_name in ["anti-inflammatory", "memory-enhancing"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.7)", (tid, eid[0]))

# ── 12. Eugenol (NEW) ───────────────────────────────────────────────
tid = get_or_create_terpene(
    "Eugenol",
    iupac_name="2-Methoxy-4-(2-propenyl)phenol",
    cas_number="97-53-0",
    molecular_formula="C10H12O2",
    molecular_weight=164.20,
    boiling_point_c=255.0,
    aroma="Spicy, clove, warm, dental",
    description="Phenylpropanoid (NOT a true terpene — shikimic acid pathway). TRPV1/TRPA1 dual agonist. COX-2 inhibitor. Dental analgesic gold standard.",
)
add_receptor_binding(tid, "TRPV1", "agonist", None, "Pain/heat receptor activation", "clinical")
add_receptor_binding(tid, "TRPA1", "agonist", None, "Irritant/pain receptor activation", "clinical")
add_receptor_binding(tid, "COX-2", "inhibitor", None, "Anti-inflammatory via COX-2 pathway", "preclinical")
add_clinical(tid, "Dental pain", "human", "Topical", "Gold standard dental analgesic; FDA approved", "Clinical dental practice", "clinical")
add_clinical(tid, "Anti-inflammatory", "mouse", "Various", "COX-2 inhibition; reduced edema", "Multiple preclinical", "preclinical")
add_botanical(tid, "Syzygium aromaticum", "Clove", "Myrtaceae", "70-90%", "Primary source; dental oil")
add_botanical(tid, "Pimenta dioica", "Allspice", "Myrtaceae", "60-80%", None)
add_botanical(tid, "Ocimum basilicum", "Basil", "Lamiaceae", "5-15%", "Some chemotypes")
add_monograph_meta(tid, "Phenylpropanoid", "shikimic", 12, "Strong clinical: dental FDA-approved; unique non-terpene pathway", "Spicy, clove, warm, dental")
for eff_name in ["anti-inflammatory", "analgesic", "spicy"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.8)", (tid, eid[0]))

# ── 13. Menthol (NEW) ───────────────────────────────────────────────
tid = get_or_create_terpene(
    "Menthol",
    iupac_name="(1R,2S,5R)-2-isopropyl-5-methylcyclohexanol",
    cas_number="2216-51-5",
    molecular_formula="C10H20O",
    molecular_weight=156.27,
    boiling_point_c=212.0,
    aroma="Cool, minty, fresh, penetrating",
    description="Monocyclic monoterpene alcohol. TRPM8 agonist (cold receptor). TRPV1 cross-desensitizer. Most extensively studied monoterpene.",
)
add_receptor_binding(tid, "TRPM8", "agonist", "EC50 ~4 uM", "Primary cold sensation mechanism", "clinical")
add_receptor_binding(tid, "TRPV1", "cross-desensitizer", None, "Analgesic via TRPV1 desensitization", "preclinical")
add_clinical(tid, "Pain (topical)", "human_RCT", "Topical 3-10%", "Analgesic in musculoskeletal pain", "Multiple RCTs", "clinical")
add_clinical(tid, "IBS", "human_RCT", "Peppermint oil capsules", "Reduced IBS symptoms vs placebo", "Alammar et al. meta-analysis, 2019", "clinical")
add_clinical(tid, "Respiratory", "human", "Inhalation", "Subjective nasal decongestion (no actual airflow change)", "Eccles et al., 2003", "clinical")
add_botanical(tid, "Mentha piperita", "Peppermint", "Lamiaceae", "30-55%", "Primary commercial source")
add_botanical(tid, "Mentha arvensis", "Corn mint", "Lamiaceae", "70-90%", "Highest natural menthol")
add_botanical(tid, "Cannabis sativa", "Cannabis", "Cannabaceae", "Trace", "Rare in cannabis")
add_monograph_meta(tid, "Monocyclic monoterpene alcohol", "MEP", 13, "Extensive clinical: pain RCTs, IBS meta-analysis, respiratory studies", "Cool, minty, fresh, penetrating")
for eff_name in ["analgesic"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.9)", (tid, eid[0]))

# ── 14. Citronellol (NEW) ───────────────────────────────────────────
tid = get_or_create_terpene(
    "Citronellol",
    iupac_name="3,7-Dimethyloct-6-en-1-ol",
    cas_number="106-22-9",
    molecular_formula="C10H20O",
    molecular_weight=156.27,
    boiling_point_c=225.0,
    aroma="Floral, rose, sweet, citrusy",
    description="Acyclic monoterpene alcohol. Key rose/geranium aromatic compound. Antioxidant and anti-inflammatory. Mosquito repellent.",
)
add_clinical(tid, "Antioxidant", "in_vitro", "Various", "Radical scavenging activity", "In vitro studies", "in_vitro")
add_clinical(tid, "Anti-inflammatory", "mouse", "25-100 mg/kg", "Reduced paw edema", "Preclinical models", "preclinical")
add_clinical(tid, "Insect repellent", "human_field", "Topical", "Effective mosquito repellent", "Field studies", "clinical")
add_botanical(tid, "Rosa damascena", "Damask rose", "Rosaceae", "20-40%", "Primary perfumery source")
add_botanical(tid, "Pelargonium graveolens", "Geranium", "Geraniaceae", "25-45%", None)
add_botanical(tid, "Cymbopogon nardus", "Citronella grass", "Poaceae", "10-25%", "Insect repellent source")
add_monograph_meta(tid, "Acyclic monoterpene alcohol", "MEP", 14, "Limited; mostly in vitro + insect repellent field data", "Floral, rose, sweet, citrusy")
for eff_name in ["anti-inflammatory"]:
    eid = conn.execute("SELECT id FROM effects WHERE name = ?", (eff_name,)).fetchone()
    if eid:
        conn.execute("INSERT OR IGNORE INTO terpene_effects VALUES (?,?,0.5)", (tid, eid[0]))

# ── Add synonyms for new terpenes ────────────────────────────────────

synonym_map = {
    "Linalool": ["linalyl alcohol", "beta-linalool", "licareol"],
    "Eucalyptol": ["1,8-cineole", "cineole", "cajeputol"],
    "Eugenol": ["4-allyl-2-methoxyphenol", "clove oil phenol"],
    "Menthol": ["l-menthol", "levomenthol", "peppermint camphor"],
    "Citronellol": ["beta-citronellol", "dihydrogeraniol"],
    "alpha-Bisabolol": ["levomenol", "bisabolol"],
}

for terpene_name, syns in synonym_map.items():
    row = conn.execute("SELECT id FROM terpenes WHERE name = ? COLLATE NOCASE", (terpene_name,)).fetchone()
    if row:
        for syn in syns:
            conn.execute("INSERT OR IGNORE INTO synonyms (terpene_id, name) VALUES (?,?)", (row[0], syn))

# ── Add products for new terpenes ────────────────────────────────────

def get_or_create_product(name, category, **kwargs):
    row = conn.execute("SELECT id FROM products WHERE name = ? AND category = ?", (name, category)).fetchone()
    if row:
        return row[0]
    cols = ["name", "category"] + [k for k, v in kwargs.items() if v is not None]
    vals = [name, category] + [v for v in kwargs.values() if v is not None]
    cur = conn.execute(
        f"INSERT INTO products ({','.join(cols)}) VALUES ({','.join(['?']*len(cols))})", vals
    )
    return cur.lastrowid

def link_product_terpene(product_id, terpene_name, concentration=None, unit="%", dominant=False):
    row = conn.execute("SELECT id FROM terpenes WHERE name = ? COLLATE NOCASE", (terpene_name,)).fetchone()
    if row:
        conn.execute(
            "INSERT OR IGNORE INTO product_terpenes VALUES (?,?,?,?,?)",
            (product_id, row[0], concentration, unit, 1 if dominant else 0),
        )

# Linalool products
pid = get_or_create_product("Lavender Oil", "aromatherapy", description="Lavandula angustifolia essential oil")
link_product_terpene(pid, "Linalool", 35.0, "%", True)
pid = get_or_create_product("Do Si Dos", "cannabis", description="Indica-dominant hybrid, high linalool")
link_product_terpene(pid, "Linalool", 0.8, "%", True)
pid = get_or_create_product("Lavender Tea", "tea", description="Dried lavender bud infusion")
link_product_terpene(pid, "Linalool", None, "%", True)

# Eucalyptol products
pid = get_or_create_product("Eucalyptus Oil", "aromatherapy")
link_product_terpene(pid, "Eucalyptol", 75.0, "%", True)
pid = get_or_create_product("Vicks VapoRub", "topical_ointment")
link_product_terpene(pid, "Eucalyptol", None, "%", True)

# Eugenol products
pid = get_or_create_product("Clove Oil", "aromatherapy")
link_product_terpene(pid, "Eugenol", 80.0, "%", True)
pid = get_or_create_product("Allspice", "fruit", description="Pimenta dioica dried berry")
link_product_terpene(pid, "Eugenol", 60.0, "ppm", True)

# Menthol products
pid = get_or_create_product("Peppermint Oil", "aromatherapy", description="Mentha piperita essential oil")
link_product_terpene(pid, "Menthol", 40.0, "%", True)
pid = get_or_create_product("Tiger Balm", "topical_ointment", description="Topical analgesic balm")
link_product_terpene(pid, "Menthol", 8.0, "%", True)
pid = get_or_create_product("Peppermint Tea", "tea", description="Mentha piperita leaf infusion")
link_product_terpene(pid, "Menthol", None, "%", True)

# Citronellol products
pid = get_or_create_product("Rose Oil", "aromatherapy", description="Rosa damascena essential oil")
link_product_terpene(pid, "Citronellol", 35.0, "%", True)
pid = get_or_create_product("Geranium Oil", "aromatherapy", description="Pelargonium graveolens essential oil")
link_product_terpene(pid, "Citronellol", 30.0, "%", True)

# Bisabolol products
pid = get_or_create_product("Chamomile Oil", "aromatherapy")
link_product_terpene(pid, "alpha-Bisabolol", 15.0, "%", True)

conn.commit()

# ── Summary ──────────────────────────────────────────────────────────

print("=== ENRICHMENT COMPLETE ===\n")
for label, query in [
    ("Total terpenes", "SELECT count(*) FROM terpenes"),
    ("Total products", "SELECT count(*) FROM products"),
    ("Product-terpene links", "SELECT count(*) FROM product_terpenes"),
    ("Receptor bindings", "SELECT count(*) FROM terpene_receptors"),
    ("Clinical evidence entries", "SELECT count(*) FROM clinical_evidence"),
    ("Botanical sources", "SELECT count(*) FROM botanical_sources"),
    ("Monograph metadata", "SELECT count(*) FROM monograph_metadata"),
    ("Effects", "SELECT count(*) FROM effects"),
    ("Terpene-effect links", "SELECT count(*) FROM terpene_effects"),
]:
    val = conn.execute(query).fetchone()[0]
    print(f"  {label}: {val}")

print("\n--- New terpenes added ---")
for row in conn.execute("SELECT name FROM terpenes WHERE name IN ('Linalool','alpha-Bisabolol','Eucalyptol','Eugenol','Menthol','Citronellol')"):
    print(f"  + {row[0]}")

print("\n--- Receptor activity map ---")
for row in conn.execute("""
    SELECT t.name, r.name, tr.action, tr.affinity
    FROM terpene_receptors tr
    JOIN terpenes t ON tr.terpene_id = t.id
    JOIN receptors r ON tr.receptor_id = r.id
    ORDER BY t.name, r.name
"""):
    aff = f" ({row[3]})" if row[3] else ""
    print(f"  {row[0]:20s} → {row[1]:12s} [{row[2]}]{aff}")

conn.close()
print(f"\nEnriched DB saved to: {DB_OUT}")

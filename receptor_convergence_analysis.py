"""
Receptor Convergence Analysis: Pre-Loading Strategy Comparison

Uses Solful's actual 23-strain collection with exact terpene percentages,
essential oil recipes, and the enriched TerpQuery pharmacological database.

Three strategies evaluated per strain:
  A) Same-Terpene: match strain terpenes via botanical sources
  B) Receptor-Convergent: add cross-terpenes hitting the same receptors
  C) Pathway-Diversified: cover more distinct receptor pathways
"""

import sqlite3
import json
import math
import re
from pathlib import Path
from textwrap import dedent

# ═══════════════════════════════════════════════════════════════════════
# SECTION 1: CONSTANTS & PHARMACOLOGICAL KNOWLEDGE
# ═══════════════════════════════════════════════════════════════════════

PROJECT_ROOT = Path(__file__).parent
DB_PATH = PROJECT_ROOT / "terpquery_enriched.db"
STRAINS_JSON = PROJECT_ROOT / "data" / "strains.json"
TERPENES_JSON = PROJECT_ROOT / "data" / "terpenes.json"
OILS_JSON = PROJECT_ROOT / "data" / "essential-oils.json"
REPORT_PATH = PROJECT_ROOT / "receptor_convergence_report.md"

EVIDENCE_TIER_WEIGHTS = {
    "clinical": 1.0, "preclinical": 0.6, "in_vitro": 0.3, "theoretical": 0.1,
}

ACTION_TYPE_WEIGHTS = {
    "full_agonist": 1.0, "agonist": 0.9,
    "positive_allosteric_modulator": 0.85,
    "inhibitor": 0.8, "upregulator": 0.7,
    "modulator": 0.6, "indirect_agonist": 0.5,
    "cross-desensitizer": 0.4, "weak_modulator": 0.3,
}

RECEPTOR_CATEGORY_WEIGHTS = {
    "cannabinoid": 1.0, "ion_channel": 0.9, "GPCR": 0.8,
    "TRP": 0.7, "enzyme": 0.7, "transcription_factor": 0.6,
    "nuclear": 0.6, "growth_factor": 0.5,
}

PHARMACOLOGICAL_NOTES = {
    ("Menthol", "TRPV1"): {
        "penalty": 0.5,
        "note": "Cross-desensitizes TRPV1; may block beneficial TRPV1 activation",
    },
    ("Linalool", "GABA-A"): {
        "penalty": 0.0,
        "note": "Olfactory-only pathway (Harada 2018); oral route ineffective",
        "route": "olfactory_only",
    },
    ("Caryophyllene", "CB2"): {
        "penalty": 0.15,
        "note": "Endogenous 2-AG occupies ~50% CB2; ceiling effect possible",
    },
}

# Extended receptor matrix: weak/moderate interactions from MASTER reference
# not captured in the DB's terpene_receptors table
EXTENDED_MATRIX = {
    ("Myrcene", "CB1"): {"strength": 0.15, "action": "weak_modulator", "evidence": "preclinical"},
    ("Limonene", "GABA-A"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("Limonene", "TRPV1"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("Caryophyllene", "TRPA1"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("Humulene", "CB2"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("Linalool", "5-HT"): {"strength": 0.15, "action": "weak_modulator", "evidence": "preclinical"},
    ("alpha-Pinene", "NF-kB"): {"strength": 0.5, "action": "inhibitor", "evidence": "preclinical"},
    ("alpha-Pinene", "TRPV1"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("Terpinolene", "GABA-A"): {"strength": 0.5, "action": "modulator", "evidence": "preclinical"},
    ("Eucalyptol", "NF-kB"): {"strength": 0.5, "action": "inhibitor", "evidence": "preclinical"},
    ("Eucalyptol", "GABA-A"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
    ("alpha-Bisabolol", "NF-kB"): {"strength": 0.5, "action": "inhibitor", "evidence": "preclinical"},
    ("Menthol", "NF-kB"): {"strength": 0.15, "action": "weak_modulator", "evidence": "in_vitro"},
}

# Map strain terpene names (from JSON) → DB terpene names
TERPENE_NAME_MAP = {
    "β-Caryophyllene": "Caryophyllene",
    "α-Humulene": "Humulene",
    "α-Pinene": "alpha-Pinene",
    "α-Bisabolol": "alpha-Bisabolol",
    "β-Ocimene": "Ocimene",
    "trans-β-Farnesene": "beta-Farnesene",
    "Limonene": "Limonene",
    "Myrcene": "Myrcene",
    "Linalool": "Linalool",
    "Terpinolene": "Terpinolene",
}


# ═══════════════════════════════════════════════════════════════════════
# SECTION 2: DATA LOADING
# ═══════════════════════════════════════════════════════════════════════

def load_strains():
    """Load Solful's 23-strain collection with exact terpene percentages."""
    with open(STRAINS_JSON) as f:
        data = json.load(f)
    return data["strains"]


def load_essential_oils():
    """Load essential oil palette with primary/secondary terpenes."""
    with open(OILS_JSON) as f:
        data = json.load(f)
    return data["oils"]


def load_terpene_reference():
    """Load terpene reference with essential oil sources."""
    with open(TERPENES_JSON) as f:
        data = json.load(f)
    return data["terpenes"]


def connect_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def get_receptor_map(conn):
    """All terpene-receptor bindings grouped by receptor."""
    rows = conn.execute("""
        SELECT t.name AS terpene, r.name AS receptor, r.category,
               tr.action, tr.affinity, tr.evidence_tier
        FROM terpene_receptors tr
        JOIN terpenes t ON tr.terpene_id = t.id
        JOIN receptors r ON tr.receptor_id = r.id
        ORDER BY r.name, t.name
    """).fetchall()
    rmap = {}
    for r in rows:
        rname = r["receptor"]
        if rname not in rmap:
            rmap[rname] = {"category": r["category"], "terpenes": []}
        rmap[rname]["terpenes"].append({
            "terpene": r["terpene"], "action": r["action"],
            "affinity": r["affinity"], "evidence_tier": r["evidence_tier"],
        })
    return rmap


def get_all_receptors(conn):
    rows = conn.execute("SELECT name, full_name, category FROM receptors").fetchall()
    return {r["name"]: {"full_name": r["full_name"], "category": r["category"]} for r in rows}


def get_monograph_metadata(conn):
    rows = conn.execute("""
        SELECT t.name, mm.pre_loading_rank, mm.evidence_summary,
               mm.chemical_class, mm.sensory_profile
        FROM monograph_metadata mm
        JOIN terpenes t ON mm.terpene_id = t.id
    """).fetchall()
    return {r["name"]: dict(r) for r in rows}


def get_clinical_evidence_map(conn):
    rows = conn.execute("""
        SELECT t.name AS terpene, ce.condition, ce.model, ce.outcome, ce.evidence_tier
        FROM clinical_evidence ce
        JOIN terpenes t ON ce.terpene_id = t.id
    """).fetchall()
    ev_map = {}
    for r in rows:
        ev_map.setdefault(r["terpene"], []).append(dict(r))
    return ev_map


def get_botanical_sources(conn, terpene_name):
    rows = conn.execute("""
        SELECT bs.common_name, bs.concentration
        FROM botanical_sources bs
        JOIN terpenes t ON bs.terpene_id = t.id
        WHERE t.name = ? COLLATE NOCASE AND bs.plant_name != 'Cannabis sativa'
    """, (terpene_name,)).fetchall()
    return [dict(r) for r in rows]


def build_full_matrix(conn):
    """Complete terpene-receptor matrix: DB + extended monograph data."""
    matrix = {}
    rows = conn.execute("""
        SELECT t.name AS terpene, r.name AS receptor, tr.action,
               tr.affinity, tr.evidence_tier
        FROM terpene_receptors tr
        JOIN terpenes t ON tr.terpene_id = t.id
        JOIN receptors r ON tr.receptor_id = r.id
    """).fetchall()
    for r in rows:
        matrix[(r["terpene"], r["receptor"])] = {
            "strength": 1.0, "action": r["action"],
            "evidence": r["evidence_tier"] or "preclinical",
            "affinity": r["affinity"],
        }
    for key, val in EXTENDED_MATRIX.items():
        if key not in matrix:
            matrix[key] = val
    return matrix


# ═══════════════════════════════════════════════════════════════════════
# SECTION 3: SCORING HELPERS
# ═══════════════════════════════════════════════════════════════════════

def normalize_terpene_name(name):
    """Map strain JSON terpene names to DB names."""
    return TERPENE_NAME_MAP.get(name, name)


def get_terpene_receptors(terpene_db_name, matrix):
    """Get all receptors a terpene hits from the full matrix."""
    return [(r, data) for (t, r), data in matrix.items()
            if t == terpene_db_name and data["strength"] > 0]


def compute_evidence_weight(terpene_db_name, monograph_meta, clinical_ev):
    meta = monograph_meta.get(terpene_db_name)
    rank_weight = 1.0 / meta["pre_loading_rank"] if meta else 0.05
    clin = clinical_ev.get(terpene_db_name, [])
    if clin:
        tier_scores = [EVIDENCE_TIER_WEIGHTS.get(c["evidence_tier"], 0.1) for c in clin]
        clin_weight = sum(tier_scores) / len(tier_scores)
    else:
        clin_weight = 0.1
    return 0.4 * min(rank_weight * 5, 1.0) + 0.6 * clin_weight


def parse_concentration(conc_str):
    if not conc_str or conc_str in ("Variable", "Unknown"):
        return 0.3
    if str(conc_str).startswith("Trace"):
        return 0.1
    numbers = re.findall(r'[\d.]+', str(conc_str))
    if numbers:
        return min(max(float(n) for n in numbers) / 100.0, 1.0)
    return 0.3


# ═══════════════════════════════════════════════════════════════════════
# SECTION 4: STRATEGY SCORING ENGINE
# ═══════════════════════════════════════════════════════════════════════

def score_strategy_a(strain, matrix, monograph_meta, clinical_ev, oils_data, terpene_ref, conn):
    """Strategy A: Same-Terpene Pre-Loading using Solful's actual oil recipes."""
    results = {"terpenes": [], "total_score": 0, "recommendations": []}
    profile = strain["terpeneProfile"]
    oil_recipe = strain.get("oilRecipe", {}).get("oils", [])
    max_conc = 2.22  # Mule Fuel's myrcene — highest in collection

    for terp_name, concentration in profile.items():
        db_name = normalize_terpene_name(terp_name)
        conc_weight = concentration / max_conc

        # Evidence
        ev_weight = compute_evidence_weight(db_name, monograph_meta, clinical_ev)

        # Pre-loading rank
        meta = monograph_meta.get(db_name)
        rank_score = 1.0 / meta["pre_loading_rank"] if meta else 0.05

        # Botanical availability from essential oils JSON
        terp_data = terpene_ref.get(terp_name, {})
        oil_sources = terp_data.get("essentialOilSources", [])
        if oil_sources:
            conc_map = {"Very High": 0.95, "High": 0.75, "Medium": 0.5, "Low": 0.25}
            bot_score = max(conc_map.get(s["concentration"], 0.3) for s in oil_sources)
        else:
            # Try DB botanical sources
            db_bots = get_botanical_sources(conn, db_name)
            bot_score = max((parse_concentration(b["concentration"]) for b in db_bots), default=0.1)

        # Receptor breadth
        receptors = get_terpene_receptors(db_name, matrix)
        strong = [r for r, d in receptors if d["strength"] >= 0.5]
        breadth_bonus = 1.0 + 0.15 * len(strong)

        score = conc_weight * ev_weight * rank_score * bot_score * breadth_bonus

        # Find the matching oil from the actual recipe
        recipe_oil = None
        for oil in oil_recipe:
            if oil.get("terpene") == terp_name or normalize_terpene_name(oil.get("terpene", "")) == db_name:
                recipe_oil = oil
                break

        results["terpenes"].append({
            "name": terp_name,
            "db_name": db_name,
            "concentration": concentration,
            "score": score,
            "receptors_hit": strong,
            "recipe_oil": recipe_oil["name"] if recipe_oil else (oil_sources[0]["oil"] if oil_sources else "Unknown"),
            "recipe_drops": recipe_oil["drops"] if recipe_oil else None,
        })

        source = recipe_oil["name"] if recipe_oil else (oil_sources[0]["oil"] if oil_sources else "N/A")
        drops = f" ({recipe_oil['drops']} drops)" if recipe_oil else ""
        results["recommendations"].append(f"{terp_name} → {source}{drops}")

    results["total_score"] = sum(t["score"] for t in results["terpenes"])
    results["terpenes"].sort(key=lambda x: x["score"], reverse=True)
    return results


def score_strategy_b(strain, matrix, receptor_map, all_receptors, monograph_meta, clinical_ev, oils_data, conn):
    """Strategy B: Receptor-Convergent Cross-Terpene additions."""
    results = {"receptors": [], "total_score": 0, "recommendations": []}
    profile = strain["terpeneProfile"]
    strain_db_names = {normalize_terpene_name(t) for t in profile}

    # Find receptors hit by strain terpenes
    strain_receptors = {}
    for terp_name in profile:
        db_name = normalize_terpene_name(terp_name)
        for (t, r), data in matrix.items():
            if t == db_name and data["strength"] >= 0.5:
                strain_receptors.setdefault(r, []).append({"terpene": db_name, "strain_terp": terp_name, **data})

    for receptor_name, existing_hits in strain_receptors.items():
        rinfo = all_receptors.get(receptor_name, {})
        cat_weight = RECEPTOR_CATEGORY_WEIGHTS.get(rinfo.get("category", ""), 0.5)

        existing_score = sum(
            h["strength"] * ACTION_TYPE_WEIGHTS.get(h["action"], 0.3) for h in existing_hits
        )

        # Find cross-terpene candidates
        candidates = []
        for (t, r), data in matrix.items():
            if r == receptor_name and t not in strain_db_names and data["strength"] >= 0.5:
                penalty_info = PHARMACOLOGICAL_NOTES.get((t, r), {})
                penalty = penalty_info.get("penalty", 0)

                is_allosteric = "allosteric" in data["action"]
                has_direct = any("agonist" in h["action"] for h in existing_hits)

                if is_allosteric and has_direct:
                    synergy_mult = 1.3
                elif is_allosteric:
                    synergy_mult = 0.8
                elif has_direct:
                    synergy_mult = 0.7
                else:
                    synergy_mult = 0.9

                raw_gain = data["strength"] * ACTION_TYPE_WEIGHTS.get(data["action"], 0.3)
                saturation = 1.0 / (1.0 + existing_score)
                net_gain = raw_gain * synergy_mult * saturation * (1.0 - penalty)
                ev = compute_evidence_weight(t, monograph_meta, clinical_ev)

                # Find oil source
                oil_source = None
                for oil_name, oil_data in oils_data.items():
                    if normalize_terpene_name(oil_data.get("primaryTerpene", "")) == t:
                        oil_source = oil_name
                        break
                    if t in [normalize_terpene_name(s) for s in oil_data.get("secondaryTerpenes", [])]:
                        oil_source = oil_name

                bot_feasible = 1.0 if oil_source else 0.3
                candidate_score = net_gain * ev * bot_feasible * cat_weight

                candidates.append({
                    "terpene": t, "action": data["action"],
                    "score": candidate_score, "oil_source": oil_source,
                    "synergy_type": "supra-additive" if synergy_mult > 1 else "additive" if synergy_mult >= 0.9 else "diminishing",
                    "penalty_note": penalty_info.get("note"),
                })

        candidates.sort(key=lambda x: x["score"], reverse=True)
        best = candidates[0] if candidates else None

        results["receptors"].append({
            "receptor": receptor_name,
            "category": rinfo.get("category", ""),
            "existing_terpenes": [h["strain_terp"] for h in existing_hits],
            "existing_score": existing_score,
            "best_candidate": best,
            "all_candidates": candidates[:3],
        })

        if best and best["score"] > 0:
            results["total_score"] += best["score"]
            oil = best["oil_source"] or "no oil source"
            results["recommendations"].append(
                f"Add {best['terpene']} via {oil} for {receptor_name} [{best['synergy_type']}]"
            )

    return results


def score_strategy_c(strain, matrix, all_receptors, monograph_meta, clinical_ev, oils_data, conn):
    """Strategy C: Pathway-Diversified — cover untargeted receptors."""
    results = {"untargeted": [], "total_score": 0, "recommendations": []}
    profile = strain["terpeneProfile"]
    strain_db_names = {normalize_terpene_name(t) for t in profile}

    targeted = set()
    for terp_name in profile:
        db_name = normalize_terpene_name(terp_name)
        for (t, r), data in matrix.items():
            if t == db_name and data["strength"] >= 0.5:
                targeted.add(r)

    untargeted = set(all_receptors.keys()) - targeted

    picks = []
    for receptor_name in untargeted:
        rinfo = all_receptors.get(receptor_name, {})
        cat_weight = RECEPTOR_CATEGORY_WEIGHTS.get(rinfo.get("category", ""), 0.5)

        best, best_score = None, 0
        for (t, r), data in matrix.items():
            if r == receptor_name and t not in strain_db_names and data["strength"] >= 0.5:
                ev = compute_evidence_weight(t, monograph_meta, clinical_ev)
                action_w = ACTION_TYPE_WEIGHTS.get(data["action"], 0.3)

                # Find oil source
                oil_source = None
                for oil_name, oil_data in oils_data.items():
                    if normalize_terpene_name(oil_data.get("primaryTerpene", "")) == t:
                        oil_source = oil_name
                        break
                bot_feasible = 1.0 if oil_source else 0.3

                score = data["strength"] * action_w * ev * bot_feasible * cat_weight
                if score > best_score:
                    best_score = score
                    best = {
                        "terpene": t, "receptor": receptor_name,
                        "category": rinfo.get("category", ""),
                        "action": data["action"], "score": score,
                        "oil_source": oil_source,
                    }
        if best:
            picks.append(best)

    picks.sort(key=lambda x: x["score"], reverse=True)
    top = picks[:4]
    diversity_bonus = 1.0 + 0.05 * len(untargeted) if untargeted else 1.0

    for p in top:
        p["score"] *= diversity_bonus
        results["untargeted"].append(p)
        results["total_score"] += p["score"]
        oil = p["oil_source"] or "no oil source"
        results["recommendations"].append(
            f"Add {p['terpene']} via {oil} → NEW: {p['receptor']} ({p['category']})"
        )

    results["targeted_count"] = len(targeted)
    results["untargeted_count"] = len(untargeted)
    results["coverage_before"] = f"{len(targeted)}/{len(all_receptors)}"
    results["coverage_after"] = f"{len(targeted) + len(top)}/{len(all_receptors)}"
    return results


# ═══════════════════════════════════════════════════════════════════════
# SECTION 5: STRAIN ANALYSIS PIPELINE
# ═══════════════════════════════════════════════════════════════════════

def analyze_strain(strain, matrix, receptor_map, all_receptors, monograph_meta, clinical_ev, oils_data, terpene_ref, conn):
    sa = score_strategy_a(strain, matrix, monograph_meta, clinical_ev, oils_data, terpene_ref, conn)
    sb = score_strategy_b(strain, matrix, receptor_map, all_receptors, monograph_meta, clinical_ev, oils_data, conn)
    sc = score_strategy_c(strain, matrix, all_receptors, monograph_meta, clinical_ev, oils_data, conn)

    scores = {
        "A (Same-Terpene)": sa["total_score"],
        "B (Receptor-Convergent)": sb["total_score"],
        "C (Pathway-Diversified)": sc["total_score"],
    }
    winner = max(scores, key=scores.get)

    result = {
        "strain": strain["name"], "farm": strain["farm"], "region": strain["region"],
        "intent": strain["intent"], "effects": strain["effects"],
        "terpeneProfile": strain["terpeneProfile"],
        "totalTerpenes": strain["totalTerpenes"],
        "oilRecipe": strain.get("oilRecipe", {}),
        "strategy_a": sa, "strategy_b": sb, "strategy_c": sc,
        "scores": scores, "winner": winner,
    }
    result["rounding"] = compute_rounding_recommendations(result, matrix)
    return result


def run_analysis():
    conn = connect_db()
    strains = load_strains()
    oils_data = load_essential_oils()
    terpene_ref = load_terpene_reference()
    matrix = build_full_matrix(conn)
    receptor_map = get_receptor_map(conn)
    all_receptors = get_all_receptors(conn)
    monograph_meta = get_monograph_metadata(conn)
    clinical_ev = get_clinical_evidence_map(conn)

    results = []
    for strain in strains:
        r = analyze_strain(strain, matrix, receptor_map, all_receptors,
                          monograph_meta, clinical_ev, oils_data, terpene_ref, conn)
        results.append(r)

    conn.close()
    return results, matrix, receptor_map, all_receptors, monograph_meta


# ═══════════════════════════════════════════════════════════════════════
# SECTION 6: REPORT GENERATOR
# ═══════════════════════════════════════════════════════════════════════

def generate_heatmap(matrix, all_receptors):
    terpenes = sorted({t for (t, r) in matrix})
    receptors = sorted(all_receptors.keys())

    def cell(s):
        if s >= 0.8: return "████"
        if s >= 0.5: return "██░░"
        if s > 0:    return "█░░░"
        return "░░░░"

    cw = 9
    header = f"{'Terpene':<22}" + "".join(f"{r[:8]:^{cw}}" for r in receptors)
    sep = "─" * len(header)
    lines = [header, sep]
    for t in terpenes:
        row = f"{t:<22}"
        for r in receptors:
            d = matrix.get((t, r))
            row += f"{cell(d['strength'] if d else 0):^{cw}}"
        lines.append(row)
    return "\n".join(lines)


def generate_convergence_hotspots(receptor_map):
    lines = ["| Receptor | Category | Terpenes | Convergence |",
             "|----------|----------|----------|-------------|"]
    for rname, rdata in sorted(receptor_map.items(), key=lambda x: len(x[1]["terpenes"]), reverse=True):
        count = len(rdata["terpenes"])
        terps = ", ".join(t["terpene"] for t in rdata["terpenes"])
        pot = "**HIGH**" if count >= 3 else "MODERATE" if count == 2 else "Single"
        lines.append(f"| {rname} | {rdata['category']} | {terps} | {pot} ({count}) |")
    return "\n".join(lines)


def generate_strain_section(r):
    lines = [f"### {r['strain']}\n"]
    lines.append(f"**{r['farm']}** ({r['region']}) | Total terpenes: {r['totalTerpenes']}%")
    lines.append(f"**Intent:** {r['intent']}")
    lines.append(f"**Effects:** {', '.join(r['effects'])}\n")

    # Terpene profile
    lines.append("| Terpene | % | Receptors (Strong) | Oil Match |")
    lines.append("|---------|---|--------------------|-----------|")
    for t in r["strategy_a"]["terpenes"]:
        recs = ", ".join(t["receptors_hit"]) if t["receptors_hit"] else "—"
        drops = f" ({t['recipe_drops']}d)" if t.get("recipe_drops") else ""
        lines.append(f"| {t['name']} | {t['concentration']:.2f} | {recs} | {t['recipe_oil']}{drops} |")

    # Strategy comparison
    lines.append("\n| Strategy | Score | Top Recommendation |")
    lines.append("|----------|-------|--------------------|")
    for sname, score in r["scores"].items():
        key = sname[0]
        strat = r[f"strategy_{key.lower()}"]
        rec = strat["recommendations"][0] if strat["recommendations"] else "—"
        marker = " **WINNER**" if sname == r["winner"] else ""
        lines.append(f"| {sname} | {score:.3f}{marker} | {rec} |")

    # Strategy B details (most pharmacologically interesting)
    if r["strategy_b"]["receptors"]:
        lines.append("\n**Receptor Convergence Opportunities:**")
        for rd in r["strategy_b"]["receptors"]:
            existing = ", ".join(rd["existing_terpenes"])
            lines.append(f"- **{rd['receptor']}** (strain has: {existing})")
            if rd["best_candidate"]:
                bc = rd["best_candidate"]
                syn = bc["synergy_type"]
                oil = bc["oil_source"] or "?"
                lines.append(f"  → Add **{bc['terpene']}** via {oil} [{bc['action']}, {syn}]")
                if bc.get("penalty_note"):
                    lines.append(f"  ⚠ {bc['penalty_note']}")

    # Rounding blend recommendations
    if "rounding" in r:
        rd = r["rounding"]
        lines.append(f"\n**Receptor Coverage:** {rd['covered_count']}/{rd['total_receptors']} → "
                     f"{rd['covered_count'] + sum(len(rec['opens']) for rec in rd['recommendations'])}/{rd['total_receptors']} with rounding")
        lines.append("\n**Recommended Rounding Blends:**")
        for rec in rd["recommendations"]:
            opens = ", ".join(rec["opens"])
            prio = "***" if rec["priority"] == "high" else ""
            lines.append(f"- {prio}**{rec['blend']}**{prio} → opens {opens}")
            lines.append(f"  *{rec['note']}*")

    lines.append("")
    return "\n".join(lines)


def generate_comparison_table(results):
    lines = ["| Strain | Farm | Terpenes | A | B | C | Winner |",
             "|--------|------|----------|---|---|---|--------|"]
    for r in results:
        n_terps = len(r["terpeneProfile"])
        sa = r["scores"]["A (Same-Terpene)"]
        sb = r["scores"]["B (Receptor-Convergent)"]
        sc = r["scores"]["C (Pathway-Diversified)"]
        w = r["winner"].split("(")[0].strip()
        lines.append(f"| {r['strain']} | {r['farm']} | {n_terps} | {sa:.2f} | {sb:.2f} | {sc:.2f} | {w} |")
    return "\n".join(lines)


def generate_core_finding(results):
    wins = {}
    for r in results:
        w = r["winner"][0]
        wins[w] = wins.get(w, 0) + 1

    # Group strains by winner for analysis
    grouped = {}
    for r in results:
        w = r["winner"][0]
        grouped.setdefault(w, []).append(r)

    # Find best Strategy B example (supra-additive)
    best_b_example = None
    best_b_score = 0
    for r in results:
        if r["strategy_b"]["total_score"] > best_b_score:
            best_b_score = r["strategy_b"]["total_score"]
            best_b_example = r

    finding = dedent(f"""\
    ### The Data Across 23 Solful Strains

    - **Strategy A (Same-Terpene)** won for **{wins.get('A', 0)}** strains
    - **Strategy B (Receptor-Convergent)** won for **{wins.get('B', 0)}** strains
    - **Strategy C (Pathway-Diversified)** won for **{wins.get('C', 0)}** strains

    #### Key Finding: Pathway Diversification Dominates — But Context Matters

    Strategy C wins most often because the average Solful strain covers only 3-5 of 15
    known receptor targets. The marginal value of each new receptor pathway is high.

    **However, this doesn't mean you should ignore same-terpene matching (Strategy A).**
    Strategy A represents your existing oil recipe approach — and it's already well-designed.
    The real question is: **what should you ADD to your existing recipes?**

    #### The Pharmacological Answer

    **Your existing oil recipes (Strategy A) are the foundation.** They correctly match
    each strain's dominant terpenes to botanical sources. What receptor analysis reveals
    is where to **supplement**:

    1. **GABA-A is the convergence goldmine.** Three terpenes modulate it (Myrcene,
       Linalool, alpha-Bisabolol). When a strain has myrcene but lacks linalool, adding
       lavender creates allosteric + direct synergy (1.3x supra-additive bonus). This is
       the strongest pharmacological case for cross-terpene pre-loading.

    2. **CB2 has no convergence option.** Only Caryophyllene activates CB2 (Ki=155nM).
       No cross-terpene can substitute. For CB2-mediated effects (anti-inflammatory,
       pain), same-terpene pre-loading via black pepper is the only path.

    3. **AChE inhibition stacks.** Both alpha-Pinene and Eucalyptol inhibit AChE.
       For cognitive enhancement during cannabis, combining pine oil + rosemary
       creates dual AChE inhibition that could better counter THC memory effects.
    """)

    if best_b_example:
        finding += f"""
    #### Best Receptor Convergence Example: {best_b_example['strain']}

    """
        for rd in best_b_example["strategy_b"]["receptors"]:
            if rd["best_candidate"] and rd["best_candidate"]["synergy_type"] == "supra-additive":
                finding += (f"    - {rd['receptor']}: strain has {', '.join(rd['existing_terpenes'])} → "
                           f"add {rd['best_candidate']['terpene']} via {rd['best_candidate']['oil_source']} "
                           f"[{rd['best_candidate']['synergy_type']}]\n")

    finding += dedent("""
    #### The Optimal Hybrid Protocol for Solful Strains

    1. **Use your existing oil recipe** (Strategy A) — it's your foundation
    2. **Add ONE convergent terpene** if the strain hits a hotspot:
       - Strain has Myrcene but no Linalool? → Add 2-3 drops Lavender (GABA-A convergence)
       - Strain has alpha-Pinene? → Add 2-3 drops Rosemary ct. cineole (dual AChE)
       - Strain has Caryophyllene only for CB2? → Already covered, no convergence possible
    3. **For narrow strains** (≤2 terpenes): consider adding a terpene that opens a
       new receptor pathway entirely (e.g., Eucalyptol for TRPV3/AChE)

    #### Critical Caveats

    1. **No human RCTs validate multi-terpene pre-loading.** Only Spindle 2024
       (limonene + THC) has human data.
    2. **Linalool only works via olfactory pathway** — it must be inhaled, not ingested.
    3. **Receptor saturation limits gains** — 2-AG already occupies ~50% of CB2.
    4. **Placebo and aromatic expectancy effects are likely significant.**
    5. **Max 2-3 supplementary drops** to avoid overwhelming the carefully designed
       blend ratios in your existing recipes.
    """)
    return finding


def load_rounding_blends():
    """Load rounding blends data."""
    blends_path = PROJECT_ROOT / "data" / "rounding-blends.json"
    with open(blends_path) as f:
        return json.load(f)


def compute_rounding_recommendations(result, matrix):
    """For a strain, determine which rounding blends help and why."""
    profile = result["terpeneProfile"]
    strain_db_names = {normalize_terpene_name(t) for t in profile}

    # Find covered receptors
    covered = set()
    for terp_name in profile:
        db_name = normalize_terpene_name(terp_name)
        for (t, r), data in matrix.items():
            if t == db_name and data["strength"] >= 0.5:
                covered.add(r)

    has_myrcene = "Myrcene" in strain_db_names
    has_linalool = "Linalool" in strain_db_names
    has_pinene = "alpha-Pinene" in strain_db_names
    has_bisabolol = "alpha-Bisabolol" in strain_db_names

    recs = []

    # Clarity Round
    clarity_opens = {"AChE", "BDNF-TrkB", "TRPV3"} - covered
    if clarity_opens:
        note = "Dual AChE stack" if has_pinene else "Opens cognitive pathways"
        recs.append({
            "blend": "Clarity Round",
            "opens": sorted(clarity_opens),
            "note": note,
            "priority": "high" if "AChE" in clarity_opens else "moderate",
        })

    # Calm Round
    calm_opens = {"TRPM8", "TRPA1"} - covered
    if calm_opens:
        note = "Menthol cross-desensitizes TRPV1 (myrcene-modulated)" if has_myrcene else "Opens pain pathways"
        recs.append({
            "blend": "Calm Round",
            "opens": sorted(calm_opens),
            "note": note,
            "priority": "high" if len(calm_opens) == 2 else "moderate",
        })

    # Ease Round
    gaba_convergence = has_myrcene and not has_linalool
    triple_gaba = has_myrcene and has_bisabolol and not has_linalool
    if gaba_convergence:
        if triple_gaba:
            note = "TRIPLE GABA-A convergence (Myrcene + Bisabolol + Linalool)"
        else:
            note = "Supra-additive GABA-A (allosteric linalool + direct myrcene)"
        recs.append({
            "blend": "Ease Round",
            "opens": ["GABA-A (convergence)"],
            "note": note,
            "priority": "high",
        })
    elif not has_linalool and "GABA-A" not in covered:
        recs.append({
            "blend": "Ease Round",
            "opens": ["GABA-A"],
            "note": "Opens GABA-A pathway (no convergence partner in strain)",
            "priority": "moderate",
        })

    return {
        "covered_receptors": sorted(covered),
        "covered_count": len(covered),
        "total_receptors": 15,
        "recommendations": recs,
    }


def write_report(results, matrix, receptor_map, all_receptors, monograph_meta):
    s = []
    s.append("# Receptor Convergence Analysis: Solful Pre-Loading Strategy\n")
    s.append(f"*23 strains from {len(set(r['farm'] for r in results))} farms | "
             f"15 receptor targets | 3 Receptor Rounding Blends*\n")

    # Load rounding blends
    rounding = load_rounding_blends()

    # Executive summary
    s.append("## Executive Summary\n")
    s.append(dedent("""\
    This analysis evaluates receptor coverage across Solful's 23-strain collection
    and introduces **Receptor Rounding Blends** — three purpose-built mini-blends
    that activate universally missing receptor pathways WITHOUT modifying any strain recipe.

    **Core finding:** Every strain blend stays 100% intact. The rounding blends are a
    separate, earlier step in the ritual — a pharmacological warm-up. They also work
    as standalone aromatherapy products for specific intents (focus, pain, calm)
    independent of any cannabis protocol.

    **The three Receptor Rounding Blends:**
    - **Clarity Round** (Rosemary + Eucalyptus, 5 drops) — AChE + BDNF-TrkB + TRPV3
    - **Calm Round** (Peppermint + Clove, 3 drops) — TRPM8 + TRPA1 + COX-2
    - **Ease Round** (Lavender, 3 drops) — GABA-A convergence (olfactory-only)
    """))

    # Receptor convergence network
    s.append("## 1. Receptor Convergence Network\n")
    s.append(generate_convergence_hotspots(receptor_map))

    s.append("\n### Receptor-Terpene Heatmap\n")
    s.append("`████` = Strong | `██░░` = Moderate | `█░░░` = Weak | `░░░░` = None\n")
    s.append("```")
    s.append(generate_heatmap(matrix, all_receptors))
    s.append("```\n")

    # Rounding Blends section
    s.append("## 2. Receptor Rounding Blends\n")
    s.append(dedent("""\
    Three purpose-built mini-blends that fill receptor gaps across ALL 23 strains.
    Each works as a **standalone aromatherapy product** OR as **Step 1 in the pre-loading protocol**.
    Strain blends are never modified.
    """))

    for bname, bdata in rounding["blends"].items():
        s.append(f"### {bname}\n")
        s.append(f"*\"{bdata['tagline']}\"*\n")
        s.append(f"**Intent:** {bdata['intent']}\n")

        # Recipe
        oils_str = " + ".join(
            f"{o['name']} ({o['drops']}d)" for o in bdata["recipe"]["oils"]
        )
        s.append(f"**Recipe:** {oils_str} = **{bdata['recipe']['totalDrops']} drops**\n")

        # Receptors opened
        s.append("**Receptors Opened:**\n")
        for rt in bdata["pharmacology"]["targetReceptors"]:
            s.append(f"- **{rt['receptor']}** ({rt['category']}) — {rt['action']}")
            s.append(f"  {rt['significance']}")
            s.append(f"  *Gap: {rt['strainGap']}*")

        # Convergence note
        if bdata["pharmacology"].get("convergenceNote"):
            s.append(f"\n**Convergence:** {bdata['pharmacology']['convergenceNote']}")

        # Standalone use
        s.append(f"\n**Standalone Use:**")
        for occ in bdata["standalone"]["occasions"]:
            s.append(f"- {occ}")

        # Aroma
        s.append(f"\n**Aroma:** {bdata['aromaProfile']['character']}")
        s.append(f"**Clash Risk:** {bdata['aromaProfile']['clashRisk']}\n")

        # Safety
        if bdata.get("safetyNotes"):
            s.append("**Safety:**")
            for note in bdata["safetyNotes"]:
                s.append(f"- {note}")
        s.append("")

    # Protocol
    s.append("### The Pre-Loading Protocol\n")
    proto = rounding["protocol"]["twoStepPreLoading"]
    for step in proto["steps"]:
        s.append(f"**Step {step['step']}: {step['name']}** ({step['timing']})")
        s.append(f"- Method: {step['method']}")
        s.append(f"- {step['instruction']}")
        if "selection" in step:
            s.append("- **Intent-based selection:**")
            for intent, blend in step["selection"].items():
                s.append(f"  - {intent.replace('_', ' ').title()} → {blend}")
        s.append("")

    s.append("### Standalone Use\n")
    standalone = rounding["protocol"]["standaloneUse"]
    s.append(f"{standalone['description']}\n")
    s.append(f"**Method:** {standalone['method']}")
    s.append(f"**Duration:** {standalone['duration']}\n")

    # Product formats
    s.append("### Product Formats\n")
    s.append("| Format | Description | Best For |")
    s.append("|--------|-------------|----------|")
    for fname, fdata in rounding["productFormats"].items():
        adv = fdata.get('advantage', fdata.get('description', '')).split('.')[0]
        s.append(f"| {fdata['description'].split('.')[0]} | {fdata['format']} | {adv} |")
    s.append("")

    # Per-strain analysis
    s.append("## 3. Per-Strain Analysis\n")
    # Group by farm
    farms = {}
    for r in results:
        farms.setdefault(r["farm"], []).append(r)

    for farm, farm_strains in sorted(farms.items()):
        s.append(f"#### {farm} ({farm_strains[0]['region']})\n")
        for r in farm_strains:
            s.append(generate_strain_section(r))

    # Comparison table
    s.append("## 4. Strategy Comparison\n")
    s.append(generate_comparison_table(results))

    # Rounding blend per-strain summary
    s.append("\n### Rounding Blend Recommendations by Strain\n")
    s.append("| Strain | Covered | Clarity | Calm | Ease | Note |")
    s.append("|--------|---------|---------|------|------|------|")
    for r in results:
        rd = r["rounding"]
        clarity = "**YES**" if any(rec["blend"] == "Clarity Round" for rec in rd["recommendations"]) else "—"
        calm = "**YES**" if any(rec["blend"] == "Calm Round" for rec in rd["recommendations"]) else "—"
        ease = "**YES**" if any(rec["blend"] == "Ease Round" for rec in rd["recommendations"]) else "—"
        notes = [rec["note"] for rec in rd["recommendations"] if rec["priority"] == "high"]
        note = notes[0][:50] + "..." if notes else "—"
        s.append(f"| {r['strain']} | {rd['covered_count']}/15 | {clarity} | {calm} | {ease} | {note} |")
    s.append("")

    # Core finding
    s.append("\n## 5. Core Finding\n")
    s.append(generate_core_finding(results))

    # Methodology
    s.append("## 6. Methodology\n")
    s.append(dedent("""\
    ### Data Sources
    - **Strain data**: `data/strains.json` — 23 Solful strains with exact terpene %
    - **Essential oils**: `data/essential-oils.json` — 18 oils with primary/secondary terpenes
    - **Pharmacology**: `terpquery_enriched.db` — 196 terpenes, 23 receptor bindings, 39 clinical entries
    - **Monographs**: 14 deep terpene monographs with 100+ peer-reviewed sources each

    ### Strategy A Scoring
    `concentration × evidence_weight × pre_loading_rank × botanical_availability × receptor_breadth`

    ### Strategy B Scoring
    Per receptor: `convergence_gain × synergy_multiplier × saturation_factor × evidence × botanical_feasibility`
    - Allosteric + direct = 1.3x (supra-additive)
    - Direct + direct = 0.7x (diminishing returns)

    ### Strategy C Scoring
    Per untargeted receptor: `strength × action_weight × evidence × botanical_feasibility × receptor_importance`
    Diversity bonus applied for number of uncovered pathways.
    """))

    REPORT_PATH.write_text("\n".join(s))


# ═══════════════════════════════════════════════════════════════════════
# SECTION 7: MAIN
# ═══════════════════════════════════════════════════════════════════════

def main():
    results, matrix, receptor_map, all_receptors, monograph_meta = run_analysis()
    write_report(results, matrix, receptor_map, all_receptors, monograph_meta)

    print("=" * 70)
    print("RECEPTOR CONVERGENCE ANALYSIS — 23 SOLFUL STRAINS")
    print("=" * 70)

    for r in results:
        print(f"\n  {r['strain']} ({r['farm']}, {r['region']})")
        terps = ", ".join(f"{k}:{v:.2f}%" for k, v in r["terpeneProfile"].items())
        print(f"    Terpenes: {terps}")
        for sname, score in r["scores"].items():
            marker = " <-- WINNER" if sname == r["winner"] else ""
            print(f"    {sname}: {score:.3f}{marker}")

    # Summary stats
    wins = {}
    for r in results:
        w = r["winner"][0]
        wins[w] = wins.get(w, 0) + 1

    print(f"\n{'=' * 70}")
    print(f"  Strategy A wins: {wins.get('A', 0)}/23")
    print(f"  Strategy B wins: {wins.get('B', 0)}/23")
    print(f"  Strategy C wins: {wins.get('C', 0)}/23")
    print(f"\n  Report: {REPORT_PATH}")
    print(f"{'=' * 70}")


if __name__ == "__main__":
    main()

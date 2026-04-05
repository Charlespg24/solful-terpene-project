import { useState, useMemo } from "react";
import { Search, Filter, Users, BookOpen, Mail, AlertTriangle, ChevronDown, ChevronRight, ExternalLink, Star, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const ARTICLES = [
  { id: 1, label: "Art. 1 — BJP", journal: "British Journal of Pharmacology", status: "Submitted", desc: "Perspective piece introducing the unified terpene pharmacology framework." },
  { id: 2, label: "Art. 2 — Pharm Rev", journal: "Pharmacological Reviews", status: "In Progress", desc: "Comprehensive mechanistic review (15–25K words). Anchor piece of the series." },
  { id: 3, label: "Art. 3 — Network Pharm", journal: "Frontiers in Pharmacology / TIPS", status: "Planned", desc: "Network pharmacology & systems-level analysis of terpene polypharmacology." },
  { id: 4, label: "Art. 4 — Ethnopharm", journal: "Journal of Ethnopharmacology", status: "Planned", desc: "Traditional knowledge integration: TCM, Ayurveda, indigenous terpene practices." },
  { id: 5, label: "Art. 5 — Translational", journal: "Nature Reviews Drug Discovery", status: "Planned", desc: "Clinical trial landscape, regulatory pathway, terpene-based therapeutics." },
];

const RESEARCHERS = [
  // Tier 1
  { name: "John Streicher, PhD", institution: "University of Arizona", dept: "Comprehensive Pain & Addiction Center", tier: 1, priority: "A+", articles: [2,3,5], role: "co-author",
    focus: "PI on R01AT011517 (NCCIH). Discovered A2a receptor mechanism for terpene antinociception. LaVigne 2021 → Schwarz 2024 → Seekins 2025.",
    coi: "Consults for Napreva. Equity in Botanical Results & Teleport Pharmaceuticals.", email: "Via UA Pharmacology dept", phase: 1,
    why: "His A2a mechanism is the scientific backbone of Articles 2–3. His lab's progression from LaVigne → Schwarz → Seekins is the strongest mechanistic evidence in terpene pharmacology." },
  { name: "Tory Spindle, PhD", institution: "Johns Hopkins", dept: "Psychiatry & Behavioral Sciences", tier: 1, priority: "A+", articles: [2,5], role: "co-author",
    focus: "Led first controlled human terpene-cannabinoid trial (Spindle 2024, d-limonene + THC). Patent PCT/US2022/014296.",
    coi: "Patent filed PCT/US2022/014296 (limonene-THC).", email: "tspindle@jhmi.edu", phase: 2,
    why: "First human clinical evidence for terpene-cannabinoid interaction. Essential for Article 5's translational review." },
  { name: "Ryan Vandrey, PhD", institution: "Johns Hopkins", dept: "Cannabis Science Laboratory", tier: 1, priority: "A+", articles: [2,5], role: "co-author",
    focus: "Senior author on Spindle 2024. Planning oral limonene replication and myrcene studies. Connected to Lambert Initiative (Sydney).",
    coi: "Consultant for Jazz Pharma, Charlotte's Web, others.", email: "Via JH Cannabis Science Lab", phase: 2,
    why: "Senior author on the landmark Spindle 2024 trial. Lambert Initiative connection opens international collaboration." },
  { name: "Ethan Russo, MD", institution: "CReDO Science (CEO)", dept: "", tier: 1, priority: "A+", articles: [1,2,4,5], role: "co-author",
    focus: "Author of 'Taming THC' (2,000+ citations). Co-author Spindle 2024. Pioneer of entourage effect concept. Adviser to True Terpenes.",
    coi: "Founder/CEO of CReDO Science. Scientific adviser to True Terpenes.", email: "Via CReDO Science", phase: 1,
    why: "His name on the masthead signals legitimacy to the entire field. 'Taming THC' is the foundational text your synthesis extends." },
  { name: "Ziva Cooper, PhD", institution: "UCLA", dept: "", tier: 1, priority: "A", articles: [2,5], role: "co-author",
    focus: "R01-AT010762: Myrcene & β-caryophyllene analgesic effects alone and with THC. Opioid-sparing effects. Also studying CBG+THC.",
    coi: "NCCIH-funded (R01-AT010762).", email: "Via UCLA", phase: 3,
    why: "Running the most directly relevant active terpene trial. Her data will be real-time evidence for Article 5." },
  { name: "Jenny Wiley, PhD", institution: "RTI International", dept: "", tier: 1, priority: "A", articles: [2,5], role: "co-author",
    focus: "R01-AT010773: Preclinical evaluation of minor cannabinoids and terpenes as analgesics. 100+ cannabinoid pharmacology publications.",
    coi: "NCCIH-funded (R01-AT010773).", email: "Via RTI International", phase: 3,
    why: "Systematic terpene evaluation is directly complementary to your review." },

  // Tier 2 — NCCIH
  { name: "Sara Jane Ward, PhD", institution: "Temple University", dept: "", tier: 2, priority: "A", articles: [2,5], role: "co-author",
    focus: "CBG & β-caryophyllene in chemotherapy-induced neuropathy and orofacial pain. Sex-based differences in CNS vs PNS response.",
    coi: "NCCIH-funded.", email: "Via Temple University", phase: 3,
    why: "Sex-differentiated terpene findings add important dimension to Article 2." },
  { name: "Scott Rawls, PhD", institution: "Temple University", dept: "", tier: 2, priority: "B+", articles: [5], role: "reviewer",
    focus: "Cannabinoid-opioid interaction studies. Testing synthetic cannabinoids + morphine for additive/synergistic effects.",
    coi: "NCCIH-funded.", email: "Via Temple University", phase: 5,
    why: "Opioid-sparing research supports translational narrative." },
  { name: "Kenneth Mackie, MD", institution: "Indiana University", dept: "Addiction Neuroscience Lab", tier: 2, priority: "A", articles: [2], role: "reviewer",
    focus: "CB1/CB2 receptor mechanisms. CB2-selective agonist pain research. IUPHAR cannabinoid nomenclature contributor.",
    coi: "None known (academic).", email: "Via IU", phase: 5,
    why: "IUPHAR authority. Better positioned as sympathetic reviewer than co-author." },
  { name: "Benjamin Land, PhD", institution: "University of Washington", dept: "", tier: 2, priority: "B+", articles: [5], role: "reviewer",
    focus: "Cannabinoid-opioid interactions in chronic pain. Long-lasting cannabinoid pain relief without tolerance development.",
    coi: "NCCIH-funded.", email: "Via UW", phase: 5,
    why: "Supporting evidence for terpene-cannabinoid translational story." },
  { name: "David Sarlah, PhD", institution: "UIUC", dept: "Chemistry", tier: 2, priority: "B+", articles: [2,3], role: "advisor",
    focus: "R21-AT010761: Synthesizing rare phytocannabinoids. Testing on CB1, CB2, GPR55, and TRP channels.",
    coi: "NCCIH-funded.", email: "Via UIUC Chemistry", phase: 5,
    why: "Synthesis expertise could inform network pharmacology Article 3." },
  { name: "Kent Vrana, PhD", institution: "Penn State", dept: "Pharmacology", tier: 2, priority: "B", articles: [2], role: "reviewer",
    focus: "CBG side-chain structure and pain mechanisms. Short side-chains show anti-nociceptive effects in CIPN.",
    coi: "NCCIH-funded.", email: "Via Penn State", phase: 5,
    why: "Structure-activity relationship data relevant to Article 2." },
  { name: "Cassandra Quave, PhD", institution: "Emory University", dept: "", tier: 2, priority: "A", articles: [2,4], role: "co-author",
    focus: "R21-AT010774: Terpenes from Humulus lupulus (hops) for pain. Collaborates with Isaac Chiu (Harvard).",
    coi: "NCCIH-funded.", email: "Via Emory", phase: 3,
    why: "Hops-cannabis terpene bridge uniquely supports the unified framework thesis." },
  { name: "Isaac Chiu, PhD", institution: "Harvard Medical School", dept: "Immunology", tier: 2, priority: "A", articles: [2,3], role: "co-author",
    focus: "Hops terpene mechanisms on sensory neurons. Myrcene, α-humulene, β-caryophyllene formulations. Neuroimmunology.",
    coi: "None known (academic).", email: "Via Harvard Medical School", phase: 3,
    why: "Neuroimmune mechanism work bridges botanical and neuroscience approaches." },
  { name: "Daniele Piomelli, PhD", institution: "UC Irvine", dept: "", tier: 2, priority: "B+", articles: [2,5], role: "reviewer",
    focus: "NCCIH 2024 keynote speaker. Endocannabinoid system pioneer. Cannabis safety/efficacy.",
    coi: "None known.", email: "Via UC Irvine", phase: 5,
    why: "Senior figure better as sympathetic reviewer. Keynote at NCCIH 2024." },
  { name: "Yu-Shin Ding, PhD", institution: "NYU", dept: "", tier: 2, priority: "B", articles: [3,5], role: "advisor",
    focus: "CBD mechanisms using PET/CT imaging. CBD binding to 5-HT1A.",
    coi: "None known.", email: "Via NYU", phase: 5,
    why: "Imaging data supports Article 3 systems-level analysis." },
  { name: "Jan Frederik Stevens, PhD", institution: "Oregon State / Linus Pauling Institute", dept: "", tier: 2, priority: "B", articles: [2], role: "reviewer",
    focus: "Terpene research program at Linus Pauling Institute.",
    coi: "None known.", email: "Via Oregon State", phase: 5,
    why: "Terpene chemistry expertise." },
  { name: "Cinnamon Bidwell, PhD", institution: "University of Colorado", dept: "", tier: 2, priority: "B", articles: [5], role: "reviewer",
    focus: "Brain imaging (ERP) studies of THC and CBD effects on memory encoding and retrieval.",
    coi: "None known.", email: "Via CU Boulder", phase: 5,
    why: "Neuroimaging evidence supports translational review." },

  // Tier 3 — Adjacent Domains
  { name: "Qing Li, MD, PhD", institution: "Nippon Medical School, Tokyo", dept: "", tier: 3, priority: "A+", articles: [2,4], role: "co-author",
    focus: "Pioneer of forest bathing/shinrin-yoku. NK cell + phytoncide immunology (2006–2025). α-pinene/d-limonene inhalation & immune function.",
    coi: "None known (academic).", email: "Via Nippon Medical School", phase: 2,
    why: "Forest medicine pioneer. His NK cell/phytoncide work is the third pillar of the unified framework." },
  { name: "Mark Moss, PhD", institution: "Northumbria University, UK", dept: "", tier: 3, priority: "A", articles: [2,4], role: "co-author",
    focus: "Rosemary/1,8-cineole cognition research (2003–2025). fNIRS brain metabolism study. Ambient terpene exposure paradigm.",
    coi: "None known (academic).", email: "Via Northumbria University", phase: 4,
    why: "Bridges aromatherapy clinical evidence with terpene pharmacology." },
  { name: "Siegfried Kasper, MD", institution: "Medical University of Vienna", dept: "", tier: 3, priority: "A+", articles: [2,5], role: "co-author",
    focus: "Silexan (oral lavender/linalool) clinical trial program. Gold-standard anxiolytic RCTs. Superior to placebo, comparable to sertraline/lorazepam.",
    coi: "Silexan is a Schwabe product (potential industry tie).", email: "Via Medical University of Vienna", phase: 2,
    why: "Gold-standard RCT data bridges aromatherapy and pharma. His Silexan trials are the strongest clinical evidence for oral terpene therapeutics." },
  { name: "Sergi Ferré, PhD", institution: "NIDA/NIH Intramural", dept: "", tier: 3, priority: "A+", articles: [2,3], role: "co-author",
    focus: "A2a-CB1 heteromer architecture and signaling. Definitive structural characterization of adenosine-cannabinoid receptor complexes.",
    coi: "None (NIH intramural).", email: "Via NIDA Intramural", phase: 1,
    why: "His A2a-CB1 heteromer work provides the molecular architecture for Streicher's terpene mechanism. Critical for Article 3." },
  { name: "Antonio Kőfalvi, PhD", institution: "University of Coimbra, Portugal", dept: "", tier: 3, priority: "A", articles: [2,3], role: "advisor",
    focus: "A2a-CB1 heterotetramer characterization. Functional studies in neuronal preparations.",
    coi: "None known (academic).", email: "Via Univ. of Coimbra", phase: 4,
    why: "Heterotetramer work validates the structural basis for terpene-cannabinoid cross-talk." },
  { name: "Ester Aso, PhD", institution: "IDIBELL, Barcelona", dept: "", tier: 3, priority: "A", articles: [2,3], role: "advisor",
    focus: "Hippocampal A2a-CB1 heteromers. CBD mechanism through heteromer modulation.",
    coi: "None known (academic).", email: "Via IDIBELL", phase: 4,
    why: "CBD heteromer mechanism connects to terpene signaling." },
  { name: "Gemma Navarro, PhD", institution: "Universitat de Barcelona", dept: "Molecular Neuropharmacology", tier: 3, priority: "A", articles: [2,3], role: "co-author",
    focus: "A2A-CB2 heteromer allosteric modulation (BJP 2025). Interface-switching and allosteric gating mechanisms.",
    coi: "None known (academic).", email: "Via UB Faculty of Pharmacy", phase: 4,
    why: "2025 BJP paper on A2A-CB2 allosterism is cutting-edge. Natural co-author for Article 3." },
  { name: "Rafael Franco, PhD", institution: "Universitat de Barcelona / CIBERNED", dept: "", tier: 3, priority: "A", articles: [2,3], role: "advisor",
    focus: "GPCR heteromerization pioneer. A2A-D2 structural models. Founded much of the heteromer field.",
    coi: "None known (academic).", email: "Via UB Biochemistry", phase: 4,
    why: "Pioneer of the heteromer concept. Advisory role adds deep credibility." },
  { name: "Dasiel Borroto-Escuela, PhD", institution: "Karolinska Institutet, Stockholm", dept: "Neuroscience", tier: 3, priority: "B+", articles: [3], role: "advisor",
    focus: "GPCR heteroreceptor complexes in brain disorders. Allosteric receptor-receptor interactions.",
    coi: "None known (academic).", email: "Via Karolinska", phase: 4,
    why: "Heteroreceptor modeling expertise for Article 3." },

  // Tier 4 — Newly Identified
  { name: "Iain McGregor, PhD", institution: "University of Sydney", dept: "Lambert Initiative (Academic Director)", tier: 4, priority: "A", articles: [2], role: "advisor",
    focus: "NHMRC Principal Research Fellow. Leads Lambert Initiative. CBN sleep research, Tourette THC/CBD trial (NEJM Evidence 2024).",
    coi: "None known (academic).", email: "iain.mcgregor@sydney.edu.au", phase: 4,
    why: "Lambert's negative CB1/CB2 terpene findings actually strengthen the case for alternative mechanisms (A2a, GABAergic)." },
  { name: "Jonathon Arnold, PhD", institution: "University of Sydney", dept: "Lambert Initiative (Deputy Director)", tier: 4, priority: "A", articles: [2], role: "advisor",
    focus: "Cannabinoid pharmacology. Co-authored terpene-CB1/CB2 non-interaction findings.",
    coi: "None known (academic).", email: "jonathon.arnold@sydney.edu.au", phase: 4,
    why: "Critical counterevidence for balanced mechanistic discussion in Article 2." },
  { name: "Jürg Gertsch, PhD", institution: "University of Bern", dept: "", tier: 4, priority: "A", articles: [2], role: "advisor",
    focus: "Author of seminal β-caryophyllene CB2 paper (PNAS 2008). Endocannabinoid transporters. Co-founder Synendos Therapeutics.",
    coi: "Co-founder/SAB, Synendos Therapeutics AG.", email: "Via Univ. of Bern", phase: 4,
    why: "β-caryophyllene CB2 paper is foundational. His endorsement carries weight." },
  { name: "Cristina Sempio, PhD", institution: "UC Anschutz Medical Campus", dept: "", tier: 4, priority: "B+", articles: [2,5], role: "advisor",
    focus: "Co-author on Spindle 2024. Terpene/cannabinoid bioanalytical methods. LC-MS/MS.",
    coi: "None known.", email: "Via UC Anschutz", phase: 5,
    why: "Bioanalytical expertise for Article 2 and 5 methodology sections." },
  { name: "Lalith K. Silva, PhD", institution: "CDC / NCEH", dept: "", tier: 4, priority: "B+", articles: [2,5], role: "advisor",
    focus: "Developed validated method for quantifying 7 terpenes in human serum (HS-SPME-GC-MS/MS). ES&T 2020.",
    coi: "Government employee.", email: "lsilva@cdc.gov", phase: 5,
    why: "Bioavailability quantification is a critical gap in terpene pharmacology." },

  // Streicher Lab Alumni
  { name: "Abigail Schwarz, PhD", institution: "UA (Graduated 2024)", dept: "Streicher Lab Alumni", tier: 5, priority: "A", articles: [2], role: "co-author",
    focus: "First author on PAIN 2024 A2a mechanism paper. Characterized spinal cord A2a pathway.",
    coi: "None known.", email: "Via UA alumni network", phase: 5,
    why: "Direct bench data for Article 2. Early-career researcher motivated by publication." },
  { name: "Caleb Seekins", institution: "UA College of Medicine (MD student)", dept: "Streicher Lab Alumni", tier: 5, priority: "A", articles: [2], role: "co-author",
    focus: "First author on fibromyalgia/post-op extension (Seekins 2025). Extended A2a mechanism to additional pain models.",
    coi: "None known.", email: "Via UA College of Medicine", phase: 5,
    why: "Extension data strengthens Article 2 A2a narrative." },
  { name: "Justin LaVigne, PhD", institution: "Original 2021 paper", dept: "Streicher Lab Alumni", tier: 5, priority: "A-", articles: [2], role: "co-author",
    focus: "First author on foundational cannabimimetic terpene paper (Scientific Reports 2021).",
    coi: "None known.", email: "Via LinkedIn", phase: 5,
    why: "His 2021 paper launched the modern terpene-cannabinoid mechanism field." },
];

const PHASES = [
  { id: 1, label: "Phase 1", title: "Foundation Partners", weeks: "Weeks 1–2", color: "#1B4F72" },
  { id: 2, label: "Phase 2", title: "Clinical Evidence Anchors", weeks: "Weeks 3–4", color: "#2E86C1" },
  { id: 3, label: "Phase 3", title: "NCCIH Network", weeks: "Weeks 5–6", color: "#3498DB" },
  { id: 4, label: "Phase 4", title: "Heteromer & International", weeks: "Weeks 7–8", color: "#5DADE2" },
  { id: 5, label: "Phase 5", title: "Early Career & Reviewers", weeks: "Ongoing", color: "#85C1E9" },
];

const TIER_LABELS = { 1: "Core Terpene-Cannabinoid", 2: "NCCIH-Funded PIs", 3: "Adjacent Domains", 4: "Newly Identified", 5: "Early Career" };
const ROLE_COLORS = { "co-author": "#27AE60", "advisor": "#F39C12", "reviewer": "#8E44AD" };
const PRIORITY_COLORS = { "A+": "#C0392B", "A": "#E74C3C", "A-": "#E67E22", "B+": "#F39C12", "B": "#95A5A6" };

// ── Components ────────────────────────────────────────────────────────────────

function PriorityBadge({ priority }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 12, fontWeight: 700,
      background: PRIORITY_COLORS[priority] || "#ccc", color: "#fff" }}>
      {priority}
    </span>
  );
}

function RoleBadge({ role }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
      background: ROLE_COLORS[role] || "#ccc", color: "#fff", textTransform: "capitalize" }}>
      {role}
    </span>
  );
}

function ArticlePill({ id }) {
  const a = ARTICLES.find(x => x.id === id);
  const colors = { 1: "#1B4F72", 2: "#C0392B", 3: "#8E44AD", 4: "#27AE60", 5: "#E67E22" };
  return (
    <span title={a?.journal} style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 11,
      fontWeight: 600, background: colors[id] || "#888", color: "#fff", marginRight: 4, marginBottom: 2, cursor: "default" }}>
      Art. {id}
    </span>
  );
}

function ResearcherCard({ r, expanded, onToggle }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 10,
      boxShadow: expanded ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
      <div onClick={onToggle} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#9CA3AF", flexShrink: 0 }}>
          {expanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1F2937" }}>{r.name}</span>
            <PriorityBadge priority={r.priority}/>
            <RoleBadge role={r.role}/>
          </div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
            {r.institution}{r.dept ? ` · ${r.dept}` : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {r.articles.map(id => <ArticlePill key={id} id={id}/>)}
        </div>
      </div>
      {expanded && (
        <div style={{ padding: "0 18px 16px 46px", fontSize: 14, lineHeight: 1.6 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>Research Focus</div>
              <div style={{ color: "#374151" }}>{r.focus}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>Why This Researcher</div>
              <div style={{ color: "#374151" }}>{r.why}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>Contact</div>
              <div style={{ color: "#2563EB", fontSize: 13 }}>{r.email}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>COI Status</div>
              <div style={{ color: r.coi.startsWith("None") ? "#10B981" : "#F59E0B", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                {r.coi.startsWith("None") ? <CheckCircle size={13}/> : <AlertTriangle size={13}/>}
                {r.coi}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>Outreach Phase</div>
              <div style={{ fontSize: 13 }}>
                <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: PHASES[r.phase - 1].color, color: "#fff" }}>
                  {PHASES[r.phase - 1].label}
                </span>
                {" "}{PHASES[r.phase - 1].title} ({PHASES[r.phase - 1].weeks})
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", border: "1px solid #E5E7EB",
      display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}18`, display: "flex",
        alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#1F2937" }}>{value}</div>
        <div style={{ fontSize: 12, color: "#6B7280" }}>{label}</div>
      </div>
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: "2px solid #E5E7EB", marginBottom: 20, overflowX: "auto" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ padding: "10px 18px", fontSize: 14, fontWeight: active === t.id ? 700 : 500,
            color: active === t.id ? "#1B4F72" : "#6B7280", background: "none", border: "none", cursor: "pointer",
            borderBottom: active === t.id ? "2px solid #1B4F72" : "2px solid transparent",
            marginBottom: -2, whiteSpace: "nowrap", transition: "all 0.15s" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState(0);
  const [articleFilter, setArticleFilter] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [expanded, setExpanded] = useState({});

  const toggle = (name) => setExpanded(e => ({ ...e, [name]: !e[name] }));

  const filtered = useMemo(() => {
    let list = RESEARCHERS;
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(s) ||
        r.institution.toLowerCase().includes(s) ||
        r.focus.toLowerCase().includes(s) ||
        r.why.toLowerCase().includes(s)
      );
    }
    if (tierFilter) list = list.filter(r => r.tier === tierFilter);
    if (articleFilter) list = list.filter(r => r.articles.includes(articleFilter));
    if (roleFilter) list = list.filter(r => r.role === roleFilter);
    return list;
  }, [search, tierFilter, articleFilter, roleFilter]);

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "researchers", label: "All Researchers" },
    { id: "articles", label: "Article Mapping" },
    { id: "outreach", label: "Outreach Plan" },
    { id: "coi", label: "COI Analysis" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4F72, #2E86C1)", color: "#fff", padding: "28px 32px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>Researcher Target List & Outreach Strategy</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.85 }}>Unified Terpene Pharmacology Publication Series · Charles Pelletier-Gagné · Feb 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ marginTop: -1 }}>
          <TabBar tabs={tabs} active={tab} onChange={setTab}/>
        </div>

        {/* ── Dashboard ─────────────────────────────────────────── */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
              <StatCard icon={<Users size={20}/>} value={RESEARCHERS.length} label="Total Researchers" color="#1B4F72"/>
              <StatCard icon={<Star size={20}/>} value={RESEARCHERS.filter(r => r.priority === "A+" || r.priority === "A").length} label="High Priority (A/A+)" color="#C0392B"/>
              <StatCard icon={<BookOpen size={20}/>} value="5" label="Planned Articles" color="#8E44AD"/>
              <StatCard icon={<Clock size={20}/>} value="5" label="Outreach Phases" color="#E67E22"/>
            </div>

            {/* Tier breakdown */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 12 }}>By Tier</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 24 }}>
              {Object.entries(TIER_LABELS).map(([t, label]) => {
                const count = RESEARCHERS.filter(r => r.tier === Number(t)).length;
                return (
                  <div key={t} onClick={() => { setTierFilter(Number(t)); setTab("researchers"); }}
                    style={{ background: "#fff", borderRadius: 8, padding: "12px 16px", border: "1px solid #E5E7EB",
                      cursor: "pointer", transition: "transform 0.1s" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Tier {t}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#1B4F72" }}>{count}</div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Role distribution */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 12 }}>By Recommended Role</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {["co-author", "advisor", "reviewer"].map(role => {
                const count = RESEARCHERS.filter(r => r.role === role).length;
                return (
                  <div key={role} onClick={() => { setRoleFilter(role); setTab("researchers"); }}
                    style={{ background: "#fff", borderRadius: 8, padding: "12px 20px", border: "1px solid #E5E7EB",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                    <RoleBadge role={role}/>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#1F2937" }}>{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Phase 1 priority list */}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 12 }}>Phase 1 Targets (Start Here)</h3>
            {RESEARCHERS.filter(r => r.phase === 1).map(r => (
              <ResearcherCard key={r.name} r={r} expanded={expanded[r.name]} onToggle={() => toggle(r.name)}/>
            ))}
          </div>
        )}

        {/* ── All Researchers ────────────────────────────────────── */}
        {tab === "researchers" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: "1 1 260px" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 11, color: "#9CA3AF" }}/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search researchers, institutions, topics..."
                  style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 8, border: "1px solid #D1D5DB",
                    fontSize: 14, outline: "none", boxSizing: "border-box" }}/>
              </div>
              <select value={tierFilter} onChange={e => setTierFilter(Number(e.target.value))}
                style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff" }}>
                <option value={0}>All Tiers</option>
                {Object.entries(TIER_LABELS).map(([t, l]) => <option key={t} value={t}>Tier {t}: {l}</option>)}
              </select>
              <select value={articleFilter} onChange={e => setArticleFilter(Number(e.target.value))}
                style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff" }}>
                <option value={0}>All Articles</option>
                {ARTICLES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
                style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff" }}>
                <option value="">All Roles</option>
                <option value="co-author">Co-Author</option>
                <option value="advisor">Advisor</option>
                <option value="reviewer">Reviewer</option>
              </select>
              {(search || tierFilter || articleFilter || roleFilter) && (
                <button onClick={() => { setSearch(""); setTierFilter(0); setArticleFilter(0); setRoleFilter(""); }}
                  style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13,
                    background: "#FEF2F2", color: "#DC2626", cursor: "pointer", fontWeight: 600 }}>
                  Clear Filters
                </button>
              )}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
              Showing {filtered.length} of {RESEARCHERS.length} researchers
            </div>
            {filtered.map(r => (
              <ResearcherCard key={r.name} r={r} expanded={expanded[r.name]} onToggle={() => toggle(r.name)}/>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF" }}>
                <XCircle size={32} style={{ marginBottom: 8 }}/>
                <div>No researchers match your filters.</div>
              </div>
            )}
          </div>
        )}

        {/* ── Article Mapping ────────────────────────────────────── */}
        {tab === "articles" && (
          <div>
            {ARTICLES.map(a => {
              const matching = RESEARCHERS.filter(r => r.articles.includes(a.id));
              const coauthors = matching.filter(r => r.role === "co-author");
              const advisors = matching.filter(r => r.role === "advisor");
              const reviewers = matching.filter(r => r.role === "reviewer");
              return (
                <div key={a.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB",
                  marginBottom: 16, overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #F3F4F6",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ArticlePill id={a.id}/>
                        <span style={{ fontWeight: 700, fontSize: 16, color: "#1F2937" }}>{a.journal}</span>
                        <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 8, fontWeight: 600,
                          background: a.status === "Submitted" ? "#D1FAE5" : a.status === "In Progress" ? "#FEF3C7" : "#E5E7EB",
                          color: a.status === "Submitted" ? "#065F46" : a.status === "In Progress" ? "#92400E" : "#374151" }}>
                          {a.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{a.desc}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#9CA3AF" }}>{matching.length} researchers mapped</div>
                  </div>
                  <div style={{ padding: "12px 20px" }}>
                    {[["Co-Authors", coauthors], ["Advisors", advisors], ["Reviewers", reviewers]].map(([label, list]) =>
                      list.length > 0 && (
                        <div key={label} style={{ marginBottom: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {list.sort((a,b) => {
                              const ord = {"A+":0,"A":1,"A-":2,"B+":3,"B":4};
                              return (ord[a.priority]??5) - (ord[b.priority]??5);
                            }).map(r => (
                              <span key={r.name} style={{ display: "inline-flex", alignItems: "center", gap: 6,
                                padding: "4px 10px", borderRadius: 8, background: "#F9FAFB", border: "1px solid #E5E7EB", fontSize: 13 }}>
                                <PriorityBadge priority={r.priority}/>
                                <span style={{ fontWeight: 600 }}>{r.name.split(",")[0]}</span>
                                <span style={{ color: "#9CA3AF", fontSize: 11 }}>{r.institution.split(",")[0]}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Outreach Plan ──────────────────────────────────────── */}
        {tab === "outreach" && (
          <div>
            {PHASES.map(ph => {
              const phaseResearchers = RESEARCHERS.filter(r => r.phase === ph.id);
              return (
                <div key={ph.id} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: ph.color, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                      {ph.id}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: "#1F2937" }}>{ph.title}</div>
                      <div style={{ fontSize: 13, color: "#6B7280" }}>{ph.weeks} · {phaseResearchers.length} targets</div>
                    </div>
                  </div>
                  {phaseResearchers.map(r => (
                    <ResearcherCard key={r.name} r={r} expanded={expanded[r.name]} onToggle={() => toggle(r.name)}/>
                  ))}
                </div>
              );
            })}

            {/* Email templates summary */}
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", padding: 20, marginTop: 24 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "#1F2937" }}>Outreach Templates</h3>
              {[
                { label: "Template A: Tier 1 Co-Author Request", desc: "Lead with evidence base, request 30-min call, offer co-authorship on specific article." },
                { label: "Template B: NCCIH Network", desc: "Reference June 4, 2024 presentation, highlight how their work informs the synthesis." },
                { label: "Template C: International Researcher", desc: "Emphasize cross-disciplinary recognition, position their field as underappreciated in cannabis circles." },
              ].map((t, i) => (
                <div key={i} style={{ padding: "10px 14px", background: i % 2 === 0 ? "#F9FAFB" : "#fff",
                  borderRadius: 6, marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1B4F72" }}>{t.label}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COI Analysis ───────────────────────────────────────── */}
        {tab === "coi" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <CheckCircle size={18} color="#10B981"/>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1F2937" }}>Low/No COI</span>
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>Preferred for reviewer suggestions</div>
                {RESEARCHERS.filter(r => r.coi.startsWith("None")).map(r => (
                  <div key={r.name} style={{ padding: "6px 0", fontSize: 13, display: "flex", alignItems: "center", gap: 6,
                    borderBottom: "1px solid #F3F4F6" }}>
                    <span style={{ fontWeight: 600 }}>{r.name.split(",")[0]}</span>
                    <span style={{ color: "#9CA3AF" }}>({r.institution.split(",")[0]})</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <AlertTriangle size={18} color="#F59E0B"/>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#1F2937" }}>Industry Ties (Requires Disclosure)</span>
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>Not disqualifying, but must be declared</div>
                {RESEARCHERS.filter(r => !r.coi.startsWith("None")).map(r => (
                  <div key={r.name} style={{ padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
                    <div style={{ fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{r.name.split(",")[0]}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#92400E", marginTop: 2 }}>{r.coi}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

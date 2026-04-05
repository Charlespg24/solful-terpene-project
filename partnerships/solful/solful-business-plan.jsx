import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA
// ============================================================

const COLORS = {
  forest: "#2D6A4F",
  gold: "#8B6914",
  wine: "#7B2D8E",
  ember: "#C0392B",
  ocean: "#2980B9",
  amber: "#D4860B",
  cream: "#FAF6ED",
  lightForest: "#f0f7f2",
  lightWine: "#f5f0f8",
  lightEmber: "#fdf2f0",
  lightOcean: "#eef4fa",
  lightAmber: "#fdf8ef",
  bg: "#fafaf7",
  text: "#1a1a1a",
  muted: "#666",
  border: "#e8e4dd",
};

const SECTIONS = [
  { id: "exec", label: "Executive Summary", icon: "◆" },
  { id: "founder", label: "Founder", icon: "◇" },
  { id: "innovation", label: "The Innovation", icon: "⬡" },
  { id: "research", label: "Research Strategy", icon: "⊡" },
  { id: "market", label: "Market Analysis", icon: "◈" },
  { id: "competitive", label: "Competitive Landscape", icon: "⊞" },
  { id: "products", label: "Products & Services", icon: "▣" },
  { id: "gtm", label: "Go-to-Market Strategy", icon: "▷" },
  { id: "stakeholders", label: "Stakeholder Map", icon: "⊕" },
  { id: "ip", label: "IP & Patent Strategy", icon: "⊗" },
  { id: "financials", label: "Revenue Model", icon: "◉" },
  { id: "milestones", label: "Milestones", icon: "◎" },
  { id: "risks", label: "Risk Analysis", icon: "⊘" },
];

const MARKET_DATA = [
  { label: "US Cannabis", value: "$47B", growth: "14.5% CAGR", year: "2026" },
  { label: "US Essential Oils", value: "$7.5B", growth: "6.4% CAGR", year: "2025" },
  { label: "Global Terpenes", value: "$1.6B", growth: "9.5% CAGR", year: "2025" },
  { label: "Sports Wellness", value: "+37%", growth: "unit vol. growth", year: "2025" },
];

// ============================================================
// EXPANDED PATENT FAMILIES (from patent-strategy-complete.jsx)
// ============================================================

const PATENT_FAMILIES = [
  {
    family: "A", title: "The Pre-Loading Method", claims: "1–14", claimCount: 14, type: "Method",
    color: COLORS.gold, bg: COLORS.cream,
    independent: "Breathing a strain-matched terpene blend before consuming cannabis to prime your receptor systems — producing a pharmacologically different experience than just smoking alone.",
    legal: "A method for enhancing the pharmacological effects of cannabis consumption through terpene pre-loading, comprising: obtaining terpene data from lab analysis, generating a strain-matched blend from non-cannabis terpene sources, administering via inhalation during a pre-loading window prior to consumption, wherein the pre-loading modulates subsequent cannabinoid pharmacology.",
    dependents: [
      { n: "2–3", what: "Time windows", desc: "Broad range (5–60 min) and sweet spot (10–30 min). Competitor pre-loading for 8 min or 45 min is still inside the claim." },
      { n: "4", what: "A2a-CB1 heteromer mechanism", desc: "Specifies the receptor system: terpenes activate A2a, which allosterically changes the coupled CB1 receptor before THC arrives." },
      { n: "5", what: "Measurable modulation outcomes", desc: "Altered onset, changed intensity, less anxiety, more pain relief, different duration, better ratio of desired vs. undesired effects." },
      { n: "6", what: "Terpene list", desc: "10 key terpenes: β-caryophyllene, limonene, linalool, myrcene, pinene, humulene, terpinolene, bisabolol, ocimene, cineole." },
      { n: "7–8", what: "Essential oil preferred embodiment", desc: "ISO-standardized essential oils and the 18-oil library. Preferred version — independent claim is broader." },
      { n: "9", what: "Delivery devices", desc: "Passive diffuser, ultrasonic nebulizer, heat-based device, or personal nasal inhaler." },
      { n: "10–12", what: "Music integration", desc: "Strain-matched playlist via terpene-to-audio translation (tempo, energy, valence, danceability), including the iso principle." },
      { n: "13", what: "Beverage pairing", desc: "Terpene-matched drink recipe using culinary botanicals with the same terpene compounds." },
      { n: "14", what: "Breathwork protocol", desc: "Breathwork sequence calibrated to the dominant terpene's arousal profile." },
    ],
    protects: ["Solful EO blends", "La Séance events", "Vibe Curator app timer", "Any dispensary pre-loading product", "Clinical trial methodology"],
    bizLines: ["solful", "pharma"],
  },
  {
    family: "B", title: "The Matching Engine", claims: "15–22", claimCount: 8, type: "System",
    color: COLORS.forest, bg: COLORS.lightForest,
    independent: "A computer system that takes lab data from a cannabis strain and automatically generates a terpene blend recipe — selecting oils, calculating drop counts, and producing a physical product or machine instructions.",
    legal: "A computerized system comprising: processor, storage, terpene profile input from lab database, terpene source composition database query, matching algorithm generating formulations within specified tolerance, pre-loading protocol generation, and producing at least one of: human-readable recipe, machine-executable blending instructions, diffuser activation commands, or physical blend product.",
    dependents: [
      { n: "16", what: "Multisensory extension", desc: "Adds music, beverage, environmental, and breathwork outputs. Turns a calculator into the Vibe Curator platform." },
      { n: "17", what: "Validation algorithm", desc: "System checks its own work — compares generated blend's terpene ratio to target and iteratively adjusts." },
      { n: "18", what: "Weighted audio targets", desc: "Music module translates each terpene into weighted Spotify parameters proportional to profile percentage." },
      { n: "19", what: "Mobile / web / kiosk UI", desc: "Phone app, website, or in-store dispensary screen." },
      { n: "20", what: "Inventory integration", desc: "Auto-generates new blend recipes when a dispensary adds new strains. Scalability mechanism." },
      { n: "21–22", what: "Connected diffuser hardware", desc: "Controls a physical diffuser — timing, intensity, duration — synchronized with music and session timers. Makes the system patent §101-safe." },
    ],
    protects: ["Vibe Curator app", "Any COA-to-blend calculator", "Dispensary kiosk systems", "White-label licensing", "Connected diffuser products"],
    bizLines: ["solful", "wellness"],
  },
  {
    family: "C", title: "Non-Cannabis State Modulation", claims: "23–30", claimCount: 8, type: "Method",
    color: COLORS.wine, bg: COLORS.lightWine,
    independent: "Choosing a target mental state — activation, calm focus, sedation, recovery, or social engagement — and breathing a pharmacologically formulated terpene blend to achieve it. No cannabis involved.",
    legal: "A method for modulating a user's physiological state through targeted terpene inhalation, comprising: selecting a target state from predefined set, retrieving a terpene blend formulation from a database, administering via inhalation, and optionally providing coordinated multisensory outputs.",
    dependents: [
      { n: "24", what: "Time window", desc: "10–30 minute preferred period." },
      { n: "25", what: "Activation state", desc: "α-Pinene + 1,8-cineole for acetylcholinesterase inhibition. The 'get sharp' blend." },
      { n: "26", what: "Calm focus state", desc: "d-Limonene for selective anxiolysis without sedation. The 'calm but sharp' blend." },
      { n: "27", what: "Recovery state", desc: "Linalool (GABA-A) + β-caryophyllene (CB2 anti-inflammatory). The 'wind down' blend." },
      { n: "28", what: "Athletic context", desc: "Pre-competition, mid-competition, and post-competition settings." },
      { n: "29", what: "Music integration", desc: "Playlist generated from the terpene blend's pharmacological profile." },
      { n: "30", what: "Beverage pairing", desc: "Terpene-matched drink using the same botanical compounds." },
    ],
    protects: ["Corporate focus blends", "Wellness studio products", "Yoga/meditation offerings", "Any non-cannabis terpene state-modulation product"],
    bizLines: ["wellness"],
  },
  {
    family: "D", title: "Sports Method-of-Treatment", claims: "31–39", claimCount: 9, type: "3 Independent Methods",
    color: COLORS.ember, bg: COLORS.lightEmber,
    independent: "Three separate patented methods, each tying a specific terpene formulation to a specific measurable outcome. These are the claims a sports team's lawyers would want to see before signing a deal.",
    legal: "Three independent claims: (31) enhancing pre-competition cognitive readiness via α-pinene + 1,8-cineole for AChE inhibition; (34) promoting parasympathetic recovery via linalool + β-caryophyllene for GABA-A/CB2; (37) reducing performance anxiety without sedation via d-limonene A2a agonism.",
    dependents: [
      { n: "32", what: "Activation blend specifics", desc: "Rosemary oil and peppermint oil. The locker room blend." },
      { n: "33", what: "Delivery + setting", desc: "Personal nasal inhaler in locker room, warm-up area, or athletic facility." },
      { n: "35", what: "Recovery timing", desc: "Administration within 30 minutes of stopping physical exertion." },
      { n: "36", what: "Recovery blend specifics", desc: "Lavender oil and black pepper oil. The post-game blend." },
      { n: "38", what: "Anxiety blend specifics", desc: "Bergamot or sweet orange oil for limonene delivery. The halftime blend." },
      { n: "39", what: "Expanded contexts", desc: "Musical performances, theatrical performances, public speaking, academic examinations." },
    ],
    protects: ["Sports team partnerships", "Athletic product lines", "Performance anxiety products", "Public speaking / stage fright products", "Exam prep products"],
    bizLines: ["wellness", "pharma"],
  },
  {
    family: "E", title: "Cannabis-Matched Compositions", claims: "40–43", claimCount: 4, type: "Composition of Matter",
    color: COLORS.amber, bg: COLORS.lightAmber,
    independent: "The physical blend itself — 2+ terpene sources from non-cannabis botanicals, in a 1–10mL batch, with a terpene ratio matching a specific cannabis cultivar within 15% tolerance, formulated for diffuser delivery. Protects the product, not just how you use it.",
    legal: "A terpene blend composition for receptor priming, comprising: two or more terpene sources from non-cannabis botanical origins, total batch volume 1–10 mL, terpene ratio profile approximating a specified cultivar within 15% deviation, formulated for inhalation via diffuser device.",
    dependents: [
      { n: "41", what: "Preferred format", desc: "ISO-standardized essential oils, 2mL volume, 30–50 drops. The actual bottle on the shelf at Solful." },
      { n: "42", what: "Packaging + protocol", desc: "Includes pre-loading instructions in packaging. The card that comes with the bottle." },
      { n: "43", what: "Connected experience", desc: "Packaging with QR code linking to strain-matched playlist and beverage recipe." },
    ],
    protects: ["Solful blend bottles", "Any strain-matched EO product", "White-label dispensary blends", "Pharmaceutical-grade terpene formulations"],
    bizLines: ["solful", "pharma"],
  },
  {
    family: "F", title: "Wellness Compositions", claims: "44", claimCount: 1, type: "Composition of Matter",
    color: COLORS.ocean, bg: COLORS.lightOcean,
    independent: "Physical terpene blends for state modulation with NO cannabis association. Four predefined formulations: activation (pinene + cineole), calm focus (limonene), sedation (myrcene + linalool), recovery (linalool + caryophyllene). Clean IP for the wellness market.",
    legal: "A terpene blend composition for targeted physiological state modulation, comprising: two or more non-cannabis terpene sources, 1–10mL volume, terpene profile from predefined effect-targeted set, formulated for inhalation, not associated with any cannabis cultivar.",
    dependents: [],
    protects: ["Sports product line", "Corporate wellness products", "Gym/studio retail", "DTC wellness brand", "Any effect-targeted terpene product without cannabis"],
    bizLines: ["wellness"],
  },
];

// ============================================================
// EXPANDED PRODUCTS DATA
// ============================================================

const PRODUCTS = {
  solful: [
    {
      name: "Strain-Matched EO Blend Bottles",
      desc: "2mL glass roller bottles containing 30–50 drops of ISO-standardized essential oils precisely formulated to match a specific cannabis cultivar's terpene ratio profile within 15% tolerance. Each bottle includes a terpene profile card with pre-loading instructions and QR code linking to the Vibe Curator digital companion.",
      pricing: "$35–55 per bottle (single strain) · $120–180 for curated 3-pack",
      packaging: "Amber glass with custom label showing strain name, terpene ratio chart, farm origin, and energy tier (HIGH/MEDIUM/LOW)",
      channel: "Dispensary retail (primary), DTC via website, La Séance events",
      claims: "Family A (method), Family B (matching engine), Family E (composition)",
      margin: "~85% gross",
    },
    {
      name: "La Séance Experiential Events",
      desc: "Curated 2–3 hour immersive terpene pre-loading experiences. Attendees receive a strain-matched EO blend, go through a guided 20-minute pre-loading ritual with breathwork, consume the matched cannabis strain, then experience a coordinated playlist and terpene-paired beverage in a designed sensory environment. Limited to 20–40 guests per event for intimacy.",
      pricing: "$75 General · $150 VIP (includes take-home EO kit + beverage pairing book excerpt)",
      packaging: "Venue partnerships with La Séance brand. Each event themed around 2–3 strains from a featured farm.",
      channel: "Ticketed events in Sonoma/SF (Phase 1), touring pop-ups in LA/Portland/Denver (Phase 2)",
      claims: "Family A (pre-loading method), Family B (matching + music), Family E (compositions)",
      margin: "~65% after venue/product costs",
    },
    {
      name: "Vibe Curator App",
      desc: "Web and mobile app. Enter a strain name or scan a COA barcode → receive your strain-matched EO recipe (drop counts per oil), a Spotify playlist generated from terpene-to-audio translation, a matched beverage recipe, and a guided pre-loading timer with breathwork cues. Free tier includes strain lookup and basic recipe. Premium unlocks full playlists, custom blend builder, session history, and connected diffuser control.",
      pricing: "Free tier · $9.99/mo premium · $79.99/year",
      packaging: "PWA (Progressive Web App) for instant access, native iOS/Android in Phase 2",
      channel: "Organic via dispensary QR codes, SEO, cannabis media, app stores",
      claims: "Family B (matching engine + multisensory), Family A (pre-loading timer)",
      margin: "~90% on subscriptions (software margins)",
    },
    {
      name: "Dispensary White-Label Program",
      desc: "Turn-key program for dispensary chains: Solful's matching engine generates custom EO blends for their top 5–10 selling strains, co-branded with the dispensary's logo. Includes in-store display, budtender training materials, and QR-linked digital experience. Revenue share or flat monthly licensing fee.",
      pricing: "$500–2,000/mo per location (volume-dependent) + per-bottle wholesale ($12–18/unit)",
      packaging: "Co-branded bottles, countertop display, training deck, and marketing collateral",
      channel: "Direct B2B sales to dispensary owners/chains",
      claims: "Family B (system), Family E (compositions), Family A (method embedded in packaging)",
      margin: "~95% on licensing; ~70% on wholesale bottles",
    },
    {
      name: "Terpene Beverage Recipe Book",
      desc: "Physical and digital cookbook: 24 strains × 5 beverage categories = 120 terpene-matched recipes. Each recipe maps botanical ingredients to specific terpenes shared with the cannabis strain. Categories: mocktails, cocktails, juices/smoothies, herbal teas, wellness shots. Includes terpene education, strain profiles, and essential oil recipe for each strain.",
      pricing: "$34.99 hardcover · $19.99 digital · licensing to hospitality brands",
      packaging: "Coffee-table quality hardcover with full-color photography. Digital version on Vibe Curator app.",
      channel: "DTC, dispensary retail, Amazon, bookstores, hospitality licensing",
      claims: "Family A (claim 13 — beverage pairing), Family B (claim 16 — multisensory)",
      margin: "~60% on direct sales; ~80% on digital; variable on licensing",
    },
  ],
  wellness: [
    {
      name: "Performance Nasal Inhalers",
      desc: "Personal inhaler sticks containing concentrated terpene blends for four target states. Designed for discreet, on-the-go use. No cannabis association. All GRAS essential oils. Four SKUs: ACTIVATE (rosemary + peppermint — α-pinene + 1,8-cineole for cognitive sharpness), FOCUS (bergamot + sweet orange — d-limonene for calm alertness), RECOVER (lavender + black pepper — linalool + β-caryophyllene for anti-inflammatory wind-down), SLEEP (lavender + lemongrass — linalool + myrcene for GABA-A modulation).",
      pricing: "$25–40 per inhaler · $89 for complete 4-pack",
      packaging: "Aluminum inhaler tubes with medical-grade cotton wicks. Clean, minimal branding. Color-coded by state.",
      channel: "DTC website (primary), yoga studios, gyms, corporate wellness, Amazon",
      claims: "Family C (non-cannabis method), Family D (sports claims 31–39), Family F (wellness composition)",
      margin: "~82% gross",
    },
    {
      name: "Studio & Gym Wholesale Program",
      desc: "Bulk wholesale for yoga studios, breathwork facilitators, meditation centers, and boutique gyms. Studios purchase at wholesale and either resell or include in class packages. Includes branded display stands and practitioner education materials explaining the pharmacological basis.",
      pricing: "Wholesale: $12–18/inhaler (50% off retail) · Minimum order: 24 units",
      packaging: "Counter display with educational cards. Co-marketing materials available.",
      channel: "Direct B2B outreach to studio owners, wellness trade shows, yoga teacher networks",
      claims: "Family C (method), Family F (composition)",
      margin: "~65% on wholesale",
    },
    {
      name: "Corporate Wellness Packages",
      desc: "Packaged programs for companies seeking non-pharmaceutical stress management and focus solutions. Includes bulk inhaler orders, on-site breathwork workshops, and a quarterly terpene education seminar. Positioned as an alternative to meditation apps — pharmacologically active instead of passive.",
      pricing: "$2,500–10,000 per quarterly package (scaled by headcount)",
      packaging: "Branded starter kits for employees, workshop facilitation guide, ROI measurement framework",
      channel: "Direct sales to HR/wellness leads, corporate wellness platforms, benefits brokers",
      claims: "Family C (method), Family F (composition)",
      margin: "~75%",
    },
    {
      name: "Sports Team Partnerships",
      desc: "Custom terpene programs for professional and collegiate athletic teams. Three product SKUs mapped to athletic phases: PRE-GAME (activation via AChE inhibition), HALFTIME (anxiety reduction via A2a agonism), POST-GAME (recovery via GABA-A/CB2). Each partnership includes custom formulation consulting, team-branded inhalers, and quarterly efficacy tracking. Positioned as the legal, WADA-compliant performance enhancement that sits next to the ice bath, not the supplement shelf.",
      pricing: "$15,000–50,000/season per team (tier-dependent) · Per-inhaler wholesale for team stores",
      packaging: "Team-branded inhalers. Private-label with team colors and logo. Custom formulations per sport.",
      channel: "Direct outreach to team doctors, athletic trainers, and performance directors. Conference presence at NSCA, ACSM.",
      claims: "Family D (sports method-of-treatment, claims 31–39), Family F (wellness composition)",
      margin: "~80% on licensing; ~70% on product",
    },
  ],
  pharma: [
    {
      name: "Pre-Loading Method Licensing",
      desc: "License the patented terpene pre-loading method (Family A) to pharmaceutical companies for clinical trials investigating terpene-enhanced cannabinoid therapy. Primary target: opioid-sparing analgesia using terpene pre-loading to modulate cannabinoid pain pathways. No clinical trial of purified terpene blends for pain management exists globally — this is a first-mover licensing opportunity.",
      pricing: "Upfront licensing fee ($50K–250K) + milestone payments + royalties (3–8% of product revenue)",
      packaging: "IP license agreement, formulation data package, suggested clinical trial protocol",
      channel: "Direct to pharma/biotech companies with cannabinoid programs. Patent attorney introductions.",
      claims: "Family A (method), Family B (matching algorithm), Family E (compositions)",
      margin: "~95% (IP licensing)",
    },
    {
      name: "Clinical Trial Design Consulting",
      desc: "Consulting engagements to design terpene pre-loading clinical trials. Includes: recommended terpene formulations based on target indication, pre-loading protocol specification, outcome measure selection, and dose-response guidance informed by the matching algorithm and published evidence base.",
      pricing: "$25,000–100,000 per engagement",
      packaging: "Consulting retainer with defined deliverables",
      channel: "Referrals from patent licensing conversations, academic collaborations, conference presentations",
      claims: "All 6 families (foundational IP)",
      margin: "~90%",
    },
    {
      name: "Algorithm & Data Licensing",
      desc: "License the matching engine algorithm and terpene-essential oil composition database to research institutions, diagnostic companies, or cannabis testing laboratories developing terpene-based products or tools.",
      pricing: "Annual license: $10,000–50,000 (academic) · $50,000–200,000 (commercial)",
      packaging: "API access or data package with documentation",
      channel: "Academic partnerships, cannabis testing lab relationships, biotech conferences",
      claims: "Family B (system)",
      margin: "~95%",
    },
  ],
};

// ============================================================
// EXPANDED REVENUE PROJECTIONS
// ============================================================

const REVENUE_DETAIL = [
  {
    year: "Year 1 (2026)", total: "$150K – $400K", color: COLORS.gold, note: "Proof of concept. Revenue validates model; metrics validate patent.",
    lines: [
      { product: "EO Blend Bottles", units: "800–2,000", price: "$35–55", rev: "$28K–110K", note: "Launch with 5–8 strains at 1–2 dispensary partners + DTC" },
      { product: "La Séance Events", units: "6–10 events", price: "$5K–15K net", rev: "$30K–150K", note: "20–40 guests per event at $75–150/ticket + product sales" },
      { product: "Vibe Curator App", units: "500–2,000 users", price: "Free/freemium", rev: "$0–5K", note: "Building user base. Revenue from premium in Q4" },
      { product: "Wellness Inhalers (DTC)", units: "200–800", price: "$25–40", rev: "$5K–32K", note: "Q3 launch. Testing messaging and channel mix" },
      { product: "Beverage Book", units: "Pre-orders", price: "$35", rev: "$0–5K", note: "Pre-order campaign starts Q4" },
      { product: "White-Label Pilot", units: "0–1 partner", price: "$500–1K/mo", rev: "$0–6K", note: "First dispensary partnership if traction warrants" },
    ],
  },
  {
    year: "Year 2 (2027)", total: "$500K – $1.5M", color: COLORS.forest, note: "Expansion. Non-provisional filed. Revenue diversifies across all three business lines.",
    lines: [
      { product: "EO Blend Bottles", units: "3,000–8,000", price: "$35–55", rev: "$105K–440K", note: "3–5 dispensary partners + growing DTC. 24 strain catalog." },
      { product: "La Séance Events", units: "12–18 events", price: "$8K–20K net", rev: "$96K–360K", note: "Expand to LA, Portland, Denver. Higher-ticket VIP tiers." },
      { product: "Vibe Curator App", units: "2K–8K premium", price: "$9.99/mo", rev: "$24K–96K", note: "Premium conversions from dispensary QR code funnel" },
      { product: "Wellness Inhalers", units: "2,000–6,000", price: "$25–40", rev: "$50K–240K", note: "Studio/gym wholesale + DTC. 4 SKUs established." },
      { product: "Dispensary White-Label", units: "3–8 partners", price: "$750–2K/mo", rev: "$27K–192K", note: "Recurring SaaS-like revenue. Co-branded blends." },
      { product: "Sports Team Pilots", units: "1–2 teams", price: "$15K–30K", rev: "$15K–60K", note: "First partnerships. Data collection for efficacy claims." },
      { product: "Beverage Book", units: "500–2,000", price: "$35", rev: "$18K–70K", note: "Published Q1 2027. DTC + dispensary + Amazon." },
      { product: "Corporate Wellness", units: "1–3 companies", price: "$2.5K–10K/qtr", rev: "$10K–30K", note: "First B2B wellness clients" },
    ],
  },
  {
    year: "Year 3 (2028)", total: "$2M – $5M+", color: COLORS.wine, note: "Scale & licensing. IP portfolio becomes the primary value driver.",
    lines: [
      { product: "EO Blend Bottles", units: "10K–25K", price: "$35–55", rev: "$350K–1.4M", note: "National dispensary distribution. Catalog of 40+ strains." },
      { product: "La Séance Events", units: "20–30 events", price: "$10K–25K net", rev: "$200K–750K", note: "Touring franchise model. Venue partnerships in 6+ cities." },
      { product: "Vibe Curator App", units: "10K–25K premium", price: "$9.99/mo", rev: "$120K–300K", note: "Dispensary POS integrations. Connected diffuser." },
      { product: "Wellness Inhalers", units: "8K–20K", price: "$25–40", rev: "$200K–800K", note: "Amazon launch. National gym/studio distribution." },
      { product: "Dispensary White-Label", units: "10–25 partners", price: "$1K–2K/mo", rev: "$120K–600K", note: "Multi-state operators. Recurring revenue engine." },
      { product: "Sports Teams", units: "3–8 teams", price: "$20K–50K/season", rev: "$60K–400K", note: "Portfolio approach. Case studies drive inbound." },
      { product: "Pharma Licensing", units: "1–2 deals", price: "$50K–250K upfront", rev: "$50K–500K", note: "First licensing conversations convert. Milestone payments." },
      { product: "Corporate Wellness", units: "5–15 companies", price: "$5K–10K/qtr", rev: "$100K–600K", note: "HR benefits channel established." },
      { product: "Beverage Book + Licensing", units: "2K–5K + licensing", price: "$35 + variable", rev: "$70K–250K", note: "Hospitality licensing (hotels, restaurants). International editions." },
    ],
  },
];

// ============================================================
// RESEARCH PAPERS DATA
// ============================================================

const RESEARCH_PAPERS = [
  {
    num: 1,
    title: "Terpene Pre-Loading: A Cross-Botanical Framework for Enhancing Cannabinoid Pharmacology",
    journal: "British Journal of Pharmacology (BJP)",
    type: "Hypothesis & Theory",
    status: "Submitted February 15, 2026",
    statusColor: COLORS.forest,
    author: "Charles Pelletier-Gagné",
    specs: "~11,500 words · 4 figures · 3 tables · 75 references",
    summary: "The primary hypothesis paper. Proposes terpene pre-loading as a translational application of the entourage effect, grounded in A2a-CB1 heteromeric receptor pharmacology. Includes 8 falsifiable predictions designed to be testable in clinical settings. This is the paper that establishes the intellectual framework.",
    reviewers: [
      "Prof. John M. Streicher (University of Arizona — terpene analgesia)",
      "Dr. Tory R. Spindle (Johns Hopkins — human terpene-cannabinoid trial)",
      "Prof. Mark Moss (Northumbria — rosemary/cognition aromatherapy)",
      "Prof. Jürg Gertsch (University of Bern — β-caryophyllene/CB2 discovery)",
    ],
  },
  {
    num: 2,
    title: "Unified Terpene Pharmacology: A Comprehensive Evidence Base",
    journal: "Target: Phytomedicine Plus or Frontiers in Pharmacology",
    type: "Comprehensive Evidence Review",
    status: "In preparation",
    statusColor: COLORS.amber,
    author: "Charles Pelletier-Gagné",
    specs: "~15,000 words · systematic evidence compilation",
    summary: "Organizes the complete evidence base by individual terpene rather than by essential oil or field. Covers β-caryophyllene, d-limonene, linalool, α-pinene, myrcene, 1,8-cineole, and α-humulene across all three research traditions. Resolves the 1937 disciplinary split with a unified pharmacological framework.",
    reviewers: [],
  },
  {
    num: 3,
    title: "Unified Terpene Pharmacology: Bridging Aromatherapy, Cannabis Science, and Forest Medicine",
    journal: "Pharmacological Reviews (ASPET)",
    type: "Comprehensive Review Article",
    status: "Pre-submission inquiry submitted February 2026",
    statusColor: COLORS.gold,
    author: "Charles Pelletier-Gagné",
    specs: "~24,000 words · 5 figures · 9 tables · 90+ references · 9 sections",
    summary: "The magnum opus. Nine substantive sections covering receptor pharmacology, inhalation pharmacokinetics, aromatherapy RCTs, entourage effect mechanisms, forest bathing immunology, A2a-CB1 heteromer architecture, network pharmacology, funding landscape, and the 1937 historical analysis. If BJP is the hypothesis, Pharmacological Reviews is the evidence.",
    reviewers: [],
    sections: [
      "Terpene Receptor Pharmacology (quantitative binding data)",
      "Inhalation Pharmacokinetics (3 delivery pathways, BBB penetration)",
      "Aromatherapy RCTs (organized by terpene, incl. Silexan program)",
      "Entourage Effect: Concept to Mechanism (Mechoulam through Schwarz 2024)",
      "Forest Bathing Immunology (NK cells, cytokine modulation)",
      "A2a-CB1 Heteromer as Molecular Substrate",
      "Network Pharmacology Framework",
      "Funding Landscape (NCCIH, Johns Hopkins BPRU, CA DCC)",
      "The 1937 Coincidence (historical analysis)",
    ],
  },
];

const STAKEHOLDERS = [
  { name: "Dispensary Partners", role: "Distribution & validation", example: "Solful (SF), local Sonoma dispensaries", priority: "HIGH", phase: "Phase 1" },
  { name: "La Séance", role: "Launch venue & brand partner", example: "4/20 soft launch event", priority: "HIGH", phase: "Phase 1" },
  { name: "Cannabis Consumers", role: "Early adopters & evangelists", example: "Sonoma/SF premium cannabis consumers", priority: "HIGH", phase: "Phase 1" },
  { name: "Craft Cannabis Farms", role: "Strain sourcing & COA data", example: "14 farms across 5 NorCal counties", priority: "HIGH", phase: "Phase 1" },
  { name: "Wellness Studios", role: "Non-cannabis channel", example: "Yoga studios, breathwork facilitators", priority: "MEDIUM", phase: "Phase 2" },
  { name: "Sports Teams", role: "High-value licensing", example: "MLS, NBA G-League, college athletics", priority: "MEDIUM", phase: "Phase 2" },
  { name: "Investors / Advisors", role: "Funding & strategic guidance", example: "Cannabis VCs, wellness angels", priority: "MEDIUM", phase: "Phase 2" },
  { name: "Pharma Partners", role: "Clinical trial licensing", example: "Opioid-sparing pain research programs", priority: "LOW", phase: "Phase 3" },
  { name: "Regulators", role: "Compliance & pathway clarity", example: "FDA (GRAS), CA DCC, state cannabis boards", priority: "ONGOING", phase: "All" },
];

const MILESTONES = [
  { date: "Mar 2026", event: "Provisional patent filed (44 claims, 6 families)", status: "imminent", phase: 1 },
  { date: "Apr 20, 2026", event: "Soft launch at La Séance — first public terpene pre-loading experience", status: "imminent", phase: 1 },
  { date: "Q2 2026", event: "First dispensary partnership live (Solful SF or Sonoma retailer)", status: "upcoming", phase: 1 },
  { date: "Q2 2026", event: "Vibe Curator app MVP (strain lookup → blend recipe → playlist)", status: "upcoming", phase: 1 },
  { date: "Q3 2026", event: "Wellness inhaler line launch (4 non-cannabis blends via DTC)", status: "upcoming", phase: 2 },
  { date: "Q3 2026", event: "First sports team pilot conversation", status: "upcoming", phase: 2 },
  { date: "Q4 2026", event: "Beverage recipe book published / licensed", status: "upcoming", phase: 2 },
  { date: "Q1 2027", event: "Articles published (BJP, Pharmacological Reviews)", status: "planned", phase: 2 },
  { date: "Mar 2027", event: "Non-provisional patent filed (convert provisional, add data)", status: "planned", phase: 3 },
  { date: "Q2 2027", event: "PCT international filing preserving global rights", status: "planned", phase: 3 },
  { date: "2027–28", event: "First pharma licensing conversation / clinical trial partnership", status: "planned", phase: 3 },
];

const RISKS = [
  { risk: "Patent not granted or claims narrowed", mitigation: "Provisional establishes priority date; 44 claims across 6 families provides redundancy; composition-of-matter claims (E, F) are strongest category; connected hardware claim (21–22) anchors §101 eligibility", severity: "MEDIUM" },
  { risk: "FDA GRAS pathway changes (NPRM Oct 2025)", mitigation: "Current products use existing GRAS-recognized essential oils; monitor proposed rulemaking; no novel food ingredients required", severity: "LOW" },
  { risk: "Sonoma cannabis price compression", mitigation: "Business model is terpene products, not flower cultivation; price compression increases demand for value-added differentiation", severity: "LOW" },
  { risk: "Competitor replicates approach", mitigation: "Patent pending status; first-mover advantage; scientific publication creates citation moat; recipe library is proprietary", severity: "MEDIUM" },
  { risk: "Consumer skepticism about terpene efficacy", mitigation: "2024 breakthrough studies (Schwarz, Spindle) provide clinical evidence; experiential events create try-before-you-buy; dispensary staff education program", severity: "MEDIUM" },
  { risk: "State regulatory divergence", mitigation: "Essential oil products avoid cannabis scheduling entirely; wellness line has zero cannabis regulatory exposure; California is most mature market", severity: "LOW" },
  { risk: "Single-founder risk", mitigation: "IP documented in patent and publications; algorithm is codified; recipe book is written; advisory board planned for Q3 2026", severity: "HIGH" },
];

// ============================================================
// UTILITY COMPONENTS
// ============================================================

function FadeIn({ children, delay = 0 }) {
  const [v, setV] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(18px)", transition: `all 0.55s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHeader({ id, icon, title, subtitle }) {
  return (
    <div id={id} style={{ marginBottom: 32, paddingTop: 80 }}>
      <div style={{ fontSize: 13, letterSpacing: 3, color: COLORS.gold, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>{icon} {title}</div>
      {subtitle && <p style={{ fontSize: 17, color: COLORS.muted, marginTop: 4, lineHeight: 1.6, maxWidth: 700 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "28px 32px", marginBottom: 20, borderLeft: accent ? `4px solid ${accent}` : undefined, ...style }}>
      {children}
    </div>
  );
}

function StatBox({ label, value, sub, color = COLORS.forest }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 16px" }}>
      <div style={{ fontSize: 32, fontWeight: 700, color, fontFamily: "'Georgia', serif" }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Pill({ text, color }) {
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: color + "18", color, marginRight: 6, marginBottom: 4 }}>{text}</span>
  );
}

// ============================================================
// MAIN SECTIONS
// ============================================================

function ExecSummary() {
  return (
    <FadeIn>
      <SectionHeader id="exec" icon="◆" title="Executive Summary" />
      <Card accent={COLORS.forest}>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: COLORS.text, fontFamily: "'Georgia', serif" }}>
          Solful Sessions is a terpene science company that bridges three historically separated research traditions — cannabis pharmacology, clinical aromatherapy, and forest bathing immunology — into a unified platform for enhancing human experience through precision terpene formulation.
        </p>
        <div style={{ height: 1, background: COLORS.border, margin: "24px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          <StatBox label="Patent Claims" value="44" sub="across 6 families" color={COLORS.gold} />
          <StatBox label="Strain Recipes" value="24" sub="with 120 beverage pairings" color={COLORS.forest} />
          <StatBox label="Business Lines" value="3" sub="cannabis · wellness · pharma" color={COLORS.wine} />
          <StatBox label="Filing Cost" value="$320" sub="micro-entity provisional" color={COLORS.ember} />
        </div>
        <div style={{ height: 1, background: COLORS.border, margin: "24px 0" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>THE CORE INSIGHT</h4>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text }}>
              Cannabis flower delivers terpenes at 100–10,000× below pharmacologically active doses. Essential oils deliver the same molecules at 20–950× higher concentrations. A β-caryophyllene molecule doesn't care if it comes from a joint or a pepper grinder — the receptor only sees the molecular shape.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>THE TIMING INNOVATION</h4>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text }}>
              Pre-loading — breathing a strain-matched terpene blend 15–30 minutes before cannabis — primes receptor systems via A2a-CB1 heteromeric crosstalk. Terpenes before THC is pharmacologically different from terpenes with THC. Sequence matters.
            </p>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

function FounderSection() {
  return (
    <FadeIn>
      <SectionHeader id="founder" icon="◇" title="Founder" subtitle="Charles Pelletier-Gagné · Sebastopol, California" />
      <Card accent={COLORS.forest}>
        <p style={{ fontSize: 16, lineHeight: 1.8, fontFamily: "'Georgia', serif" }}>
          A pattern runs through every chapter of this founder's career: join before launch, build the revenue engine from zero, scale through personal execution, and create enough value to drive an exit. Solful Sessions is the same pattern applied to a proprietary scientific framework.
        </p>
      </Card>

      {/* Career Timeline */}
      <div style={{ position: "relative", paddingLeft: 28, marginBottom: 20 }}>
        {[
          {
            period: "Age 15–19 · Quebec Cold-Press Juice Startup",
            color: COLORS.forest,
            items: [
              "Joined at 15 before the company launched to market — the first cold-pressed juices in all of Quebec.",
              "Became sales team director at 17. Hired and trained the sales team at 18.",
              "At 19, tasked with running a 9-month road show at Costco to prove sales numbers and consumer demand. Personally ran in-store demos, tracked daily metrics, and built the case for permanent shelf placement.",
              "Result: product added to Costco shelves as a permanent offering — a milestone that directly targeted the company's acquisition.",
              "Simultaneously opened a new product line into Montreal's café and restaurant market: cold-calling owners, visiting locations for live demos with their customers, and getting order forms signed on the spot.",
              "This business growth contributed to the company's acquisition.",
            ],
          },
          {
            period: "2021–2024 · Funden (Employee #1 → Director of Sales → Acquisition)",
            color: COLORS.gold,
            items: [
              "Hired as the first employee in 2021 at a startup with no sales function.",
              "Built the entire sales operation from scratch — hired and trained the sales team, developed the outbound playbook, and built the lead generation funnels.",
              "Promoted to Director of Partnerships and Sales Manager in Year 2. Dual role: managing the team while continuing as the top-performing individual contributor.",
              "Personally generated over $1M in realized revenue — 40% of the company's total revenue — as an IC.",
              "Company acquired by a PE firm after 2 years. The revenue traction and sales infrastructure were central to the acquisition thesis.",
              "Stayed on as Director of Sales for 1 year post-acquisition, hired by the PE firm that acquired Funden to lead the sales organization through the integration.",
            ],
          },
          {
            period: "2024–Present · Deel Immigration (Account Executive)",
            color: COLORS.wine,
            items: [
              "Joined Deel after the successful Funden exit — originally as a client. Obtained his own U.S. green card through Deel's immigration services.",
              "Now an Account Executive helping immigrant founders apply for O-1A and EB-1A talent-based visas.",
              "Uses AI tools to help clients improve their profiles and become more qualified for extraordinary ability visas.",
              "The immigration expertise provides direct insight into the founder/startup ecosystem — understanding what makes founders extraordinary is both the day job and the Solful Sessions thesis.",
            ],
          },
        ].map((era, ei) => (
          <div key={ei} style={{ marginBottom: 24, position: "relative" }}>
            <div style={{ position: "absolute", left: -28, top: 4, width: 12, height: 12, borderRadius: "50%", background: era.color, border: "2px solid #fff" }} />
            {ei < 2 && <div style={{ position: "absolute", left: -23, top: 16, width: 2, height: "calc(100% + 12px)", background: COLORS.border }} />}
            <div style={{ fontSize: 14, fontWeight: 600, color: era.color, marginBottom: 8 }}>{era.period}</div>
            {era.items.map((item, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.muted, marginBottom: 6, paddingLeft: 12, borderLeft: `2px solid ${era.color}15` }}>{item}</p>
            ))}
          </div>
        ))}
      </div>

      <Card style={{ background: COLORS.cream }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>WHY THIS BACKGROUND MATTERS</h4>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          The go-to-market for Solful Sessions requires explaining complex pharmacology to dispensary owners, sports team managers, wellness studio operators, and eventually pharma executives. That's a sales motion, not a lab motion. The founder has spent a decade doing exactly this — translating complex value propositions into signed deals, from Costco buyers to PE-backed acquisition targets. The juice startup to Funden to Deel arc is the same muscle applied to increasingly sophisticated products. Solful Sessions is the most sophisticated yet.
        </p>
      </Card>
    </FadeIn>
  );
}

function Innovation() {
  return (
    <FadeIn>
      <SectionHeader id="innovation" icon="⬡" title="The Innovation" subtitle="Three interlocking inventions protected by a single provisional patent application" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { num: "01", title: "The Pre-Loading Method", color: COLORS.gold, text: "Temporally sequenced inhalation of strain-matched terpene blends 15–30 min before cannabis. Primes A2a-CB1 heteromeric complexes via three parallel pathways: olfactory-limbic (seconds), trigeminal-autonomic (1–2 min), pulmonary-systemic (5–20 min)." },
          { num: "02", title: "The Matching Engine", color: COLORS.forest, text: "Algorithm ingests COA lab data, extracts terpene ratios, queries an essential oil composition database (18 ISO-standardized oils), and outputs a precise blend recipe — drop counts, batch volume, pharmacological rationale — within 15% terpene ratio tolerance." },
          { num: "03", title: "Multisensory Curation", color: COLORS.wine, text: "Extends terpene matching to music (Spotify parameters derived from shared neurochemistry), beverages (120 recipes across 5 categories), lighting, breathwork, and environmental design — all calibrated to the strain's pharmacological profile." },
        ].map((item, i) => (
          <Card key={i} accent={item.color}>
            <div style={{ fontSize: 28, fontWeight: 700, color: item.color, fontFamily: "'Georgia', serif", marginBottom: 8 }}>{item.num}</div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{item.title}</h4>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.muted }}>{item.text}</p>
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 16, background: COLORS.cream }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 12 }}>KEY 2024–2025 SCIENTIFIC BREAKTHROUGHS</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { cite: "Schwarz et al., 2024 (PAIN)", finding: "Five cannabis terpenes produce analgesia equivalent to morphine via adenosine A2a receptors — not CB1/CB2. Validated the A2a mechanism central to the patent." },
            { cite: "Spindle et al., 2024 (Drug & Alcohol Dep.)", finding: "d-Limonene dose-dependently attenuates THC-induced anxiety without affecting the high, cognition, or pharmacokinetics. First controlled human trial." },
            { cite: "Alayoubi et al., 2025", finding: "Myrcene produces dose-dependent analgesia in neuropathic pain; CB1-independent, consistent with A2a pathway." },
            { cite: "LaVigne et al., 2021 (Scientific Reports)", finding: "α-Humulene, geraniol, linalool, and β-pinene activate CB1 receptors. First experimental entourage effect evidence. 108 citations." },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.gold, marginBottom: 4 }}>{s.cite}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: COLORS.text }}>{s.finding}</p>
            </div>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}

function ResearchStrategy() {
  return (
    <FadeIn>
      <SectionHeader id="research" icon="⊡" title="Research & Publication Strategy" subtitle="Three manuscripts establishing the scientific framework — timed to file after the patent" />
      <Card style={{ background: COLORS.cream, marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>PUBLICATION ↔ PATENT INTERLOCK</h4>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          The provisional patent must be filed before any manuscript is published. Without the filing, the inventor's own publications become prior art against the patent. With the filing, every paper published afterward reinforces the IP: it creates a citation moat (the framework becomes what others must cite), establishes the inventor as the domain authority, and generates the academic validation that pharma licensing conversations require. The sequence is: file patent (March) → publish papers (Q1 2027) → convert to non-provisional with additional data (March 2027).
        </p>
      </Card>

      {RESEARCH_PAPERS.map((paper, i) => (
        <Card key={i} accent={paper.statusColor} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>ARTICLE {paper.num}</div>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginTop: 4, maxWidth: 600, lineHeight: 1.4 }}>{paper.title}</h4>
            </div>
            <Pill text={paper.status} color={paper.statusColor} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 2 }}>TARGET JOURNAL</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{paper.journal}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 2 }}>TYPE</div>
              <div style={{ fontSize: 13 }}>{paper.type}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 2 }}>AUTHOR</div>
              <div style={{ fontSize: 13 }}>{paper.author}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 2 }}>SPECIFICATIONS</div>
              <div style={{ fontSize: 13 }}>{paper.specs}</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: COLORS.muted }}>{paper.summary}</p>
          {paper.reviewers.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 6 }}>SUGGESTED REVIEWERS</div>
              {paper.reviewers.map((r, j) => (
                <div key={j} style={{ fontSize: 12, color: COLORS.text, marginBottom: 3, paddingLeft: 10, borderLeft: `2px solid ${paper.statusColor}20` }}>{r}</div>
              ))}
            </div>
          )}
          {paper.sections && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 6 }}>NINE SECTIONS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                {paper.sections.map((s, j) => (
                  <div key={j} style={{ fontSize: 12, color: COLORS.muted, paddingLeft: 10, borderLeft: `2px solid ${paper.statusColor}15` }}>{j + 1}. {s}</div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </FadeIn>
  );
}

function MarketAnalysis() {
  return (
    <FadeIn>
      <SectionHeader id="market" icon="◈" title="Market Analysis" subtitle="Solful Sessions sits at the intersection of three large, growing markets" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 10, marginBottom: 20 }}>
        {MARKET_DATA.map((m, i) => (
          <div key={i} style={{ padding: "24px 16px", textAlign: "center", borderRight: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.forest, fontFamily: "'Georgia', serif" }}>{m.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>{m.growth} · {m.year}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card accent={COLORS.forest}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.forest, marginBottom: 10 }}>TAM / SAM / SOM</h4>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            <p><strong>TAM:</strong> $56B+ combined (cannabis $47B + EO $7.5B + terpenes $1.6B).</p>
            <p style={{ marginTop: 8 }}><strong>SAM:</strong> ~$2.4B. Premium cannabis consumers seeking curated experiences + wellness consumers seeking pharmacological precision.</p>
            <p style={{ marginTop: 8 }}><strong>SOM (Y1):</strong> $150K–$400K. Sonoma/SF dispensaries, La Séance events, DTC, initial wellness line.</p>
          </div>
        </Card>
        <Card accent={COLORS.gold}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 10 }}>CONSUMER TRENDS</h4>
          <div style={{ fontSize: 14, lineHeight: 1.8 }}>
            <p><strong>Premiumization:</strong> Over 60% choosing organic/artisan cannabis. Dispensaries listing terpene profiles on menus.</p>
            <p style={{ marginTop: 8 }}><strong>Personalization:</strong> Terpene awareness at all-time high. Consumers selecting by effect profile, not strain name.</p>
            <p style={{ marginTop: 8 }}><strong>Wellness crossover:</strong> Functional blending, cannabis-infused fine dining. Sophistication over stoner culture.</p>
          </div>
        </Card>
      </div>
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 10 }}>REGULATORY LANDSCAPE</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <div><Pill text="TAILWIND" color={COLORS.forest} /><p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>Essential oils are FDA GRAS (21 CFR Part 182). Wellness line faces zero cannabis regulatory exposure.</p></div>
          <div><Pill text="MONITOR" color={COLORS.amber} /><p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>FDA proposing GRAS pathway changes (NPRM Oct 2025). Current products use existing GRAS oils.</p></div>
          <div><Pill text="NAVIGATE" color={COLORS.ember} /><p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>Federal hemp redefinition (Nov 2026). Cross-botanical sourcing avoids Schedule I entirely.</p></div>
        </div>
      </Card>
    </FadeIn>
  );
}

function CompetitiveLandscape() {
  const competitors = [
    { name: "Abstrax Tech", type: "Terpene Supplier", threat: "LOW", note: "Analyzes 400+ compounds, Inc. 5000 (#627). Supplies profiles, not consumer products or experiences." },
    { name: "True Terpenes", type: "Terpene Supplier", threat: "LOW", note: "Budget isolates for vape formulation. No matching, no pre-loading." },
    { name: "Eybna", type: "Formulator", threat: "MEDIUM", note: "Israeli R&D. Cannabis additives, not cross-botanical or temporal sequencing." },
    { name: "Dispensary Brands", type: "Experience", threat: "LOW", note: "Mood-based selection only. No supplementation or EO blends." },
    { name: "EO MLMs", type: "Aromatherapy", threat: "NONE", note: "Generic wellness. No cannabis, no pharmacological precision." },
  ];
  return (
    <FadeIn>
      <SectionHeader id="competitive" icon="⊞" title="Competitive Landscape" subtitle="No incumbent combines strain-matched EO blends + temporal pre-loading + multisensory curation" />
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 3fr", gap: 0, fontSize: 12, fontWeight: 600, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 10, marginBottom: 8 }}>
          <div>COMPANY</div><div>CATEGORY</div><div>THREAT</div><div>ANALYSIS</div>
        </div>
        {competitors.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 3fr", gap: 0, fontSize: 14, padding: "12px 0", borderBottom: i < competitors.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ color: COLORS.muted }}>{c.type}</div>
            <div><Pill text={c.threat} color={c.threat === "NONE" ? COLORS.forest : c.threat === "LOW" ? COLORS.ocean : COLORS.amber} /></div>
            <div style={{ lineHeight: 1.5, color: COLORS.muted }}>{c.note}</div>
          </div>
        ))}
      </Card>
      <Card accent={COLORS.forest} style={{ background: COLORS.lightForest }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.forest, marginBottom: 8 }}>DEFENSIBLE MOAT</h4>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          Three claim types form a cage: <strong>method</strong> (how you use it), <strong>system</strong> (what the software does), and <strong>composition</strong> (the physical product). A competitor can't practice the method, build the system, or sell the product without a license. Published scientific articles create a citation moat on top of the IP moat.
        </p>
      </Card>
    </FadeIn>
  );
}

function ProductsServices() {
  const lines = [
    { id: "solful", name: "Solful Sessions", icon: "🌿", color: COLORS.forest, bg: COLORS.lightForest, tagline: "Cannabis Experience Curation", tam: "$47B US cannabis", claims: "Families A, B, E" },
    { id: "wellness", name: "Sports & Wellness", icon: "⚡", color: COLORS.ember, bg: COLORS.lightEmber, tagline: "Performance State Modulation", tam: "$7.5B aromatherapy", claims: "Families C, D, F" },
    { id: "pharma", name: "Pharma & Clinical", icon: "💊", color: COLORS.wine, bg: COLORS.lightWine, tagline: "Clinical Translation Pipeline", tam: "Opioid-sparing therapeutics", claims: "All 6 families" },
  ];

  return (
    <FadeIn>
      <SectionHeader id="products" icon="▣" title="Products & Service Lines" subtitle="Three business lines with detailed product catalogs, each protected by specific patent claim families" />
      {lines.map((biz, bi) => (
        <div key={bi} style={{ marginBottom: 32 }}>
          <Card accent={biz.color} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 24, marginRight: 8 }}>{biz.icon}</span>
                <span style={{ fontSize: 20, fontWeight: 600 }}>{biz.name}</span>
                <span style={{ fontSize: 13, color: biz.color, fontWeight: 600, marginLeft: 12 }}>{biz.tagline}</span>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, color: COLORS.muted }}>
                <div>{biz.tam}</div>
                <div style={{ fontWeight: 600, color: biz.color }}>{biz.claims}</div>
              </div>
            </div>
          </Card>
          {PRODUCTS[biz.id].map((prod, pi) => (
            <Card key={pi} style={{ marginBottom: 8, marginLeft: 16 }}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{prod.name}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: COLORS.muted, marginBottom: 12 }}>{prod.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "PRICING", value: prod.pricing },
                  { label: "DISTRIBUTION", value: prod.channel },
                  { label: "PACKAGING", value: prod.packaging },
                  { label: "PATENT PROTECTION", value: prod.claims },
                ].map((field, fi) => (
                  <div key={fi}>
                    <div style={{ fontSize: 10, color: COLORS.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>{field.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.5, color: COLORS.text }}>{field.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: biz.color, fontWeight: 600 }}>Gross margin: {prod.margin}</div>
            </Card>
          ))}
        </div>
      ))}
    </FadeIn>
  );
}

function GTMStrategy() {
  const phases = [
    { phase: "PHASE 1 · Foundation", date: "Mar – Jun 2026", color: COLORS.gold, items: [
      { title: "Patent Filed", desc: "Provisional patent (44 claims) establishing 'patent pending' status and priority date before any publication.", date: "Mid-March" },
      { title: "La Séance Soft Launch", desc: "First public terpene pre-loading experience. Full protocol: EO blend → 20-min pre-load → strain consumption → matched playlist + beverage.", date: "April 20" },
      { title: "Dispensary Pilot", desc: "First retail partnership. 3–5 strain-matched EO blends with QR codes linking to Vibe Curator.", date: "May–June" },
      { title: "Vibe Curator MVP", desc: "Web app: enter strain → get EO recipe, Spotify playlist, beverage pairing.", date: "Q2" },
    ]},
    { phase: "PHASE 2 · Expansion", date: "Jul – Dec 2026", color: COLORS.forest, items: [
      { title: "Wellness Line Launch", desc: "Four non-cannabis blends sold DTC and through yoga studios, gyms, corporate wellness.", date: "Q3" },
      { title: "Sports Outreach", desc: "Pilot conversations with MLS, NBA G-League, college athletics. Patent-backed data + GRAS simplicity.", date: "Q3–Q4" },
      { title: "Dispensary Scale", desc: "White-label program for chains. Co-branded blends matched to top-selling strains.", date: "Q4" },
      { title: "Beverage Book", desc: "120-recipe terpene beverage pairing book published/licensed.", date: "Q4" },
    ]},
    { phase: "PHASE 3 · Moat & Scale", date: "2027+", color: COLORS.wine, items: [
      { title: "Non-Provisional Patent", desc: "Convert provisional with additional data from events and pilots.", date: "Mar 2027" },
      { title: "PCT International", desc: "Preserve rights in EU, Canada, Israel, Australia.", date: "Q2 2027" },
      { title: "Pharma Licensing", desc: "License method and algorithm for clinical trials. Target: opioid-sparing analgesia.", date: "2027–28" },
      { title: "Platform Revenue", desc: "Dispensary integrations, sports dashboards, connected diffuser hardware.", date: "2027+" },
    ]},
  ];
  return (
    <FadeIn>
      <SectionHeader id="gtm" icon="▷" title="Go-to-Market Strategy" subtitle="Three phases: Foundation → Expansion → Moat & Scale" />
      {phases.map((phase, pi) => (
        <div key={pi} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ padding: "6px 14px", background: phase.color, color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{phase.phase}</div>
            <div style={{ fontSize: 14, color: COLORS.muted }}>{phase.date}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {phase.items.map((item, i) => (
              <Card key={i} style={{ marginBottom: 0 }}>
                <div style={{ fontSize: 11, color: phase.color, fontWeight: 600, marginBottom: 4 }}>{item.date}</div>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: COLORS.muted }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </FadeIn>
  );
}

function StakeholderMap() {
  return (
    <FadeIn>
      <SectionHeader id="stakeholders" icon="⊕" title="Stakeholder Map" />
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 1fr 1fr", gap: 0, fontSize: 11, fontWeight: 600, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 10, letterSpacing: 1 }}>
          <div>STAKEHOLDER</div><div>ROLE</div><div>EXAMPLE</div><div>PRIORITY</div><div>PHASE</div>
        </div>
        {STAKEHOLDERS.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 1fr 1fr", gap: 0, fontSize: 13, padding: "14px 0", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center" }}>
            <div style={{ fontWeight: 600 }}>{s.name}</div>
            <div style={{ color: COLORS.muted }}>{s.role}</div>
            <div style={{ color: COLORS.muted }}>{s.example}</div>
            <div><Pill text={s.priority} color={s.priority === "HIGH" ? COLORS.ember : s.priority === "MEDIUM" ? COLORS.amber : s.priority === "ONGOING" ? COLORS.ocean : COLORS.forest} /></div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>{s.phase}</div>
          </div>
        ))}
      </Card>
    </FadeIn>
  );
}

function IPStrategy() {
  return (
    <FadeIn>
      <SectionHeader id="ip" icon="⊗" title="IP & Patent Strategy" subtitle="Provisional Patent CPG-2026-PROV-001 · 44 claims · 6 families · 8 independent · 3 claim types" />

      {/* Overview stats */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center", marginBottom: 16 }}>
          <StatBox label="Total Claims" value="44" color={COLORS.gold} />
          <StatBox label="Independent" value="8" color={COLORS.forest} />
          <StatBox label="Families" value="6" color={COLORS.wine} />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {[{ label: "30 Method", color: COLORS.gold, flex: 30 }, { label: "8 System", color: COLORS.forest, flex: 8 }, { label: "6 Composition", color: COLORS.amber, flex: 6 }].map((t, i) => (
            <div key={i} style={{ flex: t.flex, height: 8, borderRadius: 4, background: t.color, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ label: "30 Method claims", color: COLORS.gold }, { label: "8 System claims", color: COLORS.forest }, { label: "6 Composition claims", color: COLORS.amber }].map((t, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: t.color }}>{t.label}</span>
          ))}
        </div>
      </Card>

      {/* The Cage explanation */}
      <Card style={{ background: COLORS.cream, marginBottom: 16 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.gold, marginBottom: 8 }}>THREE TYPES FORM A CAGE</h4>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          <strong style={{ color: COLORS.gold }}>Method claims</strong> (what you do) — a competitor can't practice the pre-loading protocol without a license. <strong style={{ color: COLORS.forest }}>System claims</strong> (what the software does) — a competitor can't build a COA-to-blend calculator without a license. <strong style={{ color: COLORS.amber }}>Composition claims</strong> (the physical product) — a competitor can't sell a strain-matched essential oil blend without a license. Together they form a complete cage: you can't practice it, build it, or sell it.
        </p>
      </Card>

      {/* Patent family cards */}
      {PATENT_FAMILIES.map((pf, i) => (
        <Card key={i} accent={pf.color} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: pf.color }}>FAMILY {pf.family}</span>
              <span style={{ fontSize: 12, color: COLORS.muted, marginLeft: 8 }}>Claims {pf.claims} · {pf.type}</span>
            </div>
            <span style={{ fontSize: 12, color: COLORS.muted }}>{pf.claimCount} claims</span>
          </div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{pf.title}</h4>

          {/* Independent claim */}
          <div style={{ padding: "12px 14px", borderRadius: 8, background: pf.color + "08", borderLeft: `3px solid ${pf.color}`, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 4 }}>INDEPENDENT CLAIM — PLAIN LANGUAGE</div>
            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{pf.independent}</p>
          </div>

          {/* Dependents */}
          {pf.dependents.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 6 }}>DEPENDENT CLAIMS — LAYERS OF PROTECTION</div>
              {pf.dependents.map((dep, di) => (
                <div key={di} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: di < pf.dependents.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: pf.color, minWidth: 40 }}>§{dep.n}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{dep.what}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>{dep.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* What it protects */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {pf.protects.map((p, pi) => (
              <span key={pi} style={{ fontSize: 10, color: pf.color, background: pf.color + "0C", border: `1px solid ${pf.color}20`, borderRadius: 5, padding: "3px 8px" }}>{p}</span>
            ))}
          </div>
        </Card>
      ))}

      {/* IP Timeline */}
      <Card style={{ marginTop: 16 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>IP TIMELINE</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { date: "Mar 2026", event: "Provisional filed", detail: "Priority date. Patent pending. $320." },
            { date: "Q1 2027", event: "Articles published", detail: "BJP + PharmRev. Citation moat." },
            { date: "Mar 2027", event: "Non-provisional", detail: "Convert with event/pilot data." },
            { date: "Q2 2027", event: "PCT international", detail: "EU, Canada, Israel, Australia." },
          ].map((t, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.gold }}>{t.date}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{t.event}</div>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: COLORS.muted, marginTop: 4 }}>{t.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}

function RevenueModel() {
  return (
    <FadeIn>
      <SectionHeader id="financials" icon="◉" title="Revenue Model" subtitle="Product-level projections across Years 1–3" />
      {REVENUE_DETAIL.map((year, yi) => (
        <div key={yi} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ padding: "6px 14px", background: year.color, color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{year.year}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, fontFamily: "'Georgia', serif" }}>{year.total}</div>
          </div>
          <p style={{ fontSize: 13, color: year.color, fontStyle: "italic", marginBottom: 12 }}>{year.note}</p>
          <Card style={{ marginBottom: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr 3fr", gap: 0, fontSize: 11, fontWeight: 600, color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8, marginBottom: 4 }}>
              <div>PRODUCT</div><div>UNITS</div><div>PRICE</div><div>REVENUE</div><div>NOTES</div>
            </div>
            {year.lines.map((line, li) => (
              <div key={li} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.5fr 3fr", gap: 0, fontSize: 12, padding: "8px 0", borderBottom: li < year.lines.length - 1 ? `1px solid ${COLORS.border}` : "none", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{line.product}</div>
                <div style={{ color: COLORS.muted }}>{line.units}</div>
                <div style={{ color: COLORS.muted }}>{line.price}</div>
                <div style={{ fontWeight: 600, color: year.color }}>{line.rev}</div>
                <div style={{ color: COLORS.muted, lineHeight: 1.4 }}>{line.note}</div>
              </div>
            ))}
          </Card>
        </div>
      ))}

      {/* Unit Economics */}
      <Card>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 10 }}>UNIT ECONOMICS</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {[
            { product: "EO Blend Bottle", cost: "$4–8", price: "$35–55", margin: "~85%" },
            { product: "La Séance Ticket", cost: "$20–35", price: "$75–150", margin: "~65%" },
            { product: "Wellness Inhaler", cost: "$3–6", price: "$25–40", margin: "~82%" },
            { product: "White-Label License", cost: "Negligible", price: "$500–2K/mo", margin: "~95%" },
            { product: "Pharma License", cost: "Legal fees", price: "$50K–250K", margin: "~95%" },
          ].map((u, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{u.product}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>COGS: {u.cost}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>Price: {u.price}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.forest, marginTop: 4 }}>{u.margin}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ background: COLORS.lightForest }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: COLORS.forest, marginBottom: 8 }}>FUNDING APPROACH</h4>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          Bootstrap through Year 1 using event revenue and DTC sales. The $320 provisional patent is the single highest-leverage investment. Evaluate fundraising in Year 2 based on traction. "44 claims, 8 independent, patent pending, revenue generating" is a fundable answer. The patent portfolio, published research, and revenue metrics create a fundable package.
        </p>
      </Card>
    </FadeIn>
  );
}

function MilestonesSection() {
  return (
    <FadeIn>
      <SectionHeader id="milestones" icon="◎" title="Milestones" />
      <Card>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          {MILESTONES.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, position: "relative" }}>
              <div style={{ position: "absolute", left: -24, width: 12, height: 12, borderRadius: "50%", background: m.status === "imminent" ? COLORS.ember : m.status === "upcoming" ? COLORS.gold : COLORS.muted, border: "2px solid #fff", top: 4 }} />
              {i < MILESTONES.length - 1 && <div style={{ position: "absolute", left: -19, top: 16, width: 2, height: "calc(100% + 4px)", background: COLORS.border }} />}
              <div style={{ minWidth: 100 }}><div style={{ fontSize: 12, fontWeight: 600, color: m.status === "imminent" ? COLORS.ember : COLORS.muted }}>{m.date}</div></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500 }}>{m.event}</div></div>
              <div><Pill text={`Phase ${m.phase}`} color={m.phase === 1 ? COLORS.gold : m.phase === 2 ? COLORS.forest : COLORS.wine} /></div>
            </div>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}

function RiskAnalysis() {
  return (
    <FadeIn>
      <SectionHeader id="risks" icon="⊘" title="Risk Analysis" />
      {RISKS.map((r, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <div>
              <Pill text={r.severity} color={r.severity === "HIGH" ? COLORS.ember : r.severity === "MEDIUM" ? COLORS.amber : COLORS.forest} />
              <h4 style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{r.risk}</h4>
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, marginBottom: 4 }}>MITIGATION</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: COLORS.muted }}>{r.mitigation}</p>
            </div>
          </div>
        </Card>
      ))}
    </FadeIn>
  );
}

// ============================================================
// NAV
// ============================================================

function SideNav({ active }) {
  return (
    <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 220, background: "#fff", borderRight: `1px solid ${COLORS.border}`, padding: "24px 0", overflowY: "auto", zIndex: 100 }}>
      <div style={{ padding: "0 20px", marginBottom: 32 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.forest, fontFamily: "'Georgia', serif" }}>Solful Sessions</div>
        <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 1, marginTop: 4 }}>BUSINESS PLAN 2026</div>
      </div>
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} style={{ display: "block", padding: "8px 20px", fontSize: 13, color: active === s.id ? COLORS.forest : COLORS.muted, fontWeight: active === s.id ? 600 : 400, textDecoration: "none", borderLeft: active === s.id ? `3px solid ${COLORS.forest}` : "3px solid transparent", transition: "all 0.2s" }}>
          <span style={{ marginRight: 8, fontSize: 10 }}>{s.icon}</span>{s.label}
        </a>
      ))}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function SolfulBusinessPlan() {
  const [active, setActive] = useState("exec");
  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(s.id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <SideNav active={active} />
      <div style={{ marginLeft: 220, padding: "0 48px 120px", maxWidth: 1060 }}>
        <div style={{ paddingTop: 60, paddingBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.gold, fontWeight: 600, marginBottom: 12 }}>CONFIDENTIAL · MARCH 2026</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: COLORS.text, fontFamily: "'Georgia', serif", maxWidth: 700 }}>Solful Sessions</h1>
          <p style={{ fontSize: 20, color: COLORS.muted, lineHeight: 1.5, marginTop: 12, maxWidth: 700 }}>Precision terpene formulation for enhanced cannabis experience, athletic performance, and human wellness.</p>
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <Pill text="Patent Pending" color={COLORS.gold} />
            <Pill text="44 Claims · 6 Families" color={COLORS.forest} />
            <Pill text="La Séance 4/20" color={COLORS.ember} />
            <Pill text="3 Journal Submissions" color={COLORS.wine} />
          </div>
        </div>
        <ExecSummary />
        <FounderSection />
        <Innovation />
        <ResearchStrategy />
        <MarketAnalysis />
        <CompetitiveLandscape />
        <ProductsServices />
        <GTMStrategy />
        <StakeholderMap />
        <IPStrategy />
        <RevenueModel />
        <MilestonesSection />
        <RiskAnalysis />
        <div style={{ marginTop: 80, padding: "32px 0", borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.forest }}>Solful Sessions · Confidential Business Plan</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>Charles Pelletier-Gagné · Sebastopol, California · March 2026</div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>Patent Application CPG-2026-PROV-001 · 44 claims · 6 families · 8 independent claims</div>
        </div>
      </div>
    </div>
  );
}

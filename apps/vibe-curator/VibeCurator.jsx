import React, { useState, useMemo, useCallback, useRef } from "react";

// THEME — dark premium (Aesop meets Vivino)
const T = {
  bg: "#0C0C0C",
  bgCard: "#161412",
  bgCardHover: "#1E1A16",
  bgSurface: "#1A1816",
  border: "#2A2622",
  borderLight: "#1E1C1A",
  text: "#F5F0E8",
  textSecondary: "#9B9185",
  textMuted: "#6B6560",
  gold: "#C8A97E",
  goldDim: "rgba(200,169,126,0.15)",
  sage: "#7C9082",
  sageDim: "rgba(124,144,130,0.15)",
  wine: "#8B5E5E",
  wineDim: "rgba(139,94,94,0.12)",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

// SVG icon system
const Ico = ({ d, size = 20, color = T.text, sw = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);
const icons = {
  back: "M19 12H5M12 19l-7-7 7-7",
  plus: "M12 5v14M5 12h14",
  x: "M18 6L6 18M6 6l12 12",
  copy: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
  check: "M20 6L9 17l-5-5",
  search: "M21 21l-4.35-4.35M11 3a8 8 0 100 16 8 8 0 000-16z",
  chevDown: "M6 9l6 6 6-6",
  chevUp: "M18 15l-6-6-6 6",
  leaf: "M17 8C8 10 5.9 16.17 3.82 21.34M11 15a7 7 0 01-4-6 7 7 0 0111.6-5.3C21.4 7.1 20 12 17 15",
  compass: "M12 2a10 10 0 100 20 10 10 0 000-20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V5a2 2 0 012-2h14v16H6.5a2.5 2.5 0 00-2.5 2.5z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  brain: "M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z",
  droplet: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  info: "M12 2a10 10 0 100 20 10 10 0 000-20zM12 16v-4M12 8h.01",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  wind: "M9.59 4.59A2 2 0 1111 8H2M12.59 19.41A2 2 0 1014 16H2M17.73 7.73A2.5 2.5 0 1119.5 12H2",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

// TERPENE SCIENCE DATA
const TERPENE_SCIENCE = {
  "β-Caryophyllene": {
    emoji: "🌶️",
    aroma: "Spicy, peppery, warm",
    plants: "Black pepper, cloves, rosemary, hops",
    effects: "Anti-inflammatory, pain relief, grounding calm",
    science:
      "The only terpene proven to directly bind CB2 cannabinoid receptors (Ki=155nM). Acts as a dietary cannabinoid — the same molecule in black pepper activates the same receptors as cannabis.",
    pathway:
      "Binds CB2 receptors → reduces inflammatory cytokines (IL-6, TNF-α) → modulates endocannabinoid tone",
    color: "#C8A97E",
  },
  Limonene: {
    emoji: "🍋",
    aroma: "Bright citrus, orange peel, lemon zest",
    plants: "Citrus rinds, juniper, peppermint",
    effects: "Mood elevation, stress relief, energizing",
    science:
      "Selectively attenuates THC-induced anxiety without blocking therapeutic effects. Rapidly absorbed through inhalation, reaching blood plasma within minutes.",
    pathway:
      "Elevates serotonin and dopamine → anxiolytic effects → modulates adenosine receptors",
    color: "#D4C85C",
  },
  Myrcene: {
    emoji: "🥭",
    aroma: "Earthy, musky, tropical fruit",
    plants: "Mango, lemongrass, hops, thyme",
    effects: "Deep sedation, muscle relaxation, pain relief",
    science:
      "The most common cannabis terpene. Responsible for the 'couch-lock' effect in high doses. Mango eaten before cannabis amplifies effects because both are rich in myrcene.",
    pathway:
      "Enhances BBB permeability → potentiates THC transport → activates TRPV1 pain receptors → muscle relaxant via GABA modulation",
    color: "#8EAE68",
  },
  "α-Humulene": {
    emoji: "🌿",
    aroma: "Earthy, woody, hoppy",
    plants: "Hops, sage, ginseng, coriander",
    effects: "Appetite suppression, anti-inflammatory, grounding",
    science:
      "Shares a molecular precursor with β-caryophyllene. Demonstrates cannabimimetic activity at 40-50% efficacy — meaning it produces cannabis-like effects on its own.",
    pathway: "Anti-inflammatory via NF-κB pathway → appetite suppression → synergizes with caryophyllene",
    color: "#7C9082",
  },
  Linalool: {
    emoji: "💜",
    aroma: "Floral, lavender, sweet",
    plants: "Lavender, birch bark, coriander",
    effects: "Anxiety relief, sedation, pain modulation",
    science:
      "Activates GABA-A receptors — the same receptors targeted by benzodiazepines (anti-anxiety medication). Clinical trials (n=972) show significant anxiety reduction from lavender inhalation.",
    pathway:
      "GABA-A receptor agonist → reduces glutamate excitotoxicity → anxiolytic and anticonvulsant effects",
    color: "#9B7BA8",
  },
  "α-Bisabolol": {
    emoji: "🌼",
    aroma: "Gentle floral, honey, chamomile",
    plants: "German chamomile, candeia tree",
    effects: "Gentle calming, skin healing, anti-irritant",
    science:
      "One of the gentlest terpenes with strong anti-inflammatory properties. Enhances skin absorption of other compounds, potentially aiding topical terpene delivery.",
    pathway:
      "Anti-inflammatory via COX-2 inhibition → enhances transdermal penetration → gentle GABA modulation",
    color: "#8EAEC8",
  },
  "α-Pinene": {
    emoji: "🌲",
    aroma: "Fresh pine, forest air, rosemary",
    plants: "Pine needles, rosemary, basil, parsley",
    effects: "Alertness, memory retention, bronchodilation",
    science:
      "Counteracts some of THC's short-term memory impairment. Acts as a bronchodilator, opening airways and potentially increasing terpene absorption during inhalation.",
    pathway:
      "Acetylcholinesterase inhibitor → preserves acetylcholine → supports memory and focus → bronchodilation enhances absorption",
    color: "#5C8E6B",
  },
  "β-Ocimene": {
    emoji: "⚡",
    aroma: "Sweet, herbaceous, tropical",
    plants: "Basil, mint, orchids, kumquats",
    effects: "Energizing, uplifting, decongestant",
    science:
      "One of the more rare cannabis terpenes. Produces bright, cerebral energy. When paired with caryophyllene, creates vivid alertness without scattering focus.",
    pathway:
      "Anti-inflammatory → decongestant → enhances alertness through sympathetic nervous system activation",
    color: "#B8785C",
  },
  Terpinolene: {
    emoji: "🫖",
    aroma: "Piney, floral, herbal, slightly sweet",
    plants: "Tea tree, nutmeg, cumin, lilacs",
    effects: "Mildly sedating, antioxidant, creative uplift",
    science:
      "Found in less than 10% of cannabis strains, making it relatively rare. Produces a unique combination of gentle creative uplift with calming physical effects.",
    pathway:
      "Antioxidant via free radical scavenging → mild CNS depression → creative state induction",
    color: "#6BAE8E",
  },
  "trans-β-Farnesene": {
    emoji: "🌸",
    aroma: "Green apple, woody, floral",
    plants: "Green apple skin, chamomile, hops",
    effects: "Calming, soothing, anti-anxiety",
    science:
      "A sesquiterpene with calming properties that adds depth and complexity to strain profiles. Enhances the blissful quality of sedating strains.",
    pathway:
      "Anxiolytic effects → enhances other terpene activity → contributes to entourage effect depth",
    color: "#D4B88E",
  },
};

// EDUCATIONAL CONTENT DATA
const LEARN_CONTENT = {
  bigIdea: {
    title: "The Big Idea",
    subtitle: "One molecule. Every plant. Same effect.",
    body: "Linalool is linalool — whether it comes from a lavender field in Provence or a cannabis flower grown in Mendocino. The same molecule activates the same receptors through the same pathways. This isn't alternative medicine. It's chemistry.",
  },
  whatAreTerpenes: {
    title: "What Are Terpenes?",
    subtitle: "The invisible architects of how plants make you feel",
    body: "Terpenes are aromatic compounds produced by nearly every plant on earth. Cannabis alone produces over 200 different terpenes — they're what make each strain smell, taste, and feel different. But here's what most people don't know: terpenes aren't just about flavor. They're pharmacologically active molecules that cross the blood-brain barrier and modulate your neurochemistry.",
    detail:
      "They're secreted in the same glands that produce THC and CBD. They developed over millennia to repel predators and attract pollinators. And they're potent — affecting human behavior when inhaled at concentrations in the single-digit nanograms per milliliter of blood.",
  },
  amplification: {
    title: "The Amplification Effect",
    subtitle: "Pre-load. Consume. Amplify.",
    body: "When you diffuse an essential oil blend that matches your strain's terpene profile, you're pre-loading your olfactory-limbic system with the same molecules you're about to consume. By the time you inhale your first terpene from cannabis, your receptors are already primed.",
    detail:
      "The result: the flavor is amplified. The onset is faster. The experience is brighter, cleaner, more intentional. You're not adding something foreign — you're turning up the volume on what's already there.",
  },
  threePathways: {
    title: "Three Pathways to Your Brain",
    subtitle: "How terpenes reach your nervous system",
    pathways: [
      {
        name: "Olfactory-Limbic",
        time: "< 15 minutes",
        emoji: "👃",
        desc: "Scent molecules bind to receptors in your nose, triggering signals directly to the amygdala, hippocampus, and hypothalamus. This releases neurotransmitters — serotonin, dopamine, GABA — within minutes.",
      },
      {
        name: "Nasal-Brain Direct",
        time: "Minutes",
        emoji: "🧠",
        desc: "Small, lipophilic terpene molecules cross the blood-brain barrier via trigeminal and olfactory nerves. They bypass your liver and digestive system entirely — going straight from nose to brain.",
      },
      {
        name: "Respiratory-Circulatory",
        time: "15-30 minutes",
        emoji: "💨",
        desc: "Inhaled molecules pass through your alveoli into your bloodstream. Their lipophilic nature lets them cross the blood-brain barrier and reach pharmacologically relevant concentrations in your central nervous system.",
      },
    ],
  },
  entourage: {
    title: "The Entourage Effect",
    subtitle: "Why the whole plant is greater than its parts",
    body: "Research shows cannabis extracts produce effects two to four times greater than isolated THC alone. Terpenes don't just tag along — they actively modulate cannabinoid activity. Some bind directly to cannabinoid receptors. Others modify how THC crosses the blood-brain barrier. Others change neurotransmitter production rates.",
    detail:
      "β-Caryophyllene binds CB2 receptors with a binding affinity of Ki=155nM — making it the only dietary compound proven to directly engage the endocannabinoid system. Linalool activates the same GABA receptors as anti-anxiety medications. This isn't incidental. It's synergy by design.",
  },
  soundScience: {
    title: "Sound as Terpene",
    subtitle: "Why your playlist is part of the medicine",
    body: "Music therapy's iso principle says: match the patient's current state, then gradually shift toward the desired state. We apply this to terpene profiles. A myrcene-dominant strain calls for slow descent — ambient textures that mirror sedation. A limonene-forward strain needs bright, major-key energy that matches its uplift.",
    detail:
      "Each strain's Spotify prompt translates its terpene fingerprint into musical parameters: tempo, energy, valence, acousticness, instrumentalness. The music doesn't just complement the experience — it synchronizes with the same neurochemistry the terpenes are activating.",
  },
  solfulMethod: {
    title: "The Solful Method",
    subtitle: "How we match your strain to your oil blend",
    steps: [
      "Analyze: We map every strain's terpene profile — which compounds, at what percentages, in what ratios.",
      "Match: Each terpene maps to specific essential oils. β-Caryophyllene → Black Pepper. Myrcene → Lemongrass. Limonene → Sweet Orange or Lemon.",
      "Proportion: We build 40-drop blends (2ml) that mirror the strain's terpene ratios. If a strain is 50% caryophyllene, half the blend is caryophyllene-rich oils.",
      "Layer: Diffuse 30 minutes before consuming. Continue during. Let your olfactory system prime itself with the same molecules you're about to inhale.",
    ],
  },
};

// ═══════════════════════════════════════════════════
// INTENT METADATA
// ═══════════════════════════════════════════════════
const intentMeta = {
  groundedPresent: { name: "Grounded & Present", short: "Grounded", emoji: "\u2693", color: "#8B7355", bg: "rgba(139,115,85,0.12)", desc: "Steady calm, clear mental edges" },
  creativeFlow: { name: "Creative Flow", short: "Creative", emoji: "\u2728", color: "#9B7BA8", bg: "rgba(155,123,168,0.12)", desc: "Vivid ideas, playful momentum" },
  deepRest: { name: "Deep Rest", short: "Rest", emoji: "\uD83C\uDF19", color: "#5C7B9B", bg: "rgba(92,123,155,0.12)", desc: "Total surrender, velvet quiet" },
  socialBright: { name: "Social & Bright", short: "Social", emoji: "\u2600\uFE0F", color: "#C8A97E", bg: "rgba(200,169,126,0.12)", desc: "Warm gathering, easy laughter" },
  bodyMelt: { name: "Body Melt", short: "Body Melt", emoji: "\uD83D\uDCA7", color: "#8B5E5E", bg: "rgba(139,94,94,0.12)", desc: "Profound physical ease" },
  euphoricLift: { name: "Euphoric Lift", short: "Euphoric", emoji: "\u26A1", color: "#B8785C", bg: "rgba(184,120,92,0.12)", desc: "Bright lift, electric joy" },
  calmFocus: { name: "Calm Focus", short: "Focus", emoji: "\uD83C\uDFAF", color: "#7C9082", bg: "rgba(124,144,130,0.12)", desc: "Clear productivity, no fog" },
  cozyComfort: { name: "Cozy Comfort", short: "Cozy", emoji: "\u2615", color: "#9B7B7B", bg: "rgba(155,123,123,0.12)", desc: "Warm blanket, curious mind" },
};

// OIL COLORS
const oilColors = {
  "Black Pepper": "#2A2A2A",
  "Sweet Orange": "#E8A442",
  Lemongrass: "#B8C83C",
  Lavender: "#9B7BA8",
  Chamomile: "#D4B88E",
  Rosemary: "#6B8E7B",
  Frankincense: "#8B7355",
  "Ylang Ylang": "#D4A86E",
  Myrrh: "#7B5C4A",
  Peppermint: "#7CB888",
  "Lemon Oil": "#E8C842",
  Eucalyptus: "#7CB8A8",
  Pine: "#5C7B6B",
  Clove: "#8B6B5E",
  Basil: "#7B9B5C",
  Neroli: "#D4A8A8",
  "Ginger Oil": "#C8955C",
  Cardamom: "#9B8B7B",
  Sandalwood: "#9B8B7B",
};

// TERPENE COLORS
const terpeneColors = {
  "β-Caryophyllene": "#C8A97E",
  Limonene: "#D4C85C",
  Myrcene: "#8EAE68",
  "α-Humulene": "#7C9082",
  Linalool: "#9B7BA8",
  "α-Bisabolol": "#8EAEC8",
  "α-Pinene": "#5C8E6B",
  "β-Ocimene": "#B8785C",
  Terpinolene: "#6BAE8E",
  "trans-β-Farnesene": "#D4B88E",
};

// 23 STRAINS ARRAY
const STRAINS = [
  {
    id: 1, name: "Mike's Bomba", farm: "Glentucky Family Farm", region: "Sonoma",
    intent: "Grounded calm with clear mental edges.",
    effects: ["Relaxed", "Calm", "Alert"], aroma: ["Fuel", "Lemon Cream", "Forest Floor"],
    totalTerpenes: 1.38,
    terpenes: { "\u03B2-Caryophyllene": 0.47, Limonene: 0.32, "\u03B1-Humulene": 0.18, Linalool: 0.07 },
    recipe: [
      { name: "Black Pepper", drops: 20, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Sage", drops: 8, terpene: "\u03B1-Humulene" },
      { name: "Lavender", drops: 2, terpene: "Linalool" },
    ],
    rationale: "Black pepper delivers the dominant caryophyllene (50% of blend). Lemon matches the lemon cream aroma. Sage provides humulene with herbal grounding. Lavender softens edges.",
    spotifyPrompt: "Create a 75-minute playlist that feels grounded but mentally clear. Mid-tempo grooves around 85-95 BPM with warm, analog textures \u2014 think Rhodes keys, upright bass, unhurried drums. Start with mellow jazz-soul like Khruangbin or Kaytranada's downtempo work, settle into modal jazz and neo-soul instrumentals mid-session, and close with warm ambient pieces. Keep the energy steady and centered \u2014 never rushed, never sleepy. The vibe is a late evening on a porch with a clear head. No lyrics after the first 20 minutes.",
    categories: ["groundedPresent"],
  },
  {
    id: 2, name: "Guava Gift", farm: "Alpenglow Farms", region: "Humboldt",
    intent: "Open and expansive, easy social lift.",
    effects: ["Social", "Inspiring", "Euphoric"], aroma: ["Fresh Guava", "Lemon Rind", "Tamarind"],
    totalTerpenes: 2.34,
    terpenes: { "\u03B2-Caryophyllene": 0.73, Limonene: 0.50, Myrcene: 0.33, "\u03B1-Humulene": 0.25 },
    recipe: [
      { name: "Black Pepper", drops: 14, terpene: "\u03B2-Caryophyllene" },
      { name: "Grapefruit", drops: 10, terpene: "Limonene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Basil", drops: 6, terpene: "\u03B1-Humulene" },
      { name: "Rosemary", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Black pepper leads with caryophyllene. Grapefruit brings tropical citrus echoing the guava aroma. Lemongrass delivers myrcene for euphoric lift.",
    spotifyPrompt: "Create a 90-minute playlist for an open, social hang \u2014 bright but not manic, warm but not heavy. Start around 100 BPM with feel-good indie and tropical-influenced tracks \u2014 Toro y Moi, Jungle, early Tame Impala. Build into groovy, sunlit funk and disco edits around 110-115 BPM through the middle. Wind down the last 20 minutes with warm bossa nova or acoustic neo-soul. Major keys throughout.",
    categories: ["socialBright"],
  },
  {
    id: 3, name: "Carambola", farm: "Higher Heights", region: "Mendocino",
    intent: "Light and playful, effervescent energy.",
    effects: ["Energetic", "Fun", "Giggly"], aroma: ["Orange", "Diesel", "Incense"],
    totalTerpenes: 1.45,
    terpenes: { Limonene: 0.44, "\u03B2-Caryophyllene": 0.18, Linalool: 0.12, "\u03B1-Bisabolol": 0.09 },
    recipe: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Rosemary", drops: 8, terpene: "\u03B2-Caryophyllene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "German Chamomile", drops: 6, terpene: "\u03B1-Bisabolol" },
      { name: "Black Pepper", drops: 4, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Limonene-dominant and uplifting. Sweet orange (40%) captures the orange aroma. German chamomile delivers bisabolol and softens the blend.",
    spotifyPrompt: "Create a 60-minute playlist that's pure effervescence \u2014 bright, playful, and uplifting without being aggressive. Target 110-125 BPM. Lean into sunny indie pop, citrus-bright electronic, and feel-good dance tracks. Think Parcels, Franc Moody, Channel Tres. Keep production crisp and clean \u2014 bright synths, tight percussion, major keys. Everything should feel like carbonation in your ears.",
    categories: ["socialBright", "creativeFlow", "euphoricLift"],
  },
  {
    id: 4, name: "Strawberry Biscotti", farm: "Happy Day Farms", region: "Mendocino",
    intent: "Cozy anchor with a curious mind.",
    effects: ["Comforting", "Mentally Engaging", "Appetite Inducing"],
    aroma: ["Kettle Corn", "Fuel", "Sour Strawberry Candy"],
    totalTerpenes: 1.48,
    terpenes: { Limonene: 0.38, "\u03B2-Caryophyllene": 0.29, Myrcene: 0.25, "\u03B1-Bisabolol": 0.13 },
    recipe: [
      { name: "Bergamot", drops: 14, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "German Chamomile", drops: 6, terpene: "\u03B1-Bisabolol" },
      { name: "Clove", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Bergamot brings sophisticated citrus. Black pepper for caryophyllene. German chamomile for bisabolol. A touch of clove adds warmth.",
    spotifyPrompt: "Create an 80-minute playlist that feels like being wrapped in a blanket with an interesting book. Start with textured trip-hop and downtempo around 85-90 BPM \u2014 Bonobo, Little People, Emancipator. Move into layered instrumental hip-hop \u2014 Madlib instrumentals, Nujabes, J Dilla beats. Close with warm, detail-rich ambient. Cozy but never boring.",
    categories: ["cozyComfort"],
  },
  {
    id: 5, name: "Pinnacle", farm: "Dos Rios Farms", region: "Mendocino",
    intent: "Deep surrender into velvet quiet.",
    effects: ["Heavy", "Sedative", "Blissful"], aroma: ["Sweet Cream", "Nutmeg", "Fennel Seeds"],
    totalTerpenes: 3.35,
    terpenes: { "\u03B2-Caryophyllene": 0.61, Limonene: 0.46, "\u03B1-Humulene": 0.19, "trans-\u03B2-Farnesene": 0.14 },
    recipe: [
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "Rosemary", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Sage", drops: 6, terpene: "\u03B1-Humulene" },
      { name: "Ylang Ylang", drops: 4, terpene: "Farnesene" },
      { name: "Clove", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "The heaviest, most sedative strain. Black pepper and rosemary deliver concentrated caryophyllene. Ylang ylang amplifies the blissful farnesene effect.",
    spotifyPrompt: "Create a 90-minute playlist for total surrender. Start at 75 BPM and slowly descend to 55 BPM by the end. Open with deep, velvet-textured downtempo \u2014 Tycho's slower work, Boards of Canada, Helios. Transition into pure ambient and drone by the midpoint \u2014 Brian Eno, Stars of the Lid, Grouper. Final 30 minutes: barely-there sound design. Exclusively instrumental.",
    categories: ["deepRest"],
  },
  {
    id: 6, name: "Tropical Sleigh Ride", farm: "Greenshock Farms", region: "Mendocino",
    intent: "Vivid lift with present clarity.",
    effects: ["Joyful", "Alert", "Euphoric"], aroma: ["Peppermint", "Honeysuckle", "Hint of Ginger"],
    totalTerpenes: 2.35,
    terpenes: { "\u03B2-Ocimene": 0.71, "\u03B2-Caryophyllene": 0.70, "\u03B1-Humulene": 0.28, Limonene: 0.22 },
    recipe: [
      { name: "Basil", drops: 14, terpene: "\u03B2-Ocimene" },
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Peppermint", drops: 6, terpene: "Menthol" },
      { name: "Grapefruit", drops: 4, terpene: "Limonene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Basil delivers the rare ocimene (35% of blend). Black pepper for the heavy caryophyllene. Peppermint captures the distinctive aroma.",
    spotifyPrompt: "Create a 75-minute playlist that's vivid and joyful but stays present \u2014 bright energy without losing focus. Target 110-120 BPM. Start with upbeat world-fusion and Afrobeat-influenced tracks \u2014 Mdou Moctar, Khruangbin's uptempo work, KOKOROKO. Build into bright indie dance and synth-forward grooves \u2014 Caribou, Four Tet, Floating Points. The vibe is tropical sunrise with a clear mind.",
    categories: ["creativeFlow", "euphoricLift"],
  },
  {
    id: 7, name: "Pink Jesus Reserve", farm: "Sonoma Hills Farm", region: "Sonoma",
    intent: "Buoyant and warm, ready to share.",
    effects: ["Social", "Uplifting", "Euphoric"], aroma: ["Raspberry", "French Lavender", "Pineapple"],
    totalTerpenes: 1.89,
    terpenes: { "\u03B2-Caryophyllene": 0.78, Myrcene: 0.38, "\u03B1-Humulene": 0.27, "\u03B1-Bisabolol": 0.15 },
    recipe: [
      { name: "Black Pepper", drops: 14, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Sage", drops: 6, terpene: "\u03B1-Humulene" },
      { name: "German Chamomile", drops: 4, terpene: "\u03B1-Bisabolol" },
      { name: "Geranium", drops: 2, terpene: "Floral" },
    ],
    rationale: "Black pepper anchors the high caryophyllene. Lavender captures the French lavender aroma. German chamomile for bisabolol.",
    spotifyPrompt: "Create a 90-minute playlist for a warm gathering \u2014 buoyant and generous. Start around 95-100 BPM with soulful grooves \u2014 Leon Bridges, Tom Misch, Hiatus Kaiyote. Settle into mid-tempo soul and warm jazz \u2014 Robert Glasper, Thundercat's mellower work. Close with gentle acoustic warmth. The production should feel analog and human.",
    categories: ["socialBright", "euphoricLift"],
  },
  {
    id: 8, name: "Mule Fuel", farm: "Alpenglow Farms", region: "Humboldt",
    intent: "Gentle contentment settling toward rest.",
    effects: ["Happy", "Hungry", "Sleepy"], aroma: ["Skunk", "Diesel", "Lemon", "Leather"],
    totalTerpenes: 3.97,
    terpenes: { Myrcene: 2.22, "\u03B1-Pinene": 0.54, "\u03B2-Caryophyllene": 0.34, Limonene: 0.28 },
    recipe: [
      { name: "Lemongrass", drops: 20, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "\u03B1-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemon", drops: 6, terpene: "Limonene" },
    ],
    rationale: "Exceptionally high myrcene (2.22%) makes this the most sedating strain. Lemongrass dominates (50%). Pine captures the pinene for a brief clarity window.",
    spotifyPrompt: "Create a 90-minute playlist that starts with gentle contentment and gradually dissolves into deep rest. First 20 minutes: warm acoustic and lo-fi at 80-85 BPM \u2014 Iron & Wine, Nils Frahm, Bon Iver. Middle 30 minutes: descend to 65-70 BPM with ambient. Final 40 minutes: pure sleep-adjacent soundscapes below 60 BPM. No percussion after the midpoint.",
    categories: ["deepRest", "bodyMelt"],
  },
  {
    id: 9, name: "Love and Laughter", farm: "Heartrock Mountain Farm", region: "Mendocino",
    badge: "CBD",
    intent: "Clear and steady, nothing clouded.",
    effects: ["Energizing", "Focusing", "Non-Intoxicating"],
    aroma: ["Flowers", "Eucalyptus", "Berries"],
    totalTerpenes: 1.72,
    terpenes: { Myrcene: 0.56, Terpinolene: 0.28, "\u03B2-Caryophyllene": 0.20, "\u03B1-Pinene": 0.13 },
    recipe: [
      { name: "Lemongrass", drops: 14, terpene: "Myrcene" },
      { name: "Tea Tree", drops: 8, terpene: "Terpinolene" },
      { name: "Eucalyptus", drops: 8, terpene: "1,8-Cineole" },
      { name: "Black Pepper", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "The only CBD strain. Lemongrass for myrcene. Tea tree captures the rare terpinolene. Eucalyptus matches the aroma and adds clarity.",
    spotifyPrompt: "Create a 60-minute playlist for clear, steady focus \u2014 no cloud, no haze, just calm productivity. Target 95-105 BPM. Lean into minimalist post-rock and ambient electronic \u2014 Tycho, Kiasmos, Jon Hopkins' gentler work. No lyrics. No busy arrangements. Think study session in a sunlit room.",
    categories: ["calmFocus"],
  },
  {
    id: 10, name: "Blueberry Muffin", farm: "Briceland Forest Farm", region: "Humboldt",
    intent: "Quiet peace with a soft glow.",
    effects: ["Relaxed", "Peaceful", "Joyful"], aroma: ["Blueberry", "Fresh Dough", "Cinnamon"],
    totalTerpenes: 1.66,
    terpenes: { "\u03B2-Caryophyllene": 0.47, Myrcene: 0.40, "\u03B1-Bisabolol": 0.25, "\u03B1-Humulene": 0.16 },
    recipe: [
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemongrass", drops: 10, terpene: "Myrcene" },
      { name: "German Chamomile", drops: 8, terpene: "\u03B1-Bisabolol" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
      { name: "Clove", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Black pepper and lemongrass anchor the caryophyllene and myrcene. German chamomile brings bisabolol for a soft, calming quality.",
    spotifyPrompt: "Create a 75-minute playlist that glows softly \u2014 peaceful and warm, like candlelight. Start with gentle folk-adjacent ambient around 75 BPM. Settle into soft jazz piano and string arrangements \u2014 Ludovico Einaudi, Nils Frahm. Close with barely-there ambient warmth. Acoustic textures preferred. No sharp edges anywhere.",
    categories: ["cozyComfort", "groundedPresent"],
  },
  {
    id: 11, name: "Mandarin Cherry Tree", farm: "Sticky Fields", region: "Mendocino",
    intent: "Settled body, gently wandering mind.",
    effects: ["Full Body Relaxation", "Serenity", "Creativity"],
    aroma: ["Mandarin Orange", "Sandalwood", "Lavender"],
    totalTerpenes: 1.75,
    terpenes: { Limonene: 0.52, "\u03B2-Caryophyllene": 0.36, "\u03B1-Humulene": 0.13, Linalool: 0.11 },
    recipe: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "\u03B2-Caryophyllene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Ylang Ylang", drops: 4, terpene: "Floral" },
    ],
    rationale: "Sweet orange (40%) matches the mandarin aroma. Lavender captures the floral note. Ylang ylang adds exotic floral depth.",
    spotifyPrompt: "Create an 80-minute playlist where the body stays settled and the mind wanders freely. Start around 85 BPM with dreamy indie \u2014 Beach House, Washed Out, Toro y Moi. Move into impressionist electronic and ambient \u2014 Bibio, Boards of Canada. Close with soft, drifting soundscapes. Think Sunday afternoon sunbeam with your eyes half-closed.",
    categories: ["cozyComfort"],
  },
  {
    id: 12, name: "Glitter Bomb", farm: "Sol Spirit Farm", region: "Trinity",
    intent: "Body at ease, mind sparkling.",
    effects: ["Physically Relaxing", "Cerebral", "Euphoric"], aroma: ["Kiwi", "Pine", "Musk"],
    totalTerpenes: 2.39,
    terpenes: { Myrcene: 1.23, "\u03B2-Caryophyllene": 0.42, "\u03B2-Ocimene": 0.17, Linalool: 0.15 },
    recipe: [
      { name: "Lemongrass", drops: 18, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 10, terpene: "\u03B2-Caryophyllene" },
      { name: "Basil", drops: 4, terpene: "\u03B2-Ocimene" },
      { name: "Lavender", drops: 4, terpene: "Linalool" },
      { name: "Pine", drops: 4, terpene: "\u03B1-Pinene" },
    ],
    rationale: "High myrcene (1.23%) calls for lemongrass dominance (45%). Basil captures the ocimene. Pine matches the pine aroma note.",
    spotifyPrompt: "Create a 75-minute playlist where the body melts but the mind stays lit up. Start with deep, cushioned grooves around 80-90 BPM \u2014 FKJ instrumentals, Tom Misch & Yussef Dayes, Alfa Mist. Layer in sparkling electronic textures \u2014 Floating Points, Kiasmos. Close with ambient that has crystalline detail over deep bass warmth. Instrumental only.",
    categories: ["euphoricLift", "bodyMelt"],
  },
  {
    id: 13, name: "Satsuma Sherbet", farm: "Alpenglow Farms", region: "Humboldt",
    intent: "Quiet ease with thoughtful undertones.",
    effects: ["Happy", "Contemplative", "Comfortable"], aroma: ["Mandarin Orange", "Mochi", "Mint"],
    totalTerpenes: 1.85,
    terpenes: { Limonene: 0.55, "\u03B2-Caryophyllene": 0.45, "\u03B1-Humulene": 0.13, Myrcene: 0.11 },
    recipe: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Lemongrass", drops: 4, terpene: "Myrcene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
    ],
    rationale: "Sweet orange (40%) captures the mandarin citrus. Peppermint matches the mint aroma note.",
    spotifyPrompt: "Create a 75-minute playlist that's quietly happy and gently thoughtful. Target 90-100 BPM. Start with thoughtful indie and soft electronic \u2014 Washed Out, Men I Trust. Move into contemplative jazz and ambient \u2014 GoGo Penguin, Nils Frahm. Close with warm, meditative pieces. Major keys but never saccharine.",
    categories: ["cozyComfort"],
  },
  {
    id: 14, name: "Avenue of the Giants", farm: "Happy Day Farms", region: "Mendocino",
    intent: "Forward momentum with electric clarity.",
    effects: ["Energizing", "Buzzy", "Motivating"], aroma: ["Pine Needles", "Menthol", "Jasmine"],
    totalTerpenes: 3.48,
    terpenes: { Myrcene: 1.94, "\u03B2-Caryophyllene": 0.43, "\u03B1-Pinene": 0.26, "\u03B2-Ocimene": 0.24 },
    recipe: [
      { name: "Lemongrass", drops: 16, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "\u03B1-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Basil", drops: 4, terpene: "\u03B2-Ocimene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
      { name: "Geranium", drops: 2, terpene: "Floral" },
    ],
    rationale: "Very high myrcene with lemongrass at 40%. Pine captures the pine aroma and pinene. Peppermint for the menthol.",
    spotifyPrompt: "Create a 75-minute playlist that's propulsive and electric \u2014 forward momentum with a deep foundation. Start at 105 BPM and build to 120. Open with driving post-rock and shoegaze \u2014 Mogwai, M83, DIIV. Build into energizing electronic \u2014 Moderat, Bicep. Keep bass heavy and textured. A redwood forest soundtrack \u2014 towering and electric. Pure forward motion.",
    categories: ["euphoricLift", "creativeFlow"],
  },
  {
    id: 15, name: "Peach Flamb\u00e9", farm: "Terrapin Farms", region: "Humboldt",
    intent: "Sunny drive with bright momentum.",
    effects: ["Happy", "Energized", "Motivated"], aroma: ["White Peach", "Cashew Butter", "Brown Sugar"],
    totalTerpenes: 1.05,
    terpenes: { "\u03B2-Caryophyllene": 0.25, Myrcene: 0.21, Limonene: 0.20, "\u03B1-Humulene": 0.12 },
    recipe: [
      { name: "Bergamot", drops: 10, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Clove", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Balanced, lower-terpene profile. Bergamot brings sophisticated citrus matching the peach. Clove echoes the brown sugar warmth.",
    spotifyPrompt: "Create a 60-minute playlist for a sunny drive with the windows down. Target 105-115 BPM. Think golden California afternoon \u2014 Fleetwood Mac vibes meeting modern indie pop. Vampire Weekend, Phoenix, Dayglow, Still Woozy. Warm production \u2014 acoustic guitar, bright synths, handclaps. Major keys only. Pure sunny energy.",
    categories: ["euphoricLift"],
  },
  {
    id: 16, name: "Rasta Governmint", farm: "Higher Heights", region: "Mendocino",
    intent: "Profound ease with cushioned edges.",
    effects: ["Euphoric", "Supremely Relaxed", "Comforted"], aroma: ["Sour Cherry", "Frankincense", "Oak"],
    totalTerpenes: 1.92,
    terpenes: { "\u03B2-Caryophyllene": 0.60, Limonene: 0.39, "\u03B1-Humulene": 0.17, Myrcene: 0.16 },
    recipe: [
      { name: "Black Pepper", drops: 14, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Rosemary", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Sage", drops: 6, terpene: "\u03B1-Humulene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Caryophyllene-forward with black pepper and rosemary. Sage for humulene and oak-like earthiness. Geranium adds cherry notes.",
    spotifyPrompt: "Create a 90-minute playlist for profound, cushioned ease. Start around 90 BPM with warm dub reggae and roots grooves. Flow into deep trip-hop and downtempo \u2014 Massive Attack, Thievery Corporation, Nightmares on Wax. Close with warm, padded ambient. Production should feel like every hard edge has been rounded off.",
    categories: ["deepRest", "bodyMelt", "groundedPresent"],
  },
  {
    id: 17, name: "Purple Candy Cane", farm: "Greenshock Farms", region: "Mendocino",
    intent: "Vibrant and vocal, fully awake.",
    effects: ["Energized", "Invigorated", "Talkative"], aroma: ["Mango", "Peppermint Candy", "Orange Blossom"],
    totalTerpenes: 1.55,
    terpenes: { Myrcene: 0.54, "\u03B2-Caryophyllene": 0.31, "\u03B1-Pinene": 0.20, "\u03B1-Humulene": 0.13 },
    recipe: [
      { name: "Lemongrass", drops: 12, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 8, terpene: "\u03B2-Caryophyllene" },
      { name: "Sweet Orange", drops: 8, terpene: "Limonene" },
      { name: "Pine", drops: 6, terpene: "\u03B1-Pinene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
      { name: "Sage", drops: 2, terpene: "\u03B1-Humulene" },
    ],
    rationale: "Myrcene-forward for the mango note. Sweet orange captures the orange blossom. Peppermint matches the candy perfectly.",
    spotifyPrompt: "Create a 60-minute playlist that's vibrant, vocal, and fully alive. Target 110-120 BPM. Open with high-energy soul and funk \u2014 Anderson .Paak, Vulfpeck. Build into bold pop and dance \u2014 Dua Lipa, Jessie Ware, Roisin Murphy. Keep vocals prominent throughout. Production should be bright, punchy, and polished. Fully awake from start to finish.",
    categories: ["creativeFlow", "socialBright"],
  },
  {
    id: 18, name: "Lemon Papaya Banana", farm: "Terrapin Farms", region: "Humboldt",
    intent: "Soft body, drifting expansive mind.",
    effects: ["Physically Relaxed", "Spacey", "Euphoric"], aroma: ["Papaya", "Honeydew Melon", "Lemon Zest"],
    totalTerpenes: 1.38,
    terpenes: { Myrcene: 0.57, Limonene: 0.29, "\u03B2-Caryophyllene": 0.16, "\u03B1-Humulene": 0.05 },
    recipe: [
      { name: "Lemongrass", drops: 14, terpene: "Myrcene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Black Pepper", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Ylang Ylang", drops: 4, terpene: "Floral" },
    ],
    rationale: "Myrcene-dominant with lemongrass at 35%. Lemon captures the lemon zest. Geranium adds tropical, fruity notes.",
    spotifyPrompt: "Create a 90-minute playlist where the body goes soft and the mind drifts into wide-open space. Start at 80 BPM with hazy, tropical psychedelia \u2014 Tame Impala, Unknown Mortal Orchestra. Drift into spacious ambient and shoegaze \u2014 Slowdive, Beach House remixes. Final 30 minutes: pure expansive ambient with no rhythm. Like floating in warm ocean water looking up at clouds.",
    categories: ["bodyMelt", "deepRest"],
  },
  {
    id: 19, name: "Tropicanna Cherry", farm: "Sunrise Gardens", region: "Mendocino",
    intent: "Bright lift with clear, lively edges.",
    effects: ["Euphoric", "Cerebral", "Cheerful"], aroma: ["Sour Cherry", "Sweet Citrus", "Nutmeg"],
    totalTerpenes: 1.18,
    terpenes: { "\u03B2-Caryophyllene": 0.37, Limonene: 0.29, Linalool: 0.15, "\u03B1-Humulene": 0.11 },
    recipe: [
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Clove", drops: 2, terpene: "\u03B2-Caryophyllene" },
    ],
    rationale: "Black pepper for the caryophyllene backbone. Sweet orange captures the sweet citrus. Geranium adds cherry-like notes.",
    spotifyPrompt: "Create a 70-minute playlist that's bright, cheerful, and polished. Target 105-115 BPM. Start with lively indie pop \u2014 Alvvays, Japanese Breakfast, Clairo. Build into bright electronic-pop \u2014 Disclosure, Robyn. Keep production clean and detailed. The vibe is a spring afternoon that keeps getting better.",
    categories: ["creativeFlow", "euphoricLift"],
  },
  {
    id: 20, name: "Moonlight", farm: "Moon Gazer Farms", region: "Mendocino",
    intent: "Soft gratitude in a settled body.",
    effects: ["Physically Relaxed", "Calm", "Grateful"], aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
    totalTerpenes: 2.67,
    terpenes: { Myrcene: 0.74, "\u03B2-Caryophyllene": 0.51, Terpinolene: 0.38, "\u03B1-Bisabolol": 0.24 },
    recipe: [
      { name: "Lemongrass", drops: 12, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 10, terpene: "\u03B2-Caryophyllene" },
      { name: "Tea Tree", drops: 8, terpene: "Terpinolene" },
      { name: "German Chamomile", drops: 6, terpene: "\u03B1-Bisabolol" },
      { name: "Bergamot", drops: 4, terpene: "Limonene" },
    ],
    rationale: "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. Bergamot is the key ingredient in Earl Grey tea \u2014 a direct aroma hit.",
    spotifyPrompt: "Create an 80-minute playlist for quiet gratitude at the end of a day. Start around 75 BPM with tender folk and ambient \u2014 Adrianne Lenker, Novo Amor. Settle into warm, nocturnal ambient and modern classical \u2014 Max Richter, A Winged Victory for the Sullen. Close with nighttime soundscapes. Everything should feel like moonlight through a window.",
    categories: ["cozyComfort", "groundedPresent"],
  },
  {
    id: 21, name: "Natty Bumppo", farm: "Moon Gazer Farms", region: "Mendocino",
    intent: "Loose and easy, happily untethered.",
    effects: ["Happy", "Carefree", "Physically Relaxed"], aroma: ["Kerosene", "Musk", "Sour Plum"],
    totalTerpenes: 1.86,
    terpenes: { "\u03B2-Caryophyllene": 0.63, Limonene: 0.35, "\u03B1-Humulene": 0.25, Myrcene: 0.19 },
    recipe: [
      { name: "Black Pepper", drops: 14, terpene: "\u03B2-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Sage", drops: 6, terpene: "\u03B1-Humulene" },
      { name: "Lemongrass", drops: 6, terpene: "Myrcene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Caryophyllene-forward with black pepper as the base. Lemon delivers the limonene. Geranium adds sour plum fruitiness.",
    spotifyPrompt: "Create a 75-minute playlist that's completely unbothered \u2014 easy, carefree, nothing to prove. Target 90-100 BPM. Start with laid-back soul and jazz \u2014 Mac DeMarco, Mild High Club, Chet Baker. Flow into carefree reggae-influenced grooves. Close with warm, lazy dub and downtempo. The vibe is hammock with zero obligations.",
    categories: ["socialBright", "groundedPresent"],
  },
  {
    id: 22, name: "Black Lime Chem", farm: "Moon Gazer Farms", region: "Mendocino",
    intent: "Weighted bliss melting toward rest.",
    effects: ["Heavy", "Blissful", "Sleepy"], aroma: ["Sharp Lime", "Rhubarb", "Glue"],
    totalTerpenes: 3.08,
    terpenes: { Myrcene: 1.69, "\u03B1-Pinene": 0.39, "\u03B2-Caryophyllene": 0.27, "\u03B2-Ocimene": 0.19 },
    recipe: [
      { name: "Lemongrass", drops: 16, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "\u03B1-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "\u03B2-Caryophyllene" },
      { name: "Basil", drops: 6, terpene: "\u03B2-Ocimene" },
      { name: "Lemon", drops: 4, terpene: "Limonene" },
    ],
    rationale: "Heavy myrcene strain for sleep and bliss. Pine delivers the pinene for a brief clarity window. Lemon for the sharp lime aroma.",
    spotifyPrompt: "Create a 90-minute playlist for heavy, blissful descent into sleep. First 15 minutes: gentle clarity \u2014 ambient guitar at 75 BPM, clean piano tones. Then dissolve: 70 BPM downtempo through minutes 15-35. After minute 35: drop below 60 BPM and remove all rhythm. Final 30 minutes should approach silence. Complete dissolution.",
    categories: ["deepRest"],
  },
  {
    id: 23, name: "Pineapple Mojito", farm: "Higher Heights", region: "Mendocino",
    intent: "Rooted ease with a quiet glow.",
    effects: ["Relaxed", "Grounded", "Euphoric"], aroma: ["Pineapple", "Ginger", "Mint", "Gas"],
    totalTerpenes: 2.55,
    terpenes: { "\u03B2-Caryophyllene": 0.63, Limonene: 0.56, "\u03B1-Bisabolol": 0.24, "\u03B1-Humulene": 0.19, Linalool: 0.16, "\u03B1-Pinene": 0.14, Myrcene: 0.11 },
    recipe: [
      { name: "Black Pepper", drops: 12, terpene: "\u03B2-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "German Chamomile", drops: 6, terpene: "\u03B1-Bisabolol" },
      { name: "Sage", drops: 4, terpene: "\u03B1-Humulene" },
      { name: "Lavender", drops: 4, terpene: "Linalool" },
      { name: "Pine", drops: 2, terpene: "\u03B1-Pinene" },
      { name: "Lemongrass", drops: 2, terpene: "Myrcene" },
    ],
    rationale: "Seven-oil blend reflecting unusually broad terpene diversity. The complexity mirrors the strain's seven significant terpenes.",
    spotifyPrompt: "Create an 80-minute playlist that feels rooted and warm with a gentle glow underneath. Start around 90-95 BPM with tropical-influenced soul \u2014 Khruangbin, Babe Rainbow, Melody's Echo Chamber. Settle into lush downtempo \u2014 Bonobo, Maribou State, Tourist. Close with warm, softly pulsing ambient \u2014 Tycho, Olafur Arnalds. Production should feel like golden hour in a garden. Grounded but never heavy.",
    categories: ["socialBright", "cozyComfort", "groundedPresent"],
  },
];

// ═══════════════════════════════════════════════════
// INTENT CATEGORIES
// ═══════════════════════════════════════════════════
const INTENTS = Object.entries(intentMeta).map(([key, meta]) => ({
  id: key, ...meta,
  strainIds: STRAINS.filter((s) => s.categories.includes(key)).map((s) => s.id),
}));

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════
const matchStrains = (selected, pool) => {
  if (!selected.length) return [];
  return pool
    .map((s) => ({ s, score: selected.filter((i) => s.categories.includes(i)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
};

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════
function IntentTile({ intent, selected, onToggle }) {
  return (
    <button onClick={() => onToggle(intent.id)} style={{
      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
      padding: "16px 14px", borderRadius: 14,
      background: selected ? intent.bg.replace("0.12", "0.25") : intent.bg,
      border: selected ? "1.5px solid " + intent.color : "1px solid " + T.borderLight,
      cursor: "pointer", transition: "all 0.25s ease",
      transform: selected ? "scale(0.97)" : "scale(1)",
      width: "100%", textAlign: "left", outline: "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>{intent.emoji}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: selected ? intent.color : T.text, fontFamily: T.font }}>{intent.name}</span>
      </div>
      <span style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, lineHeight: 1.4 }}>{intent.desc}</span>
    </button>
  );
}

function StrainCard({ strain, onSelect, onHumidorToggle, isInHumidor, showHumidorBtn }) {
  const meta = intentMeta[strain.categories[0]] || {};
  return (
    <button onClick={() => onSelect(strain)} style={{
      display: "flex", flexDirection: "column", gap: 10, padding: 18,
      background: T.bgCard, border: "1px solid " + T.border, borderRadius: 16,
      cursor: "pointer", width: "100%", textAlign: "left", outline: "none", transition: "all 0.2s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: T.text, fontFamily: T.font }}>{strain.name}</span>
            {strain.badge && <span style={{ fontSize: 10, fontWeight: 700, color: T.sage, background: T.sageDim, padding: "2px 6px", borderRadius: 4 }}>{strain.badge}</span>}
          </div>
          <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>{strain.farm} {"\u00B7"} {strain.region}</span>
        </div>
        {showHumidorBtn !== false && (
          <button onClick={(e) => { e.stopPropagation(); onHumidorToggle && onHumidorToggle(strain.id); }} style={{
            background: isInHumidor ? T.goldDim : "transparent", border: "1px solid " + (isInHumidor ? T.gold : T.border),
            borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center",
          }}>
            <Ico d={isInHumidor ? icons.check : icons.plus} size={14} color={isInHumidor ? T.gold : T.textMuted} />
          </button>
        )}
      </div>
      <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>{"\u201C"}{strain.intent}{"\u201D"}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {strain.effects.map((e) => <span key={e} style={{ fontSize: 11, color: T.textMuted, background: T.border + "88", padding: "3px 8px", borderRadius: 20, fontFamily: T.font }}>{e}</span>)}
        <span style={{ fontSize: 11, color: meta.color, background: meta.bg, padding: "3px 8px", borderRadius: 20, fontFamily: T.font, fontWeight: 500 }}>{meta.short}</span>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {strain.aroma.map((a, i) => <span key={a} style={{ fontSize: 11, color: T.gold, fontFamily: T.font }}>{a}{i < strain.aroma.length - 1 ? " \u00B7" : ""}</span>)}
      </div>
    </button>
  );
}

function TerpeneChart({ terpenes, totalTerpenes }) {
  const entries = Object.entries(terpenes);
  const maxVal = Math.max(...entries.map(([, v]) => v));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>Terpene Profile</span>
        <span style={{ fontSize: 12, color: T.gold, fontFamily: T.font, fontWeight: 500 }}>Total: {totalTerpenes}%</span>
      </div>
      {entries.map(([name, value]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, width: 120, flexShrink: 0 }}>{name}</span>
          <div style={{ flex: 1, height: 8, background: T.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: (value / maxVal * 100) + "%", height: "100%", borderRadius: 4, background: terpeneColors[name] || T.gold, transition: "width 0.6s ease" }} />
          </div>
          <span style={{ fontSize: 12, color: T.text, fontFamily: T.font, width: 42, textAlign: "right" }}>{value}%</span>
        </div>
      ))}
    </div>
  );
}

function RecipeDisplay({ recipe }) {
  const total = recipe.reduce((sum, o) => sum + o.drops, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", height: 28, borderRadius: 8, overflow: "hidden", gap: 2 }}>
        {recipe.map((oil) => (
          <div key={oil.name} style={{ width: (oil.drops / total * 100) + "%", height: "100%", background: oilColors[oil.name] || T.gold, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", minWidth: oil.drops >= 6 ? 24 : 12 }}>
            {oil.drops >= 8 && <span style={{ fontSize: 10, color: "#0C0C0C", fontWeight: 700, fontFamily: T.font }}>{oil.drops}</span>}
          </div>
        ))}
      </div>
      {recipe.map((oil) => (
        <div key={oil.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: oilColors[oil.name] || T.gold, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: T.text, fontFamily: T.font, flex: 1 }}>{oil.name}</span>
          <span style={{ fontSize: 13, color: T.gold, fontFamily: T.font, fontWeight: 600 }}>{oil.drops} drops</span>
          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, width: 95, textAlign: "right" }}>{oil.terpene}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid " + T.border }}>
        <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>Total</span>
        <span style={{ fontSize: 13, color: T.text, fontFamily: T.font, fontWeight: 600 }}>{total} drops {"\u00B7"} 2ml batch</span>
      </div>
    </div>
  );
}

function PlaylistSection({ prompt }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { try { navigator.clipboard.writeText(prompt); } catch(e) {} setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 16 }}>
        <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, lineHeight: 1.7, margin: 0 }}>{prompt}</p>
      </div>
      <button onClick={handleCopy} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 10,
        background: copied ? T.sageDim : T.goldDim, border: "1px solid " + (copied ? T.sage : T.gold), cursor: "pointer",
      }}>
        <Ico d={copied ? icons.check : icons.copy} size={16} color={copied ? T.sage : T.gold} />
        <span style={{ fontSize: 14, fontWeight: 500, color: copied ? T.sage : T.gold, fontFamily: T.font }}>{copied ? "Copied to clipboard" : "Copy Spotify prompt"}</span>
      </button>
    </div>
  );
}

function SectionBlock({ emoji, title, subtitle, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen !== false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16 }}>{emoji}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: T.font }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>{subtitle}</div>}
          </div>
        </div>
        <Ico d={open ? icons.chevUp : icons.chevDown} size={18} color={T.textMuted} />
      </button>
      {open && <div style={{ marginTop: 12 }}>{children}</div>}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 4px", flexShrink: 0, minHeight: 44 }}>
      <div style={{ width: 40, display: "flex" }}>{onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Ico d={icons.back} size={22} color={T.text} /></button>}</div>
      <span style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: T.font }}>{title}</span>
      <div style={{ width: 40, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

function BottomNav({ tab, onTabChange }) {
  const tabs = [{ id: "explore", label: "Explore", icon: icons.compass }, { id: "learn", label: "Learn", icon: icons.brain }, { id: "humidor", label: "Humidor", icon: icons.book }, { id: "catalog", label: "Catalog", icon: icons.search }];
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0 18px", borderTop: "1px solid " + T.border, background: T.bg, flexShrink: 0 }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onTabChange(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "4px 16px" }}>
          <Ico d={t.icon} size={20} color={tab === t.id ? T.gold : T.textMuted} sw={tab === t.id ? 2 : 1.5} />
          <span style={{ fontSize: 11, color: tab === t.id ? T.gold : T.textMuted, fontFamily: T.font, fontWeight: tab === t.id ? 600 : 400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════
function WelcomeScreen({ selectedIntents, onToggleIntent, onFindVibe, mode, onModeChange }) {
  return (
    <div style={{ padding: "0 20px 24px" }}>
      <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
          <Ico d={icons.leaf} size={22} color={T.gold} />
          <h1 style={{ fontSize: 24, fontWeight: 300, color: T.text, fontFamily: T.font, margin: 0, letterSpacing: "0.08em" }}>VIBE CURATOR</h1>
        </div>
        <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: 0, letterSpacing: "0.04em" }}>Solful Dispensary {"\u00B7"} Sebastopol</p>
      </div>
      <div style={{ display: "flex", background: T.bgCard, borderRadius: 10, padding: 3, border: "1px solid " + T.border, marginBottom: 20 }}>
        {["discover", "humidor"].map((m) => (
          <button key={m} onClick={() => onModeChange(m)} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "none", background: mode === m ? T.goldDim : "transparent", cursor: "pointer" }}>
            <span style={{ fontSize: 13, fontWeight: mode === m ? 600 : 400, color: mode === m ? T.gold : T.textMuted, fontFamily: T.font }}>{m === "discover" ? "Discover" : "My Humidor"}</span>
          </button>
        ))}
      </div>
      <p style={{ fontSize: 15, color: T.textSecondary, fontFamily: T.font, margin: "0 0 14px" }}>How do you want to feel?</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {INTENTS.map((i) => <IntentTile key={i.id} intent={i} selected={selectedIntents.includes(i.id)} onToggle={onToggleIntent} />)}
      </div>
      {selectedIntents.length > 0 && (
        <button onClick={onFindVibe} style={{ padding: "16px 24px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, " + T.gold + ", #A08960)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%" }}>
          <Ico d={icons.star} size={18} color="#0C0C0C" sw={2} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "#0C0C0C", fontFamily: T.font }}>Find My Vibe</span>
        </button>
      )}
    </div>
  );
}

function ResultsScreen({ strains, selectedIntents, onSelectStrain, humidor, onHumidorToggle, onBack }) {
  return (
    <div>
      <TopBar title="Your Matches" onBack={onBack} />
      <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
          {selectedIntents.map((i) => <span key={i} style={{ fontSize: 12, color: T.gold, background: T.goldDim, padding: "4px 10px", borderRadius: 20, fontFamily: T.font, fontWeight: 500 }}>{(intentMeta[i] || {}).short || i}</span>)}
        </div>
        <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: 0 }}>{strains.length} strain{strains.length !== 1 ? "s" : ""} match your vibe</p>
        {strains.map((s) => <StrainCard key={s.id} strain={s} onSelect={onSelectStrain} isInHumidor={humidor.includes(s.id)} onHumidorToggle={onHumidorToggle} />)}
      </div>
    </div>
  );
}

function TerpeneInsight({ name }) {
  var info = TERPENE_SCIENCE[name];
  if (!info) return null;
  return (
    <div style={{ background: T.bgSurface, border: "1px solid " + T.borderLight, borderRadius: 10, padding: 12, marginTop: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 14 }}>{info.emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: info.color, fontFamily: T.font }}>{name}</span>
      </div>
      <p style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.5 }}>{info.effects}</p>
      <p style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, margin: "4px 0 0", lineHeight: 1.4 }}>Also found in: {info.plants}</p>
    </div>
  );
}

function WhyThisBlendWorks({ strain }) {
  var dominantTerpene = Object.entries(strain.terpenes).sort(function(a, b) { return b[1] - a[1]; })[0];
  var dominantInfo = dominantTerpene ? TERPENE_SCIENCE[dominantTerpene[0]] : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, lineHeight: 1.6, margin: 0 }}>
        This blend mirrors {strain.name}'s terpene fingerprint using essential oils rich in the same molecules.
        When you diffuse this blend before consuming, you pre-load your olfactory-limbic system with the same compounds you're about to inhale.
      </p>
      {dominantInfo && (
        <div style={{ background: T.goldDim, border: "1px solid rgba(200,169,126,0.25)", borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>{dominantInfo.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.gold, fontFamily: T.font }}>Dominant: {dominantTerpene[0]} ({dominantTerpene[1]}%)</span>
          </div>
          <p style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, lineHeight: 1.5, margin: 0 }}>{dominantInfo.science}</p>
        </div>
      )}
      <div style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Ico d={icons.zap} size={14} color={T.gold} />
          <span style={{ fontSize: 12, fontWeight: 600, color: T.gold, fontFamily: T.font }}>The Bridge</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ flex: 1, textAlign: "center", padding: 8 }}>
            <span style={{ fontSize: 20, display: "block" }}>{"\uD83C\uDF3F"}</span>
            <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.font }}>Cannabis</span>
          </div>
          <span style={{ fontSize: 12, color: T.gold }}>{"\u2192"}</span>
          <div style={{ flex: 1, textAlign: "center", padding: 8, background: T.goldDim, borderRadius: 8 }}>
            <span style={{ fontSize: 10, color: T.gold, fontFamily: T.font, fontWeight: 600 }}>Same terpene</span>
          </div>
          <span style={{ fontSize: 12, color: T.gold }}>{"\u2192"}</span>
          <div style={{ flex: 1, textAlign: "center", padding: 8 }}>
            <span style={{ fontSize: 20, display: "block" }}>{"\uD83D\uDCA7"}</span>
            <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.font }}>Essential Oil</span>
          </div>
        </div>
        <p style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, textAlign: "center", margin: "8px 0 0", lineHeight: 1.4 }}>
          The molecule is identical. The receptor response is identical. The plant source is irrelevant.
        </p>
      </div>
    </div>
  );
}

function ExperienceScreen({ strain, onBack, isInHumidor, onHumidorToggle }) {
  var terpEntries = Object.entries(strain.terpenes);
  return (
    <div>
      <TopBar title="" onBack={onBack} right={
        <button onClick={() => onHumidorToggle(strain.id)} style={{ background: isInHumidor ? T.goldDim : "transparent", border: "1px solid " + (isInHumidor ? T.gold : T.border), borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <Ico d={isInHumidor ? icons.check : icons.plus} size={16} color={isInHumidor ? T.gold : T.textMuted} />
        </button>
      } />
      <div style={{ padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h1 style={{ fontSize: 26, fontWeight: 300, color: T.text, fontFamily: T.font, margin: 0 }}>{strain.name}</h1>
            {strain.badge && <span style={{ fontSize: 11, fontWeight: 700, color: T.sage, background: T.sageDim, padding: "3px 8px", borderRadius: 5 }}>{strain.badge}</span>}
          </div>
          <span style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font }}>{strain.farm} {"\u00B7"} {strain.region}</span>
          <p style={{ fontSize: 16, color: T.textSecondary, fontFamily: T.font, fontStyle: "italic", margin: "4px 0 0", lineHeight: 1.5 }}>{"\u201C"}{strain.intent}{"\u201D"}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            {strain.effects.map((e) => <span key={e} style={{ fontSize: 12, color: T.text, background: T.border + "88", padding: "4px 10px", borderRadius: 20, fontFamily: T.font }}>{e}</span>)}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {strain.aroma.map((a, i) => <span key={a} style={{ fontSize: 12, color: T.gold, fontFamily: T.font }}>{a}{i < strain.aroma.length - 1 ? " \u00B7" : ""}</span>)}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
            {strain.categories.map((c) => { const m = intentMeta[c]; return m ? <span key={c} style={{ fontSize: 11, color: m.color, background: m.bg, padding: "3px 8px", borderRadius: 20, fontFamily: T.font, fontWeight: 500 }}>{m.short}</span> : null; })}
          </div>
        </div>
        <div style={{ height: 1, background: T.border }} />
        <SectionBlock emoji={"\uD83C\uDF3F"} title="Terpene Profile" subtitle={strain.totalTerpenes + "% total terpenes"}>
          <TerpeneChart terpenes={strain.terpenes} totalTerpenes={strain.totalTerpenes} />
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>What these terpenes do</span>
            {terpEntries.slice(0, 3).map(function(entry) { return <TerpeneInsight key={entry[0]} name={entry[0]} />; })}
          </div>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />
        <SectionBlock emoji={"\uD83D\uDCA7"} title="Your Essential Oil Blend" subtitle={"40 drops \u00B7 2ml batch"}>
          <RecipeDisplay recipe={strain.recipe} />
          <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, lineHeight: 1.6, margin: "16px 0 0", fontStyle: "italic" }}>{strain.rationale}</p>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />
        <SectionBlock emoji={"\uD83E\uDDEC"} title="Why This Blend Works" subtitle="The science of terpene matching" defaultOpen={false}>
          <WhyThisBlendWorks strain={strain} />
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />
        <SectionBlock emoji={"\uD83C\uDFB5"} title="Your Playlist" subtitle="Copy prompt for Spotify AI DJ">
          <PlaylistSection prompt={strain.spotifyPrompt} />
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />
        <SectionBlock emoji={"\u25B6\uFE0F"} title="The Amplification Protocol" subtitle="How to layer your experience" defaultOpen={false}>
          <AmplificationProtocol />
        </SectionBlock>
      </div>
    </div>
  );
}

function HumidorScreen({ humidor, onSelectStrain, onHumidorToggle, onAddModal }) {
  const strains = STRAINS.filter((s) => humidor.includes(s.id));
  return (
    <div>
      <TopBar title="My Humidor" right={<button onClick={onAddModal} style={{ background: T.goldDim, border: "1px solid " + T.gold, borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}><Ico d={icons.plus} size={16} color={T.gold} /></button>} />
      <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {strains.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <span style={{ fontSize: 40, display: "block", marginBottom: 16 }}>{"\uD83D\uDCDA"}</span>
            <p style={{ fontSize: 15, color: T.textSecondary, fontFamily: T.font, margin: "0 0 6px" }}>Your humidor is empty</p>
            <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: "0 0 20px" }}>Add strains from the catalog to build your collection</p>
            <button onClick={onAddModal} style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid " + T.gold, background: T.goldDim, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Ico d={icons.plus} size={16} color={T.gold} />
              <span style={{ fontSize: 14, color: T.gold, fontFamily: T.font, fontWeight: 500 }}>Add Strains</span>
            </button>
          </div>
        ) : (
          <React.Fragment>
            <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: 0 }}>{strains.length} strain{strains.length !== 1 ? "s" : ""} in your collection</p>
            {strains.map((s) => <StrainCard key={s.id} strain={s} onSelect={onSelectStrain} isInHumidor={true} onHumidorToggle={onHumidorToggle} />)}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function CatalogScreen({ onSelectStrain, humidor, onHumidorToggle }) {
  const [query, setQuery] = useState("");
  const [filterIntent, setFilterIntent] = useState(null);
  const filtered = useMemo(() => {
    var r = STRAINS;
    if (query) { var q = query.toLowerCase(); r = r.filter(function(s) { return s.name.toLowerCase().includes(q) || s.farm.toLowerCase().includes(q) || s.effects.some(function(e) { return e.toLowerCase().includes(q); }) || s.aroma.some(function(a) { return a.toLowerCase().includes(q); }); }); }
    if (filterIntent) r = r.filter(function(s) { return s.categories.includes(filterIntent); });
    return r;
  }, [query, filterIntent]);
  return (
    <div>
      <TopBar title="Strain Catalog" />
      <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12 }}>
          <Ico d={icons.search} size={16} color={T.textMuted} />
          <input value={query} onChange={function(e) { setQuery(e.target.value); }} placeholder="Search strains, farms, effects..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: T.text, fontFamily: T.font }} />
          {query && <button onClick={function() { setQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><Ico d={icons.x} size={14} color={T.textMuted} /></button>}
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          <button onClick={function() { setFilterIntent(null); }} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid " + (!filterIntent ? T.gold : T.border), background: !filterIntent ? T.goldDim : "transparent", cursor: "pointer", flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: !filterIntent ? T.gold : T.textMuted, fontFamily: T.font, fontWeight: 500 }}>All</span>
          </button>
          {INTENTS.map(function(intent) {
            return (
              <button key={intent.id} onClick={function() { setFilterIntent(filterIntent === intent.id ? null : intent.id); }} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid " + (filterIntent === intent.id ? intent.color : T.border), background: filterIntent === intent.id ? intent.bg : "transparent", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 12, color: filterIntent === intent.id ? intent.color : T.textMuted, fontFamily: T.font, fontWeight: 500 }}>{intent.short}</span>
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: 0 }}>{filtered.length} strain{filtered.length !== 1 ? "s" : ""}</p>
        {filtered.map(function(s) { return <StrainCard key={s.id} strain={s} onSelect={onSelectStrain} isInHumidor={humidor.includes(s.id)} onHumidorToggle={onHumidorToggle} />; })}
      </div>
    </div>
  );
}

function AddStrainModal({ humidor, onHumidorToggle, onClose }) {
  const [query, setQuery] = useState("");
  var available = STRAINS.filter(function(s) { return !humidor.includes(s.id); });
  var filtered = query ? available.filter(function(s) { return s.name.toLowerCase().includes(query.toLowerCase()) || s.farm.toLowerCase().includes(query.toLowerCase()); }) : available;
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, marginTop: 60, background: T.bg, borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: T.text, fontFamily: T.font, margin: 0 }}>Add to Humidor</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Ico d={icons.x} size={20} color={T.textMuted} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12 }}>
            <Ico d={icons.search} size={16} color={T.textMuted} />
            <input value={query} onChange={function(e) { setQuery(e.target.value); }} placeholder="Search strains..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: T.text, fontFamily: T.font }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(function(s) {
            return (
              <button key={s.id} onClick={function() { onHumidorToggle(s.id); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, cursor: "pointer", width: "100%", textAlign: "left" }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.text, fontFamily: T.font }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font, marginLeft: 8 }}>{s.farm}</span>
                </div>
                <Ico d={icons.plus} size={16} color={T.gold} />
              </button>
            );
          })}
          {filtered.length === 0 && <p style={{ fontSize: 14, color: T.textMuted, fontFamily: T.font, textAlign: "center", padding: 40 }}>{available.length === 0 ? "All strains are in your humidor!" : "No matching strains"}</p>}
        </div>
      </div>
    </div>
  );
}

function AmplificationProtocol() {
  var steps = [
    { time: "30 min before", text: "Start diffusing your essential oil blend. Let the room fill." },
    { time: "During session", text: "Continue diffusing. Optional: 1\u20132 drops in bong water." },
    { time: "After", text: "Let the diffuser run as you settle into the experience." },
  ];
  return (
    <div>
      {steps.map(function(step, i) {
        return (
          <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < steps.length - 1 ? "1px solid " + T.borderLight : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.font }}>{i + 1}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, color: T.gold, fontFamily: T.font, fontWeight: 600 }}>{step.time}</span>
              <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: "4px 0 0", lineHeight: 1.5 }}>{step.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// LEARN SCREEN
// ═══════════════════════════════════════════════════
function LearnScreen() {
  var [expandedTerpene, setExpandedTerpene] = useState(null);
  var terpEntries = Object.entries(TERPENE_SCIENCE);
  return (
    <div>
      <div style={{ textAlign: "center", padding: "20px 20px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
          <Ico d={icons.brain} size={22} color={T.gold} />
          <h1 style={{ fontSize: 22, fontWeight: 300, color: T.text, fontFamily: T.font, margin: 0, letterSpacing: "0.06em" }}>THE SCIENCE</h1>
        </div>
        <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: 0 }}>Understanding terpene amplification</p>
      </div>
      <div style={{ padding: "12px 20px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ background: "linear-gradient(135deg, rgba(200,169,126,0.12), rgba(124,144,130,0.08))", border: "1px solid rgba(200,169,126,0.2)", borderRadius: 16, padding: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.gold, fontFamily: T.font, letterSpacing: "0.05em", textTransform: "uppercase" }}>{LEARN_CONTENT.bigIdea.title}</span>
          <p style={{ fontSize: 18, color: T.text, fontFamily: T.font, margin: "8px 0 0", lineHeight: 1.4, fontWeight: 300 }}>{LEARN_CONTENT.bigIdea.subtitle}</p>
          <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: "12px 0 0", lineHeight: 1.6 }}>{LEARN_CONTENT.bigIdea.body}</p>
        </div>

        <SectionBlock emoji={"\uD83E\uDDEC"} title={LEARN_CONTENT.whatAreTerpenes.title} subtitle={LEARN_CONTENT.whatAreTerpenes.subtitle}>
          <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.6 }}>{LEARN_CONTENT.whatAreTerpenes.body}</p>
          <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: "10px 0 0", lineHeight: 1.6 }}>{LEARN_CONTENT.whatAreTerpenes.detail}</p>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />

        <SectionBlock emoji={"\uD83D\uDE80"} title={LEARN_CONTENT.amplification.title} subtitle={LEARN_CONTENT.amplification.subtitle}>
          <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.6 }}>{LEARN_CONTENT.amplification.body}</p>
          <div style={{ background: T.goldDim, border: "1px solid rgba(200,169,126,0.25)", borderRadius: 12, padding: 14, marginTop: 12 }}>
            <p style={{ fontSize: 13, color: T.gold, fontFamily: T.font, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{LEARN_CONTENT.amplification.detail}</p>
          </div>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />

        <SectionBlock emoji={"\uD83E\uDDE0"} title={LEARN_CONTENT.threePathways.title} subtitle={LEARN_CONTENT.threePathways.subtitle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LEARN_CONTENT.threePathways.pathways.map(function(pw, i) {
              return (
                <div key={i} style={{ background: T.bgCard, border: "1px solid " + T.border, borderRadius: 12, padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{pw.emoji}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.font }}>{pw.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: T.gold, fontFamily: T.font, fontWeight: 500, background: T.goldDim, padding: "2px 8px", borderRadius: 10 }}>{pw.time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.5 }}>{pw.desc}</p>
                </div>
              );
            })}
          </div>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>{"\uD83C\uDF3F"}</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: T.font }}>Meet the Terpenes</div>
              <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>Tap any terpene to learn more</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {terpEntries.map(function(entry) {
              var name = entry[0]; var info = entry[1];
              var isExpanded = expandedTerpene === name;
              return (
                <button key={name} onClick={function() { setExpandedTerpene(isExpanded ? null : name); }} style={{ background: T.bgCard, border: "1px solid " + (isExpanded ? info.color + "44" : T.border), borderRadius: 12, padding: 14, cursor: "pointer", textAlign: "left", width: "100%", outline: "none", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{info.emoji}</span>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: info.color, fontFamily: T.font }}>{name}</span>
                        <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font }}>{info.aroma}</div>
                      </div>
                    </div>
                    <Ico d={isExpanded ? icons.chevUp : icons.chevDown} size={16} color={T.textMuted} />
                  </div>
                  {isExpanded && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.borderLight }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div>
                          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Effects</span>
                          <p style={{ fontSize: 13, color: T.text, fontFamily: T.font, margin: "2px 0 0" }}>{info.effects}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Found in</span>
                          <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, margin: "2px 0 0" }}>{info.plants}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>The Science</span>
                          <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, margin: "2px 0 0", lineHeight: 1.5 }}>{info.science}</p>
                        </div>
                        <div style={{ background: T.bgSurface, borderRadius: 8, padding: 10 }}>
                          <span style={{ fontSize: 11, color: info.color, fontFamily: T.font, fontWeight: 600 }}>Pathway</span>
                          <p style={{ fontSize: 12, color: T.textMuted, fontFamily: T.font, margin: "2px 0 0", lineHeight: 1.4 }}>{info.pathway}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ height: 1, background: T.border }} />

        <SectionBlock emoji={"\u2728"} title={LEARN_CONTENT.entourage.title} subtitle={LEARN_CONTENT.entourage.subtitle} defaultOpen={false}>
          <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.6 }}>{LEARN_CONTENT.entourage.body}</p>
          <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: "10px 0 0", lineHeight: 1.6 }}>{LEARN_CONTENT.entourage.detail}</p>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />

        <SectionBlock emoji={"\uD83C\uDFB5"} title={LEARN_CONTENT.soundScience.title} subtitle={LEARN_CONTENT.soundScience.subtitle} defaultOpen={false}>
          <p style={{ fontSize: 14, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.6 }}>{LEARN_CONTENT.soundScience.body}</p>
          <p style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font, margin: "10px 0 0", lineHeight: 1.6 }}>{LEARN_CONTENT.soundScience.detail}</p>
        </SectionBlock>
        <div style={{ height: 1, background: T.border }} />

        <SectionBlock emoji={"\uD83C\uDF31"} title={LEARN_CONTENT.solfulMethod.title} subtitle={LEARN_CONTENT.solfulMethod.subtitle} defaultOpen={false}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {LEARN_CONTENT.solfulMethod.steps.map(function(step, i) {
              return (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < LEARN_CONTENT.solfulMethod.steps.length - 1 ? "1px solid " + T.borderLight : "none" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 13, background: T.goldDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.font }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: 13, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.5 }}>{step}</p>
                </div>
              );
            })}
          </div>
        </SectionBlock>

        <div style={{ textAlign: "center", padding: "12px 0 0" }}>
          <p style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, margin: 0 }}>Based on 51+ peer-reviewed studies</p>
          <p style={{ fontSize: 11, color: T.textMuted, fontFamily: T.font, margin: "4px 0 0" }}>Solful Dispensary {"\u00B7"} Sebastopol, CA</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════
function Onboarding({ onComplete }) {
  var [step, setStep] = useState(0);
  var slides = [
    { emoji: "\uD83C\uDF3F", title: "Your Cannabis Sommelier", body: "Vibe Curator matches how you want to feel with the right strain, a custom essential oil blend, and a terpene-matched playlist. One intention, three layers of experience.", color: T.gold },
    { emoji: "\uD83E\uDDEC", title: "Terpenes Are Terpenes", body: "The same linalool in lavender activates the same receptors as linalool in cannabis. Same molecule, same effect, different plant. This is chemistry, not alternative medicine.", color: T.sage },
    { emoji: "\u26A1", title: "The Amplification Effect", body: "Diffuse a matching essential oil blend 30 minutes before consuming. Your olfactory system pre-loads with identical terpenes. The result: faster onset, brighter experience, deeper intentionality.", color: "#B8785C" },
  ];
  var slide = slides[step];
  return (
    <div style={{ position: "absolute", inset: 0, background: T.bg, zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 30 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", maxWidth: 340 }}>
        <span style={{ fontSize: 56, display: "block", marginBottom: 24 }}>{slide.emoji}</span>
        <h2 style={{ fontSize: 24, fontWeight: 300, color: T.text, fontFamily: T.font, margin: "0 0 12px", letterSpacing: "0.04em" }}>{slide.title}</h2>
        <p style={{ fontSize: 15, color: T.textSecondary, fontFamily: T.font, margin: 0, lineHeight: 1.6 }}>{slide.body}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 340 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          {slides.map(function(_, i) {
            return <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i === step ? slide.color : T.border, transition: "all 0.3s" }} />;
          })}
        </div>
        <button onClick={function() { if (step < slides.length - 1) setStep(step + 1); else onComplete(); }} style={{ padding: "16px 24px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, " + slide.color + ", " + slide.color + "99)", cursor: "pointer", width: "100%" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#0C0C0C", fontFamily: T.font }}>{step < slides.length - 1 ? "Next" : "Start Exploring"}</span>
        </button>
        {step < slides.length - 1 && (
          <button onClick={onComplete} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <span style={{ fontSize: 13, color: T.textMuted, fontFamily: T.font }}>Skip</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════
export default function VibeCurator() {
  const [tab, setTab] = useState("explore");
  const [screen, setScreen] = useState("welcome");
  const [selectedIntents, setSelectedIntents] = useState([]);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [humidor, setHumidor] = useState([]);
  const [mode, setMode] = useState("discover");
  const [showAddModal, setShowAddModal] = useState(false);
  const [prevScreen, setPrevScreen] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const scrollRef = useRef(null);

  var scrollTop = function() { if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  var toggleIntent = useCallback(function(id) { setSelectedIntents(function(p) { return p.includes(id) ? p.filter(function(i) { return i !== id; }) : p.concat([id]); }); }, []);
  var toggleHumidor = useCallback(function(id) { setHumidor(function(p) { return p.includes(id) ? p.filter(function(i) { return i !== id; }) : p.concat([id]); }); }, []);

  var handleFindVibe = function() { setPrevScreen("welcome"); setScreen("results"); scrollTop(); };
  var handleSelectStrain = function(s) { setSelectedStrain(s); setPrevScreen(screen); setScreen("experience"); scrollTop(); };
  var handleBack = function() { setScreen(screen === "experience" && prevScreen ? prevScreen : "welcome"); scrollTop(); };
  var handleTabChange = function(t) { setTab(t); setScreen(t === "explore" ? "welcome" : t); setSelectedStrain(null); scrollTop(); };

  var matchedStrains = useMemo(function() {
    var pool = mode === "humidor" ? STRAINS.filter(function(s) { return humidor.includes(s.id); }) : STRAINS;
    return matchStrains(selectedIntents, pool);
  }, [selectedIntents, mode, humidor]);

  var renderContent = function() {
    if (screen === "experience" && selectedStrain) return React.createElement(ExperienceScreen, { strain: selectedStrain, onBack: handleBack, isInHumidor: humidor.includes(selectedStrain.id), onHumidorToggle: toggleHumidor });
    if (tab === "explore") {
      if (screen === "results") return React.createElement(ResultsScreen, { strains: matchedStrains, selectedIntents: selectedIntents, onSelectStrain: handleSelectStrain, humidor: humidor, onHumidorToggle: toggleHumidor, onBack: handleBack });
      return React.createElement(WelcomeScreen, { selectedIntents: selectedIntents, onToggleIntent: toggleIntent, onFindVibe: handleFindVibe, mode: mode, onModeChange: setMode });
    }
    if (tab === "learn") return React.createElement(LearnScreen, {});
    if (tab === "humidor") return React.createElement(HumidorScreen, { humidor: humidor, onSelectStrain: handleSelectStrain, onHumidorToggle: toggleHumidor, onAddModal: function() { setShowAddModal(true); } });
    if (tab === "catalog") return React.createElement(CatalogScreen, { onSelectStrain: handleSelectStrain, humidor: humidor, onHumidorToggle: toggleHumidor });
    return null;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#000", fontFamily: T.font }}>
      <div style={{ width: "100%", maxWidth: 430, height: "100vh", maxHeight: 900, background: T.bg, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", borderLeft: "1px solid " + T.border, borderRight: "1px solid " + T.border }}>
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {renderContent()}
        </div>
        <BottomNav tab={tab} onTabChange={handleTabChange} />
        {showAddModal && <AddStrainModal humidor={humidor} onHumidorToggle={toggleHumidor} onClose={function() { setShowAddModal(false); }} />}
        {showOnboarding && <Onboarding onComplete={function() { setShowOnboarding(false); }} />}
      </div>
    </div>
  );
}

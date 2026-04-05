import { useState, useMemo } from "react";

// ============================================================
// WINE → TERPENE → STRAIN MATCHING ALGORITHM
// Chuck & Austin's Sonoma Wine Adventure Tool
// ============================================================

// ── CORE DATA: Wine Varietal Terpene Profiles ──────────────
// Based on wine chemistry research (UC Davis Waterhouse Lab,
// SevenFifty Daily, Nature Horticulture Research, PMC studies)
// Normalized to relative dominance scores (0-10)

const WINE_VARIETAL_TERPENES = {
  "Pinot Noir": {
    category: "red",
    terpeneClass: "low-moderate",
    profile: {
      linalool: 3,
      geraniol: 5,
      myrcene: 2,
      "β-caryophyllene": 3,
      "α-pinene": 2,
      limonene: 1,
      "α-humulene": 2,
      terpinolene: 1,
      ocimene: 1,
      rotundone: 1,
    },
    notes: "Geraniol-forward (rose petals). Moderate linalool. Light spice from caryophyllene. Red fruit esters complement terpene backbone.",
    typicalAromas: ["cherry", "rose petal", "earth", "mushroom", "violet"],
  },
  "Chardonnay": {
    category: "white",
    terpeneClass: "neutral-low",
    profile: {
      linalool: 2,
      geraniol: 1,
      myrcene: 1,
      "β-caryophyllene": 1,
      "α-pinene": 1,
      limonene: 5,
      "α-humulene": 1,
      terpinolene: 1,
      ocimene: 0,
      citronellol: 4,
    },
    notes: "Limonene + citronellol dominant. Neutral variety — terpenes subtle. Oak aging adds vanillin (non-terpene). Unoaked versions more citrus-forward.",
    typicalAromas: ["apple", "lemon", "butter", "vanilla", "pear"],
  },
  "Sauvignon Blanc": {
    category: "white",
    terpeneClass: "moderate",
    profile: {
      linalool: 4,
      geraniol: 2,
      myrcene: 3,
      "β-caryophyllene": 1,
      "α-pinene": 3,
      limonene: 5,
      "α-humulene": 1,
      terpinolene: 2,
      ocimene: 1,
    },
    notes: "Limonene-forward with notable pinene (herbaceous/grassy). Pyrazines drive the green character but terpenes add citrus-herb layer.",
    typicalAromas: ["grapefruit", "grass", "green bell pepper", "gooseberry", "lime"],
  },
  "Syrah": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 3,
      geraniol: 2,
      myrcene: 3,
      "β-caryophyllene": 5,
      "α-pinene": 2,
      limonene: 1,
      "α-humulene": 3,
      terpinolene: 1,
      ocimene: 2,
      rotundone: 8,
    },
    notes: "Rotundone king — the black pepper sesquiterpene. High caryophyllene + humulene for spice. Shares peppery DNA with cannabis caryophyllene strains.",
    typicalAromas: ["black pepper", "blackberry", "plum", "smoke", "leather"],
  },
  "Zinfandel": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 4,
      geraniol: 3,
      myrcene: 4,
      "β-caryophyllene": 5,
      "α-pinene": 2,
      limonene: 3,
      "α-humulene": 3,
      terpinolene: 2,
      ocimene: 1,
      rotundone: 3,
    },
    notes: "Balanced profile. Caryophyllene + myrcene base with linalool floral lift. Jammy fruit character has terpene parallels to fruity cannabis strains.",
    typicalAromas: ["blackberry", "jam", "pepper", "cherry", "cinnamon"],
  },
  "Cabernet Sauvignon": {
    category: "red",
    terpeneClass: "low-moderate",
    profile: {
      linalool: 2,
      geraniol: 2,
      myrcene: 2,
      "β-caryophyllene": 4,
      "α-pinene": 3,
      limonene: 1,
      "α-humulene": 3,
      terpinolene: 1,
      ocimene: 1,
      eucalyptol: 5,
      rotundone: 2,
    },
    notes: "Eucalyptol (1,8-cineole) is the signature terpene — menthol/eucalyptus. Pyrazines dominate aroma but caryophyllene provides spice backbone.",
    typicalAromas: ["blackcurrant", "cedar", "eucalyptus", "bell pepper", "tobacco"],
  },
  "Merlot": {
    category: "red",
    terpeneClass: "low",
    profile: {
      linalool: 3,
      geraniol: 2,
      myrcene: 3,
      "β-caryophyllene": 3,
      "α-pinene": 2,
      limonene: 2,
      "α-humulene": 2,
      terpinolene: 1,
      ocimene: 1,
    },
    notes: "Soft, balanced terpene profile. Myrcene + linalool base. Less assertive than Cab Sauv. Plummy fruit with gentle herbal undertones.",
    typicalAromas: ["plum", "chocolate", "bay leaf", "vanilla", "cherry"],
  },
  "Rosé (Pinot Noir)": {
    category: "rosé",
    terpeneClass: "low-moderate",
    profile: {
      linalool: 4,
      geraniol: 4,
      myrcene: 2,
      "β-caryophyllene": 2,
      "α-pinene": 2,
      limonene: 3,
      "α-humulene": 1,
      terpinolene: 2,
      ocimene: 1,
    },
    notes: "Floral-forward from short skin contact. Higher linalool + geraniol expression than red Pinot. Bright and aromatic.",
    typicalAromas: ["strawberry", "rose", "citrus", "melon", "peach"],
  },
  "Malbec": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 4,
      geraniol: 2,
      myrcene: 3,
      "β-caryophyllene": 5,
      "α-pinene": 2,
      limonene: 2,
      "α-humulene": 3,
      terpinolene: 1,
      ocimene: 2,
    },
    notes: "Caryophyllene-forward with good linalool. Dark fruit with violet florals. Spice + earth backbone mirrors OG cannabis profiles.",
    typicalAromas: ["blackberry", "violet", "cocoa", "plum", "leather"],
  },
  "Petite Sirah": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 3,
      geraniol: 2,
      myrcene: 4,
      "β-caryophyllene": 6,
      "α-pinene": 2,
      limonene: 1,
      "α-humulene": 4,
      terpinolene: 1,
      ocimene: 1,
    },
    notes: "Heavy hitter. Caryophyllene + humulene dominant with myrcene body. Dark, peppery, tannic. Maps well to heavy indica profiles.",
    typicalAromas: ["blueberry", "dark chocolate", "black pepper", "molasses", "sage"],
  },
  "Pinot Gris": {
    category: "white",
    terpeneClass: "low-moderate",
    profile: {
      linalool: 3,
      geraniol: 3,
      myrcene: 2,
      "β-caryophyllene": 1,
      "α-pinene": 2,
      limonene: 4,
      "α-humulene": 1,
      terpinolene: 2,
      ocimene: 1,
    },
    notes: "Stone fruit character from near-threshold terpene synergies. Limonene + geraniol with delicate linalool. Light and approachable.",
    typicalAromas: ["pear", "apple", "white peach", "honeysuckle", "almond"],
  },
  "Sparkling (Blanc de Blancs)": {
    category: "sparkling",
    terpeneClass: "low",
    profile: {
      linalool: 3,
      geraniol: 2,
      myrcene: 1,
      "β-caryophyllene": 1,
      "α-pinene": 2,
      limonene: 5,
      "α-humulene": 1,
      terpinolene: 2,
      ocimene: 1,
    },
    notes: "Bright citrus from limonene. Yeast autolysis adds non-terpene complexity. Clean, crisp terpene expression.",
    typicalAromas: ["green apple", "lemon", "brioche", "chalk", "white flowers"],
  },
  "Muscat of Alexandria": {
    category: "white",
    terpeneClass: "high",
    profile: {
      linalool: 9,
      geraniol: 8,
      myrcene: 3,
      "β-caryophyllene": 2,
      "α-pinene": 2,
      limonene: 4,
      "α-humulene": 1,
      terpinolene: 2,
      ocimene: 3,
    },
    notes: "Terpene powerhouse. Linalool at 9x sensory threshold. Geraniol provides rose intensity. The most 'cannabis-like' wine grape in terpene concentration.",
    typicalAromas: ["orange blossom", "lychee", "rose", "grape", "honey"],
  },
  "Grenache": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 4,
      geraniol: 3,
      myrcene: 3,
      "β-caryophyllene": 3,
      "α-pinene": 2,
      limonene: 3,
      "α-humulene": 2,
      terpinolene: 2,
      ocimene: 1,
    },
    notes: "Well-rounded. Linalool + limonene citrus-floral with moderate spice. Bright red fruit character. GSM blends amplify complexity.",
    typicalAromas: ["raspberry", "strawberry", "white pepper", "orange zest", "herbs"],
  },
  "Mourvèdre": {
    category: "red",
    terpeneClass: "moderate",
    profile: {
      linalool: 2,
      geraniol: 2,
      myrcene: 4,
      "β-caryophyllene": 5,
      "α-pinene": 3,
      limonene: 1,
      "α-humulene": 4,
      terpinolene: 1,
      ocimene: 1,
    },
    notes: "Earthy and wild. Caryophyllene + humulene + myrcene = classic 'dank' profile. Garrigue character mirrors landrace cannabis.",
    typicalAromas: ["game", "earth", "black olive", "thyme", "dark fruit"],
  },
};

// ── CORE DATA: Cannabis Strain Terpene Profiles ────────────
// Includes strains from Solful Sessions + common well-known strains

const CANNABIS_STRAINS = {
  "Mike's Bomba": {
    source: "Glentucky Family Farm, Sonoma",
    energy: "LOW",
    effects: ["Relaxed", "Calm", "Alert"],
    profile: {
      "β-caryophyllene": 0.47,
      limonene: 0.32,
      "α-humulene": 0.18,
      linalool: 0.07,
    },
    totalTerpenes: 1.38,
  },
  "Guava Gift": {
    source: "Alpenglow Farms, Humboldt",
    energy: "HIGH",
    effects: ["Social", "Inspiring", "Euphoric"],
    profile: {
      "β-caryophyllene": 0.73,
      limonene: 0.50,
      myrcene: 0.33,
      "α-humulene": 0.25,
    },
    totalTerpenes: 2.34,
  },
  Carambola: {
    source: "Higher Heights, Mendocino",
    energy: "HIGH",
    effects: ["Energetic", "Fun", "Giggly"],
    profile: {
      limonene: 0.44,
      "β-caryophyllene": 0.18,
      linalool: 0.12,
      "α-bisabolol": 0.09,
    },
    totalTerpenes: 1.45,
  },
  "GSC (Girl Scout Cookies)": {
    source: "Various",
    energy: "MEDIUM",
    effects: ["Euphoric", "Relaxed", "Happy"],
    profile: {
      "β-caryophyllene": 0.45,
      limonene: 0.35,
      linalool: 0.22,
      "α-humulene": 0.15,
    },
    totalTerpenes: 1.17,
  },
  "Blue Dream": {
    source: "Various",
    energy: "MEDIUM-HIGH",
    effects: ["Creative", "Uplifted", "Relaxed"],
    profile: {
      myrcene: 0.55,
      "α-pinene": 0.30,
      "β-caryophyllene": 0.25,
      limonene: 0.10,
    },
    totalTerpenes: 1.20,
  },
  "Granddaddy Purple": {
    source: "Various",
    energy: "LOW",
    effects: ["Relaxed", "Sleepy", "Euphoric"],
    profile: {
      myrcene: 0.65,
      "β-caryophyllene": 0.20,
      "α-pinene": 0.15,
      linalool: 0.10,
    },
    totalTerpenes: 1.10,
  },
  "OG Kush": {
    source: "Various",
    energy: "MEDIUM",
    effects: ["Relaxed", "Euphoric", "Happy"],
    profile: {
      myrcene: 0.40,
      limonene: 0.35,
      "β-caryophyllene": 0.30,
      linalool: 0.15,
    },
    totalTerpenes: 1.20,
  },
  "Jack Herer": {
    source: "Various",
    energy: "HIGH",
    effects: ["Creative", "Energetic", "Focused"],
    profile: {
      "α-pinene": 0.45,
      limonene: 0.25,
      myrcene: 0.20,
      "β-caryophyllene": 0.15,
    },
    totalTerpenes: 1.05,
  },
  Lavender: {
    source: "Various",
    energy: "LOW",
    effects: ["Relaxed", "Calm", "Sleepy"],
    profile: {
      linalool: 0.60,
      myrcene: 0.30,
      "β-caryophyllene": 0.20,
      "α-pinene": 0.10,
    },
    totalTerpenes: 1.20,
  },
  "Durban Poison": {
    source: "Various",
    energy: "HIGH",
    effects: ["Energetic", "Uplifted", "Creative"],
    profile: {
      terpinolene: 0.50,
      myrcene: 0.25,
      ocimene: 0.15,
      "α-pinene": 0.10,
    },
    totalTerpenes: 1.00,
  },
  "Bubba Kush": {
    source: "Various",
    energy: "LOW",
    effects: ["Relaxed", "Sleepy", "Happy"],
    profile: {
      "β-caryophyllene": 0.50,
      myrcene: 0.35,
      limonene: 0.15,
      "α-humulene": 0.10,
    },
    totalTerpenes: 1.10,
  },
  "Amnesia Haze": {
    source: "Various",
    energy: "HIGH",
    effects: ["Euphoric", "Creative", "Energetic"],
    profile: {
      linalool: 0.40,
      myrcene: 0.30,
      limonene: 0.25,
      "β-caryophyllene": 0.15,
    },
    totalTerpenes: 1.10,
  },
  "Super Lemon Haze": {
    source: "Various",
    energy: "HIGH",
    effects: ["Energetic", "Happy", "Uplifted"],
    profile: {
      limonene: 0.55,
      "β-caryophyllene": 0.20,
      myrcene: 0.15,
      linalool: 0.10,
    },
    totalTerpenes: 1.00,
  },
  "Wedding Cake": {
    source: "Various",
    energy: "MEDIUM",
    effects: ["Relaxed", "Euphoric", "Happy"],
    profile: {
      "β-caryophyllene": 0.45,
      limonene: 0.40,
      myrcene: 0.25,
      linalool: 0.10,
    },
    totalTerpenes: 1.20,
  },
  "Pineapple Express": {
    source: "Various",
    energy: "HIGH",
    effects: ["Happy", "Uplifted", "Euphoric"],
    profile: {
      myrcene: 0.40,
      limonene: 0.35,
      "α-pinene": 0.20,
      "β-caryophyllene": 0.15,
    },
    totalTerpenes: 1.10,
  },
  "Original Glue (GG4)": {
    source: "Various",
    energy: "LOW-MEDIUM",
    effects: ["Relaxed", "Euphoric", "Sleepy"],
    profile: {
      "β-caryophyllene": 0.55,
      myrcene: 0.30,
      limonene: 0.20,
      "α-humulene": 0.15,
    },
    totalTerpenes: 1.20,
  },
};

// ── WINERY DATA: Windsor Sonoma Bike Route ─────────────────

const WINERIES = [
  {
    name: "Baldassari Wine Lounge",
    location: "Downtown Windsor (Town Green)",
    distance: "0 mi from SMART station",
    bikeTime: "2 min",
    hours: "Sat 1-7pm, Sun 12-5pm",
    varietals: ["Pinot Noir", "Chardonnay", "Sauvignon Blanc", "Syrah", "Malbec", "Rosé (Pinot Noir)"],
    vibe: "Cozy lounge, great for hackathon pit stop. Urban tasting, laptop-friendly.",
    url: "bfwwine.com",
  },
  {
    name: "Mutt Lynch Winery",
    location: "Downtown Windsor",
    distance: "0.2 mi from SMART station",
    bikeTime: "2 min",
    hours: "Daily, check hours",
    varietals: ["Cabernet Sauvignon", "Merlot", "Zinfandel", "Syrah", "Petite Sirah", "Chardonnay", "Sauvignon Blanc", "Pinot Gris", "Grenache", "Mourvèdre"],
    vibe: "Dog-friendly, fun labels. GSM blend is a terpene playground. Small family winery.",
    url: "muttlynchwinery.com",
  },
  {
    name: "Martinelli Winery",
    location: "River Road, Windsor",
    distance: "~3 mi from downtown",
    bikeTime: "15 min",
    hours: "By appointment",
    varietals: ["Pinot Noir", "Chardonnay", "Zinfandel", "Syrah", "Muscat of Alexandria"],
    vibe: "Historic family winery. Jackass Hill old-vine Zinfandel (1887 vines!). Muscat is the terpene bomb.",
    url: "martinelliwinery.com",
  },
  {
    name: "La Crema Estate at Saralee's Vineyard",
    location: "River Road, Windsor",
    distance: "~4 mi from downtown",
    bikeTime: "20 min",
    hours: "Daily 10am-5pm",
    varietals: ["Pinot Noir", "Chardonnay", "Rosé (Pinot Noir)", "Sauvignon Blanc", "Sparkling (Blanc de Blancs)"],
    vibe: "Beautiful outdoor patio. Cool-climate Pinot specialists. Seated tasting with vineyard views.",
    url: "lacrema.com",
  },
  {
    name: "Bricoleur Vineyards",
    location: "Starr Road, Windsor",
    distance: "~5 mi from downtown",
    bikeTime: "25 min",
    hours: "Thu-Mon by reservation",
    varietals: ["Pinot Noir", "Chardonnay", "Cabernet Sauvignon", "Sauvignon Blanc", "Syrah", "Zinfandel", "Rosé (Pinot Noir)", "Sparkling (Blanc de Blancs)"],
    vibe: "Food & wine pairing focused. Beautiful estate. Full varietal spread for terpene mapping.",
    url: "bricoleurvineyards.com",
  },
  {
    name: "Notre Vue Estate Winery",
    location: "Estate Lane, Windsor",
    distance: "~6 mi from downtown",
    bikeTime: "30 min",
    hours: "By appointment",
    varietals: ["Pinot Noir", "Chardonnay", "Cabernet Sauvignon", "Sauvignon Blanc", "Zinfandel", "Rosé (Pinot Noir)", "Sparkling (Blanc de Blancs)"],
    vibe: "710-acre estate, 350 acres wild preserve. Mountain bike trails on-property! European-style wines.",
    url: "notrevueestate.com",
  },
];

// ── MATCHING ALGORITHM ─────────────────────────────────────

function normalizeProfile(profile) {
  const values = Object.values(profile);
  const max = Math.max(...values);
  if (max === 0) return profile;
  const normalized = {};
  for (const [k, v] of Object.entries(profile)) {
    normalized[k] = v / max;
  }
  return normalized;
}

function cosineSimilarity(a, b) {
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0, magA = 0, magB = 0;
  for (const key of allKeys) {
    const va = a[key] || 0;
    const vb = b[key] || 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function dominantTerpeneBonus(wineProfile, strainProfile) {
  const wineSorted = Object.entries(wineProfile).sort((a, b) => b[1] - a[1]);
  const strainSorted = Object.entries(strainProfile).sort((a, b) => b[1] - a[1]);

  const wineTop = wineSorted.slice(0, 2).map(([k]) => k);
  const strainTop = strainSorted.slice(0, 2).map(([k]) => k);

  let bonus = 0;
  if (wineTop[0] === strainTop[0]) bonus += 0.15;
  if (wineTop.some(t => strainTop.includes(t))) bonus += 0.05;
  return bonus;
}

// Map wine terpene names to cannabis terpene names
const TERPENE_ALIASES = {
  "β-caryophyllene": "β-caryophyllene",
  "α-pinene": "α-pinene",
  "α-humulene": "α-humulene",
  "α-bisabolol": "α-bisabolol",
  limonene: "limonene",
  linalool: "linalool",
  myrcene: "myrcene",
  terpinolene: "terpinolene",
  ocimene: "ocimene",
  geraniol: "geraniol",
  citronellol: "citronellol",
  eucalyptol: "eucalyptol",
  rotundone: "β-caryophyllene", // rotundone → maps to caryophyllene (both peppery sesquiterpenes)
};

function mapWineToCannabisTerpenes(wineProfile) {
  const mapped = {};
  for (const [terpene, value] of Object.entries(wineProfile)) {
    const cannabisName = TERPENE_ALIASES[terpene] || terpene;
    mapped[cannabisName] = (mapped[cannabisName] || 0) + value;
  }
  return mapped;
}

function matchWineToStrains(varietalName, topN = 5) {
  const varietal = WINE_VARIETAL_TERPENES[varietalName];
  if (!varietal) return [];

  const mappedWine = mapWineToCannabisTerpenes(varietal.profile);
  const normWine = normalizeProfile(mappedWine);

  const results = [];
  for (const [strainName, strain] of Object.entries(CANNABIS_STRAINS)) {
    const normStrain = normalizeProfile(strain.profile);
    const similarity = cosineSimilarity(normWine, normStrain);
    const bonus = dominantTerpeneBonus(mappedWine, strain.profile);
    const score = Math.min(1, similarity + bonus);

    results.push({
      strain: strainName,
      score,
      similarity,
      bonus,
      ...strain,
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, topN);
}

// ── TERPENE COLOR MAP ──────────────────────────────────────

const TERPENE_COLORS = {
  "β-caryophyllene": "#C8A97E",
  limonene: "#D4C85C",
  myrcene: "#8EAE68",
  "α-humulene": "#7C9082",
  linalool: "#9B7BA8",
  "α-bisabolol": "#8EAEC8",
  "α-pinene": "#5C8E6B",
  ocimene: "#B8785C",
  terpinolene: "#6BAE8E",
  geraniol: "#D4799B",
  citronellol: "#BFAA5C",
  eucalyptol: "#5CA0A0",
  rotundone: "#8B6F5C",
};

// ── REACT COMPONENTS ───────────────────────────────────────

const TerpeneBar = ({ terpene, value, maxValue }) => {
  const pct = (value / maxValue) * 100;
  const color = TERPENE_COLORS[terpene] || "#888";
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 4, fontSize: 12 }}>
      <div style={{ width: 120, flexShrink: 0, color: "#ccc", fontFamily: "monospace" }}>
        {terpene}
      </div>
      <div style={{ flex: 1, height: 14, background: "#2a2a2a", borderRadius: 7, overflow: "hidden", marginRight: 8 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 7, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ width: 30, textAlign: "right", color: "#888", fontFamily: "monospace", fontSize: 11 }}>
        {value}
      </div>
    </div>
  );
};

const MatchCard = ({ match, rank }) => {
  const scoreColor = match.score > 0.85 ? "#4ade80" : match.score > 0.7 ? "#facc15" : "#f87171";
  const energyColor = { HIGH: "#f97316", "MEDIUM-HIGH": "#eab308", MEDIUM: "#3b82f6", "LOW-MEDIUM": "#8b5cf6", LOW: "#6366f1" };

  return (
    <div style={{
      background: "#1a1a2e",
      border: `1px solid ${rank === 1 ? "#4ade80" : "#333"}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <span style={{ color: "#666", fontSize: 12 }}>#{rank}</span>
          <h4 style={{ margin: "2px 0", color: "#fff", fontSize: 16 }}>{match.strain}</h4>
          <div style={{ fontSize: 11, color: "#888" }}>{match.source}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: scoreColor, fontFamily: "monospace" }}>
            {Math.round(match.score * 100)}%
          </div>
          <div style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 10,
            fontSize: 10,
            fontWeight: 600,
            background: (energyColor[match.energy] || "#666") + "22",
            color: energyColor[match.energy] || "#666",
          }}>
            {match.energy}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {match.effects.map(e => (
          <span key={e} style={{
            padding: "2px 8px",
            borderRadius: 10,
            fontSize: 10,
            background: "#ffffff0a",
            color: "#aaa",
          }}>{e}</span>
        ))}
      </div>
      <div>
        {Object.entries(match.profile).sort((a, b) => b[1] - a[1]).map(([t, v]) => (
          <TerpeneBar key={t} terpene={t} value={v} maxValue={Math.max(...Object.values(match.profile))} />
        ))}
      </div>
    </div>
  );
};

const WineryCard = ({ winery, onSelectVarietal }) => {
  return (
    <div style={{
      background: "#1a1a2e",
      border: "1px solid #333",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h4 style={{ margin: 0, color: "#fff", fontSize: 15 }}>{winery.name}</h4>
          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{winery.location}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#4ade80", fontFamily: "monospace" }}>{winery.bikeTime} bike</div>
          <div style={{ fontSize: 11, color: "#666" }}>{winery.distance}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "#aaa", margin: "8px 0", fontStyle: "italic" }}>{winery.vibe}</div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>{winery.hours}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {winery.varietals.map(v => (
          <button
            key={v}
            onClick={() => onSelectVarietal(v)}
            style={{
              padding: "3px 10px",
              borderRadius: 12,
              fontSize: 11,
              border: "1px solid #444",
              background: "#ffffff08",
              color: "#ddd",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.target.style.background = "#4ade8022"; e.target.style.borderColor = "#4ade80"; }}
            onMouseOut={e => { e.target.style.background = "#ffffff08"; e.target.style.borderColor = "#444"; }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};

const AlgorithmExplainer = () => (
  <div style={{ background: "#0f0f1a", border: "1px solid #333", borderRadius: 12, padding: 20, marginBottom: 20 }}>
    <h3 style={{ color: "#4ade80", margin: "0 0 12px 0", fontSize: 14 }}>The Algorithm: Wine → Terpene → Strain</h3>
    <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
      <div style={{ marginBottom: 12 }}>
        <strong style={{ color: "#fff" }}>Step 1: Varietal Terpene Extraction</strong>
        <br />Each wine grape varietal has a characteristic terpene fingerprint based on wine chemistry research.
        Muscat grapes have 6+ mg/L of free monoterpenes (linalool, geraniol dominant).
        Neutral varieties like Chardonnay have very low concentrations but still express limonene and citronellol.
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong style={{ color: "#fff" }}>Step 2: Terroir & Winemaking Modifiers</strong>
        <br />Russian River Valley cool climate = higher terpene preservation. Extended maceration = more skin-contact terpene extraction.
        Oak aging adds vanillin (non-terpene) but doesn't change terpene profile. Sonoma's fog and moderate temps favor aromatic expression.
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong style={{ color: "#fff" }}>Step 3: Cross-Kingdom Terpene Mapping</strong>
        <br />Wine and cannabis share key terpenes: linalool (floral), limonene (citrus), myrcene (earthy),
        β-caryophyllene (pepper/spice), α-pinene (pine/herb). Wine's rotundone (black pepper) maps to
        cannabis's β-caryophyllene — both are sesquiterpenes activating spicy/peppery perception.
      </div>
      <div>
        <strong style={{ color: "#fff" }}>Step 4: Cosine Similarity + Dominant Terpene Matching</strong>
        <br />Normalized terpene vectors are compared via cosine similarity (direction match),
        with a bonus for shared dominant terpenes. Score = cosine similarity + dominant match bonus (up to 0.20).
        A 90%+ match means the wine and strain share the same terpene "shape."
      </div>
    </div>
  </div>
);

// ── MAIN APP ───────────────────────────────────────────────

export default function WineToStrainMatcher() {
  const [activeTab, setActiveTab] = useState("matcher");
  const [selectedVarietal, setSelectedVarietal] = useState(null);
  const [selectedWinery, setSelectedWinery] = useState(null);

  const matches = useMemo(() => {
    if (!selectedVarietal) return [];
    return matchWineToStrains(selectedVarietal, 5);
  }, [selectedVarietal]);

  const varietal = selectedVarietal ? WINE_VARIETAL_TERPENES[selectedVarietal] : null;

  const tabs = [
    { id: "matcher", label: "Strain Matcher" },
    { id: "algorithm", label: "Algorithm" },
    { id: "wineries", label: "Windsor Route" },
    { id: "varietals", label: "Varietal Map" },
  ];

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "#0a0a14",
      color: "#fff",
      minHeight: "100vh",
      padding: 20,
      maxWidth: 800,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, margin: 0, background: "linear-gradient(135deg, #4ade80, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Wine → Terpene → Strain Matcher
        </h1>
        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Chuck & Austin's Windsor Sonoma Adventure
        </div>
        <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>
          SMART Train: San Rafael → Windsor | Bike to Wineries | Match Wines to Strains
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #222", paddingBottom: 8 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: activeTab === t.id ? 600 : 400,
              border: "none",
              background: activeTab === t.id ? "#4ade8022" : "transparent",
              color: activeTab === t.id ? "#4ade80" : "#666",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Strain Matcher */}
      {activeTab === "matcher" && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 6 }}>
              Select a wine varietal to find matching strains:
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.keys(WINE_VARIETAL_TERPENES).map(v => {
                const cat = WINE_VARIETAL_TERPENES[v].category;
                const catColor = { red: "#ef4444", white: "#facc15", rosé: "#f472b6", sparkling: "#a78bfa" };
                return (
                  <button
                    key={v}
                    onClick={() => setSelectedVarietal(v)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 14,
                      fontSize: 12,
                      border: selectedVarietal === v ? "1px solid #4ade80" : "1px solid #333",
                      background: selectedVarietal === v ? "#4ade8018" : "#ffffff06",
                      color: selectedVarietal === v ? "#4ade80" : "#ccc",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      background: catColor[cat] || "#666",
                      marginRight: 6,
                    }} />
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {varietal && (
            <div>
              {/* Wine Profile */}
              <div style={{
                background: "#1a1a2e",
                border: "1px solid #333",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{selectedVarietal}</h3>
                  <span style={{
                    padding: "2px 10px",
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 600,
                    background: "#4ade8022",
                    color: "#4ade80",
                  }}>
                    {varietal.terpeneClass} terpenes
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 10 }}>{varietal.notes}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                  {varietal.typicalAromas.map(a => (
                    <span key={a} style={{
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontSize: 10,
                      background: "#ffffff08",
                      color: "#888",
                    }}>{a}</span>
                  ))}
                </div>
                {Object.entries(varietal.profile)
                  .filter(([, v]) => v > 0)
                  .sort((a, b) => b[1] - a[1])
                  .map(([t, v]) => (
                    <TerpeneBar key={t} terpene={t} value={v} maxValue={10} />
                  ))}
              </div>

              {/* Strain Matches */}
              <h3 style={{ fontSize: 14, color: "#a78bfa", marginBottom: 12 }}>
                Top Strain Matches for {selectedVarietal}
              </h3>
              {matches.map((m, i) => (
                <MatchCard key={m.strain} match={m} rank={i + 1} />
              ))}
            </div>
          )}

          {!selectedVarietal && (
            <div style={{ textAlign: "center", padding: 40, color: "#444" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>&#127863; → &#127807;</div>
              <div>Pick a wine varietal above to see matching cannabis strains</div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Algorithm */}
      {activeTab === "algorithm" && <AlgorithmExplainer />}

      {/* Tab: Wineries Route */}
      {activeTab === "wineries" && (
        <div>
          <div style={{
            background: "#0f0f1a",
            border: "1px solid #333",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}>
            <h3 style={{ color: "#4ade80", margin: "0 0 8px 0", fontSize: 14 }}>SMART Train Route</h3>
            <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
              <strong style={{ color: "#fff" }}>Bike to San Rafael SMART Station</strong> → Ride north (~83 min) → <strong style={{ color: "#fff" }}>Arrive Windsor Station</strong>
              <br />Weekend service: 8 round trips. First northbound ~7:16am, last southbound ~7:40pm.
              <br />Bring bikes on train (bike car available). Laptops for hackathon on the ride up.
            </div>
          </div>

          <h3 style={{ fontSize: 14, color: "#a78bfa", marginBottom: 12 }}>
            Wineries by Distance from Windsor SMART Station
          </h3>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 12 }}>
            Click any varietal to jump to the Strain Matcher
          </div>

          {WINERIES.map(w => (
            <WineryCard
              key={w.name}
              winery={w}
              onSelectVarietal={(v) => {
                setSelectedVarietal(v);
                setActiveTab("matcher");
              }}
            />
          ))}
        </div>
      )}

      {/* Tab: Varietal Map */}
      {activeTab === "varietals" && (
        <div>
          <h3 style={{ fontSize: 14, color: "#a78bfa", marginBottom: 4 }}>Wine Varietal → Terpene Map</h3>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 16 }}>
            Relative terpene dominance scores (0-10) based on wine chemistry research
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {Object.entries(TERPENE_COLORS).map(([name, color]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#888" }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: color }} />
                {name}
              </div>
            ))}
          </div>

          {/* Heat map table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 8px", color: "#888", borderBottom: "1px solid #333", position: "sticky", left: 0, background: "#0a0a14", minWidth: 100 }}>Varietal</th>
                  {["linalool", "geraniol", "myrcene", "β-caryophyllene", "α-pinene", "limonene", "α-humulene", "terpinolene"].map(t => (
                    <th key={t} style={{ padding: "6px 4px", color: TERPENE_COLORS[t] || "#888", borderBottom: "1px solid #333", textAlign: "center", minWidth: 32 }}>
                      {t.replace("β-", "β-").replace("α-", "α-").slice(0, 5)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(WINE_VARIETAL_TERPENES).map(([name, data]) => (
                  <tr key={name} style={{ cursor: "pointer" }} onClick={() => { setSelectedVarietal(name); setActiveTab("matcher"); }}>
                    <td style={{ padding: "4px 8px", color: "#ccc", borderBottom: "1px solid #1a1a1a", position: "sticky", left: 0, background: "#0a0a14" }}>
                      {name}
                    </td>
                    {["linalool", "geraniol", "myrcene", "β-caryophyllene", "α-pinene", "limonene", "α-humulene", "terpinolene"].map(t => {
                      const val = data.profile[t] || 0;
                      const opacity = val / 10;
                      const color = TERPENE_COLORS[t] || "#888";
                      return (
                        <td key={t} style={{
                          padding: "4px",
                          textAlign: "center",
                          borderBottom: "1px solid #1a1a1a",
                          background: `${color}${Math.round(opacity * 40).toString(16).padStart(2, "0")}`,
                          color: val > 0 ? "#fff" : "#333",
                          fontFamily: "monospace",
                        }}>
                          {val || "·"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 8 }}>
            Click any row to see strain matches for that varietal
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 32, padding: 16, borderTop: "1px solid #1a1a1a", fontSize: 10, color: "#333" }}>
        Wine terpene data: UC Davis Waterhouse Lab, SevenFifty Daily, Nature Horticulture Research
        <br />Cannabis profiles: Solful Sessions + common strain databases
        <br />Algorithm: Cosine similarity on normalized terpene vectors + dominant terpene bonus
      </div>
    </div>
  );
}
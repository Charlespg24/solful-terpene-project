import { useState } from "react";

// ─── TERPENE COLOR MAP ────────────────────────────────────────────
const TERPENE_COLORS = {
  "Limonene":         "#D4C85C",
  "β-Caryophyllene":  "#C8A97E",
  "Linalool":         "#9B7BA8",
  "α-Bisabolol":      "#8EAEC8",
  "Myrcene":          "#8EAE68",
  "α-Humulene":       "#7C9082",
  "Terpinolene":      "#6BAE8E",
  "α-Pinene":         "#5C8E6B",
  "β-Ocimene":        "#B8785C",
};

// ─── STRAIN DATA ──────────────────────────────────────────────────
const STRAINS = [
  {
    id: "carambola",
    name: "Carambola",
    farm: "Higher Heights",
    county: "Mendocino",
    effects: ["Energetic", "Fun", "Giggly"],
    intent: "Light and playful, effervescent energy.",
    aroma: ["Orange", "Diesel", "Incense"],
    totalTerpenes: "1.45%",
    energy: "HIGH",
    vibe: "Creative Flow · Euphoric Lift",
    accentColor: "#D4C85C",
    symbol: "★",
    terpenes: [
      { name: "Limonene",        pct: 0.44 },
      { name: "β-Caryophyllene", pct: 0.18 },
      { name: "Linalool",        pct: 0.12 },
      { name: "α-Bisabolol",     pct: 0.09 },
    ],
    pairings: {
      complement: [
        {
          brewery: "Parliament Brewing",
          beer: "Birds in Paradise",
          location: "Rohnert Park, CA",
          style: "Sour · POG / Passionfruit Orange",
          abv: "6.4%",
          terpeneLink: "Limonene twin",
          why: "Passionfruit-orange acidity mirrors carambola's limonene fingerprint exactly. The POG sour is carambola in a glass.",
          badge: "Best Match",
          badgeColor: "#D4C85C",
          local: true,
        },
        {
          brewery: "HenHouse Brewing",
          beer: "Rotating Hazy IPA",
          location: "Santa Rosa / Petaluma, CA",
          style: "New England IPA",
          abv: "6–7%",
          terpeneLink: "Limonene · Myrcene",
          why: "Citra and Mosaic hops share carambola's myrcene-limonene profile. Juicy tropical sweetness, no bitterness clash.",
          badge: "Terpene Match",
          badgeColor: "#8EAE68",
          local: true,
        },
      ],
      contrast: [
        {
          brewery: "Russian River Brewing",
          beer: "Blind Pig IPA",
          location: "Santa Rosa, CA",
          style: "West Coast IPA",
          abv: "6.1%",
          terpeneLink: "β-Caryophyllene contrast",
          why: "Piney resinous bitterness creates sharp counterpoint — carambola's brightness pops luminously against the hop backbone.",
          badge: "Sonoma Icon",
          badgeColor: "#8B3A3A",
          local: true,
        },
        {
          brewery: "Mikkeller",
          beer: "Drink'in the Sun",
          location: "SF / Copenhagen",
          style: "Wheat Ale",
          abv: "4.6%",
          terpeneLink: "Linalool · soft contrast",
          why: "Linalool-adjacent wheat softness lets carambola's diesel-incense notes surface cleanly. Gentle structural contrast.",
          badge: "International",
          badgeColor: "#6B7C93",
          local: false,
        },
      ],
      cleanse: [
        {
          brewery: "Athletic Brewing",
          beer: "Run Wild IPA",
          location: "Milford, CT",
          style: "Non-Alcoholic IPA",
          abv: "0.5%",
          terpeneLink: "Citrus hop reset",
          why: "Zero-ABV citrus hop profile cleanses without sedating — essential for cannabis consumers who want full terpene clarity.",
          badge: "NA Option",
          badgeColor: "#7B5EA7",
          local: false,
        },
        {
          brewery: "Cooperage Brewing",
          beer: "Rotating Barrel Sour",
          location: "Santa Rosa, CA",
          style: "Barrel-Aged Sour",
          abv: "5–7%",
          terpeneLink: "Lactic acid reset",
          why: "High acidity + carbonation strips residual sugars, leaving the palate primed for the next limonene wave.",
          badge: "Palate Reset",
          badgeColor: "#3A7DAE",
          local: true,
        },
      ],
    },
  },
  {
    id: "mikesbomba",
    name: "Mike's Bomba",
    farm: "Glentucky Family Farm",
    county: "Sonoma",
    effects: ["Relaxed", "Calm", "Alert"],
    intent: "Grounded calm with clear mental edges.",
    aroma: ["Fuel", "Lemon Cream", "Forest Floor"],
    totalTerpenes: "1.38%",
    energy: "LOW",
    vibe: "Grounded & Present · Calm Focus",
    accentColor: "#C8A97E",
    symbol: "◉",
    terpenes: [
      { name: "β-Caryophyllene", pct: 0.47 },
      { name: "Limonene",        pct: 0.32 },
      { name: "α-Humulene",      pct: 0.18 },
      { name: "Linalool",        pct: 0.07 },
    ],
    pairings: {
      complement: [
        {
          brewery: "Lagunitas Brewing",
          beer: "IPA",
          location: "Petaluma, CA",
          style: "American IPA",
          abv: "6.2%",
          terpeneLink: "β-Caryophyllene · α-Humulene",
          why: "Cascade and Centennial hops are loaded with caryophyllene and humulene — a direct terpene match to Mike's Bomba's dominant profile. The earthy, herbal backbone echoes 'forest floor.'",
          badge: "Terpene Match",
          badgeColor: "#C8A97E",
          local: true,
        },
        {
          brewery: "Bear Republic",
          beer: "Racer 5 IPA",
          location: "Healdsburg, CA",
          style: "West Coast IPA",
          abv: "7%",
          terpeneLink: "β-Caryophyllene · caramel malt",
          why: "Caramel malt adds warmth and body that mirrors the 'lemon cream' softness. Caryophyllene hops lock in with the strain's dominant terpene.",
          badge: "Sonoma Match",
          badgeColor: "#4A7C59",
          local: true,
        },
      ],
      contrast: [
        {
          brewery: "HenHouse Brewing",
          beer: "Rotating Hazy IPA",
          location: "Santa Rosa, CA",
          style: "New England IPA",
          abv: "6–7%",
          terpeneLink: "Myrcene · tropical contrast",
          why: "Juicy tropical softness contrasts Mike's Bomba's earthy fuel/forest character — a lush backdrop that amplifies the lemon cream note by opposition.",
          badge: "Creative Contrast",
          badgeColor: "#8EAE68",
          local: true,
        },
        {
          brewery: "Weihenstephaner",
          beer: "Hefeweizen",
          location: "Bavaria, Germany",
          style: "Hefeweizen",
          abv: "5.4%",
          terpeneLink: "Linalool (yeast-derived)",
          why: "Banana and clove esters from Weihenstephan yeast create an unexpected but harmonious contrast to the 'fuel/forest floor' earthiness.",
          badge: "International",
          badgeColor: "#6B7C93",
          local: false,
        },
      ],
      cleanse: [
        {
          brewery: "Moonlight Brewing",
          beer: "Death & Taxes",
          location: "Santa Rosa, CA",
          style: "Black Lager",
          abv: "4.9%",
          terpeneLink: "Crisp lager cleanse",
          why: "Roast-lite black lager with clean carbonation cuts through caryophyllene's spice and resets the palate without sweetness.",
          badge: "Palate Reset",
          badgeColor: "#3A7DAE",
          local: true,
        },
        {
          brewery: "Orval",
          beer: "Trappist Ale",
          location: "Gaume, Belgium",
          style: "Belgian Pale Ale",
          abv: "6.2%",
          terpeneLink: "Brett dryness",
          why: "Wild brett funk and bone-dry finish are the sommelier-level pairing — the 'forest floor' earthiness bridges directly into Orval's terroir.",
          badge: "Elevated",
          badgeColor: "#8B6914",
          local: false,
        },
      ],
    },
  },
  {
    id: "moonlight",
    name: "Moonlight",
    farm: "Moon Gazer Farms",
    county: "Mendocino",
    effects: ["Physically Relaxed", "Calm", "Grateful"],
    intent: "Soft gratitude in a settled body.",
    aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
    totalTerpenes: "2.67%",
    energy: "MEDIUM",
    vibe: "Grounded & Present · Cozy Comfort",
    accentColor: "#9B7BA8",
    symbol: "◐",
    terpenes: [
      { name: "Myrcene",          pct: 0.74 },
      { name: "β-Caryophyllene",  pct: 0.51 },
      { name: "Terpinolene",      pct: 0.38 },
      { name: "α-Bisabolol",      pct: 0.24 },
    ],
    pairings: {
      complement: [
        {
          brewery: "Firestone Walker",
          beer: "Cali Squeeze Blood Orange",
          location: "Paso Robles, CA",
          style: "Wheat Beer / Hefeweizen",
          abv: "5%",
          terpeneLink: "Linalool · Myrcene · floral-citrus",
          why: "Blood orange wheat is Earl Grey in beer form — bergamot-adjacent citrus + wheat softness maps perfectly onto Moonlight's terpinolene-bisabolol floral character.",
          badge: "Best Match",
          badgeColor: "#9B7BA8",
          local: true,
        },
        {
          brewery: "Barrel Brothers",
          beer: "Fruited Sour",
          location: "Windsor, CA",
          style: "Fruited Kettle Sour",
          abv: "5–6%",
          terpeneLink: "Myrcene · tropical fruit",
          why: "Watermelon and berry fruit additions directly mirror the 'watermelon candy' aroma note. Sonoma-made, terpene-aligned.",
          badge: "Aroma Match",
          badgeColor: "#6BAE8E",
          local: true,
        },
      ],
      contrast: [
        {
          brewery: "Russian River Brewing",
          beer: "Blind Pig IPA",
          location: "Santa Rosa, CA",
          style: "West Coast IPA",
          abv: "6.1%",
          terpeneLink: "β-Pinene contrast",
          why: "Pine resin bitterness cuts Moonlight's lush watermelon sweetness — creates dynamic tension that wakes up the palate between the strain's relaxing waves.",
          badge: "Dynamic Contrast",
          badgeColor: "#8B3A3A",
          local: true,
        },
        {
          brewery: "Boochcraft",
          beer: "Grapefruit Hibiscus",
          location: "Chula Vista, CA",
          style: "Hard Kombucha",
          abv: "7%",
          terpeneLink: "Terpinolene · floral",
          why: "Hibiscus floral acidity contrasts Moonlight's watermelon sweetness while harmonizing with the terpinolene and bisabolol floral notes.",
          badge: "Floral Contrast",
          badgeColor: "#A05C8A",
          local: false,
        },
      ],
      cleanse: [
        {
          brewery: "Altamont Beer Works",
          beer: "Waui Water Lemon Berry",
          location: "Livermore, CA",
          style: "Hard Seltzer",
          abv: "5.5%",
          terpeneLink: "Terpinolene reset",
          why: "Ultra-carbonated and nearly neutral — strips myrcene's sedating residue and snaps the palate back to alert for another pass.",
          badge: "Palate Reset",
          badgeColor: "#3A7DAE",
          local: true,
        },
        {
          brewery: "Health-Ade",
          beer: "Passion Fruit–Tangerine",
          location: "San Rafael, CA",
          style: "Non-Alcoholic Kombucha",
          abv: "0%",
          terpeneLink: "Limonene · probiotic cleanse",
          why: "NA option. Limonene in the tangerine + probiotic acidity cleanses without adding intoxication — ideal for a long tasting session.",
          badge: "NA Option",
          badgeColor: "#7B5EA7",
          local: true,
        },
      ],
    },
  },
  {
    id: "nattybumppo",
    name: "Natty Bumppo",
    farm: "Moon Gazer Farms",
    county: "Mendocino",
    effects: ["Happy", "Carefree", "Physically Relaxed"],
    intent: "Loose and easy, happily untethered.",
    aroma: ["Kerosene", "Musk", "Sour Plum"],
    totalTerpenes: "1.86%",
    energy: "MEDIUM",
    vibe: "Grounded & Present · Social & Bright",
    accentColor: "#7C9082",
    symbol: "◈",
    terpenes: [
      { name: "β-Caryophyllene", pct: 0.63 },
      { name: "Limonene",        pct: 0.35 },
      { name: "α-Humulene",      pct: 0.25 },
      { name: "Myrcene",         pct: 0.19 },
    ],
    pairings: {
      complement: [
        {
          brewery: "Cooperage Brewing",
          beer: "Rotating Barrel Sour",
          location: "Santa Rosa, CA",
          style: "Barrel-Aged Sour",
          abv: "5–7%",
          terpeneLink: "β-Caryophyllene · funky-plum",
          why: "Wild fermentation and barrel funk mirror Natty Bumppo's 'kerosene-musk' character beautifully. Sour plum notes align with the strain's aroma profile directly.",
          badge: "Best Match",
          badgeColor: "#7C9082",
          local: true,
        },
        {
          brewery: "Orval",
          beer: "Trappist Ale",
          location: "Gaume, Belgium",
          style: "Belgian Pale Ale",
          abv: "6.2%",
          terpeneLink: "Brett funk · β-Caryophyllene",
          why: "Brett character translates 'musk' into complexity rather than flaw. The dryness and earthy depth match Natty Bumppo's caryophyllene-humulene earthiness.",
          badge: "Elevated Match",
          badgeColor: "#8B6914",
          local: false,
        },
      ],
      contrast: [
        {
          brewery: "Lagunitas Brewing",
          beer: "IPA",
          location: "Petaluma, CA",
          style: "American IPA",
          abv: "6.2%",
          terpeneLink: "Limonene contrast",
          why: "Bright American citrus hop character cuts Natty Bumppo's heavy musk — the contrast sharpens the 'carefree' effect by adding lightness without competing.",
          badge: "Mood Lift",
          badgeColor: "#D4C85C",
          local: true,
        },
        {
          brewery: "Lost Coast Brewery",
          beer: "Revenant IPA",
          location: "Eureka, CA",
          style: "West Coast IPA (Clear)",
          abv: "7%",
          terpeneLink: "Clear bitter contrast",
          why: "Clean, unfiltered West Coast clarity contrasts Natty Bumppo's murky kerosene character — like cutting through fog. North Coast provenance feels right.",
          badge: "NorCal Local",
          badgeColor: "#4A7C59",
          local: true,
        },
      ],
      cleanse: [
        {
          brewery: "Pond Farm",
          beer: "San Rafael Extra Gold",
          location: "San Rafael, CA",
          style: "Lager – Mexican",
          abv: "6%",
          terpeneLink: "Crisp lager reset",
          why: "Crisp clean lager carbonation with zero terpene interference — pure palate reset. Local Marin County brewing, community anchor.",
          badge: "Palate Reset",
          badgeColor: "#3A7DAE",
          local: true,
        },
        {
          brewery: "Humboldt Cider Co.",
          beer: "Albert's Experiment",
          location: "Eureka, CA",
          style: "Cider – Dry Apple",
          abv: "7%",
          terpeneLink: "Malic acid cleanse",
          why: "Dry apple cider's malic acid is a different acidic pathway than beer — uniquely effective at stripping caryophyllene's spice from the palate.",
          badge: "Cider Option",
          badgeColor: "#6BAE8E",
          local: true,
        },
      ],
    },
  },
  {
    id: "blacklimechem",
    name: "Black Lime Chem",
    farm: "Moon Gazer Farms",
    county: "Mendocino",
    effects: ["Heavy", "Blissful", "Sleepy"],
    intent: "Weighted bliss melting toward rest.",
    aroma: ["Sharp Lime", "Rhubarb", "Glue"],
    totalTerpenes: "3.08%",
    energy: "LOW",
    vibe: "Deep Rest · Body Melt",
    accentColor: "#8EAE68",
    symbol: "◑",
    terpenes: [
      { name: "Myrcene",          pct: 1.69 },
      { name: "α-Pinene",         pct: 0.39 },
      { name: "β-Caryophyllene",  pct: 0.27 },
      { name: "β-Ocimene",        pct: 0.19 },
    ],
    pairings: {
      complement: [
        {
          brewery: "Barebottle Brewing",
          beer: "Small Wonder Dust",
          location: "San Francisco, CA",
          style: "Pale Ale – New England (Hazy)",
          abv: "5.6%",
          terpeneLink: "Myrcene · soft-hazy",
          why: "San Francisco's Barebottle delivers a low-bitterness, myrcene-rich hazy that matches Black Lime Chem's dominant terpene. Soft body doesn't fight the sedation.",
          badge: "SF Local Match",
          badgeColor: "#8EAE68",
          local: true,
        },
        {
          brewery: "Moonlight Brewing",
          beer: "Death & Taxes",
          location: "Santa Rosa, CA",
          style: "Black Lager",
          abv: "4.9%",
          terpeneLink: "Dark depth · Myrcene",
          why: "Sonoma's darkest classic lager has restrained roast and myrcene-adjacent depth. Matches Black Lime Chem's 'weighted bliss' energy — both are slow, dark, smooth.",
          badge: "Vibe Aligned",
          badgeColor: "#4A3A2A",
          local: true,
        },
      ],
      contrast: [
        {
          brewery: "Iron Ox Brewing",
          beer: "Sonoma Coast Pils",
          location: "Santa Rosa, CA",
          style: "German Pilsner",
          abv: "4.8%",
          terpeneLink: "α-Pinene lift contrast",
          why: "Clean, crisp pilsner with noble hops creates a stimulating counterweight to Black Lime Chem's 1.69% myrcene sedation. Pinene in noble hops meets pinene in the strain.",
          badge: "Alert Contrast",
          badgeColor: "#5C8E6B",
          local: true,
        },
        {
          brewery: "Original Pattern × Tenma",
          beer: "The Foundation of Life",
          location: "Oakland, CA",
          style: "German Pilsner",
          abv: "5%",
          terpeneLink: "Noble hop clarity",
          why: "Oakland craft precision in a bright German pils — the crisp clarity creates maximal contrast to the 'glue-rhubarb' heaviness, keeping the session conscious.",
          badge: "Bay Area",
          badgeColor: "#6B7C93",
          local: true,
        },
      ],
      cleanse: [
        {
          brewery: "Health-Ade",
          beer: "Pink Lady Apple Kombucha",
          location: "San Rafael, CA",
          style: "Non-Alcoholic Kombucha",
          abv: "0%",
          terpeneLink: "Malic acid · probiotic reset",
          why: "Apple kombucha's malic acid and light effervescence cut through myrcene's heavy sedating residue. NA is critical — this strain's 1.69% myrcene already does the work.",
          badge: "NA Essential",
          badgeColor: "#7B5EA7",
          local: true,
        },
        {
          brewery: "Altamont Beer Works",
          beer: "Waui Water Lemon Berry",
          location: "Livermore, CA",
          style: "Hard Seltzer",
          abv: "5.5%",
          terpeneLink: "Neutral carbonation reset",
          why: "Zero terpene interference. Pure carbonated cleanse to reset between the rhubarb-glue and the next experience. Maximum contrast from Black Lime Chem's density.",
          badge: "Palate Reset",
          badgeColor: "#3A7DAE",
          local: true,
        },
      ],
    },
  },
];

// ─── TERPENE BAR ──────────────────────────────────────────────────
function TerpeneBar({ terpenes, maxPct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {terpenes.map((t) => {
        const pct = (t.pct / maxPct) * 100;
        const color = TERPENE_COLORS[t.name] || "#888";
        return (
          <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 120, fontSize: 10, fontFamily: "'DM Sans', sans-serif", color: "#9A9080", letterSpacing: "0.05em", flexShrink: 0 }}>
              {t.name}
            </div>
            <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
            <div style={{ width: 36, fontSize: 10, fontFamily: "'DM Sans', sans-serif", color: color, textAlign: "right" }}>
              {t.pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── BEER CARD ────────────────────────────────────────────────────
function BeerCard({ beer, accentColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(232,224,208,0.18)" : "rgba(232,224,208,0.07)"}`,
        borderTop: hovered ? `2px solid ${accentColor}` : "2px solid transparent",
        borderRadius: 4,
        padding: "18px 20px",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#5A5045", marginBottom: 3 }}>
            {beer.local && <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#4A7C59", marginRight: 5, verticalAlign: "middle" }} />}
            {beer.brewery}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#F0E8D8", marginBottom: 2 }}>
            {beer.beer}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6A6050" }}>
            {beer.style} · {beer.abv} · {beer.location}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
          <span style={{
            display: "inline-block", padding: "2px 8px", borderRadius: 2,
            fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            background: `${beer.badgeColor}22`, color: beer.badgeColor,
            border: `1px solid ${beer.badgeColor}44`,
          }}>
            {beer.badge}
          </span>
          <span style={{
            fontSize: 9, fontFamily: "'DM Sans', sans-serif", padding: "2px 8px",
            borderRadius: 20, border: "1px solid rgba(245,200,66,0.25)",
            color: "#B8A060", background: "rgba(245,200,66,0.05)", letterSpacing: "0.06em",
          }}>
            🧬 {beer.terpeneLink}
          </span>
        </div>
      </div>
      <div style={{
        background: "rgba(0,0,0,0.2)",
        borderLeft: `2px solid ${accentColor}55`,
        padding: "8px 12px",
        borderRadius: "0 3px 3px 0",
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: accentColor, marginBottom: 4, opacity: 0.8 }}>
          Why It Works
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9A9080", lineHeight: 1.65, margin: 0 }}>
          {beer.why}
        </p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function VibeCuratorBeerPairing() {
  const [selectedStrain, setSelectedStrain] = useState(STRAINS[0]);
  const [activeTab, setActiveTab] = useState("complement");

  const tabs = [
    { id: "complement", label: "Complement", icon: "◎", desc: "Mirror the terpene" },
    { id: "contrast",   label: "Contrast",   icon: "◈", desc: "Amplify by opposition" },
    { id: "cleanse",    label: "Cleanse",    icon: "◇", desc: "Reset the palate" },
  ];

  const beers = selectedStrain.pairings[activeTab];
  const maxPct = Math.max(...selectedStrain.terpenes.map(t => t.pct));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08090A",
      fontFamily: "'Georgia', serif",
      color: "#E8E0D0",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .strain-btn {
          background: none;
          border: 1px solid rgba(232,224,208,0.08);
          border-radius: 3px;
          padding: 12px 16px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          width: 100%;
        }
        .strain-btn:hover { background: rgba(255,255,255,0.03); border-color: rgba(232,224,208,0.2); }
        .strain-btn.active { background: rgba(255,255,255,0.05); border-color: var(--accent); }

        .tab-btn {
          background: none;
          border: 1px solid rgba(232,224,208,0.1);
          border-radius: 2px;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7A7060;
        }
        .tab-btn:hover { border-color: rgba(232,224,208,0.3); color: #C8B89A; }
        .tab-btn.active { background: rgba(232,224,208,0.07); border-color: rgba(232,224,208,0.4); color: #E8E0D0; }

        .energy-HIGH  { color: #D4C85C; }
        .energy-MEDIUM { color: #8EAE68; }
        .energy-LOW   { color: #8EAEC8; }

        /* subtle grain */
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.02; }
      `}</style>

      <div className="grain" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HEADER ── */}
        <div style={{ padding: "44px 0 32px", borderBottom: "1px solid rgba(232,224,208,0.06)" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#4A4035", marginBottom: 10 }}>
            Vibe Curator · Terpene Beer Pairing · Bay Area & Sonoma Edition
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#F0E8D8", lineHeight: 1.1, marginBottom: 6 }}>
            Strain × Beer Pairing Guide
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6055", lineHeight: 1.6 }}>
            Terpene source independence — the same molecules in cannabis, hops, and botanicals produce identical receptor effects. Match the molecule, elevate the experience.
          </p>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 0, minHeight: "80vh" }}>

          {/* ── STRAIN SIDEBAR ── */}
          <div style={{ borderRight: "1px solid rgba(232,224,208,0.06)", padding: "28px 20px 28px 0" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4035", marginBottom: 14 }}>
              Select Strain
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {STRAINS.map(s => (
                <button
                  key={s.id}
                  className={`strain-btn ${selectedStrain.id === s.id ? "active" : ""}`}
                  style={{ "--accent": s.accentColor }}
                  onClick={() => { setSelectedStrain(s); setActiveTab("complement"); }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: s.accentColor, fontSize: 13 }}>{s.symbol}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: selectedStrain.id === s.id ? "#F0E8D8" : "#9A9080" }}>
                      {s.name}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A4035", paddingLeft: 22 }}>
                    {s.farm}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#3A3028", paddingLeft: 22 }}>
                    {s.county}
                  </div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(232,224,208,0.06)" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A4035", marginBottom: 10 }}>
                Local Indicator
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4A7C59" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#6B6055" }}>Bay Area / Sonoma</span>
              </div>
            </div>
          </div>

          {/* ── DETAIL PANEL ── */}
          <div style={{ padding: "28px 0 28px 28px" }}>

            {/* Strain header */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(232,224,208,0.06)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A4035", marginBottom: 6 }}>
                    {selectedStrain.farm} · {selectedStrain.county}
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: selectedStrain.accentColor, marginBottom: 4 }}>
                    {selectedStrain.name}
                  </h2>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 13, color: "#6B6055", marginBottom: 8 }}>
                    "{selectedStrain.intent}"
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selectedStrain.effects.map(e => (
                      <span key={e} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 10, padding: "2px 9px",
                        borderRadius: 20, border: `1px solid ${selectedStrain.accentColor}44`,
                        color: selectedStrain.accentColor, background: `${selectedStrain.accentColor}11`,
                        letterSpacing: "0.06em",
                      }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4035", marginBottom: 4 }}>
                    Energy Tier
                  </div>
                  <div className={`energy-${selectedStrain.energy}`} style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
                    {selectedStrain.energy}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A4035", marginTop: 4 }}>
                    {selectedStrain.vibe}
                  </div>
                </div>
              </div>

              {/* Aroma + terpenes side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A4035", marginBottom: 8 }}>
                    Aroma Profile
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selectedStrain.aroma.map(a => (
                      <span key={a} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "3px 10px",
                        borderRadius: 2, border: "1px solid rgba(232,224,208,0.12)",
                        color: "#9A9080", background: "rgba(255,255,255,0.025)",
                      }}>{a}</span>
                    ))}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#4A4035", marginTop: 8 }}>
                    Total Terpenes: <span style={{ color: selectedStrain.accentColor }}>{selectedStrain.totalTerpenes}</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A4035", marginBottom: 10 }}>
                    Terpene Profile
                  </div>
                  <TerpeneBar terpenes={selectedStrain.terpenes} maxPct={maxPct} />
                </div>
              </div>
            </div>

            {/* Tab selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4035", marginBottom: 10 }}>
                Pairing Principle
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span style={{ marginRight: 5 }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 12, color: "#5A5045", marginTop: 8 }}>
                "{tabs.find(t => t.id === activeTab)?.desc}"
              </div>
            </div>

            {/* Beer cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {beers.map((beer, i) => (
                <BeerCard key={i} beer={beer} accentColor={selectedStrain.accentColor} />
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(232,224,208,0.05)", padding: "20px 0 32px", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: "#2A2018", letterSpacing: "0.12em" }}>
            Vibe Curator · Terpene Source Independence · Solful × Moon Gazer × Glentucky · Bay Area & Sonoma Brewery Edition
          </div>
        </div>
      </div>
    </div>
  );
}

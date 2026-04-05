import { useState } from "react";

const profile = {
  fruit: "Carambola",
  aka: "Star Fruit",
  terpenes: ["Limonene", "Linalool", "β-Caryophyllene", "Myrcene"],
  sensoryNotes: ["Tropical Citrus", "Floral", "Tart-Sweet", "Crisp", "Watery"],
  mood: "Uplifting · Social · Light",
  colorHex: "#F5C842",
};

const principles = [
  {
    id: "complement",
    label: "Complement",
    tagline: "Mirror the terpene",
    icon: "◎",
    accent: "#D4A843",
    description:
      "Match carambola's limonene-forward tropical profile with beers whose hop or yeast character shares the same citrus-floral terpene pathway.",
    beers: [
      {
        brewery: "Parliament Brewing",
        beer: "Birds in Paradise",
        location: "Rohnert Park, CA",
        style: "Sour · POG / Passionfruit Orange",
        abv: "6.4%",
        terpeneLink: "Limonene + Linalool",
        why:
          "Passionfruit and orange acidity are carambola's flavor twins. Identical tart-tropical fingerprint via shared limonene pathway.",
        badge: "Best Match",
        badgeColor: "#D4A843",
        local: true,
      },
      {
        brewery: "HenHouse Brewing",
        beer: "Rotating Hazy IPA",
        location: "Santa Rosa / Petaluma, CA",
        style: "New England IPA",
        abv: "6–7%",
        terpeneLink: "Limonene · Myrcene",
        why:
          "Juicy tropical hops (mango, citrus) echo carambola's sweetness. Myrcene in Citra/Mosaic hops mirrors myrcene in the fruit.",
        badge: "Terpene Match",
        badgeColor: "#4A7C59",
        local: true,
      },
      {
        brewery: "Mikkeller",
        beer: "Drink'in the Sun",
        location: "SF / Copenhagen",
        style: "Wheat Ale",
        abv: "4.6%",
        terpeneLink: "Linalool · Limonene",
        why:
          "Soft wheat body with citrus zest. Linalool's floral quality aligns perfectly with carambola's delicate floral top note.",
        badge: "International",
        badgeColor: "#6B7C93",
        local: false,
      },
    ],
  },
  {
    id: "contrast",
    label: "Contrast",
    tagline: "Amplify by opposition",
    icon: "◈",
    accent: "#4A7C59",
    description:
      "Use bitterness, earthiness, or malt to create tension. β-Caryophyllene's spicy CB2 activation makes carambola's brightness pop against resinous or roasted backdrops.",
    beers: [
      {
        brewery: "Russian River Brewing",
        beer: "Blind Pig IPA",
        location: "Santa Rosa, CA",
        style: "West Coast IPA",
        abv: "6.1%",
        terpeneLink: "β-Caryophyllene",
        why:
          "Piney, resinous bitterness — high myrcene and caryophyllene in the hops — creates sharp counterpoint that makes carambola's delicacy luminous.",
        badge: "Sonoma Icon",
        badgeColor: "#8B3A3A",
        local: true,
      },
      {
        brewery: "Bear Republic",
        beer: "Racer 5 IPA",
        location: "Healdsburg, CA",
        style: "West Coast IPA",
        abv: "7%",
        terpeneLink: "β-Caryophyllene · Myrcene",
        why:
          "Caramel malt backbone adds body and warmth that contrasts carambola's watery lightness — structural contrast, not flavor conflict.",
        badge: "Local Staple",
        badgeColor: "#4A7C59",
        local: true,
      },
      {
        brewery: "Weihenstephaner",
        beer: "Hefeweizen",
        location: "Bavaria, Germany",
        style: "Hefeweizen",
        abv: "5.4%",
        terpeneLink: "Linalool (yeast-derived)",
        why:
          "Banana/clove esters from Weihenstephan yeast — both linalool-adjacent — create exotic spice contrast to carambola's clean transparency.",
        badge: "International",
        badgeColor: "#6B7C93",
        local: false,
      },
    ],
  },
  {
    id: "cleanse",
    label: "Cleanse",
    tagline: "Reset the palate",
    icon: "◇",
    accent: "#3A7DAE",
    description:
      "High carbonation and acidity dissolve residual sugars between bites. Essential at a tasting event where guests move across multiple fruits and strains.",
    beers: [
      {
        brewery: "Cooperage Brewing",
        beer: "Rotating Barrel Sour",
        location: "Santa Rosa, CA",
        style: "Barrel-Aged Sour",
        abv: "5–7%",
        terpeneLink: "Acidity reset",
        why:
          "High lactic acidity + wild carbonation cuts through any residual sugar. Leaves the palate pristine for the next terpene note.",
        badge: "Palate Reset",
        badgeColor: "#3A7DAE",
        local: true,
      },
      {
        brewery: "Athletic Brewing",
        beer: "Run Wild IPA",
        location: "Milford, CT",
        style: "Non-Alcoholic IPA",
        abv: "0.5%",
        terpeneLink: "Limonene (neutral base)",
        why:
          "Zero-alcohol option for designated drivers and cannabis consumers who want to stay clear. Citrus hop character still supports the pairing.",
        badge: "NA Option",
        badgeColor: "#7B5EA7",
        local: false,
      },
      {
        brewery: "Orval",
        beer: "Trappist Ale",
        location: "Gaume, Belgium",
        style: "Belgian Pale Ale",
        abv: "6.2%",
        terpeneLink: "Brett funk · dry finish",
        why:
          "Wild brett dryness and bone-dry finish cut sweetness with elegance. The sommelier-level pairing for elevated Vibe Curator events.",
        badge: "Elevated",
        badgeColor: "#8B6914",
        local: false,
      },
    ],
  },
];

const avoidList = [
  {
    style: "Imperial Stout / DIPA 8.9%+",
    reason:
      "Roast, extreme bitterness, and high ABV bulldoze carambola's delicate terpene expression entirely.",
  },
  {
    style: "Smoked Beer (Rauchbier)",
    reason:
      "Phenolic smoke permanently coats the palate and extinguishes star fruit's floral top notes.",
  },
  {
    style: "Heavily Lactose-Forward Pastry Stout",
    reason:
      "Residual sweetness competes with and muddies carambola's tart-bright profile.",
  },
];

export default function CarambolaBeerPairing() {
  const [active, setActive] = useState("complement");
  const [hoveredBeer, setHoveredBeer] = useState(null);
  const [showAvoid, setShowAvoid] = useState(false);

  const activeSection = principles.find((p) => p.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E08",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#E8E0D0",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .vc-header { font-family: 'Playfair Display', serif; }
        .vc-body { font-family: 'DM Sans', sans-serif; }

        .terpene-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.08em;
          border: 1px solid rgba(245,200,66,0.35);
          color: #F5C842;
          background: rgba(245,200,66,0.07);
          margin: 2px;
        }

        .principle-btn {
          background: none;
          border: 1px solid rgba(232,224,208,0.15);
          color: #9A9080;
          padding: 10px 22px;
          border-radius: 2px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }
        .principle-btn:hover {
          border-color: rgba(232,224,208,0.4);
          color: #E8E0D0;
        }
        .principle-btn.active {
          background: rgba(232,224,208,0.08);
          border-color: rgba(232,224,208,0.5);
          color: #E8E0D0;
        }

        .beer-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(232,224,208,0.08);
          border-radius: 4px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .beer-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .beer-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(232,224,208,0.2);
          transform: translateY(-2px);
        }
        .beer-card:hover::before { opacity: 1; }

        .badge {
          display: inline-block;
          padding: 2px 9px;
          border-radius: 2px;
          font-size: 9px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .local-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4A7C59;
          margin-right: 6px;
          vertical-align: middle;
        }

        .avoid-row {
          border-bottom: 1px solid rgba(232,224,208,0.07);
          padding: 14px 0;
          transition: background 0.2s;
        }

        .section-icon {
          font-size: 28px;
          line-height: 1;
          margin-bottom: 8px;
          display: block;
        }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
        }
      `}</style>

      <div className="grain-overlay" />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, padding: "60px 40px 40px", maxWidth: 900, margin: "0 auto" }}>

        {/* Vibe Curator label */}
        <div className="vc-body" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6055", marginBottom: 32 }}>
          Vibe Curator · Sensory Pairing Guide
        </div>

        {/* Star fruit visual */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 40, marginBottom: 40 }}>
          <div style={{
            width: 80, height: 80, flexShrink: 0,
            background: "radial-gradient(circle at 40% 35%, #F5D060, #D4960A)",
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            filter: "drop-shadow(0 0 20px rgba(245,200,66,0.3))",
          }} />
          <div>
            <h1 className="vc-header" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.1, color: "#F0E8D8" }}>
              Carambola
            </h1>
            <div className="vc-header" style={{ fontSize: 16, fontStyle: "italic", color: "#8B7D6B", marginBottom: 12 }}>
              Star Fruit · Averrhoa carambola
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {profile.terpenes.map(t => (
                <span key={t} className="terpene-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sensory strip */}
        <div style={{
          background: "rgba(245,200,66,0.06)",
          border: "1px solid rgba(245,200,66,0.15)",
          borderRadius: 3,
          padding: "16px 24px",
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          marginBottom: 48,
        }}>
          {[
            { label: "Flavor Notes", value: profile.sensoryNotes.join(" · ") },
            { label: "Mood Effect", value: profile.mood },
            { label: "pH Range", value: profile.ph + " (high acid)" },
          ].map(item => (
            <div key={item.label}>
              <div className="vc-body" style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6055", marginBottom: 4 }}>{item.label}</div>
              <div className="vc-body" style={{ fontSize: 13, color: "#C8B89A" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Pairing Principle Nav */}
        <div className="vc-body" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6055", marginBottom: 12 }}>
          Pairing Principle
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {principles.map(p => (
            <button
              key={p.id}
              className={`principle-btn ${active === p.id ? "active" : ""}`}
              onClick={() => setActive(p.id)}
            >
              <span style={{ marginRight: 6 }}>{p.icon}</span>{p.label}
            </button>
          ))}
        </div>

        {/* Active section */}
        {activeSection && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 className="vc-header" style={{ fontSize: 26, color: activeSection.accent, marginBottom: 6 }}>
                {activeSection.label}
              </h2>
              <div className="vc-header" style={{ fontSize: 13, fontStyle: "italic", color: "#8B7D6B", marginBottom: 10 }}>
                "{activeSection.tagline}"
              </div>
              <p className="vc-body" style={{ fontSize: 13, color: "#9A9080", lineHeight: 1.7, maxWidth: 620 }}>
                {activeSection.description}
              </p>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {activeSection.beers.map((beer, i) => (
                <div
                  key={i}
                  className="beer-card"
                  style={{ "--accent": activeSection.accent }}
                  onMouseEnter={() => setHoveredBeer(i)}
                  onMouseLeave={() => setHoveredBeer(null)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                    <div>
                      <div className="vc-body" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6055", marginBottom: 4 }}>
                        {beer.local && <span className="local-dot" />}
                        {beer.brewery}
                      </div>
                      <div className="vc-header" style={{ fontSize: 20, color: "#F0E8D8", marginBottom: 2 }}>
                        {beer.beer}
                      </div>
                      <div className="vc-body" style={{ fontSize: 12, color: "#7A7060" }}>
                        {beer.style} · {beer.abv} · {beer.location}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span className="badge" style={{ background: `${beer.badgeColor}22`, color: beer.badgeColor, border: `1px solid ${beer.badgeColor}44` }}>
                        {beer.badge}
                      </span>
                      <span className="terpene-tag" style={{ fontSize: 9 }}>🧬 {beer.terpeneLink}</span>
                    </div>
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,0.025)",
                    borderLeft: `2px solid ${activeSection.accent}55`,
                    padding: "10px 14px",
                    borderRadius: "0 3px 3px 0",
                  }}>
                    <div className="vc-body" style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: activeSection.accent, marginBottom: 5, opacity: 0.8 }}>
                      Why It Works
                    </div>
                    <p className="vc-body" style={{ fontSize: 12, color: "#9A9080", lineHeight: 1.65 }}>
                      {beer.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avoid section toggle */}
        <div style={{ marginTop: 56, borderTop: "1px solid rgba(232,224,208,0.08)", paddingTop: 32 }}>
          <button
            onClick={() => setShowAvoid(!showAvoid)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
              color: showAvoid ? "#C0392B" : "#6B6055",
              transition: "color 0.2s",
            }}
          >
            <span className="vc-body" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {showAvoid ? "▾" : "▸"} &nbsp;Avoid List
            </span>
            <span className="vc-body" style={{ fontSize: 10, color: "inherit", opacity: 0.6 }}>
              — styles that clash with carambola's terpene profile
            </span>
          </button>

          {showAvoid && (
            <div style={{ marginTop: 20 }}>
              {avoidList.map((item, i) => (
                <div key={i} className="avoid-row">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "#8B3A3A", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✕</span>
                    <div>
                      <div className="vc-body" style={{ fontSize: 13, color: "#C0392B", marginBottom: 4 }}>{item.style}</div>
                      <div className="vc-body" style={{ fontSize: 12, color: "#6B6055", lineHeight: 1.6 }}>{item.reason}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(232,224,208,0.05)" }}>
          <div className="vc-body" style={{ fontSize: 10, color: "#4A4035", letterSpacing: "0.1em", textAlign: "center" }}>
            Vibe Curator · Terpene Source Independence Framework · Bay Area & Sonoma Brewery Edition
          </div>
        </div>
      </div>
    </div>
  );
}

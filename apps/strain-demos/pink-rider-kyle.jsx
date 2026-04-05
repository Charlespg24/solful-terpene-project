import { useState } from "react";

const COLORS = {
  bg: "#1A1714",
  bgCard: "#221F1A",
  bgPanel: "#2A2620",
  text: "#F0EDE6",
  textMuted: "#A89F90",
  textDim: "#6B6358",
  accent1: "#E87A90",
  accent2: "#D4537E",
  gold: "#F4C842",
  border: "#3A352D",
  terpinolene: "#7ECBA1",
  caryophyllene: "#E8A87C",
  ocimene: "#B088D4",
  limonene: "#F4D35E",
};

const FONTS = {
  display: "'Fraunces', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const TERPENES = [
  { name: "Terpinolene", pct: 0.38, ratio: 39, color: COLORS.terpinolene, oil: "Tea Tree", food: "Green Apples, Nutmeg, Tea Tree", note: "Rare in cannabis. Drives the creative, uplifting signature." },
  { name: "β-Caryophyllene", pct: 0.22, ratio: 22, color: COLORS.caryophyllene, oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "Binds CB2 directly — anti-inflammatory without psychoactivity." },
  { name: "β-Ocimene", pct: 0.20, ratio: 20, color: COLORS.ocimene, oil: "Basil", food: "Basil, Mango, Orchids", note: "Herbal brightness. Anti-viral and decongestant properties." },
  { name: "Limonene", pct: 0.18, ratio: 18, color: COLORS.limonene, oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption." },
];

const EO_BLEND = [
  { name: "Tea Tree", drops: 12, terpene: "Terpinolene", color: COLORS.terpinolene },
  { name: "Black Pepper", drops: 8, terpene: "β-Caryophyllene", color: COLORS.caryophyllene },
  { name: "Basil", drops: 8, terpene: "β-Ocimene", color: COLORS.ocimene },
  { name: "Lemon", drops: 6, terpene: "Limonene", color: COLORS.limonene },
  { name: "Lavender", drops: 4, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Geranium", drops: 2, terpene: "Geraniol", color: "#D4889C" },
];

const JUICE_INGREDIENTS = [
  { item: "Pink grapefruit juice", amount: "2.75 oz", terpene: "Terpinolene + Limonene" },
  { item: "Fresh lemon juice", amount: "0.75 oz", terpene: "Limonene" },
  { item: "Green apple juice (cold-pressed)", amount: "0.75 oz", terpene: "Terpinolene" },
  { item: "Fresh basil leaves", amount: "3 leaves", terpene: "β-Ocimene" },
  { item: "Cracked black pepper", amount: "1 pinch", terpene: "β-Caryophyllene" },
  { item: "Vanilla extract", amount: "0.25 oz", terpene: "Sweetness bridge" },
  { item: "Honey or maple syrup", amount: "0.25 oz", terpene: "—" },
  { item: "Mineral water", amount: "1.5 oz", terpene: "—" },
];

const PROTOCOL_STEPS = [
  { time: "T – 15 min", label: "Diffuse", desc: "Start diffusing the essential oil blend. 3–4 drops in water. Close the room.", icon: "💨" },
  { time: "T – 10 min", label: "Drink", desc: "Sip the juice. The terpenes begin arriving through your gut lining.", icon: "🥤" },
  { time: "T – 5 min", label: "Read", desc: "Optional: read the narrative priming piece. Activates the default mode network.", icon: "📖" },
  { time: "T – 0", label: "Consume", desc: "Now smoke or vape. Receptors are already primed. The terpenes stack.", icon: "🌿" },
];

function DropDots({ count, color }) {
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: color, opacity: 0.85,
        }} />
      ))}
    </div>
  );
}

export default function PinkRiderKyle() {
  const [activeTab, setActiveTab] = useState("science");

  return (
    <div style={{
      fontFamily: FONTS.body,
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100vh",
      maxWidth: 520,
      margin: "0 auto",
      paddingBottom: 80,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* ═══ HERO ═══ */}
      <div style={{
        padding: "56px 28px 40px",
        background: `linear-gradient(175deg, ${COLORS.accent2}18 0%, ${COLORS.bg} 55%)`,
        borderBottom: `1px solid ${COLORS.border}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent1}12 0%, transparent 70%)`,
        }} />
        <div style={{
          fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 4,
          color: COLORS.accent1, textTransform: "uppercase", marginBottom: 20,
        }}>
          SOLFUL SESSIONS · VIBE CURATOR
        </div>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: 48, fontWeight: 300,
          lineHeight: 1.05, margin: "0 0 8px", letterSpacing: -1,
          background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.gold})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Pink Rider
        </h1>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted,
          marginBottom: 20, letterSpacing: 0.5,
        }}>
          Higher Heights · Mendocino · 26% THC
        </div>
        <p style={{
          fontFamily: FONTS.display, fontSize: 20, fontWeight: 300,
          fontStyle: "italic", color: COLORS.textMuted, lineHeight: 1.5,
          margin: "0 0 24px",
        }}>
          Vivid creative lift with social magnetism.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Motivated", "Creative", "Social"].map(e => (
            <span key={e} style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 11,
              border: `1px solid ${COLORS.accent1}40`, color: COLORS.accent1,
              fontFamily: FONTS.mono, letterSpacing: 0.5,
            }}>{e}</span>
          ))}
        </div>
        <div style={{
          marginTop: 20, fontFamily: FONTS.body, fontSize: 13,
          color: COLORS.textDim, fontStyle: "italic",
        }}>
          Aroma: Lemon Bar · Pink Grapefruit · Sugar Cookie
        </div>
      </div>

      {/* ═══ WHAT YOU EXPERIENCED ═══ */}
      <div style={{ padding: "36px 28px 28px" }}>
        <SectionLabel>What You Experienced</SectionLabel>
        <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 24px" }}>
          That session at our place wasn't just smoking a joint. You were tasting the same molecules
          through three different delivery channels — inhaled from the diffuser, ingested through the juice,
          and then inhaled again from the flower. Every step was priming the same receptors before you ever lit up.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Essential oils → nose → emotional brain in < 2 seconds" },
            { channel: "Juice", path: "Gut → Bloodstream → Brain", desc: "Terpenes absorbed through gut lining, cross blood-brain barrier" },
            { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis terpenes + cannabinoids arrive at pre-loaded receptors" },
          ].map((c, i) => (
            <div key={i} style={{
              padding: "14px 16px", background: COLORS.bgCard,
              borderRadius: 10, borderLeft: `3px solid ${COLORS.accent1}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.accent1, fontWeight: 500 }}>{c.channel}</span>
                <span style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim }}>{c.path}</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ THE CONCEPT ═══ */}
      <div style={{
        padding: "32px 28px", margin: "0 16px",
        background: `linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.bgPanel})`,
        borderRadius: 16, border: `1px solid ${COLORS.border}`,
      }}>
        <SectionLabel>The Concept — Terpene Pre-Loading</SectionLabel>
        <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 20px" }}>
          Every plant that smells — cannabis, lavender, black pepper, basil, rosemary — gets its scent from
          the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
        </p>
        <div style={{
          padding: "16px 18px", background: `${COLORS.gold}08`,
          border: `1px solid ${COLORS.gold}20`, borderRadius: 10, marginBottom: 20,
        }}>
          <p style={{
            fontFamily: FONTS.display, fontSize: 16, fontWeight: 300,
            fontStyle: "italic", color: COLORS.gold, lineHeight: 1.6, margin: 0,
            textAlign: "center",
          }}>
            "The same molecule activates the same receptor — regardless of which plant it came from."
          </p>
        </div>
        <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 16px" }}>
          Terpene Pre-Loading (TPL) means delivering these molecules <em>before</em> you consume cannabis —
          through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
          It's not just "smelling nice." It's temporal sequencing: prime, then amplify.
        </p>
        <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, margin: 0 }}>
          The Pink Rider blend matches its exact terpene fingerprint — terpinolene from tea tree, caryophyllene from
          black pepper, ocimene from basil, limonene from lemon — so your body receives the same chemical signal
          from three sources before the fourth (the flower) ever arrives.
        </p>
      </div>

      {/* ═══ TPL PROTOCOL ═══ */}
      <div style={{ padding: "36px 28px" }}>
        <SectionLabel>The Protocol</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          <div style={{
            position: "absolute", left: 22, top: 30, bottom: 30,
            width: 2, background: `linear-gradient(to bottom, ${COLORS.accent1}60, ${COLORS.accent1}10)`,
          }} />
          {PROTOCOL_STEPS.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, padding: "16px 0",
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: COLORS.bgCard, border: `2px solid ${COLORS.accent1}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accent1,
                    fontWeight: 500,
                  }}>{s.time}</span>
                  <span style={{ fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{s.label}</span>
                </div>
                <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TABBED DEEP DIVE ═══ */}
      <div style={{ padding: "0 28px 36px" }}>
        <div style={{
          display: "flex", gap: 4, marginBottom: 24,
          background: COLORS.bgCard, borderRadius: 12, padding: 4,
        }}>
          {[
            { id: "science", label: "The Science" },
            { id: "terpenes", label: "Terpene Map" },
            { id: "drink", label: "Your Drink" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: "none", cursor: "pointer", fontSize: 11,
              fontFamily: FONTS.mono, letterSpacing: 0.5,
              background: activeTab === t.id ? COLORS.accent1 : "transparent",
              color: activeTab === t.id ? COLORS.bg : COLORS.textMuted,
              fontWeight: activeTab === t.id ? 500 : 400,
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        {/* SCIENCE TAB */}
        {activeTab === "science" && (
          <div>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 300, color: COLORS.text, margin: "0 0 16px" }}>
              Why This Works
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  title: "Source Independence",
                  body: "β-caryophyllene from black pepper activates the CB2 receptor identically to β-caryophyllene from cannabis. Your body doesn't know — or care — where the molecule came from. Proven: Gertsch et al., PNAS 2008."
                },
                {
                  title: "Terpinolene & Creative Flow",
                  body: "Pink Rider's dominant terpene — terpinolene — is rare in cannabis (only ~10% of strains). It drives the uplifting, creative, social character. Tea tree oil is 20–30% terpinolene, which is why it anchors the diffuser blend."
                },
                {
                  title: "Three Delivery Pathways",
                  body: "Inhaled terpenes reach the brain through three routes: olfactory nerve → limbic system (emotion, < 2 sec), trigeminal nerve → autonomic system (alertness), and pulmonary absorption → bloodstream → whole body."
                },
                {
                  title: "Temporal Stacking",
                  body: "Pre-loading 10–15 minutes before consumption means receptors are already partially activated when THC and additional terpenes arrive. The result: a more directed, intentional experience — not a different high, but a more shaped one."
                },
              ].map((s, i) => (
                <div key={i}>
                  <h4 style={{
                    fontFamily: FONTS.mono, fontSize: 11, letterSpacing: 1.5,
                    textTransform: "uppercase", color: COLORS.accent1, margin: "0 0 8px",
                  }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.75, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TERPENE MAP TAB */}
        {activeTab === "terpenes" && (
          <div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: 20,
            }}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 300, color: COLORS.text, margin: 0 }}>
                Terpene Profile
              </h3>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim }}>
                1.44% total
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {TERPENES.map(t => (
                <div key={t.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
                    <div>
                      <span style={{ fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{t.name}</span>
                      <span style={{
                        marginLeft: 10, fontFamily: FONTS.mono, fontSize: 10,
                        color: COLORS.textDim,
                      }}>via {t.oil}</span>
                    </div>
                    <span style={{
                      fontFamily: FONTS.mono, fontSize: 13, color: t.color, fontWeight: 500,
                    }}>{t.pct}%</span>
                  </div>
                  <div style={{
                    height: 8, background: COLORS.bgPanel, borderRadius: 4,
                    overflow: "hidden", marginBottom: 6,
                  }}>
                    <div style={{
                      height: "100%", width: `${t.ratio * 2.2}%`,
                      background: `linear-gradient(90deg, ${t.color}, ${t.color}66)`,
                      borderRadius: 4, transition: "width 0.6s ease",
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.5, marginBottom: 2 }}>
                    Also found in: {t.food}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>{t.note}</div>
                </div>
              ))}
            </div>

            {/* Diffuser Blend */}
            <div style={{
              marginTop: 32, padding: "20px 18px",
              background: COLORS.bgCard, borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
            }}>
              <div style={{
                fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 3,
                color: COLORS.accent1, textTransform: "uppercase", marginBottom: 14,
              }}>
                DIFFUSER BLEND · 40 DROPS / 2ML
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {EO_BLEND.map(o => (
                  <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{o.name}</div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>{o.terpene}</div>
                    </div>
                    <DropDots count={o.drops} color={o.color} />
                    <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim, marginLeft: "auto" }}>
                      {o.drops}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DRINK TAB */}
        {activeTab === "drink" && (
          <div>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 300, color: COLORS.text, margin: "0 0 6px" }}>
              The Pink Rider Juice
            </h3>
            <p style={{ fontFamily: FONTS.display, fontSize: 14, fontStyle: "italic", color: COLORS.textDim, margin: "0 0 20px" }}>
              Pink grapefruit with lemon cookie sweetness
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {JUICE_INGREDIENTS.map((ing, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < JUICE_INGREDIENTS.length - 1 ? `1px solid ${COLORS.border}` : "none",
                }}>
                  <div>
                    <div style={{ fontSize: 13, color: COLORS.text }}>{ing.item}</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>
                      {ing.terpene}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: FONTS.mono, fontSize: 12, color: COLORS.accent1,
                    flexShrink: 0, marginLeft: 16,
                  }}>{ing.amount}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24, padding: "16px 18px",
              background: `${COLORS.accent1}08`, borderRadius: 10,
              border: `1px solid ${COLORS.accent1}15`,
            }}>
              <div style={{
                fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 2,
                color: COLORS.accent1, textTransform: "uppercase", marginBottom: 10,
              }}>METHOD</div>
              <ol style={{
                margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8,
              }}>
                {[
                  "Cold-press the green apples, strain through fine mesh.",
                  "Juice grapefruits and lemons through a citrus juicer.",
                  "Gently muddle basil leaves in the glass.",
                  "Combine all juices. Add vanilla, honey, and a crack of black pepper.",
                  "Stir with ice, strain into a glass. Top with mineral water.",
                  "Garnish with a pink grapefruit wheel.",
                ].map((s, i) => (
                  <li key={i} style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6 }}>{s}</li>
                ))}
              </ol>
            </div>

            <div style={{
              marginTop: 20, padding: "14px 16px",
              background: COLORS.bgCard, borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
            }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.gold, marginBottom: 6 }}>
                WHY THESE INGREDIENTS
              </div>
              <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.65, margin: 0 }}>
                Every ingredient maps to Pink Rider's terpene fingerprint. Pink grapefruit and lemon deliver limonene.
                Green apple is one of the few common fruits with meaningful terpinolene. Basil carries ocimene.
                Black pepper delivers β-caryophyllene — the only terpene that directly binds a cannabinoid receptor.
                You're drinking the strain before you smoke it.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ═══ SPOTIFY ═══ */}
      <div style={{ padding: "0 28px 36px" }}>
        <SectionLabel>The Soundtrack</SectionLabel>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 16 }}>
          Pink Rider's terpinolene signature calls for 105–118 BPM — forward-moving groove, not a sprint.
          Kaytranada, SAULT, Parcels. The iso principle: the music meets where you are and guides you toward the strain's target energy.
        </p>
        <div style={{
          borderRadius: 12, overflow: "hidden", marginBottom: 12,
          border: `1px solid ${COLORS.border}`,
        }}>
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1FwJhVko2QbT7K?utm_source=generator&theme=0"
            width="100%" height="152" frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: 12 }}
          />
        </div>
        <a
          href="https://open.spotify.com/playlist/37i9dQZF1FwJhVko2QbT7K"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, padding: "12px 0", borderRadius: 30,
            background: "#1DB954", color: "#000", textDecoration: "none",
            fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Open in Spotify
        </a>
      </div>

      {/* ═══ INTENT MAP ═══ */}
      <div style={{
        padding: "32px 28px", margin: "0 16px 24px",
        background: COLORS.bgCard, borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
      }}>
        <SectionLabel>It Starts with Intent</SectionLabel>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
          The idea isn't "get high." It's "choose what you want the session to do."
          Pink Rider sits in two categories:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
            { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
            { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
            { name: "Body Melt", desc: "Profound physical ease", active: false },
            { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
            { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
          ].map(v => (
            <div key={v.name} style={{
              padding: "12px 14px", borderRadius: 10,
              background: v.active ? `${COLORS.accent1}12` : COLORS.bgPanel,
              border: `1px solid ${v.active ? COLORS.accent1 + "40" : COLORS.border}`,
              opacity: v.active ? 1 : 0.45,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 500,
                color: v.active ? COLORS.accent1 : COLORS.textMuted, marginBottom: 3,
              }}>{v.name}</div>
              <div style={{ fontSize: 10, color: COLORS.textDim, lineHeight: 1.4 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ COME BACK CTA ═══ */}
      <div style={{
        padding: "40px 28px", margin: "0 16px",
        background: `linear-gradient(135deg, ${COLORS.accent2}10, ${COLORS.gold}08)`,
        borderRadius: 16, border: `1px solid ${COLORS.border}`,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: 28, fontWeight: 300,
          fontStyle: "italic", color: COLORS.text, lineHeight: 1.3, marginBottom: 16,
        }}>
          Next time, we do the whole thing.
        </div>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 8 }}>
          Full protocol. No rush. Diffuser on 15 minutes early. Juice in hand. Playlist queued.
          Narrative priming. Then the flower.
        </p>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
          Pink Rider is just one of 24 strains — each with its own essential oil blend,
          terpene-matched drink, soundtrack, and story. Every vibe has a recipe.
        </p>
        <div style={{
          fontFamily: FONTS.body, fontSize: 14, color: COLORS.gold, fontWeight: 500,
        }}>
          — Chuck & Katie 🌿
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "24px 28px", textAlign: "center",
      }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim,
          letterSpacing: 3, textTransform: "uppercase",
        }}>
          SOLFUL SESSIONS · TERPENES, WITH A TWIST OF AROMATHERAPY
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 3,
      textTransform: "uppercase", color: COLORS.accent1, marginBottom: 14,
      paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`,
    }}>
      {children}
    </div>
  );
}

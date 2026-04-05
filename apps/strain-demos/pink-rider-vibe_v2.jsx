import { useState, useEffect } from "react";

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
};

const FONTS = {
  display: "'Fraunces', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Pink Rider",
  farm: "Higher Heights",
  region: "Mendocino",
  energy: "HIGH",
  intent: "Vivid creative lift with social magnetism.",
  effects: ["Motivated", "Creative", "Social"],
  aroma: ["Lemon Bar", "Pink Grapefruit", "Sugar Cookie"],
  totalTerpenes: "1.44%",
  dominantTerpene: "Terpinolene",
};

const TERPENES = [
  { name: "Terpinolene", pct: 0.38, ratio: 39, color: "#7ECBA1", oil: "Tea Tree", food: "Green Apples, Nutmeg, Tea Tree", note: "Rare in cannabis. Drives the creative, uplifting signature." },
  { name: "β-Caryophyllene", pct: 0.22, ratio: 22, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "Binds CB2 directly — anti-inflammatory without psychoactivity." },
  { name: "β-Ocimene", pct: 0.20, ratio: 20, color: "#B088D4", oil: "Basil", food: "Basil, Mango, Orchids", note: "Herbal brightness. Anti-viral and decongestant properties." },
  { name: "Limonene", pct: 0.18, ratio: 18, color: "#F4D35E", oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption." },
];

const EO_BLEND = [
  { name: "Tea Tree", drops: 12, terpene: "Terpinolene", color: "#7ECBA1" },
  { name: "Black Pepper", drops: 8, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Basil", drops: 8, terpene: "β-Ocimene", color: "#B088D4" },
  { name: "Lemon", drops: 6, terpene: "Limonene", color: "#F4D35E" },
  { name: "Lavender", drops: 4, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Geranium", drops: 2, terpene: "Geraniol", color: "#D4889C" },
];

const BLEND_RATIONALE = "Tea tree delivers the rare terpinolene (30% of blend). Black pepper for caryophyllene. Basil captures ocimene's herbal brightness. Lemon echoes the lemon bar aroma. Lavender softens edges. Geranium adds floral sweetness.";

const PROTOCOL_STEPS = [
  { time: "T – 15 min", label: "Diffuse", desc: "Start diffusing the essential oil blend. 3–4 drops in water. Close the room.", icon: "💨" },
  { time: "T – 10 min", label: "Drink", desc: "Sip the juice. The terpenes begin arriving through your gut lining.", icon: "🥤" },
  { time: "T – 5 min", label: "Read", desc: "Optional: read the narrative priming piece. Activates the default mode network.", icon: "📖" },
  { time: "T – 0", label: "Consume", desc: "Now smoke or vape. Receptors are already primed. The terpenes stack.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Pink Rider Tea", subtitle: "Bright citrus herbal infusion",
    meta: "Teacup · 8oz · 185°F · 4 min · No caffeine",
    ingredients: [
      "1 tsp dried pink grapefruit peel",
      "0.75 tsp dried lemon peel",
      "3-4 dried green apple pieces",
      "0.5 tsp dried basil",
      "0.25 tsp dried rosemary",
      "tiny pinch vanilla powder",
      "0.25 oz sugar syrup or honey",
      "0.1 oz vanilla extract",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Pink Rider Mocktail", subtitle: "Pink grapefruit with creative sugar sparkle",
    meta: "Coupe · 6oz · Chilled · Powdered sugar rim",
    ingredients: [
      "2.75 oz fresh pink grapefruit juice",
      "0.75 oz fresh lemon juice",
      "0.5 oz lemon curd syrup",
      "0.5 oz green apple juice",
      "0.25 oz sugar syrup",
      "2-3 dashes citrus bitters",
    ],
    accent: "#E87A90",
  },
  {
    name: "Pink Rider Cocktail", subtitle: "Gin-spiked pink grapefruit with creative lift",
    meta: "Coupe · 6.5oz · Gin · 15% ABV",
    ingredients: [
      "1.75 oz gin",
      "2 oz fresh pink grapefruit juice",
      "0.75 oz fresh lemon juice",
      "0.5 oz lemon curd syrup",
      "0.5 oz green apple juice",
      "0.25 oz sugar syrup",
      "2-3 dashes citrus bitters",
      "2-3 fresh basil leaves + 1 sprig rosemary",
    ],
    accent: "#B088D4",
  },
  {
    name: "Pink Rider Juice", subtitle: "Pink grapefruit with lemon cookie sweetness",
    meta: "Highball · 8oz · Chilled",
    ingredients: [
      "2.75 oz fresh pink grapefruit juice",
      "0.75 oz fresh lemon juice",
      "0.75 oz green apple juice (cold-pressed)",
      "3 fresh basil leaves",
      "1 pinch cracked black pepper",
      "0.25 oz vanilla extract",
      "0.25 oz honey or maple syrup",
      "1.5 oz mineral water",
    ],
    accent: "#7ECBA1",
  },
  {
    name: "Pink Rider Shot", subtitle: "One-sip citrus creative spark",
    meta: "Shot · 2oz · Frozen",
    ingredients: [
      "1 oz gin",
      "0.75 oz fresh pink grapefruit juice",
      "0.25 oz fresh lemon juice",
      "0.1 oz lemon curd syrup",
    ],
    accent: "#E8A87C",
  },
];

const MUSIC = {
  bpm: "94–121 BPM",
  description: "Pink Rider's terpinolene signature calls for 94–121 BPM — forward-moving groove, not a sprint. Tame Impala, MGMT, Washed Out, Khruangbin. The iso principle: the music meets where you are and guides you toward the strain's target energy.",
  artists: ["Tame Impala", "MGMT", "Washed Out", "Khruangbin"],
  genres: ["psychedelic", "indie electronic", "synth pop", "deep house"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Clean surfaces, standing desk or movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning through early afternoon. Best for creative work sessions." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "Tea tree hits first — twelve drops of the rare sharp clarity, the rarest lead terpene in the entire collection. Higher Heights' Mendocino creative engine runs on an unusual fuel, and the oil blend respects that by opening with clarity rather than warmth, with sharp edges rather than soft ones, with the clean brightness of a morning that has no fog and no apology for the absence of fog.\n\nBlack pepper and basil arrive together at eight drops each, the warm spice and the bright herbal molecule building a foundation that MGMT would recognize: psychedelic enough to see colors that do not exist, grounded enough to paint with them on surfaces that do. Lemon adds six drops of the lemon bar aroma — not the bright citrus of a morning glass but the sweet-tart richness of a dessert that happens to be made of sunshine and butter and the kind of sugar that remembers being a cane in a warm field.\n\nLavender provides four drops of softness, the sugar cookie note that turns the creative lift from sharp and potentially overwhelming to inviting and sustainable — the difference between a spotlight and a lantern, between energy that burns and energy that glows. Geranium closes with two drops of pink grapefruit florality, and suddenly the name makes complete sense: pink is the color of this blend, the warm-cool hybrid that happens when citrus meets floral meets herbal in the proportions that only this specific strain demands.\n\nThe social magnetism is not a metaphor. Pink Rider does not make you creative in isolation — it makes you creative in company, the kind of person who says something unexpected and watches the room lean in rather than lean back, the kind of energy that treats other people's ideas as fuel rather than competition.\n\nA woman stands at a whiteboard covered in colored markers, and the six oils have turned the conference room into a studio. The clarity-driven clarity is the sharp line, the basil brightness is the color, the lemon-lavender sweetness is the reason everyone in the room wants to stay for another hour even though the meeting was scheduled to end twenty minutes ago.\n\nThe blend understands that the best ideas arrive when someone is vivid enough to catch them and generous enough to share them, and the pink grapefruit in the Mendocino air is the standing invitation to do both, and the whiteboard is filling up, and nobody is reaching for their phone.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
];

const FLOATERS = [
  { left: 8, size: 18, delay: 0, dur: 14 },
  { left: 22, size: 10, delay: 3, dur: 18 },
  { left: 38, size: 24, delay: 1.5, dur: 16 },
  { left: 55, size: 14, delay: 4, dur: 20 },
  { left: 70, size: 20, delay: 2, dur: 15 },
  { left: 85, size: 12, delay: 5, dur: 19 },
  { left: 15, size: 16, delay: 6, dur: 17 },
  { left: 62, size: 9, delay: 7, dur: 21 },
];

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

function TerpeneBar({ terpene, index }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(terpene.ratio * 2.2), 300 + index * 150);
    return () => clearTimeout(t);
  }, [terpene.ratio, index]);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
        <div>
          <span style={{ fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{terpene.name}</span>
          <span style={{ marginLeft: 10, fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>via {terpene.oil}</span>
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: terpene.color, fontWeight: 500 }}>{terpene.pct}%</span>
      </div>
      <div style={{ height: 8, background: COLORS.bgPanel, borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
        <div style={{
          height: "100%", width: `${width}%`,
          background: `linear-gradient(90deg, ${terpene.color}, ${terpene.color}66)`,
          borderRadius: 4, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
      <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.5, marginBottom: 2 }}>Also found in: {terpene.food}</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>{terpene.note}</div>
    </div>
  );
}

function BeverageCard({ bev }) {
  return (
    <div style={{
      background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
      borderRadius: 12, padding: 18, marginBottom: 14,
    }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 18, color: COLORS.text, marginBottom: 2, fontWeight: 400 }}>{bev.name}</div>
      <div style={{ fontSize: 12, color: bev.accent, marginBottom: 12, fontStyle: "italic" }}>{bev.subtitle}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.7 }}>
        {bev.ingredients.map((ing, i) => (
          <div key={i} style={{ paddingLeft: 10, borderLeft: `1px solid ${bev.accent}33`, marginBottom: 4 }}>{ing}</div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, letterSpacing: 0.5 }}>{bev.meta}</div>
    </div>
  );
}

export default function PinkRiderVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,122,144,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Pink geometric floaters */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {FLOATERS.map((f, i) => (
          <div key={i} style={{
            position: "absolute", left: `${f.left}%`, bottom: -40,
            width: f.size, height: f.size, borderRadius: i % 2 === 0 ? "50%" : "2px",
            background: `${COLORS.accent1}30`,
            border: `1px solid ${COLORS.accent1}50`,
            animation: `floatUp ${f.dur}s linear infinite`,
            animationDelay: `${f.delay}s`,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent2}18 0%, ${COLORS.bg} 55%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative", overflow: "hidden",
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
            {STRAIN.name}
          </h1>
          <div style={{
            fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textMuted,
            marginBottom: 20, letterSpacing: 0.5,
          }}>
            {STRAIN.farm} · {STRAIN.region} · {STRAIN.energy} ENERGY
          </div>
          <p style={{
            fontFamily: FONTS.display, fontSize: 20, fontWeight: 300,
            fontStyle: "italic", color: COLORS.textMuted, lineHeight: 1.5,
            margin: "0 0 24px",
          }}>
            {STRAIN.intent}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {STRAIN.effects.map(e => (
              <span key={e} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 11,
                border: `1px solid ${COLORS.accent1}40`, color: COLORS.accent1,
                fontFamily: FONTS.mono, letterSpacing: 0.5,
              }}>{e}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: COLORS.textDim, fontStyle: "italic" }}>
            Aroma: {STRAIN.aroma.join(" · ")}
          </div>
        </div>

        {/* WHAT YOU EXPERIENCED */}
        <div style={{ padding: "36px 28px 28px" }}>
          <SectionLabel>What You Experienced</SectionLabel>
          <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 24px" }}>
            A Pink Rider session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Essential oils → nose → emotional brain in under 2 seconds" },
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

        {/* THE CONCEPT */}
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

        {/* TPL PROTOCOL */}
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
                    <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.accent1, fontWeight: 500 }}>{s.time}</span>
                    <span style={{ fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{s.label}</span>
                  </div>
                  <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TERPENE PROFILE */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>Terpene Profile</SectionLabel>
          <div style={{
            display: "flex", justifyContent: "space-between", marginBottom: 24,
            padding: "14px 16px", background: COLORS.bgCard,
            borderRadius: 10, border: `1px solid ${COLORS.border}`,
          }}>
            <div>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, textTransform: "uppercase", letterSpacing: 1 }}>Total</div>
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 300 }}>{STRAIN.totalTerpenes}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, textTransform: "uppercase", letterSpacing: 1 }}>Dominant</div>
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 300 }}>{STRAIN.dominantTerpene}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, textTransform: "uppercase", letterSpacing: 1 }}>Energy</div>
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 300 }}>{STRAIN.energy}</div>
            </div>
          </div>
          {TERPENES.map((t, i) => <TerpeneBar key={t.name} terpene={t} index={i} />)}
        </div>

        {/* ESSENTIAL OIL BLEND */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>Essential Oil Blend · 40 Drops / 2ml</SectionLabel>
          <div style={{
            padding: "20px 18px", background: COLORS.bgCard,
            borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 16,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {EO_BLEND.map(o => (
                <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 110, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{o.name}</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim }}>{o.terpene}</div>
                  </div>
                  <DropDots count={o.drops} color={o.color} />
                  <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.textDim, marginLeft: "auto" }}>{o.drops}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
            {BLEND_RATIONALE}
          </p>
        </div>

        {/* BEVERAGES */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>The Terpene Beverages</SectionLabel>
          <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
            Every ingredient maps to Pink Rider's terpene fingerprint. Pink grapefruit and lemon deliver limonene.
            Green apple delivers terpinolene. Basil carries ocimene. Black pepper delivers β-caryophyllene.
            You're drinking the strain before you smoke it.
          </p>
          {BEVERAGES.map(b => <BeverageCard key={b.name} bev={b} />)}
        </div>

        {/* MUSIC / SPOTIFY */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>The Soundtrack · {MUSIC.bpm}</SectionLabel>
          <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 16 }}>
            {MUSIC.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {MUSIC.artists.map(a => (
              <span key={a} style={{
                padding: "5px 12px", borderRadius: 20,
                background: COLORS.bgCard, border: `1px solid ${COLORS.border}`,
                fontSize: 12, color: COLORS.textMuted,
              }}>{a}</span>
            ))}
          </div>
          <div style={{
            padding: "20px", borderRadius: 12, marginBottom: 12,
            background: `linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.bgPanel})`,
            border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 2, color: COLORS.gold, textTransform: "uppercase" }}>ISO Principle</div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.63 · Valence 0.67</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "94", mins: "5" },
                { phase: "Peak", bpm: "121", mins: "15" },
                { phase: "Coast", bpm: "107", mins: "10" },
              ].map(p => (
                <div key={p.phase} style={{ padding: "10px 10px", background: COLORS.bgPanel, borderRadius: 8, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.accent1, lineHeight: 1, fontWeight: 300 }}>{p.bpm}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>BPM · {p.mins}min</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, lineHeight: 1.6, fontStyle: "italic" }}>
              Genres: {MUSIC.genres.join(" · ")}
            </div>
          </div>
          <a
            href="https://open.spotify.com/playlist/37i9dQZF1Fx3keFOTjUeg1"
            target="_blank" rel="noopener noreferrer"
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

        {/* ENVIRONMENT */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>The Environment</SectionLabel>
          {ENVIRONMENT.map(e => (
            <div key={e.label} style={{
              padding: "14px 16px", marginBottom: 12,
              background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: COLORS.accent1 }}>{e.icon}</span>
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 10, letterSpacing: 2,
                  textTransform: "uppercase", color: COLORS.textDim,
                }}>{e.label}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: COLORS.textMuted }}>{e.body}</div>
            </div>
          ))}
          <div style={{
            marginTop: 16, padding: "16px 18px",
            background: `${COLORS.gold}08`, border: `1px solid ${COLORS.gold}20`, borderRadius: 10,
          }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 2, color: COLORS.gold, textTransform: "uppercase", marginBottom: 8 }}>
              Breath Guidance
            </div>
            <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              {BREATH_GUIDANCE}
            </p>
          </div>
        </div>

        {/* NARRATIVE */}
        <div style={{ padding: "0 28px 40px" }}>
          <SectionLabel>The Narrative · Grapefruit Canvas</SectionLabel>
          <div style={{ fontFamily: FONTS.body, fontSize: 14, lineHeight: 1.8, color: COLORS.textMuted }}>
            {NARRATIVE.split("\n\n").map((para, i) => (
              <p key={i} style={{ margin: "0 0 16px" }}>{para}</p>
            ))}
          </div>
        </div>

        {/* INTENT MAP */}
        <div style={{
          padding: "32px 28px", margin: "0 16px 24px",
          background: COLORS.bgCard, borderRadius: 16, border: `1px solid ${COLORS.border}`,
        }}>
          <SectionLabel>It Starts with Intent</SectionLabel>
          <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.65, marginBottom: 20 }}>
            The idea isn't "get high." It's "choose what you want the session to do." Pink Rider sits in two categories:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {VIBES.map(v => (
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

        {/* FOOTER */}
        <div style={{ padding: "24px 28px", textAlign: "center" }}>
          <div style={{
            fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim,
            letterSpacing: 3, textTransform: "uppercase",
          }}>
            SOLFUL SESSIONS · TERPENES, WITH A TWIST OF AROMATHERAPY
          </div>
        </div>
      </div>
    </div>
  );
}

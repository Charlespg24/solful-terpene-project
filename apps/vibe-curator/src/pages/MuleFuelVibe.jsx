import { useState, useEffect } from "react";

const COLORS = {
  bg: "#15120E",
  bgCard: "#1E1A14",
  bgPanel: "#28231A",
  text: "#EFE4D4",
  textMuted: "#B49E80",
  textDim: "#75654F",
  accent1: "#C87A4A",
  accent2: "#A8623A",
  gold: "#D49060",
  border: "#3A3024",
};

const FONTS = {
  display: "'Bitter', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Mule Fuel",
  farm: "Alpenglow Farms",
  region: "Humboldt",
  energy: "LOW",
  intent: "Gentle contentment settling toward rest.",
  effects: ["Happy", "Hungry", "Sleepy"],
  aroma: ["Skunk", "Diesel", "Lemon", "Leather"],
  totalTerpenes: "3.97%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 2.22, ratio: 56, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Lemongrass", note: "The sedating terpene. Heavy body relaxation. Couch-lock warmth." },
  { name: "α-Pinene", pct: 0.54, ratio: 14, color: "#6BAE8E", oil: "Pine", food: "Pine Needles, Rosemary, Basil, Dill", note: "Sharp forest clarity. Keeps the sedation honest and awake." },
  { name: "β-Caryophyllene", pct: 0.34, ratio: 9, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — spicy, grounding warmth with no psychoactivity." },
  { name: "Limonene", pct: 0.28, ratio: 7, color: "#F4D35E", oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Citrus lift that cuts the diesel and opens the room." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 20, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Pine", drops: 8, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lemon", drops: 6, terpene: "Limonene", color: "#F4D35E" },
];

const BLEND_RATIONALE = "Exceptionally high myrcene (2.22%) makes this the most sedating strain. Lemongrass dominates the blend (50%) to match. Pine needle oil captures the pinene for alertness contrast. Black pepper for caryophyllene. Lemon for the citrus diesel notes.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + pine. Dim the lights. Low seating, soft throws, candles at eye level.", icon: "◐" },
  { time: "T – 15 min", label: "Sip", desc: "Pour Herb Quietude tea or the Lemongrass Rest mocktail. Warm citrus through the gut.", icon: "◡" },
  { time: "T – 5 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Parasympathetic surrender.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. The room goes horizontal.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Herb Quietude Tea", subtitle: "Lemongrass and lemon tea with deep rosemary-bay calm",
    meta: "Teacup · 6oz · 185°F · 5 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "1 tbsp fresh lemongrass (bruised)",
      "1 bay leaf",
      "0.5 tsp dried rosemary",
      "0.5 oz fresh lemon juice",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Lemongrass Rest Mocktail", subtitle: "Lemongrass and lemon with gentle leather-like rosemary earthiness",
    meta: "Highball · 8oz · Chilled",
    ingredients: [
      "2 oz lemongrass-steeped water",
      "2 oz fresh lemon juice",
      "0.75 oz rosemary simple syrup",
      "2 oz ginger ale",
      "1 lemongrass stalk + lemon wheel",
    ],
    accent: "#6BAE8E",
  },
  {
    name: "Dark Comfort Cocktail", subtitle: "Dark rum's depth settles with lemongrass and diesel warmth",
    meta: "Rocks · 5oz · Dark rum · ~35% ABV",
    ingredients: [
      "2.5 oz dark rum (infused)",
      "1 tbsp fresh lemongrass (stir-infuse)",
      "0.5 oz fresh lemon juice",
      "0.5 oz rosemary-bay leaf syrup",
      "1 bay leaf + lemon peel",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Sleepy Lemon Juice", subtitle: "Cold-pressed lemongrass and lemon with earthy rosemary finish",
    meta: "Juice glass · 8oz · Ice cold · 60 min window",
    ingredients: [
      "3 oz fresh lemongrass (pressed)",
      "2 oz fresh lemon (pressed)",
      "1.5 oz rosemary-bay leaf water",
      "1 lemongrass blade + bay leaf",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Fuel Descent Shot", subtitle: "A grounding fuel-forward moment with lemon brightness",
    meta: "Shot · 1.5oz · Room temp · Consume immediately",
    ingredients: [
      "1.5 oz dark rum (infused)",
      "0.5 tsp fresh lemongrass (stir-infuse)",
      "0.5 oz fresh lemon juice",
      "pinch bay leaf + lemongrass blade",
    ],
    accent: "#7ec8a0",
  },
];

const MUSIC = {
  bpm: "70–92 BPM",
  description: "A calm, grounding, slow session. Gentle contentment settling toward rest. Ambient, dub, lo-fi hip hop, acoustic folk — the music meets where you are and eases toward horizontal.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Bon Iver"],
  genres: ["ambient", "dub", "lo-fi hip hop", "acoustic folk", "post-rock"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Dim (20-30%), 2400K. Low seating, soft throws, candles at eye level. Minimize overhead lighting." },
  { label: "Setting", icon: "◇", body: "Linen, wool, velvet, warm wood textures. 68°F room temperature. Lemongrass and pine diffusing 30 minutes before." },
  { label: "Breathwork", icon: "◠", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic target." },
  { label: "Timing", icon: "◷", body: "Evening and late night. Best when the day has already given up its agenda." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "Twenty drops of lemongrass, and the room goes horizontal. This is the highest sedating terpene load in the entire collection, and Alpenglow Farms' Humboldt sedative announces its presence with the confidence of someone who knows exactly how this evening ends: contentment first, then hunger, then the kind of sleep that does not remember falling asleep, only waking.\n\nPine needle oil provides eight drops of the sharpest clarity in the blend, a significant sharp evergreen counterpoint that Brian Eno would appreciate for its structural function rather than its beauty — it is the scaffolding that keeps the sedating quality from becoming formless, the awareness within the sedation, the lighthouse beam turning slowly in the fog to prove that solid things still exist.\n\nBlack pepper adds six drops of spiced warmth, the warm spice that makes the skunk-diesel-leather aroma feel like a worn leather jacket found in a closet rather than a chemical signature found in a laboratory. Lemon follows with six drops, and the citrus cuts through the heaviness with the precision of a single candle in a very dark room — not enough light to read by, but enough to know where the walls are.\n\nThe four oils are deliberately simple. No floral distractions, no herbal complexity, no seventh oil adding nuance to nuance. The most sedating strain in the collection deserves the most direct blend, the shortest distance between the diffuser and the nervous system's surrender. The math is honest: lemongrass does most of the work because sedating warmth does most of the work.\n\nA man opens the refrigerator and stands in its light, considering options with the careful attention that Mule Fuel applies to appetite. The happy-hungry-sleepy progression is not a sequence unfolding over hours but a simultaneous chord, three notes played at once that only make sense together. The lemon in the air catches the diesel quality of the flower's memory and softens it into something domestic and kind, and the pine keeps everything just sharp enough to enjoy the cold chicken and the leftover rice before the final descent.\n\nThe leather scent is not in any bottle on the shelf. It is what happens when the body gives up its resistance and the evening gives up its agenda, and the blend fills the space that both leave behind.";

const VIBES = [
  { name: "Grounded & Present", desc: "Settled body, anchored breath", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const WISPS = [
  { left: 8, width: 70, height: 180, delay: 0, dur: 24 },
  { left: 24, width: 90, height: 220, delay: 5, dur: 28 },
  { left: 45, width: 60, height: 160, delay: 2, dur: 22 },
  { left: 62, width: 100, height: 240, delay: 8, dur: 30 },
  { left: 78, width: 75, height: 190, delay: 3, dur: 26 },
  { left: 90, width: 55, height: 150, delay: 11, dur: 23 },
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
    const t = setTimeout(() => setWidth(terpene.ratio * 1.5), 300 + index * 150);
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

export default function MuleFuelVibe() {
  const spotifyQuery = encodeURIComponent("Bonobo Thievery Corporation Nujabes Bon Iver ambient dub");
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes driftWisp {
          0% { transform: translateY(100vh) translateX(0px) scale(0.9); opacity: 0; }
          15% { opacity: 0.35; }
          50% { transform: translateY(20vh) translateX(-20px) scale(1.05); opacity: 0.3; }
          85% { opacity: 0.2; }
          100% { transform: translateY(-60vh) translateX(15px) scale(1.2); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,122,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Diesel smoke wisps */}
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <defs>
          <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
          </filter>
          <radialGradient id="wispGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.accent1} stopOpacity="0.55" />
            <stop offset="60%" stopColor={COLORS.accent2} stopOpacity="0.25" />
            <stop offset="100%" stopColor={COLORS.accent2} stopOpacity="0" />
          </radialGradient>
        </defs>
        {WISPS.map((w, i) => (
          <g key={i} style={{
            animation: `driftWisp ${w.dur}s ease-in-out infinite`,
            animationDelay: `${w.delay}s`,
            transformOrigin: "center",
          }}>
            <ellipse
              cx={`${w.left}%`}
              cy="100%"
              rx={w.width}
              ry={w.height}
              fill="url(#wispGrad)"
              filter="url(#smokeBlur)"
            />
          </g>
        ))}
      </svg>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent1}18 0%, ${COLORS.bg} 55%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent1}20 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 4,
            color: COLORS.accent1, textTransform: "uppercase", marginBottom: 20,
          }}>
            SOLFUL SESSIONS · VIBE CURATOR
          </div>
          <h1 style={{
            fontFamily: FONTS.display, fontSize: 52, fontWeight: 500,
            lineHeight: 1.05, margin: "0 0 8px", letterSpacing: -1,
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.accent2})`,
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
            fontFamily: FONTS.display, fontSize: 21, fontWeight: 400,
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
            A Mule Fuel session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + pine → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Lemongrass + lemon terpenes cross the blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis myrcene arrives at already-activated receptors" },
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
            Every plant that smells — cannabis, lemongrass, pine, black pepper, lemon — gets its scent from
            the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${COLORS.gold}08`,
            border: `1px solid ${COLORS.gold}20`, borderRadius: 10, marginBottom: 20,
          }}>
            <p style={{
              fontFamily: FONTS.display, fontSize: 16, fontWeight: 400,
              fontStyle: "italic", color: COLORS.gold, lineHeight: 1.6, margin: 0,
              textAlign: "center",
            }}>
              "The same molecule activates the same receptor — regardless of which plant it came from."
            </p>
          </div>
          <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 16px" }}>
            Terpene Pre-Loading means delivering these molecules <em>before</em> you consume cannabis —
            through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
            Not just "smelling nice." Temporal sequencing: prime, then amplify.
          </p>
          <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, margin: 0 }}>
            The Mule Fuel blend matches its exact terpene fingerprint — myrcene from lemongrass, pinene from
            pine needle, caryophyllene from black pepper, limonene from lemon — so your body receives the same
            chemical signal from three sources before the fourth (the flower) ever arrives.
          </p>
        </div>

        {/* PROTOCOL */}
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
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 400 }}>{STRAIN.totalTerpenes}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, textTransform: "uppercase", letterSpacing: 1 }}>Dominant</div>
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 400 }}>{STRAIN.dominantTerpene}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: FONTS.mono, textTransform: "uppercase", letterSpacing: 1 }}>Energy</div>
              <div style={{ fontSize: 22, fontFamily: FONTS.display, fontWeight: 400 }}>{STRAIN.energy}</div>
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
            Every ingredient maps to Mule Fuel's terpene fingerprint. Lemongrass delivers myrcene. Rosemary and bay carry
            pinene. Black pepper provides caryophyllene. Lemon brings limonene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.32 · Valence 0.41</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Settle", bpm: "70", mins: "10" },
                { phase: "Immerse", bpm: "65", mins: "15" },
                { phase: "Emerge", bpm: "80", mins: "5" },
              ].map(p => (
                <div key={p.phase} style={{ padding: "10px 10px", background: COLORS.bgPanel, borderRadius: 8, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.accent1, lineHeight: 1, fontWeight: 400 }}>{p.bpm}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>BPM · {p.mins}min</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, lineHeight: 1.6, fontStyle: "italic" }}>
              Genres: {MUSIC.genres.join(" · ")}
            </div>
          </div>
          <a
            href={`https://open.spotify.com/search/${spotifyQuery}`}
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
          <SectionLabel>The Narrative · Leather & Lemon</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Mule Fuel lives in three categories:
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

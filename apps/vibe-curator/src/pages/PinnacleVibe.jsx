import { useState, useEffect } from "react";

const COLORS = {
  bg: "#140E18",
  bgCard: "#1E1822",
  bgPanel: "#28212D",
  text: "#E8D8C4",
  textMuted: "#B4A594",
  textDim: "#7A6F62",
  accent1: "#E8D8C4",
  accent2: "#D4C0A8",
  gold: "#D4A574",
  border: "#3A3040",
};

const FONTS = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Pinnacle",
  farm: "Dos Rios Farms",
  region: "Mendocino",
  energy: "LOW",
  intent: "Deep surrender into velvet quiet.",
  effects: ["Heavy", "Sedative", "Blissful"],
  aroma: ["Sweet Cream", "Nutmeg", "Fennel Seeds"],
  totalTerpenes: "3.35%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.61, ratio: 18, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — deep anti-inflammatory warmth, grounding without psychoactivity." },
  { name: "Limonene", pct: 0.46, ratio: 14, color: "#F4D35E", oil: "Sweet Orange", food: "Citrus Peels, Juniper, Dill", note: "Softens the sedation with a luminous citrus lift. Mood elevation that meets the surrender." },
  { name: "α-Humulene", pct: 0.19, ratio: 6, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng, Coriander", note: "Earthy herbal depth. The ancient, grounding sibling of caryophyllene." },
  { name: "trans-β-Farnesene", pct: 0.14, ratio: 4, color: "#D4A8BC", oil: "Ylang Ylang", food: "Ylang Ylang, Apples, German Chamomile", note: "The rare exotic molecule that amplifies the blissful quality into the primary experience." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Sweet Orange", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "Rosemary", drops: 6, terpene: "β-Caryophyllene", color: "#B88A5A" },
  { name: "Sage", drops: 6, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Ylang Ylang", drops: 4, terpene: "trans-β-Farnesene", color: "#D4A8BC" },
  { name: "Clove", drops: 2, terpene: "β-Caryophyllene", color: "#9A6A3A" },
];

const BLEND_RATIONALE = "The heaviest, most sedative strain. Black pepper and rosemary together deliver concentrated caryophyllene. Sweet orange for the limonene and sweet cream aroma. Sage for humulene with earthy depth. Ylang ylang is one of the few oils containing farnesene, amplifying the blissful effect.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing black pepper + sweet orange. Dim the lights. Pull the throws close. Candles at eye level.", icon: "☾" },
  { time: "T – 15 min", label: "Sip", desc: "Warm the Nutmeg Dream tea or pour the Velvet Descent mocktail. Coconut cream and nutmeg guide you down.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Each exhale pulls gravity deeper into your seat.", icon: "◡" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene and farnesene. The velvet quiet arrives without negotiation.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Nutmeg Dream Tea", subtitle: "Warming fennel and nutmeg tea for deep rest",
    meta: "Teacup · 6oz · 185°F · 5 min · 0mg caffeine",
    ingredients: [
      "6 oz Filtered water",
      "1 tsp Fennel seeds (toasted)",
      "1 piece Clove",
      "0.25 tsp Freshly grated nutmeg",
      "1 tsp Raw honey",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Velvet Descent Mocktail", subtitle: "Coconut cream and nutmeg guide you into blissful surrender",
    meta: "Coupe · 5.5oz · Warm (145°F)",
    ingredients: [
      "2 oz Coconut cream (warmed)",
      "0.25 tsp Freshly grated nutmeg",
      "1 oz Vanilla oat milk",
      "0.5 oz Fennel seed tea (cooled)",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Cognac Velvet Cocktail", subtitle: "Cognac's richness deepens nutmeg and cream into sedative bliss",
    meta: "Snifter · 4oz · Warm (140°F) · VS Cognac · ~30% ABV",
    ingredients: [
      "1.5 oz VS Cognac (warmed)",
      "1.5 oz Coconut cream",
      "0.25 tsp Freshly grated nutmeg",
      "2-3 seeds Fennel seeds (toasted)",
    ],
    accent: "#A8945A",
  },
  {
    name: "Cream Meditation Juice", subtitle: "Creamy, spiced, with gentle green apple undertones",
    meta: "Juice glass · 8oz · Chilled (~45°F)",
    ingredients: [
      "2 oz Fresh pear juice",
      "3 oz Oat milk",
      "0.5 oz Coconut cream",
      "0.25 tsp Freshly grated nutmeg",
      "0.5 oz Fennel seed tea (cooled)",
    ],
    accent: "#D4A8BC",
  },
  {
    name: "Blissful Surrender Shot", subtitle: "A warming spiced shot of nutmeg and cognac richness",
    meta: "Cordial · 1.5oz · Room temperature · Sip slowly",
    ingredients: [
      "1 oz VS Cognac",
      "0.5 oz Coconut cream",
      "0.125 tsp Freshly grated nutmeg",
      "pinch Fennel seed",
    ],
    accent: "#E8A87C",
  },
];

const MUSIC = {
  bpm: "78–108 BPM",
  description: "A calm, grounding, slow session. Deep surrender into velvet quiet. Deep house, reggae, jazz, funk, soul — the music meets where you are and eases you deeper into stillness.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
  genres: ["deep house", "reggae", "jazz", "funk", "soul"],
};

const ISO_PHASES = [
  { phase: "Settle", bpm: "83", mins: "10" },
  { phase: "Immerse", bpm: "78", mins: "15" },
  { phase: "Emerge", bpm: "93", mins: "5" },
];

const ENVIRONMENT = [
  { label: "Lighting", icon: "☾", body: "Dim (20-30%), 2400K. Candles at eye level. Minimize overhead lighting — let the room sink into amber warmth." },
  { label: "Setting", icon: "◇", body: "Low seating, soft throws, candles at eye level. Linen, wool, velvet, warm wood textures. 68°F room temperature." },
  { label: "Breathwork", icon: "◡", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic surrender." },
  { label: "Timing", icon: "◷", body: "Evening into night. Best when the day is closing and the body is ready to be held." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "Black pepper begins with twelve drops, and then rosemary arrives with six more, and together they build a spice structure so dense and warm it could hold up a cathedral ceiling or, more practically, hold up a body that has decided it is done holding itself up. This is Dos Rios Farms' deepest Mendocino creation — the velvet quiet at the bottom of the well, the last color before dark — and the blend knows it.\n\nSweet orange adds ten drops of gentle citrus that catches the sweet cream aroma and turns it into something luminous, the way candlelight makes a room more beautiful not by adding brightness but by subtracting everything that is not essential. Sage follows with six drops of herbal earthiness, the earthy spice that makes the sedation feel ancient rather than chemical, a thousand-year-old recipe for surrender written in botanical ink.\n\nYlang ylang is the revelation — four drops of the only oil in the palette that carries significant the exotic molecule, the rare terpene that amplifies the blissful quality until it becomes not just an effect but the primary experience. Portishead would recognize this moment: the bass drop that changes the room's center of gravity from the head to the chest to somewhere below the chest where language has not mapped.\n\nClove adds the final two drops, and the nutmeg note in the aroma emerges from the interaction between clove's deep spice and ylang ylang's exotic sweetness, two oils from opposite ends of the aromatic spectrum meeting in the middle to produce something neither could produce alone. The fennel seeds quality is pure collaborative chemistry, what happens when the exotic molecule meets warm spice in heavy concentration and decides to blur every remaining edge.\n\nPinnacle does not negotiate. It does not offer options or present a menu of possible evenings. It offers surrender and it means it. A man lies on a couch with a blanket he does not remember pulling over himself, and the sweet cream in the air has become the entire atmosphere, and the velvet quiet is not the absence of sound but the presence of something deeper than sound, and the six oils are the last things he notices before noticing itself becomes gentle, then optional, then unnecessary, then beautiful in its departure.";

const VIBES = [
  { name: "Grounded & Present", desc: "Rooted, held, still", active: true },
  { name: "Cozy Comfort", desc: "Warm throws, amber light", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
];

const SHIMMERS = [
  { left: 12, top: 18, size: 8, delay: 0, dur: 5 },
  { left: 28, top: 42, size: 6, delay: 1.2, dur: 6 },
  { left: 44, top: 22, size: 10, delay: 0.6, dur: 4.5 },
  { left: 58, top: 65, size: 7, delay: 2.4, dur: 5.5 },
  { left: 72, top: 35, size: 9, delay: 1.8, dur: 6 },
  { left: 86, top: 58, size: 6, delay: 3, dur: 4 },
  { left: 20, top: 78, size: 8, delay: 2.1, dur: 5 },
  { left: 66, top: 12, size: 5, delay: 3.5, dur: 6 },
  { left: 38, top: 88, size: 9, delay: 1, dur: 5.5 },
  { left: 80, top: 82, size: 7, delay: 4, dur: 4.5 },
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
    const t = setTimeout(() => setWidth(terpene.ratio * 2.8), 300 + index * 150);
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
      <div style={{ fontFamily: FONTS.display, fontSize: 20, color: COLORS.text, marginBottom: 2, fontWeight: 400 }}>{bev.name}</div>
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

export default function PinnacleVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.4; transform: scale(1.1); }
          100% { opacity: 0.1; transform: scale(0.9); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,216,196,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Velvet shimmer particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {SHIMMERS.map((s, i) => (
          <div key={i} style={{
            position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${COLORS.accent1}80, ${COLORS.accent1}10)`,
            boxShadow: `0 0 ${s.size * 2}px ${COLORS.accent1}30`,
            animation: `shimmer ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent1}15 0%, ${COLORS.bg} 55%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent1}18 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 4,
            color: COLORS.accent1, textTransform: "uppercase", marginBottom: 20,
          }}>
            SOLFUL SESSIONS · VIBE CURATOR
          </div>
          <h1 style={{
            fontFamily: FONTS.display, fontSize: 56, fontWeight: 300,
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
            fontFamily: FONTS.display, fontSize: 22, fontWeight: 300,
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
            A Pinnacle session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or cocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + sweet orange → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Nutmeg, fennel, and coconut cream cross the blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis caryophyllene arrives at already-activated CB2 receptors" },
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
            Every plant that smells — cannabis, black pepper, sweet orange, sage, ylang ylang — gets its scent from
            the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${COLORS.gold}08`,
            border: `1px solid ${COLORS.gold}20`, borderRadius: 10, marginBottom: 20,
          }}>
            <p style={{
              fontFamily: FONTS.display, fontSize: 17, fontWeight: 300,
              fontStyle: "italic", color: COLORS.gold, lineHeight: 1.6, margin: 0,
              textAlign: "center",
            }}>
              "The same molecule activates the same receptor — regardless of which plant it came from."
            </p>
          </div>
          <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 16px" }}>
            Terpene Pre-Loading means delivering these molecules <em>before</em> you consume cannabis —
            through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
            Not just "smelling nice." Temporal sequencing: prime, then surrender.
          </p>
          <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, margin: 0 }}>
            The Pinnacle blend matches its exact terpene fingerprint — caryophyllene from black pepper, rosemary,
            and clove; limonene from sweet orange; humulene from sage; farnesene from ylang ylang — so your body
            receives the same chemical signal from three sources before the fourth (the flower) ever arrives.
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
            Every ingredient maps to Pinnacle's terpene fingerprint. Black pepper and clove deliver caryophyllene.
            Sweet orange carries limonene. Fennel and nutmeg add the warm spice. You're drinking the strain before you smoke it.
          </p>
          {BEVERAGES.map(b => <BeverageCard key={b.name} bev={b} />)}
        </div>

        {/* MUSIC / ISO */}
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.53 · Valence 0.58</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {ISO_PHASES.map(p => (
                <div key={p.phase} style={{ padding: "10px 10px", background: COLORS.bgPanel, borderRadius: 8, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 24, color: COLORS.accent1, lineHeight: 1, fontWeight: 300 }}>{p.bpm}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>BPM · {p.mins}min</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, lineHeight: 1.6, fontStyle: "italic" }}>
              Genres: {MUSIC.genres.join(" · ")}
            </div>
          </div>
          <a
            href="https://open.spotify.com/search/Khruangbin%20Bob%20Marley%20Kamasi%20Washington%20deep%20house%20reggae%20jazz"
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
          <SectionLabel>The Narrative · Velvet Surrender</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Pinnacle lives in four categories:
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

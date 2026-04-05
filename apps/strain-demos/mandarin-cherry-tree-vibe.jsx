import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A120C",
  bgCard: "#241A12",
  bgPanel: "#2E2218",
  text: "#F0E4D4",
  textMuted: "#B49884",
  textDim: "#785E4C",
  accent1: "#E8944A",
  accent2: "#C47834",
  gold: "#F0AC6A",
  border: "#3A2C1E",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Mandarin Cherry Tree",
  farm: "Sticky Fields",
  region: "Mendocino",
  energy: "LOW",
  intent: "Settled body, gently wandering mind.",
  effects: ["Full Body Relaxation", "Serenity", "Creativity"],
  aroma: ["Mandarin Orange", "Sandalwood", "Lavender"],
  totalTerpenes: "1.75%",
  dominantTerpene: "Limonene",
};

const TERPENES = [
  { name: "Limonene", pct: 0.52, ratio: 30, color: "#F4D35E", oil: "Sweet Orange", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. The amber citrus of late afternoon." },
  { name: "β-Caryophyllene", pct: 0.36, ratio: 21, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — grounding warmth that gives relaxation structure." },
  { name: "α-Humulene", pct: 0.13, ratio: 7, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng", note: "Earthy, ancient herbal depth. The quiet herbalist." },
  { name: "Linalool", pct: 0.11, ratio: 6, color: "#C4A8D4", oil: "Lavender", food: "Lavender, Basil, Coriander", note: "The direct quotation of the strain's floral note." },
];

const EO_BLEND = [
  { name: "Sweet Orange", drops: 16, terpene: "Limonene", color: "#F4D35E" },
  { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lavender", drops: 6, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Sage", drops: 4, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Ylang Ylang", drops: 4, terpene: "Floral depth", color: "#D4C49A" },
];

const BLEND_RATIONALE = "Sweet orange dominates (40%) to match the mandarin aroma. Black pepper delivers caryophyllene. Lavender captures the floral note and linalool content. Sage for humulene grounding. Ylang ylang adds exotic floral depth reminiscent of sandalwood.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing sweet orange + black pepper. Dim the overhead lights. Soften the room.", icon: "◐" },
  { time: "T – 20 min", label: "Descend", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Parasympathetic settles in.", icon: "◠" },
  { time: "T – 10 min", label: "Sip", desc: "Pour the Mandarin Dusk tea or Elegant Mandarin mocktail. Amber citrus through the gut.", icon: "✦" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with limonene. The wandering mind arrives somewhere beautiful.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Mandarin Dusk Tea", subtitle: "Mandarin peel and lavender steeped into a quiet teacup ceremony",
    meta: "Teacup · 6oz · 190°F · 4 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "0.5 oz dried mandarin peel",
      "1 tbsp dried lavender buds",
      "0.25 oz dried cherry pieces",
      "0.5 tsp raw honey",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Elegant Mandarin Mocktail", subtitle: "Mandarin and lavender drift into serene sophistication",
    meta: "Coupe · 5.5oz · Ice cold",
    ingredients: [
      "2.5 oz fresh mandarin juice",
      "1 oz fresh cherry juice",
      "0.5 oz culinary lavender syrup",
      "0.25 oz coconut cream",
      "1 mandarin wheel, cherry & lavender (garnish)",
    ],
    accent: "#E8944A",
  },
  {
    name: "Cognac Elegance Cocktail", subtitle: "Cognac deepens mandarin and lavender into settled sophistication",
    meta: "Snifter · 4.5oz · Warm · ~28% ABV",
    ingredients: [
      "1.5 oz VS cognac",
      "1.5 oz fresh mandarin juice",
      "0.5 oz culinary lavender syrup",
      "0.25 oz coconut cream",
      "1 mandarin peel + 1 lavender flower",
    ],
    accent: "#C47834",
  },
  {
    name: "Citrus Serenity Juice", subtitle: "Cold-pressed mandarin and cherry with lavender's gentle touch",
    meta: "Juice glass · 8oz · Ice cold · 90 min window",
    ingredients: [
      "4 oz fresh mandarin (pressed)",
      "1.5 oz fresh cherry (pressed)",
      "1.5 oz coconut water",
      "0.5 oz culinary lavender water",
      "1 cherry + mandarin wheel (garnish)",
    ],
    accent: "#F0AC6A",
  },
  {
    name: "Serene Glow Shot", subtitle: "A sophisticated mandarin, cherry, and lavender moment",
    meta: "Cordial · 1.5oz · Room temp · Sip slowly",
    ingredients: [
      "0.75 oz VS cognac",
      "0.5 oz fresh mandarin juice",
      "0.25 oz fresh cherry juice",
      "0.1 oz culinary lavender syrup",
    ],
    accent: "#C4A8D4",
  },
];

const MUSIC = {
  bpm: "79–110 BPM",
  description: "A calm, grounding, slow session. Settled body, gently wandering mind. Funk, soul, pop, deep house, reggae — the music meets the quiet and holds it without forcing motion.",
  artists: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
  genres: ["funk", "soul", "pop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Dim (20-30%), 2400K. Low seating, candles at eye level. Minimize overhead lighting." },
  { label: "Setting", icon: "◇", body: "Soft throws, linen, wool, velvet, warm wood textures. Room temp 68°F. Low seating." },
  { label: "Breathwork", icon: "◠", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic target." },
  { label: "Timing", icon: "◷", body: "Evening — fall/winter. Best when the day has already agreed to wind down." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "Sweet orange dominates at sixteen drops, and the mandarin note fills the room the way sunset fills a Mendocino valley — gradually, warmly, with the patient confidence of something that has happened ten thousand times at Sticky Fields and still carries meaning each time. This is not the bright citrus of morning. This is the amber citrus of late afternoon, when the light gets thick and the shadows get long and the world starts to look like a painting of itself.\n\nBlack pepper adds ten drops of warm spice, the grounding warmth that turns relaxation from a passive collapse into something with structure, something you can inhabit like a room rather than fall into like a hole. Lavender follows with six drops, and the lavender aroma note is not a translation or an approximation — it is a direct quotation, the essential oil and the strain speaking the same floral language with the same accent, the same cadence, the same unhurried softness.\n\nSage provides four drops of herbal earthiness, dry and ancient as the first herb garden, and ylang ylang completes the blend with four drops of exotic sweetness that stands in for the sandalwood note — not identical but adjacent, the way Beach House stands adjacent to dream pop without ever quite being it or needing to be, occupying its own specific coordinate in the landscape.\n\nThe creativity that arrives is not the productive kind. It is the wandering kind, the kind that has no destination and therefore can arrive anywhere. Mandarin Cherry Tree does not produce ideas — it produces the conditions where ideas arrive uninvited, settle into the spare chair, and begin talking as if they have always been part of the conversation.\n\nA painter stares at a canvas that has been blank for an hour. The settled body has freed the mind, and the mandarin orange in the air keeps suggesting colors — warm amber, deep violet, the particular blue that appears when sandalwood and citrus share an evening. She picks up a brush not because she has decided what to paint but because the five oils have decided for her, and the wandering mind has arrived somewhere beautiful, and the brush is simply the first honest response to a room that smells like sunset and lavender and the oldest form of permission.";

const VIBES = [
  { name: "Cozy Comfort", desc: "Warm envelope, velvet quiet", active: true },
  { name: "Grounded & Present", desc: "Settled body, open senses", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const PETALS = [
  { left: 8, size: 14, delay: 0, dur: 22, rotate: 180 },
  { left: 22, size: 10, delay: 3, dur: 26, rotate: -220 },
  { left: 35, size: 18, delay: 1, dur: 24, rotate: 240 },
  { left: 48, size: 12, delay: 5, dur: 28, rotate: -180 },
  { left: 60, size: 16, delay: 2, dur: 23, rotate: 200 },
  { left: 72, size: 11, delay: 6, dur: 27, rotate: -260 },
  { left: 85, size: 15, delay: 4, dur: 25, rotate: 220 },
  { left: 15, size: 9, delay: 8, dur: 29, rotate: -200 },
  { left: 55, size: 13, delay: 10, dur: 22, rotate: 260 },
  { left: 92, size: 12, delay: 7, dur: 26, rotate: -240 },
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

export default function MandarinCherryTreeVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes fallPetal {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.55; }
          100% { transform: translateY(110vh) rotate(var(--rot, 180deg)); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,148,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Falling blossom petals */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {PETALS.map((p, i) => (
          <svg key={i} viewBox="0 0 20 30" style={{
            position: "absolute", left: `${p.left}%`, top: -40,
            width: p.size, height: p.size * 1.5,
            animation: `fallPetal ${p.dur}s linear infinite`,
            animationDelay: `${p.delay}s`,
            "--rot": `${p.rotate}deg`,
          }}>
            <path
              d="M10 2 C 14 8, 16 18, 10 28 C 4 18, 6 8, 10 2 Z"
              fill={i % 2 === 0 ? COLORS.accent1 : COLORS.gold}
              opacity="0.55"
            />
          </svg>
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
            fontFamily: FONTS.display, fontSize: 48, fontWeight: 400,
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
            A Mandarin Cherry Tree session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Sweet orange + black pepper → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Mandarin + lavender + cherry terpenes cross the blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis limonene arrives at already-activated receptors" },
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
            Every plant that smells — cannabis, sweet orange, black pepper, lavender, sage — gets its scent from
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
            The Mandarin Cherry Tree blend matches its exact terpene fingerprint — limonene from sweet orange,
            caryophyllene from black pepper, linalool from lavender, humulene from sage — so your body receives
            the same chemical signal from three sources before the fourth (the flower) ever arrives.
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
            Every ingredient maps to Mandarin Cherry Tree's terpene fingerprint. Mandarin and cherry deliver limonene.
            Black pepper carries caryophyllene. Lavender provides linalool. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.55 · Valence 0.62</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Settle", bpm: "84", mins: "10" },
                { phase: "Immerse", bpm: "79", mins: "15" },
                { phase: "Emerge", bpm: "94", mins: "5" },
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
            href="https://open.spotify.com/search/mandarin%20cherry%20tree%20chill"
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
            Search in Spotify
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
          <SectionLabel>The Narrative · Amber Afternoon</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Mandarin Cherry Tree lives in three categories:
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

import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A140A",
  bgCard: "#241C10",
  bgPanel: "#2E2418",
  text: "#F0E4D0",
  textMuted: "#B49884",
  textDim: "#785C44",
  accent1: "#E8A44A",
  accent2: "#C48834",
  gold: "#F0BC6A",
  border: "#3A2E1C",
};

const FONTS = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Satsuma Sherbet",
  farm: "Alpenglow Farms",
  region: "Humboldt",
  energy: "LOW",
  intent: "Quiet ease with thoughtful undertones.",
  effects: ["Happy", "Contemplative", "Comfortable"],
  aroma: ["Mandarin Orange", "Mochi", "Mint"],
  totalTerpenes: "1.85%",
  dominantTerpene: "Limonene",
};

const TERPENES = [
  { name: "Limonene", pct: 0.55, ratio: 30, color: "#F4D35E", oil: "Sweet Orange", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption via olfactory-limbic pathway." },
  { name: "β-Caryophyllene", pct: 0.45, ratio: 24, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "α-Humulene", pct: 0.13, ratio: 7, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng", note: "Earthy, herbal. Appetite-regulating and gently grounding." },
  { name: "Myrcene", pct: 0.11, ratio: 6, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Lemongrass, Thyme", note: "Body-softening. The classic couch-melt molecule." },
];

const EO_BLEND = [
  { name: "Sweet Orange", drops: 16, terpene: "Limonene", color: "#F4D35E" },
  { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Sage", drops: 4, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Lemongrass", drops: 4, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Peppermint", drops: 4, terpene: "Menthol", color: "#B088D4" },
];

const BLEND_RATIONALE = "Sweet orange (40%) captures the mandarin citrus. Black pepper delivers caryophyllene backbone. Sage for humulene. Lemongrass for myrcene. Peppermint matches the mint aroma note and adds refreshing brightness.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing sweet orange + black pepper. Dim the lamps, soften the edges, let the citrus settle the room.", icon: "◐" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Mandarin Comfort tea or the Satsuma Sherbet mocktail. Warm mandarin delivery through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Balance Breath — 4-4-4-4 box pattern. 6 cycles. Each corner anchored in scent.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with limonene and caryophyllene. The ease arrives already warm.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Satsuma Sherbet Tea", subtitle: "Herbal mandarin blend for quiet contemplation",
    meta: "Teacup · 8oz · 160°F · 4 min · Minimal caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tsp dried chamomile",
      "3-4 dried mint leaves",
      "2-3 strips fresh satsuma peel (dried)",
      "0.5 oz rice milk",
      "pinch of ground cinnamon",
      "candied mandarin wheel (garnish)",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Satsuma Sherbet Mocktail", subtitle: "Japanese mandarin comfort in a glass",
    meta: "Coupe · 6oz · Chilled",
    ingredients: [
      "3 fresh satsuma mandarins",
      "0.5 oz fresh lemon juice",
      "0.75 oz rice milk",
      "0.5 oz coconut cream",
      "3-4 fresh mint leaves",
      "pinch of ground cinnamon",
      "candied mandarin wheel (garnish)",
    ],
    accent: "#E8A44A",
  },
  {
    name: "Satsuma Sherbet Cocktail", subtitle: "Sake-spiked mandarin softness",
    meta: "Coupe · 6.5oz · Sake · 12% ABV",
    ingredients: [
      "1.5 oz sake",
      "2.5 oz fresh satsuma juice",
      "0.5 oz fresh lemon juice",
      "0.75 oz coconut cream",
      "0.5 oz rice milk",
      "2 fresh mint leaves",
      "cinnamon stick (garnish)",
    ],
    accent: "#C48834",
  },
  {
    name: "Satsuma Sherbet Juice", subtitle: "Mandarin-mint cleanse with coconut sweetness",
    meta: "Highball · 8oz · Chilled · Drink immediately",
    ingredients: [
      "5 fresh satsuma mandarins",
      "1 oz coconut milk",
      "0.5 oz rice milk",
      "4-5 fresh mint leaves",
      "1-2 oz cold mineral water",
      "mandarin wheel (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Satsuma Sherbet Shot", subtitle: "One-sip mandarin comfort rush",
    meta: "Shot · 2oz · Frozen · Serve immediately",
    ingredients: [
      "1 oz sake",
      "0.75 oz fresh satsuma juice",
      "0.25 oz coconut cream",
      "pinch of ground cinnamon",
    ],
    accent: "#F0BC6A",
  },
];

const MUSIC = {
  bpm: "84–111 BPM",
  description: "A balanced, social, warm session. Quiet ease with thoughtful undertones. Funk, soul, pop, deep house — the music meets where you are and stays beside you, unhurried, like afternoon light through a mandarin-colored curtain.",
  artists: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
  genres: ["funk", "soul", "pop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Moderate (45-60%), 3200K. Warm lamps, task pools, a single candle if you have one — Mandarin Twilight, if you're specific about it." },
  { label: "Setting", icon: "◇", body: "Flexible seating, leather and canvas, ceramic and mixed wood. Conversation-friendly, unhurried. 70°F." },
  { label: "Breathwork", icon: "◠", body: "Balance Breath — 4-4-4-4 box pattern. 6 cycles. Equilibrium, not activation. Let the scent anchor each corner." },
  { label: "Timing", icon: "◷", body: "Evening. Best when the day has already done most of its work and you're deciding what stays." },
];

const BREATH_GUIDANCE = "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner.";

const NARRATIVE = "Sweet orange fills the room like afternoon light through a mandarin-colored curtain — sixteen drops painting the air in citrus warmth that has weight to it, substance, the particular sweetness of a fruit that ripened slowly on a Humboldt branch while Alpenglow Farms waited with the patience of people who understand that the best things arrive on their own schedule.\n\nBlack pepper grounds the sweetness with twelve drops of quiet authority. This is not the sharp pepper of urgency but the round warmth of contemplation, the way Chet Baker played trumpet — economical, unhurried, every note exactly where it belongs because he tried it everywhere else first and this is where it landed.\n\nSage adds its dry herbal whisper, four drops that pull the mind toward something deeper without forcing the descent. Not meditation exactly, but the neighborhood where meditation lives — the block where thoughts walk more slowly and notice the architecture. Lemongrass matches it with another four drops of grassy green that keeps the sedating quality subtle, a background hum beneath the citrus curtain.\n\nPeppermint is the surprise in the blend — four drops of cool clarity that mirrors the mint aroma note and turns the whole experience from a warm bath into something more awake, more present. Not alert in the way that coffee is alert. Contemplative in the way that a window is contemplative when you sit beside it long enough to notice what the light is doing.\n\nA woman sits by the window with a mochi dessert going soft on a ceramic plate beside a cup of tea she forgot to drink. Satsuma Sherbet asked her one question without using words: what if comfort did not require unconsciousness? What if happiness and thoughtfulness could share a room without one asking the other to leave?\n\nThe mandarin orange in the air keeps answering, keeps saying yes, the sherbet can be both sweet and sharp, the afternoon can be both easy and interesting. The five oils — orange, pepper, sage, lemongrass, peppermint — are doing the quiet chemistry of balance, and the mochi is getting softer, and the woman has not moved in twenty minutes, and she is neither asleep nor bored, and that is the entire point of everything happening in this room.";

const VIBES = [
  { name: "Cozy Comfort", desc: "Warm settling, soft edges", active: true },
  { name: "Grounded & Present", desc: "Quiet attention, anchored ease", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const SPARKLES = [
  { left: 8, top: 14, size: 10, delay: 0, dur: 2.4 },
  { left: 22, top: 28, size: 8, delay: 0.6, dur: 3.1 },
  { left: 38, top: 9, size: 12, delay: 1.2, dur: 2.8 },
  { left: 54, top: 22, size: 7, delay: 0.3, dur: 3.4 },
  { left: 70, top: 36, size: 11, delay: 1.8, dur: 2.2 },
  { left: 86, top: 18, size: 9, delay: 0.9, dur: 3.6 },
  { left: 14, top: 52, size: 8, delay: 2.1, dur: 2.6 },
  { left: 32, top: 68, size: 10, delay: 1.4, dur: 3.2 },
  { left: 48, top: 80, size: 7, delay: 0.5, dur: 2.9 },
  { left: 64, top: 62, size: 11, delay: 2.4, dur: 2.3 },
  { left: 78, top: 74, size: 9, delay: 1.7, dur: 3.8 },
  { left: 92, top: 88, size: 8, delay: 0.2, dur: 2.7 },
];

const MIST_BLOBS = [
  { left: 12, top: 18, size: 280, delay: 0, dur: 22 },
  { left: 58, top: 42, size: 340, delay: 6, dur: 25 },
  { left: 30, top: 72, size: 240, delay: 12, dur: 18 },
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

function Sparkle({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  );
}

export default function SatsumaSherbetVibe() {
  const spotifyQuery = encodeURIComponent("funk soul deep house 90 bpm warm mandarin");
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.75; transform: scale(1.15); }
        }
        @keyframes driftMist {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          15% { opacity: 0.22; }
          50% { transform: translate(40px, -30px) scale(1.15); opacity: 0.28; }
          85% { opacity: 0.18; }
          100% { transform: translate(-20px, 20px) scale(0.95); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,164,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Citrus sparkle mist — ambient */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {MIST_BLOBS.map((m, i) => (
          <div key={`mist-${i}`} style={{
            position: "absolute", left: `${m.left}%`, top: `${m.top}%`,
            width: m.size, height: m.size, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${COLORS.accent1}18 0%, ${COLORS.accent1}05 45%, transparent 70%)`,
            filter: "blur(20px)",
            animation: `driftMist ${m.dur}s ease-in-out infinite`,
            animationDelay: `${m.delay}s`,
          }} />
        ))}
        {SPARKLES.map((s, i) => (
          <div key={`sparkle-${i}`} style={{
            position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
            animation: `twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}>
            <Sparkle size={s.size} color={COLORS.accent1} />
          </div>
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
            fontFamily: FONTS.display, fontSize: 52, fontWeight: 300,
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
            A Satsuma Sherbet session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Sweet orange + black pepper → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Mandarin and mint terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, sweet orange, black pepper, sage, lemongrass, peppermint — gets its scent from
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
            The Satsuma Sherbet blend matches its exact terpene fingerprint — limonene from sweet orange, caryophyllene from
            black pepper, humulene from sage, myrcene from lemongrass — so your body receives the same
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
            Every ingredient maps to Satsuma Sherbet's terpene fingerprint. Mandarin and sweet orange deliver limonene.
            Black pepper and cinnamon carry caryophyllene. Mint adds the clarity note. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.55 · Valence 0.60</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Open", bpm: "84", mins: "8", mood: "easing in" },
                { phase: "Groove", bpm: "97", mins: "12", mood: "comfortable flow" },
                { phase: "Reflect", bpm: "89", mins: "10", mood: "gentle unwinding" },
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
            Search on Spotify
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
          <SectionLabel>The Narrative · Mandarin Twilight</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Satsuma Sherbet lives in three categories:
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

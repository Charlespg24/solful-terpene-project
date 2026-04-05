import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0B150D",
  bgCard: "#141F17",
  bgPanel: "#1C2820",
  text: "#E4F0DC",
  textMuted: "#A0B494",
  textDim: "#627860",
  accent1: "#D4B84A",
  accent2: "#B89E34",
  gold: "#E8CC6A",
  border: "#252F28",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Rasta Governmint",
  farm: "Higher Heights",
  region: "Mendocino",
  energy: "LOW",
  intent: "Profound ease with cushioned edges.",
  effects: ["Euphoric", "Supremely Relaxed", "Comforted"],
  aroma: ["Sour Cherry", "Frankincense", "Oak"],
  totalTerpenes: "1.92%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.60, ratio: 31, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Hops", note: "CB2 agonist — grounding warmth, anti-inflammatory. The spice that settles the body." },
  { name: "Limonene", pct: 0.39, ratio: 20, color: "#F4D35E", oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Citrus lift that keeps the descent from becoming heaviness. Translucent brightness." },
  { name: "α-Humulene", pct: 0.17, ratio: 9, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng", note: "The oak-barrel molecule. Earth-deep, aged, woody." },
  { name: "Myrcene", pct: 0.16, ratio: 8, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Thyme, Lemongrass", note: "The couch-lock cousin. Deepens sedation into true body melt." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lemon", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "Rosemary", drops: 6, terpene: "β-Caryophyllene", color: "#B88A5A" },
  { name: "Sage", drops: 6, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Geranium", drops: 4, terpene: "Geraniol", color: "#D4A8BC" },
];

const BLEND_RATIONALE = "Caryophyllene-forward with black pepper and rosemary. Lemon for the limonene citrus lift. Sage for humulene and oak-like earthiness. Geranium adds fruity cherry notes that mirror the sour-cherry aroma. If you swap Rosemary for Frankincense Serrata (6 drops), the blend matches the strain's resinous aroma even more directly.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start the black pepper + lemon diffuser. Low seating, dim light (20-30%), soft throws within reach.", icon: "☾" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the spiced-cherry tea or the Rasta Governmint mocktail. Caryophyllene through the gut.", icon: "◈" },
  { time: "T – 5 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Parasympathetic activation.", icon: "◡" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene. The ease arrives as a homecoming, not a drop.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Rasta Governmint Tea", subtitle: "Spiced cherry and vanilla rest",
    meta: "Teacup · 8oz · 200°F · 6 min steep · No caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried tart cherry pieces",
      "4-5 whole cloves",
      "3-4 whole allspice berries",
      "1 cardamom pod (cracked)",
      "0.5 oz vanilla extract",
      "0.5 oz warm cream or milk",
      "cinnamon stick + whole clove (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Rasta Governmint Mocktail", subtitle: "Caribbean ease with profound spice",
    meta: "Rocks · 6oz · Chilled · No alcohol",
    ingredients: [
      "3 oz fresh tart cherry juice",
      "0.5 oz fresh lime juice",
      "0.5 oz cardamom-infused syrup",
      "0.25 oz vanilla extract",
      "2-3 dashes oak-aged bitters",
      "pinch each ground cloves + allspice",
      "fresh cherry + cinnamon stick (garnish)",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Rasta Governmint Cocktail", subtitle: "Aged rum with Caribbean comfort spices",
    meta: "Rocks · 6.5oz · Caribbean · Aged rum · ~17% ABV",
    ingredients: [
      "2 oz aged rum (7-10 year)",
      "2.5 oz fresh tart cherry juice",
      "0.5 oz fresh lime juice",
      "0.5 oz cardamom-infused syrup",
      "0.25 oz vanilla extract",
      "2-3 dashes oak-aged bitters",
      "brandied cherry + cinnamon stick (garnish)",
    ],
    accent: "#A8945A",
  },
  {
    name: "Rasta Governmint Juice", subtitle: "Deep cherry with spiced warmth",
    meta: "Highball · 8oz · Chilled · Serve immediately",
    ingredients: [
      "1.5 cups fresh tart cherries (pressed)",
      "3-4 whole cloves + 2 allspice berries",
      "1 oz warm filtered water (spice steep)",
      "0.5 oz fresh lime juice",
      "0.5 oz vanilla extract",
      "0.25 oz cardamom-infused syrup",
      "1.5 oz cold filtered water + ice",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Rasta Governmint Shot", subtitle: "One-sip Caribbean profound ease",
    meta: "Shot · 2oz · Frozen glass · Ice-cold",
    ingredients: [
      "1.25 oz aged rum",
      "0.75 oz fresh tart cherry juice",
      "0.25 oz cardamom-infused syrup",
      "1 dash oak-aged bitters",
      "tiny pinch each cloves + allspice",
    ],
    accent: "#D4A8BC",
  },
];

const MUSIC = {
  bpm: "81–107 BPM",
  description: "A calm, grounding, slow session. Profound ease with cushioned edges. Deep house, reggae, jazz, funk, soul — the music descends with you, holds the stillness, then returns you softly.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
  genres: ["deep house", "reggae", "jazz", "funk", "soul"],
};

const ISO_PHASES = [
  { phase: "Settle", bpm: "81", mins: "10", mood: "gentle descent" },
  { phase: "Immerse", bpm: "76", mins: "15", mood: "deep stillness" },
  { phase: "Emerge", bpm: "91", mins: "5", mood: "soft return" },
];

const ENVIRONMENT = [
  { label: "Lighting", icon: "☾", body: "Dim (20-30%), 2400K warm amber. Candles at eye level. Minimize overhead lighting." },
  { label: "Setting", icon: "◇", body: "Low seating, soft throws, linen, wool, velvet, warm wood textures. Room at 68°F." },
  { label: "Breathwork", icon: "◡", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic." },
  { label: "Timing", icon: "◷", body: "Evening. Best when the day is closing down and the body is ready to be held." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "The frankincense arrives before anything else — not from a church censer but from the rosemary sprigs left smoldering in a clay dish by the window. In Mendocino, Higher Heights sits above the fog line where the redwoods thin into manzanita, and tonight the resin quality is unmistakable, an ancient sweetness that turns the small living room into something between a chapel and a den.\n\nBlack pepper grounds the room in warmth, its drops working like a hearth fire that nobody needs to tend. Lemon lifts the sour cherry note into something translucent, a citrus brightness that catches the light from a single beeswax candle set in a brass holder older than anyone in the house. Sage dries the edges of the air, adding an oak-barrel quality that makes the whole space feel aged and earned, like a leather chair that has held a thousand conversations.\n\nGeranium does the quiet work of the blend. Its floral fruitiness does not announce itself — it simply shows up in the exhale, the way Kamasi Washington's saxophone enters a groove so naturally you wonder if it was always there, if the music was simply waiting for the right instrument to notice its own shape.\n\nA man sits in a wingback chair, his hands resting on the armrests like a king who has nothing left to prove and no kingdom left to defend. The ease is not lazy. It is the kind that comes after years of effort have finally earned someone the right to be still without apology. Rasta Governmint understands this — the cushioned edges, the surrender that is not defeat but arrival at a destination so comfortable the journey dissolves behind you.\n\nThe five oils have been working for twenty minutes now, and the room has changed its personality. The walls are softer. The silence is fuller, more textured, holding more information than it did before the diffuser started. Even the sour cherry in the air has deepened into something resembling gratitude — not the performative kind, but the kind that sits in the chest and asks for nothing in return. The fire does not need another log. The rosemary does not need another match.";

const VIBES = [
  { name: "Grounded & Present", desc: "Feet on earth, mind at home", active: true },
  { name: "Cozy Comfort", desc: "Warm shelter, velvet quiet", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const WAVES = [
  { top: 12, color: "#C8362B", opacity: 0.08, dur: 18, delay: 0, amplitude: 14 },
  { top: 34, color: "#D4B84A", opacity: 0.07, dur: 15, delay: 2, amplitude: 18 },
  { top: 58, color: "#3E7E4F", opacity: 0.08, dur: 16, delay: 1, amplitude: 12 },
  { top: 82, color: "#D4B84A", opacity: 0.06, dur: 14, delay: 3, amplitude: 16 },
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

function ReggaeWave({ w }) {
  // Build a sinusoidal wave path
  const width = 1440;
  const segments = 8;
  const step = width / segments;
  let d = `M 0 ${w.amplitude}`;
  for (let i = 0; i < segments; i++) {
    const x1 = i * step + step / 2;
    const y1 = i % 2 === 0 ? -w.amplitude : w.amplitude * 2;
    const x2 = (i + 1) * step;
    const y2 = w.amplitude;
    d += ` Q ${x1} ${y1} ${x2} ${y2}`;
  }
  return (
    <svg
      width="100%"
      height={w.amplitude * 3}
      viewBox={`0 0 ${width} ${w.amplitude * 3}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: `${w.top}%`,
        left: 0,
        width: "200%",
        opacity: w.opacity,
        animation: `waveDrift ${w.dur}s ease-in-out infinite`,
        animationDelay: `${w.delay}s`,
      }}
    >
      <path
        d={d}
        fill="none"
        stroke={w.color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RastaGovernmintVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes waveDrift {
          0%   { transform: translateX(0) translateY(0); }
          25%  { transform: translateX(-8%) translateY(-4px); }
          50%  { transform: translateX(-14%) translateY(0); }
          75%  { transform: translateX(-8%) translateY(4px); }
          100% { transform: translateX(0) translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,184,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Ambient reggae waves */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {WAVES.map((w, i) => <ReggaeWave key={i} w={w} />)}
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
            fontFamily: FONTS.display, fontSize: 52, fontWeight: 400,
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
            A Rasta Governmint session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or juice,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + lemon → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Tart cherry + cardamom terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, black pepper, lemon, sage, geranium — gets its scent from
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
            The Rasta Governmint blend matches its exact terpene fingerprint — caryophyllene from black pepper and rosemary,
            limonene from lemon, humulene from sage, with geranium adding fruity cherry notes — so your body receives the same
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
            Every ingredient maps to Rasta Governmint's terpene fingerprint. Tart cherry and cardamom deliver caryophyllene.
            Lemon and lime carry limonene. Oak-aged bitters bring humulene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.51 · Valence 0.55</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {ISO_PHASES.map(p => (
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
            href="https://open.spotify.com/search/deep%20house%20reggae%20jazz%20funk%20soul%2081-107%20BPM"
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
          <SectionLabel>The Narrative · Cushioned Ease</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Rasta Governmint lives in three categories:
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

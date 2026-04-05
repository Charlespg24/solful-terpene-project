import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0A1615",
  bgCard: "#12201E",
  bgPanel: "#1A2A27",
  text: "#E0F0E4",
  textMuted: "#98B4A0",
  textDim: "#5F7A68",
  accent1: "#A8D65C",
  accent2: "#8AC040",
  gold: "#D4E862",
  border: "#253832",
};

const FONTS = {
  display: "'DM Serif Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Black Lime Chem",
  farm: "Moon Gazer Farms",
  region: "Mendocino",
  energy: "LOW",
  intent: "Weighted bliss melting toward rest.",
  effects: ["Heavy", "Blissful", "Sleepy"],
  aroma: ["Sharp Lime", "Rhubarb", "Glue"],
  totalTerpenes: "3.08%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 1.69, ratio: 55, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Lemongrass", note: "Heavy sedation. The couch-lock molecule. Pulls the body toward horizontal." },
  { name: "α-Pinene", pct: 0.39, ratio: 13, color: "#6BAE8E", oil: "Pine", food: "Pine, Rosemary, Sage, Eucalyptus", note: "Forest clarity. Holds mental architecture even in the deepest descent." },
  { name: "β-Caryophyllene", pct: 0.27, ratio: 9, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — warm anti-inflammatory grounding, no psychoactivity." },
  { name: "β-Ocimene", pct: 0.19, ratio: 6, color: "#B088D4", oil: "Basil", food: "Basil, Mint, Orchids, Mango", note: "Herbal-sweet brightness. A green thread through the heavy haze." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 16, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Pine", drops: 8, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Basil", drops: 6, terpene: "β-Ocimene", color: "#B088D4" },
  { name: "Lemon", drops: 4, terpene: "Limonene", color: "#F4D35E" },
];

const BLEND_RATIONALE = "Heavy myrcene strain, sleepy and blissful. Pine delivers the pinene. Basil covers the ocimene. Lemon for the sharp lime aroma (no lime oil in palette, lemon is close). The glue character is that chem funk that emerges from the terpene combo itself.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + pine. Dim the lights, soften the room, minimize overhead lighting.", icon: "☾" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Black Lime Chem mocktail or juice. Lime-rhubarb terpenes delivered through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Parasympathetic drop.", icon: "◡" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. The weighted bliss arrives gently.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Black Lime Chem Tea", subtitle: "Sharp-sweet herbal with rhubarb depth",
    meta: "Teacup · 8oz · 190°F · 6–7 min · No caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried rhubarb pieces",
      "1 tsp dried lime peel",
      "2–3 dried rosemary sprigs",
      "5–6 dried basil leaves",
      "1 small bay leaf",
      "pinch of ground cinnamon",
      "0.25 oz agave syrup",
      "thin lime wheel (garnish)",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Black Lime Chem Mocktail", subtitle: "Weighted lime-rhubarb bliss",
    meta: "Rocks · 6oz · Chilled",
    ingredients: [
      "large ice cubes",
      "2 oz fresh lime juice",
      "1.5 oz rhubarb syrup",
      "1 small rosemary sprig",
      "3–4 fresh basil leaves",
      "1 small bay leaf",
      "0.5 oz cinnamon-infused syrup",
      "thin lime wheel (garnish)",
    ],
    accent: "#6BAE8E",
  },
  {
    name: "Black Lime Chem Cocktail", subtitle: "Mezcal smoke meets lime-rhubarb depth",
    meta: "Rocks · 6.5oz · Mezcal · 16% ABV",
    ingredients: [
      "1.75 oz mezcal",
      "2 oz fresh lime juice",
      "1.5 oz rhubarb syrup",
      "1 small rosemary sprig",
      "4–5 fresh basil leaves",
      "1 small bay leaf",
      "0.5 oz cinnamon-infused syrup",
      "2–3 dashes peppercorn bitters",
      "thin black lime wheel (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Black Lime Chem Juice", subtitle: "Sharp lime with rhubarb tart-sweetness",
    meta: "Highball · 8oz · Chilled · Serve immediately",
    ingredients: [
      "4–5 fresh limes (juiced)",
      "1 cup fresh rhubarb stalks (blended)",
      "1 small rosemary sprig + 5–6 basil leaves",
      "1.5 oz warm filtered water (herb infusion)",
      "1 small bay leaf",
      "0.5 oz rhubarb syrup",
      "tiny pinch of ground cinnamon",
      "1 oz cold filtered water",
      "thin lime wheel (garnish)",
    ],
    accent: "#B088D4",
  },
  {
    name: "Black Lime Chem Shot", subtitle: "One-sip weighted lime depth",
    meta: "Shot · 2oz · Frozen · Consume immediately",
    ingredients: [
      "1.25 oz mezcal",
      "0.75 oz fresh lime juice",
      "0.25 oz rhubarb syrup",
      "tiny pinch of ground cinnamon",
    ],
    accent: "#F4D35E",
  },
];

const MUSIC = {
  bpm: "69–91 BPM",
  description: "A calm, grounding, slow session. Weighted bliss melting toward rest. Ambient, dub, lo-fi hip hop, acoustic folk — the tempo dips as the body drops, then rises softly to carry you back.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Bon Iver"],
  genres: ["ambient", "dub", "lo-fi hip hop", "acoustic folk", "post-rock"],
  energy: 0.31,
  valence: 0.40,
  phases: [
    { phase: "Settle", bpm: "69", mins: "10", mood: "gentle descent" },
    { phase: "Immerse", bpm: "64", mins: "15", mood: "deep stillness" },
    { phase: "Emerge", bpm: "79", mins: "5", mood: "soft return" },
  ],
};

const SPOTIFY_QUERY = encodeURIComponent("Bonobo Thievery Corporation Nujabes Bon Iver ambient dub lo-fi");

const ENVIRONMENT = [
  { label: "Lighting", icon: "☾", body: "Dim (20–30%), 2400K. Candles at eye level. Minimize overhead lighting." },
  { label: "Setting", icon: "◇", body: "Low seating, soft throws, linen, wool, velvet, warm wood. Room held at 68°F." },
  { label: "Breathwork", icon: "◡", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic target." },
  { label: "Timing", icon: "◷", body: "Evening into night. Best when the day has closed and the body is ready to drop." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "The lemongrass hits like a wave. Not the crashing kind — the kind that lifts you off the sand and holds you weightless, face to the sky, while the shore disappears behind you. Sixteen drops in the diffuser, and Moon Gazer Farms' heaviest offering from the Mendocino hills has announced its intention with botanical authority: rest is not optional tonight.\n\nPine needles crack underfoot somewhere in the memory of the room, their sharp clarity threading through the heavy haze like a needle through velvet. Eight drops of pine oil holding the line between bliss and oblivion, insisting that even in the deepest descent, the forest remembers its architecture and will not let you dissolve entirely.\n\nBasil adds something unexpected — a green brightness, almost tropical, that echoes the sharp lime aroma before the deeper chemistry takes over and pulls everything toward horizontal. Black pepper murmurs beneath it all, six drops of warmth that Thievery Corporation would recognize as the dub bassline: always present, never leading, perfectly placed in the mix to give the low end its shape.\n\nThe glue character is not in any single oil. It emerges from the interaction itself, the way Beach House builds a wall of sound from instruments that seem too gentle to carry weight individually but together become architecture. Lemon provides the last four drops — a trace of citrus that catches the rhubarb note in the strain's aroma and softens it into something you could fall asleep holding.\n\nA woman lies on a daybed near the window, one arm trailing toward the floor like a vine that has forgotten which direction is up. The rhubarb-lime sharpness has dissolved into the lemongrass warmth, and the pine keeps sending its messages of clarity into a body that is no longer taking messages.\n\nBlack Lime Chem has done its quiet math: the highest sedating terpene load in the collection, a formula for weighted bliss that melts the border between body and blanket until the distinction becomes academic. The five oils have turned the room into a cradle, and the Mendocino night presses softly against the glass, patient as a river that knows exactly where it is going.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: true },
  { name: "Body Melt", desc: "Profound physical ease", active: true },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const BUBBLES = [
  { left: 8, size: 20, delay: 0, dur: 14 },
  { left: 22, size: 14, delay: 3, dur: 18 },
  { left: 38, size: 26, delay: 1.5, dur: 15 },
  { left: 55, size: 18, delay: 5, dur: 17 },
  { left: 70, size: 22, delay: 2.5, dur: 13 },
  { left: 86, size: 16, delay: 6, dur: 19 },
  { left: 15, size: 12, delay: 8, dur: 16 },
  { left: 62, size: 24, delay: 4, dur: 20 },
  { left: 32, size: 10, delay: 7, dur: 12 },
  { left: 78, size: 28, delay: 9, dur: 18 },
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

export default function BlackLimeChemVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes riseBubble {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          15% { opacity: 0.25; }
          85% { opacity: 0.25; }
          100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(168,214,92,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Rising lime-green bubbles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {BUBBLES.map((b, i) => (
          <div key={i} style={{
            position: "absolute", left: `${b.left}%`, bottom: -40,
            width: b.size, height: b.size, borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${COLORS.accent1}60, ${COLORS.accent1}10)`,
            border: `1px solid ${COLORS.accent1}40`,
            animation: `riseBubble ${b.dur}s linear infinite`,
            animationDelay: `${b.delay}s`,
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
            A Black Lime Chem session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + pine → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Lime + rhubarb + basil terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, lemongrass, pine, basil, black pepper — gets its scent from
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
            The Black Lime Chem blend matches its exact terpene fingerprint — myrcene from lemongrass, pinene from
            pine, caryophyllene from black pepper, ocimene from basil — so your body receives the same
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
            Every ingredient maps to Black Lime Chem's terpene fingerprint. Lemongrass and basil deliver myrcene and ocimene.
            Rosemary carries pinene. Black pepper and cinnamon echo the caryophyllene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy {MUSIC.energy} · Valence {MUSIC.valence}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {MUSIC.phases.map(p => (
                <div key={p.phase} style={{ padding: "10px 10px", background: COLORS.bgPanel, borderRadius: 8, border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.accent1, lineHeight: 1, fontWeight: 400 }}>{p.bpm}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>BPM · {p.mins}min</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 8, color: COLORS.textDim, marginTop: 3, fontStyle: "italic" }}>{p.mood}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.textDim, lineHeight: 1.6, fontStyle: "italic" }}>
              Genres: {MUSIC.genres.join(" · ")}
            </div>
          </div>
          <a
            href={`https://open.spotify.com/search/${SPOTIFY_QUERY}`}
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
              Breath Guidance · Descent Breath
            </div>
            <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              {BREATH_GUIDANCE}
            </p>
          </div>
        </div>

        {/* NARRATIVE */}
        <div style={{ padding: "0 28px 40px" }}>
          <SectionLabel>The Narrative · Velvet Descent</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Black Lime Chem lives in two categories:
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

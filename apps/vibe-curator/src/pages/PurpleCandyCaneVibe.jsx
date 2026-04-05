import { useState, useEffect } from "react";

const COLORS = {
  bg: "#16101A",
  bgCard: "#201828",
  bgPanel: "#2A2034",
  text: "#F0E4F0",
  textMuted: "#B898B8",
  textDim: "#785C78",
  accent1: "#D46A9A",
  accent2: "#B85284",
  gold: "#E890B4",
  border: "#3A2A40",
};

const FONTS = {
  display: "'Space Grotesk', sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Purple Candy Cane",
  farm: "Greenshock Farms",
  region: "Mendocino",
  energy: "HIGH",
  intent: "Vibrant and vocal, fully awake.",
  effects: ["Energized", "Invigorated", "Talkative"],
  aroma: ["Mango", "Peppermint Candy", "Orange Blossom"],
  totalTerpenes: "1.55%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 0.54, ratio: 35, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Lemongrass", note: "Heavy, fruity, the weighted blanket of the terpene world — but here in the morning register." },
  { name: "β-Caryophyllene", pct: 0.31, ratio: 20, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — spicy warmth that gives every sentence a posture, a spine." },
  { name: "α-Pinene", pct: 0.20, ratio: 13, color: "#6BAE8E", oil: "Pine", food: "Pine Needles, Rosemary, Basil", note: "Forest clarity — sharpens ideas, makes words easier to find." },
  { name: "α-Humulene", pct: 0.13, ratio: 8, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng, Clove", note: "Earthy grounding — the anchor that keeps vibrant from tipping into scattered." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 12, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Black Pepper", drops: 8, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Sweet Orange", drops: 8, terpene: "Limonene", color: "#F4D35E" },
  { name: "Pine", drops: 6, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Peppermint", drops: 4, terpene: "Menthol", color: "#88C4A0" },
  { name: "Sage", drops: 2, terpene: "α-Humulene", color: "#A8945A" },
];

const BLEND_RATIONALE = "Myrcene-forward for the mango note. Black pepper for caryophyllene. Sweet orange captures the orange blossom aroma. Pine for the pinene. Peppermint matches the peppermint candy perfectly. A touch of sage for humulene grounding.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + black pepper. Open space, clean surfaces, bright morning light.", icon: "☀" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the tropical mango mint juice or Purple Candy Cane tea. Mango delivery through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Sharp inhale through the nose, firm exhale through the mouth.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. The conversation arrives already warm.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Purple Candy Cane Tea", subtitle: "Tropical mint with orange blossom comfort",
    meta: "Teacup · 8oz · 160°F · 4 min · Minimal caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried mango pieces",
      "6-8 dried mint leaves",
      "1 tsp dried orange peel",
      "0.5 tsp orange blossom petals",
      "0.5 oz coconut cream",
      "fresh mint sprig + orange wheel (garnish)",
    ],
    accent: "#D46A9A",
  },
  {
    name: "Purple Candy Cane Mocktail", subtitle: "Tropical candy shop in a glass",
    meta: "Tiki · 7oz · Chilled",
    ingredients: [
      "crushed ice",
      "2 oz fresh mango puree",
      "0.75 oz fresh orange juice",
      "6-8 fresh mint leaves",
      "0.5 oz orange blossom water",
      "0.75 oz coconut cream",
      "mango slice + candied orange + mint (garnish)",
    ],
    accent: "#E890B4",
  },
  {
    name: "Purple Candy Cane Cocktail", subtitle: "Rum-spiked mango mint tropical vibrancy",
    meta: "Tiki · 7.5oz · White Rum · 15% ABV",
    ingredients: [
      "1.75 oz white rum",
      "2 oz fresh mango puree",
      "0.75 oz fresh orange juice",
      "0.5 oz orange blossom water",
      "6-8 fresh mint leaves",
      "0.5 oz coconut cream",
      "1 small sprig fresh rosemary",
    ],
    accent: "#B85284",
  },
  {
    name: "Purple Candy Cane Juice", subtitle: "Mango mint with orange blossom sweetness",
    meta: "Highball · 8oz · Chilled · Serve immediately",
    ingredients: [
      "1.5 cups fresh ripe mango chunks",
      "1 fresh orange (juiced)",
      "8-10 fresh mint leaves",
      "0.5 oz orange blossom water",
      "0.5 oz coconut cream",
      "crushed ice + cinnamon dust (garnish)",
    ],
    accent: "#C4A8D4",
  },
  {
    name: "Purple Candy Cane Shot", subtitle: "One-sip mango tropical energy",
    meta: "Shot · 2oz · Frozen · Serve ice-cold",
    ingredients: [
      "1 oz white rum",
      "0.75 oz fresh mango puree",
      "0.25 oz orange juice",
      "0.1 oz orange blossom water",
      "2-3 fresh mint leaves",
    ],
    accent: "#7ec8a0",
  },
];

const MUSIC = {
  bpm: "72–94 BPM",
  description: "A bright, uplifting, energetic session. Vibrant and vocal, fully awake. Ambient, dub, lo-fi hip hop, deep house, reggae — the music meets where you are and builds toward full momentum.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Khruangbin"],
  genres: ["ambient", "dub", "lo-fi hip hop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning. Best when the day is still opening up and the kitchen is full of voices." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "The lemongrass comes first, twelve drops of grassy sweetness carrying the mango note that gives Greenshock Farms' most energizing Mendocino strain its tropical opening movement. This is not the sleepy heaviness of nighttime preparations — this is grassy sweetness in its morning suit, bright-eyed and sociable, ready to talk, ready to listen, ready to do both simultaneously.\n\nSweet orange and black pepper arrive together, eight drops each, like Vulfpeck's rhythm section locking into a groove that makes sitting still feel like a waste of a perfectly good body. The orange blossom aroma blooms from the sweet orange oil in real time, and the spiced warmth from the pepper gives every sentence that follows a spine, a posture, a reason to stand up straight.\n\nPine adds six drops of clarity to the blend — the kind that makes ideas sharper and words easier to find, the kind that turns the tip of the tongue into a reliable address rather than a temporary holding facility. Peppermint follows with four drops of cool precision that matches the peppermint candy aroma note so exactly it feels engineered rather than botanical, as if the strain and the oil were designed in the same laboratory by someone who understood that accuracy is its own form of beauty.\n\nTwo drops of sage anchor everything in earth. Not enough to slow the momentum, not nearly enough to suggest rest — just enough to keep the energy from floating into aimless, decorative chatter. Purple Candy Cane knows the difference between vibrant and scattered, between vocal and noisy, between fully awake and merely caffeinated.\n\nThe kitchen is full of people this morning. Someone is telling a story that keeps getting interrupted by better stories, and nobody minds because the interruptions are the point, the stories are the point, the overlapping voices are the proof that the room has reached that temperature where formality melts and what remains is genuine exchange.\n\nThe six oils have turned the morning into an open floor, and every voice in the room has found its register — confident, warm, precise — and the mango sweetness in the air is the standing invitation to say whatever you have been meaning to say, only louder, only brighter, only now while the peppermint is still cool on the inhale.";

const VIBES = [
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const SWIRLS = [
  { left: 8, size: 30, delay: 0, dur: 18, rotSpeed: 8, color: "#D46A9A" },
  { left: 22, size: 22, delay: 2.2, dur: 22, rotSpeed: 12, color: "#E890B4" },
  { left: 38, size: 36, delay: 1.1, dur: 16, rotSpeed: 6, color: "#B85284" },
  { left: 54, size: 20, delay: 4.5, dur: 20, rotSpeed: 10, color: "#D46A9A" },
  { left: 68, size: 32, delay: 2.8, dur: 14, rotSpeed: 7, color: "#E890B4" },
  { left: 82, size: 24, delay: 5.2, dur: 19, rotSpeed: 11, color: "#C4A8D4" },
  { left: 15, size: 18, delay: 6.8, dur: 21, rotSpeed: 9, color: "#E890B4" },
  { left: 92, size: 28, delay: 3.5, dur: 17, rotSpeed: 13, color: "#D46A9A" },
];

function CandySwirl({ size, color, rotSpeed }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ animation: `spinSwirl ${rotSpeed}s linear infinite` }}>
      <path
        d="M 20 20 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0 M 20 20 m -9 0 a 9 9 0 1 1 18 0 a 9 9 0 1 1 -18 0 M 20 20 m -4 0 a 4 4 0 1 0 8 0"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
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

export default function PurpleCandyCaneVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes riseSwirl {
          0% { transform: translateY(110vh) scale(0.7); opacity: 0; }
          15% { opacity: 0.45; }
          85% { opacity: 0.45; }
          100% { transform: translateY(-130vh) scale(1.1); opacity: 0; }
        }
        @keyframes spinSwirl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,106,154,0.25); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Candy swirl drifting particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {SWIRLS.map((s, i) => (
          <div key={i} style={{
            position: "absolute", left: `${s.left}%`, bottom: -50,
            animation: `riseSwirl ${s.dur}s linear infinite`,
            animationDelay: `${s.delay}s`,
          }}>
            <CandySwirl size={s.size} color={s.color} rotSpeed={s.rotSpeed} />
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent1}1A 0%, ${COLORS.bg} 55%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent1}22 0%, transparent 70%)`,
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
            fontFamily: FONTS.display, fontSize: 21, fontWeight: 300,
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
            A Purple Candy Cane session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + black pepper → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Mango + orange blossom terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, lemongrass, black pepper, sweet orange, pine, peppermint, sage — gets its scent from
            the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${COLORS.gold}0C`,
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
            Terpene Pre-Loading means delivering these molecules <em>before</em> you consume cannabis —
            through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
            Not just "smelling nice." Temporal sequencing: prime, then amplify.
          </p>
          <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, margin: 0 }}>
            The Purple Candy Cane blend matches its exact terpene fingerprint — myrcene from lemongrass, caryophyllene from
            black pepper, pinene from pine, humulene from sage — so your body receives the same
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
            Every ingredient maps to Purple Candy Cane's terpene fingerprint. Mango and lemongrass deliver myrcene.
            Black pepper carries caryophyllene. Orange blossom and mint complete the candy-shop signature. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.35 · Valence 0.41</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "72", mins: "5" },
                { phase: "Peak", bpm: "94", mins: "15" },
                { phase: "Coast", bpm: "83", mins: "10" },
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
            href="https://open.spotify.com/search/bonobo%20thievery%20corporation%20nujabes%20khruangbin"
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
            background: `${COLORS.gold}0C`, border: `1px solid ${COLORS.gold}20`, borderRadius: 10,
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
          <SectionLabel>The Narrative · Mango Spark</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Purple Candy Cane lives in three categories:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {VIBES.map(v => (
              <div key={v.name} style={{
                padding: "12px 14px", borderRadius: 10,
                background: v.active ? `${COLORS.accent1}18` : COLORS.bgPanel,
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

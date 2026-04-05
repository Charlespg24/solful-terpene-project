import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0F1A0F",
  bgCard: "#18241A",
  bgPanel: "#202E22",
  text: "#E4F0DC",
  textMuted: "#A0B490",
  textDim: "#687A5C",
  accent1: "#D4A06A",
  accent2: "#B8844E",
  gold: "#E8BC7A",
  border: "#25322A",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Mike's Bomba",
  farm: "Glentucky Family Farm",
  region: "Sonoma",
  energy: "LOW",
  intent: "Grounded calm with clear mental edges.",
  effects: ["Relaxed", "Calm", "Alert"],
  aroma: ["Fuel", "Lemon Cream", "Forest Floor"],
  totalTerpenes: "1.38%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.47, ratio: 34, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — peppery warmth that quiets inflammation without any head-change." },
  { name: "Limonene", pct: 0.32, ratio: 23, color: "#F4D35E", oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation that stays bright without tipping into stimulation." },
  { name: "α-Humulene", pct: 0.18, ratio: 13, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng, Coriander", note: "Earthy, grounding anti-inflammatory — the forest floor molecule." },
  { name: "Linalool", pct: 0.07, ratio: 5, color: "#C4A8D4", oil: "Lavender", food: "Lavender, Basil, Coriander", note: "Softens edges. Calms without sedating." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 20, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lemon", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "Sage", drops: 8, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Lavender", drops: 2, terpene: "Linalool", color: "#C4A8D4" },
];

const BLEND_RATIONALE = "Black pepper delivers the dominant caryophyllene (50% of blend). Lemon matches the lemon cream aroma. Sage provides humulene with herbal grounding. A whisper of lavender rounds out the linalool.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing black pepper + lemon. Dim lights, low seating, soft throws.", icon: "◐" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Cream & Compass mocktail or the Lemon & Sage Rest tea. Citrus-herbal delivery through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Parasympathetic descent.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene. The grounded calm arrives fully formed.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Lemon & Sage Rest Tea", subtitle: "Gentle herbal infusion with bright citrus notes.",
    meta: "Teacup · 6oz · 185°F · 5 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "1 tsp dried rosemary",
      "0.5 tsp dried sage",
      "1 wheel dried lemon wheel",
      "1 tsp raw honey",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Cream & Compass Mocktail", subtitle: "Lemon-kissed calm with earthy rosemary anchors the mind.",
    meta: "Coupe · 5oz · Ice cold",
    ingredients: [
      "2 oz fresh lemon juice",
      "1 oz heavy cream",
      "0.5 oz rosemary-infused simple syrup",
      "3 dashes angostura bitters",
      "1 twist lemon peel",
    ],
    accent: "#E8BC7A",
  },
  {
    name: "Grounded Manhattan Cocktail", subtitle: "Bourbon mellows the fuel, rosemary deepens the calm.",
    meta: "Coupe · 5.5oz · Bourbon · ~35% ABV",
    ingredients: [
      "2 oz bourbon",
      "1 oz lemon cream cordial",
      "0.5 oz dry vermouth",
      "0.5 oz rosemary simple syrup",
      "1 rosemary sprig & candied lemon",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Forest Refresh Juice", subtitle: "Pressed brightness with earthy mineral finish.",
    meta: "Highball · 8oz · Ice cold · 2 hour window",
    ingredients: [
      "3 oz fresh lemon juice",
      "2 oz rosemary-steeped water",
      "2 oz coconut cream",
      "1 oz filtered water",
      "1 rosemary sprig & lemon wheel",
    ],
    accent: "#A8945A",
  },
  {
    name: "Grounded Truth Shot", subtitle: "A spicy-bright hit of rosemary and lemon clarity.",
    meta: "Shot · 1.5oz · Room temp · Consume immediately",
    ingredients: [
      "1.5 oz bourbon",
      "1 sprig fresh rosemary (stir)",
      "0.25 oz fresh lemon juice",
      "pinch sea salt & rosemary leaf",
    ],
    accent: "#C4A8D4",
  },
];

const MUSIC = {
  bpm: "82–107 BPM",
  description: "A calm, grounding, slow session. Grounded calm with clear mental edges. Deep house, reggae, jazz, funk, soul — the music settles into the room like fog over the coastal oaks.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
  genres: ["deep house", "reggae", "jazz", "funk", "soul"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Dim (20-30%), 2400K. Low seating, candles at eye level. Minimize overhead lighting." },
  { label: "Setting", icon: "◇", body: "Low seating, soft throws, warm wood. Linen, wool, velvet textures. Room temp around 68°F." },
  { label: "Breathwork", icon: "◠", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic descent." },
  { label: "Timing", icon: "◷", body: "Evening into night. Best when the fog rolls in and the day is ready to release." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "The first thing you notice is the pepper. Not the sharp kind that catches your throat, but the warm, round variety that settles into your palms like a handshake from someone you trust. It rises from the ceramic dish on the windowsill of a Glentucky Family Farm outbuilding in Sonoma, where lemon oil pools in the afternoon light, mixing with sage leaves left to dry on a wooden rack beside a forgotten coffee mug.\n\nThe lavender is barely there — a ghost note at the edge of the room, the way Nils Frahm lets a single piano key ring into silence before the next phrase arrives. It does not demand attention. It simply rounds the corners of the sharper scents until the whole space feels cushioned, the walls softer, the afternoon longer.\n\nOutside, the fog has not quite lifted. A farmhand leans against the fence post, rolling a stem between her fingers, watching a red-tailed hawk circle above the coastal oaks that line the western ridge. She is not thinking about anything in particular. That is the point. The lemon cream character hangs in the still air, sweeter than the oil itself, a quality that emerges when citrus meets pepper meets sage in the warm humidity of a room where nobody is in a hurry.\n\nInside the farmhouse, someone has placed Mike's Bomba on the table next to a leather-bound field journal. The pages are open to a sketch of terpene ratios drawn in pencil, but the pencil has rolled to the floor and no one has picked it up. The work can wait. The forest floor quality of the room — that deep, loamy earthiness beneath the brighter notes — has turned the ordinary into something luminous, turned alertness into awareness, turned a Tuesday afternoon into exactly enough.\n\nThe sage adds something ancient to the blend. A dried herb quality that connects this moment to every kitchen, every apothecary, every healer who understood that sometimes the most powerful medicine is simply paying better attention to what is already here. The four oils — pepper, lemon, sage, lavender — have been working for thirty minutes now, and the room has become the kind of place where you can be completely still and completely awake at the same time, and neither state asks anything of the other.";

const VIBES = [
  { name: "Grounded & Present", desc: "Rooted awareness, quiet spine", active: true },
  { name: "Cozy Comfort", desc: "Wool, warmth, soft edges", active: true },
  { name: "Body Melt", desc: "Gravity wins, muscles release", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
];

const FIREFLIES = [
  { top: 15, left: 12, size: 5, delay: 0, dur: 18, dx1: 40, dy1: -30, dx2: -20, dy2: 50 },
  { top: 28, left: 78, size: 4, delay: 2, dur: 22, dx1: -50, dy1: 40, dx2: 30, dy2: -20 },
  { top: 45, left: 35, size: 6, delay: 4, dur: 20, dx1: 30, dy1: 50, dx2: -40, dy2: -30 },
  { top: 62, left: 88, size: 4, delay: 1, dur: 24, dx1: -60, dy1: -40, dx2: 20, dy2: 30 },
  { top: 8, left: 55, size: 5, delay: 6, dur: 17, dx1: 50, dy1: 60, dx2: -30, dy2: -40 },
  { top: 75, left: 20, size: 5, delay: 3, dur: 19, dx1: 40, dy1: -50, dx2: -50, dy2: 20 },
  { top: 38, left: 65, size: 4, delay: 5, dur: 23, dx1: -40, dy1: 30, dx2: 60, dy2: -20 },
  { top: 88, left: 48, size: 6, delay: 7, dur: 21, dx1: 30, dy1: -60, dx2: -40, dy2: 40 },
  { top: 22, left: 92, size: 4, delay: 9, dur: 25, dx1: -70, dy1: 20, dx2: 40, dy2: -30 },
  { top: 55, left: 8, size: 5, delay: 4, dur: 16, dx1: 60, dy1: 40, dx2: -30, dy2: -50 },
  { top: 70, left: 72, size: 4, delay: 8, dur: 22, dx1: -40, dy1: -30, dx2: 50, dy2: 40 },
  { top: 18, left: 42, size: 5, delay: 10, dur: 20, dx1: 30, dy1: 50, dx2: -60, dy2: -20 },
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

export default function MikesBombaVibe() {
  const spotifyUrl = "https://open.spotify.com/search/" + encodeURIComponent("Khruangbin Bob Marley Kamasi Washington deep house reggae jazz 82 107 BPM");

  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes firefly0 {
          0% { transform: translate(0, 0); opacity: 0.2; }
          25% { transform: translate(40px, -30px); opacity: 0.9; }
          50% { transform: translate(20px, 20px); opacity: 0.35; }
          75% { transform: translate(-20px, 50px); opacity: 0.85; }
          100% { transform: translate(0, 0); opacity: 0.2; }
        }
        @keyframes firefly1 {
          0% { transform: translate(0, 0); opacity: 0.3; }
          30% { transform: translate(-50px, 40px); opacity: 0.9; }
          60% { transform: translate(-10px, 10px); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }
        @keyframes firefly2 {
          0% { transform: translate(0, 0); opacity: 0.25; }
          20% { transform: translate(30px, 50px); opacity: 0.95; }
          55% { transform: translate(-40px, -30px); opacity: 0.5; }
          80% { transform: translate(10px, 20px); opacity: 0.85; }
          100% { transform: translate(0, 0); opacity: 0.25; }
        }
        @keyframes firefly3 {
          0% { transform: translate(0, 0); opacity: 0.2; }
          35% { transform: translate(-60px, -40px); opacity: 0.9; }
          70% { transform: translate(20px, 30px); opacity: 0.3; }
          100% { transform: translate(0, 0); opacity: 0.2; }
        }
        @keyframes firefly4 {
          0% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(50px, 60px); opacity: 0.9; }
          60% { transform: translate(-30px, -40px); opacity: 0.45; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }
        @keyframes firefly5 {
          0% { transform: translate(0, 0); opacity: 0.25; }
          30% { transform: translate(40px, -50px); opacity: 0.95; }
          65% { transform: translate(-50px, 20px); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0.25; }
        }
        @keyframes firefly6 {
          0% { transform: translate(0, 0); opacity: 0.2; }
          40% { transform: translate(-40px, 30px); opacity: 0.9; }
          75% { transform: translate(60px, -20px); opacity: 0.35; }
          100% { transform: translate(0, 0); opacity: 0.2; }
        }
        @keyframes firefly7 {
          0% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(30px, -60px); opacity: 0.95; }
          55% { transform: translate(-40px, 40px); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }
        @keyframes firefly8 {
          0% { transform: translate(0, 0); opacity: 0.25; }
          35% { transform: translate(-70px, 20px); opacity: 0.9; }
          70% { transform: translate(40px, -30px); opacity: 0.45; }
          100% { transform: translate(0, 0); opacity: 0.25; }
        }
        @keyframes firefly9 {
          0% { transform: translate(0, 0); opacity: 0.2; }
          30% { transform: translate(60px, 40px); opacity: 0.95; }
          65% { transform: translate(-30px, -50px); opacity: 0.35; }
          100% { transform: translate(0, 0); opacity: 0.2; }
        }
        @keyframes firefly10 {
          0% { transform: translate(0, 0); opacity: 0.3; }
          40% { transform: translate(-40px, -30px); opacity: 0.9; }
          75% { transform: translate(50px, 40px); opacity: 0.4; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }
        @keyframes firefly11 {
          0% { transform: translate(0, 0); opacity: 0.25; }
          30% { transform: translate(30px, 50px); opacity: 0.95; }
          65% { transform: translate(-60px, -20px); opacity: 0.45; }
          100% { transform: translate(0, 0); opacity: 0.25; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,160,106,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Floating firefly dots */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {FIREFLIES.map((f, i) => (
          <div key={i} style={{
            position: "absolute", top: `${f.top}%`, left: `${f.left}%`,
            width: f.size, height: f.size, borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${COLORS.gold}ee, ${COLORS.accent1}30)`,
            boxShadow: `0 0 ${f.size * 2}px ${COLORS.accent1}80, 0 0 ${f.size * 4}px ${COLORS.accent1}40`,
            animation: `firefly${i} ${f.dur}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`,
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
            A Mike's Bomba session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + lemon → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Sage, lemon, and rosemary terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, black pepper, lemon, sage, lavender — gets its scent from
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
            The Mike's Bomba blend matches its exact terpene fingerprint — caryophyllene from black pepper,
            limonene from lemon, humulene from sage, linalool from lavender — so your body receives the same
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
              <div style={{ fontSize: 18, fontFamily: FONTS.display, fontWeight: 400 }}>{STRAIN.dominantTerpene}</div>
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
            Every ingredient maps to Mike's Bomba's terpene fingerprint. Black pepper and rosemary carry caryophyllene.
            Lemon delivers limonene. Sage provides humulene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.52 · Valence 0.57</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Settle", bpm: "82", mins: "10" },
                { phase: "Immerse", bpm: "77", mins: "15" },
                { phase: "Emerge", bpm: "92", mins: "5" },
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
            href={spotifyUrl}
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
          <SectionLabel>The Narrative · Forest Floor</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Mike's Bomba lives in four categories:
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

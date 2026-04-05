import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A0F0A",
  bgCard: "#241812",
  bgPanel: "#2E2018",
  text: "#F0E4D4",
  textMuted: "#B49484",
  textDim: "#785C4C",
  accent1: "#6AC87A",
  accent2: "#4EA860",
  gold: "#E8B878",
  border: "#3A2A1E",
};

const FONTS = {
  display: "'Fraunces', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Avenue of the Giants",
  farm: "Happy Day Farms",
  region: "Mendocino",
  energy: "HIGH",
  intent: "Forward momentum with electric clarity.",
  effects: ["Energizing", "Buzzy", "Motivating"],
  aroma: ["Pine Needles", "Menthol", "Jasmine"],
  totalTerpenes: "3.48%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 1.94, ratio: 56, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Bay Laurel", note: "Heavy, sedating warmth. The forest floor molecule." },
  { name: "β-Caryophyllene", pct: 0.43, ratio: 12, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — spicy warmth with no psychoactivity." },
  { name: "α-Pinene", pct: 0.26, ratio: 7, color: "#6BAE8E", oil: "Pine", food: "Pine Needles, Rosemary, Conifer Resins", note: "Sharp vertical clarity. Memory and alertness support." },
  { name: "β-Ocimene", pct: 0.24, ratio: 7, color: "#B088D4", oil: "Basil", food: "Basil, Mint, Mango, Orchids", note: "Bright herbal spark. Green tropical undertone." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 16, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Pine", drops: 8, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Basil", drops: 4, terpene: "β-Ocimene", color: "#B088D4" },
  { name: "Peppermint", drops: 4, terpene: "Menthol", color: "#88C4A0" },
  { name: "Geranium", drops: 2, terpene: "Floral", color: "#C4A8D4" },
];

const BLEND_RATIONALE = "Very high myrcene (1.94%) with lemongrass at 40%. Pine needle oil captures the pine needles aroma note and pinene. Black pepper for caryophyllene. Basil for ocimene. Peppermint for the menthol. Geranium adds jasmine-like floral notes.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + pine. Open space, standing desk, bright daylight.", icon: "☀" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Avenue of the Giants mocktail or fresh pressed juice. Forest terpenes through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Quick-start protocol.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. The momentum arrives already in motion.", icon: "🌲" },
];

const BEVERAGES = [
  {
    name: "Avenue of the Giants Tea", subtitle: "Forest floor herbal infusion with forest clarity",
    meta: "Teacup · 8oz · 195°F · 5-6 min · Minimal caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried lemongrass pieces",
      "2-3 dried rosemary sprigs",
      "5-6 dried basil leaves",
      "3-4 dried mint leaves",
      "0.5 oz jasmine tea concentrate",
      "squeeze of fresh lime juice",
      "fresh rosemary sprig (garnish)",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Avenue of the Giants Mocktail", subtitle: "Redwood forest clarity in a glass",
    meta: "Highball · 7oz · Chilled",
    ingredients: [
      "1 oz fresh lemongrass juice",
      "0.5 oz fresh lime juice",
      "1 sprig fresh rosemary",
      "3-4 fresh basil leaves",
      "0.5 oz cooled jasmine tea",
      "2 oz sparkling water (top)",
      "0.25 oz fresh mint water (float)",
      "rosemary, mint, lime wheel (garnish)",
    ],
    accent: "#6BAE8E",
  },
  {
    name: "Avenue of the Giants Cocktail", subtitle: "Gin-soaked redwood botanicals",
    meta: "Highball · 7.5oz · Gin · 16% ABV",
    ingredients: [
      "2 oz botanical gin",
      "1 oz fresh lemongrass juice",
      "0.5 oz fresh lime juice",
      "0.5 oz cooled jasmine tea",
      "1 sprig fresh rosemary",
      "4-5 fresh basil leaves",
      "2 oz sparkling water (top)",
      "rosemary, basil, lime wheel (garnish)",
    ],
    accent: "#B088D4",
  },
  {
    name: "Avenue of the Giants Juice", subtitle: "Fresh forest green with minty clarity",
    meta: "Highball · 8oz · Chilled · 30 min window",
    ingredients: [
      "3-4 stalks fresh lemongrass",
      "1 oz fresh lime juice",
      "0.5 oz fresh mint juice",
      "2 sprigs fresh rosemary",
      "5-6 fresh basil leaves",
      "2.5 oz cold mineral water",
      "1.5 oz sparkling water",
      "rosemary sprig + basil leaf (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Avenue of the Giants Shot", subtitle: "One-sip forest depth",
    meta: "Shot glass · 2oz · Frozen · Serve immediately",
    ingredients: [
      "1.25 oz gin",
      "0.75 oz fresh lemongrass juice",
      "3-4 fresh basil leaves",
      "1 small sprig rosemary",
      "ice",
    ],
    accent: "#E8B878",
  },
];

const MUSIC = {
  bpm: "69–90 BPM",
  description: "A bright, uplifting, energetic session. Forward momentum with electric clarity. Ambient, dub, lo-fi hip hop, deep house, reggae — the music meets where you are and builds sustained glow.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Khruangbin"],
  genres: ["ambient", "dub", "lo-fi hip hop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, standing desk or movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning session. Best when the day is still opening up and the direction is forward." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "Sixteen drops of lemongrass, and the redwoods arrive. Not the tourist version with parking lots and interpretive plaques, but the real ones — the ancient columns of Happy Day Farms' Mendocino backyard, where sedating warmth hangs in the air at extraordinary concentration and the trees are too old to be impressed by anything except persistence and the willingness to grow toward light.\n\nPine needle oil follows with eight drops, and now the forest is complete: the vertical green, the sharp resinous clarity, the feeling of being small in the presence of something that has been growing for a thousand years and will continue growing long after every human concern has composted into the duff underfoot. This is not relaxation. This is forward momentum with a direction that the trees selected centuries ago.\n\nBlack pepper adds six drops of spiced warmth, the buzzy motivating edge that Fleet Foxes channel into harmonies so precise they sound wild, so rehearsed they sound spontaneous. Basil brings four drops of the bright herbal molecule — the bright tropical undertone in the jasmine aroma, a green spark that turns the forest from cathedral into laboratory, from reverence into curiosity.\n\nPeppermint at four drops creates the menthol corridor, and suddenly the signature clarity snaps into focus like a lens finding its subject. This is the electric part — the buzzy quality that makes ideas feel not just possible but urgent, not just interesting but necessary. Geranium whispers its two drops of jasmine-adjacent florality at the very edge of perception, where you smell it only when you stop trying.\n\nA trail runner pulls her hair back, standing at the base of an old-growth giant in the morning light that filters through the canopy in cathedral shafts. The air smells exactly like this six-oil blend: pine and lemongrass and something sharp-sweet that defies single naming. Avenue of the Giants is not a strain you sit with. It is a strain that moves through you and expects you to keep up.\n\nShe is not resting. She is choosing which direction carries the most momentum, and every direction looks like forward, and the morning is not asking for anything except motion, and the lemongrass-pine-pepper air fills her lungs like fuel, and the next step is already happening.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: true },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
];

// Redwood trunks at varying depths. `w` = trunk width at base (%).
// `depth` = 0 (foreground, darkest) → 3 (background, faintest).
// Avenue of the Giants is known for massive sequoia trunks lining the road.
const REDWOODS = [
  { x: 4,  w: 8.5, depth: 0, sway: 14, delay: 0 },
  { x: 16, w: 5.5, depth: 1, sway: 18, delay: 2.2 },
  { x: 28, w: 3.5, depth: 2, sway: 22, delay: 5 },
  { x: 38, w: 7.0, depth: 0, sway: 15, delay: 1 },
  { x: 52, w: 4.2, depth: 1, sway: 20, delay: 3.5 },
  { x: 63, w: 2.8, depth: 3, sway: 24, delay: 6 },
  { x: 72, w: 6.5, depth: 0, sway: 16, delay: 0.8 },
  { x: 84, w: 4.0, depth: 1, sway: 19, delay: 4 },
  { x: 94, w: 3.2, depth: 2, sway: 21, delay: 2.5 },
];

const LIGHT_RAYS = [
  { left: 20, rotate: 14, width: 60, delay: 0, dur: 14 },
  { left: 55, rotate: 18, width: 80, delay: 5, dur: 12 },
  { left: 78, rotate: 16, width: 50, delay: 2.5, dur: 16 },
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

export default function AvenueOfTheGiantsVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes rayFade {
          0% { opacity: 0; }
          20% { opacity: 0.35; }
          50% { opacity: 0.5; }
          80% { opacity: 0.25; }
          100% { opacity: 0; }
        }
        @keyframes treeSway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(-0.4%) rotate(-0.3deg); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(106,200,122,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Redwood forest — tall sequoia trunks at varying depths + light through canopy */}
      <svg style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }} preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          {/* Canopy glow from top */}
          <linearGradient id="canopyGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8B878" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#6AC87A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1A0F0A" stopOpacity="0" />
          </linearGradient>
          {/* Foreground redwood (depth 0) — rich bark */}
          <linearGradient id="trunkFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A1810" stopOpacity="0" />
            <stop offset="15%" stopColor="#3A2218" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1A0F0A" stopOpacity="0.95" />
          </linearGradient>
          {/* Mid-depth redwood (depth 1) */}
          <linearGradient id="trunkMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A1810" stopOpacity="0" />
            <stop offset="20%" stopColor="#3A2218" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#24180F" stopOpacity="0.7" />
          </linearGradient>
          {/* Background redwood (depth 2) */}
          <linearGradient id="trunkBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A1810" stopOpacity="0" />
            <stop offset="25%" stopColor="#3A2218" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#24180F" stopOpacity="0.4" />
          </linearGradient>
          {/* Far background (depth 3) — atmospheric haze */}
          <linearGradient id="trunkFar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A1810" stopOpacity="0" />
            <stop offset="30%" stopColor="#3A2218" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#24180F" stopOpacity="0.22" />
          </linearGradient>
          {/* Sunlight rays filtering through */}
          <linearGradient id="rayGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8B878" stopOpacity="0.28" />
            <stop offset="40%" stopColor="#E8B878" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E8B878" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rayGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6AC87A" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#6AC87A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#6AC87A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Canopy glow overlay */}
        <rect x="0" y="0" width="100" height="100" fill="url(#canopyGlow)" />

        {/* Light rays through the canopy */}
        {LIGHT_RAYS.map((r, i) => (
          <g key={`ray-${i}`} transform={`translate(${r.left}, 0) rotate(${r.rotate})`}
             style={{
               animation: `rayFade ${r.dur}s ease-in-out infinite`,
               animationDelay: `${r.delay}s`,
               transformOrigin: "top left",
             }}>
            <polygon
              points={`0,0 ${r.width / 10},0 ${r.width / 20},140 -${r.width / 20},140`}
              fill={i % 2 === 0 ? "url(#rayGold)" : "url(#rayGreen)"}
            />
          </g>
        ))}

        {/* Redwood trunks — sorted back-to-front so foreground overlaps */}
        {[...REDWOODS].sort((a, b) => b.depth - a.depth).map((tree, i) => {
          const gradients = ["url(#trunkFront)", "url(#trunkMid)", "url(#trunkBack)", "url(#trunkFar)"];
          const taper = tree.w * 0.6; // trunk tapers toward top
          // Polygon: base-left, top-left, top-right, base-right
          const baseLeft = tree.x - tree.w / 2;
          const baseRight = tree.x + tree.w / 2;
          const topLeft = tree.x - taper / 2;
          const topRight = tree.x + taper / 2;
          return (
            <g key={`tree-${i}`} style={{
              animation: `treeSway ${tree.sway}s ease-in-out infinite`,
              animationDelay: `${tree.delay}s`,
              transformOrigin: `${tree.x}% 100%`,
            }}>
              <polygon
                points={`${baseLeft},100 ${topLeft},-5 ${topRight},-5 ${baseRight},100`}
                fill={gradients[tree.depth]}
              />
              {/* Vertical bark texture — faint darker stripe */}
              {tree.depth <= 1 && (
                <line
                  x1={tree.x - tree.w / 6} y1="100"
                  x2={tree.x - taper / 6} y2="-5"
                  stroke="#0F0806" strokeWidth="0.15" strokeOpacity="0.4"
                />
              )}
              {tree.depth === 0 && (
                <line
                  x1={tree.x + tree.w / 5} y1="100"
                  x2={tree.x + taper / 5} y2="-5"
                  stroke="#0F0806" strokeWidth="0.12" strokeOpacity="0.35"
                />
              )}
            </g>
          );
        })}

        {/* Forest floor shadow at bottom */}
        <rect x="0" y="92" width="100" height="8" fill="#0A0605" fillOpacity="0.65" />
      </svg>

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
            An Avenue of the Giants session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + pine → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Lemongrass + basil terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, lemongrass, pine, black pepper, basil — gets its scent from
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
            Terpene Pre-Loading means delivering these molecules <em>before</em> you consume cannabis —
            through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
            Not just "smelling nice." Temporal sequencing: prime, then amplify.
          </p>
          <p style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, margin: 0 }}>
            The Avenue of the Giants blend matches its exact terpene fingerprint — myrcene from lemongrass, pinene from
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
            Every ingredient maps to Avenue of the Giants' terpene fingerprint. Lemongrass delivers myrcene.
            Basil carries ocimene. Rosemary provides pinene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.31 · Valence 0.39</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "69", mins: "5" },
                { phase: "Peak", bpm: "90", mins: "15" },
                { phase: "Coast", bpm: "79", mins: "10" },
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
            href="https://open.spotify.com/search/ambient%20dub%20lo-fi%20hip%20hop%20deep%20house"
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
          <SectionLabel>The Narrative · Forest Momentum</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Avenue of the Giants lives in three categories:
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

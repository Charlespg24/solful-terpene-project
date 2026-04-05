import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A1510",
  bgCard: "#241E18",
  bgPanel: "#2E2720",
  text: "#F4E8D8",
  textMuted: "#B49E80",
  textDim: "#75614C",
  accent1: "#E87A6A",
  accent2: "#D4604E",
  gold: "#F0906A",
  border: "#3A2D24",
};

const FONTS = {
  display: "'Space Grotesk', sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Guava Gift",
  farm: "Alpenglow Farms",
  region: "Humboldt",
  energy: "HIGH",
  intent: "Open and expansive, easy social lift.",
  effects: ["Social", "Inspiring", "Euphoric"],
  aroma: ["Fresh Guava", "Lemon Rind", "Tamarind"],
  totalTerpenes: "2.34%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.73, ratio: 31, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "Limonene", pct: 0.50, ratio: 21, color: "#F4D35E", oil: "Grapefruit", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption." },
  { name: "Myrcene", pct: 0.33, ratio: 14, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme", note: "Body-ease and euphoric lift. Amplifies other terpenes." },
  { name: "α-Humulene", pct: 0.25, ratio: 11, color: "#A8945A", oil: "Basil", food: "Hops, Sage, Ginseng", note: "Earthy, herbal backbone. Shared with caryophyllene's anti-inflammatory profile." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Grapefruit", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "Lemongrass", drops: 8, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Basil", drops: 6, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Rosemary", drops: 2, terpene: "β-Caryophyllene", color: "#B88A5A" },
];

const BLEND_RATIONALE = "Black pepper leads with caryophyllene. Grapefruit brings tropical citrus that echoes the guava aroma. Lemongrass delivers myrcene for the euphoric lift. Basil adds humulene with a bright, fresh edge. A touch of rosemary for herbal depth.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing black pepper + grapefruit. Open space, clean surfaces, bright daylight.", icon: "☀" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Social Guava mocktail or Guava Dawn juice. Tropical delivery through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Sympathetic activation.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene. The social lift arrives effortlessly.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Guava Harmony Tea", subtitle: "Gentle guava leaf infusion with subtle tropical notes",
    meta: "Teacup · 6oz · 195°F · 4 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "1 tbsp dried guava leaf",
      "0.5 oz fresh guava puree",
      "0.5 oz fresh lime juice",
      "0.5 tsp raw honey",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Social Guava Mocktail", subtitle: "Tropical guava and tamarind sparkle with expansive warmth",
    meta: "Highball · 8oz · Ice cold",
    ingredients: [
      "3 oz fresh guava nectar",
      "1 oz tamarind paste (diluted)",
      "3 oz sparkling water",
      "0.5 oz fresh lemon juice",
      "1 lemon wheel + rosemary sprig",
    ],
    accent: "#E87A6A",
  },
  {
    name: "Tropical Elevation Cocktail", subtitle: "White rum carries guava and tamarind to bright social heights",
    meta: "Tiki mug · 7oz · Pisco/White Rum · ~28% ABV",
    ingredients: [
      "2 oz pisco or white rum",
      "2.5 oz guava puree",
      "0.75 oz tamarind paste",
      "0.5 oz lime juice",
      "1 guava slice + lemon twist + rosemary",
    ],
    accent: "#D4604E",
  },
  {
    name: "Guava Dawn Juice", subtitle: "Pressed guava and tamarind with bright citrus whisper",
    meta: "Juice glass · 8oz · Ice cold · 60 min window",
    ingredients: [
      "4 oz fresh guava (pressed)",
      "1 tsp tamarind paste",
      "1 oz filtered water",
      "0.5 oz fresh lime juice",
      "1 lemon wheel (garnish)",
    ],
    accent: "#F0906A",
  },
  {
    name: "Guava Spark Shot", subtitle: "A tropical punch of guava and tamarind intensity",
    meta: "Shot · 1.5oz · Room temp · Consume immediately",
    ingredients: [
      "1 oz pisco",
      "0.5 oz guava puree",
      "0.25 oz tamarind paste (diluted)",
      "1 dried guava chip (garnish)",
    ],
    accent: "#F4D35E",
  },
];

const MUSIC = {
  bpm: "80–105 BPM",
  description: "A bright, uplifting, energetic session. Open and expansive, easy social lift. Deep house, reggae, jazz, funk, soul — the music meets where you are and builds toward full momentum.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
  genres: ["deep house", "reggae", "jazz", "funk", "soul"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning through midday. Best when the day is still opening up and the room is ready to gather." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "The grapefruit oil cracks open like a sunrise over the Humboldt hills — ten drops of tropical citrus that light up the room before the pepper even gets a word in. Alpenglow Farms knows something about first impressions: their guava carries that same immediate generosity, that willingness to show up bright and unguarded and trust that the room will meet you halfway.\n\nBlack pepper follows, fourteen drops of warmth that transforms the social energy from effervescent to substantive. This is not nervous energy buzzing in search of a direction. This is Anderson .Paak territory — rhythmic, confident, generous with the groove. The spicy backbone is sturdy enough to host the whole party, solid enough that everyone in the room can lean against it.\n\nLemongrass brings the sedating quality in through the back door, eight drops of grassy sweetness that softens every conversation into something more honest, more connected to the body rather than the performance of sociability. Basil adds a bright herbal edge, six drops of the kind of clarity that makes you say the true thing instead of the polite thing and somehow makes both sound the same.\n\nRosemary whispers from its two drops in the corner of the blend, adding just enough herbal depth to keep the freshness from floating away into pure citrus abstraction. The fresh guava aroma is not in any one bottle — it is what happens when grapefruit meets pepper meets lemongrass in humid Humboldt air, a tropical alchemy that the strain itself performs in the flower and the oils reproduce in the room.\n\nA gathering is forming on the farmhouse porch. Someone has brought a tamarind paste to spread on grilled sourdough from the bakery in town. The lemon rind quality in the evening light turns everything slightly golden, and the conversation has reached that rare altitude where nobody is performing and everyone is present. Guava Gift circulates through the group like a host who remembers everyone's name and everyone's drink — open, expansive, easy — and the five oils have been doing their invisible work for thirty minutes, and no one has noticed because the room already feels like the room they have always wanted to be in.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const ORBS = [
  { left: 8, top: 15, size: 120, delay: 0, dur: 18, xDrift: 30, yDrift: 40 },
  { left: 72, top: 10, size: 90, delay: 2, dur: 20, xDrift: -40, yDrift: 35 },
  { left: 45, top: 55, size: 150, delay: 1, dur: 16, xDrift: 35, yDrift: -30 },
  { left: 85, top: 65, size: 100, delay: 4, dur: 19, xDrift: -25, yDrift: 45 },
  { left: 20, top: 78, size: 130, delay: 3, dur: 17, xDrift: 40, yDrift: -35 },
  { left: 60, top: 30, size: 80, delay: 5, dur: 15, xDrift: -30, yDrift: 50 },
  { left: 12, top: 45, size: 110, delay: 6, dur: 18, xDrift: 45, yDrift: 25 },
  { left: 78, top: 85, size: 95, delay: 7, dur: 20, xDrift: -35, yDrift: -40 },
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

export default function GuavaGiftVibe() {
  const spotifySearchUrl = "https://open.spotify.com/search/" + encodeURIComponent("Khruangbin Bob Marley Kamasi Washington Anderson Paak deep house reggae jazz funk");
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes floatOrb0 {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(15px, 20px) scale(0.95); }
          75% { transform: translate(-10px, 10px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 15px) scale(1.08); }
          66% { transform: translate(20px, -15px) scale(0.92); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(20px, 25px) scale(1.03); }
          50% { transform: translate(-15px, -20px) scale(1.07); }
          80% { transform: translate(10px, 15px) scale(0.96); }
          100% { transform: translate(0, 0) scale(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,122,106,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Tropical floating orbs */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {ORBS.map((o, i) => (
          <div key={i} style={{
            position: "absolute", left: `${o.left}%`, top: `${o.top}%`,
            width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${COLORS.accent1}55 0%, ${COLORS.accent1}22 40%, transparent 75%)`,
            filter: "blur(8px)",
            animation: `floatOrb${i % 3} ${o.dur}s ease-in-out infinite`,
            animationDelay: `${o.delay}s`,
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
            A Guava Gift session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + grapefruit → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Guava + tamarind terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, black pepper, grapefruit, lemongrass, basil — gets its scent from
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
            The Guava Gift blend matches its exact terpene fingerprint — caryophyllene from black pepper,
            limonene from grapefruit, myrcene from lemongrass, humulene from basil — so your body receives the same
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
            Every ingredient maps to Guava Gift's terpene fingerprint. Black pepper and cloves deliver caryophyllene.
            Grapefruit and lime carry limonene. Lemongrass provides myrcene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.49 · Valence 0.53</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "80", mins: "5" },
                { phase: "Peak", bpm: "105", mins: "15" },
                { phase: "Coast", bpm: "92", mins: "10" },
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
            href={spotifySearchUrl}
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
          <SectionLabel>The Narrative · Farmhouse Porch</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Guava Gift lives in three categories:
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

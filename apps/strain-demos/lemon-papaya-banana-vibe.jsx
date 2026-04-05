import { useState, useEffect } from "react";

const COLORS = {
  bg: "#141208",
  bgCard: "#1E1A10",
  bgPanel: "#282218",
  text: "#F0EADC",
  textMuted: "#B4A880",
  textDim: "#766C4C",
  accent1: "#E8D44A",
  accent2: "#C4B434",
  gold: "#F0E06A",
  border: "#3A3220",
};

const FONTS = {
  display: "'Libre Baskerville', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Lemon Papaya Banana",
  farm: "Terrapin Farms",
  region: "Humboldt",
  energy: "LOW",
  intent: "Soft body, drifting expansive mind.",
  effects: ["Physically Relaxed", "Spacey", "Euphoric"],
  aroma: ["Papaya", "Honeydew Melon", "Lemon Zest"],
  totalTerpenes: "1.38%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 0.57, ratio: 41, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Bay Laurel", note: "Heavy, sedating weight. The molecule of the couch and the slow afternoon." },
  { name: "Limonene", pct: 0.29, ratio: 21, color: "#F4D35E", oil: "Lemon", food: "Citrus Peels, Juniper, Dill", note: "Bright zest that softens into mood elevation. Lifts even within a slow session." },
  { name: "β-Caryophyllene", pct: 0.16, ratio: 12, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth, grounds the drift." },
  { name: "α-Humulene", pct: 0.05, ratio: 4, color: "#A8945A", oil: "Ylang Ylang", food: "Hops, Sage, Ginseng", note: "Earthy undertone. Shares hops' quiet depth." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 14, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Lemon", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Geranium", drops: 6, terpene: "Geraniol", color: "#D4A8BC" },
  { name: "Ylang Ylang", drops: 4, terpene: "Linalool", color: "#C4A8D4" },
];

const BLEND_RATIONALE = "Myrcene-dominant with lemongrass at 35%. Lemon captures the lemon zest perfectly. Black pepper for caryophyllene. Geranium adds tropical, fruity notes matching papaya and melon. Ylang ylang brings exotic sweetness.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + lemon. Dim light, low seating, soft throws. Candles at eye level.", icon: "◐" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Lemon Papaya Banana tea or mocktail. Tropical terpenes through the gut.", icon: "◇" },
  { time: "T – 10 min", label: "Breathe", desc: "Descent Breath — 4-4-8 pattern. 8 cycles. Gravity pulls deeper with each exhale.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. The body softens. The mind expands outward.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Lemon Papaya Banana Tea", subtitle: "Soft tropical comfort brew with honeyed lemon peel",
    meta: "Teacup · 8oz · 155°F · 5 min · Herbal (no caffeine)",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried papaya pieces",
      "0.5 tbsp dried banana chips",
      "1 tsp dried lemon peel",
      "1 small bay leaf",
      "0.5 oz coconut cream",
      "fresh mint sprig (garnish)",
    ],
    accent: "#E8D44A",
  },
  {
    name: "Lemon Papaya Banana Mocktail", subtitle: "Soft tropical body, expansive mind",
    meta: "Highball · 7oz · Chilled · Blended",
    ingredients: [
      "1.5 oz fresh papaya puree",
      "0.75 oz banana puree (frozen)",
      "0.75 oz fresh lemon juice",
      "0.5 oz honeydew melon juice",
      "0.75 oz coconut cream",
      "pinch of vanilla powder",
      "papaya slice + banana wheel (garnish)",
    ],
    accent: "#F0E06A",
  },
  {
    name: "Lemon Papaya Banana Cocktail", subtitle: "Cachaça-spiked papaya-banana drift",
    meta: "Highball · 7.5oz · Cachaça · 14% ABV",
    ingredients: [
      "1.5 oz cachaça",
      "1.5 oz fresh papaya puree",
      "0.75 oz banana puree (frozen)",
      "0.75 oz fresh lemon juice",
      "0.5 oz honeydew melon juice",
      "0.75 oz coconut cream",
      "1 small bay leaf + pinch of vanilla powder",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Lemon Papaya Banana Juice", subtitle: "Tropical smoothie blend, serve immediately",
    meta: "Highball · 8oz · Chilled · Immediate",
    ingredients: [
      "1 ripe papaya (peeled, seeded)",
      "1 ripe banana (frozen)",
      "1 fresh lemon (juiced)",
      "0.75 cup fresh honeydew melon",
      "0.75 oz coconut cream",
      "1 oz cold filtered water",
      "papaya slice + banana wheel (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Lemon Papaya Banana Shot", subtitle: "One-sip tropical drift — serve ice-cold",
    meta: "Shot · 2oz · Frozen · Consume immediately",
    ingredients: [
      "1 oz cachaça",
      "0.75 oz fresh papaya puree",
      "0.25 oz banana puree",
      "0.25 oz fresh lemon juice",
      "tiny pinch of vanilla powder",
    ],
    accent: "#C4A8D4",
  },
];

const MUSIC = {
  bpm: "73–97 BPM",
  description: "A calm, grounding, slow session. Soft body, drifting expansive mind. Ambient, dub, lo-fi hip hop, funk, soul — the music settles you into the floor and holds you there.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Anderson .Paak"],
  genres: ["ambient", "dub", "lo-fi hip hop", "funk", "soul"],
};

const ISO_PHASES = [
  { phase: "Settle", bpm: "73", mins: "10" },
  { phase: "Immerse", bpm: "68", mins: "15" },
  { phase: "Emerge", bpm: "83", mins: "5" },
];

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Dim (20-30%), 2400K. Candles at eye level. Minimize overhead lighting — let the edges of the room blur softly." },
  { label: "Setting", icon: "◇", body: "Low seating, soft throws, linen and wool and velvet. Warm wood surfaces. Room at 68°F." },
  { label: "Breathwork", icon: "◠", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic activation." },
  { label: "Timing", icon: "☾", body: "Evening. Best when the day is already winding down and the body is asking to be held." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "The lemongrass is dominant from the first breath — fourteen drops that slow the room like honey poured over time itself. In Humboldt, where Terrapin Farms sits between ridges that catch the coastal fog and hold it like cupped hands, the afternoon air already carries that heavy sweetness, and the oil simply amplifies what the land was already saying in its slow botanical dialect.\n\nLemon enters next, ten drops of zest so bright it could cut glass, but here it dissolves into the heavy haze like sunlight through gauze, losing its edges without losing its identity. The papaya note lives somewhere in the overlap, tropical and overripe and perfectly content to be both — the scent of fruit that has decided there is no rush toward anything, not even ripeness.\n\nBlack pepper holds the low end with six drops, just enough structural warmth to keep the drift from becoming weightless, to remind the body that gravity is still a participant even when everything feels like floating. Geranium adds the honeydew melon quality, its soft floral fruitiness a stand-in for the tropical fruit that the strain's name promises but the oils deliver through translation rather than imitation.\n\nYlang ylang is the closer. Four drops of exotic sweetness that Bonobo might sample for a late-night downtempo set, the kind of scent that makes you close your eyes not because you are tired but because the inside of your eyelids has become more interesting than the room, more spacious, more hospitable to the kind of thoughts that only arrive when the body stops supervising.\n\nSomeone has left Lemon Papaya Banana on the nightstand next to an open book, face-down, its pages fanning slightly in a breeze from nowhere in particular. She does not mind losing her place. The body is soft and the mind is drifting through landscapes that have no geography but feel completely real — papaya groves that smell like geranium, melon fields where lemongrass grows between the rows.\n\nThe five oils have turned the bedroom into a departure lounge for somewhere warmer, and the lemon zest in the air is the last thing she notices before noticing itself becomes a gentle, expansive luxury rather than a task.";

const VIBES = [
  { name: "Cozy Comfort", desc: "Held and softened, tropical warmth", active: true },
  { name: "Grounded & Present", desc: "Body sinks, mind opens outward", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
];

// Floating tropical pollen — 14 tiny yellow dots drifting in gentle random patterns
const POLLEN = [
  { left: 8,  size: 2, delay: 0,    dur: 22, drift: 8 },
  { left: 16, size: 1, delay: 3,    dur: 18, drift: -6 },
  { left: 23, size: 3, delay: 1.5,  dur: 25, drift: 10 },
  { left: 31, size: 2, delay: 5,    dur: 20, drift: -4 },
  { left: 38, size: 1, delay: 2,    dur: 17, drift: 7 },
  { left: 45, size: 2, delay: 6,    dur: 23, drift: -9 },
  { left: 52, size: 3, delay: 0.5,  dur: 19, drift: 5 },
  { left: 59, size: 1, delay: 4,    dur: 21, drift: -7 },
  { left: 66, size: 2, delay: 7,    dur: 24, drift: 8 },
  { left: 73, size: 1, delay: 2.5,  dur: 16, drift: -5 },
  { left: 80, size: 2, delay: 5.5,  dur: 22, drift: 9 },
  { left: 87, size: 3, delay: 1,    dur: 25, drift: -8 },
  { left: 93, size: 1, delay: 3.5,  dur: 18, drift: 6 },
  { left: 12, size: 2, delay: 8,    dur: 20, drift: -7 },
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
    const t = setTimeout(() => setWidth(terpene.ratio * 2.0), 300 + index * 150);
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

export default function LemonPapayaBananaVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes driftPollen {
          0%   { transform: translate(0, 100vh) scale(0.8);               opacity: 0; }
          10%  { opacity: 0.3; }
          25%  { transform: translate(var(--drift), 75vh) scale(1);       opacity: 0.35; }
          50%  { transform: translate(calc(var(--drift) * -0.5), 50vh) scale(0.9); opacity: 0.4; }
          75%  { transform: translate(calc(var(--drift) * 0.7), 25vh) scale(1.05); opacity: 0.3; }
          90%  { opacity: 0.2; }
          100% { transform: translate(0, -10vh) scale(0.85);              opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,212,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Floating tropical pollen */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {POLLEN.map((p, i) => (
          <div key={i} style={{
            position: "absolute", left: `${p.left}%`, top: 0,
            width: p.size, height: p.size, borderRadius: "50%",
            background: COLORS.gold,
            boxShadow: `0 0 ${p.size * 2}px ${COLORS.accent1}40`,
            animation: `driftPollen ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}vw`,
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
            fontFamily: FONTS.display, fontSize: 44, fontWeight: 400,
            lineHeight: 1.1, margin: "0 0 8px", letterSpacing: -0.5,
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
            A Lemon Papaya Banana session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the tea or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + lemon → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Papaya, banana and lemon terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, lemongrass, lemon, black pepper, geranium — gets its scent from
            the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${COLORS.gold}08`,
            border: `1px solid ${COLORS.gold}20`, borderRadius: 10, marginBottom: 20,
          }}>
            <p style={{
              fontFamily: FONTS.display, fontSize: 15, fontWeight: 400,
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
            The Lemon Papaya Banana blend matches its exact terpene fingerprint — myrcene from lemongrass, limonene
            from lemon, caryophyllene from black pepper, with geranium and ylang ylang translating the papaya and
            honeydew notes — so your body receives the same chemical signal from three sources before the fourth
            (the flower) ever arrives.
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
            Every ingredient maps to Lemon Papaya Banana's terpene fingerprint. Lemongrass and bay carry myrcene.
            Lemon and orange peel deliver limonene. Black pepper brings caryophyllene. You're drinking the strain
            before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.39 · Valence 0.47</div>
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
            href="https://open.spotify.com/search/lemon%20papaya%20banana%20ambient%20dub%20lo-fi"
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
          <SectionLabel>The Narrative · Drifting Light</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Lemon Papaya Banana lives in two categories:
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

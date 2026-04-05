import { useState, useEffect } from "react";

const COLORS = {
  bg: "#18140E",
  bgCard: "#221C14",
  bgPanel: "#2C241C",
  text: "#F0E8D8",
  textMuted: "#B49C84",
  textDim: "#786248",
  accent1: "#D4A48A",
  accent2: "#B8866E",
  gold: "#E8BCA0",
  border: "#382C20",
};

const FONTS = {
  display: "'Fraunces', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Love and Laughter CBD",
  farm: "Heartrock Mountain Farm",
  region: "Mendocino",
  energy: "HIGH",
  intent: "Clear and steady, nothing clouded.",
  effects: ["Energizing", "Focusing", "Non-Intoxicating"],
  aroma: ["Flowers", "Eucalyptus", "Berries"],
  totalTerpenes: "1.72%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 0.56, ratio: 33, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Lemongrass, Thyme", note: "Heavy, resinous, grounding. The backbone of steady presence." },
  { name: "Terpinolene", pct: 0.28, ratio: 16, color: "#7ECBA1", oil: "Tea Tree", food: "Apples, Nutmeg, Cumin, Lilac", note: "Rare and bright. The uplifting outlier with clean clarity." },
  { name: "β-Caryophyllene", pct: 0.20, ratio: 12, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "α-Pinene", pct: 0.13, ratio: 8, color: "#6BAE8E", oil: "Eucalyptus", food: "Pine, Rosemary, Basil, Parsley", note: "Forest air clarity. Sharpens attention, opens breath." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 14, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Tea Tree", drops: 8, terpene: "Terpinolene", color: "#7ECBA1" },
  { name: "Eucalyptus", drops: 8, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Geranium", drops: 4, terpene: "Floral/Berry", color: "#D4A48A" },
];

const BLEND_RATIONALE = "The only CBD strain in the collection. Lemongrass for the dominant myrcene. Tea tree is one of the few oils high in terpinolene, capturing this strain's unique character. Eucalyptus matches the aroma and adds clarity. Black pepper for caryophyllene. Geranium brings floral berry notes.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + tea tree + eucalyptus. Open space, clean surfaces, bright natural light.", icon: "☀" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Clear Mind juice or Green Apple Focus mocktail. Green apple and berry clarity through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Sympathetic activation, building energy.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene and terpinolene. Clear, non-intoxicating focus arrives unclouded.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Eucalyptus Clarity Tea", subtitle: "Cool eucalyptus and berry tea for steady focus and calm",
    meta: "Teacup · 6oz · 185°F · 3 min · 0 mg caffeine",
    ingredients: [
      "6 oz filtered water",
      "0.5 tsp dried eucalyptus leaves",
      "1 tbsp dried mixed berries",
      "0.5 tsp fresh rosemary (minced)",
      "0.5 oz fresh green apple juice",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Green Apple Focus Mocktail", subtitle: "Green apple clarity with eucalyptus and berry brightness",
    meta: "Rocks · 5oz · Ice cold",
    ingredients: [
      "2 oz fresh green apple juice",
      "1 oz mixed berry juice",
      "0.5 oz eucalyptus honey water",
      "0.25 oz rosemary-simple syrup",
      "1 apple slice + rosemary sprig",
    ],
    accent: "#7ECBA1",
  },
  {
    name: "Focused Gin Cocktail", subtitle: "Gin's clarity sharpened by green apple, eucalyptus, and rosemary",
    meta: "Coupe · 5.5oz · Gin · ~32% ABV",
    ingredients: [
      "1.5 oz London Dry gin",
      "1.5 oz fresh green apple juice",
      "0.75 oz mixed berry juice",
      "0.5 oz eucalyptus honey water",
      "0.25 oz rosemary syrup",
    ],
    accent: "#6BAE8E",
  },
  {
    name: "Clear Mind Juice", subtitle: "Crisp cold-pressed green apple with berry depth and eucalyptus air",
    meta: "Juice glass · 8oz · Ice cold · 90 min window",
    ingredients: [
      "3 oz fresh green apple (pressed)",
      "1.5 oz mixed berries (pressed)",
      "1 oz eucalyptus honey water",
      "0.5 oz fresh rosemary water",
      "1 apple slice + edible flowers",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Focused Burst Shot", subtitle: "A bright, clear-minded spark of green apple and floral focus",
    meta: "Shot · 1.5oz · Ice cold · Consume immediately",
    ingredients: [
      "0.75 oz Pisco",
      "0.5 oz fresh green apple juice",
      "0.25 oz mixed berry juice",
      "1-2 drops eucalyptus honey",
    ],
    accent: "#D4A48A",
  },
];

const MUSIC = {
  bpm: "76–100 BPM",
  description: "A bright, uplifting, energetic session. Clear and steady, nothing clouded. Ambient, dub, lo-fi hip hop, psychedelic — the music holds the room at exactly the temperature where productivity feels less like effort and more like natural state.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Tame Impala"],
  genres: ["ambient", "dub", "lo-fi hip hop", "psychedelic", "indie electronic"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting from windows rather than screens." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, standing desk or movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation, quick-start." },
  { label: "Timing", icon: "◷", body: "Morning through midday. The non-intoxicating baseline — best when clarity, not clouding, is the goal." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "Lemongrass at fourteen drops, and the focus is immediate — not the jittery focus of stimulants but the clean, structural kind, the focus of a room where every surface is clear and the light comes from windows rather than screens. This is Heartrock Mountain Farm's only CBD entry in the Mendocino collection: the non-intoxicating baseline, the clear-headed control, the proof that the plant has modes nobody talks about at parties.\n\nTea tree arrives with eight drops of a rare aromatic, the unusual molecule that most people have never isolated by name but everyone has felt: that clean, almost medicinal clarity that makes a morning feel sharp-edged and manageable, the olfactory equivalent of a freshly wiped whiteboard. Eucalyptus matches it with eight drops of its own, a distinctive camphoraceous note that hits the flowers-and-eucalyptus aroma with documentary-level accuracy, no embellishment, no artistic license.\n\nBlack pepper adds six drops of warm spice, just enough body to keep the clarity from becoming clinical, just enough warmth to remind the body it is still a participant rather than merely a vehicle for the brain. Geranium rounds the blend with four drops of floral berry sweetness — the berries in the aroma, translated through rose-adjacent petals into something that softens without sedating.\n\nTame Impala plays from a small speaker on the bookshelf, their psychedelic shimmer reduced to its clear-headed skeleton, because Love and Laughter CBD is the version of the plant that removes the haze and leaves only the architecture: the scaffolding, the blueprint, the clean lines of a nervous system operating at its designed specifications.\n\nA woman opens her laptop at a desk near a window where morning light falls on a row of small succulents she waters every third day with the precision of someone who respects routine without being imprisoned by it. The five oils have already done their work. The lemongrass-eucalyptus combination turns every breath into a small reset, a micro-recalibration, and the tea tree keeps the edge sharp without making it aggressive.\n\nThe steady quality is not dramatic. There is no story here about transformation or transcendence. There is only the morning, and the window, and the work, and the five oils holding the room at exactly the temperature where productivity feels less like effort and more like the natural state of a mind that has been given permission to function cleanly.";

const VIBES = [
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: true },
  { name: "Body Melt", desc: "Non-intoxicating ease", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
];

const HEARTS = [
  { left: 8, size: 18, delay: 0, dur: 18 },
  { left: 22, size: 12, delay: 3, dur: 20 },
  { left: 38, size: 22, delay: 1.5, dur: 16 },
  { left: 54, size: 14, delay: 5, dur: 22 },
  { left: 68, size: 20, delay: 2.5, dur: 17 },
  { left: 82, size: 16, delay: 6.5, dur: 19 },
  { left: 92, size: 10, delay: 4, dur: 15 },
  { left: 14, size: 13, delay: 8, dur: 21 },
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

function HeartShape({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: "block" }}>
      <path
        d="M16 28 C 16 28, 4 20, 4 11 C 4 6, 8 3, 12 3 C 14 3, 15.5 4, 16 6 C 16.5 4, 18 3, 20 3 C 24 3, 28 6, 28 11 C 28 20, 16 28, 16 28 Z"
        fill={color}
        opacity="0.55"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.8"
      />
    </svg>
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

export default function LoveAndLaughterCbdVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes riseHeart {
          0% { transform: translateY(100vh) translateX(0) rotate(-6deg) scale(0.85); opacity: 0; }
          12% { opacity: 0.45; }
          30% { transform: translateY(70vh) translateX(14px) rotate(4deg) scale(0.95); }
          55% { transform: translateY(40vh) translateX(-10px) rotate(-4deg) scale(1); }
          80% { transform: translateY(10vh) translateX(8px) rotate(6deg) scale(1.05); opacity: 0.35; }
          100% { transform: translateY(-20vh) translateX(0) rotate(-2deg) scale(1.1); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,164,138,0.22); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Rose gold heart float particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {HEARTS.map((h, i) => (
          <div key={i} style={{
            position: "absolute", left: `${h.left}%`, bottom: -40,
            width: h.size, height: h.size,
            animation: `riseHeart ${h.dur}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
          }}>
            <HeartShape size={h.size} color={COLORS.gold} />
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent1}18 0%, ${COLORS.bg} 55%)`,
          borderBottom: `1px solid ${COLORS.border}`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent1}20 0%, transparent 70%)`,
          }} />
          <div style={{
            fontFamily: FONTS.mono, fontSize: 9, letterSpacing: 4,
            color: COLORS.accent1, textTransform: "uppercase", marginBottom: 20,
          }}>
            SOLFUL SESSIONS · VIBE CURATOR
          </div>
          <h1 style={{
            fontFamily: FONTS.display, fontSize: 48, fontWeight: 300,
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
            A Love and Laughter CBD session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + tea tree + eucalyptus → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Green apple + berry terpenes cross the blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis myrcene and terpinolene arrive at already-activated receptors" },
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
            Every plant that smells — cannabis, lemongrass, tea tree, eucalyptus, black pepper, geranium — gets its scent from
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
            The Love and Laughter CBD blend matches its exact terpene fingerprint — myrcene from lemongrass, terpinolene from
            tea tree, α-pinene from eucalyptus, caryophyllene from black pepper, and floral-berry notes from geranium — so your
            body receives the same chemical signal from three sources before the fourth (the flower) ever arrives.
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
            Every ingredient maps to Love and Laughter CBD's terpene fingerprint. Green apple delivers terpinolene.
            Eucalyptus and rosemary carry pinene and caryophyllene. Berries bring floral brightness. You're drinking
            the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.4 · Valence 0.46</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "76", mins: "5" },
                { phase: "Peak", bpm: "100", mins: "15" },
                { phase: "Coast", bpm: "88", mins: "10" },
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
            href="https://open.spotify.com/search/Bonobo%20Thievery%20Corporation%20Nujabes%20ambient%20dub%20lo-fi"
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
          <SectionLabel>The Narrative · Clear Morning</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Love and Laughter CBD lives in three categories:
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

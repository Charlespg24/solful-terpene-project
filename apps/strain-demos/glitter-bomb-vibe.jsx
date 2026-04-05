import { useState, useEffect } from "react";

const COLORS = {
  bg: "#141216",
  bgCard: "#1C1A20",
  bgPanel: "#24222A",
  text: "#F4EEDC",
  textMuted: "#B4A88C",
  textDim: "#7A705C",
  accent1: "#E8C84A",
  accent2: "#D4B03A",
  gold: "#F4D35E",
  border: "#3A3528",
};

const FONTS = {
  display: "'Space Grotesk', sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Glitter Bomb",
  farm: "Sol Spirit Farm",
  region: "Trinity",
  energy: "HIGH",
  intent: "Body at ease, mind sparkling.",
  effects: ["Physically Relaxing", "Cerebral", "Euphoric"],
  aroma: ["Kiwi", "Pine", "Musk"],
  totalTerpenes: "2.39%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 1.23, ratio: 51, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Lemongrass", note: "Heavy, sedating body relaxation — the anchor that holds the mind's sparkle still." },
  { name: "β-Caryophyllene", pct: 0.42, ratio: 18, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "β-Ocimene", pct: 0.17, ratio: 7, color: "#B088D4", oil: "Basil", food: "Basil, Mint, Parsley, Mango", note: "Bright herbal lift — the kiwi-green edge of the profile." },
  { name: "Linalool", pct: 0.15, ratio: 6, color: "#C4A8D4", oil: "Lavender", food: "Lavender, Basil, Coriander", note: "Softens edges. Calms without sedating." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 18, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Basil", drops: 4, terpene: "β-Ocimene", color: "#B088D4" },
  { name: "Lavender", drops: 4, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Pine", drops: 4, terpene: "α-Pinene", color: "#6BAE8E" },
];

const BLEND_RATIONALE = "High myrcene (1.23%) calls for lemongrass dominance (45%). Black pepper for the caryophyllene. Basil captures the ocimene. Lavender for linalool. Pine needle oil matches the pine aroma note and adds forest character.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing lemongrass + black pepper. Open space, clean surfaces, bright daylight.", icon: "☀" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Kiwi Sparkle mocktail or Sparkling Kiwi juice. Kiwi brightness through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Build momentum.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with myrcene. Body dissolves, mind sparkles.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Kiwi Serenity Tea", subtitle: "Green kiwi tea with rosemary and basil for cerebral ease",
    meta: "Teacup · 6oz · 185°F · 3 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "0.5 oz dried kiwi pieces (or fresh pulp)",
      "0.5 tsp dried rosemary",
      "5-6 leaves fresh basil (bruised)",
      "0.5 oz fresh kiwi juice",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Kiwi Sparkle Mocktail", subtitle: "Kiwi brightness with rosemary-pine clarity and euphoric lift",
    meta: "Highball · 8oz · Ice cold",
    ingredients: [
      "2 fresh kiwi (muddled)",
      "1.5 oz fresh kiwi juice",
      "0.5 oz rosemary-simple syrup",
      "0.25 oz fresh basil juice",
      "2 oz sparkling water",
    ],
    accent: "#E8C84A",
  },
  {
    name: "Kiwi Botanica Cocktail", subtitle: "Gin sharpens kiwi's tropical sparkle with pine and basil clarity",
    meta: "Coupe · 5.5oz · Gin · ~32% ABV",
    ingredients: [
      "1.5 oz London Dry gin",
      "3 fresh kiwi (muddled)",
      "1 oz fresh kiwi juice",
      "0.5 oz rosemary syrup",
      "0.25 oz fresh basil juice",
    ],
    accent: "#C4A8D4",
  },
  {
    name: "Sparkling Kiwi Juice", subtitle: "Cold-pressed kiwi with rosemary clarity and basil freshness",
    meta: "Juice glass · 8oz · Ice cold · 90 min window",
    ingredients: [
      "5 oz fresh kiwi (pressed)",
      "1 oz fresh basil (pressed)",
      "1 oz rosemary-infused coconut water",
      "1 kiwi wheel + basil leaf (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Euphoric Flash Shot", subtitle: "A bright kiwi spark with pine clarity and basil lift",
    meta: "Shot · 1.5oz · Ice cold · Consume immediately",
    ingredients: [
      "2 fresh kiwi (muddled)",
      "0.75 oz Pisco",
      "0.5 oz fresh kiwi juice",
      "0.25 oz rosemary-allspice syrup",
    ],
    accent: "#B088D4",
  },
];

const MUSIC = {
  bpm: "67–88 BPM",
  description: "A bright, uplifting, energetic session. Body at ease, mind sparkling. Ambient, dub, lo-fi hip hop, deep house, reggae — tempo builds slowly toward full momentum then settles into sustained glow.",
  artists: ["Bonobo", "Thievery Corporation", "Nujabes", "Khruangbin"],
  genres: ["ambient", "dub", "lo-fi hip hop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☀", body: "Bright (70-85%), 4200K. Open space, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, movement-friendly layout. Glass, metal, crisp cotton, light wood textures." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning through midday. Best when the day is still opening up." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "Eighteen drops of lemongrass, and Sol Spirit Farm's Trinity County creation announces what high this concentration can do when it is not trying to sedate: it can hold the body perfectly still while the mind begins to sparkle, to throw off light in unexpected directions, to discover that relaxation and euphoria are not opposites but dance partners who have been waiting all evening for someone to change the music.\n\nBlack pepper follows with ten drops of spiced warmth — the bass frequency, the gravitational field that Massive Attack would build an entire track around, the low-end anchor that keeps the sparkling from scattering into incoherence. This is physical ease with cerebral fireworks, and the pepper provides the physics that makes the fireworks visible against a dark, still sky rather than a bright, busy one.\n\nBasil adds four drops of the bright herbal molecule, the kiwi brightness that gives the strain its unexpected tropical note — not the sweetness of tropical fruit but its sharpness, its green acidic edge, the flavor of something so fresh it still remembers the vine. Lavender matches it with four drops of floral softness, a floral cushion that catches the sparkle when it falls and sends it back up gently.\n\nPine completes the blend with four drops that capture the pine aroma directly — not as interpretation but as citation, the essential oil and the flower speaking the same resinous language across botanical kingdoms. The forest character adds a vertical line through the horizontal drift of the sedating quality, a reminder that even in the deepest physical ease, something in the room is still standing tall.\n\nThe musk note is ghost chemistry. No single oil carries it, but when lemongrass and pepper and basil and lavender and pine meet in the warm output of a diffuser, something musky and primal emerges from the interaction, the olfactory equivalent of glitter catching light — each particle too small to matter alone, but together they transform a surface from plain to spectacular.\n\nA man lies in a hammock between two redwoods, his eyes open and aimed at a canopy that filters the afternoon into green coins on his shirt. Glitter Bomb is an oxymoron that the body accepts: the muscles have dissolved and the mind is celebrating, and the five oils are proof that the longest distance between two states of being is sometimes zero.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const SPARKLES = [
  { left: 8, top: 12, size: 8, delay: 0, dur: 2.4 },
  { left: 22, top: 28, size: 5, delay: 0.6, dur: 3.1 },
  { left: 35, top: 8, size: 10, delay: 1.2, dur: 2.8 },
  { left: 48, top: 42, size: 6, delay: 0.3, dur: 2.2 },
  { left: 62, top: 18, size: 9, delay: 1.8, dur: 3.4 },
  { left: 76, top: 6, size: 5, delay: 2.1, dur: 2.6 },
  { left: 88, top: 32, size: 11, delay: 0.9, dur: 3.0 },
  { left: 14, top: 58, size: 7, delay: 1.5, dur: 2.3 },
  { left: 30, top: 72, size: 9, delay: 2.4, dur: 3.2 },
  { left: 52, top: 66, size: 5, delay: 0.4, dur: 2.9 },
  { left: 68, top: 88, size: 8, delay: 1.1, dur: 2.5 },
  { left: 82, top: 54, size: 6, delay: 2.8, dur: 3.3 },
  { left: 6, top: 84, size: 10, delay: 1.7, dur: 2.7 },
  { left: 42, top: 92, size: 5, delay: 0.8, dur: 2.4 },
  { left: 94, top: 76, size: 7, delay: 2.2, dur: 3.1 },
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
    const t = setTimeout(() => setWidth(terpene.ratio * 1.6), 300 + index * 150);
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

export default function GlitterBombVibe() {
  const spotifySearchUrl = "https://open.spotify.com/search/" + encodeURIComponent("Glitter Bomb ambient dub lo-fi 67-88 BPM Bonobo Thievery Corporation Nujabes Khruangbin");
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.9; transform: scale(1.1) rotate(180deg); }
          100% { opacity: 0.1; transform: scale(0.8) rotate(360deg); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,200,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Gold sparkle particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {SPARKLES.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}>
            <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
                fill={COLORS.gold}
                opacity="0.9"
              />
            </svg>
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
            A Glitter Bomb session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Lemongrass + black pepper → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Kiwi + basil terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, lemongrass, black pepper, basil, lavender, pine — gets its scent from
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
            The Glitter Bomb blend matches its exact terpene fingerprint — myrcene from lemongrass, caryophyllene from
            black pepper, ocimene from basil, linalool from lavender, and pine oil citing the flower's own pine aroma — so
            your body receives the same chemical signal from three sources before the fourth (the flower) ever arrives.
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
            Every ingredient maps to Glitter Bomb's terpene fingerprint. Kiwi and basil deliver ocimene.
            Rosemary carries caryophyllene. Lemongrass anchors the myrcene. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.3 · Valence 0.38</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "67", mins: "5" },
                { phase: "Peak", bpm: "88", mins: "15" },
                { phase: "Coast", bpm: "77", mins: "10" },
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
          <SectionLabel>The Narrative · Forest Sparkle</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Glitter Bomb lives in three categories:
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

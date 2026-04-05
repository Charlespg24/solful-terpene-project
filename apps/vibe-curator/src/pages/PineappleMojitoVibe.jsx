import { useState, useEffect } from "react";

const COLORS = {
  bg: "#121610",
  bgCard: "#1A1E16",
  bgPanel: "#22281E",
  text: "#E8F0DC",
  textMuted: "#A0B490",
  textDim: "#687A5C",
  accent1: "#A8D44A",
  accent2: "#8ABB3A",
  gold: "#D4E65C",
  border: "#283225",
};

const FONTS = {
  display: "'Fraunces', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Pineapple Mojito",
  farm: "Higher Heights",
  region: "Mendocino",
  energy: "MEDIUM",
  intent: "Rooted ease with a quiet glow.",
  effects: ["Relaxed", "Grounded", "Euphoric"],
  aroma: ["Pineapple", "Ginger", "Mint", "Gas"],
  totalTerpenes: "2.55%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.63, ratio: 25, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "Limonene", pct: 0.56, ratio: 22, color: "#F4D35E", oil: "Sweet Orange", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption." },
  { name: "α-Bisabolol", pct: 0.24, ratio: 9, color: "#D4C49A", oil: "German Chamomile", food: "Chamomile, Candeia Tree", note: "Gentle anti-irritant. The quiet sophisticate." },
  { name: "α-Humulene", pct: 0.19, ratio: 7, color: "#A8945A", oil: "Sage", food: "Hops, Sage, Ginseng", note: "Earthy, woody appetite modulation. Hops' defining molecule." },
  { name: "Linalool", pct: 0.16, ratio: 6, color: "#C4A8D4", oil: "Lavender", food: "Lavender, Basil, Coriander", note: "Softens edges. Calms without sedating." },
  { name: "α-Pinene", pct: 0.14, ratio: 5, color: "#6BAE8E", oil: "Pine", food: "Pine Needles, Rosemary, Basil", note: "Forest clarity — bronchodilator, alertness." },
  { name: "Myrcene", pct: 0.11, ratio: 4, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme", note: "Earthy, musky body relaxation. Couch anchor." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Sweet Orange", drops: 10, terpene: "Limonene", color: "#F4D35E" },
  { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol", color: "#D4C49A" },
  { name: "Sage", drops: 4, terpene: "α-Humulene", color: "#A8945A" },
  { name: "Lavender", drops: 4, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Pine", drops: 2, terpene: "α-Pinene", color: "#6BAE8E" },
  { name: "Lemongrass", drops: 2, terpene: "Myrcene", color: "#7ec8a0" },
];

const BLEND_RATIONALE = "Caryophyllene and limonene nearly equal, so black pepper and sweet orange share the lead. German chamomile for the significant bisabolol. Sage for humulene. Lavender for linalool. Pine and lemongrass in supporting roles for the pinene and myrcene. Seven-oil blend reflecting the strain's unusually broad terpene diversity.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing black pepper + sweet orange. Flexible seating, ambient lighting, conversation-friendly arrangement.", icon: "◐" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Pineapple Mojito mocktail or fresh juice. Tropical delivery through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Balance Breath — 4-4-4-4 box pattern. 6 cycles. Equilibrium before consumption.", icon: "◻" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene and limonene. The quiet glow arrives.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Pineapple Mojito Tea", subtitle: "Tropical pineapple-mint herbal blend",
    meta: "Teacup · 8oz · 165°F · 4-5 min · No caffeine",
    ingredients: [
      "8 oz filtered water",
      "1 tbsp dried pineapple pieces",
      "8-10 dried mint leaves",
      "0.5 tbsp dried lime peel",
      "1 tsp dried ginger slices",
      "4-5 dried chamomile flowers",
      "0.25 oz chamomile-infused syrup or honey",
      "fresh mint sprig + thin pineapple slice (garnish)",
    ],
    accent: "#D4C49A",
  },
  {
    name: "Pineapple Mojito Mocktail", subtitle: "Fresh pineapple mojito with grounded ease",
    meta: "Highball · 7oz · Chilled",
    ingredients: [
      "8-10 fresh mint leaves (muddled)",
      "0.5 oz fresh lime juice",
      "0.5 oz fresh lemon juice",
      "2.5 oz fresh pineapple juice",
      "0.75 oz ginger juice",
      "0.25 oz chamomile-infused syrup",
      "crushed ice + 2 oz sparkling water",
      "pineapple wedge, mint sprig, lime wheel (garnish)",
    ],
    accent: "#A8D44A",
  },
  {
    name: "Pineapple Mojito Cocktail", subtitle: "Tropical classic with white rum and fresh mint",
    meta: "Highball · 7.5oz · White rum · 14% ABV",
    ingredients: [
      "1.5 oz white rum",
      "8-10 fresh mint leaves (muddled)",
      "0.5 oz fresh lime juice + 0.5 oz lemon juice",
      "2 oz fresh pineapple juice",
      "0.75 oz ginger juice",
      "0.25 oz chamomile-infused syrup",
      "crushed ice + 1.5 oz sparkling water",
      "pineapple wedge, mint sprig, lime wheel (garnish)",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Pineapple Mojito Juice", subtitle: "Fresh pineapple and mint with ginger brightness",
    meta: "Highball · 8oz · Chilled · Serve immediately",
    ingredients: [
      "1 fresh ripe pineapple (cold-pressed)",
      "2 fresh limes + 1 fresh lemon (juiced)",
      "1 oz fresh ginger root (pressed)",
      "10-12 fresh mint leaves + 1 oz mineral water",
      "0.25 oz chamomile-infused syrup",
      "1 oz sparkling water + crushed ice",
      "pineapple wedge, mint sprig, lime wheel (garnish)",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Pineapple Mojito Shot", subtitle: "One-sip tropical mojito energy",
    meta: "Shot glass · 2oz · Frozen · Consume immediately",
    ingredients: [
      "3-4 fresh mint leaves (muddled gently)",
      "0.75 oz white rum",
      "0.75 oz fresh pineapple juice",
      "0.25 oz fresh lime juice",
      "0.1 oz ginger juice",
      "fresh mint leaf (garnish, on top)",
    ],
    accent: "#C4A8D4",
  },
];

const MUSIC = {
  bpm: "79–104 BPM",
  description: "A balanced, social, warm session. Rooted ease with a quiet glow. Deep house, reggae, jazz, funk, soul — the music settles into that particular Mendocino groove, comfortable and unhurried.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
  genres: ["deep house", "reggae", "jazz", "funk", "soul"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "◐", body: "Moderate (45-60%), 3200K warm. Flexible seating with a mix of ambient and task lighting." },
  { label: "Setting", icon: "◇", body: "Conversation-friendly arrangement. Leather, canvas, ceramic, mixed wood textures. Room at 70°F." },
  { label: "Breathwork", icon: "◻", body: "Balance Breath — 4-4-4-4 box pattern (inhale 4, hold 4, exhale 4, hold 4). 6 cycles. Parasympathetic equilibrium." },
  { label: "Timing", icon: "◷", body: "Afternoon into evening. Best when the day is settling but still open for conversation." },
];

const BREATH_GUIDANCE = "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner.";

const NARRATIVE = "Black pepper opens with twelve drops of spiced warmth, and the room settles into that particular Mendocino groove that Higher Heights cultivates with the patience of someone who knows the difference between good and ready, between finished and complete. Sweet orange follows with ten drops, and the pineapple note appears not as tropical sweetness but as citrus intelligence — the smell of fruit that has read every book in the library and prefers the garden.\n\nGerman chamomile adds six drops of the soft calming molecule, the most underrated molecule in the collection, a skin-deep softness that Nils Frahm would recognize as the space between piano notes where the music actually lives. Sage provides four drops of herbal earthiness grounding, the herbal anchor that keeps the blend from drifting into mere pleasantness, and lavender matches it with four drops of floral softness that catch the mint-gas aroma and translate it into floral calm.\n\nThis is the seven-oil blend — the most complex recipe in the entire collection. Pine at two drops, lemongrass at two drops — supporting voices that deliver their lines with precision and step aside for the ensemble. The diversity is the point: Pineapple Mojito carries seven significant terpenes, and the blend mirrors that complexity with seven carefully proportioned oils that somehow produce simplicity rather than confusion.\n\nThe ginger note emerges from the interaction between pepper and chamomile, a warmth that no single oil possesses but their conversation creates — molecular hospitality, the fragrance equivalent of a room where strangers become friends before the first drink is finished. Somewhere Tycho is playing through a small speaker in the corner, and the rooted ease that defines this strain is exactly the sound of synthesizers layered so precisely they become landscape rather than music.\n\nA man sits at a kitchen table with a half-finished crossword and a quiet glow behind his eyes that his wife noticed twenty minutes ago but has chosen not to mention because mentioning it would be like pointing at a sunset — accurate but unnecessary. The blend is not dramatic. It is not trying to change the world or even the evening. It is trying to make the ordinary luminous, and the seven oils are doing their patient alchemical work, and the gas note in the air has softened into something closer to warmth, and the evening is just beginning to suggest that being grounded and being euphoric might be the same thing wearing different clothes.";

const VIBES = [
  { name: "Grounded Calm", desc: "Rooted ease, steady presence", active: true },
  { name: "Social & Warm", desc: "Conversation, shared laughter", active: true },
  { name: "Cozy Euphoria", desc: "Quiet glow, gentle lift", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const BUBBLES = [
  { left: 8, size: 20, delay: 0, dur: 16 },
  { left: 22, size: 14, delay: 3, dur: 19 },
  { left: 38, size: 26, delay: 1, dur: 15 },
  { left: 52, size: 18, delay: 5, dur: 20 },
  { left: 68, size: 22, delay: 2, dur: 17 },
  { left: 82, size: 16, delay: 6, dur: 18 },
  { left: 15, size: 12, delay: 7, dur: 21 },
  { left: 60, size: 24, delay: 8, dur: 16 },
  { left: 30, size: 10, delay: 4, dur: 22 },
  { left: 90, size: 28, delay: 9, dur: 15 },
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

export default function PineappleMojitoVibe() {
  const spotifySearch = "https://open.spotify.com/search/" + encodeURIComponent("Khruangbin Bob Marley Kamasi Washington deep house reggae jazz");
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes riseBubble {
          0% { transform: translateY(100vh) translateX(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.28; }
          50% { transform: translateY(20vh) translateX(12px) scale(1); }
          85% { opacity: 0.28; }
          100% { transform: translateY(-120vh) translateX(-8px) scale(1.1); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(168,212,74,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Mint bubble particles */}
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
            A Pineapple Mojito session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + sweet orange → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Pineapple, ginger, and mint terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, black pepper, sweet orange, chamomile, sage, lavender — gets its scent from
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
            The Pineapple Mojito blend matches its exact terpene fingerprint — caryophyllene from black pepper, limonene from
            sweet orange, bisabolol from chamomile, humulene from sage, linalool from lavender, pinene from pine, myrcene from
            lemongrass — so your body receives the same chemical signal from three sources before the fourth (the flower) ever arrives.
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
              <div style={{ fontSize: 18, fontFamily: FONTS.display, fontWeight: 300 }}>{STRAIN.dominantTerpene}</div>
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
            Every ingredient maps to Pineapple Mojito's terpene fingerprint. Pineapple and sweet orange deliver limonene.
            Mint and black pepper carry caryophyllene. Ginger and chamomile provide warm grounding. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.47 · Valence 0.56</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Open", bpm: "79", mins: "8" },
                { phase: "Groove", bpm: "91", mins: "12" },
                { phase: "Reflect", bpm: "84", mins: "10" },
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
            href={spotifySearch}
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
          <SectionLabel>The Narrative · Quiet Glow</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Pineapple Mojito lives in three categories:
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

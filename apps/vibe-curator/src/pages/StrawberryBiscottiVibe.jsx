import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A1412",
  bgCard: "#241C1A",
  bgPanel: "#2E2522",
  text: "#F0E4D8",
  textMuted: "#B09888",
  textDim: "#786054",
  accent1: "#D4647A",
  accent2: "#B84C60",
  gold: "#E8A890",
  border: "#3A2C28",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Strawberry Biscotti",
  farm: "Happy Day Farms",
  region: "Mendocino",
  energy: "MEDIUM",
  intent: "Cozy anchor with a curious mind.",
  effects: ["Comforting", "Mentally Engaging", "Appetite Inducing"],
  aroma: ["Kettle Corn", "Fuel", "Sour Strawberry Candy"],
  totalTerpenes: "1.48%",
  dominantTerpene: "Limonene",
};

const TERPENES = [
  { name: "Limonene", pct: 0.38, ratio: 26, color: "#F4D35E", oil: "Bergamot", food: "Citrus Peels, Juniper, Dill", note: "Mood elevation and stress relief. Rapid absorption." },
  { name: "β-Caryophyllene", pct: 0.29, ratio: 20, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth with no psychoactivity." },
  { name: "Myrcene", pct: 0.25, ratio: 17, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Thyme, Lemongrass", note: "The couch-lock terpene. Sedating at higher doses." },
  { name: "α-Bisabolol", pct: 0.13, ratio: 9, color: "#D4C49A", oil: "German Chamomile", food: "Chamomile, Candeia Tree", note: "Gentle anti-irritant. The quiet sophisticate." },
];

const EO_BLEND = [
  { name: "Bergamot", drops: 14, terpene: "Limonene", color: "#F4D35E" },
  { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lemongrass", drops: 8, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol", color: "#D4C49A" },
  { name: "Clove", drops: 2, terpene: "β-Caryophyllene", color: "#B88A5A" },
];

const BLEND_RATIONALE = "Balanced profile with comfort as the effect. Bergamot brings sophisticated citrus that pairs with the sour strawberry candy note. Black pepper for caryophyllene. Lemongrass for myrcene. German chamomile for bisabolol. A touch of clove adds warmth.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing bergamot + black pepper. Flexible seating, warm light, conversation-friendly arrangement.", icon: "☁" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Kettle Corn Serenity tea or Berry Meditation juice. Warm strawberry through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Balance Breath — 4-4-4-4 box pattern. 6 cycles. Equilibrium, each corner anchored by scent.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with limonene and caryophyllene. The cozy arrives like an old friend.", icon: "🌿" },
];

const BEVERAGES = [
  {
    name: "Kettle Corn Serenity Tea", subtitle: "Chamberlain tea with strawberry warmth and cinnamon depth",
    meta: "Teacup · 6oz · 190°F · 4 min · No caffeine",
    ingredients: [
      "6 oz filtered water",
      "1 tbsp dried strawberry pieces",
      "1 stick cinnamon (broken)",
      "0.5 tsp vanilla extract",
      "0.75 tsp raw honey",
    ],
    accent: "#F4D35E",
  },
  {
    name: "Curious Cozy Mocktail", subtitle: "Muddled strawberry meets bergamot tea and vanilla warmth",
    meta: "Rocks · 5oz · Chilled",
    ingredients: [
      "4-5 fresh strawberries (muddled)",
      "1 oz bergamot tea (cooled)",
      "0.75 oz vanilla syrup",
      "1 cinnamon stick (garnish)",
    ],
    accent: "#D4647A",
  },
  {
    name: "Biscotti Bliss Cocktail", subtitle: "Bourbon and strawberry with subtle clove warmth",
    meta: "Coupe · 5.5oz · Bourbon · ~34% ABV",
    ingredients: [
      "5 fresh strawberries (muddled)",
      "1.5 oz bourbon (100 proof)",
      "0.5 oz clove-cinnamon syrup",
      "0.25 oz dry vermouth",
      "1 strawberry + cinnamon-dusted rim",
    ],
    accent: "#E8A87C",
  },
  {
    name: "Berry Meditation Juice", subtitle: "Cold-pressed strawberry with earthy cinnamon kiss",
    meta: "Juice glass · 8oz · Ice cold · 60 min window",
    ingredients: [
      "5 oz fresh strawberry (pressed)",
      "2 oz oat milk",
      "1-2 drops vanilla extract",
      "0.25 oz cinnamon-honey syrup",
      "1 strawberry wheel + cinnamon dust",
    ],
    accent: "#E8A890",
  },
  {
    name: "Sweet Curiosity Shot", subtitle: "A bourbon-forward punch of strawberry and cinnamon",
    meta: "Shot · 1.5oz · Room temp · Consume immediately",
    ingredients: [
      "3 fresh strawberries (muddled)",
      "1 oz bourbon",
      "0.25 oz cinnamon-honey syrup",
      "pinch cinnamon + strawberry slice",
    ],
    accent: "#D4C49A",
  },
];

const MUSIC = {
  bpm: "78–103 BPM",
  description: "A balanced, social, warm session. Cozy anchor with a curious mind. Funk, soul, pop, deep house, reggae — the music settles into the room and holds the space at a comfortable middle gear.",
  artists: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
  genres: ["funk", "soul", "pop", "deep house", "reggae"],
};

const SPOTIFY_SEARCH = "https://open.spotify.com/search/funk%20soul%20cozy%20anderson%20paak%20khruangbin";

const ENVIRONMENT = [
  { label: "Lighting", icon: "☁", body: "Moderate (45-60%), 3200K. Mix of ambient and task lighting. Warm, conversation-friendly glow." },
  { label: "Setting", icon: "◇", body: "Flexible seating, conversation-friendly arrangement. Leather, canvas, ceramic, mixed wood textures. 70°F." },
  { label: "Breathwork", icon: "◠", body: "Balance Breath — 4-4-4-4 box pattern. 6 cycles. Balanced autonomic tone. Begin 10 min into diffuser." },
  { label: "Timing", icon: "◷", body: "Afternoon through evening. Best when the day wants to slow down without going silent." },
];

const BREATH_GUIDANCE = "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner.";

const NARRATIVE = "Bergamot leads with fourteen drops and suddenly the room smells like a bakery that moonlights as a library — warm, complex, the scent of pages and pastry sharing an afternoon. This is Happy Day Farms' most comforting Mendocino creation, and the sophisticated citrus of bergamot — not bright like lemon, not sweet like orange, but something closer to the first sip of Earl Grey in a warm cup on a cold morning — catches the sour strawberry candy note and holds it gently, the way you hold a conversation you don't want to end.\n\nBlack pepper adds ten drops of spiced warmth, the steady heat of a wood-fired oven still cooling at the end of the day, still radiating into the room long after the bread has been pulled and set on the counter to rest. Lemongrass brings eight drops of grassy warmth, and the kettle corn aroma suddenly makes sense: it is the grassy sweetness meeting the warm spice, creating that buttery caramel quality that no single oil can produce alone, only the collaboration between oils, only the willingness to let molecules finish each other's sentences.\n\nGerman chamomile at six drops provides the soft calming molecule, a cushioning effect that Chet Baker achieved with silence — the pauses between trumpet notes that make the notes matter more, the space that turns playing into music and scent into atmosphere. Clove closes the blend with two drops of concentrated warmth, a direct echo of the cinnamon quality that Strawberry Biscotti's aroma implies but the oils deliver through clove's deeper, more resonant register.\n\nA woman opens a cookbook, then closes it. The appetite is not for recipes but for the feeling of being fed, the curious satisfaction that comes from a warm kitchen and a wandering mind and the absolute absence of urgency. The blend asked one question and the cozy anchor answered: you do not need to go anywhere to arrive somewhere interesting. The bergamot and the clove both agree, and the kettle corn sweetness in the air is the period at the end of the sentence, and the sentence says stay.";

const VIBES = [
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: true },
  { name: "Social & Warm", desc: "Cozy gathering, easy conversation", active: true },
  { name: "Body Melt", desc: "Soft physical ease, no rush", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const DUST = [
  { left: 8, size: 3, delay: 0, dur: 24, sway: 18 },
  { left: 17, size: 2, delay: 3, dur: 28, sway: 12 },
  { left: 26, size: 4, delay: 1, dur: 22, sway: 22 },
  { left: 34, size: 2, delay: 5, dur: 30, sway: 14 },
  { left: 43, size: 3, delay: 2, dur: 26, sway: 20 },
  { left: 52, size: 2, delay: 7, dur: 27, sway: 16 },
  { left: 61, size: 4, delay: 4, dur: 23, sway: 18 },
  { left: 70, size: 3, delay: 6, dur: 29, sway: 13 },
  { left: 79, size: 2, delay: 2, dur: 25, sway: 21 },
  { left: 86, size: 3, delay: 8, dur: 28, sway: 15 },
  { left: 92, size: 2, delay: 4, dur: 24, sway: 19 },
  { left: 12, size: 2, delay: 9, dur: 26, sway: 17 },
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

export default function StrawberryBiscottiVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes sugarFall {
          0% { transform: translateY(-10vh) translateX(0px); opacity: 0; }
          10% { opacity: 0.45; }
          50% { transform: translateY(55vh) translateX(var(--sway)); opacity: 0.4; }
          90% { opacity: 0.3; }
          100% { transform: translateY(120vh) translateX(0px); opacity: 0; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,100,122,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Sugar dust particles */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {DUST.map((d, i) => (
          <div key={i} style={{
            position: "absolute", left: `${d.left}%`, top: -20,
            width: d.size, height: d.size, borderRadius: "50%",
            background: i % 2 === 0 ? `${COLORS.gold}` : `${COLORS.text}`,
            opacity: 0.3,
            animation: `sugarFall ${d.dur}s linear infinite`,
            animationDelay: `${d.delay}s`,
            ["--sway"]: `${d.sway}px`,
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
            fontFamily: FONTS.display, fontSize: 48, fontWeight: 400,
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
            A Strawberry Biscotti session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or tea,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Bergamot + black pepper → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Juice", path: "Gut → Bloodstream → Brain", desc: "Strawberry + cinnamon + bergamot cross the blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis limonene + caryophyllene arrive at already-activated receptors" },
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
            Every plant that smells — cannabis, bergamot, black pepper, lemongrass, chamomile — gets its scent from
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
            The Strawberry Biscotti blend matches its exact terpene fingerprint — limonene from bergamot, caryophyllene from
            black pepper and clove, myrcene from lemongrass, bisabolol from chamomile — so your body receives the same
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
            Every ingredient maps to Strawberry Biscotti's terpene fingerprint. Bergamot and strawberry deliver limonene.
            Cinnamon and clove carry caryophyllene. Lemongrass and oat milk provide myrcene. Chamomile brings bisabolol.
            You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.46 · Valence 0.56</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Open", bpm: "78", mins: "8" },
                { phase: "Groove", bpm: "90", mins: "12" },
                { phase: "Reflect", bpm: "83", mins: "10" },
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
            href={SPOTIFY_SEARCH}
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
          <SectionLabel>The Narrative · Warm Curiosity</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Strawberry Biscotti lives in three categories:
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

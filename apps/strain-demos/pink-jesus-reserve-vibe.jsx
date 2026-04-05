import { useState, useEffect } from "react";

const COLORS = {
  bg: "#1A1014",
  bgCard: "#24181C",
  bgPanel: "#2E2024",
  text: "#F4E4EC",
  textMuted: "#B098A0",
  textDim: "#785C68",
  accent1: "#D47A9A",
  accent2: "#B45A78",
  gold: "#E89CB4",
  border: "#3A2028",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Menlo', monospace",
};

const STRAIN = {
  name: "Pink Jesus Reserve",
  farm: "Sonoma Hills Farm",
  region: "Sonoma",
  energy: "HIGH",
  intent: "Buoyant and warm, ready to share.",
  effects: ["Social", "Uplifting", "Euphoric"],
  aroma: ["Raspberry", "French Lavender", "Pineapple"],
  totalTerpenes: "1.89%",
  dominantTerpene: "β-Caryophyllene",
};

const TERPENES = [
  { name: "β-Caryophyllene", pct: 0.78, ratio: 41, color: "#E8A87C", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — spicy warmth with no psychoactivity. The architectural anchor." },
  { name: "Myrcene", pct: 0.38, ratio: 20, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Hops, Bay Laurel", note: "Body-weighting euphoria. Delivers joy as a physical location." },
  { name: "Humulene", pct: 0.27, ratio: 14, color: "#A8945A", oil: "Sage", food: "Sage, Hops, Ginseng", note: "Earthy backbone. Keeps buoyancy from becoming frivolous." },
  { name: "α-Bisabolol", pct: 0.15, ratio: 8, color: "#D4C49A", oil: "German Chamomile", food: "Chamomile, Candeia Tree", note: "Gentle anti-irritant. The quiet sophisticate." },
];

const EO_BLEND = [
  { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene", color: "#E8A87C" },
  { name: "Lemongrass", drops: 8, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Lavender", drops: 6, terpene: "Linalool", color: "#C4A8D4" },
  { name: "Sage", drops: 6, terpene: "Humulene", color: "#A8945A" },
  { name: "German Chamomile", drops: 4, terpene: "α-Bisabolol", color: "#D4C49A" },
  { name: "Geranium", drops: 2, terpene: "Geraniol", color: "#D47A9A" },
];

const BLEND_RATIONALE = "Black pepper anchors the high caryophyllene content. Lemongrass delivers myrcene for euphoria. Lavender captures the French lavender aroma note. Sage for humulene depth. German chamomile for bisabolol. A whisper of geranium adds the fruity, floral top notes.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing black pepper + lemongrass. Open space, clean surfaces, bright light, 72°F.", icon: "✧" },
  { time: "T – 15 min", label: "Sip", desc: "Pour the Lavender Euphoria mocktail or Floral Euphoria juice. Raspberry-lavender through the gut.", icon: "✦" },
  { time: "T – 5 min", label: "Breathe", desc: "Ignition Breath — 4-2-4 pattern. 10 cycles. Sympathetic activation.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors pre-loaded with caryophyllene. The warmth arrives like church light.", icon: "✧" },
];

const BEVERAGES = [
  {
    name: "Lavender Dream Tea", subtitle: "Floral lavender with berry warmth for uplifting serenity",
    meta: "Teacup · 6oz · 190°F · 4 min · Herbal (0mg caffeine)",
    ingredients: [
      "6 oz filtered water",
      "1 tbsp dried lavender buds",
      "0.5 oz dried raspberry leaf",
      "0.5 oz fresh pineapple juice",
      "0.75 tsp raw honey",
    ],
    accent: "#D47A9A",
  },
  {
    name: "Lavender Euphoria Mocktail", subtitle: "Raspberry and lavender in perfect harmony with pineapple brightness",
    meta: "Coupe · 5.5oz · Ice cold",
    ingredients: [
      "1.5 oz fresh raspberry puree",
      "1 oz fresh pineapple juice",
      "0.5 oz culinary lavender syrup",
      "1 candied pineapple ring (garnish)",
    ],
    accent: "#E89CB4",
  },
  {
    name: "Lavender Lift Cocktail", subtitle: "Gin's botanicals blend with raspberry and lavender into pure euphoria",
    meta: "Coupe · 5.5oz · Gin · ~32% ABV · 40°F",
    ingredients: [
      "1.5 oz London Dry gin",
      "1.25 oz fresh raspberry puree",
      "0.5 oz fresh pineapple juice",
      "0.5 oz culinary lavender syrup",
      "1 candied pineapple + lavender",
    ],
    accent: "#B45A78",
  },
  {
    name: "Floral Euphoria Juice", subtitle: "Pressed raspberry and pineapple with delicate lavender notes",
    meta: "Juice glass · 8oz · Ice cold · 60 min window",
    ingredients: [
      "4 oz fresh raspberry (pressed)",
      "2 oz fresh pineapple (pressed)",
      "0.5 oz culinary lavender water",
      "1 raspberry + pineapple + lavender",
    ],
    accent: "#D47A9A",
  },
  {
    name: "Social Spark Shot", subtitle: "Raspberry and lavender with pineapple brightness in one buoyant moment",
    meta: "Shot · 1.5oz · Ice cold · Consume immediately",
    ingredients: [
      "1 oz gin",
      "0.4 oz fresh raspberry puree",
      "0.2 oz fresh pineapple juice",
      "0.1 oz culinary lavender syrup",
    ],
    accent: "#E89CB4",
  },
];

const MUSIC = {
  bpm: "72–95 BPM",
  description: "A bright, uplifting, energetic session. Buoyant and warm, ready to share. Deep house, reggae, jazz, ambient, dub — the music meets where you are and builds toward the golden altitude where everyone is saying what they mean.",
  artists: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Bonobo"],
  genres: ["deep house", "reggae", "jazz", "ambient", "dub"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "✧", body: "Bright (70-85%), 4200K. Open space, clean surfaces, natural daylight or bright accent lighting." },
  { label: "Setting", icon: "◇", body: "Open space, clean surfaces, movement-friendly layout. Glass, metal, crisp cotton, light wood textures. 72°F." },
  { label: "Breathwork", icon: "◠", body: "Ignition Breath — 4-2-4 pattern (inhale 4, hold 2, exhale 4). 10 cycles. Sympathetic activation." },
  { label: "Timing", icon: "◷", body: "Morning through midday. Best when the day is still opening up." },
];

const BREATH_GUIDANCE = "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round.";

const NARRATIVE = "Black pepper at fourteen drops, and the room fills with spiced warmth so generous it feels architectural — as if someone built a fireplace out of spice and lit it for the sole purpose of giving the evening a center to orbit. Sonoma Hills Farm grew this strain on ridges where the Pacific sends salt air through the Petaluma Gap, and the pepper carries that same open quality: warm without walls.\n\nLemongrass follows with eight drops, carrying the sedating quality that gives the euphoria its body, its weight, the physical sensation that joy is not just an idea but a location somewhere between the chest and the throat. Lavender at six drops captures the French lavender aroma directly — not the medicinal lavender of pharmacy shelves but the living plant in its natural habitat, purple and warm and slightly wild, blooming against a stone wall that has been warm all day.\n\nSage adds six drops of herbal earthiness depth, the earthy backbone that keeps the buoyancy from becoming frivolous, that insists uplift and substance can share a glass. German chamomile contributes four drops of the soft calming molecule, smoothing every transition between emotions the way Anderson .Paak smooths every transition between beats — with practiced ease that looks effortless but contains years of listening.\n\nGeranium closes with two drops, and the raspberry note appears like a surprise guest who turns out to be exactly the person the evening needed to become complete. The pineapple quality in the aroma finds itself in the bright edge where lemongrass meets lavender, a tropical-floral crossing that defies geography and rewards the nose for paying attention.\n\nThe living room is warm and the conversation has reached that golden altitude where everyone is saying what they mean and meaning is arriving with unusual clarity. Pink Jesus Reserve is not subtle about its mission. The six oils are the invitation, and the raspberry-lavender sweetness in the air is the sound of a room where nobody is pretending to be anyone other than who they actually are, and the warmth is not coming from the fireplace alone, and the evening is proving that sharing a space with the right people and the right scent can feel, genuinely and without exaggeration, like a kind of church.";

const VIBES = [
  { name: "Euphoric Lift", desc: "Bright lift, electric joy", active: true },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: true },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Calm Focus", desc: "Clear productivity, no fog", active: false },
];

const HALOS = [
  { left: "20%", top: "15%", size: 520, delay: 0, dur: 8, opacity: 0.28 },
  { left: "70%", top: "45%", size: 640, delay: 2.5, dur: 10, opacity: 0.22 },
  { left: "35%", top: "80%", size: 460, delay: 5, dur: 7, opacity: 0.25 },
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
    const t = setTimeout(() => setWidth(terpene.ratio * 2.2), 300 + index * 150);
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

export default function PinkJesusReserveVibe() {
  return (
    <div style={{
      fontFamily: FONTS.body, background: COLORS.bg, color: COLORS.text,
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes haloPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,122,154,0.2); border-radius: 2px; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />

      {/* Radiant halo glow — sacred pink auras */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="halo1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E89CB4" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#D47A9A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D47A9A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="halo2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4C4D4" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#E89CB4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#E89CB4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="halo3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D47A9A" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#B45A78" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#B45A78" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        {HALOS.map((h, i) => (
          <div key={i} style={{
            position: "absolute", left: h.left, top: h.top,
            width: h.size, height: h.size, borderRadius: "50%",
            background: `url(#halo${i + 1})`,
            backgroundImage: i === 0
              ? "radial-gradient(circle, rgba(232,156,180,0.45) 0%, rgba(212,122,154,0.2) 40%, rgba(212,122,154,0) 100%)"
              : i === 1
              ? "radial-gradient(circle, rgba(244,196,212,0.35) 0%, rgba(232,156,180,0.15) 45%, rgba(232,156,180,0) 100%)"
              : "radial-gradient(circle, rgba(212,122,154,0.4) 0%, rgba(180,90,120,0.18) 40%, rgba(180,90,120,0) 100%)",
            animation: `haloPulse ${h.dur}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            filter: "blur(8px)",
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520, margin: "0 auto", paddingBottom: 80 }}>
        {/* HERO */}
        <div style={{
          padding: "56px 28px 40px",
          background: `linear-gradient(175deg, ${COLORS.accent1}20 0%, ${COLORS.bg} 55%)`,
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
            fontFamily: FONTS.display, fontSize: 48, fontWeight: 400,
            lineHeight: 1.05, margin: "0 0 8px", letterSpacing: -0.5,
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
            A Pink Jesus Reserve session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through the juice or mocktail,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Black pepper + lemongrass → nose → emotional brain in under 2 seconds" },
              { channel: "Juice / Mocktail", path: "Gut → Bloodstream → Brain", desc: "Raspberry + pineapple + lavender terpenes cross the blood-brain barrier" },
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
            Every plant that smells — cannabis, black pepper, lemongrass, lavender, sage, chamomile — gets its scent from
            the same family of molecules: <strong style={{ color: COLORS.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${COLORS.gold}10`,
            border: `1px solid ${COLORS.gold}25`, borderRadius: 10, marginBottom: 20,
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
            The Pink Jesus Reserve blend matches its exact terpene fingerprint — caryophyllene from black pepper,
            myrcene from lemongrass, humulene from sage, bisabolol from chamomile — so your body receives the same
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
                  <div style={{ width: 120, flexShrink: 0 }}>
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
            Every ingredient maps to Pink Jesus Reserve's terpene fingerprint. Black pepper and raspberry deliver caryophyllene.
            Lemongrass and pineapple carry myrcene. Lavender provides linalool warmth. You're drinking the strain before you smoke it.
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>Energy 0.38 · Valence 0.43</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { phase: "Ignite", bpm: "72", mins: "5" },
                { phase: "Peak", bpm: "95", mins: "15" },
                { phase: "Coast", bpm: "83", mins: "10" },
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
            href={`https://open.spotify.com/search/${encodeURIComponent("Khruangbin Bob Marley Kamasi Washington Bonobo deep house reggae jazz")}`}
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
            background: `${COLORS.gold}10`, border: `1px solid ${COLORS.gold}25`, borderRadius: 10,
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
          <SectionLabel>The Narrative · Raspberry Cathedral</SectionLabel>
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
            The idea isn't "get high." It's "choose what you want the session to do." Pink Jesus Reserve lives in two categories:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {VIBES.map(v => (
              <div key={v.name} style={{
                padding: "12px 14px", borderRadius: 10,
                background: v.active ? `${COLORS.accent1}14` : COLORS.bgPanel,
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

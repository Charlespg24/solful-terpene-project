import { useState, useEffect } from "react";

const THEME = {
  bg: "linear-gradient(180deg, #0c0e1a 0%, #111827 30%, #0f1623 70%, #0a0c14 100%)",
  bgCard: "rgba(254,243,199,0.03)",
  bgPanel: "rgba(254,243,199,0.06)",
  text: "#fef3c7",
  textMuted: "rgba(254,243,199,0.6)",
  textDim: "rgba(254,243,199,0.35)",
  accent1: "#fef3c7",
  accent2: "#fde68a",
  gold: "#d4a574",
  border: "rgba(254,243,199,0.08)",
  displayFont: "'DM Serif Display', Georgia, serif",
  bodyFont: "'Cormorant Garamond', Georgia, serif",
  monoFont: "'IBM Plex Mono', 'Menlo', monospace",
  titleGradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #d4a574 100%)",
};

const STRAIN = {
  name: "Moonlight",
  farm: "Moon Gazer Farms",
  region: "Mendocino",
  energy: "LOW",
  intent: "Soft gratitude in a settled body.",
  effects: ["Physically Relaxed", "Calm", "Grateful"],
  aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
  totalTerpenes: "2.67%",
  dominantTerpene: "Myrcene",
};

const TERPENES = [
  { name: "Myrcene", pct: 0.74, ratio: 40, color: "#7ec8a0", oil: "Lemongrass", food: "Mango, Lemongrass, Hops, Bay Laurel", note: "Sedation, muscle relaxation, GABA-A potentiation." },
  { name: "β-Caryophyllene", pct: 0.51, ratio: 27, color: "#c4956a", oil: "Black Pepper", food: "Black Pepper, Cloves, Cinnamon", note: "CB2 agonist — anti-inflammatory warmth." },
  { name: "Terpinolene", pct: 0.38, ratio: 20, color: "#8fa8c8", oil: "Tea Tree", food: "Green Apples, Nutmeg, Tea Tree", note: "Gentle cerebral uplift, antioxidant." },
  { name: "α-Bisabolol", pct: 0.24, ratio: 13, color: "#d4a0c0", oil: "German Chamomile", food: "Chamomile, Candeia Tree", note: "Anti-irritant, skin-soothing calm." },
];

const EO_BLEND = [
  { name: "Lemongrass", drops: 12, terpene: "Myrcene", color: "#7ec8a0" },
  { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene", color: "#c4956a" },
  { name: "Tea Tree", drops: 8, terpene: "Terpinolene", color: "#8fa8c8" },
  { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol", color: "#d4a0c0" },
  { name: "Bergamot", drops: 4, terpene: "Limonene", color: "#e8d8a0" },
];

const BLEND_RATIONALE = "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. German chamomile for bisabolol. Bergamot is the key ingredient in Earl Grey tea — a direct aroma hit that also delivers citrus zest.";

const PROTOCOL_STEPS = [
  { time: "T – 30 min", label: "Diffuse", desc: "Start diffusing the Moonlight blend. Let watermelon-bergamot warmth fill the space.", icon: "☽" },
  { time: "T – 15 min", label: "Sip", desc: "Brew the Moonlight Tea or pour the mocktail. Terpenes begin arriving through your gut.", icon: "◇" },
  { time: "T – 5 min", label: "Breathe", desc: "4-4-8 breathing. 8 cycles. Let gravity pull you deeper with each exhale.", icon: "◠" },
  { time: "T – 0", label: "Consume", desc: "Receptors are already primed. The terpene stack amplifies into soft gratitude.", icon: "✦" },
];

const BEVERAGES = [
  {
    name: "Moonlight Tea", subtitle: "Soft bergamot and watermelon comfort brew",
    meta: "Teacup · 8oz · 190°F · 3-4 min staged · Moderate caffeine",
    ingredients: [
      "1 Earl Grey tea bag + 1 green tea bag",
      "0.5 oz fresh watermelon juice",
      "4-5 dried chamomile flowers",
      "tiny pinch ground cinnamon",
      "0.25 oz honey or agave",
      "thin apple slice (garnish)",
    ],
    accent: "#8fa8c8",
  },
  {
    name: "Moonlight Mocktail", subtitle: "Nighttime watermelon comfort",
    meta: "Rocks · 6oz · Chilled",
    ingredients: [
      "3 oz fresh watermelon juice",
      "0.5 oz fresh lemon juice",
      "1 oz chilled brewed Earl Grey tea",
      "0.5 oz chamomile-green apple syrup",
      "tiny pinch ground cinnamon",
      "watermelon wedge + apple slice garnish",
    ],
    accent: "#7ec8a0",
  },
  {
    name: "Moonlight Cocktail", subtitle: "Cognac-infused watermelon and Earl Grey ease",
    meta: "Rocks · 6.5oz · Cognac · 15% ABV",
    ingredients: [
      "1.5 oz cognac",
      "2.5 oz fresh watermelon juice",
      "0.5 oz fresh lemon juice",
      "1 oz chilled brewed Earl Grey tea",
      "0.5 oz chamomile-green apple syrup",
      "tiny pinch ground cinnamon",
    ],
    accent: "#c4956a",
  },
  {
    name: "Moonlight Juice", subtitle: "Watermelon and Earl Grey with apple lightness",
    meta: "Highball · 8oz · Chilled",
    ingredients: [
      "2 cups fresh watermelon chunks (pressed)",
      "1 Earl Grey tea bag steeped + chilled",
      "0.75 cup fresh green apple (pressed)",
      "4-5 dried chamomile flowers (steeped)",
      "0.5 oz fresh lemon juice",
      "0.5 oz chamomile-green apple syrup",
    ],
    accent: "#d4a0c0",
  },
  {
    name: "Moonlight Shot", subtitle: "One-sip nighttime ease",
    meta: "Shot · 2oz · Frozen",
    ingredients: [
      "1 oz cognac",
      "0.75 oz fresh watermelon juice",
      "0.25 oz chilled Earl Grey tea",
      "tiny pinch ground cinnamon",
    ],
    accent: "#e8d8a0",
  },
];

const MUSIC = {
  bpm: "65–80 BPM",
  description: "Downtempo warmth. Think lo-fi jazz, ambient soul, soft trip-hop. Watermelon sugar melting into bergamot twilight.",
  artists: ["Khruangbin", "Bonobo", "Norah Jones", "FKJ", "Sade", "Tom Misch"],
  genres: ["ambient", "dub", "lo-fi hip hop", "deep house", "reggae"],
};

const ENVIRONMENT = [
  { label: "Lighting", icon: "☽", body: "Warm amber / candlelight, 2200K-2700K. Dim to 30%. Salt lamp or string lights." },
  { label: "Setting", icon: "◇", body: "Couch or floor cushions. Soft blanket. Window cracked for night air. Linen, wool, velvet, warm wood textures." },
  { label: "Breathwork", icon: "◠", body: "Descent Breath — 4-4-8 pattern (inhale 4, hold 4, exhale 8). 8 cycles. Parasympathetic activation." },
  { label: "Timing", icon: "◷", body: "Golden hour through late evening. Best after a full day when the body is ready to surrender." },
];

const BREATH_GUIDANCE = "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale.";

const NARRATIVE = "Twelve drops of lemongrass carry the dominant warmth through the room like a river through a Mendocino valley — steady, warm, the kind of current that does not hurry because it has already calculated the gradient and knows exactly when it will arrive. Moon Gazer Farms built this strain on the idea that the body can be grateful, that ease is not just the absence of tension but the active presence of something softer.\n\nBlack pepper adds ten drops of warm spice, the earthy warmth that makes the physical relaxation feel like a choice rather than a collapse — the difference between lying down and being laid down, between sinking and settling. Tea tree arrives with eight drops of the rare sharp clarity, the unusual molecule that gives Moonlight its distinctive edge, its watermelon candy note that emerges from chemistry rather than flavor and makes the whole blend slightly mysterious, slightly nocturnal.\n\nGerman chamomile provides six drops of the soft calming molecule, the soft cushion beneath everything else, the molecular equivalent of the mattress you do not notice because it is doing its job perfectly. And then bergamot at four drops, and the Earl Grey aroma clicks into place with such precision it feels like recognition rather than discovery: bergamot is Earl Grey, the essential oil that has always been the tea what it is, and here it is again, in a cannabis strain from Mendocino, proving that molecules are faithful regardless of address.\n\nTycho plays softly from a speaker balanced on a stack of books. The citrus zest quality lives in the bergamot, the grateful calm lives in the chamomile, and the rare sharp clarity gives the whole blend its midnight quality — not dark, exactly, but lunar, reflective, the kind of light that shows things differently than daylight does, emphasizing texture over color, depth over detail.\n\nA woman sits by the window with an actual cup of Earl Grey, and the blend has turned the ordinary into ceremony without adding a single gesture or prop. The settled body is not tired. The calm is not emptiness. It is that rare neurological state where the system stops cataloging threats and starts cataloging gifts, and the five oils — lemongrass, pepper, tea tree, chamomile, bergamot — are the first entry on the list, and the tea is the second, and the window is the third, and the list continues softly into a night that has no agenda.";

const VIBES = [
  { name: "Grounded & Present", desc: "Weight in the body, softness in the breath", active: true },
  { name: "Cozy Comfort", desc: "Amber light, wool blanket, warm mug", active: true },
  { name: "Deep Rest", desc: "Total surrender, velvet quiet", active: false },
  { name: "Body Melt", desc: "Profound physical ease", active: false },
  { name: "Creative Flow", desc: "Vivid ideas, playful momentum", active: false },
  { name: "Social & Bright", desc: "Warm gathering, easy laughter", active: false },
];

const STARS = [
  [12,8,1.2,0],[25,15,0.8,1.2],[45,5,1.5,0.5],[65,12,0.7,2],[80,8,1,0.8],
  [8,25,0.6,1.5],[35,22,1.1,0.3],[55,28,0.9,1.8],[78,20,1.3,0.7],[92,18,0.5,2.2],
  [15,42,0.8,0.9],[42,38,1,1.6],[68,45,0.7,0.4],[88,35,1.2,1.1],[5,55,0.9,1.7],
  [30,52,0.6,2.5],[52,48,1.1,0.6],[75,55,0.8,1.3],[95,50,0.7,0.2],
  [18,68,0.9,1.4],[40,72,0.6,2.1],[62,75,1.2,0.5],[85,68,0.8,1.9],[10,88,1,0.3],
  [38,92,0.7,1.7],[58,85,0.9,1],[82,95,1.1,0.9],[3,38,1,0.4],[48,15,0.7,1.3],
];

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: THEME.monoFont, fontSize: 9, letterSpacing: 3,
      textTransform: "uppercase", color: THEME.accent2, marginBottom: 14,
      paddingBottom: 8, borderBottom: `1px solid ${THEME.border}`,
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
          <span style={{ fontFamily: THEME.displayFont, fontSize: 15, color: THEME.text }}>{terpene.name}</span>
          <span style={{ marginLeft: 10, fontFamily: THEME.monoFont, fontSize: 10, color: THEME.textDim }}>via {terpene.oil}</span>
        </div>
        <span style={{ fontFamily: THEME.monoFont, fontSize: 12, color: terpene.color, fontWeight: 500 }}>{terpene.pct}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(254,243,199,0.08)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
        <div style={{
          height: "100%", width: `${width}%`,
          background: `linear-gradient(90deg, ${terpene.color}, ${terpene.color}66)`,
          borderRadius: 3, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
      <div style={{ fontSize: 11, color: THEME.textDim, lineHeight: 1.5, marginBottom: 2 }}>Also found in: {terpene.food}</div>
      <div style={{ fontSize: 11, color: THEME.textMuted, lineHeight: 1.5, fontStyle: "italic" }}>{terpene.note}</div>
    </div>
  );
}

function BeverageCard({ bev }) {
  return (
    <div style={{
      background: THEME.bgCard, border: `1px solid ${THEME.border}`,
      borderRadius: 12, padding: 18, marginBottom: 14,
    }}>
      <div style={{ fontFamily: THEME.displayFont, fontSize: 18, color: THEME.text, marginBottom: 2 }}>{bev.name}</div>
      <div style={{ fontSize: 12, color: bev.accent, marginBottom: 12, fontStyle: "italic", fontFamily: THEME.bodyFont }}>{bev.subtitle}</div>
      <div style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.7, fontFamily: THEME.bodyFont }}>
        {bev.ingredients.map((ing, i) => (
          <div key={i} style={{ paddingLeft: 10, borderLeft: `1px solid ${bev.accent}33`, marginBottom: 4 }}>{ing}</div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 10, color: THEME.textDim, fontFamily: THEME.monoFont, letterSpacing: 0.5 }}>{bev.meta}</div>
    </div>
  );
}

export default function MoonlightVibe() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: THEME.bg, color: THEME.text,
      fontFamily: THEME.bodyFont, position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(254,243,199,0.15); border-radius: 2px; }
      `}</style>

      {/* Star field */}
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {STARS.map(([x, y, s, del], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={s} fill="#fef3c7" opacity="0.6"
            style={{ animation: `twinkle ${3 + del}s ease-in-out infinite`, animationDelay: `${del}s` }} />
        ))}
      </svg>

      {/* Drifting Moon */}
      <div style={{
        position: "fixed", top: 40, right: 30, zIndex: 1,
        animation: "drift 8s ease-in-out infinite",
        opacity: loaded ? 0.9 : 0, transition: "opacity 2s ease",
        pointerEvents: "none",
      }}>
        <svg width="70" height="70" viewBox="0 0 70 70">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#fde68a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="35" cy="35" r="33" fill="url(#moonGlow)" />
          <circle cx="35" cy="35" r="20" fill="#fef3c7" opacity="0.9" />
          <circle cx="28" cy="28" r="3" fill="#fde68a" opacity="0.4" />
          <circle cx="40" cy="38" r="2" fill="#fde68a" opacity="0.3" />
          <circle cx="32" cy="42" r="1.5" fill="#fde68a" opacity="0.35" />
        </svg>
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 540, margin: "0 auto", padding: "0 0 60px",
      }}>
        {/* HERO */}
        <div style={{
          padding: "64px 28px 44px", position: "relative", overflow: "hidden",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            fontFamily: THEME.monoFont, fontSize: 9, letterSpacing: 4,
            color: THEME.accent2, textTransform: "uppercase", marginBottom: 20,
          }}>
            SOLFUL SESSIONS · VIBE CURATOR
          </div>
          <h1 style={{
            fontFamily: THEME.displayFont, fontSize: 54, fontWeight: 400,
            lineHeight: 1.05, margin: "0 0 10px", letterSpacing: -1,
            background: THEME.titleGradient,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {STRAIN.name}
          </h1>
          <div style={{
            fontFamily: THEME.monoFont, fontSize: 11, color: THEME.textMuted,
            marginBottom: 20, letterSpacing: 0.5,
          }}>
            {STRAIN.farm} · {STRAIN.region} · {STRAIN.energy} ENERGY
          </div>
          <p style={{
            fontFamily: THEME.displayFont, fontSize: 22, fontWeight: 300,
            fontStyle: "italic", color: THEME.textMuted, lineHeight: 1.5,
            margin: "0 0 24px",
          }}>
            {STRAIN.intent}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {STRAIN.effects.map(e => (
              <span key={e} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 11,
                border: `1px solid ${THEME.accent2}40`, color: THEME.accent2,
                fontFamily: THEME.monoFont, letterSpacing: 0.5,
              }}>{e}</span>
            ))}
          </div>
          <div style={{
            fontFamily: THEME.bodyFont, fontSize: 14, color: THEME.textDim,
            fontStyle: "italic",
          }}>
            Aroma: {STRAIN.aroma.join(" · ")}
          </div>
        </div>

        {/* WHAT YOU EXPERIENCED */}
        <div style={{ padding: "36px 28px 28px" }}>
          <SectionLabel>What You Experienced</SectionLabel>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.75, margin: "0 0 24px", fontFamily: THEME.bodyFont }}>
            A Moonlight session isn't just smoking a joint. You taste the same molecules
            through three different delivery channels — inhaled from the diffuser, ingested through tea or juice,
            and then inhaled again from the flower. Every step primes the same receptors before you ever light up.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { channel: "Diffuser", path: "Olfactory → Limbic System", desc: "Essential oils → nose → emotional brain in under 2 seconds" },
              { channel: "Tea / Juice", path: "Gut → Bloodstream → Brain", desc: "Terpenes absorbed through gut lining, cross blood-brain barrier" },
              { channel: "Flower", path: "Lungs → Bloodstream → Receptors", desc: "Cannabis terpenes + cannabinoids arrive at pre-loaded receptors" },
            ].map((c, i) => (
              <div key={i} style={{
                padding: "14px 16px", background: THEME.bgCard,
                borderRadius: 10, borderLeft: `3px solid ${THEME.accent2}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontFamily: THEME.monoFont, fontSize: 12, color: THEME.accent2, fontWeight: 500 }}>{c.channel}</span>
                  <span style={{ fontFamily: THEME.monoFont, fontSize: 9, color: THEME.textDim }}>{c.path}</span>
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.5, fontFamily: THEME.bodyFont }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* THE CONCEPT */}
        <div style={{
          padding: "32px 28px", margin: "0 16px",
          background: `linear-gradient(135deg, ${THEME.bgCard}, ${THEME.bgPanel})`,
          borderRadius: 16, border: `1px solid ${THEME.border}`,
        }}>
          <SectionLabel>The Concept — Terpene Pre-Loading</SectionLabel>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.75, margin: "0 0 20px", fontFamily: THEME.bodyFont }}>
            Every plant that smells — cannabis, lavender, black pepper, chamomile, lemongrass — gets its scent from
            the same family of molecules: <strong style={{ color: THEME.text }}>terpenes</strong>.
          </p>
          <div style={{
            padding: "16px 18px", background: `${THEME.gold}08`,
            border: `1px solid ${THEME.gold}20`, borderRadius: 10, marginBottom: 20,
          }}>
            <p style={{
              fontFamily: THEME.displayFont, fontSize: 17, fontWeight: 300,
              fontStyle: "italic", color: THEME.gold, lineHeight: 1.6, margin: 0,
              textAlign: "center",
            }}>
              "The same molecule activates the same receptor — regardless of which plant it came from."
            </p>
          </div>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.75, margin: "0 0 16px", fontFamily: THEME.bodyFont }}>
            Terpene Pre-Loading means delivering these molecules <em>before</em> you consume cannabis —
            through aromatherapy and drinks — so your receptors are already activated when the cannabinoids arrive.
            Not just "smelling nice." Temporal sequencing: prime, then amplify.
          </p>
          <p style={{ fontSize: 13, color: THEME.textDim, lineHeight: 1.6, margin: 0, fontFamily: THEME.bodyFont }}>
            The Moonlight blend matches its exact terpene fingerprint — myrcene from lemongrass, caryophyllene from
            black pepper, terpinolene from tea tree, bisabolol from chamomile — so your body receives the same chemical
            signal from three sources before the fourth (the flower) ever arrives.
          </p>
        </div>

        {/* PROTOCOL TIMELINE */}
        <div style={{ padding: "40px 28px 36px" }}>
          <SectionLabel>The Protocol</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
            <div style={{
              position: "absolute", left: 22, top: 30, bottom: 30,
              width: 2, background: `linear-gradient(to bottom, ${THEME.accent2}60, ${THEME.accent2}10)`,
            }} />
            {PROTOCOL_STEPS.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, padding: "16px 0",
                position: "relative", zIndex: 1,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: THEME.bgCard, border: `2px solid ${THEME.accent2}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0, color: THEME.accent2,
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: THEME.monoFont, fontSize: 11, color: THEME.accent2, fontWeight: 500 }}>{s.time}</span>
                    <span style={{ fontFamily: THEME.displayFont, fontSize: 15, color: THEME.text }}>{s.label}</span>
                  </div>
                  <p style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.6, margin: 0, fontFamily: THEME.bodyFont }}>{s.desc}</p>
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
            padding: "14px 16px", background: THEME.bgCard,
            borderRadius: 10, border: `1px solid ${THEME.border}`,
          }}>
            <div>
              <div style={{ fontSize: 10, color: THEME.textDim, fontFamily: THEME.monoFont, textTransform: "uppercase", letterSpacing: 1 }}>Total</div>
              <div style={{ fontSize: 22, fontFamily: THEME.displayFont }}>{STRAIN.totalTerpenes}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: THEME.textDim, fontFamily: THEME.monoFont, textTransform: "uppercase", letterSpacing: 1 }}>Dominant</div>
              <div style={{ fontSize: 22, fontFamily: THEME.displayFont }}>{STRAIN.dominantTerpene}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: THEME.textDim, fontFamily: THEME.monoFont, textTransform: "uppercase", letterSpacing: 1 }}>Energy</div>
              <div style={{ fontSize: 22, fontFamily: THEME.displayFont }}>{STRAIN.energy}</div>
            </div>
          </div>
          {TERPENES.map((t, i) => <TerpeneBar key={t.name} terpene={t} index={i} />)}
        </div>

        {/* ESSENTIAL OIL BLEND */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>Essential Oil Blend · 40 Drops / 2ml</SectionLabel>
          <div style={{
            padding: "20px 18px", background: THEME.bgCard,
            borderRadius: 12, border: `1px solid ${THEME.border}`, marginBottom: 16,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {EO_BLEND.map(o => (
                <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 110, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, color: THEME.text, fontFamily: THEME.displayFont }}>{o.name}</div>
                    <div style={{ fontFamily: THEME.monoFont, fontSize: 9, color: THEME.textDim }}>{o.terpene}</div>
                  </div>
                  <DropDots count={o.drops} color={o.color} />
                  <span style={{ fontFamily: THEME.monoFont, fontSize: 11, color: THEME.textDim, marginLeft: "auto" }}>{o.drops}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.7, fontStyle: "italic", fontFamily: THEME.bodyFont, margin: 0 }}>
            {BLEND_RATIONALE}
          </p>
        </div>

        {/* BEVERAGE RECIPES */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>The Terpene Beverages</SectionLabel>
          <p style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic", fontFamily: THEME.bodyFont }}>
            Each drink mirrors Moonlight's terpene fingerprint through botanical ingredients —
            watermelon and lemongrass for myrcene, Earl Grey for terpinolene, chamomile for bisabolol, cinnamon for caryophyllene.
          </p>
          {BEVERAGES.map(b => <BeverageCard key={b.name} bev={b} />)}
        </div>

        {/* MUSIC / SPOTIFY */}
        <div style={{ padding: "0 28px 36px" }}>
          <SectionLabel>The Soundtrack · {MUSIC.bpm}</SectionLabel>
          <p style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.7, marginBottom: 18, fontFamily: THEME.bodyFont }}>
            {MUSIC.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
            {MUSIC.artists.map(a => (
              <span key={a} style={{
                padding: "5px 12px", borderRadius: 20,
                background: THEME.bgCard, border: `1px solid ${THEME.border}`,
                fontSize: 12, color: THEME.textMuted, fontFamily: THEME.bodyFont,
              }}>{a}</span>
            ))}
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: 12, border: 0 }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1FwZYknyiZS0iE?utm_source=generator"
              width="100%" height="352"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Moonlight Playlist"
            />
          </div>
          <a href="https://open.spotify.com/playlist/37i9dQZF1FwZYknyiZS0iE" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, padding: "12px 0", borderRadius: 30,
            background: "#1DB954", color: "#000", textDecoration: "none",
            fontFamily: THEME.bodyFont, fontSize: 13, fontWeight: 500,
          }}>
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
              background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, color: THEME.accent2 }}>{e.icon}</span>
                <span style={{
                  fontFamily: THEME.monoFont, fontSize: 10, letterSpacing: 2,
                  textTransform: "uppercase", color: THEME.textDim,
                }}>{e.label}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: THEME.textMuted, fontFamily: THEME.bodyFont }}>{e.body}</div>
            </div>
          ))}
          <div style={{
            marginTop: 16, padding: "16px 18px",
            background: `${THEME.gold}08`, border: `1px solid ${THEME.gold}20`, borderRadius: 10,
          }}>
            <div style={{ fontFamily: THEME.monoFont, fontSize: 9, letterSpacing: 2, color: THEME.gold, textTransform: "uppercase", marginBottom: 8 }}>
              Breath Guidance
            </div>
            <p style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.7, margin: 0, fontFamily: THEME.bodyFont, fontStyle: "italic" }}>
              {BREATH_GUIDANCE}
            </p>
          </div>
        </div>

        {/* NARRATIVE */}
        <div style={{ padding: "0 28px 40px" }}>
          <SectionLabel>The Narrative · Terpene Cartography</SectionLabel>
          <div style={{
            fontFamily: THEME.bodyFont, fontSize: 16, lineHeight: 1.9,
            color: THEME.textMuted, fontStyle: "italic", fontWeight: 300,
          }}>
            {NARRATIVE.split("\n\n").map((para, i) => (
              <p key={i} style={{ margin: "0 0 20px" }}>{para}</p>
            ))}
          </div>
        </div>

        {/* INTENT MAP */}
        <div style={{
          padding: "32px 28px", margin: "0 16px 24px",
          background: THEME.bgCard, borderRadius: 16, border: `1px solid ${THEME.border}`,
        }}>
          <SectionLabel>It Starts with Intent</SectionLabel>
          <p style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.7, marginBottom: 20, fontFamily: THEME.bodyFont }}>
            The idea isn't "get high." It's "choose what you want the session to do." Moonlight sits in these categories:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {VIBES.map(v => (
              <div key={v.name} style={{
                padding: "12px 14px", borderRadius: 10,
                background: v.active ? `${THEME.accent2}12` : THEME.bgPanel,
                border: `1px solid ${v.active ? THEME.accent2 + "40" : THEME.border}`,
                opacity: v.active ? 1 : 0.45,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 500,
                  color: v.active ? THEME.accent2 : THEME.textMuted, marginBottom: 3,
                  fontFamily: THEME.displayFont,
                }}>{v.name}</div>
                <div style={{ fontSize: 10, color: THEME.textDim, lineHeight: 1.4, fontFamily: THEME.bodyFont }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "24px 28px", textAlign: "center" }}>
          <div style={{
            fontFamily: THEME.monoFont, fontSize: 9, color: THEME.textDim,
            letterSpacing: 3, textTransform: "uppercase",
          }}>
            SOLFUL SESSIONS · TERPENE VIBE CURATION · MOON GAZER FARMS
          </div>
        </div>
      </div>
    </div>
  );
}

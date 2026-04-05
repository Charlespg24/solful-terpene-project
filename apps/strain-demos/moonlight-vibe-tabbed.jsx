import { useState, useEffect } from "react";

const MOONLIGHT = {
  strain: "Moonlight",
  farm: "Moon Gazer Farms",
  region: "Mendocino",
  energy: "LOW",
  intent: "Soft gratitude in a settled body.",
  effects: ["Physically Relaxed", "Calm", "Grateful"],
  aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
  totalTerpenes: "2.67%",
  dominantTerpene: "Myrcene (0.74%)",
  vibes: ["Grounded & Present", "Cozy Comfort"],
  terpenes: [
    { name: "Myrcene", pct: 0.74, ratio: 40, color: "#7ec8a0", note: "Sedation, muscle relaxation, GABA-A potentiation" },
    { name: "β-Caryophyllene", pct: 0.51, ratio: 27, color: "#c4956a", note: "CB2 agonist, anti-inflammatory warmth" },
    { name: "Terpinolene", pct: 0.38, ratio: 20, color: "#8fa8c8", note: "Gentle cerebral uplift, antioxidant" },
    { name: "α-Bisabolol", pct: 0.24, ratio: 13, color: "#d4a0c0", note: "Anti-irritant, skin-soothing calm" },
  ],
  essentialOil: {
    totalDrops: 40,
    batchSize: "2ml",
    oils: [
      { oil: "Lemongrass", drops: 12, terpene: "Myrcene", pct: 30 },
      { oil: "Black Pepper", drops: 10, terpene: "β-Caryophyllene", pct: 25 },
      { oil: "Tea Tree", drops: 8, terpene: "Terpinolene", pct: 20 },
      { oil: "German Chamomile", drops: 6, terpene: "α-Bisabolol", pct: 15 },
      { oil: "Bergamot", drops: 4, terpene: "Limonene", pct: 10 },
    ],
    rationale: "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. German chamomile for bisabolol. Bergamot is the key ingredient in Earl Grey tea — a direct aroma hit that also delivers citrus zest."
  },
  beverage: {
    mocktail: {
      name: "Moonlight Mocktail",
      subtitle: "Nighttime watermelon comfort",
      glass: "Rocks",
      volume: "6 oz",
      temp: "Chilled",
      ingredients: [
        "3 oz fresh watermelon juice",
        "0.5 oz fresh lemon juice",
        "1 oz chilled brewed Earl Grey tea",
        "0.5 oz chamomile-green apple syrup",
        "Tiny pinch ground cinnamon",
        "Watermelon wedge + apple slice garnish"
      ]
    },
    cocktail: {
      name: "Moonlight Cocktail",
      subtitle: "Cognac-infused watermelon and Earl Grey ease",
      glass: "Rocks",
      volume: "6.5 oz",
      spirit: "Cognac",
      abv: "15%",
      ingredients: [
        "1.5 oz cognac",
        "2.5 oz fresh watermelon juice",
        "0.5 oz fresh lemon juice",
        "1 oz chilled brewed Earl Grey tea",
        "0.5 oz chamomile-green apple syrup",
        "Tiny pinch ground cinnamon"
      ]
    },
    tea: {
      name: "Moonlight Tea",
      subtitle: "Soft bergamot and watermelon comfort brew",
      temp: "190°F",
      steep: "3-4 min (staged)",
      caffeine: "Moderate",
      ingredients: [
        "1 Earl Grey tea bag + 1 green tea bag",
        "0.5 oz fresh watermelon juice",
        "4-5 dried chamomile flowers",
        "Tiny pinch ground cinnamon",
        "0.25 oz honey or agave"
      ]
    },
    shot: {
      name: "Moonlight Shot",
      subtitle: "One-sip nighttime ease",
      volume: "2 oz",
      temp: "Frozen",
      ingredients: [
        "1 oz cognac",
        "0.75 oz fresh watermelon juice",
        "0.25 oz chilled Earl Grey tea",
        "Tiny pinch ground cinnamon"
      ]
    }
  },
  music: {
    energy: 0.25,
    valence: 0.55,
    tempo: "65-80 BPM",
    mode: "Minor / Dorian",
    acousticness: 0.6,
    instrumentalness: 0.5,
    description: "Downtempo warmth. Think lo-fi jazz, ambient soul, soft trip-hop. Watermelon sugar melting into bergamot twilight.",
    artists: ["Khruangbin", "Bonobo", "Norah Jones", "FKJ", "Sade", "Tom Misch"],
    keywords: ["twilight jazz", "ambient soul", "soft groove", "warm downtempo"]
  },
  environment: {
    lighting: "Warm amber / candlelight, 2200K-2700K. Dim to 30%. Salt lamp or string lights.",
    setting: "Couch or floor cushions. Soft blanket. Window cracked for night air.",
    breathwork: "4-7-8 breathing (inhale 4, hold 7, exhale 8). 3 cycles before consumption.",
    timing: "Golden hour through late evening. Best after a full day."
  }
};

const Moon = ({ phase = 0 }) => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#fde68a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="30" cy="30" r="28" fill="url(#moonGlow)" />
    <circle cx="30" cy="30" r="18" fill="#fef3c7" opacity="0.9" />
    <circle cx="24" cy="24" r="3" fill="#fde68a" opacity="0.4" />
    <circle cx="34" cy="32" r="2" fill="#fde68a" opacity="0.3" />
    <circle cx="28" cy="36" r="1.5" fill="#fde68a" opacity="0.35" />
  </svg>
);

const Star = ({ x, y, size = 2, delay = 0 }) => (
  <circle
    cx={x} cy={y} r={size}
    fill="#fef3c7"
    opacity="0.6"
    style={{
      animation: `twinkle ${3 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  />
);

const TerpeneBar = ({ terpene, index }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(terpene.ratio), 300 + index * 150);
    return () => clearTimeout(t);
  }, [terpene.ratio, index]);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 15, color: "#fef3c7", letterSpacing: 0.5 }}>
          {terpene.name}
        </span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "rgba(254,243,199,0.6)" }}>
          {terpene.pct}% · {terpene.ratio}%
        </span>
      </div>
      <div style={{ height: 6, background: "rgba(254,243,199,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${terpene.color}, ${terpene.color}88)`,
          borderRadius: 3,
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }} />
      </div>
      <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", marginTop: 3, fontStyle: "italic" }}>
        {terpene.note}
      </div>
    </div>
  );
};

const Section = ({ title, icon, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      marginBottom: 40
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
        borderBottom: "1px solid rgba(254,243,199,0.1)", paddingBottom: 10
      }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20, fontWeight: 400, color: "#fef3c7",
          letterSpacing: 1, margin: 0, textTransform: "uppercase"
        }}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

const OilDrop = ({ oil, index }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
    borderBottom: index < 4 ? "1px solid rgba(254,243,199,0.06)" : "none"
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: `rgba(254,243,199,${0.05 + oil.pct / 100})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#fef3c7"
    }}>{oil.drops}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 14, color: "#fef3c7" }}>{oil.oil}</div>
      <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)" }}>delivers {oil.terpene}</div>
    </div>
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "rgba(254,243,199,0.5)" }}>
      {oil.drops} drops
    </div>
  </div>
);

const BeverageCard = ({ bev, accent }) => (
  <div style={{
    background: "rgba(254,243,199,0.03)",
    border: "1px solid rgba(254,243,199,0.08)",
    borderRadius: 8, padding: 16, flex: "1 1 220px", minWidth: 200
  }}>
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, color: "#fef3c7", marginBottom: 2 }}>
      {bev.name}
    </div>
    <div style={{ fontSize: 11, color: accent, marginBottom: 10, fontStyle: "italic" }}>{bev.subtitle}</div>
    <div style={{ fontSize: 12, color: "rgba(254,243,199,0.5)", lineHeight: 1.7 }}>
      {bev.ingredients.map((ing, i) => (
        <div key={i} style={{ paddingLeft: 8, borderLeft: `1px solid ${accent}33`, marginBottom: 3 }}>{ing}</div>
      ))}
    </div>
    {bev.spirit && (
      <div style={{ marginTop: 8, fontSize: 11, color: "rgba(254,243,199,0.35)" }}>
        {bev.spirit} · {bev.abv} ABV · {bev.glass} glass
      </div>
    )}
    {bev.temp && !bev.spirit && (
      <div style={{ marginTop: 8, fontSize: 11, color: "rgba(254,243,199,0.35)" }}>
        {bev.glass || bev.volume || ""} {bev.temp ? `· ${bev.temp}` : ""} {bev.steep ? `· Steep ${bev.steep}` : ""}
      </div>
    )}
  </div>
);

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "aroma", label: "Aromatherapy" },
  { id: "sip", label: "Sip" },
  { id: "sound", label: "Sound" },
  { id: "space", label: "Space" },
  { id: "read", label: "Read" },
];

const NARRATIVE = {
  sonnet: {
    title: "Sonnet: Moonlight",
    timing: "Read during diffuser warm-up · T-minus 15",
    lines: [
      "The diffuser hums its bergamot refrain,",
      "and amber light pools soft against the wall.",
      "The body, once a ledger keeping pain,",
      "decides tonight it doesn\u2019t owe at all.",
      "",
      "The watermelon sweetness fills the room",
      "like something half-remembered, half-invented \u2014",
      "a grandmother\u2019s kitchen, August afternoon,",
      "a life that never asked to be augmented.",
      "",
      "The weighted blanket settles on my chest.",
      "I breathe: four in, hold seven, eight counts out.",
      "The day\u2019s sharp edges blur and acquiesce.",
      "There\u2019s nothing left to prove, nothing to doubt.",
      "",
      "The moon has never tried to be the sun.",
      "Tonight I practice being simply done."
    ]
  },
  haiku: {
    title: "Three Breaths of Moonlight",
    timing: "Synchronized with 4-7-8 breathing · T-minus 5",
    breaths: [
      {
        phase: "Inhale",
        lines: ["Lemongrass and pepper \u2014", "the room already knows what", "my body still learns."]
      },
      {
        phase: "Hold",
        lines: ["Watermelon light", "on the backs of closing eyes.", "Gratitude has weight."]
      },
      {
        phase: "Exhale",
        lines: ["Settled. Not sleeping.", "Just the tender hum of not", "needing anything."]
      }
    ]
  },
  ode: {
    title: "Ode to the Settled Body",
    timing: "Read during movement practice or mid-experience",
    stanzas: [
      ["Oh body, you difficult engine,", "you carrier of briefcases and grudges,", "you alarm clock that never stops \u2014", "tonight I want to thank you", "for the things you do without being asked."],
      ["For the lungs that kept their rhythm", "through the conference call that wouldn\u2019t end.", "For the shoulders that absorbed", "every email marked urgent", "that wasn\u2019t."],
      ["For the jaw that held its clench", "through traffic, through the news,", "through the particular silence", "of someone deciding not to say", "what they mean."],
      ["Tonight the chamomile", "is doing its quiet chemistry.", "The black pepper warmth", "is visiting your joints", "like an old friend who doesn\u2019t need", "to be entertained."],
      ["You don\u2019t have to perform recovery.", "You don\u2019t have to optimize your rest.", "You can just lie here", "in the amber half-dark", "and feel the extraordinary ordinariness", "of not hurting."],
      ["The myrcene is a hand on your back", "that isn\u2019t asking you to stand up.", "The bisabolol is the cool side of a pillow", "that stays cool."],
      ["Oh body,", "you have been so loud with your needs", "and so quiet with your gifts.", "Let me notice you tonight", "the way moonlight notices a room \u2014", "without changing anything,", "just by arriving."]
    ]
  },
  prose: {
    title: "Terpene Cartography",
    timing: "Read aloud during room setup · T-minus 30",
    text: "There is a map of you that smells like Earl Grey and watermelon candy. It was drawn by a farm in Mendocino where the fog comes in like a second blanket and the plants lean toward each other in the dark as if sharing a secret about your GABA receptors. The map says: here is where your tension lives \u2014 at the corner of your neck and your to-do list. And here is where your gratitude hides \u2014 underneath the assumption that rest must be earned. And here, in the space between your fourth and fifth ribs, is a room with amber walls and no clock, where a version of you has been waiting all day to exhale. The cartographer used lemongrass for the borders, black pepper for the roads, tea tree for the elevation lines, and chamomile for the places too tender to name out loud. Every legend on this map is written in the language of scent, which is the only language that doesn\u2019t pass through the part of your brain that argues. You don\u2019t read this map. You breathe it in. And then you arrive."
  },
  story: {
    title: "The Nightcap",
    timing: "Read before session (narrative pre-loading) or after (integration)",
    paragraphs: [
      "Jess hadn\u2019t sat down in eleven hours.",
      "Not truly sat down \u2014 not the kind where your weight actually commits to the surface beneath you. She\u2019d perched on the edge of her desk chair during calls, half-stood at the kitchen counter eating leftover rice with a fork, leaned against the bathroom doorframe while her daughter brushed her teeth. But committed sitting, the kind where your spine remembers it has curves? Not once.",
      "It was 9:47 PM and the house was finally quiet in the way that houses get quiet \u2014 not silent, but released. The dishwasher hummed its low opinion of dinner plates. Somewhere upstairs, her daughter was breathing the slow metronome of genuine sleep.",
      "Jess walked to the living room. She didn\u2019t turn on the overhead light. Instead she pressed the button on the small remote by the couch \u2014 the Hue lights eased into a color she could only describe as \u201Cthe inside of a honey jar.\u201D She\u2019d set the scene last weekend after reading something about amber light and stress. 2200K. Thirty percent. It made the room look like a memory of itself.",
      "The diffuser was already loaded. She\u2019d mixed the blend that morning in a small moment of optimism \u2014 lemongrass, black pepper, tea tree, chamomile, a few drops of bergamot because the label said it was what made Earl Grey smell like Earl Grey. She pressed the button and a thin stream of vapor climbed into the amber air like a question mark that already knew the answer.",
      "She sat down.",
      "Actually sat down. Felt the couch accept her full weight like it had been waiting. She pulled the weighted blanket from the arm of the sofa \u2014 fifteen pounds of tiny glass beads sewn into grey velvet \u2014 and draped it over her lap. The weight settled onto her thighs with a pressure that felt less like heaviness and more like being taken seriously.",
      "The bergamot reached her first. Then the lemongrass, green and clean, followed by the peppery warmth underneath \u2014 not sharp, more like the memory of sharpness, rounded by the chamomile into something almost sweet. She took one breath that was intentional. Four counts in. Seven held. Eight out. The exhale lasted longer than she expected, as if her lungs had been saving this breath all day, rationing it, waiting for the right room.",
      "On the side table sat a small jar she\u2019d bought from the dispensary in Sebastopol last Saturday. The woman behind the counter \u2014 sun-freckled, calm in a way that suggested either deep practice or simply not having a commute \u2014 had handed it to her and said, \u201CThis one\u2019s from Moon Gazer Farms. Mendocino. We call it Moonlight.\u201D She\u2019d paused, then added, \u201CIt\u2019s for the end of the day. When the day was a lot.\u201D",
      "Jess had smiled at that. \u201CThe day is always a lot.\u201D",
      "\u201CThen you\u2019ll use the whole jar.\u201D",
      "Now she opened it. The smell rose to meet the diffuser\u2019s work and something clicked \u2014 not in her mind but lower, somewhere in the animal part of her brain that recognized patterns before language could name them. The bergamot from the diffuser and the citrus zest from the jar. The lemongrass and the watermelon sweetness. The pepper warmth in both. They weren\u2019t the same smell, but they were the same sentence said in two dialects.",
      "She packed a small bowl. Not much \u2014 she\u2019d learned that when the room was already primed, you needed less. One modest inhale, held gently, released through barely parted lips. The smoke joined the vapor in the amber light and for a moment the room looked like a painting of a room, everything soft-edged and significant.",
      "It arrived the way it always arrived when the preparation was right \u2014 not as a wave but as a permission. Her shoulders dropped two inches. Her jaw unclenched and she realized, with something between humor and grief, that she\u2019d been biting the inside of her cheek since lunch. Her hands, which had been fists of competence all day \u2014 typing, gripping, pointing, holding \u2014 opened on her lap like small animals deciding the coast was clear.",
      "The weighted blanket pressed down. The amber light held steady. The bergamot and lemongrass continued their quiet molecular diplomacy.",
      "And there it was. The feeling the jar was named for. Not happiness, exactly \u2014 happiness was too active, too much like a project. This was more like the moment after happiness takes off its shoes. It was gratitude without an object. Calm without a reason. The physical sensation of not needing the next moment to be different from this one.",
      "She picked up the small notebook from the side table. A pen. She\u2019d read somewhere that writing by hand was different \u2014 slower, more honest, like the words had to pass through more of your body before reaching the page. She wrote:",
      "What does your body feel grateful for right now?",
      "She paused. Then:",
      "My body is grateful for this blanket that doesn\u2019t want anything from me. For this room that looks the way sleep feels. For the fact that my daughter said \u201Cyou smell like tea\u201D when I kissed her goodnight and she meant it as a compliment.",
      "My body is grateful for the version of me that loaded the diffuser this morning. She didn\u2019t know what tonight would bring. She just trusted that tonight would come.",
      "She closed the notebook. Set down the pen. Leaned her head back against the couch and looked at the ceiling, where the amber light made small shadows out of nothing.",
      "She breathed in bergamot. She breathed out Tuesday.",
      "The moon, visible through the half-open blinds, didn\u2019t ask how her day was. It just did what moonlight does \u2014 arrived without effort, illuminated without heat, and made the ordinary world look like it was worth being gentle with.",
      "Jess closed her eyes.",
      "She was, for the first time all day, simply where she was."
    ]
  }
};

const PIECES = [
  { id: "prose", label: "Prose Poem", icon: "◈" },
  { id: "sonnet", label: "Sonnet", icon: "❋" },
  { id: "haiku", label: "Haiku", icon: "◉" },
  { id: "ode", label: "Ode", icon: "⟡" },
  { id: "story", label: "Short Story", icon: "◇" },
];

export default function MoonlightVibe() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loaded, setLoaded] = useState(false);
  const [readPiece, setReadPiece] = useState("prose");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const d = MOONLIGHT;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0c0e1a 0%, #111827 30%, #0f1623 70%, #0a0c14 100%)",
      color: "#fef3c7",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative", overflow: "hidden"
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(254,243,199,0.15); border-radius: 2px; }
      `}</style>

      {/* Star field */}
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
        {[
          [12,8,1.2,0],[25,15,0.8,1.2],[45,5,1.5,0.5],[65,12,0.7,2],[80,8,1,0.8],
          [8,25,0.6,1.5],[35,22,1.1,0.3],[55,28,0.9,1.8],[78,20,1.3,0.7],[92,18,0.5,2.2],
          [15,42,0.8,0.9],[42,38,1,1.6],[68,45,0.7,0.4],[88,35,1.2,1.1],[5,55,0.9,1.7],
          [30,52,0.6,2.5],[52,48,1.1,0.6],[75,55,0.8,1.3],[95,50,0.7,0.2]
        ].map(([x,y,s,del], i) => (
          <Star key={i} x={`${x}%`} y={`${y}%`} size={s} delay={del} />
        ))}
      </svg>

      {/* Moon */}
      <div style={{
        position: "fixed", top: 40, right: 40, zIndex: 1,
        animation: "drift 8s ease-in-out infinite",
        opacity: loaded ? 0.9 : 0, transition: "opacity 2s ease"
      }}>
        <Moon />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 640, margin: "0 auto", padding: "60px 24px 40px"
      }}>
        {/* Header */}
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          marginBottom: 48, textAlign: "center"
        }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: "rgba(254,243,199,0.4)",
            textTransform: "uppercase", marginBottom: 12,
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            Vibe Curation · {d.farm} · {d.region}
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 52, fontWeight: 400, margin: "0 0 8px",
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #d4a574 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.1
          }}>
            {d.strain}
          </h1>
          <p style={{
            fontSize: 20, fontStyle: "italic", color: "rgba(254,243,199,0.6)",
            margin: "0 0 20px", lineHeight: 1.4, fontWeight: 300
          }}>
            {d.intent}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {d.effects.map((e, i) => (
              <span key={i} style={{
                padding: "4px 14px", borderRadius: 20,
                border: "1px solid rgba(254,243,199,0.15)",
                fontSize: 12, color: "rgba(254,243,199,0.6)",
                fontFamily: "'IBM Plex Mono', monospace"
              }}>{e}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 36,
          borderBottom: "1px solid rgba(254,243,199,0.1)",
          overflowX: "auto"
        }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 16px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
              color: activeTab === tab.id ? "#fef3c7" : "rgba(254,243,199,0.3)",
              borderBottom: activeTab === tab.id ? "1px solid #fde68a" : "1px solid transparent",
              transition: "all 0.3s ease", whiteSpace: "nowrap"
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <Section title="Terpene Profile" icon="◈" delay={100}>
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: 20,
                padding: "12px 16px", background: "rgba(254,243,199,0.03)",
                borderRadius: 8, border: "1px solid rgba(254,243,199,0.06)"
              }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>Total Terpenes</div>
                  <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', Georgia, serif" }}>{d.totalTerpenes}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>Dominant</div>
                  <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', Georgia, serif" }}>Myrcene</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>Energy</div>
                  <div style={{ fontSize: 22, fontFamily: "'DM Serif Display', Georgia, serif" }}>{d.energy}</div>
                </div>
              </div>
              {d.terpenes.map((t, i) => <TerpeneBar key={t.name} terpene={t} index={i} />)}
            </Section>

            <Section title="Aroma Notes" icon="❋" delay={300}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {d.aroma.map((a, i) => (
                  <div key={i} style={{
                    padding: "12px 20px", borderRadius: 8,
                    background: "rgba(254,243,199,0.04)",
                    border: "1px solid rgba(254,243,199,0.08)",
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: 16, color: "#fef3c7"
                  }}>{a}</div>
                ))}
              </div>
            </Section>

            <Section title="Vibe Categories" icon="◉" delay={500}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {d.vibes.map((v, i) => (
                  <span key={i} style={{
                    padding: "6px 16px", borderRadius: 20,
                    background: "linear-gradient(135deg, rgba(126,200,160,0.12), rgba(212,160,192,0.12))",
                    border: "1px solid rgba(254,243,199,0.1)",
                    fontSize: 13, fontStyle: "italic", color: "rgba(254,243,199,0.7)"
                  }}>{v}</span>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Aromatherapy */}
        {activeTab === "aroma" && (
          <div>
            <Section title="Essential Oil Blend" icon="◈" delay={100}>
              <div style={{
                padding: 16, marginBottom: 16,
                background: "rgba(254,243,199,0.03)",
                borderRadius: 8, border: "1px solid rgba(254,243,199,0.06)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>Batch</div>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18 }}>{d.essentialOil.batchSize}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "rgba(254,243,199,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>Total Drops</div>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18 }}>{d.essentialOil.totalDrops}</div>
                  </div>
                </div>
                {d.essentialOil.oils.map((oil, i) => <OilDrop key={oil.oil} oil={oil} index={i} />)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(254,243,199,0.5)", fontStyle: "italic" }}>
                {d.essentialOil.rationale}
              </p>
            </Section>

            <Section title="Pre-Loading Protocol" icon="⟡" delay={300}>
              <div style={{ lineHeight: 1.8, fontSize: 15, color: "rgba(254,243,199,0.65)" }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7ec8a0", marginRight: 10 }}>T-30 min</span>
                  Start diffusing the Moonlight blend. Let watermelon-bergamot warmth fill the space.
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#8fa8c8", marginRight: 10 }}>T-0</span>
                  Continue diffusing during consumption. The myrcene and caryophyllene are already priming your GABA-A and CB2 receptors.
                </div>
                <div>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#d4a0c0", marginRight: 10 }}>T+0</span>
                  Let the diffuser run as you settle into the experience. The terpene layering deepens over time.
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Sip */}
        {activeTab === "sip" && (
          <div>
            <Section title="Terpene Beverages" icon="◈" delay={100}>
              <p style={{ fontSize: 14, color: "rgba(254,243,199,0.5)", marginBottom: 20, fontStyle: "italic" }}>
                Each drink mirrors Moonlight's terpene profile through botanical ingredients — watermelon for myrcene, 
                Earl Grey for terpinolene, chamomile for bisabolol, cinnamon for caryophyllene.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <BeverageCard bev={d.beverage.mocktail} accent="#7ec8a0" />
                <BeverageCard bev={d.beverage.cocktail} accent="#c4956a" />
                <BeverageCard bev={d.beverage.tea} accent="#8fa8c8" />
                <BeverageCard bev={d.beverage.shot} accent="#d4a0c0" />
              </div>
            </Section>
          </div>
        )}

        {/* Sound */}
        {activeTab === "sound" && (
          <div>
            <Section title="Music Parameters" icon="◈" delay={100}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(254,243,199,0.6)", marginBottom: 20, fontStyle: "italic" }}>
                {d.music.description}
              </p>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24
              }}>
                {[
                  ["Tempo", d.music.tempo],
                  ["Energy", d.music.energy],
                  ["Valence", d.music.valence],
                  ["Mode", d.music.mode],
                  ["Acousticness", d.music.acousticness],
                  ["Instrumentalness", d.music.instrumentalness]
                ].map(([label, val]) => (
                  <div key={label} style={{
                    padding: "10px 14px",
                    background: "rgba(254,243,199,0.03)",
                    border: "1px solid rgba(254,243,199,0.06)",
                    borderRadius: 6
                  }}>
                    <div style={{ fontSize: 10, color: "rgba(254,243,199,0.35)", fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, marginTop: 2 }}>{val}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Artist Palette" icon="♫" delay={300}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {d.music.artists.map(a => (
                  <span key={a} style={{
                    padding: "6px 14px", borderRadius: 20,
                    background: "rgba(254,243,199,0.05)",
                    border: "1px solid rgba(254,243,199,0.1)",
                    fontSize: 13, color: "rgba(254,243,199,0.7)",
                    fontFamily: "'Cormorant Garamond', serif"
                  }}>{a}</span>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {d.music.keywords.map(k => (
                  <span key={k} style={{
                    fontSize: 11, color: "rgba(254,243,199,0.35)",
                    fontFamily: "'IBM Plex Mono', monospace"
                  }}>#{k}</span>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Space */}
        {activeTab === "space" && (
          <div>
            <Section title="Environment Design" icon="◈" delay={100}>
              {[
                ["Lighting", d.environment.lighting, "☽"],
                ["Setting", d.environment.setting, "◇"],
                ["Breathwork", d.environment.breathwork, "◠"],
                ["Timing", d.environment.timing, "◷"]
              ].map(([label, val, icon]) => (
                <div key={label} style={{
                  padding: "14px 16px", marginBottom: 12,
                  background: "rgba(254,243,199,0.03)",
                  border: "1px solid rgba(254,243,199,0.06)",
                  borderRadius: 8
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, opacity: 0.5 }}>{icon}</span>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                      color: "rgba(254,243,199,0.4)"
                    }}>{label}</span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(254,243,199,0.65)" }}>{val}</div>
                </div>
              ))}
            </Section>

            <Section title="The Sequence" icon="⟡" delay={300}>
              <div style={{ fontSize: 14, lineHeight: 2, color: "rgba(254,243,199,0.55)" }}>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>1.</span> Set the space — dim lights to amber, arrange cushions</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>2.</span> Start the diffuser with your Moonlight blend</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>3.</span> Brew the Moonlight Tea or pour the mocktail</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>4.</span> Queue downtempo warmth — Khruangbin, Bonobo, FKJ</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>5.</span> Three rounds of 4-7-8 breathing</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>6.</span> Consume — the terpene pre-load is already active</div>
                <div><span style={{ color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>7.</span> Settle into soft gratitude</div>
              </div>
            </Section>
          </div>
        )}

        {/* Read */}
        {activeTab === "read" && (
          <div>
            <Section title="Narrative Priming" icon="◈" delay={100}>
              <p style={{ fontSize: 14, color: "rgba(254,243,199,0.5)", marginBottom: 20, fontStyle: "italic" }}>
                Five pieces of original writing tuned to Moonlight's terpene voice — slow, surrendering, body-aware. 
                Each maps to a specific moment in the experience timeline.
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                {PIECES.map(p => (
                  <button key={p.id} onClick={() => setReadPiece(p.id)} style={{
                    background: readPiece === p.id ? "rgba(254,243,199,0.08)" : "transparent",
                    border: `1px solid ${readPiece === p.id ? "rgba(254,243,199,0.2)" : "rgba(254,243,199,0.08)"}`,
                    borderRadius: 6, padding: "6px 12px", cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                    letterSpacing: 1, textTransform: "uppercase",
                    color: readPiece === p.id ? "#fef3c7" : "rgba(254,243,199,0.35)",
                    transition: "all 0.3s ease"
                  }}>{p.icon} {p.label}</button>
                ))}
              </div>
            </Section>

            {readPiece === "prose" && (
              <Section title={NARRATIVE.prose.title} icon="◈" delay={200}>
                <div style={{
                  fontSize: 10, color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: 1, marginBottom: 16, textTransform: "uppercase"
                }}>{NARRATIVE.prose.timing}</div>
                <div style={{
                  fontSize: 16, lineHeight: 1.9, color: "rgba(254,243,199,0.7)",
                  fontStyle: "italic", fontWeight: 300
                }}>{NARRATIVE.prose.text}</div>
              </Section>
            )}

            {readPiece === "sonnet" && (
              <Section title={NARRATIVE.sonnet.title} icon="❋" delay={200}>
                <div style={{
                  fontSize: 10, color: "#8fa8c8", fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: 1, marginBottom: 16, textTransform: "uppercase"
                }}>{NARRATIVE.sonnet.timing}</div>
                <div style={{ fontSize: 16, lineHeight: 2, color: "rgba(254,243,199,0.7)", fontWeight: 300 }}>
                  {NARRATIVE.sonnet.lines.map((line, i) => (
                    <div key={i} style={{ minHeight: line === "" ? 16 : "auto" }}>{line}</div>
                  ))}
                </div>
              </Section>
            )}

            {readPiece === "haiku" && (
              <Section title={NARRATIVE.haiku.title} icon="◉" delay={200}>
                <div style={{
                  fontSize: 10, color: "#d4a0c0", fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: 1, marginBottom: 20, textTransform: "uppercase"
                }}>{NARRATIVE.haiku.timing}</div>
                {NARRATIVE.haiku.breaths.map((breath, i) => (
                  <div key={i} style={{
                    marginBottom: 28, padding: "16px 20px",
                    background: "rgba(254,243,199,0.03)",
                    border: "1px solid rgba(254,243,199,0.06)",
                    borderRadius: 8
                  }}>
                    <div style={{
                      fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
                      letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
                      color: i === 0 ? "#7ec8a0" : i === 1 ? "#8fa8c8" : "#d4a0c0"
                    }}>{breath.phase}</div>
                    <div style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(254,243,199,0.75)", fontWeight: 300, fontStyle: "italic" }}>
                      {breath.lines.map((line, j) => <div key={j}>{line}</div>)}
                    </div>
                  </div>
                ))}
              </Section>
            )}

            {readPiece === "ode" && (
              <Section title={NARRATIVE.ode.title} icon="⟡" delay={200}>
                <div style={{
                  fontSize: 10, color: "#c4956a", fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: 1, marginBottom: 16, textTransform: "uppercase"
                }}>{NARRATIVE.ode.timing}</div>
                <div style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(254,243,199,0.7)", fontWeight: 300 }}>
                  {NARRATIVE.ode.stanzas.map((stanza, i) => (
                    <div key={i} style={{ marginBottom: 20 }}>
                      {stanza.map((line, j) => <div key={j}>{line}</div>)}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {readPiece === "story" && (
              <Section title={NARRATIVE.story.title} icon="◇" delay={200}>
                <div style={{
                  fontSize: 10, color: "#7ec8a0", fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: 1, marginBottom: 16, textTransform: "uppercase"
                }}>{NARRATIVE.story.timing}</div>
                <div style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(254,243,199,0.65)", fontWeight: 300 }}>
                  {NARRATIVE.story.paragraphs.map((p, i) => {
                    const isShort = p.length < 60;
                    const isJournal = p.startsWith("What does") || p.startsWith("My body is grateful") || p.startsWith("She paused");
                    return (
                      <div key={i} style={{
                        marginBottom: isShort ? 12 : 18,
                        fontStyle: isJournal ? "italic" : "normal",
                        color: isJournal ? "rgba(254,243,199,0.5)" : undefined,
                        paddingLeft: isJournal ? 16 : 0,
                        borderLeft: isJournal ? "1px solid rgba(254,243,199,0.1)" : "none"
                      }}>{p}</div>
                    );
                  })}
                </div>
              </Section>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 40, paddingTop: 20,
          borderTop: "1px solid rgba(254,243,199,0.06)",
          fontSize: 10, color: "rgba(254,243,199,0.2)",
          fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1
        }}>
          SOLFUL SESSIONS · TERPENE VIBE CURATION · {d.farm.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

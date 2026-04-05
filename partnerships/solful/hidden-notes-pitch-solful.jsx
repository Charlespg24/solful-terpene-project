import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const C = {
  forest: "#1A2E1A",
  green: "#2D5A27",
  sunGold: "#D4A017",
  gold: "#C4A35A",
  terra: "#B07D62",
  cream: "#F5F0E8",
  white: "#FFFFFF",
  sage: "#6B7B6B",
  pinene: "#2D5A27",
  linalool: "#7B68AE",
  myrcene: "#B87333",
  caryo: "#8B2252",
  limonene: "#D4A017",
};

const SparklesIcon = ({ color = C.gold, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

function TitleSlide() {
  const blobs = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    w: Math.floor(Math.random() * 200 + 50),
    h: Math.floor(Math.random() * 200 + 50),
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    c: i % 3 === 0 ? C.sunGold : i % 3 === 1 ? C.green : C.terra,
  })), []);
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, position: "relative", overflow: "hidden", padding: "40px 32px" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        {blobs.map((b, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", width: b.w, height: b.h, left: `${b.x}%`, top: `${b.y}%`, background: b.c, opacity: 0.15, filter: "blur(40px)" }} />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.sage, letterSpacing: "0.2em", marginBottom: 24 }}>A PROPOSAL FOR</p>
        <h1 style={{ fontSize: 56, fontFamily: "Georgia, serif", color: C.sunGold, letterSpacing: "0.12em", margin: "0 0 12px 0", fontWeight: "bold" }}>SOLFUL</h1>
        <div style={{ width: 80, height: 1, background: C.sunGold, opacity: 0.6, margin: "0 auto 24px auto" }} />
        <p style={{ fontSize: 24, fontFamily: "Georgia, serif", color: C.cream, margin: "0 0 8px 0" }}>Hidden Notes</p>
        <p style={{ fontSize: 16, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, margin: "0 0 32px 0" }}>A Terpene Dining Experience at Bistro Caché</p>
        <p style={{ fontSize: 11, color: C.sage, letterSpacing: "0.2em" }}>4/20 WEEK 2026 — PRESENTED BY CHUCK & FLO</p>
      </div>
    </div>
  );
}

function QuestionSlide() {
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, padding: "40px 32px" }}>
      <div style={{ maxWidth: 640, textAlign: "center" }}>
        <p style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.cream, lineHeight: 1.4, margin: "0 0 12px 0" }}>What if a dinner could teach people</p>
        <p style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.cream, lineHeight: 1.4, margin: "0 0 12px 0" }}>more about cannabis</p>
        <p style={{ fontSize: 40, fontFamily: "Georgia, serif", color: C.sunGold, fontStyle: "italic", lineHeight: 1.4, margin: "0 0 24px 0" }}>than any dispensary visit?</p>
        <div style={{ width: 64, height: 1, background: C.sunGold, opacity: 0.4, margin: "32px auto" }} />
        <p style={{ fontSize: 16, color: C.sage, lineHeight: 1.7 }}>
          Not by talking about cannabis at the table. But by letting guests taste, smell, and feel the same <span style={{ color: C.sunGold }}>terpenes</span> that shape every strain you sell — through world-class French cuisine, craft cocktails, and essential oil aromatherapy. Then sending them to Solful knowing exactly what to ask for.
        </p>
      </div>
    </div>
  );
}

function RevolutionSlide() {
  const items = [
    { title: "Leafly dropped Indica/Sativa", desc: "The world's largest cannabis platform abandoned the indica/sativa framework in favor of terpene-based classification. They know the future is flavor, not category." },
    { title: "Emerald Cup judges on terpenes", desc: "Cannabis industry's most prestigious competition now evaluates entries on terpene profiles — not just THC content. The best growers already know this." },
    { title: "Consumers are getting smarter", desc: "Educated customers ask for terpene profiles, not just strain names. They want to understand why one strain relaxes and another energizes." },
    { title: "Solful is already ahead", desc: "Your Health & Happiness consultations, your sun-grown curation, your \"Meet the Farmer\" events — you've been building toward terpene-first education. Hidden Notes takes it to the table." },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.cream, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.forest, textAlign: "center", margin: "0 0 8px 0" }}>The Industry Is Moving</h2>
        <p style={{ fontSize: 16, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 40px 0" }}>From THC percentages to terpene profiles</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: 20, borderRadius: 8, background: C.white }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: C.forest, margin: "0 0 8px 0" }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: 16, borderRadius: 8, background: C.forest }}>
          <p style={{ fontSize: 14, fontFamily: "Georgia, serif", color: C.sunGold, margin: 0 }}>Hidden Notes makes terpene education experiential — and positions Solful at the center of it.</p>
        </div>
      </div>
    </div>
  );
}

function ConceptSlide() {
  const courses = [
    { num: "I", name: "The Awakening", terpene: "α-Pinene", color: C.pinene, aroma: "Pine, Rosemary", dish: "Salmon Gravlax, Fennel" },
    { num: "II", name: "The Bloom", terpene: "Linalool", color: C.linalool, aroma: "Lavender, Tarragon", dish: "Petrale Sole, Tarragon" },
    { num: "III", name: "The Heart", terpene: "Myrcene", color: C.myrcene, aroma: "Lemongrass, Thyme", dish: "Mushroom Vol-Au-Vent" },
    { num: "IV", name: "The Spice", terpene: "β-Caryophyllene", color: C.caryo, aroma: "Black Pepper, Clove", dish: "Hanger Steak, Pepper Sauce" },
    { num: "V", name: "The Glow", terpene: "Limonene", color: C.limonene, aroma: "Lemon, Orange", dish: "Pistachio Crème Brûlée" },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.cream, textAlign: "center", margin: "0 0 8px 0" }}>The Experience</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 32px 0" }}>Five courses. Five terpenes. Each paired with food, cocktail, essential oil diffusion, and music.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {courses.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 16, fontFamily: "Georgia, serif", flexShrink: 0 }}>{c.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <h3 style={{ fontSize: 16, fontFamily: "Georgia, serif", color: C.cream, margin: 0 }}>{c.name}</h3>
                  <span style={{ fontSize: 11, color: c.color }}>{c.terpene}</span>
                </div>
                <p style={{ fontSize: 11, color: C.sage, margin: "2px 0 0 0" }}>{c.aroma}</p>
              </div>
              <p style={{ fontSize: 13, color: C.cream, opacity: 0.85, textAlign: "right", margin: 0 }}>{c.dish}</p>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 14, borderRadius: 8, background: "rgba(196,163,90,0.12)", borderLeft: `3px solid ${C.gold}` }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <SparklesIcon color={C.forest} size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16, fontFamily: "Georgia, serif", color: C.gold, margin: 0 }}>The Return — Herbal Tea</h3>
              <p style={{ fontSize: 11, color: C.sage, margin: "2px 0 0 0" }}>All five terpenes reunited in one cup. Tasting cards revealed.</p>
            </div>
            <p style={{ fontSize: 13, color: C.gold, opacity: 0.85, textAlign: "right", margin: 0 }}>Custom Blend</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerSlide() {
  const whyItems = [
    "1.5 blocks away — guests literally walk from dinner to your door",
    "Flo and Simon are already part of the Inner Sunset community your customers love",
    "Fine dining audience = higher-value, education-hungry customers",
    "The terpene education at dinner pre-qualifies them before they walk into Solful",
    "The dishes already use terpene-rich ingredients — this isn't forced, it's natural",
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.cream, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <p style={{ fontSize: 11, color: C.sunGold, letterSpacing: "0.15em", textAlign: "center", margin: "0 0 8px 0" }}>THE VENUE</p>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.forest, textAlign: "center", margin: "0 0 8px 0" }}>Bistro Caché Is On Board</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 32px 0" }}>1235 9th Ave — 1.5 blocks from your front door</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ padding: 20, borderRadius: 8, background: C.white, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: C.forest, margin: "0 0 10px 0" }}>Who They Are</h3>
              <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.5, margin: "0 0 10px 0" }}>Florent Thomas and Simon Mounier — French expats who trained together at Pierre Gagnaire in Bordeaux (2 Michelin Stars). They opened Caché in the Inner Sunset and quickly became a neighborhood gem.</p>
              <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.5, margin: 0 }}>Simon runs the kitchen. Flo runs the floor, the cocktail program, and the business. Most of your staff already knows them.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 8, background: C.white }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: C.forest, margin: "0 0 10px 0" }}>Proven Format</h3>
              <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.5, margin: 0 }}>Their Valentine's Day prix fixe ($110/person) and Thanksgiving prix fixe both packed the house from noon to close at 10:30. They know how to run a high-touch, high-demand event.</p>
            </div>
          </div>
          <div style={{ padding: 20, borderRadius: 8, background: C.forest }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.sunGold, margin: "0 0 16px 0" }}>Why This Works for You</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {whyItems.map((text, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.sunGold, marginTop: 6, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: C.cream, opacity: 0.9, margin: 0, lineHeight: 1.4 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneySlide() {
  const steps = [
    { step: "1", title: "The Dinner", desc: "Guests experience five courses, each built around a terpene. They taste it in the food, smell it in the air, feel the mood shift in the music. They learn what pinene, linalool, myrcene, caryophyllene, and limonene actually do — through their senses.", color: C.green },
    { step: "2", title: "The Reveal", desc: "During the herbal tea finale, tasting cards are flipped. The back of each card names the Solful strain that shares that course's terpene profile. Guests realize: that calming lavender course is the same terpene in Lavender Kush — available at Solful, 1.5 blocks away.", color: C.sunGold },
    { step: "3", title: "The Visit", desc: "Guests arrive at Solful already speaking the language. They don't ask for \"something relaxing\" — they ask for strains high in linalool. Your Health & Happiness consultants can go deeper, faster.", color: C.terra },
    { step: "4", title: "The Relationship", desc: "These aren't one-time visitors. They're educated customers who understand terpene profiles and will return for specific strains. They tell friends. They share tasting cards on social media. They become the kind of customer Solful was built for.", color: C.gold },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, padding: "40px 32px" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.cream, textAlign: "center", margin: "0 0 8px 0" }}>The Customer Journey</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 36px 0" }}>From dinner to dispensary — naturally</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {steps.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: 18, borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontSize: 18, fontFamily: "Georgia, serif", flexShrink: 0 }}>{item.step}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: item.color, margin: "0 0 6px 0" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: C.cream, opacity: 0.85, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolfulRoleSlide() {
  const brings = [
    { label: "Strain Selection", desc: "5 featured strains matched to each course's terpene profile — curated from your sungrown collection" },
    { label: "Customer List", desc: "Invite your VIP customers and \"Meet the Farmer\" community for the soft launch events" },
    { label: "Brand Presence", desc: "Solful branding on tasting cards, table materials, and the take-home terpene profile cards" },
    { label: "Staff Expertise", desc: "A Solful representative at each event for the tea-time Q&A — your Health & Happiness consultants shine here" },
  ];
  const gets = [
    { label: "Educated Foot Traffic", desc: "Guests arrive pre-educated on terpenes and specifically asking for your featured strains by name" },
    { label: "Press & Brand Positioning", desc: "First terpene-paired dining in SF — SFGate, Eater, Leafly coverage positions Solful at the frontier" },
    { label: "Premium Customer Acquisition", desc: "Fine dining audience = higher spending, more discerning, loyalty-prone customers" },
    { label: "Community Deepening", desc: "Your existing customers experience Solful's philosophy in a completely new way — deepening brand loyalty" },
    { label: "Content & Social", desc: "Beautiful, shareable experience generates organic social media content featuring Solful strains" },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.cream, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.forest, textAlign: "center", margin: "0 0 8px 0" }}>What We're Asking For</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 32px 0" }}>Solful's contribution — and what you get back</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ padding: 20, borderRadius: 8, background: C.white }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.forest, margin: "0 0 16px 0" }}>Solful Brings</h3>
            {brings.map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.green, margin: "0 0 4px 0" }}>{item.label}</p>
                <p style={{ fontSize: 11, color: C.sage, lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: 20, borderRadius: 8, background: C.forest }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: C.sunGold, margin: "0 0 16px 0" }}>Solful Gets</h3>
            {gets.map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.sunGold, margin: "0 0 4px 0" }}>{item.label}</p>
                <p style={{ fontSize: 11, color: C.cream, opacity: 0.8, lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OpportunitySlide() {
  const stats = [
    { value: "$150–175", label: "PER PERSON", desc: "5-course prix fixe, cocktails, essential oil experience, tasting cards" },
    { value: "2–4", label: "EVENTS", desc: "Soft launch across 4/20 week. Intimate, exclusive, invite-first." },
    { value: "First", label: "IN SAN FRANCISCO", desc: "Nobody has done terpene-paired cannabis dining. The press writes itself." },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.cream, textAlign: "center", margin: "0 0 8px 0" }}>The Opportunity</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 32px 0" }}>4/20 Week 2026 — April 15–20</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
          {stats.map((item, i) => (
            <div key={i} style={{ padding: 18, borderRadius: 8, background: "rgba(255,255,255,0.06)", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontFamily: "Georgia, serif", color: C.sunGold, margin: "0 0 4px 0" }}>{item.value}</p>
              <p style={{ fontSize: 9, fontWeight: 700, color: C.sunGold, letterSpacing: "0.12em", margin: "0 0 10px 0" }}>{item.label}</p>
              <p style={{ fontSize: 11, color: C.cream, opacity: 0.8, lineHeight: 1.4, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: 16, borderRadius: 8, background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: C.cream, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: C.sunGold }}>Why 4/20:</span> It's the biggest moment in cannabis culture — and the one day nobody needs convincing to try something new. But instead of the typical 4/20 discount or party, Solful shows up with a Michelin-caliber terpene dining experience. That's a statement.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: C.sunGold, margin: "0 0 8px 0" }}>Press Potential</h3>
            <p style={{ fontSize: 11, color: C.cream, opacity: 0.8, lineHeight: 1.4, margin: 0 }}>SFGate, Eater SF, SF Chronicle, Leafly, Weedmaps, HighTimes, local food blogs. The angle: "Dispensary partners with French bistro for terpene-paired 4/20 dining."</p>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: "rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: C.sunGold, margin: "0 0 8px 0" }}>Beyond 4/20</h3>
            <p style={{ fontSize: 11, color: C.cream, opacity: 0.8, lineHeight: 1.4, margin: 0 }}>If the soft launch works, this becomes recurring — monthly terpene dinners, seasonal menus, private events. A permanent partnership that scales naturally.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnersSlide() {
  const partners = [
    { name: "Solful", role: "The Authority", color: C.green, items: ["Strain curation & terpene expertise", "Customer base & VIP invites", "Health & Happiness consultation", "Brand credibility & press weight", "Post-dinner dispensary experience"] },
    { name: "Caché", role: "The Stage", color: C.terra, items: ["Simon's terpene-paired courses", "Flo's matched cocktail program", "Intimate venue & service", "Proven prix fixe track record", "Wine program for optional pairing"] },
    { name: "Chuck", role: "The Thread", color: C.gold, items: ["Terpene science & research", "Essential oil blend creation", "Experience design & flow", "Playlist curation", "Partnership coordination"] },
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.cream, padding: "40px 32px" }}>
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h2 style={{ fontSize: 36, fontFamily: "Georgia, serif", color: C.forest, textAlign: "center", margin: "0 0 8px 0" }}>The Team</h2>
        <p style={{ fontSize: 14, fontFamily: "Georgia, serif", fontStyle: "italic", color: C.sage, textAlign: "center", margin: "0 0 32px 0" }}>Three partners, one language</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {partners.map((p, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: "hidden", background: C.white }}>
              <div style={{ padding: 14, background: p.color }}>
                <h3 style={{ fontSize: 18, fontFamily: "Georgia, serif", color: C.white, margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", margin: 0 }}>{p.role}</p>
              </div>
              <div style={{ padding: 16 }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, marginTop: 5, flexShrink: 0 }} />
                    <p style={{ fontSize: 11, color: C.forest, margin: 0, lineHeight: 1.4 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingSlide() {
  const blobs = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    w: Math.floor(Math.random() * 300 + 100),
    h: Math.floor(Math.random() * 300 + 100),
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    c: [C.sunGold, C.green, C.terra, C.linalool, C.myrcene][i % 5],
  })), []);
  const steps = [
    "Menu tasting at Caché — Eli, Noah, Flo, Simon, Chuck around one table",
    "Strain matching session — pairing Solful strains to each course's terpene",
    "Tasting card design — Solful branding, strain info, QR to your site",
    "Marketing collaboration — joint announcement, press outreach, VIP invites",
  ];
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.forest, position: "relative", overflow: "hidden", padding: "40px 32px" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        {blobs.map((b, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", width: b.w, height: b.h, left: `${b.x}%`, top: `${b.y}%`, background: b.c, opacity: 0.12, filter: "blur(60px)" }} />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {[C.pinene, C.linalool, C.myrcene, C.caryo, C.limonene].map((color, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
          ))}
        </div>
        <p style={{ fontSize: 28, fontFamily: "Georgia, serif", color: C.cream, lineHeight: 1.4, margin: "0 0 12px 0" }}>You built Solful to educate people about cannabis.</p>
        <p style={{ fontSize: 28, fontFamily: "Georgia, serif", color: C.sunGold, fontStyle: "italic", lineHeight: 1.4, margin: "0 0 12px 0" }}>Hidden Notes lets them feel the education.</p>
        <p style={{ fontSize: 16, color: C.sage, margin: "0 0 40px 0" }}>Through world-class food, scent, and sound — then a 90-second walk to your door.</p>
        <div style={{ width: 64, height: 1, background: C.sunGold, opacity: 0.4, margin: "0 auto 32px auto" }} />
        <div style={{ textAlign: "left", display: "inline-block" }}>
          <p style={{ fontSize: 10, color: C.sunGold, letterSpacing: "0.15em", margin: "0 0 16px 0" }}>NEXT STEPS</p>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.sunGold, color: C.forest, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <p style={{ fontSize: 13, color: C.cream, opacity: 0.85, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, fontFamily: "Georgia, serif", color: C.sunGold, marginTop: 40 }}>Hidden Notes — Solful × Caché</p>
        <p style={{ fontSize: 11, color: C.sage, marginTop: 8 }}>4/20 Week 2026</p>
      </div>
    </div>
  );
}

const SLIDES = [TitleSlide, QuestionSlide, RevolutionSlide, ConceptSlide, PartnerSlide, JourneySlide, SolfulRoleSlide, OpportunitySlide, PartnersSlide, ClosingSlide];

export default function HiddenNotesSolfulPitch() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const navigate = useCallback((dir) => {
    const next = dir === 1 ? Math.min(current + 1, SLIDES.length - 1) : Math.max(current - 1, 0);
    if (next === current) return;
    setFade(false);
    setTimeout(() => { setCurrent(next); setFade(true); }, 150);
  }, [current]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); navigate(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  const Slide = SLIDES[current];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", transition: "opacity 150ms ease", opacity: fade ? 1 : 0 }}>
        <Slide />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", background: C.forest, borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        <button onClick={() => navigate(-1)} disabled={current === 0} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: current === 0 ? C.sage : C.cream, opacity: current === 0 ? 0.3 : 1, cursor: current === 0 ? "default" : "pointer", fontSize: 13, padding: "4px 8px" }}>
          <ChevronLeft size={16} /> Prev
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 150); }} style={{ width: 8, height: 8, borderRadius: "50%", background: i === current ? C.sunGold : C.sage, opacity: i === current ? 1 : 0.35, border: "none", cursor: "pointer", padding: 0, transition: "all 150ms" }} />
          ))}
        </div>
        <button onClick={() => navigate(1)} disabled={current === SLIDES.length - 1} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: current === SLIDES.length - 1 ? C.sage : C.cream, opacity: current === SLIDES.length - 1 ? 0.3 : 1, cursor: current === SLIDES.length - 1 ? "default" : "pointer", fontSize: 13, padding: "4px 8px" }}>
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

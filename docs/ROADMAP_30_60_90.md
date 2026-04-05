# 30-60-90 Execution Roadmap

**Date:** 2026-04-05 through 2026-07-05
**Based on:** [STRATEGIC_PRIORITIES.md](./STRATEGIC_PRIORITIES.md)
**Time budget:** ~5–10 hrs/week nights/weekends (~20–40 hrs/month)
**Assumption:** Deel AE work does not hit quota crunch. Adjust slippage if it does.

---

## NEXT 30 DAYS (April 5 – May 5, 2026)

**Goal:** Get all 5 ACCELERATE items *launched* (not perfect — launched). Generate first $300–$1,500 in revenue. File the provisional.

**Total estimated work:** ~22–28 hours. Tight at 5 hrs/week; comfortable at 8 hrs/week.

### Deliverable 1 — Email Graham Pechenik (30 minutes, this weekend)
- Draft 1-paragraph intro email: who Charles is, what he has (provisional description + 2 figures, draft BJP manuscript, business plan with 44 claims across 6 families), what he's asking (30-min consult: self-file $320 micro-entity vs. attorney-assisted filing)
- Attach: `Provisional_Patent_Description.pdf`, `Fig. 2`, `Fig. 3`
- Send to Pechenik at Calyx Law SF
- **External dependency:** Pechenik response time (typically 1–5 business days for new-client inquiries)
- **Blocks:** Everything downstream that touches the pre-loading method publicly

### Deliverable 2 — File provisional patent with USPTO (~3 hours focused, ~2 weeks calendar)
- Contingent on Pechenik's advice. If self-file: create USPTO Patent Center account, fill micro-entity declaration (Form SB/15A), upload description + figures as PDF, pay $320 filing fee
- If Pechenik engagement: sign engagement letter, pay retainer, review his claim-drafting revisions, he files
- **External dependency:** Pechenik advice OR USPTO Patent Center processing (filing receipts issued within 1 business day)
- **Success criterion:** USPTO application number in hand. Save receipt to `docs/patent/USPTO_Filing_Receipt.pdf`
- **Unblocks:** BJP article submission, public podcast launch with IP-protected claims, Solful pitch citing filed provisional

### Deliverable 3 — Order podcast Phase 0 gear + start voice clone (~3 hours work, 2-week async timer)
- Buy Samson Q2U mic on Amazon ($70, 2-day ship)
- Sign up: ElevenLabs Creator ($22/mo), Buzzsprout ($12/mo), Auphonic (free tier)
- Record 45–60 min voice cloning samples in a closet (read from Episode 01 script + Solful pitch doc for topical consistency)
- Upload to ElevenLabs, submit for Professional Voice Cloning
- **External dependency:** Amazon shipping (~2 days), ElevenLabs clone processing (2–6 hr async, sometimes 24 hrs)
- **Success criterion:** Cloned voice generates a natural-sounding paragraph from EP01

### Deliverable 4 — Publish podcast EP01 (~4 hours work, completes by week 4)
- Generate EP01 α-Pinene audio via cloned voice (1–2 hours, iteration to fix mispronunciations)
- Process through Auphonic with Solful Sessions preset (automated, 20 min)
- Cover art: use Canva or commission $30 Fiverr (1 hour to brief or iterate)
- Write show notes: 2-paragraph summary + links to strain JSONs (30 min)
- Upload to Buzzsprout, submit feed to Spotify/Apple/Google Podcasts (1 hour)
- **External dependency:** None once Deliverable 3 is done
- **Success criterion:** EP01 live on Spotify and Apple Podcasts. RSS feed active.
- **Hold on EP01 publish until Deliverable 2 (patent filed) is done** to protect IP disclosure

### Deliverable 5 — Make + label + sell 20 Pink Rider rollerballs (~5 hours work, ~3 weeks calendar)
- Order supplies (~$300): 50 × 10ml amber glass roller bottles, FCO, argan oil, missing essential oils from the SKU plan, label paper
- Follow `rollerball_body_oil_planning.md` Pink Rider recipe (9-drop formula, 2.5% dilution)
- Make 20 units in one Saturday session (~90 min)
- Design label in Canva: strain name, terpene profile, ingredients, batch #, "handmade by Solful Sessions" (1 hour)
- Print labels on sticker paper, apply (~30 min)
- Write 1-page ingredient/disclosure card (~30 min)
- Sell 10 units at $28 to personal network via LinkedIn/Instagram/in-person
- **External dependency:** Amazon/supplier shipping (~3–5 days)
- **Success criterion:** 10 units sold = $280 revenue, real customer feedback

### Deliverable 6 — Deploy Vibe Curator static demo (~3 hours work, 1 weekend)
- Local check: `cd apps/vibe-curator && npm install && npm run dev` — confirm it still runs at localhost:3001
- Decide between `VibeCurator.jsx` and `VibeCurator_v2.jsx`. Move the unchosen one to `apps/vibe-curator/archive/`
- Create Vercel account, deploy with `vercel --prod` (free tier)
- Test all 24 strain pages load correctly on live URL
- Add footer: "Terpene science research project. Patent pending." (once patent filed — until then, omit that line)
- Add a simple email-capture "Early access" form (Formspree free tier, 30 min)
- **External dependency:** None
- **Success criterion:** Live URL (e.g., vibe-curator.vercel.app) that renders 24 strains. Share in Solful pitch and podcast show notes.
- **Strictly out of scope:** Spotify OAuth, Stripe, subscription, session arc, forest-bathing integration

### Deliverable 7 — Lock La Séance v1 date with Flo & Simon (~2 hours work, ~2 weeks calendar)
- Text/email Flo + Simon: "Ready to lock v1 (5-course prix fixe, 20–40 guests). Is Thu 4/16 or Sat 4/18 realistic? If Q2 is too tight, target 7/20/2026 instead."
- If 4/20 week works: finalize menu + pricing ($95 flat OR $75 GA / $150 VIP per business plan) + confirm revenue share with Caché
- Create Eventbrite or Partiful listing with 1-paragraph event description (1 hour)
- Draft 3-post comms sequence for LinkedIn + Instagram (1 hour)
- **External dependency:** Flo & Simon availability and comms responsiveness
- **Success criterion:** Event date + venue + ticket link live

### Stretch (only if time allows) — Beverage recipe PDF on Gumroad (~2 hours)
- Use existing `Solful_Sessions___Terpene_Beverage_Recipe_Book.pdf`
- Price at $19.99, write 1-paragraph product description
- Announce on LinkedIn (1 post)
- **Success criterion:** 5 downloads = $100 revenue

---

## DAYS 30-60 (May 5 – June 5, 2026)

**What opens up once April is done:**
- Patent filed → BJP article can be submitted, podcast can publicly describe pre-loading method
- Podcast EP01 live → download data available, can iterate on voice/pacing, sponsors/affiliates become possible (though not yet)
- Rollerballs validated → physical product to pitch Solful, reorder flow established
- Vibe Curator URL live → can reference in every pitch, proposal, LinkedIn post
- La Séance date locked → ticket sales and marketing push begin

**Goal:** Build on the April foundation. First Solful conversation. Podcast cadence. Second revenue waves.

**Total estimated work:** ~20–25 hours.

### Deliverable 8 — Submit BJP Article 1 (~3 hours work)
- Unblocked because provisional is now filed
- Final pass on `bjp_complete_submission.docx` — verify references, check for accidental method-disclosure text beyond what provisional covers
- Format per BJP submission guidelines (title page, abstract, figures, declarations including IP disclosure footer referencing provisional application number)
- Submit via BJP online portal
- **External dependency:** BJP editorial system
- **Success criterion:** BJP submission confirmation email received

### Deliverable 9 — Publish Podcast EP02 β-Caryophyllene (~4 hours, biweekly cadence)
- Same pipeline as EP01: generate audio → Auphonic → Buzzsprout
- Show notes link to Pink Rider rollerball product page (β-caryophyllene is 22% of Pink Rider's terpene profile)
- **Target publish date:** ~week 6 (mid-May)

### Deliverable 10 — Publish Podcast EP03 d-Limonene (~4 hours)
- Same pipeline
- Target publish: ~week 8 (late May / early June)
- After EP03, reassess cadence and topic selection for EP04+

### Deliverable 11 — First Solful pitch meeting (~3 hours prep + 1 hour meeting)
- Request 30-min meeting with Eli and/or Noah
- Bring: 2 Pink Rider rollerball samples (one for each), Vibe Curator demo URL, 1-page rollerball SKU sheet with wholesale pricing, business plan excerpt (rollerball Line 1 section)
- Ask: 10-unit consignment trial at Solful SF OR 50-unit wholesale PO at $12–15/unit
- **External dependency:** Eli/Noah calendar availability
- **Success criterion:** Either a PO, a consignment arrangement, or a clear "not yet, here's what would change that"

### Deliverable 12 — Rollerball batch #2 (50 units, 2–3 SKUs) (~4 hours work)
- Reorder supplies using April learnings (better oil suppliers, improved labels)
- Make 20 × Pink Rider + 15 × Mule Fuel + 15 × Carambola = 50 units
- New labels with "Patent pending (US Provisional [App #])"
- **Success criterion:** 25 additional units sold = ~$700 more revenue

### Deliverable 13 — La Séance ticket sales push (~4 hours, distributed across month)
- Weekly LinkedIn + Instagram post about the event
- Ask podcast listeners in EP02 / EP03 show notes to sign up
- Direct outreach to ~20 people in network who might attend
- **Success criterion:** 15–25 tickets sold (75% of capacity)
- **Contingency:** If sales lag, consider free-ticket invites to 5 "influential" attendees who'll post about it

### Deliverable 14 — Book 2 paid consulting sessions (~4 hours work + session time)
- Create Calendly link at $175/60-min
- Post 1 LinkedIn thread on terpene pre-loading with a "book a consult" CTA
- **Success criterion:** 2 sessions booked = $350 revenue + real user data

---

## DAYS 60-90 (June 5 – July 5, 2026)

**What "launched" looks like by July 5:**

| Workstream | "Launched" means | Target metric |
|---|---|---|
| **Patent** | USPTO application # in hand. BJP submitted with IP disclosure. | 1 filed provisional |
| **Podcast** | 3 episodes live on Spotify + Apple. Cadence established. | 100+ total downloads across 3 episodes |
| **Products** | Pink Rider + at least 1 other SKU in market. First wholesale arrangement. | 40+ units sold, 1 Solful pilot running OR explicit next-steps |
| **App** | Static demo URL shared in 10+ pitches / posts | 200+ unique visitors, 20+ email signups |
| **Events** | La Séance v1 either executed successfully OR rescheduled intentionally to Q3 with tickets on sale | 20+ confirmed attendees OR Q3 date + 10 early tickets |
| **Revenue** | First multi-source revenue month | $1K+ in June alone |

**Goal:** Move from "launched" to "gaining traction." Metrics start telling Charles whether to double down or pivot.

**Total estimated work:** ~20–25 hours.

### Deliverable 15 — Execute La Séance v1 event (if 4/20 week was locked) (~8 hours execution week)
- Event week: final menu tasting, rollerball prep (gift bag for each guest), diffuser placement, tasting card printing, music playlist, arrival checklist
- Event night: co-host with Flo + Simon, 20-min pre-loading protocol walkthrough, deliver science narrative between courses
- Post-event: 3-week follow-up survey to attendees (what worked, buy rollerballs afterward?)
- **Success criterion:** Event happens. Net revenue $2K–$5K. 5+ rollerball follow-on sales. 10+ social posts from attendees.

**OR (if date moved to 7/20):** Continue ticket sales push. Q3 target gives more lead time and potentially higher attendance.

### Deliverable 16 — Publish Podcast EP04 + EP05 (~8 hours)
- Decide cadence: continue biweekly or shift to monthly based on EP01–03 download data
- EP04 topic options: Linalool (lavender + rose + coriander — strongest sleep/anxiety evidence), or myrcene (most abundant in cannabis + lemongrass + hops)
- EP05: Either continue Type A terpene deep-dives OR switch to Type B strain profile (Mike's Bomba is the designated EP10 per framework, but could pull forward)
- **Success criterion:** 5 episodes in library by July 5. Measurable download trend (growing? flat? declining?)

### Deliverable 17 — First Solful wholesale PO fulfilled OR clear "no" (~6 hours)
- If May pitch succeeded: manufacture 50–100 units per Solful's requested SKUs, deliver, track sell-through
- If May pitch stalled: iterate approach — maybe Solful wants a consignment model first, or a different SKU mix, or wants to test in Sebastopol before SF
- **Success criterion:** A Solful relationship with clear commercial terms, even if the answer is "let's pilot in Q4"

### Deliverable 18 — Consulting business hits rhythm (~4 hours + session time)
- Target: 4 paid sessions in June
- Start documenting patterns in a private note: what protocols do clients respond to, what gets them to buy a rollerball
- **Success criterion:** $700 in June consulting revenue, 1–2 repeat bookings

### Deliverable 19 — Review and course-correct (~3 hours, late June)
- Pull 60 days of data: podcast downloads, rollerball sales, app traffic, consulting bookings, event attendance
- Compare against the Q1 business-plan Year 1 band ($150K–$400K) and the REVENUE_PATH honest band ($10K–$50K)
- Decide for Q3:
  - Which ACCELERATE items are pulling their weight?
  - Is the podcast worth continuing at $34+/month in tooling costs?
  - Is the Vibe Curator demo generating any useful signal?
  - Does Solful want a real partnership or a polite brushoff?
- **Success criterion:** Written Q3 plan with explicit keep/kill/double-down decisions

---

## Metrics Dashboard (track these monthly)

### Leading indicators (what tells you it's working before revenue does)
- Podcast downloads per episode (growing week-over-week?)
- App demo URL unique visitors (growing? bounce rate? time on page?)
- Email-list signups (growing? from what channel?)
- LinkedIn engagement on terpene posts
- Rollerball repeat purchases / referrals

### Lagging indicators (revenue + outcomes)
- Monthly revenue by stream (rollerballs, consulting, event, recipe PDF, wholesale)
- Units sold per SKU
- Consulting session count + repeat rate
- Wholesale POs received / fulfilled
- Ticket sales against capacity

### Red flags
- Podcast downloads <50 per episode after 3 episodes → evaluate cadence/topic/format
- Rollerballs: 0 repeat buyers from first 20 customers → formula or price problem
- La Séance tickets: <50% sold 4 weeks out → price or concept problem
- Pechenik not responding after 2 weeks → self-file, don't wait
- Deel quota crunch eating >15 hrs/week → cut April deliverables to top 3 only

### Green flags
- 1 unsolicited podcast review or DM asking for more episodes
- Any rollerball customer unprompted-ly asks "do you have other SKUs?"
- Solful asks for exclusive/custom formulation
- Charles gets tagged in a terpene discussion on LinkedIn
- Someone asks to pay for the Vibe Curator app before it has features

---

## The Three Questions to Answer by July 5

1. **Is there a real market?** (Evidence: repeat rollerball buyers, consulting repeat rate, podcast subscribers, Solful interest)
2. **Is the podcast the right discovery channel?** (Evidence: downloads → email signups → product sales attribution)
3. **Can this scale on nights/weekends, or does it require Charles full-time?** (Evidence: hours spent vs. revenue generated vs. Deel performance)

If answers are yes/yes/yes-nights-and-weekends: keep going, maybe add a contractor in Q3.
If answers are yes/no: kill the podcast, double down on rollerballs + La Séance + consulting.
If answers are no/no/no: park the project, preserve the IP, focus on Deel.

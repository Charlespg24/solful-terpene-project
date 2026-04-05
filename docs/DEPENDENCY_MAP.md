# Dependency Map & Critical Path

**Date:** 2026-04-05
**Scope:** Cross-workstream dependencies + single critical path
**Companion to:** [PROJECT_AUDIT.md](./PROJECT_AUDIT.md), [STRATEGIC_PRIORITIES.md](./STRATEGIC_PRIORITIES.md)

> ⚠️ **CORRECTION (2026-04-05):** The original "Single Most Time-Sensitive Dependency" section below was built on two wrong assumptions:
> 1. ~~BJP article was submitted Feb 16, 2026~~ — **NOT submitted. Still a draft.**
> 2. ~~Provisional patent was filed ~Mar 12, 2026~~ — **NOT filed. No USPTO receipt.**
>
> With the corrected baseline (nothing submitted, nothing filed, nothing public), **the critical path inverts completely**. There is no BJP-publication clock, no 12-month utility conversion deadline yet, no prior-art disclosure risk — because no disclosure has happened.
>
> **The revised #1 priority is:** File the provisional patent ($320 micro-entity) BEFORE submitting any article, publishing any podcast episode, or publicly disclosing the pre-loading method. See [STRATEGIC_PRIORITIES.md](./STRATEGIC_PRIORITIES.md) ACCELERATE #1.
>
> The parallel-paths diagram, gap analyses for podcast/app/Solful pitch/academic further down this document are still valid. The critical-path logic above is obsolete and preserved below only for reference.

---

## ~~The Single Most Time-Sensitive Dependency~~ [OBSOLETE — see correction above]

> ~~**Engage Graham Pechenik and clarify the BJP/patent timeline — this week.**~~

~~**Why this is #1 (cascades into 4 other workstreams):**~~

~~The BJP article was **submitted Feb 16, 2026**. The provisional patent was **filed ~Mar 12, 2026** (based on file dates in `docs/patent/`).~~ *[Both claims false — see correction banner.]*

The corrected urgency: **file the provisional first, then submit the BJP article, then launch the podcast, then do everything else.** The sequence is still controllable because nothing has gone public. That advantage disappears the moment Charles submits an article, publishes an episode, or posts publicly about pre-loading.

**What's still true from the original analysis below:**
- The BJP article, if published before the provisional is filed, would compromise international patent rights (most ex-US jurisdictions have no inventor grace period)
- Articles 2–5 overlap with Article 1's claims and should all be held until provisional is filed
- Graham Pechenik engagement is still worth doing — but the question is now simpler: "Self-file a micro-entity provisional at $320, or pay attorney fees for better claim drafting?"

---

## Detailed Dependency Analysis

### 1. Patent filing — what's done, what's missing

**Done** (in `docs/patent/`, filed ~Mar 12, 2026):
- `Provisional_Patent_Description.pdf` — claims + abstract, Docket CPG-2026-PROV-003
- `Fig. 2 — Terpene → Audio Matrix` — terpene-to-audio mapping
- `Fig. 3 — Worked Example` — step-by-step strain example

**Missing:**
- Figs 4, 5, 6 (not drafted)
- Attorney engagement (Graham Pechenik, Calyx Law — candidate, not engaged)
- Full utility application
- International filing strategy (PCT? National phase where?)

**BJP publication risk matrix:**

| Scenario | Impact |
|---|---|
| Provisional covers everything BJP discloses | Low risk — 12-month US clock is only constraint |
| BJP discloses additional embodiments beyond provisional | **High risk** — ex-US rights on those embodiments may already be compromised |
| BJP publishes before utility filing (Sep 2026 most likely) | Utility must cite provisional for priority; no new matter can be added without losing priority on added matter |
| Utility not filed by Mar 12, 2027 | Priority date lost; all downstream rights fall back to utility filing date |

**What the owner should verify with attorney (before trusting any of the above):** Does the provisional's claim language actually cover the Vibe Curator audio-matching method, or only the pre-loading protocol? These may be separable inventions requiring separate filings.

---

### 2. Podcast launch — are EP01/02/03 truly ready?

**Framework compliance check** (scripts vs. `solful_sessions_production_framework.md` v2.0):

| Episode | 7-beat structure? | Cold open as sensory scene? | Evidence tiers stated? | Quotable close? | Ready? |
|---|---|---|---|---|---|
| EP01 α-Pinene | ✅ COLD OPEN → MOLECULE → SCIENCE → BRIDGE → CANNABIS → PRE-LOAD → CLOSE | ✅ "You're standing in a forest. Not metaphorically." | ✅ "strongest evidence, not most famous claim" | ✅ Circles back to forest scene | **Yes** |
| EP02 β-Caryophyllene | ✅ (29 KB script) | ✅ | ✅ | ✅ | **Yes** |
| EP03 d-Limonene | ✅ (28 KB script) | ✅ | ✅ Spindle 2024 RCT cited as landmark | ✅ | **Yes** |

**Scripts are production-ready.** The blocker is physical/operational:

| Phase 0 step | Status | Time | Cost |
|---|---|---|---|
| Buy mic (Samson Q2U $70 or Shure MV7 $250) | ⚪ Not done | Day 1 | $70–250 |
| Record voice cloning samples (30–90 min) | ⚪ Not done | Day 1–2 | $0 |
| ElevenLabs Creator signup + voice clone | ⚪ Not done | Day 2, 20 min + 2–6 hr processing | $22/mo |
| Auphonic account + preset | ⚪ Not done | Day 2, 15 min | $0–11/mo |
| Buzzsprout account | ⚪ Not done | Day 3 | $12/mo |
| Intro/outro music | ⚪ Not done | Day 3 | $17/mo (or one-time license) |
| Cover art | ⚪ Not done | Day 4 | varies |

**Total time:** 3–4 hours over 2–4 days. **Total recurring cost:** $59–76/month.

**Gap:** Zero technical work remains. Pure owner-action bottleneck. Original target (Feb 14 + 2–3 weeks) is **7 weeks overdue**.

---

### 3. Vibe Curator app — gap to working demo

**Current state (`apps/vibe-curator/`):**
- React/Vite build configured, runs at `localhost:3001`
- 24-strain seed data complete in `src/data/strains.ts` (verified in audit)
- `dist/` directory present — has been built before
- `VibeCurator.jsx` and `VibeCurator_v2.jsx` (two versions in tree)
- Session notes doc tracking next steps

**Spotify auth (`apps/spotify-auth/VibeCuratorSpotify.jsx`):**
- Full PKCE flow implemented
- Terpene → audio parameter mapping for 8 terpenes
- Iso-principle arc (baseline → target)
- **Only 12 of 24 strains mapped**

**Gap to working public demo:**

| Gap | Effort | Blocker |
|---|---|---|
| Reconcile `VibeCurator.jsx` vs `VibeCurator_v2.jsx` — pick one | 1 hour | Owner decision |
| Replace `YOUR_SPOTIFY_CLIENT_ID` placeholder | 5 min | Register app at developer.spotify.com |
| Deploy to Vercel/Netlify | 30 min | None (config exists) |
| Set Spotify redirect URI to deployed URL | 5 min | Deployment URL must exist first |
| Add remaining 12/24 strains to Spotify JSX | ~2 hours | None |
| Integrate `VibeCuratorSpotify.jsx` into Vibe Curator (not just copy) | 2–3 hours | None |
| Session arc (onset/peak/comedown) implementation | 1 day | None |
| Terpinolene paradox bimodal handling | 3 hours | None |

**Minimum viable public demo (~1 day of work):** Pick v2, register Spotify app, replace CLIENT_ID, deploy to Vercel, set redirect URI. The demo would launch with 12 strains on Spotify audio-matching + all 24 on static 15-layer profiles.

**Full-featured demo (~1 week):** + 12 remaining strains, session arc, terpinolene bimodal, forest-bathing DB integration, beer pairings.

---

### 4. Solful pitch — what exists vs. what's needed for a live pitch

**What exists in `partnerships/solful/`:**
- `solful-business-plan.md` / `.docx` / `.jsx` — full business strategy (23 KB)
- `Solful_Sessions_Complete_Guide.pdf` / `.docx` — 109 KB narrative guide
- `The Business Pitch_ Strain-Matched Aromatherapy for Solful.pdf` — investor-style deck
- `Market Validation_ The Industry Is Catching Up.pdf` — market positioning
- `hidden-notes-pitch-solful.md` / `.pdf` / `.jsx` — dinner-partnership proposal
- `solful_sessions_launch_checklist.md` — podcast operational plan
- `San_Francisco_Flower_Wall_V2_23_Mary_Roll_Solful-1.webp` — product asset

**What's needed for a live pitch to Eli & Noah:**

| Need | Status |
|---|---|
| Business plan with numbers | ✅ Exists |
| Market validation | ✅ Exists |
| Product line (essential oils, rollerballs) | 🟡 Formulations documented, 0 manufactured |
| Proof-of-concept demo (Vibe Curator) | 🟡 Local only, no live URL |
| Podcast launched with Solful co-brand | 🔴 Not launched |
| Live customer testimonial / pilot data | ⚪ No pilot run |
| Commercial terms ask (revenue share? co-branding?) | ❓ Not found in docs |
| Pricing for wholesale SKUs | 🟡 In rollerball doc but not in pitch deck |

**Gap assessment:** The *narrative* pitch is complete. The *commercial* pitch has no live proof points. A compelling pitch needs either: (a) Pink Rider rollerball in physical form to hand Eli + Noah, or (b) live Vibe Curator URL they can scan a QR code to, or (c) podcast EP01 they can listen to. **All three are blocked on owner action, not writing.**

---

### 5. Academic articles — submission readiness and timeline risk

| # | Article | Stage | Submission readiness | Timeline risk |
|---|---|---|---|---|
| 1 | BJP — terpene pre-loading | Submitted 2026-02-16 | ✅ In review | **Publication ~Summer/Fall 2026 → patent clock** |
| 2 | Pharm Reviews — unified pharmacology | Pre-sub sent 2026-02-20 | 🟡 Waiting on editor response before formal submit | Pre-sub response often 2–8 weeks — may already be overdue |
| 3 | Frontiers — pre-loading hypothesis | 8,576 / 12,000 words | 🔴 Needs +3,400 words, then build script → PDF | 100% owner-authored, no external blocker |
| 4 | Phytomedicine Plus | PDF-only draft, dated 2026-04-05 | 🔴 No DOCX, no cover letter, journal formatting uncertain | Needs ~1 week of packaging work |
| 5 | PAIN — terpene analgesia | PDF-only draft, dated 2026-04-05 | 🔴 No DOCX, no cover letter, no submission strategy | Needs ~1–2 weeks of packaging + journal targeting work |

**Publication timeline risk:** Articles 2, 3, 4, 5 all discuss terpene pre-loading or cross-botanical source independence to some degree. Each one that publishes is another public disclosure event. If any publishes material that goes beyond the provisional's claims, it compounds the patent risk identified in #1. **Attorney should review all 5 manuscripts, not just the BJP article.**

**Follow-up ask:** confirm the Feb 20 pre-submission inquiry to Pharm Reviews actually got a response. If not, Article 2 may be silently stalled.

---

## Visual ASCII Dependency Diagram — Critical Path

```
                          THE CRITICAL PATH (bold = blocks most other things)

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ★ ENGAGE GRAHAM PECHENIK (THIS WEEK)                                        │
│         │                                                                    │
│         ▼                                                                    │
│  Attorney reads: provisional + BJP ms + Articles 2-5 drafts                  │
│         │                                                                    │
│         ▼                                                                    │
│  Attorney delivers: BJP-vs-provisional scope gap analysis                    │
│         │                                                                    │
│         ├──► "Clean scope" ──► follow normal 12-mo clock (utility by         │
│         │                      Mar 2027)                                     │
│         │                                                                    │
│         └──► "Scope gap" ──► ACCELERATE: draft Figs 4-6 in 2 weeks,          │
│                              file utility BEFORE BJP publishes               │
│                                      │                                       │
│                                      ▼                                       │
│                              Unblocks international rights                   │
│                              → Unblocks Vibe Curator commercialization       │
│                              → Unblocks Solful investor pitch                │
│                              → Unblocks La Séance IP story                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘


                          THE PARALLEL PATHS (can run alongside)

┌─────────────────────────────┐   ┌──────────────────────────────┐
│  PODCAST LAUNCH (3-4 hrs)   │   │  VIBE CURATOR DEMO (1 day)   │
│                             │   │                              │
│  Buy mic                    │   │  Pick v1 or v2 JSX           │
│     │                       │   │     │                        │
│     ▼                       │   │     ▼                        │
│  ElevenLabs + Auphonic      │   │  Register Spotify app        │
│     │                       │   │     │                        │
│     ▼                       │   │     ▼                        │
│  Clone voice (2-6 hr async) │   │  Deploy to Vercel            │
│     │                       │   │     │                        │
│     ▼                       │   │     ▼                        │
│  Generate EP01 audio        │   │  Set redirect URI            │
│     │                       │   │     │                        │
│     ▼                       │   │     ▼                        │
│  Publish on Buzzsprout ─────┼───┼──► LIVE DEMO URL             │
│     │                       │   │                              │
│     └──► Solful co-market   │   └──────────────────────────────┘
│     └──► EP02/03 biweekly   │              │
│                             │              ▼
└─────────────────────────────┘   Use in Solful pitch (QR code)
              │
              ▼
     ┌──────────────────────┐
     │  LA SÉANCE DINNER    │
     │                      │
     │  Pick v1 or v2       │
     │       │              │
     │       ▼              │
     │  Lock 4/20 date      │
     │       │              │
     │       ▼              │
     │  Finalize menu       │
     │       │              │
     │       ▼              │
     │  Live podcast ep?    │
     │  (needs podcast live)│
     └──────────────────────┘


                          THE DOWNSTREAM PATHS (blocked until above resolves)

  Strain data consistency ◄── Vibe Curator deployed ──► forest-bathing in UI
                                                    ──► beer pairings in UI
                                                    ──► 23→43 strain resync

  Rollerball manufacturing ◄── Pink Rider test batch ──► 5 launch SKUs
                                                     ──► Solful wholesale pitch

  19 Layer 13 narratives ────► Future strain-episode podcasts (Type B)
                          ────► Vibe Curator richer pages

  Article 3 expand +3.4k ────► Frontiers submission
  Article 4 DOCX+letter  ────► Phytomedicine Plus submission
  Article 5 DOCX+letter  ────► PAIN submission
```

---

## Summary: What to Do First

**This week (critical):**
1. ★ Email Graham Pechenik with provisional + BJP + academic drafts. One question: scope gap?
2. Buy a mic. Start ElevenLabs voice clone (2–6 hr async processing runs in background).

**Next week (high value, low effort):**
3. Deploy Vibe Curator to Vercel with Spotify client ID → live demo URL.
4. Record + publish podcast EP01.

**Within 2 weeks:**
5. Depending on Pechenik's answer — either draft Figs 4–6 in parallel OR relax to Mar 2027 utility deadline.
6. Package Article 4 (Phytomedicine Plus) and Article 5 (PAIN) — DOCX + cover letters.

**Parked until above moves:**
- La Séance v1/v2 decision + date lock (~1 week lead)
- Pink Rider rollerball manufacturing (order oils/bottles, ~2 weeks lead)
- 19 new narratives + 95 new beverage recipes (content-generation backlog)
- Higher Heights / Glentucky / Moon Gazer pitches (no deadline pressure)

**Single most important insight:** every "science and content" output on this project is complete or nearly so. The bottleneck is entirely on **physical/commercial actions** (buy mic, deploy URL, email attorney, order oil bottles). None of these takes more than 1 day of work; all have been pending for 4–7 weeks.

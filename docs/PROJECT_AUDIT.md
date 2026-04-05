# Terpenes Project Audit

**Date:** 2026-04-05
**Purpose:** Single-source status across all 8 workstreams — what's shipped, what's blocked, what depends on what.

> ⚠️ **CORRECTION (2026-04-05):** This audit originally stated that Article 1 was submitted to BJP on 2026-02-16 and the provisional patent was filed ~2026-03-12. **Both are wrong.** No academic articles have been submitted to any journal. The provisional patent has NOT been filed (no USPTO receipt exists in `docs/patent/`; "Docket CPG-2026-PROV-003" is an internal label). All documents are internal drafts only. Nothing has been shared publicly.
>
> See [STRATEGIC_PRIORITIES.md](./STRATEGIC_PRIORITIES.md) for the corrected baseline and revised priorities. The status table below has been updated inline.

The project is in a state where **science and content are far ahead of distribution**. Six podcast episodes are scripted but unlaunched. Five academic articles are drafted but unsubmitted. The provisional patent is drafted but unfiled. The app prototype works locally but has no URL. The biggest hidden risk is a **strain-count drift** — forest-bathing DB (23 strains) ≠ strain profiles (24) ≠ beverage DB (43) — which will bite whenever these are joined.

---

## Executive Summary

**Top 3 blockers (things that can't move without a decision):**
1. **Podcast launch** — scripts ready, Phase 0 setup (mic, ElevenLabs, Buzzsprout) never executed. Launch was targeted Feb/Mar 2026; now ~7 weeks overdue.
2. **La Séance dinner** — Caché partner confirmed, but v1 (5-course prix fixe) vs. v2 (3-service festival) not chosen and 4/20 Week 2026 date not locked.
3. **Patent prosecution** — Figs 4–6 not drafted; Graham Pechenik (Calyx Law) not engaged.

**Top 3 shipped:**
1. **24 strain profiles × 15 layers** — complete and validated.
2. **6 podcast scripts + production framework** — ready to record.
3. **Article 1 (BJP) drafted** — ready to submit after patent is filed. Article 2 (Pharm Reviews) drafted, pre-submission inquiry letter prepared but not sent.

---

## Status Table

Legend: ✅ Shipped · 🟡 In Progress · 🔴 Blocked · ⚪ Not Started

| Workstream | Item | Status | Next Step | Blocker |
|---|---|---|---|---|
| **Podcast** | 6 episode scripts (EP00A, EP00B, EP01–03, Women Who Knew) | ✅ | Record EP01 | Phase 0 setup |
| Podcast | Production framework v2.0 + landscape map | ✅ | — | — |
| Podcast | `docs/podcast/research/` (pre-episode syntheses) | ⚪ | Pick next 3 terpenes | — |
| Podcast | Episodes 7+ (10 angles identified) | ⚪ | Outline | Research syntheses |
| Podcast | Launch (Phase 0: mic, ElevenLabs, Buzzsprout, Auphonic) | 🔴 | Buy mic, sign up ElevenLabs | Owner decision/action |
| **Academic** | Article 1 BJP — terpene pre-loading | 🟡 Drafted, NOT submitted | Hold until patent filed, then submit | Provisional patent filing |
| Academic | Article 2 Pharm Reviews — unified pharmacology | 🟡 Drafted, pre-sub letter NOT sent | Hold until after BJP accepted | BJP outcome + patent filing |
| Academic | Article 3 Frontiers — pre-loading hypothesis | 🟡 8,576 / 12,000 words | Expand ~3,400 words, run build script | Content expansion |
| Academic | Article 4 Phytomedicine Plus | 🟡 PDF draft only | Generate DOCX + cover letter | — |
| Academic | Article 5 PAIN — terpene analgesia | 🟡 PDF draft only | Generate DOCX + cover letter + submission strategy | — |
| **Apps** | Vibe Curator (React/Vite, 24 strains × 15 layers) | 🟡 Runs at localhost:3001 | Deploy to Vercel/Netlify | None technical |
| Apps | Spotify PKCE OAuth component | 🟡 Component ready | Set CLIENT_ID, deploy for redirect URI | Live URL |
| Apps | Spotify JSX strain coverage | 🟡 12 / 24 strains in JSX | Add remaining 12 | — |
| Apps | Solful Juice App | 🟡 Standalone JSX, no build config | Decide: standalone vs. merge to Vibe Curator | Architecture decision |
| **Patent** | Provisional description + Figs 2–3 | 🟡 Drafted, NOT filed (no USPTO receipt) | **File provisional ASAP** ($320 micro-entity) | Owner action + attorney decision |
| Patent | Figs 4–6 | ⚪ | Defer until after provisional filed | Provisional filing |
| Patent | Attorney engagement (Graham Pechenik, Calyx Law) | ⚪ | Email for self-file vs. attorney-file consult | Owner action |
| **Strains** | 24 strain profiles × 15 layers | ✅ | — | — |
| Strains | Layer 13 narratives | 🟡 5 / 24 complete | Write next 19 | — |
| **Recipes** | Beverages: 24 original strains × 5 = 120 recipes | ✅ | — | — |
| Recipes | Beverages: 19 new Solful SF strains (added Mar 14) | ⚪ | Generate 95 new recipes (19 × 5) | Terpene profiles for new strains |
| Recipes | Essential oil blends | ⚪ | Populate `recipes/essential-oil-blends/` with 24 blends | Directory empty |
| Recipes | Rollerballs: Pink Rider test batch formula | ✅ Documented | Manufacture test batch | Owner action (buy oils, bottles) |
| Recipes | Rollerballs: 5 launch SKUs | ⚪ Planned | Formulate after Pink Rider validates | Pink Rider test |
| Recipes | Beer terpene database | 🟡 JSX prototypes | Verify count / surface in UI | — |
| **Partnerships** | Solful (business plan, pitch, launch checklist) | 🟡 Materials complete, launch delayed | Execute Phase 0 | Podcast launch |
| Partnerships | Bistro Caché — La Séance dinner | 🟡 Partner confirmed, v1+v2 pitched | Choose v1 or v2, lock 4/20 Week date | Owner decision |
| Partnerships | Higher Heights (Nate Hayward) | ⚪ Empty folder | Draft pitch | — |
| Partnerships | Glentucky (Mike Benziger) | ⚪ Empty folder | Draft pitch | — |
| Partnerships | Moon Gazer Farms | ⚪ Research notes only | Draft pitch | — |
| **Forest Bathing** | 10-11 Bay Area locations + terpene profiles | ✅ | — | — |
| Forest Bathing | Strain-location matching DB | 🟡 23 / 43 strains mapped | Add 20 new strains | Strain terpene profiles |
| Forest Bathing | App integration | ⚪ | Surface in Vibe Curator | Vibe Curator deployment |

---

## Workstream Detail

### Podcast — `docs/podcast/`

**Complete & ready to ship**
- 6 episode scripts (EP00A primer, EP00B anthropological primer, EP01 α-Pinene, EP02 β-Caryophyllene, EP03 d-Limonene, Women Who Knew)
- Production framework v2.0 (7-beat architecture, 3 episode types, voice rules)
- Episode scripts index with cold opens, science, close lines
- Competitive landscape map identifying white space

**In progress**
- 10+ future episode angles identified (no outlines yet)
- Launch checklist detailed but not executed

**Stalled / blocked**
- **Launch is the blocker for everything else here.** Target was Feb 14 + 2–3 weeks = early March. Now April 5. Phase 0 (mic, ElevenLabs Creator $22/mo, Buzzsprout $12/mo, Auphonic) never started. No episode recorded.
- `docs/podcast/research/` directory is empty — pre-episode research syntheses for future episodes not done.

**Key files:** `docs/podcast/framework/solful_sessions_production_framework.md`, `docs/podcast/episodes/`, `partnerships/solful/solful_sessions_launch_checklist.md`

---

### Academic — `docs/academic/`

**Complete & drafted (ready after patent filing)**
- Article 1 (BJP, terpene pre-loading framework) — drafted, NOT submitted. Holds until provisional patent is filed to avoid IP disclosure risk.

**In progress**
- Article 2 (Pharm Reviews, unified pharmacology) — manuscript drafted; pre-submission inquiry letter prepared but NOT sent. On hold behind BJP outcome.
- Article 3 (Frontiers, pre-loading hypothesis) — 8,576 words vs. 12,000 target. Build script + sections JSON ready. Need to expand ~3,400 words then run `Article_3_build_script.py`.
- Article 4 (Phytomedicine Plus) — PDF-only draft, dated Apr 5. Needs DOCX + cover letter.
- Article 5 (PAIN, terpene analgesia) — PDF-only draft, dated Apr 5. Needs DOCX + cover letter + submission strategy.

**Stalled / blocked**
- Articles 4 and 5 have no submission package beyond the manuscript PDF — no cover letter, no DOCX, no journal-specific formatting.

**Dependencies:** Article 2 formal submission blocks on editor's response to pre-sub inquiry. Article 3 blocks on content expansion only.

**Key files:** `docs/academic/article-1-bjp/`, `docs/academic/article-2-pharm-reviews/PharmRev_Complete_Manuscript.docx`, `docs/academic/article-3-frontiers/Article_3_sections_data.json`

---

### Apps — `apps/`

**Complete & ready to ship**
- Vibe Curator strain seed: `apps/vibe-curator/src/data/strains.ts` — 2,074 lines, 24 strains × 15 layers verified, 11 terpene color mappings, 8 vibe categories.

**In progress**
- Vibe Curator React/Vite app runs locally at port 3001. Build config works (`package.json`, `vite.config.js`, `dist/` present).
- Spotify PKCE auth component (`apps/spotify-auth/VibeCuratorSpotify.jsx`, 45KB) — full PKCE flow, terpene→audio parameter mapping for 8 terpenes, iso-principle baseline→target arc.

**Stalled / blocked**
- **No deployed URL** — Spotify OAuth needs a live redirect URI. Until deployed, the auth flow can't complete outside localhost.
- CLIENT_ID placeholder not replaced.
- Spotify JSX maps only 12 / 24 strains.
- Session arc (onset/peak/comedown), audio-features fetch on returned tracks, and terpinolene-paradox bimodal handling all unimplemented.
- Solful Juice App is a pile of standalone JSX files (no package.json) — architecture decision needed: merge into Vibe Curator or ship as separate Expo app.

**Key files:** `apps/vibe-curator/src/data/strains.ts`, `apps/vibe-curator/vibe_curator_session_notes.md`, `apps/spotify-auth/VibeCuratorSpotify.jsx`

---

### Patent — `docs/patent/`

**Drafted (NOT filed)**
- Provisional patent description (internal docket CPG-2026-PROV-003 — NOT a USPTO application number)
- Fig. 2 — Terpene → Audio Matrix
- Fig. 3 — Worked Example

**Stalled / blocked**
- **Provisional NOT filed with USPTO.** No application number exists. This is the #1 priority per STRATEGIC_PRIORITIES.md.
- **Figs 4–6 not drafted** — defer until after provisional is filed; can be added to utility.
- **Graham Pechenik (Calyx Law) not yet engaged** — needed to clarify self-file ($320 micro-entity) vs. attorney-assisted filing.

**Key files:** `docs/patent/Provisional_Patent_Description.pdf`, Figs 2 & 3 PDFs

---

### Strains — `strains/`

**Complete & ready to ship**
- 24 strain profile JSONs, all 15 layers populated (spot-checked: Mike's Bomba, Moonlight, Pink Rider).

**In progress**
- **Layer 13 narratives: 5 / 24 complete.** Done: Moonlight (v1 + v2), Mike's Bomba, Carambola, Natty Bumppo, Black Lime Chem.
- **19 pending:** Pinnacle, Tropical Sleigh Ride, Blueberry Muffin, Guava Gift, Mule Fuel, Pink Rider, Rasta Governmint, Satsuma Sherbet, Purple Candy Cane, Strawberry Biscotti, Avenue of the Giants, Pineapple Mojito, Pink Jesus Reserve, Lemon Papaya Banana, Mandarin Cherry Tree, Glitter Bomb, Peach Flambé, Love and Laughter, Tropicanna Cherry.

**Notes:** Compilation log tracks protagonist diversity (need non-binary characters, younger people, urban settings, couples, group settings, creative professionals). Only Moon Gazer Farms contextualized; other farms need grounding for future narratives.

**Key files:** `strains/strain-profiles/*.json`, `strains/layer-13-narratives/Narrative_Priming_Compilation_Log.md`

---

### Recipes — `recipes/`

**Complete & ready to ship**
- Beverages: 120 recipes = 24 original strains × 5 categories (mocktail, cocktail, juice/smoothie, herbal tea, wellness shot). Master DB at `recipes/beverages/recipe-book.json` (7,902 lines).
- Rollerball Pink Rider test-batch formula documented.

**In progress**
- Rollerballs: 5 launch SKUs planned (Mule Fuel, Black Lime Chem, Tropical Sleigh Ride, Satsuma Sherbet, Carambola) + 3 expansion SKUs. Formulation documented, manufacturing not started.
- Beer terpene database: JSX prototype components, integration into Vibe Curator pending.

**Stalled / blocked**
- **`recipes/essential-oil-blends/` is empty** — CLAUDE.md claims 24 strain-matched blends exist but the folder has 0 files. Blends may live in strain JSONs (Layer 2) but are not extracted as standalone recipes.
- **19 new Solful SF menu strains added Mar 14, 2026** with terpene profiles but no recipes — need 95 new beverage recipes (19 × 5) to maintain 5-per-strain consistency.

**Key files:** `recipes/beverages/recipe-book.json`, `recipes/rollerball-body-oils/rollerball_body_oil_planning.md`

---

### Partnerships — `partnerships/`

**Complete & ready to ship**
- Solful: business plan, Sessions Complete Guide, launch checklist, pitch deck, market validation, hidden-notes pitch to Bistro Caché.

**In progress**
- **Solful Sessions podcast launch** — fully scoped ($59–76/month ops), checklist detailed, but launch is ~7 weeks overdue.
- **Bistro Caché / La Séance** — partner confirmed. v1 (5-course prix fixe, $150–175/pp) and v2 (full-day, 3-service festival with "Awakening" / "Heart" / evening services) both pitched. Target: 4/20 Week 2026. Version not chosen, date not locked.

**Stalled / blocked**
- **Higher Heights (Nate Hayward)** — empty directory. Strains Carambola, Pineapple Mojito, Pink Rider sourced from them; no pitch.
- **Glentucky (Mike Benziger)** — empty directory. Mike's Bomba + Raspberry Punch sourced from them; no pitch.
- **Moon Gazer Farms** — research notes only. Black Lime Chem, Moonlight, Mike's Bomba (v3) sourced from them; no pitch.

**Key files:** `partnerships/solful/solful_sessions_launch_checklist.md`, `partnerships/bistro-cache/hidden-notes-pitch-flo-simon.md`, `partnerships/bistro-cache/hidden-notes-v2-ideation.md`

---

### Forest Bathing — `forest-bathing/`

**Complete & ready to ship**
- 10–11 Bay Area locations mapped with terpene profiles, receptor targets, and experience profiles: Muir Woods, Roy's Redwoods, Samuel P. Taylor, Armstrong Redwoods, Grove of Old Trees, SF Botanical Garden + 4 zones.
- 2 Solful dispensary anchors (SF at 900 Irving, Sebastopol at 785 Gravenstein Hwy S).
- Strain-to-location match DB for 23 strains.

**Stalled / blocked**
- **Not integrated into Vibe Curator** — standalone JSON, blocked on app deployment.
- **Out of sync** with expanded strain list (23 mapped, 24 profiles, 43 in beverage DB).

**Key files:** `forest-bathing/terpene_locations_database.json`, `forest-bathing/strain_location_matches.json`

---

## Dependency Graph

```
                    ┌─────────────────────────────────────────────┐
                    │         PODCAST LAUNCH CHAIN                 │
                    └─────────────────────────────────────────────┘
  Buy mic → Sign up ElevenLabs + Buzzsprout → Record EP01 → Publish
       │                                            │
       │                                            └──► Affiliate links (EP5+)
       │                                            └──► Vibe Curator CTA (EP10+)
       │                                            └──► Unlocks Solful co-marketing
       │
       └──► Phase 0 setup → Phase 1 (biweekly AI-narrated) → Phase 2 (self-record test, Mo 5-6)


                    ┌─────────────────────────────────────────────┐
                    │         APP DEPLOYMENT CHAIN                 │
                    └─────────────────────────────────────────────┘
  Set Spotify CLIENT_ID → Deploy Vibe Curator (Vercel/Netlify)
           │                       │
           │                       ├──► OAuth redirect URI works
           │                       ├──► Forest-bathing DB surfaces in UI
           │                       └──► Beer pairings surface in UI
           │
           └──► Add remaining 12/24 strains to Spotify JSX
                   └──► Session arc + audio-features fetch + terpinolene-paradox


                    ┌─────────────────────────────────────────────┐
                    │         LA SÉANCE EVENT CHAIN                │
                    └─────────────────────────────────────────────┘
  Choose v1 (5-course) or v2 (3-service festival)
           │
           └──► Lock 4/20 Week 2026 date with Flo & Simon
                   │
                   └──► Finalize menu + essential oil diffusion + Solful strain basket
                           │
                           └──► Ticket sales / comms
                                   └──► Podcast content opportunity (live episode?)


                    ┌─────────────────────────────────────────────┐
                    │         PATENT PROSECUTION CHAIN             │
                    └─────────────────────────────────────────────┘
  Draft Figs 4–6 → Engage Graham Pechenik (Calyx Law)
           │
           └──► Attorney review → Full utility application filing


                    ┌─────────────────────────────────────────────┐
                    │         ACADEMIC PIPELINE                    │
                    └─────────────────────────────────────────────┘
  Article 1 (BJP) submitted ──► await decision
  Article 2 (PharmRev) pre-sub ──► await editor ──► formal submit
  Article 3 (Frontiers) 8.6k → expand +3.4k → run build_script.py → submit
  Article 4 (Phyto+) PDF → generate DOCX → cover letter → submit
  Article 5 (PAIN) PDF → generate DOCX → cover letter → submission strategy → submit


                    ┌─────────────────────────────────────────────┐
                    │         CONTENT/DATA PROPAGATION             │
                    └─────────────────────────────────────────────┘
  19 Layer 13 narratives
         ├──► unblocks richer strain pages in Vibe Curator
         └──► feeds future podcast strain-episodes

  19 new Solful SF strains (added Mar 14)
         ├──► need terpene profiles → 95 new beverage recipes (19×5)
         ├──► need to be added to forest-bathing strain matches (23 → 43)
         └──► need to be added to Vibe Curator strains.ts (24 → 43)

  Pink Rider rollerball test batch → validates process → 5 launch SKUs → 3 expansion SKUs


                    ┌─────────────────────────────────────────────┐
                    │         PARTNERSHIP OUTREACH                 │
                    └─────────────────────────────────────────────┘
  Draft pitches for Higher Heights, Glentucky, Moon Gazer
         └──► Formalizes supply chain for rollerballs + strain sourcing
                └──► Unlocks farm-specific podcast content
```

---

## Critical Cross-Workstream Dependencies

**1. The strain-count drift is the #1 data-integrity risk.**
Three databases disagree on how many strains exist:
- `strains/strain-profiles/` → **24**
- `apps/vibe-curator/src/data/strains.ts` → **24**
- `forest-bathing/strain_location_matches.json` → **23**
- `recipes/beverages/recipe-book.json` → **43** (24 original + 19 new Solful SF strains added Mar 14)
- `apps/spotify-auth/VibeCuratorSpotify.jsx` → **12**

When the app tries to join strain → forest location → beverage → Spotify, anything off the canonical 24 will break. **Establish one canonical strain list** (proposed: `strains/strain-profiles/` as source of truth at 24) and decide whether the 19 new Solful SF strains get full profiles or stay beverage-only.

**2. Podcast launch is the marketing bottleneck.**
Partnerships (Solful) and app (Vibe Curator) both reference the podcast as a distribution engine. If the podcast doesn't ship, neither gets the organic discovery path they're designed for.

**3. Vibe Curator deployment unblocks 3 downstream items.**
Live URL → Spotify redirect URI works → forest-bathing DB surfaces → beer pairings surface. All three are built, none are user-facing.

**4. Essential oil blends "exist" but aren't extracted.**
CLAUDE.md says 24 strain-matched essential oil blends exist. The directory is empty. Blends are embedded in strain JSON Layer 2 but not published as standalone recipes — they can't be printed on packaging, shared, or sold until extracted.

**5. Rollerball manufacturing is the cheapest revenue path.**
Pink Rider test batch is fully documented (formula, carrier, dilution, transdermal science). The gap is physical — order oils, bottles, labels. Everything else is written.

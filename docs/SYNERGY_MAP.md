# Synergy Map: Cross-Workstream Asset Reuse

**Date:** 2026-04-05
**Scope:** Where outputs feed inputs across the 8 workstreams
**Companion to:** [PROJECT_AUDIT.md](./PROJECT_AUDIT.md), [DEPENDENCY_MAP.md](./DEPENDENCY_MAP.md)

The project is tightly woven at the strain and terpene level, but has significant structural gaps between partnerships, academic work, and patent. This map identifies what's load-bearing, what's orphaned, and where bridges are missing.

---

## 1. Highest-Leverage Assets

**Files that, when updated, propagate to the most workstreams.**

### Tier 1: Universal assets (feed 8+ workstreams each)

| Asset | Workstreams Fed | Why it's load-bearing |
|---|---|---|
| `strains/strain-profiles/*.json` (24 files) | strain-profiles → vibe-curator → spotify-auth → beverages → rollerballs → forest-bathing → podcast → layer-13 → partnerships | **The single source of truth.** Every workstream pulls from here. Change one terpene % → 15 downstream outputs shift. |
| `docs/knowledge-base/00_MASTER_TERPENE_REFERENCE.md` | knowledge-base + podcast + academic + app + recipes + business pitch | Master citations list. Every claim in every other doc traces back here. |
| CLAUDE.md | all | Project context every workstream reads. |

### Tier 2: High-leverage single files (4+ workstreams each)

| Asset | Refs | Workstreams Fed |
|---|---|---|
| `docs/knowledge-base/03_d_Limonene.md` | Spindle 2024 landmark RCT: 39 refs across 4 workstreams | Podcast EP03, academic Articles 1–5, Solful business plan, app limonene mapping |
| `docs/knowledge-base/01_Beta_Caryophyllene.md` | 453 refs across project | Podcast EP02, Gertsch 2008 citations, app CB2 mapping, rollerball SKUs |
| `docs/knowledge-base/06_Alpha_Pinene.md` | 246 refs; 2 podcast episodes (EP01 + forest bathing segments) | Podcast EP01, forest-bathing DB, academic articles, app |
| `partnerships/solful/solful-business-plan.md` | 23KB, referenced in apps + podcast framework + recipes | Apps, podcast framework (Solful Sessions branding), recipes (Solful-branded), launch checklist |

### Tier 3: Highest-reuse strains (content built once, referenced many times)

| Strain | Workstreams | What depends on it |
|---|---|---|
| **Carambola** (Higher Heights) | 11 | strain-profile, Layer 13 narrative, Vibe Curator, Spotify JSX, rollerball SKU, forest bathing, podcast reference, beverage recipes, beer pairings, academic, partnerships |
| **Mike's Bomba** (Glentucky) | 10 | strain-profile, Layer 13 narrative (v3), Vibe Curator, Spotify JSX, strain episode candidate (EP10 per framework), forest bathing, beverage recipes, academic, Glentucky partnership |
| **Mule Fuel** (Dos Rios) | 10 | strain-profile, Layer 13 narrative, Vibe Curator, Spotify JSX, rollerball launch SKU (#1, 3.97% terpenes), forest bathing, beverage recipes, academic, partnerships |
| **Tropical Sleigh Ride** (Greenshock) | 10 | strain-profile, Layer 13 narrative, Vibe Curator, Spotify JSX, rollerball launch SKU, forest bathing, beverage recipes, podcast reference, partnerships |
| **Glitter Bomb** (Sol Spirit) | 10 | strain-profile, Layer 13 narrative, Vibe Curator, Spotify JSX, forest bathing, beverage recipes, academic, receptor analysis, partnerships |
| **Tropicanna Cherry** | 10 | strain-profile, Layer 13 narrative, Vibe Curator, Spotify JSX, forest bathing, beverage recipes, academic, partnerships |

**Implication:** Investing one hour in a Carambola asset (narrative, recipe, music prompt) propagates across 11 downstream artifacts. Investing one hour in Peach Flambé (lowest reuse at 7 workstreams) propagates across 7.

### Tier 4: Highest-leverage concepts (load-bearing phrases)

| Concept | Mentions | Files | Verdict |
|---|---|---|---|
| **"pre-loading" / "pre-load"** | 569 | 30+ | **The IP crown jewel.** Core patent claim, app feature, podcast thesis, academic framework. |
| **"the same molecule"** | 78 | 16 | Core brand tagline. |
| **"entourage effect"** | 59 | 27 | Scientific credibility layer (Russo 2011 framework). |
| **"source independence"** | 22 | 12 | Strategic positioning concept. |
| **"iso-principle"** | 27 | 27 | Spotify audio-matching algorithm basis. |
| **"A2a-CB1 heteromer"** | 14 | 14 | Deep science (patent + podcast framework). |

---

## 2. Bottleneck Assets

**Incomplete items that block the most downstream work.**

| Bottleneck | Blocks | Downstream workstreams |
|---|---|---|
| **19 pending Layer 13 narratives** (5/24 done) | Rich strain pages in Vibe Curator, Type B strain-profile podcast episodes, Solful in-store cards, La Séance table cards | Apps, Podcast (Type B episodes), Partnerships (Solful retail), La Séance |
| **19 new Solful SF strains missing terpene profiles** | 95 new beverage recipes (19 × 5), forest bathing re-sync (23 → 43), Vibe Curator expansion (24 → 43), rollerball expansion | Recipes, Forest Bathing, Apps, Products |
| **`recipes/essential-oil-blends/` empty directory** | Retail product SKUs, Solful wholesale pitch physical samples, La Séance diffusion protocol, rollerball validation | Products, Solful partnership, La Séance, Rollerballs |
| **Figs 4–6 of provisional patent** | Attorney engagement, utility filing, international rights, Vibe Curator commercialization story, investor pitch | Patent, Apps (IP story), Solful pitch, All academic articles (disclosure risk) |
| **Vibe Curator live URL** | Spotify OAuth redirect, forest-bathing DB surfacing, beer pairings UI, Solful QR-code demo, podcast CTA (EP10+) | Apps, Forest Bathing, Beer Database, Solful, Podcast monetization |
| **Spotify JSX strain coverage (12/24)** | Half the app's audio-matching capability | Apps, Podcast strain episodes |
| **Podcast launch (Phase 0 setup)** | Solful co-marketing, Vibe Curator CTA channel, all future podcast content, affiliate revenue | Partnerships, Apps, Recipes, Products |

**Single most blocking bottleneck:** the Layer 13 narratives. They feed 4 different consumer-facing surfaces (app, retail cards, podcast, dinner), and the format is already proven (5 done).

---

## 3. Redundancies (Same Content, Multiple Formats)

**Places content is duplicated and should be consolidated.**

| Redundancy | Locations | Consolidation recommendation |
|---|---|---|
| **Solful business plan** | `.md` + `.docx` + `.jsx` (three formats) | Keep `.md` as source of truth, generate others on demand |
| **hidden-notes-pitch-solful** | `.md` + `.docx` + `.pdf` + `.jsx` | Same — `.md` as source |
| **Vibe Curator app** | `VibeCurator.jsx` + `VibeCurator_v2.jsx` (two parallel versions) | Pick one, archive the other (noted in DEPENDENCY_MAP as ~1 hour decision) |
| **Juice app** | `SolfulJuiceApp.jsx` (5,895 lines) + `solful_juice_app_v4.jsx` (352 lines) + `solful_sessions_app.jsx` (491 lines) | Three variants of essentially the same thing — pick architecture |
| **Podcast framework** | `solful_podcast_framework_v1.md` + `solful_sessions_production_framework.md` (v2.0) | v1 should be archived; v2.0 is the current |
| **Terpene data** | Strain JSONs (Layer 2) include essential oil blends, but `recipes/essential-oil-blends/` is empty | Extract blends into standalone files OR delete the empty folder |
| **Strain data paths** | `strains/strain-profiles/` + `apps/vibe-curator/src/data/strains.ts` (typed copy) + beverage recipe-book.json (43 expanded) + forest-bathing matches (23) | Single canonical DB + build script to propagate to TypeScript and JSON copies |
| **Moonlight narrative** | v1 + v2 (both kept) | Decide: is v2 the replacement or are both shipping? Compilation log tracks "protagonist diversity" — if both serve different personas, document why |
| **Legacy apps** | `apps/legacy/` with `SolfulSessionsApp.jsx`, `SolfulTerpeneApp.jsx`, plus test files in root (`test.jsx`, `test-artifact.jsx`, `VibeCurator.jsx`) | Git-archived or deleted — these are noise in the active tree |

---

## 4. Missing Bridges

**Workstreams that SHOULD connect but currently don't reference each other.**

### Critical missing bridges

| Should Connect | Currently Disconnected | Fix |
|---|---|---|
| **Academic articles ↔ Patent** | No academic article mentions Docket CPG-2026-PROV-003 or cites the provisional as a "filed in parallel" disclosure. None of the 5 articles declare IP dependencies. | Each article needs a "Conflict of Interest / IP disclosure" footer noting the provisional. Attorney should review. |
| **Forest Bathing ↔ Podcast EP01** | EP01 α-Pinene is *about* forests but doesn't cite specific Bay Area locations from the forest-bathing DB (Muir Woods, Roy's Redwoods). The DB has exact receptor-target mapping the episode could use. | Rewrite EP01 segment to call out `terpene_locations_database.json` entries by name. |
| **Bistro Caché ↔ everything else** | La Séance dinner is in 3 files, all in `partnerships/bistro-cache/`. Zero references from strain data, apps, recipes, or podcast. | Add a La Séance menu derived from existing strain JSONs (use the same pre-loading protocol as rollerballs). |
| **Patent ↔ Vibe Curator app code** | Figs 2 + 3 of the patent describe the app's terpene→audio matrix and worked example. The actual app code (`VibeCuratorSpotify.jsx`) doesn't link back. | Add a `PATENT.md` in `apps/vibe-curator/` referencing the provisional. Useful for attorney review and investor pitch. |
| **Rollerball SKUs ↔ Solful pitch** | 5 rollerball launch SKUs documented, but Solful business plan doesn't include wholesale pricing or retail margin for them. | Integrate rollerball SKU table into Solful business plan (physical product = strongest pitch asset). |
| **Layer 13 narratives ↔ Podcast Type B episodes** | Framework defines Type B (strain profile) episodes; 5 Layer 13 narratives are written for real strains. None are adapted as podcast scripts. | Mike's Bomba Type B episode is called out in framework ("Example: Episode 10") — Layer 13 narrative is the cold open material. |
| **Forest Bathing ↔ Vibe Curator UI** | DB exists for 23 strains but app doesn't surface it. Listed as blocked on deployment, but data also needs to re-map to 24 strains. | Add location cards to each strain page in `apps/vibe-curator/src/pages/StrainPage.jsx`. |
| **Beer database ↔ main Vibe Curator** | 3 JSX components exist (`BayAreaBeerDB_v3.jsx`, `CarambolaBeerPairing.jsx`, `VibeCuratorBeerPairings.jsx`) but aren't integrated into the main app. | Merge beer pairings into Vibe Curator as Layer 15 (already defined: Wine & Beer). |
| **Academic Article 5 (PAIN) ↔ β-caryophyllene monograph** | Article 5 is about terpene analgesia; `docs/knowledge-base/01_Beta_Caryophyllene.md` is the richest source on CB2-mediated analgesia. Unclear if article cites its own knowledge base. | Cross-check that Article 5 cites 01_Beta_Caryophyllene.md and Gertsch 2008. |

### Knowledge orphans — monographs referenced nowhere else

| Monograph | Status | Underuse |
|---|---|---|
| `14_Citronellol.md` | **0 external refs** | Written, never reused. Candidate for: podcast episode, rollerball SKU, or deletion if not a project priority. |
| `12_Eugenol.md` | 1 ref (academic only) | Could anchor a podcast episode on clove/frankincense; rollerball candidate. |
| `08_Beta_Ocimene.md` | 1 ref (academic only) | Mentioned in strain COAs but no consumer-facing story yet. |
| `10_Farnesene.md` | 3 refs (app + recipes) | Identified as "Future" podcast episode but no outline yet. |
| `13_Menthol.md` | 5 refs (app + recipes) | No podcast episode, no academic coverage. |

**Of 14 terpene monographs, only 6 have active podcast representation.** The other 8 are reference material waiting to become content.

### Partners missing from expected workstreams

| Partner | Present In | Notably Absent From |
|---|---|---|
| **Higher Heights (Nate)** | Apps (strain data), Recipes (Carambola/Pink Rider/Pineapple Mojito), Strains | **Podcast, Academic, Partnerships folder (empty)** |
| **Glentucky (Mike Benziger)** | Apps (Mike's Bomba), Recipes, Strains | **Podcast, Partnerships folder (empty)** — despite Mike's Bomba being the designated EP10 strain |
| **Moon Gazer Farms** | Apps, Recipes, Strains (3 strains) | **Podcast, Academic** — biggest farm by strain count (3 strains: Moonlight, Natty Bumppo, Black Lime Chem) but least represented in content |
| **Bistro Caché (La Séance)** | Partnerships only | Apps, Recipes, Strains, Podcast |

**Pattern:** Farm partners are deeply integrated at the data layer (strains + recipes + apps) but nearly invisible at the content layer (podcast + academic + pitch). A 2-hour pass to add "Featured Farm" segments to Solful pitch and podcast episodes would change this.

---

## Synergy Summary Table

| Axis | Score | Notes |
|---|---|---|
| **Strain data reuse** | 9/10 | Every strain appears in 7–11 workstreams. Tight coupling. |
| **Terpene monograph reuse** | 6/10 | Top 3 terpenes everywhere; 8/14 monographs under-utilized. |
| **Research citation reuse** | 8/10 | Spindle 2024 cited in 4 workstreams; Russo, LaVigne, Gertsch in 3+. |
| **Partner integration** | 5/10 | Solful saturated (4+ workstreams); Bistro Caché isolated; farms at data layer only. |
| **Brand tagline propagation** | 4/10 | Tagline defined in framework but only 8 explicit uses across apps. |
| **Color palette consistency** | 3/10 | Per-strain colors only, no central terpene→color system (despite CLAUDE.md claiming 11 are defined). |
| **Patent ↔ product linkage** | 2/10 | Apps implement the patent but don't reference it. |

---

## Three Quick Wins (Highest Synergy, Lowest Effort)

1. **Write one Layer 13 narrative (2 hours).** Pick Mule Fuel (highest terpene %, rollerball SKU #1, 10 workstream footprint). Unlocks: app page content, retail card, Type B podcast candidate, La Séance menu copy, rollerball launch story.

2. **Add `PATENT.md` to `apps/vibe-curator/` (15 minutes).** Reference the provisional, cite Figs 2 + 3. Unlocks: attorney review clarity, investor pitch IP story, academic article cross-references.

3. **Delete or fill `recipes/essential-oil-blends/` (1 hour).** Either extract the 24 blends already embedded in strain JSON Layer 2, or delete the empty folder. Unlocks: resolves CLAUDE.md inconsistency, unblocks retail product catalog, enables Solful wholesale conversation.

# Terpenes, With a Twist of Aromatherapy — Project Context

## What This Project Is

A multi-layered terpene science platform unifying cannabis pharmacology, clinical aromatherapy, and forest bathing immunology. The core thesis is **terpene source independence**: the same molecule activates the same receptor regardless of botanical origin (e.g., β-caryophyllene from black pepper and cannabis both activate CB2 identically).

The platform spans: a podcast series, a mobile app, a terpene dinner concept, academic publications, a provisional patent, and product lines (essential oil blends, rollerballs, beverages).

## Project Owner

Charles Pelletier-Gagné — Mill Valley, CA (grew up in Saint-Bruno, Québec). Creator/host of Solful Sessions — The Terpene Files podcast. Tagline: "The same molecule. Every plant. One body."

## Folder Structure

```
terpenes-project/
├── CLAUDE.md                          ← You are here
├── docs/
│   ├── knowledge-base/                ← Core reference documents
│   │   ├── 00_MASTER_TERPENE_REFERENCE.md   ← Start here for any terpene question
│   │   ├── 01_Beta_Caryophyllene.md         ← Individual terpene monographs (14 total)
│   │   ├── 02_Myrcene.md
│   │   ├── ...through 14_Citronellol.md
│   │   ├── Terpenes_With_a_Twist_of_Aromatherapy__Full_Version.pdf
│   │   ├── Aromatherapy_and_Cannabis_Terpenes__A_Unified_Knowledge_Base.pdf
│   │   └── Unified_terpene_pharmacology__a_comprehensive_evidence_base.pdf
│   ├── academic/                      ← Journal articles (5-article series)
│   │   ├── article-1-bjp/             ← BJP submission (terpene pre-loading framework)
│   │   ├── article-2-pharm-reviews/   ← Pharmacological Reviews (unified pharmacology)
│   │   ├── article-3-frontiers/       ← Frontiers in Pharmacology (~8.4k words, needs expansion to ~12k)
│   │   ├── article-4-phytomedicine/   ← Phytomedicine Plus
│   │   └── article-5-pain/            ← PAIN journal (terpene analgesia)
│   ├── patent/                        ← Provisional patent (Docket CPG-2026-PROV-003)
│   │   └── README.md                  ← Patent status, claims summary, FIG status
│   ├── podcast/                       ← Terpene Files episode scripts and frameworks
│   │   ├── framework/                 ← 7-beat architecture, 3 episode types, voice rules
│   │   ├── episodes/                  ← Written episodes (00A, 00B, 01, 02, 03, Women Who Knew)
│   │   └── research/                  ← Pre-episode research syntheses
│   └── studies/                       ← Source PDFs (Russo 2011, LaVigne 2021, Gertsch 2008, Spindle 2024, etc.)
├── apps/
│   ├── vibe-curator/                  ← B2C mobile app (React/TypeScript)
│   │   ├── src/
│   │   │   ├── data/
│   │   │   │   └── strains.ts         ← 24-strain seed data (2,074 lines, 15 layers per strain)
│   │   │   └── ...
│   │   └── README.md
│   ├── solful-juice-app/              ← Terpene beverage recipe app (React)
│   │   └── solful_juice_app_v4.jsx
│   └── spotify-auth/                  ← PKCE OAuth component for playlist generation
├── recipes/
│   ├── essential-oil-blends/          ← 24 strain-matched blends (40 drops/2ml standard)
│   ├── beverages/                     ← Juices, smoothies, cocktails, mocktails
│   │   └── recipe-book.pdf            ← Solful Sessions Terpene Beverage Recipe Book
│   ├── rollerball-body-oils/          ← Test-batch phase (Pink Rider first)
│   └── beer-terpene-database/         ← Bay Area Beer Terpene Database v3.0 (~150 beers, 24 breweries)
├── strains/                           ← 24 strains across 14 Emerald Triangle farms
│   ├── strain-profiles/               ← Per-strain JSON (15 sensory layers each)
│   └── layer-13-narratives/           ← Creative writing (Short Story, Haiku, Sonnet, Ode, Prose Poem)
├── partnerships/
│   ├── solful/                        ← Solful Dispensary (Sebastopol + SF) — Eli & Noah
│   ├── bistro-cache/                  ← La Séance terpene dinner — Flo & Simon
│   ├── higher-heights/                ← Nate Hayward (grower)
│   └── glentucky/                     ← Mike Benziger (Glentucky Family Farm)
└── forest-bathing/                    ← 10 Bay Area locations mapped to terpene emissions
```

## Key Data Assets

- **24 strains** across 14 Emerald Triangle farms (Sonoma, Mendocino, Humboldt, Trinity)
- **15 sensory layers** per strain: Flower, Essential Oil, Music, Tea, Cocktail/Mocktail, Juice, Food, Candle, Bath & Body, Incense, Environment, Breathwork, Narrative Priming, Forest Bathing, Wine & Beer
- **14 terpene monographs** (see `docs/knowledge-base/`)
- **18 core essential oils**: black pepper, rosemary, lemongrass, German chamomile, sage, basil, clove, frankincense serrata, lavender, pine, white spruce, geranium, tea tree, lemon, sweet orange, peppermint, eucalyptus globulus, bergamot

## Design System

- **Fonts**: Fraunces (display), DM Sans (body), IBM Plex Mono (data/code)
- **Colors**: Deep forest greens, gold accents, warm whites
- **Terpene color coding**: 11 terpenes mapped to hex values (see Vibe Curator app data)

## Critical Science Notes

When writing anything in this project, remember:

1. **Terpene source independence** is the load-bearing thesis. Never imply cannabis terpenes are special — the molecule is what matters.
2. **Temporal sequencing (pre-loading)** is the patent differentiator. The Hopkins/Vandrey PCT (WO2022165165A1) covers *simultaneous* co-administration. Our patent covers terpene exposure *before* cannabis consumption.
3. **Three delivery pathways** for inhaled terpenes: olfactory-limbic, trigeminal-autonomic, pulmonary-systemic.
4. **A2a-CB1 heteromers** are the proposed molecular bridge for terpene-cannabinoid crosstalk.
5. **Honest null results are a feature, not a bug**: α-pinene failed the Hopkins memory protection test. The Spindle 2024 limonene RCT is a landmark positive. This contrast is the credibility signature.
6. **Lavender (linalool) impairs working memory** — exclude from work-focus variants. German chamomile (bisabolol) is calming — also exclude from focus variants.
7. **Rosemary (1,8-cineole + α-pinene)** and **peppermint** are the primary cognitive enhancement oils.

## Writing Rules

### Podcast (Terpene Files)
- Voice: Conversational, "smart friend at dinner party," never clinical
- Evidence tiers stated transparently
- Negative results stated alongside positive
- 7-beat episode architecture, 3 episode types

### Layer 13 (Narrative Priming) Creative Writing
- NEVER use chemical terpene names in creative text
- Name the strain exactly once, naturally
- Name the farm and region
- Name all essential oils explicitly
- Reference one Spotify artist
- Embody the intent — never state it
- Vary protagonists across gender, occupation, life situation

### Academic Articles
- Evidence-tiered honesty over overclaiming
- Honest reporting of null results (α-pinene failure featured, not hidden)

## Key Collaborators

| Person | Role |
|--------|------|
| Eli & Noah | Solful Dispensary owners |
| Flo & Simon | Bistro Caché (La Séance dinner) |
| Kyle | First TPL demo subject, partner of Katie |
| Katie | Charles's wife, floral designer |
| Nate Hayward | Higher Heights grower |
| Mike Benziger | Glentucky Family Farm |
| Dr. Ethan Russo | Key researcher (entourage effect) |
| Tory Spindle PhD | Johns Hopkins (Spindle 2024 limonene RCT) |
| Ryan Vandrey PhD | Johns Hopkins Cannabis Science Lab |
| John Streicher PhD | University of Arizona |
| Graham Pechenik | Calyx Law, SF (patent attorney candidate) |

## Key Researchers & Citations

- Russo 2011 — Entourage effect / phytocannabinoid-terpenoid synergy
- Spindle 2024 — Limonene RCT (Johns Hopkins) — landmark positive result
- LaVigne 2021 — Cannabis terpenes are cannabimimetic
- Gertsch 2008 — β-caryophyllene as dietary cannabinoid
- Qing Li — Shinrin-yoku / NK cell research
- Crisinel & Spence 2012 — Crossmodal correspondences

## Workflow Preferences

- **Research first** → synthesis artifact → final output (e.g., episode transcript as .docx)
- **Opus for nuanced writing**; Sonnet for research orchestration
- **Concise structured outputs** (tables, protocols, ranked recommendations) over lengthy prose in working sessions
- **Interactive tabbed HTML** over flat Mermaid diagrams for complex frameworks
- **Build-and-top format** for sparkling beverages: shake only juice and aromatics, top with sparkling water poured down the side

## Current Priorities (as of April 2026)

1. Remaining Terpene Files podcast episodes (10+ angles identified)
2. Layer 13 narratives for ~20 remaining strains
3. Patent FIGs. 4–6; engage Graham Pechenik for review
4. Expand Article 3 to ~12,000 words
5. Vibe Curator app local prototype → live demo URL
6. La Séance event planning

## Local Knowledge Base Status (as of April 5, 2026)

### Podcast
- Production framework (v2.0) at `docs/podcast/framework/solful_sessions_production_framework.md` (also v1 variant)
- Episode scripts index at `docs/podcast/framework/episode_scripts_index.md`
- Landscape map at `docs/podcast/framework/terpene_podcast_landscape_map.md` — competitive positioning research
- **All 6 episode scripts present** at `docs/podcast/episodes/` (EP00A, EP00B, 01, 02, 03, Women Who Knew — plus HTML and .md variants)
- Launch checklist at `partnerships/solful/solful_sessions_launch_checklist.md`

### Academic Articles
- Article 1 (BJP): complete submission in `docs/academic/article-1-bjp/`
- Article 2 (Pharm Reviews): PharmRev_Complete_Manuscript + cover letter in `docs/academic/article-2-pharm-reviews/`
- Article 3 (Frontiers): build script + sections JSON in `docs/academic/article-3-frontiers/` (manuscript PDF still missing)
- Article 4 (Phytomedicine Plus): manuscript PDF in `docs/academic/article-4-phytomedicine/`
- Article 5 (PAIN): manuscript PDF in `docs/academic/article-5-pain/`

### Data & Apps
- `apps/vibe-curator/src/data/strains.ts` — 24-strain TypeScript seed (replaces older strains.js, kept as strains_legacy.js)
- `apps/vibe-curator/src/data/vibe_curator_unified_database.json` — unified DB
- `apps/spotify-auth/VibeCuratorSpotify.jsx` — PKCE OAuth component (also copied to vibe-curator/src/components/)
- `recipes/beer-terpene-database/` — 4 beer pairing JSX files incl. BayAreaBeerDB_v3.jsx (~175 beers)
- `forest-bathing/terpene_locations_database.json` + `strain_location_matches.json` — 10 Bay Area locations mapped

### Recipes
- `recipes/beverages/` — 23_recipes.pdf + Solful_Sessions___Terpene_Beverage_Recipe_Book.pdf (polished versions now present)
- `recipes/rollerball-body-oils/rollerball_body_oil_planning.md` — Pink Rider test batch + 5-SKU line

### Reference
- `docs/knowledge-base/terpene_music_algorithm.md` — music layer algorithm doc
- `docs/hackathon_playbook.md` — hackathon materials

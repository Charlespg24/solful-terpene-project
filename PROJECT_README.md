# Terpenes, With a Twist of Aromatherapy

**A proposal for Solful Dispensary by Charles Pelletier-Gagné**

---

## Project Overview

This project proposes strain-matched essential oil blends that mirror the terpene profiles of Solful Dispensary's curated cannabis strains. The core insight: the same chemical compounds that make lavender calming and peppermint energizing are what differentiate cannabis strains. By pre-loading your system with matching terpenes via aromatherapy, you prime the brain and body before THC arrives—creating a brighter, faster-onset, more intentional experience.

## Core Thesis

> "What if terpenes don't just flavor your strain, but shape the entire experience?"

The science sits at the intersection of three established research areas:
1. **Aromatherapy** - How inhaled terpenes affect mood and physiology
2. **Cannabis Pharmacology** - How terpenes contribute to the entourage effect
3. **Forest Bathing Research** - How airborne terpenes produce measurable biological effects

---

## File Inventory

### Interactive Apps
- `SolfulTerpeneApp.jsx` - B2B pitch app with Story, Pitch, Science, and 23 Strain Blends
- `SolfulSessionsApp.jsx` - **NEW** B2C consumer app with Intent Tiles, Humidor, Session Flow, Music Prompts, and Learn section

### Structured Data
- `data/strains.json` - All 23 strains with terpene profiles and oil recipes
- `data/terpenes.json` - Terpene reference database with effects, sources, prevalence
- `data/essential-oils.json` - Complete essential oil palette with usage notes
- `data/strain-music-prompts.json` - All 22 strain music prompts with vibe categories, BPM targets, artist references
- `data/rounding-blends.json` - 3 Receptor Rounding Blends with pharmacology, recipes, protocols, product formats
- `data/recipe-book.json` - 120+ terpene-matched beverage recipes (mocktail, cocktail, juice, tea, shot)

### Pharmacological Databases
- `terpquery_enriched.db` - Enriched SQLite DB: 196 terpenes, 23 receptor bindings, 39 clinical evidence entries, 41 botanical sources
- `terpquery/` - TerpQuery submodule (TheAwesomeTheory/terpenes): product relationship graph across 8 categories

### Research PDFs
| File | Description |
|------|-------------|
| `research/Terpene_DJ_Framework.pdf` | Terpene-to-music crossmodal mapping research |
| `research/The Sonic Layer - Strain-Matched Spotify Playlist Prompts.pdf` | 22 strain-specific Spotify prompts with vibe categories |
| `Taming THC_ (study 1).pdf` | Phytocannabinoid-terpenoid entourage effects |
| `Therapeutic Effect... (study 2).pdf` | Essential oils in mood disorders |
| `Cannabis sativa terpenes... (study 3).pdf` | Terpenes are cannabimimetic (Nature, 2021) |
| `Beta-caryophyllene... (study 4).pdf` | BCP as dietary cannabinoid (PNAS, 2008) |
| `Terpenes_ The Flavors... Leafly.pdf` | Leafly article on cannabis terpenes |
| `Strains, terpenes.pptx.pdf` | Terpene presentation reference |

### Pitch Materials
| File | Description |
|------|-------------|
| `The Business Pitch_ Strain-Matched Aromatherapy for Solful.pdf` | Executive pitch deck |
| `Market Validation_ The Industry Is Catching Up.pdf` | Market timing analysis |
| `The Science of Terpene Amplification.pdf` | Scientific framework document |
| `Terpenes, With a Twist of Aromatherapy.pdf` | Full proposal document |
| `Terpenes, With a Twist of Aromatherapy - Full Version.pdf` | Extended version |

### Knowledge Base
| File | Description |
|------|-------------|
| `Aromatherapy_Cannabis_Terpenes_Knowledge_Base.md` | 51-source knowledge base bridging aromatherapy and cannabis |
| `terpene_monographs/` | 14 deep terpene monographs + master reference (100+ studies each) |

### Pharmacological Analysis & Insights
| File | Description |
|------|-------------|
| `Receptor_Pharmacology_Insights.md` | Receptor convergence, twins, terroir — written synthesis |
| `Terpene_Synergy_Insights.md` | 12 synergies explained with strain examples |
| `Session_Design_By_Synergy.md` | 6 session archetypes with full pharmacokinetic timing arcs |
| `Terpene_Sonic_Insights.md` | How terpene pharmacology predicted the music (r=0.8) |
| `Cross_Layer_Insights.md` | Validation that all 15 layers encode the same pharmacological signal |

### B2C Product Spec & Content
| File | Description |
|------|-------------|
| `docs/PRODUCT_SPEC_Solful_Sessions.md` | Complete B2C app specification with session architecture |
| `docs/B2C_CONTENT_Solful_Sessions.md` | Consumer-facing content for Learn section |

### Assets
- `San_Francisco_Flower_Wall_V2_23_Mary_Roll_Solful-1.webp` - Solful brand image

---

## The 23 Strain Collection

### By Region
**Sonoma (2)**
- Mike's Bomba (Glentucky Family Farm)
- Pink Jesus Reserve (Sonoma Hills Farm)

**Humboldt (5)**
- Guava Gift, Mule Fuel, Satsuma Sherbet (Alpenglow Farms)
- Blueberry Muffin (Briceland Forest Farm)
- Peach Flambé, Lemon Papaya Banana (Terrapin Farms)

**Mendocino (14)**
- Tropical Sleigh Ride, Purple Candy Cane (Greenshock Farms)
- Carambola, Rasta Governmint, Pineapple Mojito (Higher Heights)
- Strawberry Biscotti, Avenue of the Giants (Happy Day Farms)
- Moonlight, Natty Bumppo, Black Lime Chem (Moon Gazer Farms)
- Pinnacle (Dos Rios Farms)
- Mandarin Cherry Tree (Sticky Fields)
- Love and Laughter (Heartrock Mountain Farm) - CBD
- Tropicanna Cherry (Sunrise Gardens)

**Trinity (1)**
- Glitter Bomb (Sol Spirit Farm)

### By Effect Profile
**Energizing/Uplifting**
- Carambola, Tropical Sleigh Ride, Purple Candy Cane, Avenue of the Giants, Peach Flambé, Love and Laughter (CBD)

**Social/Euphoric**
- Guava Gift, Pink Jesus Reserve, Tropicanna Cherry, Moonlight

**Relaxing/Calming**
- Mike's Bomba, Strawberry Biscotti, Blueberry Muffin, Satsuma Sherbet, Mandarin Cherry Tree, Natty Bumppo

**Sedating/Heavy**
- Pinnacle, Mule Fuel, Black Lime Chem

---

## Essential Oil Palette

**18 oils** used across all blends:

| Oil | Primary Terpene | Appearances |
|-----|-----------------|-------------|
| Black Pepper | β-Caryophyllene | 23/23 |
| Lemongrass | Myrcene | 21/23 |
| Sage | α-Humulene | 13/23 |
| Geranium | Citronellol | 11/23 |
| Lavender | Linalool | 9/23 |
| Sweet Orange | Limonene | 8/23 |
| Pine | α-Pinene | 7/23 |
| German Chamomile | α-Bisabolol | 7/23 |
| Lemon | Limonene | 6/23 |
| Clove | Eugenol | 6/23 |
| Peppermint | Menthol | 6/23 |
| Basil | β-Ocimene | 5/23 |
| Rosemary | 1,8-Cineole | 4/23 |
| Ylang Ylang | Linalool/Farnesene | 3/23 |
| Bergamot | Limonene | 3/23 |
| Grapefruit | Limonene | 2/23 |
| Tea Tree | Terpinolene | 2/23 |
| Eucalyptus | 1,8-Cineole | 1/23 |

---

## The Two-Step Pre-Loading Protocol

### Step 1: Receptor Rounding (10-15 min before Step 2)
Choose a purpose-built mini-blend based on session intent. These open receptor pathways that no cannabis strain covers:

| Rounding Blend | Recipe | Receptors Opened | Best For |
|---------------|--------|-----------------|----------|
| **Clarity Round** | Rosemary (3d) + Eucalyptus (2d) | AChE, BDNF-TrkB, TRPV3 | Focus, memory, cognitive sessions |
| **Calm Round** | Peppermint (2d) + Clove (1d) | TRPM8, TRPA1, COX-2 | Pain, body comfort, recovery |
| **Ease Round** | Lavender (3d) | GABA-A (convergent) | Anxiety, sleep, deep relaxation |

Each rounding blend also works as a **standalone aromatherapy product** without cannabis.

### Step 2: Strain Blend (your existing 40-drop recipe, untouched)
Apply via personal inhaler, diffuser, or topical. The strain blend is never modified.

### Step 3: Cannabis (15-30 min after starting Step 1)
THC/CBD arrive to a pharmacologically prepared system.

---

## Pharmacological Analysis (March 2026)

### Receptor Convergence
- 23 strains analyzed against **15 neuroreceptor targets**
- Average strain covers 7-10/15 receptors; with rounding blends: 13-15/15
- **3 universal gaps** filled by rounding blends: TRPV3 (100% missing), TRPM8 (100%), TRPA1 (100%)
- GABA-A convergence: supra-additive synergy when myrcene (direct) + linalool (allosteric) co-activate

### 12 Terpene Synergies
- Documented synergistic interactions mapped to every strain
- Most common: **Endorphin Cascade** (BCP + Myrcene, 17/23 strains)
- Rarest natural: **Triple GABA** (Myrcene + Linalool + Bisabolol, 1 strain: Pineapple Mojito)
- 3 synergies only unlockable via rounding blends (Memory Shield, Pain Gate, Spice Bridge)

### Receptor Twins & Terroir
- **5 receptor families** identified by clustering strains on pharmacology, not flavor
- Closest twins: Mike's Bomba ↔ Pinnacle (0.998 similarity) — different aromas, same receptors
- Terroir signatures: Humboldt → body/GABA-A, Sonoma → anti-inflammatory/CB2, Mendocino → balanced

### Terpene-Sonic Correlation
- Music parameters correlate with receptor pharmacology at **r = 0.77-0.84**
- GABA-A activation predicts lower BPM (r=-0.777) and lower energy (r=-0.814)
- 5-HT activation predicts higher valence (r=+0.832)
- The music layer was pharmacologically correct before the receptor data existed

### Cross-Layer Validation
- All 15 experience layers encode the same pharmacological signal
- Music: continuous resolution (r=0.8). Environment/breathwork: 3 perfect tiers (Rest/Balance/Active)
- Every 2400K/dim/parasympathetic strain is myrcene-dominant; every 4200K/bright/sympathetic is limonene-forward

### 6 Session Archetypes
Built on synergy pharmacology, not just strain effects:
1. **Deep Rest** — Ease Round → Mule Fuel (GABA-A Stack + Endorphin Cascade + BBB Opener)
2. **Pain Management** — Calm Round → Avenue of the Giants (Pain Gate + Endorphin Cascade)
3. **Focus & Creative** — Clarity Round → Purple Candy Cane (Memory Shield + Clarity Pair)
4. **Social** — Optional Ease Round → Guava Gift (Mood Lift + Sesquiterpene Pair)
5. **Recovery** — Calm + Ease Rounds → Blueberry Muffin (Anti-Inflammatory Triad + Pain Gate)
6. **Contemplative** — Ease Round → Mandarin Cherry Tree (Mood Lift + GABA-A Stack)

---

## Analysis Scripts & Reports

| Script | Output | Purpose |
|--------|--------|---------|
| `enrich_terpquery.py` | `terpquery_enriched.db` | Merges monograph pharmacology into TerpQuery DB |
| `receptor_convergence_analysis.py` | `receptor_convergence_report.md` | 3 strategies × 23 strains × 15 receptors |
| `receptor_twins_terroir.py` | `receptor_twins_terroir_report.md` | Receptor families, twins, terroir signatures |
| `terpene_synergy_analysis.py` | `terpene_synergy_report.md` | 12 synergies mapped to 23 strains |
| `terpene_sonic_correlation.py` | `terpene_sonic_correlation_report.md` | Music-pharmacology correlation (r=0.8) |
| `cross_layer_validation.py` | `cross_layer_validation_report.md` | All layers vs receptor profiles |

### Insight Narratives
| Document | Focus |
|----------|-------|
| `Receptor_Pharmacology_Insights.md` | Receptor convergence, twins, terroir findings |
| `Terpene_Synergy_Insights.md` | 12 synergies explained with strain examples |
| `Session_Design_By_Synergy.md` | 6 session archetypes with full timing arcs |
| `Terpene_Sonic_Insights.md` | How pharmacology predicted the music |
| `Cross_Layer_Insights.md` | One signal, fifteen channels |

---

## Key Scientific References

1. **PNAS 2008** - β-Caryophyllene proven to selectively activate CB2 receptor (Ki = 155 nM)
2. **Nature Scientific Reports 2021** - Multiple terpenes show cannabinoid-like effects
3. **Silexan Clinical Program** - Lavender oil comparable to paroxetine for GAD (Kasper 2014, N=539)
4. **Spindle 2024 (Johns Hopkins)** - Limonene + THC reduces anxiety vs THC alone (only human RCT)
5. **Moss & Oliver 2012** - Rosemary aroma improves cognition; plasma eucalyptol >75ng/mL threshold
6. **Harada 2018** - Linalool anxiolytic effect is exclusively olfactory (anosmic mice show zero response)
7. **Russo 2011** - "Taming THC" entourage effect hypothesis (British Journal of Pharmacology)

---

## External Integrations

### TerpQuery (submodule: `terpquery/`)
TheAwesomeTheory's terpene relationship database — 196 terpenes, 178 products across 8 categories (cannabis, wine, aromatherapy, tea, fruit, outdoor plants, fungi, topical ointments). Enriched with Solful monograph pharmacology via `enrich_terpquery.py`.

---

## Project Status

**Completed:**
- ✅ 23 strain-specific essential oil recipes (40-drop blends)
- ✅ 3 Receptor Rounding Blends (Clarity, Calm, Ease)
- ✅ 14 deep terpene monographs (100+ studies each)
- ✅ Receptor convergence analysis (15 targets × 23 strains)
- ✅ 12 terpene synergies mapped to collection
- ✅ Receptor twins & terroir signatures
- ✅ Terpene-sonic correlation validated (r=0.8)
- ✅ Cross-layer pharmacological validation
- ✅ 6 session archetypes with timing protocols
- ✅ TerpQuery integration (196 terpenes, enriched DB)
- ✅ 120+ beverage recipes matched to strains
- ✅ B2C app specification and content
- ✅ Business plan and patent documentation

**In Progress:**
- [ ] Narrative priming (5/24 strains complete)
- [ ] Hidden Notes v2 operational plan
- [ ] Beverage-to-receptor mapping
- [ ] Collection optimizer (minimum strain set for full synergy coverage)
- [ ] Session Kit product packaging

---

## Contact

**Charles Pelletier-Gagné**
charles@funden.app

---

*"The flower stays the hero. The blend becomes the amplifier."*

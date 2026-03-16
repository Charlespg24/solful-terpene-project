# Terpene-Sonic Correlation Analysis

*22 strains with per-strain BPM, energy, and valence mapped to receptor activation profiles*

## Executive Summary

This analysis asks: **does the pharmacology predict the music?** When the music layer was designed for each strain, BPM, energy, and valence were assigned intuitively based on the strain's effects and intent. We now test whether those assignments correlate with the receptor activation profiles derived from terpene pharmacology.

If GABA-A activation (sedative) predicts lower BPM, and 5-HT activation (mood) predicts higher valence, then the music layer was pharmacologically intuitive even before the receptor data existed. If correlations are weak or inverted, the music layer may benefit from pharmacology-informed adjustments.

## 1. Dataset

**22 strains** with complete music + terpene + receptor data.

| Parameter | Range | Mean | SD |
|-----------|-------|------|----|
| BPM (midpoint) | 77.5 – 99.0 | 88.98 | 6.62 |
| Energy | 0.3 – 0.6 | 0.44 | 0.09 |
| Valence | 0.4 – 0.6 | 0.51 | 0.08 |

### Per-Strain Music Parameters

| Strain | BPM Range | Energy | Valence | Top Terpene | GABA-A | 5-HT | CB2 |
|--------|-----------|--------|---------|-------------|--------|------|-----|
| Glitter Bomb | 67-88 | 0.30 | 0.38 | Myrcene (1.23%) | 0.55 | 0.01 | 0.19 |
| Avenue of the Giants | 69-90 | 0.31 | 0.39 | Myrcene (1.94%) | 0.87 | 0.00 | 0.19 |
| Black Lime Chem | 69-91 | 0.31 | 0.40 | Myrcene (1.69%) | 0.76 | 0.00 | 0.12 |
| Mule Fuel | 70-92 | 0.32 | 0.41 | Myrcene (2.22%) | 1.00 | 0.13 | 0.15 |
| Blueberry Muffin | 69-91 | 0.34 | 0.42 | β-Caryophyllene (0.47%) | 0.18 | 0.00 | 0.21 |
| Purple Candy Cane | 72-94 | 0.35 | 0.41 | Myrcene (0.54%) | 0.24 | 0.00 | 0.14 |
| Pink Jesus Reserve | 72-95 | 0.38 | 0.43 | β-Caryophyllene (0.78%) | 0.17 | 0.00 | 0.35 |
| Moonlight | 74-97 | 0.38 | 0.46 | Myrcene (0.74%) | 0.33 | 0.00 | 0.23 |
| Lemon Papaya Banana | 73-97 | 0.39 | 0.47 | Myrcene (0.57%) | 0.26 | 0.13 | 0.07 |
| Peach Flambé | 78-102 | 0.46 | 0.51 | β-Caryophyllene (0.25%) | 0.09 | 0.09 | 0.11 |
| Strawberry Biscotti | 78-103 | 0.46 | 0.56 | Limonene (0.38%) | 0.11 | 0.17 | 0.13 |
| Pineapple Mojito | 79-104 | 0.47 | 0.56 | β-Caryophyllene (0.63%) | 0.11 | 0.25 | 0.28 |
| Guava Gift | 80-105 | 0.49 | 0.53 | β-Caryophyllene (0.73%) | 0.15 | 0.23 | 0.33 |
| Natty Bumppo | 80-105 | 0.49 | 0.53 | β-Caryophyllene (0.63%) | 0.09 | 0.16 | 0.28 |
| Tropicanna Cherry | 80-105 | 0.50 | 0.57 | β-Caryophyllene (0.37%) | 0.07 | 0.13 | 0.17 |
| Rasta Governmint | 81-107 | 0.51 | 0.55 | β-Caryophyllene (0.60%) | 0.07 | 0.18 | 0.27 |
| Mike's Bomba | 82-107 | 0.52 | 0.57 | β-Caryophyllene (0.47%) | 0.03 | 0.14 | 0.21 |
| Pinnacle | 83-108 | 0.53 | 0.58 | β-Caryophyllene (0.61%) | 0.03 | 0.21 | 0.27 |
| Carambola | 82-109 | 0.53 | 0.64 | Limonene (0.44%) | 0.05 | 0.20 | 0.08 |
| Tropical Sleigh Ride | 87-111 | 0.55 | 0.59 | β-Ocimene (0.71%) | 0.01 | 0.10 | 0.32 |
| Mandarin Cherry Tree | 84-110 | 0.55 | 0.62 | Limonene (0.52%) | 0.05 | 0.23 | 0.16 |
| Satsuma Sherbet | 84-111 | 0.55 | 0.60 | Limonene (0.55%) | 0.05 | 0.25 | 0.20 |

## 2. Receptor → Music Correlations

Pearson r correlation between receptor activation strength and music parameters. Significant correlations (|r| > 0.3) suggest the music layer implicitly encodes pharmacology.

### BPM

| Receptor | r | Strength | Direction | Interpretation |
|----------|---|----------|-----------|----------------|
| A2A | +0.799*** | STRONG ███████████ | Higher activation → higher bpm | VALIDATES: mood receptor predicts brighter music |
| COX-2 | +0.799*** | STRONG ███████████ | Higher activation → higher bpm | Notable correlation — warrants investigation |
| 5-HT | +0.795*** | STRONG ███████████ | Higher activation → higher bpm | VALIDATES: mood receptor predicts brighter music |
| TRPV1 | -0.780*** | STRONG ███████████ | Higher activation → lower bpm | Notable correlation — warrants investigation |
| GABA-A | -0.777*** | STRONG ███████████ | Higher activation → lower bpm | VALIDATES: sedative receptor predicts calmer music |
| mu-opioid | -0.636*** | MODERATE █████████ | Higher activation → lower bpm | VALIDATES: pain receptor predicts calmer music |
| AChE | -0.525*** | MODERATE ███████ | Higher activation → lower bpm | Notable correlation — warrants investigation |
| BDNF-TrkB | -0.525*** | MODERATE ███████ | Higher activation → lower bpm | Notable correlation — warrants investigation |
| CB1 | -0.279 | NEGLIGIBLE ████ | Higher activation → lower bpm |  |
| TRPA1 | +0.240 | NEGLIGIBLE ███ | Higher activation → higher bpm |  |
| CB2 | +0.240 | NEGLIGIBLE ███ | Higher activation → higher bpm |  |
| NF-kB | +0.240 | NEGLIGIBLE ███ | Higher activation → higher bpm |  |
| PPARgamma | +0.240 | NEGLIGIBLE ███ | Higher activation → higher bpm |  |

### Energy

| Receptor | r | Strength | Direction | Interpretation |
|----------|---|----------|-----------|----------------|
| TRPV1 | -0.818*** | STRONG ████████████ | Higher activation → lower energy | Notable correlation — warrants investigation |
| GABA-A | -0.814*** | STRONG ████████████ | Higher activation → lower energy | VALIDATES: sedative receptor predicts calmer music |
| A2A | +0.804*** | STRONG ████████████ | Higher activation → higher energy | VALIDATES: mood receptor predicts brighter music |
| COX-2 | +0.804*** | STRONG ████████████ | Higher activation → higher energy | Notable correlation — warrants investigation |
| 5-HT | +0.801*** | STRONG ████████████ | Higher activation → higher energy | VALIDATES: mood receptor predicts brighter music |
| mu-opioid | -0.681*** | MODERATE ██████████ | Higher activation → lower energy | VALIDATES: pain receptor predicts calmer music |
| AChE | -0.583*** | MODERATE ████████ | Higher activation → lower energy | Notable correlation — warrants investigation |
| BDNF-TrkB | -0.583*** | MODERATE ████████ | Higher activation → lower energy | Notable correlation — warrants investigation |
| CB1 | -0.311 | WEAK ████ | Higher activation → lower energy | Notable correlation — warrants investigation |
| TRPA1 | +0.241 | NEGLIGIBLE ███ | Higher activation → higher energy |  |
| CB2 | +0.241 | NEGLIGIBLE ███ | Higher activation → higher energy |  |
| NF-kB | +0.241 | NEGLIGIBLE ███ | Higher activation → higher energy |  |
| PPARgamma | +0.241 | NEGLIGIBLE ███ | Higher activation → higher energy |  |

### Valence

| Receptor | r | Strength | Direction | Interpretation |
|----------|---|----------|-----------|----------------|
| A2A | +0.835*** | STRONG ████████████ | Higher activation → higher valence | VALIDATES: mood receptor predicts brighter music |
| COX-2 | +0.835*** | STRONG ████████████ | Higher activation → higher valence | Notable correlation — warrants investigation |
| 5-HT | +0.832*** | STRONG ████████████ | Higher activation → higher valence | VALIDATES: mood receptor predicts brighter music |
| TRPV1 | -0.778*** | STRONG ███████████ | Higher activation → lower valence | Notable correlation — warrants investigation |
| GABA-A | -0.768*** | STRONG ███████████ | Higher activation → lower valence | VALIDATES: sedative receptor predicts calmer music |
| mu-opioid | -0.676*** | MODERATE ██████████ | Higher activation → lower valence | VALIDATES: pain receptor predicts calmer music |
| AChE | -0.533*** | MODERATE ███████ | Higher activation → lower valence | Notable correlation — warrants investigation |
| BDNF-TrkB | -0.533*** | MODERATE ███████ | Higher activation → lower valence | Notable correlation — warrants investigation |
| CB1 | -0.430** | WEAK ██████ | Higher activation → lower valence | Notable correlation — warrants investigation |
| CB2 | +0.098 | NEGLIGIBLE █ | Higher activation → higher valence |  |
| NF-kB | +0.098 | NEGLIGIBLE █ | Higher activation → higher valence |  |
| PPARgamma | +0.098 | NEGLIGIBLE █ | Higher activation → higher valence |  |
| TRPA1 | +0.098 | NEGLIGIBLE █ | Higher activation → higher valence |  |

## 3. Terpene Concentration → Music Correlations

Direct correlation between terpene % and music parameters — the raw chemistry-to-sound relationship.

### BPM

| Terpene | r | Strength | Interpretation |
|---------|---|----------|----------------|
| Limonene | +0.799*** | STRONG ███████████ | VALIDATES: uplifting terpene → brighter music |
| Myrcene | -0.790*** | STRONG ███████████ | VALIDATES: sedative terpene → calmer music |
| α-Pinene | -0.525*** | MODERATE ███████ | Notable correlation |
| α-Humulene | +0.490** | WEAK ███████ | Notable correlation |
| β-Caryophyllene | +0.240 | NEGLIGIBLE ███ | Ubiquitous terpene — correlation reflects overall profile |
| trans-β-Farnesene | +0.215 | NEGLIGIBLE ███ |  |
| α-Bisabolol | -0.196 | NEGLIGIBLE ██ |  |
| Linalool | +0.148 | NEGLIGIBLE ██ |  |
| Terpinolene | -0.115 | NEGLIGIBLE █ |  |
| β-Ocimene | +0.051 | NEGLIGIBLE █ |  |

### Energy

| Terpene | r | Strength | Interpretation |
|---------|---|----------|----------------|
| Myrcene | -0.828*** | STRONG ████████████ | VALIDATES: sedative terpene → calmer music |
| Limonene | +0.804*** | STRONG ████████████ | VALIDATES: uplifting terpene → brighter music |
| α-Pinene | -0.583*** | MODERATE ████████ | Notable correlation |
| α-Humulene | +0.508*** | MODERATE ███████ | Notable correlation |
| β-Caryophyllene | +0.241 | NEGLIGIBLE ███ | Ubiquitous terpene — correlation reflects overall profile |
| trans-β-Farnesene | +0.222 | NEGLIGIBLE ███ |  |
| Linalool | +0.185 | NEGLIGIBLE ██ |  |
| α-Bisabolol | -0.182 | NEGLIGIBLE ██ |  |
| Terpinolene | -0.150 | NEGLIGIBLE ██ |  |

### Valence

| Terpene | r | Strength | Interpretation |
|---------|---|----------|----------------|
| Limonene | +0.835*** | STRONG ████████████ | VALIDATES: uplifting terpene → brighter music |
| Myrcene | -0.791*** | STRONG ███████████ | VALIDATES: sedative terpene → calmer music |
| α-Pinene | -0.533*** | MODERATE ███████ | Notable correlation |
| α-Humulene | +0.343 | WEAK █████ | Notable correlation |
| Linalool | +0.294 | NEGLIGIBLE ████ |  |
| trans-β-Farnesene | +0.193 | NEGLIGIBLE ██ |  |
| Terpinolene | -0.130 | NEGLIGIBLE █ |  |
| β-Caryophyllene | +0.098 | NEGLIGIBLE █ | Ubiquitous terpene — correlation reflects overall profile |
| α-Bisabolol | -0.091 | NEGLIGIBLE █ |  |
| β-Ocimene | -0.045 | NEGLIGIBLE █ |  |

## 4. Aggregate Metrics

| Metric | → BPM | → Energy | → Valence |
|--------|-------|----------|-----------|
| Total terpene % | -0.339 | -0.396 | -0.388 |
| Active receptor count | -0.382 | -0.424 | -0.476 |
| Terpene diversity | +0.083 | +0.073 | +0.139 |

## 5. Key Findings

### Strongest Correlations

- **A2A** (receptor) positively correlates with **valence** (r=+0.835)
- **COX-2** (receptor) positively correlates with **valence** (r=+0.835)
- **Limonene** (terpene) positively correlates with **valence** (r=+0.835)
- **5-HT** (receptor) positively correlates with **valence** (r=+0.832)
- **Myrcene** (terpene) negatively correlates with **energy** (r=-0.828)
- **TRPV1** (receptor) negatively correlates with **energy** (r=-0.818)
- **GABA-A** (receptor) negatively correlates with **energy** (r=-0.814)
- **A2A** (receptor) positively correlates with **energy** (r=+0.804)
- **COX-2** (receptor) positively correlates with **energy** (r=+0.804)
- **Limonene** (terpene) positively correlates with **energy** (r=+0.804)
- **5-HT** (receptor) positively correlates with **energy** (r=+0.801)
- **A2A** (receptor) positively correlates with **BPM** (r=+0.799)
- **COX-2** (receptor) positively correlates with **BPM** (r=+0.799)
- **Limonene** (terpene) positively correlates with **BPM** (r=+0.799)
- **5-HT** (receptor) positively correlates with **BPM** (r=+0.795)

### Pharmacological Validation

Does the music layer encode pharmacology? We check whether receptor-music correlations align with pharmacological expectations:

**Validated (music aligns with pharmacology):**
- GABA-A (sedative) → lower bpm (r=-0.777)
- mu-opioid (pain/sedation) → lower bpm (r=-0.636)
- GABA-A (sedative) → lower energy (r=-0.814)
- mu-opioid (pain/sedation) → lower energy (r=-0.681)
- A2A (mood) → higher valence (r=+0.835)
- 5-HT (mood) → higher valence (r=+0.832)

**No strong mismatches detected.**

## 6. Recommendations

### For Music Layer Refinement

- **A2A** is the strongest predictor of BPM (r=+0.799). Consider explicitly using A2A activation level when calibrating BPM for new strains.
- **TRPV1** is the strongest predictor of energy (r=-0.818). Consider explicitly using TRPV1 activation level when calibrating energy for new strains.
- **A2A** is the strongest predictor of valence (r=+0.835). Consider explicitly using A2A activation level when calibrating valence for new strains.

### For Strain-Music Recalibration


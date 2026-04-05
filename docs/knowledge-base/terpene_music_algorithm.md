# Terpene → Spotify Audio Parameter Algorithm
### Vibe Curator — Sonic Layer Reference

---

## Core Principle: The Iso Principle

Playlists don't jump straight to the target state. They **match the listener's current arousal** and gradually shift toward the strain's effect profile over 15–45 minutes. This mirrors how terpenes work: onset, then effect.

For personalized playlists, the user's own listening history defines the **departure point**. The strain parameters define the **destination**. The arc is:

> `user_baseline → weighted terpene target`

---

## Scientific Foundation

The mapping rests on three validated bridges:

**1. Neurochemical Parallelism**
Terpenes modulate GABA-A, serotonin (5-HT1A/2A), dopamine, and cannabinoid receptors. Music demonstrably modulates dopamine release in the nucleus accumbens and caudate, serotonin metabolites, and GABA-mediated relaxation responses (Ferreri et al., 2019, *PNAS*; Salimpoor et al., 2011).

**2. Crossmodal Correspondences**
Crisinel & Spence (2012, *Chemical Senses*) established that citrus scents reliably map to higher pitches and bright timbres, while earthy/musky scents map to lower pitches and brass instruments. These aren't arbitrary — they reflect shared hedonic and intensity coding.

**3. Russell's Arousal-Valence Circumplex**
Both mood states and musical characteristics map onto the same two axes: arousal (sedating ↔ stimulating) and valence (negative ↔ positive). This enables systematic terpene → music translation.

> **Note:** No studies have directly tested terpene exposure combined with music listening. These mappings synthesize analogical connections from adjacent research.

---

## The 8-Terpene Parameter Map

| Terpene | BPM | Energy | Valence | Danceability | Acousticness | Instrumentalness | Genre Anchors |
|---|---|---|---|---|---|---|---|
| **Myrcene** | 60–85 | 0.1–0.3 | 0.2–0.4 | Low | High | High | Ambient, dub, lo-fi, downtempo |
| **Limonene** | 100–125 | 0.6–0.85 | 0.6–0.9 | High | Low | Low | Funk, soul, bright pop, afrobeat |
| **β-Caryophyllene** | 85–110 | 0.3–0.5 | 0.4–0.6 | Moderate | Moderate | Moderate | Deep house, roots reggae, jazz |
| **Linalool** | 60–80 | 0.1–0.3 | 0.4–0.6 | Low | 0.6+ | Moderate | Ambient, classical-adjacent, soft folk |
| **α-Pinene** | 100–130 | 0.6–0.8 | 0.5–0.7 | Moderate | Moderate | High | Folk, bluegrass, crisp acoustic, post-rock |
| **Terpinolene** | 85–110 | 0.4–0.65 | 0.5–0.75 | 0.45–0.70 | 0.3–0.6 | 0.4–0.8 | Art pop, psychedelic rock, progressive electronic |
| **α-Humulene** | 75–100 | 0.3–0.5 | 0.35–0.55 | 0.35–0.55 | 0.5–0.85 | Moderate | Dub reggae, downtempo, roots, folk |
| **Ocimene** | 120+ | 0.7–0.9 | 0.6–0.8 | High | Low | Moderate | Electronic, dance, vivid indie pop |

### Per-Terpene Notes

**Myrcene (sedative anchor)**
Upregulates GABA-A receptor subunits (α1, γ2) and 5-HT1A. Produces "couch-lock" at >0.5%. Parallels benzodiazepine mechanism without addiction profile. Music: slow, warm, deep bass, 60–80 BPM approaching resting heart rate.

**Limonene (uplifting)**
Elevates serotonin and dopamine in prefrontal cortex. Confirmed A2a agonism (Spindle et al., 2024). Music: major keys, bright production, high valence, upbeat feel.

**β-Caryophyllene (grounding)**
Full CB2 agonist (Ki = 155 nM, Gertsch 2008). Grounding without psychoactivity. Music: warm analog sounds, moderate tempo, bass-forward groove.

**Linalool (calming)**
GABA-A anxiolytic via olfactory-limbic pathway (Harada 2018 — effects abolished by anosmia). Music: high acousticness, gentle dynamics, soft, low loudness.

**α-Pinene (alerting)**
Acetylcholinesterase inhibitor. Associated with alertness and memory. Music: clean, crisp, high energy with organic clarity.

**Terpinolene (paradoxical)**
Sedative foundation with uplifting expression. CNS sedation plus 5-HT2A antinociception. Music: relaxed but mentally stimulating — complex textures, creative without frenetic.

**α-Humulene (earthy centering)**
NF-κB and AP-1 inhibition. Unique appetite suppression. Grounding without significant sedation or stimulation. Music: deep foundation with clear presence, organic textures.

**Ocimene (bright energizer)**
COX-2 inhibition, anti-inflammatory. Associated with cerebral and invigorating rather than soothing effects. Music: bright, energetic, complex.

---

## Algorithm: Strain → Spotify Parameters

### Step 1: Pull Terpene Profile
Source from SC Labs COA. Use percentage by dry weight.

```
strain_profile = {
  "myrcene": 0.45,
  "limonene": 0.30,
  "beta_caryophyllene": 0.15,
  "linalool": 0.10
}
```

### Step 2: Normalize to Ratios
```
total = sum(strain_profile.values())
ratios = { t: v / total for t, v in strain_profile.items() }
# → { myrcene: 0.45, limonene: 0.30, b_caryophyllene: 0.15, linalool: 0.10 }
```

### Step 3: Weighted Blend of Audio Parameters
Multiply each terpene's target value by its ratio and sum:

```
target_bpm = (0.45 × 72) + (0.30 × 112) + (0.15 × 97) + (0.10 × 70)
           = 32.4 + 33.6 + 14.6 + 7.0
           = 87.6 BPM

target_energy = (0.45 × 0.20) + (0.30 × 0.72) + (0.15 × 0.40) + (0.10 × 0.20)
              = 0.09 + 0.22 + 0.06 + 0.02
              = 0.39
```

Repeat for: `energy`, `valence`, `danceability`, `acousticness`, `instrumentalness`

### Step 4: Apply Iso Offset
Shift parameters ~0.15–0.20 units toward neutral at session start. Arc toward target over the session length.

```
iso_energy_start = target_energy + (user_baseline_energy - target_energy) × 0.75
iso_valence_start = target_valence + (user_baseline_valence - target_valence) × 0.75
```

### Step 5: Spotify Recommendations API Call
```javascript
const params = {
  seed_genres: deriveGenres(dominantTerpene),   // or seed_artists from user top artists
  target_tempo: Math.round(target_bpm),
  target_energy: target_energy,
  target_valence: target_valence,
  target_danceability: target_danceability,
  target_acousticness: target_acousticness,
  target_instrumentalness: target_instrumentalness,
  limit: 30
};

GET https://api.spotify.com/v1/recommendations?{params}
```

---

## Personalization Layer (User Listening History)

### Pull User Audio Profile
```javascript
// 1. Fetch user's top 50 tracks
GET /v1/me/top/tracks?time_range=medium_term&limit=50

// 2. Get audio features for all 50
GET /v1/audio-features?ids={comma_separated_track_ids}

// 3. Average the features → user baseline
user_baseline = {
  energy: avg(tracks.map(t => t.energy)),
  valence: avg(tracks.map(t => t.valence)),
  tempo: avg(tracks.map(t => t.tempo)),
  danceability: avg(tracks.map(t => t.danceability)),
  acousticness: avg(tracks.map(t => t.acousticness)),
}
```

### Use Baseline as Iso Departure Point
```javascript
// Compute arc from user baseline to strain target
function computeIsoStart(userBaseline, strainTarget, isoStrength = 0.75) {
  return {
    energy: strainTarget.energy + (userBaseline.energy - strainTarget.energy) * isoStrength,
    valence: strainTarget.valence + (userBaseline.valence - strainTarget.valence) * isoStrength,
    tempo: strainTarget.tempo + (userBaseline.tempo - strainTarget.tempo) * isoStrength,
    // etc.
  };
}

// Session arc: [isoStart] → [midpoint] → [strainTarget]
// Implement as 3 consecutive API calls, each with tighter parameters
```

### Seed With User's Preferred Artists
```javascript
// Pull user's top artists in the genre cluster matching dominant terpene
const topArtists = await fetchTopArtists('medium_term');
const genreCluster = terpeneToGenres[dominantTerpene]; // e.g. ['ambient', 'lo-fi', 'downtempo']
const matchedArtists = topArtists.filter(a => a.genres.some(g => genreCluster.includes(g)));
const seedArtists = matchedArtists.slice(0, 2).map(a => a.id); // max 5 seeds total
```

---

## Genre Derivation Function

```javascript
const terpeneGenres = {
  myrcene:           ['ambient', 'lo-fi', 'dub', 'downtempo', 'trip-hop'],
  limonene:          ['funk', 'soul', 'afrobeat', 'pop', 'disco'],
  beta_caryophyllene:['deep-house', 'reggae', 'jazz', 'soul'],
  linalool:          ['ambient', 'classical', 'folk', 'new-age'],
  alpha_pinene:      ['folk', 'bluegrass', 'acoustic', 'post-rock'],
  terpinolene:       ['psychedelic', 'art-pop', 'progressive', 'experimental'],
  alpha_humulene:    ['dub', 'downtempo', 'roots', 'world-music'],
  ocimene:           ['electronic', 'dance', 'indie-pop', 'synth-pop']
};

function deriveGenres(terpeneRatios, maxGenres = 3) {
  // Weight genres by terpene contribution, deduplicate, return top N
  const scored = {};
  for (const [terpene, ratio] of Object.entries(terpeneRatios)) {
    for (const genre of terpeneGenres[terpene] || []) {
      scored[genre] = (scored[genre] || 0) + ratio;
    }
  }
  return Object.entries(scored)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxGenres)
    .map(([genre]) => genre);
}
```

---

## Prompt Architecture (for Spotify AI DJ)

Each strain prompt follows this structure:
1. **Session length** — 45–90 minutes
2. **Emotional arc** — matching the effect intent trajectory
3. **Tempo/energy targets** — derived from dominant terpene
4. **Texture/timbre descriptors** — from secondary terpenes
5. **Artist/genre anchors** — concrete references grounding the vibe
6. **Phase guidance** — onset / peak / comedown

---

*Vibe Curator — Terpenes, With a Twist of Aromatherapy*
*Last updated: March 2026*

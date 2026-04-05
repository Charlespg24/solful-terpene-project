# Vibe Curator — Session Notes
### Terpene × Spotify Playlist Engine
*April 5, 2026*

---

## What We Built This Session

Three deliverables:

1. **Terpene → Music Algorithm Reference** (`terpene_music_algorithm.md`)
2. **Full Spotify API Implementation** (`VibeCuratorSpotify.jsx`)
3. This session summary

---

## 1. The Algorithm (Summary)

### Core Thesis
The same neurochemical pathways terpenes act on — GABA-A, serotonin 5-HT1A/2A, dopamine, CB2 — are also modulated by music. A strain's terpene fingerprint can be translated into specific Spotify audio parameters that reinforce the same physiological state the flower produces.

### Scientific Foundation

**Neurochemical Parallelism** — Terpenes and music both modulate dopamine (nucleus accumbens/caudate), serotonin metabolites, and GABA-mediated relaxation (Ferreri et al., 2019, *PNAS*; Salimpoor et al., 2011).

**Crossmodal Correspondences** — Crisinel & Spence (2012, *Chemical Senses*): citrus scents map reliably to higher pitches and bright timbres; earthy/musky scents map to lower pitches and brass. Not arbitrary — shared hedonic and intensity coding.

**Russell's Arousal-Valence Circumplex** — Both mood states and musical characteristics map onto the same two axes (sedating ↔ stimulating, negative ↔ positive), enabling systematic terpene → music translation.

> No studies have directly tested terpene exposure combined with music listening. These mappings synthesize analogical connections from adjacent research.

---

### The Iso Principle

Playlists don't jump to the target state. They **match the listener's current arousal** and gradually arc toward the strain's effect profile over 15–45 minutes — mirroring how terpenes themselves work.

For personalized playlists:
- **Departure point** = user's own audio baseline (computed from their top 50 Spotify tracks)
- **Destination** = weighted terpene target
- **Arc** = `user_baseline → strain_target` with 70% iso strength at session start

---

### 8-Terpene Audio Parameter Map

| Terpene | BPM | Energy | Valence | Danceability | Acousticness | Instrumentalness | Genres |
|---|---|---|---|---|---|---|---|
| Myrcene | 60–85 | 0.10–0.30 | 0.20–0.40 | Low | High | High | Ambient, dub, lo-fi, downtempo |
| Limonene | 100–125 | 0.60–0.85 | 0.60–0.90 | High | Low | Low | Funk, soul, bright pop, afrobeat |
| β-Caryophyllene | 85–110 | 0.30–0.50 | 0.40–0.60 | Moderate | Moderate | Moderate | Deep house, roots reggae, jazz |
| Linalool | 60–80 | 0.10–0.30 | 0.40–0.60 | Low | 0.6+ | Moderate | Ambient, classical-adjacent, soft folk |
| α-Pinene | 100–130 | 0.60–0.80 | 0.50–0.70 | Moderate | Moderate | High | Folk, bluegrass, crisp acoustic |
| Terpinolene | 85–110 | 0.40–0.65 | 0.50–0.75 | 0.45–0.70 | 0.30–0.60 | 0.40–0.80 | Art pop, psychedelic rock, prog electronic |
| α-Humulene | 75–100 | 0.30–0.50 | 0.35–0.55 | 0.35–0.55 | 0.50–0.85 | Moderate | Dub reggae, downtempo, roots |
| Ocimene | 120+ | 0.70–0.90 | 0.60–0.80 | High | Low | Moderate | Electronic, dance, vivid indie pop |

---

### Algorithm Steps (for a given strain)

**Step 1 — Pull terpene profile** from SC Labs COA (% dry weight per compound)

**Step 2 — Normalize to ratios**
```
total = sum of all terpene percentages
ratio[terpene] = terpene_pct / total
```

**Step 3 — Weighted blend**
```
target_bpm = Σ (ratio[t] × terpene_params[t].tempo)
target_energy = Σ (ratio[t] × terpene_params[t].energy)
// repeat for valence, danceability, acousticness, instrumentalness
```

Example (Myrcene 45%, Limonene 30%, β-Caryophyllene 15%, Linalool 10%):
```
target_bpm = (0.45 × 72) + (0.30 × 112) + (0.15 × 97) + (0.10 × 70) = 87.6
target_energy = (0.45 × 0.20) + (0.30 × 0.72) + (0.15 × 0.40) + (0.10 × 0.20) = 0.39
```

**Step 4 — Apply iso offset**
```
iso_energy = strain_target + (user_baseline - strain_target) × 0.70
```
Applied to: energy, valence, danceability, acousticness, instrumentalness
Tempo uses a softer offset (0.35 strength) to avoid jarring BPM mismatches.

**Step 5 — Spotify Recommendations API call**
```
GET /v1/recommendations?
  seed_genres={derived_genres}
  seed_artists={user_top_artists}
  seed_tracks={user_top_tracks}
  target_energy={iso_energy}
  target_valence={iso_valence}
  target_tempo={target_bpm}
  target_danceability={iso_danceability}
  target_acousticness={iso_acousticness}
  target_instrumentalness={iso_instrumentalness}
  min/max bounds: ±0.20 for ratios, ±25 BPM for tempo
  limit=25
```

---

## 2. The Spotify API Implementation

### File: `VibeCuratorSpotify.jsx`

Self-contained React component. Drop into any React or Expo project.

### Architecture

```
VibeCuratorSpotify.jsx
│
├── PKCE Auth Flow
│   ├── generateCodeVerifier()
│   ├── generateCodeChallenge()
│   ├── initiateSpotifyAuth()
│   └── exchangeCodeForToken()
│
├── Spotify API Client (createSpotifyClient)
│   ├── getUserAudioProfile()     ← top 50 tracks → avg audio features
│   ├── getMe()
│   ├── getRecommendations()      ← core call with full param targeting
│   └── savePlaylist()
│
├── Algorithm
│   ├── TERPENE_PARAMS            ← 8-terpene mapping table
│   ├── STRAINS                   ← 12 Solful strains with SC Labs data
│   ├── computeAudioTarget()      ← normalized weighted blend
│   └── applyIsoOffset()          ← baseline → target arc
│
└── UI
    ├── Connect screen (pre-auth)
    ├── User audio profile card
    ├── Strain grid with terpene bars
    ├── Algorithm output panel (params + iso arc visualization)
    ├── Track list with Spotify links
    └── Save to Spotify button
```

### Scopes Required
```
user-top-read
playlist-modify-public
playlist-modify-private
user-read-private
```

### Setup
1. Create a Spotify App at https://developer.spotify.com/dashboard
2. Set Redirect URI to your deployed URL (or `http://localhost:3000` for local)
3. Replace `YOUR_SPOTIFY_CLIENT_ID` at top of file
4. No backend needed — PKCE auth is entirely frontend-safe

### Seed Strategy (max 5 seeds total)
```
1 user top track  (personalization anchor)
2 user top artists (listening history)
2 derived genre seeds (terpene algorithm output)
```

### Solful Strains Included
| Strain | Farm | Region | Dominant Terpene |
|---|---|---|---|
| Mike's Bomba | Glentucky Family Farm | Sonoma | Myrcene |
| Blueberry Muffin | Glentucky Family Farm | Sonoma | Myrcene |
| Strawberry Biscotti | Happy Day Farms | Mendocino | Limonene |
| Pink Rider | Glentucky Family Farm | Sonoma | Terpinolene |
| Carambola | Moon Made Farms | Humboldt | Limonene |
| Mule Fuel | Fiddler's Greens | Mendocino | Myrcene |
| Pinnacle | Dos Rios Farms | Mendocino | β-Caryophyllene |
| Tropical Sleigh Ride | Wonderland Nursery | Trinity | Terpinolene |
| Glitter Bomb | Moon Made Farms | Humboldt | Myrcene |
| Guava Gift | Glentucky Family Farm | Sonoma | Limonene |
| Love and Laughter | Fiddler's Greens | Mendocino | α-Pinene |
| Avenue of the Giants | Fiddler's Greens | Mendocino | Terpinolene |

---

## 3. Next Steps / Open Items

- **Add remaining 12 strains** to the `STRAINS` array in the JSX (Pink Jesus Reserve, Tropical Sleigh Ride full profile, Mule Fuel, Moonlight, Natty Bumppo, Peach Flambé, Rasta Governmint, Satsuma Sherbet, Mandarin Cherry Tree, Lemon Papaya Banana, Black Lime Chem, Tropicanna Cherry, Purple Candy Cane)
- **Session arc implementation** — currently sends iso parameters for the full session; a more advanced version would make 3 sequential API calls (onset / peak / comedown) with progressively tighter targeting
- **Audio features on returned tracks** — fetch `/audio-features` for the playlist results to show actual energy/valence per track (currently using `popularity` as a proxy bar)
- **Terpinolene paradox handling** — terpinolene's sedative-yet-uplifting profile may need a bimodal blend strategy (two separate recommendation calls, merged)
- **Integrate with Vibe Curator app** — this component is the Sonic Layer (Layer 3) of the 15-layer system; the strain selector here should connect to the full strain library rather than the hardcoded subset
- **Local prototype → live URL** — current PKCE flow works on localhost; deploy to Vercel/Netlify with the correct redirect URI to make it demo-ready for Solful pitch

---

*Vibe Curator — Terpenes, With a Twist of Aromatherapy*

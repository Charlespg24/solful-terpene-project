# Solful Sessions — Product Specification

**Version:** 1.0
**Last Updated:** February 2026
**Author:** Charles Pelletier-Gagné

---

## Executive Summary

**Solful Sessions** is a B2C mobile app that transforms cannabis consumption from chance to design. Users select an intention ("How do you want to feel?"), receive strain recommendations matched to that intention, get the corresponding aromatherapy blend instructions, and generate a tailored music playlist—creating an orchestrated, multi-sensory session.

### Core Value Proposition

> "Most people smoke whatever's in the jar and put on random music. Solful Sessions designs the entire experience—strain, scent, and sound—around how you actually want to feel."

### Platform Positioning

- **Solful-first, open platform**: Solful's 23 strains are the flagship experience with complete terpene data, oil recipes, and music mappings. Users can also add any strain to their personal humidor.
- **Growth flywheel**: Users discover the app through Solful → continue using it with any cannabis → return to Solful for the premium integrated experience.

---

## Target Users

### Primary Persona: The Intentional Consumer

**Demographics:** 25-45, cannabis-legal states, $75k+ income, wellness-oriented
**Behaviors:**
- Chooses strains by effect, not just THC%
- Interested in the "why" behind their experiences
- Uses cannabis for specific purposes (creativity, relaxation, social, sleep)
- Likely already uses Spotify, meditation apps, or wellness tech
- Values quality over quantity

**Pain Points:**
- "I never know which strain to pick"
- "Sometimes I get the vibe I want, sometimes I don't—feels random"
- "I want my sessions to be more intentional but don't know where to start"
- "I have a bunch of strains at home and forget what each one does"

### Secondary Persona: The Curious Explorer

**Demographics:** 21-35, newer to cannabis or returning after a break
**Behaviors:**
- Overwhelmed by strain choices at dispensaries
- Wants guidance without feeling judged
- Interested in the science but needs it accessible
- Likely to share discoveries with friends

**Pain Points:**
- "There are too many options and I don't understand the differences"
- "I want to try cannabis for sleep/creativity/anxiety but don't know where to start"
- "The budtender recommendations feel generic"

---

## Feature Specification

### 1. Intent System

The intent system is the conceptual core of the app. Users think in intentions; the app translates to terpenes, strains, and music.

#### 1.1 Intent Tiles

Eight primary intents based on cannabis consumption research:

| Intent | Icon | Description | Dominant Terpenes | Prevalence* |
|--------|------|-------------|-------------------|-------------|
| Deep Relax | 🛋️ | Melt into the couch, let go of tension | Myrcene + Linalool | 59-61% |
| Sleep | 🌙 | Drift off, stay asleep, wake rested | Myrcene (high dose) | 29-74% |
| Calm Focus | 🎯 | Clear-headed productivity, study sessions | Pinene + Limonene | 9% |
| Create | 🎨 | Unlock ideas, artistic flow, imagination | Terpinolene + Limonene | 16% |
| Energize | ⚡ | Get moving, workout, active adventures | Limonene + Ocimene | 15% |
| Socialize | 🎉 | Conversation, laughter, connection | Limonene + Caryophyllene | 35% |
| Unwind | 🍃 | Decompress after work, gentle landing | Caryophyllene + Humulene | 35-50% |
| Meditate | 🧘 | Stillness, presence, inner exploration | Linalool + Pinene | 10% |

*Prevalence = % of cannabis consumers who report this as a primary use case (research-based)

#### 1.2 Intent-to-Terpene Mapping Algorithm

Each intent maps to a weighted terpene preference profile:

```
Intent: "Deep Relax"
Terpene Weights:
  - Myrcene: 0.40 (primary)
  - Linalool: 0.30 (primary)
  - β-Caryophyllene: 0.15 (supportive)
  - α-Humulene: 0.10 (supportive)
  - Limonene: 0.05 (counterbalance - avoid high levels)
```

#### 1.3 Strain Matching Score

For each strain, calculate an intent match score:

```
match_score = Σ (strain_terpene_% × intent_terpene_weight) / total_strain_terpenes

Adjustments:
  - Bonus: +0.1 if dominant terpene matches intent's primary
  - Penalty: -0.1 if high levels of "avoid" terpenes for that intent
  - CBD bonus: +0.05 for "Calm Focus" and "Meditate" intents
```

Display as: "92% match for Deep Relax"

---

### 2. Humidor (Personal Inventory)

The humidor is the user's cannabis collection—a persistent inventory that powers personalized recommendations.

#### 2.1 Data Model: Humidor Strain

```typescript
interface HumidorStrain {
  id: string;
  strainId: string;                    // Reference to strain database
  userId: string;

  // Inventory tracking
  quantity: 'full' | 'half' | 'low' | 'empty';
  purchaseDate?: Date;
  purchaseLocation?: string;           // "Solful Sebastopol"

  // Personalization
  personalNotes?: string;
  personalRating?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];                     // User-created: "morning", "guests", etc.

  // Usage tracking
  sessionCount: number;
  lastSessionDate?: Date;
  averageRating?: number;              // Calculated from session ratings

  // Timestamps
  addedAt: Date;
  updatedAt: Date;
}
```

#### 2.2 Data Model: Strain (Database)

```typescript
interface Strain {
  id: string;
  name: string;

  // Source
  source: 'solful' | 'community' | 'custom';
  farm?: string;
  region?: string;

  // Cannabinoid profile
  thcPercent?: number;
  cbdPercent?: number;
  otherCannabinoids?: Record<string, number>;  // CBG, THCV, etc.

  // Terpene profile
  totalTerpenes?: string;              // "2.34%"
  terpenes: TerpeneEntry[];
  dominantTerpene: string;

  // Experience
  intent: string;                      // "Open and expansive, easy social lift"
  effects: string[];                   // ["Social", "Inspiring", "Euphoric"]
  aroma: string[];                     // ["Fresh Guava", "Lemon Rind", "Tamarind"]

  // Essential oil pairing (Solful strains only)
  oilBlend?: OilBlendRecipe;

  // Music profile (calculated from terpenes)
  musicProfile: SpotifyAudioFeatures;

  // Metadata
  imageUrl?: string;
  badges?: string[];                   // ["CBD", "Award Winner", "Rare"]
  solfulUrl?: string;                  // Link to purchase
}

interface TerpeneEntry {
  name: string;                        // "β-Caryophyllene"
  percentage: string;                  // "0.73%"
  percentageNumeric: number;           // 0.73
}

interface OilBlendRecipe {
  totalDrops: number;
  oils: OilEntry[];
  rationale: string;
}

interface OilEntry {
  name: string;                        // "Black Pepper"
  drops: number;
  primaryTerpene: string;              // "β-Caryophyllene"
}
```

#### 2.3 Humidor Features

**Add Strain:**
- Search Solful collection (pre-populated, complete data)
- Search community strains (crowdsourced data)
- Add custom strain (manual entry or "unknown profile")
- Scan packaging (future: OCR for strain name + lab results)

**View Strain Card:**
- Terpene profile visualization (bar chart)
- Intent match indicators (which vibes this strain supports)
- Essential oil blend (if Solful strain)
- Session history with this strain
- Personal notes and rating

**Inventory Management:**
- Quantity status (full → half → low → empty)
- "Running low" notifications
- "Reorder from Solful" quick action (deep link to product page)
- Archive empty strains (keep history, hide from active view)

**Smart Features:**
- "It's been 30 days since you smoked [strain]" - rediscovery prompts
- "Based on your ratings, you might like..." - personalized recommendations
- "You're low on relaxing strains" - inventory balance alerts

---

### 3. Session Flow

A session is the orchestrated experience from intention to completion.

#### 3.1 Session States

```
[Not Started] → [Planning] → [Pre-Session] → [Active] → [Completed]
```

#### 3.2 Session Data Model

```typescript
interface Session {
  id: string;
  userId: string;

  // Planning
  intentId: string;                    // "deep_relax"
  strainId: string;
  humidorStrainId: string;             // Reference to user's inventory item

  // Pre-session
  plannedDuration: number;             // minutes
  diffuserReminderSent: boolean;
  musicPrompt: string;                 // Generated prompt
  spotifyPlaylistUrl?: string;         // If user saves/shares the playlist

  // Active session
  startedAt?: Date;
  actualDuration?: number;

  // Completion
  completedAt?: Date;
  rating?: 1 | 2 | 3 | 4 | 5;
  moodBefore?: string;                 // "stressed", "tired", "neutral", etc.
  moodAfter?: string;
  notes?: string;

  // Feedback for algorithm improvement
  musicFit?: 'perfect' | 'good' | 'okay' | 'off';
  intentAchieved?: boolean;
  wouldRepeat?: boolean;
}
```

#### 3.3 Session Flow UX

**Step 1: Entry Point (Flexible)**

*Path A: Intent-First*
```
Home Screen
  → Tap intent tile (e.g., "Unwind")
  → See matching strains
      - "From Your Humidor" (strains you have)
      - "Try Something New" (Solful recommendations)
  → Select strain
  → Continue to Pre-Session
```

*Path B: Strain-First*
```
Home Screen or Humidor
  → Tap strain (e.g., "Guava Gift")
  → See compatible intents for this strain
      - "Best for: Socialize (92%), Energize (78%), Create (71%)"
  → Select intent
  → Continue to Pre-Session
```

**Step 2: Pre-Session Setup**

```
┌─────────────────────────────────────┐
│         PLANNING YOUR SESSION        │
├─────────────────────────────────────┤
│                                     │
│  🍃 Guava Gift                      │
│  ✨ Intent: Socialize               │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  SESSION LENGTH                     │
│  [60 min] [90 min] [120 min]        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  🧴 AROMATHERAPY BLEND              │
│  Start diffusing now for best       │
│  results (30 min before)            │
│                                     │
│  Black Pepper (14 drops)            │
│  Grapefruit (10 drops)              │
│  Lemongrass (8 drops)               │
│  Basil (6 drops)                    │
│  Rosemary (2 drops)                 │
│                                     │
│  [View Full Recipe]                 │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  🎵 YOUR PLAYLIST                   │
│                                     │
│  [Generate Music Prompt]            │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [ Start 30-Min Countdown ]         │
│  [ Skip to Session → ]              │
│                                     │
└─────────────────────────────────────┘
```

**Step 3: Pre-Session Countdown**

- 30-minute countdown timer
- Notification at 30 min: "Start your diffuser now"
- Notification at 5 min: "Almost time—get comfortable"
- Option to extend or skip ahead
- Ambient screen mode (clock + gentle animation)

**Step 4: Active Session**

```
┌─────────────────────────────────────┐
│                                     │
│            🌿                       │
│                                     │
│       Guava Gift                    │
│       Socialize                     │
│                                     │
│         47:23                       │
│      ───●────────                   │
│                                     │
│  🎵 Now Playing                     │
│  Open Spotify →                     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  How are you feeling?               │
│  [😌] [😊] [🤩] [😴] [🤔]           │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│       [ End Session ]               │
│                                     │
└─────────────────────────────────────┘
```

- Minimal UI, ambient mode
- Elapsed time display
- Quick mood check-in (optional, non-intrusive)
- Deep link to Spotify
- Gentle notification at planned duration: "Your session is complete. How was it?"

**Step 5: Session Complete**

```
┌─────────────────────────────────────┐
│         SESSION COMPLETE            │
├─────────────────────────────────────┤
│                                     │
│  🍃 Guava Gift × Socialize          │
│  Duration: 1h 23m                   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  How was this session?              │
│  ⭐ ⭐ ⭐ ⭐ ☆                        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Did the music fit?                 │
│  [Perfect] [Good] [Okay] [Off]      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Did you achieve your intent?       │
│  [Yes, totally] [Mostly] [Not quite]│
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Add a note (optional)              │
│  ┌─────────────────────────────┐   │
│  │ Great conversations with    │   │
│  │ friends, music was perfect  │   │
│  └─────────────────────────────┘   │
│                                     │
│       [ Save & Close ]              │
│                                     │
└─────────────────────────────────────┘
```

---

### 4. Music Prompt Generator

The music prompt generator translates strain terpene profiles + user intent into a natural language prompt optimized for Spotify's AI playlist creation.

#### 4.1 Terpene-to-Audio Mapping

Based on the Terpene DJ research framework:

```typescript
interface TerpeneAudioProfile {
  tempo: { min: number; max: number };
  energy: { min: number; max: number };
  valence: { min: number; max: number };
  danceability: { min: number; max: number };
  acousticness: { min: number; max: number };
  instrumentalness: { min: number; max: number };
  mode?: 'major' | 'minor' | 'either';
  genres: string[];
  artistSeeds: string[];
}

const TERPENE_AUDIO_PROFILES: Record<string, TerpeneAudioProfile> = {
  'myrcene': {
    tempo: { min: 55, max: 75 },
    energy: { min: 0.10, max: 0.30 },
    valence: { min: 0.25, max: 0.45 },
    danceability: { min: 0.20, max: 0.45 },
    acousticness: { min: 0.60, max: 1.0 },
    instrumentalness: { min: 0.70, max: 1.0 },
    mode: 'either',
    genres: ['ambient', 'drone', 'lo-fi', 'shoegaze', 'space music'],
    artistSeeds: ['Brian Eno', 'Tycho', 'Boards of Canada', 'Hammock']
  },
  'limonene': {
    tempo: { min: 100, max: 130 },
    energy: { min: 0.55, max: 0.80 },
    valence: { min: 0.65, max: 0.90 },
    danceability: { min: 0.60, max: 0.85 },
    acousticness: { min: 0.20, max: 0.60 },
    instrumentalness: { min: 0.30, max: 0.80 },
    mode: 'major',
    genres: ['indie pop', 'funk', 'disco', 'tropical house', 'bossa nova'],
    artistSeeds: ['Parcels', 'Jungle', 'Khruangbin', 'Tom Misch']
  },
  'caryophyllene': {
    tempo: { min: 80, max: 105 },
    energy: { min: 0.35, max: 0.55 },
    valence: { min: 0.40, max: 0.60 },
    danceability: { min: 0.40, max: 0.60 },
    acousticness: { min: 0.40, max: 0.80 },
    instrumentalness: { min: 0.50, max: 0.90 },
    mode: 'either',
    genres: ['jazz', 'neo-soul', 'trip-hop', 'roots reggae', 'acoustic folk'],
    artistSeeds: ['BadBadNotGood', 'Hiatus Kaiyote', 'Massive Attack', 'Nujabes']
  },
  'linalool': {
    tempo: { min: 60, max: 85 },
    energy: { min: 0.15, max: 0.40 },
    valence: { min: 0.35, max: 0.60 },
    danceability: { min: 0.25, max: 0.50 },
    acousticness: { min: 0.65, max: 1.0 },
    instrumentalness: { min: 0.60, max: 1.0 },
    mode: 'major',
    genres: ['classical piano', 'ambient classical', 'new age', 'soft jazz'],
    artistSeeds: ['Erik Satie', 'Debussy', 'Nils Frahm', 'Ólafur Arnalds']
  },
  'pinene': {
    tempo: { min: 90, max: 115 },
    energy: { min: 0.40, max: 0.65 },
    valence: { min: 0.45, max: 0.65 },
    danceability: { min: 0.35, max: 0.55 },
    acousticness: { min: 0.30, max: 0.70 },
    instrumentalness: { min: 0.75, max: 1.0 },
    mode: 'either',
    genres: ['post-rock', 'minimalist classical', 'intelligent electronic', 'soundtrack'],
    artistSeeds: ['Explosions in the Sky', 'Philip Glass', 'Jon Hopkins', 'Bonobo']
  },
  'terpinolene': {
    tempo: { min: 85, max: 110 },
    energy: { min: 0.40, max: 0.65 },
    valence: { min: 0.50, max: 0.75 },
    danceability: { min: 0.45, max: 0.70 },
    acousticness: { min: 0.30, max: 0.60 },
    instrumentalness: { min: 0.40, max: 0.80 },
    mode: 'either',
    genres: ['psychedelic rock', 'art pop', 'krautrock', 'experimental'],
    artistSeeds: ['Tame Impala', 'Unknown Mortal Orchestra', 'Stereolab', 'Can']
  },
  'humulene': {
    tempo: { min: 75, max: 100 },
    energy: { min: 0.30, max: 0.50 },
    valence: { min: 0.35, max: 0.55 },
    danceability: { min: 0.35, max: 0.55 },
    acousticness: { min: 0.50, max: 0.85 },
    instrumentalness: { min: 0.50, max: 0.85 },
    mode: 'either',
    genres: ['deep house', 'downtempo', 'dub reggae', 'roots', 'folk'],
    artistSeeds: ['Four Tet', 'Caribou', 'Lee "Scratch" Perry', 'Fleet Foxes']
  },
  'ocimene': {
    tempo: { min: 105, max: 135 },
    energy: { min: 0.55, max: 0.80 },
    valence: { min: 0.60, max: 0.85 },
    danceability: { min: 0.55, max: 0.80 },
    acousticness: { min: 0.20, max: 0.60 },
    instrumentalness: { min: 0.40, max: 0.80 },
    mode: 'major',
    genres: ['indie dance', 'synth-pop', 'world fusion', 'upbeat jazz'],
    artistSeeds: ['KAYTRANADA', 'Disclosure', 'FKJ', 'Snarky Puppy']
  }
};
```

#### 4.2 Prompt Generation Algorithm

```typescript
function generateMusicPrompt(
  strain: Strain,
  intent: Intent,
  sessionDuration: number
): string {

  // 1. Calculate weighted audio profile from strain terpenes
  const audioProfile = calculateWeightedAudioProfile(strain.terpenes);

  // 2. Apply intent overlay (intent can shift the profile)
  const adjustedProfile = applyIntentOverlay(audioProfile, intent);

  // 3. Calculate iso principle phases
  const phases = calculateSessionPhases(sessionDuration, adjustedProfile);

  // 4. Select genres and artists
  const genres = selectGenres(strain.terpenes, intent);
  const artists = selectArtistSeeds(strain.terpenes, intent);

  // 5. Generate natural language prompt
  return buildPromptText(phases, genres, artists, sessionDuration);
}

function calculateWeightedAudioProfile(terpenes: TerpeneEntry[]): AudioProfile {
  // Weight each terpene's audio profile by its percentage in the strain
  const totalPercent = terpenes.reduce((sum, t) => sum + t.percentageNumeric, 0);

  let profile = initEmptyProfile();

  for (const terpene of terpenes) {
    const weight = terpene.percentageNumeric / totalPercent;
    const terpeneProfile = TERPENE_AUDIO_PROFILES[normalizeTerpeneName(terpene.name)];

    if (terpeneProfile) {
      profile = blendProfiles(profile, terpeneProfile, weight);
    }
  }

  return profile;
}

function calculateSessionPhases(duration: number, profile: AudioProfile): Phase[] {
  // Iso principle: start at moderate, move toward profile, then gentle descent

  const onsetDuration = Math.min(15, duration * 0.15);    // 15% or 15 min max
  const peakDuration = duration * 0.50;                    // 50% of session
  const descentDuration = duration - onsetDuration - peakDuration;

  return [
    {
      name: 'onset',
      duration: onsetDuration,
      tempo: lerp(profile.tempo.max, profile.tempo.min, 0.3), // Start higher
      energy: Math.min(profile.energy.max + 0.1, 0.6),        // Start more energized
      description: 'Settling in, meeting you where you are'
    },
    {
      name: 'peak',
      duration: peakDuration,
      tempo: (profile.tempo.min + profile.tempo.max) / 2,
      energy: (profile.energy.min + profile.energy.max) / 2,
      description: 'Full expression of the strain\'s character'
    },
    {
      name: 'descent',
      duration: descentDuration,
      tempo: profile.tempo.min,
      energy: profile.energy.min,
      description: 'Gentle landing, integration'
    }
  ];
}
```

#### 4.3 Vibe Categories (Strain → Music Mapping)

Each strain maps to one of eight vibe categories based on its terpene-to-music translation:

| Category | Strains | BPM Range | Energy |
|----------|---------|-----------|--------|
| **Deep Rest / Sleep** | Pinnacle, Mule Fuel, Black Lime Chem | 55-80 ↓ | 0.05-0.25 |
| **Warm Relaxation** | Mike's Bomba, Blueberry Muffin, Moonlight, Rasta Governmint | 75-95 | 0.20-0.45 |
| **Contemplative Drift** | Satsuma Sherbet, Mandarin Cherry Tree, Lemon Papaya Banana, Strawberry Biscotti | 80-100 | 0.30-0.50 |
| **Body/Mind Split** | Glitter Bomb | 80-90 | 0.35-0.55 |
| **Easy Social** | Natty Bumppo, Pink Jesus Reserve, Guava Gift | 90-110 | 0.45-0.65 |
| **Clear Focus** | Love and Laughter (CBD) | 95-105 | 0.40-0.55 |
| **Bright Uplift** | Carambola, Peach Flambé, Tropicanna Cherry | 105-125 | 0.60-0.80 |
| **Vivid Energy** | Tropical Sleigh Ride, Avenue of the Giants, Purple Candy Cane | 110-125 | 0.65-0.85 |

#### 4.4 Actual Strain Prompt Examples

These are the actual pre-written Spotify prompts for key strains (see `data/strain-music-prompts.json` for all 22):

**Guava Gift | Easy Social | 90 min**
> Create a 90-minute playlist for an open, social hang — bright but not manic, warm but not heavy. Start around 100 BPM with feel-good indie and tropical-influenced tracks — Toro y Moi, Jungle, early Tame Impala. Build into groovy, sunlit funk and disco edits around 110-115 BPM through the middle. Wind down the last 20 minutes with warm bossa nova or acoustic neo-soul. Major keys throughout. The energy should feel like a golden hour backyard gathering where everyone's laughing easily.

**Pinnacle | Deep Rest / Sleep | 90 min**
> Create a 90-minute playlist for total surrender. Start at 75 BPM and slowly descend to 55 BPM by the end. Open with deep, velvet-textured downtempo — Tycho's slower work, Boards of Canada, Helios. Transition into pure ambient and drone by the midpoint — Brian Eno, Stars of the Lid, Grouper. Final 30 minutes should be barely-there sound design — long tones, deep bass swells, no rhythm. Think warm darkness, not cold emptiness. Every track should feel like sinking deeper into a soft surface. Exclusively instrumental. No sudden dynamic shifts.

**Glitter Bomb | Body/Mind Split | 75 min**
> Create a 75-minute playlist where the body melts but the mind stays lit up. Start with deep, cushioned grooves around 80-90 BPM — FKJ instrumentals, Tom Misch & Yussef Dayes, Alfa Mist. Layer in sparkling, detailed electronic textures through the middle — Floating Points' shorter pieces, Rival Consoles, Kiasmos. Close with ambient that has crystalline upper-register detail over deep bass warmth — Stars of the Lid, Tim Hecker's softer work. Production should feel like lying on velvet while watching fireworks — heavy bottom, glittering top. Instrumental only.

**Carambola | Bright Uplift | 60 min**
> Create a 60-minute playlist that's pure effervescence — bright, playful, and uplifting without being aggressive. Target 110-125 BPM. Lean into sunny indie pop, citrus-bright electronic, and feel-good dance tracks. Think Parcels, Franc Moody, Channel Tres, Confidence Man. Keep production crisp and clean — bright synths, tight percussion, major keys. Everything should feel like carbonation in your ears. No ballads, no minor keys, no heaviness. The whole playlist should make you want to move and smile.

**Mule Fuel | Deep Rest / Sleep | 90 min (Iso Principle Example)**
> Create a 90-minute playlist that starts with gentle contentment and gradually dissolves into deep rest. First 20 minutes: warm, unhurried acoustic and lo-fi at 80-85 BPM — Iron & Wine, Nils Frahm's piano pieces, Bon Iver's quieter work. Middle 30 minutes: descend to 65-70 BPM with ambient and instrumental — Sigur Rós ambient works, Ólafur Arnalds, ambient guitar loops. Final 40 minutes: pure sleep-adjacent soundscapes below 60 BPM — deep drones, slow-evolving textures, nature recordings layered with soft tones. Think warm gravity slowly pulling you down. No percussion after the midpoint. Nothing bright. Nothing sharp.

**Avenue of the Giants | Vivid Energy | 75 min (Paradox Strain)**
> Create a 75-minute playlist that's propulsive and electric — forward momentum with a deep foundation underneath. Start at 105 BPM and build to 120 by midpoint, then hold. Open with driving post-rock and shoegaze — Mogwai's uptempo pieces, M83, DIIV. Build into energizing electronic with real weight — Moderat, Jon Hopkins "Open Eye Signal" energy, Bicep. Keep bass heavy and textured throughout — the low end should feel massive while the highs crackle with clarity. This is a redwood forest soundtrack — towering and electric. No chill, no drift. Pure forward motion.

#### 4.5 Prompt Architecture

Each prompt follows a consistent architecture:

1. **Session length** → Sets duration expectations
2. **Emotional arc** → Matches strain effect intent
3. **Tempo/energy targets** → Specific BPM ranges per phase
4. **Texture/timbre descriptors** → "velvet-textured," "crisp," "cushioned"
5. **Artist/genre anchors** → Concrete reference points
6. **Session phase guidance** → Iso principle (onset → peak → descent)

#### 4.6 Prompt UI Flow

```
┌─────────────────────────────────────┐
│  🎵 YOUR SESSION PLAYLIST           │
├─────────────────────────────────────┤
│                                     │
│  Based on Guava Gift + Socialize    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Create a 90-minute playlist │   │
│  │ for a social, uplifting     │   │
│  │ evening. Start with warm,   │   │
│  │ mid-tempo grooves around    │   │
│  │ 100 BPM to ease in—think    │   │
│  │ neo-soul and jazzy textures │   │
│  │ ...                         │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ Copy to Clipboard ]              │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  How to use:                        │
│  1. Open Spotify                    │
│  2. Tap "Create Playlist"           │
│  3. Use AI or paste as description  │
│  4. Let Spotify build your mix      │
│                                     │
│  [ Open Spotify ]                   │
│                                     │
└─────────────────────────────────────┘
```

---

### 5. Discovery & Recommendations

The Discover section helps users find new strains based on intent, past preferences, and exploration.

#### 5.1 Intent-Based Discovery

- User selects intent tile
- Show strains ranked by intent match score
- Filter by: In Stock at Solful, Available Near Me, Any
- Section: "From Your Humidor" (what you already have)
- Section: "Solful Recommends" (curated picks)
- Section: "Community Favorites" (highest rated for this intent)

#### 5.2 Personalized Recommendations

Based on session history and ratings:

- "Because you loved Guava Gift, try Tropical Sleigh Ride"
- "You rate myrcene-heavy strains highly—here are more"
- "For your next creative session, you haven't tried terpinolene-forward strains yet"

#### 5.3 Terpene Explorer

Educational discovery interface:

- Visual terpene wheel showing the 8 key terpenes
- Tap a terpene → see effects, strains, music profile
- "Build Your Profile" quiz: answer vibe questions → see your ideal terpene blend
- Compare strains side-by-side by terpene profile

---

### 6. Learn Section (Education)

Consumer-friendly education that builds understanding without overwhelming.

#### 6.1 Content Structure

1. **The Philosophy** - Why intentional consumption matters (the "why")
2. **The Story** - Personal origin story, relatable and human
3. **How Terpenes Work** - Simple science, visual, no jargon
4. **The Music Connection** - Why sound matters (brief, intriguing)
5. **Solful Oil Blends** - The product, how to use it
6. **FAQ** - Common questions

#### 6.2 Content Principles

- Lead with experience, follow with science
- Use analogies: "Terpenes are to cannabis what grape varieties are to wine"
- Visual > text where possible
- No required reading to use the app
- Progressive disclosure: simple surface, depth available for curious users

---

### 7. Technical Architecture

#### 7.1 Data Storage

**Local (Device):**
- User preferences
- Humidor inventory
- Session history
- Cached strain data

**Remote (If account created):**
- Cross-device sync
- Backup/restore
- Anonymized analytics for recommendations

#### 7.2 External Integrations

**MVP:**
- Clipboard API (copy music prompts)
- Deep links to Spotify app
- Deep links to Solful website (product pages)

**Future:**
- Spotify Web API (playlist creation, playback control)
- Solful inventory API (real-time stock, ordering)
- Lab results parser (photo → terpene data)

#### 7.3 Platform

**MVP:** React Native (iOS + Android) or Progressive Web App
**Recommendation:** Start with PWA for fastest iteration, native later

---

### 8. Metrics & Success Criteria

#### 8.1 North Star Metric

**Sessions Completed per User per Month**

A completed session = user went through the full flow (strain + intent + music + rating). This measures actual value delivery, not just opens.

#### 8.2 Supporting Metrics

| Metric | Target (MVP) | Why It Matters |
|--------|--------------|----------------|
| Humidor strains per user | 3+ | Inventory engagement |
| Sessions per week (active users) | 2+ | Core value delivery |
| Session completion rate | 70%+ | Flow quality |
| Music prompt copies | 50% of sessions | Music feature adoption |
| Average session rating | 4.0+ | Experience quality |
| Intent achievement rate | 75%+ | Recommendation accuracy |
| Solful strain % in humidors | 40%+ | Business model validation |
| "Reorder from Solful" taps | Track | Purchase intent |

#### 8.3 Qualitative Success

- Users report sessions feel "more intentional"
- Users discover strains they wouldn't have tried
- Users recommend app to friends
- Solful sees increase in returning customers

---

### 9. MVP Scope

#### 9.1 MVP Features (V1)

**Must Have:**
- [ ] Intent tiles (8 intents)
- [ ] Strain database (23 Solful strains + ability to add custom)
- [ ] Humidor (add, view, edit strains)
- [ ] Session flow (intent → strain → music prompt → timer → rating)
- [ ] Music prompt generator (copy to clipboard)
- [ ] Basic Learn section (Story, How It Works)
- [ ] Oil blend display for Solful strains

**Nice to Have:**
- [ ] Session history view
- [ ] Basic personalized recommendations
- [ ] Terpene explorer
- [ ] Push notifications (diffuser reminders)

**Not in MVP:**
- Spotify API integration
- User accounts / cloud sync
- Community features
- In-app purchasing
- Strain scanning

#### 9.2 MVP Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Design | 2 weeks | Wireframes, visual design, content |
| Build Core | 3 weeks | Strain DB, humidor, session flow |
| Build Music | 1 week | Prompt generator, copy flow |
| Build Learn | 1 week | Content pages |
| Polish & Test | 2 weeks | Bug fixes, UX refinement, beta testing |
| **Total** | **9 weeks** | **MVP Launch** |

---

### 10. Future Roadmap

#### V2: Connected Experience
- Spotify API integration (auto-generate playlists)
- User accounts + cloud sync
- Enhanced recommendations from usage data

#### V3: Social & Commerce
- Share sessions with friends
- "Session together" feature (synced playlists)
- In-app Solful ordering
- Loyalty program integration

#### V4: Intelligence
- Personalized terpene profiles based on history
- Predictive intent (time of day, day of week patterns)
- Voice interface: "Hey Solful, I want to unwind"

#### V5: Hardware
- Smart diffuser integration (auto-start)
- Strain scanner (photo → data)
- Wearable integration (HRV tracking for session optimization)

---

## NEW: Receptor Rounding Blends (March 2026)

### Overview

Receptor Rounding Blends are purpose-built mini-blends that activate neuroreceptor pathways universally absent from cannabis terpene profiles. They work as **standalone aromatherapy products** OR as **Step 1 in the pre-loading protocol** before a strain blend.

Strain blends are NEVER modified. Rounding blends are a separate layer.

### The Three Blends

| Blend | Recipe | Drops | Receptors Opened | Standalone Use | Pre-Loading Use |
|-------|--------|-------|-----------------|----------------|-----------------|
| **Clarity Round** | Rosemary ct. cineole (3) + Eucalyptus (2) | 5 | AChE, BDNF-TrkB, TRPV3 | Morning focus, study, creativity | Before Focus/Creative sessions |
| **Calm Round** | Peppermint (2) + Clove (1) | 3 | TRPM8, TRPA1, COX-2 | Post-workout, headache, body ache | Before Pain/Recovery sessions |
| **Ease Round** | Lavender (3) | 3 | GABA-A (convergent) | Pre-sleep, anxiety, meditation | Before Rest/Anxiety sessions |

### Product Formats

- **Personal Inhaler** — Cotton-wick nasal inhaler (ideal for Ease Round's olfactory requirement)
- **Diffuser Blend** — 5ml/10ml dropper bottle
- **Roller Bottle** — 3% in carrier oil (ideal for Calm Round topical use)
- **Shower Steamer** — Effervescent tablet
- **Bath Soak** — Epsom salt base

### UX Integration

The session flow adds an optional Step 0 before the strain blend:

```
[Select Intent] → [Select Strain] → [Rounding Blend Suggestion] → [Pre-Session Countdown] → [Session]
```

The app suggests 1-2 rounding blends based on the selected intent:
- Focus intent → Clarity Round
- Pain intent → Calm Round
- Anxiety/Sleep intent → Ease Round
- Full Spectrum → Clarity + Calm
- Deep Relaxation → Ease + Calm

---

## NEW: Session Archetypes (March 2026)

Six pharmacologically-designed session types built on documented terpene synergies:

### 1. Deep Rest Session
- **Rounding:** Ease Round (15 min before)
- **Best Strains:** Mule Fuel, Black Lime Chem, Pinnacle
- **Active Synergies:** GABA-A Stack (supra-additive), Endorphin Cascade, BBB Opener
- **Music:** Deep Rest (55-80 BPM, descending)
- **Environment:** 2400K, dim, 68°F, parasympathetic breathwork

### 2. Pain Management Session
- **Rounding:** Calm Round (10 min before)
- **Best Strains:** Avenue of the Giants, Blueberry Muffin, Moonlight
- **Active Synergies:** Pain Gate (sequential cross-desensitization), Endorphin Cascade, Spice Bridge
- **Music:** Warm Relaxation (75-95 BPM, steady)
- **Environment:** 3200K, moderate, 70°F, balanced breathwork

### 3. Focus & Creative Session
- **Rounding:** Clarity Round (20 min before)
- **Best Strains:** Mule Fuel, Love and Laughter (CBD), Purple Candy Cane
- **Active Synergies:** Memory Shield (dual AChE), Clarity Pair, Mood Lift
- **Music:** Active Energy (100-130 BPM, elevated)
- **Environment:** 4200K, bright, 72°F, sympathetic breathwork

### 4. Social Session
- **Rounding:** Optional Ease Round (half-dose for anxiety-prone)
- **Best Strains:** Guava Gift, Pink Jesus Reserve, Pineapple Mojito
- **Active Synergies:** Mood Lift (human RCT evidence), Sesquiterpene Pair
- **Music:** Social Euphoria (95-115 BPM, steady/rising)

### 5. Recovery Session
- **Rounding:** Calm + Ease Rounds (combined)
- **Best Strains:** Blueberry Muffin, Moonlight
- **Active Synergies:** Anti-Inflammatory Triad (triple NF-kB), Pain Gate, GABA-A Stack
- **Music:** Warm Relaxation (75-95 BPM)
- **Environment:** Post-bath, 2400K, dim, weighted blanket

### 6. Contemplative Session
- **Rounding:** Ease Round
- **Best Strains:** Mandarin Cherry Tree, Satsuma Sherbet, Lemon Papaya Banana
- **Active Synergies:** Mood Lift, GABA-A Stack
- **Music:** Contemplative Drift (80-100 BPM, steady)

---

## NEW: Receptor Twins — "Same Effects, New Flavor" (March 2026)

### Feature: Strain Swap Recommendations

When a user rates a strain highly, suggest its receptor twin — a strain with near-identical pharmacological effects but different aroma and origin.

**Top Swap Pairs (>0.99 receptor similarity):**
- Mike's Bomba ↔ Pinnacle (0.998)
- Mandarin Cherry Tree ↔ Satsuma Sherbet (0.996)
- Rasta Governmint ↔ Natty Bumppo (0.996)
- Avenue of the Giants ↔ Black Lime Chem (0.995)

**UX:** After a 4-5 star session rating: *"Loved this session? Try [twin strain] — same receptor activation, completely different flavor."*

### Feature: Variety Pairing

For maximum pharmacological range in a multi-session day, suggest **receptor opposites:**
- Most different pair: Carambola ↔ Black Lime Chem (0.296 similarity)
- Morning citrus → Evening body: zero receptor overlap

---

## NEW: Scientific Validation (March 2026)

### Terpene-Sonic Correlation
The music parameters assigned to each strain correlate with receptor pharmacology at **r = 0.77-0.84**:
- GABA-A → lower BPM, lower energy (validates sedative strains get calmer music)
- 5-HT → higher valence (validates mood strains get brighter music)
- Myrcene % → negatively correlates with all music params (r = -0.79 to -0.83)
- Limonene % → positively correlates with all music params (r = +0.80 to +0.84)

**Implication:** The music layer is pharmacologically correct. New strains can get first-pass BPM/energy/valence assignments directly from terpene percentages.

### Cross-Layer Validation
All experience layers (music, environment, breathwork) encode the same pharmacological signal:
- Music: continuous resolution (r=0.8)
- Environment + Breathwork: 3 discrete tiers (Rest/Balance/Active) that perfectly match the myrcene-limonene receptor axis
- Zero misassignments across 43 strain files

### 12 Documented Terpene Synergies
Mapped across all 23 strains. Pineapple Mojito leads at 8/12 natural synergies. Three synergies (Memory Shield, Pain Gate, Spice Bridge) are only activatable via Receptor Rounding Blends.

---

## Appendix A: Intent-Terpene-Music Matrix

| Intent | Primary Terpenes | Tempo | Energy | Valence | Key Genres |
|--------|------------------|-------|--------|---------|------------|
| Deep Relax | Myrcene, Linalool | 55-70 | 0.10-0.25 | 0.30-0.45 | Ambient, drone, lo-fi |
| Sleep | Myrcene (high) | 40-60 | 0.05-0.20 | 0.25-0.40 | Sleep soundscapes |
| Calm Focus | Pinene, Limonene | 95-115 | 0.45-0.60 | 0.50-0.65 | Post-rock, minimal |
| Create | Terpinolene, Limonene | 90-120 | 0.50-0.70 | 0.55-0.75 | Psychedelic, art |
| Energize | Limonene, Ocimene | 115-135 | 0.65-0.85 | 0.70-0.90 | Dance, funk |
| Socialize | Limonene, Caryophyllene | 100-125 | 0.55-0.75 | 0.65-0.85 | Pop, disco |
| Unwind | Caryophyllene, Humulene | 80-100 | 0.30-0.50 | 0.45-0.60 | Jazz, neo-soul |
| Meditate | Linalool, Pinene | 55-80 | 0.15-0.35 | 0.40-0.55 | Meditation, drones |

---

## Appendix B: Solful Strain Database

See `data/strains.json` for complete strain data including:
- 23 Solful strains with full terpene profiles
- Farm and region information
- Effect descriptions and intent mappings
- Essential oil blend recipes
- Calculated music profiles

---

## Appendix C: Analysis Reports & Data Sources

| Report | Description |
|--------|-------------|
| `receptor_convergence_report.md` | 23 strains × 15 receptors, rounding blend design |
| `receptor_twins_terroir_report.md` | 5 receptor families, twin pairs, terroir signatures |
| `terpene_synergy_report.md` | 12 synergies mapped to 23 strains |
| `terpene_sonic_correlation_report.md` | Music-pharmacology correlation (r=0.8) |
| `cross_layer_validation_report.md` | All layers vs receptor profiles |
| `Session_Design_By_Synergy.md` | 6 session archetypes with full timing arcs |
| `data/rounding-blends.json` | Complete rounding blend specifications |

---

*Document Version 2.0 — March 2026*
*Updated with receptor pharmacology, rounding blends, session archetypes, receptor twins, terpene-sonic validation, and cross-layer analysis.*

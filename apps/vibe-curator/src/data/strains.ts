// ═══════════════════════════════════════════════════════════════════
// Vibe Curator — Complete Seed Data
// 24 strains · 24 EO recipes · 120 beverage recipes · 24 Spotify prompts
// Generated from Solful Sessions Terpene Pairing Framework v3.0
// ═══════════════════════════════════════════════════════════════════

// ─── TYPES ─────────────────────────────────────────────────────────

export interface TerpeneEntry {
  name: string;
  percentage: number;
  ratio: number;
}

export interface OilEntry {
  name: string;
  drops: number;
  terpene: string;
}

export interface EORecipe {
  oils: OilEntry[];
  rationale: string;
}

export interface BeverageRecipe {
  name: string;
  tagline: string;
  glass: string;
  volume: string;
  temp: string;
  ingredients: { amount: string; item: string }[];
  method: string[];
  terpeneMap: { terpene: string; source: string }[];
  spirit?: string;
  abv?: string;
  steepTemp?: string;
  steepTime?: string;
  caffeine?: string;
}

export interface Strain {
  id: string;
  name: string;
  farm: string;
  region: string;
  energyTier: "HIGH" | "MEDIUM" | "LOW";
  intent: string;
  effects: string[];
  aroma: string[];
  totalTerpenes: number;
  dominantTerpene: string;
  terpeneProfile: TerpeneEntry[];
  vibeCategories: string[];
  eoRecipe: EORecipe;
  spotifyPrompt: string;
  beverages?: {
    mocktail?: BeverageRecipe;
    cocktail?: BeverageRecipe;
    juice?: BeverageRecipe;
    tea?: BeverageRecipe;
    shot?: BeverageRecipe;
  };
}

export interface VibeCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  icon: string;
}

// ─── TERPENE COLORS ─────────────────────────────────────────────────
export const TERPENE_COLORS: Record<string, string> = {
  "β-Caryophyllene": "#C8A97E",
  "Limonene": "#D4C85C",
  "Myrcene": "#8EAE68",
  "α-Humulene": "#7C9082",
  "Linalool": "#9B7BA8",
  "α-Bisabolol": "#8EAEC8",
  "α-Pinene": "#5C8E6B",
  "β-Ocimene": "#B8785C",
  "Terpinolene": "#6BAE8E",
  "trans-β-Farnesene": "#D4B88E"
};

// ─── VIBE CATEGORIES ───────────────────────────────────────────────
export const VIBE_CATEGORIES: VibeCategory[] = [
  {
    "id": "groundedPresent",
    "name": "Grounded & Present",
    "color": "#8B7355",
    "description": "Steady calm, clear mental edges",
    "icon": "anchor"
  },
  {
    "id": "creativeFlow",
    "name": "Creative Flow",
    "color": "#9B7BA8",
    "description": "Vivid ideas, playful momentum",
    "icon": "sparkles"
  },
  {
    "id": "deepRest",
    "name": "Deep Rest",
    "color": "#5C7B9B",
    "description": "Total surrender, velvet quiet",
    "icon": "moon"
  },
  {
    "id": "socialBright",
    "name": "Social & Bright",
    "color": "#C8A97E",
    "description": "Warm gathering, easy laughter",
    "icon": "users"
  },
  {
    "id": "bodyMelt",
    "name": "Body Melt",
    "color": "#8B5E5E",
    "description": "Profound physical ease",
    "icon": "heart"
  },
  {
    "id": "euphoricLift",
    "name": "Euphoric Lift",
    "color": "#B8785C",
    "description": "Bright lift, electric joy",
    "icon": "sun"
  },
  {
    "id": "calmFocus",
    "name": "Calm Focus",
    "color": "#7C9082",
    "description": "Clear productivity, no fog",
    "icon": "target"
  },
  {
    "id": "cozyComfort",
    "name": "Cozy Comfort",
    "color": "#9B7B7B",
    "description": "Warm blanket, curious mind",
    "icon": "coffee"
  }
];

// ─── STRAINS ────────────────────────────────────────────────────────
export const STRAINS: Strain[] = [
  {
    "id": "mikes-bomba",
    "name": "Mike's Bomba",
    "farm": "Glentucky Family Farm",
    "region": "Sonoma",
    "energyTier": "LOW",
    "intent": "Grounded calm with clear mental edges.",
    "effects": [
      "Relaxed",
      "Calm",
      "Alert"
    ],
    "aroma": [
      "Fuel",
      "Lemon Cream",
      "Forest Floor"
    ],
    "totalTerpenes": 1.38,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.47,
        "ratio": 45
      },
      {
        "name": "Limonene",
        "percentage": 0.32,
        "ratio": 31
      },
      {
        "name": "α-Humulene",
        "percentage": 0.18,
        "ratio": 17
      },
      {
        "name": "Linalool",
        "percentage": 0.07,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "groundedPresent"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 20,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemon",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Sage",
          "drops": 8,
          "terpene": "α-Humulene"
        },
        {
          "name": "Lavender",
          "drops": 2,
          "terpene": "Linalool"
        }
      ],
      "rationale": "Black pepper delivers the dominant caryophyllene (50% of blend). Lemon oil matches the 'lemon cream' aroma note. Sage provides humulene with an herbal, grounding quality that complements the 'forest floor' character. A whisper of lavender rounds out the linalool."
    },
    "spotifyPrompt": "Create a 75-minute playlist that feels grounded but mentally clear. Mid-tempo grooves around 85-95 BPM with warm, analog textures — think Rhodes keys, upright bass, unhurried drums. Start with mellow jazz-soul like Khruangbin or Kaytranada's downtempo work, settle into modal jazz and neo-soul instrumentals mid-session, and close with warm ambient pieces. Keep the energy steady and centered — never rushed, never sleepy. The vibe is a late evening on a porch with a clear head. No lyrics after the first 20 minutes."
  },
  {
    "id": "moonlight",
    "name": "Moonlight",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Soft gratitude in a settled body.",
    "effects": [
      "Physically Relaxed",
      "Calm",
      "Grateful"
    ],
    "aroma": [
      "Watermelon Candy",
      "Citrus Zest",
      "Earl Grey"
    ],
    "totalTerpenes": 2.67,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 0.74,
        "ratio": 35
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.51,
        "ratio": 24
      },
      {
        "name": "Terpinolene",
        "percentage": 0.38,
        "ratio": 18
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.24,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 12,
          "terpene": "Myrcene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Tea Tree",
          "drops": 8,
          "terpene": "Terpinolene"
        },
        {
          "name": "German Chamomile",
          "drops": 6,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Bergamot",
          "drops": 4,
          "terpene": "Limonene"
        }
      ],
      "rationale": "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. German chamomile for bisabolol. Bergamot is the key ingredient in Earl Grey tea, a direct aroma hit that also delivers citrus zest."
    },
    "spotifyPrompt": "Create a 90-minute playlist for soft, grateful ease. Target 90-100 BPM. Start with thoughtful indie and soft electronic — Washed Out, Toro y Moi's 'Outer Peace' era, Men I Trust. Move into contemplative jazz and ambient — GoGo Penguin, Portico Quartet, Nils Frahm's mid-tempo work. Close with warm, meditative pieces. Major keys but never saccharine. The vibe is sitting with a cup of tea, watching clouds move, feeling quietly grateful. Vocals okay in the first half if they're soft."
  },
  {
    "id": "natty-bumppo",
    "name": "Natty Bumppo",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energyTier": "MEDIUM",
    "intent": "Loose and easy, happily untethered.",
    "effects": [
      "Happy",
      "Carefree",
      "Physically Relaxed"
    ],
    "aroma": [
      "Kerosene",
      "Musk",
      "Sour Plum"
    ],
    "totalTerpenes": 1.86,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.63,
        "ratio": 40
      },
      {
        "name": "Limonene",
        "percentage": 0.35,
        "ratio": 22
      },
      {
        "name": "α-Humulene",
        "percentage": 0.25,
        "ratio": 16
      },
      {
        "name": "Myrcene",
        "percentage": 0.19,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "socialBright"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 14,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemon",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Sage",
          "drops": 6,
          "terpene": "α-Humulene"
        },
        {
          "name": "Lemongrass",
          "drops": 6,
          "terpene": "Myrcene"
        },
        {
          "name": "Geranium",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "Caryophyllene-forward with black pepper as the base. Lemon delivers the limonene. Sage for humulene. Lemongrass for myrcene. Geranium adds sour plum fruitiness. The 'kerosene/musk' character emerges from the terpene interaction itself."
    },
    "spotifyPrompt": "Create a 75-minute playlist for lazy, carefree vibes — loose-limbed and happily untethered. Target 90-105 BPM. Start with classic reggae and dub — easy rhythms, warm bass, sunny attitude. Toots and the Maytals, Steel Pulse, classic Lee Scratch Perry. Shift into modern dub-influenced indie and lo-fi grooves — Skinshape, Khruangbin's slower jams, Babe Rainbow. Close with island-inflected ambient and acoustic. The whole playlist should feel like you kicked off your shoes and forgot where you left them. No stress, no agenda."
  },
  {
    "id": "black-lime-chem",
    "name": "Black Lime Chem",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Weighted bliss melting toward rest.",
    "effects": [
      "Heavy",
      "Blissful",
      "Sleepy"
    ],
    "aroma": [
      "Sharp Lime",
      "Rhubarb",
      "Glue"
    ],
    "totalTerpenes": 3.08,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 1.69,
        "ratio": 60
      },
      {
        "name": "α-Pinene",
        "percentage": 0.39,
        "ratio": 14
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.27,
        "ratio": 10
      },
      {
        "name": "β-Ocimene",
        "percentage": 0.19,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "deepRest"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 16,
          "terpene": "Myrcene"
        },
        {
          "name": "Pine",
          "drops": 8,
          "terpene": "α-Pinene"
        },
        {
          "name": "Black Pepper",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Basil",
          "drops": 6,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Lemon",
          "drops": 4,
          "terpene": "Limonene"
        }
      ],
      "rationale": "Heavy myrcene strain, sleepy and blissful. Pine delivers the pinene. Basil covers the ocimene. Lemon for the 'sharp lime' aroma (no lime oil in palette, lemon is close). The 'glue' character is that chem funk that emerges from the terpene combo itself."
    },
    "spotifyPrompt": "Create a 90-minute playlist for weighted bliss melting into sleep. Start at 80 BPM with deep dub and bass-heavy downtempo — Burial's warmer tracks, The Bug's ambient work, deep dubstep instrumentals. After 20 minutes, descend to 65 BPM with heavy ambient and drone — Sunn O)))'s quieter moments, Earth, deep bass meditation. Final third should be sub-bass drones and barely-there tones approaching silence. Everything should feel like gravity increasing. Heavy, warm, inevitable. The lowest, deepest sounds you can find."
  },
  {
    "id": "guava-gift",
    "name": "Guava Gift",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energyTier": "MEDIUM",
    "intent": "Open and expansive, easy social lift.",
    "effects": [
      "Social",
      "Inspiring",
      "Euphoric"
    ],
    "aroma": [
      "Fresh Guava",
      "Lemon Rind",
      "Tamarind"
    ],
    "totalTerpenes": 2.34,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.73,
        "ratio": 37
      },
      {
        "name": "Limonene",
        "percentage": 0.5,
        "ratio": 26
      },
      {
        "name": "Myrcene",
        "percentage": 0.33,
        "ratio": 17
      },
      {
        "name": "α-Humulene",
        "percentage": 0.25,
        "ratio": 13
      }
    ],
    "vibeCategories": [
      "socialBright"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 14,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Grapefruit",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Lemongrass",
          "drops": 8,
          "terpene": "Myrcene"
        },
        {
          "name": "Basil",
          "drops": 6,
          "terpene": "α-Humulene"
        },
        {
          "name": "Rosemary",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Black pepper leads with caryophyllene. Grapefruit brings tropical citrus that echoes the guava aroma. Lemongrass delivers myrcene for the euphoric lift. Basil adds humulene with a bright, fresh edge. A touch of rosemary for herbal depth."
    },
    "spotifyPrompt": "Create a 90-minute playlist for an open, social hang — bright but not manic, warm but not heavy. Start around 100 BPM with feel-good indie and tropical-influenced tracks — Toro y Moi, Jungle, early Tame Impala. Build into groovy, sunlit funk and disco edits around 110-115 BPM through the middle. Wind down the last 20 minutes with warm bossa nova or acoustic neo-soul. Major keys throughout. The energy should feel like a golden hour backyard gathering where everyone's laughing easily."
  },
  {
    "id": "mule-fuel",
    "name": "Mule Fuel",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energyTier": "LOW",
    "intent": "Gentle contentment settling toward rest.",
    "effects": [
      "Happy",
      "Hungry",
      "Sleepy"
    ],
    "aroma": [
      "Skunk",
      "Diesel",
      "Lemon",
      "Leather"
    ],
    "totalTerpenes": 3.97,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 2.22,
        "ratio": 62
      },
      {
        "name": "α-Pinene",
        "percentage": 0.54,
        "ratio": 15
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.34,
        "ratio": 9
      },
      {
        "name": "Limonene",
        "percentage": 0.28,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "deepRest",
      "bodyMelt"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 20,
          "terpene": "Myrcene"
        },
        {
          "name": "Pine",
          "drops": 8,
          "terpene": "α-Pinene"
        },
        {
          "name": "Black Pepper",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemon",
          "drops": 6,
          "terpene": "Limonene"
        }
      ],
      "rationale": "Exceptionally high myrcene (2.22%) makes this the most sedating strain. Lemongrass dominates the blend (50%) to match. Pine needle oil captures the pinene for alertness contrast. Black pepper for caryophyllene. Lemon for the citrus diesel notes."
    },
    "spotifyPrompt": "Create a 90-minute playlist for gentle descent into rest. Start at 80 BPM with warm, contented grooves — Bill Withers' mellow side, D'Angelo's quieter moments, Erykah Badu's 'New Amerykah Part Two' feel. After 25 minutes, begin dropping tempo — 70 BPM lo-fi and ambient jazz, Nujabes' slower beats, BADBADNOTGOOD's gentle tracks. Final 30 minutes should be pure ambient warmth approaching silence — Brian Eno's 'Music for Airports,' Harold Budd, sleep-focused soundscapes. The highest myrcene strain demands the deepest descent."
  },
  {
    "id": "satsuma-sherbet",
    "name": "Satsuma Sherbet",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energyTier": "MEDIUM",
    "intent": "Quiet ease with thoughtful undertones.",
    "effects": [
      "Happy",
      "Contemplative",
      "Comfortable"
    ],
    "aroma": [
      "Mandarin Orange",
      "Mochi",
      "Mint"
    ],
    "totalTerpenes": 1.85,
    "dominantTerpene": "Limonene",
    "terpeneProfile": [
      {
        "name": "Limonene",
        "percentage": 0.55,
        "ratio": 37
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.45,
        "ratio": 30
      },
      {
        "name": "α-Humulene",
        "percentage": 0.13,
        "ratio": 9
      },
      {
        "name": "Myrcene",
        "percentage": 0.11,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Sweet Orange",
          "drops": 16,
          "terpene": "Limonene"
        },
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Lemongrass",
          "drops": 4,
          "terpene": "Myrcene"
        },
        {
          "name": "Peppermint",
          "drops": 4,
          "terpene": "Menthol"
        }
      ],
      "rationale": "Sweet orange (40%) captures the mandarin citrus. Black pepper delivers caryophyllene backbone. Sage for humulene. Lemongrass for myrcene. Peppermint matches the 'mint' aroma note and adds refreshing brightness."
    },
    "spotifyPrompt": "Create a 75-minute playlist for quiet, contemplative comfort. Target 85-95 BPM. Start with gentle indie folk and soft electronic — Bon Iver's 'i,i' era, Novo Amor, Phoebe Bridgers' softer moments. Move into warm ambient and modern classical — \u00d3lafur Arnalds, Nils Frahm's piano pieces, Max Richter. Close with peaceful acoustic instrumentals. The vibe is curled up with hot tea on a rainy afternoon — content, thoughtful, nowhere to be. Vocals welcome if they're intimate and hushed."
  },
  {
    "id": "tropical-sleigh-ride",
    "name": "Tropical Sleigh Ride",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Vivid lift with present clarity.",
    "effects": [
      "Joyful",
      "Alert",
      "Euphoric"
    ],
    "aroma": [
      "Peppermint",
      "Honeysuckle",
      "Hint of Ginger"
    ],
    "totalTerpenes": 2.35,
    "dominantTerpene": "β-Ocimene",
    "terpeneProfile": [
      {
        "name": "β-Ocimene",
        "percentage": 0.71,
        "ratio": 36
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.7,
        "ratio": 36
      },
      {
        "name": "α-Humulene",
        "percentage": 0.28,
        "ratio": 14
      },
      {
        "name": "Limonene",
        "percentage": 0.22,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "creativeFlow"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Basil",
          "drops": 14,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Peppermint",
          "drops": 6,
          "terpene": "Menthol"
        },
        {
          "name": "Grapefruit",
          "drops": 4,
          "terpene": "Limonene"
        },
        {
          "name": "Geranium",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "Basil delivers the rare ocimene (35% of blend) that defines this strain's unique character. Black pepper for the heavy caryophyllene. Peppermint captures the distinctive aroma note. Grapefruit adds citrus brightness. Geranium brings the honeysuckle floral quality."
    },
    "spotifyPrompt": "Create a 75-minute playlist that's vivid and joyful but stays present — bright energy without losing focus. Target 110-120 BPM. Start with upbeat world-fusion and Afrobeat-influenced tracks — Mdou Moctar, Khruangbin's uptempo work, KOKOROKO. Build into bright indie dance and synth-forward grooves — Caribou, Four Tet's dancier tracks, Floating Points. Keep the production vivid and detailed — lots of interesting percussion, layered textures, call-and-response patterns. The vibe is a perfect festival set in golden light. Never aggressive, always joyful."
  },
  {
    "id": "purple-candy-cane",
    "name": "Purple Candy Cane",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Vibrant and vocal, fully awake.",
    "effects": [
      "Energized",
      "Invigorated",
      "Talkative"
    ],
    "aroma": [
      "Mango",
      "Peppermint Candy",
      "Orange Blossom"
    ],
    "totalTerpenes": 1.55,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 0.54,
        "ratio": 40
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.31,
        "ratio": 23
      },
      {
        "name": "α-Pinene",
        "percentage": 0.2,
        "ratio": 15
      },
      {
        "name": "α-Humulene",
        "percentage": 0.13,
        "ratio": 10
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "socialBright"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 12,
          "terpene": "Myrcene"
        },
        {
          "name": "Black Pepper",
          "drops": 8,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sweet Orange",
          "drops": 8,
          "terpene": "Limonene"
        },
        {
          "name": "Pine",
          "drops": 6,
          "terpene": "α-Pinene"
        },
        {
          "name": "Peppermint",
          "drops": 4,
          "terpene": "Menthol"
        },
        {
          "name": "Sage",
          "drops": 2,
          "terpene": "α-Humulene"
        }
      ],
      "rationale": "Myrcene-forward for the mango note. Black pepper for caryophyllene. Sweet orange captures the 'orange blossom' aroma. Pine for the pinene. Peppermint matches the 'peppermint candy' perfectly. A touch of sage for humulene grounding."
    },
    "spotifyPrompt": "Create a 60-minute playlist for vibrant, social energy — fully awake and talkative. Target 115-125 BPM. Bright, bouncy, party-ready. Think poolside in the tropics — Disclosure, Kaytranada's house tracks, R\u00fcf\u00fcs Du Sol's uptempo work. Mix in tropical bass and dancehall-influenced indie — Major Lazer's smoother work, Mura Masa. Every track should make you want to talk, move, and laugh. Percussion-heavy, colorful production. No chill zone — this is pure social fuel from start to finish."
  },
  {
    "id": "carambola",
    "name": "Carambola",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Light and playful, effervescent energy.",
    "effects": [
      "Energetic",
      "Fun",
      "Giggly"
    ],
    "aroma": [
      "Orange",
      "Diesel",
      "Incense"
    ],
    "totalTerpenes": 1.45,
    "dominantTerpene": "Limonene",
    "terpeneProfile": [
      {
        "name": "Limonene",
        "percentage": 0.44,
        "ratio": 53
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.18,
        "ratio": 22
      },
      {
        "name": "Linalool",
        "percentage": 0.12,
        "ratio": 14
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.09,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "socialBright",
      "creativeFlow"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Sweet Orange",
          "drops": 16,
          "terpene": "Limonene"
        },
        {
          "name": "Rosemary",
          "drops": 8,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lavender",
          "drops": 6,
          "terpene": "Linalool"
        },
        {
          "name": "German Chamomile",
          "drops": 6,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Black Pepper",
          "drops": 4,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Limonene-dominant and uplifting. Sweet orange (40%) captures the 'orange, diesel' aroma profile. Rosemary provides caryophyllene with an energizing quality. Lavender for the linalool. German chamomile delivers the α-bisabolol and softens the blend."
    },
    "spotifyPrompt": "Create a 60-minute playlist that's pure effervescence — bright, playful, and uplifting without being aggressive. Target 110-125 BPM. Lean into sunny indie pop, citrus-bright electronic, and feel-good dance tracks. Think Parcels, Franc Moody, Channel Tres, Confidence Man. Keep production crisp and clean — bright synths, tight percussion, major keys. Everything should feel like carbonation in your ears. No ballads, no minor keys, no heaviness. The whole playlist should make you want to move and smile."
  },
  {
    "id": "rasta-governmint",
    "name": "Rasta Governmint",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Profound ease with cushioned edges.",
    "effects": [
      "Euphoric",
      "Supremely Relaxed",
      "Comforted"
    ],
    "aroma": [
      "Sour Cherry",
      "Frankincense",
      "Oak"
    ],
    "totalTerpenes": 1.92,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.6,
        "ratio": 39
      },
      {
        "name": "Limonene",
        "percentage": 0.39,
        "ratio": 25
      },
      {
        "name": "α-Humulene",
        "percentage": 0.17,
        "ratio": 11
      },
      {
        "name": "Myrcene",
        "percentage": 0.16,
        "ratio": 10
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "deepRest",
      "bodyMelt"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 14,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemon",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Rosemary",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sage",
          "drops": 6,
          "terpene": "α-Humulene"
        },
        {
          "name": "Geranium",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "Caryophyllene-forward with black pepper and rosemary. Lemon for the limonene citrus. Sage for humulene and oak-like earthiness. Geranium adds fruity cherry notes."
    },
    "spotifyPrompt": "Create an 80-minute playlist for profound, cushioned ease. Target 75-85 BPM. Start with deep dub and roots reggae — Augustus Pablo, King Tubby, classic Lee Perry. Move into low-end heavy downtempo and trip-hop — Massive Attack's 'Mezzanine' warmth, Tricky's darker moments, Portishead instrumentals. Close with deep ambient and minimal techno at its most meditative — Gas, Wolfgang Voigt, deep space ambient. Everything should feel padded and warm — soft attacks, round bass, no sharp edges anywhere."
  },
  {
    "id": "pineapple-mojito",
    "name": "Pineapple Mojito",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energyTier": "MEDIUM",
    "intent": "Rooted ease with a quiet glow.",
    "effects": [
      "Relaxed",
      "Grounded",
      "Euphoric"
    ],
    "aroma": [
      "Pineapple",
      "Ginger",
      "Mint",
      "Gas"
    ],
    "totalTerpenes": 2.55,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.63,
        "ratio": 31
      },
      {
        "name": "Limonene",
        "percentage": 0.56,
        "ratio": 28
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.24,
        "ratio": 12
      },
      {
        "name": "α-Humulene",
        "percentage": 0.19,
        "ratio": 9
      },
      {
        "name": "Linalool",
        "percentage": 0.16,
        "ratio": 8
      },
      {
        "name": "α-Pinene",
        "percentage": 0.14,
        "ratio": 7
      },
      {
        "name": "Myrcene",
        "percentage": 0.11,
        "ratio": 5
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "socialBright",
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sweet Orange",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "German Chamomile",
          "drops": 6,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Lavender",
          "drops": 4,
          "terpene": "Linalool"
        },
        {
          "name": "Pine",
          "drops": 2,
          "terpene": "α-Pinene"
        },
        {
          "name": "Lemongrass",
          "drops": 2,
          "terpene": "Myrcene"
        }
      ],
      "rationale": "Seven-oil blend reflecting unusually broad terpene diversity. The complexity mirrors the strain's seven significant terpenes. Child of Carambola, inheriting its bisabolol trait."
    },
    "spotifyPrompt": "Create an 80-minute playlist for rooted ease with a quiet tropical glow. Target 90-100 BPM. Start with warm tropical-tinged grooves — Khruangbin, Skinshape, Babe Rainbow. Move into mellow bossa nova and jazz — Getz/Gilberto vibes, modern tropicalia. Close with gentle, sun-warmed ambient. The broadest terpene diversity in the collection means the music should be layered and complex too — multiple instruments, interesting textures, but all serving a unified feeling of grounded contentment with a hint of sweetness."
  },
  {
    "id": "strawberry-biscotti",
    "name": "Strawberry Biscotti",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Cozy anchor with a curious mind.",
    "effects": [
      "Comforting",
      "Mentally Engaging",
      "Appetite Inducing"
    ],
    "aroma": [
      "Kettle Corn",
      "Fuel",
      "Sour Strawberry Candy"
    ],
    "totalTerpenes": 1.48,
    "dominantTerpene": "Limonene",
    "terpeneProfile": [
      {
        "name": "Limonene",
        "percentage": 0.38,
        "ratio": 34
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.29,
        "ratio": 26
      },
      {
        "name": "Myrcene",
        "percentage": 0.25,
        "ratio": 23
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.13,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Bergamot",
          "drops": 14,
          "terpene": "Limonene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemongrass",
          "drops": 8,
          "terpene": "Myrcene"
        },
        {
          "name": "German Chamomile",
          "drops": 6,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Balanced profile with comfort as the effect. Bergamot brings sophisticated citrus that pairs with the 'sour strawberry candy' note. Black pepper for caryophyllene. Lemongrass for myrcene. German chamomile for bisabolol. A touch of clove adds warmth."
    },
    "spotifyPrompt": "Create an 80-minute playlist that feels like being wrapped in a blanket with an interesting book. Comfortable and warm but mentally engaging. Start with textured trip-hop and downtempo around 85-90 BPM — Bonobo, Little People, Emancipator. Move into layered instrumental hip-hop with interesting sample choices — Madlib instrumentals, Nujabes, J Dilla beats. Close with warm, detail-rich ambient. The production should reward close listening — subtle percussion layers, unexpected textures, warm bass. Energy stays moderate throughout. Cozy but never boring."
  },
  {
    "id": "avenue-of-the-giants",
    "name": "Avenue of the Giants",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Forward momentum with electric clarity.",
    "effects": [
      "Energizing",
      "Buzzy",
      "Motivating"
    ],
    "aroma": [
      "Pine Needles",
      "Menthol",
      "Jasmine"
    ],
    "totalTerpenes": 3.48,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 1.94,
        "ratio": 62
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.43,
        "ratio": 14
      },
      {
        "name": "α-Pinene",
        "percentage": 0.26,
        "ratio": 8
      },
      {
        "name": "β-Ocimene",
        "percentage": 0.24,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "creativeFlow"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 16,
          "terpene": "Myrcene"
        },
        {
          "name": "Pine",
          "drops": 8,
          "terpene": "α-Pinene"
        },
        {
          "name": "Black Pepper",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Basil",
          "drops": 4,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Peppermint",
          "drops": 4,
          "terpene": "Menthol"
        },
        {
          "name": "Geranium",
          "drops": 2,
          "terpene": "Floral"
        }
      ],
      "rationale": "Very high myrcene (1.94%) with lemongrass at 40%. Pine needle oil captures the 'pine needles' aroma note and pinene. Black pepper for caryophyllene. Basil for ocimene. Peppermint for the menthol. Geranium adds jasmine-like floral notes."
    },
    "spotifyPrompt": "Create a 75-minute playlist that's propulsive and electric — forward momentum with a deep foundation underneath. Start at 105 BPM and build to 120 by midpoint, then hold. Open with driving post-rock and shoegaze — Mogwai's uptempo pieces, M83, DIIV. Build into energizing electronic with real weight — Moderat, Jon Hopkins 'Open Eye Signal' energy, Bicep. Keep bass heavy and textured throughout — the low end should feel massive while the highs crackle with clarity. This is a redwood forest soundtrack — towering and electric. No chill, no drift. Pure forward motion."
  },
  {
    "id": "peach-flambe",
    "name": "Peach Flambé",
    "farm": "Terrapin Farms",
    "region": "Humboldt",
    "energyTier": "HIGH",
    "intent": "Sunny drive with bright momentum.",
    "effects": [
      "Happy",
      "Energized",
      "Motivated"
    ],
    "aroma": [
      "White Peach",
      "Cashew Butter",
      "Brown Sugar"
    ],
    "totalTerpenes": 1.05,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.25,
        "ratio": 30
      },
      {
        "name": "Myrcene",
        "percentage": 0.21,
        "ratio": 25
      },
      {
        "name": "Limonene",
        "percentage": 0.2,
        "ratio": 24
      },
      {
        "name": "α-Humulene",
        "percentage": 0.12,
        "ratio": 14
      }
    ],
    "vibeCategories": [
      "euphoricLift"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Bergamot",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemongrass",
          "drops": 8,
          "terpene": "Myrcene"
        },
        {
          "name": "Geranium",
          "drops": 6,
          "terpene": "Floral"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Balanced, lower-terpene profile. Bergamot brings sophisticated citrus matching the peach. Black pepper for caryophyllene. Lemongrass for myrcene. Geranium adds fruity, peachy notes. Sage for humulene. Clove echoes the 'brown sugar' warmth."
    },
    "spotifyPrompt": "Create a 60-minute playlist for a sunny drive with the windows down. Bright, warm, and effortlessly happy. Target 105-115 BPM throughout. Think golden California afternoon — Fleetwood Mac vibes meeting modern indie pop. Mix in Vampire Weekend, Phoenix, MGMT's catchier work, Dayglow, Still Woozy. Keep production warm and sunny — acoustic guitar mixed with bright synths, handclaps, feel-good hooks. Major keys only. Every song should feel like it's smiling."
  },
  {
    "id": "lemon-papaya-banana",
    "name": "Lemon Papaya Banana",
    "farm": "Terrapin Farms",
    "region": "Humboldt",
    "energyTier": "LOW",
    "intent": "Soft body, drifting expansive mind.",
    "effects": [
      "Physically Relaxed",
      "Spacey",
      "Euphoric"
    ],
    "aroma": [
      "Papaya",
      "Honeydew Melon",
      "Lemon Zest"
    ],
    "totalTerpenes": 1.38,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 0.57,
        "ratio": 49
      },
      {
        "name": "Limonene",
        "percentage": 0.29,
        "ratio": 25
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.16,
        "ratio": 14
      },
      {
        "name": "α-Humulene",
        "percentage": 0.05,
        "ratio": 4
      }
    ],
    "vibeCategories": [
      "deepRest",
      "bodyMelt"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 14,
          "terpene": "Myrcene"
        },
        {
          "name": "Lemon",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Black Pepper",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Geranium",
          "drops": 6,
          "terpene": "Floral"
        },
        {
          "name": "Ylang Ylang",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "Myrcene-dominant with lemongrass at 35%. Lemon captures the 'lemon zest' perfectly. Black pepper for caryophyllene. Geranium adds tropical, fruity notes matching papaya and melon. Ylang ylang brings exotic sweetness."
    },
    "spotifyPrompt": "Create a 90-minute playlist for soft body relaxation and expansive, drifting mind. Start at 80 BPM with tropical-tinged downtempo — Bonobo's 'Migration' album feel, Maribou State. Drift into spacey, psychedelic ambient — Tame Impala's instrumental interludes, Washed Out's most blissful moments. Final 30 minutes: pure floating ambient — Stars of the Lid, Grouper's warmer pieces. The mind should feel expansive while the body melts. Lush production, gentle reverb, tropical warmth throughout."
  },
  {
    "id": "pinnacle",
    "name": "Pinnacle",
    "farm": "Dos Rios Farms",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Deep surrender into velvet quiet.",
    "effects": [
      "Heavy",
      "Sedative",
      "Blissful"
    ],
    "aroma": [
      "Sweet Cream",
      "Nutmeg",
      "Fennel Seeds"
    ],
    "totalTerpenes": 3.35,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.61,
        "ratio": 27
      },
      {
        "name": "Limonene",
        "percentage": 0.46,
        "ratio": 20
      },
      {
        "name": "α-Humulene",
        "percentage": 0.19,
        "ratio": 8
      },
      {
        "name": "trans-β-Farnesene",
        "percentage": 0.14,
        "ratio": 6
      }
    ],
    "vibeCategories": [
      "deepRest"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sweet Orange",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Rosemary",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sage",
          "drops": 6,
          "terpene": "α-Humulene"
        },
        {
          "name": "Ylang Ylang",
          "drops": 4,
          "terpene": "trans-β-Farnesene"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "The heaviest, most sedative strain. Black pepper and rosemary together deliver concentrated caryophyllene. Sweet orange for the limonene and 'sweet cream' aroma. Sage for humulene with earthy depth. Ylang ylang is one of the few oils containing farnesene, amplifying the blissful effect."
    },
    "spotifyPrompt": "Create a 90-minute playlist for total surrender. Start at 75 BPM and slowly descend to 55 BPM by the end. Open with deep, velvet-textured downtempo — Tycho's slower work, Boards of Canada, Helios. Transition into pure ambient and drone by the midpoint — Brian Eno, Stars of the Lid, Grouper. Final 30 minutes should be barely-there sound design — long tones, deep bass swells, no rhythm. Think warm darkness, not cold emptiness. Every track should feel like sinking deeper into a soft surface. Exclusively instrumental."
  },
  {
    "id": "pink-jesus-reserve",
    "name": "Pink Jesus Reserve",
    "farm": "Sonoma Hills Farm",
    "region": "Sonoma",
    "energyTier": "MEDIUM",
    "intent": "Buoyant and warm, ready to share.",
    "effects": [
      "Social",
      "Uplifting",
      "Euphoric"
    ],
    "aroma": [
      "Raspberry",
      "French Lavender",
      "Pineapple"
    ],
    "totalTerpenes": 1.89,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.78,
        "ratio": 48
      },
      {
        "name": "Myrcene",
        "percentage": 0.38,
        "ratio": 23
      },
      {
        "name": "α-Humulene",
        "percentage": 0.27,
        "ratio": 17
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.15,
        "ratio": 9
      }
    ],
    "vibeCategories": [
      "socialBright",
      "euphoricLift"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 14,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemongrass",
          "drops": 8,
          "terpene": "Myrcene"
        },
        {
          "name": "Lavender",
          "drops": 6,
          "terpene": "Linalool"
        },
        {
          "name": "Sage",
          "drops": 6,
          "terpene": "α-Humulene"
        },
        {
          "name": "German Chamomile",
          "drops": 4,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Geranium",
          "drops": 2,
          "terpene": "Floral"
        }
      ],
      "rationale": "Black pepper anchors the high caryophyllene content. Lemongrass delivers myrcene for euphoria. Lavender captures the 'French lavender' aroma note. Sage for humulene depth. German chamomile for bisabolol. A whisper of geranium adds the fruity, floral top notes."
    },
    "spotifyPrompt": "Create a 75-minute playlist that's buoyant and warm — social energy that lifts everyone. Target 100-110 BPM. Start with soulful, uplifting grooves — Jungle, Tom Misch, Jordan Rakei. Build into warm, danceable funk and nu-disco — Parcels live versions, Roosevelt, Breakbot. Wind down with soulful acoustic and gentle R&B — Daniel Caesar, SZA's lighter moments. Every track should make the room feel warmer. The vibe is a dinner party where someone just said something that made everyone laugh."
  },
  {
    "id": "love-and-laughter",
    "name": "Love and Laughter",
    "farm": "Heartrock Mountain Farm",
    "region": "Mendocino",
    "energyTier": "MEDIUM",
    "intent": "Clear and steady, nothing clouded.",
    "effects": [
      "Energizing",
      "Focusing",
      "Non-Intoxicating"
    ],
    "aroma": [
      "Flowers",
      "Eucalyptus",
      "Berries"
    ],
    "totalTerpenes": 1.72,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 0.56,
        "ratio": 38
      },
      {
        "name": "Terpinolene",
        "percentage": 0.28,
        "ratio": 19
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.2,
        "ratio": 14
      },
      {
        "name": "α-Pinene",
        "percentage": 0.13,
        "ratio": 9
      }
    ],
    "vibeCategories": [
      "calmFocus"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 14,
          "terpene": "Myrcene"
        },
        {
          "name": "Tea Tree",
          "drops": 8,
          "terpene": "Terpinolene"
        },
        {
          "name": "Eucalyptus",
          "drops": 8,
          "terpene": "1,8-Cineole"
        },
        {
          "name": "Black Pepper",
          "drops": 6,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Geranium",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "The only CBD strain in the collection. Lemongrass for the dominant myrcene. Tea tree is one of the few oils high in terpinolene, capturing this strain's unique character. Eucalyptus matches the aroma and adds clarity. Black pepper for caryophyllene. Geranium brings floral berry notes."
    },
    "spotifyPrompt": "Create a 90-minute playlist for clear, focused productivity — no fog, no distraction. Target 95-105 BPM. Start with minimal, focused electronic — Kiasmos, \u00d3lafur Arnalds' 'Island Songs,' Nils Frahm's 'Spaces' energy. Move into ambient productivity — Brian Eno's 'Music for Airports,' Max Richter's concentration-friendly pieces. Final section: barely-there focus tones, lo-fi work music, gentle repetitive patterns. Everything should enhance concentration without demanding attention. The CBD strain's clarity means the music should be transparent and clean. No surprises, no emotional peaks — just steady, clear space to think."
  },
  {
    "id": "blueberry-muffin",
    "name": "Blueberry Muffin",
    "farm": "Briceland Forest Farm",
    "region": "Humboldt",
    "energyTier": "LOW",
    "intent": "Quiet peace with a soft glow.",
    "effects": [
      "Relaxed",
      "Peaceful",
      "Joyful"
    ],
    "aroma": [
      "Blueberry",
      "Fresh Dough",
      "Cinnamon"
    ],
    "totalTerpenes": 1.66,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.47,
        "ratio": 34
      },
      {
        "name": "Myrcene",
        "percentage": 0.4,
        "ratio": 29
      },
      {
        "name": "α-Bisabolol",
        "percentage": 0.25,
        "ratio": 18
      },
      {
        "name": "α-Humulene",
        "percentage": 0.16,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lemongrass",
          "drops": 10,
          "terpene": "Myrcene"
        },
        {
          "name": "German Chamomile",
          "drops": 8,
          "terpene": "α-Bisabolol"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Geranium",
          "drops": 4,
          "terpene": "Floral"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Black pepper and lemongrass anchor the caryophyllene and myrcene. German chamomile brings the α-bisabolol for a soft, calming quality. Sage adds humulene depth. Geranium contributes fruity, berry-like notes. A touch of clove echoes the cinnamon aroma."
    },
    "spotifyPrompt": "Create an 80-minute playlist for quiet, peaceful joy — the musical equivalent of a warm blueberry muffin. Target 80-90 BPM. Start with soft indie folk — Iron & Wine, Fleet Foxes' gentler songs, Gregory Alan Isakov. Move into pastoral ambient and modern classical — \u00d3lafur Arnalds, A Winged Victory for the Sullen, Dustin O'Halloran. Close with pure warmth — solo piano, gentle strings, fireside ambient. Everything should glow softly. No sharp edges, no irony, no complexity. Just peace with a hint of sweetness."
  },
  {
    "id": "mandarin-cherry-tree",
    "name": "Mandarin Cherry Tree",
    "farm": "Sticky Fields",
    "region": "Mendocino",
    "energyTier": "LOW",
    "intent": "Settled body, gently wandering mind.",
    "effects": [
      "Full Body Relaxation",
      "Serenity",
      "Creativity"
    ],
    "aroma": [
      "Mandarin Orange",
      "Sandalwood",
      "Lavender"
    ],
    "totalTerpenes": 1.75,
    "dominantTerpene": "Limonene",
    "terpeneProfile": [
      {
        "name": "Limonene",
        "percentage": 0.52,
        "ratio": 40
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.36,
        "ratio": 28
      },
      {
        "name": "α-Humulene",
        "percentage": 0.13,
        "ratio": 10
      },
      {
        "name": "Linalool",
        "percentage": 0.11,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Sweet Orange",
          "drops": 16,
          "terpene": "Limonene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Lavender",
          "drops": 6,
          "terpene": "Linalool"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Ylang Ylang",
          "drops": 4,
          "terpene": "Floral"
        }
      ],
      "rationale": "Sweet orange dominates (40%) to match the mandarin aroma. Black pepper delivers caryophyllene. Lavender captures the floral note and linalool content. Sage for humulene grounding. Ylang ylang adds exotic floral depth reminiscent of sandalwood."
    },
    "spotifyPrompt": "Create an 80-minute playlist for a settled body with a gently wandering creative mind. Target 80-95 BPM. Start with dreamy, citrus-warm indie — Beach House, Washed Out's 'Purple Noon,' Melody's Echo Chamber. Move into contemplative electronic and ambient — Boards of Canada's warmer tracks, Four Tet's 'Rounds' era, Bibio. Close with gentle, wandering instrumentals — acoustic guitar explorations, soft Rhodes improvisations. The body should feel settled while the mind drifts pleasantly from thought to thought. Sandalwood warmth, mandarin brightness."
  },
  {
    "id": "glitter-bomb",
    "name": "Glitter Bomb",
    "farm": "Sol Spirit Farm",
    "region": "Trinity",
    "energyTier": "MEDIUM",
    "intent": "Body at ease, mind sparkling.",
    "effects": [
      "Physically Relaxing",
      "Cerebral",
      "Euphoric"
    ],
    "aroma": [
      "Kiwi",
      "Pine",
      "Musk"
    ],
    "totalTerpenes": 2.39,
    "dominantTerpene": "Myrcene",
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "percentage": 1.23,
        "ratio": 58
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.42,
        "ratio": 20
      },
      {
        "name": "β-Ocimene",
        "percentage": 0.17,
        "ratio": 8
      },
      {
        "name": "Linalool",
        "percentage": 0.15,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "bodyMelt",
      "euphoricLift"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Lemongrass",
          "drops": 18,
          "terpene": "Myrcene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Basil",
          "drops": 4,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Lavender",
          "drops": 4,
          "terpene": "Linalool"
        },
        {
          "name": "Pine",
          "drops": 4,
          "terpene": "α-Pinene"
        }
      ],
      "rationale": "High myrcene (1.23%) calls for lemongrass dominance (45%). Black pepper for the caryophyllene. Basil captures the ocimene. Lavender for linalool. Pine needle oil matches the 'pine' aroma note and adds forest character."
    },
    "spotifyPrompt": "Create a 75-minute playlist where the body melts while the mind sparkles — physical ease meets cerebral fireworks. Start at 90 BPM with body-heavy grooves — James Blake's bass-weighted pieces, Mount Kimbie, FKA Twigs instrumentals. Build into sparkling, cerebral electronic — Aphex Twin's 'Selected Ambient Works' gentler tracks, Autechre's accessible pieces, glitchy IDM that catches the light. Close with deep ambient that still shimmers. Bass should be round and heavy (body) while high frequencies sparkle and glitch (mind). The split personality is the point."
  },
  {
    "id": "tropicanna-cherry",
    "name": "Tropicanna Cherry",
    "farm": "Sunrise Gardens",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Bright lift with clear, lively edges.",
    "effects": [
      "Euphoric",
      "Cerebral",
      "Cheerful"
    ],
    "aroma": [
      "Sour Cherry",
      "Sweet Citrus",
      "Nutmeg"
    ],
    "totalTerpenes": 1.18,
    "dominantTerpene": "β-Caryophyllene",
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "percentage": 0.37,
        "ratio": 38
      },
      {
        "name": "Limonene",
        "percentage": 0.29,
        "ratio": 30
      },
      {
        "name": "Linalool",
        "percentage": 0.15,
        "ratio": 15
      },
      {
        "name": "α-Humulene",
        "percentage": 0.11,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "creativeFlow"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Black Pepper",
          "drops": 12,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Sweet Orange",
          "drops": 10,
          "terpene": "Limonene"
        },
        {
          "name": "Lavender",
          "drops": 6,
          "terpene": "Linalool"
        },
        {
          "name": "Geranium",
          "drops": 6,
          "terpene": "Floral"
        },
        {
          "name": "Sage",
          "drops": 4,
          "terpene": "α-Humulene"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "rationale": "Black pepper for the caryophyllene backbone. Sweet orange captures the 'sweet citrus' note. Lavender for linalool softness. Geranium adds cherry-like fruity notes. Sage for humulene depth. Clove echoes the nutmeg warmth."
    },
    "spotifyPrompt": "Create a 60-minute playlist that's bright, lively, and cheerfully cerebral. Target 110-120 BPM. Open with bright, cherry-sweet indie pop — Japanese Breakfast, Alvvays, Soccer Mommy's poppier tracks. Build into sparkly, uptempo electronic — Charli XCX's production style, PC Music vibes, SOPHIE's more accessible work. Keep everything bright, sweet, and slightly tart — like sour cherry candy in sonic form. Production should be crisp, colorful, and unapologetically fun. The energy never dips below 'cheerful.' No darkness, no melancholy."
  },
  {
    "id": "pink-rider",
    "name": "Pink Rider",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energyTier": "HIGH",
    "intent": "Vivid creative lift with social magnetism.",
    "effects": [
      "Euphoric",
      "Creative",
      "Social"
    ],
    "aroma": [
      "Pink Grapefruit",
      "Juniper",
      "Green Apple"
    ],
    "totalTerpenes": 1.52,
    "dominantTerpene": "Terpinolene",
    "terpeneProfile": [
      {
        "name": "Terpinolene",
        "percentage": 0.45,
        "ratio": 35
      },
      {
        "name": "β-Caryophyllene",
        "percentage": 0.32,
        "ratio": 25
      },
      {
        "name": "β-Ocimene",
        "percentage": 0.22,
        "ratio": 17
      },
      {
        "name": "Limonene",
        "percentage": 0.18,
        "ratio": 14
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "creativeFlow",
      "socialBright"
    ],
    "eoRecipe": {
      "oils": [
        {
          "name": "Tea Tree",
          "drops": 12,
          "terpene": "Terpinolene"
        },
        {
          "name": "Black Pepper",
          "drops": 10,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Basil",
          "drops": 8,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Grapefruit",
          "drops": 6,
          "terpene": "Limonene"
        },
        {
          "name": "Pine",
          "drops": 4,
          "terpene": "α-Pinene"
        }
      ],
      "rationale": "Terpinolene-dominant — rare and distinctive. Tea tree captures the terpinolene character. Black pepper for caryophyllene grounding. Basil for ocimene energy. Grapefruit matches the pink grapefruit aroma. Pine adds forest-fresh clarity."
    },
    "spotifyPrompt": "Create a 70-minute playlist that's vivid, inventive, and creatively charged — social magnetism meets artistic energy. Target 115-125 BPM. Open with art-pop and quirky electronic — Metronomy, Hot Chip, LCD Soundsystem's grooves. Build into inventive indie dance — Everything Everything, Glass Animals' dancier tracks, Foals. Mix in moments of bright guitar-driven energy — Alt-J's rhythmic tracks, Bombay Bicycle Club. Production should feel fresh and minty — clean highs, tight low end, spacious mix with room to breathe. The vibe is studio session where everything's clicking. No ambient, no wind-down."
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────

export function getStrainById(id: string): Strain | undefined {
  return STRAINS.find(s => s.id === id);
}

export function getStrainsByVibe(vibeId: string): Strain[] {
  return STRAINS.filter(s => s.vibeCategories.includes(vibeId));
}

export function getStrainsByEnergy(tier: "HIGH" | "MEDIUM" | "LOW"): Strain[] {
  return STRAINS.filter(s => s.energyTier === tier);
}

export function getStrainsByTerpene(terpeneName: string): Strain[] {
  return STRAINS.filter(s => s.dominantTerpene === terpeneName);
}

export function searchStrains(query: string): Strain[] {
  const q = query.toLowerCase();
  return STRAINS.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.farm.toLowerCase().includes(q) ||
    s.effects.some(e => e.toLowerCase().includes(q)) ||
    s.aroma.some(a => a.toLowerCase().includes(q)) ||
    s.intent.toLowerCase().includes(q)
  );
}

// ─── LOWERCASE COMPAT ALIASES ───────────────────────────────────────
// Pages import { strains, vibeCategories } from '../data/strains'.
// Map the canonical uppercase exports to the lowercase names they expect.
// vibeCategories is keyed by id so that vibeCategories[strain.vibeCategory] works.

// HomePage/StrainPage were built against an older shape with `strain.vibeCategory`
// (singular) and a `strain.music` object. The canonical schema uses
// `vibeCategories: string[]` and stores music info only as `spotifyPrompt`.
// Project both onto the legacy shape so existing cards/pages render without
// touching the source data.
function parseBpmRange(prompt: string | undefined): [number, number] {
  if (!prompt) return [80, 100];
  const match = prompt.match(/(\d{2,3})\s*[-–]\s*(\d{2,3})\s*BPM/i);
  if (match) return [parseInt(match[1], 10), parseInt(match[2], 10)];
  const single = prompt.match(/(\d{2,3})\s*BPM/i);
  if (single) {
    const n = parseInt(single[1], 10);
    return [n - 8, n + 12];
  }
  return [80, 100];
}

function parseDuration(prompt: string | undefined): number {
  if (!prompt) return 60;
  const match = prompt.match(/(\d{2,3})\s*[-–]?\s*minute/i);
  return match ? parseInt(match[1], 10) : 60;
}

export const strains = STRAINS.map(s => {
  const [bpmStart, bpmPeak] = parseBpmRange(s.spotifyPrompt);
  const duration = parseDuration(s.spotifyPrompt);
  return {
    ...s,
    vibeCategory: Array.isArray(s.vibeCategories) && s.vibeCategories.length > 0
      ? s.vibeCategories[0]
      : 'rest',
    music: {
      duration,
      bpmStart,
      bpmPeak,
      bpmEnd: Math.round((bpmStart + bpmPeak) / 2),
      prompt: s.spotifyPrompt || '',
      artists: [] as string[],
      phases: {
        open: { duration: Math.round(duration * 0.25) },
        peak: { duration: Math.round(duration * 0.5) },
        close: { duration: Math.round(duration * 0.25) },
      },
    },
    oils: s.eoRecipe?.oils?.map(o => ({ name: o.name, drops: o.drops })) || [],
    terpenes: s.terpeneProfile?.map(t => ({
      name: t.name,
      percentage: t.percentage,
      color: TERPENE_COLORS[t.name] || '#2D5A3D',
    })) || [],
  };
}) as Array<Strain & {
  vibeCategory: string;
  music: {
    duration: number;
    bpmStart: number;
    bpmPeak: number;
    bpmEnd: number;
    prompt: string;
    artists: string[];
    phases: Record<string, { duration: number }>;
  };
  oils: Array<{ name: string; drops: number }>;
  terpenes: Array<{ name: string; percentage: number; color: string }>;
}>;

export const vibeCategories: Record<string, VibeCategory> = VIBE_CATEGORIES.reduce(
  (acc, v) => {
    acc[v.id] = v;
    return acc;
  },
  {} as Record<string, VibeCategory>
);

export const terpeneColors = TERPENE_COLORS;

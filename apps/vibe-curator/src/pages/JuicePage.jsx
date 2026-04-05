import React, { useState, useMemo, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════
// SOLFUL SESSIONS — TERPENE JUICE APP
// Ingredients Library · Recipe Matcher · Shopping List
// 24 Strains × Terpene-Matched Juice Recipes
// ═══════════════════════════════════════════════════════

// --- Design System ---
const C = {
  bg: "#0C0C0C", bgCard: "#161412", bgHover: "#1E1A16", bgSurface: "#1A1816",
  border: "#2A2622", borderLight: "#1E1C1A",
  text: "#F5F0E8", textSec: "#9B9185", textMuted: "#6B6560",
  gold: "#C8A97E", goldDim: "rgba(200,169,126,0.15)",
  sage: "#7C9082", sageDim: "rgba(124,144,130,0.15)",
  wine: "#8B5E5E", wineDim: "rgba(139,94,94,0.12)",
  green: "#8EAE68", red: "#C27070", amber: "#D4C85C",
};

const TERPENE_COLORS = {
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

const VIBE_CATEGORIES = {
  "groundedPresent": {
    "label": "Grounded & Present",
    "icon": "🌿"
  },
  "creativeFlow": {
    "label": "Creative Flow",
    "icon": "🎨"
  },
  "deepRest": {
    "label": "Deep Rest",
    "icon": "🌙"
  },
  "socialBright": {
    "label": "Social & Bright",
    "icon": "✨"
  },
  "bodyMelt": {
    "label": "Body Melt",
    "icon": "🫠"
  },
  "euphoricLift": {
    "label": "Euphoric Lift",
    "icon": "☀️"
  },
  "calmFocus": {
    "label": "Calm Focus",
    "icon": "🎯"
  },
  "cozyComfort": {
    "label": "Cozy Comfort",
    "icon": "🛋️"
  }
};

const ENERGY_META = {
  HIGH: { label: "High Energy", color: "#D4C85C", short: "HIGH" },
  MEDIUM: { label: "Medium", color: "#C8A97E", short: "MED" },
  LOW: { label: "Low Energy", color: "#9B7BA8", short: "LOW" },
};

const CATEGORIES = {
  "citrus": {
    "label": "Citrus",
    "icon": "🍋"
  },
  "tropical-fruit": {
    "label": "Tropical Fruit",
    "icon": "🥭"
  },
  "berry": {
    "label": "Berries",
    "icon": "🫐"
  },
  "other-fruit": {
    "label": "Other Fruit",
    "icon": "🍉"
  },
  "fresh-herb": {
    "label": "Fresh Herbs",
    "icon": "🌿"
  },
  "spice": {
    "label": "Spices",
    "icon": "🫚"
  },
  "flavor-extract": {
    "label": "Flavor Extracts",
    "icon": "💧"
  },
  "tea": {
    "label": "Teas",
    "icon": "🍵"
  },
  "sweetener": {
    "label": "Sweetener",
    "icon": "🍯"
  },
  "batch-syrup": {
    "label": "Batch Syrups",
    "icon": "🧪"
  },
  "liquid": {
    "label": "Liquids",
    "icon": "💦"
  }
};

const STARTER_KITS = [
  {
    "id": "pantry-staples",
    "name": "Pantry Staples",
    "description": "Common kitchen items that cover 19+ recipes",
    "items": [
      "black-pepper",
      "honey",
      "lemon-juice",
      "ground-cinnamon",
      "sparkling-water",
      "mineral-water"
    ]
  },
  {
    "id": "herb-garden",
    "name": "Herb Garden",
    "description": "Fresh herbs that are the terpene backbone of 15+ recipes",
    "items": [
      "fresh-rosemary",
      "fresh-basil",
      "fresh-spearmint",
      "fresh-sage",
      "fresh-ginger"
    ]
  },
  {
    "id": "flavor-drops",
    "name": "Flavor Drops",
    "description": "Extracts that complete 8+ recipes",
    "items": [
      "lavender-extract",
      "orange-extract",
      "vanilla-extract"
    ]
  },
  {
    "id": "tea-cabinet",
    "name": "Tea Cabinet",
    "description": "Teas that deliver rare terpenes (bisabolol, terpinolene)",
    "items": [
      "chamomile-tea",
      "mint-tea",
      "earl-grey-tea"
    ]
  },
  {
    "id": "lemongrass-pack",
    "name": "Lemongrass Pack",
    "description": "Unlocks 3 high-myrcene recipes (Mule Fuel, Avenue of the Giants, Glitter Bomb enhancement)",
    "items": [
      "lemongrass"
    ]
  },
  {
    "id": "tropical-pack",
    "name": "Tropical Pack",
    "description": "Specialty fruits for 4 tropical recipes",
    "items": [
      "guava",
      "mango",
      "papaya",
      "pineapple-juice"
    ]
  }
];

const BATCH_SYRUPS = [
  {
    "id": "cardamom-honey-syrup",
    "name": "Cardamom-Honey Syrup",
    "ingredients": [
      "3-4 cardamom pods",
      "2 oz warm water",
      "1 tbsp honey"
    ],
    "method": "Crack pods in warm water + honey. Steep 5 min, strain.",
    "shelfLife": "2 weeks refrigerated",
    "usedIn": [
      "carambola",
      "rasta-governmint"
    ]
  },
  {
    "id": "cardamom-vanilla-syrup",
    "name": "Cardamom-Vanilla Syrup",
    "ingredients": [
      "5 cardamom pods",
      "4 oz water",
      "2 oz honey",
      "0.5 tsp vanilla extract"
    ],
    "method": "Crack pods in water + honey + vanilla. Simmer 5 min, strain.",
    "shelfLife": "2 weeks refrigerated",
    "usedIn": [
      "natty-bumppo"
    ]
  },
  {
    "id": "cinnamon-honey-syrup",
    "name": "Cinnamon-Honey Syrup",
    "ingredients": [
      "1 cinnamon stick",
      "2 oz water",
      "1 oz honey"
    ],
    "method": "Simmer cinnamon in water + honey for 5 min. Strain and cool.",
    "shelfLife": "2 weeks refrigerated",
    "usedIn": [
      "black-lime-chem",
      "blueberry-muffin",
      "strawberry-biscotti"
    ]
  }
];

// --- Data ---
const RECIPES = [
  {
    "id": "mike-s-bomba",
    "strainNumber": 1,
    "name": "Mike's Bomba",
    "recipeName": "Grounded Forest Calm",
    "farm": "Glentucky Family Farm",
    "region": "Sonoma",
    "energy": "LOW",
    "effects": [
      "Relaxed",
      "Calm",
      "Alert"
    ],
    "intent": "Grounded calm with clear mental edges",
    "aroma": [
      "Fuel",
      "Lemon Cream",
      "Forest Floor"
    ],
    "cannabinoids": {
      "thc": 28.76,
      "cbd": 0.09
    },
    "totalTerpenes": 1.38,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.47,
        "ratio": 45
      },
      {
        "name": "Limonene",
        "pct": 0.32,
        "ratio": 31
      },
      {
        "name": "α-Humulene",
        "pct": 0.18,
        "ratio": 17
      },
      {
        "name": "Linalool",
        "pct": 0.07,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "groundedPresent"
    ],
    "ingredients": [
      {
        "raw": "2.5 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 2.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.75 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.75,
        "unit": "oz"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch sage powder",
        "itemId": "sage-powder",
        "name": "Sage Powder",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "2 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 2.0,
        "unit": "drops"
      },
      {
        "raw": "2 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Press 1 oz fresh ginger root through a fine grater or juicer",
      "Steep rosemary sprig in 1 oz warm water for 3 min, strain and cool",
      "Combine grapefruit juice, lemon juice, and ginger juice",
      "Add rosemary water, honey, sage powder, black pepper, and lavender flavor drops",
      "Pour over ice in a rocks glass, top with sparkling water down the side",
      "Garnish with rosemary sprig"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "ginger",
          "rosemary"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage",
          "ginger"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor"
        ]
      }
    ],
    "oilBlend": "Black Pepper (20), Lemon (10), Sage (8), Lavender (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "natty-bumppo",
    "strainNumber": 2,
    "name": "Natty Bumppo",
    "recipeName": "Frontier Ease",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Happy",
      "Carefree",
      "Physically Relaxed"
    ],
    "intent": "Loose and easy, happily untethered",
    "aroma": [
      "Kerosene",
      "Musk",
      "Sour Plum"
    ],
    "cannabinoids": {
      "thc": 32.0
    },
    "totalTerpenes": 1.86,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.63,
        "ratio": 44
      },
      {
        "name": "Limonene",
        "pct": 0.35,
        "ratio": 25
      },
      {
        "name": "α-Humulene",
        "pct": 0.25,
        "ratio": 18
      },
      {
        "name": "Myrcene",
        "pct": 0.19,
        "ratio": 13
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "socialBright"
    ],
    "ingredients": [
      {
        "raw": "2.5 oz tart cherry juice",
        "itemId": "tart-cherry-juice",
        "name": "Tart Cherry Juice",
        "qty": 2.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz cardamom-vanilla syrup",
        "itemId": "cardamom-vanilla-syrup",
        "name": "Cardamom-Vanilla Syrup",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "2 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Make cardamom-vanilla syrup: crack 5 pods in 4 oz water + 2 oz honey + 0.5 tsp vanilla extract, simmer 5 min, strain",
      "Press fresh ginger to yield 0.5 oz",
      "Steep rosemary sprig in 1 oz warm water for 2 min, strain",
      "Combine tart cherry juice, lemon juice, ginger juice, rosemary water, and cardamom-vanilla syrup",
      "Add black pepper, stir gently with ice for 8 seconds",
      "Strain into a rocks glass with large ice, add mineral water, garnish with rosemary sprig"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cardamom",
          "black pepper",
          "ginger",
          "rosemary"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lemon",
          "tart cherry"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "ginger"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "rosemary"
        ]
      }
    ],
    "oilBlend": "Black Pepper (14), Lemon (10), Sage (6), Lemongrass (6), Geranium (4)",
    "substitutionNotes": "Tart cherry replaces sour plum from original recipe. If sour plums are available, use 2.5 oz fresh sour plum juice instead.",
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "black-lime-chem",
    "strainNumber": 3,
    "name": "Black Lime Chem",
    "recipeName": "Weighted Lime Bliss",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Heavy",
      "Blissful",
      "Sleepy"
    ],
    "intent": "Weighted bliss melting toward rest",
    "aroma": [
      "Sharp Lime",
      "Rhubarb",
      "Glue"
    ],
    "cannabinoids": {
      "thc": 19.0
    },
    "totalTerpenes": 3.08,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.69,
        "ratio": 67
      },
      {
        "name": "α-Pinene",
        "pct": 0.39,
        "ratio": 15
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.27,
        "ratio": 11
      },
      {
        "name": "β-Ocimene",
        "pct": 0.19,
        "ratio": 7
      }
    ],
    "vibeCategories": [
      "deepRest"
    ],
    "ingredients": [
      {
        "raw": "2 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 2.0,
        "unit": "oz"
      },
      {
        "raw": "1.5 oz green apple juice (fresh pressed)",
        "itemId": "green-apple",
        "name": "Green Apple",
        "qty": 1.5,
        "unit": "oz"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "4 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "0.25 oz cinnamon-honey syrup",
        "itemId": "cinnamon-honey-syrup",
        "name": "Cinnamon-Honey Syrup",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Make cinnamon-honey syrup: simmer 1 cinnamon stick in 2 oz water + 1 oz honey for 5 min, strain and cool",
      "Press 1 green apple, blend and strain to yield 1.5 oz",
      "Steep rosemary sprig in 1 oz warm water for 2 min, strain",
      "Gently muddle basil leaves for 2 seconds",
      "Combine lime juice, green apple juice, rosemary water, cinnamon-honey syrup, and cinnamon, stir with ice 8 seconds",
      "Strain into rocks glass over large ice, add mineral water, garnish with lime wheel and rosemary"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "lime",
          "rosemary",
          "basil"
        ]
      },
      {
        "terpene": "α-Pinene",
        "sources": [
          "rosemary",
          "basil"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "basil"
        ]
      },
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil"
        ]
      }
    ],
    "oilBlend": "Lemongrass (16), Pine (8), Black Pepper (6), Basil (6), Lemon (4)",
    "substitutionNotes": "Green apple replaces rhubarb for tartness. If rhubarb available, juice 1 cup chopped rhubarb and use 1.5 oz in place of apple.",
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "guava-gift",
    "strainNumber": 4,
    "name": "Guava Gift",
    "recipeName": "Expansive Social Lift",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "HIGH",
    "effects": [
      "Social",
      "Inspiring",
      "Euphoric"
    ],
    "intent": "Open and expansive, easy social lift",
    "aroma": [
      "Fresh Guava",
      "Lemon Rind",
      "Tamarind"
    ],
    "cannabinoids": {
      "thc": 29.0,
      "cbd": 0.08
    },
    "totalTerpenes": 2.34,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.73,
        "ratio": 38
      },
      {
        "name": "Limonene",
        "pct": 0.5,
        "ratio": 26
      },
      {
        "name": "Myrcene",
        "pct": 0.33,
        "ratio": 17
      },
      {
        "name": "α-Humulene",
        "pct": 0.25,
        "ratio": 13
      }
    ],
    "vibeCategories": [
      "socialBright"
    ],
    "ingredients": [
      {
        "raw": "2.5 oz fresh guava puree",
        "itemId": "guava",
        "name": "Guava",
        "qty": 2.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "4 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1.5 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "If using fresh guava: halve 3-4 guavas, scoop flesh, blend and strain",
      "Steep rosemary in 1 oz cool water for 2 min, strain. Muddle basil",
      "Combine guava puree, grapefruit juice, lime juice, ginger juice, rosemary water, basil, black pepper, and honey",
      "Stir with ice, strain into highball over fresh ice, top with sparkling water",
      "Garnish with basil leaf and lime wheel"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "ginger",
          "rosemary",
          "basil"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lime",
          "guava"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "basil",
          "rosemary",
          "guava"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "ginger",
          "basil"
        ]
      }
    ],
    "oilBlend": "Black Pepper (14), Grapefruit (10), Lemongrass (8), Basil (6), Rosemary (2)",
    "substitutionNotes": null,
    "buyNotes": "Guava puree (Goya canned works) or 3-4 fresh guavas. Tamarind paste optional.",
    "notes": null
  },
  {
    "id": "mule-fuel",
    "strainNumber": 5,
    "name": "Mule Fuel",
    "recipeName": "Diesel Rest",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "LOW",
    "effects": [
      "Happy",
      "Hungry",
      "Sleepy"
    ],
    "intent": "Gentle contentment settling toward rest",
    "aroma": [
      "Skunk",
      "Diesel",
      "Lemon",
      "Leather"
    ],
    "cannabinoids": {
      "thc": 28.69,
      "cbd": 0.07
    },
    "totalTerpenes": 3.97,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 2.22,
        "ratio": 66
      },
      {
        "name": "α-Pinene",
        "pct": 0.54,
        "ratio": 16
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.34,
        "ratio": 10
      },
      {
        "name": "Limonene",
        "pct": 0.28,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "deepRest",
      "bodyMelt"
    ],
    "ingredients": [
      {
        "raw": "4 fresh lemongrass stalks",
        "itemId": "lemongrass",
        "name": "Fresh Lemongrass",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "1 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "2 fresh rosemary sprigs",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 2.0,
        "unit": "fresh"
      },
      {
        "raw": "4 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1.5 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Peel and smash lemongrass stalks, cold press or blend with 1 oz water, fine-strain (yields ~1.5 oz)",
      "Steep rosemary in 1.5 oz cool water for 3 min, strain",
      "Muddle basil, combine lemongrass juice, lemon juice, rosemary water, basil, black pepper, cinnamon, and honey",
      "Stir with ice for 10 seconds, strain into rocks glass over large ice, add mineral water",
      "Garnish with rosemary sprig"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "lemongrass",
          "basil",
          "rosemary"
        ]
      },
      {
        "terpene": "α-Pinene",
        "sources": [
          "rosemary",
          "basil"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "cinnamon",
          "rosemary"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lemon"
        ]
      }
    ],
    "oilBlend": "Lemongrass (20), Pine (8), Black Pepper (6), Lemon (6)",
    "substitutionNotes": null,
    "buyNotes": "Lemongrass sticks — essential, no substitute for this myrcene load.",
    "notes": null
  },
  {
    "id": "satsuma-sherbet",
    "strainNumber": 6,
    "name": "Satsuma Sherbet",
    "recipeName": "Mandarin Comfort",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "LOW",
    "effects": [
      "Happy",
      "Contemplative",
      "Comfortable"
    ],
    "intent": "Quiet ease with thoughtful undertones",
    "aroma": [
      "Mandarin Orange",
      "Mochi",
      "Mint"
    ],
    "cannabinoids": {
      "thc": 26.0
    },
    "totalTerpenes": 1.85,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.55,
        "ratio": 44
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.45,
        "ratio": 36
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 10
      },
      {
        "name": "Myrcene",
        "pct": 0.11,
        "ratio": 9
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "4 oz mandarin juice",
        "itemId": "mandarin-juice",
        "name": "Mandarin Juice",
        "qty": 4.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "4 fresh spearmint leaves",
        "itemId": "fresh-spearmint",
        "name": "Fresh Spearmint",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1.5 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Gently muddle spearmint leaves in a tall glass for 2 seconds",
      "Add mandarin juice and lemon juice",
      "Stir in honey, cinnamon, and black pepper",
      "Add ice, pour mineral water down the side, garnish with spearmint sprig and cinnamon dust"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "mandarin",
          "lemon",
          "spearmint"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "black pepper"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "black pepper"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "spearmint",
          "lemon"
        ]
      }
    ],
    "oilBlend": "Sweet Orange (16), Black Pepper (12), Sage (4), Lemongrass (4), Peppermint (4)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "tropical-sleigh-ride",
    "strainNumber": 7,
    "name": "Tropical Sleigh Ride",
    "recipeName": "Vivid Mint Clarity",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Joyful",
      "Alert",
      "Euphoric"
    ],
    "intent": "Vivid lift with present clarity",
    "aroma": [
      "Peppermint",
      "Honeysuckle",
      "Hint of Ginger"
    ],
    "cannabinoids": {
      "thc": 17.0
    },
    "totalTerpenes": 2.35,
    "terpeneProfile": [
      {
        "name": "β-Ocimene",
        "pct": 0.71,
        "ratio": 37
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.7,
        "ratio": 37
      },
      {
        "name": "α-Humulene",
        "pct": 0.28,
        "ratio": 15
      },
      {
        "name": "Limonene",
        "pct": 0.22,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "2 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 2.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "8 fresh spearmint leaves",
        "itemId": "fresh-spearmint",
        "name": "Fresh Spearmint",
        "qty": 8.0,
        "unit": "fresh"
      },
      {
        "raw": "5 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 5.0,
        "unit": "fresh"
      },
      {
        "raw": "0.5 oz mint tea (strong, cooled)",
        "itemId": "mint-tea",
        "name": "Mint Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "2 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Gently muddle spearmint and basil leaves for 3 seconds",
      "Add grapefruit juice, ginger juice, mint tea, honey, and black pepper",
      "Fill with ice, shake 8 seconds, strain into highball over crushed ice",
      "Top with sparkling water down the side, garnish with mint sprig and grapefruit wheel"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil",
          "spearmint"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "ginger",
          "black pepper",
          "basil"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "ginger"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit"
        ]
      }
    ],
    "oilBlend": "Basil (14), Black Pepper (12), Peppermint (6), Grapefruit (4), Geranium (4)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "If elderflower cordial available, use 0.25 oz in place of honey for authentic honeysuckle note."
  },
  {
    "id": "purple-candy-cane",
    "strainNumber": 8,
    "name": "Purple Candy Cane",
    "recipeName": "Tropical Candy Vibrancy",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Energized",
      "Invigorated",
      "Talkative"
    ],
    "intent": "Vibrant and vocal, fully awake",
    "aroma": [
      "Mango",
      "Peppermint Candy",
      "Orange Blossom"
    ],
    "cannabinoids": {
      "thc": 22.0
    },
    "totalTerpenes": 1.55,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.54,
        "ratio": 46
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.31,
        "ratio": 26
      },
      {
        "name": "α-Pinene",
        "pct": 0.2,
        "ratio": 17
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "socialBright"
    ],
    "ingredients": [
      {
        "raw": "1.5 cups fresh mango chunks",
        "itemId": "mango",
        "name": "Mango",
        "qty": 1.5,
        "unit": "cups"
      },
      {
        "raw": "1 oz mandarin juice",
        "itemId": "mandarin-juice",
        "name": "Mandarin Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "6 fresh spearmint leaves",
        "itemId": "fresh-spearmint",
        "name": "Fresh Spearmint",
        "qty": 6.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "0.5 oz mint tea (strong, cooled)",
        "itemId": "mint-tea",
        "name": "Mint Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "3 drops orange flavor extract",
        "itemId": "orange-extract",
        "name": "Orange Flavor Extract",
        "qty": 3.0,
        "unit": "drops"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Blend mango chunks until smooth, strain through fine mesh (yields ~2.5 oz)",
      "Steep rosemary in 1 oz cool water for 2 min, strain",
      "Gently muddle spearmint, combine mango puree, mandarin juice, rosemary water, mint tea, orange flavor, cinnamon, and honey",
      "Pour over crushed ice, add mineral water, garnish with mint sprig and cinnamon dust"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "mango",
          "spearmint",
          "rosemary"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "rosemary"
        ]
      },
      {
        "terpene": "α-Pinene",
        "sources": [
          "rosemary",
          "mint"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "cinnamon"
        ]
      }
    ],
    "oilBlend": "Lemongrass (12), Black Pepper (8), Sweet Orange (8), Pine (6), Peppermint (4), Sage (2)",
    "substitutionNotes": null,
    "buyNotes": "Fresh mango or frozen mango chunks.",
    "notes": null
  },
  {
    "id": "carambola",
    "strainNumber": 9,
    "name": "Carambola",
    "recipeName": "Playful Citrus Lift",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Energetic",
      "Fun",
      "Giggly"
    ],
    "intent": "Light and playful, effervescent energy",
    "aroma": [
      "Orange",
      "Diesel",
      "Incense"
    ],
    "cannabinoids": {
      "thc": 20.0
    },
    "totalTerpenes": 1.45,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.44,
        "ratio": 53
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.18,
        "ratio": 22
      },
      {
        "name": "Linalool",
        "pct": 0.12,
        "ratio": 14
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.09,
        "ratio": 11
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "socialBright",
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "3 oz mandarin juice",
        "itemId": "mandarin-juice",
        "name": "Mandarin Juice",
        "qty": 3.0,
        "unit": "oz"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz cardamom-honey syrup",
        "itemId": "cardamom-honey-syrup",
        "name": "Cardamom-Honey Syrup",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz chamomile tea (cooled, strong brew)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "3 drops orange flavor extract",
        "itemId": "orange-extract",
        "name": "Orange Flavor Extract",
        "qty": 3.0,
        "unit": "drops"
      },
      {
        "raw": "2 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 2.0,
        "unit": "drops"
      },
      {
        "raw": "3 fresh lemon verbena leaves",
        "itemId": "lemon-verbena",
        "name": "Lemon Verbena",
        "qty": 3.0,
        "unit": "fresh"
      },
      {
        "raw": "2 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Make cardamom-honey syrup: crack 3-4 pods in 2 oz warm water + 1 tbsp honey, steep 5 min, strain",
      "Steep chamomile tea strong in 4 oz hot water for 5 min, cool completely",
      "Combine mandarin juice, grapefruit juice, and lemon juice",
      "Add cardamom-honey syrup, chamomile tea, orange flavor drops, lavender flavor drops. Gently bruise lemon verbena and add",
      "Add ice, shake 8 seconds, strain into glass over fresh ice",
      "Top with sparkling water down the side, garnish with lemon verbena leaf and grapefruit wedge"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "mandarin",
          "grapefruit",
          "lemon",
          "orange flavor",
          "lemon verbena"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cardamom"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile"
        ]
      }
    ],
    "oilBlend": "Sweet Orange (16), Rosemary (8), Lavender (6), German Chamomile (6), Black Pepper (4)",
    "substitutionNotes": "Mandarin + grapefruit replaces starfruit from original recipe. If starfruit available, replace 2 oz mandarin with starfruit juice.",
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "pineapple-mojito",
    "strainNumber": 10,
    "name": "Pineapple Mojito",
    "recipeName": "Grounded Tropical Glow",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "MEDIUM",
    "effects": [
      "Relaxed",
      "Grounded",
      "Euphoric"
    ],
    "intent": "Rooted ease with a quiet glow",
    "aroma": [
      "Pineapple",
      "Ginger",
      "Mint",
      "Gas"
    ],
    "cannabinoids": {
      "thc": 24.0,
      "cbg": 1.0,
      "thcv": 1.0,
      "cbc": 1.0
    },
    "totalTerpenes": 2.55,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.63,
        "ratio": 31
      },
      {
        "name": "Limonene",
        "pct": 0.56,
        "ratio": 28
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.24,
        "ratio": 12
      },
      {
        "name": "α-Humulene",
        "pct": 0.19,
        "ratio": 9
      },
      {
        "name": "Linalool",
        "pct": 0.16,
        "ratio": 8
      },
      {
        "name": "α-Pinene",
        "pct": 0.14,
        "ratio": 7
      },
      {
        "name": "Myrcene",
        "pct": 0.11,
        "ratio": 5
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "socialBright",
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "2.5 oz pineapple juice",
        "itemId": "pineapple-juice",
        "name": "Pineapple Juice",
        "qty": 2.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.75 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.75,
        "unit": "oz"
      },
      {
        "raw": "8 fresh spearmint leaves",
        "itemId": "fresh-spearmint",
        "name": "Fresh Spearmint",
        "qty": 8.0,
        "unit": "fresh"
      },
      {
        "raw": "0.5 oz chamomile tea (strong, cooled)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "2 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 2.0,
        "unit": "drops"
      },
      {
        "raw": "2 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "In a highball glass, gently muddle spearmint leaves for 2 seconds",
      "Add lime juice, lemon juice, pineapple juice, and ginger juice",
      "Stir in chamomile tea, honey, and lavender flavor drops",
      "Fill with crushed ice, top with sparkling water, stir gently",
      "Garnish with mint sprig and lime wheel"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "ginger",
          "mint",
          "pineapple"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lime",
          "lemon",
          "pineapple",
          "mint"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile",
          "ginger"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "ginger"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor",
          "mint"
        ]
      },
      {
        "terpene": "α-Pinene",
        "sources": [
          "mint"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "mint",
          "ginger",
          "pineapple"
        ]
      }
    ],
    "oilBlend": "Black Pepper (12), Sweet Orange (10), German Chamomile (6), Sage (4), Lavender (4), Pine (2), Lemongrass (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Broadest terpene diversity in the library (7 terpenes). Buy: pineapple juice."
  },
  {
    "id": "rasta-governmint",
    "strainNumber": 11,
    "name": "Rasta Governmint",
    "recipeName": "Caribbean Profound Ease",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Euphoric",
      "Supremely Relaxed",
      "Comforted"
    ],
    "intent": "Profound ease with cushioned edges",
    "aroma": [
      "Sour Cherry",
      "Frankincense",
      "Oak"
    ],
    "cannabinoids": {
      "thc": 19.0
    },
    "totalTerpenes": 1.92,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.6,
        "ratio": 45
      },
      {
        "name": "Limonene",
        "pct": 0.39,
        "ratio": 30
      },
      {
        "name": "α-Humulene",
        "pct": 0.17,
        "ratio": 13
      },
      {
        "name": "Myrcene",
        "pct": 0.16,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "deepRest",
      "bodyMelt"
    ],
    "ingredients": [
      {
        "raw": "3 oz tart cherry juice",
        "itemId": "tart-cherry-juice",
        "name": "Tart Cherry Juice",
        "qty": 3.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz cardamom-honey syrup",
        "itemId": "cardamom-honey-syrup",
        "name": "Cardamom-Honey Syrup",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 fresh sage leaf",
        "itemId": "fresh-sage",
        "name": "Fresh Sage",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Steep rosemary and sage leaf in 1 oz warm water for 2 min, strain",
      "Combine tart cherry juice, lime juice, cardamom-honey syrup, and vanilla extract",
      "Add herb water, cinnamon, and black pepper. Stir with ice 8 seconds",
      "Strain into rocks glass over large ice, add mineral water, garnish with cinnamon stick"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "cardamom",
          "black pepper",
          "rosemary"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lime",
          "cherry"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage",
          "cinnamon"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "rosemary",
          "lime"
        ]
      }
    ],
    "oilBlend": "Black Pepper (14), Lemon (10), Rosemary (6), Sage (6), Geranium (4)",
    "substitutionNotes": "Cinnamon + black pepper sub for cloves + allspice. Buy cloves for authentic Caribbean depth.",
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "pink-rider",
    "strainNumber": 12,
    "name": "Pink Rider",
    "recipeName": "Creative Citrus Spark",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Motivated",
      "Creative",
      "Social"
    ],
    "intent": "Vivid creative lift with social magnetism",
    "aroma": [
      "Lemon Bar",
      "Pink Grapefruit",
      "Sugar Cookie"
    ],
    "cannabinoids": {
      "thc": 26.0
    },
    "totalTerpenes": 1.44,
    "terpeneProfile": [
      {
        "name": "Terpinolene",
        "pct": 0.38,
        "ratio": 39
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.22,
        "ratio": 22
      },
      {
        "name": "β-Ocimene",
        "pct": 0.2,
        "ratio": 20
      },
      {
        "name": "Limonene",
        "pct": 0.18,
        "ratio": 18
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "socialBright"
    ],
    "ingredients": [
      {
        "raw": "2.75 oz pink grapefruit juice (fresh squeezed)",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 2.75,
        "unit": "oz"
      },
      {
        "raw": "0.75 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.75,
        "unit": "oz"
      },
      {
        "raw": "0.75 oz green apple juice (fresh pressed)",
        "itemId": "green-apple",
        "name": "Green Apple",
        "qty": 0.75,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "3 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 3.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1.5 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Press 2-3 green apples through juicer or blend and fine-strain",
      "Squeeze fresh pink grapefruit, combine with lemon juice and green apple juice",
      "In a mixing glass, gently muddle basil and rosemary for 2 seconds",
      "Add citrus-apple blend, vanilla extract, honey, and black pepper. Stir with ice 8 seconds",
      "Strain into coupe or tall glass over fresh ice, add mineral water",
      "Garnish with pink grapefruit wheel and basil leaf"
    ],
    "terpeneMap": [
      {
        "terpene": "Terpinolene",
        "sources": [
          "green apple",
          "lemon",
          "pink grapefruit"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "basil",
          "rosemary"
        ]
      },
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil",
          "rosemary"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon"
        ]
      }
    ],
    "oilBlend": "Tea Tree (12), Black Pepper (8), Basil (8), Lemon (6), Lavender (4), Geranium (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "The 'sugar cookie' comes from the vanilla-honey combination. Rim glass with honey + powdered sugar for full effect."
  },
  {
    "id": "strawberry-biscotti",
    "strainNumber": 13,
    "name": "Strawberry Biscotti",
    "recipeName": "Cozy Berry Curiosity",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energy": "MEDIUM",
    "effects": [
      "Comforting",
      "Mentally Engaging",
      "Appetite Inducing"
    ],
    "intent": "Cozy anchor with a curious mind",
    "aroma": [
      "Kettle Corn",
      "Fuel",
      "Sour Strawberry Candy"
    ],
    "cannabinoids": {
      "thc": 32.0,
      "cbg": 2.0
    },
    "totalTerpenes": 1.48,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.38,
        "ratio": 36
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.29,
        "ratio": 28
      },
      {
        "name": "Myrcene",
        "pct": 0.25,
        "ratio": 24
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.13,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "1 cup frozen berry blend (strawberry/blueberry/blackberry)",
        "itemId": "frozen-berry-blend",
        "name": "Frozen Berry Blend",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz chamomile tea (strong, cooled)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz cinnamon-honey syrup",
        "itemId": "cinnamon-honey-syrup",
        "name": "Cinnamon-Honey Syrup",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      }
    ],
    "method": [
      "Thaw berry blend slightly, blend until smooth, strain through fine mesh (yields ~2.5 oz)",
      "Combine berry juice with grapefruit juice, lemon juice, and chamomile tea",
      "Stir in cinnamon-honey syrup, vanilla extract, black pepper, and cinnamon",
      "Pour over ice in rocks glass, garnish with strawberry and cinnamon dust"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon",
          "strawberry"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "black pepper"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "strawberry",
          "blueberry"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile"
        ]
      }
    ],
    "oilBlend": "Bergamot (14), Black Pepper (10), Lemongrass (8), German Chamomile (6), Clove (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "avenue-of-the-giants",
    "strainNumber": 14,
    "name": "Avenue of the Giants",
    "recipeName": "Redwood Herb Clarity (no lemongrass)",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Energizing",
      "Buzzy",
      "Motivating"
    ],
    "intent": "Forward momentum with electric clarity",
    "aroma": [
      "Pine Needles",
      "Menthol",
      "Jasmine"
    ],
    "cannabinoids": {
      "thc": 22.0,
      "cbg": 2.0
    },
    "totalTerpenes": 3.48,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.94,
        "ratio": 68
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.43,
        "ratio": 15
      },
      {
        "name": "α-Pinene",
        "pct": 0.26,
        "ratio": 9
      },
      {
        "name": "β-Ocimene",
        "pct": 0.24,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "1 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "2 fresh rosemary sprigs",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 2.0,
        "unit": "fresh"
      },
      {
        "raw": "6 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 6.0,
        "unit": "fresh"
      },
      {
        "raw": "4 fresh spearmint leaves",
        "itemId": "fresh-spearmint",
        "name": "Fresh Spearmint",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "1.5 oz mint tea (brewed strong, cooled)",
        "itemId": "mint-tea",
        "name": "Mint Tea",
        "qty": 1.5,
        "unit": "oz"
      },
      {
        "raw": "2 lemon verbena leaves",
        "itemId": "lemon-verbena",
        "name": "Lemon Verbena",
        "qty": null,
        "unit": null
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "2.5 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Brew mint tea double-strength: 2 bags in 4 oz hot water 5 min, cool completely",
      "Steep rosemary and lemon verbena in 2 oz cool mineral water for 3 min, strain",
      "Muddle basil and spearmint leaves gently for 3 seconds",
      "Add lime juice, mint tea, herb water, honey, and black pepper. Stir with ice",
      "Strain into highball over fresh ice, top with sparkling water down the side",
      "Garnish with rosemary sprig, basil leaf, and lime wheel"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "lemongrass/basil",
          "spearmint",
          "rosemary",
          "lime"
        ]
      },
      {
        "terpene": "α-Pinene",
        "sources": [
          "rosemary",
          "basil"
        ]
      },
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil",
          "spearmint"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "rosemary"
        ]
      },
      {
        "terpene": "Menthol",
        "sources": [
          "mint tea peppermint"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lime",
          "lemongrass"
        ]
      }
    ],
    "oilBlend": "Lemongrass (16), Pine (8), Black Pepper (6), Basil (4), Peppermint (4), Geranium (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Lemongrass is the backbone of this strain's juice. Buy lemongrass sticks to unlock Recipe B.",
    "variants": [
      {
        "variantLabel": "A",
        "recipeName": "Redwood Herb Clarity (no lemongrass)",
        "ingredients": [
          {
            "raw": "1 oz lime juice",
            "itemId": "lime-juice",
            "name": "Lime Juice",
            "qty": 1.0,
            "unit": "oz"
          },
          {
            "raw": "2 fresh rosemary sprigs",
            "itemId": "fresh-rosemary",
            "name": "Fresh Rosemary",
            "qty": 2.0,
            "unit": "fresh"
          },
          {
            "raw": "6 fresh Prospera basil leaves",
            "itemId": "fresh-basil",
            "name": "Fresh Basil (Prospera)",
            "qty": 6.0,
            "unit": "fresh"
          },
          {
            "raw": "4 fresh spearmint leaves",
            "itemId": "fresh-spearmint",
            "name": "Fresh Spearmint",
            "qty": 4.0,
            "unit": "fresh"
          },
          {
            "raw": "1.5 oz mint tea (brewed strong, cooled)",
            "itemId": "mint-tea",
            "name": "Mint Tea",
            "qty": 1.5,
            "unit": "oz"
          },
          {
            "raw": "2 lemon verbena leaves",
            "itemId": "lemon-verbena",
            "name": "Lemon Verbena",
            "qty": null,
            "unit": null
          },
          {
            "raw": "0.25 oz honey",
            "itemId": "honey",
            "name": "Honey",
            "qty": 0.25,
            "unit": "oz"
          },
          {
            "raw": "pinch ground black pepper",
            "itemId": "black-pepper",
            "name": "Ground Black Pepper",
            "qty": 1,
            "unit": "pinch"
          },
          {
            "raw": "2.5 oz sparkling water",
            "itemId": "sparkling-water",
            "name": "Sparkling Water",
            "qty": 2.5,
            "unit": "oz"
          }
        ],
        "method": [
          "Brew mint tea double-strength: 2 bags in 4 oz hot water 5 min, cool completely",
          "Steep rosemary and lemon verbena in 2 oz cool mineral water for 3 min, strain",
          "Muddle basil and spearmint leaves gently for 3 seconds",
          "Add lime juice, mint tea, herb water, honey, and black pepper. Stir with ice",
          "Strain into highball over fresh ice, top with sparkling water down the side",
          "Garnish with rosemary sprig, basil leaf, and lime wheel"
        ]
      },
      {
        "variantLabel": "B",
        "recipeName": "Redwood Forest Clarity (full version with lemongrass)",
        "ingredients": [
          {
            "raw": "4 fresh lemongrass stalks",
            "itemId": "lemongrass",
            "name": "Fresh Lemongrass",
            "qty": 4.0,
            "unit": "fresh"
          },
          {
            "raw": "1 oz lime juice",
            "itemId": "lime-juice",
            "name": "Lime Juice",
            "qty": 1.0,
            "unit": "oz"
          },
          {
            "raw": "0.5 oz mint tea (brewed strong, cooled)",
            "itemId": "mint-tea",
            "name": "Mint Tea",
            "qty": 0.5,
            "unit": "oz"
          },
          {
            "raw": "2 fresh rosemary sprigs",
            "itemId": "fresh-rosemary",
            "name": "Fresh Rosemary",
            "qty": 2.0,
            "unit": "fresh"
          },
          {
            "raw": "5 fresh Prospera basil leaves",
            "itemId": "fresh-basil",
            "name": "Fresh Basil (Prospera)",
            "qty": 5.0,
            "unit": "fresh"
          },
          {
            "raw": "3 fresh spearmint leaves",
            "itemId": "fresh-spearmint",
            "name": "Fresh Spearmint",
            "qty": 3.0,
            "unit": "fresh"
          },
          {
            "raw": "pinch ground black pepper",
            "itemId": "black-pepper",
            "name": "Ground Black Pepper",
            "qty": 1,
            "unit": "pinch"
          },
          {
            "raw": "0.25 oz honey",
            "itemId": "honey",
            "name": "Honey",
            "qty": 0.25,
            "unit": "oz"
          },
          {
            "raw": "2 oz sparkling water",
            "itemId": "sparkling-water",
            "name": "Sparkling Water",
            "qty": 2.0,
            "unit": "oz"
          }
        ],
        "method": [
          "Peel outer layers from lemongrass stalks, use pale inner core, smash with knife back, cold press or blend with 1 oz water, fine-strain (yields ~1.5 oz)",
          "Steep rosemary in 1 oz cool mineral water for 2 min, strain",
          "Muddle basil and spearmint leaves gently for 3 seconds",
          "Add 1.5 oz lemongrass juice, lime juice, mint tea, rosemary water, black pepper, and honey. Stir with ice 8 seconds",
          "Strain into highball over fresh ice, top with sparkling water down the side",
          "Garnish with rosemary sprig, basil leaf, and lime wheel. Drink within 30 min"
        ]
      }
    ]
  },
  {
    "id": "peach-flamb",
    "strainNumber": 15,
    "name": "Peach Flambé",
    "recipeName": "Warm Euphoric Glow",
    "farm": "TBD",
    "region": "TBD",
    "energy": "HIGH",
    "effects": [
      "Euphoric",
      "Bright",
      "Joyful"
    ],
    "intent": "Warm euphoric glow",
    "aroma": [
      "Peach",
      "Bergamot",
      "Warm Spice"
    ],
    "cannabinoids": {
      "thc": 19.0
    },
    "totalTerpenes": 1.05,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": "dominant",
        "ratio": null
      },
      {
        "name": "β-Caryophyllene",
        "pct": "secondary",
        "ratio": null
      },
      {
        "name": "β-Ocimene",
        "pct": "tertiary",
        "ratio": null
      },
      {
        "name": "α-Humulene",
        "pct": "trace",
        "ratio": null
      }
    ],
    "vibeCategories": [
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "1 cup frozen peach slices",
        "itemId": "frozen-peach",
        "name": "Frozen Peach Slices",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "1.5 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "3 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 3.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1.5 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Blend frozen peach slices until smooth, strain through fine mesh (yields ~2.5 oz)",
      "Press ginger to yield 0.5 oz. Gently muddle basil leaves",
      "Combine peach puree, grapefruit juice, lemon juice, ginger juice, basil, cinnamon, black pepper, and honey",
      "Stir with ice, strain into glass over fresh ice, top with sparkling water down the side",
      "Garnish with basil leaf"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon",
          "peach"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "ginger",
          "black pepper",
          "basil"
        ]
      },
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "ginger"
        ]
      }
    ],
    "oilBlend": "TBD — exact percentages not in project knowledge",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "tropicanna-cherry",
    "strainNumber": 16,
    "name": "Tropicanna Cherry",
    "recipeName": "Bright Cherry Lift",
    "farm": "Sunrise Gardens",
    "region": "Mendocino",
    "energy": "HIGH",
    "effects": [
      "Euphoric",
      "Cerebral",
      "Cheerful"
    ],
    "intent": "Bright lift with clear, lively edges",
    "aroma": [
      "Sour Cherry",
      "Sweet Citrus",
      "Nutmeg"
    ],
    "cannabinoids": {
      "thc": 27.0
    },
    "totalTerpenes": 1.18,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.37,
        "ratio": 40
      },
      {
        "name": "Limonene",
        "pct": 0.29,
        "ratio": 32
      },
      {
        "name": "Linalool",
        "pct": 0.15,
        "ratio": 16
      },
      {
        "name": "α-Humulene",
        "pct": 0.11,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "creativeFlow",
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "2.5 oz tart cherry juice",
        "itemId": "tart-cherry-juice",
        "name": "Tart Cherry Juice",
        "qty": 2.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "3 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 3.0,
        "unit": "drops"
      },
      {
        "raw": "pinch ground nutmeg",
        "itemId": "ground-nutmeg",
        "name": "Ground Nutmeg",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 fresh sage leaf",
        "itemId": "fresh-sage",
        "name": "Fresh Sage",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1.5 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Combine tart cherry juice, grapefruit juice, and lemon juice",
      "Add lavender flavor drops, nutmeg, black pepper, and honey. Gently bruise sage leaf and add",
      "Stir with ice for 10 seconds, strain into coupe over fresh ice",
      "Top with sparkling water, garnish with nutmeg dust and lemon twist"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "nutmeg",
          "sage"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon",
          "cherry"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage"
        ]
      }
    ],
    "oilBlend": "Black Pepper (12), Sweet Orange (10), Lavender (6), Geranium (6), Sage (4), Clove (2)",
    "substitutionNotes": "Grapefruit subs for blood orange. If blood oranges available, use 1 oz blood orange juice instead.",
    "buyNotes": null,
    "notes": null
  },
  {
    "id": "pink-jesus-reserve",
    "strainNumber": 17,
    "name": "Pink Jesus Reserve",
    "recipeName": "Lavender Raspberry Euphoria",
    "farm": "Sonoma Hills Farm",
    "region": "Sonoma",
    "energy": "HIGH",
    "effects": [
      "Social",
      "Uplifting",
      "Euphoric"
    ],
    "intent": "Buoyant and warm, ready to share",
    "aroma": [
      "Raspberry",
      "French Lavender",
      "Pineapple"
    ],
    "cannabinoids": {
      "thc": 23.0
    },
    "totalTerpenes": 1.89,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.78,
        "ratio": 49
      },
      {
        "name": "Myrcene",
        "pct": 0.38,
        "ratio": 24
      },
      {
        "name": "α-Humulene",
        "pct": 0.27,
        "ratio": 17
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.15,
        "ratio": 9
      }
    ],
    "vibeCategories": [
      "socialBright",
      "euphoricLift"
    ],
    "ingredients": [
      {
        "raw": "1 cup frozen raspberries",
        "itemId": "frozen-raspberries",
        "name": "Frozen Raspberries",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "1.5 oz pineapple juice",
        "itemId": "pineapple-juice",
        "name": "Pineapple Juice",
        "qty": 1.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "4 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 4.0,
        "unit": "drops"
      },
      {
        "raw": "0.5 oz fresh ginger juice",
        "itemId": "fresh-ginger",
        "name": "Fresh Ginger Root",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 fresh sage leaf",
        "itemId": "fresh-sage",
        "name": "Fresh Sage",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "0.5 oz chamomile tea (strong, cooled)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      }
    ],
    "method": [
      "Blend frozen raspberries until smooth, fine-strain through mesh to remove seeds (yields ~2 oz puree)",
      "Press ginger to yield 0.5 oz. Gently bruise sage leaf",
      "Combine raspberry puree, pineapple juice, lemon juice, ginger juice, chamomile tea, lavender flavor drops, black pepper, sage leaf, and honey",
      "Shake with ice for 8 seconds until frothy, fine-strain into coupe or tall glass over ice",
      "Garnish with raspberries"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "ginger",
          "lavender",
          "sage"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "raspberry",
          "ginger"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage",
          "ginger"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile"
        ]
      }
    ],
    "oilBlend": "Black Pepper (14), Lemongrass (8), Lavender (6), Sage (6), German Chamomile (4), Geranium (2)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Highest caryophyllene in the library (49%). Lavender flavor is essential — 'French lavender' is in the strain's aroma DNA. Buy: pineapple juice."
  },
  {
    "id": "love-and-laughter-cbd",
    "strainNumber": 18,
    "name": "Love and Laughter (CBD)",
    "recipeName": "Clear Steady Focus",
    "farm": "Heartrock Mountain Farm",
    "region": "Mendocino",
    "energy": "MEDIUM",
    "effects": [
      "Energizing",
      "Focusing",
      "Non-Intoxicating"
    ],
    "intent": "Clear and steady, nothing clouded",
    "aroma": [
      "Flowers",
      "Eucalyptus",
      "Berries"
    ],
    "cannabinoids": {
      "thc": 1.0,
      "cbd": 19.0
    },
    "totalTerpenes": 1.72,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.56,
        "ratio": 43
      },
      {
        "name": "Terpinolene",
        "pct": 0.28,
        "ratio": 22
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.2,
        "ratio": 15
      }
    ],
    "vibeCategories": [
      "calmFocus"
    ],
    "ingredients": [
      {
        "raw": "1 cup frozen berry blend",
        "itemId": "frozen-berry-blend",
        "name": "Frozen Berry Blend",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "3 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 3.0,
        "unit": "fresh"
      },
      {
        "raw": "0.5 oz mint tea (strong, cooled)",
        "itemId": "mint-tea",
        "name": "Mint Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "2 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 2.0,
        "unit": "drops"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1.5 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 1.5,
        "unit": "oz"
      }
    ],
    "method": [
      "Blend berry blend until smooth, strain through fine mesh (yields ~2 oz)",
      "Steep rosemary in 1 oz cool water for 2 min, strain. Muddle basil",
      "Combine berry juice, grapefruit juice, lemon juice, rosemary water, mint tea, basil, lavender flavor drops, black pepper, and honey",
      "Stir with ice, strain into highball over fresh ice, top with sparkling water",
      "Garnish with basil leaf and berries"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "berries",
          "basil",
          "rosemary"
        ]
      },
      {
        "terpene": "Terpinolene",
        "sources": [
          "grapefruit",
          "lemon"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "rosemary",
          "basil"
        ]
      }
    ],
    "oilBlend": "TBD — exact recipe not in project knowledge",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Only CBD strain in the library. Only Calm Focus strain."
  },
  {
    "id": "glitter-bomb",
    "strainNumber": 19,
    "name": "Glitter Bomb",
    "recipeName": "Sparkling Kiwi Euphoria",
    "farm": "Sol Spirit Farm",
    "region": "Trinity",
    "energy": "HIGH",
    "effects": [
      "Physically Relaxing",
      "Cerebral",
      "Euphoric"
    ],
    "intent": "Body at ease, mind sparkling",
    "aroma": [
      "Kiwi",
      "Pine",
      "Musk"
    ],
    "cannabinoids": {
      "thc": 26.0
    },
    "totalTerpenes": 2.39,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.23,
        "ratio": 62
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.42,
        "ratio": 21
      },
      {
        "name": "β-Ocimene",
        "pct": 0.17,
        "ratio": 9
      },
      {
        "name": "Linalool",
        "pct": 0.15,
        "ratio": 8
      }
    ],
    "vibeCategories": [
      "euphoricLift",
      "bodyMelt"
    ],
    "ingredients": [
      {
        "raw": "3 fresh kiwis (peeled)",
        "itemId": "kiwi",
        "name": "Kiwi",
        "qty": 3.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "4 fresh Prospera basil leaves",
        "itemId": "fresh-basil",
        "name": "Fresh Basil (Prospera)",
        "qty": 4.0,
        "unit": "fresh"
      },
      {
        "raw": "2 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 2.0,
        "unit": "drops"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lime juice",
        "itemId": "lime-juice",
        "name": "Lime Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "2 oz sparkling water",
        "itemId": "sparkling-water",
        "name": "Sparkling Water",
        "qty": 2.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Peel and blend kiwis until smooth, strain through fine mesh (yields ~2.5 oz)",
      "Steep rosemary in 1 oz cool water for 2 min, strain",
      "Gently muddle basil. Add kiwi juice, rosemary water, lime juice, lavender flavor drops, black pepper, and honey",
      "Stir with ice, strain into highball over crushed ice, top with sparkling water",
      "Garnish with kiwi wheel and basil leaf"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "kiwi",
          "basil",
          "rosemary"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "rosemary"
        ]
      },
      {
        "terpene": "β-Ocimene",
        "sources": [
          "basil"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor"
        ]
      }
    ],
    "oilBlend": "Lemongrass (18), Black Pepper (10), Basil (4), Lavender (4), Pine (4)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "With lemongrass available, add 1 oz lemongrass juice to amplify the myrcene backbone (1.23% — very high)."
  },
  {
    "id": "moonlight",
    "strainNumber": 20,
    "name": "Moonlight",
    "recipeName": "Watermelon Gratitude",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Physically Relaxed",
      "Calm",
      "Grateful"
    ],
    "intent": "Soft gratitude in a settled body",
    "aroma": [
      "Watermelon Candy",
      "Citrus Zest",
      "Earl Grey"
    ],
    "cannabinoids": {
      "thc": 26.0
    },
    "totalTerpenes": 2.67,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.74,
        "ratio": 40
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.51,
        "ratio": 27
      },
      {
        "name": "Terpinolene",
        "pct": 0.38,
        "ratio": 20
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.24,
        "ratio": 13
      }
    ],
    "vibeCategories": [
      "groundedPresent",
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "3 oz fresh watermelon juice",
        "itemId": "watermelon",
        "name": "Watermelon",
        "qty": 3.0,
        "unit": "oz"
      },
      {
        "raw": "1 oz Earl Grey tea (strong, cooled)",
        "itemId": "earl-grey-tea",
        "name": "Earl Grey Tea",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz chamomile tea (strong, cooled)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Blend 2 cups cubed watermelon, strain through fine mesh. Brew Earl Grey double-strength: 2 bags in 3 oz hot water, 4 min, cool",
      "Combine watermelon juice, Earl Grey, lemon juice, and chamomile tea",
      "Stir in cinnamon, black pepper, and honey",
      "Pour over ice, add mineral water, garnish with watermelon wedge and lemon zest"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "watermelon",
          "chamomile"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "black pepper"
        ]
      },
      {
        "terpene": "Terpinolene",
        "sources": [
          "Earl Grey",
          "lemon"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile"
        ]
      }
    ],
    "oilBlend": "Lemongrass (12), Black Pepper (10), Tea Tree (8), German Chamomile (6), Bergamot (4)",
    "substitutionNotes": null,
    "buyNotes": "Watermelon (or bottled watermelon juice) + Earl Grey tea bags.",
    "notes": null
  },
  {
    "id": "mandarin-cherry-tree",
    "strainNumber": 21,
    "name": "Mandarin Cherry Tree",
    "recipeName": "Serene Lavender Drift",
    "farm": "Sticky Fields",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Full Body Relaxation",
      "Serenity",
      "Creativity"
    ],
    "intent": "Settled body, gently wandering mind",
    "aroma": [
      "Mandarin Orange",
      "Sandalwood",
      "Lavender"
    ],
    "cannabinoids": {
      "thc": 28.0
    },
    "totalTerpenes": 1.75,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.52,
        "ratio": 46
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.36,
        "ratio": 32
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 12
      },
      {
        "name": "Linalool",
        "pct": 0.11,
        "ratio": 10
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "3 oz mandarin juice",
        "itemId": "mandarin-juice",
        "name": "Mandarin Juice",
        "qty": 3.0,
        "unit": "oz"
      },
      {
        "raw": "1 oz tart cherry juice",
        "itemId": "tart-cherry-juice",
        "name": "Tart Cherry Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "3 drops lavender flavor extract",
        "itemId": "lavender-extract",
        "name": "Lavender Flavor Extract",
        "qty": 3.0,
        "unit": "drops"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 fresh sage leaf",
        "itemId": "fresh-sage",
        "name": "Fresh Sage",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Combine mandarin juice, tart cherry juice, and lemon juice",
      "Gently bruise sage leaf. Add to juice with lavender flavor drops, black pepper, and honey. Stir",
      "Pour over ice in coupe or rocks glass, add mineral water, garnish with sage leaf"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "mandarin",
          "lemon",
          "cherry"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "lavender"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage"
        ]
      },
      {
        "terpene": "Linalool",
        "sources": [
          "lavender flavor"
        ]
      }
    ],
    "oilBlend": "Sweet Orange (16), Black Pepper (10), Lavender (6), Sage (4), Ylang Ylang (4)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Lavender flavor is essential — 'lavender' is in the strain's aroma. One of the most calming juices in the set."
  },
  {
    "id": "pinnacle",
    "strainNumber": 22,
    "name": "Pinnacle",
    "recipeName": "Velvet Surrender",
    "farm": "Dos Rios Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "effects": [
      "Blissful",
      "Sedated",
      "Content"
    ],
    "intent": "Total surrender, velvet quiet",
    "aroma": [
      "Sweet Cream",
      "Nutmeg",
      "Earth"
    ],
    "cannabinoids": {
      "thc": 20.0
    },
    "totalTerpenes": null,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": "dominant",
        "ratio": null
      },
      {
        "name": "Limonene",
        "pct": "secondary",
        "ratio": null
      },
      {
        "name": "α-Humulene",
        "pct": "tertiary",
        "ratio": null
      },
      {
        "name": "trans-β-Farnesene",
        "pct": "trace",
        "ratio": null
      }
    ],
    "vibeCategories": [
      "deepRest"
    ],
    "ingredients": [
      {
        "raw": "2 oz mandarin juice",
        "itemId": "mandarin-juice",
        "name": "Mandarin Juice",
        "qty": 2.0,
        "unit": "oz"
      },
      {
        "raw": "1 oz tart cherry juice",
        "itemId": "tart-cherry-juice",
        "name": "Tart Cherry Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 fresh rosemary sprig",
        "itemId": "fresh-rosemary",
        "name": "Fresh Rosemary",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "1 fresh sage leaf",
        "itemId": "fresh-sage",
        "name": "Fresh Sage",
        "qty": 1.0,
        "unit": "fresh"
      },
      {
        "raw": "pinch ground nutmeg",
        "itemId": "ground-nutmeg",
        "name": "Ground Nutmeg",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Steep rosemary and sage leaf in 1 oz warm water for 3 min, strain",
      "Combine mandarin juice, tart cherry juice, and lemon juice",
      "Add herb water, nutmeg, black pepper, vanilla extract, and honey. Stir gently",
      "Pour over large ice in rocks glass, add mineral water, garnish with nutmeg dust"
    ],
    "terpeneMap": [
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "black pepper",
          "rosemary",
          "nutmeg"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "mandarin",
          "lemon",
          "cherry"
        ]
      },
      {
        "terpene": "α-Humulene",
        "sources": [
          "sage",
          "nutmeg"
        ]
      },
      {
        "terpene": "trans-β-Farnesene",
        "sources": [
          "vanilla + nutmeg approximate 'sweet cream' character"
        ]
      }
    ],
    "oilBlend": "Black Pepper, Rosemary, Sweet Orange, Sage, Ylang Ylang (exact drops TBD)",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Deepest rest juice in the set. Heaviest sedative strain. Sip slowly in evening."
  },
  {
    "id": "blueberry-muffin",
    "strainNumber": 23,
    "name": "Blueberry Muffin",
    "recipeName": "Cozy Kettle Corn Comfort",
    "farm": "TBD",
    "region": "TBD",
    "energy": "LOW",
    "effects": [
      "Comforting",
      "Cozy",
      "Warm"
    ],
    "intent": "Cozy comfort with warm blanket energy",
    "aroma": [
      "Blueberry",
      "Vanilla",
      "Cinnamon"
    ],
    "cannabinoids": null,
    "totalTerpenes": null,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.38,
        "ratio": 36
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.29,
        "ratio": 28
      },
      {
        "name": "Myrcene",
        "pct": 0.25,
        "ratio": 24
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.13,
        "ratio": 12
      }
    ],
    "vibeCategories": [
      "cozyComfort"
    ],
    "ingredients": [
      {
        "raw": "1 cup frozen blueberries",
        "itemId": "frozen-blueberries",
        "name": "Frozen Blueberries",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "1 oz pink grapefruit juice",
        "itemId": "pink-grapefruit-juice",
        "name": "Pink Grapefruit Juice",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "1 oz chamomile tea (strong, cooled)",
        "itemId": "chamomile-tea",
        "name": "Chamomile Tea",
        "qty": 1.0,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz cinnamon-honey syrup",
        "itemId": "cinnamon-honey-syrup",
        "name": "Cinnamon-Honey Syrup",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground black pepper",
        "itemId": "black-pepper",
        "name": "Ground Black Pepper",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Thaw frozen blueberries slightly (5 min), blend until smooth, strain through fine mesh (yields ~2.5 oz)",
      "Combine blueberry juice with grapefruit juice, lemon juice, and chamomile tea",
      "Stir in cinnamon-honey syrup, vanilla extract, and black pepper",
      "Pour over ice, add mineral water, garnish with blueberries and cinnamon dust"
    ],
    "terpeneMap": [
      {
        "terpene": "Limonene",
        "sources": [
          "grapefruit",
          "lemon",
          "blueberry"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon",
          "black pepper"
        ]
      },
      {
        "terpene": "Myrcene",
        "sources": [
          "blueberry"
        ]
      },
      {
        "terpene": "α-Bisabolol",
        "sources": [
          "chamomile"
        ]
      }
    ],
    "oilBlend": "TBD",
    "substitutionNotes": null,
    "buyNotes": null,
    "notes": "Vanilla-cinnamon combo creates the 'kettle corn' note. Blender required."
  },
  {
    "id": "lemon-papaya-banana",
    "strainNumber": 24,
    "name": "Lemon Papaya Banana",
    "recipeName": "Tropical Drift",
    "farm": "TBD",
    "region": "TBD",
    "energy": "LOW",
    "effects": [
      "Physically Relaxed",
      "Spacey",
      "Euphoric"
    ],
    "intent": "Soft tropical body, expansive mind",
    "aroma": [
      "Papaya",
      "Honeydew Melon",
      "Lemon Zest"
    ],
    "cannabinoids": {
      "thc": 27.0
    },
    "totalTerpenes": 1.38,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.57,
        "ratio": 53
      },
      {
        "name": "Limonene",
        "pct": 0.29,
        "ratio": 27
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.16,
        "ratio": 15
      },
      {
        "name": "α-Humulene",
        "pct": 0.05,
        "ratio": 5
      }
    ],
    "vibeCategories": [
      "deepRest",
      "bodyMelt"
    ],
    "ingredients": [
      {
        "raw": "1 cup fresh papaya (chopped)",
        "itemId": "papaya",
        "name": "Papaya",
        "qty": 1.0,
        "unit": "cup"
      },
      {
        "raw": "0.75 cup frozen banana slices",
        "itemId": "banana",
        "name": "Banana",
        "qty": 0.75,
        "unit": "cup"
      },
      {
        "raw": "0.75 oz lemon juice",
        "itemId": "lemon-juice",
        "name": "Lemon Juice",
        "qty": 0.75,
        "unit": "oz"
      },
      {
        "raw": "0.5 oz green apple juice",
        "itemId": "green-apple",
        "name": "Green Apple",
        "qty": 0.5,
        "unit": "oz"
      },
      {
        "raw": "0.25 oz vanilla extract",
        "itemId": "vanilla-extract",
        "name": "Vanilla Extract",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "pinch ground cinnamon",
        "itemId": "ground-cinnamon",
        "name": "Ground Cinnamon",
        "qty": 1,
        "unit": "pinch"
      },
      {
        "raw": "0.25 oz honey",
        "itemId": "honey",
        "name": "Honey",
        "qty": 0.25,
        "unit": "oz"
      },
      {
        "raw": "1 oz cold mineral water",
        "itemId": "mineral-water",
        "name": "Cold Mineral Water",
        "qty": 1.0,
        "unit": "oz"
      }
    ],
    "method": [
      "Blend papaya and frozen banana until completely smooth (yields ~3 oz puree)",
      "Press green apple to yield 0.5 oz",
      "Combine puree with lemon juice, green apple juice, vanilla, cinnamon, and honey",
      "Add mineral water and stir gently",
      "Pour into highball over crushed ice, garnish with banana wheel and cinnamon dust"
    ],
    "terpeneMap": [
      {
        "terpene": "Myrcene",
        "sources": [
          "papaya",
          "banana"
        ]
      },
      {
        "terpene": "Limonene",
        "sources": [
          "lemon",
          "papaya",
          "banana",
          "green apple"
        ]
      },
      {
        "terpene": "β-Caryophyllene",
        "sources": [
          "cinnamon"
        ]
      }
    ],
    "oilBlend": "Lemongrass (14), Lemon (10), Black Pepper (6), Geranium (6), Ylang Ylang (4)",
    "substitutionNotes": null,
    "buyNotes": "Fresh papaya — hero fruit. Green apple subs for honeydew melon. Blender required.",
    "notes": null
  }
];

const INGREDIENTS = [
  {
    "id": "black-pepper",
    "name": "Ground Black Pepper",
    "category": "spice",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "high"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      },
      {
        "terpene": "α-Pinene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Freshly ground, pinch",
    "shelfLife": "6 months ground, years whole",
    "searchTerms": [
      "black pepper",
      "pepper",
      "ground black pepper"
    ],
    "flavorNotes": "Sharp, pungent, warm",
    "terpeneNotes": "Primary β-caryophyllene vehicle (7-35%). The first terpene proven to activate CB2 cannabinoid receptor. Used in 21/24 recipes.",
    "cost": "low",
    "recipeCount": 19
  },
  {
    "id": "honey",
    "name": "Honey",
    "category": "sweetener",
    "terpenes": [
      {
        "terpene": "α-Bisabolol",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Raw, stirred in",
    "shelfLife": "Indefinite",
    "searchTerms": [
      "honey"
    ],
    "flavorNotes": "Floral, warm, golden",
    "terpeneNotes": "Trace bisabolol. Primary sweetener — used in 20/24 recipes.",
    "cost": "low",
    "recipeCount": 18
  },
  {
    "id": "lemon-juice",
    "name": "Lemon Juice",
    "category": "citrus",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "high"
      },
      {
        "terpene": "Terpinolene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh squeezed",
    "shelfLife": "5 days refrigerated",
    "searchTerms": [
      "lemon",
      "lemon juice"
    ],
    "flavorNotes": "Tart, bright, clean",
    "terpeneNotes": "65-75% limonene content. Universal citrus base.",
    "cost": "low",
    "recipeCount": 17
  },
  {
    "id": "fresh-rosemary",
    "name": "Fresh Rosemary",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "α-Pinene",
        "intensity": "high"
      },
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "moderate",
    "form": "Fresh sprigs, steeped in water 2-3 min",
    "shelfLife": "1 week refrigerated",
    "searchTerms": [
      "rosemary",
      "rosemary sprig",
      "rosemary water"
    ],
    "flavorNotes": "Piney, woody, aromatic, energizing",
    "terpeneNotes": "Primary α-pinene vehicle. Also delivers 1,8-cineole. Used in 19/24 juice recipes — the most common herb.",
    "safetyNotes": "Avoid during pregnancy and with epilepsy.",
    "cost": "low",
    "recipeCount": 12
  },
  {
    "id": "mineral-water",
    "name": "Cold Mineral Water",
    "category": "liquid",
    "terpenes": [],
    "difficulty": "easy",
    "form": "Cold, still",
    "shelfLife": "Shelf-stable sealed",
    "searchTerms": [
      "mineral water",
      "cold mineral water",
      "still water"
    ],
    "flavorNotes": "Clean, mineral",
    "terpeneNotes": "No terpenes. Dilution vehicle for LOW energy recipes.",
    "cost": "low",
    "recipeCount": 12
  },
  {
    "id": "pink-grapefruit-juice",
    "name": "Pink Grapefruit Juice",
    "category": "citrus",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "high"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh squeezed",
    "shelfLife": "3 days refrigerated",
    "searchTerms": [
      "grapefruit",
      "pink grapefruit",
      "grapefruit juice"
    ],
    "flavorNotes": "Bitter-sweet, tangy, bright",
    "terpeneNotes": "Primary limonene vehicle. Tropical citrus bridge.",
    "cost": "low",
    "recipeCount": 10
  },
  {
    "id": "sparkling-water",
    "name": "Sparkling Water",
    "category": "liquid",
    "terpenes": [],
    "difficulty": "easy",
    "form": "Chilled, added last (down the side)",
    "shelfLife": "Shelf-stable sealed",
    "searchTerms": [
      "sparkling water",
      "soda water",
      "carbonated water"
    ],
    "flavorNotes": "Neutral, effervescent",
    "terpeneNotes": "No terpenes. Adds texture and lifts aromas. Used in HIGH energy recipes.",
    "cost": "low",
    "recipeCount": 10
  },
  {
    "id": "fresh-basil",
    "name": "Fresh Basil (Prospera)",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "β-Ocimene",
        "intensity": "high"
      },
      {
        "terpene": "Linalool",
        "intensity": "medium"
      },
      {
        "terpene": "β-Caryophyllene",
        "intensity": "low"
      },
      {
        "terpene": "α-Pinene",
        "intensity": "low"
      }
    ],
    "difficulty": "moderate",
    "form": "Fresh leaves, gently muddled",
    "shelfLife": "5 days refrigerated (stem in water)",
    "searchTerms": [
      "basil",
      "basil leaves",
      "prospera basil"
    ],
    "flavorNotes": "Sweet, peppery, fresh, herbaceous",
    "terpeneNotes": "Primary β-ocimene source. One of few culinary herbs high in this rare terpene. Prospera variety preferred.",
    "cost": "low",
    "recipeCount": 9
  },
  {
    "id": "ground-cinnamon",
    "name": "Ground Cinnamon",
    "category": "spice",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      },
      {
        "terpene": "Linalool",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Ground or stick",
    "shelfLife": "6 months ground, 1 year stick",
    "searchTerms": [
      "cinnamon",
      "ground cinnamon",
      "cinnamon stick"
    ],
    "flavorNotes": "Warm, sweet, woody",
    "terpeneNotes": "Secondary caryophyllene source with warming quality.",
    "cost": "low",
    "recipeCount": 9
  },
  {
    "id": "lavender-extract",
    "name": "Lavender Flavor Extract",
    "category": "flavor-extract",
    "terpenes": [
      {
        "terpene": "Linalool",
        "intensity": "high"
      }
    ],
    "difficulty": "specialty",
    "form": "Drops (food-grade flavor extract)",
    "shelfLife": "1 year+",
    "searchTerms": [
      "lavender flavor",
      "lavender extract",
      "lavender drops"
    ],
    "flavorNotes": "Floral, sweet, calming",
    "terpeneNotes": "Primary linalool delivery. Essential for strains with lavender in aroma DNA. Used in 8/24 recipes.",
    "safetyNotes": "Must be food-grade flavor extract, not essential oil.",
    "cost": "medium",
    "recipeCount": 8
  },
  {
    "id": "fresh-ginger",
    "name": "Fresh Ginger Root",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "α-Humulene",
        "intensity": "high"
      },
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      },
      {
        "terpene": "α-Bisabolol",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh root, pressed through juicer or fine grater",
    "shelfLife": "3 weeks refrigerated",
    "searchTerms": [
      "ginger",
      "ginger juice",
      "ginger root",
      "fresh ginger"
    ],
    "flavorNotes": "Spicy, warming, bright",
    "terpeneNotes": "Multi-terpene delivery: humulene + caryophyllene + bisabolol. Warming character.",
    "cost": "low",
    "recipeCount": 7
  },
  {
    "id": "lime-juice",
    "name": "Lime Juice",
    "category": "citrus",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "high"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh squeezed",
    "shelfLife": "5 days refrigerated",
    "searchTerms": [
      "lime",
      "lime juice"
    ],
    "flavorNotes": "Sharp, tropical, clean",
    "terpeneNotes": "Limonene-forward with myrcene undertone.",
    "cost": "low",
    "recipeCount": 6
  },
  {
    "id": "vanilla-extract",
    "name": "Vanilla Extract",
    "category": "flavor-extract",
    "terpenes": [],
    "difficulty": "easy",
    "form": "Pure vanilla extract",
    "shelfLife": "Years (improves with age)",
    "searchTerms": [
      "vanilla",
      "vanilla extract"
    ],
    "flavorNotes": "Sweet, warm, rich, creamy",
    "terpeneNotes": "No direct terpene delivery, but creates 'sugar cookie' and 'sweet cream' notes. Bridges farnesene character.",
    "cost": "medium",
    "recipeCount": 6
  },
  {
    "id": "chamomile-tea",
    "name": "Chamomile Tea",
    "category": "tea",
    "terpenes": [
      {
        "terpene": "α-Bisabolol",
        "intensity": "high"
      },
      {
        "terpene": "trans-β-Farnesene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Brewed strong, cooled completely",
    "shelfLife": "2 days refrigerated",
    "searchTerms": [
      "chamomile",
      "chamomile tea"
    ],
    "flavorNotes": "Honey-apple, soothing, warm",
    "terpeneNotes": "Primary α-bisabolol vehicle. German chamomile is the richest natural bisabolol source.",
    "cost": "low",
    "recipeCount": 6
  },
  {
    "id": "mandarin-juice",
    "name": "Mandarin / Tangerine Juice",
    "category": "citrus",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "medium"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh squeezed",
    "shelfLife": "3 days refrigerated",
    "searchTerms": [
      "mandarin",
      "tangerine",
      "mandarin juice"
    ],
    "flavorNotes": "Sweet, delicate, honeyed",
    "terpeneNotes": "Softer limonene delivery than lemon or grapefruit.",
    "cost": "low",
    "recipeCount": 5
  },
  {
    "id": "tart-cherry-juice",
    "name": "Tart Cherry Juice",
    "category": "berry",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "medium"
      }
    ],
    "difficulty": "moderate",
    "form": "Bottled (100% tart cherry)",
    "shelfLife": "10 days opened, shelf-stable sealed",
    "searchTerms": [
      "tart cherry",
      "cherry juice",
      "sour cherry"
    ],
    "flavorNotes": "Sour, rich, deep berry",
    "terpeneNotes": "Limonene vehicle with depth. Subs for sour plum.",
    "cost": "medium",
    "recipeCount": 5
  },
  {
    "id": "fresh-spearmint",
    "name": "Fresh Spearmint",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "medium"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      },
      {
        "terpene": "β-Ocimene",
        "intensity": "low"
      }
    ],
    "difficulty": "moderate",
    "form": "Fresh leaves, gently muddled",
    "shelfLife": "5 days refrigerated",
    "searchTerms": [
      "spearmint",
      "spearmint leaves",
      "mint leaves"
    ],
    "flavorNotes": "Cool, sweet, clean",
    "terpeneNotes": "Limonene delivery with cooling menthol character.",
    "cost": "low",
    "recipeCount": 5
  },
  {
    "id": "fresh-sage",
    "name": "Fresh Sage",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "α-Humulene",
        "intensity": "high"
      },
      {
        "terpene": "α-Pinene",
        "intensity": "medium"
      }
    ],
    "difficulty": "moderate",
    "form": "Fresh leaf, gently bruised",
    "shelfLife": "5 days refrigerated",
    "searchTerms": [
      "sage",
      "sage leaf"
    ],
    "flavorNotes": "Earthy, savory, warm, medicinal",
    "terpeneNotes": "Primary α-humulene source. Adds grounding, earthy depth.",
    "safetyNotes": "Use sparingly. Not for prolonged use or during pregnancy.",
    "cost": "low",
    "recipeCount": 5
  },
  {
    "id": "mint-tea",
    "name": "Mint Tea (Peppermint)",
    "category": "tea",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "low"
      },
      {
        "terpene": "α-Pinene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Brewed strong (double bag), cooled",
    "shelfLife": "2 days refrigerated",
    "searchTerms": [
      "mint tea",
      "peppermint tea"
    ],
    "flavorNotes": "Cool, clean, invigorating",
    "terpeneNotes": "Menthol delivery with supporting pinene/limonene.",
    "cost": "low",
    "recipeCount": 4
  },
  {
    "id": "green-apple",
    "name": "Green Apple",
    "category": "other-fruit",
    "terpenes": [
      {
        "terpene": "Terpinolene",
        "intensity": "high"
      },
      {
        "terpene": "trans-β-Farnesene",
        "intensity": "high"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh pressed or blended and strained",
    "shelfLife": "1 day juiced, 2 weeks whole",
    "searchTerms": [
      "green apple",
      "apple juice",
      "apple"
    ],
    "flavorNotes": "Tart, crisp, fresh",
    "terpeneNotes": "Primary terpinolene + farnesene source. Subs for rhubarb/honeydew.",
    "cost": "low",
    "recipeCount": 3
  },
  {
    "id": "cinnamon-honey-syrup",
    "name": "Cinnamon-Honey Syrup",
    "category": "batch-syrup",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      }
    ],
    "difficulty": "moderate",
    "form": "Batch-made: simmer stick + water + honey, 5 min",
    "shelfLife": "2 weeks refrigerated",
    "searchTerms": [
      "cinnamon-honey",
      "cinnamon honey syrup"
    ],
    "flavorNotes": "Warm, sweet, woody cinnamon",
    "terpeneNotes": "Cinnamon caryophyllene in syrup form.",
    "subIngredients": [
      "1 cinnamon stick",
      "2 oz water",
      "1 oz honey"
    ],
    "cost": "low",
    "recipeCount": 3
  },
  {
    "id": "pineapple-juice",
    "name": "Pineapple Juice",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "low"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Bottled or fresh pressed",
    "shelfLife": "7 days opened, shelf-stable sealed",
    "searchTerms": [
      "pineapple",
      "pineapple juice"
    ],
    "flavorNotes": "Sweet, tart, tropical",
    "terpeneNotes": "Broad but low-intensity terpene delivery.",
    "cost": "low",
    "recipeCount": 2
  },
  {
    "id": "frozen-berry-blend",
    "name": "Frozen Berry Blend",
    "category": "berry",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "low"
      },
      {
        "terpene": "Linalool",
        "intensity": "low"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Frozen, blended and strained",
    "shelfLife": "Months frozen",
    "searchTerms": [
      "berry blend",
      "frozen berry",
      "berry mix",
      "strawberry/blueberry/blackberry"
    ],
    "flavorNotes": "Sweet-tart, bright, mixed berry",
    "terpeneNotes": "Broad but gentle terpene mix.",
    "cost": "low",
    "recipeCount": 2
  },
  {
    "id": "lemon-verbena",
    "name": "Lemon Verbena",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "high"
      }
    ],
    "difficulty": "specialty",
    "form": "Fresh leaves, gently bruised",
    "shelfLife": "3 days refrigerated",
    "searchTerms": [
      "lemon verbena",
      "verbena"
    ],
    "flavorNotes": "Intensely lemony, herbal, delicate",
    "terpeneNotes": "Concentrated citral/limonene. Fragrant citrus herb.",
    "cost": "medium",
    "recipeCount": 2
  },
  {
    "id": "lemongrass",
    "name": "Fresh Lemongrass",
    "category": "fresh-herb",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "high"
      },
      {
        "terpene": "Limonene",
        "intensity": "medium"
      }
    ],
    "difficulty": "specialty",
    "form": "Fresh stalks, peeled, smashed, cold-pressed or blended",
    "shelfLife": "2 weeks refrigerated",
    "searchTerms": [
      "lemongrass",
      "lemongrass stalks"
    ],
    "flavorNotes": "Citrus-herbal, bright, clean, earthy",
    "terpeneNotes": "Primary myrcene source (12-25% concentration). Backbone of high-myrcene strains. Unlocks 3 recipes.",
    "cost": "low",
    "recipeCount": 2
  },
  {
    "id": "ground-nutmeg",
    "name": "Ground Nutmeg",
    "category": "spice",
    "terpenes": [
      {
        "terpene": "Terpinolene",
        "intensity": "medium"
      },
      {
        "terpene": "β-Caryophyllene",
        "intensity": "low"
      },
      {
        "terpene": "α-Humulene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Freshly grated",
    "shelfLife": "6 months ground, years whole",
    "searchTerms": [
      "nutmeg",
      "ground nutmeg"
    ],
    "flavorNotes": "Warm, sweet, complex, woody",
    "terpeneNotes": "One of few spice sources of terpinolene.",
    "cost": "low",
    "recipeCount": 2
  },
  {
    "id": "orange-extract",
    "name": "Orange Flavor Extract",
    "category": "flavor-extract",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "high"
      }
    ],
    "difficulty": "specialty",
    "form": "Drops (food-grade flavor extract)",
    "shelfLife": "1 year+",
    "searchTerms": [
      "orange flavor",
      "orange extract",
      "orange drops"
    ],
    "flavorNotes": "Sweet citrus, warm, concentrated",
    "terpeneNotes": "Concentrated limonene hit. Used in Carambola and Purple Candy Cane.",
    "cost": "medium",
    "recipeCount": 2
  },
  {
    "id": "cardamom-honey-syrup",
    "name": "Cardamom-Honey Syrup",
    "category": "batch-syrup",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "moderate",
    "form": "Batch-made: crack pods + warm water + honey, steep 5 min",
    "shelfLife": "2 weeks refrigerated",
    "searchTerms": [
      "cardamom-honey",
      "cardamom honey syrup"
    ],
    "flavorNotes": "Warm, floral, complex, aromatic",
    "terpeneNotes": "Cardamom delivers caryophyllene in a sweet matrix.",
    "subIngredients": [
      "3-4 cardamom pods",
      "2 oz warm water",
      "1 tbsp honey"
    ],
    "cost": "medium",
    "recipeCount": 2
  },
  {
    "id": "guava",
    "name": "Guava",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "Limonene",
        "intensity": "medium"
      },
      {
        "terpene": "Myrcene",
        "intensity": "medium"
      }
    ],
    "difficulty": "specialty",
    "form": "Fresh puree or canned (Goya)",
    "shelfLife": "3 days fresh, shelf-stable canned",
    "searchTerms": [
      "guava",
      "guava puree"
    ],
    "flavorNotes": "Tropical, musky, sweet-tart",
    "terpeneNotes": "Dual limonene-myrcene source. Musky tropical bridge.",
    "cost": "medium",
    "recipeCount": 1
  },
  {
    "id": "mango",
    "name": "Mango",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "high"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh or frozen chunks, blended",
    "shelfLife": "Frozen: months. Fresh: 3 days",
    "searchTerms": [
      "mango",
      "mango chunks"
    ],
    "flavorNotes": "Tropical, lush, sweet, creamy",
    "terpeneNotes": "High myrcene — the terpene behind the 'mango myth' for THC enhancement.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "papaya",
    "name": "Papaya",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "medium"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "specialty",
    "form": "Fresh, chopped and blended",
    "shelfLife": "3 days refrigerated",
    "searchTerms": [
      "papaya"
    ],
    "flavorNotes": "Creamy, tropical, mild",
    "terpeneNotes": "Myrcene-forward tropical. Hero fruit for Lemon Papaya Banana.",
    "cost": "medium",
    "recipeCount": 1
  },
  {
    "id": "kiwi",
    "name": "Kiwi",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "medium"
      }
    ],
    "difficulty": "easy",
    "form": "Fresh, peeled and blended",
    "shelfLife": "1 week refrigerated whole",
    "searchTerms": [
      "kiwi",
      "kiwis"
    ],
    "flavorNotes": "Tart, bright, tropical-green",
    "terpeneNotes": "Myrcene vehicle with unique green character.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "banana",
    "name": "Banana",
    "category": "tropical-fruit",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "low"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Frozen slices, blended",
    "shelfLife": "Frozen: months",
    "searchTerms": [
      "banana",
      "banana slices",
      "frozen banana"
    ],
    "flavorNotes": "Creamy, sweet, mild",
    "terpeneNotes": "Low-intensity terpene delivery. Adds body and creaminess.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "frozen-blueberries",
    "name": "Frozen Blueberries",
    "category": "berry",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "medium"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Frozen, blended and strained",
    "shelfLife": "Months frozen",
    "searchTerms": [
      "blueberry",
      "blueberries",
      "frozen blueberries"
    ],
    "flavorNotes": "Sweet, earthy-berry, deep purple",
    "terpeneNotes": "Myrcene delivery with antioxidant depth.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "frozen-raspberries",
    "name": "Frozen Raspberries",
    "category": "berry",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "low"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Frozen, blended and fine-strained",
    "shelfLife": "Months frozen",
    "searchTerms": [
      "raspberry",
      "raspberries",
      "frozen raspberries"
    ],
    "flavorNotes": "Tart, bright, seedy when unfiltered",
    "terpeneNotes": "Light terpene delivery. Fine-strain to remove seeds.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "watermelon",
    "name": "Watermelon",
    "category": "other-fruit",
    "terpenes": [
      {
        "terpene": "Myrcene",
        "intensity": "medium"
      }
    ],
    "difficulty": "moderate",
    "form": "Fresh cubed, blended and strained",
    "shelfLife": "2 days juiced, 1 week whole",
    "searchTerms": [
      "watermelon",
      "watermelon juice"
    ],
    "flavorNotes": "Sweet, light, refreshing",
    "terpeneNotes": "Myrcene vehicle. Seasonal (March-Sept in CA).",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "frozen-peach",
    "name": "Frozen Peach Slices",
    "category": "other-fruit",
    "terpenes": [
      {
        "terpene": "Linalool",
        "intensity": "low"
      },
      {
        "terpene": "Limonene",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Frozen, blended and strained",
    "shelfLife": "Months frozen",
    "searchTerms": [
      "peach",
      "peach slices",
      "frozen peach"
    ],
    "flavorNotes": "Soft, sweet, velvety",
    "terpeneNotes": "Gentle linalool vehicle with peachy sweetness.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "sage-powder",
    "name": "Sage Powder",
    "category": "spice",
    "terpenes": [
      {
        "terpene": "α-Humulene",
        "intensity": "high"
      }
    ],
    "difficulty": "easy",
    "form": "Ground dried sage",
    "shelfLife": "6 months",
    "searchTerms": [
      "sage powder"
    ],
    "flavorNotes": "Earthy, savory, concentrated",
    "terpeneNotes": "Concentrated humulene delivery. Used in Mike's Bomba only.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "earl-grey-tea",
    "name": "Earl Grey Tea",
    "category": "tea",
    "terpenes": [
      {
        "terpene": "Terpinolene",
        "intensity": "medium"
      },
      {
        "terpene": "Limonene",
        "intensity": "medium"
      },
      {
        "terpene": "Linalool",
        "intensity": "low"
      }
    ],
    "difficulty": "easy",
    "form": "Brewed double-strength, cooled",
    "shelfLife": "2 days refrigerated",
    "searchTerms": [
      "earl grey",
      "earl grey tea"
    ],
    "flavorNotes": "Complex citrus, floral, tea-like, sophisticated",
    "terpeneNotes": "Bergamot delivers terpinolene + limonene. Used only in Moonlight — critical for its 'Earl Grey' aroma note.",
    "cost": "low",
    "recipeCount": 1
  },
  {
    "id": "cardamom-vanilla-syrup",
    "name": "Cardamom-Vanilla Syrup",
    "category": "batch-syrup",
    "terpenes": [
      {
        "terpene": "β-Caryophyllene",
        "intensity": "medium"
      },
      {
        "terpene": "Myrcene",
        "intensity": "low"
      }
    ],
    "difficulty": "moderate",
    "form": "Batch-made: crack pods + water + honey + vanilla, simmer 5 min",
    "shelfLife": "2 weeks refrigerated",
    "searchTerms": [
      "cardamom-vanilla",
      "cardamom vanilla syrup"
    ],
    "flavorNotes": "Warm, sweet, exotic, vanilla-spice",
    "terpeneNotes": "Cardamom caryophyllene + vanilla richness.",
    "subIngredients": [
      "5 cardamom pods",
      "4 oz water",
      "2 oz honey",
      "0.5 tsp vanilla extract"
    ],
    "cost": "medium",
    "recipeCount": 1
  }
];

// --- Matching Logic ---
function matchIngredients(recipe, pantrySet) {
  let matched = 0;
  const details = recipe.ingredients.map(ing => {
    const has = ing.itemId && pantrySet.has(ing.itemId);
    if (has) matched++;
    return { ...ing, has };
  });
  const total = recipe.ingredients.length;
  const pct = total > 0 ? Math.round((matched / total) * 100) : 0;
  const missing = details.filter(d => !d.has);
  let status = "locked";
  if (pct === 100) status = "ready";
  else if (pct >= 70) status = "almost";
  else if (pct >= 40) status = "reachable";
  return { pct, status, matched, total, details, missing };
}

function getShoppingData(recipes, pantrySet, ingredientMap) {
  // Impact scores: for each missing ingredient, count recipes it appears in
  const impact = {};
  const oneAway = [];

  recipes.forEach(r => {
    const m = matchIngredients(r, pantrySet);
    if (m.status === "ready") return;
    // "One away" check
    if (m.missing.length === 1 && m.pct >= 80) {
      oneAway.push({ recipe: r, missingItem: m.missing[0] });
    }
    m.missing.forEach(mi => {
      if (mi.itemId) {
        if (!impact[mi.itemId]) impact[mi.itemId] = { count: 0, recipes: [] };
        impact[mi.itemId].count++;
        impact[mi.itemId].recipes.push(r.name);
      }
    });
  });

  const ranked = Object.entries(impact)
    .map(([id, data]) => {
      const info = ingredientMap[id];
      const diffOrder = { easy: 0, moderate: 1, specialty: 2 };
      return {
        id, ...data, info,
        sortKey: data.count * 10 - (diffOrder[info?.difficulty] || 0)
      };
    })
    .sort((a, b) => b.sortKey - a.sortKey);

  return { oneAway, ranked };
}

// --- Terpene Dot Component ---
function TerpDot({ terpene, size = 10 }) {
  const color = TERPENE_COLORS[terpene] || "#666";
  return (
    <span title={terpene} style={{
      display: "inline-block", width: size, height: size,
      borderRadius: "50%", backgroundColor: color,
      marginRight: 3, border: `1px solid ${C.border}`
    }} />
  );
}

// --- Badge Components ---
function EnergyBadge({ energy }) {
  const meta = ENERGY_META[energy] || ENERGY_META.MEDIUM;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: "0.05em",
      padding: "2px 8px", borderRadius: 10,
      backgroundColor: meta.color + "22", color: meta.color,
      border: `1px solid ${meta.color}44`
    }}>{meta.short}</span>
  );
}

function DiffBadge({ difficulty }) {
  const colors = { easy: C.green, moderate: C.amber, specialty: C.wine };
  const color = colors[difficulty] || C.textMuted;
  return (
    <span style={{
      fontSize: 9, padding: "1px 6px", borderRadius: 8,
      backgroundColor: color + "22", color: color,
      border: `1px solid ${color}44`
    }}>{difficulty}</span>
  );
}

function MatchBadge({ pct, status }) {
  const colors = { ready: C.green, almost: C.amber, reachable: C.gold, locked: C.textMuted };
  const labels = { ready: "Ready", almost: "Almost", reachable: "Reachable", locked: "Locked" };
  const color = colors[status];
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
      backgroundColor: color + "22", color,
      border: `1px solid ${color}44`
    }}>{pct}% · {labels[status]}</span>
  );
}

// --- Tab 1: My Kitchen ---
function KitchenTab({ pantry, setPantry }) {
  const [search, setSearch] = useState("");
  const grouped = useMemo(() => {
    const groups = {};
    INGREDIENTS.forEach(ing => {
      if (!groups[ing.category]) groups[ing.category] = [];
      groups[ing.category].push(ing);
    });
    return groups;
  }, []);

  const toggle = useCallback((id) => {
    setPantry(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, [setPantry]);

  const addKit = useCallback((kitId) => {
    const kit = STARTER_KITS.find(k => k.id === kitId);
    if (kit) {
      setPantry(prev => {
        const next = new Set(prev);
        kit.items.forEach(id => next.add(id));
        return next;
      });
    }
  }, [setPantry]);

  const filtered = useMemo(() => {
    if (!search) return grouped;
    const q = search.toLowerCase();
    const out = {};
    Object.entries(grouped).forEach(([cat, items]) => {
      const f = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.searchTerms.some(t => t.includes(q)) ||
        i.terpenes.some(t => t.terpene.toLowerCase().includes(q))
      );
      if (f.length) out[cat] = f;
    });
    return out;
  }, [grouped, search]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search ingredients or terpenes..."
          style={{
            flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8,
            backgroundColor: C.bgSurface, border: `1px solid ${C.border}`,
            color: C.text, fontSize: 13, outline: "none"
          }}
        />
        <span style={{ color: C.textSec, fontSize: 12 }}>
          {pantry.size}/{INGREDIENTS.length} in kitchen
        </span>
      </div>

      {/* Starter Kits */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Quick Add Kits
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STARTER_KITS.map(kit => (
            <button key={kit.id} onClick={() => addKit(kit.id)}
              title={kit.description}
              style={{
                padding: "5px 12px", borderRadius: 16, fontSize: 11,
                backgroundColor: C.goldDim, color: C.gold,
                border: `1px solid ${C.gold}44`, cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.target.style.backgroundColor = C.gold + "33"}
              onMouseLeave={e => e.target.style.backgroundColor = C.goldDim}
            >
              + {kit.name}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Grid by Category */}
      {Object.entries(filtered).map(([cat, items]) => {
        const catMeta = CATEGORIES[cat] || { label: cat, icon: "📦" };
        return (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: C.textSec, marginBottom: 6, fontWeight: 600 }}>
              {catMeta.icon} {catMeta.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map(ing => {
                const active = pantry.has(ing.id);
                return (
                  <button key={ing.id} onClick={() => toggle(ing.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", borderRadius: 10, fontSize: 12,
                      backgroundColor: active ? C.gold + "22" : C.bgCard,
                      color: active ? C.gold : C.textSec,
                      border: `1px solid ${active ? C.gold + "66" : C.border}`,
                      cursor: "pointer", transition: "all 0.15s"
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{active ? "✓" : "○"}</span>
                    <span>{ing.name}</span>
                    <span style={{ display: "flex", gap: 1 }}>
                      {ing.terpenes.slice(0, 3).map((t, i) => (
                        <TerpDot key={i} terpene={t.terpene} size={7} />
                      ))}
                    </span>
                    <span style={{ fontSize: 10, color: C.textMuted }}>{ing.recipeCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Tab 2: Recipes ---
function RecipesTab({ pantry }) {
  const [energyFilter, setEnergyFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [vibeFilter, setVibeFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  const scored = useMemo(() => {
    return RECIPES.map(r => ({
      ...r,
      match: matchIngredients(r, pantry)
    }));
  }, [pantry]);

  const filtered = useMemo(() => {
    return scored
      .filter(r => energyFilter === "ALL" || r.energy === energyFilter)
      .filter(r => statusFilter === "ALL" || r.match.status === statusFilter)
      .filter(r => vibeFilter === "ALL" || (r.vibeCategories || []).includes(vibeFilter))
      .sort((a, b) => b.match.pct - a.match.pct);
  }, [scored, energyFilter, statusFilter, vibeFilter]);

  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, reachable: 0, locked: 0 };
    scored.forEach(r => c[r.match.status]++);
    return c;
  }, [scored]);

  return (
    <div>
      {/* Status summary */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ color: C.green, fontSize: 13 }}>✓ {counts.ready} Ready</span>
        <span style={{ color: C.amber, fontSize: 13 }}>◐ {counts.almost} Almost</span>
        <span style={{ color: C.gold, fontSize: 13 }}>○ {counts.reachable} Reachable</span>
        <span style={{ color: C.textMuted, fontSize: 13 }}>◌ {counts.locked} Locked</span>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["ALL", "HIGH", "MEDIUM", "LOW"].map(e => (
          <button key={e} onClick={() => setEnergyFilter(e)}
            style={{
              padding: "4px 10px", borderRadius: 12, fontSize: 11,
              backgroundColor: energyFilter === e ? C.gold + "33" : C.bgCard,
              color: energyFilter === e ? C.gold : C.textMuted,
              border: `1px solid ${energyFilter === e ? C.gold + "66" : C.border}`,
              cursor: "pointer"
            }}>
            {e === "ALL" ? "All Energy" : (ENERGY_META[e]?.short || e)}
          </button>
        ))}
        <span style={{ width: 1, backgroundColor: C.border, margin: "0 4px" }} />
        {["ALL", "ready", "almost", "reachable", "locked"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{
              padding: "4px 10px", borderRadius: 12, fontSize: 11,
              backgroundColor: statusFilter === s ? C.gold + "33" : C.bgCard,
              color: statusFilter === s ? C.gold : C.textMuted,
              border: `1px solid ${statusFilter === s ? C.gold + "66" : C.border}`,
              cursor: "pointer"
            }}>
            {s === "ALL" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Vibe filter */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => setVibeFilter("ALL")}
          style={{
            padding: "3px 8px", borderRadius: 10, fontSize: 10,
            backgroundColor: vibeFilter === "ALL" ? C.sageDim : C.bgCard,
            color: vibeFilter === "ALL" ? C.sage : C.textMuted,
            border: `1px solid ${vibeFilter === "ALL" ? C.sage + "44" : C.border}`,
            cursor: "pointer"
          }}>All Vibes</button>
        {Object.entries(VIBE_CATEGORIES).map(([key, v]) => (
          <button key={key} onClick={() => setVibeFilter(key)}
            style={{
              padding: "3px 8px", borderRadius: 10, fontSize: 10,
              backgroundColor: vibeFilter === key ? C.sageDim : C.bgCard,
              color: vibeFilter === key ? C.sage : C.textMuted,
              border: `1px solid ${vibeFilter === key ? C.sage + "44" : C.border}`,
              cursor: "pointer"
            }}>{v.icon} {v.label}</button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(r => {
          const isOpen = expanded === r.id;
          return (
            <div key={r.id}
              onClick={() => setExpanded(isOpen ? null : r.id)}
              style={{
                backgroundColor: C.bgCard, borderRadius: 12,
                border: `1px solid ${r.match.status === "ready" ? C.green + "44" : C.border}`,
                padding: 16, cursor: "pointer",
                transition: "all 0.15s"
              }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: C.text, fontSize: 15, fontWeight: 600 }}>{r.name}</span>
                    <EnergyBadge energy={r.energy} />
                  </div>
                  <div style={{ color: C.textSec, fontSize: 12, marginBottom: 4 }}>
                    {r.recipeName} · {r.farm} · {r.region}
                  </div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                    {r.terpeneProfile.map((t, i) => (
                      <TerpDot key={i} terpene={t.name} size={10} />
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic" }}>
                    {r.intent}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <MatchBadge pct={r.match.pct} status={r.match.status} />
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                    {r.match.matched}/{r.match.total} ingredients
                  </div>
                </div>
              </div>

              {/* Match bar */}
              <div style={{ marginTop: 8, height: 3, backgroundColor: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  width: `${r.match.pct}%`,
                  backgroundColor: r.match.status === "ready" ? C.green
                    : r.match.status === "almost" ? C.amber
                    : r.match.status === "reachable" ? C.gold : C.textMuted,
                  transition: "width 0.3s ease"
                }} />
              </div>

              {/* Expanded details */}
              {isOpen && (
                <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                  {/* Ingredients */}
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Ingredients
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12 }}>
                    {r.match.details.map((ing, i) => (
                      <div key={i} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: ing.has ? C.green : C.red, fontSize: 14 }}>
                          {ing.has ? "✓" : "✗"}
                        </span>
                        <span style={{ color: ing.has ? C.text : C.textSec }}>{ing.raw}</span>
                      </div>
                    ))}
                  </div>

                  {/* Method */}
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Method
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                    {r.method.map((step, i) => (
                      <div key={i} style={{ fontSize: 12, color: C.textSec, paddingLeft: 4 }}>
                        {i + 1}. {step}
                      </div>
                    ))}
                  </div>

                  {/* Terpene Map */}
                  {r.terpeneMap.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Terpene Map
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {r.terpeneMap.map((tm, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                            <TerpDot terpene={tm.terpene} size={8} />
                            <span style={{ color: C.textSec }}>{tm.terpene}:</span>
                            <span style={{ color: C.textMuted }}>{tm.sources.join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Substitution notes */}
                  {r.substitutionNotes && (
                    <div style={{ fontSize: 11, color: C.textMuted, fontStyle: "italic", padding: 8, backgroundColor: C.bgSurface, borderRadius: 8 }}>
                      💡 {r.substitutionNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Tab 3: Shopping List ---
function ShoppingTab({ pantry, setPantry }) {
  const ingredientMap = useMemo(() => {
    const map = {};
    INGREDIENTS.forEach(i => map[i.id] = i);
    return map;
  }, []);

  const shopping = useMemo(() => {
    return getShoppingData(RECIPES, pantry, ingredientMap);
  }, [pantry, ingredientMap]);

  const addItem = useCallback((id) => {
    setPantry(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, [setPantry]);

  return (
    <div>
      {/* One Away Section */}
      {shopping.oneAway.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.amber, marginBottom: 8 }}>
            ◐ One Ingredient Away ({shopping.oneAway.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {shopping.oneAway.map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", backgroundColor: C.bgCard, borderRadius: 10,
                border: `1px solid ${C.amber}33`
              }}>
                <div>
                  <div style={{ fontSize: 13, color: C.text }}>{item.recipe.name}</div>
                  <div style={{ fontSize: 11, color: C.textSec }}>
                    Needs: <span style={{ color: C.amber }}>{item.missingItem.raw}</span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); addItem(item.missingItem.itemId); }}
                  style={{
                    padding: "4px 10px", borderRadius: 8, fontSize: 11,
                    backgroundColor: C.goldDim, color: C.gold,
                    border: `1px solid ${C.gold}44`, cursor: "pointer"
                  }}>
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Highest Impact */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.gold, marginBottom: 8 }}>
          ⚡ Highest Impact Ingredients
        </div>
        {shopping.ranked.length === 0 ? (
          <div style={{ color: C.textMuted, fontSize: 12, fontStyle: "italic" }}>
            You have everything! All 24 recipes are ready to make.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {shopping.ranked.slice(0, 15).map((item, i) => (
              <div key={item.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", backgroundColor: C.bgCard, borderRadius: 8,
                border: `1px solid ${C.border}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: C.gold, width: 28, textAlign: "center" }}>
                    {item.count}
                  </span>
                  <div>
                    <div style={{ fontSize: 12, color: C.text }}>
                      {item.info?.name || item.id}
                    </div>
                    <div style={{ fontSize: 10, color: C.textMuted, display: "flex", gap: 4, alignItems: "center" }}>
                      <DiffBadge difficulty={item.info?.difficulty} />
                      <span>Unlocks: {item.recipes.slice(0, 3).join(", ")}{item.recipes.length > 3 ? ` +${item.recipes.length - 3} more` : ""}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => addItem(item.id)}
                  style={{
                    padding: "4px 10px", borderRadius: 8, fontSize: 11,
                    backgroundColor: C.goldDim, color: C.gold,
                    border: `1px solid ${C.gold}44`, cursor: "pointer"
                  }}>
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Starter Bundles */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.sage, marginBottom: 8 }}>
          📦 Starter Bundles
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STARTER_KITS.map(kit => {
            const owned = kit.items.filter(id => pantry.has(id)).length;
            const total = kit.items.length;
            const complete = owned === total;
            return (
              <div key={kit.id} style={{
                padding: "12px 14px", backgroundColor: C.bgCard, borderRadius: 10,
                border: `1px solid ${complete ? C.green + "44" : C.border}`,
                opacity: complete ? 0.6 : 1
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: complete ? C.green : C.text }}>
                    {complete ? "✓ " : ""}{kit.name}
                  </span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{owned}/{total}</span>
                </div>
                <div style={{ fontSize: 11, color: C.textSec, marginBottom: 6 }}>{kit.description}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {kit.items.map(id => {
                    const info = ingredientMap[id];
                    const has = pantry.has(id);
                    return (
                      <span key={id} onClick={(e) => { e.stopPropagation(); if (!has) addItem(id); }}
                        style={{
                          fontSize: 10, padding: "2px 8px", borderRadius: 8,
                          backgroundColor: has ? C.green + "22" : C.bgSurface,
                          color: has ? C.green : C.textMuted,
                          border: `1px solid ${has ? C.green + "44" : C.border}`,
                          cursor: has ? "default" : "pointer"
                        }}>
                        {has ? "✓ " : ""}{info?.name || id}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Tab 4: Terpene Guide ---
function TerpeneTab() {
  const terpData = useMemo(() => {
    return Object.entries(TERPENE_COLORS).map(([name, color]) => {
      const sources = INGREDIENTS.filter(i =>
        i.terpenes.some(t => t.terpene === name)
      ).map(i => ({
        name: i.name,
        intensity: i.terpenes.find(t => t.terpene === name)?.intensity || "low"
      }));
      return { name, color, sources };
    });
  }, []);

  const effects = {
    "β-Caryophyllene": "Anti-inflammatory, pain relief, anxiety reduction. Activates CB2 cannabinoid receptor.",
    "Limonene": "Mood elevation, stress relief, energizing. Rapidly absorbed through inhalation.",
    "Myrcene": "Sedative, relaxing, muscle relaxant. Enhances THC absorption.",
    "α-Humulene": "Anti-inflammatory, appetite suppressant. Found in hops.",
    "Linalool": "Calming, sedative, anti-anxiety. Key component of lavender.",
    "α-Bisabolol": "Anti-inflammatory, skin healing, calming. Active in chamomile.",
    "α-Pinene": "Alertness, memory retention, bronchodilator. Most common terpene in nature.",
    "β-Ocimene": "Uplifting, antiviral, decongestant. Found in basil and orchids.",
    "Terpinolene": "Uplifting, antioxidant. Rare as dominant terpene. Found in tea tree.",
    "trans-β-Farnesene": "Calming, anti-inflammatory. Found in green apple skin.",
  };

  return (
    <div>
      <div style={{ fontSize: 12, color: C.textSec, marginBottom: 16, lineHeight: 1.5 }}>
        Cannabis and culinary herbs share terpenes — aromatic molecules that create flavor, aroma, and effects.
        Each juice recipe matches the strain's terpene fingerprint using botanical ingredients that deliver the same molecules.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {terpData.map(t => (
          <div key={t.name} style={{
            padding: 14, backgroundColor: C.bgCard, borderRadius: 12,
            border: `1px solid ${t.color}33`
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                backgroundColor: t.color, border: `2px solid ${t.color}88`
              }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 8, lineHeight: 1.4 }}>
              {effects[t.name] || ""}
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Juice Ingredients
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {t.sources.map((s, i) => {
                const iColors = { high: C.gold, medium: C.textSec, low: C.textMuted };
                return (
                  <span key={i} style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 8,
                    backgroundColor: t.color + "15",
                    color: iColors[s.intensity],
                    border: `1px solid ${t.color}33`
                  }}>
                    {s.name} {s.intensity === "high" ? "●●●" : s.intensity === "medium" ? "●●○" : "●○○"}
                  </span>
                );
              })}
              {t.sources.length === 0 && (
                <span style={{ fontSize: 10, color: C.textMuted, fontStyle: "italic" }}>
                  No direct juice ingredient source
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main App ---
export default function SolfulJuiceApp() {
  const [tab, setTab] = useState("kitchen");
  const [pantry, setPantry] = useState(() => {
    try {
      const saved = localStorage.getItem("solful-juice-pantry");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem("solful-juice-pantry", JSON.stringify([...pantry]));
  }, [pantry]);

  const readyCount = useMemo(() => {
    return RECIPES.filter(r => matchIngredients(r, pantry).status === "ready").length;
  }, [pantry]);

  const tabs = [
    { id: "kitchen", label: "My Kitchen", icon: "🧊" },
    { id: "recipes", label: "Recipes", icon: "🥤" },
    { id: "shopping", label: "Shopping", icon: "🛒" },
    { id: "terpenes", label: "Terpenes", icon: "🧬" },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      backgroundColor: C.bg, color: C.text, minHeight: "100vh",
      maxWidth: 640, margin: "0 auto", padding: "0 16px 80px"
    }}>
      {/* Header */}
      <div style={{ padding: "24px 0 16px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: C.textMuted, textTransform: "uppercase", marginBottom: 4 }}>
          Solful Sessions
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>
          Terpene Juice Kitchen
        </div>
        <div style={{ fontSize: 12, color: C.textSec }}>
          {pantry.size} ingredients · {readyCount}/24 recipes ready
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: "flex", gap: 2, marginBottom: 20, padding: 3,
        backgroundColor: C.bgSurface, borderRadius: 14,
        border: `1px solid ${C.border}`
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 12, fontSize: 11,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              backgroundColor: tab === t.id ? C.bgCard : "transparent",
              color: tab === t.id ? C.gold : C.textMuted,
              border: tab === t.id ? `1px solid ${C.border}` : "1px solid transparent",
              cursor: "pointer", transition: "all 0.15s",
              fontWeight: tab === t.id ? 600 : 400
            }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "kitchen" && <KitchenTab pantry={pantry} setPantry={setPantry} />}
      {tab === "recipes" && <RecipesTab pantry={pantry} />}
      {tab === "shopping" && <ShoppingTab pantry={pantry} setPantry={setPantry} />}
      {tab === "terpenes" && <TerpeneTab />}
    </div>
  );
}

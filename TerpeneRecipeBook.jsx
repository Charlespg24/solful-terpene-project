import { useState, useMemo, useCallback } from "react";

const DATA = {
  "meta": {
    "title": "Terpene Beverage Recipe Book",
    "subtitle": "24 Strains × 5 Categories = 120 Hand-Crafted Terpene-Matched Recipes",
    "system": "Solful Sessions Terpene Pairing Framework v3.0",
    "generated": "2026-02-16T02:01:32.138Z",
    "categories": [
      "mocktail",
      "cocktail",
      "juice",
      "tea",
      "shot"
    ],
    "strainCount": 24,
    "recipeCount": 120,
    "buildNotes": "Hand-crafted recipes using full strain context (name, aroma, effects, intent). Diverse terpene sources beyond essential oil translation. Varied spirit selection. Strain-specific hero ingredients."
  },
  "terpeneColors": {
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
  },
  "vibes": {
    "groundedPresent": {
      "name": "Grounded & Present",
      "color": "#8B7355",
      "desc": "Steady calm, clear mental edges"
    },
    "creativeFlow": {
      "name": "Creative Flow",
      "color": "#9B7BA8",
      "desc": "Vivid ideas, playful momentum"
    },
    "deepRest": {
      "name": "Deep Rest",
      "color": "#5C7B9B",
      "desc": "Total surrender, velvet quiet"
    },
    "socialBright": {
      "name": "Social & Bright",
      "color": "#C8A97E",
      "desc": "Warm gathering, easy laughter"
    },
    "bodyMelt": {
      "name": "Body Melt",
      "color": "#8B5E5E",
      "desc": "Profound physical ease"
    },
    "euphoricLift": {
      "name": "Euphoric Lift",
      "color": "#B8785C",
      "desc": "Bright lift, electric joy"
    },
    "calmFocus": {
      "name": "Calm Focus",
      "color": "#7C9082",
      "desc": "Clear productivity, no fog"
    },
    "cozyComfort": {
      "name": "Cozy Comfort",
      "color": "#9B7B7B",
      "desc": "Warm blanket, curious mind"
    }
  },
  "strains": [
    {
      "id": 1,
      "name": "Mike's Bomba",
      "farm": "Glentucky Family Farm",
      "region": "Sonoma",
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
      "terpenes": {
        "β-Caryophyllene": 0.47,
        "Limonene": 0.32,
        "α-Humulene": 0.18,
        "Linalool": 0.07
      },
      "terpeneRatios": {
        "β-Caryophyllene": 45,
        "Limonene": 31,
        "α-Humulene": 17,
        "Linalool": 7
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "LOW",
      "categories": [
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Black pepper delivers the dominant caryophyllene (50% of blend). Lemon matches the lemon cream aroma. Sage provides humulene with herbal grounding. Lavender softens edges.",
      "recipes": {
        "mocktail": {
          "name": "Cream & Compass",
          "tagline": "Lemon-kissed calm with earthy rosemary anchors the mind.",
          "glass": "Coupe",
          "volume": "~5 oz",
          "method": [
            "Add 2 oz fresh lemon juice, 1 oz cream, 0.5 oz rosemary-infused simple syrup to shaker with ice.",
            "Add 3 dashes of angostura bitters.",
            "Shake for 10 seconds until frothy.",
            "Fine-strain into chilled coupe.",
            "Express lemon peel oil over surface and drop as garnish."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "2 oz Fresh lemon juice",
            "1 oz Heavy cream",
            "0.5 oz Rosemary-infused simple syrup",
            "3 dashes Angostura bitters",
            "1 twist Lemon peel"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Rosemary infusion"
            },
            {
              "terpene": "Limonene",
              "pct": "32%",
              "ingredient": "Fresh lemon"
            },
            {
              "terpene": "α-Humulene",
              "pct": "18%",
              "ingredient": "Rosemary spice"
            },
            {
              "terpene": "Linalool",
              "pct": "7%",
              "ingredient": "Angostura bitters"
            }
          ]
        },
        "cocktail": {
          "name": "Grounded Manhattan",
          "tagline": "Bourbon mellows the fuel, rosemary deepens the calm.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Combine 2 oz bourbon with 1 oz lemon cream cordial in mixing glass.",
            "Add 0.5 oz dry vermouth and 0.5 oz rosemary syrup.",
            "Stir for 15 seconds with large ice cubes.",
            "Strain into chilled coupe.",
            "Garnish with a rosemary sprig and candied lemon wheel."
          ],
          "temp": "Cold (around 45°F)",
          "spirit": "Bourbon (100 proof)",
          "style": "Classic/stirred",
          "abv": "~35%",
          "ingredients": [
            "2 oz Bourbon",
            "1 oz Lemon cream cordial",
            "0.5 oz Dry vermouth",
            "0.5 oz Rosemary simple syrup",
            "1 each Rosemary sprig & candied lemon"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Rosemary syrup"
            },
            {
              "terpene": "Limonene",
              "pct": "32%",
              "ingredient": "Lemon cordial"
            },
            {
              "terpene": "α-Humulene",
              "pct": "18%",
              "ingredient": "Rosemary + vermouth"
            },
            {
              "terpene": "Linalool",
              "pct": "7%",
              "ingredient": "Vermouth botanicals"
            }
          ]
        },
        "juice": {
          "name": "Forest Refresh",
          "tagline": "Pressed brightness with earthy mineral finish.",
          "glass": "Highball",
          "volume": "~8 oz",
          "method": [
            "Cold-press 3 oz fresh lemon juice with 2 oz fresh rosemary water (steeped 20 min).",
            "Strain through fine mesh.",
            "Add 2 oz cold coconut cream and 1 oz filtered water.",
            "Shake and pour over crushed ice.",
            "Garnish with fresh rosemary sprig and lemon wheel."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 2 hours of pressing",
          "ingredients": [
            "3 oz Fresh lemon juice",
            "2 oz Rosemary-steeped water",
            "2 oz Coconut cream",
            "1 oz Filtered water",
            "1 each Fresh rosemary & lemon wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Rosemary water"
            },
            {
              "terpene": "Limonene",
              "pct": "32%",
              "ingredient": "Fresh lemon"
            },
            {
              "terpene": "α-Humulene",
              "pct": "18%",
              "ingredient": "Rosemary notes"
            },
            {
              "terpene": "Linalool",
              "pct": "7%",
              "ingredient": "Coconut subtlety"
            }
          ]
        },
        "tea": {
          "name": "Lemon & Sage Rest",
          "tagline": "Gentle herbal infusion with bright citrus notes.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Add 1 tsp dried rosemary, 0.5 tsp dried sage, and 1 dried lemon wheel to infuser.",
            "Steep for 5 minutes, stirring gently.",
            "Remove infuser and add 0.5 oz fresh lemon juice and 1 tsp honey.",
            "Stir and serve with a sage leaf."
          ],
          "temp": "Warm (165-170°F when served)",
          "steepTemp": "185°F",
          "steepTime": "5 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Rosemary, sage, dried lemon, honey",
          "ingredients": [
            "6 oz Filtered water",
            "1 tsp Dried rosemary",
            "0.5 tsp Dried sage",
            "1 wheel Dried lemon wheel",
            "1 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Rosemary leaf"
            },
            {
              "terpene": "Limonene",
              "pct": "32%",
              "ingredient": "Lemon wheel"
            },
            {
              "terpene": "α-Humulene",
              "pct": "18%",
              "ingredient": "Sage infusion"
            },
            {
              "terpene": "Linalool",
              "pct": "7%",
              "ingredient": "Honey warmth"
            }
          ]
        },
        "shot": {
          "name": "Grounded Truth",
          "tagline": "A spicy-bright hit of rosemary and lemon clarity.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Infuse 1.5 oz bourbon with a sprig of fresh rosemary for 30 seconds by stirring.",
            "Strain out rosemary.",
            "Add 0.25 oz fresh lemon juice to the shot glass.",
            "Pour bourbon mixture over.",
            "Top with a single pinch of sea salt and small rosemary leaf."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume immediately after preparation",
          "ingredients": [
            "1.5 oz Bourbon",
            "1 sprig Fresh rosemary (stir)",
            "0.25 oz Fresh lemon juice",
            "pinch Sea salt & rosemary leaf"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Fresh rosemary"
            },
            {
              "terpene": "Limonene",
              "pct": "32%",
              "ingredient": "Lemon juice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "18%",
              "ingredient": "Rosemary oil"
            },
            {
              "terpene": "Linalool",
              "pct": "7%",
              "ingredient": "Bourbon spice"
            }
          ]
        }
      }
    },
    {
      "id": 2,
      "name": "Guava Gift",
      "farm": "Alpenglow Farms",
      "region": "Humboldt",
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
      "terpenes": {
        "β-Caryophyllene": 0.73,
        "Limonene": 0.5,
        "Myrcene": 0.33,
        "α-Humulene": 0.25
      },
      "terpeneRatios": {
        "β-Caryophyllene": 40,
        "Limonene": 28,
        "Myrcene": 18,
        "α-Humulene": 14
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "HIGH",
      "categories": [
        "socialBright"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Black pepper leads with caryophyllene. Grapefruit brings tropical citrus echoing the guava aroma. Lemongrass delivers myrcene for euphoric lift.",
      "recipes": {
        "mocktail": {
          "name": "Social Guava",
          "tagline": "Tropical guava and tamarind sparkle with expansive warmth.",
          "glass": "Highball",
          "volume": "~8 oz",
          "method": [
            "Pour 3 oz fresh guava nectar into highball glass over ice.",
            "Add 1 oz tamarind paste (dissolved in 1 oz water).",
            "Top with 3 oz sparkling water.",
            "Add 0.5 oz fresh lemon juice (juice, not zest).",
            "Garnish with lemon wheel and rosemary sprig."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "3 oz Fresh guava nectar",
            "1 oz Tamarind paste (diluted)",
            "3 oz Sparkling water",
            "0.5 oz Fresh lemon juice",
            "1 each Lemon wheel & rosemary sprig"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "73%",
              "ingredient": "Tamarind + rosemary"
            },
            {
              "terpene": "Limonene",
              "pct": "50%",
              "ingredient": "Guava + lemon"
            },
            {
              "terpene": "Myrcene",
              "pct": "33%",
              "ingredient": "Guava fruit"
            },
            {
              "terpene": "α-Humulene",
              "pct": "25%",
              "ingredient": "Rosemary spice"
            }
          ]
        },
        "cocktail": {
          "name": "Tropical Elevation",
          "tagline": "White rum carries guava and tamarind to bright social heights.",
          "glass": "Tiki mug",
          "volume": "~7 oz",
          "method": [
            "Combine 2 oz white rum (pisco preferred) with 2.5 oz guava puree in shaker.",
            "Add 0.75 oz tamarind paste, 0.5 oz lime juice, and ice.",
            "Shake vigorously for 12 seconds.",
            "Strain into tiki mug filled with crushed ice.",
            "Garnish with guava slice, lemon twist, and rosemary sprig."
          ],
          "temp": "Ice cold",
          "spirit": "Pisco or white rum (40% ABV)",
          "style": "Tropical/shaken",
          "abv": "~28%",
          "ingredients": [
            "2 oz Pisco or white rum",
            "2.5 oz Guava puree",
            "0.75 oz Tamarind paste",
            "0.5 oz Lime juice",
            "1 each Guava slice, lemon twist, rosemary"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "73%",
              "ingredient": "Tamarind"
            },
            {
              "terpene": "Limonene",
              "pct": "50%",
              "ingredient": "Guava + lime"
            },
            {
              "terpene": "Myrcene",
              "pct": "33%",
              "ingredient": "Guava puree"
            },
            {
              "terpene": "α-Humulene",
              "pct": "25%",
              "ingredient": "Rosemary accent"
            }
          ]
        },
        "juice": {
          "name": "Guava Dawn",
          "tagline": "Pressed guava and tamarind with bright citrus whisper.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 4 oz fresh guava (with skin).",
            "Strain through fine mesh into container.",
            "Whisk in 1 tsp tamarind paste with 1 oz filtered water until smooth.",
            "Add 0.5 oz fresh lime juice and combine.",
            "Pour into glass over ice and garnish with lemon wheel."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed fresh",
          "timing": "Consume within 1 hour for optimal brightness",
          "ingredients": [
            "4 oz Fresh guava (pressed)",
            "1 tsp Tamarind paste",
            "1 oz Filtered water",
            "0.5 oz Fresh lime juice",
            "1 wheel Lemon wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "73%",
              "ingredient": "Tamarind paste"
            },
            {
              "terpene": "Limonene",
              "pct": "50%",
              "ingredient": "Guava + lime"
            },
            {
              "terpene": "Myrcene",
              "pct": "33%",
              "ingredient": "Fresh guava"
            },
            {
              "terpene": "α-Humulene",
              "pct": "25%",
              "ingredient": "Tamarind warmth"
            }
          ]
        },
        "tea": {
          "name": "Guava Harmony",
          "tagline": "Gentle guava leaf infusion with subtle tropical notes.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 195°F.",
            "Add 1 tbsp dried guava leaf pieces and 0.5 oz fresh guava puree to infuser.",
            "Steep for 4 minutes.",
            "Remove infuser and add 0.5 oz lime juice and 0.5 tsp honey.",
            "Stir and serve with a dried guava chip."
          ],
          "temp": "Warm (170°F when served)",
          "steepTemp": "195°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried guava leaf, guava puree, lime, honey",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Dried guava leaf",
            "0.5 oz Fresh guava puree",
            "0.5 oz Fresh lime juice",
            "0.5 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "73%",
              "ingredient": "Guava leaf warmth"
            },
            {
              "terpene": "Limonene",
              "pct": "50%",
              "ingredient": "Guava + lime"
            },
            {
              "terpene": "Myrcene",
              "pct": "33%",
              "ingredient": "Guava leaf infusion"
            },
            {
              "terpene": "α-Humulene",
              "pct": "25%",
              "ingredient": "Leaf spice notes"
            }
          ]
        },
        "shot": {
          "name": "Guava Spark",
          "tagline": "A tropical punch of guava and tamarind intensity.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Pour 1 oz pisco into shot glass.",
            "Add 0.5 oz guava puree (at room temperature).",
            "Float 0.25 oz tamarind paste (pre-thinned with water).",
            "Stir briefly to combine layers.",
            "Garnish with a pinch of dried guava or tamarind crystal."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume immediately",
          "ingredients": [
            "1 oz Pisco",
            "0.5 oz Guava puree",
            "0.25 oz Tamarind paste (diluted)",
            "1 piece Dried guava chip"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "73%",
              "ingredient": "Tamarind"
            },
            {
              "terpene": "Limonene",
              "pct": "50%",
              "ingredient": "Guava brightness"
            },
            {
              "terpene": "Myrcene",
              "pct": "33%",
              "ingredient": "Guava puree"
            },
            {
              "terpene": "α-Humulene",
              "pct": "25%",
              "ingredient": "Herbal base"
            }
          ]
        }
      }
    },
    {
      "id": 3,
      "name": "Carambola",
      "farm": "Higher Heights",
      "region": "Mendocino",
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
      "terpenes": {
        "Limonene": 0.44,
        "β-Caryophyllene": 0.18,
        "Linalool": 0.12,
        "α-Bisabolol": 0.09
      },
      "terpeneRatios": {
        "Limonene": 53,
        "β-Caryophyllene": 22,
        "Linalool": 14,
        "α-Bisabolol": 11
      },
      "dominantTerpene": "Limonene",
      "energyTier": "HIGH",
      "categories": [
        "socialBright",
        "creativeFlow",
        "euphoricLift"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Limonene-dominant and uplifting. Sweet orange (40%) captures the orange aroma. German chamomile delivers bisabolol and softens the blend.",
      "recipes": {
        "mocktail": {
          "name": "Stellar Sparkle",
          "tagline": "Starfruit's playful tartness sparkles with cardamom warmth.",
          "glass": "Coupe",
          "volume": "~6 oz",
          "method": [
            "Juice 2 fresh starfruit (about 2.5 oz).",
            "Combine juice with 1 oz fresh orange juice in shaker.",
            "Add 0.5 oz cardamom-honey syrup and ice.",
            "Shake for 8 seconds.",
            "Strain into chilled coupe and garnish with a thin starfruit slice."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "2.5 oz Fresh starfruit juice",
            "1 oz Fresh orange juice",
            "0.5 oz Cardamom-honey syrup",
            "1 thin wheel Starfruit slice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "44%",
              "ingredient": "Starfruit + orange"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "18%",
              "ingredient": "Cardamom warmth"
            },
            {
              "terpene": "Linalool",
              "pct": "12%",
              "ingredient": "Honey subtlety"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "9%",
              "ingredient": "Cardamom notes"
            }
          ]
        },
        "cocktail": {
          "name": "Playful Botanica",
          "tagline": "Gin's botanical clarity amplifies starfruit's effervescent joy.",
          "glass": "Coup de Grace (wide coupe)",
          "volume": "~5.5 oz",
          "method": [
            "Combine 1.5 oz London Dry gin with 2 oz fresh starfruit juice in mixing glass.",
            "Add 0.5 oz fresh orange juice and 0.25 oz cardamom-honey syrup.",
            "Stir with large ice for 12 seconds.",
            "Strain into chilled coupe over a large clear ice cube.",
            "Express orange peel oils over surface and garnish with thin starfruit slice."
          ],
          "temp": "Cold (around 40°F)",
          "spirit": "London Dry Gin (47% ABV)",
          "style": "Botanical/stirred",
          "abv": "~32%",
          "ingredients": [
            "1.5 oz London Dry gin",
            "2 oz Fresh starfruit juice",
            "0.5 oz Fresh orange juice",
            "0.25 oz Cardamom-honey syrup",
            "1 each Orange peel & starfruit slice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "44%",
              "ingredient": "Starfruit + orange"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "18%",
              "ingredient": "Gin botanicals + cardamom"
            },
            {
              "terpene": "Linalool",
              "pct": "12%",
              "ingredient": "Gin botanicals + honey"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "9%",
              "ingredient": "Cardamom essence"
            }
          ]
        },
        "juice": {
          "name": "Star Energy",
          "tagline": "Crisp cold-pressed starfruit with orange brightness.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 4 fresh starfruit halves (about 3 oz juice).",
            "Strain through fine mesh.",
            "Add 1 oz fresh orange juice and 0.25 oz cardamom water (steeped cardamom for 10 min).",
            "Top with 2 oz coconut water.",
            "Stir and serve over crushed ice with a starfruit wheel."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 90 minutes of pressing",
          "ingredients": [
            "3 oz Fresh starfruit (pressed)",
            "1 oz Fresh orange juice",
            "0.25 oz Cardamom-steeped water",
            "2 oz Coconut water",
            "1 wheel Starfruit wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "44%",
              "ingredient": "Starfruit + orange"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "18%",
              "ingredient": "Cardamom spice"
            },
            {
              "terpene": "Linalool",
              "pct": "12%",
              "ingredient": "Coconut water"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "9%",
              "ingredient": "Cardamom notes"
            }
          ]
        },
        "tea": {
          "name": "Incense & Starlight",
          "tagline": "Cardamom-forward herbal tea with delicate citrus whispers.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 200°F.",
            "Toast 1 tsp cardamom pods for 20 seconds in a dry pot.",
            "Crush pods lightly and add to infuser with 0.25 oz dried orange peel.",
            "Steep in hot water for 5 minutes.",
            "Remove infuser, add 0.5 tsp honey, stir and serve with a cardamom pod."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "200°F",
          "steepTime": "5 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Cardamom pods, dried orange peel, honey",
          "ingredients": [
            "6 oz Filtered water",
            "1 tsp Cardamom pods (toasted)",
            "0.25 oz Dried orange peel",
            "0.5 tsp Raw honey",
            "1 pod Cardamom pod"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "44%",
              "ingredient": "Orange peel"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "18%",
              "ingredient": "Cardamom warmth"
            },
            {
              "terpene": "Linalool",
              "pct": "12%",
              "ingredient": "Honey subtlety"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "9%",
              "ingredient": "Cardamom flower"
            }
          ]
        },
        "shot": {
          "name": "Giggly Burst",
          "tagline": "A playful punch of starfruit tartness and cardamom spice.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Pour 1 oz gin into shot glass.",
            "Add 0.5 oz fresh starfruit juice (strained).",
            "Top with 0.25 oz cardamom-honey syrup.",
            "Stir once to combine.",
            "Garnish with a thin cardamom seed or small starfruit slice."
          ],
          "temp": "Ice cold (chilled shot glass)",
          "timing": "Consume immediately",
          "ingredients": [
            "1 oz London Dry gin",
            "0.5 oz Fresh starfruit juice",
            "0.25 oz Cardamom-honey syrup",
            "1 piece Cardamom seed or starfruit slice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "44%",
              "ingredient": "Starfruit brightness"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "18%",
              "ingredient": "Cardamom + gin botanicals"
            },
            {
              "terpene": "Linalool",
              "pct": "12%",
              "ingredient": "Gin + honey"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "9%",
              "ingredient": "Cardamom essence"
            }
          ]
        }
      }
    },
    {
      "id": 4,
      "name": "Strawberry Biscotti",
      "farm": "Happy Day Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "Limonene": 0.38,
        "β-Caryophyllene": 0.29,
        "Myrcene": 0.25,
        "α-Bisabolol": 0.13
      },
      "terpeneRatios": {
        "Limonene": 36,
        "β-Caryophyllene": 28,
        "Myrcene": 24,
        "α-Bisabolol": 12
      },
      "dominantTerpene": "Limonene",
      "energyTier": "MEDIUM",
      "categories": [
        "cozyComfort"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Bergamot brings sophisticated citrus. Black pepper for caryophyllene. German chamomile for bisabolol. A touch of clove adds warmth.",
      "recipes": {
        "mocktail": {
          "name": "Curious Cozy",
          "tagline": "Caramelized strawberry sweetness grounded with cinnamon warmth.",
          "glass": "Rocks glass",
          "volume": "~5 oz",
          "method": [
            "Muddle 4-5 fresh strawberries (hulled) gently in shaker.",
            "Add 1 oz bergamot tea (cooled), 0.75 oz vanilla syrup, and ice.",
            "Shake for 8 seconds.",
            "Strain into rocks glass over large ice cube.",
            "Garnish with a cinnamon stick and strawberry slice."
          ],
          "temp": "Chilled",
          "ingredients": [
            "4-5 berries Fresh strawberries (muddled)",
            "1 oz Bergamot tea (cooled)",
            "0.75 oz Vanilla syrup",
            "1 stick Cinnamon stick (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "38%",
              "ingredient": "Strawberry + bergamot"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "29%",
              "ingredient": "Cinnamon"
            },
            {
              "terpene": "Myrcene",
              "pct": "25%",
              "ingredient": "Strawberry body"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "13%",
              "ingredient": "Chamomile tea notes"
            }
          ]
        },
        "cocktail": {
          "name": "Biscotti Bliss",
          "tagline": "Bourbon and strawberry with subtle clove warmth.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Muddle 5 fresh strawberries in mixing glass.",
            "Add 1.5 oz bourbon, 0.5 oz clove-cinnamon syrup, and 0.25 oz dry vermouth.",
            "Stir with ice for 12 seconds.",
            "Fine-strain into chilled coupe.",
            "Garnish with a fresh strawberry and cinnamon-dusted rim."
          ],
          "temp": "Cold (around 43°F)",
          "spirit": "Bourbon (100 proof)",
          "style": "Classic/stirred",
          "abv": "~34%",
          "ingredients": [
            "5 berries Fresh strawberries (muddled)",
            "1.5 oz Bourbon",
            "0.5 oz Clove-cinnamon syrup",
            "0.25 oz Dry vermouth",
            "1 berry Fresh strawberry & cinnamon rim"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "38%",
              "ingredient": "Strawberry"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "29%",
              "ingredient": "Clove + cinnamon syrup"
            },
            {
              "terpene": "Myrcene",
              "pct": "25%",
              "ingredient": "Strawberry fruit"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "13%",
              "ingredient": "Vermouth botanicals"
            }
          ]
        },
        "juice": {
          "name": "Berry Meditation",
          "tagline": "Cold-pressed strawberry with earthy cinnamon kiss.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 5 oz fresh strawberries (hulled).",
            "Strain through fine mesh.",
            "Add 2 oz oat milk and 0.5 oz vanilla extract (1-2 drops).",
            "Whisk in 0.25 oz cinnamon-honey syrup.",
            "Pour over crushed ice and garnish with a strawberry wheel and cinnamon dusting."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed smoothie blend",
          "timing": "Best consumed within 1 hour",
          "ingredients": [
            "5 oz Fresh strawberry (pressed)",
            "2 oz Oat milk",
            "1-2 drops Vanilla extract",
            "0.25 oz Cinnamon-honey syrup",
            "1 wheel Strawberry wheel & cinnamon"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "38%",
              "ingredient": "Strawberry brightness"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "29%",
              "ingredient": "Cinnamon"
            },
            {
              "terpene": "Myrcene",
              "pct": "25%",
              "ingredient": "Strawberry body"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "13%",
              "ingredient": "Oat milk warmth"
            }
          ]
        },
        "tea": {
          "name": "Kettle Corn Serenity",
          "tagline": "Chamberlain tea with strawberry warmth and cinnamon depth.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 190°F.",
            "Add 1 tbsp dried strawberry pieces and 1 cinnamon stick (broken) to infuser.",
            "Steep for 4 minutes, stirring gently.",
            "Remove infuser and add 0.5 tsp vanilla extract and 0.75 tsp honey.",
            "Stir and serve with a cinnamon stick."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "190°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried strawberry, cinnamon stick, vanilla, honey, chamomile",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Dried strawberry pieces",
            "1 stick Cinnamon stick (broken)",
            "0.5 tsp Vanilla extract",
            "0.75 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "38%",
              "ingredient": "Strawberry leaf"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "29%",
              "ingredient": "Cinnamon stick"
            },
            {
              "terpene": "Myrcene",
              "pct": "25%",
              "ingredient": "Strawberry warmth"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "13%",
              "ingredient": "Chamomile notes"
            }
          ]
        },
        "shot": {
          "name": "Sweet Curiosity",
          "tagline": "A bold strawberry and cinnamon moment of comfort.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Muddle 3 fresh strawberries in shot glass.",
            "Add 1 oz bourbon.",
            "Top with 0.25 oz cinnamon-honey syrup.",
            "Stir gently.",
            "Garnish with a pinch of cinnamon and a strawberry slice."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume immediately",
          "ingredients": [
            "3 berries Fresh strawberry (muddled)",
            "1 oz Bourbon",
            "0.25 oz Cinnamon-honey syrup",
            "pinch Cinnamon & strawberry"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "38%",
              "ingredient": "Strawberry"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "29%",
              "ingredient": "Cinnamon syrup"
            },
            {
              "terpene": "Myrcene",
              "pct": "25%",
              "ingredient": "Strawberry body"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "13%",
              "ingredient": "Honey warmth"
            }
          ]
        }
      }
    },
    {
      "id": 5,
      "name": "Pinnacle",
      "farm": "Dos Rios Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Caryophyllene": 0.61,
        "Limonene": 0.46,
        "α-Humulene": 0.19,
        "trans-β-Farnesene": 0.14
      },
      "terpeneRatios": {
        "β-Caryophyllene": 44,
        "Limonene": 33,
        "α-Humulene": 14,
        "trans-β-Farnesene": 10
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "LOW",
      "categories": [
        "deepRest"
      ],
      "badge": null,
      "oilRecipe": [
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
          "terpene": "Farnesene"
        },
        {
          "name": "Clove",
          "drops": 2,
          "terpene": "β-Caryophyllene"
        }
      ],
      "oilRationale": "The heaviest, most sedative strain. Black pepper and rosemary deliver concentrated caryophyllene. Ylang ylang amplifies the blissful farnesene effect.",
      "recipes": {
        "mocktail": {
          "name": "Velvet Descent",
          "tagline": "Coconut cream and nutmeg guide you into blissful surrender.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Heat 2 oz coconut cream gently (do not boil).",
            "Toast 0.25 tsp freshly grated nutmeg in small pot for 10 seconds.",
            "Whisk together coconut cream and nutmeg, remove from heat.",
            "Add 1 oz vanilla oat milk and 0.5 oz fennel seed tea (steeped).",
            "Pour into chilled coupe and float a small pinch of nutmeg on top."
          ],
          "temp": "Warm (145°F)",
          "ingredients": [
            "2 oz Coconut cream (warmed)",
            "0.25 tsp Freshly grated nutmeg",
            "1 oz Vanilla oat milk",
            "0.5 oz Fennel seed tea (cooled)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "61%",
              "ingredient": "Nutmeg + clove notes"
            },
            {
              "terpene": "Limonene",
              "pct": "46%",
              "ingredient": "Fennel seed oils"
            },
            {
              "terpene": "α-Humulene",
              "pct": "19%",
              "ingredient": "Nutmeg spice"
            },
            {
              "terpene": "trans-β-Farnesene",
              "pct": "14%",
              "ingredient": "Green apple from fennel"
            }
          ]
        },
        "cocktail": {
          "name": "Cognac Velvet",
          "tagline": "Cognac's richness deepens nutmeg and cream into sedative bliss.",
          "glass": "Snifter",
          "volume": "~4 oz",
          "method": [
            "Gently warm 1.5 oz VS cognac in a small saucepan (do not boil).",
            "Toast 0.25 tsp freshly grated nutmeg and 2-3 fennel seeds together for 15 seconds.",
            "Pour warm cognac into snifter.",
            "Whisk in 1.5 oz coconut cream carefully.",
            "Float spiced mixture on top and garnish with a nutmeg dusting."
          ],
          "temp": "Warm (140°F)",
          "spirit": "VS Cognac (40% ABV)",
          "style": "Warm/stirred",
          "abv": "~30%",
          "ingredients": [
            "1.5 oz VS Cognac (warmed)",
            "1.5 oz Coconut cream",
            "0.25 tsp Freshly grated nutmeg",
            "2-3 seeds Fennel seeds (toasted)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "61%",
              "ingredient": "Nutmeg + cognac spice"
            },
            {
              "terpene": "Limonene",
              "pct": "46%",
              "ingredient": "Cognac citrus + fennel"
            },
            {
              "terpene": "α-Humulene",
              "pct": "19%",
              "ingredient": "Nutmeg essence"
            },
            {
              "terpene": "trans-β-Farnesene",
              "pct": "14%",
              "ingredient": "Apple-like from fennel"
            }
          ]
        },
        "juice": {
          "name": "Cream Meditation",
          "tagline": "Creamy, spiced, with gentle green apple undertones.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Blend 2 oz fresh pear juice with 3 oz oat milk until smooth.",
            "Add 0.5 oz coconut cream and 0.25 tsp freshly grated nutmeg.",
            "Whisk in 0.5 oz fennel seed tea (steeped, cooled).",
            "Pour into glass filled with regular ice.",
            "Garnish with a thin pear slice and nutmeg dust."
          ],
          "temp": "Chilled (around 45°F)",
          "format": "Creamy blended beverage",
          "timing": "Serve immediately after preparation",
          "ingredients": [
            "2 oz Fresh pear juice",
            "3 oz Oat milk",
            "0.5 oz Coconut cream",
            "0.25 tsp Freshly grated nutmeg",
            "0.5 oz Fennel seed tea (cooled)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "61%",
              "ingredient": "Nutmeg spice"
            },
            {
              "terpene": "Limonene",
              "pct": "46%",
              "ingredient": "Pear + fennel oils"
            },
            {
              "terpene": "α-Humulene",
              "pct": "19%",
              "ingredient": "Nutmeg warmth"
            },
            {
              "terpene": "trans-β-Farnesene",
              "pct": "14%",
              "ingredient": "Pear essence"
            }
          ]
        },
        "tea": {
          "name": "Nutmeg Dream",
          "tagline": "Warming fennel and nutmeg tea for deep rest.",
          "glass": "Teacup with saucer",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Toast 1 tsp fennel seeds and 1 clove together for 20 seconds.",
            "Add to infuser with 0.25 tsp freshly grated nutmeg.",
            "Steep for 5 minutes in 6 oz water.",
            "Remove infuser, stir in 1 tsp honey and 0.5 oz coconut cream, serve with nutmeg dust."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "185°F",
          "steepTime": "5 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Fennel seeds, clove, nutmeg, honey, coconut cream",
          "ingredients": [
            "6 oz Filtered water",
            "1 tsp Fennel seeds (toasted)",
            "1 piece Clove",
            "0.25 tsp Freshly grated nutmeg",
            "1 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "61%",
              "ingredient": "Nutmeg + clove"
            },
            {
              "terpene": "Limonene",
              "pct": "46%",
              "ingredient": "Fennel + clove oils"
            },
            {
              "terpene": "α-Humulene",
              "pct": "19%",
              "ingredient": "Nutmeg essence"
            },
            {
              "terpene": "trans-β-Farnesene",
              "pct": "14%",
              "ingredient": "Fennel spice"
            }
          ]
        },
        "shot": {
          "name": "Blissful Surrender",
          "tagline": "A warming spiced shot of nutmeg and cognac richness.",
          "glass": "Cordial glass",
          "volume": "~1.5 oz",
          "method": [
            "Pour 1 oz VS cognac into cordial glass.",
            "Add 0.5 oz coconut cream (room temperature).",
            "Stir gently to combine.",
            "Top with freshly grated nutmeg (about 0.125 tsp).",
            "Garnish with a pinch of fennel seed on the rim."
          ],
          "temp": "Room temperature",
          "timing": "Consume at leisure (sip slowly)",
          "ingredients": [
            "1 oz VS Cognac",
            "0.5 oz Coconut cream",
            "0.125 tsp Freshly grated nutmeg",
            "pinch Fennel seed"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "61%",
              "ingredient": "Nutmeg + cognac spice"
            },
            {
              "terpene": "Limonene",
              "pct": "46%",
              "ingredient": "Cognac + fennel"
            },
            {
              "terpene": "α-Humulene",
              "pct": "19%",
              "ingredient": "Nutmeg warmth"
            },
            {
              "terpene": "trans-β-Farnesene",
              "pct": "14%",
              "ingredient": "Fennel essence"
            }
          ]
        }
      }
    },
    {
      "id": 6,
      "name": "Tropical Sleigh Ride",
      "farm": "Greenshock Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Ocimene": 0.71,
        "β-Caryophyllene": 0.7,
        "α-Humulene": 0.28,
        "Limonene": 0.22
      },
      "terpeneRatios": {
        "β-Ocimene": 37,
        "β-Caryophyllene": 37,
        "α-Humulene": 15,
        "Limonene": 12
      },
      "dominantTerpene": "β-Ocimene",
      "energyTier": "HIGH",
      "categories": [
        "creativeFlow",
        "euphoricLift"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Basil delivers the rare ocimene (35% of blend). Black pepper for the heavy caryophyllene. Peppermint captures the distinctive aroma.",
      "recipes": {
        "mocktail": {
          "name": "Mint Lift",
          "tagline": "Fresh mint and ginger sparkle with tropical joy and clarity.",
          "glass": "Highball",
          "volume": "~8 oz",
          "method": [
            "Muddle 8-10 fresh mint leaves gently in shaker.",
            "Add 0.5 oz fresh ginger juice, 2 oz grapefruit juice, and 0.75 oz elderflower cordial.",
            "Fill with ice and shake for 10 seconds.",
            "Strain into highball glass filled with crushed ice.",
            "Top with 2 oz sparkling water and garnish with mint sprig and grapefruit wheel."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "8-10 leaves Fresh mint (muddled)",
            "0.5 oz Fresh ginger juice",
            "2 oz Fresh grapefruit juice",
            "0.75 oz Elderflower cordial",
            "2 oz Sparkling water"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Ocimene",
              "pct": "71%",
              "ingredient": "Fresh mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "70%",
              "ingredient": "Ginger + mint spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "28%",
              "ingredient": "Ginger + mint warmth"
            },
            {
              "terpene": "Limonene",
              "pct": "22%",
              "ingredient": "Grapefruit + elderflower"
            }
          ]
        },
        "cocktail": {
          "name": "Tiki Clarity",
          "tagline": "White rum carries mint, ginger, and grapefruit into euphoric focus.",
          "glass": "Tiki mug",
          "volume": "~7 oz",
          "method": [
            "Muddle 10 fresh mint leaves in mixing glass.",
            "Add 1.5 oz white rum, 1 oz grapefruit juice, 0.5 oz fresh ginger juice, and 0.25 oz elderflower cordial.",
            "Shake vigorously with ice for 12 seconds.",
            "Strain into tiki mug filled with crushed ice.",
            "Garnish with mint sprig, grapefruit wheel, and candied ginger slice."
          ],
          "temp": "Ice cold",
          "spirit": "White rum or pisco (40% ABV)",
          "style": "Tropical/shaken",
          "abv": "~28%",
          "ingredients": [
            "10 leaves Fresh mint (muddled)",
            "1.5 oz White rum",
            "1 oz Fresh grapefruit juice",
            "0.5 oz Fresh ginger juice",
            "0.25 oz Elderflower cordial"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Ocimene",
              "pct": "71%",
              "ingredient": "Fresh mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "70%",
              "ingredient": "Ginger spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "28%",
              "ingredient": "Ginger + mint essence"
            },
            {
              "terpene": "Limonene",
              "pct": "22%",
              "ingredient": "Grapefruit brightness"
            }
          ]
        },
        "juice": {
          "name": "Clarity Blend",
          "tagline": "Cold-pressed mint and ginger with grapefruit brilliance.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 2 oz fresh mint leaves (with stems).",
            "Strain through fine mesh.",
            "Cold-press 0.5 oz fresh ginger (unpeeled) and combine.",
            "Add 3 oz fresh grapefruit juice and 1 oz coconut water.",
            "Pour over ice and garnish with mint sprig and grapefruit wheel."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1 hour of pressing",
          "ingredients": [
            "2 oz Fresh mint (pressed)",
            "0.5 oz Fresh ginger (pressed)",
            "3 oz Fresh grapefruit juice",
            "1 oz Coconut water",
            "1 each Mint sprig & grapefruit wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Ocimene",
              "pct": "71%",
              "ingredient": "Mint juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "70%",
              "ingredient": "Ginger spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "28%",
              "ingredient": "Ginger essence"
            },
            {
              "terpene": "Limonene",
              "pct": "22%",
              "ingredient": "Grapefruit + mint oils"
            }
          ]
        },
        "tea": {
          "name": "Mint Meditation",
          "tagline": "Cooling mint and warming ginger tea for alert serenity.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 195°F.",
            "Add 1 tbsp fresh mint leaves (lightly bruised) to infuser.",
            "Add 3-4 thin ginger slices and 2-3 honeysuckle flowers (or dried).",
            "Steep for 4 minutes.",
            "Remove infuser, add 0.5 tsp honey, stir and serve with mint leaf."
          ],
          "temp": "Warm (170°F when served)",
          "steepTemp": "195°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Fresh mint, fresh ginger, honeysuckle flowers, honey",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Fresh mint leaves (bruised)",
            "3-4 slices Fresh ginger slices",
            "2-3 flowers Honeysuckle flowers (dried)",
            "0.5 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Ocimene",
              "pct": "71%",
              "ingredient": "Mint leaf infusion"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "70%",
              "ingredient": "Ginger spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "28%",
              "ingredient": "Ginger essence"
            },
            {
              "terpene": "Limonene",
              "pct": "22%",
              "ingredient": "Honeysuckle + ginger"
            }
          ]
        },
        "shot": {
          "name": "Euphoric Rush",
          "tagline": "A vibrant ginger-mint spark with tropical clarity.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Muddle 5 fresh mint leaves in shot glass.",
            "Add 1 oz white rum.",
            "Top with 0.5 oz fresh ginger-grapefruit juice (blended).",
            "Stir once.",
            "Garnish with a single mint leaf and thin ginger slice."
          ],
          "temp": "Ice cold (chilled shot glass)",
          "timing": "Consume immediately",
          "ingredients": [
            "5 leaves Fresh mint (muddled)",
            "1 oz White rum",
            "0.5 oz Fresh ginger-grapefruit juice",
            "1 each Mint leaf & ginger slice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Ocimene",
              "pct": "71%",
              "ingredient": "Fresh mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "70%",
              "ingredient": "Ginger"
            },
            {
              "terpene": "α-Humulene",
              "pct": "28%",
              "ingredient": "Ginger warmth"
            },
            {
              "terpene": "Limonene",
              "pct": "22%",
              "ingredient": "Grapefruit"
            }
          ]
        }
      }
    },
    {
      "id": 7,
      "name": "Pink Jesus Reserve",
      "farm": "Sonoma Hills Farm",
      "region": "Sonoma",
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
      "terpenes": {
        "β-Caryophyllene": 0.78,
        "Myrcene": 0.38,
        "α-Humulene": 0.27,
        "α-Bisabolol": 0.15
      },
      "terpeneRatios": {
        "β-Caryophyllene": 49,
        "Myrcene": 24,
        "α-Humulene": 17,
        "α-Bisabolol": 9
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "HIGH",
      "categories": [
        "socialBright",
        "euphoricLift"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Black pepper anchors the high caryophyllene. Lavender captures the French lavender aroma. German chamomile for bisabolol.",
      "recipes": {
        "mocktail": {
          "name": "Lavender Euphoria",
          "tagline": "Raspberry and lavender in perfect harmony with pineapple brightness.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Add 1.5 oz fresh raspberry puree to shaker.",
            "Add 1 oz pineapple juice, 0.5 oz culinary lavender syrup, and ice.",
            "Shake for 8 seconds until frothy.",
            "Fine-strain into chilled coupe.",
            "Garnish with a candied pineapple ring and culinary lavender flower."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "1.5 oz Fresh raspberry puree",
            "1 oz Fresh pineapple juice",
            "0.5 oz Culinary lavender syrup",
            "1 ring Candied pineapple ring"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "78%",
              "ingredient": "Lavender + raspberry"
            },
            {
              "terpene": "Myrcene",
              "pct": "38%",
              "ingredient": "Raspberry body"
            },
            {
              "terpene": "α-Humulene",
              "pct": "27%",
              "ingredient": "Lavender warmth"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "15%",
              "ingredient": "Lavender flower essence"
            }
          ]
        },
        "cocktail": {
          "name": "Lavender Lift",
          "tagline": "Gin's botanicals blend with raspberry and lavender into pure euphoria.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Combine 1.5 oz London Dry gin with 1.25 oz fresh raspberry puree in mixing glass.",
            "Add 0.5 oz pineapple juice and 0.5 oz culinary lavender syrup.",
            "Stir with ice for 12 seconds.",
            "Strain into chilled coupe over a large clear ice cube.",
            "Garnish with candied pineapple ring and lavender flower."
          ],
          "temp": "Cold (around 40°F)",
          "spirit": "London Dry Gin (47% ABV)",
          "style": "Botanical/stirred",
          "abv": "~32%",
          "ingredients": [
            "1.5 oz London Dry gin",
            "1.25 oz Fresh raspberry puree",
            "0.5 oz Fresh pineapple juice",
            "0.5 oz Culinary lavender syrup",
            "1 each Candied pineapple & lavender"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "78%",
              "ingredient": "Lavender + gin botanicals"
            },
            {
              "terpene": "Myrcene",
              "pct": "38%",
              "ingredient": "Raspberry body"
            },
            {
              "terpene": "α-Humulene",
              "pct": "27%",
              "ingredient": "Lavender + gin warmth"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "15%",
              "ingredient": "Lavender flower"
            }
          ]
        },
        "juice": {
          "name": "Floral Euphoria",
          "tagline": "Pressed raspberry and pineapple with delicate lavender notes.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 4 oz fresh raspberries.",
            "Strain through fine mesh.",
            "Cold-press 2 oz fresh pineapple and combine.",
            "Add 0.5 oz culinary lavender water (steeped 10 min).",
            "Pour over ice and garnish with raspberry, pineapple wheel, and lavender flower."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1 hour of pressing",
          "ingredients": [
            "4 oz Fresh raspberry (pressed)",
            "2 oz Fresh pineapple (pressed)",
            "0.5 oz Culinary lavender water",
            "1 each Raspberry, pineapple & lavender"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "78%",
              "ingredient": "Lavender warmth"
            },
            {
              "terpene": "Myrcene",
              "pct": "38%",
              "ingredient": "Raspberry fruit"
            },
            {
              "terpene": "α-Humulene",
              "pct": "27%",
              "ingredient": "Lavender essence"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "15%",
              "ingredient": "Lavender flower"
            }
          ]
        },
        "tea": {
          "name": "Lavender Dream",
          "tagline": "Floral lavender with berry warmth for uplifting serenity.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 190°F.",
            "Add 1 tbsp dried lavender buds and 0.5 oz dried raspberry leaf to infuser.",
            "Steep for 4 minutes, stirring gently.",
            "Remove infuser and add 0.5 oz pineapple juice and 0.75 tsp honey.",
            "Stir and serve with a lavender flower."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "190°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried lavender, raspberry leaf, pineapple, honey",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Dried lavender buds",
            "0.5 oz Dried raspberry leaf",
            "0.5 oz Fresh pineapple juice",
            "0.75 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "78%",
              "ingredient": "Lavender essence"
            },
            {
              "terpene": "Myrcene",
              "pct": "38%",
              "ingredient": "Raspberry leaf"
            },
            {
              "terpene": "α-Humulene",
              "pct": "27%",
              "ingredient": "Lavender warmth"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "15%",
              "ingredient": "Lavender flower"
            }
          ]
        },
        "shot": {
          "name": "Social Spark",
          "tagline": "Raspberry and lavender with pineapple brightness in one buoyant moment.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Combine 1 oz gin with 0.4 oz fresh raspberry puree in shot glass.",
            "Add 0.2 oz fresh pineapple juice.",
            "Top with 0.1 oz culinary lavender syrup.",
            "Stir gently.",
            "Garnish with a single fresh raspberry and lavender flower."
          ],
          "temp": "Ice cold (chilled shot glass)",
          "timing": "Consume immediately",
          "ingredients": [
            "1 oz Gin",
            "0.4 oz Fresh raspberry puree",
            "0.2 oz Fresh pineapple juice",
            "0.1 oz Culinary lavender syrup"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "78%",
              "ingredient": "Lavender + gin botanicals"
            },
            {
              "terpene": "Myrcene",
              "pct": "38%",
              "ingredient": "Raspberry essence"
            },
            {
              "terpene": "α-Humulene",
              "pct": "27%",
              "ingredient": "Lavender warmth"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "15%",
              "ingredient": "Lavender flower"
            }
          ]
        }
      }
    },
    {
      "id": 8,
      "name": "Mule Fuel",
      "farm": "Alpenglow Farms",
      "region": "Humboldt",
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
      "terpenes": {
        "Myrcene": 2.22,
        "α-Pinene": 0.54,
        "β-Caryophyllene": 0.34,
        "Limonene": 0.28
      },
      "terpeneRatios": {
        "Myrcene": 66,
        "α-Pinene": 16,
        "β-Caryophyllene": 10,
        "Limonene": 8
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "LOW",
      "categories": [
        "deepRest",
        "bodyMelt"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Exceptionally high myrcene (2.22%) makes this the most sedating strain. Lemongrass dominates (50%). Pine captures the pinene for a brief clarity window.",
      "recipes": {
        "mocktail": {
          "name": "Lemongrass Rest",
          "tagline": "Lemongrass and lemon with gentle leather-like rosemary earthiness.",
          "glass": "Highball",
          "volume": "~8 oz",
          "method": [
            "Steep 1 tbsp fresh lemongrass (bruised) in 2 oz hot water (150°F) for 5 minutes.",
            "Strain and cool.",
            "Combine lemongrass water with 2 oz fresh lemon juice in highball glass over ice.",
            "Add 0.75 oz rosemary simple syrup.",
            "Top with 2 oz ginger ale and garnish with lemongrass stalk and lemon wheel."
          ],
          "temp": "Chilled",
          "ingredients": [
            "2 oz Lemongrass-steeped water",
            "2 oz Fresh lemon juice",
            "0.75 oz Rosemary simple syrup",
            "2 oz Ginger ale",
            "1 each Lemongrass stalk & lemon wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "222%",
              "ingredient": "Lemongrass infusion (primary)"
            },
            {
              "terpene": "α-Pinene",
              "pct": "54%",
              "ingredient": "Rosemary + lemongrass"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "34%",
              "ingredient": "Rosemary spice"
            },
            {
              "terpene": "Limonene",
              "pct": "28%",
              "ingredient": "Lemon + lemongrass oils"
            }
          ]
        },
        "cocktail": {
          "name": "Dark Comfort",
          "tagline": "Dark rum's depth settles with lemongrass and diesel warmth.",
          "glass": "Rocks glass",
          "volume": "~5 oz",
          "method": [
            "Steep 1 tbsp fresh lemongrass (bruised) in 1 oz dark rum for 30 seconds, stirring constantly.",
            "Strain out lemongrass.",
            "Add 1.5 oz additional dark rum, 0.5 oz fresh lemon juice, and 0.5 oz rosemary-bay leaf syrup.",
            "Stir with large ice cubes for 15 seconds.",
            "Serve over one large ice cube and garnish with bay leaf and lemon peel."
          ],
          "temp": "Cold (around 45°F)",
          "spirit": "Dark rum (80 proof)",
          "style": "Classic/stirred",
          "abv": "~35%",
          "ingredients": [
            "2.5 oz Dark rum (infused)",
            "1 tbsp Fresh lemongrass (stir-infuse)",
            "0.5 oz Fresh lemon juice",
            "0.5 oz Rosemary-bay leaf syrup",
            "1 each Bay leaf & lemon peel"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "222%",
              "ingredient": "Lemongrass infusion"
            },
            {
              "terpene": "α-Pinene",
              "pct": "54%",
              "ingredient": "Rosemary + bay + lemongrass"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "34%",
              "ingredient": "Rosemary + bay spice"
            },
            {
              "terpene": "Limonene",
              "pct": "28%",
              "ingredient": "Lemon brightness"
            }
          ]
        },
        "juice": {
          "name": "Sleepy Lemon",
          "tagline": "Cold-pressed lemongrass and lemon with earthy rosemary finish.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 3 oz fresh lemongrass (with leaves).",
            "Strain through fine mesh.",
            "Cold-press 2 oz fresh lemon (with peel).",
            "Combine juices with 1.5 oz rosemary-bay leaf water (steeped 15 min).",
            "Pour over ice and garnish with lemongrass blade and bay leaf."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1 hour of pressing",
          "ingredients": [
            "3 oz Fresh lemongrass (pressed)",
            "2 oz Fresh lemon (pressed)",
            "1.5 oz Rosemary-bay leaf water",
            "1 each Lemongrass & bay leaf"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "222%",
              "ingredient": "Lemongrass juice"
            },
            {
              "terpene": "α-Pinene",
              "pct": "54%",
              "ingredient": "Lemongrass + rosemary + bay"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "34%",
              "ingredient": "Rosemary + bay leaf"
            },
            {
              "terpene": "Limonene",
              "pct": "28%",
              "ingredient": "Lemon + lemongrass"
            }
          ]
        },
        "tea": {
          "name": "Herb Quietude",
          "tagline": "Lemongrass and lemon tea with deep rosemary-bay calm.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Lightly bruise 1 tbsp fresh lemongrass and add to infuser.",
            "Add 1 bay leaf and 0.5 tsp dried rosemary.",
            "Steep for 5 minutes.",
            "Remove infuser, add 1 tsp honey and 0.5 oz fresh lemon juice, stir and serve with bay leaf."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "185°F",
          "steepTime": "5 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Fresh lemongrass, bay leaf, dried rosemary, honey, lemon",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Fresh lemongrass (bruised)",
            "1 leaf Bay leaf",
            "0.5 tsp Dried rosemary",
            "0.5 oz Fresh lemon juice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "222%",
              "ingredient": "Lemongrass leaf infusion"
            },
            {
              "terpene": "α-Pinene",
              "pct": "54%",
              "ingredient": "Rosemary + lemongrass + bay"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "34%",
              "ingredient": "Rosemary + bay essence"
            },
            {
              "terpene": "Limonene",
              "pct": "28%",
              "ingredient": "Lemon juice"
            }
          ]
        },
        "shot": {
          "name": "Fuel Descent",
          "tagline": "A grounding fuel-forward moment with lemon brightness.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Steep 0.5 tsp fresh lemongrass in 1 oz dark rum for 20 seconds, stirring.",
            "Strain out lemongrass.",
            "Add 0.5 oz fresh lemon juice to shot glass.",
            "Pour spiced rum over.",
            "Garnish with a tiny bay leaf and lemongrass blade."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume immediately",
          "ingredients": [
            "1.5 oz Dark rum (infused)",
            "0.5 tsp Fresh lemongrass (stir-infuse)",
            "0.5 oz Fresh lemon juice",
            "pinch Bay leaf & lemongrass blade"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "222%",
              "ingredient": "Lemongrass essence"
            },
            {
              "terpene": "α-Pinene",
              "pct": "54%",
              "ingredient": "Lemongrass + bay oils"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "34%",
              "ingredient": "Rum spice + bay"
            },
            {
              "terpene": "Limonene",
              "pct": "28%",
              "ingredient": "Lemon + lemongrass oils"
            }
          ]
        }
      }
    },
    {
      "id": 9,
      "name": "Love and Laughter",
      "farm": "Heartrock Mountain Farm",
      "region": "Mendocino",
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
      "terpenes": {
        "Myrcene": 0.56,
        "Terpinolene": 0.28,
        "β-Caryophyllene": 0.2,
        "α-Pinene": 0.13
      },
      "terpeneRatios": {
        "Myrcene": 48,
        "Terpinolene": 24,
        "β-Caryophyllene": 17,
        "α-Pinene": 11
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "HIGH",
      "categories": [
        "calmFocus"
      ],
      "badge": "CBD",
      "oilRecipe": [
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
      "oilRationale": "The only CBD strain. Lemongrass for myrcene. Tea tree captures the rare terpinolene. Eucalyptus matches the aroma and adds clarity.",
      "recipes": {
        "mocktail": {
          "name": "Green Apple Focus",
          "tagline": "Green apple clarity with eucalyptus and berry brightness for clear focus.",
          "glass": "Rocks glass",
          "volume": "~5 oz",
          "method": [
            "Combine 2 oz fresh green apple juice with 1 oz mixed berry juice (blueberry + strawberry) in shaker.",
            "Add 0.5 oz eucalyptus honey water (steeped 5 min).",
            "Add 0.25 oz fresh rosemary-infused simple syrup and ice.",
            "Shake for 8 seconds.",
            "Strain into rocks glass over large ice cube and garnish with apple slice and rosemary sprig."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "2 oz Fresh green apple juice",
            "1 oz Mixed berry juice",
            "0.5 oz Eucalyptus honey water",
            "0.25 oz Rosemary-simple syrup",
            "1 each Apple slice & rosemary sprig"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "56%",
              "ingredient": "Berry juice"
            },
            {
              "terpene": "Terpinolene",
              "pct": "28%",
              "ingredient": "Green apple clarity"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "20%",
              "ingredient": "Rosemary spice"
            },
            {
              "terpene": "α-Pinene",
              "pct": "13%",
              "ingredient": "Eucalyptus + rosemary"
            }
          ]
        },
        "cocktail": {
          "name": "Focused Gin",
          "tagline": "Gin's clarity sharpened by green apple, eucalyptus, and rosemary.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Combine 1.5 oz London Dry gin with 1.5 oz fresh green apple juice in mixing glass.",
            "Add 0.75 oz mixed berry juice, 0.5 oz eucalyptus honey water, and 0.25 oz rosemary syrup.",
            "Stir with ice for 12 seconds.",
            "Strain into chilled coupe over large ice cube.",
            "Garnish with apple peel and rosemary sprig."
          ],
          "temp": "Cold (around 40°F)",
          "spirit": "London Dry Gin (47% ABV)",
          "style": "Botanical/stirred",
          "abv": "~32%",
          "ingredients": [
            "1.5 oz London Dry gin",
            "1.5 oz Fresh green apple juice",
            "0.75 oz Mixed berry juice",
            "0.5 oz Eucalyptus honey water",
            "0.25 oz Rosemary syrup"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "56%",
              "ingredient": "Berry juice"
            },
            {
              "terpene": "Terpinolene",
              "pct": "28%",
              "ingredient": "Green apple + gin botanicals"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "20%",
              "ingredient": "Rosemary + gin spice"
            },
            {
              "terpene": "α-Pinene",
              "pct": "13%",
              "ingredient": "Eucalyptus + rosemary oils"
            }
          ]
        },
        "juice": {
          "name": "Clear Mind",
          "tagline": "Pressed green apple and berries with eucalyptus clarity.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 3 oz fresh green apple (with skin).",
            "Strain through fine mesh.",
            "Cold-press 1.5 oz mixed berries (blueberry + strawberry).",
            "Combine with 1 oz eucalyptus honey water and 0.5 oz fresh rosemary water (steeped).",
            "Pour over ice and garnish with apple slice and fresh flowers."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1.5 hours of pressing",
          "ingredients": [
            "3 oz Fresh green apple (pressed)",
            "1.5 oz Mixed berries (pressed)",
            "1 oz Eucalyptus honey water",
            "0.5 oz Fresh rosemary water",
            "1 each Apple slice & edible flowers"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "56%",
              "ingredient": "Berry juice"
            },
            {
              "terpene": "Terpinolene",
              "pct": "28%",
              "ingredient": "Green apple clarity"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "20%",
              "ingredient": "Rosemary + eucalyptus"
            },
            {
              "terpene": "α-Pinene",
              "pct": "13%",
              "ingredient": "Eucalyptus + rosemary"
            }
          ]
        },
        "tea": {
          "name": "Eucalyptus Clarity",
          "tagline": "Cool eucalyptus and berry tea for steady focus and calm.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Add 0.5 tsp dried eucalyptus leaves and 1 tbsp dried mixed berries to infuser.",
            "Add 0.5 tsp fresh rosemary (minced).",
            "Steep for 3 minutes.",
            "Remove infuser, add 0.5 oz fresh green apple juice and 0.5 tsp eucalyptus honey, stir and serve."
          ],
          "temp": "Warm (160°F when served)",
          "steepTemp": "185°F",
          "steepTime": "3 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Eucalyptus leaf, dried berries, fresh rosemary, green apple, eucalyptus honey",
          "ingredients": [
            "6 oz Filtered water",
            "0.5 tsp Dried eucalyptus leaves",
            "1 tbsp Dried mixed berries",
            "0.5 tsp Fresh rosemary (minced)",
            "0.5 oz Fresh green apple juice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "56%",
              "ingredient": "Dried berry blend"
            },
            {
              "terpene": "Terpinolene",
              "pct": "28%",
              "ingredient": "Green apple juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "20%",
              "ingredient": "Rosemary + eucalyptus warmth"
            },
            {
              "terpene": "α-Pinene",
              "pct": "13%",
              "ingredient": "Eucalyptus + rosemary oils"
            }
          ]
        },
        "shot": {
          "name": "Focused Burst",
          "tagline": "A bright, clear-minded spark of green apple and floral focus.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Combine 0.75 oz pisco with 0.5 oz fresh green apple juice in shot glass.",
            "Add 0.25 oz mixed berry juice.",
            "Top with 1-2 drops of eucalyptus honey.",
            "Stir once.",
            "Garnish with a tiny apple slice and fresh rosemary leaf."
          ],
          "temp": "Ice cold (chilled shot glass)",
          "timing": "Consume immediately",
          "ingredients": [
            "0.75 oz Pisco",
            "0.5 oz Fresh green apple juice",
            "0.25 oz Mixed berry juice",
            "1-2 drops Eucalyptus honey"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "56%",
              "ingredient": "Berry juice"
            },
            {
              "terpene": "Terpinolene",
              "pct": "28%",
              "ingredient": "Green apple + pisco"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "20%",
              "ingredient": "Pisco + eucalyptus"
            },
            {
              "terpene": "α-Pinene",
              "pct": "13%",
              "ingredient": "Eucalyptus essence"
            }
          ]
        }
      }
    },
    {
      "id": 10,
      "name": "Blueberry Muffin",
      "farm": "Briceland Forest Farm",
      "region": "Humboldt",
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
      "terpenes": {
        "β-Caryophyllene": 0.47,
        "Myrcene": 0.4,
        "α-Bisabolol": 0.25,
        "α-Humulene": 0.16
      },
      "terpeneRatios": {
        "β-Caryophyllene": 37,
        "Myrcene": 31,
        "α-Bisabolol": 20,
        "α-Humulene": 13
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "LOW",
      "categories": [
        "cozyComfort",
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Black pepper and lemongrass anchor the caryophyllene and myrcene. German chamomile brings bisabolol for a soft, calming quality.",
      "recipes": {
        "mocktail": {
          "name": "Cozy Blueberry",
          "tagline": "Soft blueberry sweetness with vanilla and cinnamon wrapped in cream.",
          "glass": "Rocks glass",
          "volume": "~5.5 oz",
          "method": [
            "Muddle 6-8 fresh blueberries gently in rocks glass.",
            "Add 1 oz vanilla oat milk and 0.75 oz cinnamon-honey syrup.",
            "Add 2-3 large ice cubes.",
            "Top with 1.5 oz chilled chamomile tea and stir gently.",
            "Garnish with fresh blueberry and cinnamon stick."
          ],
          "temp": "Chilled",
          "ingredients": [
            "6-8 berries Fresh blueberries (muddled)",
            "1 oz Vanilla oat milk",
            "0.75 oz Cinnamon-honey syrup",
            "1.5 oz Chilled chamomile tea",
            "1 each Blueberry & cinnamon stick"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Cinnamon"
            },
            {
              "terpene": "Myrcene",
              "pct": "40%",
              "ingredient": "Blueberry fruit"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "25%",
              "ingredient": "Chamomile flower"
            },
            {
              "terpene": "α-Humulene",
              "pct": "16%",
              "ingredient": "Cinnamon + chamomile warmth"
            }
          ]
        },
        "cocktail": {
          "name": "Bourbon Berry Comfort",
          "tagline": "Bourbon and blueberry with vanilla cinnamon warmth.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Muddle 8 fresh blueberries in mixing glass.",
            "Add 1.5 oz bourbon, 0.5 oz vanilla syrup, and 0.25 oz cinnamon-infused simple syrup.",
            "Stir with ice for 12 seconds.",
            "Fine-strain into chilled coupe.",
            "Garnish with fresh blueberry and cinnamon-dusted rim."
          ],
          "temp": "Cold (around 43°F)",
          "spirit": "Bourbon (100 proof)",
          "style": "Classic/stirred",
          "abv": "~34%",
          "ingredients": [
            "8 berries Fresh blueberries (muddled)",
            "1.5 oz Bourbon",
            "0.5 oz Vanilla syrup",
            "0.25 oz Cinnamon-simple syrup",
            "1 berry Blueberry & cinnamon rim"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Cinnamon syrup"
            },
            {
              "terpene": "Myrcene",
              "pct": "40%",
              "ingredient": "Blueberry fruit"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "25%",
              "ingredient": "Vanilla + chamomile notes"
            },
            {
              "terpene": "α-Humulene",
              "pct": "16%",
              "ingredient": "Cinnamon + bourbon warmth"
            }
          ]
        },
        "juice": {
          "name": "Blueberry Dream",
          "tagline": "Cold-pressed blueberry with vanilla warmth and subtle cinnamon.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 5 oz fresh blueberries.",
            "Strain through fine mesh.",
            "Add 2 oz vanilla oat milk and stir gently.",
            "Whisk in 0.5 oz cinnamon-honey syrup.",
            "Pour over regular ice and garnish with blueberry and cinnamon dusting."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed smoothie blend",
          "timing": "Best consumed within 1 hour",
          "ingredients": [
            "5 oz Fresh blueberry (pressed)",
            "2 oz Vanilla oat milk",
            "0.5 oz Cinnamon-honey syrup",
            "1 berry + pinch Blueberry & cinnamon"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Cinnamon"
            },
            {
              "terpene": "Myrcene",
              "pct": "40%",
              "ingredient": "Blueberry body"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "25%",
              "ingredient": "Oat milk + honey notes"
            },
            {
              "terpene": "α-Humulene",
              "pct": "16%",
              "ingredient": "Cinnamon warmth"
            }
          ]
        },
        "tea": {
          "name": "Blueberry Muffin Tea",
          "tagline": "Blueberry and chamomile with real cinnamon for quiet peace.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Add 1 tbsp dried blueberry pieces and 1 cinnamon stick (broken) to infuser.",
            "Add 0.5 tsp dried chamomile flowers.",
            "Steep for 4 minutes, stirring gently.",
            "Remove infuser, add 1 tsp honey and 0.25 oz vanilla extract (1-2 drops), stir and serve."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "185°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried blueberry, cinnamon stick, chamomile, honey, vanilla",
          "ingredients": [
            "6 oz Filtered water",
            "1 tbsp Dried blueberry pieces",
            "1 stick Cinnamon stick (broken)",
            "0.5 tsp Dried chamomile flowers",
            "1 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Cinnamon stick"
            },
            {
              "terpene": "Myrcene",
              "pct": "40%",
              "ingredient": "Dried blueberry"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "25%",
              "ingredient": "Chamomile flower"
            },
            {
              "terpene": "α-Humulene",
              "pct": "16%",
              "ingredient": "Cinnamon + chamomile warmth"
            }
          ]
        },
        "shot": {
          "name": "Muffin Moment",
          "tagline": "A cozy blueberry and cinnamon moment of comfort.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Muddle 4 fresh blueberries in shot glass.",
            "Add 1 oz bourbon.",
            "Top with 0.25 oz cinnamon-honey syrup.",
            "Stir gently.",
            "Garnish with a blueberry and tiny cinnamon stick or dusting."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume immediately",
          "ingredients": [
            "4 berries Fresh blueberry (muddled)",
            "1 oz Bourbon",
            "0.25 oz Cinnamon-honey syrup",
            "1 berry + pinch Blueberry & cinnamon"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "pct": "47%",
              "ingredient": "Cinnamon syrup"
            },
            {
              "terpene": "Myrcene",
              "pct": "40%",
              "ingredient": "Blueberry"
            },
            {
              "terpene": "α-Bisabolol",
              "pct": "25%",
              "ingredient": "Honey notes"
            },
            {
              "terpene": "α-Humulene",
              "pct": "16%",
              "ingredient": "Cinnamon + bourbon warmth"
            }
          ]
        }
      }
    },
    {
      "id": 11,
      "name": "Mandarin Cherry Tree",
      "farm": "Sticky Fields",
      "region": "Mendocino",
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
      "terpenes": {
        "Limonene": 0.52,
        "β-Caryophyllene": 0.36,
        "α-Humulene": 0.13,
        "Linalool": 0.11
      },
      "terpeneRatios": {
        "Limonene": 46,
        "β-Caryophyllene": 32,
        "α-Humulene": 12,
        "Linalool": 10
      },
      "dominantTerpene": "Limonene",
      "energyTier": "LOW",
      "categories": [
        "cozyComfort"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Sweet orange (40%) matches the mandarin aroma. Lavender captures the floral note. Ylang ylang adds exotic floral depth.",
      "recipes": {
        "mocktail": {
          "name": "Elegant Mandarin",
          "tagline": "Mandarin and lavender drift into serene sophistication.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Combine 2.5 oz fresh mandarin juice with 1 oz fresh cherry juice in shaker.",
            "Add 0.5 oz culinary lavender syrup and 0.25 oz coconut cream.",
            "Add ice and shake for 8 seconds.",
            "Strain into chilled coupe.",
            "Garnish with mandarin wheel, cherry, and lavender flower."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "2.5 oz Fresh mandarin juice",
            "1 oz Fresh cherry juice",
            "0.5 oz Culinary lavender syrup",
            "0.25 oz Coconut cream",
            "1 each Mandarin wheel, cherry & lavender"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "52%",
              "ingredient": "Mandarin juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "36%",
              "ingredient": "Lavender + cherry warmth"
            },
            {
              "terpene": "α-Humulene",
              "pct": "13%",
              "ingredient": "Lavender spice"
            },
            {
              "terpene": "Linalool",
              "pct": "11%",
              "ingredient": "Lavender + cherry"
            }
          ]
        },
        "cocktail": {
          "name": "Cognac Elegance",
          "tagline": "Cognac deepens mandarin and lavender into settled sophistication.",
          "glass": "Snifter",
          "volume": "~4.5 oz",
          "method": [
            "Warm 1.5 oz VS cognac gently (do not boil).",
            "Combine with 1.5 oz fresh mandarin juice in snifter.",
            "Add 0.5 oz culinary lavender syrup and 0.25 oz coconut cream.",
            "Stir gently with large ice cubes.",
            "Garnish with mandarin peel and one lavender flower."
          ],
          "temp": "Warm (around 85°F)",
          "spirit": "VS Cognac (40% ABV)",
          "style": "Warm/stirred",
          "abv": "~28%",
          "ingredients": [
            "1.5 oz VS Cognac",
            "1.5 oz Fresh mandarin juice",
            "0.5 oz Culinary lavender syrup",
            "0.25 oz Coconut cream",
            "1 each Mandarin peel & lavender"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "52%",
              "ingredient": "Mandarin juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "36%",
              "ingredient": "Lavender + cognac spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "13%",
              "ingredient": "Lavender + cognac warmth"
            },
            {
              "terpene": "Linalool",
              "pct": "11%",
              "ingredient": "Lavender + coconut notes"
            }
          ]
        },
        "juice": {
          "name": "Citrus Serenity",
          "tagline": "Cold-pressed mandarin and cherry with lavender's gentle touch.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 4 oz fresh mandarin (with pith).",
            "Strain through fine mesh.",
            "Cold-press 1.5 oz fresh cherry and combine.",
            "Add 1.5 oz coconut water and 0.5 oz culinary lavender water (steeped 8 min).",
            "Pour over ice and garnish with cherry and mandarin wheel."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1.5 hours of pressing",
          "ingredients": [
            "4 oz Fresh mandarin (pressed)",
            "1.5 oz Fresh cherry (pressed)",
            "1.5 oz Coconut water",
            "0.5 oz Culinary lavender water",
            "1 each Cherry & mandarin wheel"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "52%",
              "ingredient": "Mandarin juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "36%",
              "ingredient": "Lavender warmth"
            },
            {
              "terpene": "α-Humulene",
              "pct": "13%",
              "ingredient": "Lavender spice"
            },
            {
              "terpene": "Linalool",
              "pct": "11%",
              "ingredient": "Lavender + cherry"
            }
          ]
        },
        "tea": {
          "name": "Mandarin Dusk",
          "tagline": "Mandarin and lavender tea for calm creativity and gentle wandering.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 190°F.",
            "Add 0.5 oz dried mandarin peel pieces to infuser.",
            "Add 1 tbsp dried lavender buds and 0.25 oz dried cherry pieces.",
            "Steep for 4 minutes, stirring gently.",
            "Remove infuser, add 0.5 tsp honey and 2 drops vanilla extract, stir and serve."
          ],
          "temp": "Warm (165°F when served)",
          "steepTemp": "190°F",
          "steepTime": "4 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried mandarin peel, dried lavender, dried cherry, honey, vanilla",
          "ingredients": [
            "6 oz Filtered water",
            "0.5 oz Dried mandarin peel",
            "1 tbsp Dried lavender buds",
            "0.25 oz Dried cherry pieces",
            "0.5 tsp Raw honey"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "52%",
              "ingredient": "Mandarin peel"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "36%",
              "ingredient": "Lavender + cherry warmth"
            },
            {
              "terpene": "α-Humulene",
              "pct": "13%",
              "ingredient": "Lavender spice"
            },
            {
              "terpene": "Linalool",
              "pct": "11%",
              "ingredient": "Lavender flower"
            }
          ]
        },
        "shot": {
          "name": "Serene Glow",
          "tagline": "A sophisticated mandarin, cherry, and lavender moment.",
          "glass": "Cordial glass",
          "volume": "~1.5 oz",
          "method": [
            "Combine 0.75 oz VS cognac with 0.5 oz fresh mandarin juice in cordial glass.",
            "Add 0.25 oz fresh cherry juice.",
            "Top with 0.1 oz culinary lavender syrup.",
            "Stir gently.",
            "Garnish with mandarin peel and one lavender flower."
          ],
          "temp": "Room temperature to slightly chilled",
          "timing": "Consume at leisure (sip slowly)",
          "ingredients": [
            "0.75 oz VS Cognac",
            "0.5 oz Fresh mandarin juice",
            "0.25 oz Fresh cherry juice",
            "0.1 oz Culinary lavender syrup"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "pct": "52%",
              "ingredient": "Mandarin juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "36%",
              "ingredient": "Lavender + cognac spice"
            },
            {
              "terpene": "α-Humulene",
              "pct": "13%",
              "ingredient": "Lavender + cognac warmth"
            },
            {
              "terpene": "Linalool",
              "pct": "11%",
              "ingredient": "Lavender + cherry"
            }
          ]
        }
      }
    },
    {
      "id": 12,
      "name": "Glitter Bomb",
      "farm": "Sol Spirit Farm",
      "region": "Trinity",
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
      "terpenes": {
        "Myrcene": 1.23,
        "β-Caryophyllene": 0.42,
        "β-Ocimene": 0.17,
        "Linalool": 0.15
      },
      "terpeneRatios": {
        "Myrcene": 62,
        "β-Caryophyllene": 21,
        "β-Ocimene": 9,
        "Linalool": 8
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "HIGH",
      "categories": [
        "euphoricLift",
        "bodyMelt"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "High myrcene (1.23%) calls for lemongrass dominance (45%). Basil captures the ocimene. Pine matches the pine aroma note.",
      "recipes": {
        "mocktail": {
          "name": "Kiwi Sparkle",
          "tagline": "Kiwi brightness with rosemary-pine clarity and euphoric lift.",
          "glass": "Highball",
          "volume": "~8 oz",
          "method": [
            "Muddle 2 fresh kiwis (peeled) gently in shaker.",
            "Add 1.5 oz fresh kiwi juice, 0.5 oz rosemary-infused simple syrup, and 0.25 oz fresh basil juice (from 5-6 leaves).",
            "Add ice and shake for 8 seconds.",
            "Strain into highball glass filled with crushed ice.",
            "Top with 2 oz sparkling water and garnish with kiwi wheel and basil leaf."
          ],
          "temp": "Ice cold",
          "ingredients": [
            "2 fruit Fresh kiwi (muddled)",
            "1.5 oz Fresh kiwi juice",
            "0.5 oz Rosemary-simple syrup",
            "0.25 oz Fresh basil juice",
            "2 oz Sparkling water"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "123%",
              "ingredient": "Kiwi fruit"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "42%",
              "ingredient": "Rosemary + allspice"
            },
            {
              "terpene": "β-Ocimene",
              "pct": "17%",
              "ingredient": "Basil juice"
            },
            {
              "terpene": "Linalool",
              "pct": "15%",
              "ingredient": "Basil + lavender notes"
            }
          ]
        },
        "cocktail": {
          "name": "Kiwi Botanica",
          "tagline": "Gin sharpens kiwi's tropical sparkle with pine and basil clarity.",
          "glass": "Coupe",
          "volume": "~5.5 oz",
          "method": [
            "Muddle 3 fresh kiwis (peeled) in mixing glass.",
            "Add 1.5 oz London Dry gin, 1 oz fresh kiwi juice, 0.5 oz rosemary syrup, and 0.25 oz fresh basil juice.",
            "Stir with ice for 12 seconds.",
            "Fine-strain into chilled coupe over large clear ice.",
            "Garnish with kiwi wheel, basil leaf, and thin rosemary sprig."
          ],
          "temp": "Cold (around 40°F)",
          "spirit": "London Dry Gin (47% ABV)",
          "style": "Botanical/stirred",
          "abv": "~32%",
          "ingredients": [
            "1.5 oz London Dry gin",
            "3 fruit Fresh kiwi (muddled)",
            "1 oz Fresh kiwi juice",
            "0.5 oz Rosemary syrup",
            "0.25 oz Fresh basil juice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "123%",
              "ingredient": "Kiwi fruit"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "42%",
              "ingredient": "Rosemary + allspice"
            },
            {
              "terpene": "β-Ocimene",
              "pct": "17%",
              "ingredient": "Basil + gin botanicals"
            },
            {
              "terpene": "Linalool",
              "pct": "15%",
              "ingredient": "Basil + gin botanicals"
            }
          ]
        },
        "juice": {
          "name": "Sparkling Kiwi",
          "tagline": "Cold-pressed kiwi with rosemary clarity and basil freshness.",
          "glass": "Juice glass",
          "volume": "~8 oz",
          "method": [
            "Cold-press 5 oz fresh kiwi (with skin).",
            "Strain through fine mesh.",
            "Add 1 oz fresh basil juice (from 10-12 leaves pressed).",
            "Whisk in 1 oz rosemary-infused coconut water (steeped 10 min).",
            "Pour over crushed ice and garnish with kiwi wheel and basil leaf."
          ],
          "temp": "Ice cold",
          "format": "Cold-pressed blend",
          "timing": "Best within 1.5 hours of pressing",
          "ingredients": [
            "5 oz Fresh kiwi (pressed)",
            "1 oz Fresh basil (pressed)",
            "1 oz Rosemary-infused coconut water",
            "1 each Kiwi wheel & basil leaf"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "123%",
              "ingredient": "Kiwi + rosemary water"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "42%",
              "ingredient": "Rosemary infusion"
            },
            {
              "terpene": "β-Ocimene",
              "pct": "17%",
              "ingredient": "Fresh basil"
            },
            {
              "terpene": "Linalool",
              "pct": "15%",
              "ingredient": "Basil + lavender notes"
            }
          ]
        },
        "tea": {
          "name": "Kiwi Serenity",
          "tagline": "Green kiwi tea with rosemary and basil for cerebral ease.",
          "glass": "Teacup",
          "volume": "~6 oz",
          "method": [
            "Heat water to 185°F.",
            "Add 0.5 oz dried kiwi pieces (or 1 tsp fresh kiwi pulp) to infuser.",
            "Add 0.5 tsp dried rosemary and 5-6 fresh basil leaves (lightly bruised).",
            "Steep for 3 minutes.",
            "Remove infuser, add 0.5 oz fresh kiwi juice and 0.5 tsp honey, stir and serve."
          ],
          "temp": "Warm (160°F when served)",
          "steepTemp": "185°F",
          "steepTime": "3 minutes",
          "caffeine": "0 mg (herbal blend)",
          "batchBlend": "Dried kiwi, rosemary, fresh basil, honey, lavender",
          "ingredients": [
            "6 oz Filtered water",
            "0.5 oz Dried kiwi pieces (or fresh pulp)",
            "0.5 tsp Dried rosemary",
            "5-6 leaves Fresh basil leaves (bruised)",
            "0.5 oz Fresh kiwi juice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "123%",
              "ingredient": "Kiwi fruit + water"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "42%",
              "ingredient": "Rosemary"
            },
            {
              "terpene": "β-Ocimene",
              "pct": "17%",
              "ingredient": "Fresh basil"
            },
            {
              "terpene": "Linalool",
              "pct": "15%",
              "ingredient": "Basil + lavender notes"
            }
          ]
        },
        "shot": {
          "name": "Euphoric Flash",
          "tagline": "A bright kiwi spark with pine clarity and basil lift.",
          "glass": "Shot glass",
          "volume": "~1.5 oz",
          "method": [
            "Muddle 2 fresh kiwis (peeled) in shot glass.",
            "Add 0.75 oz pisco.",
            "Top with 0.5 oz fresh kiwi juice and 0.25 oz rosemary-allspice syrup.",
            "Stir once.",
            "Garnish with a kiwi wheel and tiny basil leaf."
          ],
          "temp": "Ice cold (chilled shot glass)",
          "timing": "Consume immediately",
          "ingredients": [
            "2 fruit Fresh kiwi (muddled)",
            "0.75 oz Pisco",
            "0.5 oz Fresh kiwi juice",
            "0.25 oz Rosemary-allspice syrup"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "pct": "123%",
              "ingredient": "Kiwi fruit + juice"
            },
            {
              "terpene": "β-Caryophyllene",
              "pct": "42%",
              "ingredient": "Rosemary + allspice"
            },
            {
              "terpene": "β-Ocimene",
              "pct": "17%",
              "ingredient": "Pisco botanicals"
            },
            {
              "terpene": "Linalool",
              "pct": "15%",
              "ingredient": "Pisco + lavender notes"
            }
          ]
        }
      }
    },
    {
      "id": 13,
      "name": "Satsuma Sherbet",
      "farm": "Alpenglow Farms",
      "region": "Humboldt",
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
      "terpenes": {
        "Limonene": 0.55,
        "β-Caryophyllene": 0.45,
        "α-Humulene": 0.13,
        "Myrcene": 0.11
      },
      "terpeneRatios": {
        "Limonene": 44,
        "β-Caryophyllene": 36,
        "α-Humulene": 10,
        "Myrcene": 9
      },
      "dominantTerpene": "Limonene",
      "energyTier": "LOW",
      "categories": [
        "cozyComfort"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Sweet orange (40%) captures the mandarin citrus. Peppermint matches the mint aroma note.",
      "recipes": {
        "mocktail": {
          "name": "Satsuma Sherbet",
          "tagline": "Japanese mandarin comfort in a glass",
          "glass": "coupe",
          "volume": "6 oz",
          "method": [
            "Juice 3 fresh satsuma mandarins (about 3 oz) into a cocktail shaker.",
            "Add 0.5 oz fresh lemon juice and 0.75 oz rice milk to the shaker.",
            "Add 0.5 oz coconut cream and 2-3 fresh mint leaves, gently bruised.",
            "Fill shaker with ice and shake vigorously for 10 seconds until creamy.",
            "Strain into a chilled coupe glass.",
            "Dust lightly with ground cinnamon and garnish with a candied mandarin wheel and mint sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "3 fresh satsuma mandarins",
            "0.5 oz fresh lemon juice",
            "0.75 oz rice milk",
            "0.5 oz coconut cream",
            "3-4 fresh mint leaves",
            "pinch of ground cinnamon",
            "candied mandarin wheel (garnish)",
            "fresh mint sprig (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "satsuma, lemon, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, lemon"
            }
          ]
        },
        "cocktail": {
          "name": "Satsuma Sherbet",
          "spirit": "sake",
          "style": "creamy citrus",
          "abv": "12%",
          "tagline": "Sake-spiked mandarin softness",
          "glass": "coupe",
          "volume": "6.5 oz",
          "method": [
            "Pour 1.5 oz premium sake into a cocktail shaker.",
            "Add 2.5 oz fresh satsuma juice and 0.5 oz fresh lemon juice.",
            "Pour in 0.75 oz coconut cream and 0.5 oz rice milk.",
            "Add 2 fresh mint leaves and fill with ice.",
            "Shake for 12 seconds until silky and chilled.",
            "Strain into a coupe glass over fresh ice.",
            "Garnish with a candied mandarin wheel and a cinnamon stick."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.5 oz sake",
            "2.5 oz fresh satsuma juice",
            "0.5 oz fresh lemon juice",
            "0.75 oz coconut cream",
            "0.5 oz rice milk",
            "2 fresh mint leaves",
            "pinch of ground cinnamon",
            "candied mandarin wheel (garnish)",
            "cinnamon stick (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "satsuma, lemon, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "Myrcene",
              "source": "mint"
            }
          ]
        },
        "juice": {
          "name": "Satsuma Sherbet Juice",
          "format": "cold-pressed blend",
          "tagline": "Mandarin-mint cleanse with coconut sweetness",
          "volume": "8 oz",
          "method": [
            "Press 5 fresh satsuma mandarins through a cold-press juicer (yields ~4 oz).",
            "Blend 1 oz coconut milk with 0.5 oz rice milk until smooth.",
            "Muddle 4-5 fresh mint leaves gently in a tall glass.",
            "Pour pressed mandarin juice over the mint.",
            "Stir in the coconut-rice milk blend.",
            "Top with 1-2 oz cold mineral water.",
            "Garnish with a mint sprig and thin mandarin wheel on the rim."
          ],
          "timing": "drink immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "5 fresh satsuma mandarins",
            "1 oz coconut milk",
            "0.5 oz rice milk",
            "4-5 fresh mint leaves",
            "1-2 oz cold mineral water",
            "mint sprig (garnish)",
            "mandarin wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "satsuma, mint"
            },
            {
              "terpene": "Myrcene",
              "source": "mint"
            }
          ]
        },
        "tea": {
          "name": "Satsuma Sherbet Tea",
          "tagline": "Herbal mandarin blend for quiet contemplation",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 160°F (70°C).",
            "In a tea infuser, combine 1 tsp dried chamomile, 3-4 dried mint leaves, and 2-3 satsuma peel strips.",
            "Steep for 4 minutes, allowing the delicate herbs to release their essences gently.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz rice milk and a pinch of ground cinnamon.",
            "Float a thin candied mandarin wheel on top.",
            "Serve warm, sipping slowly for maximum comfort."
          ],
          "steepTemp": "160°F (70°C)",
          "steepTime": "4 minutes",
          "caffeine": "minimal (chamomile-based)",
          "batchBlend": "dried chamomile, dried mint, dried satsuma peel, ground cinnamon",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tsp dried chamomile",
            "3-4 dried mint leaves",
            "2-3 strips fresh satsuma peel (dried)",
            "0.5 oz rice milk",
            "pinch of ground cinnamon",
            "candied mandarin wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "satsuma peel, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, chamomile"
            }
          ]
        },
        "shot": {
          "name": "Satsuma Sherbet Shot",
          "tagline": "One-sip mandarin comfort rush",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "Pour 1 oz sake into a mixing glass with ice.",
            "Add 0.75 oz fresh satsuma juice and 0.25 oz coconut cream.",
            "Stir for 8 seconds until silky.",
            "Strain into the chilled shot glass.",
            "Top with a tiny pinch of cinnamon and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1 oz sake",
            "0.75 oz fresh satsuma juice",
            "0.25 oz coconut cream",
            "pinch of ground cinnamon",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "satsuma"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            }
          ]
        }
      }
    },
    {
      "id": 14,
      "name": "Avenue of the Giants",
      "farm": "Happy Day Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "Myrcene": 1.94,
        "β-Caryophyllene": 0.43,
        "α-Pinene": 0.26,
        "β-Ocimene": 0.24
      },
      "terpeneRatios": {
        "Myrcene": 68,
        "β-Caryophyllene": 15,
        "α-Pinene": 9,
        "β-Ocimene": 8
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "HIGH",
      "categories": [
        "euphoricLift",
        "creativeFlow"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Very high myrcene with lemongrass at 40%. Pine captures the pine aroma and pinene. Peppermint for the menthol.",
      "recipes": {
        "mocktail": {
          "name": "Avenue of the Giants",
          "tagline": "Redwood forest clarity in a glass",
          "glass": "highball",
          "volume": "7 oz",
          "method": [
            "Fill a highball glass halfway with ice.",
            "In a mixing glass, combine 1 oz fresh lemongrass juice (or 0.75 oz lemongrass syrup + 0.5 oz water), 0.5 oz fresh lime juice, and 1 small sprig fresh rosemary.",
            "Add 3-4 fresh basil leaves and gently muddle with the herbs.",
            "Stir in 0.5 oz jasmine tea (cooled) and 0.75 oz sparkling water.",
            "Strain into the highball glass.",
            "Top with 2 oz sparkling water and a float of 0.25 oz fresh mint water.",
            "Garnish with a sprig of rosemary, fresh mint, and a thin lime wheel."
          ],
          "temp": "chilled",
          "ingredients": [
            "ice",
            "1 oz fresh lemongrass juice (or lemongrass syrup)",
            "0.5 oz fresh lime juice",
            "1 sprig fresh rosemary",
            "3-4 fresh basil leaves",
            "0.5 oz cooled jasmine tea",
            "0.75 oz sparkling water",
            "2 oz sparkling water (top)",
            "0.25 oz fresh mint water (float)",
            "rosemary sprig (garnish)",
            "fresh mint sprig (garnish)",
            "lime wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lemongrass, basil, mint, rosemary"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, mint"
            },
            {
              "terpene": "Limonene",
              "source": "lime, lemongrass"
            }
          ]
        },
        "cocktail": {
          "name": "Avenue of the Giants",
          "spirit": "gin",
          "style": "herbal forest botanical",
          "abv": "16%",
          "tagline": "Gin-soaked redwood botanicals",
          "glass": "highball",
          "volume": "7.5 oz",
          "method": [
            "Pour 2 oz botanical gin into a mixing glass with ice.",
            "Add 1 oz fresh lemongrass juice, 0.5 oz fresh lime juice, and 0.5 oz jasmine tea.",
            "Add 1 sprig fresh rosemary and 4-5 fresh basil leaves.",
            "Muddle gently to release herb oils (do not bruise harshly).",
            "Stir for 10 seconds with ice.",
            "Strain into a highball glass filled with fresh ice.",
            "Top with 2 oz sparkling water and garnish with rosemary, basil, and lime wheel."
          ],
          "temp": "chilled",
          "ingredients": [
            "2 oz botanical gin",
            "1 oz fresh lemongrass juice",
            "0.5 oz fresh lime juice",
            "0.5 oz cooled jasmine tea",
            "1 sprig fresh rosemary",
            "4-5 fresh basil leaves",
            "2 oz sparkling water (top)",
            "rosemary sprig (garnish)",
            "fresh basil leaves (garnish)",
            "lime wheel (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lemongrass, basil, rosemary"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil, gin botanicals"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil"
            },
            {
              "terpene": "Limonene",
              "source": "lime, lemongrass"
            }
          ]
        },
        "juice": {
          "name": "Avenue of the Giants Juice",
          "format": "herbal pressed blend",
          "tagline": "Fresh forest green with minty clarity",
          "volume": "8 oz",
          "method": [
            "Juice 3-4 stalks of fresh lemongrass through a cold press (yields ~1.5 oz).",
            "Add 1 oz fresh lime juice and 0.5 oz fresh mint juice (blended mint, strained).",
            "Steep 2 sprigs fresh rosemary and 5-6 fresh basil leaves in 2.5 oz cool mineral water for 2 minutes.",
            "Strain the herb water and combine with the juices.",
            "Add 1.5 oz sparkling water to the blend.",
            "Pour over ice in a tall glass.",
            "Garnish with a rosemary sprig and basil leaf on the rim."
          ],
          "timing": "drink within 30 minutes of preparation",
          "temp": "chilled",
          "ingredients": [
            "3-4 stalks fresh lemongrass",
            "1 oz fresh lime juice",
            "0.5 oz fresh mint juice",
            "2 sprigs fresh rosemary",
            "5-6 fresh basil leaves",
            "2.5 oz cold mineral water",
            "1.5 oz sparkling water",
            "rosemary sprig (garnish)",
            "basil leaf (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lemongrass, basil, mint, rosemary"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil, mint"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, mint"
            }
          ]
        },
        "tea": {
          "name": "Avenue of the Giants Tea",
          "tagline": "Forest floor herbal infusion with forest clarity",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 195°F (90°C).",
            "In a tea infuser, combine 1 tbsp dried lemongrass pieces, 2-3 dried rosemary sprigs, 5-6 dried basil leaves, and 3-4 dried mint leaves.",
            "Steep for 5-6 minutes to extract the full forest character.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz jasmine tea concentrate or a splash of cooled jasmine tea.",
            "Add a squeeze of fresh lime juice.",
            "Garnish with a fresh rosemary sprig and serve hot."
          ],
          "steepTemp": "195°F (90°C)",
          "steepTime": "5-6 minutes",
          "caffeine": "minimal (herbal blend)",
          "batchBlend": "dried lemongrass, dried rosemary, dried basil, dried mint, dried jasmine flowers",
          "temp": "hot",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried lemongrass pieces",
            "2-3 dried rosemary sprigs",
            "5-6 dried basil leaves",
            "3-4 dried mint leaves",
            "0.5 oz jasmine tea concentrate",
            "squeeze of fresh lime juice",
            "fresh rosemary sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lemongrass, basil, mint, rosemary"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil, mint"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, mint"
            }
          ]
        },
        "shot": {
          "name": "Avenue of the Giants Shot",
          "tagline": "One-sip forest depth",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz gin with 0.75 oz fresh lemongrass juice.",
            "Add 3-4 fresh basil leaves and 1 small sprig rosemary.",
            "Muddle gently for 3 seconds.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz gin",
            "0.75 oz fresh lemongrass juice",
            "3-4 fresh basil leaves",
            "1 small sprig rosemary",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lemongrass, basil, rosemary"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil"
            }
          ]
        }
      }
    },
    {
      "id": 15,
      "name": "Peach Flambé",
      "farm": "Terrapin Farms",
      "region": "Humboldt",
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
      "terpenes": {
        "β-Caryophyllene": 0.25,
        "Myrcene": 0.21,
        "Limonene": 0.2,
        "α-Humulene": 0.12
      },
      "terpeneRatios": {
        "β-Caryophyllene": 32,
        "Myrcene": 27,
        "Limonene": 26,
        "α-Humulene": 15
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "HIGH",
      "categories": [
        "euphoricLift"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Balanced, lower-terpene profile. Bergamot brings sophisticated citrus matching the peach. Clove echoes the brown sugar warmth.",
      "recipes": {
        "mocktail": {
          "name": "Peach Flambé",
          "tagline": "Sunny white peach with warm spice",
          "glass": "coupe",
          "volume": "6 oz",
          "method": [
            "In a mixing glass, combine 2.5 oz fresh white peach puree (blended fresh peaches, strained).",
            "Add 0.5 oz fresh lemon juice and 0.5 oz bergamot-infused syrup.",
            "Pour in 0.75 oz cashew milk and stir until smooth.",
            "Add 0.25 oz demerara syrup for depth.",
            "Fill with ice and stir gently for 8 seconds.",
            "Strain into a coupe glass.",
            "Garnish with a cinnamon stick and a thin peach slice."
          ],
          "temp": "chilled",
          "ingredients": [
            "2.5 oz fresh white peach puree",
            "0.5 oz fresh lemon juice",
            "0.5 oz bergamot-infused syrup",
            "0.75 oz cashew milk",
            "0.25 oz demerara syrup",
            "cinnamon stick (garnish)",
            "thin peach slice (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "bergamot, lemon, peach"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "Myrcene",
              "source": "peach"
            }
          ]
        },
        "cocktail": {
          "name": "Peach Flambé",
          "spirit": "bourbon",
          "style": "fruit-forward spiced",
          "abv": "18%",
          "tagline": "Bourbon-backed peach warmth",
          "glass": "coupe",
          "volume": "6.5 oz",
          "method": [
            "Pour 1.75 oz bourbon into a mixing glass.",
            "Add 2 oz fresh white peach puree and 0.5 oz fresh lemon juice.",
            "Stir in 0.5 oz bergamot-infused syrup and 0.25 oz demerara syrup.",
            "Add 0.5 oz cashew milk to round out the texture.",
            "Fill with ice and stir for 10 seconds until chilled.",
            "Strain into a coupe glass.",
            "Ignite a cinnamon stick over the surface for 3 seconds (optional flambé), then garnish with the cinnamon stick and a grilled peach slice."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.75 oz bourbon",
            "2 oz fresh white peach puree",
            "0.5 oz fresh lemon juice",
            "0.5 oz bergamot-infused syrup",
            "0.25 oz demerara syrup",
            "0.5 oz cashew milk",
            "cinnamon stick (garnish, optionally flamed)",
            "grilled peach slice (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "bergamot, lemon, peach"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, bourbon"
            },
            {
              "terpene": "Myrcene",
              "source": "peach"
            }
          ]
        },
        "juice": {
          "name": "Peach Flambé Juice",
          "format": "fresh-pressed nut blend",
          "tagline": "White peach and cashew smoothness",
          "volume": "8 oz",
          "method": [
            "Blend 2 ripe white peaches (peeled, pitted) until smooth (yields ~3 oz puree).",
            "Strain through a fine mesh to remove any pulp.",
            "Blend 0.75 oz raw cashew butter with 1 oz warm filtered water until milk-like.",
            "Strain the cashew milk through cheesecloth.",
            "Combine peach puree with cashew milk, 0.5 oz fresh lemon juice, and 0.25 oz demerara syrup.",
            "Stir in 1 oz cold filtered water to reach desired consistency.",
            "Pour over ice in a tall glass and garnish with a peach slice and cinnamon dust."
          ],
          "timing": "serve immediately to preserve peach freshness",
          "temp": "chilled",
          "ingredients": [
            "2 ripe white peaches (peeled, pitted)",
            "0.75 oz raw cashew butter",
            "1 oz warm filtered water (for cashew milk)",
            "0.5 oz fresh lemon juice",
            "0.25 oz demerara syrup",
            "1 oz cold filtered water",
            "peach slice (garnish)",
            "cinnamon dust (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "lemon, peach"
            },
            {
              "terpene": "Myrcene",
              "source": "peach"
            }
          ]
        },
        "tea": {
          "name": "Peach Flambé Tea",
          "tagline": "Bergamot and peach comfort in a cup",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 200°F (93°C).",
            "Steep 1 black tea bag and 1 bergamot tea bag together for 3 minutes.",
            "Remove the tea bags and stir in 0.5 oz dried peach pieces (or 0.75 oz fresh peach puree).",
            "Add 0.25 oz demerara syrup and a pinch of ground cinnamon.",
            "Stir in 0.5 oz cashew milk or cream.",
            "Pour into a warm teacup and garnish with a cinnamon stick and thin peach slice."
          ],
          "steepTemp": "200°F (93°C)",
          "steepTime": "3 minutes",
          "caffeine": "moderate (black tea base)",
          "batchBlend": "black tea, bergamot tea, dried peach pieces, ground cinnamon, demerara sugar",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 black tea bag",
            "1 bergamot tea bag",
            "0.5 oz dried peach pieces (or 0.75 oz fresh peach puree)",
            "0.25 oz demerara syrup",
            "pinch of ground cinnamon",
            "0.5 oz cashew milk",
            "cinnamon stick (garnish)",
            "thin peach slice (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "bergamot, peach"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            }
          ]
        },
        "shot": {
          "name": "Peach Flambé Shot",
          "tagline": "One-sip peachy warmth",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz bourbon with 0.75 oz fresh white peach puree.",
            "Add 0.25 oz demerara syrup and a pinch of ground cinnamon.",
            "Stir with ice for 6 seconds.",
            "Strain into the chilled shot glass.",
            "Serve immediately with a cinnamon stick on the side."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz bourbon",
            "0.75 oz fresh white peach puree",
            "0.25 oz demerara syrup",
            "pinch of ground cinnamon",
            "cinnamon stick (side)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Limonene",
              "source": "peach"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, bourbon"
            }
          ]
        }
      }
    },
    {
      "id": 16,
      "name": "Rasta Governmint",
      "farm": "Higher Heights",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Caryophyllene": 0.6,
        "Limonene": 0.39,
        "α-Humulene": 0.17,
        "Myrcene": 0.16
      },
      "terpeneRatios": {
        "β-Caryophyllene": 45,
        "Limonene": 30,
        "α-Humulene": 13,
        "Myrcene": 12
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "LOW",
      "categories": [
        "deepRest",
        "bodyMelt",
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Caryophyllene-forward with black pepper and rosemary. Sage for humulene and oak-like earthiness. Geranium adds cherry notes.",
      "recipes": {
        "mocktail": {
          "name": "Rasta Governmint",
          "tagline": "Caribbean ease with profound spice",
          "glass": "rocks",
          "volume": "6 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "In a mixing glass, combine 3 oz fresh tart cherry juice and 0.5 oz fresh lime juice.",
            "Add 0.5 oz cardamom-infused syrup (warm, resinous) and 0.25 oz vanilla extract.",
            "Stir in 2-3 dashes of oak-aged bitters.",
            "Add a pinch each of ground cloves and allspice.",
            "Stir gently with ice for 8 seconds.",
            "Strain into the rocks glass and garnish with a fresh cherry and a cinnamon stick."
          ],
          "temp": "chilled",
          "ingredients": [
            "ice cubes (large)",
            "3 oz fresh tart cherry juice",
            "0.5 oz fresh lime juice",
            "0.5 oz cardamom-infused syrup",
            "0.25 oz vanilla extract",
            "2-3 dashes oak-aged bitters",
            "pinch of ground cloves",
            "pinch of ground allspice",
            "fresh cherry (garnish)",
            "cinnamon stick (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, allspice, cardamom"
            },
            {
              "terpene": "Limonene",
              "source": "lime, cherry"
            },
            {
              "terpene": "α-Humulene",
              "source": "cloves"
            }
          ]
        },
        "cocktail": {
          "name": "Rasta Governmint",
          "spirit": "aged rum",
          "style": "Caribbean spiced",
          "abv": "17%",
          "tagline": "Aged rum with Caribbean comfort spices",
          "glass": "rocks",
          "volume": "6.5 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "Pour 2 oz aged rum (7-10 year) into a mixing glass.",
            "Add 2.5 oz fresh tart cherry juice and 0.5 oz fresh lime juice.",
            "Add 0.5 oz cardamom-infused syrup and 0.25 oz vanilla extract.",
            "Stir in 2-3 dashes of oak-aged bitters, a pinch of cloves, and a pinch of allspice.",
            "Stir with ice for 10 seconds.",
            "Strain into the rocks glass.",
            "Garnish with a brandied cherry and a cinnamon stick."
          ],
          "temp": "chilled",
          "ingredients": [
            "2 oz aged rum (7-10 year)",
            "2.5 oz fresh tart cherry juice",
            "0.5 oz fresh lime juice",
            "0.5 oz cardamom-infused syrup",
            "0.25 oz vanilla extract",
            "2-3 dashes oak-aged bitters",
            "pinch of ground cloves",
            "pinch of ground allspice",
            "brandied cherry (garnish)",
            "cinnamon stick (garnish)",
            "large ice cubes"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, allspice, cardamom, aged rum"
            },
            {
              "terpene": "Limonene",
              "source": "lime, cherry"
            },
            {
              "terpene": "α-Humulene",
              "source": "cloves, rum aging"
            }
          ]
        },
        "juice": {
          "name": "Rasta Governmint Juice",
          "format": "tart cherry blend",
          "tagline": "Deep cherry with spiced warmth",
          "volume": "8 oz",
          "method": [
            "Press 1.5 cups fresh tart cherries through a cold press (yields ~3.5 oz juice).",
            "Steep 3-4 whole cloves and 2 whole allspice berries in 1 oz warm filtered water for 3 minutes.",
            "Strain the spice water and combine with the cherry juice.",
            "Add 0.5 oz fresh lime juice and 0.5 oz vanilla extract.",
            "Stir in 0.25 oz cardamom-infused syrup.",
            "Add 1.5 oz cold filtered water to reach desired consistency.",
            "Pour over ice in a tall glass and garnish with a cherry and a cardamom pod."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "1.5 cups fresh tart cherries",
            "3-4 whole cloves",
            "2 whole allspice berries",
            "1 oz warm filtered water",
            "0.5 oz fresh lime juice",
            "0.5 oz vanilla extract",
            "0.25 oz cardamom-infused syrup",
            "1.5 oz cold filtered water",
            "fresh cherry (garnish)",
            "cardamom pod (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, allspice, cardamom"
            },
            {
              "terpene": "Limonene",
              "source": "lime"
            }
          ]
        },
        "tea": {
          "name": "Rasta Governmint Tea",
          "tagline": "Spiced cherry and vanilla rest",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 200°F (93°C).",
            "In a tea infuser, combine 1 tbsp dried tart cherry pieces, 4-5 whole cloves, 3-4 whole allspice berries, and 1 cardamom pod (cracked).",
            "Steep for 6 minutes to extract the full spiced character.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz vanilla extract and a pinch of ground cardamom.",
            "Add 0.5 oz warm cream or milk.",
            "Garnish with a cinnamon stick and a whole clove on top."
          ],
          "steepTemp": "200°F (93°C)",
          "steepTime": "6 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried tart cherry pieces, whole cloves, whole allspice berries, cardamom pods, ground cardamom",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried tart cherry pieces",
            "4-5 whole cloves",
            "3-4 whole allspice berries",
            "1 cardamom pod (cracked)",
            "0.5 oz vanilla extract",
            "pinch of ground cardamom",
            "0.5 oz warm cream or milk",
            "cinnamon stick (garnish)",
            "whole clove (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, allspice, cardamom"
            },
            {
              "terpene": "α-Humulene",
              "source": "cloves, allspice"
            }
          ]
        },
        "shot": {
          "name": "Rasta Governmint Shot",
          "tagline": "One-sip Caribbean profound ease",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz aged rum with 0.75 oz fresh tart cherry juice.",
            "Add 0.25 oz cardamom-infused syrup and 1 dash of oak-aged bitters.",
            "Add a tiny pinch each of cloves and allspice.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz aged rum",
            "0.75 oz fresh tart cherry juice",
            "0.25 oz cardamom-infused syrup",
            "1 dash oak-aged bitters",
            "tiny pinch of ground cloves",
            "tiny pinch of ground allspice",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, allspice, rum"
            },
            {
              "terpene": "Limonene",
              "source": "cherry"
            }
          ]
        }
      }
    },
    {
      "id": 17,
      "name": "Purple Candy Cane",
      "farm": "Greenshock Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "Myrcene": 0.54,
        "β-Caryophyllene": 0.31,
        "α-Pinene": 0.2,
        "α-Humulene": 0.13
      },
      "terpeneRatios": {
        "Myrcene": 46,
        "β-Caryophyllene": 26,
        "α-Pinene": 17,
        "α-Humulene": 11
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "HIGH",
      "categories": [
        "creativeFlow",
        "socialBright"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Myrcene-forward for the mango note. Sweet orange captures the orange blossom. Peppermint matches the candy perfectly.",
      "recipes": {
        "mocktail": {
          "name": "Purple Candy Cane",
          "tagline": "Tropical candy shop in a glass",
          "glass": "tiki",
          "volume": "7 oz",
          "method": [
            "Fill a tiki glass with crushed ice.",
            "In a blender, combine 2 oz fresh mango puree, 0.75 oz fresh orange juice, and 6-8 fresh mint leaves.",
            "Add 0.5 oz orange blossom water and 0.75 oz coconut cream.",
            "Blend for 8 seconds until smooth and frothy.",
            "Pour into the tiki glass.",
            "Garnish with a mango slice, a candied orange wheel, a cinnamon stick, and a fresh mint sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "crushed ice",
            "2 oz fresh mango puree",
            "0.75 oz fresh orange juice",
            "6-8 fresh mint leaves",
            "0.5 oz orange blossom water",
            "0.75 oz coconut cream",
            "mango slice (garnish)",
            "candied orange wheel (garnish)",
            "cinnamon stick (garnish)",
            "fresh mint sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "mango, mint, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "orange, mango, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary (see cocktail for herb variant)"
            }
          ]
        },
        "cocktail": {
          "name": "Purple Candy Cane",
          "spirit": "white rum",
          "style": "tropical fruity",
          "abv": "15%",
          "tagline": "Rum-spiked mango mint tropical vibrancy",
          "glass": "tiki",
          "volume": "7.5 oz",
          "method": [
            "Fill a tiki glass with crushed ice.",
            "Pour 1.75 oz white rum into a blender.",
            "Add 2 oz fresh mango puree, 0.75 oz fresh orange juice, and 0.5 oz orange blossom water.",
            "Add 6-8 fresh mint leaves and 0.5 oz coconut cream.",
            "Add 1 small sprig fresh rosemary (for pinene depth).",
            "Blend for 10 seconds until smooth and creamy.",
            "Pour into the tiki glass.",
            "Garnish with a mango slice, candied orange wheel, a cinnamon stick, and fresh mint sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.75 oz white rum",
            "2 oz fresh mango puree",
            "0.75 oz fresh orange juice",
            "0.5 oz orange blossom water",
            "6-8 fresh mint leaves",
            "0.5 oz coconut cream",
            "1 small sprig fresh rosemary",
            "crushed ice",
            "mango slice (garnish)",
            "candied orange wheel (garnish)",
            "cinnamon stick (garnish)",
            "fresh mint sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "mango, mint, rosemary, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "orange, mango, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, mint"
            }
          ]
        },
        "juice": {
          "name": "Purple Candy Cane Juice",
          "format": "tropical mango blend",
          "tagline": "Mango mint with orange blossom sweetness",
          "volume": "8 oz",
          "method": [
            "Blend 1.5 cups fresh ripe mango chunks until smooth (yields ~3 oz puree).",
            "Strain through fine mesh to remove any pulp.",
            "Squeeze 1 fresh orange for juice (yields ~0.75 oz).",
            "Blend 8-10 fresh mint leaves with 1 oz cold filtered water, then strain through cheesecloth.",
            "Combine mango puree, orange juice, mint water, and 0.5 oz orange blossom water.",
            "Stir in 0.5 oz coconut cream.",
            "Add 1 oz cold filtered water to reach desired consistency.",
            "Pour over crushed ice and garnish with mango slice, mint sprig, and a cinnamon dust."
          ],
          "timing": "serve immediately to preserve mango freshness",
          "temp": "chilled",
          "ingredients": [
            "1.5 cups fresh ripe mango chunks",
            "1 fresh orange",
            "8-10 fresh mint leaves",
            "1 oz cold filtered water (mint extraction)",
            "0.5 oz orange blossom water",
            "0.5 oz coconut cream",
            "1 oz cold filtered water",
            "mango slice (garnish)",
            "fresh mint sprig (garnish)",
            "cinnamon dust (garnish)",
            "crushed ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "mango, mint, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "orange, mango, mint"
            }
          ]
        },
        "tea": {
          "name": "Purple Candy Cane Tea",
          "tagline": "Tropical mint with orange blossom comfort",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 160°F (71°C).",
            "In a tea infuser, combine 1 tbsp dried mango pieces, 6-8 dried mint leaves, 1 tsp dried orange peel, and 0.5 tsp orange blossom petals (or 0.25 tsp orange blossom concentrate).",
            "Steep for 4 minutes to allow the tropical notes to infuse gently.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz coconut cream and a tiny pinch of ground cinnamon.",
            "Garnish with a fresh mint sprig and thin orange wheel."
          ],
          "steepTemp": "160°F (71°C)",
          "steepTime": "4 minutes",
          "caffeine": "minimal (herbal blend)",
          "batchBlend": "dried mango pieces, dried mint, dried orange peel, orange blossom petals, ground cinnamon",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried mango pieces",
            "6-8 dried mint leaves",
            "1 tsp dried orange peel",
            "0.5 tsp orange blossom petals",
            "0.5 oz coconut cream",
            "tiny pinch of ground cinnamon",
            "fresh mint sprig (garnish)",
            "thin orange wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "mango, mint, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "orange, mango, mint"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            }
          ]
        },
        "shot": {
          "name": "Purple Candy Cane Shot",
          "tagline": "One-sip mango tropical energy",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1 oz white rum with 0.75 oz fresh mango puree.",
            "Add 0.25 oz orange juice and 0.1 oz orange blossom water.",
            "Add 2-3 fresh mint leaves and muddle very gently.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1 oz white rum",
            "0.75 oz fresh mango puree",
            "0.25 oz orange juice",
            "0.1 oz orange blossom water",
            "2-3 fresh mint leaves",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "mango, mint"
            },
            {
              "terpene": "Limonene",
              "source": "orange, mango"
            }
          ]
        }
      }
    },
    {
      "id": 18,
      "name": "Lemon Papaya Banana",
      "farm": "Terrapin Farms",
      "region": "Humboldt",
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
      "terpenes": {
        "Myrcene": 0.57,
        "Limonene": 0.29,
        "β-Caryophyllene": 0.16,
        "α-Humulene": 0.05
      },
      "terpeneRatios": {
        "Myrcene": 53,
        "Limonene": 27,
        "β-Caryophyllene": 15,
        "α-Humulene": 5
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "LOW",
      "categories": [
        "bodyMelt",
        "deepRest"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Myrcene-dominant with lemongrass at 35%. Lemon captures the lemon zest. Geranium adds tropical, fruity notes.",
      "recipes": {
        "mocktail": {
          "name": "Lemon Papaya Banana",
          "tagline": "Soft tropical body, expansive mind",
          "glass": "highball",
          "volume": "7 oz",
          "method": [
            "In a blender, combine 1.5 oz fresh papaya puree and 0.75 oz banana puree (frozen banana blended smooth).",
            "Add 0.75 oz fresh lemon juice and 0.5 oz honeydew melon juice (or 0.5 oz honeydew syrup + 0.25 oz water).",
            "Pour in 0.75 oz coconut cream.",
            "Add a pinch of vanilla powder and a small bay leaf (remove before serving).",
            "Blend for 8 seconds until creamy and smooth.",
            "Pour into a highball glass with crushed ice.",
            "Garnish with a papaya slice, banana wheel, and fresh mint."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.5 oz fresh papaya puree",
            "0.75 oz banana puree (frozen)",
            "0.75 oz fresh lemon juice",
            "0.5 oz honeydew melon juice (or syrup)",
            "0.75 oz coconut cream",
            "pinch of vanilla powder",
            "1 small bay leaf (remove before serving)",
            "crushed ice",
            "papaya slice (garnish)",
            "banana wheel (garnish)",
            "fresh mint sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "papaya, banana, honeydew, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, papaya, banana"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon (optional dusting)"
            }
          ]
        },
        "cocktail": {
          "name": "Lemon Papaya Banana",
          "spirit": "cachaça",
          "style": "tropical relaxation",
          "abv": "14%",
          "tagline": "Cachaça-spiked papaya-banana drift",
          "glass": "highball",
          "volume": "7.5 oz",
          "method": [
            "Pour 1.5 oz cachaça into a blender.",
            "Add 1.5 oz fresh papaya puree and 0.75 oz banana puree (frozen, blended smooth).",
            "Pour in 0.75 oz fresh lemon juice and 0.5 oz honeydew melon juice.",
            "Add 0.75 oz coconut cream, a small bay leaf, and a pinch of vanilla powder.",
            "Blend for 10 seconds until smooth and creamy.",
            "Pour into a highball glass with crushed ice.",
            "Garnish with a papaya slice, banana wheel, and a mint sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.5 oz cachaça",
            "1.5 oz fresh papaya puree",
            "0.75 oz banana puree (frozen)",
            "0.75 oz fresh lemon juice",
            "0.5 oz honeydew melon juice",
            "0.75 oz coconut cream",
            "1 small bay leaf",
            "pinch of vanilla powder",
            "crushed ice",
            "papaya slice (garnish)",
            "banana wheel (garnish)",
            "fresh mint sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "papaya, banana, honeydew, bay leaf, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, papaya, banana"
            }
          ]
        },
        "juice": {
          "name": "Lemon Papaya Banana Juice",
          "format": "tropical smoothie blend",
          "tagline": "Papaya-banana softness with lemon brightness",
          "volume": "8 oz",
          "method": [
            "Peel and chop 1 ripe papaya, removing seeds (yields ~2 oz puree when blended).",
            "Blend papaya until smooth and strain through fine mesh.",
            "Peel and freeze 1 ripe banana, then blend until completely smooth (yields ~0.75 oz puree).",
            "Squeeze 1 fresh lemon for juice (yields ~0.75 oz).",
            "Blend 0.75 cup fresh honeydew melon chunks until liquid (yields ~0.5 oz juice).",
            "Strain honeydew through cheesecloth.",
            "Combine all juices and purees with 0.75 oz coconut cream.",
            "Add 1 oz cold filtered water and stir well.",
            "Pour over ice and garnish with papaya slice and banana wheel."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "1 ripe papaya",
            "1 ripe banana (frozen)",
            "1 fresh lemon",
            "0.75 cup fresh honeydew melon",
            "0.75 oz coconut cream",
            "1 oz cold filtered water",
            "papaya slice (garnish)",
            "banana wheel (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "papaya, banana, honeydew, coconut"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, papaya, banana"
            }
          ]
        },
        "tea": {
          "name": "Lemon Papaya Banana Tea",
          "tagline": "Soft tropical comfort brew",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 155°F (68°C).",
            "In a tea infuser, combine 1 tbsp dried papaya pieces, 0.5 tbsp dried banana chips, 1 tsp dried lemon peel, 1 small bay leaf, and a pinch of vanilla powder.",
            "Steep for 5 minutes to extract the tropical sweetness gently.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz coconut cream and a tiny pinch of ground cinnamon.",
            "Garnish with a fresh mint sprig and thin lemon wheel."
          ],
          "steepTemp": "155°F (68°C)",
          "steepTime": "5 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried papaya pieces, dried banana chips, dried lemon peel, bay leaf, vanilla powder, ground cinnamon",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried papaya pieces",
            "0.5 tbsp dried banana chips",
            "1 tsp dried lemon peel",
            "1 small bay leaf",
            "pinch of vanilla powder",
            "0.5 oz coconut cream",
            "tiny pinch of ground cinnamon",
            "fresh mint sprig (garnish)",
            "thin lemon wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "papaya, banana, coconut, bay leaf"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, papaya, banana"
            }
          ]
        },
        "shot": {
          "name": "Lemon Papaya Banana Shot",
          "tagline": "One-sip tropical drift",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1 oz cachaça with 0.75 oz fresh papaya puree and 0.25 oz banana puree.",
            "Add 0.25 oz fresh lemon juice and a tiny pinch of vanilla powder.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1 oz cachaça",
            "0.75 oz fresh papaya puree",
            "0.25 oz banana puree",
            "0.25 oz fresh lemon juice",
            "tiny pinch of vanilla powder",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "papaya, banana"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, papaya"
            }
          ]
        }
      }
    },
    {
      "id": 19,
      "name": "Tropicanna Cherry",
      "farm": "Sunrise Gardens",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Caryophyllene": 0.37,
        "Limonene": 0.29,
        "Linalool": 0.15,
        "α-Humulene": 0.11
      },
      "terpeneRatios": {
        "β-Caryophyllene": 40,
        "Limonene": 32,
        "Linalool": 16,
        "α-Humulene": 12
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "HIGH",
      "categories": [
        "creativeFlow",
        "euphoricLift"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Black pepper for the caryophyllene backbone. Sweet orange captures the sweet citrus. Geranium adds cherry-like notes.",
      "recipes": {
        "mocktail": {
          "name": "Tropicanna Cherry",
          "tagline": "Tart cherry with bright citrus lift",
          "glass": "coupe",
          "volume": "6 oz",
          "method": [
            "In a mixing glass, combine 2.5 oz fresh tart cherry juice (or cherry puree strained) and 1 oz fresh blood orange juice.",
            "Add 0.5 oz fresh lemon juice and 0.5 oz coriander-lavender syrup.",
            "Add a tiny pinch of freshly grated nutmeg and 2-3 dashes of coriander bitters.",
            "Fill with ice and stir for 10 seconds until chilled.",
            "Strain into a chilled coupe glass.",
            "Garnish with a fresh cherry, blood orange wheel, and a thin nutmeg dusting."
          ],
          "temp": "chilled",
          "ingredients": [
            "2.5 oz fresh tart cherry juice",
            "1 oz fresh blood orange juice",
            "0.5 oz fresh lemon juice",
            "0.5 oz coriander-lavender syrup",
            "tiny pinch of freshly grated nutmeg",
            "2-3 dashes coriander bitters",
            "fresh cherry (garnish)",
            "blood orange wheel (garnish)",
            "nutmeg dust (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, nutmeg, coriander"
            },
            {
              "terpene": "Limonene",
              "source": "blood orange, lemon, cherry"
            },
            {
              "terpene": "Linalool",
              "source": "lavender, coriander"
            }
          ]
        },
        "cocktail": {
          "name": "Tropicanna Cherry",
          "spirit": "gin",
          "style": "fruit-forward botanical",
          "abv": "16%",
          "tagline": "Gin-spiked cherry with citrus cerebral brightness",
          "glass": "coupe",
          "volume": "6.5 oz",
          "method": [
            "Pour 1.75 oz gin into a mixing glass.",
            "Add 2 oz fresh tart cherry juice and 1 oz fresh blood orange juice.",
            "Pour in 0.5 oz fresh lemon juice and 0.5 oz coriander-lavender syrup.",
            "Add 2-3 dashes coriander bitters and a tiny pinch of freshly grated nutmeg.",
            "Fill with ice and stir for 10 seconds.",
            "Strain into a chilled coupe glass.",
            "Garnish with a fresh cherry, blood orange wheel, and nutmeg dust."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.75 oz gin",
            "2 oz fresh tart cherry juice",
            "1 oz fresh blood orange juice",
            "0.5 oz fresh lemon juice",
            "0.5 oz coriander-lavender syrup",
            "2-3 dashes coriander bitters",
            "tiny pinch of freshly grated nutmeg",
            "fresh cherry (garnish)",
            "blood orange wheel (garnish)",
            "nutmeg dust (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, nutmeg, coriander, gin botanicals"
            },
            {
              "terpene": "Limonene",
              "source": "blood orange, lemon, cherry"
            },
            {
              "terpene": "Linalool",
              "source": "lavender, coriander, gin botanicals"
            },
            {
              "terpene": "α-Humulene",
              "source": "gin hops"
            }
          ]
        },
        "juice": {
          "name": "Tropicanna Cherry Juice",
          "format": "fresh cherry citrus blend",
          "tagline": "Tart cherry with blood orange brightness",
          "volume": "8 oz",
          "method": [
            "Press 1.5 cups fresh tart cherries through a cold press (yields ~3 oz juice).",
            "Squeeze 2 fresh blood oranges for juice (yields ~1.5 oz).",
            "Squeeze 1 fresh lemon for juice (yields ~0.5 oz).",
            "Infuse 2-3 whole coriander seeds and 2-3 dried lavender buds in 1 oz warm filtered water for 2 minutes.",
            "Strain the infusion and combine with all juices.",
            "Add 0.5 oz coriander-lavender syrup.",
            "Add 1.5 oz cold filtered water to reach desired consistency.",
            "Pour over ice and garnish with fresh cherry and blood orange wheel."
          ],
          "timing": "serve immediately to preserve cherry freshness",
          "temp": "chilled",
          "ingredients": [
            "1.5 cups fresh tart cherries",
            "2 fresh blood oranges",
            "1 fresh lemon",
            "2-3 whole coriander seeds",
            "2-3 dried lavender buds",
            "1 oz warm filtered water (infusion)",
            "0.5 oz coriander-lavender syrup",
            "1.5 oz cold filtered water",
            "fresh cherry (garnish)",
            "blood orange wheel (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "coriander"
            },
            {
              "terpene": "Limonene",
              "source": "blood orange, lemon, cherry"
            },
            {
              "terpene": "Linalool",
              "source": "lavender, coriander"
            }
          ]
        },
        "tea": {
          "name": "Tropicanna Cherry Tea",
          "tagline": "Tart cherry with warm spice and floral notes",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 195°F (90°C).",
            "In a tea infuser, combine 1 tbsp dried tart cherry pieces, 1 tsp dried blood orange peel, 4-5 dried lavender buds, 2-3 whole coriander seeds, and 1 whole clove.",
            "Steep for 5 minutes to extract the cherry-spice character.",
            "Strain into a warm teacup.",
            "Stir in a tiny pinch of freshly grated nutmeg.",
            "Garnish with a fresh cherry and thin blood orange wheel."
          ],
          "steepTemp": "195°F (90°C)",
          "steepTime": "5 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried tart cherry pieces, dried blood orange peel, dried lavender buds, whole coriander seeds, whole cloves, freshly grated nutmeg",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried tart cherry pieces",
            "1 tsp dried blood orange peel",
            "4-5 dried lavender buds",
            "2-3 whole coriander seeds",
            "1 whole clove",
            "tiny pinch of freshly grated nutmeg",
            "fresh cherry (garnish)",
            "thin blood orange wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cloves, coriander, nutmeg"
            },
            {
              "terpene": "Limonene",
              "source": "blood orange, cherry"
            },
            {
              "terpene": "Linalool",
              "source": "lavender, coriander"
            }
          ]
        },
        "shot": {
          "name": "Tropicanna Cherry Shot",
          "tagline": "One-sip cherry brightness",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz gin with 0.75 oz fresh tart cherry juice.",
            "Add 0.25 oz fresh blood orange juice and a tiny pinch of freshly grated nutmeg.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz gin",
            "0.75 oz fresh tart cherry juice",
            "0.25 oz fresh blood orange juice",
            "tiny pinch of freshly grated nutmeg",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "nutmeg"
            },
            {
              "terpene": "Limonene",
              "source": "blood orange, cherry"
            }
          ]
        }
      }
    },
    {
      "id": 20,
      "name": "Moonlight",
      "farm": "Moon Gazer Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "Myrcene": 0.74,
        "β-Caryophyllene": 0.51,
        "Terpinolene": 0.38,
        "α-Bisabolol": 0.24
      },
      "terpeneRatios": {
        "Myrcene": 40,
        "β-Caryophyllene": 27,
        "Terpinolene": 20,
        "α-Bisabolol": 13
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "LOW",
      "categories": [
        "cozyComfort",
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. Bergamot is the key ingredient in Earl Grey tea — a direct aroma hit.",
      "recipes": {
        "mocktail": {
          "name": "Moonlight",
          "tagline": "Nighttime watermelon comfort",
          "glass": "rocks",
          "volume": "6 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "In a mixing glass, combine 3 oz fresh watermelon juice and 0.5 oz fresh lemon juice.",
            "Add 1 oz chilled brewed Earl Grey tea (steeped, cooled) and 0.5 oz chamomile-green apple syrup.",
            "Stir in a tiny pinch of ground cinnamon.",
            "Stir gently with ice for 8 seconds.",
            "Strain into the rocks glass.",
            "Garnish with a thin watermelon wedge and an apple slice."
          ],
          "temp": "chilled",
          "ingredients": [
            "large ice cubes",
            "3 oz fresh watermelon juice",
            "0.5 oz fresh lemon juice",
            "1 oz chilled brewed Earl Grey tea",
            "0.5 oz chamomile-green apple syrup",
            "tiny pinch of ground cinnamon",
            "thin watermelon wedge (garnish)",
            "apple slice (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "watermelon, chamomile, lemon"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            },
            {
              "terpene": "Terpinolene",
              "source": "green apple, Earl Grey"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile"
            }
          ]
        },
        "cocktail": {
          "name": "Moonlight",
          "spirit": "cognac",
          "style": "elegant nightcap",
          "abv": "15%",
          "tagline": "Cognac-infused watermelon and Earl Grey ease",
          "glass": "rocks",
          "volume": "6.5 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "Pour 1.5 oz cognac into a mixing glass.",
            "Add 2.5 oz fresh watermelon juice, 0.5 oz fresh lemon juice, and 1 oz chilled brewed Earl Grey tea.",
            "Add 0.5 oz chamomile-green apple syrup and a tiny pinch of ground cinnamon.",
            "Stir with ice for 10 seconds.",
            "Strain into the rocks glass.",
            "Garnish with a thin watermelon wedge and candied apple slice."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.5 oz cognac",
            "2.5 oz fresh watermelon juice",
            "0.5 oz fresh lemon juice",
            "1 oz chilled brewed Earl Grey tea",
            "0.5 oz chamomile-green apple syrup",
            "tiny pinch of ground cinnamon",
            "thin watermelon wedge (garnish)",
            "candied apple slice (garnish)",
            "large ice cubes"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "watermelon, chamomile, lemon"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, cognac"
            },
            {
              "terpene": "Terpinolene",
              "source": "green apple, Earl Grey"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile"
            }
          ]
        },
        "juice": {
          "name": "Moonlight Juice",
          "format": "watermelon tea blend",
          "tagline": "Watermelon and Earl Grey with apple lightness",
          "volume": "8 oz",
          "method": [
            "Press 2 cups fresh watermelon chunks through a cold press (yields ~3 oz juice).",
            "Brew 1 Earl Grey tea bag in 2 oz hot water for 3 minutes, then chill completely.",
            "Blend 0.75 cup fresh green apple chunks until liquid (yields ~0.5 oz juice), strain through cheesecloth.",
            "Steep 4-5 dried chamomile flowers in 1 oz warm filtered water for 2 minutes, then chill.",
            "Combine watermelon juice, cooled Earl Grey, apple juice, and chamomile water.",
            "Add 0.5 oz fresh lemon juice and 0.5 oz chamomile-green apple syrup.",
            "Add 1 oz cold filtered water to reach desired consistency.",
            "Pour over ice and garnish with watermelon wedge and apple slice."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "2 cups fresh watermelon chunks",
            "1 Earl Grey tea bag",
            "2 oz hot water (tea)",
            "0.75 cup fresh green apple chunks",
            "4-5 dried chamomile flowers",
            "1 oz warm filtered water (chamomile)",
            "0.5 oz fresh lemon juice",
            "0.5 oz chamomile-green apple syrup",
            "1 oz cold filtered water",
            "watermelon wedge (garnish)",
            "apple slice (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "watermelon, chamomile, lemon"
            },
            {
              "terpene": "Terpinolene",
              "source": "green apple, Earl Grey"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile"
            }
          ]
        },
        "tea": {
          "name": "Moonlight Tea",
          "tagline": "Soft bergamot and watermelon comfort brew",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 190°F (88°C).",
            "Steep 1 Earl Grey tea bag and 1 green tea bag together for 3 minutes.",
            "Remove tea bags and stir in 0.5 oz fresh watermelon juice (or 0.5 tbsp dried watermelon pieces if available).",
            "Add 4-5 dried chamomile flowers and let steep for 1 more minute.",
            "Strain into a warm teacup.",
            "Stir in a tiny pinch of ground cinnamon and 0.25 oz honey or agave syrup.",
            "Garnish with a thin apple slice and chamomile flower."
          ],
          "steepTemp": "190°F (88°C)",
          "steepTime": "3-4 minutes (in stages)",
          "caffeine": "moderate (black tea and green tea blend)",
          "batchBlend": "Earl Grey tea, green tea, dried chamomile flowers, ground cinnamon, dried watermelon (optional)",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 Earl Grey tea bag",
            "1 green tea bag",
            "0.5 oz fresh watermelon juice",
            "4-5 dried chamomile flowers",
            "tiny pinch of ground cinnamon",
            "0.25 oz honey or agave syrup",
            "thin apple slice (garnish)",
            "dried chamomile flower (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "watermelon, chamomile"
            },
            {
              "terpene": "Terpinolene",
              "source": "Earl Grey, green tea, apple"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            }
          ]
        },
        "shot": {
          "name": "Moonlight Shot",
          "tagline": "One-sip nighttime ease",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1 oz cognac with 0.75 oz fresh watermelon juice.",
            "Add 0.25 oz chilled Earl Grey tea and a tiny pinch of ground cinnamon.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1 oz cognac",
            "0.75 oz fresh watermelon juice",
            "0.25 oz chilled Earl Grey tea",
            "tiny pinch of ground cinnamon",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "watermelon"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon"
            }
          ]
        }
      }
    },
    {
      "id": 21,
      "name": "Natty Bumppo",
      "farm": "Moon Gazer Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Caryophyllene": 0.63,
        "Limonene": 0.35,
        "α-Humulene": 0.25,
        "Myrcene": 0.19
      },
      "terpeneRatios": {
        "β-Caryophyllene": 44,
        "Limonene": 25,
        "α-Humulene": 18,
        "Myrcene": 13
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "LOW",
      "categories": [
        "socialBright",
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Caryophyllene-forward with black pepper as the base. Lemon delivers the limonene. Geranium adds sour plum fruitiness.",
      "recipes": {
        "mocktail": {
          "name": "Natty Bumppo",
          "tagline": "Frontier easy with plum depth",
          "glass": "rocks",
          "volume": "6 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "In a mixing glass, combine 2.5 oz fresh sour plum juice (or umeshu + water) and 0.5 oz fresh lemon juice.",
            "Add 0.5 oz cardamom-vanilla syrup (warm, musky) and 0.5 oz ginger beer.",
            "Stir in 2-3 dashes of aromatic bitters and a tiny pinch of ground hops (or substitute with a single hop flower for garnish aesthetic).",
            "Stir gently with ice for 8 seconds.",
            "Strain into the rocks glass.",
            "Garnish with a plum slice and a sprig of rosemary."
          ],
          "temp": "chilled",
          "ingredients": [
            "large ice cubes",
            "2.5 oz fresh sour plum juice",
            "0.5 oz fresh lemon juice",
            "0.5 oz cardamom-vanilla syrup",
            "0.5 oz ginger beer",
            "2-3 dashes aromatic bitters",
            "tiny pinch of ground hops (or hop flower garnish)",
            "plum slice (garnish)",
            "rosemary sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cardamom, hops"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, plum"
            },
            {
              "terpene": "α-Humulene",
              "source": "hops, ginger"
            }
          ]
        },
        "cocktail": {
          "name": "Natty Bumppo",
          "spirit": "rye whiskey",
          "style": "rustic frontier",
          "abv": "17%",
          "tagline": "Rye-spiked plum and woodsman warmth",
          "glass": "rocks",
          "volume": "6.5 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "Pour 2 oz rye whiskey into a mixing glass.",
            "Add 2 oz fresh sour plum juice, 0.5 oz fresh lemon juice, and 0.5 oz cardamom-vanilla syrup.",
            "Add 0.5 oz ginger beer and 2-3 dashes of aromatic bitters.",
            "Stir in a tiny pinch of ground hops.",
            "Stir with ice for 10 seconds.",
            "Strain into the rocks glass.",
            "Garnish with a brandied plum and a rosemary sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "2 oz rye whiskey",
            "2 oz fresh sour plum juice",
            "0.5 oz fresh lemon juice",
            "0.5 oz cardamom-vanilla syrup",
            "0.5 oz ginger beer",
            "2-3 dashes aromatic bitters",
            "tiny pinch of ground hops",
            "brandied plum (garnish)",
            "rosemary sprig (garnish)",
            "large ice cubes"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cardamom, hops, rye whiskey"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, plum"
            },
            {
              "terpene": "α-Humulene",
              "source": "hops, ginger, rye whiskey"
            }
          ]
        },
        "juice": {
          "name": "Natty Bumppo Juice",
          "format": "plum-spice blend",
          "tagline": "Sour plum with cardamom earthiness",
          "volume": "8 oz",
          "method": [
            "Press 1.5 cups fresh sour plums (pitted) through a cold press (yields ~2.5 oz juice).",
            "Squeeze 1 fresh lemon for juice (yields ~0.5 oz).",
            "Brew 1 cup ginger beer (homemade or quality store-bought).",
            "Infuse 3-4 cracked cardamom pods in 1 oz warm filtered water for 3 minutes.",
            "Strain the cardamom infusion and combine with plum juice, lemon juice, and 0.5 oz of the ginger beer.",
            "Add 0.5 oz vanilla extract and 0.5 oz cardamom-vanilla syrup.",
            "Add 2 oz cold filtered water to reach desired consistency.",
            "Pour over ice and garnish with plum slice and rosemary sprig."
          ],
          "timing": "serve immediately to preserve plum freshness",
          "temp": "chilled",
          "ingredients": [
            "1.5 cups fresh sour plums (pitted)",
            "1 fresh lemon",
            "1 cup ginger beer",
            "3-4 whole cardamom pods",
            "1 oz warm filtered water (cardamom infusion)",
            "0.5 oz vanilla extract",
            "0.5 oz cardamom-vanilla syrup",
            "2 oz cold filtered water",
            "plum slice (garnish)",
            "rosemary sprig (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cardamom, ginger"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, plum"
            },
            {
              "terpene": "α-Humulene",
              "source": "ginger"
            }
          ]
        },
        "tea": {
          "name": "Natty Bumppo Tea",
          "tagline": "Frontier herbal blend with plum warmth",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 200°F (93°C).",
            "In a tea infuser, combine 1 tbsp dried plum pieces, 4-5 whole cardamom pods (cracked), 3-4 ginger slices, 1 small rosemary sprig, and 2-3 whole cloves.",
            "Steep for 6 minutes to extract the rustic, earthy character.",
            "Strain into a warm teacup.",
            "Stir in 0.5 oz vanilla extract and 0.25 oz honey.",
            "Garnish with a rosemary sprig and thin plum slice."
          ],
          "steepTemp": "200°F (93°C)",
          "steepTime": "6 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried plum pieces, whole cardamom pods, dried ginger slices, dried rosemary, whole cloves, vanilla powder",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried plum pieces",
            "4-5 whole cardamom pods (cracked)",
            "3-4 fresh ginger slices (or 1 tsp dried)",
            "1 small rosemary sprig",
            "2-3 whole cloves",
            "0.5 oz vanilla extract",
            "0.25 oz honey",
            "rosemary sprig (garnish)",
            "thin plum slice (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cardamom, cloves, ginger, rosemary"
            },
            {
              "terpene": "Limonene",
              "source": "plum, ginger, rosemary"
            },
            {
              "terpene": "α-Humulene",
              "source": "cloves, ginger"
            }
          ]
        },
        "shot": {
          "name": "Natty Bumppo Shot",
          "tagline": "One-sip frontier ease",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz rye whiskey with 0.75 oz fresh sour plum juice.",
            "Add 0.25 oz cardamom-vanilla syrup and 1 dash aromatic bitters.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz rye whiskey",
            "0.75 oz fresh sour plum juice",
            "0.25 oz cardamom-vanilla syrup",
            "1 dash aromatic bitters",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "cardamom, rye whiskey"
            },
            {
              "terpene": "Limonene",
              "source": "plum"
            }
          ]
        }
      }
    },
    {
      "id": 22,
      "name": "Black Lime Chem",
      "farm": "Moon Gazer Farms",
      "region": "Mendocino",
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
      "terpenes": {
        "Myrcene": 1.69,
        "α-Pinene": 0.39,
        "β-Caryophyllene": 0.27,
        "β-Ocimene": 0.19
      },
      "terpeneRatios": {
        "Myrcene": 67,
        "α-Pinene": 15,
        "β-Caryophyllene": 11,
        "β-Ocimene": 7
      },
      "dominantTerpene": "Myrcene",
      "energyTier": "LOW",
      "categories": [
        "deepRest"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Heavy myrcene strain for sleep and bliss. Pine delivers the pinene for a brief clarity window. Lemon for the sharp lime aroma.",
      "recipes": {
        "mocktail": {
          "name": "Black Lime Chem",
          "tagline": "Weighted lime-rhubarb bliss",
          "glass": "rocks",
          "volume": "6 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "In a mixing glass, combine 2 oz fresh lime juice and 1.5 oz rhubarb syrup (or rhubarb puree + simple syrup).",
            "Add 1 small rosemary sprig and 3-4 fresh basil leaves.",
            "Muddle very gently for 2 seconds to release herb oils.",
            "Add 1 small bay leaf and 0.5 oz cinnamon-infused syrup.",
            "Stir with ice for 8 seconds.",
            "Strain into the rocks glass, discarding herbs and bay leaf.",
            "Garnish with a thin lime wheel and a rosemary sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "large ice cubes",
            "2 oz fresh lime juice",
            "1.5 oz rhubarb syrup",
            "1 small rosemary sprig",
            "3-4 fresh basil leaves",
            "1 small bay leaf",
            "0.5 oz cinnamon-infused syrup",
            "thin lime wheel (garnish)",
            "rosemary sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lime, rosemary, basil, bay leaf"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, basil"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, rosemary"
            }
          ]
        },
        "cocktail": {
          "name": "Black Lime Chem",
          "spirit": "mezcal",
          "style": "smoky herbal",
          "abv": "16%",
          "tagline": "Mezcal smoke meets lime-rhubarb depth",
          "glass": "rocks",
          "volume": "6.5 oz",
          "method": [
            "Fill a rocks glass with large ice cubes.",
            "Pour 1.75 oz mezcal into a mixing glass.",
            "Add 2 oz fresh lime juice and 1.5 oz rhubarb syrup.",
            "Add 1 small rosemary sprig, 4-5 fresh basil leaves, and 1 small bay leaf.",
            "Muddle very gently for 2 seconds.",
            "Add 0.5 oz cinnamon-infused syrup and 2-3 dashes of peppercorn bitters.",
            "Stir with ice for 10 seconds.",
            "Strain into the rocks glass, discarding solids.",
            "Garnish with a thin black lime wheel (if available) or regular lime wheel, and a rosemary sprig."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.75 oz mezcal",
            "2 oz fresh lime juice",
            "1.5 oz rhubarb syrup",
            "1 small rosemary sprig",
            "4-5 fresh basil leaves",
            "1 small bay leaf",
            "0.5 oz cinnamon-infused syrup",
            "2-3 dashes peppercorn bitters",
            "thin black lime wheel or lime wheel (garnish)",
            "rosemary sprig (garnish)",
            "large ice cubes"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lime, rosemary, basil, bay leaf, mezcal smoke"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil, mezcal"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, basil, peppercorn bitters, mezcal smoke"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, rosemary"
            }
          ]
        },
        "juice": {
          "name": "Black Lime Chem Juice",
          "format": "lime-rhubarb herbal blend",
          "tagline": "Sharp lime with rhubarb tart-sweetness",
          "volume": "8 oz",
          "method": [
            "Juice 4-5 fresh limes through a citrus juicer (yields ~2 oz juice).",
            "Blend 1 cup fresh rhubarb stalks (chopped) until liquid (yields ~1.5 oz juice).",
            "Strain rhubarb through fine mesh.",
            "Infuse 1 small rosemary sprig and 5-6 fresh basil leaves in 1.5 oz warm filtered water for 2 minutes.",
            "Strain the herb water and combine with lime juice and rhubarb juice.",
            "Add 1 small bay leaf (infuse for 1 minute, then remove).",
            "Stir in 0.5 oz rhubarb syrup and a tiny pinch of ground cinnamon.",
            "Add 1 oz cold filtered water to reach desired consistency.",
            "Pour over ice and garnish with thin lime wheel and basil leaf."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "4-5 fresh limes",
            "1 cup fresh rhubarb stalks (chopped)",
            "1 small rosemary sprig",
            "5-6 fresh basil leaves",
            "1.5 oz warm filtered water (herb infusion)",
            "1 small bay leaf",
            "0.5 oz rhubarb syrup",
            "tiny pinch of ground cinnamon",
            "1 oz cold filtered water",
            "thin lime wheel (garnish)",
            "fresh basil leaf (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lime, rosemary, basil, bay leaf"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, basil"
            }
          ]
        },
        "tea": {
          "name": "Black Lime Chem Tea",
          "tagline": "Sharp-sweet herbal with rhubarb depth",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 190°F (88°C).",
            "In a tea infuser, combine 1 tbsp dried rhubarb pieces, 1 tsp dried lime peel, 2-3 dried rosemary sprigs, 5-6 dried basil leaves, 1 small bay leaf, and a pinch of ground cinnamon.",
            "Steep for 6-7 minutes to extract the tart-herbal character.",
            "Strain into a warm teacup, discarding solids.",
            "Stir in 0.25 oz agave syrup (to balance rhubarb tartness).",
            "Garnish with a thin lime wheel and fresh rosemary sprig."
          ],
          "steepTemp": "190°F (88°C)",
          "steepTime": "6-7 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried rhubarb pieces, dried lime peel, dried rosemary, dried basil, bay leaf, ground cinnamon",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried rhubarb pieces",
            "1 tsp dried lime peel",
            "2-3 dried rosemary sprigs",
            "5-6 dried basil leaves",
            "1 small bay leaf",
            "pinch of ground cinnamon",
            "0.25 oz agave syrup",
            "thin lime wheel (garnish)",
            "fresh rosemary sprig (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lime, rosemary, basil, bay leaf"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary, basil"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, basil"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, rosemary"
            }
          ]
        },
        "shot": {
          "name": "Black Lime Chem Shot",
          "tagline": "One-sip weighted lime depth",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1.25 oz mezcal with 0.75 oz fresh lime juice.",
            "Add 0.25 oz rhubarb syrup and a tiny pinch of ground cinnamon.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1.25 oz mezcal",
            "0.75 oz fresh lime juice",
            "0.25 oz rhubarb syrup",
            "tiny pinch of ground cinnamon",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Myrcene",
              "source": "lime, mezcal"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "cinnamon, mezcal smoke"
            }
          ]
        }
      }
    },
    {
      "id": 23,
      "name": "Pineapple Mojito",
      "farm": "Higher Heights",
      "region": "Mendocino",
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
      "terpenes": {
        "β-Caryophyllene": 0.63,
        "Limonene": 0.56,
        "α-Bisabolol": 0.24,
        "α-Humulene": 0.19,
        "Linalool": 0.16,
        "α-Pinene": 0.14,
        "Myrcene": 0.11
      },
      "terpeneRatios": {
        "β-Caryophyllene": 31,
        "Limonene": 28,
        "α-Bisabolol": 12,
        "α-Humulene": 9,
        "Linalool": 8,
        "α-Pinene": 7,
        "Myrcene": 5
      },
      "dominantTerpene": "β-Caryophyllene",
      "energyTier": "MEDIUM",
      "categories": [
        "socialBright",
        "cozyComfort",
        "groundedPresent"
      ],
      "badge": null,
      "oilRecipe": [
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
      "oilRationale": "Seven-oil blend reflecting unusually broad terpene diversity. The complexity mirrors the strain's seven significant terpenes.",
      "recipes": {
        "mocktail": {
          "name": "Pineapple Mojito",
          "tagline": "Fresh pineapple mojito with grounded ease",
          "glass": "highball",
          "volume": "7 oz",
          "method": [
            "In a highball glass, muddle 8-10 fresh mint leaves gently to release aroma (do not bruise harshly).",
            "Add 0.5 oz fresh lime juice and 0.5 oz fresh lemon juice.",
            "Pour in 2.5 oz fresh pineapple juice.",
            "Add 0.75 oz ginger juice (fresh ginger pressed) and 0.25 oz chamomile-infused syrup.",
            "Fill the glass with crushed ice.",
            "Top with 2 oz sparkling water and stir gently.",
            "Garnish with a pineapple wedge, sprig of fresh mint, and a thin lime wheel."
          ],
          "temp": "chilled",
          "ingredients": [
            "8-10 fresh mint leaves",
            "0.5 oz fresh lime juice",
            "0.5 oz fresh lemon juice",
            "2.5 oz fresh pineapple juice",
            "0.75 oz ginger juice",
            "0.25 oz chamomile-infused syrup",
            "crushed ice",
            "2 oz sparkling water",
            "pineapple wedge (garnish)",
            "fresh mint sprig (garnish)",
            "thin lime wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "ginger, mint, pineapple"
            },
            {
              "terpene": "Limonene",
              "source": "lime, lemon, pineapple, mint"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile, ginger"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, ginger, pineapple"
            },
            {
              "terpene": "Linalool",
              "source": "mint, lavender (if in syrup)"
            },
            {
              "terpene": "α-Pinene",
              "source": "rosemary (optional, see note)"
            },
            {
              "terpene": "α-Humulene",
              "source": "ginger, hops (optional)"
            }
          ]
        },
        "cocktail": {
          "name": "Pineapple Mojito",
          "spirit": "white rum",
          "style": "tropical classic",
          "abv": "14%",
          "tagline": "White rum pineapple mojito with ginger warmth",
          "glass": "highball",
          "volume": "7.5 oz",
          "method": [
            "In a highball glass, muddle 8-10 fresh mint leaves gently.",
            "Add 0.5 oz fresh lime juice and 0.5 oz fresh lemon juice.",
            "Pour in 1.5 oz white rum.",
            "Add 2 oz fresh pineapple juice and 0.75 oz ginger juice.",
            "Add 0.25 oz chamomile-infused syrup.",
            "Fill the glass with crushed ice.",
            "Top with 1.5 oz sparkling water and stir gently.",
            "Garnish with a pineapple wedge, fresh mint sprig, and lime wheel."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.5 oz white rum",
            "8-10 fresh mint leaves",
            "0.5 oz fresh lime juice",
            "0.5 oz fresh lemon juice",
            "2 oz fresh pineapple juice",
            "0.75 oz ginger juice",
            "0.25 oz chamomile-infused syrup",
            "crushed ice",
            "1.5 oz sparkling water",
            "pineapple wedge (garnish)",
            "fresh mint sprig (garnish)",
            "lime wheel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "ginger, mint, pineapple, rum"
            },
            {
              "terpene": "Limonene",
              "source": "lime, lemon, pineapple, mint, rum"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile, ginger"
            },
            {
              "terpene": "α-Humulene",
              "source": "ginger, rum"
            },
            {
              "terpene": "Linalool",
              "source": "mint, chamomile"
            },
            {
              "terpene": "α-Pinene",
              "source": "mint"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, ginger, pineapple"
            }
          ]
        },
        "juice": {
          "name": "Pineapple Mojito Juice",
          "format": "tropical mint blend",
          "tagline": "Fresh pineapple and mint with ginger brightness",
          "volume": "8 oz",
          "method": [
            "Juice 1 fresh ripe pineapple through a cold press (yields ~3 oz juice).",
            "Squeeze 2 fresh limes for juice (yields ~0.75 oz).",
            "Squeeze 1 fresh lemon for juice (yields ~0.5 oz).",
            "Press 1 oz fresh ginger root through a juicer (yields ~0.75 oz ginger juice).",
            "Blend 10-12 fresh mint leaves with 1 oz cool mineral water, then strain through cheesecloth (yields ~0.75 oz mint water).",
            "Combine all juices and mint water.",
            "Stir in 0.25 oz chamomile-infused syrup.",
            "Add 1 oz sparkling water.",
            "Pour over crushed ice and garnish with pineapple wedge, mint sprig, and lime wheel."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "1 fresh ripe pineapple",
            "2 fresh limes",
            "1 fresh lemon",
            "1 oz fresh ginger root",
            "10-12 fresh mint leaves",
            "1 oz cool mineral water (mint extraction)",
            "0.25 oz chamomile-infused syrup",
            "1 oz sparkling water",
            "pineapple wedge (garnish)",
            "fresh mint sprig (garnish)",
            "lime wheel (garnish)",
            "crushed ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "ginger, mint, pineapple"
            },
            {
              "terpene": "Limonene",
              "source": "lime, lemon, pineapple, mint"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile, ginger"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, ginger, pineapple"
            }
          ]
        },
        "tea": {
          "name": "Pineapple Mojito Tea",
          "tagline": "Tropical pineapple-mint herbal blend",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 165°F (74°C).",
            "In a tea infuser, combine 1 tbsp dried pineapple pieces, 8-10 dried mint leaves, 0.5 tbsp dried lime peel, 1 tsp dried ginger slices, and 4-5 dried chamomile flowers.",
            "Steep for 4-5 minutes to extract the tropical-herbal character gently.",
            "Strain into a warm teacup.",
            "Stir in 0.25 oz chamomile-infused syrup or honey.",
            "Garnish with a fresh mint sprig and thin pineapple slice."
          ],
          "steepTemp": "165°F (74°C)",
          "steepTime": "4-5 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried pineapple pieces, dried mint, dried lime peel, dried ginger, dried chamomile flowers",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tbsp dried pineapple pieces",
            "8-10 dried mint leaves",
            "0.5 tbsp dried lime peel",
            "1 tsp dried ginger slices",
            "4-5 dried chamomile flowers",
            "0.25 oz chamomile-infused syrup or honey",
            "fresh mint sprig (garnish)",
            "thin pineapple slice (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "ginger, mint, pineapple"
            },
            {
              "terpene": "Limonene",
              "source": "lime, pineapple, mint"
            },
            {
              "terpene": "α-Bisabolol",
              "source": "chamomile, ginger"
            },
            {
              "terpene": "Linalool",
              "source": "mint, chamomile"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, ginger, pineapple"
            }
          ]
        },
        "shot": {
          "name": "Pineapple Mojito Shot",
          "tagline": "One-sip tropical mojito energy",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, muddle 3-4 fresh mint leaves very gently.",
            "Add 0.75 oz white rum and 0.75 oz fresh pineapple juice.",
            "Add 0.25 oz fresh lime juice and 0.1 oz ginger juice.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass and serve immediately with a mint leaf on top."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "3-4 fresh mint leaves",
            "0.75 oz white rum",
            "0.75 oz fresh pineapple juice",
            "0.25 oz fresh lime juice",
            "0.1 oz ginger juice",
            "fresh mint leaf (garnish, on top)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "β-Caryophyllene",
              "source": "ginger, mint, pineapple"
            },
            {
              "terpene": "Limonene",
              "source": "lime, pineapple, mint"
            },
            {
              "terpene": "Myrcene",
              "source": "mint, ginger, pineapple"
            }
          ]
        }
      }
    },
    {
      "id": 24,
      "name": "Pink Rider",
      "farm": "Higher Heights",
      "region": "Mendocino",
      "intent": "Vivid creative lift with social magnetism.",
      "effects": [
        "Motivated",
        "Creative",
        "Social"
      ],
      "aroma": [
        "Lemon Bar",
        "Pink Grapefruit",
        "Sugar Cookie"
      ],
      "totalTerpenes": 1.44,
      "terpenes": {
        "Terpinolene": 0.38,
        "β-Caryophyllene": 0.22,
        "β-Ocimene": 0.2,
        "Limonene": 0.18
      },
      "terpeneRatios": {
        "Terpinolene": 39,
        "β-Caryophyllene": 22,
        "β-Ocimene": 20,
        "Limonene": 18
      },
      "dominantTerpene": "Terpinolene",
      "energyTier": "HIGH",
      "categories": [
        "creativeFlow",
        "socialBright"
      ],
      "badge": null,
      "oilRecipe": [
        {
          "name": "Tea Tree",
          "drops": 12,
          "terpene": "Terpinolene"
        },
        {
          "name": "Black Pepper",
          "drops": 8,
          "terpene": "β-Caryophyllene"
        },
        {
          "name": "Basil",
          "drops": 8,
          "terpene": "β-Ocimene"
        },
        {
          "name": "Lemon",
          "drops": 6,
          "terpene": "Limonene"
        },
        {
          "name": "Lavender",
          "drops": 4,
          "terpene": "Linalool"
        },
        {
          "name": "Geranium",
          "drops": 2,
          "terpene": "Floral"
        }
      ],
      "oilRationale": "Tea tree delivers the rare terpinolene (30% of blend). Basil captures ocimene's herbal brightness. Lemon echoes the lemon bar aroma.",
      "recipes": {
        "mocktail": {
          "name": "Pink Rider",
          "tagline": "Pink grapefruit with creative sugar sparkle",
          "glass": "coupe",
          "volume": "6 oz",
          "method": [
            "In a mixing glass, combine 2.75 oz fresh pink grapefruit juice and 0.75 oz fresh lemon juice.",
            "Add 0.5 oz lemon curd (or lemon curd syrup) for richness and vanilla sweetness.",
            "Stir in 0.5 oz green apple juice (pressed from fresh green apple) and 0.25 oz sugar syrup.",
            "Add 2-3 dashes of citrus bitters.",
            "Fill with ice and stir gently for 8 seconds.",
            "Strain into a coupe glass rimmed with powdered sugar and a light vanilla dust.",
            "Garnish with a thin pink grapefruit wheel and a lemon peel curl."
          ],
          "temp": "chilled",
          "ingredients": [
            "2.75 oz fresh pink grapefruit juice",
            "0.75 oz fresh lemon juice",
            "0.5 oz lemon curd (or lemon curd syrup)",
            "0.5 oz green apple juice",
            "0.25 oz sugar syrup",
            "2-3 dashes citrus bitters",
            "powdered sugar and vanilla dust (rim)",
            "thin pink grapefruit wheel (garnish)",
            "lemon peel curl (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Terpinolene",
              "source": "green apple, lemon, pink grapefruit"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "basil (optional garnish)"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil (optional garnish)"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, pink grapefruit, lemon curd"
            }
          ]
        },
        "cocktail": {
          "name": "Pink Rider",
          "spirit": "gin",
          "style": "citrus aperitif",
          "abv": "15%",
          "tagline": "Gin-spiked pink grapefruit with creative lift",
          "glass": "coupe",
          "volume": "6.5 oz",
          "method": [
            "Pour 1.75 oz gin into a mixing glass.",
            "Add 2 oz fresh pink grapefruit juice and 0.75 oz fresh lemon juice.",
            "Add 0.5 oz lemon curd syrup and 0.5 oz green apple juice.",
            "Add 0.25 oz sugar syrup and 2-3 dashes citrus bitters.",
            "Add 2-3 small fresh basil leaves and 1 sprig fresh rosemary.",
            "Stir gently with ice for 10 seconds (do not muddle).",
            "Strain into a coupe glass rimmed with powdered sugar.",
            "Garnish with a thin pink grapefruit wheel, lemon peel curl, and fresh basil leaf."
          ],
          "temp": "chilled",
          "ingredients": [
            "1.75 oz gin",
            "2 oz fresh pink grapefruit juice",
            "0.75 oz fresh lemon juice",
            "0.5 oz lemon curd syrup",
            "0.5 oz green apple juice",
            "0.25 oz sugar syrup",
            "2-3 dashes citrus bitters",
            "2-3 small fresh basil leaves",
            "1 sprig fresh rosemary",
            "powdered sugar (rim)",
            "thin pink grapefruit wheel (garnish)",
            "lemon peel curl (garnish)",
            "fresh basil leaf (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Terpinolene",
              "source": "green apple, lemon, pink grapefruit, gin botanicals"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "basil, gin botanicals"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, rosemary"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, pink grapefruit, gin botanicals"
            }
          ]
        },
        "juice": {
          "name": "Pink Rider Juice",
          "format": "citrus-apple blend",
          "tagline": "Pink grapefruit with lemon cookie sweetness",
          "volume": "8 oz",
          "method": [
            "Juice 2 fresh pink grapefruits through a citrus juicer (yields ~2.75 oz juice).",
            "Juice 2 fresh lemons through a citrus juicer (yields ~1 oz juice).",
            "Juice 2-3 fresh green apples through a cold press (yields ~0.75 oz juice).",
            "Strain all juices through fine mesh.",
            "Blend 0.5 tbsp lemon curd with 0.25 oz warm filtered water until smooth.",
            "Combine all juices with the lemon curd mixture.",
            "Stir in 0.25 oz vanilla extract and 0.25 oz sugar syrup.",
            "Add 1.5 oz cold filtered water to reach desired consistency.",
            "Pour over ice into a coupe glass rimmed with powdered sugar.",
            "Garnish with pink grapefruit wheel and lemon peel curl."
          ],
          "timing": "serve immediately after preparation",
          "temp": "chilled",
          "ingredients": [
            "2 fresh pink grapefruits",
            "2 fresh lemons",
            "2-3 fresh green apples",
            "0.5 tbsp lemon curd",
            "0.25 oz warm filtered water",
            "0.25 oz vanilla extract",
            "0.25 oz sugar syrup",
            "1.5 oz cold filtered water",
            "powdered sugar (rim)",
            "pink grapefruit wheel (garnish)",
            "lemon peel curl (garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Terpinolene",
              "source": "green apple, lemon, pink grapefruit"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, pink grapefruit"
            }
          ]
        },
        "tea": {
          "name": "Pink Rider Tea",
          "tagline": "Citrus and vanilla with gentle sparkling lift",
          "glass": "teacup",
          "volume": "8 oz",
          "method": [
            "Heat 8 oz filtered water to 185°F (85°C).",
            "In a tea infuser, combine 1 tsp dried pink grapefruit peel, 0.75 tsp dried lemon peel, 3-4 dried green apple pieces, 0.5 tsp dried basil, 0.25 tsp dried rosemary, and a tiny pinch of vanilla powder.",
            "Steep for 4 minutes to extract the bright citrus character.",
            "Strain into a warm teacup.",
            "Stir in 0.25 oz sugar syrup or honey and 0.1 oz vanilla extract.",
            "Garnish with a thin pink grapefruit wheel and lemon peel."
          ],
          "steepTemp": "185°F (85°C)",
          "steepTime": "4 minutes",
          "caffeine": "none (herbal blend)",
          "batchBlend": "dried pink grapefruit peel, dried lemon peel, dried green apple pieces, dried basil, dried rosemary, vanilla powder",
          "temp": "warm",
          "ingredients": [
            "8 oz filtered water",
            "1 tsp dried pink grapefruit peel",
            "0.75 tsp dried lemon peel",
            "3-4 dried green apple pieces",
            "0.5 tsp dried basil",
            "0.25 tsp dried rosemary",
            "tiny pinch of vanilla powder",
            "0.25 oz sugar syrup or honey",
            "0.1 oz vanilla extract",
            "thin pink grapefruit wheel (garnish)",
            "lemon peel (garnish)"
          ],
          "terpeneMap": [
            {
              "terpene": "Terpinolene",
              "source": "green apple, lemon, pink grapefruit"
            },
            {
              "terpene": "β-Caryophyllene",
              "source": "basil, rosemary"
            },
            {
              "terpene": "β-Ocimene",
              "source": "basil, rosemary"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, pink grapefruit"
            }
          ]
        },
        "shot": {
          "name": "Pink Rider Shot",
          "tagline": "One-sip citrus creative spark",
          "glass": "shot glass",
          "volume": "2 oz",
          "method": [
            "Chill a shot glass in the freezer for 2 minutes.",
            "In a mixing glass, combine 1 oz gin with 0.75 oz fresh pink grapefruit juice.",
            "Add 0.25 oz fresh lemon juice and 0.1 oz lemon curd syrup.",
            "Stir with ice for 5 seconds.",
            "Strain into the chilled shot glass.",
            "Garnish rim with powdered sugar and serve immediately."
          ],
          "timing": "serve ice-cold, one sip",
          "temp": "frozen",
          "ingredients": [
            "1 oz gin",
            "0.75 oz fresh pink grapefruit juice",
            "0.25 oz fresh lemon juice",
            "0.1 oz lemon curd syrup",
            "powdered sugar (rim garnish)",
            "ice"
          ],
          "terpeneMap": [
            {
              "terpene": "Terpinolene",
              "source": "lemon, pink grapefruit"
            },
            {
              "terpene": "Limonene",
              "source": "lemon, pink grapefruit, gin"
            }
          ]
        }
      }
    }
  ]
};

const THEME = {
  bg: "#0C0C0C",
  bgCard: "#161412",
  bgCardHover: "#1E1A16",
  bgSurface: "#1A1816",
  border: "#2A2622",
  borderLight: "#1E1C1A",
  text: "#F5F0E8",
  textSecondary: "#9B9185",
  textMuted: "#6B6560",
  gold: "#C8A97E",
  goldDim: "rgba(200,169,126,0.15)",
  sage: "#7C9082",
  sageDim: "rgba(124,144,130,0.15)",
  wine: "#8B5E5E",
  wineDim: "rgba(139,94,94,0.12)",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const CATEGORIES = {
  mocktail: { icon: "🍸", label: "Mocktail", color: "#8EAE68" },
  cocktail: { icon: "🥃", label: "Cocktail", color: "#C8A97E" },
  juice: { icon: "🥤", label: "Juice", color: "#D4C85C" },
  tea: { icon: "🍵", label: "Tea", color: "#9B7BA8" },
  shot: { icon: "⚡", label: "Shot", color: "#B8785C" },
};

const ENERGY = {
  HIGH: { label: "High", color: "#D4C85C", icon: "↑" },
  MEDIUM: { label: "Med", color: "#C8A97E", icon: "→" },
  LOW: { label: "Low", color: "#9B7BA8", icon: "↓" },
};

export default function TerpeneRecipeBook() {
  const [view, setView] = useState("grid");
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("mocktail");
  const [search, setSearch] = useState("");
  const [filterVibe, setFilterVibe] = useState(null);
  const [filterEnergy, setFilterEnergy] = useState(null);
  const [filterTerpene, setFilterTerpene] = useState(null);

  // Compute dominant terpene for each strain
  const strainMap = useMemo(() => {
    const map = {};
    DATA.strains.forEach((strain) => {
      const dominant = Object.entries(strain.terpeneRatios || strain.terpenes || {})
        .sort(([, a], [, b]) => b - a)[0];
      map[strain.id] = {
        ...strain,
        dominantTerpene: dominant ? dominant[0] : "Unknown",
        dominantRatio: dominant ? dominant[1] : 0,
      };
    });
    return map;
  }, []);

  // Compute recipes map
  const recipesMap = useMemo(() => {
    const map = {};
    DATA.strains.forEach((strain) => {
      if (strain.recipes) {
        Object.entries(strain.recipes).forEach(([category, recipe]) => {
          map[`${strain.id}-${category}`] = { ...recipe, category, strainId: strain.id };
        });
      }
    });
    return map;
  }, []);

  // Filter & sort strains for grid view
  const filteredStrains = useMemo(() => {
    return Object.values(strainMap).filter((strain) => {
      if (search && !strain.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (
        filterVibe &&
        (!strain.vibes || !strain.vibes.some((v) => v === filterVibe))
      ) {
        return false;
      }
      if (filterEnergy && strain.energyTier !== filterEnergy) {
        return false;
      }
      if (
        filterTerpene &&
        !Object.keys(strain.terpenes || {}).includes(filterTerpene)
      ) {
        return false;
      }
      return true;
    });
  }, [search, filterVibe, filterEnergy, filterTerpene, strainMap]);

  const hasActiveFilters =
    search || filterVibe || filterEnergy || filterTerpene;

  const clearFilters = useCallback(() => {
    setSearch("");
    setFilterVibe(null);
    setFilterEnergy(null);
    setFilterTerpene(null);
  }, []);

  const goToDetail = useCallback(
    (strain) => {
      setSelectedStrain(strain);
      setView("detail");
      window.scrollTo(0, 0);
    },
    []
  );

  const goBack = useCallback(() => {
    setView("grid");
    setSelectedStrain(null);
  }, []);

  if (view === "detail" && selectedStrain) {
    return (
      <DetailView
        strain={strainMap[selectedStrain.id]}
        recipesMap={recipesMap}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onBack={goBack}
        theme={THEME}
        categories={CATEGORIES}
        energy={ENERGY}
        terpeneColors={DATA.terpeneColors}
        vibes={DATA.vibes}
      />
    );
  }

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh" }}>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: ${THEME.font};
            background: ${THEME.bg};
            color: ${THEME.text};
          }
          button {
            cursor: pointer;
            border: none;
            font-family: ${THEME.font};
          }
          input {
            font-family: ${THEME.font};
          }
        `}
      </style>

      {/* Header */}
      <header
        style={{
          background: THEME.bg,
          borderBottom: `1px solid ${THEME.border}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: THEME.gold,
            marginBottom: "8px",
            letterSpacing: "-1px",
          }}
        >
          Solful Sessions
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: THEME.textSecondary,
            marginBottom: "16px",
          }}
        >
          Terpene Recipe Book
        </p>
        <p style={{ fontSize: "13px", color: THEME.textMuted }}>
          120 Recipes · 24 Strains · 5 Categories
        </p>
      </header>

      {/* Filter Bar */}
      <div
        style={{
          background: THEME.bgSurface,
          borderBottom: `1px solid ${THEME.border}`,
          padding: "20px 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {/* Search */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="🔍 Search strains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: THEME.bg,
              border: `1px solid ${THEME.border}`,
              borderRadius: "6px",
              color: THEME.text,
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = THEME.gold;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = THEME.border;
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                style={{
                  padding: "8px 12px",
                  background:
                    selectedCategory === key ? cat.color : THEME.bgCard,
                  color:
                    selectedCategory === key
                      ? THEME.bg
                      : THEME.textSecondary,
                  border: `1px solid ${
                    selectedCategory === key ? cat.color : THEME.border
                  }`,
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe Filter */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              color: THEME.textMuted,
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Vibe
          </label>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(DATA.vibes).map(([key, vibe]) => (
              <button
                key={key}
                onClick={() =>
                  setFilterVibe(filterVibe === key ? null : key)
                }
                style={{
                  padding: "6px 10px",
                  background:
                    filterVibe === key
                      ? vibe.color
                      : THEME.border,
                  color: THEME.text,
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "11px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: filterVibe === key ? 1 : 0.6,
                }}
              >
                {vibe.name}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Filter */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              color: THEME.textMuted,
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Energy
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {Object.entries(ENERGY).map(([key, en]) => (
              <button
                key={key}
                onClick={() =>
                  setFilterEnergy(filterEnergy === key ? null : key)
                }
                style={{
                  padding: "6px 12px",
                  background:
                    filterEnergy === key ? en.color : THEME.border,
                  color: THEME.text,
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: filterEnergy === key ? 1 : 0.6,
                }}
              >
                {en.icon} {en.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terpene Filter */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              fontSize: "12px",
              color: THEME.textMuted,
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Terpenes
          </label>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(DATA.terpeneColors).map(([terpene, color]) => (
              <button
                key={terpene}
                onClick={() =>
                  setFilterTerpene(filterTerpene === terpene ? null : terpene)
                }
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: color,
                  border:
                    filterTerpene === terpene
                      ? `3px solid ${THEME.gold}`
                      : `2px solid ${THEME.border}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  title: terpene,
                }}
              />
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: "transparent",
              color: THEME.gold,
              border: "none",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "8px",
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Strain Grid */}
      <div
        style={{
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "16px",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {filteredStrains.map((strain) => (
          <StrainCard
            key={strain.id}
            strain={strain}
            onClick={() => goToDetail(strain)}
            theme={THEME}
            categories={CATEGORIES}
            energy={ENERGY}
            terpeneColors={DATA.terpeneColors}
            vibes={DATA.vibes}
          />
        ))}
      </div>

      {filteredStrains.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            color: THEME.textMuted,
          }}
        >
          <p style={{ fontSize: "16px", marginBottom: "8px" }}>
            No strains match your filters.
          </p>
          <button
            onClick={clearFilters}
            style={{
              background: "transparent",
              color: THEME.gold,
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "8px",
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function StrainCard({
  strain,
  onClick,
  theme,
  categories,
  energy,
  terpeneColors,
  vibes,
}) {
  const [hovering, setHovering] = useState(false);
  const dominantColor = terpeneColors[strain.dominantTerpene] || theme.gold;
  const recipeCount = strain.recipes
    ? Object.keys(strain.recipes).length
    : 0;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        background: theme.bgCard,
        border: `1px solid ${
          hovering ? dominantColor : theme.border
        }`,
        borderRadius: "12px",
        padding: "20px",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s",
        transform: hovering ? "scale(1.01)" : "scale(1)",
      }}
    >
      {/* Header: Name + Energy Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: theme.text,
            flex: 1,
          }}
        >
          {strain.name}
        </h3>
        {strain.energyTier && (
          <span
            style={{
              padding: "4px 8px",
              background: energy[strain.energyTier]?.color || theme.border,
              color: theme.bg,
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              marginLeft: "8px",
            }}
          >
            {energy[strain.energyTier]?.label}
          </span>
        )}
      </div>

      {/* Farm & Region */}
      <p style={{ fontSize: "12px", color: theme.textMuted, marginBottom: "12px" }}>
        {strain.farm} · {strain.region}
      </p>

      {/* Dominant Terpene */}
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: dominantColor,
            fontWeight: "500",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              background: dominantColor,
              borderRadius: "50%",
            }}
          />
          {strain.dominantTerpene}
        </span>
      </div>

      {/* Terpene Ratio Bar */}
      <div
        style={{
          display: "flex",
          height: "4px",
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "12px",
          background: theme.border,
        }}
      >
        {Object.entries(strain.terpeneRatios || {})
          .sort(([, a], [, b]) => b - a)
          .map(([terpene, ratio]) => (
            <div
              key={terpene}
              style={{
                flex: ratio,
                background: terpeneColors[terpene] || theme.gold,
              }}
            />
          ))}
      </div>

      {/* Vibes */}
      {strain.vibes && strain.vibes.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {strain.vibes.map((vibeKey) => {
              const vibe = vibes[vibeKey];
              return (
                <span
                  key={vibeKey}
                  style={{
                    padding: "4px 8px",
                    background: `rgba(${parseInt(
                      vibe?.color?.substr(1, 2),
                      16
                    )}, ${parseInt(vibe?.color?.substr(3, 2), 16)}, ${parseInt(
                      vibe?.color?.substr(5, 2),
                      16
                    )}, 0.15)`,
                    color: vibe?.color,
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {vibe?.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Recipe Count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <span style={{ fontSize: "12px", color: theme.textMuted }}>
          {recipeCount} recipe{recipeCount !== 1 ? "s" : ""}
        </span>
        <span style={{ fontSize: "13px", color: theme.gold, fontWeight: "500" }}>
          →
        </span>
      </div>
    </button>
  );
}

function DetailView({
  strain,
  recipesMap,
  selectedCategory,
  setSelectedCategory,
  onBack,
  theme,
  categories,
  energy,
  terpeneColors,
  vibes,
}) {
  const [expandedSections, setExpandedSections] = useState({
    oil: false,
    method: false,
    terpeneMap: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const currentRecipeKey = `${strain.id}-${selectedCategory}`;
  const recipe = recipesMap[currentRecipeKey];
  const recipeCount = strain.recipes
    ? Object.keys(strain.recipes).length
    : 0;

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: ${theme.font};
            background: ${theme.bg};
            color: ${theme.text};
          }
          button {
            cursor: pointer;
            border: none;
            font-family: ${theme.font};
          }
        `}
      </style>

      {/* Header */}
      <header
        style={{
          background: theme.bgSurface,
          borderBottom: `1px solid ${theme.border}`,
          padding: "24px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            color: theme.gold,
            fontSize: "14px",
            marginBottom: "16px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          ← All Strains
        </button>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: theme.text,
            marginBottom: "8px",
          }}
        >
          {strain.name}
        </h1>
        <div
          style={{
            fontSize: "13px",
            color: theme.textSecondary,
            marginBottom: "12px",
          }}
        >
          {strain.farm} · {strain.region}
          {strain.energyTier && (
            <>
              {" "}
              ·{" "}
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 6px",
                  background: energy[strain.energyTier]?.color,
                  color: theme.bg,
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {energy[strain.energyTier]?.label}
              </span>
            </>
          )}
        </div>
        {strain.intent && (
          <p
            style={{
              fontSize: "14px",
              fontStyle: "italic",
              color: theme.textMuted,
            }}
          >
            "{strain.intent}"
          </p>
        )}
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Strain Profile */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: theme.text,
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Strain Profile
          </h2>

          {strain.effects && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: theme.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                Effects
              </label>
              <p style={{ fontSize: "14px", color: theme.text }}>
                {Array.isArray(strain.effects)
                  ? strain.effects.join(", ")
                  : strain.effects}
              </p>
            </div>
          )}

          {strain.aroma && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: theme.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                Aroma
              </label>
              <p style={{ fontSize: "14px", color: theme.text }}>
                {Array.isArray(strain.aroma)
                  ? strain.aroma.join(", ")
                  : strain.aroma}
              </p>
            </div>
          )}

          {strain.totalTerpenes && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: theme.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "6px",
                }}
              >
                Total Terpenes
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "14px", color: theme.text, fontWeight: "500" }}>
                  {strain.totalTerpenes.toFixed(2)}%
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "6px",
                    background: theme.border,
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(strain.totalTerpenes, 100)}%`,
                      background: theme.gold,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Terpene Profile */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: theme.text,
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Terpene Profile
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Object.entries(strain.terpeneRatios || {})
              .sort(([, a], [, b]) => b - a)
              .map(([terpene, ratio]) => (
                <div key={terpene}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: terpeneColors[terpene] || theme.gold,
                      }}
                    >
                      {terpene}
                    </span>
                    <span style={{ fontSize: "12px", color: theme.textMuted }}>
                      {ratio}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "4px",
                      background: theme.border,
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${ratio}%`,
                        background:
                          terpeneColors[terpene] || theme.gold,
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Oil Recipe Section */}
        {recipe && recipe.oils && recipe.oils.length > 0 && (
          <section style={{ marginBottom: "40px" }}>
            <button
              onClick={() => toggleSection("oil")}
              style={{
                background: "transparent",
                color: theme.text,
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                width: "100%",
              }}
            >
              <span>{expandedSections.oil ? "▼" : "▶"}</span>
              Essential Oil Blend
            </button>

            {expandedSections.oil && (
              <div style={{ marginLeft: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                  {recipe.oils.map((oil, idx) => (
                    <div key={idx}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "13px",
                          color: theme.text,
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background:
                              terpeneColors[oil.name] || theme.gold,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontWeight: "500" }}>
                          {oil.name} ({oil.drops || oil.amount || "—"})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {recipe.oilRationale && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: theme.textMuted,
                      fontStyle: "italic",
                      lineHeight: "1.5",
                    }}
                  >
                    {recipe.oilRationale}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {/* Recipe Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: `1px solid ${theme.border}`,
            marginBottom: "32px",
            gap: "16px",
          }}
        >
          {strain.recipes &&
            Object.keys(strain.recipes).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "12px 0",
                  background: "transparent",
                  border: "none",
                  color:
                    selectedCategory === cat
                      ? theme.text
                      : theme.textMuted,
                  fontSize: "14px",
                  fontWeight: selectedCategory === cat ? "600" : "400",
                  borderBottom:
                    selectedCategory === cat
                      ? `2px solid ${categories[cat]?.color}`
                      : "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {categories[cat]?.icon} {categories[cat]?.label}
              </button>
            ))}
        </div>

        {/* Recipe Content */}
        {recipe && (
          <section style={{ opacity: 1, transition: "opacity 0.3s ease" }}>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: theme.text,
                marginBottom: "8px",
              }}
            >
              {recipe.name || "Recipe"}
            </h3>

            {recipe.tagline && (
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: theme.textMuted,
                  marginBottom: "24px",
                }}
              >
                {recipe.tagline}
              </p>
            )}

            {/* Specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              {recipe.glass && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Glass
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.glass}
                  </p>
                </div>
              )}
              {recipe.volume && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Volume
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.volume}
                  </p>
                </div>
              )}
              {recipe.style && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Style
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.style}
                  </p>
                </div>
              )}
              {recipe.spirit && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Spirit
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.spirit}
                  </p>
                </div>
              )}
              {recipe.abv && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    ABV
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.abv}
                  </p>
                </div>
              )}
              {recipe.format && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Format
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.format}
                  </p>
                </div>
              )}
              {recipe.timing && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Timing
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.timing}
                  </p>
                </div>
              )}
              {recipe.steepTemp && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Steep Temp
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.steepTemp}
                  </p>
                </div>
              )}
              {recipe.steepTime && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Steep Time
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.steepTime}
                  </p>
                </div>
              )}
              {recipe.caffeine && (
                <div
                  style={{
                    padding: "12px",
                    background: theme.bgCard,
                    border: `1px solid ${theme.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Caffeine
                  </label>
                  <p style={{ fontSize: "13px", color: theme.text }}>
                    {recipe.caffeine}
                  </p>
                </div>
              )}
            </div>

            {/* Ingredients List */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: theme.text,
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Ingredients
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {recipe.ingredients.map((ing, idx) => {
                    const ingText = typeof ing === "string" ? ing : (ing.amount ? ing.amount + " " + ing.name : ing.name);
                    const isGarnish = ingText.toLowerCase().includes("garnish");
                    return (
                      <li
                        key={idx}
                        style={{
                          padding: "8px 12px",
                          fontSize: "13px",
                          color: isGarnish ? theme.textMuted : theme.text,
                          fontStyle: isGarnish ? "italic" : "normal",
                          borderLeft: `3px solid ${isGarnish ? "#8B5E5E" : theme.gold}`,
                          background: idx % 2 === 0 ? "transparent" : `${theme.bgCard}`,
                          borderRadius: "2px",
                        }}
                      >
                        {ingText}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Method */}
            {recipe.method && (
              <div style={{ marginBottom: "32px" }}>
                <button
                  onClick={() => toggleSection("method")}
                  style={{
                    background: "transparent",
                    color: theme.text,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                    width: "100%",
                  }}
                >
                  <span>{expandedSections.method ? "▼" : "▶"}</span>
                  Method
                </button>

                {expandedSections.method && (
                  <ol
                    style={{
                      marginLeft: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {(Array.isArray(recipe.method) ? recipe.method : recipe.method.split(/\d+\.\s/).filter((s) => s.trim()))
                      .map((step, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "13px",
                            color: theme.text,
                            lineHeight: "1.6",
                            borderLeft: `3px solid ${theme.gold}`,
                            paddingLeft: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "600",
                              color: theme.gold,
                              marginRight: "6px",
                            }}
                          >
                            {idx + 1}.
                          </span>
                          {step.trim()}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            )}

            {/* Terpene Map */}
            {recipe.terpeneMap && recipe.terpeneMap.length > 0 && (
              <div style={{ marginBottom: "32px" }}>
                <button
                  onClick={() => toggleSection("terpeneMap")}
                  style={{
                    background: "transparent",
                    color: theme.text,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                    width: "100%",
                  }}
                >
                  <span>{expandedSections.terpeneMap ? "▼" : "▶"}</span>
                  Why It Works
                </button>

                {expandedSections.terpeneMap && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "12px",
                      marginLeft: "24px",
                    }}
                  >
                    {recipe.terpeneMap.map((entry, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "12px",
                          background: theme.bgCard,
                          border: `1px solid ${theme.border}`,
                          borderRadius: "6px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            color:
                              terpeneColors[entry.terpene] ||
                              theme.gold,
                            fontWeight: "600",
                            marginBottom: "4px",
                          }}
                        >
                          {entry.terpene}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: theme.text,
                            fontStyle: "italic",
                          }}
                        >
                          {entry.source || entry.bridge || entry.ingredient || ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Batch Blend (for tea) */}
            {recipe.batchBlend && (
              <div style={{ marginBottom: "32px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: theme.text,
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Batch Blend
                </h4>
                {typeof recipe.batchBlend === "string" ? (
                  <p style={{ fontSize: "13px", color: theme.text, lineHeight: "1.6", padding: "8px 12px", borderLeft: `3px solid ${theme.gold}`, background: theme.bgCard, borderRadius: "2px" }}>
                    {recipe.batchBlend}
                  </p>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {recipe.batchBlend.map((herb, idx) => (
                      <li key={idx} style={{ padding: "8px 12px", fontSize: "13px", color: theme.text, borderLeft: `3px solid ${theme.gold}`, background: idx % 2 === 0 ? "transparent" : theme.bgCard, borderRadius: "2px" }}>
                        {typeof herb === "string" ? herb : `${herb.name} — ${herb.amount}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
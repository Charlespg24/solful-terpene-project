import { useState } from "react";

const TC = {
  "β-Caryophyllene": "#C8A97E",
  "Limonene":        "#D4C85C",
  "Myrcene":         "#8EAE68",
  "α-Humulene":      "#7C9082",
  "Linalool":        "#9B7BA8",
  "α-Bisabolol":     "#8EAEC8",
  "α-Pinene":        "#5C8E6B",
  "β-Ocimene":       "#B8785C",
  "Terpinolene":     "#6BAE8E",
  "Farnesene":       "#D4B88E",
};

const ENERGY_COLOR = { HIGH: "#D4C85C", MEDIUM: "#8EAEC8", LOW: "#9B7BA8" };
const ENERGY_LABEL = { HIGH: "↑ High Energy", MEDIUM: "◈ Medium", LOW: "↓ Low / Restful" };

const FARMS = [
  { id: "all",         name: "All Strains",         region: "" },
  { id: "glentucky",   name: "Glentucky",            region: "Sonoma" },
  { id: "moongazer",   name: "Moon Gazer",           region: "Mendocino" },
  { id: "alpenglow",   name: "Alpenglow",            region: "Humboldt" },
  { id: "greenshock",  name: "Greenshock",           region: "Mendocino" },
  { id: "higher",      name: "Higher Heights",       region: "Mendocino" },
  { id: "happyday",    name: "Happy Day",            region: "Mendocino" },
  { id: "terrapin",    name: "Terrapin",             region: "Humboldt" },
  { id: "dosrios",     name: "Dos Rios",             region: "Mendocino" },
  { id: "sonomahills", name: "Sonoma Hills",         region: "Sonoma" },
  { id: "heartrock",   name: "Heartrock Mtn",        region: "Mendocino" },
  { id: "briceland",   name: "Briceland Forest",     region: "Humboldt" },
  { id: "solspirit",   name: "Sol Spirit",           region: "Trinity" },
  { id: "stickyfields",name: "Sticky Fields",        region: "Mendocino" },
  { id: "sunrise",     name: "Sunrise Gardens",      region: "Mendocino" },
];

const STRAINS = [
  {
    id: 1, farm: "glentucky", name: "Mike's Bomba",
    farmFull: "Glentucky Family Farm", region: "Sonoma", energy: "LOW",
    effects: ["Relaxed", "Calm", "Alert"],
    intent: "Grounded calm with clear mental edges.",
    aroma: ["Fuel", "Lemon Cream", "Forest Floor"],
    terpenes: [["β-Caryophyllene",0.47],["Limonene",0.32],["α-Humulene",0.18],["Linalool",0.07]],
    totalT: 1.38,
    oils: [
      { oil: "Black Pepper", drops: 20, note: "β-Caryophyllene backbone" },
      { oil: "Lemon", drops: 10, note: "Lemon cream aroma" },
      { oil: "Sage", drops: 8, note: "α-Humulene, herbal grounding" },
      { oil: "Lavender", drops: 2, note: "Linalool softens edges" },
    ],
    beers: {
      complement: [
        { name: "Death & Taxes", brewery: "Moonlight Brewing", style: "Dark Lager", abv: "5.1%", why: "Columbus hops share caryophyllene + humulene — earthy, dark, grounding" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Noble herbs and earthy spice mirror the forest floor and humulene depth" },
      ],
      contrast: [
        { name: "ChatG.O.D. Hazy IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Motueka + El Dorado tangerine sweetness lifts the fuel note into lemon zest" },
        { name: "Racer 5", brewery: "Bear Republic", style: "American IPA", abv: "7.0%", why: "Pine resin amplifies the alert quality — bright citrus against the calm body" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp Saaz resets the palate, lets the forest floor aroma re-emerge clean" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Soft Hallertau floral is gentle enough to cleanse without competing" },
      ],
    },
  },
  {
    id: 2, farm: "moongazer", name: "Moonlight",
    farmFull: "Moon Gazer Farms", region: "Mendocino", energy: "MEDIUM",
    effects: ["Physically Relaxed", "Calm", "Grateful"],
    intent: "Soft gratitude in a settled body.",
    aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
    terpenes: [["Myrcene",0.74],["β-Caryophyllene",0.51],["Terpinolene",0.38],["α-Bisabolol",0.24]],
    totalT: 2.67,
    oils: [
      { oil: "Lemongrass", drops: 12, note: "Myrcene — tropical, earthy" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene backbone" },
      { oil: "Tea Tree", drops: 8, note: "Terpinolene — rare, bright" },
      { oil: "German Chamomile", drops: 6, note: "α-Bisabolol, calming" },
      { oil: "Bergamot", drops: 4, note: "Earl Grey aroma hit + citrus" },
    ],
    beers: {
      complement: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour Ale", abv: "5.5%", why: "Tropical fruit and tart citrus amplify the watermelon candy and citrus zest profile" },
        { name: "Frozen Envelope IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Idaho 7 + Ahtanum share humulene lineage — danky citrus meets the bisabolol softness" },
      ],
      contrast: [
        { name: "Blind Pig IPA", brewery: "Russian River", style: "American IPA", abv: "6.0%", why: "Centennial bitterness cuts the soft body — sharpens the Earl Grey dimension" },
        { name: "German Festbier", brewery: "Pond Farm", style: "Märzen/Festbier", abv: "5.8%", why: "Toasted malt warmth contrasts the juicy fruit profile with roasty complexity" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Citrus hop brightness without alcohol — preserves terpene sensitivity session-long" },
        { name: "Helles", brewery: "Pond Farm", style: "Munich Helles", abv: "4.6%", why: "Soft malt and noble hops reset gently — the lager equivalent of a palate cleanse" },
      ],
    },
  },
  {
    id: 3, farm: "moongazer", name: "Natty Bumppo",
    farmFull: "Moon Gazer Farms", region: "Mendocino", energy: "MEDIUM",
    effects: ["Happy", "Carefree", "Physically Relaxed"],
    intent: "Loose and easy, happily untethered.",
    aroma: ["Kerosene", "Musk", "Sour Plum"],
    terpenes: [["β-Caryophyllene",0.63],["Limonene",0.35],["α-Humulene",0.25],["Myrcene",0.19]],
    totalT: 1.86,
    oils: [
      { oil: "Black Pepper", drops: 14, note: "β-Caryophyllene base" },
      { oil: "Lemon", drops: 10, note: "Limonene brightness" },
      { oil: "Sage", drops: 6, note: "α-Humulene depth" },
      { oil: "Lemongrass", drops: 6, note: "Myrcene, earthy musk" },
      { oil: "Geranium", drops: 4, note: "Sour plum fruitiness" },
    ],
    beers: {
      complement: [
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Funky barrel depth echoes the musk and sour plum — shared caryophyllene lineage" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Earthy dry spice complements the humulene and carefree character" },
      ],
      contrast: [
        { name: "Frozen Envelope IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Bright guava and orange cut through the kerosene/musk — lifts the mood further" },
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "Classic West Coast bite amplifies the happy, carefree dimension with piney brightness" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Saaz crispness neutralizes the musk, readying for the next round" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Gentle and neutral — lets the sour plum memory linger without competing" },
      ],
    },
  },
  {
    id: 4, farm: "moongazer", name: "Black Lime Chem",
    farmFull: "Moon Gazer Farms", region: "Mendocino", energy: "LOW",
    effects: ["Heavy", "Blissful", "Sleepy"],
    intent: "Weighted bliss melting toward rest.",
    aroma: ["Sharp Lime", "Rhubarb", "Glue"],
    terpenes: [["Myrcene",1.69],["α-Pinene",0.39],["β-Caryophyllene",0.27],["β-Ocimene",0.19]],
    totalT: 3.08,
    oils: [
      { oil: "Lemongrass", drops: 16, note: "Heavy myrcene dominant" },
      { oil: "Pine", drops: 8, note: "α-Pinene, alertness contrast" },
      { oil: "Black Pepper", drops: 6, note: "β-Caryophyllene" },
      { oil: "Basil", drops: 6, note: "β-Ocimene, herbal bright" },
      { oil: "Lemon", drops: 4, note: "Sharp lime aroma" },
    ],
    beers: {
      complement: [
        { name: "Death & Taxes", brewery: "Moonlight Brewing", style: "Dark Lager", abv: "5.1%", why: "Columbus hops share the myrcene density and chem depth — dark and blissful companion" },
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "Piney Simcoe/CTZ hops echo the pinene — lime and dank resonance" },
      ],
      contrast: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp, effervescent Saaz is a total contrast — brightness cuts the heavy body" },
        { name: "Foundation of Life Pale", brewery: "Original Pattern", style: "Pale Ale", abv: "5.4%", why: "Citra/Mosaic fruit forward lifts the bliss into something more alert and airy" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Non-alc essential — LOW energy strain, skip additional alcohol, let terpenes do the work" },
        { name: "Mexican Lager", brewery: "Pond Farm", style: "Lager", abv: "4.5%", why: "Clean grain reset with zero complexity — perfect for LOW energy sessions" },
      ],
    },
  },
  {
    id: 5, farm: "alpenglow", name: "Guava Gift",
    farmFull: "Alpenglow Farms", region: "Humboldt", energy: "HIGH",
    effects: ["Social", "Inspiring", "Euphoric"],
    intent: "Radiant social energy with creative momentum.",
    aroma: ["Fresh Guava", "Lemon Rind", "Tamarind"],
    terpenes: [["β-Caryophyllene",0.73],["Limonene",0.50],["Myrcene",0.33],["α-Humulene",0.25]],
    totalT: 2.34,
    oils: [
      { oil: "Black Pepper", drops: 14, note: "β-Caryophyllene anchor" },
      { oil: "Grapefruit", drops: 10, note: "Limonene, guava brightness" },
      { oil: "Lemongrass", drops: 8, note: "Myrcene — tropical body" },
      { oil: "Sage", drops: 6, note: "α-Humulene grounding" },
      { oil: "Basil", drops: 2, note: "Tamarind / herbal edge" },
    ],
    beers: {
      complement: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Galaxy + Citra trop matches guava-for-guava — ocimene and limonene resonance" },
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Tropical fruit acids echo the tamarind tartness and lemon rind brightness" },
      ],
      contrast: [
        { name: "Blind Pig IPA", brewery: "Russian River", style: "American IPA", abv: "6.0%", why: "Centennial/Columbus bitterness sharpens the caryophyllene spine — social energy amplified" },
        { name: "HenHouse IPA", brewery: "HenHouse", style: "American IPA", abv: "6.9%", why: "Belma + Hallertau Blanc tangerine/floral creates beautiful contrast to the tamarind" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Citrus hop aromatics keep the session going — refreshes without dulling the euphoria" },
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Acidity cuts the tropical richness cleanly — palate reset with matching funk" },
      ],
    },
  },
  {
    id: 6, farm: "alpenglow", name: "Mule Fuel",
    farmFull: "Alpenglow Farms", region: "Humboldt", energy: "LOW",
    effects: ["Happy", "Hungry", "Sleepy"],
    intent: "Deeply relaxed with a slow smile.",
    aroma: ["Skunk", "Diesel", "Lemon", "Leather"],
    terpenes: [["Myrcene",2.22],["α-Pinene",0.54],["β-Caryophyllene",0.34],["Limonene",0.28]],
    totalT: 3.97,
    oils: [
      { oil: "Lemongrass", drops: 20, note: "Exceptional myrcene (2.22%)" },
      { oil: "Pine", drops: 8, note: "α-Pinene contrast — alertness edge" },
      { oil: "Black Pepper", drops: 6, note: "β-Caryophyllene" },
      { oil: "Lemon", drops: 4, note: "Diesel/lemon aroma note" },
      { oil: "Grapefruit", drops: 2, note: "Citrus brightness" },
    ],
    beers: {
      complement: [
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "CTZ and Simcoe share myrcene + pinene heritage — diesel and pine resonance" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Centennial resin and Cascade grapefruit match the leather and lemon diesel perfectly" },
      ],
      contrast: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Total contrast — crisp Saaz snaps against the heavy body, brief alert window" },
        { name: "Mexican Lager", brewery: "Pond Farm", style: "Lager", abv: "4.5%", why: "Neutral lager base lets the strain's diesel character shine without interference" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Non-alc is ideal for highest-myrcene strain — preserve sedative clarity" },
        { name: "Cerveza Athletica", brewery: "Athletic (NA)", style: "Non-Alc Lager", abv: "0.5%", why: "Crisp and neutral, the perfect companion for the sleepiest strain in the collection" },
      ],
    },
  },
  {
    id: 7, farm: "alpenglow", name: "Satsuma Sherbet",
    farmFull: "Alpenglow Farms", region: "Humboldt", energy: "MEDIUM",
    effects: ["Happy", "Contemplative", "Comfortable"],
    intent: "Quiet ease with thoughtful undertones.",
    aroma: ["Mandarin Orange", "Mochi", "Mint"],
    terpenes: [["Limonene",0.55],["β-Caryophyllene",0.45],["α-Humulene",0.13],["Myrcene",0.11]],
    totalT: 1.85,
    oils: [
      { oil: "Sweet Orange", drops: 16, note: "Limonene — mandarin citrus" },
      { oil: "Black Pepper", drops: 12, note: "β-Caryophyllene spine" },
      { oil: "Sage", drops: 4, note: "α-Humulene depth" },
      { oil: "Lemongrass", drops: 4, note: "Myrcene body" },
      { oil: "Peppermint", drops: 4, note: "Mint aroma note, exact match" },
    ],
    beers: {
      complement: [
        { name: "Stoked! Hazy Pale", brewery: "HenHouse", style: "Hazy Pale", abv: "5.7%", why: "Amarillo + Mosaic bring peach and orange blossom — satsuma in a glass" },
        { name: "Yes, And… Hazy Pale", brewery: "Pond Farm", style: "Hazy Pale", abv: "5.0%", why: "Citra/Mosaic light tropical matches mandarin brightness at lower intensity" },
      ],
      contrast: [
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Funky tartness provides beautifully complex contrast to the sweet citrus sherbet" },
        { name: "Pils", brewery: "Lagunitas", style: "Pilsner", abv: "5.1%", why: "Saaz dryness sharpens the contemplative mode — clarity and bitterness vs. sweetness" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Effervescent crisp reset — mint note refreshed with each cleanse sip" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Light citrus hop presence cleanse without muddying the sherbet character" },
      ],
    },
  },
  {
    id: 8, farm: "greenshock", name: "Tropical Sleigh Ride",
    farmFull: "Greenshock Farms", region: "Mendocino", energy: "HIGH",
    effects: ["Joyful", "Alert", "Euphoric"],
    intent: "Vivid lift with present clarity.",
    aroma: ["Peppermint", "Honeysuckle", "Hint of Ginger"],
    terpenes: [["β-Ocimene",0.71],["β-Caryophyllene",0.70],["α-Humulene",0.28]],
    totalT: 2.35,
    oils: [
      { oil: "Basil", drops: 16, note: "β-Ocimene — herbal bright, rare" },
      { oil: "Black Pepper", drops: 14, note: "β-Caryophyllene equal match" },
      { oil: "Peppermint", drops: 6, note: "Peppermint aroma, exact" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
    ],
    beers: {
      complement: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Galaxy's β-ocimene is a rare hop match — floral tropical resonance across both" },
        { name: "Frozen Envelope IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Idaho 7 brings the resinous bite that mirrors caryophyllene dominance at HIGH energy" },
      ],
      contrast: [
        { name: "Death & Taxes", brewery: "Moonlight Brewing", style: "Dark Lager", abv: "5.1%", why: "Dark roast grounds the joyful euphoria — an unexpected velvet anchor" },
        { name: "Dark Mast", brewery: "Pond Farm", style: "Dark Lager", abv: "4.2%", why: "2025 GABF Gold — coffee/chocolate depth is gorgeous contrast to peppermint brightness" },
      ],
      cleanse: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Tart tropical acid rinses the peppermint, resets for the next euphoric hit" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Dry finish and floral spice palette cleanse without competing with ginger note" },
      ],
    },
  },
  {
    id: 9, farm: "greenshock", name: "Purple Candy Cane",
    farmFull: "Greenshock Farms", region: "Mendocino", energy: "HIGH",
    effects: ["Energized", "Invigorated", "Talkative"],
    intent: "Vibrant and vocal, fully awake.",
    aroma: ["Mango", "Peppermint Candy", "Orange Blossom"],
    terpenes: [["Myrcene",0.54],["β-Caryophyllene",0.31],["α-Pinene",0.20],["α-Humulene",0.13]],
    totalT: 1.55,
    oils: [
      { oil: "Lemongrass", drops: 12, note: "Myrcene — mango note" },
      { oil: "Black Pepper", drops: 8, note: "β-Caryophyllene" },
      { oil: "Sweet Orange", drops: 8, note: "Orange blossom, limonene" },
      { oil: "Pine", drops: 6, note: "α-Pinene, brightening" },
      { oil: "Peppermint", drops: 4, note: "Peppermint candy, exact" },
      { oil: "Sage", drops: 2, note: "α-Humulene grounding" },
    ],
    beers: {
      complement: [
        { name: "ChatG.O.D. Hazy IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Motueka + El Dorado deliver tangerine/mango that directly mirrors strain aroma" },
        { name: "Kubrick's Landing IPA", brewery: "HenHouse", style: "American IPA", abv: "7.2%", why: "Mosaic + Motueka + Mandarina Bavaria — 3-continent citrus matches orange blossom complexity" },
      ],
      contrast: [
        { name: "Blind Pig IPA", brewery: "Russian River", style: "American IPA", abv: "6.0%", why: "Classic West Coast bitterness sharpens talkative energy into focused clarity" },
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "Resinous pine amplifies the α-pinene and keeps the energy climbing" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp reset between sessions — peppermint candy lingers beautifully post-sip" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Keeps you alert and present — non-alc is smart for HIGH energy social sessions" },
      ],
    },
  },
  {
    id: 10, farm: "higher", name: "Carambola",
    farmFull: "Higher Heights", region: "Mendocino", energy: "HIGH",
    effects: ["Energetic", "Fun", "Giggly"],
    intent: "Bright social joy with no ceiling.",
    aroma: ["Orange", "Diesel", "Incense"],
    terpenes: [["Limonene",0.44],["β-Caryophyllene",0.18],["Linalool",0.12],["α-Bisabolol",0.09]],
    totalT: 1.45,
    oils: [
      { oil: "Sweet Orange", drops: 16, note: "Limonene dominant, bright" },
      { oil: "Rosemary", drops: 8, note: "β-Caryophyllene + alertness" },
      { oil: "Lavender", drops: 8, note: "Linalool, smooth edges" },
      { oil: "German Chamomile", drops: 6, note: "α-Bisabolol, calming base" },
      { oil: "Bergamot", drops: 2, note: "Incense/citrus top note" },
    ],
    beers: {
      complement: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Galaxy/Citra tropical lifts into the orange and limonene — pure joy in a glass" },
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Citrus acids amplify the giggly brightness — tart joy meets tart joy" },
      ],
      contrast: [
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Earthy dry spice provides incense depth — grounds the social energy beautifully" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Pine resin cuts through the sweetness — sharpens the fun into focused energy" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Keep the session going without dulling the giggly euphoric edge" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Soft floral reset lets the orange aroma re-bloom cleanly" },
      ],
    },
  },
  {
    id: 11, farm: "higher", name: "Rasta Governmint",
    farmFull: "Higher Heights", region: "Mendocino", energy: "MEDIUM",
    effects: ["Euphoric", "Supremely Relaxed", "Comforted"],
    intent: "Deep comfort with a warm glow.",
    aroma: ["Sour Cherry", "Frankincense", "Oak"],
    terpenes: [["β-Caryophyllene",0.60],["Limonene",0.39],["α-Humulene",0.17],["Myrcene",0.16]],
    totalT: 1.92,
    oils: [
      { oil: "Black Pepper", drops: 14, note: "β-Caryophyllene anchor" },
      { oil: "Lemon", drops: 10, note: "Limonene brightness" },
      { oil: "Sage", drops: 6, note: "α-Humulene, herbal depth" },
      { oil: "Lemongrass", drops: 6, note: "Myrcene comfort" },
      { oil: "Geranium", drops: 4, note: "Sour cherry fruitiness" },
    ],
    beers: {
      complement: [
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Oak barrel + tart cherry resonates perfectly — frankincense meets barrel funk" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Earthy dry finish echoes oak and frankincense — spice complexity matches" },
      ],
      contrast: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Tropical brightness lifts the deep comfort into euphoric territory" },
        { name: "HenHouse IPA", brewery: "HenHouse", style: "American IPA", abv: "6.9%", why: "Tangerine/pineapple brightness cuts the sour cherry — euphoria amplified" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Noble Saaz strips the palate gently — preserves the frankincense memory" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Citrus cleanse without adding alcohol to a supremely relaxed session" },
      ],
    },
  },
  {
    id: 12, farm: "higher", name: "Pineapple Mojito",
    farmFull: "Higher Heights", region: "Mendocino", energy: "MEDIUM",
    effects: ["Relaxed", "Grounded", "Euphoric"],
    intent: "Balanced complexity that hits every note.",
    aroma: ["Pineapple", "Ginger", "Mint", "Gas"],
    terpenes: [["β-Caryophyllene",0.63],["Limonene",0.56],["α-Bisabolol",0.24],["α-Humulene",0.19],["Linalool",0.16],["α-Pinene",0.14],["Myrcene",0.11]],
    totalT: 2.55,
    oils: [
      { oil: "Grapefruit", drops: 10, note: "Limonene + pineapple aroma" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene gas note" },
      { oil: "German Chamomile", drops: 6, note: "α-Bisabolol, calming" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
      { oil: "Lavender", drops: 4, note: "Linalool, floral" },
      { oil: "Pine", drops: 4, note: "α-Pinene, mint adjacent" },
      { oil: "Peppermint", drops: 2, note: "Mint aroma note" },
    ],
    beers: {
      complement: [
        { name: "ChatG.O.D. Hazy IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Motueka + El Dorado citrus tropical matches pineapple ginger complexity" },
        { name: "Kubrick's Landing IPA", brewery: "HenHouse", style: "American IPA", abv: "7.2%", why: "Multi-terpene hop bill mirrors this strain's 7-terpene complexity — sophisticated match" },
      ],
      contrast: [
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "Pine/CTZ bitterness cuts the tropical sweetness — amplifies the gas backbone" },
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Clean crispness simplifies — lets each of the 7 terpenes express in sequence" },
      ],
      cleanse: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Tart tropical resets the complex palate — pineapple note restored fresh" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Multi-terpene sessions benefit from NA cleanse — keep all 7 notes perceptible" },
      ],
    },
  },
  {
    id: 13, farm: "higher", name: "Pink Rider",
    farmFull: "Higher Heights", region: "Mendocino", energy: "HIGH",
    effects: ["Motivated", "Creative", "Social"],
    intent: "Vivid creative lift with social magnetism.",
    aroma: ["Lemon Bar", "Pink Grapefruit", "Sugar Cookie"],
    terpenes: [["Terpinolene",0.38],["β-Caryophyllene",0.22],["β-Ocimene",0.20],["Limonene",0.18]],
    totalT: 1.44,
    oils: [
      { oil: "Tea Tree", drops: 12, note: "Terpinolene — rare dominant" },
      { oil: "Black Pepper", drops: 8, note: "β-Caryophyllene" },
      { oil: "Basil", drops: 8, note: "β-Ocimene, herbal bright" },
      { oil: "Lemon", drops: 6, note: "Lemon bar aroma" },
      { oil: "Lavender", drops: 4, note: "Linalool softness" },
      { oil: "Geranium", drops: 2, note: "Floral, sugar-like" },
    ],
    beers: {
      complement: [
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Terpinolene is the hero of saison character — yeast + hop create the same lemon-floral note" },
        { name: "Stoked! Hazy Pale", brewery: "HenHouse", style: "Hazy Pale", abv: "5.7%", why: "Amarillo peach + orange blossom resonates with sugar cookie and grapefruit brightness" },
      ],
      contrast: [
        { name: "Death & Taxes", brewery: "Moonlight Brewing", style: "Dark Lager", abv: "5.1%", why: "Deep roasty dark is a dramatic contrast — grounds creative energy into something more focused" },
        { name: "Dark Mast", brewery: "Pond Farm", style: "Dark Lager", abv: "4.2%", why: "Chocolate and coffee contrast the citrus-forward profile — unexpected creative spark" },
      ],
      cleanse: [
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Hallertau floral is terpinolene-adjacent — gentle cleanse that honors the strain character" },
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp Saaz resets the lemon bar — allows the next hit to taste like the first" },
      ],
    },
  },
  {
    id: 14, farm: "happyday", name: "Strawberry Biscotti",
    farmFull: "Happy Day Farms", region: "Mendocino", energy: "MEDIUM",
    effects: ["Comforting", "Mentally Engaging", "Appetite Inducing"],
    intent: "Warm mental comfort with curious edges.",
    aroma: ["Kettle Corn", "Fuel", "Sour Strawberry Candy"],
    terpenes: [["Limonene",0.38],["β-Caryophyllene",0.29],["Myrcene",0.25],["α-Bisabolol",0.13]],
    totalT: 1.48,
    oils: [
      { oil: "Bergamot", drops: 12, note: "Limonene — sophisticated citrus" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene backbone" },
      { oil: "Lemongrass", drops: 8, note: "Myrcene, warm body" },
      { oil: "German Chamomile", drops: 6, note: "α-Bisabolol, calming" },
      { oil: "Geranium", drops: 4, note: "Sour strawberry fruitiness" },
    ],
    beers: {
      complement: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Berry-citrus acids mirror the sour strawberry candy aroma with uncanny precision" },
        { name: "Stoked! Hazy Pale", brewery: "HenHouse", style: "Hazy Pale", abv: "5.7%", why: "Amarillo + Cascade bring soft orange and peach — comforting and approachable match" },
      ],
      contrast: [
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "West Coast bite sharpens the fuel note into something more mentally engaging" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Pine resin cuts through the kettle corn sweetness — appetite induced and satisfied" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Light citrus hop cleanses the candy sweetness without disrupting mental engagement" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Neutral floral reset — kettle corn and sour strawberry re-emerge on next consumption" },
      ],
    },
  },
  {
    id: 15, farm: "happyday", name: "Avenue of the Giants",
    farmFull: "Happy Day Farms", region: "Mendocino", energy: "HIGH",
    effects: ["Energizing", "Buzzy", "Motivating"],
    intent: "Forest-clear energy, pine-tall and ancient.",
    aroma: ["Pine Needles", "Menthol", "Jasmine"],
    terpenes: [["Myrcene",1.94],["β-Caryophyllene",0.43],["α-Pinene",0.26],["β-Ocimene",0.24]],
    totalT: 3.48,
    oils: [
      { oil: "Lemongrass", drops: 16, note: "Myrcene (1.94%) — forest body" },
      { oil: "Pine", drops: 8, note: "α-Pinene — pine needle exact" },
      { oil: "Black Pepper", drops: 6, note: "β-Caryophyllene" },
      { oil: "Basil", drops: 6, note: "β-Ocimene, herbal jasmine" },
      { oil: "Peppermint", drops: 4, note: "Menthol aroma match" },
    ],
    beers: {
      complement: [
        { name: "Frozen Envelope IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Idaho 7 brings the piney dank — Ahtanum adds citrus-floral jasmine to the pine" },
        { name: "Cataract Falls IPA", brewery: "Pond Farm", style: "American IPA", abv: "6.5%", why: "Simcoe + Centennial + Cascade: pine and grapefruit for a true ancient forest experience" },
      ],
      contrast: [
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Funky tart earthiness grounds the buzzy forest energy into something more ancient" },
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Bright fruit acid contrasts the pine — jasmine and menthol pop against tropical tartness" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp Saaz has pine-adjacent character — refreshes while maintaining forest theme" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Non-alc pinene refresher — keeps motivating energy without adding sedation" },
      ],
    },
  },
  {
    id: 16, farm: "terrapin", name: "Peach Flambé",
    farmFull: "Terrapin Farms", region: "Humboldt", energy: "HIGH",
    effects: ["Happy", "Energized", "Motivated"],
    intent: "Sunny drive with bright momentum.",
    aroma: ["White Peach", "Cashew Butter", "Brown Sugar"],
    terpenes: [["β-Caryophyllene",0.25],["Myrcene",0.21],["Limonene",0.20],["α-Humulene",0.12]],
    totalT: 1.05,
    oils: [
      { oil: "Bergamot", drops: 10, note: "Limonene — peach adjacent" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene" },
      { oil: "Lemongrass", drops: 8, note: "Myrcene warmth" },
      { oil: "Geranium", drops: 6, note: "Peachy, fruity notes" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
      { oil: "Clove", drops: 2, note: "Brown sugar warmth" },
    ],
    beers: {
      complement: [
        { name: "Stoked! Hazy Pale", brewery: "HenHouse", style: "Hazy Pale", abv: "5.7%", why: "Amarillo delivers peach and apricot — a direct terpene-aroma resonance with white peach" },
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Galaxy stone fruit and citrus amplify the energized, sunny character" },
      ],
      contrast: [
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "West Coast bite amplifies motivation — drives the sunny drive into something purposeful" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Pine resin sharpens the cashew/brown sugar richness with contrasting bitterness" },
      ],
      cleanse: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Tart fruit acid cuts the sweetness — re-brightens for the next peak moment" },
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Clean crisp reset — white peach note re-emerges beautifully after each cleanse" },
      ],
    },
  },
  {
    id: 17, farm: "terrapin", name: "Lemon Papaya Banana",
    farmFull: "Terrapin Farms", region: "Humboldt", energy: "LOW",
    effects: ["Physically Relaxed", "Spacey", "Euphoric"],
    intent: "Soft body, drifting expansive mind.",
    aroma: ["Papaya", "Honeydew Melon", "Lemon Zest"],
    terpenes: [["Myrcene",0.57],["β-Caryophyllene",0.32],["Limonene",0.24],["α-Humulene",0.11]],
    totalT: 1.38,
    oils: [
      { oil: "Lemongrass", drops: 14, note: "Myrcene dominant" },
      { oil: "Lemon", drops: 10, note: "Lemon zest aroma" },
      { oil: "Black Pepper", drops: 6, note: "β-Caryophyllene" },
      { oil: "Geranium", drops: 6, note: "Papaya, honeydew tropical" },
      { oil: "Ylang Ylang", drops: 4, note: "Exotic sweetness" },
    ],
    beers: {
      complement: [
        { name: "ChatG.O.D. Hazy IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "El Dorado watermelon/pear melon matches honeydew — tropical resonance in the spacey state" },
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Tropical fruit exactly mirrors papaya and lemon zest in a single euphoric sip" },
      ],
      contrast: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp Saaz creates a rare alert moment inside the spacey body — beautiful contrast" },
        { name: "Mexican Lager", brewery: "Pond Farm", style: "Lager", abv: "4.5%", why: "Clean and neutral — lets the papaya aroma drift without interruption" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "LOW energy + spacey — non-alc keeps the mind drifting without adding sedation" },
        { name: "Helles", brewery: "Pond Farm", style: "Munich Helles", abv: "4.6%", why: "Soft and gentle — perfectly quiet enough for an expansive, spacey session" },
      ],
    },
  },
  {
    id: 18, farm: "dosrios", name: "Pinnacle",
    farmFull: "Dos Rios Farms", region: "Mendocino", energy: "LOW",
    effects: ["Heavy", "Sedative", "Blissful"],
    intent: "Deep surrender into velvet quiet.",
    aroma: ["Sweet Cream", "Nutmeg", "Fennel Seeds"],
    terpenes: [["β-Caryophyllene",0.61],["Limonene",0.46],["α-Humulene",0.19],["Farnesene",0.14]],
    totalT: 3.35,
    oils: [
      { oil: "Black Pepper", drops: 12, note: "β-Caryophyllene concentrated" },
      { oil: "Sweet Orange", drops: 10, note: "Limonene + sweet cream" },
      { oil: "Rosemary", drops: 6, note: "β-Caryophyllene secondary" },
      { oil: "Sage", drops: 6, note: "α-Humulene depth" },
      { oil: "Ylang Ylang", drops: 4, note: "Farnesene — rare, blissful" },
      { oil: "Clove", drops: 2, note: "Nutmeg warmth echo" },
    ],
    beers: {
      complement: [
        { name: "Death & Taxes", brewery: "Moonlight Brewing", style: "Dark Lager", abv: "5.1%", why: "Velvety dark with Columbus hops — the most sedative beer for the most sedative strain" },
        { name: "Dark Mast", brewery: "Pond Farm", style: "Dark Lager", abv: "4.2%", why: "2025 GABF Gold — chocolate depth mirrors sweet cream, nutmeg meets roasted malt" },
      ],
      contrast: [
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Floral dry finish lifts the velvet briefly — fennel/spice resonates with farmhouse character" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Soft gentle brightness creates a quiet contrast — a whisper of light in the velvet dark" },
      ],
      cleanse: [
        { name: "Helles", brewery: "Pond Farm", style: "Munich Helles", abv: "4.6%", why: "The gentlest cleanse — soft malt and minimal hops preserve the deep sedative mood" },
        { name: "Mexican Lager", brewery: "Pond Farm", style: "Lager", abv: "4.5%", why: "Complete neutrality — this strain deserves silence between hits, not interference" },
      ],
    },
  },
  {
    id: 19, farm: "sonomahills", name: "Pink Jesus Reserve",
    farmFull: "Sonoma Hills Farm", region: "Sonoma", energy: "MEDIUM",
    effects: ["Social", "Uplifting", "Euphoric"],
    intent: "Buoyant and warm, ready to share.",
    aroma: ["Raspberry", "French Lavender", "Pineapple"],
    terpenes: [["β-Caryophyllene",0.78],["Myrcene",0.38],["α-Humulene",0.27],["α-Bisabolol",0.15]],
    totalT: 1.89,
    oils: [
      { oil: "Black Pepper", drops: 14, note: "Dominant β-Caryophyllene (0.78%)" },
      { oil: "Lemongrass", drops: 8, note: "Myrcene — euphoric warmth" },
      { oil: "Lavender", drops: 6, note: "French lavender, exact aroma" },
      { oil: "Sage", drops: 6, note: "α-Humulene depth" },
      { oil: "German Chamomile", drops: 4, note: "α-Bisabolol, social ease" },
      { oil: "Geranium", drops: 2, note: "Raspberry fruitiness" },
    ],
    beers: {
      complement: [
        { name: "HenHouse IPA", brewery: "HenHouse", style: "American IPA", abv: "6.9%", why: "Hallertau Blanc brings lavender-floral character that mirrors the French lavender directly" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Dry floral spice resonates with the warm social character — earthy humulene match" },
      ],
      contrast: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Pineapple in the strain name + Galaxy hop pineapple = pure tropical amplification" },
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Raspberry tart acid contrasts the lavender warmth — social and bright" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Social sessions benefit from NA options — keeps everyone at the table, alert and present" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Gentle Hallertau floral cleanse mirrors the lavender note back softly" },
      ],
    },
  },
  {
    id: 20, farm: "heartrock", name: "Love and Laughter",
    farmFull: "Heartrock Mountain Farm", region: "Mendocino", energy: "HIGH",
    effects: ["Energizing", "Focusing", "Non-Intoxicating"],
    intent: "Clear and steady, nothing clouded.",
    aroma: ["Flowers", "Eucalyptus", "Berries"],
    terpenes: [["Myrcene",0.56],["Terpinolene",0.28],["β-Caryophyllene",0.20],["α-Pinene",0.13]],
    totalT: 1.72,
    oils: [
      { oil: "Lemongrass", drops: 14, note: "Myrcene — floral body" },
      { oil: "Tea Tree", drops: 8, note: "Terpinolene — bright clarity" },
      { oil: "Eucalyptus", drops: 8, note: "Eucalyptus aroma, exact" },
      { oil: "Black Pepper", drops: 6, note: "β-Caryophyllene" },
      { oil: "Geranium", drops: 4, note: "Berry, floral" },
    ],
    beers: {
      complement: [
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Hallertau terpinolene-adjacent floral clarity perfectly honors the non-intoxicating character" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "CBD strain pairs brilliantly with NA — clarity and focus, no interference" },
      ],
      contrast: [
        { name: "Pils", brewery: "Lagunitas", style: "Pilsner", abv: "5.1%", why: "Dry Saaz bitterness sharpens the focusing quality — clean and crisp mental contrast" },
        { name: "Helles", brewery: "Pond Farm", style: "Munich Helles", abv: "4.6%", why: "Elegant soft malt provides backdrop that lets eucalyptus clarity shine through" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "For a focus strain, crisp Saaz is the cleanest reset — refreshes without sedating" },
        { name: "Mexican Lager", brewery: "Pond Farm", style: "Lager", abv: "4.5%", why: "Completely neutral — keeps the session clear and focused as intended" },
      ],
    },
  },
  {
    id: 21, farm: "briceland", name: "Blueberry Muffin",
    farmFull: "Briceland Forest Farm", region: "Humboldt", energy: "MEDIUM",
    effects: ["Relaxed", "Peaceful", "Joyful"],
    intent: "Quiet peace with a soft glow.",
    aroma: ["Blueberry", "Fresh Dough", "Cinnamon"],
    terpenes: [["β-Caryophyllene",0.47],["Myrcene",0.40],["α-Bisabolol",0.25],["α-Humulene",0.16]],
    totalT: 1.66,
    oils: [
      { oil: "Black Pepper", drops: 12, note: "β-Caryophyllene backbone" },
      { oil: "Lemongrass", drops: 10, note: "Myrcene warmth" },
      { oil: "German Chamomile", drops: 8, note: "α-Bisabolol, the peacefulness" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
      { oil: "Geranium", drops: 4, note: "Berry-like top notes" },
      { oil: "Clove", drops: 2, note: "Cinnamon warmth, exact" },
    ],
    beers: {
      complement: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Berry acids mirror blueberry character — tart joy in a peaceful MEDIUM session" },
        { name: "Stoked! Hazy Pale", brewery: "HenHouse", style: "Hazy Pale", abv: "5.7%", why: "Soft orange and peach from Amarillo matches the cozy muffin sweetness" },
      ],
      contrast: [
        { name: "IPA", brewery: "Lagunitas", style: "American IPA", abv: "6.2%", why: "West Coast bite brightens the peaceful state — joyful edge becomes more active" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Pine resin cuts through the blueberry/cinnamon sweetness — adds beautiful brightness" },
      ],
      cleanse: [
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Light hop brightness cleanses without disrupting the peaceful, joyful mood" },
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Soft floral cleanse — blueberry note re-emerges perfectly on next inhalation" },
      ],
    },
  },
  {
    id: 22, farm: "solspirit", name: "Glitter Bomb",
    farmFull: "Sol Spirit Farm", region: "Trinity", energy: "MEDIUM",
    effects: ["Physically Relaxing", "Cerebral", "Euphoric"],
    intent: "Body at ease, mind sparkling.",
    aroma: ["Kiwi", "Pine", "Musk"],
    terpenes: [["Myrcene",1.23],["β-Caryophyllene",0.42],["β-Ocimene",0.17],["Linalool",0.15]],
    totalT: 2.39,
    oils: [
      { oil: "Lemongrass", drops: 18, note: "Myrcene (1.23%), earthy body" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene" },
      { oil: "Basil", drops: 4, note: "β-Ocimene, kiwi/herbal" },
      { oil: "Lavender", drops: 4, note: "Linalool softness" },
      { oil: "Pine", drops: 4, note: "Pine aroma note" },
    ],
    beers: {
      complement: [
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Galaxy + Citra tropical fruit matches kiwi — body melt into euphoric sparkle" },
        { name: "Frozen Envelope IPA", brewery: "HenHouse", style: "Hazy IPA", abv: "6.5%", why: "Dank orange and guava plus pine-adjacent Idaho 7 — full glitter bomb in a glass" },
      ],
      contrast: [
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Centennial pine resin amplifies the pine note — cerebral sparkling quality sharpened" },
        { name: "Blind Pig IPA", brewery: "Russian River", style: "American IPA", abv: "6.0%", why: "Classic bitter West Coast cuts through the earthy musk — cerebral clarity" },
      ],
      cleanse: [
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp reset for a high-myrcene strain — kiwi note returns bright and clean" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Body relaxation + NA = wise pairing, keeps the sparkling mind intact" },
      ],
    },
  },
  {
    id: 23, farm: "stickyfields", name: "Mandarin Cherry Tree",
    farmFull: "Sticky Fields", region: "Mendocino", energy: "MEDIUM",
    effects: ["Full Body Relaxation", "Serenity", "Creativity"],
    intent: "Settled body, gently wandering mind.",
    aroma: ["Mandarin Orange", "Sandalwood", "Lavender"],
    terpenes: [["Limonene",0.52],["β-Caryophyllene",0.36],["α-Humulene",0.13],["Linalool",0.11]],
    totalT: 1.75,
    oils: [
      { oil: "Sweet Orange", drops: 16, note: "Limonene — mandarin dominant" },
      { oil: "Black Pepper", drops: 10, note: "β-Caryophyllene" },
      { oil: "Lavender", drops: 6, note: "Linalool + lavender aroma" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
      { oil: "Ylang Ylang", drops: 4, note: "Sandalwood-adjacent, exotic" },
    ],
    beers: {
      complement: [
        { name: "Kubrick's Landing IPA", brewery: "HenHouse", style: "American IPA", abv: "7.2%", why: "Mandarina Bavaria hop in this beer creates a mandarin-to-mandarin perfect match" },
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Tropical citrus brightens the creative wandering quality — full body meets active mind" },
      ],
      contrast: [
        { name: "Barrel Sour", brewery: "Cooperage", style: "Barrel-Aged Sour", abv: "5.8%", why: "Cherry in the barrel sour + cherry in the strain name — tart vs. calm contrast" },
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Earthy dry spice amplifies creativity — sandalwood note deepens against farmhouse funk" },
      ],
      cleanse: [
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Hallertau floral echoes the lavender — gentle cleanse with thematic continuity" },
        { name: "Sonoma Coast Pils", brewery: "Iron Ox", style: "Pilsner", abv: "4.9%", why: "Crisp citrus Saaz resets the mandarin note cleanly — creativity refreshed" },
      ],
    },
  },
  {
    id: 24, farm: "sunrise", name: "Tropicanna Cherry",
    farmFull: "Sunrise Gardens", region: "Mendocino", energy: "HIGH",
    effects: ["Euphoric", "Cerebral", "Cheerful"],
    intent: "Bright lift with clear, lively edges.",
    aroma: ["Sour Cherry", "Sweet Citrus", "Nutmeg"],
    terpenes: [["β-Caryophyllene",0.37],["Limonene",0.29],["Linalool",0.15],["α-Humulene",0.11]],
    totalT: 1.18,
    oils: [
      { oil: "Black Pepper", drops: 12, note: "β-Caryophyllene backbone" },
      { oil: "Sweet Orange", drops: 10, note: "Limonene, sweet citrus" },
      { oil: "Lavender", drops: 6, note: "Linalool softness" },
      { oil: "Geranium", drops: 6, note: "Cherry-like fruity notes" },
      { oil: "Sage", drops: 4, note: "α-Humulene" },
      { oil: "Clove", drops: 2, note: "Nutmeg warmth echo" },
    ],
    beers: {
      complement: [
        { name: "Fruited Sour", brewery: "Barrel Brothers", style: "Fruited Sour", abv: "5.5%", why: "Tart cherry acid and sour citrus amplifies the sour cherry aroma — euphoria doubled" },
        { name: "Birds in Paradise", brewery: "Parliament", style: "Hazy IPA", abv: "6.8%", why: "Tropical brightness meets sweet citrus — the cheerful mood reaches new heights" },
      ],
      contrast: [
        { name: "Saison", brewery: "Pond Farm", style: "Farmhouse Saison", abv: "6.2%", why: "Nutmeg and clove spice in a dry saison echoes the nutmeg aroma — earthy counterpoint" },
        { name: "Racer 5", brewery: "Bear Republic", style: "IPA", abv: "7.0%", why: "Pine bitterness sharpens the cerebral edge — cheerful becomes electrically clear" },
      ],
      cleanse: [
        { name: "Kolsch", brewery: "Pond Farm", style: "Kölsch", abv: "4.8%", why: "Soft floral reset — sour cherry note re-blooms vividly after gentle cleanse" },
        { name: "Run Wild IPA", brewery: "Athletic (NA)", style: "Non-Alc IPA", abv: "0.5%", why: "Bright citrus hop cleanses while maintaining the cheerful, cerebral state" },
      ],
    },
  },
];

const SECTION_ICONS = { complement: "◈", contrast: "⟁", cleanse: "○" };
const SECTION_LABEL = { complement: "Complement", contrast: "Contrast", cleanse: "Cleanse" };
const SECTION_DESC = {
  complement: "Mirror the terpene — shared molecular pathways amplify the effect",
  contrast: "Amplify by opposition — bitterness or darkness makes brightness pop",
  cleanse: "Reset the palate — effervescence and acidity restore sensitivity",
};

export default function App() {
  const [activeFarm, setActiveFarm] = useState("all");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("complement");
  const [phase, setPhase] = useState("beer"); // "oils" | "beer"

  const visible = activeFarm === "all" ? STRAINS : STRAINS.filter(s => s.farm === activeFarm);
  const strain = selected ? STRAINS.find(s => s.id === selected) : null;

  const openStrain = (id) => { setSelected(id); setTab("complement"); setPhase("beer"); };
  const close = () => setSelected(null);

  const maxT = strain ? Math.max(...strain.terpenes.map(t => t[1])) : 1;

  return (
    <div style={{
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#09090B",
      minHeight: "100vh",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 20px 0",
        borderBottom: "1px solid #1a1a1e",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#5C6B6B", textTransform: "uppercase" }}>Vibe Curator</span>
          <span style={{ color: "#2a2a30" }}>×</span>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#5C6B6B", textTransform: "uppercase" }}>Solful Sessions</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, paddingBottom: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 300, color: "#E8E0D5", letterSpacing: "-0.02em" }}>
            Beer Pairing Library
          </span>
          <span style={{ fontSize: 13, color: "#4a5a4a" }}>{STRAINS.length} strains</span>
        </div>

        {/* Farm selector */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {FARMS.map(f => {
            const count = f.id === "all" ? STRAINS.length : STRAINS.filter(s => s.farm === f.id).length;
            return (
              <button key={f.id} onClick={() => setActiveFarm(f.id)} style={{
                flexShrink: 0,
                padding: "5px 12px",
                borderRadius: 20,
                border: activeFarm === f.id ? "1px solid #5C8E6B" : "1px solid #1e2320",
                background: activeFarm === f.id ? "rgba(92,142,107,0.12)" : "transparent",
                color: activeFarm === f.id ? "#8EAE68" : "#4a5a4a",
                fontSize: 12,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}>
                {f.name} {count > 0 && <span style={{ opacity: 0.6, fontSize: 11 }}>{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Strain grid */}
      <div style={{ padding: "12px 16px 80px", display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.map(s => {
          const dom = s.terpenes[0];
          return (
            <button key={s.id} onClick={() => openStrain(s.id)} style={{
              background: "#0e0e12",
              border: "1px solid #1a1a1e",
              borderRadius: 12,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}>
              {/* Terpene color swatch */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: TC[dom[0]] + "22",
                border: `1px solid ${TC[dom[0]]}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: TC[dom[0]] }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#E8E0D5", letterSpacing: "-0.01em" }}>{s.name}</span>
                  <span style={{
                    fontSize: 10, letterSpacing: "0.08em", color: ENERGY_COLOR[s.energy],
                    background: ENERGY_COLOR[s.energy] + "18", padding: "2px 8px", borderRadius: 10,
                  }}>{s.energy}</span>
                </div>
                <div style={{ fontSize: 11, color: "#4a5550", marginTop: 2 }}>{s.farmFull} · {s.region}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {s.terpenes.slice(0, 3).map(([t]) => (
                    <span key={t} style={{
                      fontSize: 10, color: TC[t], background: TC[t] + "15",
                      padding: "1px 6px", borderRadius: 6, letterSpacing: "0.03em",
                    }}>{t.replace("β-","β·").replace("α-","α·")}</span>
                  ))}
                </div>
              </div>
              <span style={{ color: "#2a3030", fontSize: 16 }}>›</span>
            </button>
          );
        })}
      </div>

      {/* Bottom sheet */}
      {strain && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
        }}>
          {/* Backdrop */}
          <div onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />

          {/* Sheet */}
          <div style={{
            position: "relative", zIndex: 1,
            background: "#0e0e12",
            borderRadius: "20px 20px 0 0",
            border: "1px solid #1e1e24",
            borderBottom: "none",
            maxHeight: "88vh",
            overflowY: "auto",
            maxWidth: 480,
            width: "100%",
            margin: "0 auto",
          }}>
            {/* Drag bar */}
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
              <div style={{ width: 32, height: 3, borderRadius: 2, background: "#2a2a30" }} />
            </div>

            <div style={{ padding: "16px 20px 32px" }}>
              {/* Strain header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 300, color: "#E8E0D5", letterSpacing: "-0.02em" }}>{strain.name}</div>
                  <div style={{ fontSize: 12, color: "#4a5550", marginTop: 2 }}>{strain.farmFull} · {strain.region}</div>
                  <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {strain.effects.map(e => (
                      <span key={e} style={{ fontSize: 11, color: "#8EAEC8", background: "#8EAEC818", padding: "2px 8px", borderRadius: 8 }}>{e}</span>
                    ))}
                    <span style={{ fontSize: 11, color: ENERGY_COLOR[strain.energy], background: ENERGY_COLOR[strain.energy]+"18", padding: "2px 8px", borderRadius: 8 }}>
                      {ENERGY_LABEL[strain.energy]}
                    </span>
                  </div>
                </div>
                <button onClick={close} style={{ background: "#1a1a20", border: "none", color: "#5a5a6a", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, flexShrink: 0 }}>✕</button>
              </div>

              {/* Aroma */}
              <div style={{ fontSize: 13, color: "#5a6a5a", marginBottom: 16, fontStyle: "italic" }}>
                {strain.aroma.join(" · ")}
              </div>

              {/* Terpene bars */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#3a4a3a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Terpene Profile · {strain.totalT}% total</div>
                {strain.terpenes.map(([t, v]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: TC[t], width: 130, flexShrink: 0 }}>{t}</span>
                    <div style={{ flex: 1, height: 4, background: "#1a1a20", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${(v / maxT) * 100}%`, height: "100%", background: TC[t], borderRadius: 2, transition: "width 0.4s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#3a4a3a", width: 36, textAlign: "right" }}>{v}%</span>
                  </div>
                ))}
              </div>

              {/* Phase toggle */}
              <div style={{ display: "flex", gap: 4, background: "#0a0a0e", borderRadius: 10, padding: 3, marginBottom: 18 }}>
                {[["oils","🌿 Pre-load"],["beer","🍺 Beer Pairing"]].map(([p,label]) => (
                  <button key={p} onClick={()=>setPhase(p)} style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                    background: phase === p ? "#1a2a1e" : "transparent",
                    color: phase === p ? "#8EAE68" : "#3a4a3a",
                    transition: "all 0.15s",
                  }}>{label}</button>
                ))}
              </div>

              {/* PRE-LOAD: Essential Oil section */}
              {phase === "oils" && (
                <div>
                  <div style={{ fontSize: 10, color: "#3a4a3a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Essential Oil Blend</div>
                  <div style={{ fontSize: 12, color: "#3a5040", marginBottom: 14, lineHeight: 1.5 }}>
                    Diffuse for 20–30 min before consumption to prime receptor systems with matching terpenes. Add 1–2 drops to water for enhanced flavor.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {strain.oils.map((o, i) => (
                      <div key={i} style={{
                        background: "#0a0e0a",
                        border: "1px solid #1a2a1a",
                        borderRadius: 10,
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: "#5C8E6B22",
                          border: "1px solid #5C8E6B40",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14, fontWeight: 600, color: "#8EAE68", flexShrink: 0,
                        }}>{o.drops}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: "#C8D8C0", fontWeight: 500 }}>{o.oil}</div>
                          <div style={{ fontSize: 11, color: "#3a5040" }}>{o.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 11, color: "#2a3a2a", lineHeight: 1.5 }}>
                    40 drops / 2ml blend · ratio calibrated to match strain terpene proportions
                  </div>
                </div>
              )}

              {/* BEER PAIRING section */}
              {phase === "beer" && (
                <div>
                  {/* Pairing tabs */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {["complement","contrast","cleanse"].map(t => (
                      <button key={t} onClick={() => setTab(t)} style={{
                        flex: 1, padding: "7px 0", borderRadius: 8,
                        border: tab === t ? "1px solid #2a3a2a" : "1px solid transparent",
                        background: tab === t ? "#1a2a1a" : "transparent",
                        color: tab === t ? "#8EAE68" : "#3a4a3a",
                        fontSize: 11, cursor: "pointer",
                        letterSpacing: "0.05em",
                        transition: "all 0.15s",
                      }}>
                        {SECTION_ICONS[t]} {SECTION_LABEL[t]}
                      </button>
                    ))}
                  </div>

                  {/* Tab description */}
                  <div style={{ fontSize: 12, color: "#3a5040", lineHeight: 1.5, marginBottom: 14, paddingLeft: 2 }}>
                    {SECTION_DESC[tab]}
                  </div>

                  {/* Beer cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {strain.beers[tab].map((b, i) => (
                      <div key={i} style={{
                        background: "#0a0a0e",
                        border: "1px solid #1e1e28",
                        borderRadius: 12,
                        padding: "14px 16px",
                      }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 500, color: "#E8E0D5" }}>{b.name}</div>
                            <div style={{ fontSize: 12, color: "#4a5550" }}>{b.brewery} · {b.style} · {b.abv}</div>
                          </div>
                          <span style={{
                            fontSize: 9, letterSpacing: "0.1em",
                            color: tab === "complement" ? "#D4C85C" : tab === "contrast" ? "#C8A97E" : "#8EAEC8",
                            background: (tab === "complement" ? "#D4C85C" : tab === "contrast" ? "#C8A97E" : "#8EAEC8") + "15",
                            padding: "2px 8px", borderRadius: 8, flexShrink: 0, marginTop: 2, textTransform: "uppercase",
                          }}>{SECTION_LABEL[tab]}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#4a5a48", lineHeight: 1.5 }}>
                          {b.why}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

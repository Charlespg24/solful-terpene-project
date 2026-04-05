import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================
// SOLFUL SESSIONS — B2C Consumer App
// ============================================
// A cannabis session orchestrator that helps users
// design intentional experiences with strain, scent, and sound.

// Design tokens
const colors = {
  forest: '#2D5A3D',
  sage: '#6B8E6B',
  cream: '#F5F2EB',
  warmWhite: '#FDFCFA',
  charcoal: '#2C2C2C',
  gold: '#C4A962',
  muted: '#8B8B8B',
  deepPurple: '#4A3B5C',
  warmOrange: '#D4845C',
  softBlue: '#5C7B8A',
  rose: '#9C6B7D',
};

// ============================================
// VIBE CATEGORIES
// ============================================
const vibeCategories = {
  deepRestSleep: {
    id: 'deepRestSleep',
    name: 'Deep Rest',
    icon: '🌙',
    description: 'Total surrender, dissolving into quiet',
    bpmRange: { min: 55, max: 80 },
    energyRange: { min: 0.05, max: 0.25 },
    color: colors.deepPurple,
  },
  warmRelaxation: {
    id: 'warmRelaxation',
    name: 'Warm Relaxation',
    icon: '🛋️',
    description: 'Grounded calm, steady comfort',
    bpmRange: { min: 75, max: 95 },
    energyRange: { min: 0.20, max: 0.45 },
    color: colors.warmOrange,
  },
  contemplativeDrift: {
    id: 'contemplativeDrift',
    name: 'Drift',
    icon: '☁️',
    description: 'Settled body, wandering mind',
    bpmRange: { min: 80, max: 100 },
    energyRange: { min: 0.30, max: 0.50 },
    color: colors.softBlue,
  },
  easySocial: {
    id: 'easySocial',
    name: 'Social',
    icon: '✨',
    description: 'Warm gathering, conversation-friendly',
    bpmRange: { min: 90, max: 110 },
    energyRange: { min: 0.45, max: 0.65 },
    color: colors.gold,
  },
  clearFocus: {
    id: 'clearFocus',
    name: 'Focus',
    icon: '🎯',
    description: 'Calm productivity, no fog',
    bpmRange: { min: 95, max: 105 },
    energyRange: { min: 0.40, max: 0.55 },
    color: colors.sage,
  },
  brightUplift: {
    id: 'brightUplift',
    name: 'Uplift',
    icon: '☀️',
    description: 'Sunny, cheerful, moving',
    bpmRange: { min: 105, max: 125 },
    energyRange: { min: 0.60, max: 0.80 },
    color: colors.warmOrange,
  },
  vividEnergy: {
    id: 'vividEnergy',
    name: 'Energize',
    icon: '⚡',
    description: 'Electric, propulsive, alive',
    bpmRange: { min: 110, max: 125 },
    energyRange: { min: 0.65, max: 0.85 },
    color: colors.rose,
  },
  create: {
    id: 'create',
    name: 'Create',
    icon: '🎨',
    description: 'Unlock ideas, artistic flow',
    bpmRange: { min: 85, max: 110 },
    energyRange: { min: 0.40, max: 0.65 },
    color: colors.deepPurple,
  },
};

// ============================================
// STRAIN DATA WITH MUSIC PROMPTS
// ============================================
const strains = [
  {
    id: 'guava-gift',
    name: 'Guava Gift',
    farm: 'Alpenglow Farms',
    region: 'Humboldt',
    vibeCategory: 'easySocial',
    intent: 'Open and expansive, easy social lift',
    effects: ['Social', 'Inspiring', 'Euphoric'],
    aroma: ['Fresh Guava', 'Lemon Rind', 'Tamarind'],
    totalTerpenes: '2.34%',
    terpenes: [
      { name: 'β-Caryophyllene', percentage: 0.73 },
      { name: 'Limonene', percentage: 0.50 },
      { name: 'Myrcene', percentage: 0.33 },
      { name: 'α-Humulene', percentage: 0.25 },
    ],
    oils: [
      { name: 'Black Pepper', drops: 14 },
      { name: 'Grapefruit', drops: 10 },
      { name: 'Lemongrass', drops: 8 },
      { name: 'Basil', drops: 6 },
      { name: 'Rosemary', drops: 2 },
    ],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 100, peak: 115, end: 90 },
      prompt: "Create a 90-minute playlist for an open, social hang — bright but not manic, warm but not heavy. Start around 100 BPM with feel-good indie and tropical-influenced tracks — Toro y Moi, Jungle, early Tame Impala. Build into groovy, sunlit funk and disco edits around 110-115 BPM through the middle. Wind down the last 20 minutes with warm bossa nova or acoustic neo-soul. Major keys throughout. The energy should feel like a golden hour backyard gathering where everyone's laughing easily.",
      artistReferences: ['Toro y Moi', 'Jungle', 'Tame Impala'],
      textureDescriptors: ['feel-good indie', 'tropical-influenced', 'sunlit funk'],
    },
    isSolful: true,
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle',
    farm: 'Dos Rios Farms',
    region: 'Mendocino',
    vibeCategory: 'deepRestSleep',
    intent: 'Deep surrender into velvet quiet',
    effects: ['Deeply Relaxed', 'Blissful', 'Sleepy'],
    aroma: ['Violet', 'Dark Honey', 'Dried Fruit'],
    totalTerpenes: '1.87%',
    terpenes: [
      { name: 'β-Caryophyllene', percentage: 0.61 },
      { name: 'Limonene', percentage: 0.46 },
      { name: 'α-Humulene', percentage: 0.19 },
      { name: 'trans-β-Farnesene', percentage: 0.14 },
    ],
    oils: [
      { name: 'Black Pepper', drops: 14 },
      { name: 'Lemon', drops: 10 },
      { name: 'Sage', drops: 6 },
      { name: 'Ylang Ylang', drops: 6 },
      { name: 'Sweet Orange', drops: 4 },
    ],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 75, end: 55 },
      prompt: "Create a 90-minute playlist for total surrender. Start at 75 BPM and slowly descend to 55 BPM by the end. Open with deep, velvet-textured downtempo — Tycho's slower work, Boards of Canada, Helios. Transition into pure ambient and drone by the midpoint — Brian Eno, Stars of the Lid, Grouper. Final 30 minutes should be barely-there sound design — long tones, deep bass swells, no rhythm. Think warm darkness, not cold emptiness. Every track should feel like sinking deeper into a soft surface. Exclusively instrumental. No sudden dynamic shifts.",
      artistReferences: ['Tycho', 'Boards of Canada', 'Brian Eno', 'Stars of the Lid'],
      textureDescriptors: ['velvet-textured downtempo', 'ambient and drone', 'deep bass swells'],
    },
    isSolful: true,
  },
  {
    id: 'carambola',
    name: 'Carambola',
    farm: 'Higher Heights',
    region: 'Mendocino',
    vibeCategory: 'brightUplift',
    intent: 'Light and playful, effervescent energy',
    effects: ['Uplifted', 'Cheerful', 'Energized'],
    aroma: ['Starfruit', 'Citrus Zest', 'White Flowers'],
    totalTerpenes: '1.12%',
    terpenes: [
      { name: 'Limonene', percentage: 0.44 },
      { name: 'β-Caryophyllene', percentage: 0.18 },
      { name: 'Linalool', percentage: 0.12 },
      { name: 'α-Bisabolol', percentage: 0.09 },
    ],
    oils: [
      { name: 'Grapefruit', drops: 16 },
      { name: 'Black Pepper', drops: 8 },
      { name: 'Lavender', drops: 6 },
      { name: 'German Chamomile', drops: 4 },
      { name: 'Bergamot', drops: 6 },
    ],
    musicPrompt: {
      duration: 60,
      bpmTarget: { start: 110, end: 125 },
      prompt: "Create a 60-minute playlist that's pure effervescence — bright, playful, and uplifting without being aggressive. Target 110-125 BPM. Lean into sunny indie pop, citrus-bright electronic, and feel-good dance tracks. Think Parcels, Franc Moody, Channel Tres, Confidence Man. Keep production crisp and clean — bright synths, tight percussion, major keys. Everything should feel like carbonation in your ears. No ballads, no minor keys, no heaviness. The whole playlist should make you want to move and smile.",
      artistReferences: ['Parcels', 'Franc Moody', 'Channel Tres', 'Confidence Man'],
      textureDescriptors: ['sunny indie pop', 'citrus-bright electronic', 'crisp and clean'],
    },
    isSolful: true,
  },
  {
    id: 'glitter-bomb',
    name: 'Glitter Bomb',
    farm: 'Sol Spirit Farm',
    region: 'Trinity',
    vibeCategory: 'contemplativeDrift',
    intent: 'Body at ease, mind sparkling',
    effects: ['Physically Relaxed', 'Cerebral', 'Creative'],
    aroma: ['Berry Candy', 'Pine', 'Sweet Herbs'],
    totalTerpenes: '2.41%',
    terpenes: [
      { name: 'Myrcene', percentage: 1.23 },
      { name: 'β-Caryophyllene', percentage: 0.42 },
      { name: 'β-Ocimene', percentage: 0.17 },
      { name: 'Linalool', percentage: 0.15 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 16 },
      { name: 'Black Pepper', drops: 10 },
      { name: 'Basil', drops: 6 },
      { name: 'Lavender', drops: 6 },
      { name: 'Neroli', drops: 2 },
    ],
    musicPrompt: {
      duration: 75,
      bpmTarget: { start: 80, end: 90 },
      prompt: "Create a 75-minute playlist where the body melts but the mind stays lit up. Start with deep, cushioned grooves around 80-90 BPM — FKJ instrumentals, Tom Misch & Yussef Dayes, Alfa Mist. Layer in sparkling, detailed electronic textures through the middle — Floating Points' shorter pieces, Rival Consoles, Kiasmos. Close with ambient that has crystalline upper-register detail over deep bass warmth — Stars of the Lid, Tim Hecker's softer work. Production should feel like lying on velvet while watching fireworks — heavy bottom, glittering top. Instrumental only. Let the contrast between heavy body and bright mind carry the whole set.",
      artistReferences: ['FKJ', 'Tom Misch', 'Floating Points', 'Kiasmos'],
      textureDescriptors: ['cushioned grooves', 'sparkling electronic', 'crystalline upper-register'],
    },
    isSolful: true,
  },
  {
    id: 'mule-fuel',
    name: 'Mule Fuel',
    farm: 'Solful Exclusive',
    region: 'Mendocino',
    vibeCategory: 'deepRestSleep',
    intent: 'Gentle contentment settling toward rest',
    effects: ['Heavy', 'Cozy', 'Sleepy'],
    aroma: ['Diesel', 'Sweet Earth', 'Herbs'],
    totalTerpenes: '3.84%',
    terpenes: [
      { name: 'Myrcene', percentage: 2.22 },
      { name: 'α-Pinene', percentage: 0.54 },
      { name: 'β-Caryophyllene', percentage: 0.34 },
      { name: 'Limonene', percentage: 0.28 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 18 },
      { name: 'Rosemary', drops: 8 },
      { name: 'Black Pepper', drops: 6 },
      { name: 'Lemon', drops: 4 },
      { name: 'Eucalyptus', drops: 4 },
    ],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 85, mid: 65, end: 60 },
      prompt: "Create a 90-minute playlist that starts with gentle contentment and gradually dissolves into deep rest. First 20 minutes: warm, unhurried acoustic and lo-fi at 80-85 BPM — Iron & Wine, Nils Frahm's piano pieces, Bon Iver's quieter work. Middle 30 minutes: descend to 65-70 BPM with ambient and instrumental — Sigur Rós ambient works, Ólafur Arnalds, ambient guitar loops. Final 40 minutes: pure sleep-adjacent soundscapes below 60 BPM — deep drones, slow-evolving textures, nature recordings layered with soft tones. Think warm gravity slowly pulling you down. No percussion after the midpoint. Nothing bright. Nothing sharp.",
      artistReferences: ['Iron & Wine', 'Nils Frahm', 'Bon Iver', 'Ólafur Arnalds'],
      textureDescriptors: ['warm acoustic', 'lo-fi', 'sleep-adjacent soundscapes'],
    },
    isSolful: true,
    isExclusive: true,
  },
  {
    id: 'tropical-sleigh-ride',
    name: 'Tropical Sleigh Ride',
    farm: 'Greenshock Farms',
    region: 'Mendocino',
    vibeCategory: 'vividEnergy',
    intent: 'Vivid lift with present clarity',
    effects: ['Joyful', 'Alert', 'Energized'],
    aroma: ['Tropical Fruit', 'Pine', 'Sweet Citrus'],
    totalTerpenes: '2.35%',
    terpenes: [
      { name: 'β-Ocimene', percentage: 0.71 },
      { name: 'β-Caryophyllene', percentage: 0.70 },
      { name: 'α-Humulene', percentage: 0.28 },
      { name: 'Limonene', percentage: 0.22 },
    ],
    oils: [
      { name: 'Basil', drops: 14 },
      { name: 'Black Pepper', drops: 12 },
      { name: 'Sage', drops: 6 },
      { name: 'Grapefruit', drops: 6 },
      { name: 'Neroli', drops: 2 },
    ],
    musicPrompt: {
      duration: 75,
      bpmTarget: { start: 110, end: 120 },
      prompt: "Create a 75-minute playlist that's vivid and joyful but stays present — bright energy without losing focus. Target 110-120 BPM. Start with upbeat world-fusion and Afrobeat-influenced tracks — Mdou Moctar, Khruangbin's uptempo work, KOKOROKO. Build into bright indie dance and synth-forward grooves — Caribou, Four Tet's dancier tracks, Floating Points. Keep percussion prominent and crisp throughout — the rhythm should feel alive and detailed. Mix organic instruments with electronic brightness. The vibe is tropical sunrise with a clear mind. Vocals are welcome if they add energy.",
      artistReferences: ['Mdou Moctar', 'Khruangbin', 'KOKOROKO', 'Caribou', 'Four Tet'],
      textureDescriptors: ['world-fusion', 'Afrobeat-influenced', 'synth-forward grooves'],
    },
    isSolful: true,
  },
  {
    id: 'love-and-laughter',
    name: 'Love and Laughter',
    farm: 'Heartrock Mountain Farm',
    region: 'Mendocino',
    vibeCategory: 'clearFocus',
    intent: 'Clear and steady, nothing clouded',
    effects: ['Focused', 'Calm', 'Clear-headed'],
    aroma: ['Herbal', 'Citrus', 'Earthy'],
    totalTerpenes: '1.62%',
    isCBD: true,
    terpenes: [
      { name: 'Myrcene', percentage: 0.56 },
      { name: 'Terpinolene', percentage: 0.28 },
      { name: 'β-Caryophyllene', percentage: 0.20 },
      { name: 'α-Pinene', percentage: 0.13 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 12 },
      { name: 'Tea Tree', drops: 8 },
      { name: 'Black Pepper', drops: 6 },
      { name: 'Rosemary', drops: 6 },
      { name: 'Eucalyptus', drops: 8 },
    ],
    musicPrompt: {
      duration: 60,
      bpmTarget: { start: 95, end: 105 },
      prompt: "Create a 60-minute playlist for clear, steady focus — no cloud, no haze, just calm productivity. Target 95-105 BPM throughout. Lean into minimalist post-rock and ambient electronic — Explosions in the Sky's quieter pieces, Tycho, Kiasmos, Jon Hopkins' gentler work. Keep instrumentation clean and spacious — piano with subtle electronics, clear guitar motifs, precise rhythms. No lyrics. No busy arrangements. The production should feel like clean air and natural light. Every track should support concentration without demanding attention. Think study session in a sunlit room.",
      artistReferences: ['Explosions in the Sky', 'Tycho', 'Kiasmos', 'Jon Hopkins'],
      textureDescriptors: ['minimalist post-rock', 'ambient electronic', 'clean and spacious'],
    },
    isSolful: true,
  },
  {
    id: 'avenue-of-the-giants',
    name: 'Avenue of the Giants',
    farm: 'Happy Day Farms',
    region: 'Mendocino',
    vibeCategory: 'vividEnergy',
    intent: 'Forward momentum with electric clarity',
    effects: ['Energized', 'Buzzy', 'Motivating'],
    aroma: ['Pine Forest', 'Citrus', 'Earth'],
    totalTerpenes: '3.31%',
    terpenes: [
      { name: 'Myrcene', percentage: 1.94 },
      { name: 'β-Caryophyllene', percentage: 0.43 },
      { name: 'β-Ocimene', percentage: 0.24 },
      { name: 'α-Pinene', percentage: 0.26 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 16 },
      { name: 'Black Pepper', drops: 8 },
      { name: 'Basil', drops: 6 },
      { name: 'Rosemary', drops: 6 },
      { name: 'Eucalyptus', drops: 4 },
    ],
    musicPrompt: {
      duration: 75,
      bpmTarget: { start: 105, peak: 120, end: 120 },
      prompt: "Create a 75-minute playlist that's propulsive and electric — forward momentum with a deep foundation underneath. Start at 105 BPM and build to 120 by midpoint, then hold. Open with driving post-rock and shoegaze — Mogwai's uptempo pieces, M83, DIIV. Build into energizing electronic with real weight — Moderat, Jon Hopkins 'Open Eye Signal' energy, Bicep. Keep bass heavy and textured throughout — the low end should feel massive while the highs crackle with clarity. This is a redwood forest soundtrack — towering and electric. No chill, no drift. Pure forward motion. Instrumental preferred but powerful vocals welcome if they add momentum.",
      artistReferences: ['Mogwai', 'M83', 'DIIV', 'Moderat', 'Jon Hopkins', 'Bicep'],
      textureDescriptors: ['driving post-rock', 'shoegaze', 'heavy bass', 'electric highs'],
    },
    isSolful: true,
  },
  {
    id: "black-lime-chem",
    name: "Black Lime Chem",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    vibeCategory: "deepRestSleep",
    intent: "Weighted bliss melting toward rest",
    effects: ["Heavy", "Blissful", "Sleepy"],
    aroma: ["Sharp Lime", "Rhubarb", "Glue"],
    totalTerpenes: "3.08%",
    terpenes: [{"name": "Myrcene", "percentage": 1.69}, {"name": "\u03b1-Pinene", "percentage": 0.39}, {"name": "\u03b2-Caryophyllene", "percentage": 0.27}, {"name": "\u03b2-Ocimene", "percentage": 0.19}],
    oils: [{"name": "Lemongrass", "drops": 16}, {"name": "Pine", "drops": 8}, {"name": "Black Pepper", "drops": 6}, {"name": "Basil", "drops": 6}, {"name": "Lemon", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 69, end: 91 },
      prompt: "A calm, grounding, slow session. Weighted bliss melting toward rest. Genres: ambient, dub, lo-fi hip hop, acoustic folk. Tempo around 69-91 BPM.",
      artistReferences: ["Bonobo", "Thievery Corporation", "Nujabes", "Bon Iver"],
      textureDescriptors: ["ambient", "dub", "lo-fi hip hop"],
    },
    isSolful: true,
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    farm: "Briceland Forest Farm",
    region: "Humboldt",
    vibeCategory: "warmRelaxation",
    intent: "Quiet peace with a soft glow",
    effects: ["Relaxed", "Peaceful", "Joyful"],
    aroma: ["Blueberry", "Fresh Dough", "Cinnamon"],
    totalTerpenes: "1.66%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.47}, {"name": "Myrcene", "percentage": 0.4}, {"name": "\u03b1-Bisabolol", "percentage": 0.25}, {"name": "\u03b1-Humulene", "percentage": 0.16}],
    oils: [{"name": "Black Pepper", "drops": 12}, {"name": "Lemongrass", "drops": 10}, {"name": "German Chamomile", "drops": 8}, {"name": "Sage", "drops": 4}, {"name": "Geranium", "drops": 4}, {"name": "Clove", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 69, end: 91 },
      prompt: "A calm, grounding, slow session. Quiet peace with a soft glow. Genres: deep house, reggae, jazz, ambient. Tempo around 69-91 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Bonobo"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "lemon-papaya-banana",
    name: "Lemon Papaya Banana",
    farm: "Terrapin Farms",
    region: "Humboldt",
    vibeCategory: "deepRestSleep",
    intent: "Soft body, drifting expansive mind",
    effects: ["Physically Relaxed", "Spacey", "Euphoric"],
    aroma: ["Papaya", "Honeydew Melon", "Lemon Zest"],
    totalTerpenes: "1.38%",
    terpenes: [{"name": "Myrcene", "percentage": 0.57}, {"name": "Limonene", "percentage": 0.29}, {"name": "\u03b2-Caryophyllene", "percentage": 0.16}, {"name": "\u03b1-Humulene", "percentage": 0.05}],
    oils: [{"name": "Lemongrass", "drops": 14}, {"name": "Lemon", "drops": 10}, {"name": "Black Pepper", "drops": 6}, {"name": "Geranium", "drops": 6}, {"name": "Ylang Ylang", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 73, end: 97 },
      prompt: "A calm, grounding, slow session. Soft body, drifting expansive mind. Genres: ambient, dub, lo-fi hip hop, funk. Tempo around 73-97 BPM.",
      artistReferences: ["Bonobo", "Thievery Corporation", "Nujabes", "Anderson .Paak"],
      textureDescriptors: ["ambient", "dub", "lo-fi hip hop"],
    },
    isSolful: true,
  },
  {
    id: "love-and-laughter-cbd",
    name: "Love and Laughter CBD",
    farm: "Heartrock Mountain Farm",
    region: "Mendocino",
    vibeCategory: "clearFocus",
    intent: "Clear and steady, nothing clouded",
    effects: ["Energizing", "Focusing", "Non-Intoxicating"],
    aroma: ["Flowers", "Eucalyptus", "Berries"],
    totalTerpenes: "1.72%",
    terpenes: [{"name": "Myrcene", "percentage": 0.56}, {"name": "Terpinolene", "percentage": 0.28}, {"name": "\u03b2-Caryophyllene", "percentage": 0.2}, {"name": "\u03b1-Pinene", "percentage": 0.13}],
    oils: [{"name": "Lemongrass", "drops": 14}, {"name": "Tea Tree", "drops": 8}, {"name": "Eucalyptus", "drops": 8}, {"name": "Black Pepper", "drops": 6}, {"name": "Geranium", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 76, end: 100 },
      prompt: "A bright, uplifting, energetic session. Clear and steady, nothing clouded. Genres: ambient, dub, lo-fi hip hop, psychedelic. Tempo around 76-100 BPM.",
      artistReferences: ["Bonobo", "Thievery Corporation", "Nujabes", "Tame Impala"],
      textureDescriptors: ["ambient", "dub", "lo-fi hip hop"],
    },
    isSolful: true,
  },
  {
    id: "mandarin-cherry-tree",
    name: "Mandarin Cherry Tree",
    farm: "Sticky Fields",
    region: "Mendocino",
    vibeCategory: "warmRelaxation",
    intent: "Settled body, gently wandering mind",
    effects: ["Full Body Relaxation", "Serenity", "Creativity"],
    aroma: ["Mandarin Orange", "Sandalwood", "Lavender"],
    totalTerpenes: "1.75%",
    terpenes: [{"name": "Limonene", "percentage": 0.52}, {"name": "\u03b2-Caryophyllene", "percentage": 0.36}, {"name": "\u03b1-Humulene", "percentage": 0.13}, {"name": "Linalool", "percentage": 0.11}],
    oils: [{"name": "Sweet Orange", "drops": 16}, {"name": "Black Pepper", "drops": 10}, {"name": "Lavender", "drops": 6}, {"name": "Sage", "drops": 4}, {"name": "Ylang Ylang", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 84, end: 110 },
      prompt: "A calm, grounding, slow session. Settled body, gently wandering mind. Genres: funk, soul, pop, deep house. Tempo around 84-110 BPM.",
      artistReferences: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
      textureDescriptors: ["funk", "soul", "pop"],
    },
    isSolful: true,
  },
  {
    id: "mikes-bomba",
    name: "Mike's Bomba",
    farm: "Glentucky Family Farm",
    region: "Sonoma",
    vibeCategory: "warmRelaxation",
    intent: "Grounded calm with clear mental edges",
    effects: ["Relaxed", "Calm", "Alert"],
    aroma: ["Fuel", "Lemon Cream", "Forest Floor"],
    totalTerpenes: "1.38%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.47}, {"name": "Limonene", "percentage": 0.32}, {"name": "\u03b1-Humulene", "percentage": 0.18}, {"name": "Linalool", "percentage": 0.07}],
    oils: [{"name": "Black Pepper", "drops": 20}, {"name": "Lemon", "drops": 10}, {"name": "Sage", "drops": 8}, {"name": "Lavender", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 82, end: 107 },
      prompt: "A calm, grounding, slow session. Grounded calm with clear mental edges. Genres: deep house, reggae, jazz, funk. Tempo around 82-107 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "moonlight",
    name: "Moonlight",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    vibeCategory: "warmRelaxation",
    intent: "Soft gratitude in a settled body",
    effects: ["Physically Relaxed", "Calm", "Grateful"],
    aroma: ["Watermelon Candy", "Citrus Zest", "Earl Grey"],
    totalTerpenes: "2.67%",
    terpenes: [{"name": "Myrcene", "percentage": 0.74}, {"name": "\u03b2-Caryophyllene", "percentage": 0.51}, {"name": "Terpinolene", "percentage": 0.38}, {"name": "\u03b1-Bisabolol", "percentage": 0.24}],
    oils: [{"name": "Lemongrass", "drops": 12}, {"name": "Black Pepper", "drops": 10}, {"name": "Tea Tree", "drops": 8}, {"name": "German Chamomile", "drops": 6}, {"name": "Bergamot", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 74, end: 97 },
      prompt: "A calm, grounding, slow session. Soft gratitude in a settled body. Genres: ambient, dub, lo-fi hip hop, deep house. Tempo around 74-97 BPM.",
      artistReferences: ["Bonobo", "Thievery Corporation", "Nujabes", "Khruangbin"],
      textureDescriptors: ["ambient", "dub", "lo-fi hip hop"],
    },
    isSolful: true,
  },
  {
    id: "natty-bumppo",
    name: "Natty Bumppo",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    vibeCategory: "easySocial",
    intent: "Loose and easy, happily untethered",
    effects: ["Happy", "Carefree", "Physically Relaxed"],
    aroma: ["Kerosene", "Musk", "Sour Plum"],
    totalTerpenes: "1.86%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.63}, {"name": "Limonene", "percentage": 0.35}, {"name": "\u03b1-Humulene", "percentage": 0.25}, {"name": "Myrcene", "percentage": 0.19}],
    oils: [{"name": "Black Pepper", "drops": 14}, {"name": "Lemon", "drops": 10}, {"name": "Sage", "drops": 6}, {"name": "Lemongrass", "drops": 6}, {"name": "Geranium", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 80, end: 105 },
      prompt: "A calm, grounding, slow session. Loose and easy, happily untethered. Genres: deep house, reggae, jazz, funk. Tempo around 80-105 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "peach-flambe",
    name: "Peach Flamb\u00e9",
    farm: "Terrapin Farms",
    region: "Humboldt",
    vibeCategory: "brightUplift",
    intent: "Sunny drive with bright momentum",
    effects: ["Happy", "Energized", "Motivated"],
    aroma: ["White Peach", "Cashew Butter", "Brown Sugar"],
    totalTerpenes: "1.05%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.25}, {"name": "Myrcene", "percentage": 0.21}, {"name": "Limonene", "percentage": 0.2}, {"name": "\u03b1-Humulene", "percentage": 0.12}],
    oils: [{"name": "Bergamot", "drops": 10}, {"name": "Black Pepper", "drops": 10}, {"name": "Lemongrass", "drops": 8}, {"name": "Geranium", "drops": 6}, {"name": "Sage", "drops": 4}, {"name": "Clove", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 78, end: 102 },
      prompt: "A bright, uplifting, energetic session. Sunny drive with bright momentum. Genres: deep house, reggae, jazz, ambient. Tempo around 78-102 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Bonobo"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "pineapple-mojito",
    name: "Pineapple Mojito",
    farm: "Higher Heights",
    region: "Mendocino",
    vibeCategory: "warmRelaxation",
    intent: "Rooted ease with a quiet glow",
    effects: ["Relaxed", "Grounded", "Euphoric"],
    aroma: ["Pineapple", "Ginger", "Mint", "Gas"],
    totalTerpenes: "2.55%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.63}, {"name": "Limonene", "percentage": 0.56}, {"name": "\u03b1-Bisabolol", "percentage": 0.24}, {"name": "\u03b1-Humulene", "percentage": 0.19}, {"name": "Linalool", "percentage": 0.16}, {"name": "\u03b1-Pinene", "percentage": 0.14}, {"name": "Myrcene", "percentage": 0.11}],
    oils: [{"name": "Black Pepper", "drops": 12}, {"name": "Sweet Orange", "drops": 10}, {"name": "German Chamomile", "drops": 6}, {"name": "Sage", "drops": 4}, {"name": "Lavender", "drops": 4}, {"name": "Pine", "drops": 2}, {"name": "Lemongrass", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 79, end: 104 },
      prompt: "A balanced, social, warm session. Rooted ease with a quiet glow. Genres: deep house, reggae, jazz, funk. Tempo around 79-104 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "pink-jesus-reserve",
    name: "Pink Jesus Reserve",
    farm: "Sonoma Hills Farm",
    region: "Sonoma",
    vibeCategory: "brightUplift",
    intent: "Buoyant and warm, ready to share",
    effects: ["Social", "Uplifting", "Euphoric"],
    aroma: ["Raspberry", "French Lavender", "Pineapple"],
    totalTerpenes: "1.89%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.78}, {"name": "Myrcene", "percentage": 0.38}, {"name": "\u03b1-Humulene", "percentage": 0.27}, {"name": "\u03b1-Bisabolol", "percentage": 0.15}],
    oils: [{"name": "Black Pepper", "drops": 14}, {"name": "Lemongrass", "drops": 8}, {"name": "Lavender", "drops": 6}, {"name": "Sage", "drops": 6}, {"name": "German Chamomile", "drops": 4}, {"name": "Geranium", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 72, end: 95 },
      prompt: "A bright, uplifting, energetic session. Buoyant and warm, ready to share. Genres: deep house, reggae, jazz, ambient. Tempo around 72-95 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Bonobo"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "pink-rider",
    name: "Pink Rider",
    farm: "Higher Heights",
    region: "Mendocino",
    vibeCategory: "easySocial",
    intent: "Vivid creative lift with social magnetism",
    effects: ["Motivated", "Creative", "Social"],
    aroma: ["Lemon Bar", "Pink Grapefruit", "Sugar Cookie"],
    totalTerpenes: "1.44%",
    terpenes: [{"name": "Terpinolene", "percentage": 0.38}, {"name": "\u03b2-Caryophyllene", "percentage": 0.22}, {"name": "\u03b2-Ocimene", "percentage": 0.2}, {"name": "Limonene", "percentage": 0.18}],
    oils: [{"name": "Tea Tree", "drops": 12}, {"name": "Black Pepper", "drops": 8}, {"name": "Basil", "drops": 8}, {"name": "Lemon", "drops": 6}, {"name": "Lavender", "drops": 4}, {"name": "Geranium", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 94, end: 121 },
      prompt: "A bright, uplifting, energetic session. Vivid creative lift with social magnetism. Genres: psychedelic, indie electronic, synth pop, deep house. Tempo around 94-121 BPM.",
      artistReferences: ["Tame Impala", "MGMT", "Washed Out", "Khruangbin"],
      textureDescriptors: ["psychedelic", "indie electronic", "synth pop"],
    },
    isSolful: true,
  },
  {
    id: "purple-candy-cane",
    name: "Purple Candy Cane",
    farm: "Greenshock Farms",
    region: "Mendocino",
    vibeCategory: "easySocial",
    intent: "Vibrant and vocal, fully awake",
    effects: ["Energized", "Invigorated", "Talkative"],
    aroma: ["Mango", "Peppermint Candy", "Orange Blossom"],
    totalTerpenes: "1.55%",
    terpenes: [{"name": "Myrcene", "percentage": 0.54}, {"name": "\u03b2-Caryophyllene", "percentage": 0.31}, {"name": "\u03b1-Pinene", "percentage": 0.2}, {"name": "\u03b1-Humulene", "percentage": 0.13}],
    oils: [{"name": "Lemongrass", "drops": 12}, {"name": "Black Pepper", "drops": 8}, {"name": "Sweet Orange", "drops": 8}, {"name": "Pine", "drops": 6}, {"name": "Peppermint", "drops": 4}, {"name": "Sage", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 72, end: 94 },
      prompt: "A bright, uplifting, energetic session. Vibrant and vocal, fully awake. Genres: ambient, dub, lo-fi hip hop, deep house. Tempo around 72-94 BPM.",
      artistReferences: ["Bonobo", "Thievery Corporation", "Nujabes", "Khruangbin"],
      textureDescriptors: ["ambient", "dub", "lo-fi hip hop"],
    },
    isSolful: true,
  },
  {
    id: "rasta-governmint",
    name: "Rasta Governmint",
    farm: "Higher Heights",
    region: "Mendocino",
    vibeCategory: "deepRestSleep",
    intent: "Profound ease with cushioned edges",
    effects: ["Euphoric", "Supremely Relaxed", "Comforted"],
    aroma: ["Sour Cherry", "Frankincense", "Oak"],
    totalTerpenes: "1.92%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.6}, {"name": "Limonene", "percentage": 0.39}, {"name": "\u03b1-Humulene", "percentage": 0.17}, {"name": "Myrcene", "percentage": 0.16}],
    oils: [{"name": "Black Pepper", "drops": 14}, {"name": "Lemon", "drops": 10}, {"name": "Rosemary", "drops": 6}, {"name": "Sage", "drops": 6}, {"name": "Geranium", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 81, end: 107 },
      prompt: "A calm, grounding, slow session. Profound ease with cushioned edges. Genres: deep house, reggae, jazz, funk. Tempo around 81-107 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },
  {
    id: "satsuma-sherbet",
    name: "Satsuma Sherbet",
    farm: "Alpenglow Farms",
    region: "Humboldt",
    vibeCategory: "warmRelaxation",
    intent: "Quiet ease with thoughtful undertones",
    effects: ["Happy", "Contemplative", "Comfortable"],
    aroma: ["Mandarin Orange", "Mochi", "Mint"],
    totalTerpenes: "1.85%",
    terpenes: [{"name": "Limonene", "percentage": 0.55}, {"name": "\u03b2-Caryophyllene", "percentage": 0.45}, {"name": "\u03b1-Humulene", "percentage": 0.13}, {"name": "Myrcene", "percentage": 0.11}],
    oils: [{"name": "Sweet Orange", "drops": 16}, {"name": "Black Pepper", "drops": 12}, {"name": "Sage", "drops": 4}, {"name": "Lemongrass", "drops": 4}, {"name": "Peppermint", "drops": 4}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 84, end: 111 },
      prompt: "A balanced, social, warm session. Quiet ease with thoughtful undertones. Genres: funk, soul, pop, deep house. Tempo around 84-111 BPM.",
      artistReferences: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
      textureDescriptors: ["funk", "soul", "pop"],
    },
    isSolful: true,
  },
  {
    id: "strawberry-biscotti",
    name: "Strawberry Biscotti",
    farm: "Happy Day Farms",
    region: "Mendocino",
    vibeCategory: "warmRelaxation",
    intent: "Cozy anchor with a curious mind",
    effects: ["Comforting", "Mentally Engaging", "Appetite Inducing"],
    aroma: ["Kettle Corn", "Fuel", "Sour Strawberry Candy"],
    totalTerpenes: "1.48%",
    terpenes: [{"name": "Limonene", "percentage": 0.38}, {"name": "\u03b2-Caryophyllene", "percentage": 0.29}, {"name": "Myrcene", "percentage": 0.25}, {"name": "\u03b1-Bisabolol", "percentage": 0.13}],
    oils: [{"name": "Bergamot", "drops": 14}, {"name": "Black Pepper", "drops": 10}, {"name": "Lemongrass", "drops": 8}, {"name": "German Chamomile", "drops": 6}, {"name": "Clove", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 78, end: 103 },
      prompt: "A balanced, social, warm session. Cozy anchor with a curious mind. Genres: funk, soul, pop, deep house. Tempo around 78-103 BPM.",
      artistReferences: ["Anderson .Paak", "Vulfpeck", "Lizzo", "Khruangbin"],
      textureDescriptors: ["funk", "soul", "pop"],
    },
    isSolful: true,
  },
  {
    id: "tropicanna-cherry",
    name: "Tropicanna Cherry",
    farm: "Sunrise Gardens",
    region: "Mendocino",
    vibeCategory: "brightUplift",
    intent: "Bright lift with clear, lively edges",
    effects: ["Euphoric", "Cerebral", "Cheerful"],
    aroma: ["Sour Cherry", "Sweet Citrus", "Nutmeg"],
    totalTerpenes: "1.18%",
    terpenes: [{"name": "\u03b2-Caryophyllene", "percentage": 0.37}, {"name": "Limonene", "percentage": 0.29}, {"name": "Linalool", "percentage": 0.15}, {"name": "\u03b1-Humulene", "percentage": 0.11}],
    oils: [{"name": "Black Pepper", "drops": 12}, {"name": "Sweet Orange", "drops": 10}, {"name": "Lavender", "drops": 6}, {"name": "Geranium", "drops": 6}, {"name": "Sage", "drops": 4}, {"name": "Clove", "drops": 2}],
    musicPrompt: {
      duration: 90,
      bpmTarget: { start: 80, end: 105 },
      prompt: "A bright, uplifting, energetic session. Bright lift with clear, lively edges. Genres: deep house, reggae, jazz, funk. Tempo around 80-105 BPM.",
      artistReferences: ["Khruangbin", "Bob Marley", "Kamasi Washington", "Anderson .Paak"],
      textureDescriptors: ["deep house", "reggae", "jazz"],
    },
    isSolful: true,
  },

];

// ============================================
// COMPONENTS
// ============================================


// ============================================
// JUICE KITCHEN — Data & Components
// ============================================

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

const JUICE_VIBE_CATEGORIES = {
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
  HIGH: { label: "High Energy", color: "#C4A962", short: "HIGH" },
  MEDIUM: { label: "Medium", color: "#6B8E6B", short: "MED" },
  LOW: { label: "Low Energy", color: "#4A3B5C", short: "LOW" },
};

const JUICE_CATEGORIES = {
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

const JUICE_RECIPES = [
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

const JUICE_INGREDIENTS = [
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
  const impact = {};
  const oneAway = [];
  recipes.forEach(r => {
    const m = matchIngredients(r, pantrySet);
    if (m.status === "ready") return;
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
      return { id, ...data, info, sortKey: data.count * 10 - (diffOrder[info?.difficulty] || 0) };
    })
    .sort((a, b) => b.sortKey - a.sortKey);
  return { oneAway, ranked };
}

// --- Juice UI Components ---
const TerpDot = ({ terpene, size = 10 }) => {
  const color = TERPENE_COLORS[terpene] || "#999";
  return (
    <span title={terpene} style={{
      display: "inline-block", width: size, height: size,
      borderRadius: "50%", backgroundColor: color,
      marginRight: 3, border: "1px solid rgba(0,0,0,0.1)"
    }} />
  );
};

const JuiceEnergyBadge = ({ energy }) => {
  const meta = ENERGY_META[energy] || ENERGY_META.MEDIUM;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: "0.05em",
      padding: "2px 8px", borderRadius: 10,
      backgroundColor: meta.color + "22", color: meta.color,
      border: `1px solid ${meta.color}44`
    }}>{meta.short}</span>
  );
};

const JuiceMatchBadge = ({ pct, status }) => {
  const c = { ready: colors.forest, almost: colors.gold, reachable: colors.sage, locked: colors.muted };
  const labels = { ready: "Ready", almost: "Almost", reachable: "Reachable", locked: "Locked" };
  const color = c[status];
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
      backgroundColor: color + "22", color, border: `1px solid ${color}44`
    }}>{pct}% · {labels[status]}</span>
  );
};

const DiffBadge = ({ difficulty }) => {
  const c = { easy: colors.forest, moderate: colors.gold, specialty: colors.rose };
  const color = c[difficulty] || colors.muted;
  return (
    <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 8, backgroundColor: color + "22", color, border: `1px solid ${color}44` }}>
      {difficulty}
    </span>
  );
};

// --- Juice Kitchen Sub-Tabs ---
const JuiceKitchenTab = ({ pantry, setPantry }) => {
  const [search, setSearch] = useState("");
  const grouped = useMemo(() => {
    const groups = {};
    JUICE_INGREDIENTS.forEach(ing => {
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
    if (kit) setPantry(prev => {
      const next = new Set(prev);
      kit.items.forEach(id => next.add(id));
      return next;
    });
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
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search ingredients or terpenes..."
          style={{
            flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8,
            backgroundColor: colors.cream, border: `1px solid ${colors.sage}33`,
            color: colors.charcoal, fontSize: 13, outline: "none"
          }} />
        <span style={{ color: colors.muted, fontSize: 12 }}>{pantry.size}/{JUICE_INGREDIENTS.length} in kitchen</span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick Add Kits</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STARTER_KITS.map(kit => (
            <button key={kit.id} onClick={() => addKit(kit.id)} title={kit.description}
              style={{ padding: "5px 12px", borderRadius: 16, fontSize: 11,
                backgroundColor: `${colors.forest}15`, color: colors.forest,
                border: `1px solid ${colors.forest}33`, cursor: "pointer" }}>
              + {kit.name}
            </button>
          ))}
        </div>
      </div>
      {Object.entries(filtered).map(([cat, items]) => {
        const catMeta = JUICE_CATEGORIES[cat] || { label: cat, icon: "📦" };
        return (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: colors.muted, marginBottom: 6, fontWeight: 600 }}>{catMeta.icon} {catMeta.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map(ing => {
                const active = pantry.has(ing.id);
                return (
                  <button key={ing.id} onClick={() => toggle(ing.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "6px 12px", borderRadius: 10, fontSize: 12,
                      backgroundColor: active ? `${colors.forest}15` : colors.warmWhite,
                      color: active ? colors.forest : colors.charcoal,
                      border: `1px solid ${active ? colors.forest + "55" : colors.sage + "33"}`,
                      cursor: "pointer", transition: "all 0.15s"
                    }}>
                    <span style={{ fontSize: 14 }}>{active ? "✓" : "○"}</span>
                    <span>{ing.name}</span>
                    <span style={{ display: "flex", gap: 1 }}>
                      {ing.terpenes.slice(0, 3).map((t, i) => <TerpDot key={i} terpene={t.terpene} size={7} />)}
                    </span>
                    <span style={{ fontSize: 10, color: colors.muted }}>{ing.recipeCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const JuiceRecipesTab = ({ pantry }) => {
  const [energyFilter, setEnergyFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  const scored = useMemo(() => JUICE_RECIPES.map(r => ({ ...r, match: matchIngredients(r, pantry) })), [pantry]);
  const filtered = useMemo(() =>
    scored
      .filter(r => energyFilter === "ALL" || r.energy === energyFilter)
      .filter(r => statusFilter === "ALL" || r.match.status === statusFilter)
      .sort((a, b) => b.match.pct - a.match.pct),
    [scored, energyFilter, statusFilter]
  );
  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, reachable: 0, locked: 0 };
    scored.forEach(r => c[r.match.status]++);
    return c;
  }, [scored]);

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ color: colors.forest, fontSize: 13 }}>✓ {counts.ready} Ready</span>
        <span style={{ color: colors.gold, fontSize: 13 }}>◐ {counts.almost} Almost</span>
        <span style={{ color: colors.sage, fontSize: 13 }}>○ {counts.reachable} Reachable</span>
        <span style={{ color: colors.muted, fontSize: 13 }}>◌ {counts.locked} Locked</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["ALL", "HIGH", "MEDIUM", "LOW"].map(e => (
          <button key={e} onClick={() => setEnergyFilter(e)}
            style={{ padding: "4px 10px", borderRadius: 12, fontSize: 11,
              backgroundColor: energyFilter === e ? `${colors.forest}22` : colors.warmWhite,
              color: energyFilter === e ? colors.forest : colors.muted,
              border: `1px solid ${energyFilter === e ? colors.forest + "44" : colors.sage + "22"}`,
              cursor: "pointer" }}>
            {e === "ALL" ? "All" : ENERGY_META[e]?.short || e}
          </button>
        ))}
        <span style={{ width: 1, backgroundColor: colors.sage + "33", margin: "0 2px" }} />
        {["ALL", "ready", "almost", "reachable", "locked"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: "4px 10px", borderRadius: 12, fontSize: 11,
              backgroundColor: statusFilter === s ? `${colors.forest}22` : colors.warmWhite,
              color: statusFilter === s ? colors.forest : colors.muted,
              border: `1px solid ${statusFilter === s ? colors.forest + "44" : colors.sage + "22"}`,
              cursor: "pointer" }}>
            {s === "ALL" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(r => {
          const isOpen = expanded === r.id;
          return (
            <div key={r.id} onClick={() => setExpanded(isOpen ? null : r.id)}
              style={{
                backgroundColor: colors.warmWhite, borderRadius: 12,
                border: `1px solid ${r.match.status === "ready" ? colors.forest + "44" : colors.sage + "22"}`,
                padding: 16, cursor: "pointer"
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: colors.charcoal, fontSize: 15, fontWeight: 600 }}>{r.name}</span>
                    <JuiceEnergyBadge energy={r.energy} />
                  </div>
                  <div style={{ color: colors.muted, fontSize: 12, marginBottom: 4 }}>{r.recipeName} · {r.farm}</div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                    {r.terpeneProfile.map((t, i) => <TerpDot key={i} terpene={t.name} size={10} />)}
                  </div>
                  <div style={{ fontSize: 11, color: colors.muted, fontStyle: "italic" }}>{r.intent}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <JuiceMatchBadge pct={r.match.pct} status={r.match.status} />
                  <div style={{ fontSize: 10, color: colors.muted, marginTop: 4 }}>{r.match.matched}/{r.match.total}</div>
                </div>
              </div>
              <div style={{ marginTop: 8, height: 3, backgroundColor: colors.sage + "22", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2,
                  width: `${r.match.pct}%`,
                  backgroundColor: r.match.status === "ready" ? colors.forest : r.match.status === "almost" ? colors.gold : r.match.status === "reachable" ? colors.sage : colors.muted,
                  transition: "width 0.3s ease"
                }} />
              </div>
              {isOpen && (
                <div style={{ marginTop: 16, borderTop: `1px solid ${colors.sage}22`, paddingTop: 12 }}>
                  <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Ingredients</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12 }}>
                    {r.match.details.map((ing, i) => (
                      <div key={i} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: ing.has ? colors.forest : colors.rose, fontSize: 14 }}>{ing.has ? "✓" : "✗"}</span>
                        <span style={{ color: ing.has ? colors.charcoal : colors.muted }}>{ing.raw}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Method</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                    {r.method.map((step, i) => (
                      <div key={i} style={{ fontSize: 12, color: colors.muted, paddingLeft: 4 }}>{i + 1}. {step}</div>
                    ))}
                  </div>
                  {r.terpeneMap.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Terpene Map</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {r.terpeneMap.map((tm, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                            <TerpDot terpene={tm.terpene} size={8} />
                            <span style={{ color: colors.charcoal }}>{tm.terpene}:</span>
                            <span style={{ color: colors.muted }}>{tm.sources.join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.substitutionNotes && (
                    <div style={{ fontSize: 11, color: colors.muted, fontStyle: "italic", padding: 8, backgroundColor: colors.cream, borderRadius: 8 }}>
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
};

const JuiceShoppingTab = ({ pantry, setPantry }) => {
  const ingredientMap = useMemo(() => {
    const map = {};
    JUICE_INGREDIENTS.forEach(i => map[i.id] = i);
    return map;
  }, []);
  const shopping = useMemo(() => getShoppingData(JUICE_RECIPES, pantry, ingredientMap), [pantry, ingredientMap]);
  const addItem = useCallback((id) => {
    setPantry(prev => { const next = new Set(prev); next.add(id); return next; });
  }, [setPantry]);

  return (
    <div>
      {shopping.oneAway.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gold, marginBottom: 8 }}>◐ One Ingredient Away ({shopping.oneAway.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {shopping.oneAway.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", backgroundColor: colors.warmWhite, borderRadius: 10,
                border: `1px solid ${colors.gold}33` }}>
                <div>
                  <div style={{ fontSize: 13, color: colors.charcoal }}>{item.recipe.name}</div>
                  <div style={{ fontSize: 11, color: colors.muted }}>Needs: <span style={{ color: colors.gold }}>{item.missingItem.raw}</span></div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); addItem(item.missingItem.itemId); }}
                  style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11,
                    backgroundColor: `${colors.forest}15`, color: colors.forest,
                    border: `1px solid ${colors.forest}33`, cursor: "pointer" }}>+ Add</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: colors.forest, marginBottom: 8 }}>⚡ Highest Impact</div>
        {shopping.ranked.length === 0 ? (
          <div style={{ color: colors.muted, fontSize: 12, fontStyle: "italic" }}>You have everything! All 24 recipes are ready.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {shopping.ranked.slice(0, 15).map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", backgroundColor: colors.warmWhite, borderRadius: 8,
                border: `1px solid ${colors.sage}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: colors.forest, width: 28, textAlign: "center" }}>{item.count}</span>
                  <div>
                    <div style={{ fontSize: 12, color: colors.charcoal }}>{item.info?.name || item.id}</div>
                    <div style={{ fontSize: 10, color: colors.muted, display: "flex", gap: 4, alignItems: "center" }}>
                      <DiffBadge difficulty={item.info?.difficulty} />
                      <span>{item.recipes.slice(0, 3).join(", ")}{item.recipes.length > 3 ? ` +${item.recipes.length - 3}` : ""}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => addItem(item.id)}
                  style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11,
                    backgroundColor: `${colors.forest}15`, color: colors.forest,
                    border: `1px solid ${colors.forest}33`, cursor: "pointer" }}>+ Add</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: colors.sage, marginBottom: 8 }}>📦 Starter Bundles</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STARTER_KITS.map(kit => {
            const owned = kit.items.filter(id => pantry.has(id)).length;
            const total = kit.items.length;
            const complete = owned === total;
            return (
              <div key={kit.id} style={{ padding: "12px 14px", backgroundColor: colors.warmWhite, borderRadius: 10,
                border: `1px solid ${complete ? colors.forest + "44" : colors.sage + "22"}`, opacity: complete ? 0.6 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: complete ? colors.forest : colors.charcoal }}>{complete ? "✓ " : ""}{kit.name}</span>
                  <span style={{ fontSize: 11, color: colors.muted }}>{owned}/{total}</span>
                </div>
                <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6 }}>{kit.description}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {kit.items.map(id => {
                    const info = ingredientMap[id];
                    const has = pantry.has(id);
                    return (
                      <span key={id} onClick={(e) => { e.stopPropagation(); if (!has) addItem(id); }}
                        style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8,
                          backgroundColor: has ? `${colors.forest}15` : colors.cream,
                          color: has ? colors.forest : colors.muted,
                          border: `1px solid ${has ? colors.forest + "33" : colors.sage + "22"}`,
                          cursor: has ? "default" : "pointer" }}>
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
};

const JuiceTerpeneTab = () => {
  const terpData = useMemo(() => {
    return Object.entries(TERPENE_COLORS).map(([name, color]) => {
      const sources = JUICE_INGREDIENTS.filter(i => i.terpenes.some(t => t.terpene === name))
        .map(i => ({ name: i.name, intensity: i.terpenes.find(t => t.terpene === name)?.intensity || "low" }));
      return { name, color, sources };
    });
  }, []);

  const effects = {
    "β-Caryophyllene": "Anti-inflammatory, pain relief, anxiety reduction. Activates CB2 receptor.",
    "Limonene": "Mood elevation, stress relief, energizing.",
    "Myrcene": "Sedative, relaxing, muscle relaxant. Enhances THC absorption.",
    "α-Humulene": "Anti-inflammatory, appetite suppressant. Found in hops.",
    "Linalool": "Calming, sedative, anti-anxiety. Key in lavender.",
    "α-Bisabolol": "Anti-inflammatory, skin healing. Active in chamomile.",
    "α-Pinene": "Alertness, memory retention. Most common terpene in nature.",
    "β-Ocimene": "Uplifting, antiviral. Found in basil.",
    "Terpinolene": "Uplifting, antioxidant. Found in tea tree.",
    "trans-β-Farnesene": "Calming, anti-inflammatory. Found in green apple.",
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: colors.muted, marginBottom: 16, lineHeight: 1.5 }}>
        Cannabis and culinary herbs share terpenes — aromatic molecules that create flavor, aroma, and effects.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {terpData.map(t => (
          <div key={t.name} style={{ padding: 14, backgroundColor: colors.warmWhite, borderRadius: 12, border: `1px solid ${t.color}33` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: t.color, border: `2px solid ${t.color}88` }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.charcoal }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 11, color: colors.muted, marginBottom: 8, lineHeight: 1.4 }}>{effects[t.name] || ""}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {t.sources.map((s, i) => (
                <span key={i} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8,
                  backgroundColor: t.color + "15", color: s.intensity === "high" ? colors.charcoal : colors.muted,
                  border: `1px solid ${t.color}33` }}>
                  {s.name} {s.intensity === "high" ? "●●●" : s.intensity === "medium" ? "●●○" : "●○○"}
                </span>
              ))}
              {t.sources.length === 0 && <span style={{ fontSize: 10, color: colors.muted, fontStyle: "italic" }}>No direct source</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Juice Kitchen Screen ---
const JuiceKitchenScreen = ({ pantry, setPantry }) => {
  const [juiceTab, setJuiceTab] = useState("kitchen");
  const readyCount = useMemo(() =>
    JUICE_RECIPES.filter(r => matchIngredients(r, pantry).status === "ready").length
  , [pantry]);

  const tabs = [
    { id: "kitchen", label: "Kitchen", icon: "🧊" },
    { id: "recipes", label: "Recipes", icon: "🥤" },
    { id: "shopping", label: "Shopping", icon: "🛒" },
    { id: "terpenes", label: "Terpenes", icon: "🧬" },
  ];

  return (
    <div style={{ padding: "24px", paddingBottom: "100px" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: colors.forest, margin: 0 }}>Juice Kitchen</h1>
        <p style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>
          {pantry.size} ingredients · {readyCount}/24 recipes ready
        </p>
      </header>
      <div style={{
        display: "flex", gap: 4, marginBottom: 20, padding: 3,
        backgroundColor: colors.cream, borderRadius: 14,
        border: `1px solid ${colors.sage}22`
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setJuiceTab(t.id)}
            style={{
              flex: 1, padding: "8px 4px", borderRadius: 11, fontSize: 11,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              backgroundColor: juiceTab === t.id ? colors.warmWhite : "transparent",
              color: juiceTab === t.id ? colors.forest : colors.muted,
              border: juiceTab === t.id ? `1px solid ${colors.sage}33` : "1px solid transparent",
              cursor: "pointer", fontWeight: juiceTab === t.id ? 600 : 400
            }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      {juiceTab === "kitchen" && <JuiceKitchenTab pantry={pantry} setPantry={setPantry} />}
      {juiceTab === "recipes" && <JuiceRecipesTab pantry={pantry} />}
      {juiceTab === "shopping" && <JuiceShoppingTab pantry={pantry} setPantry={setPantry} />}
      {juiceTab === "terpenes" && <JuiceTerpeneTab />}
    </div>
  );
};


// Navigation Bar
const NavBar = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'home', label: 'Vibes', icon: '✨' },
    { id: 'humidor', label: 'Humidor', icon: '🗄️' },
    { id: 'session', label: 'Session', icon: '🎵' },
    { id: 'learn', label: 'Learn', icon: '📖' },
    { id: 'juice', label: 'Juice', icon: '🥤' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.warmWhite,
      borderTop: `1px solid ${colors.sage}33`,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0 20px 0',
      zIndex: 100,
    }}>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setCurrentScreen(item.id)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            opacity: currentScreen === item.id ? 1 : 0.5,
          }}
        >
          <span style={{ fontSize: '20px' }}>{item.icon}</span>
          <span style={{
            fontSize: '11px',
            fontWeight: currentScreen === item.id ? '600' : '400',
            color: currentScreen === item.id ? colors.forest : colors.muted,
          }}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// Vibe Tile Component
const VibeTile = ({ vibe, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(vibe)}
    style={{
      background: isSelected ? vibe.color : colors.warmWhite,
      border: `2px solid ${isSelected ? vibe.color : colors.sage}33`,
      borderRadius: '16px',
      padding: '20px 16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <span style={{ fontSize: '32px' }}>{vibe.icon}</span>
    <span style={{
      fontSize: '14px',
      fontWeight: '600',
      color: isSelected ? colors.warmWhite : colors.charcoal,
    }}>
      {vibe.name}
    </span>
    <span style={{
      fontSize: '11px',
      color: isSelected ? `${colors.warmWhite}cc` : colors.muted,
      lineHeight: '1.4',
    }}>
      {vibe.description}
    </span>
  </button>
);

// Strain Card Component
const StrainCard = ({ strain, onSelect, showMatchScore, matchScore }) => {
  const vibe = vibeCategories[strain.vibeCategory];

  return (
    <button
      onClick={() => onSelect(strain)}
      style={{
        background: colors.warmWhite,
        border: `1px solid ${colors.sage}22`,
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.charcoal, margin: 0 }}>
            {strain.name}
          </h3>
          <p style={{ fontSize: '12px', color: colors.muted, margin: '2px 0 0 0' }}>
            {strain.farm}
          </p>
        </div>
        {showMatchScore && matchScore && (
          <span style={{
            background: vibe.color,
            color: colors.warmWhite,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
          }}>
            {matchScore}% match
          </span>
        )}
      </div>

      <p style={{ fontSize: '13px', color: colors.charcoal, margin: '8px 0', lineHeight: '1.5' }}>
        {strain.intent}
      </p>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
        {strain.effects.map((effect, i) => (
          <span key={i} style={{
            background: colors.cream,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            color: colors.charcoal,
          }}>
            {effect}
          </span>
        ))}
        {strain.isCBD && (
          <span style={{
            background: colors.sage,
            color: colors.warmWhite,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
          }}>
            CBD
          </span>
        )}
        {strain.isExclusive && (
          <span style={{
            background: colors.gold,
            color: colors.warmWhite,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
          }}>
            Exclusive
          </span>
        )}
      </div>
    </button>
  );
};

// Home Screen - Intent Selection
const HomeScreen = ({ onSelectVibe, onSelectStrain }) => {
  const [selectedVibe, setSelectedVibe] = useState(null);

  const handleVibeSelect = (vibe) => {
    setSelectedVibe(vibe);
    onSelectVibe(vibe);
  };

  const matchingStrains = selectedVibe
    ? strains.filter(s => s.vibeCategory === selectedVibe.id)
    : [];

  return (
    <div style={{ padding: '24px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, margin: 0 }}>
          How do you want to feel?
        </h1>
        <p style={{ fontSize: '14px', color: colors.muted, marginTop: '8px' }}>
          Select a vibe to find your perfect strain
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '32px',
      }}>
        {Object.values(vibeCategories).map(vibe => (
          <VibeTile
            key={vibe.id}
            vibe={vibe}
            onSelect={handleVibeSelect}
            isSelected={selectedVibe?.id === vibe.id}
          />
        ))}
      </div>

      {selectedVibe && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '500', color: colors.charcoal, marginBottom: '16px' }}>
            Strains for {selectedVibe.name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {matchingStrains.map(strain => (
              <StrainCard
                key={strain.id}
                strain={strain}
                onSelect={onSelectStrain}
                showMatchScore={true}
                matchScore={Math.floor(Math.random() * 15) + 85}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Humidor Screen - Personal Inventory
const HumidorScreen = ({ humidor, setHumidor, onSelectStrain }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const addToHumidor = (strain) => {
    if (!humidor.find(s => s.id === strain.id)) {
      setHumidor([...humidor, { ...strain, quantity: 'full', addedAt: new Date() }]);
    }
    setShowAddModal(false);
  };

  const updateQuantity = (strainId, quantity) => {
    setHumidor(humidor.map(s =>
      s.id === strainId ? { ...s, quantity } : s
    ));
  };

  return (
    <div style={{ padding: '24px', paddingBottom: '100px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, margin: 0 }}>
            Your Humidor
          </h1>
          <p style={{ fontSize: '14px', color: colors.muted, marginTop: '4px' }}>
            {humidor.length} strain{humidor.length !== 1 ? 's' : ''} in collection
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: colors.forest,
            color: colors.warmWhite,
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </button>
      </header>

      {humidor.length === 0 ? (
        <div style={{
          background: colors.cream,
          borderRadius: '16px',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🗄️</span>
          <h3 style={{ fontSize: '18px', color: colors.charcoal, marginBottom: '8px' }}>
            Your humidor is empty
          </h3>
          <p style={{ fontSize: '14px', color: colors.muted, marginBottom: '20px' }}>
            Add strains you have at home to get personalized session recommendations
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: colors.forest,
              color: colors.warmWhite,
              border: 'none',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Add Your First Strain
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {humidor.map(strain => {
            const vibe = vibeCategories[strain.vibeCategory];
            return (
              <div
                key={strain.id}
                style={{
                  background: colors.warmWhite,
                  border: `1px solid ${colors.sage}22`,
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <button
                    onClick={() => onSelectStrain(strain)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      padding: 0,
                      flex: 1,
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.charcoal, margin: 0 }}>
                      {strain.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: colors.muted, margin: '4px 0 0 0' }}>
                      {strain.intent}
                    </p>
                  </button>
                  <span style={{
                    background: `${vibe.color}22`,
                    color: vibe.color,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    {vibe.icon} {vibe.name}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {['full', 'half', 'low', 'empty'].map(qty => (
                    <button
                      key={qty}
                      onClick={() => updateQuantity(strain.id, qty)}
                      style={{
                        background: strain.quantity === qty ? colors.forest : colors.cream,
                        color: strain.quantity === qty ? colors.warmWhite : colors.charcoal,
                        border: 'none',
                        borderRadius: '16px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Strain Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 200,
        }}>
          <div style={{
            background: colors.warmWhite,
            width: '100%',
            borderRadius: '24px 24px 0 0',
            padding: '24px',
            maxHeight: '70vh',
            overflow: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '500', color: colors.charcoal, margin: 0 }}>
                Add to Humidor
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: colors.muted,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {strains.filter(s => !humidor.find(h => h.id === s.id)).map(strain => (
                <StrainCard
                  key={strain.id}
                  strain={strain}
                  onSelect={addToHumidor}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// STRAIN EXPERIENCE PAGE — Immersive Per-Strain Designs
// ============================================

// 24 unique visual design configurations
const STRAIN_DESIGNS = {
  "mikes-bomba": {
    bg: "linear-gradient(180deg, #1a2e1a 0%, #2a3d20 40%, #1e2b14 100%)",
    cardBg: "rgba(200,169,126,0.08)",
    textColor: "#d4cfc4",
    textMuted: "rgba(212,207,196,0.55)",
    accentColor: "#c8a97e",
    secondaryColor: "#7a9e5a",
    heroHeight: 300,
  },
  "natty-bumppo": {
    bg: "linear-gradient(180deg, #3d2a3a 0%, #4a3548 40%, #2e2030 100%)",
    cardBg: "rgba(220,200,180,0.07)",
    textColor: "#e0d4cc",
    textMuted: "rgba(224,212,204,0.55)",
    accentColor: "#d4b896",
    secondaryColor: "#a88aaf",
    heroHeight: 300,
  },
  "black-lime-chem": {
    bg: "linear-gradient(180deg, #0a2a2a 0%, #0e3636 40%, #081e22 100%)",
    cardBg: "rgba(74,224,104,0.06)",
    textColor: "#b8d8d0",
    textMuted: "rgba(184,216,208,0.50)",
    accentColor: "#4ae068",
    secondaryColor: "#2a8a7a",
    heroHeight: 320,
  },
  "guava-gift": {
    bg: "linear-gradient(180deg, #3a2e18 0%, #4a3c20 40%, #2e2410 100%)",
    cardBg: "rgba(230,140,100,0.09)",
    textColor: "#f0e0cc",
    textMuted: "rgba(240,224,204,0.60)",
    accentColor: "#e68c64",
    secondaryColor: "#f0c860",
    heroHeight: 300,
  },
  "mule-fuel": {
    bg: "linear-gradient(180deg, #1e1a14 0%, #28221a 40%, #14100c 100%)",
    cardBg: "rgba(140,130,110,0.07)",
    textColor: "#b8b0a0",
    textMuted: "rgba(184,176,160,0.45)",
    accentColor: "#8c826e",
    secondaryColor: "#6a6050",
    heroHeight: 300,
  },
  "satsuma-sherbet": {
    bg: "linear-gradient(180deg, #2a2018 0%, #3a2c1e 40%, #201812 100%)",
    cardBg: "rgba(210,160,80,0.08)",
    textColor: "#e0d4c0",
    textMuted: "rgba(224,212,192,0.55)",
    accentColor: "#d2a050",
    secondaryColor: "#7ec8a0",
    heroHeight: 300,
  },
  "tropical-sleigh-ride": {
    bg: "linear-gradient(180deg, #2e1a18 0%, #44281e 40%, #221410 100%)",
    cardBg: "rgba(100,220,180,0.08)",
    textColor: "#f0dcd0",
    textMuted: "rgba(240,220,208,0.60)",
    accentColor: "#64dcb4",
    secondaryColor: "#f08060",
    heroHeight: 300,
  },
  "purple-candy-cane": {
    bg: "linear-gradient(180deg, #2a1028 0%, #3e1840 40%, #1e0c20 100%)",
    cardBg: "rgba(230,80,180,0.09)",
    textColor: "#f0d0e8",
    textMuted: "rgba(240,208,232,0.60)",
    accentColor: "#e650b4",
    secondaryColor: "#60e8a0",
    heroHeight: 320,
  },
  "carambola": {
    bg: "linear-gradient(180deg, #2a2810 0%, #3e3a14 40%, #201e0a 100%)",
    cardBg: "rgba(240,210,80,0.08)",
    textColor: "#f0ecd0",
    textMuted: "rgba(240,236,208,0.60)",
    accentColor: "#f0d250",
    secondaryColor: "#c8e080",
    heroHeight: 300,
  },
  "pineapple-mojito": {
    bg: "linear-gradient(180deg, #1a2a18 0%, #243820 40%, #141e12 100%)",
    cardBg: "rgba(200,180,60,0.08)",
    textColor: "#d8e0c4",
    textMuted: "rgba(216,224,196,0.55)",
    accentColor: "#c8b43c",
    secondaryColor: "#68b878",
    heroHeight: 300,
  },
  "rasta-governmint": {
    bg: "linear-gradient(180deg, #2a1410 0%, #3c1e14 40%, #1e0e0a 100%)",
    cardBg: "rgba(196,164,60,0.08)",
    textColor: "#e0ccc0",
    textMuted: "rgba(224,204,192,0.50)",
    accentColor: "#c4a43c",
    secondaryColor: "#a06838",
    heroHeight: 300,
  },
  "pink-rider": {
    bg: "linear-gradient(180deg, #2e1828 0%, #441e3a 40%, #201020 100%)",
    cardBg: "rgba(255,140,180,0.09)",
    textColor: "#f8e0ec",
    textMuted: "rgba(248,224,236,0.60)",
    accentColor: "#ff8cb4",
    secondaryColor: "#f0e060",
    heroHeight: 300,
  },
  "strawberry-biscotti": {
    bg: "linear-gradient(180deg, #2a1a1a 0%, #3c2824 40%, #201414 100%)",
    cardBg: "rgba(200,160,120,0.08)",
    textColor: "#e4d4c8",
    textMuted: "rgba(228,212,200,0.55)",
    accentColor: "#c88060",
    secondaryColor: "#e0c89c",
    heroHeight: 300,
  },
  "avenue-of-the-giants": {
    bg: "linear-gradient(180deg, #0e2414 0%, #163820 40%, #0a1c0e 100%)",
    cardBg: "rgba(142,174,104,0.09)",
    textColor: "#c8dcc0",
    textMuted: "rgba(200,220,192,0.55)",
    accentColor: "#8EAE68",
    secondaryColor: "#d4b060",
    heroHeight: 320,
  },
  "peach-flambe": {
    bg: "linear-gradient(180deg, #2e2418 0%, #443420 40%, #221c10 100%)",
    cardBg: "rgba(240,180,100,0.09)",
    textColor: "#f0e4d0",
    textMuted: "rgba(240,228,208,0.60)",
    accentColor: "#f0b464",
    secondaryColor: "#d4944c",
    heroHeight: 300,
  },
  "tropicanna-cherry": {
    bg: "linear-gradient(180deg, #2a1418 0%, #401c22 40%, #1e0e12 100%)",
    cardBg: "rgba(240,100,80,0.09)",
    textColor: "#f0d4cc",
    textMuted: "rgba(240,212,204,0.60)",
    accentColor: "#f06450",
    secondaryColor: "#f0c040",
    heroHeight: 300,
  },
  "pink-jesus-reserve": {
    bg: "linear-gradient(180deg, #2a1828 0%, #3e2438 40%, #1e1020 100%)",
    cardBg: "rgba(220,140,180,0.09)",
    textColor: "#f0dce8",
    textMuted: "rgba(240,220,232,0.58)",
    accentColor: "#dc8cb4",
    secondaryColor: "#e0b860",
    heroHeight: 300,
  },
  "love-and-laughter-cbd": {
    bg: "linear-gradient(180deg, #1a2a20 0%, #243826 40%, #141e18 100%)",
    cardBg: "rgba(180,200,180,0.08)",
    textColor: "#e0ece0",
    textMuted: "rgba(224,236,224,0.58)",
    accentColor: "#88c098",
    secondaryColor: "#b888c0",
    heroHeight: 300,
  },
  "glitter-bomb": {
    bg: "linear-gradient(180deg, #0e2818 0%, #183c22 40%, #081e10 100%)",
    cardBg: "rgba(220,200,80,0.08)",
    textColor: "#d0e8c8",
    textMuted: "rgba(208,232,200,0.58)",
    accentColor: "#dcc850",
    secondaryColor: "#50c880",
    heroHeight: 320,
  },
  "moonlight": {
    bg: "linear-gradient(180deg, #0f1628 0%, #1a2744 40%, #0d1f3d 100%)",
    cardBg: "rgba(142,174,104,0.08)",
    textColor: "#d4dce8",
    textMuted: "rgba(212,220,232,0.55)",
    accentColor: "#8EAE68",
    secondaryColor: "#c9d4f0",
    heroHeight: 320,
  },
  "mandarin-cherry-tree": {
    bg: "linear-gradient(180deg, #2a2028 0%, #3a2c38 40%, #1e1820 100%)",
    cardBg: "rgba(210,160,120,0.08)",
    textColor: "#e0d4d8",
    textMuted: "rgba(224,212,216,0.55)",
    accentColor: "#d2a078",
    secondaryColor: "#b898c0",
    heroHeight: 300,
  },
  "pinnacle": {
    bg: "linear-gradient(180deg, #18101e 0%, #241828 40%, #100a14 100%)",
    cardBg: "rgba(200,180,160,0.06)",
    textColor: "#d0c4d0",
    textMuted: "rgba(208,196,208,0.45)",
    accentColor: "#c8b4a0",
    secondaryColor: "#a090b0",
    heroHeight: 320,
  },
  "blueberry-muffin": {
    bg: "linear-gradient(180deg, #201a14 0%, #30261c 40%, #18120c 100%)",
    cardBg: "rgba(100,80,180,0.08)",
    textColor: "#e0d8cc",
    textMuted: "rgba(224,216,204,0.55)",
    accentColor: "#6450b4",
    secondaryColor: "#d4a850",
    heroHeight: 300,
  },
  "lemon-papaya-banana": {
    bg: "linear-gradient(180deg, #2a2018 0%, #38301e 40%, #1e1810 100%)",
    cardBg: "rgba(100,160,200,0.08)",
    textColor: "#e0dcd0",
    textMuted: "rgba(224,220,208,0.55)",
    accentColor: "#64a0c8",
    secondaryColor: "#e0c860",
    heroHeight: 300,
  },
};

// Spotify playlist embed URLs mapped by strain slug
const SPOTIFY_PLAYLISTS = {
  "carambola": "https://open.spotify.com/embed/playlist/37i9dQZF1Fx3keFOTjUeg1?utm_source=generator&theme=0",
  "natty-bumppo": "https://open.spotify.com/embed/playlist/37i9dQZF1FwTeBbEQPOa4D?utm_source=generator&theme=0",
  "pink-rider": "https://open.spotify.com/embed/playlist/37i9dQZF1FwSoERXS2piSg?utm_source=generator&theme=0",
  "avenue-of-the-giants": "https://open.spotify.com/embed/playlist/37i9dQZF1FwUv4tfukjmOS?utm_source=generator&theme=0",
  "satsuma-sherbet": "https://open.spotify.com/embed/playlist/37i9dQZF1FwWid1rBsRkVP?utm_source=generator&theme=0",
  "guava-gift": "https://open.spotify.com/embed/playlist/37i9dQZF1FwKBj5S7cXQfY?utm_source=generator&theme=0",
  "peach-flambe": "https://open.spotify.com/embed/playlist/37i9dQZF1FwXg5Nz3J9Deo?utm_source=generator&theme=0",
  "moonlight": "https://open.spotify.com/embed/playlist/37i9dQZF1FwZYknyiZS0iE?utm_source=generator&theme=0",
  "black-lime-chem": "https://open.spotify.com/embed/playlist/37i9dQZF1FwQSEAicBEljP?utm_source=generator&theme=0",
  "tropicanna-cherry": "https://open.spotify.com/embed/playlist/37i9dQZF1FwON0Gl0oxfFx?utm_source=generator&theme=0",
  "lemon-papaya-banana": "https://open.spotify.com/embed/playlist/37i9dQZF1Fx1ienexiYIXj?utm_source=generator&theme=0",
  "purple-candy-cane": "https://open.spotify.com/embed/playlist/37i9dQZF1FwUIPTsUFG0FN?utm_source=generator&theme=0",
  "rasta-governmint": "https://open.spotify.com/embed/playlist/37i9dQZF1FwJ4IIdKxJUvk?utm_source=generator&theme=0",
  "glitter-bomb": "https://open.spotify.com/embed/playlist/37i9dQZF1FwScIToDdQoXg?utm_source=generator&theme=0",
  "mandarin-cherry-tree": "https://open.spotify.com/embed/playlist/37i9dQZF1FwP8MqLtYUUeg?utm_source=generator&theme=0",
  "blueberry-muffin": "https://open.spotify.com/embed/playlist/37i9dQZF1FwX01hmnDkjbM?utm_source=generator&theme=0",
  "love-and-laughter-cbd": "https://open.spotify.com/embed/playlist/37i9dQZF1FwWZTxNep5ThD?utm_source=generator&theme=0",
  "mule-fuel": "https://open.spotify.com/embed/playlist/37i9dQZF1FwJAlwqZhgyQg?utm_source=generator&theme=0",
  "pink-jesus-reserve": "https://open.spotify.com/embed/playlist/37i9dQZF1FwRJwUJNtcq0J?utm_source=generator&theme=0",
  "tropical-sleigh-ride": "https://open.spotify.com/embed/playlist/37i9dQZF1FwRJAMwn5kAfO?utm_source=generator&theme=0",
  "pinnacle": "https://open.spotify.com/embed/playlist/37i9dQZF1FwOgG2zVmz91Z?utm_source=generator&theme=0",
  "strawberry-biscotti": "https://open.spotify.com/embed/playlist/37i9dQZF1FwVceLoZOhfv0?utm_source=generator&theme=0",
  "mikes-bomba": "https://open.spotify.com/embed/playlist/37i9dQZF1FwRiTvcvVxYuT?utm_source=generator&theme=0",
  "pineapple-mojito": "https://open.spotify.com/embed/playlist/37i9dQZF1Fx3keFOTjUeg1?utm_source=generator&theme=0",
};

// ============================================
// STRAIN EXPERIENCE DATA — Full layer data for all 24 strains
// (Imported from assembled JSON)
// ============================================
const STRAIN_EXPERIENCE_DATA = {
  "avenue-of-the-giants": {
    "slug": "avenue-of-the-giants",
    "name": "Avenue of the Giants",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Forward momentum with electric clarity",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "creative",
      "euphoric"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 3.48,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.94,
        "ratio": 0.56
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.43,
        "ratio": 0.12
      },
      {
        "name": "α-Pinene",
        "pct": 0.26,
        "ratio": 0.07
      },
      {
        "name": "β-Ocimene",
        "pct": 0.24,
        "ratio": 0.07
      }
    ],
    "bpmRange": [
      69,
      90
    ],
    "musicEnergy": 0.31,
    "musicValence": 0.39,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 69,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 90,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 79,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Redwood Forest Forward Motion",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwUv4tfukjmOS"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 16,
        "pct": 40.0
      },
      {
        "oil": "Pine",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Black Pepper",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Basil",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Peppermint",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Geranium",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#8EAE68",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Sixteen drops of lemongrass, and the redwoods arrive. Not the tourist version with parking lots and interpretive plaques, but the real ones — the ancient columns of Happy Day Farms' Mendocino backyard, where sedating warmth hangs in the air at extraordinary concentration and the trees are too old to be impressed by anything except persistence and the willingness to grow toward light.\n\nPine needle oil follows with eight drops, and now the forest is complete: the vertical green, the sharp resinous clarity, the feeling of being small in the presence of something that has been growing for a thousand years and will continue growing long after every human concern has composted into the duff underfoot. This is not relaxation. This is forward momentum with a direction that the trees selected centuries ago.\n\nBlack pepper adds six drops of spiced warmth, the buzzy motivating edge that Fleet Foxes channel into harmonies so precise they sound wild, so rehearsed they sound spontaneous. Basil brings four drops of the bright herbal molecule — the bright tropical undertone in the jasmine aroma, a green spark that turns the forest from cathedral into laboratory, from reverence into curiosity.\n\nPeppermint at four drops creates the menthol corridor, and suddenly the signature clarity snaps into focus like a lens finding its subject. This is the electric part — the buzzy quality that makes ideas feel not just possible but urgent, not just interesting but necessary. Geranium whispers its two drops of jasmine-adjacent florality at the very edge of perception, where you smell it only when you stop trying.\n\nA trail runner pulls her hair back, standing at the base of an old-growth giant in the morning light that filters through the canopy in cathedral shafts. The air smells exactly like this six-oil blend: pine and lemongrass and something sharp-sweet that defies single naming. Avenue of the Giants is not a strain you sit with. It is a strain that moves through you and expects you to keep up.\n\nShe is not resting. She is choosing which direction carries the most momentum, and every direction looks like forward, and the morning is not asking for anything except motion, and the lemongrass-pine-pepper air fills her lungs like fuel, and the next step is already happening.",
    "tea": {
      "name": "Avenue of the Giants Tea",
      "description": "Forest floor herbal infusion with forest clarity",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5-6 minutes",
      "caffeine": "minimal (herbal blend)",
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
      "method": [
        "Heat 8 oz filtered water to 195°F (90°C).",
        "In a tea infuser, combine 1 tbsp dried lemongrass pieces, 2-3 dried rosemary sprigs, 5-6 dried basil leaves, and 3-4 dried mint leaves.",
        "Steep for 5-6 minutes to extract the full forest character.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz jasmine tea concentrate or a splash of cooled jasmine tea.",
        "Add a squeeze of fresh lime juice.",
        "Garnish with a fresh rosemary sprig and serve hot."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Avenue of the Giants",
        "description": "Redwood forest clarity in a glass",
        "glass": "highball",
        "volume": "7 oz",
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
        "method": [
          "Fill a highball glass halfway with ice.",
          "In a mixing glass, combine 1 oz fresh lemongrass juice (or 0.75 oz lemongrass syrup +",
          "5 oz water), 0.5 oz fresh lime juice, and 1 small sprig fresh rosemary.",
          "Add 3-4 fresh basil leaves and gently muddle with the herbs.",
          "Stir in 0.5 oz jasmine tea (cooled) and 0.75 oz sparkling water.",
          "Strain into the highball glass.",
          "Top with 2 oz sparkling water and a float of 0.25 oz fresh mint water.",
          "Garnish with a sprig of rosemary, fresh mint, and a thin lime wheel."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Avenue of the Giants",
        "description": "Gin-soaked redwood botanicals",
        "glass": "highball",
        "volume": "7.5 oz",
        "temp": "chilled",
        "style": "herbal forest",
        "spirit": "gin",
        "abv": "16%",
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
        "method": [
          "Pour 2 oz botanical gin into a mixing glass with ice.",
          "Add 1 oz fresh lemongrass juice, 0.5 oz fresh lime juice, and 0.5 oz jasmine tea.",
          "Add 1 sprig fresh rosemary and 4-5 fresh basil leaves.",
          "Muddle gently to release herb oils (do not bruise harshly).",
          "Stir for 10 seconds with ice.",
          "Strain into a highball glass filled with fresh ice.",
          "Top with 2 oz sparkling water and garnish with rosemary, basil, and lime wheel."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Camembert",
        "desc": "Light and bright cheese plate with brie, camembert, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Redwood Current",
      "scent_notes": {
        "top": "lemongrass, black pepper",
        "heart": "bay laurel, clove bud",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 6
          },
          {
            "oil": "Pine",
            "drops": 3
          },
          {
            "oil": "Black Pepper",
            "drops": 2
          },
          {
            "oil": "Basil",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Giant's Breath",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "black-lime-chem": {
    "slug": "black-lime-chem",
    "name": "Black Lime Chem",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Weighted bliss melting toward rest",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "rest",
      "body"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 3.08,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.69,
        "ratio": 0.55
      },
      {
        "name": "α-Pinene",
        "pct": 0.39,
        "ratio": 0.13
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.27,
        "ratio": 0.09
      },
      {
        "name": "β-Ocimene",
        "pct": 0.19,
        "ratio": 0.06
      }
    ],
    "bpmRange": [
      69,
      91
    ],
    "musicEnergy": 0.31,
    "musicValence": 0.4,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "acoustic folk",
      "post-rock"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Bon Iver"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 69,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 64,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 79,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Blissful Sleep Descent",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwQSEAicBEljP"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 16,
        "pct": 40.0
      },
      {
        "oil": "Pine",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Black Pepper",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Basil",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Lemon",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#8EAE68",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "The lemongrass hits like a wave. Not the crashing kind — the kind that lifts you off the sand and holds you weightless, face to the sky, while the shore disappears behind you. Sixteen drops in the diffuser, and Moon Gazer Farms' heaviest offering from the Mendocino hills has announced its intention with botanical authority: rest is not optional tonight.\n\nPine needles crack underfoot somewhere in the memory of the room, their sharp clarity threading through the heavy haze like a needle through velvet. Eight drops of pine oil holding the line between bliss and oblivion, insisting that even in the deepest descent, the forest remembers its architecture and will not let you dissolve entirely.\n\nBasil adds something unexpected — a green brightness, almost tropical, that echoes the sharp lime aroma before the deeper chemistry takes over and pulls everything toward horizontal. Black pepper murmurs beneath it all, six drops of warmth that Thievery Corporation would recognize as the dub bassline: always present, never leading, perfectly placed in the mix to give the low end its shape.\n\nThe glue character is not in any single oil. It emerges from the interaction itself, the way Beach House builds a wall of sound from instruments that seem too gentle to carry weight individually but together become architecture. Lemon provides the last four drops — a trace of citrus that catches the rhubarb note in the strain's aroma and softens it into something you could fall asleep holding.\n\nA woman lies on a daybed near the window, one arm trailing toward the floor like a vine that has forgotten which direction is up. The rhubarb-lime sharpness has dissolved into the lemongrass warmth, and the pine keeps sending its messages of clarity into a body that is no longer taking messages.\n\nBlack Lime Chem has done its quiet math: the highest sedating terpene load in the collection, a formula for weighted bliss that melts the border between body and blanket until the distinction becomes academic. The five oils have turned the room into a cradle, and the Mendocino night presses softly against the glass, patient as a river that knows exactly where it is going.",
    "tea": {
      "name": "Black Lime Chem Tea",
      "description": "Sharp-sweet herbal with rhubarb depth",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "6-7 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 190°F (88°C).",
        "In a tea infuser, combine 1 tbsp dried rhubarb pieces, 1 tsp dried lime peel, 2-3 dried rosemary sprigs, 5-6 dried basil leaves, 1 small bay leaf, and a pinch of ground cinnamon.",
        "Steep for 6-7 minutes to extract the tart-herbal character.",
        "Strain into a warm teacup, discarding solids.",
        "Stir in 0.25 oz agave syrup (to balance rhubarb tartness).",
        "Garnish with a thin lime wheel and fresh rosemary sprig."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Black Lime Chem",
        "description": "Weighted lime-rhubarb bliss",
        "glass": "rocks",
        "volume": "6 oz",
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
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Black Lime Chem",
        "description": "Mezcal smoke meets lime-rhubarb depth",
        "glass": "rocks",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "smoky herbal",
        "spirit": "mezcal",
        "abv": "16%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Brie",
        "desc": "A NorCal cheese board featuring brie, camembert, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      }
    },
    "candle": {
      "name": "Velvet Descent",
      "scent_notes": {
        "top": "lemongrass, pine needle",
        "heart": "bay laurel, fir balsam",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 5
          },
          {
            "oil": "Pine",
            "drops": 3
          },
          {
            "oil": "Black Pepper",
            "drops": 2
          },
          {
            "oil": "Basil",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Heavy Rest",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Pine",
          "part": "dried needles",
          "terpene_target": "α-Pinene"
        },
        {
          "plant": "Rosemary",
          "part": "dried sprigs",
          "terpene_target": "α-Pinene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "muir-woods",
          "location_name": "Muir Woods National Monument",
          "shared_terpenes": [
            "α-Pinene"
          ],
          "match_score": 0.95
        },
        {
          "location_id": "armstrong-redwoods",
          "location_name": "Armstrong Redwoods State Natural Reserve",
          "shared_terpenes": [
            "α-Pinene"
          ],
          "match_score": 0.92
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Mourvèdre",
          "winery": "Tablas Creek",
          "region": "Paso Robles",
          "terpene_bridge": "Garrigue wines carry pine-rosemary-thyme aromatics from Mediterranean scrubland — the same α-pinene-rich botanicals.",
          "tasting_note": "Wild herbs, dark berries, garrigue",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "Session IPA",
          "brewery": "Fieldwork Brewing",
          "region": "Berkeley",
          "hop_varietals": [
            "Centennial",
            "Chinook"
          ],
          "terpene_bridge": "Centennial and Chinook hops deliver significant pinene alongside their citrus character.",
          "tasting_note": "Pine, grapefruit, light body",
          "abv": "4.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "blueberry-muffin": {
    "slug": "blueberry-muffin",
    "name": "Blueberry Muffin",
    "farm": "Briceland Forest Farm",
    "region": "Humboldt",
    "energy": "LOW",
    "intent": "Quiet peace with a soft glow",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "grounded",
      "cozy"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.66,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.47,
        "ratio": 0.28
      },
      {
        "name": "Myrcene",
        "pct": 0.4,
        "ratio": 0.24
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.25,
        "ratio": 0.15
      },
      {
        "name": "α-Humulene",
        "pct": 0.16,
        "ratio": 0.1
      }
    ],
    "bpmRange": [
      69,
      91
    ],
    "musicEnergy": 0.34,
    "musicValence": 0.42,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "ambient",
      "dub"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Bonobo"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 69,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 64,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 79,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Candlelight Glow",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwX01hmnDkjbM"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Lemongrass",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "German Chamomile",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Geranium",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Clove",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#C8A97E",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "Twelve drops of black pepper, and the warm spice settles over Briceland Forest Farm's gentlest Humboldt strain like a blanket over a sleeping child — not to restrict movement but to define the edges of safety, to say this is the space where nothing needs to be defended, where warmth is structural rather than emotional.\n\nLemongrass adds ten drops of grassy warmth, and the fresh dough note in the aroma makes sense immediately: it is the grassy sweetness meeting the warm spice, creating something that smells like a kitchen where someone has been baking all morning without any particular deadline, without any particular recipe, just the meditative act of measuring and mixing as its own reward.\n\nGerman chamomile provides eight drops of the most significant the soft calming molecule presence in any blend in the collection, and Enya would approve of its effect: a calming so thorough it borders on the sacred, a softness that makes even silence feel gentle and textured rather than empty. Sage adds four drops of herbal earthiness, dry and grounding, the herb that connects kitchens to apothecaries to the ancient practice of burning plants to change the quality of a room.\n\nGeranium at four drops brings the blueberry translation. Not literally — geranium is rose-adjacent — but the fruity, slightly tart floral quality lands close enough to blueberry that the brain makes the connection and accepts it without argument, the way the brain accepts that blue can be warm and quiet can be full. Clove closes with two drops of cinnamon warmth, the spice note that ties the entire blend back to the bakery.\n\nA man pulls an actual blueberry muffin from an actual oven, and Blueberry Muffin the strain has already made the kitchen into a sanctuary — not the dramatic kind with stained glass and organ music, but the domestic kind where the holiest act is pulling something warm from the oven and setting it on a wire rack to cool.\n\nThe joyful quality is not excitement. It is the quieter version — the peace that comes with a soft glow behind the eyes and the smell of something you made with your hands and the absolute certainty that this moment needs nothing added and nothing removed and the six oils have known this all along.",
    "tea": {
      "name": "Blueberry Muffin Tea",
      "description": "Blueberry and chamomile with real cinnamon for quiet peace.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Dried blueberry pieces",
        "1 stick Cinnamon stick (broken)",
        "0.5 tsp Dried chamomile flowers",
        "1 tsp Raw honey"
      ],
      "method": [
        "Heat water to 185°F.",
        "Add 1 tbsp dried blueberry pieces and 1 cinnamon stick (broken) to infuser.",
        "Add 0.5 tsp dried chamomile flowers.",
        "Steep for 4 minutes, stirring gently.",
        "Remove infuser, add 1 tsp honey and 0.25 oz vanilla extract (1-2 drops), stir and serve."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Cozy Blueberry",
        "description": "Soft blueberry sweetness with vanilla and cinnamon wrapped in cream.",
        "glass": "Rocks",
        "volume": "~5.5 oz",
        "temp": "Chilled",
        "ingredients": [
          "6-8 berries Fresh blueberries (muddled)",
          "1 oz Vanilla oat milk",
          "0.75 oz Cinnamon-honey syrup",
          "1.5 oz Chilled chamomile tea",
          "1 each Blueberry & cinnamon stick"
        ],
        "method": [
          "Muddle 6-8 fresh blueberries gently in rocks glass.",
          "Add 1 oz vanilla oat milk and 0.75 oz cinnamon-honey syrup.",
          "Add 2-3 large ice cubes.",
          "Top with 1.5 oz chilled chamomile tea and stir gently.",
          "Garnish with fresh blueberry and cinnamon stick."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Bourbon Berry Comfort",
        "description": "Bourbon and blueberry with vanilla cinnamon warmth.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 43°F)",
        "style": "Classic/stirred",
        "spirit": "Bourbon (100 proof)",
        "abv": "~34%",
        "ingredients": [
          "8 berries Fresh blueberries (muddled)",
          "1.5 oz Bourbon",
          "0.5 oz Vanilla syrup",
          "0.25 oz Cinnamon-simple syrup",
          "1 berry Blueberry & cinnamon rim"
        ],
        "method": [
          "Muddle 8 fresh blueberries in mixing glass.",
          "Add 1.5 oz bourbon, 0.5 oz vanilla syrup, and 0.25 oz cinnamon-infused simple syrup.",
          "Stir with ice for 12 seconds.",
          "Fine-strain into chilled coupe.",
          "Garnish with fresh blueberry and cinnamon-dusted rim."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Aged Gouda",
        "desc": "A NorCal cheese board featuring aged gouda, gruyère, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      }
    },
    "candle": {
      "name": "Berry Hearth",
      "scent_notes": {
        "top": "black pepper, lemongrass",
        "heart": "clove bud, bay laurel",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Lemongrass",
            "drops": 4
          },
          {
            "oil": "German Chamomile",
            "drops": 3
          },
          {
            "oil": "Sage",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Lemongrass",
          "German Chamomile"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Lemongrass",
          "German Chamomile"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Berry Smoke",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "carambola": {
    "slug": "carambola",
    "name": "Carambola",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Light and playful, effervescent energy",
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
    "accentColor": "#D4C85C",
    "vibeTags": [
      "creative",
      "social",
      "euphoric"
    ],
    "dominantTerpene": "Limonene",
    "totalTerpenes": 1.45,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.44,
        "ratio": 0.3
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.18,
        "ratio": 0.12
      },
      {
        "name": "Linalool",
        "pct": 0.12,
        "ratio": 0.08
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.09,
        "ratio": 0.06
      }
    ],
    "bpmRange": [
      82,
      109
    ],
    "musicEnergy": 0.53,
    "musicValence": 0.64,
    "genres": [
      "funk",
      "soul",
      "pop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Anderson .Paak",
      "Vulfpeck",
      "Lizzo",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 82,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 109,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 95,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Effervescent Funk & Feel-Good House",
      "url": "https://open.spotify.com/playlist/37i9dQZF1Fx3keFOTjUeg1"
    },
    "oilRecipe": [
      {
        "oil": "Sweet Orange",
        "drops": 16,
        "pct": 40.0
      },
      {
        "oil": "Rosemary",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Lavender",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "German Chamomile",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Black Pepper",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#D4C85C",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Sweet orange at sixteen drops, and the room becomes a Mendocino morning in October when the fog burns off by nine and leaves the hillsides steaming. Higher Heights has always understood that the best energy arrives dressed as simplicity, and Carambola is their proof: an orange-diesel-incense combination that sounds impossible on paper but the oil translates into something unexpectedly sophisticated and irresistibly playful.\n\nRosemary provides the warm spice with eight drops of herbal sharpness that a less playful strain would deploy for focus and productivity. Here it becomes fuel for fun, the way Tom Misch turns a technically brilliant guitar line into something you want to dance to rather than analyze, something that makes your feet move before your brain finishes deciding whether dancing is appropriate.\n\nLavender at six drops brings the floral character — soft, floral, the incense note translated into something you might wear on a summer evening to a party where you know no one and somehow that fact makes you happier rather than nervous. German chamomile adds six drops of the soft calming molecule, the quiet sophisticate of the terpene world, smoothing every interaction between the brighter oils like a gracious host who ensures no conversation goes cold.\n\nBlack pepper closes with four drops of warmth that reminds the room this is still a body experience, still grounded even when the giggles arrive. And they will arrive. They always arrive with the blend — not as outbursts but as bubbles rising through warm water, effortless, inevitable, the physical expression of whatever happens when citrus meets chamomile meets the particular October light of the Mendocino hills.\n\nSomeone just told a joke that was not particularly funny but the flower turned it into the funniest thing anyone has heard all week. The sweet orange and the rosemary created the acoustic conditions for laughter, and the lavender softened the landing, and the chamomile ensured nobody felt self-conscious about laughing too loud.\n\nThe starfruit note — that strange, sweet-tart quality the strain is named for — emerges from the overlap of orange and chamomile like laughter emerging from a room where everyone has stopped trying to be serious and started trying to be present. The five oils are still working, and the morning is still young, and the energy is effervescent in the oldest sense of the word: it rises.",
    "tea": {
      "name": "Incense & Starlight",
      "description": "Cardamom-forward herbal tea with delicate citrus whispers.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tsp Cardamom pods (toasted)",
        "0.25 oz Dried orange peel",
        "0.5 tsp Raw honey",
        "1 pod Cardamom pod"
      ],
      "method": [
        "Heat water to 200°F.",
        "Toast 1 tsp cardamom pods for 20 seconds in a dry pot.",
        "Crush pods lightly and add to infuser with 0.25 oz dried orange peel.",
        "Steep in hot water for 5 minutes.",
        "Remove infuser, add 0.5 tsp honey, stir and serve with a cardamom pod."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Stellar Sparkle",
        "description": "Starfruit's playful tartness sparkles with cardamom warmth.",
        "glass": "Coupe",
        "volume": "~6 oz",
        "temp": "Ice cold",
        "ingredients": [
          "2.5 oz Fresh starfruit juice",
          "1 oz Fresh orange juice",
          "0.5 oz Cardamom-honey syrup",
          "1 thin wheel Starfruit slice"
        ],
        "method": [
          "Juice 2 fresh starfruit (about 2.5 oz).",
          "Combine juice with 1 oz fresh orange juice in shaker.",
          "Add 0.5 oz cardamom-honey syrup and ice.",
          "Shake for 8 seconds.",
          "Strain into chilled coupe and garnish with a thin starfruit slice."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Playful Botanica",
        "description": "Gin's botanical clarity amplifies starfruit's effervescent joy.",
        "glass": "Coup de Grace (wide coupe)",
        "volume": "~5.5 oz",
        "temp": "Cold (around 40°F)",
        "style": "Botanical/stirred",
        "spirit": "London Dry Gin (47% ABV)",
        "abv": "~32%",
        "ingredients": [
          "1.5 oz London Dry gin",
          "2 oz Fresh starfruit juice",
          "0.5 oz Fresh orange juice",
          "0.25 oz Cardamom-honey syrup",
          "1 each Orange peel & starfruit slice"
        ],
        "method": [
          "Combine 1.5 oz London Dry gin with 2 oz fresh starfruit juice in mixing glass.",
          "Add 0.5 oz fresh orange juice and 0.25 oz cardamom-honey syrup.",
          "Stir with large ice for 12 seconds.",
          "Strain into chilled coupe over a large clear ice cube.",
          "Express orange peel oils over surface and garnish with thin starfruit slice."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Burrata",
        "desc": "Light and bright cheese plate with chèvre, burrata, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Starfruit Spark",
      "scent_notes": {
        "top": "bergamot, black pepper",
        "heart": "neroli, clove bud",
        "base": "cedarwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Sweet Orange",
            "drops": 5
          },
          {
            "oil": "Rosemary",
            "drops": 3
          },
          {
            "oil": "Lavender",
            "drops": 2
          },
          {
            "oil": "German Chamomile",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Sweet Orange",
          "Rosemary",
          "Lavender"
        ],
        "color": "sunny yellow",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Sweet Orange",
          "Rosemary",
          "Lavender"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Starlight Smoke",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Citrus Collection, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "glitter-bomb": {
    "slug": "glitter-bomb",
    "name": "Glitter Bomb",
    "farm": "Sol Spirit Farm",
    "region": "Trinity",
    "energy": "HIGH",
    "intent": "Body at ease, mind sparkling",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "euphoric",
      "body"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 2.39,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 1.23,
        "ratio": 0.51
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.42,
        "ratio": 0.18
      },
      {
        "name": "β-Ocimene",
        "pct": 0.17,
        "ratio": 0.07
      },
      {
        "name": "Linalool",
        "pct": 0.15,
        "ratio": 0.06
      }
    ],
    "bpmRange": [
      67,
      88
    ],
    "musicEnergy": 0.3,
    "musicValence": 0.38,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 67,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 88,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 77,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Velvet Fireworks",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwScIToDdQoXg"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 18,
        "pct": 45.0
      },
      {
        "oil": "Black Pepper",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Basil",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Lavender",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Pine",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#8EAE68",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Eighteen drops of lemongrass, and Sol Spirit Farm's Trinity County creation announces what high this concentration can do when it is not trying to sedate: it can hold the body perfectly still while the mind begins to sparkle, to throw off light in unexpected directions, to discover that relaxation and euphoria are not opposites but dance partners who have been waiting all evening for someone to change the music.\n\nBlack pepper follows with ten drops of spiced warmth — the bass frequency, the gravitational field that Massive Attack would build an entire track around, the low-end anchor that keeps the sparkling from scattering into incoherence. This is physical ease with cerebral fireworks, and the pepper provides the physics that makes the fireworks visible against a dark, still sky rather than a bright, busy one.\n\nBasil adds four drops of the bright herbal molecule, the kiwi brightness that gives the strain its unexpected tropical note — not the sweetness of tropical fruit but its sharpness, its green acidic edge, the flavor of something so fresh it still remembers the vine. Lavender matches it with four drops of floral softness, a floral cushion that catches the sparkle when it falls and sends it back up gently.\n\nPine completes the blend with four drops that capture the pine aroma directly — not as interpretation but as citation, the essential oil and the flower speaking the same resinous language across botanical kingdoms. The forest character adds a vertical line through the horizontal drift of the sedating quality, a reminder that even in the deepest physical ease, something in the room is still standing tall.\n\nThe musk note is ghost chemistry. No single oil carries it, but when lemongrass and pepper and basil and lavender and pine meet in the warm output of a diffuser, something musky and primal emerges from the interaction, the olfactory equivalent of glitter catching light — each particle too small to matter alone, but together they transform a surface from plain to spectacular.\n\nA man lies in a hammock between two redwoods, his eyes open and aimed at a canopy that filters the afternoon into green coins on his shirt. Glitter Bomb is an oxymoron that the body accepts: the muscles have dissolved and the mind is celebrating, and the five oils are proof that the longest distance between two states of being is sometimes zero.",
    "tea": {
      "name": "Kiwi Serenity",
      "description": "Green kiwi tea with rosemary and basil for cerebral ease.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "3 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "0.5 oz Dried kiwi pieces (or fresh pulp)",
        "0.5 tsp Dried rosemary",
        "5-6 leaves Fresh basil leaves (bruised)",
        "0.5 oz Fresh kiwi juice"
      ],
      "method": [
        "Heat water to 185°F.",
        "Add 0.5 oz dried kiwi pieces (or 1 tsp fresh kiwi pulp) to infuser.",
        "Add 0.5 tsp dried rosemary and 5-6 fresh basil leaves (lightly bruised).",
        "Steep for 3 minutes.",
        "Remove infuser, add 0.5 oz fresh kiwi juice and 0.5 tsp honey, stir and serve."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Kiwi Sparkle",
        "description": "Kiwi brightness with rosemary-pine clarity and euphoric lift.",
        "glass": "Highball",
        "volume": "~8 oz",
        "temp": "Ice cold",
        "ingredients": [
          "2 fruit Fresh kiwi (muddled)",
          "1.5 oz Fresh kiwi juice",
          "0.5 oz Rosemary-simple syrup",
          "0.25 oz Fresh basil juice",
          "2 oz Sparkling water"
        ],
        "method": [
          "Muddle 2 fresh kiwis (peeled) gently in shaker.",
          "Add 1.5 oz fresh kiwi juice, 0.5 oz rosemary-infused simple syrup, and 0.25 oz fresh basil juice (from 5-6 leaves).",
          "Add ice and shake for 8 seconds.",
          "Strain into highball glass filled with crushed ice.",
          "Top with 2 oz sparkling water and garnish with kiwi wheel and basil leaf."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Kiwi Botanica",
        "description": "Gin sharpens kiwi's tropical sparkle with pine and basil clarity.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 40°F)",
        "style": "Botanical/stirred",
        "spirit": "London Dry Gin (47% ABV)",
        "abv": "~32%",
        "ingredients": [
          "1.5 oz London Dry gin",
          "3 fruit Fresh kiwi (muddled)",
          "1 oz Fresh kiwi juice",
          "0.5 oz Rosemary syrup",
          "0.25 oz Fresh basil juice"
        ],
        "method": [
          "Muddle 3 fresh kiwis (peeled) in mixing glass.",
          "Add 1.5 oz London Dry gin, 1 oz fresh kiwi juice, 0.5 oz rosemary syrup, and 0.25 oz fresh basil juice.",
          "Stir with ice for 12 seconds.",
          "Fine-strain into chilled coupe over large clear ice.",
          "Garnish with kiwi wheel, basil leaf, and thin rosemary sprig."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Camembert",
        "desc": "Light and bright cheese plate with brie, camembert, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Forest Sparkle",
      "scent_notes": {
        "top": "lemongrass, black pepper",
        "heart": "bay laurel, clove bud",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 7
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Basil",
            "drops": 1
          },
          {
            "oil": "Lavender",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Basil"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Basil"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Kiwi Pine",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "guava-gift": {
    "slug": "guava-gift",
    "name": "Guava Gift",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "HIGH",
    "intent": "Open and expansive, easy social lift",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "social",
      "euphoric"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 2.34,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.73,
        "ratio": 0.31
      },
      {
        "name": "Limonene",
        "pct": 0.5,
        "ratio": 0.21
      },
      {
        "name": "Myrcene",
        "pct": 0.33,
        "ratio": 0.14
      },
      {
        "name": "α-Humulene",
        "pct": 0.25,
        "ratio": 0.11
      }
    ],
    "bpmRange": [
      80,
      105
    ],
    "musicEnergy": 0.49,
    "musicValence": 0.53,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 80,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 105,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 92,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Golden Hour Backyard Grooves",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwKBj5S7cXQfY"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Grapefruit",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Lemongrass",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Basil",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Rosemary",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#C8A97E",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "The grapefruit oil cracks open like a sunrise over the Humboldt hills — ten drops of tropical citrus that light up the room before the pepper even gets a word in. Alpenglow Farms knows something about first impressions: their guava carries that same immediate generosity, that willingness to show up bright and unguarded and trust that the room will meet you halfway.\n\nBlack pepper follows, fourteen drops of warmth that transforms the social energy from effervescent to substantive. This is not nervous energy buzzing in search of a direction. This is Anderson .Paak territory — rhythmic, confident, generous with the groove. The spicy backbone is sturdy enough to host the whole party, solid enough that everyone in the room can lean against it.\n\nLemongrass brings the sedating quality in through the back door, eight drops of grassy sweetness that softens every conversation into something more honest, more connected to the body rather than the performance of sociability. Basil adds a bright herbal edge, six drops of the kind of clarity that makes you say the true thing instead of the polite thing and somehow makes both sound the same.\n\nRosemary whispers from its two drops in the corner of the blend, adding just enough herbal depth to keep the freshness from floating away into pure citrus abstraction. The fresh guava aroma is not in any one bottle — it is what happens when grapefruit meets pepper meets lemongrass in humid Humboldt air, a tropical alchemy that the strain itself performs in the flower and the oils reproduce in the room.\n\nA gathering is forming on the farmhouse porch. Someone has brought a tamarind paste to spread on grilled sourdough from the bakery in town. The lemon rind quality in the evening light turns everything slightly golden, and the conversation has reached that rare altitude where nobody is performing and everyone is present. Guava Gift circulates through the group like a host who remembers everyone's name and everyone's drink — open, expansive, easy — and the five oils have been doing their invisible work for thirty minutes, and no one has noticed because the room already feels like the room they have always wanted to be in.",
    "tea": {
      "name": "Guava Harmony",
      "description": "Gentle guava leaf infusion with subtle tropical notes.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Dried guava leaf",
        "0.5 oz Fresh guava puree",
        "0.5 oz Fresh lime juice",
        "0.5 tsp Raw honey"
      ],
      "method": [
        "Heat water to 195°F.",
        "Add 1 tbsp dried guava leaf pieces and 0.5 oz fresh guava puree to infuser.",
        "Steep for 4 minutes.",
        "Remove infuser and add 0.5 oz lime juice and 0.5 tsp honey.",
        "Stir and serve with a dried guava chip."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Social Guava",
        "description": "Tropical guava and tamarind sparkle with expansive warmth.",
        "glass": "Highball",
        "volume": "~8 oz",
        "temp": "Ice cold",
        "ingredients": [
          "3 oz Fresh guava nectar",
          "1 oz Tamarind paste (diluted)",
          "3 oz Sparkling water",
          "0.5 oz Fresh lemon juice",
          "1 each Lemon wheel & rosemary sprig"
        ],
        "method": [
          "Pour 3 oz fresh guava nectar into highball glass over ice.",
          "Add 1 oz tamarind paste (dissolved in 1 oz water).",
          "Top with 3 oz sparkling water.",
          "Add 0.5 oz fresh lemon juice (juice, not zest).",
          "Garnish with lemon wheel and rosemary sprig."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Tropical Elevation",
        "description": "White rum carries guava and tamarind to bright social heights.",
        "glass": "Tiki mug",
        "volume": "~7 oz",
        "temp": "Ice cold",
        "style": "Tropical/shaken",
        "spirit": "Pisco or white rum (40% ABV)",
        "abv": "~28%",
        "ingredients": [
          "2 oz Pisco or white rum",
          "2.5 oz Guava puree",
          "0.75 oz Tamarind paste",
          "0.5 oz Lime juice",
          "1 each Guava slice, lemon twist, rosemary"
        ],
        "method": [
          "Combine 2 oz white rum (pisco preferred) with 2.5 oz guava puree in shaker.",
          "Add 0.75 oz tamarind paste, 0.5 oz lime juice, and ice.",
          "Shake vigorously for 12 seconds.",
          "Strain into tiki mug filled with crushed ice.",
          "Garnish with guava slice, lemon twist, and rosemary sprig."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Gruyère",
        "desc": "Light and bright cheese plate with aged gouda, gruyère, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Social Glow",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Grapefruit",
            "drops": 3
          },
          {
            "oil": "Lemongrass",
            "drops": 3
          },
          {
            "oil": "Basil",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Grapefruit",
          "Lemongrass"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Grapefruit",
          "Lemongrass"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Tropical Ember",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "lemon-papaya-banana": {
    "slug": "lemon-papaya-banana",
    "name": "Lemon Papaya Banana",
    "farm": "Terrapin Farms",
    "region": "Humboldt",
    "energy": "LOW",
    "intent": "Soft body, drifting expansive mind",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "rest",
      "body"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 1.38,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.57,
        "ratio": 0.41
      },
      {
        "name": "Limonene",
        "pct": 0.29,
        "ratio": 0.21
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.16,
        "ratio": 0.12
      },
      {
        "name": "α-Humulene",
        "pct": 0.05,
        "ratio": 0.04
      }
    ],
    "bpmRange": [
      73,
      97
    ],
    "musicEnergy": 0.39,
    "musicValence": 0.47,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "funk",
      "soul"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 73,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 68,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 83,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Sun-Bleached Ocean Drift",
      "url": "https://open.spotify.com/playlist/37i9dQZF1Fx1ienexiYIXj"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Lemon",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Black Pepper",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Geranium",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Ylang Ylang",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#8EAE68",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "The lemongrass is dominant from the first breath — fourteen drops that slow the room like honey poured over time itself. In Humboldt, where Terrapin Farms sits between ridges that catch the coastal fog and hold it like cupped hands, the afternoon air already carries that heavy sweetness, and the oil simply amplifies what the land was already saying in its slow botanical dialect.\n\nLemon enters next, ten drops of zest so bright it could cut glass, but here it dissolves into the heavy haze like sunlight through gauze, losing its edges without losing its identity. The papaya note lives somewhere in the overlap, tropical and overripe and perfectly content to be both — the scent of fruit that has decided there is no rush toward anything, not even ripeness.\n\nBlack pepper holds the low end with six drops, just enough structural warmth to keep the drift from becoming weightless, to remind the body that gravity is still a participant even when everything feels like floating. Geranium adds the honeydew melon quality, its soft floral fruitiness a stand-in for the tropical fruit that the strain's name promises but the oils deliver through translation rather than imitation.\n\nYlang ylang is the closer. Four drops of exotic sweetness that Bonobo might sample for a late-night downtempo set, the kind of scent that makes you close your eyes not because you are tired but because the inside of your eyelids has become more interesting than the room, more spacious, more hospitable to the kind of thoughts that only arrive when the body stops supervising.\n\nSomeone has left Lemon Papaya Banana on the nightstand next to an open book, face-down, its pages fanning slightly in a breeze from nowhere in particular. She does not mind losing her place. The body is soft and the mind is drifting through landscapes that have no geography but feel completely real — papaya groves that smell like geranium, melon fields where lemongrass grows between the rows.\n\nThe five oils have turned the bedroom into a departure lounge for somewhere warmer, and the lemon zest in the air is the last thing she notices before noticing itself becomes a gentle, expansive luxury rather than a task.",
    "tea": {
      "name": "Lemon Papaya Banana Tea",
      "description": "Soft tropical comfort brew",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 155°F (68°C).",
        "In a tea infuser, combine 1 tbsp dried papaya pieces, 0.5 tbsp dried banana chips, 1 tsp dried lemon peel, 1 small bay leaf, and a pinch of vanilla powder.",
        "Steep for 5 minutes to extract the tropical sweetness gently.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz coconut cream and a tiny pinch of ground cinnamon.",
        "Garnish with a fresh mint sprig and thin lemon wheel."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Lemon Papaya Banana",
        "description": "Soft tropical body, expansive mind",
        "glass": "highball",
        "volume": "7 oz",
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
        "method": [
          "In a blender, combine 1.5 oz fresh papaya puree and 0.75 oz banana puree (frozen banana blended smooth).",
          "Add 0.75 oz fresh lemon juice and 0.5 oz honeydew melon juice (or 0.5 oz honeydew syrup + 0.25 oz water).",
          "Pour in 0.75 oz coconut cream.",
          "Add a pinch of vanilla powder and a small bay leaf (remove before serving).",
          "Blend for 8 seconds until creamy and smooth.",
          "Pour into a highball glass with crushed ice.",
          "Garnish with a papaya slice, banana wheel, and fresh mint."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Lemon Papaya Banana",
        "description": "Cachaça-spiked papaya-banana drift",
        "glass": "highball",
        "volume": "7.5 oz",
        "temp": "chilled",
        "style": "tropical relaxation",
        "spirit": "cachaça",
        "abv": "14%",
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
        "method": [
          "Pour 1.5 oz cachaça into a blender.",
          "Add 1.5 oz fresh papaya puree and 0.75 oz banana puree (frozen, blended smooth).",
          "Pour in 0.75 oz fresh lemon juice and 0.5 oz honeydew melon juice.",
          "Add 0.75 oz coconut cream, a small bay leaf, and a pinch of vanilla powder.",
          "Blend for 10 seconds until smooth and creamy.",
          "Pour into a highball glass with crushed ice.",
          "Garnish with a papaya slice, banana wheel, and a mint sprig."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "Myrcene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "Myrcene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "Myrcene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "Myrcene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Brie",
        "desc": "A NorCal cheese board featuring brie, camembert, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "Myrcene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Drifting Light",
      "scent_notes": {
        "top": "lemongrass, bergamot",
        "heart": "bay laurel, neroli",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 5
          },
          {
            "oil": "Lemon",
            "drops": 3
          },
          {
            "oil": "Black Pepper",
            "drops": 2
          },
          {
            "oil": "Geranium",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Lemon",
          "Black Pepper"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Lemon",
          "Black Pepper"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Island Drift",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "love-and-laughter-cbd": {
    "slug": "love-and-laughter-cbd",
    "name": "Love and Laughter CBD",
    "farm": "Heartrock Mountain Farm",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Clear and steady, nothing clouded",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "focus"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 1.72,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.56,
        "ratio": 0.33
      },
      {
        "name": "Terpinolene",
        "pct": 0.28,
        "ratio": 0.16
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.2,
        "ratio": 0.12
      },
      {
        "name": "α-Pinene",
        "pct": 0.13,
        "ratio": 0.08
      }
    ],
    "bpmRange": [
      76,
      100
    ],
    "musicEnergy": 0.4,
    "musicValence": 0.46,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "psychedelic",
      "indie electronic"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Tame Impala"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 76,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 100,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 88,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Clear Focus Instrumental Jazz",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwWZTxNep5ThD"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Tea Tree",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Eucalyptus",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Black Pepper",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Geranium",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#8EAE68",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Lemongrass at fourteen drops, and the focus is immediate — not the jittery focus of stimulants but the clean, structural kind, the focus of a room where every surface is clear and the light comes from windows rather than screens. This is Heartrock Mountain Farm's only CBD entry in the Mendocino collection: the non-intoxicating baseline, the clear-headed control, the proof that the plant has modes nobody talks about at parties.\n\nTea tree arrives with eight drops of a rare aromatic, the unusual molecule that most people have never isolated by name but everyone has felt: that clean, almost medicinal clarity that makes a morning feel sharp-edged and manageable, the olfactory equivalent of a freshly wiped whiteboard. Eucalyptus matches it with eight drops of its own, a distinctive camphoraceous note that hits the flowers-and-eucalyptus aroma with documentary-level accuracy, no embellishment, no artistic license.\n\nBlack pepper adds six drops of warm spice, just enough body to keep the clarity from becoming clinical, just enough warmth to remind the body it is still a participant rather than merely a vehicle for the brain. Geranium rounds the blend with four drops of floral berry sweetness — the berries in the aroma, translated through rose-adjacent petals into something that softens without sedating.\n\nTame Impala plays from a small speaker on the bookshelf, their psychedelic shimmer reduced to its clear-headed skeleton, because Love and Laughter CBD is the version of the plant that removes the haze and leaves only the architecture: the scaffolding, the blueprint, the clean lines of a nervous system operating at its designed specifications.\n\nA woman opens her laptop at a desk near a window where morning light falls on a row of small succulents she waters every third day with the precision of someone who respects routine without being imprisoned by it. The five oils have already done their work. The lemongrass-eucalyptus combination turns every breath into a small reset, a micro-recalibration, and the tea tree keeps the edge sharp without making it aggressive.\n\nThe steady quality is not dramatic. There is no story here about transformation or transcendence. There is only the morning, and the window, and the work, and the five oils holding the room at exactly the temperature where productivity feels less like effort and more like the natural state of a mind that has been given permission to function cleanly.",
    "tea": {
      "name": "Eucalyptus Clarity",
      "description": "Cool eucalyptus and berry tea for steady focus and calm.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "3 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "0.5 tsp Dried eucalyptus leaves",
        "1 tbsp Dried mixed berries",
        "0.5 tsp Fresh rosemary (minced)",
        "0.5 oz Fresh green apple juice"
      ],
      "method": [
        "Heat water to 185°F.",
        "Add 0.5 tsp dried eucalyptus leaves and 1 tbsp dried mixed berries to infuser.",
        "Add 0.5 tsp fresh rosemary (minced).",
        "Steep for 3 minutes.",
        "Remove infuser, add 0.5 oz fresh green apple juice and 0.5 tsp eucalyptus honey, stir and serve."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Green Apple Focus",
        "description": "Green apple clarity with eucalyptus and berry brightness for clear focus.",
        "glass": "Rocks",
        "volume": "~5 oz",
        "temp": "Ice cold",
        "ingredients": [
          "2 oz Fresh green apple juice",
          "1 oz Mixed berry juice",
          "0.5 oz Eucalyptus honey water",
          "0.25 oz Rosemary-simple syrup",
          "1 each Apple slice & rosemary sprig"
        ],
        "method": [
          "Combine 2 oz fresh green apple juice with 1 oz mixed berry juice (blueberry + strawberry) in shaker.",
          "Add 0.5 oz eucalyptus honey water (steeped 5 min).",
          "Add 0.25 oz fresh rosemary-infused simple syrup and ice.",
          "Shake for 8 seconds.",
          "Strain into rocks glass over large ice cube and garnish with apple slice and rosemary sprig."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Focused Gin",
        "description": "Gin's clarity sharpened by green apple, eucalyptus, and rosemary.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 40°F)",
        "style": "Botanical/stirred",
        "spirit": "London Dry Gin (47% ABV)",
        "abv": "~32%",
        "ingredients": [
          "1.5 oz London Dry gin",
          "1.5 oz Fresh green apple juice",
          "0.75 oz Mixed berry juice",
          "0.5 oz Eucalyptus honey water",
          "0.25 oz Rosemary syrup"
        ],
        "method": [
          "Combine 1.5 oz London Dry gin with 1.5 oz fresh green apple juice in mixing glass.",
          "Add 0.75 oz mixed berry juice, 0.5 oz eucalyptus honey water, and 0.25 oz rosemary syrup.",
          "Stir with ice for 12 seconds.",
          "Strain into chilled coupe over large ice cube.",
          "Garnish with apple peel and rosemary sprig."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Myrcene",
          "Terpinolene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Myrcene",
          "Terpinolene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Myrcene",
          "Terpinolene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Myrcene",
          "Terpinolene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Camembert",
        "desc": "Light and bright cheese plate with brie, camembert, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Myrcene",
          "Terpinolene"
        ]
      }
    },
    "candle": {
      "name": "Clear Morning",
      "scent_notes": {
        "top": "lemongrass, tea tree",
        "heart": "bay laurel, marjoram",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 4
          },
          {
            "oil": "Tea Tree",
            "drops": 3
          },
          {
            "oil": "Eucalyptus",
            "drops": 3
          },
          {
            "oil": "Black Pepper",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Tea Tree",
          "Eucalyptus"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Tea Tree",
          "Eucalyptus"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Clear Smoke",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Tea Tree",
          "part": "dried leaves",
          "terpene_target": "Terpinolene"
        },
        {
          "plant": "Marjoram",
          "part": "dried leaves",
          "terpene_target": "Terpinolene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "mount-sutro",
          "location_name": "Mount Sutro Open Space Reserve",
          "shared_terpenes": [
            "Terpinolene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "presidio",
          "location_name": "Presidio of San Francisco",
          "shared_terpenes": [
            "Terpinolene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Albariño",
          "winery": "Bokisch Vineyards",
          "region": "Lodi",
          "terpene_bridge": "Albariño's crisp, aromatic profile with green apple and citrus notes mirrors terpinolene's bright, eclectic character.",
          "tasting_note": "Green apple, white flowers, saline",
          "serving_temp_f": 46,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "Fresh Hop Pale Ale",
          "brewery": "Bear Republic",
          "region": "Cloverdale",
          "hop_varietals": [
            "Cascade",
            "Crystal"
          ],
          "terpene_bridge": "Fresh (wet) hops retain terpinolene that is typically lost in kilning — bridging the fresh-plant character of cannabis flower.",
          "tasting_note": "Grassy, floral, bright citrus",
          "abv": "5.3%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "mandarin-cherry-tree": {
    "slug": "mandarin-cherry-tree",
    "name": "Mandarin Cherry Tree",
    "farm": "Sticky Fields",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Settled body, gently wandering mind",
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
    "accentColor": "#D4C85C",
    "vibeTags": [
      "cozy"
    ],
    "dominantTerpene": "Limonene",
    "totalTerpenes": 1.75,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.52,
        "ratio": 0.3
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.36,
        "ratio": 0.21
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 0.07
      },
      {
        "name": "Linalool",
        "pct": 0.11,
        "ratio": 0.06
      }
    ],
    "bpmRange": [
      84,
      110
    ],
    "musicEnergy": 0.55,
    "musicValence": 0.62,
    "genres": [
      "funk",
      "soul",
      "pop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Anderson .Paak",
      "Vulfpeck",
      "Lizzo",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 84,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 79,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 94,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Golden Hour Grooves",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwP8MqLtYUUeg"
    },
    "oilRecipe": [
      {
        "oil": "Sweet Orange",
        "drops": 16,
        "pct": 40.0
      },
      {
        "oil": "Black Pepper",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Lavender",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Ylang Ylang",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#D4C85C",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "Sweet orange dominates at sixteen drops, and the mandarin note fills the room the way sunset fills a Mendocino valley — gradually, warmly, with the patient confidence of something that has happened ten thousand times at Sticky Fields and still carries meaning each time. This is not the bright citrus of morning. This is the amber citrus of late afternoon, when the light gets thick and the shadows get long and the world starts to look like a painting of itself.\n\nBlack pepper adds ten drops of warm spice, the grounding warmth that turns relaxation from a passive collapse into something with structure, something you can inhabit like a room rather than fall into like a hole. Lavender follows with six drops, and the lavender aroma note is not a translation or an approximation — it is a direct quotation, the essential oil and the strain speaking the same floral language with the same accent, the same cadence, the same unhurried softness.\n\nSage provides four drops of herbal earthiness, dry and ancient as the first herb garden, and ylang ylang completes the blend with four drops of exotic sweetness that stands in for the sandalwood note — not identical but adjacent, the way Beach House stands adjacent to dream pop without ever quite being it or needing to be, occupying its own specific coordinate in the landscape.\n\nThe creativity that arrives is not the productive kind. It is the wandering kind, the kind that has no destination and therefore can arrive anywhere. Mandarin Cherry Tree does not produce ideas — it produces the conditions where ideas arrive uninvited, settle into the spare chair, and begin talking as if they have always been part of the conversation.\n\nA painter stares at a canvas that has been blank for an hour. The settled body has freed the mind, and the mandarin orange in the air keeps suggesting colors — warm amber, deep violet, the particular blue that appears when sandalwood and citrus share an evening. She picks up a brush not because she has decided what to paint but because the five oils have decided for her, and the wandering mind has arrived somewhere beautiful, and the brush is simply the first honest response to a room that smells like sunset and lavender and the oldest form of permission.",
    "tea": {
      "name": "Mandarin Dusk",
      "description": "",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "0.5 oz Dried mandarin peel",
        "1 tbsp Dried lavender buds",
        "0.25 oz Dried cherry pieces",
        "0.5 tsp Raw honey"
      ],
      "method": [
        "Heat water to 190°F.",
        "Add 0.5 oz dried mandarin peel pieces to infuser.",
        "Add 1 tbsp dried lavender buds and 0.25 oz dried cherry pieces.",
        "Steep for 4 minutes, stirring gently.",
        "Remove infuser, add 0.5 tsp honey and 2 drops vanilla extract, stir and serve."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Elegant Mandarin",
        "description": "Mandarin and lavender drift into serene sophistication.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Ice cold",
        "ingredients": [
          "2.5 oz Fresh mandarin juice",
          "1 oz Fresh cherry juice",
          "0.5 oz Culinary lavender syrup",
          "0.25 oz Coconut cream",
          "1 each Mandarin wheel, cherry & lavender"
        ],
        "method": [
          "Combine 2.5 oz fresh mandarin juice with 1 oz fresh cherry juice in shaker.",
          "Add 0.5 oz culinary lavender syrup and 0.25 oz coconut cream.",
          "Add ice and shake for 8 seconds.",
          "Strain into chilled coupe.",
          "Garnish with mandarin wheel, cherry, and lavender flower."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Cognac Elegance",
        "description": "Cognac deepens mandarin and lavender into settled sophistication.",
        "glass": "Snifter",
        "volume": "~4.5 oz",
        "temp": "Warm (around 85°F)",
        "style": "Warm/stirred",
        "spirit": "VS Cognac (40% ABV)",
        "abv": "~28%",
        "ingredients": [
          "1.5 oz VS Cognac",
          "1.5 oz Fresh mandarin juice",
          "0.5 oz Culinary lavender syrup",
          "0.25 oz Coconut cream",
          "1 each Mandarin peel & lavender"
        ],
        "method": [
          "Warm 1.5 oz VS cognac gently (do not boil).",
          "Combine with 1.5 oz fresh mandarin juice in snifter.",
          "Add 0.5 oz culinary lavender syrup and 0.25 oz coconut cream.",
          "Stir gently with large ice cubes.",
          "Garnish with mandarin peel and one lavender flower."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Chèvre",
        "desc": "A NorCal cheese board featuring chèvre, burrata, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Sandalwood Dream",
      "scent_notes": {
        "top": "bergamot, black pepper",
        "heart": "neroli, clove bud",
        "base": "cedarwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Sweet Orange",
            "drops": 6
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Lavender",
            "drops": 2
          },
          {
            "oil": "Sage",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Sweet Orange",
          "Black Pepper",
          "Lavender"
        ],
        "color": "sunny yellow",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Sweet Orange",
          "Black Pepper",
          "Lavender"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Mandarin Altar",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Citrus Collection, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "mikes-bomba": {
    "slug": "mikes-bomba",
    "name": "Mike's Bomba",
    "farm": "Glentucky Family Farm",
    "region": "Sonoma",
    "energy": "LOW",
    "intent": "Grounded calm with clear mental edges",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "grounded"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.38,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.47,
        "ratio": 0.34
      },
      {
        "name": "Limonene",
        "pct": 0.32,
        "ratio": 0.23
      },
      {
        "name": "α-Humulene",
        "pct": 0.18,
        "ratio": 0.13
      },
      {
        "name": "Linalool",
        "pct": 0.07,
        "ratio": 0.05
      }
    ],
    "bpmRange": [
      82,
      107
    ],
    "musicEnergy": 0.52,
    "musicValence": 0.57,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 82,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 77,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 92,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Clear Headed Grooves",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwRiTvcvVxYuT"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 20,
        "pct": 50.0
      },
      {
        "oil": "Lemon",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Sage",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Lavender",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#C8A97E",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "The first thing you notice is the pepper. Not the sharp kind that catches your throat, but the warm, round variety that settles into your palms like a handshake from someone you trust. It rises from the ceramic dish on the windowsill of a Glentucky Family Farm outbuilding in Sonoma, where lemon oil pools in the afternoon light, mixing with sage leaves left to dry on a wooden rack beside a forgotten coffee mug.\n\nThe lavender is barely there — a ghost note at the edge of the room, the way Nils Frahm lets a single piano key ring into silence before the next phrase arrives. It does not demand attention. It simply rounds the corners of the sharper scents until the whole space feels cushioned, the walls softer, the afternoon longer.\n\nOutside, the fog has not quite lifted. A farmhand leans against the fence post, rolling a stem between her fingers, watching a red-tailed hawk circle above the coastal oaks that line the western ridge. She is not thinking about anything in particular. That is the point. The lemon cream character hangs in the still air, sweeter than the oil itself, a quality that emerges when citrus meets pepper meets sage in the warm humidity of a room where nobody is in a hurry.\n\nInside the farmhouse, someone has placed Mike's Bomba on the table next to a leather-bound field journal. The pages are open to a sketch of terpene ratios drawn in pencil, but the pencil has rolled to the floor and no one has picked it up. The work can wait. The forest floor quality of the room — that deep, loamy earthiness beneath the brighter notes — has turned the ordinary into something luminous, turned alertness into awareness, turned a Tuesday afternoon into exactly enough.\n\nThe sage adds something ancient to the blend. A dried herb quality that connects this moment to every kitchen, every apothecary, every healer who understood that sometimes the most powerful medicine is simply paying better attention to what is already here. The four oils — pepper, lemon, sage, lavender — have been working for thirty minutes now, and the room has become the kind of place where you can be completely still and completely awake at the same time, and neither state asks anything of the other.",
    "tea": {
      "name": "Lemon & Sage Rest",
      "description": "Gentle herbal infusion with bright citrus notes.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tsp Dried rosemary",
        "0.5 tsp Dried sage",
        "1 wheel Dried lemon wheel",
        "1 tsp Raw honey"
      ],
      "method": [
        "Heat water to 185°F.",
        "Add 1 tsp dried rosemary, 0.5 tsp dried sage, and 1 dried lemon wheel to infuser.",
        "Steep for 5 minutes, stirring gently.",
        "Remove infuser and add 0.5 oz fresh lemon juice and 1 tsp honey.",
        "Stir and serve with a sage leaf."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Cream & Compass",
        "description": "Lemon-kissed calm with earthy rosemary anchors the mind.",
        "glass": "Coupe",
        "volume": "~5 oz",
        "temp": "Ice cold",
        "ingredients": [
          "2 oz Fresh lemon juice",
          "1 oz Heavy cream",
          "0.5 oz Rosemary-infused simple syrup",
          "3 dashes Angostura bitters",
          "1 twist Lemon peel"
        ],
        "method": [
          "Add 2 oz fresh lemon juice, 1 oz cream, 0.5 oz rosemary-infused simple syrup to shaker with ice.",
          "Add 3 dashes of angostura bitters.",
          "Shake for 10 seconds until frothy.",
          "Fine-strain into chilled coupe.",
          "Express lemon peel oil over surface and drop as garnish."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Grounded Manhattan",
        "description": "Bourbon mellows the fuel, rosemary deepens the calm.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 45°F)",
        "style": "Classic/stirred",
        "spirit": "Bourbon (100 proof)",
        "abv": "~35%",
        "ingredients": [
          "2 oz Bourbon",
          "1 oz Lemon cream cordial",
          "0.5 oz Dry vermouth",
          "0.5 oz Rosemary simple syrup",
          "1 each Rosemary sprig & candied lemon"
        ],
        "method": [
          "Combine 2 oz bourbon with 1 oz lemon cream cordial in mixing glass.",
          "Add 0.5 oz dry vermouth and 0.5 oz rosemary syrup.",
          "Stir for 15 seconds with large ice cubes.",
          "Strain into chilled coupe.",
          "Garnish with a rosemary sprig and candied lemon wheel."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Aged Gouda",
        "desc": "A NorCal cheese board featuring aged gouda, gruyère, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Grounded Truth",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 6
          },
          {
            "oil": "Lemon",
            "drops": 3
          },
          {
            "oil": "Sage",
            "drops": 2
          },
          {
            "oil": "Lavender",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Sage"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Sage"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Forest Floor",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "moonlight": {
    "slug": "moonlight",
    "name": "Moonlight",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Soft gratitude in a settled body",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "grounded",
      "cozy"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 2.67,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.74,
        "ratio": 0.28
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.51,
        "ratio": 0.19
      },
      {
        "name": "Terpinolene",
        "pct": 0.38,
        "ratio": 0.14
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.24,
        "ratio": 0.09
      }
    ],
    "bpmRange": [
      74,
      97
    ],
    "musicEnergy": 0.38,
    "musicValence": 0.46,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 74,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 69,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 84,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Grateful Evening Exhale",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwZYknyiZS0iE"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Black Pepper",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Tea Tree",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "German Chamomile",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Bergamot",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#8EAE68",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "Twelve drops of lemongrass carry the dominant warmth through the room like a river through a Mendocino valley — steady, warm, the kind of current that does not hurry because it has already calculated the gradient and knows exactly when it will arrive. Moon Gazer Farms built this strain on the idea that the body can be grateful, that ease is not just the absence of tension but the active presence of something softer.\n\nBlack pepper adds ten drops of warm spice, the earthy warmth that makes the physical relaxation feel like a choice rather than a collapse — the difference between lying down and being laid down, between sinking and settling. Tea tree arrives with eight drops of the rare sharp clarity, the unusual molecule that gives Moonlight its distinctive edge, its watermelon candy note that emerges from chemistry rather than flavor and makes the whole blend slightly mysterious, slightly nocturnal.\n\nGerman chamomile provides six drops of the soft calming molecule, the soft cushion beneath everything else, the molecular equivalent of the mattress you do not notice because it is doing its job perfectly. And then bergamot at four drops, and the Earl Grey aroma clicks into place with such precision it feels like recognition rather than discovery: bergamot is Earl Grey, the essential oil that has always been the tea what it is, and here it is again, in a cannabis strain from Mendocino, proving that molecules are faithful regardless of address.\n\nTycho plays softly from a speaker balanced on a stack of books. The citrus zest quality lives in the bergamot, the grateful calm lives in the chamomile, and the the rare sharp clarity gives the whole blend its midnight quality — not dark, exactly, but lunar, reflective, the kind of light that shows things differently than daylight does, emphasizing texture over color, depth over detail.\n\nA woman sits by the window with an actual cup of Earl Grey, and the blend has turned the ordinary into ceremony without adding a single gesture or prop. The settled body is not tired. The calm is not emptiness. It is that rare neurological state where the system stops cataloging threats and starts cataloging gifts, and the five oils — lemongrass, pepper, tea tree, chamomile, bergamot — are the first entry on the list, and the tea is the second, and the window is the third, and the list continues softly into a night that has no agenda.",
    "tea": {
      "name": "Moonlight Tea",
      "description": "Soft bergamot and watermelon comfort brew",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "3-4 minutes (in stages)",
      "caffeine": "moderate (black tea and green tea",
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
      "method": [
        "Heat 8 oz filtered water to 190°F (88°C).",
        "Steep 1 Earl Grey tea bag and 1 green tea bag together for 3 minutes.",
        "Remove tea bags and stir in 0.5 oz fresh watermelon juice (or 0.5 tbsp dried watermelon pieces if available).",
        "Add 4-5 dried chamomile flowers and let steep for 1 more minute.",
        "Strain into a warm teacup.",
        "Stir in a tiny pinch of ground cinnamon and 0.25 oz honey or agave syrup.",
        "Garnish with a thin apple slice and chamomile flower."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Moonlight",
        "description": "Nighttime watermelon comfort",
        "glass": "rocks",
        "volume": "6 oz",
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
        "method": [
          "Fill a rocks glass with large ice cubes.",
          "In a mixing glass, combine 3 oz fresh watermelon juice and 0.5 oz fresh lemon juice.",
          "Add 1 oz chilled brewed Earl Grey tea (steeped, cooled) and 0.5 oz chamomile-green apple syrup.",
          "Stir in a tiny pinch of ground cinnamon.",
          "Stir gently with ice for 8 seconds.",
          "Strain into the rocks glass.",
          "Garnish with a thin watermelon wedge and an apple slice."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Moonlight",
        "description": "Cognac-infused watermelon and Earl Grey ease",
        "glass": "rocks",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "elegant",
        "spirit": "cognac",
        "abv": "15%",
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
        "method": [
          "Fill a rocks glass with large ice cubes.",
          "Pour 1.5 oz cognac into a mixing glass.",
          "Add 2.5 oz fresh watermelon juice, 0.5 oz fresh lemon juice, and 1 oz chilled brewed Earl Grey tea.",
          "Add 0.5 oz chamomile-green apple syrup and a tiny pinch of ground cinnamon.",
          "Stir with ice for 10 seconds.",
          "Strain into the rocks glass.",
          "Garnish with a thin watermelon wedge and candied apple slice."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Brie",
        "desc": "A NorCal cheese board featuring brie, camembert, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Gratitude Hour",
      "scent_notes": {
        "top": "lemongrass, black pepper",
        "heart": "bay laurel, clove bud",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 4
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Tea Tree",
            "drops": 3
          },
          {
            "oil": "German Chamomile",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Tea Tree"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Tea Tree"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Earl Grey Ember",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "mule-fuel": {
    "slug": "mule-fuel",
    "name": "Mule Fuel",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "LOW",
    "intent": "Gentle contentment settling toward rest",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "rest",
      "body"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 3.97,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 2.22,
        "ratio": 0.56
      },
      {
        "name": "α-Pinene",
        "pct": 0.54,
        "ratio": 0.14
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.34,
        "ratio": 0.09
      },
      {
        "name": "Limonene",
        "pct": 0.28,
        "ratio": 0.07
      }
    ],
    "bpmRange": [
      70,
      92
    ],
    "musicEnergy": 0.32,
    "musicValence": 0.41,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "acoustic folk",
      "post-rock"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Bon Iver"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 70,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 65,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 80,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Gentle Dissolve To Deep Rest",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwJAlwqZhgyQg"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 20,
        "pct": 50.0
      },
      {
        "oil": "Pine",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Black Pepper",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Lemon",
        "drops": 6,
        "pct": 15.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#8EAE68",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "Twenty drops of lemongrass, and the room goes horizontal. This is the highest sedating terpene load in the entire collection, and Alpenglow Farms' Humboldt sedative announces its presence with the confidence of someone who knows exactly how this evening ends: contentment first, then hunger, then the kind of sleep that does not remember falling asleep, only waking.\n\nPine needle oil provides eight drops of the sharpest clarity in the blend, a significant sharp evergreen counterpoint that Brian Eno would appreciate for its structural function rather than its beauty — it is the scaffolding that keeps the sedating quality from becoming formless, the awareness within the sedation, the lighthouse beam turning slowly in the fog to prove that solid things still exist.\n\nBlack pepper adds six drops of spiced warmth, the warm spice that makes the skunk-diesel-leather aroma feel like a worn leather jacket found in a closet rather than a chemical signature found in a laboratory. Lemon follows with six drops, and the citrus cuts through the heaviness with the precision of a single candle in a very dark room — not enough light to read by, but enough to know where the walls are.\n\nThe four oils are deliberately simple. No floral distractions, no herbal complexity, no seventh oil adding nuance to nuance. The most sedating strain in the collection deserves the most direct blend, the shortest distance between the diffuser and the nervous system's surrender. The math is honest: lemongrass does most of the work because sedating warmth does most of the work.\n\nA man opens the refrigerator and stands in its light, considering options with the careful attention that Mule Fuel applies to appetite. The happy-hungry-sleepy progression is not a sequence unfolding over hours but a simultaneous chord, three notes played at once that only make sense together. The lemon in the air catches the diesel quality of the flower's memory and softens it into something domestic and kind, and the pine keeps everything just sharp enough to enjoy the cold chicken and the leftover rice before the final descent.\n\nThe leather scent is not in any bottle on the shelf. It is what happens when the body gives up its resistance and the evening gives up its agenda, and the blend fills the space that both leave behind.",
    "tea": {
      "name": "Herb Quietude",
      "description": "Lemongrass and lemon tea with deep rosemary-bay calm.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Fresh lemongrass (bruised)",
        "1 leaf Bay leaf",
        "0.5 tsp Dried rosemary",
        "0.5 oz Fresh lemon juice"
      ],
      "method": [
        "Heat water to 185°F.",
        "Lightly bruise 1 tbsp fresh lemongrass and add to infuser.",
        "Add 1 bay leaf and 0.5 tsp dried rosemary.",
        "Steep for 5 minutes.",
        "Remove infuser, add 1 tsp honey and 0.5 oz fresh lemon juice, stir and serve with bay leaf."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Lemongrass Rest",
        "description": "Lemongrass and lemon with gentle leather-like rosemary earthiness.",
        "glass": "Highball",
        "volume": "~8 oz",
        "temp": "Chilled",
        "ingredients": [
          "2 oz Lemongrass-steeped water",
          "2 oz Fresh lemon juice",
          "0.75 oz Rosemary simple syrup",
          "2 oz Ginger ale",
          "1 each Lemongrass stalk & lemon wheel"
        ],
        "method": [
          "Steep 1 tbsp fresh lemongrass (bruised) in 2 oz hot water (150°F) for 5 minutes.",
          "Strain and cool.",
          "Combine lemongrass water with 2 oz fresh lemon juice in highball glass over ice.",
          "Add 0.75 oz rosemary simple syrup.",
          "Top with 2 oz ginger ale and garnish with lemongrass stalk and lemon wheel."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Dark Comfort",
        "description": "Dark rum's depth settles with lemongrass and diesel warmth.",
        "glass": "Rocks glass",
        "volume": "~5 oz",
        "temp": "Cold (around 45°F)",
        "style": "Classic/stirred",
        "spirit": "Dark rum (80 proof)",
        "abv": "~35%",
        "ingredients": [
          "2.5 oz Dark rum (infused)",
          "1 tbsp Fresh lemongrass (stir-infuse)",
          "0.5 oz Fresh lemon juice",
          "0.5 oz Rosemary-bay leaf syrup",
          "1 each Bay leaf & lemon peel"
        ],
        "method": [
          "Steep 1 tbsp fresh lemongrass (bruised) in 1 oz dark rum for 30 seconds, stirring constantly.",
          "Strain out lemongrass.",
          "Add 1.5 oz additional dark rum, 0.5 oz fresh lemon juice, and 0.5 oz rosemary-bay leaf syrup.",
          "Stir with large ice cubes for 15 seconds.",
          "Serve over one large ice cube and garnish with bay leaf and lemon peel."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Brie",
        "desc": "A NorCal cheese board featuring brie, camembert, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "Myrcene",
          "α-Pinene"
        ]
      }
    },
    "candle": {
      "name": "Leather & Lemon",
      "scent_notes": {
        "top": "lemongrass, pine needle",
        "heart": "bay laurel, fir balsam",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 6
          },
          {
            "oil": "Pine",
            "drops": 2
          },
          {
            "oil": "Black Pepper",
            "drops": 2
          },
          {
            "oil": "Lemon",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Pine",
          "Black Pepper"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Diesel Sage",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Pine",
          "part": "dried needles",
          "terpene_target": "α-Pinene"
        },
        {
          "plant": "Rosemary",
          "part": "dried sprigs",
          "terpene_target": "α-Pinene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "muir-woods",
          "location_name": "Muir Woods National Monument",
          "shared_terpenes": [
            "α-Pinene"
          ],
          "match_score": 0.95
        },
        {
          "location_id": "armstrong-redwoods",
          "location_name": "Armstrong Redwoods State Natural Reserve",
          "shared_terpenes": [
            "α-Pinene"
          ],
          "match_score": 0.92
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Mourvèdre",
          "winery": "Tablas Creek",
          "region": "Paso Robles",
          "terpene_bridge": "Garrigue wines carry pine-rosemary-thyme aromatics from Mediterranean scrubland — the same α-pinene-rich botanicals.",
          "tasting_note": "Wild herbs, dark berries, garrigue",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "Session IPA",
          "brewery": "Fieldwork Brewing",
          "region": "Berkeley",
          "hop_varietals": [
            "Centennial",
            "Chinook"
          ],
          "terpene_bridge": "Centennial and Chinook hops deliver significant pinene alongside their citrus character.",
          "tasting_note": "Pine, grapefruit, light body",
          "abv": "4.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "natty-bumppo": {
    "slug": "natty-bumppo",
    "name": "Natty Bumppo",
    "farm": "Moon Gazer Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Loose and easy, happily untethered",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "grounded",
      "social"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.86,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.63,
        "ratio": 0.34
      },
      {
        "name": "Limonene",
        "pct": 0.35,
        "ratio": 0.19
      },
      {
        "name": "α-Humulene",
        "pct": 0.25,
        "ratio": 0.13
      },
      {
        "name": "Myrcene",
        "pct": 0.19,
        "ratio": 0.1
      }
    ],
    "bpmRange": [
      80,
      105
    ],
    "musicEnergy": 0.49,
    "musicValence": 0.53,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 80,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 75,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 90,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Lazy Afternoon Vibes",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwTeBbEQPOa4D"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Lemon",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Sage",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Lemongrass",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Geranium",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#C8A97E",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "The screen door swings shut and nobody bothers to latch it. Out in Mendocino, where Moon Gazer Farms slopes toward the river through stands of tanoak and madrone, the afternoon has that particular looseness — the one where time stretches like taffy and nobody minds if the edges get uneven.\n\nBlack pepper warms the air first, the way a Khruangbin bassline enters before you realize the song has started. It is not sharp, not demanding. It simply arrives and takes its seat at the table. Lemon follows, bright as the sour plum note in the breeze, a citrus clarity that refuses to be serious about anything, refuses to organize the afternoon into tasks and outcomes.\n\nSage dries on the porch railing where someone hung it three days ago and forgot. The lemongrass bundles were cut this morning and left in a mason jar by the door, their grassy tropical sweetness filling the entryway like a welcome mat for the nose. Geranium petals scatter across a chipped ceramic plate on the kitchen counter, adding a fruitiness that lands somewhere between plum and wildflower — not quite either, but more interesting than both.\n\nA woman sits on the top step, barefoot, her heels dark with garden soil. She is reading a novel but mostly she is not. She is doing that rare thing — inhabiting her body without commentary, feeling her weight on the warm wood, feeling the musk of the hills settle around her shoulders like a shawl she did not ask for but will not take off.\n\nThe kerosene note is not in any bottle. It lives in the air itself, in the interaction between lemongrass and pepper when the temperature hits a certain point and the molecules decide to collaborate on something unnamed. The five oils braid together in the warm air: pepper's steadiness, lemon's play, sage's dry knowing, lemongrass's tropical drift, and geranium's soft fruit.\n\nSomewhere a dog barks once and decides against a second. The hills agree. Natty Bumppo has turned the afternoon into an open field where nothing needs to happen, and the woman on the porch has walked into the middle of it, barefoot and unhurried, and the field goes on in every direction.",
    "tea": {
      "name": "Natty Bumppo Tea",
      "description": "Frontier herbal blend with plum warmth",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "6 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 200°F (93°C).",
        "In a tea infuser, combine 1 tbsp dried plum pieces, 4-5 whole cardamom pods (cracked), 3-4 ginger slices, 1 small rosemary sprig, and 2-3 whole cloves.",
        "Steep for 6 minutes to extract the rustic, earthy character.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz vanilla extract and 0.25 oz honey.",
        "Garnish with a rosemary sprig and thin plum slice."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Natty Bumppo",
        "description": "Frontier easy with plum depth",
        "glass": "rocks",
        "volume": "6 oz",
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
        "method": [
          "Fill a rocks glass with large ice cubes.",
          "In a mixing glass, combine 2.5 oz fresh sour plum juice (or umeshu + water) and 0.5 oz fresh lemon juice.",
          "Add 0.5 oz cardamom-vanilla syrup (warm, musky) and 0.5 oz ginger beer.",
          "Stir in 2-3 dashes of aromatic bitters and a tiny pinch of ground hops (or substitute with a single hop flower for garnish aesthetic).",
          "Stir gently with ice for 8 seconds.",
          "Strain into the rocks glass.",
          "Garnish with a plum slice and a sprig of rosemary."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Natty Bumppo",
        "description": "Rye-spiked plum and woodsman warmth",
        "glass": "rocks",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "rustic frontier",
        "spirit": "rye whiskey",
        "abv": "17%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Aged Gouda",
        "desc": "A NorCal cheese board featuring aged gouda, gruyère, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Untethered Joy",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 5
          },
          {
            "oil": "Lemon",
            "drops": 3
          },
          {
            "oil": "Sage",
            "drops": 2
          },
          {
            "oil": "Lemongrass",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Sage"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Sage"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Loose Earth",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "peach-flambe": {
    "slug": "peach-flambe",
    "name": "Peach Flambé",
    "farm": "Terrapin Farms",
    "region": "Humboldt",
    "energy": "HIGH",
    "intent": "Sunny drive with bright momentum",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "euphoric"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.05,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.25,
        "ratio": 0.24
      },
      {
        "name": "Myrcene",
        "pct": 0.21,
        "ratio": 0.2
      },
      {
        "name": "Limonene",
        "pct": 0.2,
        "ratio": 0.19
      },
      {
        "name": "α-Humulene",
        "pct": 0.12,
        "ratio": 0.11
      }
    ],
    "bpmRange": [
      78,
      102
    ],
    "musicEnergy": 0.46,
    "musicValence": 0.51,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "ambient",
      "dub"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Bonobo"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 78,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 102,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 90,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Golden California Drive",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwXg5Nz3J9Deo"
    },
    "oilRecipe": [
      {
        "oil": "Bergamot",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Black Pepper",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Lemongrass",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Geranium",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Clove",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#C8A97E",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Bergamot and black pepper arrive together — ten drops each — like the opening bars of a Vulfpeck track that has no intention of being slow, no interest in building gradually, no patience for the kind of morning that takes two cups of coffee to begin. Terrapin Farms built this Humboldt strain for the days that need momentum from the first breath, and the oil blend matches that energy with citrus-spice precision.\n\nLemongrass adds eight drops of grassy warmth that keeps the brightness from becoming brittle, a muscular sweetness that turns the initial drive into sustainable force rather than a sprint that burns out by noon. Geranium follows with six drops, and the white peach aroma materializes in the overlap between bergamot's sophistication and geranium's rosy fruitiness — not quite citrus, not quite floral, but that exact space between where stone fruit lives its aromatic life.\n\nSage provides four drops of herbal earthiness grounding, the herbal seriousness that keeps the sunny quality from becoming merely cheerful, that insists motivation include direction rather than just velocity. Clove closes the blend with two drops of brown sugar warmth that rounds every edge without dulling a single one, the way a good drummer softens the attack of a snare without losing any of its crack.\n\nThis is the lowest-terpene strain in the collection at 1.05 percent, which means the blend does proportionally more of the work than usual. The six oils are not translating a heavy terpene load from flower to diffuser — they are building the environment from the ground up, creating what the flower whispers and the essential oils speak at full, confident volume.\n\nA cyclist clips in and pushes through the first pedal stroke on a road that climbs from the Humboldt flats toward the ridgeline. The cashew butter quality lives in the smooth way bergamot and geranium merge on the exhale, a creaminess that has no dairy origin but the brain accepts as richness. Peach Flambé is not complicated. It does not require interpretation or context or explanation. It is bright, it is moving, and the brown sugar warmth trailing at the edges of the clove is the promise that the effort will taste sweet — not at some distant finish line, but right now, in the middle of the climb.",
    "tea": {
      "name": "Peach Flambé Tea",
      "description": "Bergamot and peach comfort in a cup",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "3 minutes",
      "caffeine": "moderate (black tea",
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
      "method": [
        "Heat 8 oz filtered water to 200°F (93°C).",
        "Steep 1 black tea bag and 1 bergamot tea bag together for 3 minutes.",
        "Remove the tea bags and stir in 0.5 oz dried peach pieces (or 0.75 oz fresh peach puree).",
        "Add 0.25 oz demerara syrup and a pinch of ground cinnamon.",
        "Stir in 0.5 oz cashew milk or cream.",
        "Pour into a warm teacup and garnish with a cinnamon stick and thin peach slice."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Peach Flambé",
        "description": "Sunny white peach with warm spice",
        "glass": "coupe",
        "volume": "6 oz",
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
        "method": [
          "In a mixing glass, combine 2.5 oz fresh white peach puree (blended fresh peaches, strained).",
          "Add 0.5 oz fresh lemon juice and 0.5 oz bergamot-infused syrup.",
          "Pour in 0.75 oz cashew milk and stir until smooth.",
          "Add 0.25 oz demerara syrup for depth.",
          "Fill with ice and stir gently for 8 seconds.",
          "Strain into a coupe glass.",
          "Garnish with a cinnamon stick and a thin peach slice."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Peach Flambé",
        "description": "Bourbon-backed peach warmth",
        "glass": "coupe",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "fruit-forward spiced",
        "spirit": "bourbon",
        "abv": "18%",
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
        "method": [
          "Pour 1.75 oz bourbon into a mixing glass.",
          "Add 2 oz fresh white peach puree and 0.5 oz fresh lemon juice.",
          "Stir in 0.5 oz bergamot-infused syrup and 0.25 oz demerara syrup.",
          "Add 0.5 oz cashew milk to round out the texture.",
          "Fill with ice and stir for 10 seconds until chilled.",
          "Strain into a coupe glass.",
          "Ignite a cinnamon stick over the surface for 3 seconds (optional flambé), then garnish with the cinnamon stick and a grilled peach slice."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Gruyère",
        "desc": "Light and bright cheese plate with aged gouda, gruyère, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      }
    },
    "candle": {
      "name": "Golden Drive",
      "scent_notes": {
        "top": "black pepper, lemongrass",
        "heart": "clove bud, bay laurel",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Bergamot",
            "drops": 3
          },
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Lemongrass",
            "drops": 3
          },
          {
            "oil": "Geranium",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Bergamot",
          "Black Pepper",
          "Lemongrass"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Bergamot",
          "Black Pepper",
          "Lemongrass"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Peach Ember",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "pineapple-mojito": {
    "slug": "pineapple-mojito",
    "name": "Pineapple Mojito",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "MEDIUM",
    "intent": "Rooted ease with a quiet glow",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "grounded",
      "social",
      "cozy"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 2.55,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.63,
        "ratio": 0.25
      },
      {
        "name": "Limonene",
        "pct": 0.56,
        "ratio": 0.22
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.24,
        "ratio": 0.09
      },
      {
        "name": "α-Humulene",
        "pct": 0.19,
        "ratio": 0.07
      },
      {
        "name": "Linalool",
        "pct": 0.16,
        "ratio": 0.06
      },
      {
        "name": "α-Pinene",
        "pct": 0.14,
        "ratio": 0.05
      },
      {
        "name": "Myrcene",
        "pct": 0.11,
        "ratio": 0.04
      }
    ],
    "bpmRange": [
      79,
      104
    ],
    "musicEnergy": 0.47,
    "musicValence": 0.56,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "open",
        "minutes": 8,
        "bpm_target": 79,
        "mood": "easing in"
      },
      {
        "phase": "groove",
        "minutes": 12,
        "bpm_target": 91,
        "mood": "comfortable flow"
      },
      {
        "phase": "reflect",
        "minutes": 10,
        "bpm_target": 84,
        "mood": "gentle unwinding"
      }
    ],
    "spotify": null,
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Sweet Orange",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "German Chamomile",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Lavender",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Pine",
        "drops": 2,
        "pct": 5.0
      },
      {
        "oil": "Lemongrass",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 3200,
    "brightness": "moderate (45-60%)",
    "hueColor": "#C8A97E",
    "textures": [
      "leather",
      "canvas",
      "ceramic",
      "mixed wood"
    ],
    "spatialSetup": "Flexible seating, a mix of ambient and task lighting. Conversation-friendly arrangement.",
    "roomTemp": 70,
    "breathwork": {
      "protocol": "Balance Breath",
      "duration": 8,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 4,
        "hold_sec_2": 4,
        "cycles": 6
      },
      "target": "balanced",
      "guidance": "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner."
    },
    "narrative": "Black pepper opens with twelve drops of spiced warmth, and the room settles into that particular Mendocino groove that Higher Heights cultivates with the patience of someone who knows the difference between good and ready, between finished and complete. Sweet orange follows with ten drops, and the pineapple note appears not as tropical sweetness but as citrus intelligence — the smell of fruit that has read every book in the library and prefers the garden.\n\nGerman chamomile adds six drops of the soft calming molecule, the most underrated molecule in the collection, a skin-deep softness that Nils Frahm would recognize as the space between piano notes where the music actually lives. Sage provides four drops of herbal earthiness grounding, the herbal anchor that keeps the blend from drifting into mere pleasantness, and lavender matches it with four drops of floral softness that catch the mint-gas aroma and translate it into floral calm.\n\nThis is the seven-oil blend — the most complex recipe in the entire collection. Pine at two drops, lemongrass at two drops — supporting voices that deliver their lines with precision and step aside for the ensemble. The diversity is the point: Pineapple Mojito carries seven significant terpenes, and the blend mirrors that complexity with seven carefully proportioned oils that somehow produce simplicity rather than confusion.\n\nThe ginger note emerges from the interaction between pepper and chamomile, a warmth that no single oil possesses but their conversation creates — molecular hospitality, the fragrance equivalent of a room where strangers become friends before the first drink is finished. Somewhere Tycho is playing through a small speaker in the corner, and the rooted ease that defines this strain is exactly the sound of synthesizers layered so precisely they become landscape rather than music.\n\nA man sits at a kitchen table with a half-finished crossword and a quiet glow behind his eyes that his wife noticed twenty minutes ago but has chosen not to mention because mentioning it would be like pointing at a sunset — accurate but unnecessary. the blend is not dramatic. It is not trying to change the world or even the evening. It is trying to make the ordinary luminous, and the seven oils are doing their patient alchemical work, and the gas note in the air has softened into something closer to warmth, and the evening is just beginning to suggest that being grounded and being euphoric might be the same thing wearing different clothes.",
    "tea": {
      "name": "Pineapple Mojito Tea",
      "description": "Tropical pineapple-mint herbal blend",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4-5 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 165°F (74°C).",
        "In a tea infuser, combine 1 tbsp dried pineapple pieces, 8-10 dried mint leaves, 0.5 tbsp dried lime peel, 1 tsp dried ginger slices, and 4-5 dried chamomile flowers.",
        "Steep for 4-5 minutes to extract the tropical-herbal character gently.",
        "Strain into a warm teacup.",
        "Stir in 0.25 oz chamomile-infused syrup or honey.",
        "Garnish with a fresh mint sprig and thin pineapple slice."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Pineapple Mojito",
        "description": "Fresh pineapple mojito with grounded ease",
        "glass": "highball",
        "volume": "7 oz",
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
        "method": [
          "In a highball glass, muddle 8-10 fresh mint leaves gently to release aroma (do not bruise harshly).",
          "Add 0.5 oz fresh lime juice and 0.5 oz fresh lemon juice.",
          "Pour in 2.5 oz fresh pineapple juice.",
          "Add 0.75 oz ginger juice (fresh ginger pressed) and 0.25 oz chamomile-infused syrup.",
          "Fill the glass with crushed ice.",
          "Top with 2 oz sparkling water and stir gently.",
          "Garnish with a pineapple wedge, sprig of fresh mint, and a thin lime wheel."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Pineapple Mojito",
        "description": "",
        "glass": "highball",
        "volume": "7.5 oz",
        "temp": "chilled",
        "style": "tropical classic",
        "spirit": "white rum",
        "abv": "14%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Spiced Mixed Nuts with Sage & Brown Butter",
        "desc": "Local walnuts and pecans toasted in brown butter with crispy sage leaves and a whisper of cayenne.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Wild Mushroom Bruschetta",
        "desc": "Foraged chanterelles and maitake on grilled levain with shaved Bellwether Farms pecorino and truffle oil.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Heritage Pork Chop with Apple Mostarda",
        "desc": "Thick-cut Sonoma County pork with house-made apple mostarda, roasted brassicas, and pan jus.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Brown Butter Financier with Stone Fruit",
        "desc": "Warm almond cake with brown butter, topped with roasted seasonal stone fruit and vanilla bean ice cream.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Mixed Selection: Aged Gouda, Gruyère",
        "desc": "Balanced board with aged gouda, gruyère, quince paste, roasted grapes, and artisan crackers.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Quiet Glow",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Sweet Orange",
            "drops": 4
          },
          {
            "oil": "German Chamomile",
            "drops": 2
          },
          {
            "oil": "Sage",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "German Chamomile"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "German Chamomile"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Mint & Ember",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light as you transition between activities. The scent bridges one moment to the next with ease."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "year-round"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "pink-jesus-reserve": {
    "slug": "pink-jesus-reserve",
    "name": "Pink Jesus Reserve",
    "farm": "Sonoma Hills Farm",
    "region": "Sonoma",
    "energy": "HIGH",
    "intent": "Buoyant and warm, ready to share",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "social",
      "euphoric"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.89,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.78,
        "ratio": 0.41
      },
      {
        "name": "Myrcene",
        "pct": 0.38,
        "ratio": 0.2
      },
      {
        "name": "α-Humulene",
        "pct": 0.27,
        "ratio": 0.14
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.15,
        "ratio": 0.08
      }
    ],
    "bpmRange": [
      72,
      95
    ],
    "musicEnergy": 0.38,
    "musicValence": 0.43,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "ambient",
      "dub"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Bonobo"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 72,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 95,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 83,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Warm Gathering Grooves",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwRJwUJNtcq0J"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Lemongrass",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Lavender",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "German Chamomile",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Geranium",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#C8A97E",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Black pepper at fourteen drops, and the room fills with spiced warmth so generous it feels architectural — as if someone built a fireplace out of spice and lit it for the sole purpose of giving the evening a center to orbit. Sonoma Hills Farm grew this strain on ridges where the Pacific sends salt air through the Petaluma Gap, and the pepper carries that same open quality: warm without walls.\n\nLemongrass follows with eight drops, carrying the sedating quality that gives the euphoria its body, its weight, the physical sensation that joy is not just an idea but a location somewhere between the chest and the throat. Lavender at six drops captures the French lavender aroma directly — not the medicinal lavender of pharmacy shelves but the living plant in its natural habitat, purple and warm and slightly wild, blooming against a stone wall that has been warm all day.\n\nSage adds six drops of herbal earthiness depth, the earthy backbone that keeps the buoyancy from becoming frivolous, that insists uplift and substance can share a glass. German chamomile contributes four drops of the soft calming molecule, smoothing every transition between emotions the way Anderson .Paak smooths every transition between beats — with practiced ease that looks effortless but contains years of listening.\n\nGeranium closes with two drops, and the raspberry note appears like a surprise guest who turns out to be exactly the person the evening needed to become complete. The pineapple quality in the aroma finds itself in the bright edge where lemongrass meets lavender, a tropical-floral crossing that defies geography and rewards the nose for paying attention.\n\nThe living room is warm and the conversation has reached that golden altitude where everyone is saying what they mean and meaning is arriving with unusual clarity. Pink Jesus Reserve is not subtle about its mission. The six oils are the invitation, and the raspberry-lavender sweetness in the air is the sound of a room where nobody is pretending to be anyone other than who they actually are, and the warmth is not coming from the fireplace alone, and the evening is proving that sharing a space with the right people and the right scent can feel, genuinely and without exaggeration, like a kind of church.",
    "tea": {
      "name": "Lavender Dream",
      "description": "Floral lavender with berry warmth for uplifting serenity.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Dried lavender buds",
        "0.5 oz Dried raspberry leaf",
        "0.5 oz Fresh pineapple juice",
        "0.75 tsp Raw honey"
      ],
      "method": [
        "Heat water to 190°F.",
        "Add 1 tbsp dried lavender buds and 0.5 oz dried raspberry leaf to infuser.",
        "Steep for 4 minutes, stirring gently.",
        "Remove infuser and add 0.5 oz pineapple juice and 0.75 tsp honey.",
        "Stir and serve with a lavender flower."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Lavender Euphoria",
        "description": "Raspberry and lavender in perfect harmony with pineapple brightness.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Ice cold",
        "ingredients": [
          "1.5 oz Fresh raspberry puree",
          "1 oz Fresh pineapple juice",
          "0.5 oz Culinary lavender syrup",
          "1 ring Candied pineapple ring"
        ],
        "method": [
          "Add 1.5 oz fresh raspberry puree to shaker.",
          "Add 1 oz pineapple juice, 0.5 oz culinary lavender syrup, and ice.",
          "Shake for 8 seconds until frothy.",
          "Fine-strain into chilled coupe.",
          "Garnish with a candied pineapple ring and culinary lavender flower."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Lavender Lift",
        "description": "Gin's botanicals blend with raspberry and lavender into pure euphoria.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 40°F)",
        "style": "Botanical/stirred",
        "spirit": "London Dry Gin (47% ABV)",
        "abv": "~32%",
        "ingredients": [
          "1.5 oz London Dry gin",
          "1.25 oz Fresh raspberry puree",
          "0.5 oz Fresh pineapple juice",
          "0.5 oz Culinary lavender syrup",
          "1 each Candied pineapple & lavender"
        ],
        "method": [
          "Combine 1.5 oz London Dry gin with 1.25 oz fresh raspberry puree in mixing glass.",
          "Add 0.5 oz pineapple juice and 0.5 oz culinary lavender syrup.",
          "Stir with ice for 12 seconds.",
          "Strain into chilled coupe over a large clear ice cube.",
          "Garnish with candied pineapple ring and lavender flower."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Gruyère",
        "desc": "Light and bright cheese plate with aged gouda, gruyère, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Myrcene"
        ]
      }
    },
    "candle": {
      "name": "Raspberry Cathedral",
      "scent_notes": {
        "top": "black pepper, lemongrass",
        "heart": "clove bud, bay laurel",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 5
          },
          {
            "oil": "Lemongrass",
            "drops": 3
          },
          {
            "oil": "Lavender",
            "drops": 2
          },
          {
            "oil": "Sage",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Lemongrass",
          "Lavender"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Lemongrass",
          "Lavender"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Raspberry Altar",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "pink-rider": {
    "slug": "pink-rider",
    "name": "Pink Rider",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Vivid creative lift with social magnetism",
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
    "accentColor": "#6BAE8E",
    "vibeTags": [
      "creative",
      "social"
    ],
    "dominantTerpene": "Terpinolene",
    "totalTerpenes": 1.44,
    "terpeneProfile": [
      {
        "name": "Terpinolene",
        "pct": 0.38,
        "ratio": 0.26
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.22,
        "ratio": 0.15
      },
      {
        "name": "β-Ocimene",
        "pct": 0.2,
        "ratio": 0.14
      },
      {
        "name": "Limonene",
        "pct": 0.18,
        "ratio": 0.12
      }
    ],
    "bpmRange": [
      94,
      121
    ],
    "musicEnergy": 0.63,
    "musicValence": 0.67,
    "genres": [
      "psychedelic",
      "indie electronic",
      "synth pop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Tame Impala",
      "MGMT",
      "Washed Out",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 94,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 121,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 107,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Social Magnetism",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwSoERXS2piSg"
    },
    "oilRecipe": [
      {
        "oil": "Tea Tree",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Black Pepper",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Basil",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Lemon",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Lavender",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Geranium",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#6BAE8E",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Tea tree hits first — twelve drops of the rare sharp clarity, the rarest lead terpene in the entire collection. Higher Heights' Mendocino creative engine runs on an unusual fuel, and the oil blend respects that by opening with clarity rather than warmth, with sharp edges rather than soft ones, with the clean brightness of a morning that has no fog and no apology for the absence of fog.\n\nBlack pepper and basil arrive together at eight drops each, the warm spice and the bright herbal molecule building a foundation that MGMT would recognize: psychedelic enough to see colors that do not exist, grounded enough to paint with them on surfaces that do. Lemon adds six drops of the lemon bar aroma — not the bright citrus of a morning glass but the sweet-tart richness of a dessert that happens to be made of sunshine and butter and the kind of sugar that remembers being a cane in a warm field.\n\nLavender provides four drops of softness, the sugar cookie note that turns the creative lift from sharp and potentially overwhelming to inviting and sustainable — the difference between a spotlight and a lantern, between energy that burns and energy that glows. Geranium closes with two drops of pink grapefruit florality, and suddenly the name makes complete sense: pink is the color of this blend, the warm-cool hybrid that happens when citrus meets floral meets herbal in the proportions that only this specific strain demands.\n\nThe social magnetism is not a metaphor. Pink Rider does not make you creative in isolation — it makes you creative in company, the kind of person who says something unexpected and watches the room lean in rather than lean back, the kind of energy that treats other people's ideas as fuel rather than competition.\n\nA woman stands at a whiteboard covered in colored markers, and the six oils have turned the conference room into a studio. The clarity-driven clarity is the sharp line, the basil-the bright herbal molecule brightness is the color, the lemon-lavender sweetness is the reason everyone in the room wants to stay for another hour even though the meeting was scheduled to end twenty minutes ago.\n\nthe blend understands that the best ideas arrive when someone is vivid enough to catch them and generous enough to share them, and the pink grapefruit in the Mendocino air is the standing invitation to do both, and the whiteboard is filling up, and nobody is reaching for their phone.",
    "tea": {
      "name": "Pink Rider Tea",
      "description": "",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 185°F (85°C).",
        "In a tea infuser, combine 1 tsp dried pink grapefruit peel, 0.75 tsp dried lemon peel, 3-4 dried green apple pieces, 0.5 tsp dried basil, 0.25 tsp dried rosemary, and a tiny pinch of vanilla powder.",
        "Steep for 4 minutes to extract the bright citrus character.",
        "Strain into a warm teacup.",
        "Stir in 0.25 oz sugar syrup or honey and 0.1 oz vanilla extract.",
        "Garnish with a thin pink grapefruit wheel and lemon peel."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Pink Rider",
        "description": "Pink grapefruit with creative sugar sparkle",
        "glass": "coupe",
        "volume": "6 oz",
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
        "method": [
          "In a mixing glass, combine 2.75 oz fresh pink grapefruit juice and 0.75 oz fresh lemon juice.",
          "Add 0.5 oz lemon curd (or lemon curd syrup) for richness and vanilla sweetness.",
          "Stir in 0.5 oz green apple juice (pressed from fresh green apple) and 0.25 oz sugar syrup.",
          "Add 2-3 dashes of citrus bitters.",
          "Fill with ice and stir gently for 8 seconds.",
          "Strain into a coupe glass rimmed with powdered sugar and a light vanilla dust.",
          "Garnish with a thin pink grapefruit wheel and a lemon peel curl."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Pink Rider",
        "description": "Gin-spiked pink grapefruit with creative lift",
        "glass": "coupe",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "citrus aperitif",
        "spirit": "gin",
        "abv": "15%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Terpinolene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Terpinolene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Terpinolene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Terpinolene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Comté",
        "desc": "Light and bright cheese plate with gruyère, comté, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Terpinolene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Grapefruit Canvas",
      "scent_notes": {
        "top": "tea tree, black pepper",
        "heart": "marjoram, clove bud",
        "base": "amber"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Tea Tree",
            "drops": 4
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Basil",
            "drops": 3
          },
          {
            "oil": "Lemon",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Tea Tree",
          "Black Pepper",
          "Basil"
        ],
        "color": "teal",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Tea Tree",
          "Black Pepper",
          "Basil"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Grapefruit Sage",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Tea Tree",
          "part": "dried leaves",
          "terpene_target": "Terpinolene"
        },
        {
          "plant": "Marjoram",
          "part": "dried leaves",
          "terpene_target": "Terpinolene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "mount-sutro",
          "location_name": "Mount Sutro Open Space Reserve",
          "shared_terpenes": [
            "Terpinolene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "presidio",
          "location_name": "Presidio of San Francisco",
          "shared_terpenes": [
            "Terpinolene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Mount Sutro Open Space Reserve, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Albariño",
          "winery": "Bokisch Vineyards",
          "region": "Lodi",
          "terpene_bridge": "Albariño's crisp, aromatic profile with green apple and citrus notes mirrors terpinolene's bright, eclectic character.",
          "tasting_note": "Green apple, white flowers, saline",
          "serving_temp_f": 46,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Fresh Hop Pale Ale",
          "brewery": "Bear Republic",
          "region": "Cloverdale",
          "hop_varietals": [
            "Cascade",
            "Crystal"
          ],
          "terpene_bridge": "Fresh (wet) hops retain terpinolene that is typically lost in kilning — bridging the fresh-plant character of cannabis flower.",
          "tasting_note": "Grassy, floral, bright citrus",
          "abv": "5.3%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "pinnacle": {
    "slug": "pinnacle",
    "name": "Pinnacle",
    "farm": "Dos Rios Farms",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Deep surrender into velvet quiet",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "rest"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 3.35,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.61,
        "ratio": 0.18
      },
      {
        "name": "Limonene",
        "pct": 0.46,
        "ratio": 0.14
      },
      {
        "name": "α-Humulene",
        "pct": 0.19,
        "ratio": 0.06
      },
      {
        "name": "trans-β-Farnesene",
        "pct": 0.14,
        "ratio": 0.04
      }
    ],
    "bpmRange": [
      83,
      108
    ],
    "musicEnergy": 0.53,
    "musicValence": 0.58,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 83,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 78,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 93,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Total Surrender: A Slow Descent",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwOgG2zVmz91Z"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Sweet Orange",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Rosemary",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Ylang Ylang",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Clove",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#C8A97E",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "Black pepper begins with twelve drops, and then rosemary arrives with six more, and together they build a spice structure so dense and warm it could hold up a cathedral ceiling or, more practically, hold up a body that has decided it is done holding itself up. This is Dos Rios Farms' deepest Mendocino creation — the velvet quiet at the bottom of the well, the last color before dark — and the blend knows it.\n\nSweet orange adds ten drops of gentle citrus that catches the sweet cream aroma and turns it into something luminous, the way candlelight makes a room more beautiful not by adding brightness but by subtracting everything that is not essential. Sage follows with six drops of herbal earthiness, the earthy spice that makes the sedation feel ancient rather than chemical, a thousand-year-old recipe for surrender written in botanical ink.\n\nYlang ylang is the revelation — four drops of the only oil in the palette that carries significant the exotic molecule, the rare terpene that amplifies the blissful quality until it becomes not just an effect but the primary experience. Portishead would recognize this moment: the bass drop that changes the room's center of gravity from the head to the chest to somewhere below the chest where language has not mapped.\n\nClove adds the final two drops, and the nutmeg note in the aroma emerges from the interaction between clove's deep spice and ylang ylang's exotic sweetness, two oils from opposite ends of the aromatic spectrum meeting in the middle to produce something neither could produce alone. The fennel seeds quality is pure collaborative chemistry, what happens when the exotic molecule meets warm spice in heavy concentration and decides to blur every remaining edge.\n\nPinnacle does not negotiate. It does not offer options or present a menu of possible evenings. It offers surrender and it means it. A man lies on a couch with a blanket he does not remember pulling over himself, and the sweet cream in the air has become the entire atmosphere, and the velvet quiet is not the absence of sound but the presence of something deeper than sound, and the six oils are the last things he notices before noticing itself becomes gentle, then optional, then unnecessary, then beautiful in its departure.",
    "tea": {
      "name": "Nutmeg Dream",
      "description": "Warming fennel and nutmeg tea for deep rest.",
      "glass": "Teacup with saucer",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tsp Fennel seeds (toasted)",
        "1 piece Clove",
        "0.25 tsp Freshly grated nutmeg",
        "1 tsp Raw honey"
      ],
      "method": [
        "Heat water to 185°F.",
        "Toast 1 tsp fennel seeds and 1 clove together for 20 seconds.",
        "Add to infuser with 0.25 tsp freshly grated nutmeg.",
        "Steep for 5 minutes in 6 oz water.",
        "Remove infuser, stir in 1 tsp honey and 0.5 oz coconut cream, serve with nutmeg dust."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Velvet Descent",
        "description": "Coconut cream and nutmeg guide you into blissful surrender.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Warm (145°F)",
        "ingredients": [
          "2 oz Coconut cream (warmed)",
          "0.25 tsp Freshly grated nutmeg",
          "1 oz Vanilla oat milk",
          "0.5 oz Fennel seed tea (cooled)"
        ],
        "method": [
          "Heat 2 oz coconut cream gently (do not boil).",
          "Toast 0.25 tsp freshly grated nutmeg in small pot for 10 seconds.",
          "Whisk together coconut cream and nutmeg, remove from heat.",
          "Add 1 oz vanilla oat milk and 0.5 oz fennel seed tea (steeped).",
          "Pour into chilled coupe and float a small pinch of nutmeg on top."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Cognac Velvet",
        "description": "Cognac's richness deepens nutmeg and cream into sedative bliss.",
        "glass": "Snifter",
        "volume": "~4 oz",
        "temp": "Warm (140°F)",
        "style": "Warm/stirred",
        "spirit": "VS Cognac (40% ABV)",
        "abv": "~30%",
        "ingredients": [
          "1.5 oz VS Cognac (warmed)",
          "1.5 oz Coconut cream",
          "0.25 tsp Freshly grated nutmeg",
          "2-3 seeds Fennel seeds (toasted)"
        ],
        "method": [
          "Gently warm 1.5 oz VS cognac in a small saucepan (do not boil).",
          "Toast 0.25 tsp freshly grated nutmeg and 2-3 fennel seeds together for 15 seconds.",
          "Pour warm cognac into snifter.",
          "Whisk in 1.5 oz coconut cream carefully.",
          "Float spiced mixture on top and garnish with a nutmeg dusting."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Aged Gouda",
        "desc": "A NorCal cheese board featuring aged gouda, gruyère, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Velvet Surrender",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Sweet Orange",
            "drops": 4
          },
          {
            "oil": "Rosemary",
            "drops": 2
          },
          {
            "oil": "Sage",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "Rosemary"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "Rosemary"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Velvet Ash",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "purple-candy-cane": {
    "slug": "purple-candy-cane",
    "name": "Purple Candy Cane",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Vibrant and vocal, fully awake",
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
    "accentColor": "#8EAE68",
    "vibeTags": [
      "creative",
      "social"
    ],
    "dominantTerpene": "Myrcene",
    "totalTerpenes": 1.55,
    "terpeneProfile": [
      {
        "name": "Myrcene",
        "pct": 0.54,
        "ratio": 0.35
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.31,
        "ratio": 0.2
      },
      {
        "name": "α-Pinene",
        "pct": 0.2,
        "ratio": 0.13
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 0.08
      }
    ],
    "bpmRange": [
      72,
      94
    ],
    "musicEnergy": 0.35,
    "musicValence": 0.41,
    "genres": [
      "ambient",
      "dub",
      "lo-fi hip hop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Bonobo",
      "Thievery Corporation",
      "Nujabes",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 72,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 94,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 83,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Vibrant Vocal Energy",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwUIPTsUFG0FN"
    },
    "oilRecipe": [
      {
        "oil": "Lemongrass",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Black Pepper",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Sweet Orange",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "Pine",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Peppermint",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Sage",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#8EAE68",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "The lemongrass comes first, twelve drops of grassy sweetness carrying the mango note that gives Greenshock Farms' most energizing Mendocino strain its tropical opening movement. This is not the sleepy heaviness of nighttime preparations — this is grassy sweetness in its morning suit, bright-eyed and sociable, ready to talk, ready to listen, ready to do both simultaneously.\n\nSweet orange and black pepper arrive together, eight drops each, like Vulfpeck's rhythm section locking into a groove that makes sitting still feel like a waste of a perfectly good body. The orange blossom aroma blooms from the sweet orange oil in real time, and the spiced warmth from the pepper gives every sentence that follows a spine, a posture, a reason to stand up straight.\n\nPine adds six drops of clarity to the blend — the kind that makes ideas sharper and words easier to find, the kind that turns the tip of the tongue into a reliable address rather than a temporary holding facility. Peppermint follows with four drops of cool precision that matches the peppermint candy aroma note so exactly it feels engineered rather than botanical, as if the strain and the oil were designed in the same laboratory by someone who understood that accuracy is its own form of beauty.\n\nTwo drops of sage anchor everything in earth. Not enough to slow the momentum, not nearly enough to suggest rest — just enough to keep the energy from floating into aimless, decorative chatter. Purple Candy Cane knows the difference between vibrant and scattered, between vocal and noisy, between fully awake and merely caffeinated.\n\nThe kitchen is full of people this morning. Someone is telling a story that keeps getting interrupted by better stories, and nobody minds because the interruptions are the point, the stories are the point, the overlapping voices are the proof that the room has reached that temperature where formality melts and what remains is genuine exchange.\n\nThe six oils have turned the morning into an open floor, and every voice in the room has found its register — confident, warm, precise — and the mango sweetness in the air is the standing invitation to say whatever you have been meaning to say, only louder, only brighter, only now while the peppermint is still cool on the inhale.",
    "tea": {
      "name": "Purple Candy Cane Tea",
      "description": "Tropical mint with orange blossom comfort",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "minimal (herbal blend)",
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
      "method": [
        "Heat 8 oz filtered water to 160°F (71°C).",
        "In a tea infuser, combine 1 tbsp dried mango pieces, 6-8 dried mint leaves, 1 tsp dried orange peel, and 0.5 tsp orange blossom petals (or 0.25 tsp orange blossom concentrate).",
        "Steep for 4 minutes to allow the tropical notes to infuse gently.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz coconut cream and a tiny pinch of ground cinnamon.",
        "Garnish with a fresh mint sprig and thin orange wheel."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Purple Candy Cane",
        "description": "Tropical candy shop in a glass",
        "glass": "tiki",
        "volume": "7 oz",
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
        "method": [
          "Fill a tiki glass with crushed ice.",
          "In a blender, combine 2 oz fresh mango puree, 0.75 oz fresh orange juice, and 6-8 fresh mint leaves.",
          "Add 0.5 oz orange blossom water and 0.75 oz coconut cream.",
          "Blend for 8 seconds until smooth and frothy.",
          "Pour into the tiki glass.",
          "Garnish with a mango slice, a candied orange wheel, a cinnamon stick, and a fresh mint sprig."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Purple Candy Cane",
        "description": "Rum-spiked mango mint tropical vibrancy",
        "glass": "tiki",
        "volume": "7.5 oz",
        "temp": "chilled",
        "style": "tropical fruity",
        "spirit": "white rum",
        "abv": "15%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Camembert",
        "desc": "Light and bright cheese plate with brie, camembert, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "Myrcene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Candy Voltage",
      "scent_notes": {
        "top": "lemongrass, black pepper",
        "heart": "bay laurel, clove bud",
        "base": "vetiver"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Lemongrass",
            "drops": 4
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Sweet Orange",
            "drops": 3
          },
          {
            "oil": "Pine",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Sweet Orange"
        ],
        "color": "forest green",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Lemongrass",
          "Black Pepper",
          "Sweet Orange"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Mango Spark",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Bay Laurel",
          "part": "dried leaves",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Lemongrass",
          "part": "dried stalks",
          "terpene_target": "Myrcene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "pomo-canyon",
          "location_name": "Pomo Canyon Trail",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "grove-old-trees",
          "location_name": "Grove of Old Trees",
          "shared_terpenes": [
            "Myrcene",
            "α-Pinene"
          ],
          "match_score": 0.88
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at Pomo Canyon Trail, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Petite Sirah",
          "winery": "Stags' Leap Winery",
          "region": "Napa Valley",
          "terpene_bridge": "Petite Sirah's dense, jammy character mirrors myrcene's heavy, sedating quality — both deliver weight and body.",
          "tasting_note": "Blackberry, dark chocolate, dense tannins",
          "serving_temp_f": 64,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "West Coast IPA",
          "brewery": "Russian River Brewing",
          "region": "Santa Rosa",
          "hop_varietals": [
            "Citra",
            "Simcoe"
          ],
          "terpene_bridge": "Citra and Simcoe hops are myrcene-dominant — cannabis and hops are Cannabaceae cousins sharing the same terpene synthesis pathways.",
          "tasting_note": "Tropical citrus, pine resin, clean bitter finish",
          "abv": "7.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "rasta-governmint": {
    "slug": "rasta-governmint",
    "name": "Rasta Governmint",
    "farm": "Higher Heights",
    "region": "Mendocino",
    "energy": "LOW",
    "intent": "Profound ease with cushioned edges",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "grounded",
      "rest",
      "body"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.92,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.6,
        "ratio": 0.31
      },
      {
        "name": "Limonene",
        "pct": 0.39,
        "ratio": 0.2
      },
      {
        "name": "α-Humulene",
        "pct": 0.17,
        "ratio": 0.09
      },
      {
        "name": "Myrcene",
        "pct": 0.16,
        "ratio": 0.08
      }
    ],
    "bpmRange": [
      81,
      107
    ],
    "musicEnergy": 0.51,
    "musicValence": 0.55,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "settle",
        "minutes": 10,
        "bpm_target": 81,
        "mood": "gentle descent"
      },
      {
        "phase": "immerse",
        "minutes": 15,
        "bpm_target": 76,
        "mood": "deep stillness"
      },
      {
        "phase": "emerge",
        "minutes": 5,
        "bpm_target": 91,
        "mood": "soft return"
      }
    ],
    "spotify": {
      "title": "Velvet Cushioned Euphoria",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwJ4IIdKxJUvk"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Lemon",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Rosemary",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Geranium",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 2400,
    "brightness": "dim (20-30%)",
    "hueColor": "#C8A97E",
    "textures": [
      "linen",
      "wool",
      "velvet",
      "warm wood"
    ],
    "spatialSetup": "Low seating, soft throws, candles at eye level. Minimize overhead lighting.",
    "roomTemp": 68,
    "breathwork": {
      "protocol": "Descent Breath",
      "duration": 10,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 8,
        "cycles": 8
      },
      "target": "parasympathetic",
      "guidance": "Close your eyes. Breathe in through the nose for four counts, letting the scent fill your lungs. Hold gently for four. Release slowly through the mouth for eight counts, feeling gravity pull you deeper into your seat with each exhale."
    },
    "narrative": "The frankincense arrives before anything else — not from a church censer but from the rosemary sprigs left smoldering in a clay dish by the window. In Mendocino, Higher Heights sits above the fog line where the redwoods thin into manzanita, and tonight the resin quality is unmistakable, an ancient sweetness that turns the small living room into something between a chapel and a den.\n\nBlack pepper grounds the room in warmth, its drops working like a hearth fire that nobody needs to tend. Lemon lifts the sour cherry note into something translucent, a citrus brightness that catches the light from a single beeswax candle set in a brass holder older than anyone in the house. Sage dries the edges of the air, adding an oak-barrel quality that makes the whole space feel aged and earned, like a leather chair that has held a thousand conversations.\n\nGeranium does the quiet work of the blend. Its floral fruitiness does not announce itself — it simply shows up in the exhale, the way Kamasi Washington's saxophone enters a groove so naturally you wonder if it was always there, if the music was simply waiting for the right instrument to notice its own shape.\n\nA man sits in a wingback chair, his hands resting on the armrests like a king who has nothing left to prove and no kingdom left to defend. The ease is not lazy. It is the kind that comes after years of effort have finally earned someone the right to be still without apology. Rasta Governmint understands this — the cushioned edges, the surrender that is not defeat but arrival at a destination so comfortable the journey dissolves behind you.\n\nThe five oils have been working for twenty minutes now, and the room has changed its personality. The walls are softer. The silence is fuller, more textured, holding more information than it did before the diffuser started. Even the sour cherry in the air has deepened into something resembling gratitude — not the performative kind, but the kind that sits in the chest and asks for nothing in return. The fire does not need another log. The rosemary does not need another match.",
    "tea": {
      "name": "Rasta Governmint Tea",
      "description": "Spiced cherry and vanilla rest",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "6 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 200°F (93°C).",
        "In a tea infuser, combine 1 tbsp dried tart cherry pieces, 4-5 whole cloves, 3-4 whole allspice berries, and 1 cardamom pod (cracked).",
        "Steep for 6 minutes to extract the full spiced character.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz vanilla extract and a pinch of ground cardamom.",
        "Add 0.5 oz warm cream or milk.",
        "Garnish with a cinnamon stick and a whole clove on top."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Rasta Governmint",
        "description": "Caribbean ease with profound spice",
        "glass": "rocks",
        "volume": "6 oz",
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
        "method": [
          "Fill a rocks glass with large ice cubes.",
          "In a mixing glass, combine 3 oz fresh tart cherry juice and 0.5 oz fresh lime juice.",
          "Add 0.5 oz cardamom-infused syrup (warm, resinous) and 0.25 oz vanilla extract.",
          "Stir in 2-3 dashes of oak-aged bitters.",
          "Add a pinch each of ground cloves and allspice.",
          "Stir gently with ice for 8 seconds.",
          "Strain into the rocks glass and garnish with a fresh cherry and a cinnamon stick."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Rasta Governmint",
        "description": "Aged rum with Caribbean comfort spices",
        "glass": "rocks",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "Caribbean",
        "spirit": "aged rum",
        "abv": "17%",
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
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Warm Marcona Almonds with Rosemary & Sea Salt",
        "desc": "Toasted almonds tossed in local olive oil with fresh rosemary and flaky Maldon salt. The warmth releases aromatic oils.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Burrata with Roasted Stone Fruit & Honey",
        "desc": "Creamy burrata from Petaluma split open over roasted seasonal fruit, drizzled with local wildflower honey and cracked pepper.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Braised Short Ribs with Root Vegetables",
        "desc": "Grass-fed short ribs slow-braised in Sonoma red wine with turnips, carrots, and fresh thyme from the garden.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Dark Chocolate Pot de Crème",
        "desc": "Bittersweet Guittard chocolate custard with fleur de sel and a dollop of crème fraîche.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Aged Selection: Aged Gouda",
        "desc": "A NorCal cheese board featuring aged gouda, gruyère, paired with honeycomb, dried figs, and walnut bread.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Cushioned Ease",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 5
          },
          {
            "oil": "Lemon",
            "drops": 3
          },
          {
            "oil": "Rosemary",
            "drops": 2
          },
          {
            "oil": "Sage",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Rosemary"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Lemon",
          "Rosemary"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Sacred Resin",
      "format": "cone",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light before settling into stillness. Let the smoke trace the room's edges as you breathe deeply and release the day."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "fall/winter"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "satsuma-sherbet": {
    "slug": "satsuma-sherbet",
    "name": "Satsuma Sherbet",
    "farm": "Alpenglow Farms",
    "region": "Humboldt",
    "energy": "MEDIUM",
    "intent": "Quiet ease with thoughtful undertones",
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
    "accentColor": "#D4C85C",
    "vibeTags": [
      "cozy"
    ],
    "dominantTerpene": "Limonene",
    "totalTerpenes": 1.85,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.55,
        "ratio": 0.3
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.45,
        "ratio": 0.24
      },
      {
        "name": "α-Humulene",
        "pct": 0.13,
        "ratio": 0.07
      },
      {
        "name": "Myrcene",
        "pct": 0.11,
        "ratio": 0.06
      }
    ],
    "bpmRange": [
      84,
      111
    ],
    "musicEnergy": 0.55,
    "musicValence": 0.6,
    "genres": [
      "funk",
      "soul",
      "pop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Anderson .Paak",
      "Vulfpeck",
      "Lizzo",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "open",
        "minutes": 8,
        "bpm_target": 84,
        "mood": "easing in"
      },
      {
        "phase": "groove",
        "minutes": 12,
        "bpm_target": 97,
        "mood": "comfortable flow"
      },
      {
        "phase": "reflect",
        "minutes": 10,
        "bpm_target": 89,
        "mood": "gentle unwinding"
      }
    ],
    "spotify": {
      "title": "Quietly Grateful Contemplation",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwWid1rBsRkVP"
    },
    "oilRecipe": [
      {
        "oil": "Sweet Orange",
        "drops": 16,
        "pct": 40.0
      },
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Lemongrass",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Peppermint",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 3200,
    "brightness": "moderate (45-60%)",
    "hueColor": "#D4C85C",
    "textures": [
      "leather",
      "canvas",
      "ceramic",
      "mixed wood"
    ],
    "spatialSetup": "Flexible seating, a mix of ambient and task lighting. Conversation-friendly arrangement.",
    "roomTemp": 70,
    "breathwork": {
      "protocol": "Balance Breath",
      "duration": 8,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 4,
        "hold_sec_2": 4,
        "cycles": 6
      },
      "target": "balanced",
      "guidance": "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner."
    },
    "narrative": "Sweet orange fills the room like afternoon light through a mandarin-colored curtain — sixteen drops painting the air in citrus warmth that has weight to it, substance, the particular sweetness of a fruit that ripened slowly on a Humboldt branch while Alpenglow Farms waited with the patience of people who understand that the best things arrive on their own schedule.\n\nBlack pepper grounds the sweetness with twelve drops of quiet authority. This is not the sharp pepper of urgency but the round warmth of contemplation, the way Chet Baker played trumpet — economical, unhurried, every note exactly where it belongs because he tried it everywhere else first and this is where it landed.\n\nSage adds its dry herbal whisper, four drops that pull the mind toward something deeper without forcing the descent. Not meditation exactly, but the neighborhood where meditation lives — the block where thoughts walk more slowly and notice the architecture. Lemongrass matches it with another four drops of grassy green that keeps the sedating quality subtle, a background hum beneath the citrus curtain.\n\nPeppermint is the surprise in the blend — four drops of cool clarity that mirrors the mint aroma note and turns the whole experience from a warm bath into something more awake, more present. Not alert in the way that coffee is alert. Contemplative in the way that a window is contemplative when you sit beside it long enough to notice what the light is doing.\n\nA woman sits by the window with a mochi dessert going soft on a ceramic plate beside a cup of tea she forgot to drink. Satsuma Sherbet asked her one question without using words: what if comfort did not require unconsciousness? What if happiness and thoughtfulness could share a room without one asking the other to leave?\n\nThe mandarin orange in the air keeps answering, keeps saying yes, the sherbet can be both sweet and sharp, the afternoon can be both easy and interesting. The five oils — orange, pepper, sage, lemongrass, peppermint — are doing the quiet chemistry of balance, and the mochi is getting softer, and the woman has not moved in twenty minutes, and she is neither asleep nor bored, and that is the entire point of everything happening in this room.",
    "tea": {
      "name": "Satsuma Sherbet Tea",
      "description": "Herbal mandarin blend for quiet contemplation",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "minimal (chamomile-based)",
      "ingredients": [
        "8 oz filtered water",
        "1 tsp dried chamomile",
        "3-4 dried mint leaves",
        "2-3 strips fresh satsuma peel (dried)",
        "0.5 oz rice milk",
        "pinch of ground cinnamon",
        "candied mandarin wheel (garnish)"
      ],
      "method": [
        "Heat 8 oz filtered water to 160°F (70°C).",
        "In a tea infuser, combine 1 tsp dried chamomile, 3-4 dried mint leaves, and 2-3 satsuma peel strips.",
        "Steep for 4 minutes, allowing the delicate herbs to release their essences gently.",
        "Strain into a warm teacup.",
        "Stir in 0.5 oz rice milk and a pinch of ground cinnamon.",
        "Float a thin candied mandarin wheel on top.",
        "Serve warm, sipping slowly for maximum comfort."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Satsuma Sherbet",
        "description": "Japanese mandarin comfort in a glass",
        "glass": "coupe",
        "volume": "6 oz",
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
        "method": [
          "Juice 3 fresh satsuma mandarins (about 3 oz) into a cocktail shaker.",
          "Add 0.5 oz fresh lemon juice and 0.75 oz rice milk to the shaker.",
          "Add 0.5 oz coconut cream and 2-3 fresh mint leaves, gently bruised.",
          "Fill shaker with ice and shake vigorously for 10 seconds until creamy.",
          "Strain into a chilled coupe glass.",
          "Dust lightly with ground cinnamon and garnish with a candied mandarin wheel and mint sprig."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Satsuma Sherbet",
        "description": "Sake-spiked mandarin softness",
        "glass": "coupe",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "creamy citrus",
        "spirit": "sake",
        "abv": "12%",
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
        "method": [
          "Pour 1.5 oz premium sake into a cocktail shaker.",
          "Add 2.5 oz fresh satsuma juice and 0.5 oz fresh lemon juice.",
          "Pour in 0.75 oz coconut cream and 0.5 oz rice milk.",
          "Add 2 fresh mint leaves and fill with ice.",
          "Shake for 12 seconds until silky and chilled.",
          "Strain into a coupe glass over fresh ice.",
          "Garnish with a candied mandarin wheel and a cinnamon stick."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Spiced Mixed Nuts with Sage & Brown Butter",
        "desc": "Local walnuts and pecans toasted in brown butter with crispy sage leaves and a whisper of cayenne.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Wild Mushroom Bruschetta",
        "desc": "Foraged chanterelles and maitake on grilled levain with shaved Bellwether Farms pecorino and truffle oil.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Heritage Pork Chop with Apple Mostarda",
        "desc": "Thick-cut Sonoma County pork with house-made apple mostarda, roasted brassicas, and pan jus.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Brown Butter Financier with Stone Fruit",
        "desc": "Warm almond cake with brown butter, topped with roasted seasonal stone fruit and vanilla bean ice cream.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Mixed Selection: Chèvre, Burrata",
        "desc": "Balanced board with chèvre, burrata, quince paste, roasted grapes, and artisan crackers.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Mandarin Twilight",
      "scent_notes": {
        "top": "bergamot, black pepper",
        "heart": "neroli, clove bud",
        "base": "cedarwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Sweet Orange",
            "drops": 6
          },
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Sage",
            "drops": 1
          },
          {
            "oil": "Lemongrass",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Sweet Orange",
          "Black Pepper",
          "Sage"
        ],
        "color": "sunny yellow",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Sweet Orange",
          "Black Pepper",
          "Sage"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Citrus Temple",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light as you transition between activities. The scent bridges one moment to the next with ease."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Citrus Collection, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "year-round"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "strawberry-biscotti": {
    "slug": "strawberry-biscotti",
    "name": "Strawberry Biscotti",
    "farm": "Happy Day Farms",
    "region": "Mendocino",
    "energy": "MEDIUM",
    "intent": "Cozy anchor with a curious mind",
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
    "accentColor": "#D4C85C",
    "vibeTags": [
      "cozy"
    ],
    "dominantTerpene": "Limonene",
    "totalTerpenes": 1.48,
    "terpeneProfile": [
      {
        "name": "Limonene",
        "pct": 0.38,
        "ratio": 0.26
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.29,
        "ratio": 0.2
      },
      {
        "name": "Myrcene",
        "pct": 0.25,
        "ratio": 0.17
      },
      {
        "name": "α-Bisabolol",
        "pct": 0.13,
        "ratio": 0.09
      }
    ],
    "bpmRange": [
      78,
      103
    ],
    "musicEnergy": 0.46,
    "musicValence": 0.56,
    "genres": [
      "funk",
      "soul",
      "pop",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Anderson .Paak",
      "Vulfpeck",
      "Lizzo",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "open",
        "minutes": 8,
        "bpm_target": 78,
        "mood": "easing in"
      },
      {
        "phase": "groove",
        "minutes": 12,
        "bpm_target": 90,
        "mood": "comfortable flow"
      },
      {
        "phase": "reflect",
        "minutes": 10,
        "bpm_target": 83,
        "mood": "gentle unwinding"
      }
    ],
    "spotify": {
      "title": "Cozy Intellectual Escape",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwVceLoZOhfv0"
    },
    "oilRecipe": [
      {
        "oil": "Bergamot",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Black Pepper",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Lemongrass",
        "drops": 8,
        "pct": 20.0
      },
      {
        "oil": "German Chamomile",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Clove",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 3200,
    "brightness": "moderate (45-60%)",
    "hueColor": "#D4C85C",
    "textures": [
      "leather",
      "canvas",
      "ceramic",
      "mixed wood"
    ],
    "spatialSetup": "Flexible seating, a mix of ambient and task lighting. Conversation-friendly arrangement.",
    "roomTemp": 70,
    "breathwork": {
      "protocol": "Balance Breath",
      "duration": 8,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 4,
        "exhale_sec": 4,
        "hold_sec_2": 4,
        "cycles": 6
      },
      "target": "balanced",
      "guidance": "Find a comfortable seat. Inhale through the nose for four counts. Hold for four. Exhale through the mouth for four. Hold empty for four. Each cycle is a complete square. Let the scent anchor each corner."
    },
    "narrative": "Bergamot leads with fourteen drops and suddenly the room smells like a bakery that moonlights as a library — warm, complex, the scent of pages and pastry sharing an afternoon. This is Happy Day Farms' most comforting Mendocino creation, and the sophisticated citrus of bergamot — not bright like lemon, not sweet like orange, but something closer to the first sip of Earl Grey in a warm cup on a cold morning — catches the sour strawberry candy note and holds it gently, the way you hold a conversation you don't want to end.\n\nBlack pepper adds ten drops of spiced warmth, the steady heat of a wood-fired oven still cooling at the end of the day, still radiating into the room long after the bread has been pulled and set on the counter to rest. Lemongrass brings eight drops of grassy warmth, and the kettle corn aroma suddenly makes sense: it is the grassy sweetness meeting the warm spice, creating that buttery caramel quality that no single oil can produce alone, only the collaboration between oils, only the willingness to let molecules finish each other's sentences.\n\nGerman chamomile at six drops provides the the soft calming molecule, a cushioning effect that Chet Baker achieved with silence — the pauses between trumpet notes that make the notes matter more, the space that turns playing into music and scent into atmosphere. Clove closes the blend with two drops of concentrated warmth, a direct echo of the cinnamon quality that Strawberry Biscotti's aroma implies but the oils deliver through clove's deeper, more resonant register.\n\nThe fuel note is not in any bottle on the shelf. It is the background hum of terpene interaction, the evidence that these molecules were built for each other across botanical kingdoms and have been waiting, in their separate plants, for someone to introduce them.\n\nA woman opens a cookbook, then closes it. The appetite is not for recipes but for the feeling of being fed, the curious satisfaction that comes from a warm kitchen and a wandering mind and the absolute absence of urgency. the blend asked one question and the cozy anchor answered: you do not need to go anywhere to arrive somewhere interesting. The bergamot and the clove both agree, and the kettle corn sweetness in the air is the period at the end of the sentence, and the sentence says stay.",
    "tea": {
      "name": "Kettle Corn Serenity",
      "description": "Chamberlain tea with strawberry warmth and cinnamon depth.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Dried strawberry pieces",
        "1 stick Cinnamon stick (broken)",
        "0.5 tsp Vanilla extract",
        "0.75 tsp Raw honey"
      ],
      "method": [
        "Heat water to 190°F.",
        "Add 1 tbsp dried strawberry pieces and 1 cinnamon stick (broken) to infuser.",
        "Steep for 4 minutes, stirring gently.",
        "Remove infuser and add 0.5 tsp vanilla extract and 0.75 tsp honey.",
        "Stir and serve with a cinnamon stick."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Curious Cozy",
        "description": "",
        "glass": "Rocks",
        "volume": "~5 oz",
        "temp": "Chilled",
        "ingredients": [
          "4-5 berries Fresh strawberries (muddled)",
          "1 oz Bergamot tea (cooled)",
          "0.75 oz Vanilla syrup",
          "1 stick Cinnamon stick (garnish)"
        ],
        "method": [
          "Muddle 4-5 fresh strawberries (hulled) gently in shaker.",
          "Add 1 oz bergamot tea (cooled), 0.75 oz vanilla syrup, and ice.",
          "Shake for 8 seconds.",
          "Strain into rocks glass over large ice cube.",
          "Garnish with a cinnamon stick and strawberry slice."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Biscotti Bliss",
        "description": "Bourbon and strawberry with subtle clove warmth.",
        "glass": "Coupe",
        "volume": "~5.5 oz",
        "temp": "Cold (around 43°F)",
        "style": "Classic/stirred",
        "spirit": "Bourbon (100 proof)",
        "abv": "~34%",
        "ingredients": [
          "5 berries Fresh strawberries (muddled)",
          "1.5 oz Bourbon",
          "0.5 oz Clove-cinnamon syrup",
          "0.25 oz Dry vermouth",
          "1 berry Fresh strawberry & cinnamon rim"
        ],
        "method": [
          "Muddle 5 fresh strawberries in mixing glass.",
          "Add 1.5 oz bourbon, 0.5 oz clove-cinnamon syrup, and 0.25 oz dry vermouth.",
          "Stir with ice for 12 seconds.",
          "Fine-strain into chilled coupe.",
          "Garnish with a fresh strawberry and cinnamon-dusted rim."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Spiced Mixed Nuts with Sage & Brown Butter",
        "desc": "Local walnuts and pecans toasted in brown butter with crispy sage leaves and a whisper of cayenne.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Wild Mushroom Bruschetta",
        "desc": "Foraged chanterelles and maitake on grilled levain with shaved Bellwether Farms pecorino and truffle oil.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Heritage Pork Chop with Apple Mostarda",
        "desc": "Thick-cut Sonoma County pork with house-made apple mostarda, roasted brassicas, and pan jus.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Brown Butter Financier with Stone Fruit",
        "desc": "Warm almond cake with brown butter, topped with roasted seasonal stone fruit and vanilla bean ice cream.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Mixed Selection: Chèvre, Burrata",
        "desc": "Balanced board with chèvre, burrata, quince paste, roasted grapes, and artisan crackers.",
        "key_terpenes": [
          "Limonene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Warm Curiosity",
      "scent_notes": {
        "top": "bergamot, black pepper",
        "heart": "neroli, clove bud",
        "base": "cedarwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Bergamot",
            "drops": 4
          },
          {
            "oil": "Black Pepper",
            "drops": 3
          },
          {
            "oil": "Lemongrass",
            "drops": 3
          },
          {
            "oil": "German Chamomile",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Bergamot",
          "Black Pepper",
          "Lemongrass"
        ],
        "color": "sunny yellow",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Bergamot",
          "Black Pepper",
          "Lemongrass"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Kettle Smoke",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light as you transition between activities. The scent bridges one moment to the next with ease."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Citrus Collection, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "year-round"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "tropical-sleigh-ride": {
    "slug": "tropical-sleigh-ride",
    "name": "Tropical Sleigh Ride",
    "farm": "Greenshock Farms",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Vivid lift with present clarity",
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
    "accentColor": "#B8785C",
    "vibeTags": [
      "creative",
      "euphoric"
    ],
    "dominantTerpene": "β-Ocimene",
    "totalTerpenes": 2.35,
    "terpeneProfile": [
      {
        "name": "β-Ocimene",
        "pct": 0.71,
        "ratio": 0.3
      },
      {
        "name": "β-Caryophyllene",
        "pct": 0.7,
        "ratio": 0.3
      },
      {
        "name": "α-Humulene",
        "pct": 0.28,
        "ratio": 0.12
      },
      {
        "name": "Limonene",
        "pct": 0.22,
        "ratio": 0.09
      }
    ],
    "bpmRange": [
      87,
      111
    ],
    "musicEnergy": 0.55,
    "musicValence": 0.59,
    "genres": [
      "indie pop",
      "tropical",
      "bossa nova",
      "deep house",
      "reggae"
    ],
    "artists": [
      "Jungle",
      "Tom Misch",
      "Seu Jorge",
      "Khruangbin"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 87,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 111,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 99,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Tropical Sunrise Clarity",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwRJAMwn5kAfO"
    },
    "oilRecipe": [
      {
        "oil": "Basil",
        "drops": 14,
        "pct": 35.0
      },
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Peppermint",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Grapefruit",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Geranium",
        "drops": 4,
        "pct": 10.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#B8785C",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Basil erupts into the room with the confidence of a lead dancer who has rehearsed this entrance a thousand times — fourteen drops of green electricity that announces what Greenshock Farms has been cultivating in the Mendocino hills: a strain that does not ask permission to be vivid, does not apologize for its brightness, does not dim itself for the comfort of quieter flowers.\n\nThe the bright herbal molecule is rare in cannabis. Most strains carry it as a trace note, an afterthought. Tropical Sleigh Ride leads with it, and the basil captures that herbal brightness the way Jungle captures a groove — with joyful precision and zero hesitation, as if the band arrived already playing and the audience simply materialized around them.\n\nBlack pepper follows immediately, twelve drops of spicy heat that gives the brightness somewhere substantial to land. Without the pepper, the basil would be a sparkler. With it, the combination becomes a bonfire — controlled, warm, radiating in every direction from a center that holds.\n\nPeppermint arrives at six drops and suddenly the honeysuckle aroma makes sense. The menthol creates a cooling corridor through the warm basil-pepper atmosphere, and the hint of ginger materializes from the interaction like a spice ghost who was always standing in the corner waiting to be noticed. Grapefruit adds four drops of pink citrus at the edge, and geranium closes with four drops of floral sweetness that transforms the herbal-spicy foundation into something approaching tropical. It is the difference between a garden and a garden party, between green and verdant.\n\nSomeone has just opened every window in the house, and the Mendocino air pours through carrying pine and ocean salt that merge with the five oils still spinning from the diffuser on the kitchen counter. the blend does that — it makes you want more air, more light, more of whatever is happening right now and right now and right now.\n\nThe clarity is not analytical but present, a joyful alertness that treats each moment as genuinely the most interesting thing that has ever occurred. Which, at this exact second in the hills, with basil and pepper and mint threading through the afternoon in a braid of green and warm and cool, it absolutely is.",
    "tea": {
      "name": "Mint Meditation",
      "description": "Cooling mint and warming ginger tea for alert serenity.",
      "glass": "Teacup",
      "volume": "~6 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "4 minutes",
      "caffeine": "0 mg (herbal blend)",
      "ingredients": [
        "6 oz Filtered water",
        "1 tbsp Fresh mint leaves (bruised)",
        "3-4 slices Fresh ginger slices",
        "2-3 flowers Honeysuckle flowers (dried)",
        "0.5 tsp Raw honey"
      ],
      "method": [
        "Heat water to 195°F.",
        "Add 1 tbsp fresh mint leaves (lightly bruised) to infuser.",
        "Add 3-4 thin ginger slices and 2-3 honeysuckle flowers (or dried).",
        "Steep for 4 minutes.",
        "Remove infuser, add 0.5 tsp honey, stir and serve with mint leaf."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Mint Lift",
        "description": "Fresh mint and ginger sparkle with tropical joy and clarity.",
        "glass": "Highball",
        "volume": "~8 oz",
        "temp": "Ice cold",
        "ingredients": [
          "8-10 leaves Fresh mint (muddled)",
          "0.5 oz Fresh ginger juice",
          "2 oz Fresh grapefruit juice",
          "0.75 oz Elderflower cordial",
          "2 oz Sparkling water"
        ],
        "method": [
          "Muddle 8-10 fresh mint leaves gently in shaker.",
          "Add 0.5 oz fresh ginger juice, 2 oz grapefruit juice, and 0.75 oz elderflower cordial.",
          "Fill with ice and shake for 10 seconds.",
          "Strain into highball glass filled with crushed ice.",
          "Top with 2 oz sparkling water and garnish with mint sprig and grapefruit wheel."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Tiki Clarity",
        "description": "White rum carries mint, ginger, and grapefruit into euphoric focus.",
        "glass": "Tiki mug",
        "volume": "~7 oz",
        "temp": "Ice cold",
        "style": "Tropical/shaken",
        "spirit": "White rum or pisco (40% ABV)",
        "abv": "~28%",
        "ingredients": [
          "10 leaves Fresh mint (muddled)",
          "1.5 oz White rum",
          "1 oz Fresh grapefruit juice",
          "0.5 oz Fresh ginger juice",
          "0.25 oz Elderflower cordial"
        ],
        "method": [
          "Muddle 10 fresh mint leaves in mixing glass.",
          "Add 1.5 oz white rum, 1 oz grapefruit juice, 0.5 oz fresh ginger juice, and 0.25 oz elderflower cordial.",
          "Shake vigorously with ice for 12 seconds.",
          "Strain into tiki mug filled with crushed ice.",
          "Garnish with mint sprig, grapefruit wheel, and candied ginger slice."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "β-Ocimene",
          "β-Caryophyllene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "β-Ocimene",
          "β-Caryophyllene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "β-Ocimene",
          "β-Caryophyllene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "β-Ocimene",
          "β-Caryophyllene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Fresh Goat Cheese",
        "desc": "Light and bright cheese plate with fresh goat cheese, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "β-Ocimene",
          "β-Caryophyllene"
        ]
      }
    },
    "candle": {
      "name": "Electric Bloom",
      "scent_notes": {
        "top": "basil, black pepper",
        "heart": "mint, clove bud",
        "base": "patchouli"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Basil",
            "drops": 6
          },
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Grapefruit",
            "drops": 1
          },
          {
            "oil": "Geranium",
            "drops": 1
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Basil",
          "Black Pepper",
          "Peppermint"
        ],
        "color": "terracotta",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Basil",
          "Black Pepper",
          "Peppermint"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Honeysuckle Flame",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Basil",
          "part": "dried leaves",
          "terpene_target": "β-Ocimene"
        },
        {
          "plant": "Mint",
          "part": "dried leaves",
          "terpene_target": "β-Ocimene"
        },
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-herb",
          "location_name": "SF Botanical Garden — Herb Garden",
          "shared_terpenes": [
            "β-Ocimene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Ocimene"
          ],
          "match_score": 0.75
        },
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "roys-redwoods",
          "location_name": "Roy's Redwoods Open Space Preserve",
          "shared_terpenes": [
            "α-Humulene",
            "α-Pinene"
          ],
          "match_score": 0.82
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Herb Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Viognier",
          "winery": "Tablas Creek",
          "region": "Paso Robles",
          "terpene_bridge": "Viognier carries floral terpenes that complement ocimene's bright, sweet character.",
          "tasting_note": "White peach, apricot, honeysuckle",
          "serving_temp_f": 50,
          "match_type": "primary"
        },
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "Hazy IPA",
          "brewery": "Moonraker Brewing",
          "region": "Auburn",
          "hop_varietals": [
            "Galaxy",
            "Mosaic"
          ],
          "terpene_bridge": "Galaxy hops are notably high in β-ocimene, creating tropical, basil-adjacent aromatics.",
          "tasting_note": "Mango, passionfruit, soft mouthfeel",
          "abv": "6.8%",
          "match_type": "primary"
        },
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  },
  "tropicanna-cherry": {
    "slug": "tropicanna-cherry",
    "name": "Tropicanna Cherry",
    "farm": "Sunrise Gardens",
    "region": "Mendocino",
    "energy": "HIGH",
    "intent": "Bright lift with clear, lively edges",
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
    "accentColor": "#C8A97E",
    "vibeTags": [
      "creative",
      "euphoric"
    ],
    "dominantTerpene": "β-Caryophyllene",
    "totalTerpenes": 1.18,
    "terpeneProfile": [
      {
        "name": "β-Caryophyllene",
        "pct": 0.37,
        "ratio": 0.31
      },
      {
        "name": "Limonene",
        "pct": 0.29,
        "ratio": 0.25
      },
      {
        "name": "Linalool",
        "pct": 0.15,
        "ratio": 0.13
      },
      {
        "name": "α-Humulene",
        "pct": 0.11,
        "ratio": 0.09
      }
    ],
    "bpmRange": [
      80,
      105
    ],
    "musicEnergy": 0.5,
    "musicValence": 0.57,
    "genres": [
      "deep house",
      "reggae",
      "jazz",
      "funk",
      "soul"
    ],
    "artists": [
      "Khruangbin",
      "Bob Marley",
      "Kamasi Washington",
      "Anderson .Paak"
    ],
    "isoPhases": [
      {
        "phase": "ignite",
        "minutes": 5,
        "bpm_target": 80,
        "mood": "building energy"
      },
      {
        "phase": "peak",
        "minutes": 15,
        "bpm_target": 105,
        "mood": "full momentum"
      },
      {
        "phase": "coast",
        "minutes": 10,
        "bpm_target": 92,
        "mood": "sustained glow"
      }
    ],
    "spotify": {
      "title": "Spring Afternoon Polish",
      "url": "https://open.spotify.com/playlist/37i9dQZF1FwON0Gl0oxfFx"
    },
    "oilRecipe": [
      {
        "oil": "Black Pepper",
        "drops": 12,
        "pct": 30.0
      },
      {
        "oil": "Sweet Orange",
        "drops": 10,
        "pct": 25.0
      },
      {
        "oil": "Lavender",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Geranium",
        "drops": 6,
        "pct": 15.0
      },
      {
        "oil": "Sage",
        "drops": 4,
        "pct": 10.0
      },
      {
        "oil": "Clove",
        "drops": 2,
        "pct": 5.0
      }
    ],
    "colorTemp": 4200,
    "brightness": "bright (70-85%)",
    "hueColor": "#C8A97E",
    "textures": [
      "glass",
      "metal",
      "crisp cotton",
      "light wood"
    ],
    "spatialSetup": "Open space, clean surfaces, natural daylight or bright accent lighting. Standing desk or movement-friendly layout.",
    "roomTemp": 72,
    "breathwork": {
      "protocol": "Ignition Breath",
      "duration": 5,
      "pattern": {
        "inhale_sec": 4,
        "hold_sec": 2,
        "exhale_sec": 4,
        "cycles": 10
      },
      "target": "sympathetic",
      "guidance": "Sit tall. Inhale sharply through the nose for four counts, filling from belly to chest. Brief hold for two. Exhale firmly through the mouth for four counts. Feel the energy build with each round."
    },
    "narrative": "Black pepper leads with twelve drops of warm spice, and the cheerful quality of Sunrise Gardens' Mendocino creation is immediately apparent: this is not solemn pepper, not medicinal pepper, not the pepper of a strain that takes itself seriously. This is the pepper that shows up at a dinner party with good wine and better stories and a way of laughing that makes everyone within earshot feel included.\n\nSweet orange follows with ten drops, carrying the sweet citrus aroma into the room with the unforced brightness of a Lizzo track — confident, generous, exactly as big as it needs to be and not a decibel more. Lavender at six drops brings floral softness, and geranium at six drops adds the cherry note — not literal cherry, but the rose-adjacent fruitiness that the brain files under sour cherry without argument, the way the brain files any warm-red-fruity scent and moves on to the next sensation.\n\nSage provides four drops of herbal earthiness depth, the earthy ballast that keeps the euphoria from becoming manic, that insists brightness include weight. Clove closes with two drops of nutmeg warmth, a spice note so precisely placed it feels like the strain designed the blend rather than the other way around — as if Tropicanna Cherry grew itself with this exact combination of oils in mind.\n\nThe cerebral quality is the clarity within the brightness — not the focus of a workday but the focus of a conversation where everyone is slightly more honest, slightly more articulate, slightly more themselves than they were an hour ago when the diffuser was just warming up and the evening was still wearing its polite face.\n\nSomeone laughs, and the blend turns the laugh into something architectural — it bounces off the bright citrus and the warm pepper and the soft lavender and returns to the room as evidence that the lively edges are not edges at all but openings, and the sour cherry-sweet citrus-nutmeg air is the doorway through to whatever the evening becomes next.\n\nThe six oils have done their work in the Mendocino air, and the room has shifted from gathering to genuine exchange, and the cheerful quality that seemed superficial thirty minutes ago has revealed itself as something more substantial — not just bright but clear, not just lifted but elevated, and every voice in the room has found the register where truth and warmth are the same thing.",
    "tea": {
      "name": "Tropicanna Cherry Tea",
      "description": "Tart cherry with warm spice and floral notes",
      "glass": "teacup",
      "volume": "8 oz",
      "temp": "",
      "steep_temp": "",
      "steep_time": "5 minutes",
      "caffeine": "none (herbal",
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
      "method": [
        "Heat 8 oz filtered water to 195°F (90°C).",
        "In a tea infuser, combine 1 tbsp dried tart cherry pieces, 1 tsp dried blood orange peel, 4-5 dried lavender buds, 2-3 whole coriander seeds, and 1 whole clove.",
        "Steep for 5 minutes to extract the cherry-spice character.",
        "Strain into a warm teacup.",
        "Stir in a tiny pinch of freshly grated nutmeg.",
        "Garnish with a fresh cherry and thin blood orange wheel."
      ],
      "terpene_map": {}
    },
    "cocktail": {
      "mocktail": {
        "name": "Tropicanna Cherry",
        "description": "Tart cherry with bright citrus lift",
        "glass": "coupe",
        "volume": "6 oz",
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
        "method": [
          "In a mixing glass, combine 2.5 oz fresh tart cherry juice (or cherry puree strained) and 1 oz fresh blood orange juice.",
          "Add 0.5 oz fresh lemon juice and 0.5 oz coriander-lavender syrup.",
          "Add a tiny pinch of freshly grated nutmeg and 2-3 dashes of coriander bitters.",
          "Fill with ice and stir for 10 seconds until chilled.",
          "Strain into a chilled coupe glass.",
          "Garnish with a fresh cherry, blood orange wheel, and a thin nutmeg dusting."
        ],
        "terpene_map": {}
      },
      "cocktail": {
        "name": "Tropicanna Cherry",
        "description": "Gin-spiked cherry with citrus cerebral brightness",
        "glass": "coupe",
        "volume": "6.5 oz",
        "temp": "chilled",
        "style": "fruit-forward botanical",
        "spirit": "gin",
        "abv": "16%",
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
        "method": [
          "Pour 1.75 oz gin into a mixing glass.",
          "Add 2 oz fresh tart cherry juice and 1 oz fresh blood orange juice.",
          "Pour in 0.5 oz fresh lemon juice and 0.5 oz coriander-lavender syrup.",
          "Add 2-3 dashes coriander bitters and a tiny pinch of freshly grated nutmeg.",
          "Fill with ice and stir for 10 seconds.",
          "Strain into a chilled coupe glass.",
          "Garnish with a fresh cherry, blood orange wheel, and nutmeg dust."
        ],
        "terpene_map": {}
      }
    },
    "food": {
      "snack": {
        "name": "Citrus-Herb Marinated Olives",
        "desc": "Castelvetrano olives marinated with orange zest, fresh herbs, and cracked black pepper from a Sonoma olive grove.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "appetizer": {
        "name": "Dungeness Crab Crostini with Meyer Lemon Aioli",
        "desc": "Fresh Bodega Bay crab on grilled sourdough with house-made Meyer lemon aioli and micro herbs.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "main": {
        "name": "Pan-Seared Halibut with Citrus Beurre Blanc",
        "desc": "Line-caught Pacific halibut with a Meyer lemon beurre blanc, served over spring vegetable ragout.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "dessert": {
        "name": "Meyer Lemon Pavlova with Seasonal Berries",
        "desc": "Crisp meringue shell with tangy Meyer lemon curd and fresh berries from a Sebastopol farm.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      },
      "cheese": {
        "name": "Fresh Selection: Gruyère",
        "desc": "Light and bright cheese plate with aged gouda, gruyère, accompanied by seasonal fruit, marcona almonds, and lavash.",
        "key_terpenes": [
          "β-Caryophyllene",
          "Limonene"
        ]
      }
    },
    "candle": {
      "name": "Cherry Sunrise",
      "scent_notes": {
        "top": "black pepper, bergamot",
        "heart": "clove bud, neroli",
        "base": "sandalwood"
      },
      "wax_type": "coconut-soy blend",
      "burn_time_hrs": 45
    },
    "bath": {
      "rollerball": {
        "carrier_oil": "jojoba oil",
        "dilution_pct": 2,
        "total_volume_ml": 10,
        "eo_recipe": [
          {
            "oil": "Black Pepper",
            "drops": 4
          },
          {
            "oil": "Sweet Orange",
            "drops": 4
          },
          {
            "oil": "Lavender",
            "drops": 2
          },
          {
            "oil": "Geranium",
            "drops": 2
          }
        ],
        "application_points": [
          "wrists",
          "temples",
          "behind ears",
          "base of throat"
        ]
      },
      "bath_bomb": {
        "base": "baking soda, citric acid, cornstarch, Epsom salt",
        "eo_drops": 15,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "Lavender"
        ],
        "color": "warm amber",
        "extras": "dried flower petals, oat milk powder"
      },
      "shower_steamer": {
        "base": "baking soda, citric acid, cornstarch",
        "eo_drops": 20,
        "eo_blend": [
          "Black Pepper",
          "Sweet Orange",
          "Lavender"
        ],
        "activation": "Place on shower floor away from direct stream. Steam activates essential oils for 5-10 minutes of aromatherapy."
      }
    },
    "incense": {
      "blend_name": "Cherry Incense",
      "format": "stick",
      "botanicals": [
        {
          "plant": "Black Pepper",
          "part": "dried corns",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Clove",
          "part": "dried buds",
          "terpene_target": "β-Caryophyllene"
        },
        {
          "plant": "Lemon Verbena",
          "part": "dried leaves",
          "terpene_target": "Limonene"
        },
        {
          "plant": "Orange Peel",
          "part": "dried zest",
          "terpene_target": "Limonene"
        }
      ],
      "burn_method": "Place on heat-resistant surface in a ventilated room. Allow 30 seconds for the flame to establish before extinguishing to a smolder.",
      "ritual_suggestion": "Light at the start of a creative session. The rising smoke signals the beginning of focused, energized work."
    },
    "location": {
      "matched_locations": [
        {
          "location_id": "sf-botanical-garden",
          "location_name": "SF Botanical Garden — Fragrance Garden",
          "shared_terpenes": [
            "β-Caryophyllene",
            "Linalool"
          ],
          "match_score": 0.85
        },
        {
          "location_id": "mt-tamalpais",
          "location_name": "Mount Tamalpais State Park",
          "shared_terpenes": [
            "β-Caryophyllene",
            "α-Pinene"
          ],
          "match_score": 0.82
        },
        {
          "location_id": "sf-botanical-citrus",
          "location_name": "SF Botanical Garden — Citrus Collection",
          "shared_terpenes": [
            "Limonene"
          ],
          "match_score": 0.9
        },
        {
          "location_id": "bodega-bay",
          "location_name": "Bodega Bay Coastal Trail",
          "shared_terpenes": [
            "Limonene",
            "α-Pinene"
          ],
          "match_score": 0.78
        }
      ],
      "terpene_walk": "Begin at SF Botanical Garden — Fragrance Garden, diffuse essential oil blend 30 minutes before arrival. Walk slowly, breathing deeply through the nose to layer forest phytoncides over the pre-loaded terpene profile.",
      "best_season": "spring/summer"
    },
    "wine": {
      "wine": [
        {
          "varietal": "Syrah",
          "winery": "Pax Wines",
          "region": "Sonoma Coast",
          "terpene_bridge": "Rotundone in Syrah shares spicy, peppery character with β-caryophyllene — same aromatic family, different kingdoms.",
          "tasting_note": "Dark fruit, cracked pepper, and coastal minerality",
          "serving_temp_f": 62,
          "match_type": "primary"
        },
        {
          "varietal": "Sauvignon Blanc",
          "winery": "Merry Edwards",
          "region": "Russian River Valley",
          "terpene_bridge": "Citrus thiols in Sauvignon Blanc mirror limonene's bright, zesty character — the grape and the terpene speak the same citrus language.",
          "tasting_note": "Grapefruit, fresh-cut grass, mineral finish",
          "serving_temp_f": 48,
          "match_type": "secondary"
        }
      ],
      "beer": [
        {
          "style": "English-Style Ale",
          "brewery": "North Coast Brewing",
          "region": "Fort Bragg",
          "hop_varietals": [
            "East Kent Goldings"
          ],
          "terpene_bridge": "EKG hops carry significant caryophyllene, connecting the spicy warmth of British ales to cannabis terpene profiles.",
          "tasting_note": "Toffee, marmalade, gentle hop spice",
          "abv": "5.5%",
          "match_type": "primary"
        },
        {
          "style": "Belgian Wit",
          "brewery": "Anderson Valley Brewing",
          "region": "Boonville",
          "hop_varietals": [
            "Cascade"
          ],
          "terpene_bridge": "Cascade hops and orange peel additions both deliver limonene — the citrus terpene unites cannabis, hops, and culinary botanicals.",
          "tasting_note": "Orange peel, coriander, wheat softness",
          "abv": "5.0%",
          "match_type": "secondary"
        }
      ],
      "cannabaceae_note": "Cannabis and hops (Humulus lupulus) are botanical cousins in the family Cannabaceae, sharing terpene synthesis pathways that produce identical aromatic molecules.",
      "local_sourcing": true
    }
  }
};

// ============================================
// 24 UNIQUE SVG HERO ILLUSTRATIONS
// ============================================
function getStrainHeroSvg(slug, design) {
  const d = design || STRAIN_DESIGNS[slug] || {};
  const accent = d.accentColor || "#8EAE68";
  const secondary = d.secondaryColor || "#c9d4f0";
  const text = d.textColor || "#d4dce8";
  const muted = d.textMuted || "rgba(200,200,200,0.4)";

  const svgs = {
    // 1. MIKE'S BOMBA — Forest floor, volcanic warmth, mushrooms, fern fronds
    "mikes-bomba": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2e1a" />
            <stop offset="100%" stopColor="#2a3d20" />
          </linearGradient>
          <radialGradient id="mb-glow" cx="0.7" cy="0.8" r="0.5">
            <stop offset="0%" stopColor="#c8a97e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c8a97e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#mb-sky)" />
        <ellipse cx="280" cy="180" rx="160" ry="40" fill="url(#mb-glow)" />
        {/* Forest floor */}
        <path d="M0 160 Q50 140 100 155 Q150 145 200 158 Q250 142 300 152 Q350 148 400 160 L400 200 L0 200Z" fill="#1e3018" opacity="0.7" />
        <path d="M0 170 Q60 158 120 168 Q180 155 240 165 Q320 158 400 170 L400 200 L0 200Z" fill="#162812" opacity="0.8" />
        {/* Fern fronds */}
        <g opacity="0.6">
          <path d="M40 180 Q50 150 60 120 Q55 135 45 145 Q50 130 58 118" fill="none" stroke="#5a8a40" strokeWidth="1.5" />
          <path d="M44 175 L38 155 M48 165 L42 148 M52 158 L46 140 M55 148 L50 132" fill="none" stroke="#5a8a40" strokeWidth="1" />
          <path d="M330 185 Q340 155 350 125 Q345 140 335 150 Q340 135 348 122" fill="none" stroke="#5a8a40" strokeWidth="1.5" />
          <path d="M334 180 L328 160 M338 170 L332 153 M342 162 L336 145" fill="none" stroke="#5a8a40" strokeWidth="1" />
        </g>
        {/* Mushrooms */}
        <ellipse cx="160" cy="168" rx="14" ry="6" fill="#c8a97e" opacity="0.7" />
        <rect x="157" y="168" width="6" height="12" rx="2" fill="#b89870" opacity="0.6" />
        <ellipse cx="200" cy="172" rx="10" ry="4" fill="#d4b898" opacity="0.6" />
        <rect x="198" y="172" width="4" height="9" rx="1.5" fill="#b89870" opacity="0.5" />
        {/* Volcanic ember glow */}
        <circle cx="280" cy="175" r="3" fill="#c8a97e" opacity="0.5" />
        <circle cx="290" cy="180" r="2" fill="#d4a060" opacity="0.4" />
        <circle cx="270" cy="178" r="2.5" fill="#c8a97e" opacity="0.3" />
        {/* Firefly dots */}
        <circle cx="100" cy="100" r="1.5" fill="#c8a97e" opacity="0.6" />
        <circle cx="250" cy="80" r="1" fill="#c8a97e" opacity="0.5" />
        <circle cx="180" cy="70" r="1.2" fill="#d4b898" opacity="0.4" />
        <circle cx="320" cy="90" r="1" fill="#c8a97e" opacity="0.3" />
      </svg>
    ),

    // 2. NATTY BUMPPO — Hammock between trees, dusty plum sky
    "natty-bumppo": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2a3a" />
            <stop offset="100%" stopColor="#4a3548" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#nb-sky)" />
        {/* Trees */}
        <rect x="80" y="60" width="8" height="140" rx="3" fill="#5a4050" />
        <rect x="312" y="60" width="8" height="140" rx="3" fill="#5a4050" />
        {/* Branches */}
        <path d="M84 80 Q60 70 50 60" fill="none" stroke="#5a4050" strokeWidth="3" />
        <path d="M84 100 Q60 95 45 88" fill="none" stroke="#5a4050" strokeWidth="2" />
        <path d="M316 80 Q340 70 350 60" fill="none" stroke="#5a4050" strokeWidth="3" />
        <path d="M316 100 Q340 95 355 88" fill="none" stroke="#5a4050" strokeWidth="2" />
        {/* Hammock catenary curve */}
        <path d="M88 110 Q200 160 316 110" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
        <path d="M88 114 Q200 164 316 114" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        {/* Hammock netting lines */}
        <path d="M110 116 Q200 158 300 114" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <path d="M130 120 Q200 155 280 118" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <path d="M150 124 Q200 152 260 122" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        {/* Person silhouette in hammock */}
        <ellipse cx="200" cy="148" rx="30" ry="8" fill="#4a3548" opacity="0.6" />
        {/* Stars */}
        <circle cx="150" cy="30" r="1.5" fill="#e0d4cc" opacity="0.6" />
        <circle cx="250" cy="25" r="1" fill="#e0d4cc" opacity="0.5" />
        <circle cx="320" cy="40" r="1.2" fill="#e0d4cc" opacity="0.4" />
        <circle cx="60" cy="45" r="1" fill="#e0d4cc" opacity="0.3" />
        <circle cx="200" cy="20" r="1.8" fill="#d4b896" opacity="0.5" />
        {/* Ground */}
        <path d="M0 185 Q100 178 200 182 Q300 178 400 185 L400 200 L0 200Z" fill="#2e2030" opacity="0.6" />
      </svg>
    ),

    // 3. BLACK LIME CHEM — Deep ocean, sinking lime slice, waves
    "black-lime-chem": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blc-ocean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a2a2a" />
            <stop offset="50%" stopColor="#0e3636" />
            <stop offset="100%" stopColor="#061818" />
          </linearGradient>
          <radialGradient id="blc-lime" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#4ae068" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#2a8a40" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4ae068" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#blc-ocean)" />
        {/* Deep water waves */}
        <path d="M0 40 Q50 32 100 40 Q150 48 200 40 Q250 32 300 40 Q350 48 400 40" fill="none" stroke="#2a8a7a" strokeWidth="1" opacity="0.3" />
        <path d="M0 60 Q60 50 120 58 Q180 66 240 58 Q300 50 360 58 Q380 62 400 60" fill="none" stroke="#2a8a7a" strokeWidth="0.8" opacity="0.25" />
        <path d="M0 80 Q70 72 140 80 Q210 88 280 80 Q350 72 400 80" fill="none" stroke="#1a6a5a" strokeWidth="0.6" opacity="0.2" />
        {/* Sinking lime slice */}
        <circle cx="200" cy="110" r="28" fill="url(#blc-lime)" />
        <circle cx="200" cy="110" r="24" fill="none" stroke="#4ae068" strokeWidth="1.5" opacity="0.5" />
        <circle cx="200" cy="110" r="16" fill="none" stroke="#4ae068" strokeWidth="0.8" opacity="0.3" />
        {/* Lime segments */}
        <line x1="200" y1="86" x2="200" y2="134" stroke="#4ae068" strokeWidth="0.5" opacity="0.3" />
        <line x1="176" y1="110" x2="224" y2="110" stroke="#4ae068" strokeWidth="0.5" opacity="0.3" />
        <line x1="183" y1="93" x2="217" y2="127" stroke="#4ae068" strokeWidth="0.5" opacity="0.3" />
        <line x1="217" y1="93" x2="183" y2="127" stroke="#4ae068" strokeWidth="0.5" opacity="0.3" />
        {/* Rising bubbles */}
        <circle cx="190" cy="140" r="3" fill="none" stroke="#4ae068" strokeWidth="0.8" opacity="0.3" />
        <circle cx="210" cy="150" r="2" fill="none" stroke="#4ae068" strokeWidth="0.6" opacity="0.25" />
        <circle cx="195" cy="160" r="4" fill="none" stroke="#4ae068" strokeWidth="0.8" opacity="0.2" />
        <circle cx="215" cy="170" r="2.5" fill="none" stroke="#4ae068" strokeWidth="0.6" opacity="0.15" />
        <circle cx="185" cy="175" r="1.5" fill="none" stroke="#4ae068" strokeWidth="0.5" opacity="0.2" />
        {/* Deep water darkness at bottom */}
        <rect x="0" y="180" width="400" height="20" fill="#061818" opacity="0.5" />
      </svg>
    ),

    // 4. GUAVA GIFT — Golden hour backyard, sun, fence, tropical leaves
    "guava-gift": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gg-sun" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#f0c860" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#e68c64" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e68c64" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a3820" />
            <stop offset="60%" stopColor="#3a2e18" />
            <stop offset="100%" stopColor="#2e2410" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#gg-sky)" />
        <rect width="400" height="200" fill="url(#gg-sun)" />
        {/* Setting sun */}
        <circle cx="200" cy="55" r="30" fill="#f0c860" opacity="0.3" />
        <circle cx="200" cy="55" r="20" fill="#f0c860" opacity="0.4" />
        {/* Sun rays */}
        <line x1="200" y1="15" x2="200" y2="0" stroke="#f0c860" strokeWidth="1" opacity="0.3" />
        <line x1="230" y1="30" x2="245" y2="15" stroke="#f0c860" strokeWidth="1" opacity="0.25" />
        <line x1="170" y1="30" x2="155" y2="15" stroke="#f0c860" strokeWidth="1" opacity="0.25" />
        {/* Backyard fence */}
        <rect x="0" y="120" width="400" height="3" fill="#6a5438" opacity="0.5" />
        <rect x="0" y="130" width="400" height="3" fill="#6a5438" opacity="0.5" />
        {[0,40,80,120,160,200,240,280,320,360].map((x,i) => (
          <rect key={i} x={x+18} y="110" width="4" height="30" rx="1" fill="#6a5438" opacity="0.5" />
        ))}
        {/* Tropical guava leaf shapes */}
        <ellipse cx="60" cy="100" rx="18" ry="8" fill="#5a8a40" opacity="0.3" transform="rotate(-20 60 100)" />
        <ellipse cx="340" cy="95" rx="20" ry="9" fill="#5a8a40" opacity="0.25" transform="rotate(15 340 95)" />
        {/* Guava fruit */}
        <circle cx="80" cy="108" r="8" fill="#e68c64" opacity="0.4" />
        <circle cx="320" cy="104" r="7" fill="#e68c64" opacity="0.35" />
        {/* Ground */}
        <path d="M0 155 Q100 148 200 152 Q300 148 400 155 L400 200 L0 200Z" fill="#2e2410" opacity="0.5" />
        {/* Grass blades */}
        <g opacity="0.4">
          {[20,50,90,130,180,230,270,310,350,380].map((x,i) => (
            <line key={i} x1={x} y1="200" x2={x + (i%2===0?3:-3)} y2={185-Math.random()*5} stroke="#5a8a40" strokeWidth="1" />
          ))}
        </g>
      </svg>
    ),

    // 5. MULE FUEL — Heavy diesel earth, dark leather, tire treads, smoke
    "mule-fuel": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mf-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1a14" />
            <stop offset="100%" stopColor="#14100c" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#mf-bg)" />
        {/* Cracked earth texture */}
        <path d="M0 160 L50 155 L80 162 L130 150 L200 158 L260 152 L320 160 L370 154 L400 160 L400 200 L0 200Z" fill="#28221a" opacity="0.6" />
        {/* Cracks in earth */}
        <path d="M100 165 L120 175 L115 190" fill="none" stroke="#1e1a14" strokeWidth="1" opacity="0.5" />
        <path d="M250 160 L270 170 L260 185 L275 195" fill="none" stroke="#1e1a14" strokeWidth="1" opacity="0.4" />
        <path d="M180 158 L195 172 L185 195" fill="none" stroke="#1e1a14" strokeWidth="0.8" opacity="0.4" />
        {/* Heavy diesel smoke wisps */}
        <path d="M150 100 Q160 80 170 90 Q180 70 190 85 Q195 65 200 75" fill="none" stroke="#6a6050" strokeWidth="2" opacity="0.2" />
        <path d="M200 110 Q210 85 220 95 Q230 75 235 88 Q240 68 248 80" fill="none" stroke="#6a6050" strokeWidth="1.5" opacity="0.15" />
        <path d="M170 120 Q175 100 185 108 Q190 88 198 100" fill="none" stroke="#8c826e" strokeWidth="1.5" opacity="0.12" />
        {/* Circular tire-tread impression */}
        <circle cx="200" cy="130" r="35" fill="none" stroke="#8c826e" strokeWidth="2" opacity="0.15" />
        <circle cx="200" cy="130" r="28" fill="none" stroke="#8c826e" strokeWidth="1" opacity="0.1" />
        <circle cx="200" cy="130" r="12" fill="#28221a" opacity="0.3" />
        {/* Tread marks */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          const x1 = 200 + 28 * Math.cos(rad);
          const y1 = 130 + 28 * Math.sin(rad);
          const x2 = 200 + 35 * Math.cos(rad);
          const y2 = 130 + 35 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8c826e" strokeWidth="1.5" opacity="0.12" />;
        })}
        {/* Ember sparks */}
        <circle cx="185" cy="95" r="1" fill="#c8a97e" opacity="0.3" />
        <circle cx="220" cy="80" r="0.8" fill="#c8a97e" opacity="0.25" />
      </svg>
    ),

    // 6. SATSUMA SHERBET — Quiet mandarin evening, citrus slice, mint leaves
    "satsuma-sherbet": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ss-glow" cx="0.5" cy="0.45" r="0.5">
            <stop offset="0%" stopColor="#d2a050" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d2a050" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a2018" />
        <rect width="400" height="200" fill="url(#ss-glow)" />
        {/* Mandarin/satsuma cross-section */}
        <circle cx="200" cy="95" r="40" fill="#d2a050" opacity="0.15" />
        <circle cx="200" cy="95" r="36" fill="none" stroke="#d2a050" strokeWidth="2" opacity="0.3" />
        <circle cx="200" cy="95" r="28" fill="none" stroke="#d2a050" strokeWidth="1" opacity="0.2" />
        {/* Citrus segments */}
        {[0,36,72,108,144,180,216,252,288,324].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1="200" y1="95" x2={200 + 34 * Math.cos(rad)} y2={95 + 34 * Math.sin(rad)} stroke="#d2a050" strokeWidth="0.8" opacity="0.2" />;
        })}
        {/* Mint leaves */}
        <ellipse cx="140" cy="140" rx="12" ry="6" fill="#7ec8a0" opacity="0.3" transform="rotate(-30 140 140)" />
        <ellipse cx="148" cy="136" rx="10" ry="5" fill="#7ec8a0" opacity="0.25" transform="rotate(-15 148 136)" />
        <ellipse cx="260" cy="145" rx="11" ry="5.5" fill="#7ec8a0" opacity="0.28" transform="rotate(25 260 145)" />
        {/* Sherbet texture dots */}
        {[60,90,130,170,230,270,310,340].map((x,i) => (
          <circle key={i} cx={x} cy={155 + (i%3)*8} r={1 + (i%2)*0.5} fill={i%2===0 ? "#d2a050" : "#7ec8a0"} opacity={0.15 + (i%3)*0.05} />
        ))}
        {/* Soft horizon */}
        <path d="M0 170 Q100 164 200 168 Q300 164 400 170 L400 200 L0 200Z" fill="#201812" opacity="0.5" />
      </svg>
    ),

    // 7. TROPICAL SLEIGH RIDE — Coral sunrise, palm fronds, mint green waves
    "tropical-sleigh-ride": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tsr-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f08060" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#44281e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#221410" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="#2e1a18" />
        <rect width="400" height="200" fill="url(#tsr-sky)" />
        {/* Sunrise glow */}
        <ellipse cx="200" cy="40" rx="120" ry="40" fill="#f08060" opacity="0.15" />
        <circle cx="200" cy="40" r="25" fill="#f08060" opacity="0.25" />
        {/* Palm tree silhouettes */}
        <path d="M80 200 L85 100 L88 200" fill="#44281e" opacity="0.6" />
        <path d="M85 100 Q60 80 40 85" fill="none" stroke="#44281e" strokeWidth="3" opacity="0.5" />
        <path d="M85 100 Q70 75 55 68" fill="none" stroke="#44281e" strokeWidth="2.5" opacity="0.5" />
        <path d="M85 100 Q100 78 115 72" fill="none" stroke="#44281e" strokeWidth="2.5" opacity="0.5" />
        <path d="M85 100 Q95 82 108 88" fill="none" stroke="#44281e" strokeWidth="2" opacity="0.4" />
        {/* Palm fronds */}
        <path d="M40 85 Q30 90 25 95" fill="none" stroke="#64dcb4" strokeWidth="1.5" opacity="0.25" />
        <path d="M55 68 Q45 72 38 78" fill="none" stroke="#64dcb4" strokeWidth="1.5" opacity="0.2" />
        {/* Mint green ocean waves */}
        <path d="M0 140 Q50 130 100 138 Q150 146 200 136 Q250 128 300 138 Q350 146 400 138 L400 200 L0 200Z" fill="#64dcb4" opacity="0.1" />
        <path d="M0 155 Q60 148 120 155 Q180 162 240 152 Q300 145 360 155 Q380 158 400 155 L400 200 L0 200Z" fill="#64dcb4" opacity="0.07" />
        <path d="M0 150 Q80 142 160 150 Q240 158 320 148 Q360 144 400 150" fill="none" stroke="#64dcb4" strokeWidth="1.5" opacity="0.2" />
        {/* Flying birds */}
        <path d="M140 30 Q145 25 150 30" fill="none" stroke="#f0dcd0" strokeWidth="1" opacity="0.4" />
        <path d="M160 25 Q165 20 170 25" fill="none" stroke="#f0dcd0" strokeWidth="1" opacity="0.35" />
        <path d="M125 35 Q129 31 133 35" fill="none" stroke="#f0dcd0" strokeWidth="0.8" opacity="0.3" />
      </svg>
    ),

    // 8. PURPLE CANDY CANE — Vibrant magenta candy energy, peppermint swirl
    "purple-candy-cane": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pcc-glow" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#e650b4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e650b4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a1028" />
        <rect width="400" height="200" fill="url(#pcc-glow)" />
        {/* Large candy cane spiral */}
        <path d="M180 30 Q220 30 230 50 Q240 70 220 80 Q200 90 210 110 Q220 130 200 140 Q180 150 190 170" fill="none" stroke="#e650b4" strokeWidth="8" opacity="0.3" strokeLinecap="round" />
        <path d="M180 30 Q220 30 230 50 Q240 70 220 80 Q200 90 210 110 Q220 130 200 140 Q180 150 190 170" fill="none" stroke="#60e8a0" strokeWidth="8" opacity="0.15" strokeLinecap="round" strokeDasharray="12 12" strokeDashoffset="6" />
        {/* Floating candy pieces */}
        <circle cx="100" cy="60" r="10" fill="#e650b4" opacity="0.2" />
        <circle cx="100" cy="60" r="6" fill="#60e8a0" opacity="0.15" />
        <circle cx="300" cy="80" r="12" fill="#e650b4" opacity="0.18" />
        <circle cx="300" cy="80" r="7" fill="#60e8a0" opacity="0.12" />
        <circle cx="130" cy="140" r="8" fill="#e650b4" opacity="0.15" />
        <circle cx="280" cy="150" r="9" fill="#f0c040" opacity="0.12" />
        {/* Sparkle stars */}
        <path d="M150 40 L152 36 L154 40 L158 42 L154 44 L152 48 L150 44 L146 42Z" fill="#f0d0e8" opacity="0.4" />
        <path d="M260 45 L261.5 42 L263 45 L266 46.5 L263 48 L261.5 51 L260 48 L257 46.5Z" fill="#f0d0e8" opacity="0.35" />
        <path d="M340 120 L341 118 L342 120 L344 121 L342 122 L341 124 L340 122 L338 121Z" fill="#f0d0e8" opacity="0.3" />
        {/* Peppermint swirl center */}
        <circle cx="200" cy="100" r="20" fill="none" stroke="#e650b4" strokeWidth="1.5" opacity="0.2" />
        <circle cx="200" cy="100" r="14" fill="none" stroke="#60e8a0" strokeWidth="1" opacity="0.15" />
      </svg>
    ),

    // 9. CARAMBOLA — 5-pointed starfruit cross-section, effervescent bubbles
    "carambola": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="cb-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f0d250" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f0d250" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a2810" />
        <rect width="400" height="200" fill="url(#cb-glow)" />
        {/* 5-pointed starfruit cross-section */}
        {(() => {
          const cx = 200, cy = 95, outer = 50, inner = 22;
          const points = [];
          for (let i = 0; i < 5; i++) {
            const outerAngle = (i * 72 - 90) * Math.PI / 180;
            const innerAngle = ((i * 72 + 36) - 90) * Math.PI / 180;
            points.push(`${cx + outer * Math.cos(outerAngle)},${cy + outer * Math.sin(outerAngle)}`);
            points.push(`${cx + inner * Math.cos(innerAngle)},${cy + inner * Math.sin(innerAngle)}`);
          }
          return <polygon points={points.join(' ')} fill="#f0d250" opacity="0.15" stroke="#f0d250" strokeWidth="1.5" strokeOpacity="0.3" />;
        })()}
        {/* Inner star detail */}
        {(() => {
          const cx = 200, cy = 95, outer = 30, inner = 14;
          const points = [];
          for (let i = 0; i < 5; i++) {
            const outerAngle = (i * 72 - 90) * Math.PI / 180;
            const innerAngle = ((i * 72 + 36) - 90) * Math.PI / 180;
            points.push(`${cx + outer * Math.cos(outerAngle)},${cy + outer * Math.sin(outerAngle)}`);
            points.push(`${cx + inner * Math.cos(innerAngle)},${cy + inner * Math.sin(innerAngle)}`);
          }
          return <polygon points={points.join(' ')} fill="none" stroke="#c8e080" strokeWidth="1" strokeOpacity="0.25" />;
        })()}
        <circle cx="200" cy="95" r="6" fill="#f0d250" opacity="0.2" />
        {/* Effervescent bubbles */}
        {[[80,40,4],[120,60,3],[140,150,5],[260,50,3.5],[290,130,4],[310,160,2.5],[340,70,3],[170,170,3],[100,130,2],[250,170,4],[60,100,2.5],[350,100,2]].map(([x,y,r],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#f0d250" strokeWidth="0.8" opacity={0.15 + (i % 4) * 0.05} />
        ))}
        {/* Citrus ray lines */}
        {[0,72,144,216,288].map((a,i) => {
          const rad = (a - 90) * Math.PI / 180;
          return <line key={i} x1={200 + 55 * Math.cos(rad)} y1={95 + 55 * Math.sin(rad)} x2={200 + 90 * Math.cos(rad)} y2={95 + 90 * Math.sin(rad)} stroke="#f0d250" strokeWidth="0.5" opacity="0.15" />;
        })}
      </svg>
    ),

    // 10. PINEAPPLE MOJITO — Tropical green, pineapple diamond pattern, gold glow
    "pineapple-mojito": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pm-glow" cx="0.5" cy="0.6" r="0.5">
            <stop offset="0%" stopColor="#c8b43c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c8b43c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#1a2a18" />
        <rect width="400" height="200" fill="url(#pm-glow)" />
        {/* Pineapple body shape */}
        <ellipse cx="200" cy="110" rx="35" ry="50" fill="#c8b43c" opacity="0.1" stroke="#c8b43c" strokeWidth="1.5" strokeOpacity="0.2" />
        {/* Diamond cross-hatch pattern */}
        {[-30,-15,0,15,30].map((y,i) => (
          <line key={`h${i}`} x1="168" y1={110+y} x2="232" y2={110+y} stroke="#c8b43c" strokeWidth="0.5" opacity="0.15" />
        ))}
        {[-20,-10,0,10,20].map((x,i) => (
          <line key={`v${i}`} x1={200+x} y1="62" x2={200+x} y2="158" stroke="#c8b43c" strokeWidth="0.5" opacity="0.15" />
        ))}
        {/* Pineapple crown leaves */}
        <path d="M200 60 Q190 40 185 20" fill="none" stroke="#68b878" strokeWidth="2" opacity="0.4" />
        <path d="M200 60 Q205 38 210 18" fill="none" stroke="#68b878" strokeWidth="2" opacity="0.35" />
        <path d="M200 60 Q180 42 170 28" fill="none" stroke="#68b878" strokeWidth="1.5" opacity="0.3" />
        <path d="M200 60 Q220 42 230 28" fill="none" stroke="#68b878" strokeWidth="1.5" opacity="0.3" />
        <path d="M200 60 Q175 50 165 40" fill="none" stroke="#68b878" strokeWidth="1.2" opacity="0.25" />
        {/* Mojito mint leaves at base */}
        <ellipse cx="160" cy="165" rx="14" ry="7" fill="#68b878" opacity="0.2" transform="rotate(-15 160 165)" />
        <ellipse cx="240" cy="168" rx="12" ry="6" fill="#68b878" opacity="0.18" transform="rotate(20 240 168)" />
        {/* Ground plane */}
        <path d="M0 180 Q200 172 400 180 L400 200 L0 200Z" fill="#141e12" opacity="0.4" />
      </svg>
    ),

    // 11. RASTA GOVERNMINT — Caribbean colors, oak barrel, gold accents
    "rasta-governmint": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rg-warmth" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#c4a43c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c4a43c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a1410" />
        <rect width="400" height="200" fill="url(#rg-warmth)" />
        {/* Oak barrel silhouette */}
        <ellipse cx="200" cy="70" rx="50" ry="12" fill="none" stroke="#a06838" strokeWidth="1.5" opacity="0.3" />
        <path d="M150 70 Q145 100 148 130 Q150 140 155 145 L245 145 Q250 140 252 130 Q255 100 250 70" fill="none" stroke="#a06838" strokeWidth="1.5" opacity="0.25" />
        <ellipse cx="200" cy="145" rx="45" ry="10" fill="none" stroke="#a06838" strokeWidth="1.5" opacity="0.2" />
        {/* Barrel bands */}
        <ellipse cx="200" cy="90" rx="48" ry="10" fill="none" stroke="#c4a43c" strokeWidth="1" opacity="0.2" />
        <ellipse cx="200" cy="125" rx="47" ry="10" fill="none" stroke="#c4a43c" strokeWidth="1" opacity="0.2" />
        {/* Caribbean color accents — subtle stripes */}
        <rect x="50" y="175" width="100" height="3" rx="1.5" fill="#cc3333" opacity="0.15" />
        <rect x="150" y="175" width="100" height="3" rx="1.5" fill="#c4a43c" opacity="0.15" />
        <rect x="250" y="175" width="100" height="3" rx="1.5" fill="#33aa44" opacity="0.15" />
        {/* Mint leaf accent */}
        <ellipse cx="280" cy="100" rx="15" ry="7" fill="#33aa44" opacity="0.15" transform="rotate(30 280 100)" />
        <line x1="280" y1="94" x2="280" y2="107" stroke="#33aa44" strokeWidth="0.5" opacity="0.2" />
        {/* Gold dust particles */}
        <circle cx="180" cy="40" r="1.5" fill="#c4a43c" opacity="0.3" />
        <circle cx="220" cy="35" r="1" fill="#c4a43c" opacity="0.25" />
        <circle cx="160" cy="50" r="1.2" fill="#c4a43c" opacity="0.2" />
        <circle cx="240" cy="45" r="0.8" fill="#c4a43c" opacity="0.2" />
      </svg>
    ),

    // 12. PINK RIDER — Hot pink grapefruit wheel, lemon drops, citrus rays
    "pink-rider": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pr-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ff8cb4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff8cb4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2e1828" />
        <rect width="400" height="200" fill="url(#pr-glow)" />
        {/* Pink grapefruit wheel */}
        <circle cx="200" cy="90" r="45" fill="#ff8cb4" opacity="0.1" stroke="#ff8cb4" strokeWidth="2" strokeOpacity="0.3" />
        <circle cx="200" cy="90" r="38" fill="none" stroke="#ff8cb4" strokeWidth="1" opacity="0.2" />
        <circle cx="200" cy="90" r="8" fill="#ff8cb4" opacity="0.15" />
        {/* Grapefruit segments */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1="200" y1="90" x2={200 + 36 * Math.cos(rad)} y2={90 + 36 * Math.sin(rad)} stroke="#ff8cb4" strokeWidth="0.8" opacity="0.2" />;
        })}
        {/* Citrus rays extending outward */}
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1={200 + 50 * Math.cos(rad)} y1={90 + 50 * Math.sin(rad)} x2={200 + 85 * Math.cos(rad)} y2={90 + 85 * Math.sin(rad)} stroke="#f0e060" strokeWidth="0.8" opacity="0.12" />;
        })}
        {/* Lemon yellow cookie/drop shapes */}
        <circle cx="100" cy="50" r="8" fill="#f0e060" opacity="0.12" />
        <circle cx="310" cy="140" r="10" fill="#f0e060" opacity="0.1" />
        <circle cx="80" cy="150" r="7" fill="#f0e060" opacity="0.1" />
        <circle cx="330" cy="50" r="6" fill="#f0e060" opacity="0.12" />
        {/* Sugar cookie shapes — rounded rectangles */}
        <rect x="60" y="100" width="16" height="12" rx="4" fill="#f8e0ec" opacity="0.08" />
        <rect x="320" cy="90" width="14" height="14" rx="7" fill="#f8e0ec" opacity="0.08" />
      </svg>
    ),

    // 13. STRAWBERRY BISCOTTI — Cozy parchment, book silhouette, berry cluster
    "strawberry-biscotti": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sb-warmth" cx="0.4" cy="0.6" r="0.5">
            <stop offset="0%" stopColor="#c88060" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c88060" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a1a1a" />
        <rect width="400" height="200" fill="url(#sb-warmth)" />
        {/* Open book silhouette */}
        <path d="M160 130 Q200 120 240 130" fill="none" stroke="#e0c89c" strokeWidth="1.5" opacity="0.3" />
        <path d="M160 130 L160 80 Q200 70 200 80 L200 120" fill="none" stroke="#e0c89c" strokeWidth="1" opacity="0.2" />
        <path d="M240 130 L240 80 Q200 70 200 80 L200 120" fill="none" stroke="#e0c89c" strokeWidth="1" opacity="0.2" />
        {/* Page lines */}
        {[90,98,106,114].map((y,i) => (
          <React.Fragment key={i}>
            <line x1="168" y1={y} x2="195" y2={y-2} stroke="#e0c89c" strokeWidth="0.4" opacity="0.15" />
            <line x1="205" y1={y-2} x2="232" y2={y} stroke="#e0c89c" strokeWidth="0.4" opacity="0.15" />
          </React.Fragment>
        ))}
        {/* Strawberry cluster */}
        <circle cx="300" cy="85" r="10" fill="#c88060" opacity="0.2" />
        <circle cx="288" cy="92" r="9" fill="#c88060" opacity="0.18" />
        <circle cx="306" cy="95" r="8" fill="#c88060" opacity="0.15" />
        {/* Tiny seed dots on berries */}
        <circle cx="298" cy="82" r="0.8" fill="#e0c89c" opacity="0.2" />
        <circle cx="303" cy="86" r="0.8" fill="#e0c89c" opacity="0.2" />
        <circle cx="295" cy="88" r="0.8" fill="#e0c89c" opacity="0.2" />
        {/* Biscotti shape */}
        <rect x="90" cy="60" width="50" height="14" rx="7" fill="#e0c89c" opacity="0.1" transform="rotate(-15 115 67)" />
        {/* Steam/aroma wisps */}
        <path d="M195 70 Q198 58 200 64 Q202 52 205 60" fill="none" stroke="#e0c89c" strokeWidth="0.8" opacity="0.15" />
      </svg>
    ),

    // 14. AVENUE OF THE GIANTS — Tall redwood trunks, fern fronds, light rays
    "avenue-of-the-giants": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aog-light" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#d4b060" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4b060" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="#0e2414" />
        {/* Redwood trunks */}
        <rect x="60" y="0" width="18" height="200" fill="#2a4020" opacity="0.6" />
        <rect x="140" y="0" width="22" height="200" fill="#2a4020" opacity="0.5" />
        <rect x="240" y="0" width="20" height="200" fill="#2a4020" opacity="0.55" />
        <rect x="320" y="0" width="16" height="200" fill="#2a4020" opacity="0.5" />
        {/* Bark texture lines */}
        {[60,140,240,320].map((x,i) => (
          <React.Fragment key={i}>
            <line x1={x+3} y1="0" x2={x+3} y2="200" stroke="#1a3018" strokeWidth="0.5" opacity="0.3" />
            <line x1={x+10} y1="0" x2={x+10} y2="200" stroke="#1a3018" strokeWidth="0.5" opacity="0.3" />
          </React.Fragment>
        ))}
        {/* Light rays through canopy */}
        <polygon points="180,0 200,200 190,200" fill="url(#aog-light)" opacity="0.5" />
        <polygon points="280,0 310,200 295,200" fill="url(#aog-light)" opacity="0.35" />
        <polygon points="110,0 130,200 120,200" fill="url(#aog-light)" opacity="0.25" />
        {/* Fern fronds at base */}
        <path d="M20 185 Q30 170 40 175 Q50 160 60 168 Q55 175 45 178 Q35 180 25 185" fill="#8EAE68" opacity="0.2" />
        <path d="M350 190 Q360 175 370 180 Q380 165 390 172 Q385 178 375 182 Q365 185 355 190" fill="#8EAE68" opacity="0.18" />
        <path d="M180 195 Q190 182 200 186 Q210 174 218 180" fill="none" stroke="#8EAE68" strokeWidth="1.5" opacity="0.2" />
        {/* Floating spores/particles in light */}
        <circle cx="190" cy="60" r="1.5" fill="#d4b060" opacity="0.3" />
        <circle cx="195" cy="100" r="1" fill="#d4b060" opacity="0.25" />
        <circle cx="185" cy="140" r="1.2" fill="#d4b060" opacity="0.2" />
        <circle cx="300" cy="80" r="1" fill="#d4b060" opacity="0.2" />
        <circle cx="295" cy="130" r="1.3" fill="#d4b060" opacity="0.15" />
      </svg>
    ),

    // 15. PEACH FLAMBE — Sunny golden drive, peach halves, amber warmth
    "peach-flambe": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pf-sun" cx="0.5" cy="0.25" r="0.6">
            <stop offset="0%" stopColor="#f0b464" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#d4944c" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d4944c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2e2418" />
        <rect width="400" height="200" fill="url(#pf-sun)" />
        {/* Peach half — cross section */}
        <circle cx="200" cy="95" r="40" fill="#f0b464" opacity="0.12" stroke="#f0b464" strokeWidth="2" strokeOpacity="0.25" />
        <circle cx="200" cy="95" r="30" fill="#d4944c" opacity="0.08" />
        {/* Peach pit */}
        <ellipse cx="200" cy="95" rx="12" ry="15" fill="#8a6030" opacity="0.2" />
        <ellipse cx="200" cy="95" rx="8" ry="11" fill="#6a4820" opacity="0.15" />
        {/* Flame licks */}
        <path d="M170 140 Q175 120 180 130 Q185 110 190 125 Q192 108 196 120" fill="none" stroke="#f0b464" strokeWidth="1.5" opacity="0.2" />
        <path d="M210 138 Q215 118 220 128 Q225 108 228 122" fill="none" stroke="#f0b464" strokeWidth="1.5" opacity="0.18" />
        {/* Road/drive lines */}
        <path d="M0 170 Q100 165 200 168 Q300 165 400 170 L400 200 L0 200Z" fill="#443420" opacity="0.4" />
        <line x1="0" y1="180" x2="400" y2="180" stroke="#f0b464" strokeWidth="0.5" opacity="0.15" strokeDasharray="20 15" />
        {/* Sun rays */}
        {[0,30,60,90,120,150].map((a,i) => {
          const rad = ((a - 75) * Math.PI) / 180;
          return <line key={i} x1={200 + 50 * Math.cos(rad)} y1={40 + 50 * Math.sin(rad)} x2={200 + 100 * Math.cos(rad)} y2={40 + 100 * Math.sin(rad)} stroke="#f0b464" strokeWidth="0.8" opacity="0.1" />;
        })}
      </svg>
    ),

    // 16. TROPICANNA CHERRY — Cherry blossom petals, spring sunshine, citrus
    "tropicanna-cherry": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="tc-glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#f0c040" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f0c040" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a1418" />
        <rect width="400" height="200" fill="url(#tc-glow)" />
        {/* Cherry branch */}
        <path d="M80 30 Q150 50 200 80 Q250 100 300 90 Q340 85 370 70" fill="none" stroke="#5a2020" strokeWidth="3" opacity="0.4" />
        <path d="M200 80 Q210 100 220 110" fill="none" stroke="#5a2020" strokeWidth="2" opacity="0.3" />
        {/* Cherries */}
        <circle cx="220" cy="118" r="10" fill="#f06450" opacity="0.25" />
        <circle cx="235" cy="115" r="9" fill="#f06450" opacity="0.22" />
        <circle cx="222" cy="114" r="2" fill="#f0d4cc" opacity="0.15" />
        {/* Cherry blossom petals */}
        {[[100,45],[160,35],[130,55],[250,60],[300,50],[280,75]].map(([x,y],i) => (
          <g key={i} opacity={0.15 + (i%3)*0.05}>
            <ellipse cx={x} cy={y} rx="6" ry="3" fill="#f06450" transform={`rotate(${i*30} ${x} ${y})`} />
            <ellipse cx={x} cy={y} rx="3" ry="6" fill="#f06450" transform={`rotate(${i*30} ${x} ${y})`} />
          </g>
        ))}
        {/* Floating petals falling */}
        <ellipse cx="150" cy="120" rx="4" ry="2" fill="#f06450" opacity="0.12" transform="rotate(45 150 120)" />
        <ellipse cx="280" cy="140" rx="3" ry="1.5" fill="#f06450" opacity="0.1" transform="rotate(-30 280 140)" />
        <ellipse cx="100" cy="160" rx="3.5" ry="1.8" fill="#f06450" opacity="0.08" transform="rotate(60 100 160)" />
        {/* Citrus accent circles */}
        <circle cx="340" cy="140" r="6" fill="#f0c040" opacity="0.1" />
        <circle cx="60" cy="130" r="5" fill="#f0c040" opacity="0.08" />
        {/* Ground */}
        <path d="M0 180 Q200 174 400 180 L400 200 L0 200Z" fill="#1e0e12" opacity="0.4" />
      </svg>
    ),

    // 17. PINK JESUS RESERVE — Warm gathering, lavender, candle glow
    "pink-jesus-reserve": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pjr-candle" cx="0.5" cy="0.3" r="0.4">
            <stop offset="0%" stopColor="#e0b860" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e0b860" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a1828" />
        <rect width="400" height="200" fill="url(#pjr-candle)" />
        {/* Wine glass silhouette */}
        <path d="M190 140 L190 110 Q175 90 180 70 Q185 55 200 50 Q215 55 220 70 Q225 90 210 110 L210 140" fill="none" stroke="#dc8cb4" strokeWidth="1.5" opacity="0.25" />
        <line x1="182" y1="140" x2="218" y2="140" stroke="#dc8cb4" strokeWidth="1.5" opacity="0.25" />
        <ellipse cx="200" cy="140" rx="18" ry="4" fill="none" stroke="#dc8cb4" strokeWidth="1" opacity="0.15" />
        {/* Wine liquid */}
        <path d="M183 90 Q190 85 200 83 Q210 85 217 90 Q222 95 218 105 L182 105 Q178 95 183 90" fill="#dc8cb4" opacity="0.1" />
        {/* Candle flames */}
        <ellipse cx="100" cy="80" rx="4" ry="8" fill="#e0b860" opacity="0.25" />
        <rect x="98" y="88" width="4" height="20" fill="#e0c89c" opacity="0.15" />
        <ellipse cx="310" cy="75" rx="3.5" ry="7" fill="#e0b860" opacity="0.22" />
        <rect x="308" y="82" width="4" height="18" fill="#e0c89c" opacity="0.15" />
        {/* Lavender sprigs */}
        <g opacity="0.2">
          <line x1="140" y1="170" x2="145" y2="130" stroke="#9c7ba8" strokeWidth="1" />
          <circle cx="145" cy="130" r="2" fill="#9c7ba8" />
          <circle cx="144" cy="135" r="1.8" fill="#9c7ba8" />
          <circle cx="146" cy="140" r="1.5" fill="#9c7ba8" />
        </g>
        <g opacity="0.18">
          <line x1="260" y1="175" x2="258" y2="135" stroke="#9c7ba8" strokeWidth="1" />
          <circle cx="258" cy="135" r="2" fill="#9c7ba8" />
          <circle cx="259" cy="140" r="1.8" fill="#9c7ba8" />
          <circle cx="257" cy="145" r="1.5" fill="#9c7ba8" />
        </g>
        {/* Warm gathering dots (people silhouettes abstracted) */}
        <circle cx="150" cy="165" r="6" fill="#dc8cb4" opacity="0.08" />
        <circle cx="200" cy="168" r="7" fill="#dc8cb4" opacity="0.08" />
        <circle cx="250" cy="165" r="6" fill="#dc8cb4" opacity="0.08" />
      </svg>
    ),

    // 18. LOVE AND LAUGHTER CBD — Clean sage, clear focus, berry + white
    "love-and-laughter-cbd": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ll-clean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2a20" />
            <stop offset="100%" stopColor="#243826" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#ll-clean)" />
        {/* Clean geometric circles — focus/clarity */}
        <circle cx="200" cy="100" r="60" fill="none" stroke="#88c098" strokeWidth="1" opacity="0.2" />
        <circle cx="200" cy="100" r="45" fill="none" stroke="#88c098" strokeWidth="0.8" opacity="0.15" />
        <circle cx="200" cy="100" r="30" fill="none" stroke="#e0ece0" strokeWidth="0.6" opacity="0.12" />
        <circle cx="200" cy="100" r="15" fill="none" stroke="#e0ece0" strokeWidth="0.5" opacity="0.1" />
        {/* Cross-hair focus lines */}
        <line x1="130" y1="100" x2="270" y2="100" stroke="#88c098" strokeWidth="0.5" opacity="0.1" />
        <line x1="200" y1="30" x2="200" y2="170" stroke="#88c098" strokeWidth="0.5" opacity="0.1" />
        {/* Sage leaves */}
        <ellipse cx="100" cy="70" rx="16" ry="8" fill="#88c098" opacity="0.15" transform="rotate(-20 100 70)" />
        <ellipse cx="108" cy="66" rx="14" ry="7" fill="#88c098" opacity="0.12" transform="rotate(-10 108 66)" />
        <ellipse cx="300" cy="130" rx="15" ry="7.5" fill="#88c098" opacity="0.14" transform="rotate(25 300 130)" />
        {/* Berry dots */}
        <circle cx="80" cy="140" r="5" fill="#b888c0" opacity="0.15" />
        <circle cx="90" cy="148" r="4" fill="#b888c0" opacity="0.12" />
        <circle cx="320" cy="60" r="4.5" fill="#b888c0" opacity="0.13" />
        <circle cx="330" cy="68" r="3.5" fill="#b888c0" opacity="0.1" />
        {/* CBD molecule hint — hexagons */}
        <polygon points="200,75 210,80 210,90 200,95 190,90 190,80" fill="none" stroke="#e0ece0" strokeWidth="0.5" opacity="0.12" />
        <polygon points="210,80 220,75 230,80 230,90 220,95 210,90" fill="none" stroke="#e0ece0" strokeWidth="0.5" opacity="0.1" />
      </svg>
    ),

    // 19. GLITTER BOMB — Velvet fireworks, kiwi, emerald, gold sparkle
    "glitter-bomb": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#0e2818" />
        {/* Firework bursts */}
        {/* Central burst */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          const len = 30 + (i % 3) * 10;
          return <line key={i} x1="200" y1="80" x2={200 + len * Math.cos(rad)} y2={80 + len * Math.sin(rad)} stroke="#dcc850" strokeWidth="1" opacity="0.2" />;
        })}
        <circle cx="200" cy="80" r="4" fill="#dcc850" opacity="0.3" />
        {/* Secondary burst top-left */}
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={`b${i}`} x1="100" y1="50" x2={100 + 20 * Math.cos(rad)} y2={50 + 20 * Math.sin(rad)} stroke="#50c880" strokeWidth="0.8" opacity="0.15" />;
        })}
        <circle cx="100" cy="50" r="3" fill="#50c880" opacity="0.25" />
        {/* Third burst right */}
        {[0,60,120,180,240,300].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={`c${i}`} x1="310" y1="70" x2={310 + 18 * Math.cos(rad)} y2={70 + 18 * Math.sin(rad)} stroke="#dcc850" strokeWidth="0.8" opacity="0.15" />;
        })}
        <circle cx="310" cy="70" r="2.5" fill="#dcc850" opacity="0.2" />
        {/* Kiwi cross-section */}
        <circle cx="200" cy="145" r="22" fill="#50c880" opacity="0.1" stroke="#50c880" strokeWidth="1.5" strokeOpacity="0.2" />
        <circle cx="200" cy="145" r="15" fill="none" stroke="#50c880" strokeWidth="0.8" opacity="0.15" />
        <circle cx="200" cy="145" r="4" fill="#dcc850" opacity="0.15" />
        {/* Kiwi seed dots */}
        {[0,40,80,120,160,200,240,280,320].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <circle key={`s${i}`} cx={200 + 10 * Math.cos(rad)} cy={145 + 10 * Math.sin(rad)} r="1" fill="#0e2818" opacity="0.3" />;
        })}
        {/* Glitter particles */}
        {[[50,120,1.5],[80,90,1],[130,30,1.2],[270,40,1],[340,110,1.3],[150,170,1],[280,160,0.8],[360,30,1.1]].map(([x,y,r],i) => (
          <circle key={`g${i}`} cx={x} cy={y} r={r} fill="#dcc850" opacity={0.15 + (i%3)*0.05} />
        ))}
      </svg>
    ),

    // 20. MOONLIGHT — Crescent moon, rolling hills, stars, teacup silhouette
    "moonlight": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ml-moonglow" cx="0.5" cy="0.3" r="0.3">
            <stop offset="0%" stopColor="#c9d4f0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c9d4f0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#0f1628" />
        <rect width="400" height="200" fill="url(#ml-moonglow)" />
        {/* Crescent moon */}
        <circle cx="200" cy="50" r="22" fill="#c9d4f0" opacity="0.2" />
        <circle cx="210" cy="44" r="18" fill="#0f1628" />
        {/* Stars */}
        {[[80,25,1.5],[130,40,1],[160,20,1.2],[250,30,1],[300,15,1.5],[340,40,1],[60,60,0.8],[280,55,1.2],[120,65,0.8],[350,60,0.7],[180,45,0.6],[230,15,1]].map(([x,y,r],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#c9d4f0" opacity={0.2 + (i%4)*0.08} />
        ))}
        {/* Rolling hills */}
        <path d="M0 140 Q60 120 120 130 Q180 115 250 125 Q320 112 400 130 L400 200 L0 200Z" fill="#1a2744" opacity="0.6" />
        <path d="M0 155 Q80 140 160 148 Q240 138 320 145 Q370 140 400 150 L400 200 L0 200Z" fill="#162040" opacity="0.5" />
        {/* Sage-colored grass on hills */}
        <path d="M0 160 Q50 155 100 158 Q150 152 200 156 Q250 150 300 155 Q350 152 400 158 L400 200 L0 200Z" fill="#8EAE68" opacity="0.06" />
        {/* Teacup silhouette on hill */}
        <path d="M280 148 L278 138 Q280 132 286 130 Q294 130 296 132 Q298 138 296 148Z" fill="#c9d4f0" opacity="0.1" />
        <path d="M296 135 Q302 134 303 138 Q302 142 296 141" fill="none" stroke="#c9d4f0" strokeWidth="0.8" opacity="0.1" />
        {/* Steam wisps */}
        <path d="M285 130 Q287 122 289 126 Q291 118 293 124" fill="none" stroke="#c9d4f0" strokeWidth="0.6" opacity="0.1" />
      </svg>
    ),

    // 21. MANDARIN CHERRY TREE — Serene lavender drift, orange + wood
    "mandarin-cherry-tree": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mct-glow" cx="0.5" cy="0.4" r="0.5">
            <stop offset="0%" stopColor="#d2a078" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d2a078" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#2a2028" />
        <rect width="400" height="200" fill="url(#mct-glow)" />
        {/* Cherry tree trunk and branches */}
        <rect x="195" y="100" width="10" height="100" rx="3" fill="#6a4838" opacity="0.4" />
        <path d="M200 100 Q160 70 130 50" fill="none" stroke="#6a4838" strokeWidth="4" opacity="0.35" />
        <path d="M200 100 Q240 65 270 55" fill="none" stroke="#6a4838" strokeWidth="4" opacity="0.35" />
        <path d="M200 100 Q185 80 170 75" fill="none" stroke="#6a4838" strokeWidth="2.5" opacity="0.3" />
        <path d="M200 100 Q220 78 240 80" fill="none" stroke="#6a4838" strokeWidth="2.5" opacity="0.3" />
        {/* Mandarin orange fruits */}
        <circle cx="135" cy="52" r="7" fill="#d2a078" opacity="0.25" />
        <circle cx="265" cy="58" r="8" fill="#d2a078" opacity="0.22" />
        <circle cx="175" cy="76" r="6" fill="#d2a078" opacity="0.2" />
        <circle cx="235" cy="82" r="5.5" fill="#d2a078" opacity="0.18" />
        {/* Cherry blossom clouds */}
        <circle cx="130" cy="45" r="20" fill="#b898c0" opacity="0.06" />
        <circle cx="155" cy="38" r="15" fill="#b898c0" opacity="0.05" />
        <circle cx="260" cy="48" r="18" fill="#b898c0" opacity="0.06" />
        <circle cx="240" cy="42" r="14" fill="#b898c0" opacity="0.05" />
        {/* Fallen petals */}
        <ellipse cx="160" cy="175" rx="3" ry="1.5" fill="#b898c0" opacity="0.1" transform="rotate(30 160 175)" />
        <ellipse cx="230" cy="180" rx="2.5" ry="1.2" fill="#b898c0" opacity="0.08" transform="rotate(-20 230 180)" />
        <ellipse cx="200" cy="185" rx="3" ry="1.5" fill="#b898c0" opacity="0.07" transform="rotate(45 200 185)" />
        {/* Wood grain ground */}
        <path d="M0 185 Q200 180 400 185 L400 200 L0 200Z" fill="#3a2c38" opacity="0.3" />
      </svg>
    ),

    // 22. PINNACLE — Velvet curtain folds, nutmeg sphere, cream swirl
    "pinnacle": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#18101e" />
        {/* Velvet curtain folds */}
        <path d="M0 0 Q20 100 0 200" fill="none" stroke="#a090b0" strokeWidth="2" opacity="0.12" />
        <path d="M30 0 Q50 80 40 200" fill="none" stroke="#a090b0" strokeWidth="1.5" opacity="0.1" />
        <path d="M60 0 Q75 90 65 200" fill="none" stroke="#a090b0" strokeWidth="1.5" opacity="0.08" />
        <path d="M400 0 Q380 100 400 200" fill="none" stroke="#a090b0" strokeWidth="2" opacity="0.12" />
        <path d="M370 0 Q350 80 360 200" fill="none" stroke="#a090b0" strokeWidth="1.5" opacity="0.1" />
        <path d="M340 0 Q325 90 335 200" fill="none" stroke="#a090b0" strokeWidth="1.5" opacity="0.08" />
        {/* Central curtain drape */}
        <path d="M100 0 Q150 30 200 20 Q250 30 300 0" fill="none" stroke="#a090b0" strokeWidth="1.5" opacity="0.1" />
        <path d="M120 0 Q160 25 200 18 Q240 25 280 0" fill="none" stroke="#a090b0" strokeWidth="1" opacity="0.08" />
        {/* Nutmeg sphere */}
        <circle cx="200" cy="110" r="25" fill="#c8b4a0" opacity="0.1" stroke="#c8b4a0" strokeWidth="1.5" strokeOpacity="0.2" />
        <circle cx="200" cy="110" r="18" fill="none" stroke="#c8b4a0" strokeWidth="0.8" opacity="0.12" />
        {/* Nutmeg texture cross-lines */}
        <path d="M185 95 Q200 110 185 125" fill="none" stroke="#c8b4a0" strokeWidth="0.5" opacity="0.1" />
        <path d="M200 86 L200 134" fill="none" stroke="#c8b4a0" strokeWidth="0.5" opacity="0.1" />
        <path d="M215 95 Q200 110 215 125" fill="none" stroke="#c8b4a0" strokeWidth="0.5" opacity="0.1" />
        {/* Cream swirl */}
        <path d="M180 150 Q190 145 200 150 Q210 155 220 150 Q230 145 240 150" fill="none" stroke="#d0c4d0" strokeWidth="1.5" opacity="0.12" />
        <path d="M170 160 Q190 152 210 158 Q230 162 250 155" fill="none" stroke="#d0c4d0" strokeWidth="1" opacity="0.08" />
        {/* Deep dark vignette feel */}
        <rect x="0" y="180" width="400" height="20" fill="#100a14" opacity="0.3" />
      </svg>
    ),

    // 23. BLUEBERRY MUFFIN — Candle flame, blueberries, muffin silhouette
    "blueberry-muffin": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bm-candle" cx="0.5" cy="0.3" r="0.3">
            <stop offset="0%" stopColor="#d4a850" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d4a850" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill="#201a14" />
        <rect width="400" height="200" fill="url(#bm-candle)" />
        {/* Candle */}
        <rect x="195" y="70" width="10" height="40" fill="#e0c89c" opacity="0.2" rx="2" />
        <ellipse cx="200" cy="66" rx="5" ry="10" fill="#d4a850" opacity="0.35" />
        <ellipse cx="200" cy="64" rx="3" ry="6" fill="#f0e0b0" opacity="0.25" />
        {/* Candle glow ring */}
        <circle cx="200" cy="70" r="30" fill="none" stroke="#d4a850" strokeWidth="0.5" opacity="0.1" />
        <circle cx="200" cy="70" r="50" fill="none" stroke="#d4a850" strokeWidth="0.3" opacity="0.06" />
        {/* Muffin silhouette */}
        <path d="M150 160 Q155 130 170 125 Q185 120 200 122 Q215 120 230 125 Q245 130 250 160Z" fill="#30261c" opacity="0.4" />
        {/* Muffin liner ridges */}
        <path d="M155 155 L165 135" fill="none" stroke="#e0d8cc" strokeWidth="0.5" opacity="0.1" />
        <path d="M175 160 L180 138" fill="none" stroke="#e0d8cc" strokeWidth="0.5" opacity="0.1" />
        <path d="M200 160 L200 136" fill="none" stroke="#e0d8cc" strokeWidth="0.5" opacity="0.1" />
        <path d="M225 160 L220 138" fill="none" stroke="#e0d8cc" strokeWidth="0.5" opacity="0.1" />
        <path d="M245 155 L235 135" fill="none" stroke="#e0d8cc" strokeWidth="0.5" opacity="0.1" />
        {/* Muffin top dome */}
        <path d="M155 130 Q175 105 200 102 Q225 105 245 130" fill="#30261c" opacity="0.3" />
        {/* Blueberries on top */}
        <circle cx="180" cy="112" r="5" fill="#6450b4" opacity="0.25" />
        <circle cx="195" cy="108" r="4.5" fill="#6450b4" opacity="0.22" />
        <circle cx="210" cy="110" r="5" fill="#6450b4" opacity="0.2" />
        <circle cx="220" cy="115" r="4" fill="#6450b4" opacity="0.18" />
        {/* Scattered blueberries */}
        <circle cx="100" cy="140" r="6" fill="#6450b4" opacity="0.15" />
        <circle cx="110" cy="150" r="5" fill="#6450b4" opacity="0.12" />
        <circle cx="290" cy="145" r="5.5" fill="#6450b4" opacity="0.13" />
        <circle cx="305" cy="150" r="4.5" fill="#6450b4" opacity="0.1" />
        {/* Warm floor */}
        <path d="M0 175 Q200 170 400 175 L400 200 L0 200Z" fill="#18120c" opacity="0.4" />
      </svg>
    ),

    // 24. LEMON PAPAYA BANANA — Sun-bleached ocean drift, fruit + waves
    "lemon-papaya-banana": (
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lpb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38301e" />
            <stop offset="100%" stopColor="#2a2018" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#lpb-sky)" />
        {/* Sun-bleached sky glow */}
        <ellipse cx="300" cy="30" rx="80" ry="30" fill="#e0c860" opacity="0.08" />
        {/* Ocean waves */}
        <path d="M0 110 Q40 100 80 108 Q120 116 160 106 Q200 98 240 108 Q280 116 320 106 Q360 98 400 108 L400 200 L0 200Z" fill="#64a0c8" opacity="0.08" />
        <path d="M0 120 Q50 112 100 118 Q150 126 200 116 Q250 108 300 118 Q350 126 400 118" fill="none" stroke="#64a0c8" strokeWidth="1.5" opacity="0.15" />
        <path d="M0 130 Q60 124 120 130 Q180 136 240 128 Q300 122 360 130 Q380 132 400 130" fill="none" stroke="#64a0c8" strokeWidth="1" opacity="0.1" />
        {/* Papaya half */}
        <ellipse cx="140" cy="75" rx="25" ry="18" fill="#d2a078" opacity="0.12" stroke="#d2a078" strokeWidth="1" strokeOpacity="0.2" />
        <ellipse cx="140" cy="75" rx="12" ry="8" fill="#e0c860" opacity="0.08" />
        {/* Papaya seeds */}
        <circle cx="135" cy="73" r="1.5" fill="#2a2018" opacity="0.15" />
        <circle cx="140" cy="70" r="1.5" fill="#2a2018" opacity="0.15" />
        <circle cx="145" cy="73" r="1.5" fill="#2a2018" opacity="0.15" />
        <circle cx="138" cy="78" r="1.5" fill="#2a2018" opacity="0.12" />
        <circle cx="143" cy="78" r="1.5" fill="#2a2018" opacity="0.12" />
        {/* Lemon slice */}
        <circle cx="260" cy="70" r="16" fill="#e0c860" opacity="0.1" stroke="#e0c860" strokeWidth="1" strokeOpacity="0.2" />
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1="260" y1="70" x2={260 + 13 * Math.cos(rad)} y2={70 + 13 * Math.sin(rad)} stroke="#e0c860" strokeWidth="0.5" opacity="0.15" />;
        })}
        {/* Banana curve */}
        <path d="M170 50 Q200 35 230 45 Q245 52 250 60" fill="none" stroke="#e0c860" strokeWidth="4" opacity="0.1" strokeLinecap="round" />
        {/* Sand beach */}
        <path d="M0 160 Q100 154 200 158 Q300 154 400 160 L400 200 L0 200Z" fill="#38301e" opacity="0.3" />
        {/* Beach foam */}
        <path d="M0 158 Q50 152 100 156 Q150 160 200 154 Q250 150 300 156 Q350 160 400 156" fill="none" stroke="#e0dcd0" strokeWidth="0.5" opacity="0.1" />
      </svg>
    ),
  };

  return svgs[slug] || (
    <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill={d.bg || "#1a1a2e"} />
      <circle cx="200" cy="100" r="40" fill={accent} opacity="0.15" />
      <circle cx="200" cy="100" r="25" fill={secondary} opacity="0.1" />
    </svg>
  );
}

// ============================================
// STRAIN EXPERIENCE PAGE COMPONENT
// ============================================
const StrainExperiencePage = ({ strain, onBack, pantry, setPantry }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const slug = strain?.slug || "";
  const design = STRAIN_DESIGNS[slug] || {
    bg: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
    cardBg: "rgba(142,174,104,0.08)",
    textColor: "#d4dce8",
    textMuted: "rgba(212,220,232,0.6)",
    accentColor: "#8EAE68",
    secondaryColor: "#c9d4f0",
    heroHeight: 300,
  };

  const expData = STRAIN_EXPERIENCE_DATA[slug] || {};
  const spotifyUrl = SPOTIFY_PLAYLISTS[slug] || "";

  // Find matching juice recipe
  const juiceRecipe = useMemo(() => {
    if (!JUICE_RECIPES || !strain) return null;
    const strainName = (strain.name || "").toLowerCase();
    return JUICE_RECIPES.find(r => {
      const recipeName = (r.name || r.id || "").toLowerCase();
      return recipeName.includes(strainName) || strainName.includes(recipeName) ||
        (r.strain && r.strain.toLowerCase() === strainName) ||
        (r.id && r.id === slug);
    }) || null;
  }, [strain, slug]);

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Narrative split into paragraphs
  const narrativeParagraphs = useMemo(() => {
    const text = expData.narrative || "";
    return text.split('\n\n').filter(p => p.trim().length > 0);
  }, [expData.narrative]);

  // Style helpers
  const sectionStyle = {
    padding: "24px 20px",
    borderBottom: `1px solid ${design.accentColor}15`,
  };

  const sectionTitleStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: 600,
    color: design.textColor,
    marginBottom: 16,
    letterSpacing: 0.5,
  };

  const cardStyle = {
    background: design.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    border: `1px solid ${design.accentColor}10`,
  };

  const accordionHeaderStyle = (isOpen) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    background: isOpen ? design.cardBg : "transparent",
    borderRadius: 8,
    cursor: "pointer",
    borderBottom: `1px solid ${design.accentColor}10`,
    transition: "background 0.2s",
  });

  if (!strain) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: design.bg,
      color: design.textColor,
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: "relative",
    }}>
      {/* ====== HERO SECTION ====== */}
      <div style={{
        position: "relative",
        minHeight: design.heroHeight,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "20px 20px 30px",
      }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(0,0,0,0.3)",
            border: "none",
            borderRadius: 20,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            color: design.textColor,
            fontSize: 20,
          }}
          aria-label="Go back"
        >
          &#8592;
        </button>

        {/* SVG Illustration */}
        <div style={{
          width: "100%",
          maxWidth: 400,
          marginBottom: 20,
          opacity: 0.9,
        }}>
          {getStrainHeroSvg(slug, design)}
        </div>

        {/* Strain name */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 32,
          fontWeight: 600,
          color: design.textColor,
          textAlign: "center",
          margin: "0 0 6px",
          letterSpacing: 1,
          lineHeight: 1.2,
        }}>
          {strain.name}
        </h1>

        {/* Farm and region */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14,
          color: design.textMuted,
          textAlign: "center",
          margin: "0 0 10px",
          letterSpacing: 0.8,
        }}>
          {expData.farm || strain.farm} &middot; {expData.region || strain.region}
        </p>

        {/* Intent statement */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 16,
          fontStyle: "italic",
          color: design.accentColor,
          textAlign: "center",
          margin: 0,
          opacity: 0.85,
          maxWidth: 320,
        }}>
          {expData.intent || ""}
        </p>

        {/* Energy + effects tags */}
        <div style={{
          display: "flex",
          gap: 8,
          marginTop: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {expData.energy && (
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              color: design.textColor,
              background: `${design.accentColor}20`,
              padding: "3px 10px",
              borderRadius: 12,
            }}>
              {expData.energy}
            </span>
          )}
          {(expData.effects || []).map((ef, i) => (
            <span key={i} style={{
              fontSize: 11,
              color: design.textMuted,
              background: `${design.secondaryColor}12`,
              padding: "3px 10px",
              borderRadius: 12,
            }}>
              {ef}
            </span>
          ))}
        </div>
      </div>

      {/* ====== NARRATIVE SECTION ====== */}
      {narrativeParagraphs.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>The Story</h2>
          {narrativeParagraphs.map((para, idx) => (
            <p key={idx} style={{
              fontSize: idx === 0 ? 16 : 14,
              lineHeight: 1.7,
              color: idx === 0 ? design.textColor : design.textMuted,
              margin: "0 0 16px",
              fontFamily: idx === 0 ? "'Cormorant Garamond', Georgia, serif" : "'Inter', sans-serif",
            }}>
              {para}
            </p>
          ))}
        </div>
      )}

      {/* ====== SPOTIFY EMBED ====== */}
      {spotifyUrl && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Sonic Layer</h2>
          {/* Playlist info */}
          {expData.spotify && (
            <div style={{ marginBottom: 12 }}>
              <p style={{
                fontSize: 15,
                fontWeight: 600,
                color: design.textColor,
                margin: "0 0 4px",
              }}>
                {expData.spotify.title}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {expData.bpmRange && (
                  <span style={{
                    fontSize: 12,
                    color: design.textMuted,
                    background: `${design.accentColor}15`,
                    padding: "2px 8px",
                    borderRadius: 8,
                  }}>
                    {expData.bpmRange[0]}-{expData.bpmRange[1]} BPM
                  </span>
                )}
                {(expData.genres || []).slice(0, 4).map((g, i) => (
                  <span key={i} style={{
                    fontSize: 11,
                    color: design.textMuted,
                    background: `${design.secondaryColor}10`,
                    padding: "2px 8px",
                    borderRadius: 8,
                  }}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
          <iframe
            src={spotifyUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: 12 }}
          />
        </div>
      )}

      {/* ====== TERPENE PROFILE ====== */}
      {expData.terpeneProfile && expData.terpeneProfile.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Terpene Profile</h2>
          <p style={{
            fontSize: 12,
            color: design.textMuted,
            margin: "0 0 4px",
          }}>
            Total: {expData.totalTerpenes}% &middot; Dominant: {expData.dominantTerpene}
          </p>
          <div style={{ marginTop: 12 }}>
            {expData.terpeneProfile.map((terp, idx) => {
              const terpColor = TERPENE_COLORS[terp.name] || design.accentColor;
              const maxRatio = Math.max(...expData.terpeneProfile.map(t => t.ratio));
              const barWidth = maxRatio > 0 ? (terp.ratio / maxRatio) * 100 : 0;
              return (
                <div key={idx} style={{ marginBottom: 10 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: terpColor,
                      }} />
                      <span style={{ fontSize: 13, color: design.textColor }}>
                        {terp.name}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: design.textMuted }}>
                      {terp.pct}%
                    </span>
                  </div>
                  <div style={{
                    height: 6,
                    borderRadius: 3,
                    background: `${terpColor}15`,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      borderRadius: 3,
                      background: terpColor,
                      opacity: 0.7,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== OIL BLEND CARD ====== */}
      {expData.oilRecipe && expData.oilRecipe.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Essential Oil Blend</h2>
          <div style={cardStyle}>
            {expData.oilRecipe.map((oil, idx) => {
              const maxDrops = Math.max(...expData.oilRecipe.map(o => o.drops));
              const barWidth = maxDrops > 0 ? (oil.drops / maxDrops) * 100 : 0;
              return (
                <div key={idx} style={{ marginBottom: 8 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
                  }}>
                    <span style={{ fontSize: 13, color: design.textColor }}>
                      {oil.oil}
                    </span>
                    <span style={{ fontSize: 12, color: design.textMuted }}>
                      {oil.drops} drops ({oil.pct}%)
                    </span>
                  </div>
                  <div style={{
                    height: 5,
                    borderRadius: 2.5,
                    background: `${design.accentColor}12`,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      borderRadius: 2.5,
                      background: design.accentColor,
                      opacity: 0.5,
                      transition: "width 0.5s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====== BREATHWORK CARD ====== */}
      {expData.breathwork && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Breathwork</h2>
          <div style={cardStyle}>
            <p style={{
              fontSize: 15,
              fontWeight: 600,
              color: design.accentColor,
              margin: "0 0 8px",
            }}>
              {expData.breathwork.protocol}
            </p>

            {/* Pattern visualization */}
            {expData.breathwork.pattern && (
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                marginBottom: 12,
                padding: "12px 0",
              }}>
                {/* Inhale bar */}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    height: expData.breathwork.pattern.inhale_sec * 10,
                    background: `${design.accentColor}40`,
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: design.accentColor }}>
                      {expData.breathwork.pattern.inhale_sec}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: design.textMuted, marginTop: 4, display: "block" }}>
                    inhale
                  </span>
                </div>
                {/* Hold bar */}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    height: expData.breathwork.pattern.hold_sec * 10,
                    background: `${design.secondaryColor}30`,
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: design.secondaryColor }}>
                      {expData.breathwork.pattern.hold_sec}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: design.textMuted, marginTop: 4, display: "block" }}>
                    hold
                  </span>
                </div>
                {/* Exhale bar */}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    height: expData.breathwork.pattern.exhale_sec * 10,
                    background: `${design.accentColor}25`,
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: design.accentColor, opacity: 0.7 }}>
                      {expData.breathwork.pattern.exhale_sec}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: design.textMuted, marginTop: 4, display: "block" }}>
                    exhale
                  </span>
                </div>
              </div>
            )}

            <div style={{
              display: "flex",
              gap: 16,
              marginBottom: 10,
              flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 12, color: design.textMuted }}>
                {expData.breathwork.duration} min
              </span>
              {expData.breathwork.pattern && (
                <span style={{ fontSize: 12, color: design.textMuted }}>
                  {expData.breathwork.pattern.cycles} cycles
                </span>
              )}
              <span style={{ fontSize: 12, color: design.textMuted }}>
                Target: {expData.breathwork.target}
              </span>
            </div>

            <p style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: design.textMuted,
              margin: 0,
              fontStyle: "italic",
            }}>
              {expData.breathwork.guidance}
            </p>
          </div>
        </div>
      )}

      {/* ====== JUICE RECIPE ====== */}
      {juiceRecipe && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Juice Recipe</h2>
          <div style={cardStyle}>
            <p style={{
              fontSize: 15,
              fontWeight: 600,
              color: design.accentColor,
              margin: "0 0 4px",
            }}>
              {juiceRecipe.name}
            </p>
            {juiceRecipe.subtitle && (
              <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 12px" }}>
                {juiceRecipe.subtitle}
              </p>
            )}

            {/* Ingredients */}
            {juiceRecipe.ingredients && (
              <div style={{ marginBottom: 12 }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: design.textColor,
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}>
                  Ingredients
                </p>
                {juiceRecipe.ingredients.map((ing, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "3px 0",
                  }}>
                    <span style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: design.accentColor,
                      opacity: 0.5,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 13, color: design.textMuted }}>
                      {typeof ing === "string" ? ing : `${ing.qty || ""} ${ing.name || ing.id || ""}`.trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Method */}
            {juiceRecipe.method && (
              <div style={{ marginBottom: 12 }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: design.textColor,
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}>
                  Method
                </p>
                {(Array.isArray(juiceRecipe.method) ? juiceRecipe.method : [juiceRecipe.method]).map((step, i) => (
                  <p key={i} style={{
                    fontSize: 13,
                    color: design.textMuted,
                    margin: "0 0 6px",
                    paddingLeft: 12,
                    lineHeight: 1.5,
                  }}>
                    {i + 1}. {step}
                  </p>
                ))}
              </div>
            )}

            {/* Terpene connections */}
            {juiceRecipe.terpenes && juiceRecipe.terpenes.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {juiceRecipe.terpenes.map((t, i) => {
                  const tc = TERPENE_COLORS[t.terpene || t] || design.accentColor;
                  return (
                    <span key={i} style={{
                      fontSize: 11,
                      color: tc,
                      background: `${tc}15`,
                      padding: "2px 8px",
                      borderRadius: 8,
                    }}>
                      {t.terpene || t}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====== EXPLORE MORE — ACCORDION ====== */}
      <div style={{ ...sectionStyle, borderBottom: "none" }}>
        <h2 style={sectionTitleStyle}>Explore More</h2>

        {/* Tea */}
        {expData.tea && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.tea)}
              onClick={() => toggleSection("tea")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Tea Pairing
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.tea ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.tea && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                  {expData.tea.name}
                </p>
                <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 8px" }}>
                  {expData.tea.description}
                </p>
                {expData.tea.steep_time && (
                  <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 6px" }}>
                    Steep: {expData.tea.steep_time} &middot; {expData.tea.volume}
                  </p>
                )}
                {expData.tea.ingredients && (
                  <div style={{ marginBottom: 8 }}>
                    {expData.tea.ingredients.map((ing, i) => (
                      <span key={i} style={{
                        display: "inline-block",
                        fontSize: 11,
                        color: design.textMuted,
                        background: `${design.secondaryColor}10`,
                        padding: "2px 6px",
                        borderRadius: 6,
                        margin: "2px 4px 2px 0",
                      }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
                {expData.tea.method && (
                  <div>
                    {expData.tea.method.map((step, i) => (
                      <p key={i} style={{ fontSize: 12, color: design.textMuted, margin: "0 0 4px", lineHeight: 1.5 }}>
                        {step}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cocktail */}
        {expData.cocktail && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.cocktail)}
              onClick={() => toggleSection("cocktail")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Cocktail / Mocktail
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.cocktail ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.cocktail && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                {/* Mocktail */}
                {expData.cocktail.mocktail && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                      Mocktail: {expData.cocktail.mocktail.name}
                    </p>
                    <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 6px" }}>
                      {expData.cocktail.mocktail.description} &middot; {expData.cocktail.mocktail.glass} glass
                    </p>
                    {expData.cocktail.mocktail.ingredients && (
                      <div style={{ marginBottom: 6 }}>
                        {expData.cocktail.mocktail.ingredients.map((ing, i) => (
                          <p key={i} style={{ fontSize: 11, color: design.textMuted, margin: "0 0 2px", paddingLeft: 8 }}>
                            - {ing}
                          </p>
                        ))}
                      </div>
                    )}
                    {expData.cocktail.mocktail.method && (
                      <div>
                        {expData.cocktail.mocktail.method.map((step, i) => (
                          <p key={i} style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px", lineHeight: 1.4 }}>
                            {i + 1}. {step}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Cocktail */}
                {expData.cocktail.cocktail && (
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                      Cocktail: {expData.cocktail.cocktail.name}
                    </p>
                    <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 6px" }}>
                      {expData.cocktail.cocktail.description} &middot; {expData.cocktail.cocktail.spirit} &middot; {expData.cocktail.cocktail.abv || ""}
                    </p>
                    {expData.cocktail.cocktail.ingredients && (
                      <div style={{ marginBottom: 6 }}>
                        {expData.cocktail.cocktail.ingredients.map((ing, i) => (
                          <p key={i} style={{ fontSize: 11, color: design.textMuted, margin: "0 0 2px", paddingLeft: 8 }}>
                            - {ing}
                          </p>
                        ))}
                      </div>
                    )}
                    {expData.cocktail.cocktail.method && (
                      <div>
                        {expData.cocktail.cocktail.method.map((step, i) => (
                          <p key={i} style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px", lineHeight: 1.4 }}>
                            {i + 1}. {step}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Food */}
        {expData.food && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.food)}
              onClick={() => toggleSection("food")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Food Pairings
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.food ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.food && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                {["snack", "appetizer", "main", "dessert", "cheese"].map((course) => {
                  const item = expData.food[course];
                  if (!item) return null;
                  return (
                    <div key={course} style={{ marginBottom: 12 }}>
                      <p style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: design.accentColor,
                        margin: "0 0 3px",
                        opacity: 0.7,
                      }}>
                        {course}
                      </p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: design.textColor, margin: "0 0 3px" }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: 12, color: design.textMuted, margin: 0, lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Candle */}
        {expData.candle && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.candle)}
              onClick={() => toggleSection("candle")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Candle
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.candle ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.candle && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: design.accentColor, margin: "0 0 6px" }}>
                  {expData.candle.name}
                </p>
                {expData.candle.scent_notes && (
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 2px" }}>
                      <span style={{ fontWeight: 600, color: design.textColor }}>Top:</span> {expData.candle.scent_notes.top}
                    </p>
                    <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 2px" }}>
                      <span style={{ fontWeight: 600, color: design.textColor }}>Heart:</span> {expData.candle.scent_notes.heart}
                    </p>
                    <p style={{ fontSize: 12, color: design.textMuted, margin: "0 0 2px" }}>
                      <span style={{ fontWeight: 600, color: design.textColor }}>Base:</span> {expData.candle.scent_notes.base}
                    </p>
                  </div>
                )}
                <p style={{ fontSize: 11, color: design.textMuted, margin: 0 }}>
                  {expData.candle.wax_type} &middot; ~{expData.candle.burn_time_hrs}hr burn time
                </p>
              </div>
            )}
          </div>
        )}

        {/* Incense */}
        {expData.incense && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.incense)}
              onClick={() => toggleSection("incense")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Incense
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.incense ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.incense && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                  {expData.incense.blend_name}
                </p>
                <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 8px" }}>
                  Format: {expData.incense.format}
                </p>
                {expData.incense.botanicals && (
                  <div style={{ marginBottom: 8 }}>
                    {expData.incense.botanicals.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: design.textColor }}>
                          {b.plant}
                        </span>
                        <span style={{ fontSize: 11, color: design.textMuted }}>
                          ({b.part}) — {b.terpene_target}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {expData.incense.ritual_suggestion && (
                  <p style={{ fontSize: 12, color: design.textMuted, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
                    {expData.incense.ritual_suggestion}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bath / Body */}
        {expData.bath && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.bath)}
              onClick={() => toggleSection("bath")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Bath &amp; Body
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.bath ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.bath && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                {/* Rollerball */}
                {expData.bath.rollerball && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                      Rollerball Blend
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 6px" }}>
                      {expData.bath.rollerball.total_volume_ml}ml {expData.bath.rollerball.carrier_oil} &middot; {expData.bath.rollerball.dilution_pct}% dilution
                    </p>
                    {expData.bath.rollerball.eo_recipe && expData.bath.rollerball.eo_recipe.map((eo, i) => (
                      <p key={i} style={{ fontSize: 12, color: design.textMuted, margin: "0 0 2px", paddingLeft: 8 }}>
                        {eo.oil}: {eo.drops} drops
                      </p>
                    ))}
                    {expData.bath.rollerball.application_points && (
                      <p style={{ fontSize: 11, color: design.textMuted, margin: "6px 0 0", fontStyle: "italic" }}>
                        Apply to: {expData.bath.rollerball.application_points.join(", ")}
                      </p>
                    )}
                  </div>
                )}
                {/* Bath Bomb */}
                {expData.bath.bath_bomb && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                      Bath Bomb
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 4px" }}>
                      Base: {expData.bath.bath_bomb.base}
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 4px" }}>
                      EO blend ({expData.bath.bath_bomb.eo_drops} drops): {expData.bath.bath_bomb.eo_blend.join(", ")}
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: 0 }}>
                      Color: {expData.bath.bath_bomb.color} &middot; Extras: {expData.bath.bath_bomb.extras}
                    </p>
                  </div>
                )}
                {/* Shower Steamer */}
                {expData.bath.shower_steamer && (
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: design.accentColor, margin: "0 0 4px" }}>
                      Shower Steamer
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 4px" }}>
                      EO blend ({expData.bath.shower_steamer.eo_drops} drops): {expData.bath.shower_steamer.eo_blend.join(", ")}
                    </p>
                    <p style={{ fontSize: 11, color: design.textMuted, margin: 0, fontStyle: "italic" }}>
                      {expData.bath.shower_steamer.activation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {expData.location && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.location)}
              onClick={() => toggleSection("location")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Location Pairings
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.location ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.location && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                {expData.location.matched_locations && expData.location.matched_locations.map((loc, i) => (
                  <div key={i} style={{
                    marginBottom: 10,
                    padding: "8px 0",
                    borderBottom: i < expData.location.matched_locations.length - 1 ? `1px solid ${design.accentColor}08` : "none",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: design.textColor, margin: 0 }}>
                        {loc.location_name}
                      </p>
                      <span style={{
                        fontSize: 10,
                        color: design.accentColor,
                        background: `${design.accentColor}15`,
                        padding: "1px 6px",
                        borderRadius: 6,
                      }}>
                        {Math.round(loc.match_score * 100)}% match
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                      {(loc.shared_terpenes || []).map((t, j) => (
                        <span key={j} style={{
                          fontSize: 10,
                          color: TERPENE_COLORS[t] || design.textMuted,
                          background: `${TERPENE_COLORS[t] || design.textMuted}15`,
                          padding: "1px 5px",
                          borderRadius: 4,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {expData.location.terpene_walk && (
                  <p style={{ fontSize: 12, color: design.textMuted, margin: "8px 0 0", fontStyle: "italic", lineHeight: 1.5 }}>
                    {expData.location.terpene_walk}
                  </p>
                )}
                {expData.location.best_season && (
                  <p style={{ fontSize: 11, color: design.textMuted, margin: "4px 0 0" }}>
                    Best season: {expData.location.best_season}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Wine & Beer */}
        {expData.wine && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={accordionHeaderStyle(expandedSections.wine)}
              onClick={() => toggleSection("wine")}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: design.textColor }}>
                Wine &amp; Beer Pairings
              </span>
              <span style={{ fontSize: 16, color: design.textMuted, transform: expandedSections.wine ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                &#9662;
              </span>
            </div>
            {expandedSections.wine && (
              <div style={{ ...cardStyle, marginTop: 4 }}>
                {/* Wine */}
                {expData.wine.wine && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: design.accentColor, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>
                      Wine
                    </p>
                    {expData.wine.wine.map((w, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: design.textColor, margin: "0 0 2px" }}>
                          {w.varietal} &mdash; {w.winery}
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px" }}>
                          {w.region} &middot; Serve at {w.serving_temp_f}&deg;F
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px", fontStyle: "italic" }}>
                          {w.tasting_note}
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: 0, lineHeight: 1.4 }}>
                          {w.terpene_bridge}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Beer */}
                {expData.wine.beer && (
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: design.accentColor, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>
                      Beer
                    </p>
                    {expData.wine.beer.map((b, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: design.textColor, margin: "0 0 2px" }}>
                          {b.style} &mdash; {b.brewery}
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px" }}>
                          {b.region} &middot; {b.abv} ABV
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: "0 0 3px", fontStyle: "italic" }}>
                          {b.tasting_note}
                        </p>
                        <p style={{ fontSize: 11, color: design.textMuted, margin: 0, lineHeight: 1.4 }}>
                          {b.terpene_bridge}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {expData.wine.cannabaceae_note && (
                  <p style={{
                    fontSize: 11,
                    color: design.textMuted,
                    margin: "8px 0 0",
                    padding: "8px",
                    background: `${design.secondaryColor}08`,
                    borderRadius: 6,
                    lineHeight: 1.4,
                    fontStyle: "italic",
                  }}>
                    {expData.wine.cannabaceae_note}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom spacing */}
      <div style={{ height: 40 }} />
    </div>
  );
};


// Learn Screen
const LearnScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 'philosophy',
      title: 'The Philosophy',
      icon: '💭',
      content: `Most people smoke whatever's in the jar and put on random music. Sometimes the vibe lands. Sometimes it doesn't.

Solful Sessions is built on a different idea: what if every session was designed?

Not in a complicated way. But intentionally. You pick how you want to feel. The app recommends what to smoke, what to diffuse, and what to play. The three layers work together.

Strain for the cannabinoids. Scent for the terpene boost. Sound for the emotional arc.

That's the Solful Sessions philosophy: cannabis consumption as design, not chance.`
    },
    {
      id: 'terpenes',
      title: 'How Terpenes Work',
      icon: '🌿',
      content: `Terpenes are the aromatic compounds that make cannabis smell the way it does. They're also in essential oils, fruit peels, pine trees, and lavender fields.

Here's what matters: terpenes don't just create aroma. They affect how you feel.

• Myrcene (mango, lemongrass) → Sedating, muscle relaxation
• Limonene (citrus) → Mood elevation, energy
• Caryophyllene (black pepper) → Calming, anti-anxiety
• Linalool (lavender) → Relaxing, stress relief
• Pinene (pine) → Alertness, focus

Different strains have different terpene profiles. That's why Sour Diesel feels different from Granddaddy Purple, even if the THC is similar.

Solful curates strains by terpene profile, not just THC. And the aromatherapy blends are designed to amplify those same terpenes.`
    },
    {
      id: 'music',
      title: 'The Music Connection',
      icon: '🎵',
      content: `Music doesn't just accompany your high. It shapes it.

The same brain systems that terpenes act on—dopamine, serotonin, GABA—are the same systems music modulates. They're working on the same circuitry through different entry points.

Research shows:
• Music at 60-80 BPM activates "rest and digest" mode—the same state myrcene pushes toward
• Upbeat music (100+ BPM) triggers dopamine—the same pathway limonene activates
• Matching music to mood, then gradually shifting, produces better results than jumping straight to target mood (the "iso principle")

That's why each strain has a custom music prompt. It translates the terpene profile into tempo, energy, texture, and artist references that Spotify can understand.

The result: a playlist scientifically matched to your strain, not just generic "chill vibes."`
    },
    {
      id: 'aromatherapy',
      title: 'The Aromatherapy Layer',
      icon: '🧴',
      content: `Solful curates strains with intention. Every flower on their menu is chosen for its terpene profile.

But here's the limitation: you can only inhale so many terpenes from flower alone. Cannabis is typically 1-4% terpenes. And when you smoke, some are lost to heat.

The aromatherapy blends boost the signal.

Each blend mirrors the dominant terpene profile of a specific strain using pure essential oils with the same compounds.

The protocol:
1. Start diffusing 30 minutes before your session
2. Your olfactory system sends signals directly to your limbic system (emotion, memory)
3. Terpenes begin circulating through your lungs
4. By consumption time, your brain is already primed

The effect: faster onset, brighter experience, longer duration—without consuming more cannabis.`
    },
  ];

  return (
    <div style={{ padding: '24px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, margin: 0 }}>
          Learn
        </h1>
        <p style={{ fontSize: '14px', color: colors.muted, marginTop: '8px' }}>
          Understand the science behind intentional sessions
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sections.map(section => (
          <div
            key={section.id}
            style={{
              background: colors.warmWhite,
              border: `1px solid ${colors.sage}22`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              style={{
                background: 'none',
                border: 'none',
                width: '100%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{section.icon}</span>
                <span style={{ fontSize: '16px', fontWeight: '500', color: colors.charcoal }}>
                  {section.title}
                </span>
              </div>
              <span style={{ color: colors.muted, fontSize: '20px' }}>
                {expandedSection === section.id ? '−' : '+'}
              </span>
            </button>

            {expandedSection === section.id && (
              <div style={{ padding: '0 16px 16px 16px' }}>
                <div style={{
                  background: colors.cream,
                  borderRadius: '8px',
                  padding: '16px',
                }}>
                  {section.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} style={{
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: colors.charcoal,
                      margin: i === 0 ? 0 : '12px 0 0 0',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
const SolfulSessionsApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedStrain, setSelectedStrain] = useState(null);
  const [humidor, setHumidor] = useState([]);
  const [pantry, setPantry] = useState(() => {
    try {
      const saved = localStorage.getItem("solful-juice-pantry");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem("solful-juice-pantry", JSON.stringify([...pantry]));
  }, [pantry]);

  const handleSelectVibe = (vibe) => {
    setSelectedVibe(vibe);
  };

  const handleSelectStrain = (strain) => {
    setSelectedStrain(strain);
    setCurrentScreen('session');
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: colors.cream,
      minHeight: '100vh',
    }}>
      {currentScreen === 'home' && (
        <HomeScreen
          onSelectVibe={handleSelectVibe}
          onSelectStrain={handleSelectStrain}
        />
      )}
      {currentScreen === 'humidor' && (
        <HumidorScreen
          humidor={humidor}
          setHumidor={setHumidor}
          onSelectStrain={handleSelectStrain}
        />
      )}
      {currentScreen === 'session' && selectedStrain && (
        <StrainExperiencePage
          strain={selectedStrain}
          onBack={() => { setSelectedStrain(null); setCurrentScreen('home'); }}
          pantry={pantry}
          setPantry={setPantry}
        />
      )}
      {currentScreen === 'learn' && (
        <LearnScreen />
      )}
      {currentScreen === 'juice' && (
        <JuiceKitchenScreen pantry={pantry} setPantry={setPantry} />
      )}

      <NavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
};

export default SolfulSessionsApp;

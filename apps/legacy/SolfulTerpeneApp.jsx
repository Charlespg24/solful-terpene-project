import React, { useState } from 'react';
const colors = {
  forest: '#2D5A3D',
  sage: '#6B8E6B',
  cream: '#F5F2EB',
  warmWhite: '#FDFCFA',
  charcoal: '#2C2C2C',
  gold: '#C4A962',
  muted: '#8B8B8B',
};
const strains = [
  // Glentucky Family Farm
  {
    id: 1,
    name: "Mike's Bomba",
    farm: "Glentucky Family Farm",
    region: "Sonoma",
    intent: "Grounded calm with clear mental edges.",
    effects: "Relaxed, Calm, Alert",
    aroma: "Fuel, Lemon Cream, Forest Floor",
    totalTerpenes: "1.38%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.47%" },
      { name: "Limonene", percentage: "0.32%" },
      { name: "α-Humulene", percentage: "0.18%" },
      { name: "Linalool", percentage: "0.07%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 20, terpene: "β-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Sage", drops: 8, terpene: "α-Humulene" },
      { name: "Lavender", drops: 2, terpene: "Linalool" },
    ],
    rationale: "Black pepper delivers the dominant caryophyllene (50% of blend). Lemon oil matches the 'lemon cream' aroma note. Sage provides humulene with an herbal, grounding quality that complements the 'forest floor' character. A whisper of lavender rounds out the linalool.",
    totalDrops: 40,
  },
  // Moon Gazer Farms
  {
    id: 20,
    name: "Moonlight",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    intent: "Soft gratitude in a settled body.",
    effects: "Physically Relaxed, Calm, Grateful",
    aroma: "Watermelon Candy, Citrus Zest, Earl Grey",
    totalTerpenes: "2.67%",
    terpenes: [
      { name: "Myrcene", percentage: "0.74%" },
      { name: "β-Caryophyllene", percentage: "0.51%" },
      { name: "Terpinolene", percentage: "0.38%" },
      { name: "α-Bisabolol", percentage: "0.24%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 12, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene" },
      { name: "Tea Tree", drops: 8, terpene: "Terpinolene" },
      { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol" },
      { name: "Bergamot", drops: 4, terpene: "Limonene" },
    ],
    rationale: "Lemongrass carries the dominant myrcene. Tea tree for terpinolene. German chamomile for bisabolol. Bergamot is the key ingredient in Earl Grey tea, a direct aroma hit that also delivers citrus zest.",
    totalDrops: 40,
  },
  {
    id: 21,
    name: "Natty Bumppo",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    intent: "Loose and easy, happily untethered.",
    effects: "Happy, Carefree, Physically Relaxed",
    aroma: "Kerosene, Musk, Sour Plum",
    totalTerpenes: "1.86%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.63%" },
      { name: "Limonene", percentage: "0.35%" },
      { name: "α-Humulene", percentage: "0.25%" },
      { name: "Myrcene", percentage: "0.19%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Sage", drops: 6, terpene: "α-Humulene" },
      { name: "Lemongrass", drops: 6, terpene: "Myrcene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Caryophyllene-forward with black pepper as the base. Lemon delivers the limonene. Sage for humulene. Lemongrass for myrcene. Geranium adds sour plum fruitiness. The 'kerosene/musk' character emerges from the terpene interaction itself.",
    totalDrops: 40,
  },
  {
    id: 22,
    name: "Black Lime Chem",
    farm: "Moon Gazer Farms",
    region: "Mendocino",
    intent: "Weighted bliss melting toward rest.",
    effects: "Heavy, Blissful, Sleepy",
    aroma: "Sharp Lime, Rhubarb, Glue",
    totalTerpenes: "3.08%",
    terpenes: [
      { name: "Myrcene", percentage: "1.69%" },
      { name: "α-Pinene", percentage: "0.39%" },
      { name: "β-Caryophyllene", percentage: "0.27%" },
      { name: "β-Ocimene", percentage: "0.19%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 16, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "α-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Basil", drops: 6, terpene: "β-Ocimene" },
      { name: "Lemon", drops: 4, terpene: "Limonene" },
    ],
    rationale: "Heavy myrcene strain, sleepy and blissful. Pine delivers the pinene. Basil covers the ocimene. Lemon for the 'sharp lime' aroma (no lime oil in palette, lemon is close). The 'glue' character is that chem funk that emerges from the terpene combo itself.",
    totalDrops: 40,
  },
  // Alpenglow Farms
  {
    id: 2,
    name: "Guava Gift",
    farm: "Alpenglow Farms",
    region: "Humboldt",
    intent: "Open and expansive, easy social lift.",
    effects: "Social, Inspiring, Euphoric",
    aroma: "Fresh Guava, Lemon Rind, Tamarind",
    totalTerpenes: "2.34%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.73%" },
      { name: "Limonene", percentage: "0.50%" },
      { name: "Myrcene", percentage: "0.33%" },
      { name: "α-Humulene", percentage: "0.25%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene" },
      { name: "Grapefruit", drops: 10, terpene: "Limonene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Basil", drops: 6, terpene: "α-Humulene" },
      { name: "Rosemary", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "Black pepper leads with caryophyllene. Grapefruit brings tropical citrus that echoes the guava aroma. Lemongrass delivers myrcene for the euphoric lift. Basil adds humulene with a bright, fresh edge. A touch of rosemary for herbal depth.",
    totalDrops: 40,
  },
  {
    id: 8,
    name: "Mule Fuel",
    farm: "Alpenglow Farms",
    region: "Humboldt",
    intent: "Gentle contentment settling toward rest.",
    effects: "Happy, Hungry, Sleepy",
    aroma: "Skunk, Diesel, Lemon, Leather",
    totalTerpenes: "3.97%",
    terpenes: [
      { name: "Myrcene", percentage: "2.22%" },
      { name: "α-Pinene", percentage: "0.54%" },
      { name: "β-Caryophyllene", percentage: "0.34%" },
      { name: "Limonene", percentage: "0.28%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 20, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "α-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Lemon", drops: 6, terpene: "Limonene" },
    ],
    rationale: "Exceptionally high myrcene (2.22%) makes this the most sedating strain. Lemongrass dominates the blend (50%) to match. Pine needle oil captures the pinene for alertness contrast. Black pepper for caryophyllene. Lemon for the citrus diesel notes.",
    totalDrops: 40,
  },
  {
    id: 13,
    name: "Satsuma Sherbet",
    farm: "Alpenglow Farms",
    region: "Humboldt",
    intent: "Quiet ease with thoughtful undertones.",
    effects: "Happy, Contemplative, Comfortable",
    aroma: "Mandarin Orange, Mochi, Mint",
    totalTerpenes: "1.85%",
    terpenes: [
      { name: "Limonene", percentage: "0.55%" },
      { name: "β-Caryophyllene", percentage: "0.45%" },
      { name: "α-Humulene", percentage: "0.13%" },
      { name: "Myrcene", percentage: "0.11%" },
    ],
    oils: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Lemongrass", drops: 4, terpene: "Myrcene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
    ],
    rationale: "Sweet orange (40%) captures the mandarin citrus. Black pepper delivers caryophyllene backbone. Sage for humulene. Lemongrass for myrcene. Peppermint matches the 'mint' aroma note and adds refreshing brightness.",
    totalDrops: 40,
  },
  // Greenshock Farms
  {
    id: 6,
    name: "Tropical Sleigh Ride",
    farm: "Greenshock Farms",
    region: "Mendocino",
    intent: "Vivid lift with present clarity.",
    effects: "Joyful, Alert, Euphoric",
    aroma: "Peppermint, Honeysuckle, Hint of Ginger",
    totalTerpenes: "2.35%",
    terpenes: [
      { name: "β-Ocimene", percentage: "0.71%" },
      { name: "β-Caryophyllene", percentage: "0.70%" },
      { name: "α-Humulene", percentage: "0.28%" },
      { name: "Limonene", percentage: "0.22%" },
    ],
    oils: [
      { name: "Basil", drops: 14, terpene: "β-Ocimene" },
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Peppermint", drops: 6, terpene: "Menthol" },
      { name: "Grapefruit", drops: 4, terpene: "Limonene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Basil delivers the rare ocimene (35% of blend) that defines this strain's unique character. Black pepper for the heavy caryophyllene. Peppermint captures the distinctive aroma note. Grapefruit adds citrus brightness. Geranium brings the honeysuckle floral quality.",
    totalDrops: 40,
  },
  {
    id: 17,
    name: "Purple Candy Cane",
    farm: "Greenshock Farms",
    region: "Mendocino",
    intent: "Vibrant and vocal, fully awake.",
    effects: "Energized, Invigorated, Talkative",
    aroma: "Mango, Peppermint Candy, Orange Blossom",
    totalTerpenes: "1.55%",
    terpenes: [
      { name: "Myrcene", percentage: "0.54%" },
      { name: "β-Caryophyllene", percentage: "0.31%" },
      { name: "α-Pinene", percentage: "0.20%" },
      { name: "α-Humulene", percentage: "0.13%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 12, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 8, terpene: "β-Caryophyllene" },
      { name: "Sweet Orange", drops: 8, terpene: "Limonene" },
      { name: "Pine", drops: 6, terpene: "α-Pinene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
      { name: "Sage", drops: 2, terpene: "α-Humulene" },
    ],
    rationale: "Myrcene-forward for the mango note. Black pepper for caryophyllene. Sweet orange captures the 'orange blossom' aroma. Pine for the pinene. Peppermint matches the 'peppermint candy' perfectly. A touch of sage for humulene grounding.",
    totalDrops: 40,
  },
  // Higher Heights
  {
    id: 3,
    name: "Carambola",
    farm: "Higher Heights",
    region: "Mendocino",
    intent: "Light and playful, effervescent energy.",
    effects: "Energetic, Fun, Giggly",
    aroma: "Orange, Diesel, Incense",
    totalTerpenes: "1.45%",
    terpenes: [
      { name: "Limonene", percentage: "0.44%" },
      { name: "β-Caryophyllene", percentage: "0.18%" },
      { name: "Linalool", percentage: "0.12%" },
      { name: "α-Bisabolol", percentage: "0.09%" },
    ],
    oils: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Rosemary", drops: 8, terpene: "β-Caryophyllene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol" },
      { name: "Black Pepper", drops: 4, terpene: "β-Caryophyllene" },
    ],
    rationale: "Limonene-dominant and uplifting. Sweet orange (40%) captures the 'orange, diesel' aroma profile. Rosemary provides caryophyllene with an energizing quality. Lavender for the linalool. German chamomile delivers the α-bisabolol and softens the blend.",
    totalDrops: 40,
  },
  {
    id: 16,
    name: "Rasta Governmint",
    farm: "Higher Heights",
    region: "Mendocino",
    intent: "Profound ease with cushioned edges.",
    effects: "Euphoric, Supremely Relaxed, Comforted",
    aroma: "Sour Cherry, Frankincense, Oak",
    totalTerpenes: "1.92%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.60%" },
      { name: "Limonene", percentage: "0.39%" },
      { name: "α-Humulene", percentage: "0.17%" },
      { name: "Myrcene", percentage: "0.16%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Rosemary", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Sage", drops: 6, terpene: "α-Humulene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "Caryophyllene-forward with black pepper and rosemary. Lemon for the limonene citrus. Sage for humulene and oak-like earthiness. Geranium adds fruity cherry notes. Note: If you add Frankincense Serrata, swap Rosemary for Frankincense (6 drops) to match the aroma directly.",
    totalDrops: 40,
  },
  {
    id: 23,
    name: "Pineapple Mojito",
    farm: "Higher Heights",
    region: "Mendocino",
    intent: "Rooted ease with a quiet glow.",
    effects: "Relaxed, Grounded, Euphoric",
    aroma: "Pineapple, Ginger, Mint, Gas",
    totalTerpenes: "2.55%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.63%" },
      { name: "Limonene", percentage: "0.56%" },
      { name: "α-Bisabolol", percentage: "0.24%" },
      { name: "α-Humulene", percentage: "0.19%" },
      { name: "Linalool", percentage: "0.16%" },
      { name: "α-Pinene", percentage: "0.14%" },
      { name: "Myrcene", percentage: "0.11%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Lavender", drops: 4, terpene: "Linalool" },
      { name: "Pine", drops: 2, terpene: "α-Pinene" },
      { name: "Lemongrass", drops: 2, terpene: "Myrcene" },
    ],
    rationale: "Caryophyllene and limonene nearly equal, so black pepper and sweet orange share the lead. German chamomile for the significant bisabolol. Sage for humulene. Lavender for linalool. Pine and lemongrass in supporting roles for the pinene and myrcene. Seven-oil blend reflecting the strain's unusually broad terpene diversity. Child of Carambola (already in the collection), inheriting its bisabolol trait.",
    totalDrops: 40,
  },
  // Happy Day Farms
  {
    id: 4,
    name: "Strawberry Biscotti",
    farm: "Happy Day Farms",
    region: "Mendocino",
    intent: "Cozy anchor with a curious mind.",
    effects: "Comforting, Mentally Engaging, Appetite Inducing",
    aroma: "Kettle Corn, Fuel, Sour Strawberry Candy",
    totalTerpenes: "1.48%",
    terpenes: [
      { name: "Limonene", percentage: "0.38%" },
      { name: "β-Caryophyllene", percentage: "0.29%" },
      { name: "Myrcene", percentage: "0.25%" },
      { name: "α-Bisabolol", percentage: "0.13%" },
    ],
    oils: [
      { name: "Bergamot", drops: 14, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "German Chamomile", drops: 6, terpene: "α-Bisabolol" },
      { name: "Clove", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "Balanced profile with comfort as the effect. Bergamot brings sophisticated citrus that pairs with the 'sour strawberry candy' note. Black pepper for caryophyllene. Lemongrass for myrcene. German chamomile for bisabolol. A touch of clove adds warmth.",
    totalDrops: 40,
  },
  {
    id: 14,
    name: "Avenue of the Giants",
    farm: "Happy Day Farms",
    region: "Mendocino",
    intent: "Forward momentum with electric clarity.",
    effects: "Energizing, Buzzy, Motivating",
    aroma: "Pine Needles, Menthol, Jasmine",
    totalTerpenes: "3.48%",
    terpenes: [
      { name: "Myrcene", percentage: "1.94%" },
      { name: "β-Caryophyllene", percentage: "0.43%" },
      { name: "α-Pinene", percentage: "0.26%" },
      { name: "β-Ocimene", percentage: "0.24%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 16, terpene: "Myrcene" },
      { name: "Pine", drops: 8, terpene: "α-Pinene" },
      { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Basil", drops: 4, terpene: "β-Ocimene" },
      { name: "Peppermint", drops: 4, terpene: "Menthol" },
      { name: "Geranium", drops: 2, terpene: "Floral" },
    ],
    rationale: "Very high myrcene (1.94%) with lemongrass at 40%. Pine needle oil captures the 'pine needles' aroma note and pinene. Black pepper for caryophyllene. Basil for ocimene. Peppermint for the menthol. Geranium adds jasmine-like floral notes.",
    totalDrops: 40,
  },
  // Terrapin Farms
  {
    id: 15,
    name: "Peach Flambé",
    farm: "Terrapin Farms",
    region: "Humboldt",
    intent: "Sunny drive with bright momentum.",
    effects: "Happy, Energized, Motivated",
    aroma: "White Peach, Cashew Butter, Brown Sugar",
    totalTerpenes: "1.05%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.25%" },
      { name: "Myrcene", percentage: "0.21%" },
      { name: "Limonene", percentage: "0.20%" },
      { name: "α-Humulene", percentage: "0.12%" },
    ],
    oils: [
      { name: "Bergamot", drops: 10, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Clove", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "Balanced, lower-terpene profile. Bergamot brings sophisticated citrus matching the peach. Black pepper for caryophyllene. Lemongrass for myrcene. Geranium adds fruity, peachy notes. Sage for humulene. Clove echoes the 'brown sugar' warmth.",
    totalDrops: 40,
  },
  {
    id: 18,
    name: "Lemon Papaya Banana",
    farm: "Terrapin Farms",
    region: "Humboldt",
    intent: "Soft body, drifting expansive mind.",
    effects: "Physically Relaxed, Spacey, Euphoric",
    aroma: "Papaya, Honeydew Melon, Lemon Zest",
    totalTerpenes: "1.38%",
    terpenes: [
      { name: "Myrcene", percentage: "0.57%" },
      { name: "Limonene", percentage: "0.29%" },
      { name: "β-Caryophyllene", percentage: "0.16%" },
      { name: "α-Humulene", percentage: "0.05%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 14, terpene: "Myrcene" },
      { name: "Lemon", drops: 10, terpene: "Limonene" },
      { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Ylang Ylang", drops: 4, terpene: "Floral" },
    ],
    rationale: "Myrcene-dominant with lemongrass at 35%. Lemon captures the 'lemon zest' perfectly. Black pepper for caryophyllene. Geranium adds tropical, fruity notes matching papaya and melon. Ylang ylang brings exotic sweetness.",
    totalDrops: 40,
  },
  // Dos Rios Farms
  {
    id: 5,
    name: "Pinnacle",
    farm: "Dos Rios Farms",
    region: "Mendocino",
    intent: "Deep surrender into velvet quiet.",
    effects: "Heavy, Sedative, Blissful",
    aroma: "Sweet Cream, Nutmeg, Fennel Seeds",
    totalTerpenes: "3.35%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.61%" },
      { name: "Limonene", percentage: "0.46%" },
      { name: "α-Humulene", percentage: "0.19%" },
      { name: "trans-β-Farnesene", percentage: "0.14%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "Rosemary", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Sage", drops: 6, terpene: "α-Humulene" },
      { name: "Ylang Ylang", drops: 4, terpene: "Farnesene" },
      { name: "Clove", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "The heaviest, most sedative strain. Black pepper and rosemary together deliver concentrated caryophyllene. Sweet orange for the limonene and 'sweet cream' aroma. Sage for humulene with earthy depth. Ylang ylang is one of the few oils containing farnesene, amplifying the blissful effect.",
    totalDrops: 40,
  },
  // Sonoma Hills Farm
  {
    id: 7,
    name: "Pink Jesus Reserve",
    farm: "Sonoma Hills Farm",
    region: "Sonoma",
    intent: "Buoyant and warm, ready to share.",
    effects: "Social, Uplifting, Euphoric",
    aroma: "Raspberry, French Lavender, Pineapple",
    totalTerpenes: "1.89%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.78%" },
      { name: "Myrcene", percentage: "0.38%" },
      { name: "α-Humulene", percentage: "0.27%" },
      { name: "α-Bisabolol", percentage: "0.15%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 14, terpene: "β-Caryophyllene" },
      { name: "Lemongrass", drops: 8, terpene: "Myrcene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Sage", drops: 6, terpene: "α-Humulene" },
      { name: "German Chamomile", drops: 4, terpene: "α-Bisabolol" },
      { name: "Geranium", drops: 2, terpene: "Floral" },
    ],
    rationale: "Black pepper anchors the high caryophyllene content. Lemongrass delivers myrcene for euphoria. Lavender captures the 'French lavender' aroma note. Sage for humulene depth. German chamomile for bisabolol. A whisper of geranium adds the fruity, floral top notes.",
    totalDrops: 40,
  },
  // Heartrock Mountain Farm
  {
    id: 9,
    name: "Love and Laughter",
    farm: "Heartrock Mountain Farm",
    region: "Mendocino",
    intent: "Clear and steady, nothing clouded.",
    effects: "Energizing, Focusing, Non-Intoxicating",
    aroma: "Flowers, Eucalyptus, Berries",
    badge: "CBD",
    totalTerpenes: "1.72%",
    terpenes: [
      { name: "Myrcene", percentage: "0.56%" },
      { name: "Terpinolene", percentage: "0.28%" },
      { name: "β-Caryophyllene", percentage: "0.20%" },
      { name: "α-Pinene", percentage: "0.13%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 14, terpene: "Myrcene" },
      { name: "Tea Tree", drops: 8, terpene: "Terpinolene" },
      { name: "Eucalyptus", drops: 8, terpene: "1,8-Cineole" },
      { name: "Black Pepper", drops: 6, terpene: "β-Caryophyllene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
    ],
    rationale: "The only CBD strain in the collection. Lemongrass for the dominant myrcene. Tea tree is one of the few oils high in terpinolene, capturing this strain's unique character. Eucalyptus matches the aroma and adds clarity. Black pepper for caryophyllene. Geranium brings floral berry notes.",
    totalDrops: 40,
  },
  // Briceland Forest Farm
  {
    id: 10,
    name: "Blueberry Muffin",
    farm: "Briceland Forest Farm",
    region: "Humboldt",
    intent: "Quiet peace with a soft glow.",
    effects: "Relaxed, Peaceful, Joyful",
    aroma: "Blueberry, Fresh Dough, Cinnamon",
    totalTerpenes: "1.66%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.47%" },
      { name: "Myrcene", percentage: "0.40%" },
      { name: "α-Bisabolol", percentage: "0.25%" },
      { name: "α-Humulene", percentage: "0.16%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Lemongrass", drops: 10, terpene: "Myrcene" },
      { name: "German Chamomile", drops: 8, terpene: "α-Bisabolol" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Geranium", drops: 4, terpene: "Floral" },
      { name: "Clove", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "Black pepper and lemongrass anchor the caryophyllene and myrcene. German chamomile brings the α-bisabolol for a soft, calming quality. Sage adds humulene depth. Geranium contributes fruity, berry-like notes. A touch of clove echoes the cinnamon aroma.",
    totalDrops: 40,
  },
  // Sticky Fields
  {
    id: 11,
    name: "Mandarin Cherry Tree",
    farm: "Sticky Fields",
    region: "Mendocino",
    intent: "Settled body, gently wandering mind.",
    effects: "Full Body Relaxation, Serenity, Creativity",
    aroma: "Mandarin Orange, Sandalwood, Lavender",
    totalTerpenes: "1.75%",
    terpenes: [
      { name: "Limonene", percentage: "0.52%" },
      { name: "β-Caryophyllene", percentage: "0.36%" },
      { name: "α-Humulene", percentage: "0.13%" },
      { name: "Linalool", percentage: "0.11%" },
    ],
    oils: [
      { name: "Sweet Orange", drops: 16, terpene: "Limonene" },
      { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Ylang Ylang", drops: 4, terpene: "Floral" },
    ],
    rationale: "Sweet orange dominates (40%) to match the mandarin aroma. Black pepper delivers caryophyllene. Lavender captures the floral note and linalool content. Sage for humulene grounding. Ylang ylang adds exotic floral depth reminiscent of sandalwood.",
    totalDrops: 40,
  },
  // Sol Spirit Farm
  {
    id: 12,
    name: "Glitter Bomb",
    farm: "Sol Spirit Farm",
    region: "Trinity",
    intent: "Body at ease, mind sparkling.",
    effects: "Physically Relaxing, Cerebral, Euphoric",
    aroma: "Kiwi, Pine, Musk",
    totalTerpenes: "2.39%",
    terpenes: [
      { name: "Myrcene", percentage: "1.23%" },
      { name: "β-Caryophyllene", percentage: "0.42%" },
      { name: "β-Ocimene", percentage: "0.17%" },
      { name: "Linalool", percentage: "0.15%" },
    ],
    oils: [
      { name: "Lemongrass", drops: 18, terpene: "Myrcene" },
      { name: "Black Pepper", drops: 10, terpene: "β-Caryophyllene" },
      { name: "Basil", drops: 4, terpene: "β-Ocimene" },
      { name: "Lavender", drops: 4, terpene: "Linalool" },
      { name: "Pine", drops: 4, terpene: "α-Pinene" },
    ],
    rationale: "High myrcene (1.23%) calls for lemongrass dominance (45%). Black pepper for the caryophyllene. Basil captures the ocimene. Lavender for linalool. Pine needle oil matches the 'pine' aroma note and adds forest character.",
    totalDrops: 40,
  },
  // Sunrise Gardens
  {
    id: 19,
    name: "Tropicanna Cherry",
    farm: "Sunrise Gardens",
    region: "Mendocino",
    intent: "Bright lift with clear, lively edges.",
    effects: "Euphoric, Cerebral, Cheerful",
    aroma: "Sour Cherry, Sweet Citrus, Nutmeg",
    totalTerpenes: "1.18%",
    terpenes: [
      { name: "β-Caryophyllene", percentage: "0.37%" },
      { name: "Limonene", percentage: "0.29%" },
      { name: "Linalool", percentage: "0.15%" },
      { name: "α-Humulene", percentage: "0.11%" },
    ],
    oils: [
      { name: "Black Pepper", drops: 12, terpene: "β-Caryophyllene" },
      { name: "Sweet Orange", drops: 10, terpene: "Limonene" },
      { name: "Lavender", drops: 6, terpene: "Linalool" },
      { name: "Geranium", drops: 6, terpene: "Floral" },
      { name: "Sage", drops: 4, terpene: "α-Humulene" },
      { name: "Clove", drops: 2, terpene: "β-Caryophyllene" },
    ],
    rationale: "Black pepper for the caryophyllene backbone. Sweet orange captures the 'sweet citrus' note. Lavender for linalool softness. Geranium adds cherry-like fruity notes. Sage for humulene depth. Clove echoes the nutmeg warmth.",
    totalDrops: 40,
  },
];
const NavButton = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: '12px 8px',
      background: active ? colors.forest : 'transparent',
      color: active ? colors.cream : colors.charcoal,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '10px',
      fontWeight: active ? '600' : '400',
      minWidth: '56px',
    }}
  >
    <span style={{ fontSize: '18px' }}>{icon}</span>
    <span>{label}</span>
  </button>
);
const HomeScreen = ({ setScreen }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 24px', textAlign: 'center' }}>
    <div style={{ marginBottom: '8px', fontSize: '32px' }}>🌿</div>
    <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, marginBottom: '4px', letterSpacing: '-0.5px' }}>Terpenes</h1>
    <p style={{ fontSize: '14px', color: colors.muted, marginBottom: '16px', fontStyle: 'italic' }}>with a twist of aromatherapy</p>
    <p style={{ fontSize: '13px', color: colors.charcoal, marginBottom: '40px', maxWidth: '280px', lineHeight: '1.5' }}>What if terpenes don't just flavor your strain, but shape the entire experience?</p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', maxWidth: '300px' }}>
      {[
        { label: 'The Story', screen: 'story', icon: '📖' },
        { label: 'The Pitch', screen: 'pitch', icon: '💡' },
        { label: 'The Science', screen: 'science', icon: '🔬' },
        { label: 'Strain Blends', screen: 'recipes', icon: '🧪' },
      ].map(item => (
        <button
          key={item.screen}
          onClick={() => setScreen(item.screen)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', background: colors.warmWhite, border: `1px solid ${colors.sage}33`, borderRadius: '12px', cursor: 'pointer', gap: '8px' }}
        >
          <span style={{ fontSize: '28px' }}>{item.icon}</span>
          <span style={{ fontSize: '13px', fontWeight: '500', color: colors.charcoal }}>{item.label}</span>
        </button>
      ))}
    </div>

    <p style={{ marginTop: '40px', fontSize: '12px', color: colors.muted, maxWidth: '280px', lineHeight: '1.5' }}>
      A proposal for Solful Dispensary<br/>by Charles Pelletier-Gagné
    </p>
  </div>
);
const StoryScreen = () => (
  <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '24px', fontWeight: '300', color: colors.forest, marginBottom: '24px' }}>The Story</h2>

    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Puzzle</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>It started with an urban myth.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Eating mango before getting high was supposed to amplify the experience. I first heard this in my early smoking days, living in Montreal in the early 2010s. Cannabis was still illegal. Choice was limited. I bought whatever was available, usually Quebec-grown flower like Purple Kush, M39, White Widow, Jean Guy, and occasionally Blue Dream. I rarely had more than one strain at home at a time.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I tried the mango thing. Drank mango juice before smoking a few times.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Sometimes it worked. Sometimes nothing happened at all.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>I assumed it was placebo and moved on. But one question stuck with me: <em>why was it inconsistent?</em></p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Accidental Experiment</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>A few years later, around 2015, things changed.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I started buying higher-quality flower imported from British Columbia. For the first time, I had real choice. I bought glass jars and gave each strain its own place. Pineapple Express in a pineapple jar. Girl Scout Cookies in one with a cloud and rainbow. Blue Dream got a Super Mario mushroom. Sour Diesel, flames.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I started choosing strains intentionally. Some for focus. Some for creativity. Some for winding down. I still do this today.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>At the same time, I was deep in business school, majoring in finance and chasing perfect grades. One semester, I had two particularly difficult courses running in parallel: financial accounting and business statistics.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Around then, I came across research on scent-anchored memory. The idea was simple: if you study while exposed to a specific scent, and then recreate that same scent during an exam, recall improves.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I had already started getting into aromatherapy and owned about a dozen essential oils, so I decided to test it. I set up two diffusers on my desk:</p>
      <ul style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px', paddingLeft: '20px' }}>
        <li>Peppermint and lemon for statistics</li>
        <li>Rosemary and eucalyptus for accounting</li>
      </ul>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Every study session, I ran the appropriate blend. During breaks, I'd smoke. Usually Blue Dream or Girl Scout Cookies. Small amounts. Just enough to reset, put music on, and slide back into focus.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Here's what I noticed, without fully understanding it yet: despite having a high tolerance, I was getting a full, balanced high from very little flower. And when I went back to studying, I'd fall into deep flow states. Clear. Focused. Locked in.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>By midterms, I brought the experiment into the exam room. I dabbed the appropriate essential oil blend onto a handkerchief and placed it on the corner of my desk.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>The results surprised me. <strong>100% on business statistics. 98% on financial accounting.</strong> My first perfect grades ever.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Eureka Moment</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>The realization came during a study break. Blue Dream in the bong. Procrastinating online. I stumbled back onto the mango myth.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>This time, I didn't dismiss it. I wanted to understand why it sometimes worked.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>The answer came quickly.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Mango is high in myrcene, one of the most common terpenes in cannabis. If you eat mango before smoking a myrcene-rich strain, you're stacking the same compound from two sources. The effects add up. But if the strain doesn't contain much myrcene, the mango does nothing.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>That explained the inconsistency.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Then it clicked even harder.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I started looking up the terpene profiles of the strains in my drawer. And there they were: <em>limonene, linalool, alpha-pinene, myrcene.</em> The same words printed on the backs of my essential oil bottles.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>I looked at my diffuser. I looked at my weed jars. I looked at my essential oils.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>The same chemical compounds responsible for lavender being calming and peppermint being energizing were the compounds differentiating Blue Dream from Sour Diesel.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>I hadn't just been anchoring memory with scent. I had been pre-loading my system with the same terpenes found in the strains I was smoking. That's why I was getting so much effect from so little flower.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Intentional Experiment</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Once I saw the pattern, I tested it on purpose.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>In 2017, I set up ten small glasses on my desk. I opened a jar of one strain, looked up its terpene profile, and started blending essential oils to match it.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>One drop. Two drops. Smell. Compare. Adjust. Repeat.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>When I found the closest match, I tested it. I diffused the blend in the room and added one or two drops to my bong water. Strain jar open. Diffuser running. Then I took the hit.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>The effect was immediate. The flavor was amplified. The high felt brighter, cleaner, and more euphoric. It hit faster. It felt like my brain had already been primed before the first inhale. Because it had.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginTop: '12px' }}>I repeated the process with every strain I had. Took notes. Built recipes. Even put together a PowerPoint with terpene analyses and supporting research.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginTop: '12px' }}>I thought about pitching it to Leafly or High Times. I didn't. At the time, the market wasn't ready. THC percentage dominated everything. Terpenes weren't part of the conversation yet.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginTop: '12px', fontWeight: '500' }}>So I kept it to myself. Until now.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>Why This Matters</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>This wasn't just a personal experiment.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>What I stumbled into connects three things that are usually treated separately: how cannabis feels, how smell affects the brain, and how terpenes actually work in the body.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>For years, cannabis culture focused almost entirely on THC percentage. But THC alone doesn't explain why different strains feel different, why some highs are clear while others are foggy, or why small changes in context can dramatically change the experience.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Terpenes do.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>They're the compounds responsible for aroma, flavor, mood, and tone. They exist in cannabis, essential oils, food, and even forest air. They influence memory, emotion, and perception through direct neurological pathways.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px', fontWeight: '500' }}>What this story shows is simple: when terpenes are layered intentionally, the experience changes.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>Not because of more THC. Not because of placebo. But because the system is being primed before consumption.</p>
    </section>
    <div style={{ background: colors.cream, padding: '20px', borderRadius: '8px', borderLeft: `3px solid ${colors.forest}` }}>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, margin: 0, fontWeight: '500' }}>This is the missing link between aromatherapy and cannabis.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, margin: '12px 0 0 0' }}>And it opens the door to a more intentional, more refined way of getting high.</p>
    </div>
  </div>
);
const PitchScreen = () => (
  <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '24px', fontWeight: '300', color: colors.forest, marginBottom: '24px' }}>The Pitch</h2>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>Why Solful</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Most dispensaries are built around one question: What has the highest THC for the lowest price?</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>That approach produces predictable results. Harsh flower. One-dimensional highs. Customers trained to chase numbers instead of experiences.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>Solful is built on a different assumption: that how cannabis feels matters more than how high the number is.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>Terpene-First Curation</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Solful already leads with terpenes.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Your selection prioritizes terpene diversity over THC potency. Most strains sit between 20 and 25 percent THC, often paired with meaningful levels of CBG, CBC, or THCV. The focus is on balance, clarity, and character rather than brute force.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>Terpenes are why strains feel different. Solful curates for that difference.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Missing Layer</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Every Solful strain already has a terpene profile.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>What doesn't exist yet is a way for customers to extend that profile beyond the flower itself.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px', fontWeight: '500' }}>This is the opportunity.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Strain-matched essential oil blends, formulated to mirror the dominant terpenes of Solful's flagship strains, and sold directly alongside the flower.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Not cannabis-scented candles. Not generic aromatherapy. But blends designed to deliver the same terpene compounds found in the strain itself.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>The flower delivers the cannabinoids. The blend delivers the terpenes. Together, they create a more complete experience.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>What the Product Is</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Small bottles of essential oil blends, each one matched to a specific Solful strain.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Each blend is:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {[
          { title: 'Strain-specific', desc: 'Formulated to reflect the dominant terpenes in that exact flower' },
          { title: 'Diffuser-ready', desc: 'Designed for use in ultrasonic diffusers at home' },
          { title: 'Food-grade', desc: 'Safe for adding a drop or two to water, including bong water' },
          { title: 'Exclusive to Solful', desc: "Reinforcing Solful's terpene-first identity" },
        ].map((item, i) => (
          <div key={i} style={{ background: colors.warmWhite, padding: '12px 14px', borderRadius: '8px', border: `1px solid ${colors.sage}22` }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: colors.forest }}>{item.title}</span>
            <span style={{ fontSize: '13px', color: colors.charcoal }}> — {item.desc}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>This isn't about replacing the flower. It's about giving customers a way to layer the terpene experience before, during, and after consumption.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>How Customers Use It</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>This is the amplification protocol.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
        {[
          { step: '1', time: 'Before', action: 'About 30 minutes before consumption, customers start diffusing the strain-matched blend in their space.' },
          { step: '2', time: 'During', action: 'They continue diffusing while consuming, or add 1–2 drops to bong water for direct terpene exposure.' },
          { step: '3', time: 'After', action: 'They let the diffuser run as they settle into the experience.' },
        ].map(item => (
          <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '30px', height: '30px', background: colors.forest, color: colors.cream, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', flexShrink: 0 }}>{item.step}</div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.forest }}>{item.time}</span>
              <p style={{ fontSize: '14px', color: colors.charcoal, margin: '2px 0 0 0', lineHeight: '1.6' }}>{item.action}</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>Simple. Repeatable. Easy to explain.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>What Customers Notice</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Customers don't need to understand the science to feel the difference. They consistently notice:</p>
      <ul style={{ fontSize: '14px', lineHeight: '1.8', color: colors.charcoal, marginBottom: '12px', paddingLeft: '20px' }}>
        <li>Faster onset</li>
        <li>Brighter, more pronounced effects</li>
        <li>Enhanced flavor perception</li>
        <li>Longer-lasting experience</li>
        <li>Less flower needed for the same result</li>
      </ul>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>This isn't about getting "more high." It's about getting high better. More intentional. More aligned with the strain's natural character.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>Why This Works</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>At first glance, pairing cannabis with aromatherapy might sound unconventional. But the idea isn't speculative.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>The same compounds responsible for aroma and flavor also influence mood, perception, and physiology. Terpenes interact with the brain through direct olfactory pathways, circulate systemically when inhaled, and in some cases activate the same receptor systems cannabinoids do.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>When those compounds are layered intentionally before and during consumption, the cannabis experience changes in consistent, noticeable ways.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>The science behind this sits at the intersection of aromatherapy research, cannabis pharmacology, and even forest bathing studies. Understanding that connection explains why strain-matched terpene layering feels different, and why the effects go beyond flavor alone.</p>
    </section>
    <div style={{ background: colors.forest, padding: '20px', borderRadius: '8px', color: colors.cream }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '10px' }}>Why This Fits Solful</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>Solful has already done the hardest part.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>You've educated your customers. You've trained them to choose by nose, not by number. You've built trust around terpene-forward curation.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>Strain-matched aromatherapy doesn't change what Solful is. It extends it.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>It lets customers take the terpene story home with them and experience it before, during, and after consumption.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, fontWeight: '500', fontStyle: 'italic' }}>The flower stays the hero. The blend becomes the amplifier.</p>
    </div>
  </div>
);
const ScienceScreen = () => (
  <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ fontSize: '24px', fontWeight: '300', color: colors.forest, marginBottom: '24px' }}>The Science</h2>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>The Core Idea</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>The same chemical compounds that make lavender calming and peppermint energizing are what differentiate cannabis strains.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Those compounds are terpenes.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>By pre-loading your system with a terpene profile that matches the strain you're about to consume, you prime the brain and body before THC ever arrives. The result is a brighter, faster-onset, more pronounced experience from the same amount of flower.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>This isn't pseudoscience. It's the overlap of three established research areas that are rarely discussed together.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '12px' }}>Three Converging Fields</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { num: '1', title: 'Aromatherapy', desc: 'How inhaled terpenes affect mood, cognition, and physiology through the nervous system' },
          { num: '2', title: 'Cannabis Science', desc: 'How terpenes interact with cannabinoids and contribute to the entourage effect' },
          { num: '3', title: 'Forest Bathing', desc: 'How airborne terpenes from trees produce measurable biological effects in humans' },
        ].map(item => (
          <div key={item.num} style={{ display: 'flex', gap: '10px', padding: '12px', background: colors.warmWhite, borderRadius: '8px' }}>
            <div style={{ width: '26px', height: '26px', background: colors.sage, color: colors.warmWhite, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>{item.num}</div>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.charcoal, margin: '0 0 2px 0' }}>{item.title}</h4>
              <p style={{ fontSize: '12px', color: colors.muted, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginTop: '12px', fontWeight: '500' }}>All three are studying the same molecules. Just in different contexts.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>What Terpenes Actually Do</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Terpenes are aromatic compounds produced by plants. They are responsible for the smell of cannabis, citrus, lavender, pine, and pepper.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>But they don't just smell good.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Terpenes influence the body through multiple pathways:</p>
      <ul style={{ fontSize: '14px', lineHeight: '1.8', color: colors.charcoal, marginBottom: '12px', paddingLeft: '20px' }}>
        <li>Direct neurological signaling via the olfactory system</li>
        <li>Systemic absorption through the lungs and bloodstream</li>
        <li>Interaction with neurotransmitters and receptors</li>
        <li>In some cases, direct activation of cannabinoid receptors</li>
      </ul>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal }}>This is why aroma can change mood almost instantly, and why different cannabis strains feel fundamentally different even at similar THC levels.</p>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '12px' }}>Key Scientific Findings</h3>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>β-Caryophyllene: The Dietary Cannabinoid</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>In 2008, a landmark study published in PNAS identified β-caryophyllene as the first terpene proven to selectively activate the CB2 cannabinoid receptor.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>CB2 receptors are part of the endocannabinoid system and are involved in inflammation, pain, and immune regulation.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>β-caryophyllene is found in cannabis, black pepper, cloves, and rosemary.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, fontWeight: '500' }}>This means at least one terpene behaves as a functional cannabinoid on its own.</p>
        <p style={{ fontSize: '11px', color: colors.muted, fontStyle: 'italic', marginTop: '6px' }}>Source: PNAS, 2008</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>Multiple Terpenes Show Cannabinoid-Like Effects</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>A 2021 study published in Nature Scientific Reports tested several common cannabis terpenes, including α-humulene, linalool, β-pinene, and geraniol.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>The researchers found that each terpene produced cannabinoid-like effects on its own. When combined with cannabinoids, the effects were "selectively additive." The terpene-cannabinoid combinations enhanced effects without increasing side effects.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, fontWeight: '500' }}>This provides direct support for the entourage effect and shows that terpenes are active participants, not passive flavor compounds.</p>
        <p style={{ fontSize: '11px', color: colors.muted, fontStyle: 'italic', marginTop: '6px' }}>Source: Nature Scientific Reports, 2021</p>
      </div>
      <div>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>Lavender and Anxiety</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>A network meta-analysis published in Nature Scientific Reports found that Silexan, a standardized lavender oil preparation rich in linalool, performed comparably to paroxetine (Paxil) for generalized anxiety disorder.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, fontWeight: '500' }}>The key takeaway is not that lavender replaces pharmaceuticals, but that inhaled terpenes can produce clinically measurable effects on mood and anxiety. This is aromatherapy operating at a pharmacological level.</p>
        <p style={{ fontSize: '11px', color: colors.muted, fontStyle: 'italic', marginTop: '6px' }}>Source: Nature Scientific Reports, 2019</p>
      </div>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>How Pre-Loading Works</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>This is the framework that explains why strain-matched aromatherapy amplifies the cannabis experience.</p>
      <div style={{ marginBottom: '16px', padding: '14px', background: colors.warmWhite, borderRadius: '8px', borderLeft: `3px solid ${colors.sage}` }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>1. Olfactory Priming</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>The olfactory nerve is the only sensory pathway that connects directly to the limbic system, the brain region responsible for emotion, memory, and arousal.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal }}>When you diffuse a terpene profile before consumption, your brain is already responding to those compounds. When you then inhale cannabis with the same terpenes, the signal is reinforced.</p>
      </div>
      <div style={{ marginBottom: '16px', padding: '14px', background: colors.warmWhite, borderRadius: '8px', borderLeft: `3px solid ${colors.sage}` }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>2. Receptor Activation and Modulation</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>Terpenes interact with multiple receptor systems, including cannabinoid receptors, adenosine receptors, GABA pathways, and serotonin signaling.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal }}>By introducing terpenes before THC arrives, you begin activating and modulating these systems ahead of time. THC then enters a system that is already primed, which changes how the experience unfolds.</p>
      </div>
      <div style={{ padding: '14px', background: colors.warmWhite, borderRadius: '8px', borderLeft: `3px solid ${colors.sage}` }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.forest, marginBottom: '6px' }}>3. Bioavailability and Threshold Effects</h4>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, marginBottom: '8px' }}>Many terpenes show pharmacological effects only above certain concentration thresholds. The amounts present in flower alone may be below those thresholds.</p>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal }}>Diffusing essential oils increases total terpene exposure through inhalation. This may push total terpene levels into a range where their effects become noticeable. This helps explain why the experience feels stronger without increasing THC.</p>
      </div>
    </section>
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, marginBottom: '10px' }}>Forest Bathing as Real-World Proof</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>If inhaled terpenes matter, we should see effects outside of cannabis. We do.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Forest bathing research shows that inhaling airborne terpenes from trees leads to:</p>
      <ul style={{ fontSize: '14px', lineHeight: '1.8', color: colors.charcoal, marginBottom: '12px', paddingLeft: '20px' }}>
        <li>Reduced stress hormones</li>
        <li>Lower heart rate and blood pressure</li>
        <li>Increased immune cell activity</li>
        <li>Effects lasting days after exposure</li>
      </ul>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, fontWeight: '500' }}>Researchers identified phytoncides—essentially tree-derived terpenes—as the active agents. This validates the core premise of aromatherapy: sustained inhalation of terpenes changes human physiology.</p>
    </section>
    <div style={{ background: colors.forest, padding: '20px', borderRadius: '8px', color: colors.cream }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '10px' }}>The Real Insight</h3>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>What this work ultimately shows is something simpler than it first appears.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>Cannabis doesn't just act through chemistry. It acts through context.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>Smell, expectation, memory, environment, ritual. These aren't side effects of the experience. They're part of the mechanism. Terpenes sit at the center of that mechanism.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>They are chemical, but they are also sensory. They move through the body, but they also move through the mind. They reach the brain faster than almost anything else we inhale, and they shape how everything that follows is interpreted.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>What the science makes clear is that terpenes are not passive. They are signals. And when those signals are aligned intentionally, the experience becomes more coherent. More focused. More legible.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 12px 0' }}>Cannabis has always carried terpene information. Aromatherapy has always known how to work with it. Putting the two together doesn't create a new effect. It reveals one that was already happening in fragments.</p>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, fontWeight: '500', fontStyle: 'italic' }}>Once you see that, the question isn't whether this works. It's why it hasn't been done deliberately before.</p>
    </div>
  </div>
);
const RecipesScreen = ({ selectedStrain, setSelectedStrain }) => {
  if (selectedStrain) {
    return <StrainDetail strain={selectedStrain} onBack={() => setSelectedStrain(null)} />;
  }
  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '300', color: colors.forest, marginBottom: '12px' }}>🧪 Strain Blends</h2>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>Each blend is designed to mirror the dominant terpene profile of a specific Solful strain.</p>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px' }}>These recipes are not meant to replace the aroma of the flower. They deliver the same terpene compounds in a form that can be diffused or inhaled before and during consumption. Think of each blend as an extension of the strain's terpene profile, not a fragrance.</p>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: colors.charcoal, marginBottom: '12px', fontWeight: '500' }}>For best results, start diffusing the blend about 30 minutes before consuming the strain.</p>
        <p style={{ fontSize: '13px', color: colors.muted }}>Select a strain to see its essential oil recipe.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {strains.map(strain => (
          <button key={strain.id} onClick={() => setSelectedStrain(strain)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: colors.warmWhite, border: `1px solid ${colors.sage}22`, borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, margin: 0 }}>{strain.name}</h3>
                {strain.badge && (<span style={{ padding: '2px 8px', background: colors.gold, color: colors.charcoal, borderRadius: '10px', fontSize: '10px', fontWeight: '600' }}>{strain.badge}</span>)}
              </div>
              <p style={{ fontSize: '11px', color: colors.muted, margin: 0 }}>{strain.farm} • {strain.region}</p>
              <p style={{ fontSize: '12px', color: colors.sage, margin: '3px 0 0 0', fontWeight: '500' }}>{strain.effects}</p>
            </div>
            <div style={{ color: colors.sage, fontSize: '18px' }}>→</div>
          </button>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: colors.muted, textAlign: 'center', marginTop: '24px', fontStyle: 'italic' }}>Each blend is designed to be used alongside the flower, not instead of it.</p>
    </div>
  );
};
const StrainDetail = ({ strain, onBack }) => (
  <div style={{ padding: '24px' }}>
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: colors.sage, fontSize: '13px', cursor: 'pointer', padding: '0', marginBottom: '16px' }}>← Back to strains</button>
    <h2 style={{ fontSize: '22px', fontWeight: '600', color: colors.charcoal, marginBottom: '4px' }}>{strain.name}</h2>
    <p style={{ fontSize: '12px', color: colors.muted, marginBottom: '8px' }}>{strain.farm} • {strain.region}</p>
    <p style={{ fontSize: '14px', color: colors.charcoal, marginBottom: '16px', fontStyle: 'italic', lineHeight: '1.5' }}>{strain.intent}</p>
    <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {strain.badge && (<span style={{ padding: '5px 10px', background: colors.gold, color: colors.charcoal, borderRadius: '16px', fontSize: '11px', fontWeight: '600' }}>{strain.badge}</span>)}
      <span style={{ padding: '5px 10px', background: colors.forest, color: colors.cream, borderRadius: '16px', fontSize: '11px', fontWeight: '500' }}>{strain.effects}</span>
      <span style={{ padding: '5px 10px', background: colors.cream, color: colors.charcoal, borderRadius: '16px', fontSize: '11px' }}>{strain.aroma}</span>
    </div>
    <section style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: colors.forest, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Terpene Profile</h3>
      {strain.totalTerpenes && (<p style={{ fontSize: '13px', color: colors.charcoal, marginBottom: '10px', fontWeight: '500' }}>Total Terpenes: {strain.totalTerpenes}</p>)}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {strain.terpenes.map((terp, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: colors.charcoal }}>{terp.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '50px', height: '5px', background: colors.cream, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(parseFloat(terp.percentage) * 100, 100)}%`, height: '100%', background: colors.sage, borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '12px', color: colors.muted, minWidth: '40px' }}>{terp.percentage}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: colors.forest, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Essential Oil Recipe</h3>
      <p style={{ fontSize: '11px', color: colors.muted, marginBottom: '10px' }}>{strain.totalDrops} drops total (2ml batch)</p>
      <div style={{ background: colors.warmWhite, borderRadius: '10px', overflow: 'hidden', border: `1px solid ${colors.sage}22` }}>
        {strain.oils.map((oil, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: i < strain.oils.length - 1 ? `1px solid ${colors.sage}11` : 'none' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: '500', color: colors.charcoal }}>{oil.name}</span>
              <span style={{ fontSize: '11px', color: colors.muted, marginLeft: '6px' }}>({oil.terpene})</span>
            </div>
            <div style={{ background: colors.forest, color: colors.cream, padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>{oil.drops}</div>
          </div>
        ))}
      </div>
    </section>
    <section>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: colors.forest, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Blend Rationale</h3>
      <div style={{ background: colors.cream, padding: '14px', borderRadius: '8px', borderLeft: `3px solid ${colors.sage}` }}>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.charcoal, margin: 0 }}>{strain.rationale}</p>
      </div>
    </section>
  </div>
);
export default function SolfulTerpeneApp() {
  const [screen, setScreen] = useState('home');
  const [selectedStrain, setSelectedStrain] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, selectedStrain]);

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen setScreen={setScreen} />;
      case 'story': return <StoryScreen />;
      case 'pitch': return <PitchScreen />;
      case 'science': return <ScienceScreen />;
      case 'recipes': return <RecipesScreen selectedStrain={selectedStrain} setSelectedStrain={setSelectedStrain} />;
      default: return <HomeScreen setScreen={setScreen} />;
    }
  };
  return (
    <div style={{ minHeight: '100vh', background: colors.cream, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: screen !== 'home' ? '72px' : '0' }}>{renderScreen()}</div>
      {screen !== 'home' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: colors.warmWhite, borderTop: `1px solid ${colors.sage}22`, padding: '6px 8px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <NavButton label="Home" icon="🏠" active={screen === 'home'} onClick={() => { setScreen('home'); setSelectedStrain(null); }} />
          <NavButton label="Story" icon="📖" active={screen === 'story'} onClick={() => { setScreen('story'); setSelectedStrain(null); }} />
          <NavButton label="Pitch" icon="💡" active={screen === 'pitch'} onClick={() => { setScreen('pitch'); setSelectedStrain(null); }} />
          <NavButton label="Science" icon="🔬" active={screen === 'science'} onClick={() => { setScreen('science'); setSelectedStrain(null); }} />
          <NavButton label="Blends" icon="🧪" active={screen === 'recipes'} onClick={() => { setScreen('recipes'); setSelectedStrain(null); }} />
        </div>
      )}
    </div>
  );
}

# Terpene Beverage Recipe Framework

## The System: From Strain Card to Glass

This framework translates any cannabis strain profile card into terpene-matched beverage recipes across five categories: mocktails, cocktails, fresh juices/smoothies, herbal tea blends, and wellness shots. It mirrors the essential oil blending methodology already established in the Solful Sessions system — same logic, drinkable format.

The core principle: **terpenes produce identical effects regardless of plant source.** Linalool from lavender triggers the same GABA-mediated calm as linalool in cannabis. β-Caryophyllene from black pepper activates the same CB2 receptors as caryophyllene in flower. When you build a beverage that delivers the same terpene ratios as a strain, you create a parallel sensory experience — aroma, flavor, and functional effect — without the plant.

---

## Part 1: The Process (5 Steps)

### Step 1 — Parse the Card
Extract four variables from any strain card:
- **Terpene profile** with percentages (the recipe's molecular blueprint)
- **Aroma descriptors** (the recipe's flavor targets)
- **Effects** (the recipe's functional intent)
- **Essential oil recipe** (the bridge — oils already map terpenes to plant sources)

### Step 2 — Calculate Terpene Ratios
Convert raw percentages into proportional weights (just like the 40-drop oil blends):
- Divide each terpene's percentage by total named terpenes
- This gives you the proportion each terpene should occupy in the recipe
- Dominant terpene = dominant flavor/ingredient family

### Step 3 — Map Terpenes to Ingredients
Use the Terpene-to-Ingredient Master Map (Part 3) to identify candidate ingredients for each terpene. Filter candidates by beverage category.

### Step 4 — Apply Category Architecture
Each beverage category has a specific structure (base, body, accent, finish). Slot ingredients into the architecture using the proportional weights from Step 2.

### Step 5 — Tune by Vibe
Use the strain's effects and intent to make final adjustments: energy level, sweetness, carbonation, temperature, garnish theater.

---

## Part 2: Input Parser

### Strain Card Format (Standard Input)

```
STRAIN NAME
* Farm: [source]
* Effects: [effect1], [effect2], [effect3]
* Intent: [1-2 sentence description]
* Aroma: [note1], [note2], [note3]
* Lineage: [parent1] X [parent2]
* Terpenes: [terpene1] [%], [terpene2] [%], ...
* Total Terpenes: [%]
* Recipe (2ml / 40 drops):
   * [Oil1]: [drops] ([%])
   * [Oil2]: [drops] ([%])
   ...
* Blend Rationale: [explanation]
```

### Parsed Variables (Pink Rider Example)

| Variable | Value |
|----------|-------|
| **Strain** | Pink Rider |
| **Dominant Terpene** | Terpinolene (0.67%) |
| **Secondary Terpenes** | β-Caryophyllene (0.30%), β-Ocimene (0.20%), Limonene (0.20%) |
| **Named Terpene Total** | 1.37% |
| **Terpene Ratios** | Terpinolene 49%, Caryophyllene 22%, Ocimene 15%, Limonene 15% |
| **Aroma Targets** | Honeydew Melon, Key Lime, Hint of Spearmint |
| **Effect Profile** | Energized, Motivated, Creative |
| **Energy Level** | HIGH (all three effects are activating) |
| **Oil Bridge** | Tea Tree (terpinolene) → Black Pepper (caryo) → Basil (ocimene) → Lemon (limonene) → Peppermint (spearmint) → Geranium (honeydew) |

### Energy Classification Rules

Map the strain's effects to an energy tier. This determines base choices, carbonation, serving temperature, and sweetness level.

| Energy Tier | Effect Signals | Beverage Character |
|-------------|----------------|-------------------|
| **HIGH** | Energized, Motivated, Creative, Euphoric, Uplifting, Buzzy, Alert | Bright, carbonated, cold, tart-forward, light body |
| **MEDIUM** | Social, Happy, Focused, Balanced, Contemplative, Carefree | Balanced, can go either direction, moderate sweetness |
| **LOW** | Relaxed, Calm, Grounded, Sedative, Heavy, Sleepy, Blissful | Warm or room temp, rich body, sweet or savory, still or lightly sparkling |

---

## Part 3: Terpene-to-Ingredient Master Map

This is the core translation layer. For each terpene, ingredients are organized by function (base, accent, modifier, garnish) and tagged with which beverage categories they work in.

**Category Codes:** 🍹 Mocktail | 🍸 Cocktail | 🥤 Juice/Smoothie | 🍵 Tea | 💊 Wellness Shot

---

### TERPINOLENE — Herbal, Piney, Slightly Fruity

*Essential oil bridge: Tea Tree*
*Character: The "creative spark" terpene — fresh, complex, slightly mysterious*

Found in: apples, nutmeg, tea tree, cumin, lilac, marjoram, parsnip, celery seed, allspice

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Green apple juice | 🍹🥤💊 | Primary terpinolene carrier in beverages |
| **Base** | Celery juice | 🥤💊 | Earthy terpinolene with mineral quality |
| **Base** | Parsnip juice | 🥤 | Sweet, complex, underused |
| **Accent** | Nutmeg (freshly grated) | 🍹🍸🍵💊 | Warm terpinolene note, use sparingly |
| **Accent** | Marjoram (fresh) | 🍹🍸🍵 | Herbal terpinolene with floral edge |
| **Accent** | Allspice | 🍹🍸🍵💊 | Complex warm spice, terpinolene-rich |
| **Accent** | Cumin (light touch) | 💊 | Earthy, grounding, functional |
| **Modifier** | Tea tree honey | 🍹🍸🍵💊 | Sweetener that carries terpinolene aroma |
| **Modifier** | Green cardamom | 🍹🍸🍵💊 | Complex aromatic bridge |
| **Garnish** | Apple slice (thin) | 🍹🍸 | Visual + aromatic |
| **Garnish** | Marjoram sprig | 🍹🍸 | Herbal aromatics on the nose |

---

### β-CARYOPHYLLENE — Spicy, Peppery, Warm

*Essential oil bridge: Black Pepper*
*Character: The "grounding" terpene — the only one that binds CB2 cannabinoid receptors*

Found in: black pepper, cloves, cinnamon, basil, oregano, rosemary, hops, copaiba

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Black pepper (cracked) | 🍹🍸🍵💊 | Primary caryophyllene source — use in syrups, muddles, infusions |
| **Accent** | Cinnamon (Ceylon stick) | 🍹🍸🍵💊 | Warm caryophyllene with sweet edge |
| **Accent** | Whole cloves | 🍹🍸🍵💊 | Intense — use 1-2 max, steep don't crush |
| **Accent** | Fresh basil | 🍹🍸🥤🍵 | Dual-purpose: caryophyllene + ocimene |
| **Accent** | Rosemary (fresh sprig) | 🍹🍸🍵 | Caryophyllene + pinene bridge |
| **Accent** | Star anise | 🍹🍸🍵 | Aromatic complexity, caryophyllene carrier |
| **Modifier** | Black pepper syrup | 🍹🍸 | 1:1 simple syrup infused with cracked pepper 30 min |
| **Modifier** | Cinnamon syrup | 🍹🍸 | Ceylon stick in simple syrup, steep 4+ hours |
| **Modifier** | Turmeric (fresh root) | 🥤💊 | Synergistic with black pepper (2000% curcumin absorption) |
| **Garnish** | Cracked pepper rim | 🍹🍸 | Immediate aroma hit |
| **Garnish** | Cinnamon stick | 🍹🍸🍵 | Stirring + aromatics |
| **Garnish** | Rosemary sprig (torched) | 🍹🍸 | Smoke releases caryophyllene dramatically |

---

### β-OCIMENE — Sweet, Herbaceous, Fruity

*Essential oil bridge: Basil*
*Character: The "vivid lift" terpene — rare, energizing, adds brightness*

Found in: basil, mint, mangoes, kumquats, parsley, tarragon, orchid flowers, lavender, hops

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Fresh basil leaves | 🍹🍸🥤🍵 | Primary ocimene carrier — muddle, blend, or steep |
| **Base** | Mango (fresh) | 🍹🥤💊 | Ocimene + tropical sweetness |
| **Accent** | Kumquat | 🍹🍸 | Ocimene with citrus punch, eat-the-peel character |
| **Accent** | Tarragon (fresh) | 🍹🍸🍵 | Anise-herbaceous ocimene note |
| **Accent** | Italian parsley | 🥤💊 | Green, fresh, mineral ocimene |
| **Accent** | Mint (spearmint or peppermint) | 🍹🍸🥤🍵💊 | Ocimene + menthol cooling |
| **Modifier** | Basil syrup | 🍹🍸 | Blanch basil → blend into simple syrup → fine strain |
| **Modifier** | Mango puree | 🍹🥤 | Sweet, viscous body |
| **Garnish** | Thai basil leaf | 🍹🍸 | More aromatic than sweet basil, visual pop |
| **Garnish** | Kumquat half | 🍹🍸 | Edible garnish with ocimene burst |

---

### LIMONENE — Bright Citrus, Uplifting

*Essential oil bridge: Lemon / Sweet Orange*
*Character: The "mood elevator" terpene — anxiolytic, serotonergic, immediately recognizable*

Found in: lemon, lime, orange, grapefruit, bergamot, juniper, rosemary, fennel, dill

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Fresh lemon juice | 🍹🍸🥤💊 | Highest concentration limonene in juice form |
| **Base** | Fresh lime juice | 🍹🍸🥤💊 | Slightly different limonene profile than lemon |
| **Base** | Fresh grapefruit juice | 🍹🍸🥤💊 | Limonene + naringin (bitter complexity) |
| **Base** | Fresh orange juice | 🍹🥤💊 | Sweet limonene, good base volume |
| **Accent** | Lemon zest | 🍹🍸🍵💊 | Concentrated limonene (60-95% of rind oil is limonene) |
| **Accent** | Bergamot (Earl Grey) | 🍵🍹 | Refined limonene with floral edge |
| **Accent** | Juniper berries | 🍸🍵 | Piney limonene, pairs with gin |
| **Accent** | Fennel (fresh or seed) | 🍹🥤🍵 | Sweet limonene with anise |
| **Accent** | Yuzu juice | 🍹🍸💊 | Complex citrus, premium limonene source |
| **Modifier** | Citrus oleo saccharum | 🍹🍸 | Sugar-extracted citrus oil — pure limonene delivery |
| **Modifier** | Lemon/lime cordial | 🍹🍸 | Balanced sweet-sour limonene |
| **Modifier** | Honey-lemon | 🍵💊 | Classic carrier |
| **Garnish** | Citrus wheel/twist | 🍹🍸 | Express oils over drink surface |
| **Garnish** | Dehydrated citrus | 🍹🍸🍵 | Concentrated aromatics |
| **Garnish** | Lemon verbena leaf | 🍹🍸🍵 | Herbal limonene bridge |

---

### MYRCENE — Earthy, Musky, Tropical

*Essential oil bridge: Lemongrass*
*Character: The "deep rest" terpene — sedating, muscle-relaxing, enhances BBB permeability*

Found in: lemongrass, hops, bay leaves, thyme, basil, eucalyptus, verbena

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Lemongrass (fresh stalks) | 🍹🍸🍵💊 | Primary myrcene carrier — bruise and steep or simmer |
| **Base** | Hops (dried flowers) | 🍵🍸 | Myrcene-rich, bitter, sleep-promoting |
| **Accent** | Bay leaf | 🍹🍸🍵💊 | Subtle myrcene, aromatic depth |
| **Accent** | Fresh thyme | 🍹🍸🍵 | Myrcene + thymol (antimicrobial) |
| **Accent** | Lemongrass paste | 🥤💊 | Concentrated myrcene for blended drinks |
| **Modifier** | Lemongrass syrup | 🍹🍸 | Bruised lemongrass steeped in simple syrup 1+ hour |
| **Modifier** | Hop syrup | 🍹🍸 | Bitter-sweet, strongly sedating |
| **Modifier** | Thyme honey | 🍹🍸🍵💊 | Natural pairing — honey amplifies thyme myrcene |
| **Garnish** | Lemongrass stalk | 🍹🍸 | Stir stick + aromatics |
| **Garnish** | Thyme sprig | 🍹🍸 | Rustic, aromatic |

---

### LINALOOL — Floral, Lavender, Calming

*Essential oil bridge: Lavender*
*Character: The "anxiety killer" terpene — GABA-A receptor agonist, clinical-grade anxiolytic*

Found in: lavender, coriander/cilantro, sweet basil, mint, cinnamon, rosewood, birch

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Lavender (culinary grade) | 🍹🍸🍵💊 | Steep, don't boil — delicate linalool |
| **Accent** | Coriander seed | 🍹🍸🍵💊 | Linalool with citrus-spice edge |
| **Accent** | Fresh cilantro | 🥤💊 | Bright linalool (polarizing — skip if audience dislikes) |
| **Accent** | Sweet basil | 🍹🍸🥤🍵 | Linalool + ocimene dual carrier |
| **Accent** | Rose petals (dried) | 🍹🍸🍵 | Geraniol + linalool floral blend |
| **Accent** | Chamomile flowers | 🍵💊 | Linalool + bisabolol calming stack |
| **Modifier** | Lavender syrup | 🍹🍸 | Light steep (3 min) — over-steeping turns soapy |
| **Modifier** | Rose water | 🍹🍸🥤🍵 | Gentle linalool + geraniol modifier |
| **Modifier** | Butterfly pea flower | 🍹🍸🍵 | Color-changing (pH reactive), mild linalool |
| **Garnish** | Lavender sprig | 🍹🍸🍵 | Aromatics on the nose |
| **Garnish** | Edible flowers | 🍹🍸 | Visual + delicate linalool |

---

### α-PINENE — Pine, Forest, Alert

*Essential oil bridge: Rosemary / Pine*
*Character: The "memory" terpene — AChE inhibitor, promotes alertness and recall*

Found in: rosemary, pine nuts, parsley, basil, dill, eucalyptus, sage, conifer needles

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Rosemary (fresh sprigs) | 🍹🍸🍵💊 | Primary pinene carrier — versatile across categories |
| **Accent** | Pine nuts | 🥤 | Creamy pinene for smoothies |
| **Accent** | Fresh dill | 🍹🥤 | Light pinene with anise note |
| **Accent** | Sage (fresh leaves) | 🍹🍸🍵 | Earthy pinene, pairs with fruit |
| **Accent** | Douglas fir tips | 🍹🍸🍵 | Seasonal, intensely piney (spring harvest) |
| **Accent** | Eucalyptus (food-grade) | 🍵💊 | Mentholated pinene, use sparingly |
| **Modifier** | Rosemary simple syrup | 🍹🍸 | Steep 20 min, strong aromatic |
| **Modifier** | Pine needle syrup | 🍹🍸 | Foraged, complex, terroir-driven |
| **Garnish** | Rosemary sprig (torched) | 🍹🍸 | Smoke amplifies pinene release |
| **Garnish** | Pine nut crumble | 🥤 | Textural + aromatic |

---

### α-HUMULENE — Earthy, Woody, Hoppy

*Essential oil bridge: Sage / Hops*
*Character: The "appetite suppressant" terpene — anti-inflammatory, cannabimimetic*

Found in: hops, sage, ginseng, ginger, clove, basil, spearmint

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Hops (dried flowers) | 🍹🍸🍵 | Primary humulene source — bitter, aromatic, sedating |
| **Accent** | Fresh sage | 🍹🍸🍵 | Earthy humulene with camphor note |
| **Accent** | Ginseng root | 🍵💊 | Adaptogenic humulene, bitter-sweet |
| **Accent** | Ginger (fresh root) | 🍹🍸🥤🍵💊 | Humulene + gingerols — warming, anti-nausea |
| **Modifier** | Hop water | 🍹 | Non-alcoholic hop extraction — carbonated base |
| **Modifier** | Ginger syrup | 🍹🍸 | Fresh ginger simmered in simple syrup |
| **Garnish** | Candied ginger | 🍹🍸 | Sweet-spicy, visual |
| **Garnish** | Sage leaf (fried) | 🍹🍸 | Crispy, aromatic, elegant |

---

### α-BISABOLOL — Floral, Chamomile, Gentle

*Essential oil bridge: German Chamomile*
*Character: The "gentle healer" terpene — anti-inflammatory, calming without sedation*

Found in: chamomile, guava, candeia tree

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Chamomile flowers (dried) | 🍵💊 | Primary bisabolol source — steep 5-7 min |
| **Base** | Guava (fresh or puree) | 🍹🥤💊 | Tropical bisabolol with sweetness |
| **Accent** | Chamomile tea (brewed, chilled) | 🍹🍸🥤 | Versatile bisabolol base liquid |
| **Modifier** | Chamomile syrup | 🍹🍸 | Steep flowers in simple syrup 20 min |
| **Garnish** | Dried chamomile flowers | 🍹🍸🍵 | Floating aromatics |

---

### trans-β-FARNESENE — Green Apple, Fruity

*Essential oil bridge: Ylang Ylang / Green Apple*
*Character: The "enhancer" terpene — calming, amplifies other terpenes*

Found in: green apple skin, ginger, nutmeg, chamomile, hops, ylang ylang

| Role | Ingredient | Categories | Notes |
|------|-----------|------------|-------|
| **Base** | Green apple juice | 🍹🥤💊 | Primary farnesene source — tart, fresh |
| **Accent** | Ginger (fresh) | 🍹🍸🥤🍵💊 | Farnesene + gingerols |
| **Accent** | Nutmeg (freshly grated) | 🍹🍸🍵 | Warm farnesene with terpinolene overlap |
| **Modifier** | Green apple shrub | 🍹🍸 | Vinegar-preserved, tart-sweet |
| **Garnish** | Thin apple fan | 🍹🍸 | Visual elegance |

---

## Part 4: Recipe Architecture by Category

Each category follows a layered structure mirroring the essential oil blending method. **Proportions track the strain's terpene ratios** — if terpinolene is 49% of the named profile, terpinolene-carrying ingredients should occupy roughly half the recipe's flavor identity.

---

### 🍹 MOCKTAIL (8-12 oz served)

| Layer | Volume | Function | Rule |
|-------|--------|----------|------|
| **Base** | 3-4 oz | Primary liquid, carries dominant terpene | Juice, puree, or infused water aligned to top terpene |
| **Body** | 2-3 oz | Volume + texture, carries secondary terpenes | Tonic, soda, coconut water, kombucha, hop water |
| **Accent** | 0.5-1 oz | Flavor complexity, carries tertiary terpenes | Syrups, cordials, shrubs, specialty juices |
| **Modifier** | 2-4 dashes or 0.25 oz | Aroma-forward, fine-tuning | Bitters, tinctures, extracts, rose/orange blossom water |
| **Garnish** | — | First sensory contact (aroma before taste) | Herbs, citrus expression, edible flowers, spice rims |

**Method options:** Built (over ice), Shaken (with citrus), Stirred (spirit-free "stirred" builds), Blended (frozen/slushy)

**Carbonation rule:** HIGH energy = full carbonation (tonic, soda). MEDIUM = light sparkle (sparkling water). LOW = still or gently sparkling.

**Sweetness rule:** HIGH energy = tart-forward, minimal sweet. MEDIUM = balanced. LOW = richer sweetness allowed.

**Ice rule:** HIGH energy = crushed ice or large cube. MEDIUM = standard cubes. LOW = consider serving warm or with a single large cube.

---

### 🍸 COCKTAIL (4-6 oz served)

| Layer | Volume | Function | Rule |
|-------|--------|----------|------|
| **Spirit** | 1.5-2 oz | Backbone — choose spirit whose botanicals align with terpene profile | Gin (pinene/limonene), Mezcal (myrcene/caryophyllene), Rum (ocimene/limonene), Whiskey (caryophyllene/humulene), Vodka (neutral canvas), Tequila (limonene) |
| **Modifier** | 0.75-1 oz | Bridges spirit to terpene profile | Vermouths, amari, liqueurs, fortified wines |
| **Citrus/Acid** | 0.5-0.75 oz | Brightness + limonene delivery | Fresh juice, shrubs, verjus, acid-adjusted juices |
| **Sweetener** | 0.25-0.75 oz | Balance + terpene-infused syrups | Honey, agave, terpene-infused simple syrups |
| **Garnish** | — | Aromatic crown — express oils, torch herbs, float flowers | Must deliver at least one terpene from the profile |

**Spirit selection guide by dominant terpene:**

| Dominant Terpene | Best Spirit Match | Why |
|------------------|-------------------|-----|
| Terpinolene | Gin, Pisco, Blanco Tequila | Herbal/botanical spirits complement terpinolene's complexity |
| β-Caryophyllene | Mezcal, Rye Whiskey, Aged Rum | Spice-forward spirits amplify peppery warmth |
| Limonene | Tequila, Vodka, White Rum, Gin | Citrus-friendly spirits let limonene shine |
| Myrcene | Mezcal, Scotch, Dark Rum | Earthy/tropical spirits mirror myrcene depth |
| Linalool | Gin (floral), Pisco, Sake | Delicate spirits preserve floral character |
| α-Pinene | Gin, Aquavit | Conifer-botanical spirits = pinene harmony |
| β-Ocimene | White Rum, Pisco, Sake | Light spirits let ocimene's brightness lead |
| Humulene | IPA-washed spirits, Amaro, Whiskey | Hop-adjacent spirits mirror humulene earthiness |

---

### 🥤 JUICE / SMOOTHIE (12-16 oz served)

| Layer | Volume | Function | Rule |
|-------|--------|----------|------|
| **Primary Juice/Fruit** | 6-8 oz | Dominant terpene carrier, bulk of recipe | Whole fruits, cold-pressed juices |
| **Secondary Fruit** | 2-4 oz | Secondary terpene, complementary flavor | Contrast or complement primary |
| **Green/Herb** | 1-2 oz or handful | Terpene boost + nutrition | Basil, mint, parsley, spinach, kale |
| **Functional Add** | 1 tsp-1 tbsp | Wellness angle, terpene concentration | Ginger, turmeric, adaptogenic powders |
| **Liquid** | 2-4 oz | Texture + dilution | Coconut water, oat milk, almond milk, filtered water |
| **Fat (smoothie only)** | 1-2 tbsp | Terpene absorption (fat-soluble molecules) | Avocado, MCT oil, nut butter, coconut cream |

**CRITICAL: Fat enhances terpene bioavailability.** Terpenes are lipophilic — adding a fat source to smoothies increases absorption. This mirrors the entourage effect science: fat-soluble terpene molecules cross cell membranes more efficiently when delivered with lipids.

**Juice vs. Smoothie decision:** If the strain is HIGH energy → lean juice (lighter, cleaner). If MEDIUM/LOW → smoothie (richer, more sustained delivery).

---

### 🍵 HERBAL TEA BLEND / INFUSION (8-12 oz served)

| Layer | Amount (per cup) | Function | Rule |
|-------|-----------------|----------|------|
| **Primary Herb** | 1-2 tsp | Dominant terpene carrier | Dried herbs, flowers, or roots aligned to top terpene |
| **Secondary Herb** | 0.5-1 tsp | Secondary terpene + complexity | Complementary dried botanical |
| **Accent** | 0.25-0.5 tsp | Tertiary terpene, aromatic lift | Spices, zests, specialty ingredients |
| **Base Tea (optional)** | 1 tsp | Body + caffeine calibration | Green tea (energizing), black tea (grounding), rooibos (caffeine-free), white tea (delicate) |
| **Sweetener** | To taste | Balance bitterness | Raw honey (preserves volatile compounds), maple, agave |

**Temperature rules:**
- HIGH energy strains → Green tea base, brew at 175°F, steep 2-3 min
- MEDIUM energy → Oolong or white tea base, brew at 185°F, steep 3-4 min
- LOW energy → Rooibos or caffeine-free, brew at 200-212°F, steep 5-7 min

**Steep time matters:** Longer steeping extracts more terpenes but also more tannins (bitterness). For terpene-focused blends, steep shorter and at slightly lower temperatures to preserve volatile aromatics.

**Iced tea option:** Brew hot at double strength, pour over ice. Or cold-brew overnight (12-18 hours) for maximum terpene extraction with minimal bitterness.

---

### 💊 WELLNESS SHOT (2-3 oz served)

| Layer | Amount | Function | Rule |
|-------|--------|----------|------|
| **Active Base** | 1.5-2 oz | Concentrated terpene delivery | Cold-pressed juice or concentrated infusion |
| **Functional Kicker** | 0.5 oz | Bioactive boost | Ginger, turmeric, cayenne, ACV, lemon |
| **Terpene Spike** | Pinch/dash | Concentrated terpene hit | Ground spice, zest, extract |
| **Absorption Enhancer** | Pinch | Bioavailability | Black pepper (piperine), fat (MCT), cayenne |
| **Sweetener (optional)** | 0.5 tsp | Palatability | Raw honey, maple, agave |

**The Piperine Principle:** Always include a pinch of black pepper in wellness shots. Piperine increases curcumin absorption by 2000% and enhances general bioavailability of fat-soluble compounds including terpenes.

**Serving temperature:** Room temp or slightly chilled. Never ice-cold — cold numbs taste receptors and reduces aromatic perception, defeating the terpene experience.

---

## Part 5: Vibe/Intent Modifiers

After building the base recipe from terpene ratios, apply these finishing adjustments based on the strain's effect profile. These are the same 8 vibes from the Solful Sessions system.

| Vibe | Modifier Direction | Specific Adjustments |
|------|-------------------|---------------------|
| **Grounded & Present** | Earthy, warm, steady | Add root vegetables (beet, carrot), warming spices (cinnamon, cardamom), reduce acidity, favor still over sparkling |
| **Creative Flow** | Bright, unexpected, layered | Add unusual combinations (basil + citrus, fennel + apple), use color-changing elements (butterfly pea), add texture contrast |
| **Deep Rest** | Rich, warm, enveloping | Warm serving temp, chamomile/lavender dominant, add honey, use rooibos or warm milk bases, heavy body |
| **Social & Bright** | Fun, approachable, colorful | Full carbonation, bright garnishes, citrus-forward, crowd-pleasing flavors, shareable format |
| **Body Melt** | Heavy, comforting, smooth | Thick/creamy textures, warming spices, minimal acidity, coconut cream or oat milk bases |
| **Euphoric Lift** | Electric, tart, sparkling | Maximum carbonation, sour elements (shrubs, kombucha), bright colors, dramatic garnish |
| **Calm Focus** | Clean, precise, minimal | Green tea base, minimal sweetness, clean flavors (cucumber, mint, lemon), still water |
| **Cozy Comfort** | Familiar, warm, sweet | Vanilla, cinnamon, honey, warm milk, dessert-adjacent flavors, nostalgic ingredients |

---

## Part 6: Comprehensive Ingredient Library

Every ingredient below is tagged with its primary terpene(s), which beverage categories it fits, and functional notes. Use this as the selection pool when building recipes.

### FRUITS

| Ingredient | Primary Terpene(s) | Categories | Flavor Notes | Functional Notes |
|-----------|-------------------|------------|--------------|-----------------|
| Lemon | Limonene (60-95% of peel oil) | 🍹🍸🥤🍵💊 | Tart, bright, clean | Vitamin C, alkalizing, digestive |
| Lime | Limonene, γ-Terpinene | 🍹🍸🥤🍵💊 | Sharp, tropical-tart | Pairs with all categories |
| Key lime | Limonene (concentrated) | 🍹🍸🥤💊 | Floral-citrus, more aromatic than Persian lime | Smaller, more complex |
| Grapefruit | Limonene, Nootkatone | 🍹🍸🥤💊 | Bitter-sweet, pink=sweeter | Naringin adds pleasant bitterness |
| Orange (navel) | Limonene (90%+ of peel oil) | 🍹🥤💊 | Sweet citrus, approachable | High juice yield |
| Blood orange | Limonene, Anthocyanins | 🍹🍸🥤💊 | Berry-citrus, deep color | Dramatic visual |
| Bergamot | Limonene, Linalool, Linalyl acetate | 🍵🍹 | Floral-citrus, Earl Grey character | Calming + uplifting dual action |
| Yuzu | Limonene (complex profile) | 🍹🍸💊 | Complex citrus, Japanese origin | Premium, aromatic |
| Green apple | Terpinolene, Farnesene | 🍹🥤💊 | Tart, crisp, refreshing | Primary terpinolene juice source |
| Mango | Ocimene, Myrcene, Terpinolene | 🍹🥤💊 | Tropical, rich, sweet | Complex terpene profile |
| Guava | Bisabolol, Caryophyllene | 🍹🥤💊 | Tropical, musky-sweet | Bisabolol carrier |
| Pineapple | Limonene, Myrcene | 🍹🥤💊 | Tropical, enzymatic (bromelain) | Anti-inflammatory enzyme |
| Kumquat | Ocimene, Limonene | 🍹🍸 | Eat-the-peel citrus, sweet rind | Unique whole-fruit use |
| Honeydew melon | Varied terpenes, Cucurbitacins | 🍹🥤 | Sweet, mild, refreshing | Light body, good blending base |
| Watermelon | Varied, low terpene concentration | 🍹🥤 | Sweet, hydrating, clean | High water content, pairs with mint |
| Passion fruit | Limonene, Linalool | 🍹🍸🥤 | Intense tart-tropical | Strong aromatic, use sparingly |
| Coconut | Varied | 🍹🥤🍵 | Sweet, fatty, tropical | Fat source for terpene absorption |
| Berries (blueberry) | Linalool, Myrcene, Limonene | 🍹🥤 | Sweet-tart, antioxidant | Complex subtle terpene profile |
| Berries (strawberry) | Linalool, Geraniol | 🍹🥤 | Sweet, aromatic | Pairs with basil (ocimene bridge) |
| Berries (raspberry) | Linalool, Geraniol | 🍹🥤 | Tart, aromatic | Good acidity for balance |

### HERBS (Fresh)

| Ingredient | Primary Terpene(s) | Categories | Flavor Notes | Functional Notes |
|-----------|-------------------|------------|--------------|-----------------|
| Basil (sweet) | Ocimene, Linalool, Caryophyllene | 🍹🍸🥤🍵 | Sweet, peppery, complex | Triple terpene carrier — most versatile herb |
| Basil (Thai) | Ocimene, Eugenol | 🍹🍸🥤 | Anise-forward, aromatic | Stronger than sweet basil |
| Mint (spearmint) | Carvone, Limonene, Ocimene | 🍹🍸🥤🍵💊 | Sweet-cool, gentle | Lighter than peppermint |
| Mint (peppermint) | Menthol, Limonene, Pinene | 🍹🍸🥤🍵💊 | Intense cool, sharp | Stronger menthol punch |
| Rosemary | Pinene, Caryophyllene, Limonene | 🍹🍸🍵💊 | Piney, resinous, complex | Memory/alertness support |
| Lavender (culinary) | Linalool (37%), Linalyl acetate | 🍹🍸🍵💊 | Floral, calming, soapy if overused | 3 min steep MAX or turns soapy |
| Thyme | Myrcene, Thymol, Carvacrol | 🍹🍸🍵 | Earthy, savory, medicinal | Antimicrobial, respiratory |
| Sage | Pinene, Humulene, Camphor | 🍹🍸🍵 | Earthy, slightly bitter | Pairs surprisingly well with fruit |
| Tarragon | Ocimene, Estragole | 🍹🍸🍵 | Anise-herbal, French cuisine staple | Unique ocimene profile |
| Cilantro/Coriander leaf | Linalool, Decanal | 🥤💊 | Bright, polarizing (genetic), soapy to some | Skip if audience sensitive |
| Lemongrass | Myrcene, Citral, Geraniol | 🍹🍸🍵💊 | Citrus-herbal, Thai-forward | Primary myrcene carrier in herbs |
| Lemon verbena | Limonene, Citral | 🍹🍸🍵 | Clean citrus-herbal | Lighter than lemongrass |
| Dill | Pinene, Limonene, Carvone | 🍹🥤 | Fresh, anise-adjacent | Unusual but effective in juices |
| Parsley (Italian) | Ocimene, Pinene, Myristicin | 🥤💊 | Green, mineral, fresh | Nutritional powerhouse |
| Marjoram | Terpinolene, Terpinen-4-ol | 🍹🍸🍵 | Sweet oregano, floral-herbal | Key terpinolene herb |

### SPICES & DRIED BOTANICALS

| Ingredient | Primary Terpene(s) | Categories | Flavor Notes | Functional Notes |
|-----------|-------------------|------------|--------------|-----------------|
| Black pepper | Caryophyllene (dominant), Limonene, Pinene | 🍹🍸🍵💊 | Spicy, warming, sharp | CB2 agonist, piperine enhances absorption |
| Cinnamon (Ceylon) | Caryophyllene, Cinnamaldehyde | 🍹🍸🍵💊 | Warm, sweet-spicy | Blood sugar regulation |
| Cloves | Caryophyllene, Eugenol | 🍹🍸🍵💊 | Intense warm spice | Numbing quality, use sparingly (1-2 max) |
| Nutmeg | Terpinolene, Myristicin, Pinene | 🍹🍸🍵 | Warm, sweet, complex | Terpinolene carrier in spice form |
| Allspice | Terpinolene, Eugenol, Caryophyllene | 🍹🍸🍵💊 | "All spices in one" | Complex terpene delivery |
| Star anise | Caryophyllene, Anethole | 🍹🍸🍵 | Sweet licorice, aromatic | Visual interest in drinks |
| Cardamom (green) | Pinene, Limonene, Cineole | 🍹🍸🍵💊 | Bright, complex, citrus-camphor | Bridges multiple terpene families |
| Ginger (fresh root) | Humulene, Farnesene, Zingiberene | 🍹🍸🥤🍵💊 | Hot, bright, warming | Anti-nausea, anti-inflammatory |
| Turmeric (fresh root) | Turmerone, Zingiberene, Caryophyllene | 🥤🍵💊 | Earthy, warm, bitter | Curcumin (synergistic with black pepper) |
| Cayenne | Capsaicin | 🍹💊 | Pure heat | Thermogenic, circulation, pinch only |
| Vanilla bean | Vanillin (not a terpene, but synergistic) | 🍹🍸🥤🍵 | Sweet, warm, comforting | Universal "cozy" modifier |
| Coriander seed | Linalool (60-80%), Pinene | 🍹🍸🍵💊 | Lemony, warm, nutty | Highest linalool concentration in spice form |
| Juniper berries | Pinene, Limonene, Myrcene | 🍸🍵 | Piney, resinous, gin-character | Natural gin botanical |
| Fennel seed | Limonene, Anethole | 🍹🥤🍵 | Sweet anise, digestive | Settles stomach |
| Cumin | Terpinolene, Cuminaldehyde | 💊 | Earthy, warm, savory | Terpinolene carrier (use carefully in drinks) |
| Hops (dried) | Myrcene, Humulene, Caryophyllene | 🍹🍸🍵 | Bitter, floral, grassy | Sedating, pairs with citrus |

### DRIED FLOWERS & TEA-SPECIFIC

| Ingredient | Primary Terpene(s) | Categories | Flavor Notes |
|-----------|-------------------|------------|-------------|
| Chamomile flowers | Bisabolol, Farnesene | 🍵💊 | Floral, apple-like, calming |
| Rose petals | Geraniol, Citronellol, Linalool | 🍹🍸🍵 | Deeply floral, romantic |
| Butterfly pea flower | Mild terpenes, Anthocyanins | 🍹🍸🍵 | Neutral flavor, pH color-change (blue→purple) |
| Hibiscus | Varied, organic acids | 🍹🍸🍵💊 | Tart, cranberry-like, deep red |
| Elderflower | Linalool, Nerol | 🍹🍸🍵 | Floral, honeyed, delicate |
| Jasmine flowers | Linalool, Indole, Jasmine lactone | 🍵🍹 | Intensely floral, heady |
| Chrysanthemum | Camphor, Borneol | 🍵 | Floral, slightly medicinal |

### LIQUIDS & BASES

| Ingredient | Primary Terpene(s) | Categories | Functional Notes |
|-----------|-------------------|------------|-----------------|
| Coconut water | Trace | 🍹🥤💊 | Electrolytes, light sweetness, tropical |
| Coconut milk/cream | Trace, fat carrier | 🥤🍵 | Fat for terpene absorption |
| Oat milk | None (neutral) | 🥤🍵 | Creamy body, neutral flavor canvas |
| Almond milk | Trace pinene | 🥤🍵 | Nutty, light body |
| Tonic water | Quinine (bitter) | 🍹 | Bitter backbone, pairs with botanical flavors |
| Soda water | None | 🍹🍸 | Clean carbonation |
| Kombucha | Varied (fermentation-derived) | 🍹💊 | Probiotics, tangy, light carbonation |
| Apple cider vinegar | Acetic acid | 💊 | Digestive, use 0.5-1 tbsp |
| Hop water | Myrcene, Humulene | 🍹 | Non-alcoholic, bitter-floral |
| Green tea (brewed) | Varied, L-Theanine | 🍵🍹 | Caffeinated, clean focus |
| Rooibos (brewed) | Varied, Aspalathin | 🍵 | Caffeine-free, sweet, earthy |
| Cold brew coffee | Varied, Caffeine | 🍹🥤 | Bitter, complex, energizing |

### SWEETENERS & MODIFIERS

| Ingredient | Terpene Relevance | Categories | Notes |
|-----------|-------------------|------------|-------|
| Raw honey | Preserves volatiles, varies by flower source | 🍹🍸🥤🍵💊 | Manuka (medicinal), wildflower (complex), tea tree honey (terpinolene) |
| Agave nectar | Neutral | 🍹🍸🥤💊 | Clean sweetness, tequila-adjacent |
| Maple syrup | Varied phenolics | 🍹🍸🥤🍵 | Warm, autumnal sweetness |
| Simple syrup (1:1) | Neutral base for infusions | 🍹🍸 | Infuse with herbs/spices for terpene delivery |
| Demerara syrup (1:1) | Molasses notes | 🍹🍸 | Richer body, brown sugar character |
| Oleo saccharum | Concentrated limonene | 🍹🍸 | Sugar-extracted citrus oils — purest limonene delivery |
| Shrub (drinking vinegar) | Varies by fruit/herb | 🍹🍸💊 | Sweet-sour-tangy, shelf-stable preservation |
| Bitters (aromatic) | Complex botanical terpenes | 🍹🍸 | Angostura, Peychaud's — concentrated terpene blends |

### FAT SOURCES (For Terpene Absorption)

| Ingredient | Categories | Notes |
|-----------|------------|-------|
| MCT oil | 🥤💊 | Tasteless, pure fat, maximum absorption efficiency |
| Avocado | 🥤 | Creamy body + healthy fats |
| Coconut cream | 🥤🍵 | Rich, tropical fat source |
| Nut butters (almond, cashew) | 🥤 | Protein + fat + texture |
| Hemp seed oil | 🥤💊 | Omega-3s, nutty flavor, cannabis-adjacent |
| Flax oil | 🥤💊 | Omega-3s, mild flavor |

---

## Part 7: Pink Rider — Full Recipe Set

### Input Recap

```
PINK RIDER
* Terpenes: Terpinolene 0.67%, β-Caryophyllene 0.30%, β-Ocimene 0.20%, Limonene 0.20%
* Aroma: Honeydew Melon, Key Lime, Hint of Spearmint
* Effects: Energized, Motivated, Creative
* Energy: HIGH
* Vibe: Creative Flow + Euphoric Lift
* Ratios: Terpinolene 49% | Caryophyllene 22% | Ocimene 15% | Limonene 15%
* Oil Bridge: Tea Tree → Black Pepper → Basil → Lemon → Peppermint → Geranium
```

### Terpene → Ingredient Decisions for Pink Rider

| Terpene (%) | Oil Bridge | Chosen Ingredients | Aroma Target Hit |
|-------------|-----------|-------------------|-----------------|
| Terpinolene (49%) | Tea Tree | Green apple, nutmeg, marjoram | Base freshness, herbal complexity |
| β-Caryophyllene (22%) | Black Pepper | Cracked black pepper, cinnamon | Warming spice backbone |
| β-Ocimene (15%) | Basil | Fresh basil, spearmint | Sweet-herbal lift, "hint of spearmint" |
| Limonene (15%) | Lemon | Key lime juice, lemon zest | "Key Lime" aroma note direct |
| — (aroma) | Geranium | Honeydew melon, cucumber | "Honeydew Melon" aroma note direct |

---

### 🍹 PINK RIDER MOCKTAIL — "Bright Momentum"

**Glass:** Highball or Collins, over ice
**Vibe:** Effervescent, bright, the first sip wakes you up

| Layer | Ingredient | Amount | Terpene Delivered |
|-------|-----------|--------|-------------------|
| **Base** | Fresh green apple juice | 3 oz | Terpinolene |
| **Body** | Sparkling water | 3 oz | — (HIGH energy = full carbonation) |
| **Accent 1** | Fresh key lime juice | 0.75 oz | Limonene |
| **Accent 2** | Honeydew melon puree | 1 oz | Aroma target (melon) |
| **Modifier** | Basil-black pepper syrup* | 0.5 oz | Ocimene + Caryophyllene |
| **Modifier** | 2 dashes lemon bitters | Dash | Limonene boost |
| **Garnish** | Spearmint sprig + thin apple slice + cracked pepper | — | Ocimene + Terpinolene + Caryophyllene |

*Basil-black pepper syrup: 1 cup sugar, 1 cup water, 10 basil leaves (bruised), 1 tsp cracked black pepper. Simmer 5 min, steep 20 min off heat, fine strain.*

**Method:** Add melon puree and lime juice to shaker with ice. Shake briefly. Strain into ice-filled highball. Add apple juice. Top with sparkling water. Float syrup. Garnish with spearmint sprig pressed against glass wall, thin apple fan, and 2-3 cracks of fresh pepper over top.

**Why it works:** Green apple juice carries the dominant terpinolene (49% of profile). Key lime hits the limonene and directly mirrors the "Key Lime" aroma note. Honeydew puree delivers the melon aroma target. Basil in the syrup carries ocimene. Black pepper in the syrup carries caryophyllene. Spearmint garnish delivers the "hint of spearmint" aroma note. The carbonation and tart-forward build match the HIGH energy classification.

---

### 🍸 PINK RIDER COCKTAIL — "Creative Spark"

**Glass:** Coupe, up (no ice)
**Style:** Gin Sour variant
**Vibe:** Crisp, layered, aromatic — the cocktail that makes you want to make things

| Layer | Ingredient | Amount | Terpene Delivered |
|-------|-----------|--------|-------------------|
| **Spirit** | London Dry Gin | 2 oz | Pinene + Limonene (juniper botanicals) |
| **Citrus** | Fresh key lime juice | 0.75 oz | Limonene |
| **Sweetener** | Green apple-marjoram syrup* | 0.75 oz | Terpinolene |
| **Modifier** | Aquafaba (chickpea water) | 0.5 oz | — (texture, foam) |
| **Modifier** | 3 cracks black pepper (into shaker) | — | Caryophyllene |
| **Modifier** | 2 basil leaves (muddled in shaker) | — | Ocimene |
| **Garnish** | Expressed lime zest + basil leaf + fresh pepper crack | — | Limonene + Ocimene + Caryophyllene |

*Green apple-marjoram syrup: 1 cup fresh green apple juice, 1 cup sugar, 4 sprigs fresh marjoram. Combine cold, stir to dissolve, steep 2 hours, strain.*

**Method:** Muddle basil leaves gently with pepper in shaker. Add gin, lime, syrup, aquafaba. Dry shake (no ice) 15 seconds for foam. Add ice, shake hard 12 seconds. Double-strain into chilled coupe. Express lime zest over surface, discard. Float a single basil leaf. Finish with one crack of fresh pepper from above.

**Why it works:** Gin's juniper and citrus botanicals provide a natural terpene platform (pinene + limonene). The apple-marjoram syrup delivers terpinolene as the dominant flavor note. Key lime carries limonene and mirrors the aroma target. Muddled basil brings ocimene. Cracked pepper delivers caryophyllene. The "up" serve and foam create an elevated, creative-energy presentation. This is a cocktail that feels like making something.

---

### 🥤 PINK RIDER JUICE — "Morning Momentum"

**Format:** Cold-pressed style, 14 oz
**Vibe:** Clean energy, first-thing clarity, the green juice that actually tastes good

| Layer | Ingredient | Amount | Terpene Delivered |
|-------|-----------|--------|-------------------|
| **Primary** | Green apple (whole, juiced) | 2 medium | Terpinolene, Farnesene |
| **Primary** | Honeydew melon (cubed, juiced) | 1 cup | Aroma target (melon) |
| **Secondary** | Cucumber | 1/2 medium | Cooling, volume, melon-bridge |
| **Citrus** | Key lime (juiced) | 1 whole | Limonene |
| **Herb** | Fresh basil (6-8 leaves) | Handful | Ocimene |
| **Herb** | Fresh spearmint (4-5 leaves) | Small handful | Aroma target (spearmint hint) |
| **Functional** | Fresh ginger (1/2 inch knob) | Small piece | Warming, digestive, farnesene |
| **Terpene spike** | Pinch of cracked black pepper | Pinch | Caryophyllene |

**Method:** Run through cold-press juicer in order: cucumber, honeydew, apple, basil, mint, ginger, lime. Stir in black pepper. Serve immediately over ice or chilled.

**Why it works:** Apple + honeydew form the terpinolene-dominant base (49%). Basil carries ocimene (15%). Key lime carries limonene (15%). Black pepper carries caryophyllene (22%) — even a pinch delivers meaningful CB2 receptor activation. Spearmint and cucumber reinforce the aroma targets. The juice format matches HIGH energy classification — light, clean, morning-appropriate.

---

### 🍵 PINK RIDER HERBAL TEA — "The Spark Steep"

**Format:** Hot or iced, 10 oz
**Vibe:** Afternoon creative fuel — the tea you brew before opening a blank page

| Layer | Amount per cup | Ingredient | Terpene Delivered |
|-------|---------------|-----------|-------------------|
| **Base Tea** | 1 tsp | Green tea (sencha or dragonwell) | L-Theanine + caffeine (focus without jitter) |
| **Primary Herb** | 1 tsp | Dried marjoram | Terpinolene |
| **Secondary Herb** | 0.5 tsp | Dried spearmint | Ocimene + menthol cooling |
| **Accent** | 0.25 tsp | Cracked black peppercorns (3-4) | Caryophyllene |
| **Accent** | 2 strips | Dried key lime zest (or regular lime) | Limonene |
| **Accent** | 0.25 tsp | Freshly grated nutmeg | Terpinolene boost |
| **Sweetener** | To taste | Tea tree honey or raw honey | Terpinolene carrier |

**Method (hot):** Combine marjoram, spearmint, peppercorns, lime zest, and nutmeg in a tea infuser or French press. Add green tea. Pour 175°F water (not boiling — protects volatile terpenes). Steep 3 minutes. Strain. Add honey to taste.

**Method (iced):** Brew hot at double concentration using above recipe. Steep 3 minutes. Strain into a glass filled with ice. Add 2 oz cold water. Stir. Garnish with fresh spearmint sprig.

**Why it works:** Marjoram is the primary terpinolene-carrier herb — it's the tea tree equivalent for beverages. Green tea provides clean energy matching the HIGH energy tier. Spearmint delivers the "hint of spearmint" directly while providing ocimene. Cracked peppercorns steep gently to release caryophyllene. Lime zest delivers limonene. The 175°F water temperature and 3-minute steep preserve volatile terpenes while extracting flavor.

**Batch blend (makes ~10 cups):**
- 3 tbsp dried marjoram
- 3 tbsp green tea
- 1.5 tbsp dried spearmint
- 2 tsp dried lime zest
- 1 tsp cracked black peppercorns
- 1 tsp freshly grated nutmeg

Store in airtight jar away from light. Keeps 2-3 months.

---

### 💊 PINK RIDER WELLNESS SHOT — "Ignition"

**Format:** 2.5 oz, room temp
**Vibe:** Pre-workout, pre-meeting, pre-anything — concentrated creative rocket fuel

| Layer | Ingredient | Amount | Terpene Delivered |
|-------|-----------|--------|-------------------|
| **Active Base** | Cold-pressed green apple juice | 1.5 oz | Terpinolene |
| **Citrus Kick** | Fresh key lime juice | 0.5 oz | Limonene |
| **Functional** | Fresh ginger (grated/pressed) | 0.25 oz | Warming, anti-inflammatory |
| **Terpene Spike** | 4-5 fresh basil leaves (muddled) | — | Ocimene |
| **Terpene Spike** | Pinch freshly cracked black pepper | Pinch | Caryophyllene (CB2 activation) |
| **Terpene Spike** | Pinch freshly grated nutmeg | Pinch | Terpinolene boost |
| **Absorption** | 0.5 tsp MCT oil | 0.5 tsp | Fat-soluble terpene uptake |
| **Sweetener** | 0.5 tsp tea tree honey | 0.5 tsp | Terpinolene + palatability |

**Method:** Muddle basil leaves in a small glass. Add apple juice, lime juice, and ginger. Stir in pepper and nutmeg. Add MCT oil and honey. Stir vigorously (or shake in a small jar). Shoot.

**Why it works:** Maximum terpene concentration in minimum volume. Green apple delivers the terpinolene base. Key lime delivers limonene. Basil delivers ocimene. Black pepper delivers caryophyllene plus piperine for enhanced absorption. MCT oil ensures fat-soluble terpene molecules cross cell membranes efficiently. Ginger adds thermogenic warmth and anti-inflammatory support. Every ingredient has a job.

---

## Part 8: Quick Reference — Recipe Generation Cheat Sheet

### Step-by-Step Checklist

```
□ 1. PARSE: Extract terpenes, aroma, effects from strain card
□ 2. RATIO: Calculate terpene proportions (each / total named)
□ 3. ENERGY: Classify HIGH / MEDIUM / LOW from effects
□ 4. MAP: Match each terpene to ingredients (Part 3)
□ 5. AROMA: Identify literal aroma-target ingredients
     (e.g., "Honeydew Melon" → honeydew melon in recipe)
□ 6. OIL BRIDGE: Use the essential oil recipe as translation key
     (each oil name → a food/herb family)
□ 7. ARCHITECTURE: Fill category template (Part 4)
     - Dominant terpene → Base ingredient
     - Secondary terpenes → Accents
     - Aroma targets → Modifiers/garnishes
□ 8. VIBE TUNE: Apply effect-based adjustments (Part 5)
□ 9. NAME: Name the drink (strain vibe, not strain name)
□ 10. RATIONALE: Write "Why it works" connecting each ingredient
      back to a terpene or aroma target
```

### Essential Oil → Food/Herb Translation Key

This is the fastest shortcut. Every strain card already includes an essential oil recipe. These oils map directly to food ingredients:

| Essential Oil | → Food/Herb Equivalent | Primary Terpene |
|--------------|----------------------|-----------------|
| Tea Tree | Green apple, marjoram, nutmeg | Terpinolene |
| Black Pepper | Cracked black pepper, cinnamon | β-Caryophyllene |
| Basil | Fresh basil, Thai basil | β-Ocimene |
| Lemon | Lemon juice/zest, key lime | Limonene |
| Sweet Orange | Orange juice, blood orange | Limonene |
| Lemongrass | Lemongrass stalks, lemongrass paste | Myrcene |
| Lavender | Culinary lavender, lavender syrup | Linalool |
| Chamomile | Chamomile flowers, chamomile tea | α-Bisabolol |
| Rosemary | Fresh rosemary, rosemary syrup | α-Pinene |
| Pine | Pine nuts, Douglas fir tips | α-Pinene |
| Peppermint | Fresh mint, peppermint, spearmint | Menthol + Ocimene |
| Geranium | Rose water, rose petals, honeydew | Geraniol |
| Frankincense | Cardamom (closest food analog) | α-Pinene |
| Ylang Ylang | Vanilla, jasmine, ripe banana | Linalool + Farnesene |
| Eucalyptus | Eucalyptus honey, cardamom | Cineole + Pinene |
| Ginger Oil | Fresh ginger root | Humulene + Farnesene |
| Sage | Fresh sage leaves, dried sage | Humulene + Pinene |
| Clove | Whole cloves, ground clove | Caryophyllene + Eugenol |
| Neroli | Orange blossom water | Linalool + Limonene |
| Cardamom | Green cardamom pods | Pinene + Limonene |
| Myrrh | Cinnamon, clove (warm-resinous bridge) | Sesquiterpenes |
| Sandalwood | Vanilla, coconut (warm-creamy bridge) | Sesquiterpenes |

### Proportional Shorthand

When a strain card says the recipe is **14 drops Tea Tree (35%), 8 drops Black Pepper (20%), 6 drops Basil (15%), 6 drops Lemon (15%), 4 drops Peppermint (10%), 2 drops Geranium (5%)**, translate directly:

- **35% of recipe flavor** = Tea Tree family (green apple, marjoram, nutmeg)
- **20% of recipe flavor** = Black Pepper family (cracked pepper, cinnamon)
- **15% of recipe flavor** = Basil family (fresh basil, Thai basil)
- **15% of recipe flavor** = Lemon family (key lime, citrus)
- **10% of recipe flavor** = Peppermint family (spearmint, mint)
- **5% of recipe flavor** = Geranium family (honeydew, rose water)

These percentages don't have to be exact volumes — they guide which flavors should be most prominent (first thing you taste) vs. supporting (background notes) vs. whispers (the thing you notice on the third sip).

---

## Appendix: Terpene Bioavailability Notes

### Why Fat Matters in Beverages

Terpenes are lipophilic (fat-soluble) molecules that cross cell membranes more efficiently when delivered with lipids. This is why:

- **Smoothies > juices** for terpene delivery (fat from avocado, nut butter, MCT)
- **Wellness shots with MCT oil** outperform those without
- **Coconut cream-based mocktails** deliver more terpene effect than water-based
- **Oat milk lattes** (fat content) deliver tea terpenes better than black tea

### Temperature and Terpene Preservation

Terpenes are volatile — heat destroys them. The order of terpene preservation:

1. **Cold-pressed juice** (maximum preservation)
2. **Room temperature** (minimal loss)
3. **Warm steep at 175°F** (moderate loss, acceptable for tea)
4. **Hot steep at 200°F+** (significant loss — offset by using more herb)
5. **Boiling/simmering** (major loss — never boil terpene-focused blends)

For syrups: simmer water + sugar first, then remove from heat and steep herbs/spices in the cooling liquid.

### The Entourage Effect in Food

When you combine multiple terpene-carrying ingredients, they interact synergistically — just like in cannabis. A drink with basil (ocimene + linalool + caryophyllene) + lemon (limonene) + black pepper (caryophyllene) + apple (terpinolene) creates a multi-terpene ensemble that's more than the sum of its parts.

This is the food version of the entourage effect: each terpene activates different receptors (CB2 for caryophyllene, GABA-A for linalool, serotonin for limonene), creating a layered physiological response that mirrors the strain's effect profile.

---

*Framework v1.0 — Built for the Solful Sessions terpene pairing system*
*Designed to accept any strain card as input and produce recipes across 5 beverage categories*

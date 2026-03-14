# Solful Recipe Generator - Feature Walkthrough

## App Architecture Overview

### State Management
```
myPantry: ["lemon", "lime", "gin", ...] (localStorage persisted)
myHumidor: ["Mike's Bomba", "Dream Queen", ...] (localStorage persisted)
activeTab: "pantry" | "humidor" | "recipes" | "shopping"
selectedRecipe: { strain, category, recipe, score } | null
filterCategory: "all" | "mocktail" | "cocktail" | "juice" | "tea" | "shot"
searchPantry: string (live search filter)
```

### Component Structure

#### Tab 1: MY PANTRY (renderPantryTab)
Features:
- Real-time search box filtering 113 ingredients
- Categories: fruit, vegetable, herb, spice, tea, mixer, dairy, sweetener, garnish
- Each ingredient shows:
  - Checkbox (checked = have it)
  - Name
  - Terpene badges (3-color dots showing dominant terpenes)
- Quick-add buttons:
  - "Basic Citrus" → adds lemon, lime, orange
  - "Bar Essentials" → adds lime juice, lemon juice, simple syrup
  - "Herb Garden" → adds basil, mint, rosemary
- Live counter: "42 of 113 ingredients in your pantry"

#### Tab 2: MY HUMIDOR (renderHumidorTab)
Features:
- Grid of 24 strain cards
- Each card shows:
  - Name & Farm
  - Dominant Terpene (color-coded)
  - Energy Tier (LOW/MEDIUM/HIGH)
  - Effects list
  - Horizontal terpene ratio bar (stacked colored segments)
- Checkbox to mark ownership
- Hover effect on selection
- Live counter: "6 of 24 strains in your humidor"

#### Tab 3: RECIPES (renderRecipesTab) - Core Intelligence
Features:

**Matching Algorithm:**
```javascript
For each strain in myHumidor:
  For each recipe category (mocktail, cocktail, juice, tea, shot):
    For each ingredient in recipe:
      Try to match against myPantry using fuzzy search
    score = (matched / total) * 100
    Include if score >= 50%
```

**Recipe Display:**
- Sorted by match score (highest first)
- Color-coded score badges:
  - 80%+: Sage green (#7C9082) "Make it now!"
  - 50-79%: Gold (#C8A97E) "Close, few items needed"
  - <50%: Muted gray (filtered out)
- Each recipe card shows:
  - Strain name (small label)
  - Recipe name & tagline
  - Match score badge
  - Count of missing items
  
**Recipe Details Modal:**
- Click any recipe to expand
- Shows:
  - Strain & recipe header with close button
  - Match score percentage
  - Full ingredient list with ✓ (have) / ✗ (need) indicators
  - Green highlight for matched ingredients
  - Red highlight for missing ingredients
  - Step-by-step method
  - Cooking/mixing instructions

**Category Filter:**
- Buttons: All, Mocktail, Cocktail, Juice, Tea, Shot
- Filters which recipe types to show
- Resets on tab switch

#### Tab 4: SHOPPING LIST (renderShoppingTab)
Features:

**Impact Ranking Algorithm:**
```javascript
recipeImpact = {}
For each matchable recipe (50%+ score):
  For each missing ingredient:
    Find matching library item
    Increment recipeImpact[item.id]

Sort by recipeImpact count (descending)
Take top 10 items
```

**Shopping Display:**
- Ranked list of top 10 missing ingredients
- Each item shows:
  - Name
  - "Unlocks X recipes"
  - Buy button (clickable UI element)
- Copy to Clipboard button
  - Copies all item names as comma-separated list
  - Shows alert confirmation

**Smart Recommendations:**
- Prioritizes ingredients that unlock the most recipes
- Example: "Buy Vodka → unlocks 5 more recipes"
- Helps maximize recipe coverage with minimal shopping

## Key Algorithms

### 1. Ingredient Matching (fuzzy search)
```javascript
function matchIngredient(ingredientStr, pantryIds, library) {
  const str = ingredientStr.toLowerCase();
  
  // Check all pantry items' search terms
  for (const id of pantryIds) {
    const item = library.find(i => i.id === id);
    for (const term of item.searchTerms) {
      if (str.includes(term.toLowerCase())) {
        return { matched: true, item };
      }
    }
  }
  
  // Check spirit guide
  for (const spirit of library.spiritGuide) {
    for (const term of spirit.searchTerms) {
      if (str.includes(term.toLowerCase())) {
        return { matched: true, item: spirit };
      }
    }
  }
  
  return { matched: false };
}
```

Example matches:
- "2.5 oz fresh pineapple juice" → matches "pineapple-juice"
- "1 oz bourbon" → matches "bourbon" (from spiritGuide)
- "fresh mint leaf" → matches "spearmint" (searchTerms: ["mint", "spearmint", ...])

### 2. Recipe Score Calculation
```javascript
function calculateMatchScore(recipeIngredients, pantryIds, library) {
  if (!recipeIngredients.length) return 0;
  let matched = 0;
  
  for (const ingredient of recipeIngredients) {
    if (matchIngredient(ingredient, pantryIds, library).matched) {
      matched++;
    }
  }
  
  return Math.round((matched / recipeIngredients.length) * 100);
}
```

### 3. Shopping Impact Aggregation
```javascript
// For each recipe that's matchable (50%+):
For each missing ingredient:
  Find it in the library
  Increment its impact counter

Results show which ingredients unlock the most recipes
```

## Terpene Colors

```
β-Caryophyllene: #E07B4C (spicy orange)
Limonene: #F4D03F (bright yellow)
Myrcene: #52B788 (forest green)
α-Humulene: #8B6914 (earthy brown)
Linalool: #9B7BA8 (floral purple)
α-Bisabolol: #E8B4D0 (soft pink)
α-Pinene: #2D6A4F (deep forest)
β-Ocimene: #48BFE3 (sky blue)
Terpinolene: #FF6B6B (coral red)
trans-β-Farnesene: #95D5B2 (mint green)
```

## Data Embedded

### LIBRARY
- 10 terpene profiles (flavor, aroma, spirit/mixer pairings)
- 17 spirits (gin, vodka, rum, whiskey, tequila, mezcal, cognac, pisco, sake, cachaça, St-Germain, Cointreau, Campari, Limoncello, Amaro, dry vermouth, sweet vermouth)
- 113 ingredients across 9 categories
  - Each with: id, name, category, terpenes, flavorNotes, searchTerms

### RECIPE_DATA
- 24 cannabis strains
- Each with:
  - 24 fields including id, name, farm, intent, effects, aroma
  - Energy tier: LOW, MEDIUM, HIGH
  - Terpene profile with intensity ratios
  - Up to 5 recipe categories (mocktail, cocktail, juice, tea, shot)
  - Each recipe contains name, tagline, glass, volume, method[], ingredients[]

## Design Highlights

### Premium Dark Theme
- Pure black background (#0C0C0C)
- Deep card backgrounds (#161412)
- Gold accent color (#C8A97E)
- Sage green for "match" state (#7C9082)
- Wine red for "missing" state (#8B5E5E)

### Responsive Layout
- CSS Grid with minmax for auto-wrapping
- Mobile-friendly ingredient cards
- Fixed sticky header for quick navigation
- Modal overlays for recipe details

### User Experience
- Live search with instant filtering
- Checkbox toggles with visual feedback
- Color-coded match scores
- One-click copy for shopping list
- Auto-save to localStorage (no data loss)
- Smooth transitions and hover effects

## Technical Stack

- React 18+ (hooks only)
- Inline styles (no Tailwind/CSS files needed)
- localStorage for persistence
- Pure JavaScript (no dependencies)
- Single 700-line JSX file
- Responsive CSS Grid layout


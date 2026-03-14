# Solful Recipe Generator

A premium React JSX application for managing a personal pantry, cannabis humidor, and intelligent recipe matching engine with terpene-based recommendations.

## Features

### 🥃 Tab 1: My Pantry
- Search and filter through 113+ ingredients
- Checkbox system to track what you have at home
- Ingredients grouped by category (fruits, herbs, spices, mixers, etc.)
- Terpene profile badges for each ingredient
- Quick-add buttons for common ingredient groups (Basic Citrus, Bar Essentials, Herb Garden)
- Live count of pantry contents

### 🔥 Tab 2: My Humidor
- Browse all 24 cannabis strains in the library
- Visual cards showing strain info: name, farm, dominant terpene, energy tier, effects
- Horizontal terpene ratio bars for quick visualization
- Checkbox to mark strains you own
- Live count of humidor contents

### 🎯 Tab 3: Recipes (Smart Matching Engine)
- Intelligent fuzzy matching algorithm matches recipe ingredients to your pantry
- **Match Score Calculation**: (matched ingredients / total ingredients) × 100
- Color-coded match scores:
  - 80%+: Green (sage) - "Make it now!"
  - 50-79%: Gold - "Close, few items needed"
  - <50%: Muted - "Not yet matchable"
- For each strain in your humidor, shows all 5 recipe categories
- Category filter (mocktail, cocktail, juice, tea, shot)
- Expandable recipe cards with:
  - Recipe name and tagline
  - Ingredient list with ✓ (have) / ✗ (need) indicators
  - Terpene map section
  - Step-by-step method
  - Missing ingredients highlighted

### 🛒 Tab 4: Shopping List
- Aggregates all missing ingredients across matchable recipes (50%+ match)
- Smart ranking: "Buy X → unlocks 5 more recipes"
- Shows top 10 ingredients by recipe impact
- "Copy to clipboard" button for easy sharing
- Organized by recipe impact (most valuable purchases first)

## Data Structure

### LIBRARY (45KB minified)
- **Terpenes**: 10 major cannabis terpenes with flavor, aroma, spirit pairings, mixer pairings
- **spiritGuide**: 17 spirits (gin, vodka, rum, whiskey, tequila, mezcal, cognac, etc.)
- **ingredients**: 113 items organized by category
  - Fruits: Citrus, tropical, berries
  - Vegetables: Cucumber, ginger, carrot, celery
  - Herbs: Basil, mint, rosemary, lavender, etc.
  - Spices: Pepper, cinnamon, cloves, cardamom, etc.
  - Teas: Chamomile, lavender, green, jasmine, peppermint, rooibos
  - Mixers: Juices, sodas, coconut water, etc.
  - Dairy: Milks, creams, ice creams
  - Sweeteners: Syrups, honey, agave, special infusions
  - Garnishes: Citrus twists, herbs, edible flowers, rims

Each ingredient has:
- id, name, category
- terpenes array (with intensity levels)
- flavorNotes, bestUse, searchTerms (for matching)

### RECIPE_DATA (24 strains, 137KB minified)
Each strain contains:
- id, name, farm
- intent, effects, aroma
- energyTier (LOW/MEDIUM/HIGH)
- dominantTerpene, terpenes, terpeneRatios
- categories (energyTier-based)
- badge (optional)
- **recipes** object with up to 5 categories:
  - mocktail, cocktail, juice, tea, shot
  - Each recipe has: name, tagline, glass, volume, method[], temp, ingredients[]

## Matching Algorithm

```javascript
function matchIngredient(ingredientStr, pantryIds, library) {
  // Fuzzy matches recipe ingredient strings against:
  // 1. Pantry ingredient searchTerms
  // 2. Spirit guide searchTerms
  return { matched: boolean, pantryItem: object }
}
```

## Design System

**Premium dark theme** matching VibeCurator:
- bg: `#0C0C0C` (pure black)
- bgCard: `#161412`
- bgCardHover: `#1E1A16`
- border: `#2A2622`
- text: `#F5F0E8` (off-white)
- gold: `#C8A97E` (accent)
- sage: `#7C9082` (positive/matched)
- wine: `#8B5E5E` (negative/missing)

## State Management

- **useState** for all state management
- **useEffect** with localStorage for persistence
- **useMemo** for expensive calculations (grouped ingredients, recipe filtering)
- **useCallback** for optimized functions

### Persistent State
- `myPantry`: String array of ingredient IDs (localStorage: 'solful-pantry')
- `myHumidor`: String array of strain names (localStorage: 'solful-humidor')
- `activeTab`: Current tab ('pantry' | 'humidor' | 'recipes' | 'shopping')
- `filterCategory`: Recipe category filter
- `selectedRecipe`: Currently viewing recipe details

## Technical Details

- **Single file**: All code in SolfulRecipeGenerator.jsx
- **No external dependencies**: React built-in hooks only
- **Inline styles**: Pure CSS for reliability
- **Responsive design**: CSS Grid with minmax for mobile
- **Sticky header**: Tab bar stays visible while scrolling
- **Modal dialogs**: Recipe details in fixed overlay

## File Size

- Total: ~208KB (including embedded data)
- Library data: ~45KB (minified JSON)
- Recipe data: ~137KB (minified JSON)
- App code: ~26KB (minified JSX)

## Usage

```jsx
import SolfulRecipeGenerator from './SolfulRecipeGenerator.jsx';

export default App = () => <SolfulRecipeGenerator />;
```

The app auto-persists your pantry and humidor selections to browser localStorage.

---

**A terpene-aware recipe engine for the modern mixologist.**

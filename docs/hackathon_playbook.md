# SFO → Dubai Hackathon Playbook
## The Vibe Curator — Unified App Build

**Flight time:** ~16 hours  
**Goal:** Working local prototype of a unified Vibe Curator app  
**Tools:** Claude Code + Cursor  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + TypeScript  

---

## THE PROBLEM YOU'RE SOLVING

You have 5-6 fragmented React artifacts that each do one thing:
- A Solful pitch app (Story/Pitch/Science/Recipes)
- A 12-layer ecosystem explorer
- A beverage recipe book (24 strains × 5 categories)
- Spotify prompt generators
- Essential oil blend explorers
- Various one-offs

None of them share data, state, routing, or design language. The Cowork prompt doc architected the vision but was never built. This hackathon consolidates everything into a single app that you can demo live to Eli and Noah with a URL.

---

## PRE-FLIGHT PREP (Do Before Boarding)

This is the most important section. Plane wifi is unreliable — you need everything local before takeoff.

### 1. Environment Setup (30 min)
```bash
# Create the project
npx create-next-app@latest vibe-curator --typescript --tailwind --app --src-dir
cd vibe-curator

# Install dependencies you'll need
npm install framer-motion lucide-react
npm install -D @types/node

# Initialize git
git init && git add . && git commit -m "initial scaffold"

# Open in Cursor
cursor .
```

### 2. Download Fonts (5 min)
Download these from Google Fonts for offline use:
- **Playfair Display** (display/headers) — the premium editorial feel
- **DM Sans** (body/UI) — clean, modern readability
- Place `.woff2` files in `public/fonts/` and set up `@font-face` in globals.css

### 3. Seed Data File (This is the big one — do in Claude chat)
Ask me to generate a single `src/data/strains.ts` file that consolidates ALL your data:
- 24 strains with full terpene profiles, effects, aromas, farms, energy tiers
- 24 essential oil recipes (drops, oils, rationales)  
- 120 beverage recipes (mocktails, cocktails, juices, teas, shots)
- 8 vibe categories with strain assignments
- Terpene color map and metadata
- Spotify prompt text per strain

**This is the single most valuable pre-flight task.** With this file ready, every sprint is just building UI on top of it.

### 4. Pre-cache Claude Code Context
Create a `CLAUDE.md` file in the project root:
```markdown
# Vibe Curator

Cannabis aromatherapy experience platform for Solful Dispensary.
Next.js 14, App Router, TypeScript, Tailwind CSS, Framer Motion.

## Design Language
- Dark theme: backgrounds #0C0C0C to #1A1510
- Accent gold: #8B7355, warm white text: #F5EDE0
- Premium sommelier aesthetic, NOT stoner culture
- Georgia/Playfair for editorial, DM Sans for UI
- Generous whitespace, subtle animations, muted earth tones

## Data
All strain/recipe data lives in src/data/strains.ts
24 strains, 24 EO recipes, 120 beverage recipes, 8 vibe categories

## Architecture
src/app/(main)/          — main app layout with bottom nav
src/app/(main)/page.tsx  — home/intent selector ("How do you want to feel?")
src/app/(main)/strains/  — strain library with filters
src/app/(main)/strains/[id]/ — strain detail (terpenes, EO recipe, beverages, Spotify)
src/app/(main)/humidor/  — "My Humidor" (user's saved strains)
src/app/(main)/story/    — the origin story
src/app/(main)/science/  — the science page
src/components/          — shared components
src/data/                — all data files
src/lib/                 — utils, types, constants
```

### 5. Offline Resources
- Screenshot the Solful website color palette/branding for reference
- Save the existing React artifact code as reference files in a `/reference` folder
- Have the 23_recipes.pdf and Solful_Sessions_Terpene_Beverage_Recipe_Book.pdf accessible locally

---

## SPRINT PLAN

### Sprint 0: Data Assembly (Hours 0–1.5)
**Tool: Claude chat (this project)**

This is the foundation everything builds on. If the data is clean, everything else flows.

**Deliverable:** A single TypeScript file (`src/data/strains.ts`) exporting:
```typescript
export interface Strain {
  id: string;              // "mikes-bomba"
  name: string;            // "Mike's Bomba"
  farm: string;
  region: string;
  energyTier: "HIGH" | "MEDIUM" | "LOW";
  intent: string;          // "Grounded calm with clear mental edges"
  effects: string[];
  aroma: string[];
  totalTerpenes: number;
  dominantTerpene: string;
  terpeneProfile: { name: string; percentage: number; ratio: number }[];
  vibeCategories: string[];
  
  // Essential Oil Recipe
  eoRecipe: {
    oils: { name: string; drops: number; terpene: string }[];
    rationale: string;
  };
  
  // Beverage Recipes (5 per strain)
  beverages: {
    mocktail: BeverageRecipe;
    cocktail: BeverageRecipe;
    juice: BeverageRecipe;
    tea: BeverageRecipe;
    shot: BeverageRecipe;
  };
  
  // Spotify
  spotifyPrompt: string;
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
  // Cocktails only:
  spirit?: string;
  abv?: string;
  // Tea only:
  steepTemp?: string;
  steepTime?: string;
  caffeine?: string;
}
```

Also export:
```typescript
export const VIBE_CATEGORIES: VibeCategory[]
export const TERPENE_COLORS: Record<string, string>
export const TERPENE_INFO: Record<string, TerpeneInfo>
```

**Action:** Ask me in this chat to generate this complete file from your project files. I have all the data.

---

### Sprint 1: Scaffold + Layout + Navigation (Hours 1.5–3)
**Tool: Claude Code**

Build the app skeleton. This should be boring and fast — just structure.

**Tasks:**
1. App layout with mobile-first bottom navigation bar
2. Route structure matching the architecture in CLAUDE.md
3. Global styles: dark theme, typography, color variables in Tailwind config
4. Shared components: `PageHeader`, `BackButton`, `StrainCard`, `TerpeneBar`
5. Basic page shells that render with placeholder content

**Claude Code prompt:**
> Read CLAUDE.md. Scaffold the Next.js app with the route structure, layout with bottom navigation (Home, Strains, Humidor, Story, Science), global dark theme styling with the color palette specified, and create placeholder pages for each route. Use Framer Motion for page transitions. Make the bottom nav fixed, with icons from lucide-react.

**Checkpoint:** You should be able to navigate between all 6 sections with smooth transitions and consistent styling. No real content yet, just the bones.

---

### Sprint 2: Home Page — Intent Selector (Hours 3–4.5)
**Tool: Claude Code + Cursor for fine-tuning**

This is the app's front door. "How do you want to feel?" → vibe tiles → matching strains.

**Tasks:**
1. Hero section with "The Vibe Curator" branding
2. 8 vibe category tiles in a grid (Grounded & Present, Creative Flow, Deep Rest, etc.)
3. Each tile shows: name, 1-line description, color accent, strain count
4. Tapping a vibe → filtered strain list showing matching strains
5. Subtle ambient animation on the hero (gradient shift, particle effect, or similar)

**Design direction:** Think wine menu at a Michelin restaurant. Dark, quiet, intentional. The tiles should feel like choosing a mood, not browsing a catalog.

**Claude Code prompt:**
> Build the home page at src/app/(main)/page.tsx. Import VIBE_CATEGORIES and STRAINS from the data file. Create a hero section with "The Vibe Curator" as h1, subtitle "How do you want to feel?", then a grid of 8 vibe category cards. Each card shows the vibe name, short description, colored accent bar (using the vibe's color), and number of matching strains. Clicking a card filters to show matching strain cards below. Use Framer Motion for card entrance animations (staggered). Premium dark aesthetic per CLAUDE.md.

---

### Sprint 3: Strain Library + Filters (Hours 4.5–6.5)
**Tool: Claude Code**

The browse-everything view. This is where budtenders and power users live.

**Tasks:**
1. `/strains` page with full strain grid
2. Filter bar: by vibe, energy tier, farm, dominant terpene
3. Search input (name, farm, effect keywords)
4. Strain cards showing: name, farm, energy badge, dominant terpene color bar, 1-line intent
5. Sort options: alphabetical, total terpene %, energy tier

**Claude Code prompt:**
> Build the strain library at src/app/(main)/strains/page.tsx. Show all 24 strains as cards in a responsive grid. Add a sticky filter bar at top with: multi-select vibe filter (pills), energy tier toggle (HIGH/MEDIUM/LOW), search input. Strain cards show name, farm, region, energy tier badge, a small terpene profile bar (colored segments), and the intent text. Cards link to /strains/[id]. Animate filter transitions with Framer Motion layoutId.

---

### Sprint 4: Strain Detail — The Experience Page (Hours 6.5–9.5)
**Tool: Claude Code + Cursor**

**This is the money page.** When someone picks a strain, they get the full curated experience. This is what no one else has.

**Tasks:**
1. `/strains/[id]` dynamic route
2. Hero section: strain name, farm, region, intent statement
3. **Terpene Profile panel** — visual bar chart of terpene ratios with color coding
4. **Essential Oil Recipe panel** — oils, drop counts, visual drops indicator, rationale
5. **Beverages section** — 5 tabs (Mocktail, Cocktail, Juice, Tea, Shot), each showing:
   - Recipe name + tagline
   - Ingredients list with amounts
   - Method steps
   - Terpene map (which terpene comes from which ingredient)
6. **Spotify Prompt section** — the prompt text with a "Copy" button
7. **Amplification Protocol** — the 30-min pre-load ritual steps

**Design direction:** This page should feel like opening a sommelier's private notebook for a specific wine. Sections flow vertically. The terpene profile visualization should be the visual anchor — a beautiful, colored breakdown that immediately communicates the strain's character.

**Claude Code prompt:**
> Build the strain detail page at src/app/(main)/strains/[id]/page.tsx. Use generateStaticParams to pre-render all 24 strains. Page sections in order: (1) Hero with strain name, farm, region, energy badge, intent text, effect tags, aroma notes. (2) Terpene Profile as a horizontal stacked bar with percentages, colored per TERPENE_COLORS. (3) Essential Oil Recipe as a card showing each oil with drop count (visual dot indicators), the terpene it delivers, and the rationale paragraph. (4) Beverage Recipes with 5 tabs — each tab shows recipe name, tagline, ingredients, method, and a small terpene source map. (5) Spotify prompt in a styled code block with copy button. (6) Amplification Protocol — "30 minutes before: diffuse matching blend. During: continue diffusion. After: ambient maintenance." Use Framer Motion for section reveals on scroll.

**This sprint will take the longest.** Budget 3 hours. The beverage recipe tabs alone have significant data to render.

---

### Sprint 5: My Humidor (Hours 9.5–11)
**Tool: Claude Code**

Personal strain collection + session mode.

**Tasks:**
1. `/humidor` page
2. "Add to Humidor" button on each strain card and detail page
3. Humidor view shows user's saved strains as a collection
4. **Session mode:** pick a strain from your humidor → see a simplified experience card:
   - What to diffuse (EO recipe summary)
   - What to drink (random beverage suggestion with "shuffle" option)
   - What to listen to (Spotify prompt)
   - The ritual steps
5. LocalStorage persistence (or just React state for prototype)

**Note:** For the prototype, in-memory state is fine. The point is demonstrating the UX flow, not production persistence.

**Claude Code prompt:**
> Build the Humidor at src/app/(main)/humidor/page.tsx. Create a HumidorContext provider that stores an array of strain IDs (use React state for now). Add "Add to Humidor" / "In Humidor" toggle buttons to StrainCard and strain detail pages. Humidor page shows saved strains as cards. Add a "Start Session" button on each humidor strain that opens a modal/drawer showing: (1) tonight's strain info, (2) EO recipe to diffuse, (3) a randomly selected beverage with shuffle button, (4) the Spotify prompt, (5) amplification protocol timeline. Style the session view as a focused, ritual-like experience with larger text and breathing room.

---

### Sprint 6: Story + Science Pages (Hours 11–13)
**Tool: Cursor (content-heavy, good for multi-file edits)**

Port the narrative content from your existing artifacts.

**Tasks:**
1. `/story` — Your personal narrative (The Puzzle → Montreal → The Accidental Experiment → The Intentional Experiment → The Offering)
2. `/science` — The research foundation (Core Thesis → Three Pathways → Key Studies → The Bioavailability Gap → Pre-Loading Solution)
3. Both pages: editorial long-form layout, pull quotes, section breaks
4. Science page: inline citations to your published/submitted articles

**Content source:** Pull from the `Terpenes_With_a_Twist_of_Aromatherapy__Full_Version.pdf` which has the full narrative and science sections. You already have this content — it's a layout job, not a writing job.

**Cursor prompt:**
> Create two long-form content pages. Story page (src/app/(main)/story/page.tsx): editorial layout with the origin narrative. Sections: The Puzzle, The Accidental Experiment, The Intentional Experiment, The Discovery, The Offering. Use pull quotes, section dividers, and Playfair Display for section headers. Science page (src/app/(main)/science/page.tsx): The Core Thesis, Three Absorption Pathways (olfactory-limbic, trigeminal-brainstem, respiratory-circulatory), Key Studies (LaVigne 2021, Schwarz 2024, Spindle 2024), The Bioavailability Gap, The Pre-Loading Solution. Use callout cards for study citations. Both pages should feel like reading a premium magazine article.

---

### Sprint 7: Polish + Session Testing (Hours 13–15)
**Tool: Both (Claude Code for logic, Cursor for CSS)**

**Tasks:**
1. Responsive testing — make sure everything works at mobile widths (375px)
2. Loading states and error boundaries
3. Page transition animations between routes
4. Bottom nav active state highlighting
5. Scroll-to-top on route change
6. Empty states (empty humidor, no filter results)
7. Meta tags and page titles
8. Touch targets ≥ 44px for mobile
9. Test the full user journey: Home → pick a vibe → browse strains → open detail → add to humidor → start session

**Quality bar:** Could you hand your phone to Eli with this open and have him explore it for 5 minutes without getting confused? That's the test.

---

### Sprint 8: Bonus / Stretch (Hours 15–16)
**If you have time, in priority order:**

1. **Terpene Explorer** — standalone page where you pick a terpene and see: what it does, which strains are dominant in it, which oils deliver it, which beverages feature it
2. **Compare mode** — select 2 strains side by side (terpene profiles, recipes, effects)
3. **Dark/light theme toggle** (already dark, but some people like light)
4. **PWA manifest** — so it installs as a home screen app on mobile
5. **Shareable strain URLs** — `/strains/mikes-bomba` already works with static params, but add Open Graph meta for when links are shared

---

## DELIVERABLE CHECKLIST

By landing in Dubai, you should have:

- [ ] Navigable app with 6 sections (Home, Strains, Humidor, Story, Science, Strain Detail)
- [ ] 24 strains with full data rendering (terpenes, EO recipes, 5 beverages each, Spotify)
- [ ] Intent-based browsing ("How do you want to feel?" → filtered results)
- [ ] Strain library with multi-filter search
- [ ] Strain detail page with the full experience stack
- [ ] Humidor with session mode
- [ ] Story and Science editorial pages
- [ ] Responsive, polished, premium dark aesthetic
- [ ] `localhost:3000` running smooth

---

## WHAT TO DO NEXT (After Dubai)

1. **Deploy to Vercel** — push to GitHub, connect Vercel, get a live URL
2. **Solful demo** — send the URL to Eli and Noah with a 2-line intro
3. **Add real Spotify integration** — use Spotify API to generate actual playlists from the prompts
4. **Add Solful website scraping** — auto-populate new strains as they're added
5. **User accounts** — Supabase auth so humidors persist
6. **PWA packaging** — make it installable as a mobile app
7. **Analytics** — track which strains/vibes get the most engagement

---

## QUICK REFERENCE: DESIGN TOKENS

```css
/* Colors */
--bg-primary: #0C0C0C;
--bg-secondary: #1A1510;
--bg-tertiary: #0F1A0F;
--text-primary: #F5EDE0;
--text-secondary: #A09080;
--text-muted: #6B5B4B;
--accent-gold: #8B7355;
--accent-gold-light: #D4C4A8;
--border: rgba(255, 255, 255, 0.06);

/* Terpene Colors */
--terpene-caryophyllene: #C8A97E;
--terpene-limonene: #D4C85C;
--terpene-myrcene: #8EAE68;
--terpene-humulene: #7C9082;
--terpene-linalool: #9B7BA8;
--terpene-bisabolol: #8EAEC8;
--terpene-pinene: #5C8E6B;
--terpene-ocimene: #B8785C;
--terpene-terpinolene: #6BAE8E;
--terpene-farnesene: #D4B88E;

/* Vibe Colors */
--vibe-grounded: #8B7355;
--vibe-creative: #9B7BA8;
--vibe-rest: #5C7B9B;
--vibe-social: #C8A97E;
--vibe-body: #8B5E5E;
--vibe-euphoric: #B8785C;
--vibe-focus: #7C9082;
--vibe-cozy: #9B7B7B;

/* Typography */
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'DM Sans', system-ui, sans-serif;

/* Spacing */
--space-page: 24px;    /* mobile */
--space-page-lg: 48px; /* desktop */
```

---

## ENERGY MANAGEMENT

- **Hours 0–3:** High caffeine zone. Scaffold and data work. Mechanical, satisfying progress.
- **Hours 3–6:** Peak creative. The home page and strain library. Design decisions here.
- **Hours 6–9:** Deep work. The strain detail page is the biggest build. Put headphones on.
- **Hours 9–11:** Second wind. Humidor is fun to build — interactive, tangible.
- **Hours 11–13:** Content mode. Story/Science is copy-paste and layout. Less cognitive load.
- **Hours 13–15:** Polish. Bug fixes, responsive tweaks. Satisfying cleanup.
- **Hours 15–16:** Stretch goals or rest. You've earned it.

Eat a real meal around hour 5-6. Don't skip it.

---

## THE SINGLE MOST IMPORTANT THING

**Generate the seed data file before you board.**

Everything else can be improvised. The sprints can flex. You can skip the Story page and still have something incredible. But if you're on the plane without `src/data/strains.ts` containing all 24 strains, 24 EO recipes, and 120 beverage recipes in clean TypeScript — you'll spend the first 4 hours doing data entry instead of building.

Come back to this chat before your flight and say: "Generate the seed data file." I'll build it from all your project files.

# Solful Sessions

A premium cannabis session orchestrator that pairs strain selection with terpene-matched music prompts and aromatherapy.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
cd solful-sessions-app
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Features

- **Dual Navigation Paths**: Browse by vibe (intent-first) or by strain (product-first)
- **8 Vibe Categories**: Deep Rest, Warm Relaxation, Contemplative Drift, Easy Social, Clear Focus, Bright Uplift, Vivid Energy, Creative Flow
- **Premium Music Prompts**: Full Spotify playlist prompts with phase-based BPM guidance (onset → peak → descent)
- **Aromatherapy Pairings**: Essential oil recommendations for terpene amplification
- **Session Timer**: Guided experience with phase indicators and current BPM
- **Personal Humidor**: Track your strains with quantity management

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── Navigation.jsx
├── data/            # Strain database and vibe categories
│   └── strains.js
├── pages/           # Page components
│   ├── HomePage.jsx
│   ├── StrainPage.jsx
│   ├── SessionPage.jsx
│   ├── HumidorPage.jsx
│   └── LearnPage.jsx
├── styles/          # Global styles
│   └── index.css
├── App.jsx          # Main app with routing
└── main.jsx         # Entry point
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Lucide Icons

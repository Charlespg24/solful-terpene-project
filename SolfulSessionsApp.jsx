import React, { useState, useEffect } from 'react';

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
];

// ============================================
// COMPONENTS
// ============================================

// Navigation Bar
const NavBar = ({ currentScreen, setCurrentScreen }) => {
  const navItems = [
    { id: 'home', label: 'Vibes', icon: '✨' },
    { id: 'humidor', label: 'Humidor', icon: '🗄️' },
    { id: 'session', label: 'Session', icon: '🎵' },
    { id: 'learn', label: 'Learn', icon: '📖' },
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

// Session Screen - Active Session with Music Prompt
const SessionScreen = ({ selectedStrain, setSelectedStrain, humidor }) => {
  const [sessionDuration, setSessionDuration] = useState(90);
  const [copied, setCopied] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (sessionStarted) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyPrompt = () => {
    if (selectedStrain?.musicPrompt) {
      navigator.clipboard.writeText(selectedStrain.musicPrompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!selectedStrain) {
    return (
      <div style={{ padding: '24px', paddingBottom: '100px' }}>
        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, margin: 0 }}>
            Start a Session
          </h1>
          <p style={{ fontSize: '14px', color: colors.muted, marginTop: '8px' }}>
            Select a strain to design your experience
          </p>
        </header>

        {humidor.length > 0 ? (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '500', color: colors.charcoal, marginBottom: '16px' }}>
              From Your Humidor
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {humidor.filter(s => s.quantity !== 'empty').map(strain => (
                <StrainCard
                  key={strain.id}
                  strain={strain}
                  onSelect={setSelectedStrain}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: colors.cream,
            borderRadius: '16px',
            padding: '40px 24px',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎵</span>
            <h3 style={{ fontSize: '18px', color: colors.charcoal, marginBottom: '8px' }}>
              No strains in your humidor
            </h3>
            <p style={{ fontSize: '14px', color: colors.muted }}>
              Add strains to your humidor first, or select from the Vibes tab
            </p>
          </div>
        )}
      </div>
    );
  }

  const vibe = vibeCategories[selectedStrain.vibeCategory];

  if (sessionStarted) {
    return (
      <div style={{
        padding: '24px',
        paddingBottom: '100px',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${vibe.color}11 0%, ${colors.warmWhite} 100%)`,
      }}>
        <div style={{ textAlign: 'center', paddingTop: '60px' }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px' }}>🌿</span>
          <h2 style={{ fontSize: '24px', fontWeight: '300', color: colors.charcoal, margin: 0 }}>
            {selectedStrain.name}
          </h2>
          <p style={{ fontSize: '14px', color: colors.muted, marginTop: '8px' }}>
            {vibe.icon} {vibe.name}
          </p>

          <div style={{
            fontSize: '64px',
            fontWeight: '200',
            color: colors.forest,
            margin: '48px 0',
            fontFamily: 'system-ui',
          }}>
            {formatTime(elapsedTime)}
          </div>

          <div style={{
            background: colors.warmWhite,
            borderRadius: '16px',
            padding: '20px',
            marginTop: '32px',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: '13px', color: colors.muted, marginBottom: '8px' }}>
              Your session playlist prompt:
            </p>
            <p style={{ fontSize: '14px', color: colors.charcoal, lineHeight: '1.6' }}>
              {selectedStrain.musicPrompt.prompt.slice(0, 200)}...
            </p>
            <button
              onClick={copyPrompt}
              style={{
                background: colors.forest,
                color: colors.warmWhite,
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy for Spotify'}
            </button>
          </div>

          <button
            onClick={() => {
              setSessionStarted(false);
              setElapsedTime(0);
              setSelectedStrain(null);
            }}
            style={{
              background: 'none',
              border: `1px solid ${colors.muted}`,
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '14px',
              color: colors.muted,
              cursor: 'pointer',
              marginTop: '32px',
            }}
          >
            End Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setSelectedStrain(null)}
          style={{
            background: 'none',
            border: 'none',
            color: colors.forest,
            fontSize: '14px',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '16px',
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: '300', color: colors.forest, margin: 0 }}>
          {selectedStrain.name}
        </h1>
        <p style={{ fontSize: '14px', color: colors.muted, marginTop: '8px' }}>
          {selectedStrain.intent}
        </p>
      </header>

      {/* Session Duration */}
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.charcoal, marginBottom: '12px' }}>
          Session Length
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[60, 75, 90, 120].map(duration => (
            <button
              key={duration}
              onClick={() => setSessionDuration(duration)}
              style={{
                background: sessionDuration === duration ? colors.forest : colors.cream,
                color: sessionDuration === duration ? colors.warmWhite : colors.charcoal,
                border: 'none',
                borderRadius: '20px',
                padding: '10px 16px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {duration} min
            </button>
          ))}
        </div>
      </section>

      {/* Aromatherapy Blend */}
      {selectedStrain.oils && (
        <section style={{
          background: colors.cream,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.charcoal, marginBottom: '4px' }}>
            🧴 Aromatherapy Blend
          </h3>
          <p style={{ fontSize: '12px', color: colors.muted, marginBottom: '16px' }}>
            Start diffusing 30 minutes before for best results
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedStrain.oils.map((oil, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: colors.charcoal }}>{oil.name}</span>
                <span style={{ fontSize: '13px', color: colors.forest, fontWeight: '600' }}>{oil.drops} drops</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Music Prompt */}
      {selectedStrain.musicPrompt && (
        <section style={{
          background: colors.warmWhite,
          border: `1px solid ${colors.sage}22`,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: colors.charcoal, marginBottom: '4px' }}>
            🎵 Your Session Playlist
          </h3>
          <p style={{ fontSize: '12px', color: colors.muted, marginBottom: '16px' }}>
            Copy this prompt into Spotify's AI playlist creator
          </p>
          <div style={{
            background: colors.cream,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <p style={{ fontSize: '13px', color: colors.charcoal, lineHeight: '1.7', margin: 0 }}>
              {selectedStrain.musicPrompt.prompt}
            </p>
          </div>

          <button
            onClick={copyPrompt}
            style={{
              background: colors.forest,
              color: colors.warmWhite,
              border: 'none',
              borderRadius: '24px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Prompt'}
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: `${colors.sage}11`,
            borderRadius: '8px',
          }}>
            <p style={{ fontSize: '12px', color: colors.muted, margin: 0, lineHeight: '1.6' }}>
              <strong>How to use:</strong> Open Spotify → Create Playlist → Tap "AI" or describe your playlist → Paste this prompt
            </p>
          </div>
        </section>
      )}

      {/* Start Session Button */}
      <button
        onClick={() => setSessionStarted(true)}
        style={{
          background: vibe.color,
          color: colors.warmWhite,
          border: 'none',
          borderRadius: '24px',
          padding: '16px 32px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {vibe.icon} Start {vibe.name} Session
      </button>
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
      {currentScreen === 'session' && (
        <SessionScreen
          selectedStrain={selectedStrain}
          setSelectedStrain={setSelectedStrain}
          humidor={humidor}
        />
      )}
      {currentScreen === 'learn' && (
        <LearnScreen />
      )}

      <NavBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
};

export default SolfulSessionsApp;

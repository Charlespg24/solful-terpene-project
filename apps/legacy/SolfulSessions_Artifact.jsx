// ============================================
// SOLFUL SESSIONS — Complete Artifact Version
// ============================================
// Copy this entire file into an artifact builder
// or paste the blocks sequentially
// ============================================

import React, { useState, useEffect } from 'react';

// ============================================
// BLOCK 1: DESIGN TOKENS & DATA
// ============================================

const colors = {
  forest: '#2D5A3D',
  sage: '#87A878',
  cream: '#F5F2EB',
  warmWhite: '#FDFCFA',
  charcoal: '#2C2C2C',
  gold: '#C4A962',
  muted: '#8B8B8B',
  purple: '#6B5B7A',
  orange: '#D4845C',
  blue: '#5C7B8A',
  rose: '#9C6B7D',
};

const vibes = [
  { id: 'rest', name: 'Deep Rest', icon: '🌙', desc: 'Total surrender', color: colors.purple, bpm: '55-80' },
  { id: 'relax', name: 'Relax', icon: '🛋️', desc: 'Grounded calm', color: colors.orange, bpm: '75-95' },
  { id: 'drift', name: 'Drift', icon: '☁️', desc: 'Mind wanders', color: colors.blue, bpm: '80-100' },
  { id: 'social', name: 'Social', icon: '✨', desc: 'Easy gathering', color: colors.gold, bpm: '90-110' },
  { id: 'focus', name: 'Focus', icon: '🎯', desc: 'Clear headed', color: colors.sage, bpm: '95-105' },
  { id: 'uplift', name: 'Uplift', icon: '☀️', desc: 'Bright & moving', color: colors.orange, bpm: '105-125' },
  { id: 'energy', name: 'Energize', icon: '⚡', desc: 'Electric alive', color: colors.rose, bpm: '110-125' },
  { id: 'create', name: 'Create', icon: '🎨', desc: 'Artistic flow', color: colors.purple, bpm: '85-110' },
];

const strains = [
  {
    id: 'guava-gift',
    name: 'Guava Gift',
    farm: 'Alpenglow Farms',
    vibe: 'social',
    intent: 'Open and expansive, easy social lift',
    effects: ['Social', 'Euphoric', 'Uplifted'],
    terpenes: [
      { name: 'β-Caryophyllene', pct: 0.73 },
      { name: 'Limonene', pct: 0.50 },
      { name: 'Myrcene', pct: 0.33 },
    ],
    oils: [
      { name: 'Black Pepper', drops: 14 },
      { name: 'Grapefruit', drops: 10 },
      { name: 'Lemongrass', drops: 8 },
    ],
    music: {
      duration: 90,
      prompt: `Create a 90-minute playlist for an open, social hang — bright but not manic, warm but not heavy. Start around 100 BPM with feel-good indie and tropical-influenced tracks — Toro y Moi, Jungle, early Tame Impala. Build into groovy, sunlit funk and disco edits around 110-115 BPM through the middle. Wind down the last 20 minutes with warm bossa nova or acoustic neo-soul. Major keys throughout. The energy should feel like a golden hour backyard gathering where everyone's laughing easily.`,
      artists: ['Toro y Moi', 'Jungle', 'Tame Impala'],
    },
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle',
    farm: 'Dos Rios Farms',
    vibe: 'rest',
    intent: 'Deep surrender into velvet quiet',
    effects: ['Relaxed', 'Blissful', 'Sleepy'],
    terpenes: [
      { name: 'β-Caryophyllene', pct: 0.61 },
      { name: 'Limonene', pct: 0.46 },
      { name: 'α-Humulene', pct: 0.19 },
    ],
    oils: [
      { name: 'Black Pepper', drops: 14 },
      { name: 'Lemon', drops: 10 },
      { name: 'Ylang Ylang', drops: 6 },
    ],
    music: {
      duration: 90,
      prompt: `Create a 90-minute playlist for total surrender. Start at 75 BPM and slowly descend to 55 BPM by the end. Open with deep, velvet-textured downtempo — Tycho's slower work, Boards of Canada, Helios. Transition into pure ambient and drone by the midpoint — Brian Eno, Stars of the Lid, Grouper. Final 30 minutes should be barely-there sound design — long tones, deep bass swells, no rhythm. Think warm darkness, not cold emptiness.`,
      artists: ['Tycho', 'Boards of Canada', 'Brian Eno'],
    },
  },
  {
    id: 'carambola',
    name: 'Carambola',
    farm: 'Higher Heights',
    vibe: 'uplift',
    intent: 'Light and playful, effervescent energy',
    effects: ['Uplifted', 'Cheerful', 'Energized'],
    terpenes: [
      { name: 'Limonene', pct: 0.44 },
      { name: 'β-Caryophyllene', pct: 0.18 },
      { name: 'Linalool', pct: 0.12 },
    ],
    oils: [
      { name: 'Grapefruit', drops: 16 },
      { name: 'Bergamot', drops: 8 },
      { name: 'Lavender', drops: 6 },
    ],
    music: {
      duration: 60,
      prompt: `Create a 60-minute playlist that's pure effervescence — bright, playful, and uplifting without being aggressive. Target 110-125 BPM. Lean into sunny indie pop, citrus-bright electronic, and feel-good dance tracks. Think Parcels, Franc Moody, Channel Tres, Confidence Man. Keep production crisp and clean — bright synths, tight percussion, major keys. Everything should feel like carbonation in your ears.`,
      artists: ['Parcels', 'Franc Moody', 'Channel Tres'],
    },
  },
  {
    id: 'glitter-bomb',
    name: 'Glitter Bomb',
    farm: 'Sol Spirit Farm',
    vibe: 'drift',
    intent: 'Body at ease, mind sparkling',
    effects: ['Relaxed', 'Cerebral', 'Creative'],
    terpenes: [
      { name: 'Myrcene', pct: 1.23 },
      { name: 'β-Caryophyllene', pct: 0.42 },
      { name: 'Linalool', pct: 0.15 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 16 },
      { name: 'Black Pepper', drops: 10 },
      { name: 'Lavender', drops: 6 },
    ],
    music: {
      duration: 75,
      prompt: `Create a 75-minute playlist where the body melts but the mind stays lit up. Start with deep, cushioned grooves around 80-90 BPM — FKJ instrumentals, Tom Misch & Yussef Dayes, Alfa Mist. Layer in sparkling, detailed electronic textures through the middle — Floating Points, Rival Consoles, Kiasmos. Production should feel like lying on velvet while watching fireworks — heavy bottom, glittering top. Instrumental only.`,
      artists: ['FKJ', 'Tom Misch', 'Floating Points'],
    },
  },
  {
    id: 'mule-fuel',
    name: 'Mule Fuel',
    farm: 'Solful Exclusive',
    vibe: 'rest',
    intent: 'Gentle contentment settling toward rest',
    effects: ['Heavy', 'Cozy', 'Sleepy'],
    badge: 'Exclusive',
    terpenes: [
      { name: 'Myrcene', pct: 2.22 },
      { name: 'α-Pinene', pct: 0.54 },
      { name: 'β-Caryophyllene', pct: 0.34 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 18 },
      { name: 'Rosemary', drops: 8 },
      { name: 'Black Pepper', drops: 6 },
    ],
    music: {
      duration: 90,
      prompt: `Create a 90-minute playlist that starts with gentle contentment and gradually dissolves into deep rest. First 20 minutes: warm, unhurried acoustic at 80-85 BPM — Iron & Wine, Nils Frahm's piano pieces, Bon Iver's quieter work. Middle 30 minutes: descend to 65-70 BPM with ambient — Sigur Rós, Ólafur Arnalds. Final 40 minutes: pure sleep soundscapes below 60 BPM — deep drones, nature recordings. No percussion after midpoint.`,
      artists: ['Iron & Wine', 'Nils Frahm', 'Bon Iver'],
    },
  },
  {
    id: 'tropical-sleigh',
    name: 'Tropical Sleigh Ride',
    farm: 'Greenshock Farms',
    vibe: 'energy',
    intent: 'Vivid lift with present clarity',
    effects: ['Joyful', 'Alert', 'Energized'],
    terpenes: [
      { name: 'β-Ocimene', pct: 0.71 },
      { name: 'β-Caryophyllene', pct: 0.70 },
      { name: 'Limonene', pct: 0.22 },
    ],
    oils: [
      { name: 'Basil', drops: 14 },
      { name: 'Black Pepper', drops: 12 },
      { name: 'Grapefruit', drops: 6 },
    ],
    music: {
      duration: 75,
      prompt: `Create a 75-minute playlist that's vivid and joyful but stays present — bright energy without losing focus. Target 110-120 BPM. Start with upbeat world-fusion and Afrobeat — Mdou Moctar, Khruangbin's uptempo work, KOKOROKO. Build into bright indie dance — Caribou, Four Tet's dancier tracks, Floating Points. Keep percussion prominent and crisp. The vibe is tropical sunrise with a clear mind.`,
      artists: ['Mdou Moctar', 'Khruangbin', 'KOKOROKO'],
    },
  },
  {
    id: 'love-laughter',
    name: 'Love & Laughter',
    farm: 'Heartrock Mountain',
    vibe: 'focus',
    intent: 'Clear and steady, nothing clouded',
    effects: ['Focused', 'Calm', 'Clear'],
    badge: 'CBD',
    terpenes: [
      { name: 'Myrcene', pct: 0.56 },
      { name: 'Terpinolene', pct: 0.28 },
      { name: 'β-Caryophyllene', pct: 0.20 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 12 },
      { name: 'Tea Tree', drops: 8 },
      { name: 'Rosemary', drops: 6 },
    ],
    music: {
      duration: 60,
      prompt: `Create a 60-minute playlist for clear, steady focus — no cloud, no haze, just calm productivity. Target 95-105 BPM throughout. Lean into minimalist post-rock and ambient electronic — Explosions in the Sky's quieter pieces, Tycho, Kiasmos, Jon Hopkins' gentler work. Keep instrumentation clean and spacious. No lyrics. The production should feel like clean air and natural light.`,
      artists: ['Explosions in the Sky', 'Tycho', 'Kiasmos'],
    },
  },
  {
    id: 'avenue-giants',
    name: 'Avenue of the Giants',
    farm: 'Happy Day Farms',
    vibe: 'energy',
    intent: 'Forward momentum with electric clarity',
    effects: ['Energized', 'Buzzy', 'Motivated'],
    terpenes: [
      { name: 'Myrcene', pct: 1.94 },
      { name: 'β-Caryophyllene', pct: 0.43 },
      { name: 'α-Pinene', pct: 0.26 },
    ],
    oils: [
      { name: 'Lemongrass', drops: 16 },
      { name: 'Black Pepper', drops: 8 },
      { name: 'Rosemary', drops: 6 },
    ],
    music: {
      duration: 75,
      prompt: `Create a 75-minute playlist that's propulsive and electric — forward momentum with a deep foundation. Start at 105 BPM and build to 120 by midpoint, then hold. Open with driving post-rock and shoegaze — Mogwai, M83, DIIV. Build into energizing electronic with real weight — Moderat, Jon Hopkins "Open Eye Signal" energy, Bicep. Keep bass heavy. This is a redwood forest soundtrack — towering and electric. Pure forward motion.`,
      artists: ['Mogwai', 'M83', 'Jon Hopkins', 'Bicep'],
    },
  },
];

// ============================================
// BLOCK 2: REUSABLE COMPONENTS
// ============================================

const NavBar = ({ screen, setScreen }) => (
  <nav style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: colors.warmWhite,
    borderTop: `1px solid ${colors.sage}33`,
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0 24px 0',
    zIndex: 100,
  }}>
    {[
      { id: 'home', icon: '✨', label: 'Vibes' },
      { id: 'humidor', icon: '🗄️', label: 'Humidor' },
      { id: 'session', icon: '🎵', label: 'Session' },
      { id: 'learn', icon: '📖', label: 'Learn' },
    ].map(tab => (
      <button
        key={tab.id}
        onClick={() => setScreen(tab.id)}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 16px',
          cursor: 'pointer',
          opacity: screen === tab.id ? 1 : 0.5,
        }}
      >
        <span style={{ fontSize: '22px' }}>{tab.icon}</span>
        <span style={{
          fontSize: '11px',
          fontWeight: screen === tab.id ? '600' : '400',
          color: screen === tab.id ? colors.forest : colors.muted,
        }}>
          {tab.label}
        </span>
      </button>
    ))}
  </nav>
);

const VibeTile = ({ vibe, selected, onSelect }) => (
  <button
    onClick={() => onSelect(vibe)}
    style={{
      background: selected ? vibe.color : colors.warmWhite,
      border: `2px solid ${selected ? vibe.color : colors.sage}44`,
      borderRadius: '16px',
      padding: '16px 12px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s',
    }}
  >
    <span style={{ fontSize: '28px', display: 'block' }}>{vibe.icon}</span>
    <span style={{
      fontSize: '13px',
      fontWeight: '600',
      color: selected ? colors.warmWhite : colors.charcoal,
      display: 'block',
      marginTop: '6px',
    }}>
      {vibe.name}
    </span>
    <span style={{
      fontSize: '10px',
      color: selected ? `${colors.warmWhite}cc` : colors.muted,
      display: 'block',
      marginTop: '2px',
    }}>
      {vibe.desc}
    </span>
  </button>
);

const StrainCard = ({ strain, onSelect, compact }) => {
  const vibe = vibes.find(v => v.id === strain.vibe);
  return (
    <button
      onClick={() => onSelect(strain)}
      style={{
        background: colors.warmWhite,
        border: `1px solid ${colors.sage}22`,
        borderRadius: '12px',
        padding: compact ? '12px' : '16px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, margin: 0 }}>
            {strain.name}
          </h3>
          <p style={{ fontSize: '11px', color: colors.muted, margin: '2px 0 0 0' }}>
            {strain.farm}
          </p>
        </div>
        <span style={{
          background: `${vibe.color}22`,
          color: vibe.color,
          padding: '3px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600',
        }}>
          {vibe.icon} {vibe.name}
        </span>
      </div>
      {!compact && (
        <>
          <p style={{ fontSize: '12px', color: colors.charcoal, margin: '8px 0', lineHeight: '1.4' }}>
            {strain.intent}
          </p>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {strain.effects.map((e, i) => (
              <span key={i} style={{
                background: colors.cream,
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '10px',
                color: colors.charcoal,
              }}>
                {e}
              </span>
            ))}
            {strain.badge && (
              <span style={{
                background: strain.badge === 'CBD' ? colors.sage : colors.gold,
                color: colors.warmWhite,
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: '600',
              }}>
                {strain.badge}
              </span>
            )}
          </div>
        </>
      )}
    </button>
  );
};

// ============================================
// BLOCK 3: HOME SCREEN
// ============================================

const HomeScreen = ({ onSelectStrain }) => {
  const [selectedVibe, setSelectedVibe] = useState(null);

  const matching = selectedVibe
    ? strains.filter(s => s.vibe === selectedVibe.id)
    : [];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '300', color: colors.forest, margin: '0 0 6px 0' }}>
        How do you want to feel?
      </h1>
      <p style={{ fontSize: '13px', color: colors.muted, margin: '0 0 20px 0' }}>
        Select a vibe to find your perfect strain
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '24px',
      }}>
        {vibes.map(v => (
          <VibeTile
            key={v.id}
            vibe={v}
            selected={selectedVibe?.id === v.id}
            onSelect={setSelectedVibe}
          />
        ))}
      </div>

      {selectedVibe && (
        <>
          <h2 style={{ fontSize: '16px', fontWeight: '500', color: colors.charcoal, margin: '0 0 12px 0' }}>
            {selectedVibe.icon} Strains for {selectedVibe.name}
          </h2>
          <p style={{ fontSize: '11px', color: colors.muted, margin: '0 0 12px 0' }}>
            BPM range: {selectedVibe.bpm}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {matching.map(s => (
              <StrainCard key={s.id} strain={s} onSelect={onSelectStrain} />
            ))}
            {matching.length === 0 && (
              <p style={{ fontSize: '13px', color: colors.muted, textAlign: 'center', padding: '20px' }}>
                No strains in this category yet
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ============================================
// BLOCK 4: HUMIDOR SCREEN
// ============================================

const HumidorScreen = ({ humidor, setHumidor, onSelectStrain }) => {
  const [showAdd, setShowAdd] = useState(false);

  const addStrain = (strain) => {
    if (!humidor.find(h => h.id === strain.id)) {
      setHumidor([...humidor, { ...strain, qty: 'full' }]);
    }
    setShowAdd(false);
  };

  const updateQty = (id, qty) => {
    setHumidor(humidor.map(h => h.id === id ? { ...h, qty } : h));
  };

  const removeStrain = (id) => {
    setHumidor(humidor.filter(h => h.id !== id));
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '300', color: colors.forest, margin: 0 }}>
            Your Humidor
          </h1>
          <p style={{ fontSize: '13px', color: colors.muted, marginTop: '4px' }}>
            {humidor.length} strain{humidor.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{
            background: colors.forest,
            color: colors.warmWhite,
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '22px',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>

      {humidor.length === 0 ? (
        <div style={{
          background: colors.cream,
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
        }}>
          <span style={{ fontSize: '40px' }}>🗄️</span>
          <h3 style={{ fontSize: '16px', color: colors.charcoal, margin: '12px 0 6px 0' }}>
            Your humidor is empty
          </h3>
          <p style={{ fontSize: '13px', color: colors.muted, margin: '0 0 16px 0' }}>
            Add strains you have at home
          </p>
          <button
            onClick={() => setShowAdd(true)}
            style={{
              background: colors.forest,
              color: colors.warmWhite,
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Add First Strain
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {humidor.map(strain => {
            const vibe = vibes.find(v => v.id === strain.vibe);
            return (
              <div key={strain.id} style={{
                background: colors.warmWhite,
                border: `1px solid ${colors.sage}22`,
                borderRadius: '12px',
                padding: '14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <button
                    onClick={() => onSelectStrain(strain)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, flex: 1 }}
                  >
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: colors.charcoal, margin: 0 }}>
                      {strain.name}
                    </h3>
                    <p style={{ fontSize: '11px', color: colors.muted, margin: '2px 0 0 0' }}>
                      {strain.intent}
                    </p>
                  </button>
                  <button
                    onClick={() => removeStrain(strain.id)}
                    style={{ background: 'none', border: 'none', color: colors.muted, cursor: 'pointer', fontSize: '18px' }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  {['full', 'half', 'low', 'empty'].map(q => (
                    <button
                      key={q}
                      onClick={() => updateQty(strain.id, q)}
                      style={{
                        background: strain.qty === q ? colors.forest : colors.cream,
                        color: strain.qty === q ? colors.warmWhite : colors.charcoal,
                        border: 'none',
                        borderRadius: '12px',
                        padding: '5px 10px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 200,
        }}>
          <div style={{
            background: colors.warmWhite,
            width: '100%',
            borderRadius: '20px 20px 0 0',
            padding: '20px',
            maxHeight: '70vh',
            overflow: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '500', color: colors.charcoal, margin: 0 }}>
                Add to Humidor
              </h2>
              <button onClick={() => setShowAdd(false)} style={{
                background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: colors.muted
              }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {strains.filter(s => !humidor.find(h => h.id === s.id)).map(s => (
                <StrainCard key={s.id} strain={s} onSelect={addStrain} compact />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// BLOCK 5: SESSION SCREEN
// ============================================

const SessionScreen = ({ strain, setStrain, humidor }) => {
  const [duration, setDuration] = useState(90);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const copyPrompt = () => {
    if (strain?.music) {
      navigator.clipboard.writeText(strain.music.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // No strain selected
  if (!strain) {
    const available = humidor.filter(h => h.qty !== 'empty');
    return (
      <div style={{ padding: '20px', paddingBottom: '100px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '300', color: colors.forest, margin: '0 0 6px 0' }}>
          Start a Session
        </h1>
        <p style={{ fontSize: '13px', color: colors.muted, margin: '0 0 20px 0' }}>
          Select a strain to design your experience
        </p>
        {available.length > 0 ? (
          <>
            <h2 style={{ fontSize: '14px', fontWeight: '500', color: colors.charcoal, margin: '0 0 12px 0' }}>
              From Your Humidor
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {available.map(s => (
                <StrainCard key={s.id} strain={s} onSelect={setStrain} compact />
              ))}
            </div>
          </>
        ) : (
          <div style={{
            background: colors.cream,
            borderRadius: '16px',
            padding: '40px 20px',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '40px' }}>🎵</span>
            <h3 style={{ fontSize: '16px', color: colors.charcoal, margin: '12px 0 6px 0' }}>
              No strains available
            </h3>
            <p style={{ fontSize: '13px', color: colors.muted }}>
              Add strains to your humidor, or select from Vibes
            </p>
          </div>
        )}
      </div>
    );
  }

  const vibe = vibes.find(v => v.id === strain.vibe);

  // Active session
  if (active) {
    return (
      <div style={{
        padding: '20px',
        paddingBottom: '100px',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${vibe.color}15 0%, ${colors.cream} 100%)`,
      }}>
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <span style={{ fontSize: '44px' }}>🌿</span>
          <h2 style={{ fontSize: '22px', fontWeight: '300', color: colors.charcoal, margin: '16px 0 4px 0' }}>
            {strain.name}
          </h2>
          <p style={{ fontSize: '13px', color: colors.muted }}>{vibe.icon} {vibe.name}</p>

          <div style={{
            fontSize: '56px',
            fontWeight: '200',
            color: colors.forest,
            margin: '40px 0',
          }}>
            {formatTime(elapsed)}
          </div>

          <div style={{
            background: colors.warmWhite,
            borderRadius: '14px',
            padding: '16px',
            textAlign: 'left',
            margin: '0 0 24px 0',
          }}>
            <p style={{ fontSize: '11px', color: colors.muted, margin: '0 0 6px 0' }}>Your playlist prompt:</p>
            <p style={{ fontSize: '12px', color: colors.charcoal, lineHeight: '1.5', margin: 0 }}>
              {strain.music.prompt.slice(0, 150)}...
            </p>
            <button
              onClick={copyPrompt}
              style={{
                background: colors.forest,
                color: colors.warmWhite,
                border: 'none',
                borderRadius: '16px',
                padding: '8px 16px',
                fontSize: '12px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy for Spotify'}
            </button>
          </div>

          <button
            onClick={() => { setActive(false); setElapsed(0); setStrain(null); }}
            style={{
              background: 'none',
              border: `1px solid ${colors.muted}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '13px',
              color: colors.muted,
              cursor: 'pointer',
            }}
          >
            End Session
          </button>
        </div>
      </div>
    );
  }

  // Session setup
  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <button
        onClick={() => setStrain(null)}
        style={{ background: 'none', border: 'none', color: colors.forest, fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '12px' }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: '24px', fontWeight: '300', color: colors.forest, margin: '0 0 4px 0' }}>
        {strain.name}
      </h1>
      <p style={{ fontSize: '13px', color: colors.muted, margin: '0 0 20px 0' }}>
        {strain.intent}
      </p>

      {/* Duration */}
      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: '600', color: colors.charcoal, margin: '0 0 10px 0' }}>
          Session Length
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[60, 75, 90, 120].map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              style={{
                background: duration === d ? colors.forest : colors.cream,
                color: duration === d ? colors.warmWhite : colors.charcoal,
                border: 'none',
                borderRadius: '16px',
                padding: '8px 14px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {d} min
            </button>
          ))}
        </div>
      </section>

      {/* Aromatherapy */}
      <section style={{
        background: colors.cream,
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: '600', color: colors.charcoal, margin: '0 0 4px 0' }}>
          🧴 Aromatherapy Blend
        </h3>
        <p style={{ fontSize: '11px', color: colors.muted, margin: '0 0 12px 0' }}>
          Start diffusing 30 min before
        </p>
        {strain.oils.map((oil, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontSize: '13px', color: colors.charcoal }}>{oil.name}</span>
            <span style={{ fontSize: '12px', color: colors.forest, fontWeight: '600' }}>{oil.drops} drops</span>
          </div>
        ))}
      </section>

      {/* Music Prompt */}
      <section style={{
        background: colors.warmWhite,
        border: `1px solid ${colors.sage}22`,
        borderRadius: '14px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: '600', color: colors.charcoal, margin: '0 0 4px 0' }}>
          🎵 Your Playlist Prompt
        </h3>
        <p style={{ fontSize: '11px', color: colors.muted, margin: '0 0 12px 0' }}>
          Copy into Spotify's AI playlist creator
        </p>
        <div style={{
          background: colors.cream,
          borderRadius: '10px',
          padding: '12px',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '12px', color: colors.charcoal, lineHeight: '1.6', margin: 0 }}>
            {strain.music.prompt}
          </p>
        </div>
        <button
          onClick={copyPrompt}
          style={{
            background: colors.forest,
            color: colors.warmWhite,
            border: 'none',
            borderRadius: '20px',
            padding: '10px 0',
            fontSize: '13px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {copied ? '✓ Copied!' : 'Copy Prompt'}
        </button>
        <div style={{
          marginTop: '12px',
          padding: '10px',
          background: `${colors.sage}15`,
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '11px', color: colors.muted, margin: 0, lineHeight: '1.5' }}>
            <strong>How:</strong> Open Spotify → Create Playlist → Tap AI → Paste
          </p>
        </div>
      </section>

      {/* Artists */}
      <section style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', color: colors.muted, margin: '0 0 8px 0' }}>Artist anchors:</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {strain.music.artists.map((a, i) => (
            <span key={i} style={{
              background: colors.cream,
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              color: colors.charcoal,
            }}>
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* Start Button */}
      <button
        onClick={() => setActive(true)}
        style={{
          background: vibe.color,
          color: colors.warmWhite,
          border: 'none',
          borderRadius: '20px',
          padding: '14px 0',
          fontSize: '15px',
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

// ============================================
// BLOCK 6: LEARN SCREEN
// ============================================

const LearnScreen = () => {
  const [open, setOpen] = useState(null);

  const sections = [
    {
      id: 'philosophy',
      title: 'The Philosophy',
      icon: '💭',
      content: `Most people smoke whatever's in the jar and put on random music. Sometimes the vibe lands, sometimes it doesn't.

Solful Sessions is built on a different idea: what if every session was designed?

You pick how you want to feel. The app recommends what to smoke, what to diffuse, and what to play. Strain for cannabinoids. Scent for terpene boost. Sound for emotional arc.

That's the philosophy: cannabis consumption as design, not chance.`
    },
    {
      id: 'terpenes',
      title: 'How Terpenes Work',
      icon: '🌿',
      content: `Terpenes are aromatic compounds that make cannabis smell the way it does. They're also in essential oils, fruit peels, and pine trees.

Key insight: terpenes don't just create aroma—they affect how you feel.

• Myrcene (mango, lemongrass) → Sedating
• Limonene (citrus) → Mood elevation
• Caryophyllene (black pepper) → Calming
• Linalool (lavender) → Stress relief
• Pinene (pine) → Alertness

Different strains have different terpene profiles. That's why strains feel different even at similar THC levels.`
    },
    {
      id: 'music',
      title: 'The Music Connection',
      icon: '🎵',
      content: `Music doesn't just accompany your high—it shapes it.

The same brain systems that terpenes act on (dopamine, serotonin, GABA) are the same systems music modulates.

Research shows:
• 60-80 BPM activates "rest and digest" mode—same as myrcene
• 100+ BPM triggers dopamine—same pathway as limonene
• The "iso principle": match current mood, then gradually shift

Each strain has a custom music prompt that translates its terpene profile into tempo, energy, and texture.`
    },
    {
      id: 'aromatherapy',
      title: 'The Aromatherapy Layer',
      icon: '🧴',
      content: `Cannabis is typically 1-4% terpenes. When you smoke, some are lost to heat.

The aromatherapy blends boost the signal—each mirrors the strain's dominant terpenes using essential oils with the same compounds.

The protocol:
1. Start diffusing 30 min before
2. Olfactory system signals limbic system (emotion, memory)
3. Terpenes circulate through lungs
4. Brain is primed before consumption

Effect: faster onset, brighter experience, longer duration—without consuming more cannabis.`
    },
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '300', color: colors.forest, margin: '0 0 6px 0' }}>
        Learn
      </h1>
      <p style={{ fontSize: '13px', color: colors.muted, margin: '0 0 20px 0' }}>
        The science behind intentional sessions
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sections.map(s => (
          <div key={s.id} style={{
            background: colors.warmWhite,
            border: `1px solid ${colors.sage}22`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => setOpen(open === s.id ? null : s.id)}
              style={{
                background: 'none',
                border: 'none',
                width: '100%',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: colors.charcoal }}>
                  {s.title}
                </span>
              </div>
              <span style={{ color: colors.muted, fontSize: '18px' }}>
                {open === s.id ? '−' : '+'}
              </span>
            </button>
            {open === s.id && (
              <div style={{ padding: '0 14px 14px 14px' }}>
                <div style={{ background: colors.cream, borderRadius: '8px', padding: '12px' }}>
                  {s.content.split('\n\n').map((p, i) => (
                    <p key={i} style={{
                      fontSize: '13px',
                      lineHeight: '1.6',
                      color: colors.charcoal,
                      margin: i === 0 ? 0 : '10px 0 0 0',
                      whiteSpace: 'pre-wrap',
                    }}>
                      {p}
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
// BLOCK 7: MAIN APP
// ============================================

export default function SolfulSessions() {
  const [screen, setScreen] = useState('home');
  const [strain, setStrain] = useState(null);
  const [humidor, setHumidor] = useState([]);

  const selectStrain = (s) => {
    setStrain(s);
    setScreen('session');
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: colors.cream,
      minHeight: '100vh',
      maxWidth: '430px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {screen === 'home' && <HomeScreen onSelectStrain={selectStrain} />}
      {screen === 'humidor' && <HumidorScreen humidor={humidor} setHumidor={setHumidor} onSelectStrain={selectStrain} />}
      {screen === 'session' && <SessionScreen strain={strain} setStrain={setStrain} humidor={humidor} />}
      {screen === 'learn' && <LearnScreen />}

      <NavBar screen={screen} setScreen={setScreen} />
    </div>
  );
}

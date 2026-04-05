import React, { useContext, useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Music,
  Clock,
  Plus,
  Check,
  Wind,
  Sparkles,
  Play,
  ChevronRight,
  Copy,
  ExternalLink
} from 'lucide-react';
import { AppContext } from '../App';
import { strains, vibeCategories } from '../data/strains';
import { getStrainVibeComponent } from './strainVibeRegistry';

function StrainPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { humidor, addToHumidor, startSession, setSelectedStrain } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);

  const VibeComponent = getStrainVibeComponent(id);
  const strain = strains?.find ? strains.find(s => s.id === id) : null;
  const vibe = strain && vibeCategories ? vibeCategories[strain.vibeCategory] : null;
  const isInHumidor = strain ? humidor.some(h => h.id === strain.id) : false;

  useEffect(() => {
    if (strain) {
      setSelectedStrain(strain);
    }
  }, [strain, setSelectedStrain]);

  // Render the full immersive vibe experience when one exists for this strain.
  if (VibeComponent) {
    return (
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-white/60 font-mono text-xs tracking-widest uppercase">Loading vibe…</div>
          </div>
        }>
          <VibeComponent />
        </Suspense>
      </div>
    );
  }

  if (!strain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        <p className="text-charcoal-600">Strain not found</p>
      </div>
    );
  }

  if (!vibe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        <p className="text-charcoal-600">Invalid strain data</p>
      </div>
    );
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(strain.music.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartSession = () => {
    startSession(strain, strain.music.duration);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pb-32 bg-cream-100"
    >
      {/* Header */}
      <header className="sticky top-0 bg-cream-100/90 backdrop-blur-lg z-10 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-charcoal-100 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => isInHumidor ? null : addToHumidor(strain)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isInHumidor
                ? 'bg-forest-100 text-forest-600'
                : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
            }`}
          >
            {isInHumidor ? <Check size={16} /> : <Plus size={16} />}
            {isInHumidor ? 'In Humidor' : 'Add to Humidor'}
          </button>
        </div>
      </header>

      <div className="px-6">
        {/* Strain Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-3"
            style={{
              backgroundColor: `${vibe.color}15`,
              color: vibe.color
            }}
          >
            <span>{vibe.emoji}</span>
            {vibe.name}
          </div>
          <h1 className="font-display text-display-md text-charcoal-900 mb-2">
            {strain.name}
          </h1>
          <p className="text-charcoal-600 text-lg leading-relaxed">
            {strain.intent}
          </p>
        </motion.div>

        {/* Music Prompt Card - THE STAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="music-prompt-card mb-6"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-forest-500/20 flex items-center justify-center">
                <Music size={20} className="text-forest-300" />
              </div>
              <div>
                <h2 className="font-display text-lg text-cream-50">
                  Your Sonic Journey
                </h2>
                <p className="text-sm text-cream-300">
                  {strain.music.duration} min • {strain.music.bpmStart}→{strain.music.bpmPeak}→{strain.music.bpmEnd} BPM
                </p>
              </div>
            </div>

            {/* Phase indicators */}
            <div className="flex gap-2 mb-4">
              {Object.entries(strain.music.phases).map(([phase, data]) => (
                <div
                  key={phase}
                  className="flex-1 bg-white/10 rounded-lg p-3"
                >
                  <p className="text-xs text-cream-400 uppercase tracking-wide mb-1">
                    {phase}
                  </p>
                  <p className="text-sm text-cream-100 font-medium">
                    {data.duration} min
                  </p>
                </div>
              ))}
            </div>

            {/* Prompt preview */}
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className={`text-sm text-cream-200 leading-relaxed ${!showFullPrompt ? 'line-clamp-4' : ''}`}>
                {strain.music.prompt}
              </p>
              {strain.music.prompt.length > 200 && (
                <button
                  onClick={() => setShowFullPrompt(!showFullPrompt)}
                  className="text-forest-300 text-sm mt-2 flex items-center gap-1"
                >
                  {showFullPrompt ? 'Show less' : 'Read full prompt'}
                  <ChevronRight size={14} className={showFullPrompt ? 'rotate-90' : ''} />
                </button>
              )}
            </div>

            {/* Artists & Textures */}
            <div className="mb-4">
              <p className="text-xs text-cream-400 uppercase tracking-wide mb-2">
                Suggested Artists
              </p>
              <div className="flex flex-wrap gap-2">
                {strain.music.artists.slice(0, 5).map((artist) => (
                  <span
                    key={artist}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-cream-200"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyPrompt}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-cream-100 px-4 py-3 rounded-xl font-medium transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white px-4 py-3 rounded-xl font-medium transition-all"
              >
                <ExternalLink size={18} />
                Open Spotify
              </a>
            </div>
          </div>
        </motion.div>

        {/* Aromatherapy Section */}
        {strain.oils && strain.oils.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-5 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wind size={20} className="text-sage-500" />
              <h2 className="font-display text-lg text-charcoal-900">
                Aromatherapy Pairing
              </h2>
            </div>
            <p className="text-sm text-charcoal-600 mb-4">
              Diffuse 30 minutes before your session for terpene amplification.
            </p>
            <div className="flex flex-wrap gap-2">
              {strain.oils.map((oil, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium"
                >
                  {typeof oil === 'string' ? oil : `${oil.name} (${oil.drops} drops)`}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Terpene Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-gold-500" />
            <h2 className="font-display text-lg text-charcoal-900">
              Terpene Profile
            </h2>
          </div>
          <div className="space-y-3">
            {strain.terpenes.map((terpene) => (
              <div key={terpene.name} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-charcoal-900">{terpene.name}</p>
                  <p className="text-sm text-charcoal-500">{terpene.percentage}%</p>
                </div>
                <div className="w-24 h-2 bg-charcoal-100 rounded-full overflow-hidden ml-4">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${(terpene.percentage / parseFloat(strain.totalTerpenes.replace('%', ''))) * 100}%`,
                      backgroundColor: terpene.color || '#2D5A3D'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-lg text-charcoal-900 mb-3">
            Expected Effects
          </h2>
          <div className="flex flex-wrap gap-2">
            {strain.effects.map((effect) => (
              <span
                key={effect}
                className="px-3 py-1.5 bg-cream-200 text-charcoal-700 rounded-full text-sm"
              >
                {effect}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed Start Session Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 pb-4 bg-gradient-to-t from-cream-100 via-cream-100 to-transparent pt-8">
        <motion.button
          onClick={handleStartSession}
          className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={20} />
          Begin {strain.music.duration}-Minute Session
        </motion.button>
      </div>
    </motion.div>
  );
}

export default StrainPage;

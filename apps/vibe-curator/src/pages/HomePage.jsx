import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf, ChevronRight, Music, Clock, Wind } from 'lucide-react';
import { AppContext } from '../App';
import { strains, vibeCategories } from '../data/strains';

// Vibe tile component with category styling
function VibeTile({ vibe, onClick }) {
  const Icon = vibe.icon;
  return (
    <motion.button
      onClick={onClick}
      className="vibe-tile text-left"
      style={{ backgroundColor: `${vibe.color}15` }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${vibe.color}25` }}
      >
        <span className="text-2xl">{vibe.emoji}</span>
      </div>
      <h3 className="font-display text-xl font-medium text-charcoal-900 mb-1">
        {vibe.name}
      </h3>
      <p className="text-sm text-charcoal-600 leading-relaxed">
        {vibe.description}
      </p>
    </motion.button>
  );
}

// Strain card for the strain-first path
function StrainCard({ strain, onClick }) {
  const vibe = vibeCategories[strain.vibeCategory];

  return (
    <motion.button
      onClick={onClick}
      className="strain-card text-left w-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg font-medium text-charcoal-900">
            {strain.name}
          </h3>
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mt-1"
            style={{
              backgroundColor: `${vibe.color}15`,
              color: vibe.color
            }}
          >
            <span>{vibe.emoji}</span>
            {vibe.name}
          </div>
        </div>
        <ChevronRight className="text-charcoal-400" size={20} />
      </div>

      <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">
        {strain.intent}
      </p>

      <div className="flex items-center gap-4 text-xs text-charcoal-500">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {strain.music.duration} min
        </span>
        <span className="flex items-center gap-1">
          <Music size={14} />
          {strain.music.bpmStart}-{strain.music.bpmPeak} BPM
        </span>
      </div>
    </motion.button>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { setSelectedStrain } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('vibe'); // 'vibe' or 'strain'
  const [selectedVibe, setSelectedVibe] = useState(null);

  const handleVibeSelect = (vibeId) => {
    setSelectedVibe(vibeId);
  };

  const handleStrainSelect = (strain) => {
    setSelectedStrain(strain);
    navigate(`/strain/${strain.id}`);
  };

  const vibeStrains = selectedVibe
    ? strains.filter(s => s.vibeCategory === selectedVibe)
    : [];

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
      className="min-h-screen"
    >
      {/* Header */}
      <header className="pt-12 pb-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-display text-display-lg text-charcoal-900 mb-2">
            Solful Sessions
          </h1>
          <p className="text-charcoal-600 text-lg">
            Design your experience with intention
          </p>
        </motion.div>
      </header>

      {/* Path Toggle */}
      <div className="px-6 mb-6">
        <div className="bg-cream-200/50 rounded-full p-1 flex">
          <button
            onClick={() => { setActiveTab('vibe'); setSelectedVibe(null); }}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'vibe'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles size={16} />
              By Vibe
            </span>
          </button>
          <button
            onClick={() => setActiveTab('strain')}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'strain'
                ? 'bg-white text-charcoal-900 shadow-sm'
                : 'text-charcoal-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Leaf size={16} />
              By Strain
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'vibe' ? (
          <motion.div
            key="vibe-path"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-6"
          >
            {!selectedVibe ? (
              <>
                <p className="text-charcoal-700 mb-6 font-display text-lg italic">
                  What kind of experience are you seeking?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(vibeCategories).map((vibe) => (
                    <VibeTile
                      key={vibe.id}
                      vibe={vibe}
                      onClick={() => handleVibeSelect(vibe.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Selected vibe header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${vibeCategories[selectedVibe].color}25` }}
                    >
                      <span className="text-xl">{vibeCategories[selectedVibe].emoji}</span>
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-medium text-charcoal-900">
                        {vibeCategories[selectedVibe].name}
                      </h2>
                      <p className="text-sm text-charcoal-600">
                        {vibeStrains.length} strains available
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVibe(null)}
                    className="btn-ghost text-sm"
                  >
                    Change
                  </button>
                </div>

                {/* Strains for this vibe */}
                <div className="space-y-3">
                  {vibeStrains.map((strain) => (
                    <StrainCard
                      key={strain.id}
                      strain={strain}
                      onClick={() => handleStrainSelect(strain)}
                    />
                  ))}
                </div>

                {vibeStrains.length === 0 && (
                  <p className="text-center text-charcoal-500 py-8">
                    No strains available for this vibe yet.
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="strain-path"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6"
          >
            <p className="text-charcoal-700 mb-6 font-display text-lg italic">
              Already know what you're enjoying?
            </p>
            <div className="space-y-3">
              {strains.map((strain) => (
                <StrainCard
                  key={strain.id}
                  strain={strain}
                  onClick={() => handleStrainSelect(strain)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer for navigation */}
      <div className="h-8" />
    </motion.div>
  );
}

export default HomePage;

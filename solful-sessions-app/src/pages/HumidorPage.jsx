import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Trash2,
  Play,
  Clock,
  Music,
  ChevronRight,
  Plus
} from 'lucide-react';
import { AppContext } from '../App';
import { vibeCategories } from '../data/strains';

function HumidorPage() {
  const navigate = useNavigate();
  const { humidor, removeFromHumidor, updateHumidorQuantity, startSession } = useContext(AppContext);

  const quantityOptions = ['full', 'half', 'quarter', 'low'];

  const formatQuantity = (qty) => {
    const labels = {
      full: 'Full',
      half: 'Half',
      quarter: '1/4',
      low: 'Low'
    };
    return labels[qty] || qty;
  };

  const getQuantityColor = (qty) => {
    const colors = {
      full: 'bg-forest-100 text-forest-700',
      half: 'bg-gold-100 text-gold-700',
      quarter: 'bg-orange-100 text-orange-700',
      low: 'bg-red-100 text-red-700'
    };
    return colors[qty] || 'bg-charcoal-100 text-charcoal-700';
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
      className="min-h-screen"
    >
      {/* Header */}
      <header className="pt-12 pb-6 px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
            <Package size={24} className="text-forest-600" />
          </div>
          <div>
            <h1 className="font-display text-display-sm text-charcoal-900">
              My Humidor
            </h1>
            <p className="text-charcoal-600">
              {humidor.length} strain{humidor.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>
      </header>

      <div className="px-6">
        {humidor.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-charcoal-100 flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-charcoal-400" />
            </div>
            <h2 className="font-display text-xl text-charcoal-900 mb-2">
              Your humidor is empty
            </h2>
            <p className="text-charcoal-600 mb-6 max-w-sm mx-auto">
              Add strains to your humidor to track what you have and quickly start sessions.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Browse Strains
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {humidor.map((item, index) => {
                const vibe = vibeCategories[item.vibeCategory];

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl p-5"
                  >
                    {/* Strain Header */}
                    <div className="flex items-start justify-between mb-4">
                      <button
                        onClick={() => navigate(`/strain/${item.id}`)}
                        className="flex-1 text-left"
                      >
                        <div
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                          style={{
                            backgroundColor: `${vibe.color}15`,
                            color: vibe.color
                          }}
                        >
                          <span>{vibe.emoji}</span>
                          {vibe.name}
                        </div>
                        <h3 className="font-display text-lg text-charcoal-900 flex items-center gap-1">
                          {item.name}
                          <ChevronRight size={16} className="text-charcoal-400" />
                        </h3>
                      </button>

                      {/* Quantity selector */}
                      <select
                        value={item.quantity}
                        onChange={(e) => updateHumidorQuantity(item.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium appearance-none cursor-pointer ${getQuantityColor(item.quantity)}`}
                      >
                        {quantityOptions.map((qty) => (
                          <option key={qty} value={qty}>
                            {formatQuantity(qty)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quick Info */}
                    <div className="flex items-center gap-4 text-sm text-charcoal-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {item.music.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Music size={14} />
                        {item.music.bpmStart}-{item.music.bpmPeak} BPM
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => startSession(item, item.music.duration)}
                        className="flex-1 btn-primary py-2.5 text-sm flex items-center justify-center gap-2"
                      >
                        <Play size={16} />
                        Start Session
                      </button>
                      <button
                        onClick={() => removeFromHumidor(item.id)}
                        className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </motion.div>
  );
}

export default HumidorPage;

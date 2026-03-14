import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  SkipForward,
  Music,
  Wind,
  Clock,
  Check
} from 'lucide-react';
import { AppContext } from '../App';
import { vibeCategories } from '../data/strains';

function SessionPage() {
  const navigate = useNavigate();
  const { currentSession, endSession } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('onset');
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Redirect if no session
  useEffect(() => {
    if (!currentSession) {
      navigate('/');
    }
  }, [currentSession, navigate]);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || !currentSession) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSession]);

  // Phase calculation
  useEffect(() => {
    if (!currentSession) return;

    const { phases } = currentSession.strain.music;
    const elapsedMinutes = elapsedSeconds / 60;

    if (elapsedMinutes < phases.onset.duration) {
      setCurrentPhase('onset');
    } else if (elapsedMinutes < phases.onset.duration + phases.peak.duration) {
      setCurrentPhase('peak');
    } else {
      setCurrentPhase('descent');
    }
  }, [elapsedSeconds, currentSession]);

  const handleEndSession = useCallback(() => {
    endSession();
    navigate('/');
  }, [endSession, navigate]);

  if (!currentSession) {
    return null;
  }

  const { strain } = currentSession;
  const vibe = vibeCategories[strain.vibeCategory];
  const totalSeconds = strain.music.duration * 60;
  const progress = (elapsedSeconds / totalSeconds) * 100;
  const remainingSeconds = totalSeconds - elapsedSeconds;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Phase data
  const phases = ['onset', 'peak', 'descent'];
  const phaseData = strain.music.phases;

  // Calculate phase progress
  const getPhaseProgress = () => {
    const elapsedMinutes = elapsedSeconds / 60;
    const onsetEnd = phaseData.onset.duration;
    const peakEnd = onsetEnd + phaseData.peak.duration;

    if (currentPhase === 'onset') {
      return (elapsedMinutes / onsetEnd) * 100;
    } else if (currentPhase === 'peak') {
      return ((elapsedMinutes - onsetEnd) / phaseData.peak.duration) * 100;
    } else {
      return ((elapsedMinutes - peakEnd) / phaseData.descent.duration) * 100;
    }
  };

  const phaseProgress = getPhaseProgress();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: `${vibe.color}08` }}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <button
          onClick={() => setShowEndConfirm(true)}
          className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-sm text-charcoal-600">In Session</p>
          <p className="font-display text-lg text-charcoal-900">{strain.name}</p>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Large Timer Circle */}
        <motion.div
          className="relative w-64 h-64 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke={`${vibe.color}20`}
              strokeWidth="8"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke={vibe.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-display font-light text-charcoal-900">
              {formatTime(remainingSeconds)}
            </p>
            <p className="text-charcoal-500 mt-1">remaining</p>
          </div>
        </motion.div>

        {/* Phase Indicator */}
        <motion.div
          className="w-full max-w-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between mb-3">
            {phases.map((phase) => (
              <div
                key={phase}
                className={`flex flex-col items-center transition-all ${
                  currentPhase === phase ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full mb-1 transition-all ${
                    currentPhase === phase
                      ? 'scale-125 ring-4 ring-offset-2'
                      : ''
                  }`}
                  style={{
                    backgroundColor: vibe.color,
                    ringColor: `${vibe.color}30`
                  }}
                />
                <p className="text-xs font-medium capitalize">{phase}</p>
                <p className="text-xs text-charcoal-500">
                  {phaseData[phase].duration} min
                </p>
              </div>
            ))}
          </div>

          {/* Phase progress bar */}
          <div className="h-1.5 bg-charcoal-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: vibe.color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Current Phase Info */}
        <motion.div
          className="glass-card rounded-2xl p-5 w-full max-w-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${vibe.color}20` }}
            >
              <span className="text-xl">{vibe.emoji}</span>
            </div>
            <div>
              <p className="text-sm text-charcoal-500 uppercase tracking-wide">
                {currentPhase} phase
              </p>
              <p className="font-display text-lg text-charcoal-900">
                {phaseData[currentPhase].bpm} BPM
              </p>
            </div>
          </div>
          <p className="text-charcoal-600 text-sm leading-relaxed">
            {phaseData[currentPhase].description}
          </p>
        </motion.div>

        {/* Playback Controls */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: vibe.color }}
          >
            {isPlaying ? (
              <Pause size={28} className="text-white" />
            ) : (
              <Play size={28} className="text-white ml-1" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Bottom Prompts */}
      <div className="px-6 pb-8">
        <div className="flex gap-3">
          <button className="flex-1 glass-card rounded-xl p-4 flex items-center gap-3 text-left hover:bg-white/80 transition-colors">
            <Music size={20} className="text-forest-500" />
            <div>
              <p className="text-sm font-medium text-charcoal-900">Music Prompt</p>
              <p className="text-xs text-charcoal-500">Open in Spotify</p>
            </div>
          </button>
          <button className="flex-1 glass-card rounded-xl p-4 flex items-center gap-3 text-left hover:bg-white/80 transition-colors">
            <Wind size={20} className="text-sage-500" />
            <div>
              <p className="text-sm font-medium text-charcoal-900">Aromatherapy</p>
              <p className="text-xs text-charcoal-500">{strain.oils?.[0] || 'View pairings'}</p>
            </div>
          </button>
        </div>
      </div>

      {/* End Session Confirmation */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
            onClick={() => setShowEndConfirm(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 safe-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl text-charcoal-900 mb-2">
                End Session?
              </h3>
              <p className="text-charcoal-600 mb-6">
                You've been in session for {formatTime(elapsedSeconds)}. Are you sure you want to end early?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEndConfirm(false)}
                  className="flex-1 btn-secondary"
                >
                  Continue
                </button>
                <button
                  onClick={handleEndSession}
                  className="flex-1 btn-primary"
                >
                  End Session
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SessionPage;

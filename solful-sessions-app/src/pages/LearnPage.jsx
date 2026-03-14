import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Leaf,
  Music,
  Wind,
  Brain,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const learnContent = [
  {
    id: 'terpenes',
    icon: Leaf,
    title: 'Understanding Terpenes',
    preview: 'The aromatic compounds that shape your experience',
    color: '#6b8e5b',
    content: {
      intro: 'Terpenes are the aromatic compounds found in cannabis that give each strain its unique scent and significantly influence its effects. They work synergistically with cannabinoids in what\'s known as the "entourage effect."',
      sections: [
        {
          title: 'Major Terpenes',
          items: [
            { name: 'Myrcene', description: 'Earthy, musky. Promotes relaxation and sedation. Found in mangoes and lemongrass.' },
            { name: 'Limonene', description: 'Citrus, bright. Elevates mood and reduces stress. Found in citrus peels.' },
            { name: 'Caryophyllene', description: 'Spicy, peppery. Anti-inflammatory and calming. Found in black pepper.' },
            { name: 'Pinene', description: 'Pine, fresh. Promotes alertness and memory. Found in pine needles.' },
            { name: 'Linalool', description: 'Floral, lavender. Calming and anti-anxiety. Found in lavender.' },
          ]
        }
      ]
    }
  },
  {
    id: 'iso-principle',
    icon: Music,
    title: 'The Iso Principle',
    preview: 'How music therapy enhances your session',
    color: '#5C7B8A',
    content: {
      intro: 'The Iso Principle is a foundational concept in music therapy that guides how we design your sonic journey. It suggests that the most effective way to shift your emotional state is to first match it, then gradually guide it toward your desired destination.',
      sections: [
        {
          title: 'How It Works',
          items: [
            { name: 'Onset Phase', description: 'Music matches your current state, creating resonance and trust.' },
            { name: 'Peak Phase', description: 'Tempo and energy gradually shift toward your goal state.' },
            { name: 'Descent Phase', description: 'Gentle landing that integrates the experience.' },
          ]
        }
      ]
    }
  },
  {
    id: 'aromatherapy',
    icon: Wind,
    title: 'Terpene Amplification',
    preview: 'Using aromatherapy to enhance effects',
    color: '#87A878',
    content: {
      intro: 'The Terpene Amplification Protocol uses matching essential oils diffused before your session to prime your olfactory system and potentially enhance the effects of the terpenes in your cannabis.',
      sections: [
        {
          title: 'The Protocol',
          items: [
            { name: 'Timing', description: 'Begin diffusing 30 minutes before consumption for optimal priming.' },
            { name: 'Matching', description: 'We pair essential oils that share terpenes with your chosen strain.' },
            { name: 'Layering', description: 'Multiple complementary oils create a cohesive aromatic experience.' },
          ]
        },
        {
          title: 'Common Pairings',
          items: [
            { name: 'Relaxation', description: 'Lavender, chamomile, and bergamot for calming strains.' },
            { name: 'Energy', description: 'Grapefruit, peppermint, and rosemary for uplifting strains.' },
            { name: 'Focus', description: 'Eucalyptus, lemon, and frankincense for clear-headed strains.' },
          ]
        }
      ]
    }
  },
  {
    id: 'crossmodal',
    icon: Brain,
    title: 'Crossmodal Design',
    preview: 'The science of multi-sensory experiences',
    color: '#C4A962',
    content: {
      intro: 'Crossmodal perception is how our brain integrates information from multiple senses to create a unified experience. Solful Sessions leverages this by coordinating sound, scent, and the cannabis experience itself.',
      sections: [
        {
          title: 'Key Principles',
          items: [
            { name: 'Congruence', description: 'When sensory inputs align (matching terpenes with matching music), effects are amplified.' },
            { name: 'Temporal Coordination', description: 'Syncing the phases of music with the pharmacological timeline of cannabis.' },
            { name: 'Emotional Resonance', description: 'Designing for the emotional arc, not just the chemical one.' },
          ]
        }
      ]
    }
  },
  {
    id: 'session-design',
    icon: Sparkles,
    title: 'Designing Your Session',
    preview: 'Tips for the optimal experience',
    color: '#6B5B7A',
    content: {
      intro: 'A well-designed session considers set, setting, and substance. Here\'s how to create the optimal environment for your Solful Session.',
      sections: [
        {
          title: 'Before',
          items: [
            { name: 'Set Intention', description: 'Clarify what you\'re seeking from this experience.' },
            { name: 'Prepare Space', description: 'Dim lights, gather comfortable seating, remove distractions.' },
            { name: 'Start Aromatherapy', description: 'Begin diffusing 30 minutes before consumption.' },
          ]
        },
        {
          title: 'During',
          items: [
            { name: 'Follow the Phases', description: 'Trust the journey from onset through peak to descent.' },
            { name: 'Stay Present', description: 'Put away your phone, close your eyes, breathe deeply.' },
            { name: 'Journal If Moved', description: 'Keep a notebook nearby for insights that arise.' },
          ]
        },
        {
          title: 'After',
          items: [
            { name: 'Gentle Transition', description: 'Don\'t rush back into activity.' },
            { name: 'Hydrate', description: 'Water and herbal tea support integration.' },
            { name: 'Reflect', description: 'Note what worked well for future sessions.' },
          ]
        }
      ]
    }
  }
];

function LearnCard({ item, isExpanded, onToggle }) {
  const Icon = item.icon;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${item.color}15` }}
        >
          <Icon size={24} style={{ color: item.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-charcoal-900 mb-0.5">
            {item.title}
          </h3>
          <p className="text-sm text-charcoal-500 truncate">
            {item.preview}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-charcoal-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-charcoal-100">
              <p className="text-charcoal-700 leading-relaxed mb-6">
                {item.content.intro}
              </p>

              {item.content.sections.map((section, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <h4 className="font-medium text-charcoal-900 mb-3 flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {section.title}
                  </h4>
                  <div className="space-y-3">
                    {section.items.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="pl-4 border-l-2 border-charcoal-100"
                      >
                        <p className="font-medium text-sm text-charcoal-800">
                          {subItem.name}
                        </p>
                        <p className="text-sm text-charcoal-600">
                          {subItem.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LearnPage() {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
          <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
            <BookOpen size={24} className="text-gold-600" />
          </div>
          <div>
            <h1 className="font-display text-display-sm text-charcoal-900">
              Learn
            </h1>
            <p className="text-charcoal-600">
              The science behind the experience
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 space-y-3">
        {learnContent.map((item) => (
          <LearnCard
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </motion.div>
  );
}

export default LearnPage;

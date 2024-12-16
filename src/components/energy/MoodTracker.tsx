import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Heart, ThumbsUp, ThumbsDown, Coffee, Brain, Zap } from 'lucide-react';

interface Mood {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const MOODS: Mood[] = [
  {
    value: 'great',
    label: 'Great',
    icon: <Smile className="w-6 h-6" />,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/20'
  },
  {
    value: 'good',
    label: 'Good',
    icon: <ThumbsUp className="w-6 h-6" />,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
  },
  {
    value: 'okay',
    label: 'Okay',
    icon: <Meh className="w-6 h-6" />,
    color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
  },
  {
    value: 'tired',
    label: 'Tired',
    icon: <Coffee className="w-6 h-6" />,
    color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
  },
  {
    value: 'stressed',
    label: 'Stressed',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20'
  },
  {
    value: 'low',
    label: 'Low',
    icon: <Frown className="w-6 h-6" />,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/20'
  }
];

interface MoodTrackerProps {
  onMoodSelect: (mood: string) => void;
  selectedMood?: string;
  compact?: boolean;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({
  onMoodSelect,
  selectedMood,
  compact
}) => {
  return (
    <div className={compact ? "space-y-2" : "space-y-4"}>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
        How are you feeling?
      </h3>
      <div className={`grid ${compact ? 'grid-cols-3' : 'grid-cols-3 md:grid-cols-6'} gap-2`}>
        {MOODS.map((mood) => (
          <motion.button
            key={mood.value}
            onClick={() => onMoodSelect(mood.value)}
            className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${
              selectedMood === mood.value
                ? `${mood.color} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-${mood.color.split(' ')[0]}`
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={selectedMood === mood.value ? '' : mood.color.split(' ')[0]}>
              {mood.icon}
            </div>
            <span className="text-xs font-medium">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}; 
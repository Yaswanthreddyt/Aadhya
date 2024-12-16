import React from 'react';
import { Smile, Meh, Frown, AlertCircle, Coffee } from 'lucide-react';
import type { Mood } from '../../types';

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  const moods: { type: Mood; icon: React.FC; label: string }[] = [
    { type: 'happy', icon: Smile, label: 'Happy' },
    { type: 'neutral', icon: Meh, label: 'Neutral' },
    { type: 'sad', icon: Frown, label: 'Sad' },
    { type: 'anxious', icon: AlertCircle, label: 'Anxious' },
    { type: 'tired', icon: Coffee, label: 'Tired' },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {moods.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
            value === type 
              ? 'bg-primary-100 text-primary-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Icon className="w-8 h-8 mb-1" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};
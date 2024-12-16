import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import type { MoodLog } from '../../types';

interface MoodTrackerProps {
  onMoodSelect: (mood: MoodLog['mood']) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">How are you feeling?</h3>
      <div className="flex justify-around">
        <button
          onClick={() => onMoodSelect('happy')}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-colors"
        >
          <Smile className="w-8 h-8 text-green-500" />
          <span className="text-sm mt-2">Happy</span>
        </button>
        <button
          onClick={() => onMoodSelect('neutral')}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-yellow-50 transition-colors"
        >
          <Meh className="w-8 h-8 text-yellow-500" />
          <span className="text-sm mt-2">Neutral</span>
        </button>
        <button
          onClick={() => onMoodSelect('stressed')}
          className="flex flex-col items-center p-4 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Frown className="w-8 h-8 text-red-500" />
          <span className="text-sm mt-2">Stressed</span>
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
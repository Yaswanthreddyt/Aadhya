import { useState, useEffect } from 'react';
import type { MoodLog } from '../types';

export const useMoodAnalytics = () => {
  const [moodTrend, setMoodTrend] = useState<string>('stable');
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  useEffect(() => {
    const analyzeMoodTrend = () => {
      if (moodLogs.length < 2) return 'stable';

      const recentMoods = moodLogs
        .slice(-5)
        .map(log => getMoodScore(log.mood));

      const trend = recentMoods.reduce((acc, curr, i) => {
        if (i === 0) return 0;
        return acc + (curr - recentMoods[i - 1]);
      }, 0);

      if (trend > 1) return 'positive';
      if (trend < -1) return 'negative';
      return 'stable';
    };

    setMoodTrend(analyzeMoodTrend());
  }, [moodLogs]);

  return {
    moodTrend,
    moodLogs,
    addMoodLog: (log: MoodLog) => setMoodLogs(prev => [...prev, log]),
  };
};

const getMoodScore = (mood: MoodLog['mood']): number => {
  const scores: Record<MoodLog['mood'], number> = {
    happy: 1,
    neutral: 0,
    sad: -1,
    anxious: -0.5,
    tired: -0.3,
  };
  return scores[mood];
};
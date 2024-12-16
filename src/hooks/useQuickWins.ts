import { useState, useEffect } from 'react';

const QUICK_WINS = [
  "Clear your desk of any unnecessary items",
  "Take a 2-minute stretching break",
  "Drink a glass of water",
  "Write down your next three priorities",
  "Do one small task that's been bothering you",
  "Take three deep breaths",
];

export const useQuickWins = () => {
  const [currentWin, setCurrentWin] = useState<string | null>(null);
  const [completedWins, setCompletedWins] = useState<string[]>([]);

  const suggestQuickWin = () => {
    const availableWins = QUICK_WINS.filter(win => !completedWins.includes(win));
    if (availableWins.length === 0) {
      setCompletedWins([]);
      return QUICK_WINS[Math.floor(Math.random() * QUICK_WINS.length)];
    }
    return availableWins[Math.floor(Math.random() * availableWins.length)];
  };

  useEffect(() => {
    if (!currentWin) {
      setCurrentWin(suggestQuickWin());
    }
  }, [currentWin]);

  const completeQuickWin = () => {
    if (currentWin) {
      setCompletedWins(prev => [...prev, currentWin]);
      setCurrentWin(null);
    }
  };

  return {
    currentWin,
    completeQuickWin,
    completedWins,
  };
};
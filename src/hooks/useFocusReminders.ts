import { useState, useEffect } from 'react';

const FOCUS_TIPS = [
  "Remember to take a short break every 25 minutes",
  "Stay hydrated! Have you had water recently?",
  "Quick body scan: Are you tensing any muscles?",
  "Take a deep breath and reset your posture",
  "Consider switching tasks if you're feeling stuck",
  "Time for a 2-minute stretch break?",
];

export const useFocusReminders = () => {
  const [currentReminder, setCurrentReminder] = useState<string | null>(null);
  const [lastReminderTime, setLastReminderTime] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastReminder = now - lastReminderTime;
      
      // Show reminder every 20 minutes
      if (timeSinceLastReminder >= 20 * 60 * 1000) {
        const randomTip = FOCUS_TIPS[Math.floor(Math.random() * FOCUS_TIPS.length)];
        setCurrentReminder(randomTip);
        setLastReminderTime(now);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isActive, lastReminderTime]);

  const dismissReminder = () => {
    setCurrentReminder(null);
  };

  const toggleReminders = () => {
    setIsActive(prev => !prev);
  };

  return {
    currentReminder,
    dismissReminder,
    isActive,
    toggleReminders,
  };
};
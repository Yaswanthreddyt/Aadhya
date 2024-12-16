import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell, BellOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface FocusTimerProps {
  defaultDuration?: number; // in minutes
  onComplete?: () => void;
  onBreak?: () => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  defaultDuration = 25,
  onComplete,
  onBreak,
}) => {
  const [timeLeft, setTimeLeft] = useState(defaultDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            if (soundEnabled) {
              // Play completion sound
              const audio = new Audio('/sounds/complete.mp3');
              audio.play().catch(() => {});
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete, soundEnabled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (defaultDuration * 60)) * 100;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-200 dark:text-gray-700"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-primary-500"
            strokeWidth="12"
            fill="none"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            initial={{ strokeDashoffset: 553 }}
            animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-gray-800 dark:text-white">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Focus Time
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          ) : (
            <Play className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          )}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(defaultDuration * 60);
          }}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {soundEnabled ? (
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <BellOff className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};
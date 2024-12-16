import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroTimerProps {
  workDuration?: number; // in minutes
  breakDuration?: number; // in minutes
  onComplete?: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workDuration = 25,
  breakDuration = 5,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? workDuration * 60 : breakDuration * 60);
      onComplete?.();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, workDuration, breakDuration, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (isBreak ? breakDuration * 60 : workDuration * 60)) * 100;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-200"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className={`stroke-current ${isBreak ? 'text-green-500' : 'text-purple-500'}`}
            strokeWidth="12"
            fill="none"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
          <div className="text-sm text-gray-600">{isBreak ? 'Break' : 'Focus'}</div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(workDuration * 60);
            setIsBreak(false);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
import { useState, useEffect } from 'react';
import type { TaskProgress, Task } from '../types';

export const useTaskProgress = (task: Task) => {
  const [progress, setProgress] = useState<TaskProgress>({
    taskId: task.id,
    percentComplete: 0,
    timeSpent: 0,
    lastUpdated: new Date(),
  });

  const updateProgress = (percentComplete: number) => {
    setProgress(prev => ({
      ...prev,
      percentComplete,
      lastUpdated: new Date(),
      timeSpent: prev.timeSpent + (task.estimatedDuration || 0) * (percentComplete - prev.percentComplete) / 100,
    }));
  };

  const trackTime = (minutes: number) => {
    setProgress(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + minutes,
      lastUpdated: new Date(),
    }));
  };

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      // In a real app, this would save to backend
      console.log('Saving progress:', progress);
    };

    const interval = setInterval(saveProgress, 60000); // Save every minute
    return () => clearInterval(interval);
  }, [progress]);

  return {
    progress,
    updateProgress,
    trackTime,
  };
};
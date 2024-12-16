import { useState, useEffect } from 'react';
import type { TaskAnalytics, Task } from '../types';

export const useTaskAnalytics = (tasks: Task[]) => {
  const [analytics, setAnalytics] = useState<TaskAnalytics>({
    completionRate: 0,
    averageTimeToComplete: 0,
    mostProductiveTimeOfDay: '',
    commonBlockers: [],
  });

  useEffect(() => {
    const calculateAnalytics = () => {
      const completedTasks = tasks.filter(task => task.completed);
      const completionRate = tasks.length > 0 
        ? (completedTasks.length / tasks.length) * 100 
        : 0;

      const tasksWithDuration = completedTasks.filter(task => 
        task.actualDuration && task.estimatedDuration
      );
      
      const avgTime = tasksWithDuration.length > 0
        ? tasksWithDuration.reduce((acc, task) => 
            acc + (task.actualDuration || 0), 0) / tasksWithDuration.length
        : 0;

      // Group tasks by completion hour to find most productive time
      const completionHours = completedTasks
        .filter(task => task.completedAt)
        .map(task => new Date(task.completedAt!).getHours());

      const hourCounts = completionHours.reduce((acc, hour) => {
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      const mostProductiveHour = Object.entries(hourCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0];

      const productiveTime = mostProductiveHour 
        ? `${mostProductiveHour}:00 - ${(parseInt(mostProductiveHour) + 1).toString().padStart(2, '0')}:00`
        : 'Not enough data';

      setAnalytics({
        completionRate: Math.round(completionRate),
        averageTimeToComplete: Math.round(avgTime),
        mostProductiveTimeOfDay: productiveTime,
        commonBlockers: ['Distractions', 'Low energy', 'Unclear requirements'],
      });
    };

    calculateAnalytics();
  }, [tasks]);

  return analytics;
};
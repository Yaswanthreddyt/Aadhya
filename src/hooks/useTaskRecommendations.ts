import { useState, useEffect } from 'react';
import type { Task, EnergyLevel, TaskRecommendation } from '../types';

export const useTaskRecommendations = (
  tasks: Task[],
  currentEnergy: EnergyLevel
) => {
  const [recommendations, setRecommendations] = useState<TaskRecommendation[]>([]);

  useEffect(() => {
    const generateRecommendations = () => {
      const incompleteTasks = tasks.filter(task => !task.completed);
      
      const recommendations = incompleteTasks.map(task => {
        let confidence = 0.5; // Base confidence
        let reason = '';

        // Adjust confidence based on energy level match
        if (task.energyLevel === currentEnergy) {
          confidence += 0.3;
          reason = `This task matches your current energy level (${currentEnergy})`;
        } else if (
          (currentEnergy === 'high' && task.energyLevel === 'low') ||
          (currentEnergy === 'low' && task.energyLevel === 'high')
        ) {
          confidence -= 0.2;
          reason = `This task might be challenging with your current energy level`;
        }

        // Adjust for priority
        if (task.priority === 'high') {
          confidence += 0.2;
          reason += reason ? ' and ' : '';
          reason += 'is high priority';
        }

        // Adjust for deadline if exists
        if (task.deadline) {
          const daysUntilDue = Math.ceil(
            (task.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );
          if (daysUntilDue <= 1) {
            confidence += 0.3;
            reason += reason ? ' and ' : '';
            reason += 'is due soon';
          }
        }

        return {
          taskId: task.id,
          confidence: Math.min(Math.max(confidence, 0), 1), // Clamp between 0 and 1
          reason: reason || 'Based on your current state and task properties',
        };
      });

      setRecommendations(recommendations.sort((a, b) => b.confidence - a.confidence));
    };

    generateRecommendations();
  }, [tasks, currentEnergy]);

  return recommendations;
};
import { useState, useEffect } from 'react';
import type { Task } from '../types';

interface TaskRecommendation {
  taskId: string;
  suggestion: string;
  confidence: number;
  reason: string;
}

export const useAIRecommendations = (tasks: Task[], userEnergy: 'low' | 'medium' | 'high') => {
  const [recommendations, setRecommendations] = useState<TaskRecommendation[]>([]);

  useEffect(() => {
    const generateRecommendations = () => {
      const incompleteTasks = tasks.filter(task => !task.completed);
      
      const recommendations = incompleteTasks.map(task => {
        // Simulate AI-based task recommendations
        const confidence = Math.random(); // In real app, this would be ML-based
        
        let suggestion = '';
        let reason = '';

        if (userEnergy === 'low' && task.energyLevel === 'high') {
          suggestion = 'Consider postponing this high-energy task';
          reason = 'Your current energy levels are low';
        } else if (userEnergy === 'high' && task.priority === 'high') {
          suggestion = 'Good time to tackle this important task';
          reason = 'You have high energy for this priority task';
        } else {
          suggestion = 'This task matches your current state';
          reason = 'Balanced energy and priority levels';
        }

        return {
          taskId: task.id,
          suggestion,
          confidence,
          reason,
        };
      });

      setRecommendations(recommendations.sort((a, b) => b.confidence - a.confidence));
    };

    generateRecommendations();
  }, [tasks, userEnergy]);

  return recommendations;
};
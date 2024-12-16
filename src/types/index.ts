// Existing types...

export type Priority = 'high' | 'medium' | 'low';
export type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'tired';
export type EnergyLevel = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  energyLevel: EnergyLevel;
  completed: boolean;
  createdAt: Date;
  deadline?: Date;
  category: string;
  completedAt?: Date;
  estimatedDuration?: number;
  actualDuration?: number;
}

export interface MoodLog {
  timestamp: Date;
  mood: Mood;
  notes?: string;
}

export interface EnergyLog {
  timestamp: Date;
  level: EnergyLevel;
  notes?: string;
}

export interface TaskRecommendation {
  taskId: string;
  confidence: number;
  reason: string;
}

export interface Analytics {
  taskCompletion: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  focusTime: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  productivity: {
    score: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  patterns: {
    peakHours: string[];
    commonBlockers: string[];
    successfulStrategies: string[];
  };
}
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  description?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  energyLevel?: 'low' | 'medium' | 'high';
  deadline?: Date;
  preferredCompletionTime?: Date;
} 
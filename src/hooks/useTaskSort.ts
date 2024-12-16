import { useState } from 'react';
import type { Task } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial tasks with proper type checking
const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'Complete project presentation',
    description: 'Prepare slides for the team meeting',
    category: 'work',
    priority: 'high',
    energyLevel: 'high',
    completed: false,
    createdAt: new Date(),
    deadline: new Date(Date.now() + 86400000),
  },
];

export const useTaskSort = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const sortTasks = (tasksToSort: Task[]): Task[] => {
    return [...tasksToSort].sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Finally by deadline if available
      if (a.deadline && b.deadline) {
        return a.deadline.getTime() - b.deadline.getTime();
      }

      return 0;
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks: sortTasks(tasks),
    handleDragEnd,
    addTask,
    updateTask,
    deleteTask,
  };
};
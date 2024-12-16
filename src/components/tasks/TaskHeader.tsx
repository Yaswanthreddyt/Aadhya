import React from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskHeaderProps {
  onAddTask: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ onAddTask }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
      <button
        onClick={onAddTask}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 transition-all"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Add Task</span>
      </button>
    </div>
  );
};
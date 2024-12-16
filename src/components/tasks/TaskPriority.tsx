import React from 'react';
import { Flag } from 'lucide-react';
import type { Priority } from '../../types';

interface TaskPriorityProps {
  priority: Priority;
  onChange?: (priority: Priority) => void;
  readonly?: boolean;
}

export const TaskPriority: React.FC<TaskPriorityProps> = ({ 
  priority, 
  onChange,
  readonly = false 
}) => {
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
    }
  };

  if (readonly) {
    return (
      <div className={`flex items-center px-2 py-1 rounded-lg ${getPriorityColor(priority)}`}>
        <Flag className="w-4 h-4 mr-1" />
        <span className="text-sm capitalize">{priority}</span>
      </div>
    );
  }

  return (
    <select 
      value={priority}
      onChange={(e) => onChange?.(e.target.value as Priority)}
      className={`px-2 py-1 rounded-lg border-none ${getPriorityColor(priority)}`}
    >
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  );
};
import React from 'react';

interface TaskProgressProps {
  estimatedDuration: number;
  actualDuration?: number;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ 
  estimatedDuration, 
  actualDuration 
}) => {
  const progress = actualDuration 
    ? Math.min((actualDuration / estimatedDuration) * 100, 100) 
    : 0;

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{actualDuration || 0} min</span>
        <span>{estimatedDuration} min</span>
      </div>
    </div>
  );
};

export default TaskProgress;
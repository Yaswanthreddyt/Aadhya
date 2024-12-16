import React from 'react';
import { ListTodo } from 'lucide-react';

export const EmptyTaskList: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
      <ListTodo className="w-16 h-16 mb-4 opacity-50" />
      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
      <p className="text-sm">Create your first task to get started</p>
    </div>
  );
};
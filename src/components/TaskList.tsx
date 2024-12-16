import React, { useState } from 'react';
import { CheckCircle2, Circle, Flag } from 'lucide-react';
import type { Task } from '../types';

const TaskList = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project presentation',
      description: 'Prepare slides for the team meeting',
      category: 'work',
      priority: 'high',
      energyLevel: 'high',
      completed: false,
      createdAt: new Date(),
      deadline: new Date(Date.now() + 86400000),
    },
    // Add more sample tasks
  ]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Today's Tasks</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <button className="flex-shrink-0">
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            
            <div className="flex-grow">
              <h3 className="font-medium">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
              )}
            </div>

            <Flag className={`w-5 h-5 ${getPriorityColor(task.priority)}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
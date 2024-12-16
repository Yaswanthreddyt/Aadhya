import React, { useState } from 'react';
import { Task } from '../../types/task';
import { Trash2, Edit2, Check, X, Calendar, Clock, Battery, Tag } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    onUpdate({ title: editedTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'low':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate({ completed: !task.completed })}
          className="w-5 h-5 rounded-lg border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
        />
        
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-0 px-2 py-1"
              autoFocus
            />
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <span className={`block font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)} bg-opacity-10`}>
                  {task.priority}
                </span>
              </div>
              
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                {task.deadline && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-red-500 dark:text-red-400" />
                    <span>Due: {new Date(task.deadline).toLocaleDateString()} at {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                {task.preferredCompletionTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
                    <span>Planned: {new Date(task.preferredCompletionTime).toLocaleDateString()} at {new Date(task.preferredCompletionTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                {task.category && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span className="capitalize">{task.category}</span>
                  </div>
                )}
                {task.energyLevel && (
                  <div className="flex items-center gap-1">
                    <Battery className="w-4 h-4" />
                    <span className="capitalize">{task.energyLevel}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
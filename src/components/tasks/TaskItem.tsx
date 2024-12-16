import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../../types/task';
import { TaskFeedbackModal } from './TaskFeedbackModal';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (task.duration && !task.completed) {
      const endTime = new Date(task.createdAt).getTime() + task.duration * 60000;
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = endTime - now;
        
        if (remaining <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
          setShowFeedback(true);
        } else {
          setTimeLeft(Math.floor(remaining / 60000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [task]);

  const handleComplete = () => {
    onUpdate(task.id, { completed: true });
    setShowFeedback(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${
          task.completed ? 'opacity-75' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-medium ${
              task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            )}
            {timeLeft !== null && !task.completed && (
              <div className="flex items-center space-x-2 mt-2">
                <Clock className="w-4 h-4 text-teal-500" />
                <span className="text-sm text-teal-600">
                  {timeLeft > 0 ? `${timeLeft} minutes remaining` : 'Time to reflect!'}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!task.completed && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleComplete}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-teal-500" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <TaskFeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        taskName={task.title}
        taskDuration={task.duration || 0}
        taskType={task.type || 'general'}
      />
    </>
  );
};
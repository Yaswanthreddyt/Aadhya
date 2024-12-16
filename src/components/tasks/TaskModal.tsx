import React, { useState } from 'react';
import { X, Calendar, Clock, AlarmClock } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  const validateDates = (deadlineDate: Date, preferredDate: Date) => {
    const now = new Date();
    
    if (deadlineDate < now) {
      throw new Error('Deadline cannot be in the past');
    }
    
    if (preferredDate < now) {
      throw new Error('Planned completion time cannot be in the past');
    }
    
    if (preferredDate > deadlineDate) {
      throw new Error('Planned completion time cannot be after the deadline');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const deadlineDateTime = new Date(`${deadline}T${deadlineTime || '23:59'}`);
      const preferredDateTime = new Date(`${preferredDate}T${preferredTime || '23:59'}`);
      
      validateDates(deadlineDateTime, preferredDateTime);
      
      onSave({
        title,
        deadline: deadlineDateTime,
        preferredCompletionTime: preferredDateTime,
        completed,
        description: '',
        category: 'personal',
        priority: 'medium',
        energyLevel: 'medium',
      });

      // Reset form
      setTitle('');
      setDeadline('');
      setDeadlineTime('');
      setPreferredDate('');
      setPreferredTime('');
      setCompleted(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid dates');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              required
              autoFocus
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Final Deadline
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="deadline" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="deadline"
                      value={deadline}
                      min={today}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="deadlineTime" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="deadlineTime"
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <AlarmClock className="w-4 h-4 mr-1" />
                When do you plan to complete it?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="preferredDate"
                      value={preferredDate}
                      min={today}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white dark:text-gray-900 bg-gray-900 dark:bg-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 
import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusReminderProps {
  message: string;
  onDismiss: () => void;
}

export const FocusReminder: React.FC<FocusReminderProps> = ({ message, onDismiss }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
            <div className="mt-2 flex justify-end">
              <button
                onClick={onDismiss}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Got it
              </button>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
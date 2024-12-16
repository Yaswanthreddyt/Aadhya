import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickWinProps {
  message: string;
  onComplete: () => void;
}

export const QuickWin: React.FC<QuickWinProps> = ({ message, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-4 rounded-lg shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
          <button
            onClick={onComplete}
            className="mt-2 flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Mark as done
          </button>
        </div>
      </div>
    </motion.div>
  );
};
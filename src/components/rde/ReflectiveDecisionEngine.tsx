import React from 'react';
import { Brain, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReflectiveEngine } from '../../hooks/useReflectiveEngine';
import { TaskSuggestion } from './TaskSuggestion';

export const ReflectiveDecisionEngine: React.FC = () => {
  const { suggestions, generateSuggestions, isLoading } = useReflectiveEngine();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold">Reflective Guide</h3>
        </div>
        <button
          onClick={generateSuggestions}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
          disabled={isLoading}
        >
          <Lightbulb className="w-5 h-5" />
          <span>Need Guidance</span>
        </button>
      </div>

      <AnimatePresence>
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.taskId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            <TaskSuggestion suggestion={suggestion} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
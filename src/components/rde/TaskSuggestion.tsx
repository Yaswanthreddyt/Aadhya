import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { TaskRecommendation } from '../../types';

interface TaskSuggestionProps {
  suggestion: TaskRecommendation;
}

export const TaskSuggestion: React.FC<TaskSuggestionProps> = ({ suggestion }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getConfidenceColor(suggestion.confidence)}`}>
              {Math.round(suggestion.confidence * 100)}% Match
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{suggestion.reason}</p>
        </div>
        <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700">
          <span className="text-sm">Start Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
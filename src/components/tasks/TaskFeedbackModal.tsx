import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown, Smile, Frown, Brain, Heart } from 'lucide-react';
import { analyzeReflection } from '../../utils/reflection-engine';

interface TaskFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
  taskDuration: number;
  taskType: string;
}

const emotions = [
  { id: 'anxious', label: 'Anxious', icon: Heart },
  { id: 'overwhelmed', label: 'Overwhelmed', icon: Brain },
  { id: 'distracted', label: 'Distracted', icon: X },
  { id: 'confident', label: 'Confident', icon: Smile },
];

export const TaskFeedbackModal: React.FC<TaskFeedbackModalProps> = ({
  isOpen,
  onClose,
  taskName,
  taskDuration,
  taskType,
}) => {
  const [outcome, setOutcome] = useState<'positive' | 'negative' | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [guidance, setGuidance] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const handleEmotionToggle = (emotionId: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotionId)
        ? prev.filter(e => e !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleSubmit = () => {
    if (!outcome || selectedEmotions.length === 0) return;

    const reflection = {
      taskType,
      outcome,
      emotions: selectedEmotions,
      timeOfDay: new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      duration: taskDuration,
      energy: outcome === 'positive' ? 8 : 4,
    };

    const reflectionGuidance = analyzeReflection(reflection);
    setGuidance(reflectionGuidance);
    setStep(3);
  };

  const resetAndClose = () => {
    setOutcome(null);
    setSelectedEmotions([]);
    setGuidance([]);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {step === 3 ? 'Reflection Insights' : 'How did it go?'}
              </h3>
              <button
                onClick={resetAndClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            {step === 1 && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Your {taskName} is complete! How do you feel it went?
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOutcome('positive');
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl flex flex-col items-center space-y-2 ${
                      outcome === 'positive'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsUp className="w-8 h-8" />
                    <span>Great!</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOutcome('negative');
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl flex flex-col items-center space-y-2 ${
                      outcome === 'negative'
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <ThumbsDown className="w-8 h-8" />
                    <span>Could be better</span>
                  </motion.button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400">
                  What emotions did you experience during the {taskName}?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {emotions.map(emotion => (
                    <motion.button
                      key={emotion.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEmotionToggle(emotion.id)}
                      className={`p-3 rounded-xl flex items-center space-x-2 ${
                        selectedEmotions.includes(emotion.id)
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <emotion.icon className="w-5 h-5" />
                      <span>{emotion.label}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={selectedEmotions.length === 0}
                  className="w-full py-3 px-4 rounded-xl bg-teal-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </motion.button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {guidance.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                    >
                      <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetAndClose}
                  className="w-full py-3 px-4 rounded-xl bg-teal-500 text-white"
                >
                  Done
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 
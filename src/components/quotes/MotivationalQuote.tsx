import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { ADHD_QUOTES, Quote as QuoteType } from '../../data/quotes';

interface MotivationalQuoteProps {
  onComplete: () => void;
}

export const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ onComplete }) => {
  const randomQuote = React.useMemo((): QuoteType => 
    ADHD_QUOTES[Math.floor(Math.random() * ADHD_QUOTES.length)],
    []
  );

  React.useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FBFBFD] dark:bg-gray-900 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl mx-auto p-8"
      >
        <div className="relative">
          <Quote className="w-12 h-12 text-indigo-500/20 absolute -top-6 -left-6" />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
              "{randomQuote.text}"
            </p>
            <div className="mt-6 flex flex-col items-center space-y-1">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {randomQuote.author}
              </p>
              {randomQuote.role && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {randomQuote.role}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 rounded-full bg-indigo-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: dot * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 
import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#FBFBFD] dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="mb-8"
        >
          <Logo className="w-24 h-24" />
        </motion.div>
        
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full bg-indigo-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2
              }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-gray-600 dark:text-gray-400"
        >
          Loading your workspace...
        </motion.p>
      </div>
    </div>
  );
}; 
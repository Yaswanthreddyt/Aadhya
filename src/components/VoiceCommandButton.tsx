import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceCommandButtonProps {
  isListening: boolean;
  onClick: () => void;
  transcript?: string;
}

export const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({
  isListening,
  onClick,
  transcript
}) => {
  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        className={`p-2 rounded-full transition-colors ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap"
          >
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 
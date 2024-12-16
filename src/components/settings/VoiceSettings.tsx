import React, { useState } from 'react';
import { useVoice } from '../../contexts/VoiceContext';
import { motion } from 'framer-motion';
import { Volume2, Mic2 } from 'lucide-react';

export const VoiceSettings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { availableVoices, settings, updateSettings } = useVoice();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testVoice = () => {
    try {
      setIsLoading(true);
      setError(null);
      const utterance = new SpeechSynthesisUtterance("Hello! How does my voice sound?");
      utterance.voice = settings.voice;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      
      utterance.onend = () => {
        setIsLoading(false);
      };
      
      utterance.onerror = (event) => {
        setError('Error testing voice. Please try again.');
        setIsLoading(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      setError('Failed to test voice. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Voice Settings</h2>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Voice
            </label>
            <select
              value={settings.voice?.name || ''}
              onChange={(e) => {
                const voice = availableVoices.find(v => v.name === e.target.value) || null;
                updateSettings({ voice });
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Rate Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Speed: {settings.rate}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Pitch Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pitch: {settings.pitch}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Volume Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume: {Math.round(settings.volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Test and Save Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              onClick={testVoice}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg flex items-center ${
                isLoading 
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              } text-gray-900 dark:text-white transition-colors`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Mic2 className="w-5 h-5" />
              )}
              <span className="ml-2">{isLoading ? 'Testing...' : 'Test Voice'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900"
            >
              Save Settings
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 
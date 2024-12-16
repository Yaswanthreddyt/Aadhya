import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface VoiceSettings {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

interface VoiceContextType {
  availableVoices: SpeechSynthesisVoice[];
  settings: VoiceSettings;
  updateSettings: (settings: Partial<VoiceSettings>) => void;
  isSupported: boolean;
}

const VoiceContext = createContext<VoiceContextType>({
  availableVoices: [],
  settings: {
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1
  },
  updateSettings: () => null,
  isSupported: false
});

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState<VoiceSettings>({
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            setAvailableVoices(voices);
            // Set default to first female voice, or first available voice
            const defaultVoice = voices.find(voice => voice.name.includes('Female')) || voices[0];
            setSettings(prev => ({ ...prev, voice: defaultVoice }));
          }
        } catch (error) {
          console.error('Error loading voices:', error);
        }
      };

      // Load voices immediately if available
      loadVoices();

      // Also listen for voices to be loaded
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <VoiceContext.Provider value={{ availableVoices, settings, updateSettings, isSupported }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext); 
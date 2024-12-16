import { useState, useEffect, useCallback, useRef } from 'react';
import { useVoice } from '../contexts/VoiceContext';

interface VoiceCommandsProps {
  onAddTask?: () => void;
  onStartFocus?: () => void;
  onToggleTheme?: () => void;
  onSwitchTab?: (tab: string) => void;
}

type SpeechRecognition = any;

const RESPONSES = {
  greetings: [
    "Hi there! How can I help you?",
    "Hello! Ready to assist you.",
    "Hey! What can I do for you today?"
  ],
  success: [
    "Done! Anything else?",
    "Got it! What's next?",
    "Consider it done!"
  ],
  addTask: [
    "Adding a new task for you.",
    "I'll create that task right away.",
    "New task coming up!"
  ],
  focus: [
    "Starting focus mode. Let's get some work done!",
    "Time to focus. I'll help you stay on track.",
    "Entering focus mode. You've got this!"
  ],
  theme: [
    "Changing the theme for you.",
    "Switching to a new look.",
    "Theme updated! How's that?"
  ],
  error: [
    "I didn't catch that. Could you try again?",
    "Sorry, I'm not sure what you mean. Can you rephrase that?",
    "I didn't understand. What would you like me to do?"
  ]
};

export const useVoiceCommands = ({
  onAddTask,
  onStartFocus,
  onToggleTheme,
  onSwitchTab,
}: VoiceCommandsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { settings, isSupported } = useVoice();

  const speak = useCallback((responses: string[]) => {
    if (!isSupported) {
      console.error('Speech synthesis not supported');
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = responses[Math.floor(Math.random() * responses.length)];
      utterance.voice = settings.voice;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to speak:', err);
    }
  }, [settings, isSupported]);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    let commandExecuted = false;

    const commands = [
      { 
        trigger: ['add task', 'new task', 'create task'], 
        action: onAddTask,
        response: RESPONSES.addTask
      },
      { 
        trigger: ['start focus', 'focus mode', 'begin focus'], 
        action: onStartFocus,
        response: RESPONSES.focus
      },
      { 
        trigger: ['switch theme', 'toggle theme', 'change theme'], 
        action: onToggleTheme,
        response: RESPONSES.theme
      },
      { 
        trigger: ['show tasks', 'go to tasks', 'open tasks'], 
        action: () => onSwitchTab?.('tasks'),
        response: ["Showing your tasks."]
      },
      { 
        trigger: ['show insights', 'go to insights', 'open insights'], 
        action: () => onSwitchTab?.('insights'),
        response: ["Here are your insights."]
      },
      { 
        trigger: ['show energy', 'go to energy', 'open energy'], 
        action: () => onSwitchTab?.('energy'),
        response: ["Opening energy tracker."]
      },
      {
        trigger: ['hello', 'hi', 'hey'],
        action: () => null,
        response: RESPONSES.greetings
      }
    ];

    for (const { trigger, action, response } of commands) {
      if (trigger.some(t => lowerCommand.includes(t))) {
        action?.();
        speak(response);
        commandExecuted = true;
        break;
      }
    }

    if (!commandExecuted) {
      speak(RESPONSES.error);
      setError('Command not recognized. Please try again.');
    }
  }, [onAddTask, onStartFocus, onToggleTheme, onSwitchTab, speak]);

  // Initialize voices when component mounts
  useEffect(() => {
    const initVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = initVoices;
      initVoices();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const startListening = useCallback(() => {
    try {
      if (!('webkitSpeechRecognition' in window)) {
        throw new Error('Speech recognition is not supported in this browser');
      }

      if (isListening) {
        recognitionRef.current?.stop();
        return;
      }

      const recognition = new (window as any).webkitSpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        speak(["I'm listening. How can I help?"]);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processCommand(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsListening(false);
    }
  }, [isListening, processCommand, speak]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening: () => {
      recognitionRef.current?.stop();
      speak(["Goodbye for now!"]);
    }
  };
}; 
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAIResponse, getSuggestedQuestions, getAvailableTags } from '../../utils/ai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatProps {
  apiKey?: string;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  content: "Hi! I'm Aadhya, your ADHD support assistant. I'm here to help you with focus, organization, and managing ADHD symptoms. Feel free to ask me anything about ADHD management, productivity tips, or coping strategies. What would you like to know?",
  role: 'assistant',
  timestamp: new Date(),
};

// Simulate typing effect with random delays
const simulateTyping = async (text: string): Promise<string[]> => {
  const words = text.split(' ');
  const chunks: string[] = [];
  let currentChunk = '';

  for (let i = 0; i < words.length; i++) {
    currentChunk += (i === 0 ? '' : ' ') + words[i];
    if (i % 3 === 0 || i === words.length - 1) {
      chunks.push(currentChunk);
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
    }
  }
  return chunks;
};

export const AIChat: React.FC<AIChatProps> = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const tags = getAvailableTags();
    const popularTags = ['focus', 'productivity', 'organization'];
    const questions = popularTags
      .map(tag => getSuggestedQuestions(tag))
      .flat()
      .slice(0, 6);
    setSuggestedQuestions(questions);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTypingMessage]);

  const simulateThinking = async () => {
    const thinkingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Add thinking delay
      await simulateThinking();

      const response = await generateAIResponse([...messages, userMessage]);
      
      // Create temporary message for typing effect
      const tempMessage: Message = {
        id: Date.now().toString(),
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, tempMessage]);

      // Simulate typing effect
      const chunks = await simulateTyping(response);
      for (const chunk of chunks) {
        setCurrentTypingMessage(chunk);
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Replace temporary message with final message
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: tempMessage.id,
          content: response,
          role: 'assistant',
          timestamp: new Date(),
        }
      ]);
      setCurrentTypingMessage('');

      // Update suggested questions
      const relatedQuestions = getSuggestedQuestions(userMessage.content.split(' ')[0].toLowerCase());
      if (relatedQuestions.length > 0) {
        setSuggestedQuestions(relatedQuestions);
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-teal-50 dark:bg-teal-900/20">
            <img 
              src="/aadhya-logo.png" 
              alt="Aadhya Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Aadhya</h2>
            <p className="text-sm text-teal-600 dark:text-teal-400">Your Personal Life Architect</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Ask me anything about ADHD, productivity, or coping strategies
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4"
          >
            {suggestedQuestions.map((question) => (
              <motion.button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="p-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>{question}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Message List */}
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="/aadhya-logo.png" 
                    alt="Aadhya Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.isTyping ? currentTypingMessage : message.content}
                  {message.isTyping && (
                    <span className="inline-block animate-pulse">▋</span>
                  )}
                </p>
                <span className="text-xs opacity-70 mt-2 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ADHD, focus techniques, or coping strategies..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={1}
              style={{
                minHeight: '2.5rem',
                maxHeight: '10rem',
              }}
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-xl ${
              isLoading || !input.trim()
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}; 
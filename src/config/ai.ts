export const AI_CONFIG = {
  API_URL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  HUGGINGFACE_API_KEY: import.meta.env.VITE_HUGGINGFACE_API_KEY || '',
  MAX_TOKENS: 500,
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 10,
    COOLDOWN_PERIOD: 60000, // 1 minute in milliseconds
  },
  ERROR_MESSAGES: {
    RATE_LIMIT: "I'm receiving too many questions too quickly. Please wait a moment before asking another question.",
    API_ERROR: "I'm having trouble connecting. Please try again in a moment.",
    NO_API_KEY: "I'm not properly configured yet. Please make sure you have set up your API key.",
    GENERAL_ERROR: "I encountered an unexpected error. Please try again.",
  },
  SYSTEM_PROMPT: `You are an AI assistant specialized in ADHD support, named Aadhya.`
}; 
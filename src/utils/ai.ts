import { ADHD_QA } from '../data/adhd-qa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Function to find the best matching question
const findBestMatch = (userQuestion: string): string => {
  const userWords = userQuestion.toLowerCase().split(' ');
  
  let bestMatch = {
    question: ADHD_QA[0].question,
    answer: ADHD_QA[0].answer,
    score: 0
  };

  ADHD_QA.forEach(qa => {
    const questionWords = qa.question.toLowerCase().split(' ');
    const tagWords = qa.tags.join(' ').toLowerCase().split(' ');
    let score = 0;

    // Check for word matches in question
    userWords.forEach(word => {
      if (questionWords.includes(word)) score += 2;
      if (tagWords.includes(word)) score += 1;
    });

    if (score > bestMatch.score) {
      bestMatch = {
        question: qa.question,
        answer: qa.answer,
        score
      };
    }
  });

  return bestMatch.answer;
};

export const generateAIResponse = async (messages: Message[]): Promise<string> => {
  try {
    const userMessage = messages[messages.length - 1].content;
    const answer = findBestMatch(userMessage);
    return answer || "I'm not sure about that. Could you try asking in a different way?";
  } catch (error) {
    console.error('Response Generation Error:', error);
    return "I'm having trouble understanding. Could you rephrase your question?";
  }
};

// Helper function to get suggested questions based on a tag
export const getSuggestedQuestions = (tag: string): string[] => {
  return ADHD_QA
    .filter(qa => qa.tags.includes(tag))
    .map(qa => qa.question)
    .slice(0, 3);
};

// Helper function to get all available tags
export const getAvailableTags = (): string[] => {
  const tags = new Set<string>();
  ADHD_QA.forEach(qa => {
    qa.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

export const generateTaskSuggestions = async (userContext: string): Promise<string[]> => {
  try {
    const focusQuestions = ADHD_QA.filter(qa => 
      qa.tags.includes('productivity') || qa.tags.includes('organization')
    );
    const randomQuestion = focusQuestions[Math.floor(Math.random() * focusQuestions.length)];
    return randomQuestion.answer.split('\n').map(line => line.replace(/^\d+\.\s*/, ''));
  } catch (error) {
    console.error('Task Suggestion Error:', error);
    return [];
  }
};

export const generateRoutineOptimization = async (currentRoutine: string): Promise<string> => {
  try {
    const routineQuestions = ADHD_QA.filter(qa => qa.tags.includes('routine'));
    const randomQuestion = routineQuestions[Math.floor(Math.random() * routineQuestions.length)];
    return randomQuestion.answer;
  } catch (error) {
    console.error('Routine Optimization Error:', error);
    return '';
  }
};

export const generateCopingStrategies = async (situation: string): Promise<string> => {
  try {
    const mentalHealthQuestions = ADHD_QA.filter(qa => 
      qa.tags.includes('mental-health') || qa.tags.includes('self-care')
    );
    const randomQuestion = mentalHealthQuestions[Math.floor(Math.random() * mentalHealthQuestions.length)];
    return randomQuestion.answer;
  } catch (error) {
    console.error('Coping Strategies Error:', error);
    return '';
  }
};

export const analyzeProductivity = async (productivityData: string): Promise<string> => {
  try {
    const productivityQuestions = ADHD_QA.filter(qa => qa.tags.includes('productivity'));
    const randomQuestion = productivityQuestions[Math.floor(Math.random() * productivityQuestions.length)];
    return randomQuestion.answer;
  } catch (error) {
    console.error('Productivity Analysis Error:', error);
    return '';
  }
};

export const generateFocusRecommendations = async (currentState: string): Promise<string> => {
  try {
    const focusQuestions = ADHD_QA.filter(qa => qa.tags.includes('focus'));
    const randomQuestion = focusQuestions[Math.floor(Math.random() * focusQuestions.length)];
    return randomQuestion.answer;
  } catch (error) {
    console.error('Focus Recommendations Error:', error);
    return '';
  }
}; 
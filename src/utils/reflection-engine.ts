interface TaskReflection {
  taskType: string;
  outcome: 'positive' | 'negative';
  emotions: string[];
  timeOfDay: string;
  duration: number;
  energy: number;
}

interface ReflectionPattern {
  taskType: string;
  successRate: number;
  bestTimeOfDay: string;
  optimalDuration: number;
  emotionalTriggers: {
    positive: string[];
    negative: string[];
  };
}

// Store reflection history
let reflectionHistory: TaskReflection[] = [];
let patterns: { [key: string]: ReflectionPattern } = {};

// Emotions mapped to guidance strategies
const emotionGuidance = {
  anxious: {
    positive: [
      "Your preparation paid off! Remember this feeling of success for future meetings.",
      "You handled any anxiety well. Each successful meeting builds your confidence.",
      "Great job staying focused despite the pressure. You're developing strong coping skills."
    ],
    negative: [
      "Anxiety is normal. Next time, try a 5-minute breathing exercise before the meeting.",
      "Consider breaking down the meeting into smaller, manageable parts.",
      "What if we prepared a simple outline for your next meeting?"
    ]
  },
  overwhelmed: {
    positive: [
      "You managed the complexity well! Your organizational skills are improving.",
      "See how breaking it down made it manageable? Remember this strategy!",
      "You turned overwhelm into accomplishment. That's real growth!"
    ],
    negative: [
      "Let's make the next meeting shorter or break it into parts.",
      "Would having an agenda help you feel more in control?",
      "Remember: progress over perfection. Each meeting is a learning opportunity."
    ]
  },
  distracted: {
    positive: [
      "You maintained focus when it mattered! Your strategies are working.",
      "Great job staying on track. What techniques helped you most?",
      "You're getting better at managing distractions. Keep building on this!"
    ],
    negative: [
      "Next time, try the Pomodoro technique to maintain focus.",
      "Would a different meeting environment help reduce distractions?",
      "Let's identify your peak focus hours for important meetings."
    ]
  },
  confident: {
    positive: [
      "Your confidence was well-placed! Keep building on this success.",
      "You're developing a strong meeting presence. Notice what worked well.",
      "This success reinforces your capabilities. Remember this feeling!"
    ],
    negative: [
      "Your confidence to try is valuable. Each attempt builds experience.",
      "What aspects of your preparation gave you confidence? Let's build on those.",
      "You had the courage to try. That's a kind of success too."
    ]
  }
};

export const analyzeReflection = (reflection: TaskReflection): string[] => {
  // Update reflection history
  reflectionHistory.push(reflection);
  
  // Update patterns
  if (!patterns[reflection.taskType]) {
    patterns[reflection.taskType] = {
      taskType: reflection.taskType,
      successRate: 0,
      bestTimeOfDay: '',
      optimalDuration: 0,
      emotionalTriggers: { positive: [], negative: [] }
    };
  }

  // Calculate success rate
  const typeReflections = reflectionHistory.filter(r => r.taskType === reflection.taskType);
  const successCount = typeReflections.filter(r => r.outcome === 'positive').length;
  patterns[reflection.taskType].successRate = successCount / typeReflections.length;

  // Find optimal conditions
  const successfulMeetings = typeReflections.filter(r => r.outcome === 'positive');
  if (successfulMeetings.length > 0) {
    // Find most common time of day for success
    const timeFrequency: { [key: string]: number } = {};
    successfulMeetings.forEach(r => {
      timeFrequency[r.timeOfDay] = (timeFrequency[r.timeOfDay] || 0) + 1;
    });
    patterns[reflection.taskType].bestTimeOfDay = Object.entries(timeFrequency)
      .sort((a, b) => b[1] - a[1])[0][0];

    // Calculate average optimal duration
    patterns[reflection.taskType].optimalDuration = successfulMeetings
      .reduce((sum, r) => sum + r.duration, 0) / successfulMeetings.length;
  }

  // Generate personalized guidance
  let guidance: string[] = [];
  
  if (reflection.outcome === 'positive') {
    // Add success reinforcement
    reflection.emotions.forEach(emotion => {
      if (emotionGuidance[emotion as keyof typeof emotionGuidance]?.positive) {
        guidance.push(
          emotionGuidance[emotion as keyof typeof emotionGuidance].positive[
            Math.floor(Math.random() * emotionGuidance[emotion as keyof typeof emotionGuidance].positive.length)
          ]
        );
      }
    });

    // Add pattern-based insights
    guidance.push(
      `You're most successful with ${reflection.taskType}s around ${patterns[reflection.taskType].bestTimeOfDay}. Keep utilizing this timing!`
    );
  } else {
    // Add constructive guidance
    reflection.emotions.forEach(emotion => {
      if (emotionGuidance[emotion as keyof typeof emotionGuidance]?.negative) {
        guidance.push(
          emotionGuidance[emotion as keyof typeof emotionGuidance].negative[
            Math.floor(Math.random() * emotionGuidance[emotion as keyof typeof emotionGuidance].negative.length)
          ]
        );
      }
    });

    // Add pattern-based suggestions
    if (patterns[reflection.taskType].bestTimeOfDay) {
      guidance.push(
        `Consider scheduling your next ${reflection.taskType} around ${patterns[reflection.taskType].bestTimeOfDay}, when you've had the most success.`
      );
    }
  }

  // Add general improvement suggestions
  guidance.push(
    `Your overall success rate with ${reflection.taskType}s is ${(patterns[reflection.taskType].successRate * 100).toFixed(0)}%. ${
      reflection.outcome === 'positive' ? "Keep up the great work!" : "Each attempt brings valuable learning."
    }`
  );

  return guidance;
};

export const getOptimalConditions = (taskType: string): {
  bestTimeOfDay: string;
  optimalDuration: number;
  successRate: number;
} | null => {
  if (!patterns[taskType]) return null;
  
  return {
    bestTimeOfDay: patterns[taskType].bestTimeOfDay,
    optimalDuration: patterns[taskType].optimalDuration,
    successRate: patterns[taskType].successRate
  };
}; 
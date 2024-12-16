interface FitbitData {
  steps: number;
  heartRate: number;
  sleep: number;
  activity: string;
  stress: number;
  focus: number;
}

// Simulated Fitbit data since we can't directly use Kaggle in the browser
export const FITBIT_SAMPLE_DATA: FitbitData[] = [
  { steps: 8500, heartRate: 72, sleep: 7.2, activity: 'moderate', stress: 3, focus: 7 },
  { steps: 10200, heartRate: 75, sleep: 6.8, activity: 'high', stress: 4, focus: 6 },
  { steps: 6300, heartRate: 68, sleep: 8.1, activity: 'low', stress: 2, focus: 8 },
  { steps: 9100, heartRate: 70, sleep: 7.5, activity: 'moderate', stress: 3, focus: 7 },
  { steps: 11500, heartRate: 78, sleep: 6.5, activity: 'high', stress: 5, focus: 5 },
  { steps: 7200, heartRate: 65, sleep: 7.8, activity: 'low', stress: 2, focus: 8 },
  { steps: 8800, heartRate: 71, sleep: 7.4, activity: 'moderate', stress: 3, focus: 7 }
];

export const analyzeFitbitData = () => {
  const data = FITBIT_SAMPLE_DATA;
  
  // Calculate averages
  const avgSteps = data.reduce((sum, d) => sum + d.steps, 0) / data.length;
  const avgSleep = data.reduce((sum, d) => sum + d.sleep, 0) / data.length;
  const avgFocus = data.reduce((sum, d) => sum + d.focus, 0) / data.length;
  const avgStress = data.reduce((sum, d) => sum + d.stress, 0) / data.length;

  // Find correlations
  const sleepFocusCorrelation = data.every(d => 
    (d.sleep > avgSleep && d.focus > avgFocus) || 
    (d.sleep < avgSleep && d.focus < avgFocus)
  );

  const stressFocusCorrelation = data.every(d =>
    (d.stress > avgStress && d.focus < avgFocus) ||
    (d.stress < avgStress && d.focus > avgFocus)
  );

  // Generate insights
  const insights = [
    {
      title: 'Sleep and Focus',
      description: sleepFocusCorrelation 
        ? 'Your focus levels appear to be directly related to your sleep quality. Better sleep consistently leads to improved focus.'
        : 'The relationship between your sleep and focus varies. Other factors might be influencing your focus levels.',
      recommendation: 'Try to maintain a consistent sleep schedule to optimize your focus.',
      score: avgSleep * avgFocus / 10
    },
    {
      title: 'Activity and Stress',
      description: stressFocusCorrelation
        ? 'Higher activity levels seem to help manage your stress levels effectively.'
        : 'The impact of activity on your stress levels varies. Consider tracking specific activities that help reduce stress.',
      recommendation: 'Aim for at least 8,000 steps daily to maintain optimal stress management.',
      score: (avgSteps / 10000) * 10
    },
    {
      title: 'Daily Rhythm',
      description: `Your average daily metrics:\n- Steps: ${avgSteps.toFixed(0)}\n- Sleep: ${avgSleep.toFixed(1)} hours\n- Focus: ${avgFocus.toFixed(1)}/10\n- Stress: ${avgStress.toFixed(1)}/10`,
      recommendation: 'Use these averages as benchmarks for your daily goals.',
      score: (avgFocus + (10 - avgStress)) / 2
    }
  ];

  return {
    insights,
    averages: {
      steps: avgSteps,
      sleep: avgSleep,
      focus: avgFocus,
      stress: avgStress
    }
  };
};

export const generateFocusRecommendations = (data: FitbitData[]): string[] => {
  const insights = analyzeFitbitData();
  const recommendations = [
    `Based on your data, you focus best after ${insights.averages.sleep.toFixed(1)} hours of sleep`,
    'Regular physical activity appears to improve your focus scores',
    'Lower stress levels correlate with better focus performance',
    'Consider tracking specific activities that enhance your focus',
    'Your focus tends to be better on days with moderate physical activity'
  ];
  return recommendations;
};

export const generateStressManagementTips = (data: FitbitData[]): string[] => {
  const insights = analyzeFitbitData();
  const tips = [
    `Your stress levels are lowest when you get ${insights.averages.sleep.toFixed(1)}+ hours of sleep`,
    'Physical activity helps manage your stress levels',
    'Regular sleep patterns contribute to better stress management',
    'Consider incorporating stress-reducing activities on high-stress days',
    'Monitor your heart rate as an indicator of stress levels'
  ];
  return tips;
};

export const generateProductivityInsights = (data: FitbitData[]): string[] => {
  const insights = analyzeFitbitData();
  const productivityTips = [
    `Aim for ${insights.averages.sleep.toFixed(1)} hours of sleep for optimal productivity`,
    `Target ${insights.averages.steps.toFixed(0)} daily steps to maintain energy levels`,
    'Balance activity and rest periods throughout the day',
    'Monitor your focus scores to identify peak productivity times',
    'Use stress levels as an indicator for task planning'
  ];
  return productivityTips;
}; 
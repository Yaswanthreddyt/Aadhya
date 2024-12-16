import { useState, useEffect } from 'react';
import type { Metrics, WeeklyData } from '../types';

export const useAnalytics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    peakHours: '10 AM - 12 PM',
    energyScore: 85,
    energyTrend: 'Better than last week',
    completedTasks: 12,
    totalTasks: 15
  });

  const [weeklyData, setWeeklyData] = useState<WeeklyData>([60, 45, 75, 50, 80, 65, 70]);

  // In a real application, this would fetch data from an API
  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      // This would be replaced with actual API calls
      // For now, we're using mock data
    };

    fetchAnalytics();
  }, []);

  return {
    metrics,
    weeklyData,
  };
};
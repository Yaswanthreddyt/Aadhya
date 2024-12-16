import { useState, useEffect } from 'react';
import type { DailyDigest } from '../types';

export const useDailyDigest = () => {
  const [digest, setDigest] = useState<DailyDigest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDigest = async () => {
      setIsLoading(true);
      try {
        // Simulated API call
        const mockDigest: DailyDigest = {
          date: new Date(),
          tasks: [],
          meetings: [
            {
              id: '1',
              title: 'Team Standup',
              startTime: new Date(new Date().setHours(10, 0)),
              endTime: new Date(new Date().setHours(10, 30)),
            },
          ],
          energyLevel: [],
          focusSessions: [
            {
              id: '1',
              startTime: new Date(),
              duration: 25,
              breaks: 1,
              completed: true,
            },
          ],
        };
        
        setDigest(mockDigest);
      } catch (error) {
        console.error('Error fetching digest:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDigest();
  }, []);

  return { digest, isLoading };
};
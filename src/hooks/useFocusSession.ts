import { useState, useEffect } from 'react';
import type { FocusSession } from '../types';

export const useFocusSession = () => {
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null);
  const [sessions, setSessions] = useState<FocusSession[]>([]);

  const startSession = (taskId?: string) => {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration: 0,
      breaks: 0,
      taskId,
      completed: false,
    };
    setCurrentSession(newSession);
  };

  const endSession = (completed: boolean = true) => {
    if (currentSession) {
      const endedSession: FocusSession = {
        ...currentSession,
        duration: Math.floor(
          (Date.now() - currentSession.startTime.getTime()) / 1000 / 60
        ),
        completed,
      };
      setSessions((prev) => [...prev, endedSession]);
      setCurrentSession(null);
    }
  };

  const addBreak = () => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        breaks: currentSession.breaks + 1,
      });
    }
  };

  return {
    currentSession,
    sessions,
    startSession,
    endSession,
    addBreak,
  };
};

export default useFocusSession;
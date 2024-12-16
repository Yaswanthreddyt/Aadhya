import { useState, useEffect } from 'react';
import type { Reminder } from '../types';

export const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      snoozeCount: 0,
      completed: false,
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const completeReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: true }
          : reminder
      )
    );
  };

  const snoozeReminder = (id: string, minutes: number = 5) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? {
              ...reminder,
              timestamp: new Date(Date.now() + minutes * 60000),
              snoozeCount: reminder.snoozeCount + 1,
            }
          : reminder
      )
    );
  };

  // Check for due reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (!reminder.completed && reminder.timestamp <= now) {
          // In a real app, this would trigger a notification
          console.log(`Reminder: ${reminder.title}`);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

  return {
    reminders,
    addReminder,
    completeReminder,
    snoozeReminder,
  };
};
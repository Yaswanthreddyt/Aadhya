import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { DailyDigest as DailyDigestType } from '../../types';
import { useDailyDigest } from '../../hooks/useDailyDigest';
import { motion } from 'framer-motion';

const DailyDigest: React.FC = () => {
  const { digest, isLoading } = useDailyDigest();

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daily Digest</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-medium dark:text-white">Today's Schedule</h3>
          </div>
          <div className="space-y-4">
            {digest?.meetings.map((meeting) => (
              <div key={meeting.id} className="flex items-start space-x-4">
                <Clock className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium dark:text-white">{meeting.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(meeting.startTime).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {digest?.meetings.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No meetings scheduled for today</p>
            )}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
          <h3 className="font-medium mb-4 dark:text-white">Focus Sessions Today</h3>
          <div className="space-y-2">
            {digest?.focusSessions.map((session) => (
              <div key={session.id} className="text-sm">
                <span className="text-purple-600 dark:text-purple-400">
                  {session.duration} minutes
                </span>
                {session.taskId && digest.tasks.find(t => t.id === session.taskId) && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {' '}on {digest.tasks.find(t => t.id === session.taskId)?.title}
                  </span>
                )}
              </div>
            ))}
            {digest?.focusSessions.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No focus sessions completed today</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyDigest;
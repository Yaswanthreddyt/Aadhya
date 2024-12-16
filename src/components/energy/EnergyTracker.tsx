import React, { useState } from 'react';
import { Battery, Sun, Moon, Coffee, Brain, Activity, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropdown } from '../ui/Dropdown';
import { MoodTracker } from './MoodTracker';

interface EnergyLevel {
  time: string;
  level: number;
  note: string;
  activity?: string;
  mood?: string;
}

interface EnergyTrackerProps {
  compact?: boolean;
}

const ACTIVITIES = [
  { id: 'work', label: 'Work', icon: Brain },
  { id: 'exercise', label: 'Exercise', icon: Activity },
  { id: 'break', label: 'Break', icon: Coffee },
];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);

const TIME_OPTIONS = TIME_SLOTS.map(time => ({
  value: time,
  label: time,
  icon: <Clock className="w-4 h-4 text-gray-500" />
}));

// Add this interface for energy summary
interface EnergySummary {
  period: string;
  avgEnergy: number;
  count: number;
}

// Add this function to calculate summaries
const calculateEnergySummaries = (logs: EnergyLevel[]): EnergySummary[] => {
  const periods = ['Morning', 'Afternoon', 'Evening', 'Night'];
  
  return periods.map(period => {
    const periodLogs = logs.filter(log => getDayPeriod(log.time) === period);
    const total = periodLogs.reduce((sum, log) => sum + log.level, 0);
    return {
      period,
      avgEnergy: periodLogs.length ? Math.round((total / periodLogs.length) * 10) / 10 : 0,
      count: periodLogs.length
    };
  });
};

const EnergyTracker: React.FC<EnergyTrackerProps> = ({ compact }) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    new Date().getHours().toString().padStart(2, '0') + ':00'
  );
  const [energyLevels, setEnergyLevels] = useState<EnergyLevel[]>([]);
  const [currentActivity, setCurrentActivity] = useState<string>('');
  const [note, setNote] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('');

  const handleEnergyLog = async (level: number) => {
    try {
      setIsLogging(true);
      setEnergyLevels(prev => [
        ...prev,
        {
          time: selectedTime,
          level,
          note,
          activity: currentActivity,
          mood: currentMood
        }
      ]);
      setNote('');
      setCurrentActivity('');
      setCurrentMood('');
    } finally {
      setIsLogging(false);
    }
  };

  const getEnergyColor = (level: number) => {
    if (level >= 8) return 'text-green-500';
    if (level >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDayPeriod = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {!compact && (
        <>
          {/* Energy Input Section */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 space-y-4">
            <h3 className="text-lg font-semibold">Log Your Energy</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Dropdown
                  options={TIME_OPTIONS}
                  value={selectedTime}
                  onChange={setSelectedTime}
                  placeholder="Select Time"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Activity</label>
                <div className="grid grid-cols-3 gap-2">
                  {ACTIVITIES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setCurrentActivity(id)}
                      className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
                        currentActivity === id 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${
                        currentActivity === id 
                          ? 'text-indigo-500' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      <span className="text-xs mt-1">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="How are you feeling?"
                className="w-full px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50"
              />
            </div>

            {/* Add Mood Tracker */}
            <MoodTracker
              onMoodSelect={setCurrentMood}
              selectedMood={currentMood}
            />

            {/* Energy Level Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {[2, 4, 6, 8, 10].map(level => (
                <motion.button
                  key={level}
                  onClick={() => handleEnergyLog(level)}
                  disabled={isLogging}
                  whileHover={{ scale: isLogging ? 1 : 1.05 }}
                  whileTap={{ scale: isLogging ? 1 : 0.95 }}
                  className={`p-3 md:p-4 rounded-xl ${
                    isLogging ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    level >= 8 ? 'bg-green-100 dark:bg-green-900/20' :
                    level >= 5 ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    'bg-red-100 dark:bg-red-900/20'
                  }`}
                >
                  <Battery className={`w-5 h-5 md:w-6 md:h-6 mx-auto ${getEnergyColor(level)}`} />
                  <div className="text-xs md:text-sm font-medium mt-1">{level}/10</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Timeline for mobile */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold">Today's Energy Timeline</h3>
            
            <div className="space-y-4 md:space-y-6">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map(period => {
                const periodLogs = energyLevels.filter(log => 
                  getDayPeriod(log.time) === period
                );

                if (periodLogs.length === 0) return null;

                return (
                  <div key={period} className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
                      {period}
                    </h4>
                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {periodLogs.map((log, index) => (
                          <motion.div
                            key={`${log.time}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
                          >
                            <Battery className={`w-4 h-4 md:w-5 md:h-5 ${getEnergyColor(log.level)}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{log.time}</span>
                                <span className={`text-xs md:text-sm ${getEnergyColor(log.level)}`}>
                                  {log.level}/10
                                </span>
                              </div>
                              {log.note && (
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                                  {log.note}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Compact View */}
      {compact && (
        <div className="space-y-6">
          {/* Recent Logs with improved design */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Recent Updates</h3>
            <div className="space-y-2">
              {energyLevels.slice(-3).map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm border border-gray-200/10 dark:border-gray-700/10 hover:border-gray-200/20 dark:hover:border-gray-700/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      log.level >= 8 ? 'bg-green-100/50 dark:bg-green-900/20' :
                      log.level >= 5 ? 'bg-yellow-100/50 dark:bg-yellow-900/20' :
                      'bg-red-100/50 dark:bg-red-900/20'
                    }`}>
                      <Battery className={`w-4 h-4 ${getEnergyColor(log.level)}`} />
                    </div>
                    <div>
                      <span className="text-xs md:text-sm font-medium">{log.time}</span>
                      {log.note && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {log.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                    log.level >= 8 ? 'bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                    log.level >= 5 ? 'bg-yellow-100/50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  }`}>
                    {log.level}/10
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Daily Summary with improved design */}
          <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Daily Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {calculateEnergySummaries(energyLevels).map(({ period, avgEnergy, count }, index) => (
                <motion.div
                  key={period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm border border-gray-200/10 dark:border-gray-700/10 hover:border-gray-200/20 dark:hover:border-gray-700/20 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {period === 'Morning' && <Sun className="w-4 h-4 text-orange-400" />}
                    {period === 'Afternoon' && <Sun className="w-4 h-4 text-yellow-400" />}
                    {period === 'Evening' && <Sun className="w-4 h-4 text-red-400" />}
                    {period === 'Night' && <Moon className="w-4 h-4 text-blue-400" />}
                    <div className="text-sm text-gray-600 dark:text-gray-300">{period}</div>
                  </div>
                  {count > 0 ? (
                    <div className="mt-2">
                      <div className={`text-2xl font-bold ${getEnergyColor(avgEnergy)}`}>
                        {avgEnergy}
                        <span className="text-sm font-normal text-gray-400">/10</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {count} {count === 1 ? 'entry' : 'entries'}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-gray-400">No data yet</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overall Stats with improved design */}
          <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-500/20 dark:via-indigo-500/20 dark:to-purple-500/20 border border-blue-200/20 dark:border-blue-700/20"
              >
                <div className="text-sm text-gray-600 dark:text-gray-300">Daily Average</div>
                <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  {energyLevels.length > 0
                    ? (Math.round((energyLevels.reduce((sum, log) => sum + log.level, 0) / energyLevels.length) * 10) / 10)
                    : 0
                  }
                  <span className="text-base font-normal text-gray-400">/10</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-rose-500/20 border border-purple-200/20 dark:border-purple-700/20"
              >
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Entries</div>
                <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {energyLevels.length}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyTracker;
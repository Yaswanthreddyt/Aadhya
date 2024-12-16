import React from 'react';
import { SAMPLE_INSIGHTS, SAMPLE_ENERGY_LOG } from '../../data/sampleData';
import { Activity, Brain, Battery, Zap, Clock, TrendingUp, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

interface Metric {
  title: string;
  value: number;
  maxValue: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const Insights: React.FC = () => {
  const completion = Math.round(
    (SAMPLE_INSIGHTS.taskCompletion.completed / SAMPLE_INSIGHTS.taskCompletion.total) * 100
  );

  const metrics: Metric[] = [
    {
      title: 'Focus Score',
      value: completion,
      maxValue: 100,
      color: '#FF4B4B',
      icon: <Brain className="w-6 h-6" />,
      description: 'Overall focus and task completion today'
    },
    {
      title: 'Medication',
      value: Math.round((SAMPLE_INSIGHTS.adhd.medicationEffectiveness.peakHours.length / 8) * 100),
      maxValue: 100,
      color: '#4BFF4B',
      icon: <Pill className="w-6 h-6" />,
      description: 'Medication effectiveness tracking'
    },
    {
      title: 'Distractions',
      value: SAMPLE_INSIGHTS.adhd.distractions.total,
      maxValue: 50,
      color: '#4B4BFF',
      icon: <Zap className="w-6 h-6" />,
      description: 'Number of distractions managed'
    }
  ];

  // Helper function to format time
  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Main metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
            </div>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${metric.color}20` }}>
                    {React.cloneElement(metric.icon as React.ReactElement, { color: metric.color })}
                  </div>
                  <h3 className="text-lg font-medium text-white">{metric.title}</h3>
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>

              {/* Value */}
              <div className="mb-4">
                <div className="text-4xl font-bold text-white">
                  {metric.value}
                  <span className="text-lg text-gray-400 ml-1">
                    /{metric.maxValue}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{metric.description}</p>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hourly breakdown */}
      <motion.div
        className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Focus & Medication Timeline</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-7 gap-2">
          {SAMPLE_ENERGY_LOG.map((log, index) => (
            <div key={index} className="space-y-2">
              <div className="h-24 bg-gray-800 rounded-lg overflow-hidden relative">
                <motion.div
                  className="w-full absolute bottom-0"
                  style={{ 
                    height: `${(log.level / 10) * 100}%`,
                    backgroundColor: `hsl(${(log.level / 10) * 120}, 70%, 50%)`
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(log.level / 10) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                />
              </div>
              <div className="text-center text-xs text-gray-400">
                {formatTime(log.time)}
              </div>
              <div className="text-center text-[10px] text-gray-500 line-clamp-2">
                {log.note}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Peak performance times */}
      <motion.div
        className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Peak Performance</h3>
          <Zap className="w-5 h-5 text-yellow-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gray-800/50">
            <div className="text-sm text-gray-400 mb-1">Best Focus Time</div>
            <div className="text-2xl font-bold text-white">
              {formatTime(SAMPLE_INSIGHTS.focusPatterns.highEnergyHours[0])}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-gray-800/50">
            <div className="text-sm text-gray-400 mb-1">Medication Peak</div>
            <div className="text-2xl font-bold text-white">
              {formatTime(SAMPLE_INSIGHTS.adhd.medicationEffectiveness.peakHours[0])}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;
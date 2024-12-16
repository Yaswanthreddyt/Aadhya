import React from 'react';
import { BarChart3, Clock, Zap } from 'lucide-react';
import type { Metrics } from '../../types';

interface InsightMetricsProps {
  metrics: Metrics;
}

export const InsightMetrics: React.FC<InsightMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="font-medium">Peak Hours</h3>
        </div>
        <p className="text-2xl font-bold text-blue-600">{metrics.peakHours}</p>
        <p className="text-sm text-gray-600 mt-2">Your most productive time</p>
      </div>

      <div className="bg-purple-50 p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="font-medium">Energy Score</h3>
        </div>
        <p className="text-2xl font-bold text-purple-600">{metrics.energyScore}%</p>
        <p className="text-sm text-gray-600 mt-2">{metrics.energyTrend}</p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-6 h-6 text-green-600" />
          <h3 className="font-medium">Task Completion</h3>
        </div>
        <p className="text-2xl font-bold text-green-600">
          {metrics.completedTasks}/{metrics.totalTasks}
        </p>
        <p className="text-sm text-gray-600 mt-2">Tasks completed today</p>
      </div>
    </div>
  );
};
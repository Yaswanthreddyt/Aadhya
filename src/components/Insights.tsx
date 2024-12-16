import React from 'react';
import { BarChart3, Clock, Zap } from 'lucide-react';

const Insights = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Your Productivity Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-medium">Peak Hours</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">10 AM - 12 PM</p>
          <p className="text-sm text-gray-600 mt-2">Your most productive time</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
            <h3 className="font-medium">Energy Score</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">85%</p>
          <p className="text-sm text-gray-600 mt-2">Better than last week</p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <h3 className="font-medium">Task Completion</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">12/15</p>
          <p className="text-sm text-gray-600 mt-2">Tasks completed today</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h3 className="font-semibold mb-4">Weekly Progress</h3>
        <div className="h-64 flex items-end space-x-2">
          {/* Placeholder for charts - would use a proper charting library in production */}
          {[60, 45, 75, 50, 80, 65, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-purple-200 rounded-t-lg transition-all hover:bg-purple-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default Insights;
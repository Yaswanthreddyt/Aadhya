import React from 'react';
import type { WeeklyData } from '../../types';

interface WeeklyProgressProps {
  data: WeeklyData;
}

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ data }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-semibold mb-4">Weekly Progress</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((value, index) => (
          <div
            key={days[index]}
            className="flex-1 bg-purple-200 rounded-t-lg transition-all hover:bg-purple-300 relative group"
            style={{ height: `${value}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {value}%
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        {days.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
};
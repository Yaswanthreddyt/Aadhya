import React from 'react';
import { Battery, BatteryLow, BatteryMedium } from 'lucide-react';
import type { EnergyLevel } from '../../types';

interface EnergyLevelSelectorProps {
  value: EnergyLevel;
  onChange: (level: EnergyLevel) => void;
}

export const EnergyLevelSelector: React.FC<EnergyLevelSelectorProps> = ({ 
  value, 
  onChange 
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onChange('low')}
        className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-colors ${
          value === 'low' 
            ? 'bg-red-50 border-2 border-red-500' 
            : 'hover:bg-red-50 border-2 border-transparent'
        }`}
      >
        <BatteryLow className="w-8 h-8 text-red-500 mb-2" />
        <span className="text-sm font-medium">Low</span>
      </button>
      
      <button
        onClick={() => onChange('medium')}
        className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-colors ${
          value === 'medium'
            ? 'bg-yellow-50 border-2 border-yellow-500'
            : 'hover:bg-yellow-50 border-2 border-transparent'
        }`}
      >
        <BatteryMedium className="w-8 h-8 text-yellow-500 mb-2" />
        <span className="text-sm font-medium">Medium</span>
      </button>
      
      <button
        onClick={() => onChange('high')}
        className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-colors ${
          value === 'high'
            ? 'bg-green-50 border-2 border-green-500'
            : 'hover:bg-green-50 border-2 border-transparent'
        }`}
      >
        <Battery className="w-8 h-8 text-green-500 mb-2" />
        <span className="text-sm font-medium">High</span>
      </button>
    </div>
  );
};
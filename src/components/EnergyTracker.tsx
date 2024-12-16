import React from 'react';
import { Battery, BatteryLow, BatteryMedium } from 'lucide-react';

interface EnergyTrackerProps {
  compact?: boolean;
}

const EnergyTracker: React.FC<EnergyTrackerProps> = ({ compact = false }) => {
  return (
    <div>
      {!compact && (
        <h2 className="text-xl font-semibold mb-6">Track Your Energy</h2>
      )}
      
      <div className="flex space-x-4">
        <button className="flex-1 flex flex-col items-center p-4 rounded-lg border-2 border-red-200 hover:bg-red-50 transition-colors">
          <BatteryLow className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-sm font-medium">Low</span>
        </button>
        
        <button className="flex-1 flex flex-col items-center p-4 rounded-lg border-2 border-yellow-200 hover:bg-yellow-50 transition-colors">
          <BatteryMedium className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium">Medium</span>
        </button>
        
        <button className="flex-1 flex flex-col items-center p-4 rounded-lg border-2 border-green-200 hover:bg-green-50 transition-colors">
          <Battery className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-sm font-medium">High</span>
        </button>
      </div>
    </div>
  );
};

export default EnergyTracker;
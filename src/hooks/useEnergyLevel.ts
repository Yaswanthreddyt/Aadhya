import { useState, useEffect } from 'react';
import type { EnergyLog } from '../types';

export const useEnergyLevel = () => {
  const [energyLogs, setEnergyLogs] = useState<EnergyLog[]>([]);
  const [currentEnergy, setCurrentEnergy] = useState<EnergyLog['level']>('medium');

  const logEnergy = (level: EnergyLog['level'], notes?: string) => {
    const newLog: EnergyLog = {
      timestamp: new Date(),
      level,
      notes,
    };
    setEnergyLogs((prev) => [...prev, newLog]);
    setCurrentEnergy(level);
  };

  const getDailyAverage = () => {
    const today = new Date();
    const todayLogs = energyLogs.filter(
      (log) => log.timestamp.toDateString() === today.toDateString()
    );

    if (todayLogs.length === 0) return 'medium';

    const levelScore = { low: 0, medium: 1, high: 2 };
    const average =
      todayLogs.reduce((sum, log) => sum + levelScore[log.level], 0) /
      todayLogs.length;

    if (average <= 0.5) return 'low';
    if (average <= 1.5) return 'medium';
    return 'high';
  };

  return {
    currentEnergy,
    energyLogs,
    logEnergy,
    getDailyAverage,
  };
};

export default useEnergyLevel;
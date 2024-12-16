import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import { FITBIT_SAMPLE_DATA } from '../../utils/fitbit-data';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#FF0000'];

interface ChartProps {
  data: typeof FITBIT_SAMPLE_DATA;
}

const DataCharts: React.FC<ChartProps> = ({ data }) => {
  const [activeChart, setActiveChart] = useState<'trends' | 'correlations' | 'patterns' | 'radar'>('trends');

  // Prepare data for correlation chart
  const correlationData = data.map(d => ({
    sleep: d.sleep,
    focus: d.focus,
    stress: d.stress,
    steps: d.steps / 1000, // Convert to thousands for better visualization
  }));

  // Prepare data for patterns chart
  const patternData = [
    { name: 'High Focus', value: data.filter(d => d.focus >= 7).length },
    { name: 'Medium Focus', value: data.filter(d => d.focus >= 5 && d.focus < 7).length },
    { name: 'Low Focus', value: data.filter(d => d.focus < 5).length },
  ];

  // Prepare data for radar chart
  const radarData = data.map(d => ({
    subject: 'Day',
    sleep: (d.sleep / 10) * 100,
    focus: d.focus * 10,
    stress: (10 - d.stress) * 10,
    activity: (d.steps / 10000) * 100,
  }));

  const chartTypes = [
    { id: 'trends', label: 'Daily Trends' },
    { id: 'correlations', label: 'Correlations' },
    { id: 'patterns', label: 'Focus Patterns' },
    { id: 'radar', label: 'Daily Balance' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex space-x-2">
        {chartTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setActiveChart(type.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeChart === type.id
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
        style={{ height: '400px' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'trends' && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="activity" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#00C49F"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="#0088FE"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="#FF0000"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}

          {activeChart === 'correlations' && (
            <BarChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="sleep" fill="#0088FE" />
              <Bar dataKey="focus" fill="#00C49F" />
              <Bar dataKey="steps" fill="#FFBB28" />
              <Bar dataKey="stress" fill="#FF0000" />
            </BarChart>
          )}

          {activeChart === 'patterns' && (
            <PieChart>
              <Pie
                data={patternData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {patternData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Legend />
            </PieChart>
          )}

          {activeChart === 'radar' && (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Sleep Quality"
                dataKey="sleep"
                stroke="#0088FE"
                fill="#0088FE"
                fillOpacity={0.6}
              />
              <Radar
                name="Focus Level"
                dataKey="focus"
                stroke="#00C49F"
                fill="#00C49F"
                fillOpacity={0.6}
              />
              <Radar
                name="Stress Management"
                dataKey="stress"
                stroke="#FF0000"
                fill="#FF0000"
                fillOpacity={0.6}
              />
              <Radar
                name="Activity Level"
                dataKey="activity"
                stroke="#FFBB28"
                fill="#FFBB28"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Chart Description */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {activeChart === 'trends' && (
          <p>Track how your focus, sleep, and stress levels change over time. Notice patterns and correlations in your daily metrics.</p>
        )}
        {activeChart === 'correlations' && (
          <p>Compare different metrics side by side to understand how they influence each other. See how sleep quality affects focus and stress levels.</p>
        )}
        {activeChart === 'patterns' && (
          <p>Analyze the distribution of your focus levels throughout the week. Identify when you're most productive.</p>
        )}
        {activeChart === 'radar' && (
          <p>Get a comprehensive view of your daily balance across different metrics. Ideal for identifying areas that need attention.</p>
        )}
      </div>
    </div>
  );
};

export default DataCharts; 
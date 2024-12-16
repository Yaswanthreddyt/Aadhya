import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Heart, Moon, TrendingUp, BarChart2 } from 'lucide-react';
import { analyzeFitbitData, generateFocusRecommendations, generateStressManagementTips, generateProductivityInsights, FITBIT_SAMPLE_DATA } from '../../utils/fitbit-data';
import DataCharts from './DataCharts';

const Insights: React.FC = () => {
  const { insights, averages } = analyzeFitbitData();
  const focusRecommendations = generateFocusRecommendations(FITBIT_SAMPLE_DATA);
  const stressManagementTips = generateStressManagementTips(FITBIT_SAMPLE_DATA);
  const productivityTips = generateProductivityInsights(FITBIT_SAMPLE_DATA);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights & Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Your personalized ADHD management insights</p>
        </div>
        <BarChart2 className="w-8 h-8 text-teal-600" />
      </div>

      {/* Interactive Charts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Visualization</h3>
        <DataCharts data={FITBIT_SAMPLE_DATA} />
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 text-teal-600">
            <Activity className="w-5 h-5" />
            <h3 className="font-medium">Daily Activity</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{averages.steps.toFixed(0)} steps</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily average</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 text-purple-600">
            <Moon className="w-5 h-5" />
            <h3 className="font-medium">Sleep Quality</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{averages.sleep.toFixed(1)} hours</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average sleep duration</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
        >
          <div className="flex items-center space-x-2 text-blue-600">
            <Brain className="w-5 h-5" />
            <h3 className="font-medium">Focus Score</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{averages.focus.toFixed(1)}/10</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average focus level</p>
        </motion.div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-600">{insight.score.toFixed(1)}</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{insight.description}</p>
            <p className="mt-2 text-sm text-teal-600 font-medium">{insight.recommendation}</p>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Focus Tips</span>
          </h3>
          <ul className="space-y-2">
            {focusRecommendations.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
              >
                <span className="text-purple-600 mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-600" />
            <span>Stress Management</span>
          </h3>
          <ul className="space-y-2">
            {stressManagementTips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
              >
                <span className="text-red-600 mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>Productivity Insights</span>
          </h3>
          <ul className="space-y-2">
            {productivityTips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
              >
                <span className="text-teal-600 mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Insights;
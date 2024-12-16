import React, { useState } from 'react';
import { Settings, Layout, Brain, Battery, BarChart2, Menu, Crown, X, Award, Calendar, Target, BookOpen, LineChart, MessageCircle, Users, Shield, Gift, Download, Palette, Bot } from 'lucide-react';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { UserProfile } from './UserProfile';
import Footer from './Footer/Footer';
import TaskList from './tasks/TaskList';
import { Task } from '../types/task';
import { SAMPLE_TASKS } from '../data/sampleData';
import EnergyTracker from './energy/EnergyTracker';
import Insights from './insights/Insights';
import FocusMode from './focus/FocusMode';
import { TaskModal } from './tasks/TaskModal';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { AIChat } from './ai/AIChat';
import { AI_CONFIG } from '../config/ai';

interface DashboardProps {
  showPremiumPreview?: boolean;
  onClosePremium?: () => void;
  onShowPremium?: () => void;
}

type TabType = 'tasks' | 'energy' | 'insights' | 'focus' | 'ai-chat';

interface TabDefinition {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const PREMIUM_FEATURES = [
  {
    id: 'organization',
    icon: Calendar,
    title: 'Advanced Organization',
    description: 'Priority tagging, color coding, and smart reminders',
    preview: 'Unlock powerful planning tools'
  },
  {
    id: 'focus',
    icon: Target,
    title: 'Enhanced Focus Tools',
    description: 'Custom Pomodoro timers, ambient sounds, and focus modes',
    preview: 'Maximize your productivity'
  },
  {
    id: 'content',
    icon: BookOpen,
    title: 'ADHD Content Library',
    description: 'Expert tutorials, guided exercises, and strategies',
    preview: 'Learn from ADHD experts'
  },
  {
    id: 'tracking',
    icon: LineChart,
    title: 'Advanced Analytics',
    description: 'Mood tracking, progress insights, and pattern analysis',
    preview: 'Understand your progress'
  },
  {
    id: 'coaching',
    icon: MessageCircle,
    title: 'Personal Coaching',
    description: 'Chat with ADHD coaches and get expert guidance',
    preview: 'Get personalized support'
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Team Features',
    description: 'Share tasks and find accountability partners',
    preview: 'Work better together'
  }
];

const THEMES = [
  { id: 'calm', name: 'Calm & Focused', colors: ['from-blue-500', 'to-purple-500'] },
  { id: 'energy', name: 'High Energy', colors: ['from-yellow-500', 'to-red-500'] },
  { id: 'nature', name: 'Nature Inspired', colors: ['from-green-500', 'to-teal-500'] },
  { id: 'minimal', name: 'Minimal', colors: ['from-gray-500', 'to-gray-700'] },
];

const Dashboard: React.FC<DashboardProps> = ({
  showPremiumPreview = false,
  onClosePremium,
  onShowPremium
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddTask = () => {
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const tabs: TabDefinition[] = [
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: <Layout className="w-5 h-5" />,
      description: 'Manage your daily tasks'
    },
    { 
      id: 'energy', 
      label: 'Energy', 
      icon: <Battery className="w-5 h-5" />,
      description: 'Track your energy levels'
    },
    { 
      id: 'focus', 
      label: 'Focus', 
      icon: <Brain className="w-5 h-5" />,
      description: 'Stay focused on your work'
    },
    { 
      id: 'insights', 
      label: 'Insights', 
      icon: <BarChart2 className="w-5 h-5" />,
      description: 'View your productivity analytics'
    },
    {
      id: 'ai-chat',
      label: 'AI Chat',
      icon: <Bot className="w-5 h-5" />,
      description: 'Get ADHD support and advice'
    },
  ];

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-20 flex items-center justify-between">
              <Logo />
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <UserProfile onShowPremium={onShowPremium} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Centered Menu Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white dark:bg-black">
        <div className="max-w-2xl mx-auto">
          <nav className="flex justify-center">
            <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-full p-1.5 backdrop-blur-sm mx-4 my-4 shadow-sm">
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-6 py-2.5 rounded-full relative flex items-center space-x-3 transition-all ${
                      activeTab === tab.id
                        ? 'text-white bg-purple-500 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-30 md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="max-w-md mx-auto p-4">
              <div className="bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl p-2">
                {tabs.map(tab => (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full px-4 py-3 rounded-xl flex items-center space-x-3 transition-all ${
                      activeTab === tab.id
                        ? 'text-white bg-purple-500 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-40">
        <motion.main
          className="flex-1 container max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 mb-8"
          >
            {activeTab === 'tasks' && (
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
                onAddTask={handleAddTask}
              />
            )}
            {activeTab === 'energy' && <EnergyTracker />}
            {activeTab === 'insights' && <Insights />}
            {activeTab === 'focus' && <FocusMode />}
            {activeTab === 'ai-chat' && <AIChat apiKey={AI_CONFIG.HUGGINGFACE_API_KEY} />}
          </motion.div>
        </motion.main>

        {/* Footer with sticky positioning */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
              onClick={onClosePremium}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-[90%] max-w-2xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-[51] my-8 mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                          <Crown className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Upgrade to Premium
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Unlock powerful ADHD-focused features
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onClosePremium}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {PREMIUM_FEATURES.map((feature) => (
                        <motion.div
                          key={feature.id}
                          className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all group"
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500">
                              <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Theme Preview */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                        <Palette className="w-5 h-5 mr-2 text-purple-500" />
                        Personalize Your Experience
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {THEMES.map((theme) => (
                          <motion.div
                            key={theme.id}
                            className={`p-4 rounded-xl bg-gradient-to-r ${theme.colors.join(' ')} text-white opacity-75 hover:opacity-100 transition-opacity`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-sm font-medium text-center">{theme.name}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Advanced Privacy</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Gift className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Exclusive Rewards</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Download className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Offline Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          14-day free trial, cancel anytime
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Starting at <span className="font-bold text-gray-900 dark:text-white">$9.99/month</span>
                        </span>
                        <motion.button
                          className="px-6 py-2 bg-purple-500 text-white rounded-full font-medium shadow-lg hover:bg-purple-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Free Trial
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Dashboard;

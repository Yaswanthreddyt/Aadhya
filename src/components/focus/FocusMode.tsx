import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, Settings, Clock,
  Moon, Book, Briefcase, Code, Coffee, Brain, BellOff,
  Laptop, Headphones, Focus, BarChart2, Clock8, 
  CheckCircle2, ListTodo, SplitSquareHorizontal, Sparkles,
  Music, Sun, Zap, Target, X, Crown, Lock, Palette,
  Bell, Calendar, Users, BookOpen, LineChart, Layout,
  MessageCircle, Shield, Gift, Download, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskBreakdown {
  id: string;
  text: string;
  isCompleted: boolean;
  isCurrentFocus: boolean;
}

interface SimplifiedTask {
  id: string;
  title: string;
  steps: TaskBreakdown[];
  timeEstimate: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const ENVIRONMENT_OPTIONS = [
  { id: 'quiet', icon: Moon, label: 'Quiet Space', description: 'Minimal distractions' },
  { id: 'music', icon: Music, label: 'With Music', description: 'Background music' },
  { id: 'nature', icon: Sun, label: 'Nature Sounds', description: 'Calming ambient' },
  { id: 'busy', icon: Coffee, label: 'Busy Place', description: 'Active environment' },
];

const ENERGY_LEVELS = [
  { id: 'high', icon: Zap, label: 'High Energy', color: 'text-yellow-500' },
  { id: 'medium', icon: Target, label: 'Focused', color: 'text-purple-500' },
  { id: 'low', icon: Brain, label: 'Low Energy', color: 'text-blue-500' },
];

const QUICK_TIPS = [
  "Break your task into smaller, manageable steps",
  "Use the 2-minute rule: If it takes less than 2 minutes, do it now",
  "Take regular breaks to maintain focus",
  "Try body doubling: Work alongside someone else",
  "Use timers to create a sense of urgency",
  "Celebrate small wins along the way",
];

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

const MotionButton: React.FC<{
  onClick: () => void;
  className: string;
  children: React.ReactNode;
  isSelected?: boolean;
}> = ({ onClick, className, children, isSelected }) => (
  <motion.button
    onClick={onClick}
    className={className}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={false}
    animate={isSelected ? { y: -2 } : { y: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    {children}
  </motion.button>
);

interface FocusModeProps {
  showPremiumPreview?: boolean;
  onClosePremium?: () => void;
}

const FocusMode: React.FC<FocusModeProps> = ({
  showPremiumPreview = false,
  onClosePremium
}) => {
  const [currentTask, setCurrentTask] = useState<SimplifiedTask | null>(null);
  const [isTaskInputOpen, setIsTaskInputOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSteps, setTaskSteps] = useState<string>('');
  const [timeEstimate, setTimeEstimate] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('quiet');
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [showTip, setShowTip] = useState(true);
  const [currentTip, setCurrentTip] = useState(QUICK_TIPS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip = QUICK_TIPS[Math.floor(Math.random() * QUICK_TIPS.length)];
      setCurrentTip(randomTip);
    }, 30000); // Change tip every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleTaskSubmit = () => {
    if (!taskTitle.trim() || !taskSteps.trim()) return;

    const steps = taskSteps
      .split('\n')
      .filter(step => step.trim())
      .map(step => ({
        id: Math.random().toString(36).substr(2, 9),
        text: step.trim(),
        isCompleted: false,
        isCurrentFocus: false
      }));

    const newTask: SimplifiedTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: taskTitle,
      steps,
      timeEstimate,
      difficulty
    };

    setCurrentTask(newTask);
    setIsTaskInputOpen(false);
    // Set first step as current focus
    if (steps.length > 0) {
      handleStepFocus(steps[0].id);
    }
  };

  const handleStepComplete = (stepId: string) => {
    if (!currentTask) return;

    const updatedSteps = currentTask.steps.map(step => {
      if (step.id === stepId) {
        return { ...step, isCompleted: !step.isCompleted };
      }
      return step;
    });

    // Check if all steps are completed
    const allCompleted = updatedSteps.every(step => step.isCompleted);
    if (allCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    setCurrentTask({ ...currentTask, steps: updatedSteps });
  };

  const handleStepFocus = (stepId: string) => {
    if (!currentTask) return;

    const updatedSteps = currentTask.steps.map(step => ({
      ...step,
      isCurrentFocus: step.id === stepId
    }));

    setCurrentTask({ ...currentTask, steps: updatedSteps });
  };

  const handleClosePremium = () => {
    onClosePremium?.();
  };

  return (
    <div className="space-y-6">
      {/* Environment and Energy Level Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Your Focus Environment</h3>
        
        <div className="space-y-4">
          {/* Environment Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Choose your environment</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ENVIRONMENT_OPTIONS.map((env) => (
                <MotionButton
                  key={env.id}
                  onClick={() => setSelectedEnvironment(env.id)}
                  isSelected={selectedEnvironment === env.id}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedEnvironment === env.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <motion.div
                    animate={selectedEnvironment === env.id ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <env.icon className={`w-6 h-6 mb-2 ${
                      selectedEnvironment === env.id
                        ? 'text-purple-500'
                        : 'text-gray-500'
                    }`} />
                  </motion.div>
                  <div className="text-sm font-medium">{env.label}</div>
                  <div className="text-xs text-gray-500">{env.description}</div>
                </MotionButton>
              ))}
            </div>
          </div>

          {/* Energy Level Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">How's your energy?</label>
            <div className="flex space-x-3">
              {ENERGY_LEVELS.map((level) => (
                <MotionButton
                  key={level.id}
                  onClick={() => setEnergyLevel(level.id)}
                  isSelected={energyLevel === level.id}
                  className={`flex-1 p-3 rounded-xl border transition-all ${
                    energyLevel === level.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <motion.div
                    animate={energyLevel === level.id ? 
                      { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <level.icon className={`w-5 h-5 mb-1 mx-auto ${level.color}`} />
                  </motion.div>
                  <div className="text-sm font-medium">{level.label}</div>
                </MotionButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips Section */}
      <AnimatePresence mode="wait">
        {showTip && (
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Quick Tip</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{currentTip}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTip(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Input Section */}
      <AnimatePresence>
        {isTaskInputOpen && (
          <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Break Down Your Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="What do you need to do?"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Break it down into smaller steps</label>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tip: Break your task into small, specific steps. Instead of "Write report", try:
                    <br />1. Open document
                    <br />2. Write introduction (2-3 sentences)
                    <br />3. List main points
                  </p>
                </div>
                <textarea
                  value={taskSteps}
                  onChange={(e) => setTaskSteps(e.target.value)}
                  placeholder="Enter each step on a new line"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Time Estimate</label>
                  <select
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value={5}>5 minutes (Quick win)</option>
                    <option value={15}>15 minutes (Short task)</option>
                    <option value={25}>25 minutes (Pomodoro)</option>
                    <option value={45}>45 minutes (Deep work)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Energy Required</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="easy">Low - I can do this!</option>
                    <option value="medium">Medium - Need some focus</option>
                    <option value="hard">High - Full concentration</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <MotionButton
                  onClick={() => setIsTaskInputOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </MotionButton>
                <MotionButton
                  onClick={handleTaskSubmit}
                  className="px-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Start Task
                </MotionButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Task View */}
      {currentTask ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentTask.title}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {timeEstimate} mins
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Energy
                </span>
              </div>
            </div>
            <button
              onClick={() => setCurrentTask(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {currentTask.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all ${
                  step.isCurrentFocus
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700'
                } ${
                  step.isCompleted
                    ? 'bg-gray-50 dark:bg-gray-800/50'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between group">
                  <div className="flex items-start space-x-3">
                    <motion.button
                      onClick={() => handleStepComplete(step.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`mt-1 transition-colors ${
                        step.isCompleted
                          ? 'text-green-500'
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={step.isCompleted ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    <span className={`transition-all ${
                      step.isCompleted 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {step.text}
                    </span>
                  </div>
                  {!step.isCompleted && (
                    <motion.button
                      onClick={() => handleStepFocus(step.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1 text-sm rounded-full transition-all ${
                        step.isCurrentFocus
                          ? 'bg-purple-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      Focus
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <motion.button
            onClick={() => setIsTaskInputOpen(true)}
            className="px-6 py-3 bg-purple-500 text-white rounded-full font-medium shadow-lg hover:bg-purple-600 transition-all"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Break Down a Task
          </motion.button>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Let's make your task manageable by breaking it into smaller steps
          </p>
        </div>
      )}

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: [0, -5, 5, -5, 0]
            }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{
              duration: 0.5,
              rotate: {
                duration: 0.5,
                repeat: 3
              }
            }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full shadow-lg flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span className="font-medium">Amazing progress! Keep going! 🎉</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Features Preview Modal */}
      <AnimatePresence>
        {showPremiumPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClosePremium}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-[51] overflow-hidden"
            >
              <div className="h-full flex flex-col">
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
                      onClick={handleClosePremium}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FocusMode;
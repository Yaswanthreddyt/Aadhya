import React, { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import { TaskHeader } from './TaskHeader';
import { EmptyTaskList } from './EmptyTaskList';
import { Task } from '../../types/task';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SortAsc, CheckCircle } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import { Briefcase, Heart, Home, Star, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: () => void;
}

type SortDirection = 'asc' | 'desc';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories', icon: null },
  { value: 'work', label: 'Work', icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
  { value: 'health', label: 'Health', icon: <Heart className="w-4 h-4 text-red-500" /> },
  { value: 'personal', label: 'Personal', icon: <Star className="w-4 h-4 text-yellow-500" /> },
  { value: 'home', label: 'Home', icon: <Home className="w-4 h-4 text-green-500" /> },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'All Priorities', icon: null },
  { 
    value: 'high', 
    label: 'High Priority', 
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-red-500'
  },
  { 
    value: 'medium', 
    label: 'Medium Priority',
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-yellow-500'
  },
  { 
    value: 'low', 
    label: 'Low Priority',
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-green-500'
  },
];

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  setTasks, 
  onDeleteTask, 
  onUpdateTask,
  onAddTask 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesCategory = !selectedCategory || 
        (task.category && task.category === selectedCategory);
      const matchesPriority = !selectedPriority || 
        (task.priority && task.priority === selectedPriority);
      return matchesCategory && matchesPriority;
    }).sort((a, b) => {
      const dateA = new Date(a.deadline || Date.now()).getTime();
      const dateB = new Date(b.deadline || Date.now()).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [tasks, selectedCategory, selectedPriority, sortDirection]);

  const completedTasks = filteredTasks.filter(task => task.completed);
  const pendingTasks = filteredTasks.filter(task => !task.completed);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <TaskHeader onAddTask={onAddTask} />
      
      {/* Task Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <motion.div 
          className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {tasks.length}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </motion.div>
        
        <motion.div 
          className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
            {completedTasks.length}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </motion.div>
        
        <motion.div 
          className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
            {pendingTasks.length}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </motion.div>
      </div>

      {/* Filters and Sort - Stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:justify-between">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <Dropdown
            options={CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="All Categories"
            className="w-full md:w-48"
          />
          <Dropdown
            options={PRIORITY_OPTIONS}
            value={selectedPriority}
            onChange={setSelectedPriority}
            placeholder="All Priorities"
            className="w-full md:w-48"
          />
        </div>
        <button 
          onClick={toggleSortDirection}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors self-end"
          aria-label={`Sort by deadline ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
        >
          <SortAsc className={`w-5 h-5 transition-transform ${
            sortDirection === 'desc' ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Task Lists */}
      {tasks.length > 0 ? (
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              Pending Tasks
              <span className="ml-2 text-sm font-normal text-gray-500">({pendingTasks.length})</span>
            </h3>
            <AnimatePresence mode="popLayout">
              {pendingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <TaskItem 
                    task={task}
                    onDelete={() => onDeleteTask(task.id)}
                    onUpdate={(updates) => onUpdateTask(task.id, updates)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                Completed Tasks
                <span className="ml-2 text-sm font-normal text-gray-500">({completedTasks.length})</span>
              </h3>
              <AnimatePresence mode="popLayout">
                {completedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <TaskItem 
                      task={task}
                      onDelete={() => onDeleteTask(task.id)}
                      onUpdate={(updates) => onUpdateTask(task.id, updates)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      ) : (
        <EmptyTaskList />
      )}
    </div>
  );
};

export default TaskList;
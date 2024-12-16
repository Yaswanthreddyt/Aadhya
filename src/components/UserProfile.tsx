import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Settings, 
  Crown,
  ChevronDown,
  Bell,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  onShowPremium?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onShowPremium }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, signOut } = useAuth();

  const menuItems = [
    {
      icon: Crown,
      label: 'Upgrade to Premium',
      onClick: () => {
        onShowPremium?.();
        setIsOpen(false);
      },
      className: 'text-purple-500 dark:text-purple-400'
    },
    {
      icon: Bell,
      label: 'Notifications',
      onClick: () => setIsOpen(false)
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => setIsOpen(false)
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onClick: () => setIsOpen(false)
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      onClick: signOut,
      className: 'text-red-500 dark:text-red-400'
    }
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
          <User className="w-5 h-5 text-purple-500" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {currentUser?.email?.split('@')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-40 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {currentUser?.email?.split('@')[0]}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {currentUser?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={item.onClick}
                    className={`w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors ${item.className || 'text-gray-700 dark:text-gray-200'}`}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 
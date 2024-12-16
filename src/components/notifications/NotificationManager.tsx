import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotificationPreferences } from '../../hooks/useNotificationPreferences';

export const NotificationManager: React.FC = () => {
  const { preferences, notifications } = useNotificationPreferences();

  useEffect(() => {
    notifications.forEach(notification => {
      if (shouldShowNotification(notification, preferences)) {
        toast(notification.message, {
          type: notification.type,
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'dark:bg-gray-800 dark:text-white',
        });
      }
    });
  }, [notifications, preferences]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

const shouldShowNotification = (
  notification: { priority: 'low' | 'medium' | 'high' },
  preferences: { frequency: 'low' | 'medium' | 'high' }
) => {
  const priorityScore = { low: 1, medium: 2, high: 3 };
  return priorityScore[notification.priority] >= priorityScore[preferences.frequency];
};
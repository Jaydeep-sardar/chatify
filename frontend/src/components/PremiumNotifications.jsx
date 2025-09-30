import { useState, useEffect, useCallback } from 'react';
import { X, Bell, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { PremiumEffects } from './PremiumUI';

function PremiumNotification({ 
  notification, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoClose) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [autoClose, duration, onClose]);

  const getTypeConfig = () => {
    switch (notification.type) {
      case 'success':
        return {
          icon: CheckCircle,
          color: 'from-green-500 to-emerald-500',
          iconColor: 'text-green-400',
          borderColor: 'border-green-500/30'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'from-red-500 to-pink-500',
          iconColor: 'text-red-400',
          borderColor: 'border-red-500/30'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'from-yellow-500 to-orange-500',
          iconColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/30'
        };
      case 'info':
        return {
          icon: Info,
          color: 'from-blue-500 to-cyan-500',
          iconColor: 'text-blue-400',
          borderColor: 'border-blue-500/30'
        };
      default:
        return {
          icon: Bell,
          color: 'from-slate-600 to-slate-700',
          iconColor: 'text-slate-400',
          borderColor: 'border-slate-500/30'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  if (!isVisible) return null;

  return (
    <PremiumEffects effect="glow" intensity="medium">
      <div className={`
        relative bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 
        border ${config.borderColor} shadow-xl max-w-sm
        animate-notification-slide transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        {/* Progress Bar */}
        {autoClose && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700/50 rounded-t-xl overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${config.color} transition-all duration-100 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`flex-shrink-0 p-2 rounded-full bg-slate-700/50`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-200 font-semibold text-sm mb-1">
              {notification.title}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {notification.message}
            </p>
            
            {/* Action Buttons */}
            {notification.actions && (
              <div className="flex gap-2 mt-3">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium
                      transition-all duration-200 hover:scale-105
                      ${action.primary 
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="flex-shrink-0 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Avatar for message notifications */}
        {notification.avatar && (
          <div className="absolute -left-2 top-4">
            <div className="w-8 h-8 rounded-full ring-2 ring-slate-600 overflow-hidden">
              <img src={notification.avatar} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </PremiumEffects>
  );
}

function NotificationContainer() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Expose notification functions globally
  useEffect(() => {
    window.showNotification = addNotification;
    window.hideNotification = removeNotification;
    
    return () => {
      delete window.showNotification;
      delete window.hideNotification;
    };
  }, [addNotification, removeNotification]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <PremiumNotification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
          autoClose={notification.autoClose}
          duration={notification.duration}
        />
      ))}
    </div>
  );
}

// Utility functions for easy notification creation
export const notify = {
  success: (title, message, options = {}) => {
    if (window.showNotification) {
      return window.showNotification({
        type: 'success',
        title,
        message,
        ...options
      });
    }
  },
  
  error: (title, message, options = {}) => {
    if (window.showNotification) {
      return window.showNotification({
        type: 'error',
        title,
        message,
        ...options
      });
    }
  },
  
  warning: (title, message, options = {}) => {
    if (window.showNotification) {
      return window.showNotification({
        type: 'warning',
        title,
        message,
        ...options
      });
    }
  },
  
  info: (title, message, options = {}) => {
    if (window.showNotification) {
      return window.showNotification({
        type: 'info',
        title,
        message,
        ...options
      });
    }
  },
  
  message: (sender, message, avatar, options = {}) => {
    if (window.showNotification) {
      return window.showNotification({
        type: 'info',
        title: `New message from ${sender}`,
        message: message,
        avatar: avatar,
        ...options
      });
    }
  }
};

export { PremiumNotification, NotificationContainer };
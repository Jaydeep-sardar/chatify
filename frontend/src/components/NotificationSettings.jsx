import { Bell, BellOff, Volume2, VolumeX } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

function NotificationSettings() {
  const { 
    isSoundEnabled, 
    notifications, 
    toggleSound, 
    toggleNotifications, 
    requestNotificationPermission,
    getTotalUnreadCount 
  } = useChatStore();

  const totalUnread = getTotalUnreadCount();

  useEffect(() => {
    // Request notification permission on first load
    if (notifications && 'Notification' in window) {
      requestNotificationPermission();
    }
  }, [notifications, requestNotificationPermission]);

  const handleNotificationToggle = async () => {
    if (!notifications) {
      const granted = await requestNotificationPermission();
      if (granted) {
        toggleNotifications();
      }
    } else {
      toggleNotifications();
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
      {/* Total unread count */}
      {totalUnread > 0 && (
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-medium text-sm">
            {totalUnread} unread
          </span>
        </div>
      )}

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
          isSoundEnabled 
            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
            : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
        }`}
        title={isSoundEnabled ? "Disable sounds" : "Enable sounds"}
      >
        {isSoundEnabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>

      {/* Notification toggle */}
      <button
        onClick={handleNotificationToggle}
        className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
          notifications 
            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
            : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
        }`}
        title={notifications ? "Disable notifications" : "Enable notifications"}
      >
        {notifications ? (
          <Bell className="w-4 h-4" />
        ) : (
          <BellOff className="w-4 h-4" />
        )}
      </button>

      {/* Notification permission status */}
      {'Notification' in window && (
        <div className="text-xs text-gray-400">
          {Notification.permission === 'granted' && notifications && (
            <span className="text-green-400">✓ Notifications enabled</span>
          )}
          {Notification.permission === 'denied' && (
            <span className="text-red-400">✗ Notifications blocked</span>
          )}
          {Notification.permission === 'default' && (
            <span className="text-yellow-400">? Notifications not set</span>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationSettings;
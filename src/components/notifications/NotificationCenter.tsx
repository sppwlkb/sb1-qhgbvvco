import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationItem from './NotificationItem';

export default function NotificationCenter() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, loading, error, fetchNotifications, markAsRead } = useNotifications();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg hover:bg-cyan-500/10 transition-colors group"
      >
        <Bell className="w-6 h-6 text-cyan-300 group-hover:text-cyan-200" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full 
            flex items-center justify-center text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl 
          border border-cyan-500/20 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-medium">通知中心</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          {error && (
            <div className="p-4 text-center text-red-400">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="p-4 text-center text-gray-400">
              載入中...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              目前沒有新通知
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { Notification } from '../../types/notification';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div
      className={`p-3 border-b border-gray-700 hover:bg-white/5 cursor-pointer
        ${notification.isRead ? 'opacity-70' : ''}`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-white/10">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-white">{notification.title}</h3>
          <p className="text-sm text-gray-300">{notification.content}</p>
          <span className="text-xs text-gray-400">
            {new Date(notification.createdAt).toLocaleString('zh-TW')}
          </span>
        </div>
      </div>
    </div>
  );
}
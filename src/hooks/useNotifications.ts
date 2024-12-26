import { useState, useCallback } from 'react';
import type { Notification } from '../types/notification';

// Mock notifications for now
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '系統通知',
    content: '歡迎使用立璽科技 CRM 系統',
    type: 'info',
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // 使用模擬資料
      setNotifications(mockNotifications);
    } catch (err) {
      setError('載入通知失敗');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      setNotifications(prev => 
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, []);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead
  };
}
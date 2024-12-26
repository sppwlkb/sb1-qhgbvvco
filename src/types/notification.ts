export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}
import { useState, useCallback } from 'react';
import { announcements as mockAnnouncements } from '../data/announcements';
import { ImportantAnnouncement } from '../types/announcement';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<ImportantAnnouncement[]>(mockAnnouncements);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      // 暫時使用模擬數據
      setAnnouncements(mockAnnouncements);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('載入公告時發生錯誤');
    } finally {
      setLoading(false);
    }
  }, []);

  const createAnnouncement = useCallback(async (
    title: string,
    content: string,
    priority: 'high' | 'medium' | 'low'
  ) => {
    try {
      setError(null);
      const newAnnouncement: ImportantAnnouncement = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString('zh-TW'),
        author: {
          id: '1',
          name: '系統'
        },
        priority
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    } catch (err) {
      console.error('Error creating announcement:', err);
      setError('建立公告時發生錯誤');
      throw err;
    }
  }, []);

  return {
    announcements,
    loading,
    error,
    createAnnouncement,
    fetchAnnouncements
  };
}
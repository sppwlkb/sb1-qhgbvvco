import { useCallback, useEffect, useState } from 'react';
import { ImportantAnnouncement } from '../types/announcement';
import { announcements as mockAnnouncements } from '../data/announcements';

export function useImportantAnnouncements() {
  const [announcements, setAnnouncements] = useState<ImportantAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // 暫時使用模擬數據
      setAnnouncements(mockAnnouncements);
    } catch (err) {
      setError('載入公告時發生錯誤');
      console.error('Error loading announcements:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const addAnnouncement = async (
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
      setError('建立公告時發生錯誤');
      throw err;
    }
  };

  return {
    announcements,
    loading,
    error,
    addAnnouncement,
    refreshAnnouncements: loadAnnouncements
  };
}
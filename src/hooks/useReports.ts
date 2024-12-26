import { useState, useCallback } from 'react';
import { addDoc } from 'firebase/firestore';
import { reportsRef } from '../lib/firebase/collections';
import { useAuth } from './useAuth';

export function useReports() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const createReport = useCallback(async (
    title: string,
    content: string,
    priority: string,
    assigneeId: string
  ) => {
    if (!user) throw new Error('需要登入才能建立回報');

    try {
      setError(null);
      const report = await addDoc(reportsRef, {
        title,
        content,
        priority,
        status: 'pending',
        reporter_id: user.id,
        assignee_id: assigneeId,
        department_id: user.departmentId,
        created_at: new Date(),
        updated_at: new Date()
      });

      return report;
    } catch (err) {
      const message = err instanceof Error ? err.message : '建立回報時發生錯誤';
      setError(message);
      throw new Error(message);
    }
  }, [user]);

  return {
    createReport,
    error
  };
}
import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Report } from '../types/report';

export function useReportManagement() {
  const { user } = useAuth();

  const acceptReport = useCallback(async (reportId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('reports')
        .update({ 
          status: 'in_progress',
          last_response: new Date().toISOString()
        })
        .eq('id', reportId);

      if (error) throw error;

      // 建立接收通知
      await supabase
        .from('report_notifications')
        .insert([{
          report_id: reportId,
          user_id: user.id,
          type: 'response_received',
          content: '案件已被接收並開始處理'
        }]);
    } catch (error) {
      console.error('Error accepting report:', error);
      throw error;
    }
  }, [user]);

  const rejectReport = useCallback(async (reportId: string, reason: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('reports')
        .update({ 
          status: 'rejected',
          last_response: new Date().toISOString()
        })
        .eq('id', reportId);

      if (error) throw error;

      // 建立退回通知
      await supabase
        .from('report_notifications')
        .insert([{
          report_id: reportId,
          user_id: user.id,
          type: 'response_received',
          content: `案件已被退回。原因：${reason}`
        }]);
    } catch (error) {
      console.error('Error rejecting report:', error);
      throw error;
    }
  }, [user]);

  const completeReport = useCallback(async (reportId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('reports')
        .update({ 
          status: 'completed',
          is_complete: true,
          manager_review: 'pending'
        })
        .eq('id', reportId);

      if (error) throw error;

      // 通知部門主管審核
      await supabase
        .from('report_notifications')
        .insert([{
          report_id: reportId,
          user_id: user.id,
          type: 'manager_review',
          content: '案件處理完成，等待主管審核'
        }]);
    } catch (error) {
      console.error('Error completing report:', error);
      throw error;
    }
  }, [user]);

  const reviewReport = useCallback(async (
    reportId: string,
    approved: boolean,
    comment?: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('reports')
        .update({ 
          manager_review: approved ? 'approved' : 'rejected',
          ceo_review: approved ? 'pending' : null,
          ceo_comment: comment
        })
        .eq('id', reportId);

      if (error) throw error;

      // 通知相關人員
      await supabase
        .from('report_notifications')
        .insert([{
          report_id: reportId,
          user_id: user.id,
          type: approved ? 'ceo_review' : 'manager_review',
          content: approved ? '案件已通過主管審核，等待總經理過目' : `案件未通過審核。原因：${comment}`
        }]);
    } catch (error) {
      console.error('Error reviewing report:', error);
      throw error;
    }
  }, [user]);

  return {
    acceptReport,
    rejectReport,
    completeReport,
    reviewReport
  };
}
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, X, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Report } from '../../types/report';
import { useAuth } from '../../hooks/useAuth';
import { useReportManagement } from '../../hooks/useReportManagement';
import SuccessMessage from '../ui/SuccessMessage';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
  onAddComment: (content: string) => void;
}

export default function ReportDetail({
  report,
  onClose,
  onUpdateStatus,
  onAddComment
}: ReportDetailProps) {
  const [comment, setComment] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();
  const { acceptReport, rejectReport, completeReport } = useReportManagement();

  // 計算剩餘回應時間
  const calculateTimeLeft = () => {
    if (!report.response_deadline) return null;
    const deadline = new Date(report.response_deadline);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return diff > 0 ? Math.floor(diff / 1000 / 60) : 0; // 轉換為分鐘
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // 每分鐘更新一次

    return () => clearInterval(timer);
  }, [report.response_deadline]);

  const handleAccept = async () => {
    try {
      await acceptReport(report.id);
      setSuccessMessage('已接收案件，開始處理');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error accepting report:', error);
    }
  };

  const handleReject = async () => {
    if (!rejectReason) return;
    try {
      await rejectReport(report.id, rejectReason);
      setSuccessMessage('已退回案件');
      setShowSuccess(true);
      setShowRejectDialog(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error rejecting report:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await completeReport(report.id);
      setSuccessMessage('案件已完成，等待主管審核');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error completing report:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await onAddComment(comment);
      setComment('');
      setSuccessMessage('留言已送出');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showSuccess && (
        <SuccessMessage 
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div className="bg-gray-900 w-full max-w-3xl max-h-[80vh] rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{report.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          <div className="space-y-6">
            {/* 回應時限提示 */}
            {timeLeft !== null && timeLeft < 180 && report.status === 'pending' && (
              <div className="flex items-center space-x-2 p-3 bg-yellow-500/20 text-yellow-300 rounded-lg">
                <Clock className="w-5 h-5" />
                <span>
                  {timeLeft > 60 
                    ? `剩餘回應時間：${Math.floor(timeLeft / 60)}小時${timeLeft % 60}分鐘`
                    : `剩餘回應時間：${timeLeft}分鐘`}
                </span>
              </div>
            )}

            {/* 案件內容 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">狀態：</span>
                  <span className={`px-3 py-1 rounded-full ${
                    report.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                    report.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' :
                    report.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {report.status === 'completed' ? '已完成' :
                     report.status === 'in_progress' ? '處理中' :
                     report.status === 'rejected' ? '已退回' :
                     '待處理'}
                  </span>
                </div>
                <span className="text-gray-400">
                  {new Date(report.created_at).toLocaleString('zh-TW')}
                </span>
              </div>
              <p className="text-white whitespace-pre-wrap">{report.content}</p>
            </div>

            {/* 操作按鈕 */}
            {user?.id === report.assignee.id && report.status === 'pending' && (
              <div className="flex space-x-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>接收案件</span>
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>退回案件</span>
                </button>
              </div>
            )}

            {user?.id === report.assignee.id && report.status === 'in_progress' && (
              <button
                onClick={handleComplete}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                <span>完成案件</span>
              </button>
            )}

            {/* 留言區域 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-300" />
                <h3 className="text-lg font-semibold text-white">留言</h3>
              </div>

              <form onSubmit={handleSubmitComment} className="flex space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="輸入留言..."
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 
                    transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>送出</span>
                </button>
              </form>

              <div className="space-y-4">
                {report.comments?.map((comment) => (
                  <div key={comment.id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{comment.user.name}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(comment.created_at).toLocaleString('zh-TW')}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 退回原因對話框 */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-white mb-4">退回原因</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 mb-4"
              placeholder="請說明退回原因..."
              rows={4}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                確認退回
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Send, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { employees } from '../../data/employees';
import UserSelector from '../ui/UserSelector';
import SuccessMessage from '../ui/SuccessMessage';

interface ReportFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    priority: string;
    assigneeId: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function ReportForm({ onSubmit, onCancel }: ReportFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !assigneeId) return;
    
    try {
      await onSubmit({
        title,
        content,
        priority,
        assigneeId
      });
      
      // 顯示成功訊息
      setShowSuccess(true);
      
      // 重置表單
      setTitle('');
      setContent('');
      setPriority('medium');
      setAssigneeId('');
      
      // 3秒後關閉成功訊息
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    }
  };

  // 獲取選中人員的資訊
  const selectedUser = employees.find(emp => emp.id === assigneeId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      {showSuccess && (
        <SuccessMessage 
          message="回報已成功送出！"
          onClose={() => setShowSuccess(false)}
        />
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          回報標題
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
            text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
          placeholder="請輸入回報標題"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
          回報內容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
            text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
          placeholder="請詳細描述問題或需求"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
            優先程度
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
              text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="high" className="bg-gray-800">高</option>
            <option value="medium" className="bg-gray-800">中</option>
            <option value="low" className="bg-gray-800">低</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            指派人員
          </label>
          <button
            type="button"
            onClick={() => setShowUserSelector(true)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
              text-white hover:bg-white/20 transition-colors flex items-center justify-between"
          >
            <span className="truncate">
              {selectedUser ? selectedUser.name : '選擇處理人員'}
            </span>
            <Users className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* 已選擇的人員資訊 */}
      {selectedUser && (
        <div className="p-3 bg-cyan-500/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
              flex items-center justify-center border border-cyan-500/30">
              <span className="text-lg font-medium text-cyan-300">{selectedUser.name[0]}</span>
            </div>
            <div>
              <p className="font-medium text-white">{selectedUser.name}</p>
              <p className="text-sm text-cyan-300">{selectedUser.position}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-2 bg-cyan-500 text-white 
            rounded-lg hover:bg-cyan-600 transition-colors"
          disabled={!title || !content || !assigneeId}
        >
          <Send className="w-4 h-4" />
          <span>送出回報</span>
        </button>
      </div>

      {showUserSelector && (
        <UserSelector
          selectedIds={assigneeId ? [assigneeId] : []}
          onSelect={(ids) => {
            setAssigneeId(ids[0]);
            setShowUserSelector(false);
          }}
          onClose={() => setShowUserSelector(false)}
        />
      )}
    </form>
  );
}
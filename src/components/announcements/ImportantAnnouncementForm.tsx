import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAnnouncements } from '../../hooks/useAnnouncements';

interface ImportantAnnouncementFormProps {
  onClose: () => void;
}

export default function ImportantAnnouncementForm({ onClose }: ImportantAnnouncementFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { createAnnouncement } = useAnnouncements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    try {
      setSubmitting(true);
      setError(null);
      await createAnnouncement(title, content, priority);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('發布公告時發生錯誤');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="公告標題"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
            text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
          required
        />
      </div>
      
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="公告內容"
          rows={4}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
            text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
            text-white focus:outline-none focus:border-cyan-500/50"
        >
          <option value="high">高優先</option>
          <option value="medium">中優先</option>
          <option value="low">低優先</option>
        </select>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            disabled={submitting}
          >
            取消
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2 bg-cyan-500 text-white 
              rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            disabled={submitting || !title || !content}
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? '發布中...' : '發布公告'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
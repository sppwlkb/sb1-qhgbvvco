import React from 'react';
import { Megaphone, AlertTriangle } from 'lucide-react';
import { ImportantAnnouncement } from '../../types/announcement';
import { useAuth } from '../../hooks/useAuth';

interface ImportantAnnouncementsProps {
  announcements: ImportantAnnouncement[];
}

export default function ImportantAnnouncements({ announcements }: ImportantAnnouncementsProps) {
  const { user } = useAuth();

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'low':
        return 'bg-green-500/20 text-green-300';
    }
  };

  if (announcements.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-cyan-500/20">
      <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 shadow-lg shadow-cyan-500/20">
              <AlertTriangle className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-xl font-bold text-cyan-100 tracking-wide">重要公告</h2>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-cyan-500/20">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-5 hover:bg-cyan-500/5 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Megaphone className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-100">{announcement.title}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityStyles(announcement.priority)}`}>
                  {announcement.priority === 'high' ? '重要' : 
                   announcement.priority === 'medium' ? '一般' : '通知'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-cyan-300/70">
                <span>{announcement.date}</span>
              </div>
            </div>
            <p className="text-base text-cyan-100/90 ml-8 leading-relaxed">
              {announcement.content}
            </p>
            <p className="text-sm text-cyan-300/70 ml-8 mt-2">
              發布者: {announcement.author.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
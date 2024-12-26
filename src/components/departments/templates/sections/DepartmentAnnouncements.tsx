import React from 'react';
import { Megaphone, Pin } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

interface DepartmentAnnouncementsProps {
  departmentId: string;
  isManager: boolean;
}

export default function DepartmentAnnouncements({ departmentId, isManager }: DepartmentAnnouncementsProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Megaphone className="w-5 h-5 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">部門公告</h2>
        </div>
        {isManager && (
          <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
            發布公告
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 置頂公告 */}
        <div className="p-4 bg-white/5 rounded-lg border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Pin className="w-4 h-4 text-cyan-300" />
              <h3 className="font-semibold text-white">本月部門目標</h3>
            </div>
            <span className="text-sm text-gray-400">2024-03-20</span>
          </div>
          <p className="text-gray-300">各位同仁好，本月我們將專注於...</p>
        </div>
      </div>
    </GlassCard>
  );
}
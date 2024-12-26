import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

export default function WorkLog() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <BookOpen className="w-5 h-5 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">工作日誌</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
          <Plus className="w-4 h-4" />
          <span>記錄</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* 日誌列表 */}
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white">系統優化工作</h3>
            <span className="text-sm text-gray-400">2024-03-20</span>
          </div>
          <p className="text-gray-300">完成資料庫效能優化，提升查詢速度約30%</p>
        </div>
      </div>
    </GlassCard>
  );
}
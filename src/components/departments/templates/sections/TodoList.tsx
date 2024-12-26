import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

interface TodoListProps {
  departmentId: string;
}

export default function TodoList({ departmentId }: TodoListProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <CheckSquare className="w-5 h-5 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">待辦事項</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
          <Plus className="w-4 h-4" />
          <span>新增</span>
        </button>
      </div>

      <div className="space-y-3">
        {/* 待辦事項列表 */}
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500/50" />
            <span className="text-gray-300">更新系統文件</span>
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500/50" />
            <span className="text-gray-300">檢查系統安全性</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
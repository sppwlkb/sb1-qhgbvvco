import React from 'react';
import { ListTodo } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

interface AssignedTasksProps {
  departmentId: string;
}

export default function AssignedTasks({ departmentId }: AssignedTasksProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <ListTodo className="w-5 h-5 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">指派任務</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white">系統維護</h3>
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">進行中</span>
          </div>
          <p className="text-sm text-gray-400">預計完成時間：2024-03-25</p>
        </div>
      </div>
    </GlassCard>
  );
}
import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

interface CustomModulesProps {
  departmentId: string;
  isManager: boolean;
}

export default function CustomModules({ departmentId, isManager }: CustomModulesProps) {
  const [modules, setModules] = useState([
    // 示例模組
    { id: 1, title: '專案進度追蹤', type: 'project-tracker' },
    { id: 2, title: '部門資源管理', type: 'resource-management' },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">自訂模組</h2>
        {isManager && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
            <Plus className="w-4 h-4" />
            <span>新增模組</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(module => (
          <GlassCard key={module.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{module.title}</h3>
              {isManager && (
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            {/* 模組內容區域 */}
            <div className="h-32 flex items-center justify-center bg-white/5 rounded-lg">
              <span className="text-gray-400">模組內容</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
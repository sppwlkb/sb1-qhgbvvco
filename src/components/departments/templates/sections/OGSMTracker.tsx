import React from 'react';
import { Target, CheckCircle } from 'lucide-react';
import GlassCard from '../../../ui/GlassCard';

interface OGSMTrackerProps {
  departmentId: string;
}

export default function OGSMTracker({ departmentId }: OGSMTrackerProps) {
  const objectives = [
    {
      id: 1,
      title: '提升客戶滿意度',
      progress: 75,
      actions: [
        { id: 1, title: '實施客戶回饋系統', completed: true },
        { id: 2, title: '優化服務流程', completed: false },
      ]
    },
    // 更多目標...
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Target className="w-5 h-5 text-cyan-300" />
          </div>
          <h2 className="text-xl font-bold text-white">OGSM 追蹤</h2>
        </div>
      </div>

      <div className="space-y-6">
        {objectives.map(objective => (
          <div key={objective.id} className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{objective.title}</h3>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${objective.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {objective.actions.map(action => (
                <div key={action.id} className="flex items-center space-x-3 p-2 rounded-lg bg-white/5">
                  <CheckCircle 
                    className={`w-5 h-5 ${action.completed ? 'text-green-400' : 'text-gray-500'}`}
                  />
                  <span className="text-gray-300">{action.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
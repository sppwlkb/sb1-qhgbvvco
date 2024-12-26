import React from 'react';
import { Users } from 'lucide-react';

const teamMembers = [
  { id: 1, name: '張小明', role: '前端開發', workload: 85 },
  { id: 2, name: '李小華', role: '後端開發', workload: 65 },
  { id: 3, name: '王大明', role: '專案經理', workload: 45 }
];

export default function TeamWorkload() {
  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">團隊工作量</h3>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              <span className="font-medium">{member.workload}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className={`h-full rounded-full ${getWorkloadColor(member.workload)}`}
                style={{ width: `${member.workload}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
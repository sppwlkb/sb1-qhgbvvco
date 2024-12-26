import React from 'react';
import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: '張小明',
    action: '完成了任務',
    target: '系統效能優化 Phase 1',
    time: '10 分鐘前',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 2,
    user: '李小華',
    action: '新增了評論於',
    target: '客戶需求文件',
    time: '30 分鐘前',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 3,
    user: '王大明',
    action: '更新了專案狀態',
    target: '新版本發布計畫',
    time: '1 小時前',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  }
];

export default function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">最近活動</h3>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-800">
                <span className="font-medium">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium text-blue-600">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
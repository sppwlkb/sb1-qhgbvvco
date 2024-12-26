import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const notifications = [
  {
    id: '1',
    title: '專案進度更新',
    message: '「新版本開發」專案已完成 80% 的進度',
    type: 'info',
    time: '10 分鐘前',
    read: false
  },
  {
    id: '2',
    title: '系統維護通知',
    message: '系統將於今晚 23:00 進行例行維護',
    type: 'warning',
    time: '30 分鐘前',
    read: false
  },
  {
    id: '3',
    title: '任務完成',
    message: '「客戶需求文件」已經完成審核',
    type: 'success',
    time: '2 小時前',
    read: true
  }
];

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">通知中心</h1>
          <p className="text-gray-400">查看所有系統通知與更新</p>
        </div>
        <button className="text-cyan-300 hover:text-cyan-200 transition-colors">
          全部標為已讀
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <GlassCard 
            key={notification.id} 
            className={`p-4 ${!notification.read ? 'border-l-4 border-l-cyan-500' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-white/10">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-white">{notification.title}</h3>
                  <span className="text-sm text-gray-400">{notification.time}</span>
                </div>
                <p className="text-gray-300">{notification.message}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
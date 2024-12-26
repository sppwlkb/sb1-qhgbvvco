import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const tasks = [
  { id: 1, title: '客戶需求分析報告', status: 'completed', date: '2024-03-20', priority: 'high' },
  { id: 2, title: '系統效能優化', status: 'in-progress', date: '2024-03-21', priority: 'medium' },
  { id: 3, title: '新功能開發評估', status: 'pending', date: '2024-03-22', priority: 'low' },
];

export default function TaskSummary() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">任務摘要</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(task.status)}
              <div>
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-sm text-gray-500">期限：{task.date}</p>
              </div>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
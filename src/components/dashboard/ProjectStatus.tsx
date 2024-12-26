import React from 'react';
import { Briefcase } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: '系統升級專案',
    progress: 75,
    status: '進行中',
    deadline: '2024-04-15',
    team: ['張小明', '李小華', '王大明']
  },
  {
    id: 2,
    name: '客戶需求分析',
    progress: 90,
    status: '即將完成',
    deadline: '2024-03-30',
    team: ['陳小玉', '林小美']
  },
  {
    id: 3,
    name: '新功能開發',
    progress: 30,
    status: '進行中',
    deadline: '2024-05-01',
    team: ['黃小龍', '吳小倫', '趙小雯']
  }
];

export default function ProjectStatus() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">專案狀態</h3>
        <Briefcase className="w-5 h-5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-600">專案名稱</th>
              <th className="text-left py-3 px-4 text-gray-600">進度</th>
              <th className="text-left py-3 px-4 text-gray-600">狀態</th>
              <th className="text-left py-3 px-4 text-gray-600">期限</th>
              <th className="text-left py-3 px-4 text-gray-600">團隊</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-800">{project.name}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full w-24">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {project.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{project.deadline}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                        title={member}
                      >
                        <span className="text-xs font-medium">{member[0]}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
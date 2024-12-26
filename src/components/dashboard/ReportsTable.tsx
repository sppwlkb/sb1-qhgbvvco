import React from 'react';
import { PieChart } from 'lucide-react';
import { ESG_REPORTS } from '../../data/esg-data';
import StatusBadge from '../ui/StatusBadge';

export default function ReportsTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">ESG 報告生成記錄</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-600">報告名稱</th>
              <th className="text-left py-3 px-4 text-gray-600">生成日期</th>
              <th className="text-left py-3 px-4 text-gray-600">覆蓋期間</th>
              <th className="text-left py-3 px-4 text-gray-600">狀態</th>
            </tr>
          </thead>
          <tbody>
            {ESG_REPORTS.map((report) => (
              <tr key={report.name} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{report.name}</td>
                <td className="py-3 px-4">{report.date}</td>
                <td className="py-3 px-4">{report.period}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={report.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
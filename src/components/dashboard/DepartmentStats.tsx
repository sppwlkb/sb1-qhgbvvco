import React from 'react';
import { PieChart } from 'lucide-react';
import { employees } from '../../data/employees';
import { departments } from '../../data/departments';

export default function DepartmentStats() {
  const departmentCounts = departments.map(dept => ({
    ...dept,
    count: employees.filter(emp => emp.departmentId === dept.id).length
  }));

  const total = employees.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">部門分布</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {departmentCounts.map(dept => {
          const percentage = (dept.count / total) * 100;
          return (
            <div key={dept.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${dept.color}`}></span>
                  {dept.name}
                </span>
                <span className="font-medium">{dept.count}人 ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${dept.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
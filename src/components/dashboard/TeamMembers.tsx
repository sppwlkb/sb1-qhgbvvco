import React from 'react';
import { Users } from 'lucide-react';
import { employees } from '../../data/employees';
import { departments } from '../../data/departments';

export default function TeamMembers() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">團隊成員</h3>
        <Users className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-6">
        {departments.map(dept => {
          const deptEmployees = employees.filter(emp => emp.departmentId === dept.id);
          if (deptEmployees.length === 0) return null;
          
          return (
            <div key={dept.id} className="space-y-3">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${dept.color}`}></span>
                {dept.name}
                <span className="text-sm text-gray-500">({deptEmployees.length}人)</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {deptEmployees.map(emp => (
                  <div key={emp.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">{emp.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{emp.name}</p>
                      <p className="text-sm text-gray-500">{emp.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { Crown, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DepartmentReport from './ceo/DepartmentReport';
import SalesOverview from './ceo/SalesOverview';
import { departmentReports } from '../../data/department-reports';

export default function CEOSection() {
  const { user } = useAuth();

  if (user?.id !== 'A0001') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl text-white font-semibold">無權限訪問</h2>
          <p className="text-gray-400 mt-2">此為總經理專屬區域</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Crown className="w-8 h-8 text-cyan-300" />
          <h1 className="text-2xl font-bold text-white">總經理專區</h1>
        </div>
        <p className="text-gray-400 mt-2 ml-11">部門報告與營運概況</p>
      </div>

      {/* 業績總覽 */}
      <div className="mb-6">
        <SalesOverview />
      </div>

      {/* 部門報告 */}
      <div className="grid grid-cols-1 gap-6">
        {departmentReports.map(department => (
          <DepartmentReport 
            key={department.id} 
            department={department}
          />
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

interface DepartmentReportProps {
  department: {
    id: string;
    name: string;
    reports: Array<{
      id: string;
      title: string;
      status: 'pending' | 'completed' | 'delayed';
      date: string;
      content: string;
    }>;
  };
}

export default function DepartmentReport({ department }: DepartmentReportProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-300" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5 text-red-300" />;
      default:
        return <FileText className="w-5 h-5 text-yellow-300" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      case 'delayed':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-yellow-500/20 text-yellow-300';
    }
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold text-white mb-4">{department.name}</h3>
      <div className="space-y-4">
        {department.reports.map((report) => (
          <div 
            key={report.id}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(report.status)}
                <h4 className="font-medium text-white">{report.title}</h4>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusClass(report.status)}`}>
                {report.status === 'completed' ? '已完成' : 
                 report.status === 'delayed' ? '延遲' : '進行中'}
              </span>
            </div>
            <p className="text-gray-300 ml-8">{report.content}</p>
            <div className="mt-2 ml-8 text-sm text-gray-400">
              {report.date}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
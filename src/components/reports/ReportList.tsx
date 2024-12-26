import React from 'react';
import { FileText, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Report } from '../../types/report';
import GlassCard from '../ui/GlassCard';

interface ReportListProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

export default function ReportList({ reports, onSelectReport }: ReportListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待處理';
      case 'in_progress':
        return '處理中';
      case 'completed':
        return '已完成';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'low':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return priority;
    }
  };

  if (reports.length === 0) {
    return (
      <GlassCard className="p-6 text-center">
        <p className="text-gray-400">目前沒有任何回報案件</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <GlassCard
          key={report.id}
          onClick={() => onSelectReport(report)}
          className="p-4 hover:bg-white/15 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <FileText className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                <p className="text-sm text-gray-400">
                  回報者: {report.reporter.name} | 負責人: {report.assignee.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(report.priority)}`}>
                {getPriorityText(report.priority)}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full ${
                report.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                report.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {getStatusText(report.status)}
              </span>
              {getStatusIcon(report.status)}
            </div>
          </div>
          <p className="text-gray-300 line-clamp-2 ml-12">{report.content}</p>
          <div className="flex justify-between items-center mt-3 ml-12">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>建立時間: {new Date(report.created_at).toLocaleString('zh-TW')}</span>
            </div>
            <span className="text-sm text-gray-400">
              {report.comments?.length || 0} 則留言
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
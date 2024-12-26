import React, { useState, useEffect } from 'react';
import { FileText, Plus, Filter } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import ReportForm from '../components/reports/ReportForm';
import ReportList from '../components/reports/ReportList';
import ReportDetail from '../components/reports/ReportDetail';
import { useReports } from '../hooks/useReports';
import { Report } from '../types/report';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ReportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchReports, createReport, updateReportStatus, addReportComment } = useReports();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReport = async (data: {
    title: string;
    content: string;
    priority: string;
    assigneeId: string;
  }) => {
    try {
      await createReport(data.title, data.content, data.priority, data.assigneeId);
      setShowForm(false);
      loadReports();
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedReport) return;
    try {
      await updateReportStatus(selectedReport.id, status);
      loadReports();
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedReport) return;
    try {
      await addReportComment(selectedReport.id, content);
      loadReports();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">回報管理</h1>
          <p className="text-gray-400">管理與追蹤各類回報的進度</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 
            rounded-lg hover:bg-cyan-500/30 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>新增回報</span>
        </button>
      </div>

      {showForm && (
        <GlassCard className="mb-6 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">新增回報</h2>
          <ReportForm
            onSubmit={handleSubmitReport}
            onCancel={() => setShowForm(false)}
          />
        </GlassCard>
      )}

      <ReportList
        reports={reports}
        onSelectReport={setSelectedReport}
      />

      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}
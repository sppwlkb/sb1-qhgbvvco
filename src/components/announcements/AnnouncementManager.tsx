import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import ImportantAnnouncements from './ImportantAnnouncements';
import ImportantAnnouncementForm from './ImportantAnnouncementForm';
import GlassCard from '../ui/GlassCard';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function AnnouncementManager() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { 
    announcements, 
    loading, 
    error,
    fetchAnnouncements
  } = useAnnouncements();

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const canCreateAnnouncement = user?.role === 'manager' || user?.role === 'ceo';

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {canCreateAnnouncement && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 
              rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>發布公告</span>
          </button>
        </div>
      )}

      {showForm && (
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">發布新公告</h2>
          <ImportantAnnouncementForm onClose={() => setShowForm(false)} />
        </GlassCard>
      )}

      <ImportantAnnouncements announcements={announcements} />
    </div>
  );
}
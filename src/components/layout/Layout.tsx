import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardLayout from '../dashboard/DashboardLayout';
import DepartmentRouter from '../departments/DepartmentRouter';
import PrivateSection from '../private/PrivateSection';
import CEOSection from '../private/CEOSection';
import ReportsPage from '../../pages/ReportsPage';
import NotificationsPage from '../../pages/NotificationsPage';
import CollaborationPage from '../../pages/CollaborationPage';
import AnalyticsPage from '../../pages/AnalyticsPage';
import AIPage from '../../pages/AIPage';
import MobilePage from '../../pages/MobilePage';
import SecurityPage from '../../pages/SecurityPage';
import PermissionsPage from '../../pages/PermissionsPage';
import ESGPage from '../../pages/ESGPage';
import SettingsPage from '../../pages/SettingsPage';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-slate-900">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 mt-16">
          <Routes>
            <Route index element={<DashboardLayout />} />
            <Route path="departments/*" element={<DepartmentRouter />} />
            <Route path="private-section" element={<PrivateSection />} />
            <Route path="ceo-section" element={<CEOSection />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="collaboration" element={<CollaborationPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="ai" element={<AIPage />} />
            <Route path="mobile" element={<MobilePage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
            <Route path="esg" element={<ESGPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
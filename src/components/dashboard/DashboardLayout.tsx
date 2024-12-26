import React from 'react';
import AnnouncementManager from '../announcements/AnnouncementManager';
import DashboardStats from './DashboardStats';
import TaskSummary from './TaskSummary';
import RecentActivities from './RecentActivities';
import PerformanceChart from './PerformanceChart';
import TeamWorkload from './TeamWorkload';
import ProjectStatus from './ProjectStatus';
import TeamMembers from './TeamMembers';
import DepartmentStats from './DepartmentStats';

export default function DashboardLayout() {
  return (
    <div className="space-y-6">
      {/* 重要公告區域 */}
      <AnnouncementManager />
      
      {/* 頂部統計卡片 */}
      <DashboardStats />
      
      {/* 主要內容區域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskSummary />
        <PerformanceChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <TeamWorkload />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TeamMembers />
        </div>
        <DepartmentStats />
      </div>
      
      <ProjectStatus />
    </div>
  );
}
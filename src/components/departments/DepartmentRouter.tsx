import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { departments } from '../../data/departments';
import UIUXDepartment from './departments/UIUXDepartment';
import FrontendDepartment from './departments/FrontendDepartment';
import BackendDepartment from './departments/BackendDepartment';
import MISDepartment from './MISDepartment';
import DepartmentTemplate from './templates/DepartmentTemplate';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DepartmentRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">請先登入系統</p>
      </div>
    );
  }

  // MIS 部門有特殊的管理介面
  if (user.departmentId === 'mis') {
    return <MISDepartment />;
  }

  // 根據用戶部門返回對應的部門頁面
  const department = departments.find(d => d.id === user.departmentId);
  if (!department) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">無法找到對應的部門頁面</p>
      </div>
    );
  }

  // 特定部門使用專屬頁面
  switch (user.departmentId) {
    case 'ui_ux':
      return <UIUXDepartment user={user} />;
    case 'frontend':
      return <FrontendDepartment user={user} />;
    case 'backend':
      return <BackendDepartment user={user} />;
    default:
      // 其他部門使用通用模板
      return (
        <DepartmentTemplate 
          department={department}
          isManager={user.role === 'manager'}
        />
      );
  }
}
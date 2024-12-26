import React, { useState } from 'react';
import { AuthUser } from '../../../hooks/useAuth';
import DepartmentHeader from '../DepartmentHeader';
import TabNavigation from '../TabNavigation';
import { departments } from '../../../data/departments';

interface BackendDepartmentProps {
  user: AuthUser;
}

export default function BackendDepartment({ user }: BackendDepartmentProps) {
  const [activeTab, setActiveTab] = useState('tasks');
  const department = departments.find(d => d.id === 'backend')!;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <DepartmentHeader department={department} />
      
      <div className="mt-8 mb-6">
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 後端部門特有的內容 */}
      </div>
    </div>
  );
}
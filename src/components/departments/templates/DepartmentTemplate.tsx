import React from 'react';
import { Plus } from 'lucide-react';
import DepartmentAnnouncements from './sections/DepartmentAnnouncements';
import TodoList from './sections/TodoList';
import AssignedTasks from './sections/AssignedTasks';
import WorkLog from './sections/WorkLog';
import AiAssistant from '../../common/AiAssistant';
import OGSMTracker from './sections/OGSMTracker';
import CustomModules from './sections/CustomModules';
import { Department } from '../../../types/department';

interface DepartmentTemplateProps {
  department: Department;
  isManager: boolean;
}

export default function DepartmentTemplate({ department, isManager }: DepartmentTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* 部門公告欄 */}
      <DepartmentAnnouncements departmentId={department.id} isManager={isManager} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左側欄 */}
        <div className="space-y-6">
          <TodoList departmentId={department.id} />
          <AssignedTasks departmentId={department.id} />
        </div>
        
        {/* 右側欄 */}
        <div className="space-y-6">
          <WorkLog />
          <OGSMTracker departmentId={department.id} />
        </div>
      </div>

      {/* AI助理 (固定在右下角) */}
      <AiAssistant />

      {/* 自訂模組區域 */}
      <CustomModules departmentId={department.id} isManager={isManager} />
    </div>
  );
}
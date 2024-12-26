import React, { useState } from 'react';
import { AuthUser } from '../../../hooks/useAuth';
import DepartmentHeader from '../DepartmentHeader';
import TabNavigation from '../TabNavigation';
import ResourceCard from '../ResourceCard';
import ProjectCard from '../ProjectCard';
import { designResources } from '../../../data/design-resources';
import { designProjects } from '../../../data/design-projects';
import { departments } from '../../../data/departments';

interface UIUXDepartmentProps {
  user: AuthUser;
}

export default function UIUXDepartment({ user }: UIUXDepartmentProps) {
  const [activeTab, setActiveTab] = useState('resources');
  const department = departments.find(d => d.id === 'ui_ux')!;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <DepartmentHeader department={department} />
      
      <div className="mt-8 mb-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
export type DepartmentId = 'ui_ux' | 'frontend' | 'backend';

export interface Department {
  id: DepartmentId;
  name: string;
  color: string;
  description: string;
  tags: string[];
}

export interface DesignResource {
  id: string;
  title: string;
  type: 'component' | 'template' | 'guideline' | 'asset';
  description: string;
  thumbnail: string;
  updatedAt: string;
  author: string;
}

export interface DesignProject {
  id: string;
  title: string;
  status: 'in-progress' | 'review' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  thumbnail: string;
}
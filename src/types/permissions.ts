export type Permission = 
  | 'manage_users'
  | 'manage_departments'
  | 'view_reports'
  | 'edit_reports'
  | 'manage_projects'
  | 'view_analytics'
  | 'manage_settings';

export type PermissionGroup = {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
};

export interface UserPermissions {
  userId: string;
  permissions: Permission[];
  groupId?: string;
}
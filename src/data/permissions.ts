import { Permission, PermissionGroup } from '../types/permissions';

export const DEFAULT_PERMISSIONS: Record<string, Permission[]> = {
  ceo: [
    'manage_users',
    'manage_departments',
    'view_reports',
    'edit_reports',
    'manage_projects',
    'view_analytics',
    'manage_settings'
  ],
  manager: [
    'view_reports',
    'edit_reports',
    'manage_projects',
    'view_analytics'
  ],
  employee: [
    'view_reports',
    'view_analytics'
  ]
};

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    id: 'admin',
    name: '系統管理員',
    permissions: [
      'manage_users',
      'manage_departments',
      'view_reports',
      'edit_reports',
      'manage_projects',
      'view_analytics',
      'manage_settings'
    ],
    description: '完整的系統管理權限'
  },
  {
    id: 'department_manager',
    name: '部門主管',
    permissions: [
      'view_reports',
      'edit_reports',
      'manage_projects',
      'view_analytics'
    ],
    description: '部門管理所需的權限'
  },
  {
    id: 'report_editor',
    name: '報表編輯者',
    permissions: [
      'view_reports',
      'edit_reports',
      'view_analytics'
    ],
    description: '可以查看和編輯報表'
  },
  {
    id: 'basic_user',
    name: '一般使用者',
    permissions: [
      'view_reports',
      'view_analytics'
    ],
    description: '基本的查看權限'
  }
];
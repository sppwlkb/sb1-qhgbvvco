import { useCallback } from 'react';
import { Permission } from '../types/permissions';
import { DEFAULT_PERMISSIONS } from '../data/permissions';
import { employees } from '../data/employees';

export function usePermissions() {
  const checkPermission = useCallback((userId: string, permission: Permission): boolean => {
    const employee = employees.find(emp => emp.id === userId);
    if (!employee) return false;
    
    const rolePermissions = DEFAULT_PERMISSIONS[employee.role] || [];
    return rolePermissions.includes(permission);
  }, []);

  const getUserPermissions = useCallback((userId: string): Permission[] => {
    const employee = employees.find(emp => emp.id === userId);
    if (!employee) return [];
    
    return DEFAULT_PERMISSIONS[employee.role] || [];
  }, []);

  return {
    checkPermission,
    getUserPermissions
  };
}
import { useState, useCallback } from 'react';

interface DepartmentPermission {
  departmentId: string;
  permissions: string[];
}

export function useDepartmentPermissions() {
  const [permissions, setPermissions] = useState<DepartmentPermission[]>([]);

  const updatePermissions = useCallback((departmentId: string, newPermissions: string[]) => {
    setPermissions(prev => {
      const index = prev.findIndex(p => p.departmentId === departmentId);
      if (index === -1) {
        return [...prev, { departmentId, permissions: newPermissions }];
      }
      const updated = [...prev];
      updated[index] = { departmentId, permissions: newPermissions };
      return updated;
    });
  }, []);

  const checkPermission = useCallback((departmentId: string, permission: string): boolean => {
    const departmentPerms = permissions.find(p => p.departmentId === departmentId);
    return departmentPerms?.permissions.includes(permission) || false;
  }, [permissions]);

  return {
    permissions,
    updatePermissions,
    checkPermission
  };
}
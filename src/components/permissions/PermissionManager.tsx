import React, { useState } from 'react';
import { Shield, Users, Check } from 'lucide-react';
import { employees } from '../../data/employees';
import { PERMISSION_GROUPS } from '../../data/permissions';
import { usePermissions } from '../../hooks/usePermissions';

export default function PermissionManager() {
  const [selectedUser, setSelectedUser] = useState('');
  const { getUserPermissions } = usePermissions();
  
  const userPermissions = selectedUser ? getUserPermissions(selectedUser) : [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-700">權限管理</h3>
          <Shield className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-6">
          {/* 使用者選擇 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              選擇使用者
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">請選擇使用者</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.position}
                </option>
              ))}
            </select>
          </div>

          {selectedUser && (
            <>
              {/* 當前權限 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">當前權限</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {userPermissions.map(permission => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 權限群組 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">可用權限群組</h4>
                <div className="space-y-3">
                  {PERMISSION_GROUPS.map(group => (
                    <div
                      key={group.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-800">{group.name}</h5>
                        <span className="text-sm text-gray-500">
                          {group.permissions.length} 個權限
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.permissions.map(permission => (
                          <span
                            key={permission}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
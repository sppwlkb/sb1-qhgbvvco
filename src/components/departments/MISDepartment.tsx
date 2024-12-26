import React, { useState } from 'react';
import { Settings, Shield, Edit2, Eye, Save } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { departments } from '../../data/departments';
import { usePermissions } from '../../hooks/usePermissions';

export default function MISDepartment() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const { checkPermission } = usePermissions();
  
  const departmentPermissions = [
    { id: 'edit_content', label: '編輯內容' },
    { id: 'manage_users', label: '管理成員' },
    { id: 'view_analytics', label: '查看分析' },
    { id: 'manage_settings', label: '管理設定' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">MIS 部門管理</h1>
        <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
          儲存變更
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 部門列表 */}
        <div className="lg:col-span-1">
          <GlassCard className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">部門列表</h2>
            <div className="space-y-2">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`w-full p-3 rounded-lg flex items-center justify-between
                    ${selectedDepartment === dept.id 
                      ? 'bg-cyan-500/20 text-cyan-300' 
                      : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <span>{dept.name}</span>
                  {selectedDepartment === dept.id && <Edit2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* 權限設定 */}
        <div className="lg:col-span-2">
          {selectedDepartment ? (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-cyan-300" />
                  <h2 className="text-xl font-semibold text-white">
                    {departments.find(d => d.id === selectedDepartment)?.name} - 權限設定
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* 權限清單 */}
                <div className="space-y-4">
                  {departmentPermissions.map(permission => (
                    <div key={permission.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-cyan-500/20">
                          {permission.id === 'edit_content' ? <Edit2 className="w-4 h-4 text-cyan-300" /> :
                           permission.id === 'view_analytics' ? <Eye className="w-4 h-4 text-cyan-300" /> :
                           <Settings className="w-4 h-4 text-cyan-300" />}
                        </div>
                        <span className="text-white">{permission.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* 儲存按鈕 */}
                <div className="flex justify-end">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <Save className="w-4 h-4" />
                    <span>儲存權限設定</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">請選擇要管理的部門</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
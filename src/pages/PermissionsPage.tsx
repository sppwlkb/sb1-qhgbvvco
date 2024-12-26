import React from 'react';
import { Lock } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import PermissionManager from '../components/permissions/PermissionManager';

export default function PermissionsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">權限管理</h1>
        <p className="text-gray-400">使用者權限設定與管理</p>
      </div>

      <PermissionManager />
    </div>
  );
}
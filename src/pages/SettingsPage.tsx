import React from 'react';
import { Settings } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import LogoUploader from '../components/logo/LogoUploader';

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">設定</h1>
        <p className="text-gray-400">系統設定與個人化配置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <LogoUploader />
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white">其他設定</h2>
          </div>
          <p className="text-gray-300">其他設定功能開發中...</p>
        </GlassCard>
      </div>
    </div>
  );
}
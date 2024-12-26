import React from 'react';
import { Shield } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function SecurityPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">系統安全</h1>
        <p className="text-gray-400">安全設定與監控</p>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-cyan-300" />
          <h2 className="text-xl font-semibold text-white">安全功能</h2>
        </div>
        <p className="text-gray-300">安全功能開發中...</p>
      </GlassCard>
    </div>
  );
}
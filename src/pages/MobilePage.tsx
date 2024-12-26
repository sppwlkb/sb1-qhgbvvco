import React from 'react';
import { Smartphone } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function MobilePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">行動應用</h1>
        <p className="text-gray-400">行動裝置相關功能與設定</p>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="w-5 h-5 text-cyan-300" />
          <h2 className="text-xl font-semibold text-white">行動功能</h2>
        </div>
        <p className="text-gray-300">行動應用功能開發中...</p>
      </GlassCard>
    </div>
  );
}
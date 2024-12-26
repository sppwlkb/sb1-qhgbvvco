import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">數據分析</h1>
        <p className="text-gray-400">業務數據與趨勢分析</p>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart2 className="w-5 h-5 text-cyan-300" />
          <h2 className="text-xl font-semibold text-white">數據總覽</h2>
        </div>
        <p className="text-gray-300">數據分析功能開發中...</p>
      </GlassCard>
    </div>
  );
}
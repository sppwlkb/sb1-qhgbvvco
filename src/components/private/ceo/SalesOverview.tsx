import React from 'react';
import { TrendingUp, DollarSign, Users, ShoppingBag } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

interface SalesStat {
  label: string;
  value: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

const salesStats: SalesStat[] = [
  {
    label: '本月業績',
    value: 'NT$ 8,520,000',
    trend: { value: 15, isPositive: true },
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    label: '新客戶數',
    value: '24',
    trend: { value: 8, isPositive: true },
    icon: <Users className="w-6 h-6" />
  },
  {
    label: '訂單數量',
    value: '156',
    trend: { value: 12, isPositive: true },
    icon: <ShoppingBag className="w-6 h-6" />
  }
];

export default function SalesOverview() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <TrendingUp className="w-6 h-6 text-cyan-300" />
          </div>
          <h3 className="text-xl font-semibold text-white">業務部績效總覽</h3>
        </div>
        <span className="text-sm text-gray-400">更新時間: 2024-03-21</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salesStats.map((stat, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{stat.label}</span>
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{stat.trend.isPositive ? '↑' : '↓'}</span>
                <span>{stat.trend.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  trend, 
  icon, 
  color = 'text-blue-300',
  bgColor = 'bg-blue-500/20'
}: StatsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium text-gray-200">{title}</h3>
        {icon && <div className={`p-3 rounded-lg ${bgColor} ${color}`}>{icon}</div>}
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {trend && (
        <div className="mt-3 flex items-center">
          <span className={`text-base ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-base text-gray-300 ml-2">vs 上月</span>
        </div>
      )}
    </div>
  );
}
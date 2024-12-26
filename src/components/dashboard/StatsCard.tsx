import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, color, trend }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {trend && (
        <div className="mt-2 flex items-center">
          <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs 上月</span>
        </div>
      )}
    </div>
  );
}
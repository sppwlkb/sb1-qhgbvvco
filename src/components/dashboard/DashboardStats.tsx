import React from 'react';
import { Users, FileCheck, AlertCircle, Clock } from 'lucide-react';
import StatsCard from '../ui/StatsCard';

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="進行中案件"
        value="24"
        trend={{ value: 12, isPositive: true }}
        icon={<FileCheck className="w-7 h-7" />}
        color="text-blue-300"
        bgColor="bg-blue-500/20"
      />
      <StatsCard
        title="待處理事項"
        value="8"
        trend={{ value: 3, isPositive: false }}
        icon={<Clock className="w-7 h-7" />}
        color="text-yellow-300"
        bgColor="bg-yellow-500/20"
      />
      <StatsCard
        title="異常通報"
        value="2"
        trend={{ value: 50, isPositive: true }}
        icon={<AlertCircle className="w-7 h-7" />}
        color="text-red-300"
        bgColor="bg-red-500/20"
      />
      <StatsCard
        title="在線團隊"
        value="16"
        trend={{ value: 4, isPositive: true }}
        icon={<Users className="w-7 h-7" />}
        color="text-green-300"
        bgColor="bg-green-500/20"
      />
    </div>
  );
}
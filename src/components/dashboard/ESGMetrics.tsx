import React from 'react';
import StatsCard from './StatsCard';
import TimeFilter from './TimeFilter';
import SustainabilityGoals from './SustainabilityGoals';
import InitiativesList from './InitiativesList';
import ReportsTable from './ReportsTable';

export default function ESGMetrics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">ESG 永續發展指標</h2>
        <TimeFilter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="減少紙張使用"
          value="2,450張"
          color="text-green-600"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="碳排放減少"
          value="127kg"
          color="text-emerald-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="能源效率提升"
          value="18%"
          color="text-blue-600"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SustainabilityGoals />
        <InitiativesList />
      </div>

      <ReportsTable />
    </div>
  );
}
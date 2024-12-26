import React from 'react';
import { BarChart } from 'lucide-react';
import { SUSTAINABILITY_GOALS } from '../../data/esg-data';

export default function SustainabilityGoals() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">永續目標達成率</h3>
        <BarChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {SUSTAINABILITY_GOALS.map((goal) => (
          <div key={goal.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{goal.label}</span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
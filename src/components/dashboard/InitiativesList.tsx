import React from 'react';
import { Boxes } from 'lucide-react';
import { INITIATIVES } from '../../data/esg-data';
import StatusBadge from '../ui/StatusBadge';

export default function InitiativesList() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">永續發展重點項目</h3>
        <Boxes className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {INITIATIVES.map((item) => (
          <div key={item.title} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
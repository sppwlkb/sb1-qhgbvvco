import React from 'react';
import { Leaf } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import ESGMetrics from '../components/dashboard/ESGMetrics';

export default function ESGPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">ESG 報告</h1>
        <p className="text-gray-400">永續發展指標與報告</p>
      </div>

      <ESGMetrics />
    </div>
  );
}
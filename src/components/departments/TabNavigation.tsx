import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex space-x-1 bg-white/5 p-1 rounded-lg">
      <button
        onClick={() => onTabChange('resources')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${activeTab === 'resources' 
            ? 'bg-white/10 text-white' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        設計資源庫
      </button>
      <button
        onClick={() => onTabChange('projects')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${activeTab === 'projects' 
            ? 'bg-white/10 text-white' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        進行中專案
      </button>
    </div>
  );
}
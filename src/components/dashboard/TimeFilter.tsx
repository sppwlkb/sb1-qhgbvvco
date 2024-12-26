import React from 'react';

export default function TimeFilter() {
  return (
    <div className="flex space-x-2">
      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
        本月
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
        本季
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
        年度
      </button>
    </div>
  );
}
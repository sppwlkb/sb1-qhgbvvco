import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '進行中':
        return 'bg-blue-100 text-blue-800';
      case '處理中':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`text-sm px-2 py-1 rounded-full ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
}
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg shadow-lg">
      <CheckCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
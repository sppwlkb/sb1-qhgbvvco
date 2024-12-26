import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export default function Card({ children, className = '', gradient = false }: CardProps) {
  return (
    <div className={`
      rounded-lg shadow-lg overflow-hidden
      ${gradient 
        ? 'bg-gradient-to-br from-surface-light to-surface-DEFAULT border border-surface-light/20' 
        : 'bg-surface-DEFAULT border border-surface-light/10'}
      ${className}
    `}>
      {children}
    </div>
  );
}
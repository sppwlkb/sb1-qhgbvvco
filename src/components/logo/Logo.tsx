import React from 'react';
import { useLogoContext } from '../../contexts/LogoContext';
import { Circuit } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { logo } = useLogoContext();
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (!logo) {
    return <Circuit className={`${sizeClasses[size]} ${className} text-cyan-300`} />;
  }

  return (
    <img
      src={logo}
      alt="公司 Logo"
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
}
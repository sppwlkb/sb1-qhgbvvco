import React from 'react';
import { Clock, User } from 'lucide-react';
import { DesignResource } from '../../types/department';

interface ResourceCardProps {
  resource: DesignResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`
            px-3 py-1 text-xs font-medium rounded-full
            ${resource.type === 'component' ? 'bg-purple-500/20 text-purple-300' :
              resource.type === 'template' ? 'bg-blue-500/20 text-blue-300' :
              resource.type === 'guideline' ? 'bg-green-500/20 text-green-300' :
              'bg-gray-500/20 text-gray-300'}
          `}>
            {resource.type}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{resource.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{resource.updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
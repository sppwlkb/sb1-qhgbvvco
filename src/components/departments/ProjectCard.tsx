import React from 'react';
import { Calendar, User } from 'lucide-react';
import { DesignProject } from '../../types/department';

interface ProjectCardProps {
  project: DesignProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300';
      case 'review':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'low':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <User className="w-4 h-4" />
            <span>{project.assignee}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{project.dueDate}</span>
          </div>
        </div>
        
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
    </div>
  );
}
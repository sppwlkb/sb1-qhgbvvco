import React, { useState } from 'react';
import { 
  Users, Layout, Palette, Component, FileSearch,
  Layers, PenTool, Figma, Zap, Plus
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { departments } from '../data/departments';
import { designResources } from '../data/design-resources';
import { designProjects } from '../data/design-projects';

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState('resources');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">UI/UX 設計部</h1>
        <p className="text-gray-300">設計系統與使用者體驗優化</p>
      </div>

      {/* 快速操作按鈕 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 transition-colors">
          <Component className="w-5 h-5" />
          <span>新增元件</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-colors">
          <Figma className="w-5 h-5" />
          <span>Figma 連結</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 transition-colors">
          <PenTool className="w-5 h-5" />
          <span>建立設計稿</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 transition-colors">
          <FileSearch className="w-5 h-5" />
          <span>查看指南</span>
        </button>
      </div>

      {/* 分頁選單 */}
      <div className="flex space-x-1 mb-6 bg-white/5 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeTab === 'resources' 
              ? 'bg-white/10 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          設計資源庫
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeTab === 'projects' 
              ? 'bg-white/10 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          進行中專案
        </button>
      </div>

      {/* 設計資源列表 */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designResources.map((resource) => (
            <GlassCard key={resource.id} className="hover:bg-white/15 transition-colors">
              <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{resource.author}</span>
                  <span>{resource.updatedAt}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* 專案列表 */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designProjects.map((project) => (
            <GlassCard key={project.id} className="hover:bg-white/15 transition-colors">
              <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full 
                    ${project.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      project.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>負責人: {project.assignee}</span>
                  <span>期限: {project.dueDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full
                    ${project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                      project.status === 'review' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-green-500/20 text-green-300'}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
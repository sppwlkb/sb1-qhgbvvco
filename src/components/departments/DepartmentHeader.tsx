import React from 'react';
import { Department } from '../../types/department';
import { Component, Figma, PenTool, FileSearch } from 'lucide-react';

interface DepartmentHeaderProps {
  department: Department;
}

export default function DepartmentHeader({ department }: DepartmentHeaderProps) {
  return (
    <div className="space-y-8">
      {/* 部門標題 */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{department.name}</h1>
        <p className="text-gray-300">{department.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {department.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 快速操作按鈕 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl 
          bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 transition-colors">
          <Component className="w-5 h-5" />
          <span>新增元件</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl 
          bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-colors">
          <Figma className="w-5 h-5" />
          <span>Figma 連結</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl 
          bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 transition-colors">
          <PenTool className="w-5 h-5" />
          <span>建立設計稿</span>
        </button>
        <button className="flex items-center justify-center space-x-2 p-4 rounded-xl 
          bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 transition-colors">
          <FileSearch className="w-5 h-5" />
          <span>查看指南</span>
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Megaphone, Pin, Calendar } from 'lucide-react';

export default function CEOAnnouncements() {
  return (
    <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-cyan-500/20">
      {/* 標題區域 */}
      <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/20 shadow-lg shadow-cyan-500/20">
              <Megaphone className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-xl font-bold text-cyan-100 tracking-wide">總經理重要公告</h2>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 
            transition-all duration-200 shadow-lg shadow-cyan-500/5 border border-cyan-500/30">
            查看所有公告
          </button>
        </div>
      </div>
      
      {/* 公告列表 */}
      <div className="divide-y divide-cyan-500/20">
        {/* 公告項目 1 */}
        <div className="p-5 hover:bg-cyan-500/5 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Pin className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-100">2024年度營運目標公告</h3>
              <span className="px-3 py-1 text-sm font-medium text-cyan-300 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                重要
              </span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-300/70">
              <Calendar className="w-5 h-5" />
              <span>2024-03-20</span>
            </div>
          </div>
          <p className="text-base text-cyan-100/90 ml-8 leading-relaxed">
            各位同仁好，新的一年我們將致力於擴展市場版圖，強化研發能力，預計在Q2推出新一代產品線。
          </p>
        </div>

        {/* 公告項目 2 */}
        <div className="p-5 hover:bg-cyan-500/5 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Pin className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-100">新產品線發展計畫</h3>
              <span className="px-3 py-1 text-sm font-medium text-cyan-300 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                重要
              </span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-300/70">
              <Calendar className="w-5 h-5" />
              <span>2024-03-18</span>
            </div>
          </div>
          <p className="text-base text-cyan-100/90 ml-8 leading-relaxed">
            為因應市場需求，我們將在下季度推出全新的環保材料產品線，請各部門配合相關準備工作。
          </p>
        </div>
      </div>
    </div>
  );
}
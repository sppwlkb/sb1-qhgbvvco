import React from 'react';
import { Users, MessageSquare, FileText, Plus } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const discussions = [
  {
    id: '1',
    title: '新產品功能討論',
    lastMessage: '關於新功能的使用者體驗，我們需要進行更多測試...',
    participants: ['張小明', '李小華', '王大明'],
    replies: 12,
    lastActivity: '10 分鐘前'
  },
  {
    id: '2',
    title: '系統架構優化提案',
    lastMessage: '考慮到系統擴展性，建議我們採用微服務架構...',
    participants: ['陳小玉', '林小美'],
    replies: 8,
    lastActivity: '30 分鐘前'
  }
];

export default function CollaborationPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">資訊共享</h1>
          <p className="text-gray-400">團隊協作與討論空間</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
          <Plus className="w-5 h-5" />
          <span>發起討論</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {discussions.map(discussion => (
            <GlassCard key={discussion.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {discussion.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{discussion.lastMessage}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{discussion.participants.length} 位參與者</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>{discussion.replies} 則回覆</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {discussion.lastActivity}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-6">
          <GlassCard className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">最新文件</h3>
            <div className="space-y-3">
              {['產品規格書.pdf', '會議記錄.docx', '專案計畫.pptx'].map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                  <FileText className="w-5 h-5 text-cyan-300" />
                  <span className="text-gray-300">{file}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">活躍成員</h3>
            <div className="space-y-3">
              {['張小明', '李小華', '王大明'].map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-300">{member[0]}</span>
                  </div>
                  <span className="text-gray-300">{member}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
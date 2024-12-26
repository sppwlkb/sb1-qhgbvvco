import React from 'react';
import { Lock, FileText, Shield, Eye } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import GlassCard from '../ui/GlassCard';
import SecureDocument from './SecureDocument';
import { usePrivateDocuments } from '../../hooks/usePrivateDocuments';

export default function PrivateSection() {
  const { user } = useAuth();
  const { documents, encryptDocument } = usePrivateDocuments();

  // Only allow access to 李佳芬 (A0005) and CEO (A0001)
  if (user?.id !== 'A0005' && user?.id !== 'A0001') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl text-white font-semibold">無權限訪問</h2>
          <p className="text-gray-400 mt-2">此為笑姐專屬私密區域</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <Lock className="w-8 h-8 text-cyan-300" />
          <h1 className="text-2xl font-bold text-white">笑姐專區</h1>
        </div>
        <p className="text-gray-400 mt-2 ml-11">私密文件與重要事項管理</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">私密文件</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>僅笑姐與總經理可見</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <SecureDocument
                  key={doc.id}
                  document={doc}
                  onEncrypt={encryptDocument}
                />
              ))}
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">快速操作</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
                <FileText className="w-5 h-5" />
                <span>新增私密文件</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
                <Lock className="w-5 h-5" />
                <span>文件加密設定</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
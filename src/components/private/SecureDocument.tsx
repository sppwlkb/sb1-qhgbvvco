import React, { useState } from 'react';
import { FileText, Lock, MoreVertical } from 'lucide-react';
import { Document } from '../../types/document';

interface SecureDocumentProps {
  document: Document;
  onEncrypt: (id: string, password: string) => void;
}

export default function SecureDocument({ document, onEncrypt }: SecureDocumentProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  const handleEncrypt = () => {
    if (password) {
      onEncrypt(document.id, password);
      setShowPasswordDialog(false);
      setPassword('');
    }
  };

  return (
    <div 
      className="relative p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <FileText className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h3 className="font-medium text-white">{document.title}</h3>
            <p className="text-sm text-gray-400">{document.date}</p>
          </div>
        </div>
        {document.isEncrypted && (
          <Lock className="w-5 h-5 text-cyan-300" />
        )}
      </div>

      {/* Context Menu */}
      {showMenu && (
        <div className="absolute right-4 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50">
          <div className="py-1">
            <button
              onClick={() => {
                setShowPasswordDialog(true);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
            >
              加密文件
            </button>
          </div>
        </div>
      )}

      {/* Password Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-white mb-4">設定文件密碼</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4"
              placeholder="請輸入密碼"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                取消
              </button>
              <button
                onClick={handleEncrypt}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
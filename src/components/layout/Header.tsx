import React, { useState } from 'react';
import { Search, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../ui/UserAvatar';
import NotificationCenter from '../notifications/NotificationCenter';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAvatarChange = async (file: File) => {
    // TODO: 實作頭像上傳功能
    console.log('Upload avatar:', file);
  };

  return (
    <header className="fixed top-0 right-0 left-64 z-10 h-16 bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="搜尋..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-800/50 border border-cyan-500/30 
                text-gray-100 placeholder-gray-400 
                focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50
                transition-all duration-200"
            />
            <Search className="w-5 h-5 text-cyan-400/70 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-cyan-100">{user?.name}</p>
                <p className="text-xs text-cyan-300/70">{user?.position}</p>
              </div>
              <UserAvatar showUpload={showUserMenu} onAvatarChange={handleAvatarChange} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-cyan-500/20 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-cyan-500/10 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>設定</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-cyan-500/10 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>登出</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
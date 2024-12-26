import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  FileText,
  Users,
  Bell,
  BarChart2,
  Settings,
  Brain,
  Share2,
  Smartphone,
  Shield,
  Leaf,
  Lock,
  Crown,
  UserCircle
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const baseMenuItems = [
    { icon: LayoutDashboard, label: '儀表板', path: '/' },
    { icon: FileText, label: '回報管理', path: '/reports' },
    { icon: Bell, label: '通知中心', path: '/notifications' },
    { icon: Share2, label: '資訊共享', path: '/collaboration' },
    { icon: BarChart2, label: '數據分析', path: '/analytics' },
    { icon: Brain, label: 'AI 智能', path: '/ai' },
    { icon: Smartphone, label: '行動應用', path: '/mobile' },
    { icon: Shield, label: '系統安全', path: '/security' },
    { icon: Lock, label: '權限管理', path: '/permissions' },
    { icon: Leaf, label: 'ESG 報告', path: '/esg' },
    { icon: Settings, label: '設定', path: '/settings' }
  ];

  const menuItems = [...baseMenuItems];

  // 根據用戶身份添加特殊選項
  if (user?.id === 'A0001') { // 總經理
    menuItems.splice(1, 0, { 
      icon: Crown, 
      label: '總經理專區', 
      path: '/ceo-section' 
    });
  } else if (user?.id === 'A0005') { // 李佳芬
    menuItems.splice(1, 0, { 
      icon: UserCircle, 
      label: '笑姐專區', 
      path: '/private-section' 
    });
  } else { // 其他人
    menuItems.splice(1, 0, {
      icon: Users,
      label: '部門專區',
      path: '/departments'
    });
  }

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.svg" alt="立璽科技" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-cyan-100">立璽科技 CRM</h1>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-cyan-500/20 text-cyan-300' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400 text-center">
          © 2024 立璽科技
        </div>
      </div>
    </div>
  );
}
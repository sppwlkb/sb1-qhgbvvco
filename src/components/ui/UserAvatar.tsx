import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showUpload?: boolean;
  onAvatarChange?: (file: File) => void;
}

export default function UserAvatar({ 
  size = 'md', 
  showUpload = false,
  onAvatarChange 
}: UserAvatarProps) {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 檢查檔案類型
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片檔案');
      return;
    }

    // 檢查檔案大小 (最大 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('檔案大小不能超過 2MB');
      return;
    }

    // 建立預覽
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAvatarUrl(dataUrl);
    };
    reader.readAsDataURL(file);

    // 觸發上傳
    onAvatarChange?.(file);
  };

  return (
    <div className="relative group">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={user?.name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-cyan-500/30`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
          flex items-center justify-center border-2 border-cyan-500/30`}>
          {user?.name?.[0] || <User className="w-1/2 h-1/2 text-cyan-300" />}
        </div>
      )}

      {showUpload && (
        <label className="absolute inset-0 flex items-center justify-center bg-black/50 
          rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
          <Camera className="w-1/3 h-1/3 text-white" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
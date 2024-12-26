import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useLogoContext } from '../../contexts/LogoContext';

export default function LogoUploader() {
  const { updateLogo } = useLogoContext();
  const [preview, setPreview] = useState<string | null>(null);

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      updateLogo(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">公司 Logo 設定</h3>
        <label className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 cursor-pointer">
          <Upload className="w-5 h-5" />
          <span>上傳 Logo</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {preview && (
        <div className="p-4 bg-white/10 rounded-lg">
          <div className="aspect-square w-32 relative">
            <img
              src={preview}
              alt="Logo 預覽"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="text-sm text-gray-400">
        <p>• 建議上傳正方形圖片</p>
        <p>• 支援 PNG、JPG、SVG 格式</p>
        <p>• 檔案大小限制 2MB 以內</p>
      </div>
    </div>
  );
}
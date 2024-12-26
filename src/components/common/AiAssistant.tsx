import React, { useState } from 'react';
import { Brain, Send } from 'lucide-react';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg mb-4 w-96">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">AI 助理</h3>
            </div>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {/* 聊天記錄區域 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">您好！我是您的 AI 助理，有什麼我可以幫您的嗎？</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="請輸入您的問題..."
                className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        <Brain className="w-6 h-6" />
      </button>
    </div>
  );
}
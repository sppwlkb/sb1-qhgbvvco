import React, { useState, useEffect } from 'react';
import { X, Search, Check } from 'lucide-react';
import { employees } from '../../data/employees';

interface UserSelectorProps {
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onClose: () => void;
}

export default function UserSelector({ selectedIds, onSelect, onClose }: UserSelectorProps) {
  const [search, setSearch] = useState('');
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  // 過濾並排序員工列表
  const filteredEmployees = employees
    .filter(emp => {
      const searchLower = search.toLowerCase();
      return (
        emp.name.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // 管理職優先顯示
      if (a.role === 'manager' && b.role !== 'manager') return -1;
      if (a.role !== 'manager' && b.role === 'manager') return 1;
      return 0;
    });

  const toggleSelect = (id: string) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id];
    onSelect(newSelected);
  };

  // 點擊外部關閉詳細資訊
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-card') && !target.closest('.user-detail')) {
        setHoveredUser(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-xl">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">選擇處理人員</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋人員..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="relative">
                <button
                  onMouseEnter={() => setHoveredUser(emp.id)}
                  onClick={() => toggleSelect(emp.id)}
                  className={`user-card w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedIds.includes(emp.id)
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
                    flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                    <span className="text-sm font-medium text-cyan-300">{emp.name[0]}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-400">{emp.position}</div>
                  </div>
                  {selectedIds.includes(emp.id) && (
                    <Check className="w-5 h-5 text-cyan-300" />
                  )}
                </button>

                {hoveredUser === emp.id && (
                  <div className="user-detail absolute left-full ml-2 top-0 w-48 bg-gray-800 
                    rounded-lg shadow-xl border border-cyan-500/20 p-3 z-10">
                    <div className="text-center mb-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
                        flex items-center justify-center mx-auto border border-cyan-500/30">
                        <span className="text-2xl font-medium text-cyan-300">{emp.name[0]}</span>
                      </div>
                      <h4 className="text-white font-medium mt-2">{emp.name}</h4>
                      <p className="text-sm text-cyan-300">{emp.position}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>部門：{emp.departmentId}</p>
                      <p>職級：{emp.role === 'manager' ? '主管' : '員工'}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
}
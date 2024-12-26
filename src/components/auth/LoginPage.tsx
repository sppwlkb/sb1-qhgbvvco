import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Info } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { employees } from '../../data/employees';

export default function LoginPage() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    try {
      setLoading(true);
      await login(selectedEmployee);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert(err instanceof Error ? err.message : '登入失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="立璽科技" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">立璽科技 CRM</h2>
          <p className="text-gray-400 mt-2">請選擇您的帳號進行登入</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="employee" className="block text-sm font-medium text-gray-300 mb-1">
                  選擇員工
                </label>
                <select
                  id="employee"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg text-white
                    focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50
                    disabled:opacity-50"
                  required
                >
                  <option value="">請選擇員工...</option>
                  {employees.map(emp => (
                    <option 
                      key={emp.id} 
                      value={emp.id}
                      className="bg-gray-800 text-white py-2"
                    >
                      {emp.name} - {emp.position} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-cyan-300">
                  <Info className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">
                    已暫時移除密碼驗證，直接選擇員工即可登入
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading || !selectedEmployee}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-500 
                  text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50
                  disabled:cursor-not-allowed"
              >
                <Lock className="w-5 h-5" />
                <span>{loading ? '登入中...' : '登入系統'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
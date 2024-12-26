import React, { createContext, useState, useCallback } from 'react';
import { AuthContextType, AuthUser } from '../types/auth';
import { employees } from '../data/employees';
import { mapEmployeeToUser } from '../utils/userMapper';

// 創建 context 並提供預設值
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (employeeId: string) => {
    try {
      setLoading(true);
      setError(null);

      // 查找員工
      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) {
        throw new Error('找不到此員工編號');
      }

      // 設置使用者狀態
      const userData = mapEmployeeToUser(employee);
      setUser(userData);

      // 儲存到 localStorage 以保持登入狀態
      localStorage.setItem('user', JSON.stringify(userData));
      
    } catch (err) {
      const message = err instanceof Error ? err.message : '登入失敗';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  }, []);

  // 在組件掛載時檢查 localStorage
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
import { useState, useCallback } from 'react';
import { employees } from '../data/employees';
import { mapEmployeeToUser } from '../utils/userMapper';
import type { AuthUser } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // 在初始化時檢查 localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('user');
      }
    }
    return null;
  });
  
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

      // 儲存到 localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
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

  return {
    user,
    loading,
    error,
    login,
    logout
  };
}
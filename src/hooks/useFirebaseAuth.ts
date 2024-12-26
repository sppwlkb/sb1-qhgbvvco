import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth, signIn, logOut } from '../lib/firebase';
import { AuthUser } from '../types/auth';
import { employees } from '../data/employees';
import { mapEmployeeToUser } from '../utils/userMapper';

export function useFirebaseAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const employeeId = firebaseUser.email?.split('@')[0];
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
          setUser(mapEmployeeToUser(employee));
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (employeeId: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const email = `${employeeId}@example.com`;
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setError('登入失敗，請檢查帳號密碼是否正確');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('登出失敗，請稍後再試');
      throw error;
    }
  };

  return { user, loading, error, login, logout };
}
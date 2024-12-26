import { FirebaseError } from 'firebase/app';

export const formatFirebaseError = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return '無效的電子郵件格式';
      case 'auth/user-disabled':
        return '此帳號已被停用';
      case 'auth/user-not-found':
        return '找不到此帳號';
      case 'auth/wrong-password':
        return '密碼錯誤';
      case 'permission-denied':
        return '您沒有權限執行此操作';
      case 'not-found':
        return '找不到請求的資源';
      default:
        return error.message;
    }
  }
  return '發生未知錯誤';
};
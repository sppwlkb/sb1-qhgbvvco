import { FirebaseError } from 'firebase/app';

export const handleFirebaseError = (error: unknown): Error => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return new Error('無效的電子郵件格式');
      case 'auth/user-disabled':
        return new Error('此帳號已被停用');
      case 'auth/user-not-found':
        return new Error('找不到此帳號');
      case 'auth/wrong-password':
        return new Error('密碼錯誤');
      case 'auth/invalid-api-key':
        return new Error('系統設定錯誤，請聯繫管理員');
      case 'auth/api-key-not-valid':
        return new Error('系統設定錯誤，請聯繫管理員');
      case 'permission-denied':
        return new Error('您沒有權限執行此操作');
      default:
        console.error('Firebase error:', error);
        return new Error('登入失敗，請稍後再試');
    }
  }
  return new Error('發生未預期的錯誤');
};
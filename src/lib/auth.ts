import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

export async function signInWithEmail(email: string, password: string) {
  try {
    // Clear any existing session
    await signOut();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw handleAuthError(error);
    }

    // Create session record
    if (data.session) {
      await supabase.from('auth_sessions').insert({
        user_id: data.session.user.id
      });
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('登入時發生未知錯誤');
  }
}

export async function signOut() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      // Remove session record
      await supabase
        .from('auth_sessions')
        .delete()
        .eq('user_id', session.user.id);
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw handleAuthError(error);
    }
  } catch (error) {
    console.error('Sign out error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('登出時發生未知錯誤');
  }
}

function handleAuthError(error: AuthError): Error {
  console.error('Auth error details:', error);
  
  switch (error.status) {
    case 400:
      return new Error('帳號或密碼錯誤');
    case 401:
      return new Error('驗證已過期，請重新登入');
    case 422:
      return new Error('帳號或密碼格式錯誤');
    case 429:
      return new Error('登入嘗試次數過多，請稍後再試');
    case 500:
      return new Error('系統發生錯誤，請稍後再試');
    case 0:
      return new Error('無法連線到伺服器，請檢查網路連線');
    default:
      if (error.message?.includes('Invalid login credentials')) {
        return new Error('帳號或密碼錯誤');
      }
      return new Error(`登入失敗：${error.message}`);
  }
}
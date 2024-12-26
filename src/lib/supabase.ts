import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { env } from '../config/environment';

export const supabase = createClient<Database>(env.supabase.url, env.supabase.key);

export const handleSupabaseError = (error: unknown): Error => {
  console.error('Supabase error:', error);
  
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return new Error('無法連線到伺服器，請檢查網路連線');
    }
    return error;
  }
  return new Error('發生未預期的錯誤');
};
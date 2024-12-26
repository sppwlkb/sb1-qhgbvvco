export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string
          title: string
          content: string
          status: 'pending' | 'in_progress' | 'completed'
          priority: 'high' | 'medium' | 'low'
          reporter_id: string
          assignee_id: string
          department_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          status?: 'pending' | 'in_progress' | 'completed'
          priority: 'high' | 'medium' | 'low'
          reporter_id: string
          assignee_id: string
          department_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'in_progress' | 'completed'
          updated_at?: string
        }
      }
      report_comments: {
        Row: {
          id: string
          report_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          user_id: string
          content: string
          created_at?: string
        }
      }
      report_attachments: {
        Row: {
          id: string
          report_id: string
          filename: string
          filesize: number
          filetype: string
          storage_path: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          filename: string
          filesize: number
          filetype: string
          storage_path: string
          uploaded_by: string
          created_at?: string
        }
      }
      report_histories: {
        Row: {
          id: string
          report_id: string
          changed_by: string
          old_status: string
          new_status: string
          created_at: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
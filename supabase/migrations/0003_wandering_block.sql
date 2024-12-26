/*
  # Reports Management Schema

  1. New Tables:
    - reports: Main reports tracking
    - report_comments: Comment threads
    - report_attachments: File attachments
    - report_histories: Status change tracking

  2. Security:
    - RLS enabled on all tables
    - Role-based access policies
    - Secure cascading deletes
*/

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  reporter_id uuid REFERENCES auth.users(id),
  assignee_id uuid REFERENCES auth.users(id),
  department_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS report_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Attachments table
CREATE TABLE IF NOT EXISTS report_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  filename text NOT NULL,
  filesize integer NOT NULL,
  filetype text NOT NULL,
  storage_path text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- History table
CREATE TABLE IF NOT EXISTS report_histories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  changed_by uuid REFERENCES auth.users(id),
  old_status text NOT NULL,
  new_status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_histories ENABLE ROW LEVEL SECURITY;

-- Access policies
CREATE POLICY "reports_view_policy" ON reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "reports_insert_policy" ON reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "reports_update_policy" ON reports FOR UPDATE TO authenticated USING (auth.uid() IN (reporter_id, assignee_id) OR EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role IN ('manager', 'ceo')));

CREATE POLICY "comments_view_policy" ON report_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "comments_insert_policy" ON report_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "attachments_view_policy" ON report_attachments FOR SELECT TO authenticated USING (true);
CREATE POLICY "attachments_insert_policy" ON report_attachments FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "history_view_policy" ON report_histories FOR SELECT TO authenticated USING (true);
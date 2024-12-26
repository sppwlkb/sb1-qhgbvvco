/*
  # Initial Schema Setup
  
  1. Core Tables
    - departments: Base table for department management
    - reports: For issue tracking
    - report_comments: For report discussions
    - discussions: For general discussions
    - discussion_comments: For discussion replies
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Create departments table first
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  reporter_id uuid REFERENCES auth.users(id),
  assignee_id uuid REFERENCES auth.users(id),
  department_id text REFERENCES departments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report comments
CREATE TABLE IF NOT EXISTS report_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Discussions
CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  department_id text REFERENCES departments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Discussion comments
CREATE TABLE IF NOT EXISTS discussion_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_comments ENABLE ROW LEVEL SECURITY;

-- Department access policies
CREATE POLICY "Everyone can view departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- Report access policies
CREATE POLICY "Everyone can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Report owners and assignees can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = reporter_id OR auth.uid() = assignee_id);

-- Report comment access policies
CREATE POLICY "Everyone can view report comments"
  ON report_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can add report comments"
  ON report_comments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Discussion access policies
CREATE POLICY "Everyone can view discussions"
  ON discussions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON discussions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Discussion authors can update discussions"
  ON discussions FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Discussion comment access policies
CREATE POLICY "Everyone can view discussion comments"
  ON discussion_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can add discussion comments"
  ON discussion_comments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default departments
INSERT INTO departments (id, name, description) VALUES
  ('management', '管理部', '公司行政與人資管理'),
  ('sales', '業務部', '銷售與客戶開發'),
  ('manufacturing', '製造部', '產品製造與品質管理'),
  ('rd', '研發部', '產品研發與技術創新'),
  ('customer_service', '客服部', '客戶服務與支援'),
  ('marketing', '行銷部', '市場推廣與品牌管理'),
  ('adhesive_lab', '膠藝所', '膠類產品研發與測試')
ON CONFLICT (id) DO NOTHING;
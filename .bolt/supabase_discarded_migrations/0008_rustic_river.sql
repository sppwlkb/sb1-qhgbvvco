/*
  # Department and Analytics Schema

  1. Tables Created:
    - departments: Company departments
    - user_departments: User-department relationships
    - analytics_data: Department metrics
    - analytics_reports: Department reports
    - notifications: System notifications

  2. Security:
    - RLS enabled on all tables
    - Department-specific access policies
    - Role-based access control
*/

-- Create departments table first
CREATE TABLE IF NOT EXISTS departments (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create user_departments junction table
CREATE TABLE IF NOT EXISTS user_departments (
  user_id uuid REFERENCES auth.users(id),
  department_id text REFERENCES departments(id),
  PRIMARY KEY (user_id, department_id),
  created_at timestamptz DEFAULT now()
);

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

-- Analytics data
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  value numeric NOT NULL,
  department_id text REFERENCES departments(id),
  recorded_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Analytics reports
CREATE TABLE IF NOT EXISTS analytics_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  department_id text REFERENCES departments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'warning', 'success')),
  user_id uuid REFERENCES auth.users(id),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Department access policies
CREATE POLICY "Everyone can view departments"
  ON departments FOR SELECT
  TO authenticated
  USING (true);

-- User departments access policies
CREATE POLICY "Users can view their department assignments"
  ON user_departments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Analytics data access policies
CREATE POLICY "Managers can view all analytics data"
  ON analytics_data FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

CREATE POLICY "Users can view their department's analytics data"
  ON analytics_data FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_departments
      WHERE user_departments.user_id = auth.uid()
      AND user_departments.department_id = analytics_data.department_id
    )
  );

-- Analytics reports access policies
CREATE POLICY "Everyone can view analytics reports"
  ON analytics_reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can create analytics reports"
  ON analytics_reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

-- Notification access policies
CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Managers can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

CREATE POLICY "Users can update their notification read status"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (user_id = auth.uid() AND is_read = true);
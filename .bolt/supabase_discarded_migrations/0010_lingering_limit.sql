/*
  # Report Notifications
  
  1. New Tables
    - report_notifications: Track notifications
    - report_timers: Track response deadlines
  
  2. Security
    - RLS enabled
    - Access policies
*/

-- Notification tracking
CREATE TABLE IF NOT EXISTS report_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL CHECK (type IN ('assigned', 'response_needed', 'response_received', 'manager_review', 'ceo_review')),
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Response timer tracking
CREATE TABLE IF NOT EXISTS report_timers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  deadline timestamptz NOT NULL,
  warning_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE report_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_timers ENABLE ROW LEVEL SECURITY;

-- Access policies
CREATE POLICY "notifications_view_policy" ON report_notifications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "notifications_insert_policy" ON report_notifications
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "notifications_update_policy" ON report_notifications
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    OLD.user_id = NEW.user_id AND
    OLD.report_id = NEW.report_id AND
    OLD.type = NEW.type AND
    OLD.content = NEW.content
  );
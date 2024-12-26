/*
  # Important Announcements Schema
  
  1. Tables Created:
    - important_announcements: System-wide announcements
  
  2. Features:
    - Automatic updated_at timestamp
    - RLS policies for view/create/update/delete
    - Only managers and CEO can create/edit announcements
*/

-- Create important announcements table
CREATE TABLE IF NOT EXISTS important_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  priority text NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE important_announcements ENABLE ROW LEVEL SECURITY;

-- Set up policies for important_announcements
CREATE POLICY "announcements_view_policy" 
  ON important_announcements FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "announcements_create_policy" 
  ON important_announcements FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

CREATE POLICY "announcements_update_policy" 
  ON important_announcements FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

CREATE POLICY "announcements_delete_policy" 
  ON important_announcements FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role IN ('manager', 'ceo')
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for important_announcements
DROP TRIGGER IF EXISTS update_important_announcements_updated_at ON important_announcements;
CREATE TRIGGER update_important_announcements_updated_at
  BEFORE UPDATE ON important_announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
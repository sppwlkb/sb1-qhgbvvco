/*
  # Report Additional Fields
  
  1. New Columns
    - response tracking
    - review status
    - completion status
    - related reports
  
  2. Changes
    - Adds new columns to reports table
*/

-- Add new columns to reports table
ALTER TABLE reports ADD COLUMN IF NOT EXISTS response_deadline timestamptz;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS last_response timestamptz;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS manager_review text CHECK (manager_review IN ('pending', 'approved', 'rejected'));
ALTER TABLE reports ADD COLUMN IF NOT EXISTS ceo_review text CHECK (ceo_review IN ('pending', 'approved', 'read'));
ALTER TABLE reports ADD COLUMN IF NOT EXISTS ceo_comment text;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS is_complete boolean DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS related_report_id uuid REFERENCES reports(id);
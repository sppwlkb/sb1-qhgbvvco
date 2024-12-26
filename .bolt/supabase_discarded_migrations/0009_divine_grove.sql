/*
  # Reports Triggers
  
  1. Triggers
    - Updated timestamp maintenance
    - Status change logging
  
  2. Functions
    - Trigger functions for automation
*/

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Status change logging trigger
CREATE OR REPLACE FUNCTION log_report_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status <> NEW.status THEN
    INSERT INTO report_histories (
      report_id,
      changed_by,
      old_status,
      new_status
    ) VALUES (
      NEW.id,
      auth.uid(),
      OLD.status,
      NEW.status
    );
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER log_report_status_changes
  AFTER UPDATE OF status ON reports
  FOR EACH ROW
  EXECUTE FUNCTION log_report_status_change();
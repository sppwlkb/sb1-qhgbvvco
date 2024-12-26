/*
  # Report Response Triggers
  
  1. Functions
    - Deadline setting
    - Response checking
  
  2. Triggers
    - Auto-set deadlines
    - Monitor responses
*/

-- Deadline setting
CREATE OR REPLACE FUNCTION set_response_deadline()
RETURNS TRIGGER AS $$
BEGIN
  NEW.response_deadline := NEW.created_at + interval '3 hours';
  
  INSERT INTO report_timers (
    report_id,
    start_time,
    deadline
  ) VALUES (
    NEW.id,
    NEW.created_at,
    NEW.response_deadline
  );
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Response monitoring
CREATE OR REPLACE FUNCTION check_response_deadline()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    NEW.last_response IS NULL AND
    NOW() > NEW.created_at + interval '1 hour' AND
    NOT EXISTS (
      SELECT 1 FROM report_notifications
      WHERE report_id = NEW.id AND type = 'response_needed'
    )
  ) THEN
    INSERT INTO report_notifications (
      report_id,
      user_id,
      type,
      content
    ) VALUES (
      NEW.id,
      NEW.assignee_id,
      'response_needed',
      'Please note: This case has been pending for over 1 hour. Immediate attention required.'
    );
    
    UPDATE report_timers
    SET warning_sent = true
    WHERE report_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER set_report_response_deadline
  BEFORE INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION set_response_deadline();

CREATE TRIGGER check_report_response_deadline
  AFTER UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION check_response_deadline();
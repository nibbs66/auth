-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS expire_noncepair ON "NoncePair";
DROP TRIGGER IF EXISTS expire_emailverify ON "EmailVerify";

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS delete_expired_noncepair();
DROP FUNCTION IF EXISTS delete_expired_emailverify();

-- Create the logging table for debugging
CREATE TABLE IF NOT EXISTS trigger_log (
  id SERIAL PRIMARY KEY,
  table_name TEXT,
  action TEXT,
  deleted_record JSONB,
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function for NoncePair with logging
CREATE OR REPLACE FUNCTION delete_expired_noncepair() RETURNS TRIGGER AS $$
BEGIN
  IF OLD."updatedAt" < NOW() - INTERVAL '60 seconds' THEN
    INSERT INTO trigger_log (table_name, action, deleted_record)
    VALUES ('NoncePair', 'DELETE', row_to_json(OLD));
    DELETE FROM "NoncePair" WHERE "id" = OLD."id";
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expire_noncepair
AFTER INSERT OR UPDATE ON "NoncePair"
FOR EACH ROW
EXECUTE FUNCTION delete_expired_noncepair();

-- Function for

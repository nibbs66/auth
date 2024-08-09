-- This is an empty migration.
-- This part will contain the auto-generated Prisma migration SQL for the schema changes

-- Add your custom SQL for NoncePair
CREATE OR REPLACE FUNCTION delete_expired_noncepair() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM "NoncePair" WHERE "updatedAt" < NOW() - INTERVAL '60 seconds';
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expire_noncepair
AFTER INSERT OR UPDATE ON "NoncePair"
FOR EACH ROW
EXECUTE FUNCTION delete_expired_noncepair();

-- Add your custom SQL for EmailVerify
CREATE OR REPLACE FUNCTION delete_expired_emailverify() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM "EmailVerify" WHERE "updatedAt" < NOW() - INTERVAL '1 hour';
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expire_emailverify
AFTER INSERT OR UPDATE ON "EmailVerify"
FOR EACH ROW
EXECUTE FUNCTION delete_expired_emailverify();

-- This is an empty migration.
-- 2024XXXXXX_remove_triggers_and_functions

-- Drop triggers if they exist
DROP TRIGGER IF EXISTS expire_noncepair ON "NoncePair";
DROP TRIGGER IF EXISTS expire_emailverify ON "EmailVerify";

-- Drop functions if they exist
DROP FUNCTION IF EXISTS delete_expired_noncepair();
DROP FUNCTION IF EXISTS delete_expired_emailverify();

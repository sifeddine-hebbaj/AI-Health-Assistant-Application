-- Backfill missing created_at for users to enable Recent Activity display
ALTER TABLE IF EXISTS users
    ADD COLUMN IF NOT EXISTS created_at timestamp;

UPDATE users
SET created_at = NOW()
WHERE created_at IS NULL;

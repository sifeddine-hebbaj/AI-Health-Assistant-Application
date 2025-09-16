-- Flyway migration: seed demo users and doctors
-- Add unique constraint to avoid duplicate users by email
ALTER TABLE IF EXISTS users
    ADD CONSTRAINT IF NOT EXISTS uq_users_email UNIQUE (email);

-- Insert demo users (patient and admin) with fixed UUIDs
-- Change passwords as needed; current backend does not hash passwords yet
INSERT INTO users (id, first_name, last_name, email, password, role, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Jean',  'Dupont', 'patient@demo.com', 'password123', 'PATIENT', NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (id, first_name, last_name, email, password, role, created_at)
VALUES
  ('22222222-2222-2222-2222-222222222222', 'Alice', 'Martin', 'admin@demo.com',   'admin123',    'ADMIN',   NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert demo doctors with fixed UUIDs
INSERT INTO doctors (id, first_name, last_name, specialty)
VALUES ('33333333-3333-3333-3333-333333333333', 'Sophie', 'Bernard', 'Cardiologie')
ON CONFLICT DO NOTHING;

INSERT INTO doctors (id, first_name, last_name, specialty)
VALUES ('44444444-4444-4444-4444-444444444444', 'Marc',   'Leroy',   'Dermatologie')
ON CONFLICT DO NOTHING;

INSERT INTO doctors (id, first_name, last_name, specialty)
VALUES ('55555555-5555-5555-5555-555555555555', 'Nadia',  'Khalil',  'Généraliste')
ON CONFLICT DO NOTHING;

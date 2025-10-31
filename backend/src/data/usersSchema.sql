CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) DEFAULT 'LabTechnologist', -- roles: Admin, Doctor, LabTechnologist
  created_at TIMESTAMP DEFAULT NOW()
);
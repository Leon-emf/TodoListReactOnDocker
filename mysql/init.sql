CREATE DATABASE IF NOT EXISTS todos_db;
USE todos_db;

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO todos (text, completed) VALUES
  ('Learn React', true),
  ('Build a todo app', true),
  ('Add backend to todo app', false),
  ('Deploy application', false);

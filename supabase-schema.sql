-- Create URLs table for storing shortened links
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '1 year')
);

-- Create indexes for better performance
CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_created_at ON urls(created_at);

-- Enable Row Level Security (optional)
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can make this more restrictive later)
CREATE POLICY "Allow all operations on urls" ON urls
FOR ALL USING (true);

-- Optional: Create a function to clean up expired URLs
CREATE OR REPLACE FUNCTION cleanup_expired_urls()
RETURNS void AS $$
BEGIN
  DELETE FROM urls WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup daily (if needed)
-- This would be set up in Supabase dashboard under Database > Functions
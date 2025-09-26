-- Fix the site_visits table to handle visitor tracking properly
-- Change ip_address from inet to text to handle cases where IP cannot be determined
ALTER TABLE public.site_visits 
ALTER COLUMN ip_address TYPE text USING ip_address::text;

-- Also allow updating records for visit duration
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Update policy to allow updates for visit duration
CREATE POLICY "Anyone can update visit duration" 
ON public.site_visits 
FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Add index for better performance on session lookups
CREATE INDEX IF NOT EXISTS idx_site_visits_session_page ON public.site_visits(session_id, page_path);
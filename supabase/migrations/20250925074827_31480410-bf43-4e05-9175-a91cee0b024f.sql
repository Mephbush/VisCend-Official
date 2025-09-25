-- Fix privacy issue: Restrict access to visitor tracking data
-- Remove public read access and restrict to authenticated users only

-- Drop existing public read policies
DROP POLICY IF EXISTS "Anyone can view site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Anyone can view website visits" ON public.website_visits;

-- Create restricted read policies for authenticated users only
CREATE POLICY "Authenticated users can view site visits" 
ON public.site_visits 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view website visits" 
ON public.website_visits 
FOR SELECT 
TO authenticated  
USING (true);

-- Keep existing insert and update policies for functionality
-- (These remain as-is to allow visitor tracking to continue working)
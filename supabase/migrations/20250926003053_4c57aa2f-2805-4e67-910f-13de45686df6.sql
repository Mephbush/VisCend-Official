-- Fix all RLS policies to allow anonymous users to insert data
-- This is necessary for visitor tracking and contact forms

-- Fix website_visits table policies
DROP POLICY IF EXISTS "Allow anonymous visit tracking" ON public.website_visits;
DROP POLICY IF EXISTS "Only authenticated users can view visits" ON public.website_visits;

CREATE POLICY "Enable insert for anonymous users" 
ON public.website_visits 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" 
ON public.website_visits 
FOR SELECT 
TO authenticated
USING (true);

-- Fix contact_inquiries table policies
DROP POLICY IF EXISTS "Anyone can insert contact inquiries" ON public.contact_inquiries;

CREATE POLICY "Enable insert for anonymous users" 
ON public.contact_inquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" 
ON public.contact_inquiries 
FOR SELECT 
TO authenticated
USING (true);

-- Fix site_visits table policies (if they exist)
DROP POLICY IF EXISTS "Anyone can insert site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Anyone can update visit duration" ON public.site_visits;
DROP POLICY IF EXISTS "Authenticated users can view site visits" ON public.site_visits;

CREATE POLICY "Enable insert for anonymous users" 
ON public.site_visits 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for anonymous users" 
ON public.site_visits 
FOR UPDATE 
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" 
ON public.site_visits 
FOR SELECT 
TO authenticated
USING (true);

-- Ensure all tables have RLS enabled
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
-- Test if we can insert data as anonymous user
-- First, let's completely remove all policies and recreate them properly

-- Drop ALL existing policies on website_visits
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.website_visits;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON public.website_visits;

-- Temporarily disable RLS to test
ALTER TABLE public.website_visits DISABLE ROW LEVEL SECURITY;

-- Insert a test record to verify table structure
INSERT INTO public.website_visits (page_path, visitor_ip) VALUES ('/test', 'test-ip');

-- Re-enable RLS
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;

-- Create a very simple policy that should definitely work
CREATE POLICY "allow_all_inserts" 
ON public.website_visits 
FOR INSERT 
WITH CHECK (true);

-- Create select policy for authenticated users
CREATE POLICY "auth_users_can_select" 
ON public.website_visits 
FOR SELECT 
TO authenticated
USING (true);

-- Clean up test record
DELETE FROM public.website_visits WHERE page_path = '/test' AND visitor_ip = 'test-ip';
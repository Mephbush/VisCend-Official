-- Fix RLS policies for website_visits table to allow anonymous visitor tracking
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert website visits" ON public.website_visits;
DROP POLICY IF EXISTS "Authenticated users can view website visits" ON public.website_visits;

-- Create new policy to allow anyone to insert visit data (for anonymous tracking)
CREATE POLICY "Allow anonymous visit tracking" 
ON public.website_visits 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy to restrict viewing to authenticated users only
CREATE POLICY "Only authenticated users can view visits" 
ON public.website_visits 
FOR SELECT 
TO authenticated
USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;
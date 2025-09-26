-- Fix the visitors_site table RLS policy issue
-- Since this table contains visitor data, we should secure it similar to other visitor tables

-- Create appropriate policies for visitors_site table
CREATE POLICY "Authenticated users can view visitors site data" 
ON public.visitors_site 
FOR SELECT 
TO authenticated
USING (true);

-- Allow inserts for visitor tracking functionality
CREATE POLICY "Anyone can insert visitor site data" 
ON public.visitors_site 
FOR INSERT 
WITH CHECK (true);
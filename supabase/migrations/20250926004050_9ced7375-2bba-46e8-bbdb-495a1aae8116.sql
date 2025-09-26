-- Clean up and simplify all policies for visitor tracking
-- Make sure anonymous users can insert and authenticated users can view

-- Clean up website_visits policies
DROP POLICY IF EXISTS "allow_all_inserts" ON public.website_visits;
DROP POLICY IF EXISTS "auth_users_can_select" ON public.website_visits;

-- Create simple policies
CREATE POLICY "visitors_can_insert" 
ON public.website_visits 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "authenticated_can_view" 
ON public.website_visits 
FOR SELECT 
TO authenticated
USING (true);

-- Also fix contact_inquiries and site_visits
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON public.contact_inquiries;

CREATE POLICY "visitors_can_submit" 
ON public.contact_inquiries 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "authenticated_can_view_contacts" 
ON public.contact_inquiries 
FOR SELECT 
TO authenticated
USING (true);

-- Fix site_visits if it exists
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.site_visits;
DROP POLICY IF EXISTS "Enable update for anonymous users" ON public.site_visits;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON public.site_visits;

CREATE POLICY "visitors_can_track" 
ON public.site_visits 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "visitors_can_update_duration" 
ON public.site_visits 
FOR UPDATE 
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "authenticated_can_view_visits" 
ON public.site_visits 
FOR SELECT 
TO authenticated
USING (true);
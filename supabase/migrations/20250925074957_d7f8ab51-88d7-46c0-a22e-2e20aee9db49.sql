-- Fix remaining RLS policy issues with correct syntax
-- Remove the duplicate table that's causing security warnings
DROP TABLE IF EXISTS public.website_visits_duplicate;

-- Check if site_analytics policy exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'site_analytics' 
        AND policyname = 'Anyone can view site analytics'
    ) THEN
        CREATE POLICY "Anyone can view site analytics" 
        ON public.site_analytics 
        FOR SELECT 
        USING (true);
    END IF;
END $$;
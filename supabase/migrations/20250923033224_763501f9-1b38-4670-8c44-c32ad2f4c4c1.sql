-- Drop the view that depends on ip_address column
DROP VIEW IF EXISTS public.site_analytics;

-- Change ip_address from inet to text to handle cases where IP cannot be determined
ALTER TABLE public.site_visits 
ALTER COLUMN ip_address TYPE text USING ip_address::text;

-- Recreate the analytics view
CREATE VIEW public.site_analytics AS
SELECT 
  DATE(created_at) as visit_date,
  page_path,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(DISTINCT ip_address) as unique_visitors,
  COUNT(CASE WHEN is_returning_visitor = false THEN 1 END) as new_visitors,
  COUNT(CASE WHEN is_returning_visitor = true THEN 1 END) as returning_visitors,
  AVG(NULLIF(visit_duration, 0)) as avg_duration
FROM public.site_visits 
GROUP BY DATE(created_at), page_path;
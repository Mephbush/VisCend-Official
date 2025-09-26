-- Drop and recreate the analytics view without SECURITY DEFINER to fix security warning
DROP VIEW IF EXISTS public.site_analytics;

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
-- Drop the view first, then create the table
DROP VIEW IF EXISTS public.site_analytics;

-- Create site_analytics table for aggregated visitor data
CREATE TABLE public.site_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_date DATE NOT NULL,
  page_path TEXT NOT NULL,
  total_visits BIGINT NOT NULL DEFAULT 0,
  unique_visitors BIGINT NOT NULL DEFAULT 0,
  unique_sessions BIGINT NOT NULL DEFAULT 0,
  new_visitors BIGINT NOT NULL DEFAULT 0,
  returning_visitors BIGINT NOT NULL DEFAULT 0,
  avg_duration NUMERIC DEFAULT 0,
  bounce_rate NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(visit_date, page_path)
);

-- Enable RLS
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view site analytics" 
ON public.site_analytics 
FOR SELECT 
USING (true);

-- Create policy for system inserts/updates
CREATE POLICY "System can manage analytics" 
ON public.site_analytics 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_site_analytics_updated_at
BEFORE UPDATE ON public.site_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_site_analytics_date ON public.site_analytics(visit_date);
CREATE INDEX idx_site_analytics_page_path ON public.site_analytics(page_path);
CREATE INDEX idx_site_analytics_date_path ON public.site_analytics(visit_date, page_path);

-- Create function to aggregate visitor data into analytics
CREATE OR REPLACE FUNCTION public.update_site_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert or update daily analytics
  INSERT INTO public.site_analytics (
    visit_date,
    page_path,
    total_visits,
    unique_visitors,
    unique_sessions,
    new_visitors,
    returning_visitors,
    avg_duration,
    bounce_rate
  )
  SELECT 
    DATE(created_at) as visit_date,
    page_path,
    COUNT(*) as total_visits,
    COUNT(DISTINCT visitor_ip) as unique_visitors,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(*) FILTER (WHERE referrer IS NULL OR referrer = '') as new_visitors,
    COUNT(*) FILTER (WHERE referrer IS NOT NULL AND referrer != '') as returning_visitors,
    AVG(COALESCE(visit_duration, 0)) as avg_duration,
    (COUNT(*) FILTER (WHERE visit_duration <= 10) * 100.0 / COUNT(*)) as bounce_rate
  FROM public.website_visits
  WHERE DATE(created_at) = CURRENT_DATE
  GROUP BY DATE(created_at), page_path
  ON CONFLICT (visit_date, page_path)
  DO UPDATE SET
    total_visits = EXCLUDED.total_visits,
    unique_visitors = EXCLUDED.unique_visitors,
    unique_sessions = EXCLUDED.unique_sessions,
    new_visitors = EXCLUDED.new_visitors,
    returning_visitors = EXCLUDED.returning_visitors,
    avg_duration = EXCLUDED.avg_duration,
    bounce_rate = EXCLUDED.bounce_rate,
    updated_at = now();
END;
$$;

-- Create a function to be called whenever website_visits is updated
CREATE OR REPLACE FUNCTION public.trigger_analytics_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Schedule analytics update (this will run asynchronously)
  PERFORM public.update_site_analytics();
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger to update analytics when visits are added/updated
CREATE TRIGGER website_visits_analytics_trigger
  AFTER INSERT OR UPDATE ON public.website_visits
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_analytics_update();
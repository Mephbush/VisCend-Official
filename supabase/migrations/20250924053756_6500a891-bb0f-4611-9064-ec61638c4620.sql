-- Drop existing website_visits table and create a comprehensive one
DROP TABLE IF EXISTS public.website_visits;

-- Create comprehensive website visits table
CREATE TABLE public.website_visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip text,
  user_agent text,
  referrer text,
  page_path text NOT NULL,
  page_title text,
  device_type text,
  browser text,
  browser_version text,
  os text,
  os_version text,
  screen_width integer,
  screen_height integer,
  screen_color_depth integer,
  viewport_width integer,
  viewport_height integer,
  timezone text,
  language text,
  languages text,
  platform text,
  cookie_enabled boolean,
  online_status boolean,
  do_not_track text,
  connection_type text,
  connection_speed numeric,
  memory_used numeric,
  memory_total numeric,
  memory_limit numeric,
  country text,
  region text,
  city text,
  isp text,
  latitude numeric,
  longitude numeric,
  postal text,
  session_id text,
  visit_duration integer DEFAULT 0,
  bounce_rate boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_visits ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Anyone can insert website visits" 
ON public.website_visits 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view website visits" 
ON public.website_visits 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_website_visits_updated_at
BEFORE UPDATE ON public.website_visits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_website_visits_created_at ON public.website_visits(created_at);
CREATE INDEX idx_website_visits_page_path ON public.website_visits(page_path);
CREATE INDEX idx_website_visits_visitor_ip ON public.website_visits(visitor_ip);
CREATE INDEX idx_website_visits_session_id ON public.website_visits(session_id);
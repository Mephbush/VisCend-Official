-- Fix security warnings for functions
ALTER FUNCTION public.update_site_analytics() SET search_path = public;
ALTER FUNCTION public.trigger_analytics_update() SET search_path = public;
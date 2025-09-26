import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Simple session ID generator
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Get visitor IP from a simple API
const getVisitorIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'unknown',
      country: data.country || null,
      city: data.city || null
    };
  } catch (error) {
    console.log('Could not get visitor info:', error);
    return {
      ip: 'unknown',
      country: null,
      city: null
    };
  }
};

export const useSimpleTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        const visitorInfo = await getVisitorIP();
        
        // Simple visit data
        const visitData = {
          page_path: location.pathname,
          page_title: document.title,
          visitor_ip: visitorInfo.ip,
          country: visitorInfo.country,
          city: visitorInfo.city,
          user_agent: navigator.userAgent.substring(0, 500),
          referrer: document.referrer || null,
          session_id: sessionId,
          language: navigator.language,
          device_type: /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                  navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                  navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
          screen_width: screen.width,
          screen_height: screen.height,
          visit_duration: 0
        };

        console.log('Tracking page view:', location.pathname);
        console.log('Visit data:', visitData);

        // Insert to database
        const { error, data } = await supabase
          .from('website_visits')
          .insert([visitData])
          .select('id');

        if (error) {
          console.error('Tracking error:', error);
        } else {
          console.log('Page view tracked successfully:', data);
        }

      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };

    // Track after a small delay
    const timer = setTimeout(trackPageView, 1000);
    return () => clearTimeout(timer);

  }, [location.pathname]);
};
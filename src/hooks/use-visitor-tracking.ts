import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// ... existing helper functions (getSessionId, getDeviceInfo, getIPAddress, getLocationInfo, formatDuration, etc.)

export const useVisitorTracking = () => {
  const location = useLocation();

  useEffect(() => {
    let isTracked = false;

    const trackVisitor = async () => {
      if (isTracked) return;
      isTracked = true;

      try {
        const sessionId = getSessionId();
        const deviceInfo = getDeviceInfo();
        const ip_address = await getIPAddress();
        const locationInfo = await getLocationInfo(ip_address);

        const visitorData: VisitorData = {
          session_id: sessionId,
          ip_address,
          user_agent: navigator.userAgent,
          screen_resolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          referrer: document.referrer || 'Direct',
          page_path: location.pathname, // <- always correct!
          country: locationInfo.country,
          city: locationInfo.city,
          ...deviceInfo
        };

        // Store visitor data in Supabase
        console.log('Visitor data collected:', visitorData);

        try {
          const { error } = await supabase.from('site_visits').insert([{
            session_id: visitorData.session_id,
            ip_address: visitorData.ip_address,
            user_agent: visitorData.user_agent,
            screen_resolution: visitorData.screen_resolution,
            timezone: visitorData.timezone,
            language: visitorData.language,
            referrer: visitorData.referrer,
            page_path: visitorData.page_path,
            page_title: document.title,
            country: visitorData.country,
            city: visitorData.city,
            device_type: visitorData.device_type,
            browser: visitorData.browser,
            browser_version: visitorData.browser_version,
            operating_system: visitorData.os,
            is_returning_visitor: localStorage.getItem('has_visited') === 'true'
          }]);

          if (!error) {
            localStorage.setItem('has_visited', 'true');
          }
        } catch (error) {
          console.log('Error storing visitor data:', error);
        }

      } catch (error) {
        console.log('Visitor tracking error:', error);
      }
    };

    trackVisitor();

  }, [location.pathname]); // runs on every route change!
};
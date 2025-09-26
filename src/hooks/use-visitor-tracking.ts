import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Function to get comprehensive client info
const getClientInfo = () => {
  const ua = navigator.userAgent;
  
  // Detect device type
  const deviceType = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) 
    ? 'mobile' 
    : /Tablet|iPad/i.test(ua) 
    ? 'tablet' 
    : 'desktop';

  // Detect browser with version
  let browser = 'Unknown';
  let browserVersion = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browser = 'Chrome';
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
    const match = ua.match(/Version\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
    const match = ua.match(/Edg\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('Opera')) {
    browser = 'Opera';
    const match = ua.match(/Opera\/(\d+\.\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }

  // Detect OS with version
  let os = 'Unknown';
  let osVersion = 'Unknown';
  if (ua.includes('Windows NT')) {
    os = 'Windows';
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS';
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    osVersion = match ? match[1].replace('_', '.') : 'Unknown';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  } else if (ua.includes('Android')) {
    os = 'Android';
    const match = ua.match(/Android (\d+\.\d+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('iPhone OS') || ua.includes('iOS')) {
    os = 'iOS';
    const match = ua.match(/OS (\d+_\d+)/);
    osVersion = match ? match[1].replace('_', '.') : 'Unknown';
  }

  // Get additional device info
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const screenColorDepth = screen.colorDepth;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const languages = navigator.languages?.join(',') || language;
  const platform = navigator.platform;
  const cookieEnabled = navigator.cookieEnabled;
  const onlineStatus = navigator.onLine;
  const doNotTrack = navigator.doNotTrack || 'unspecified';
  
  // Get connection info if available
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionType = connection?.effectiveType || 'unknown';
  const connectionSpeed = connection?.downlink || null;
  
  // Get viewport info
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Get memory info if available
  const memory = (performance as any).memory;
  const memoryInfo = memory ? {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
  } : null;

  return { 
    deviceType, 
    browser, 
    browserVersion,
    os, 
    osVersion,
    screenWidth,
    screenHeight,
    screenColorDepth,
    viewportWidth,
    viewportHeight,
    timezone,
    language,
    languages,
    platform,
    cookieEnabled,
    onlineStatus,
    doNotTrack,
    connectionType,
    connectionSpeed,
    memoryInfo
  };
};

// Function to get visitor IP and location info
const getVisitorInfo = async (): Promise<any> => {
  const ipServices = [
    'https://api.ipify.org?format=json',
    'https://ipapi.co/json/',
    'https://ipinfo.io/json',
    'https://api.my-ip.io/ip.json',
    'https://api64.ipify.org?format=json'
  ];

  for (const service of ipServices) {
    try {
      const response = await fetch(service);
      const data = await response.json();
      
      // Different services return different structures
      let result = {
        ip: data.ip || data.query || 'unknown',
        country: data.country || data.country_name || data.country_code || null,
        region: data.region || data.regionName || null,
        city: data.city || null,
        timezone: data.timezone || null,
        isp: data.isp || data.org || null,
        latitude: data.lat || data.latitude || null,
        longitude: data.lon || data.longitude || null,
        postal: data.postal || data.zip || null
      };

      if (result.ip !== 'unknown') {
        return result;
      }
    } catch (error) {
      console.log(`Failed to get info from ${service}:`, error);
      continue;
    }
  }

  return {
    ip: 'unknown',
    country: null,
    region: null,
    city: null,
    timezone: null,
    isp: null,
    latitude: null,
    longitude: null,
    postal: null
  };
};

// Generate unique session ID
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const sessionId = getSessionId();
        const startTime = Date.now();
        
        // Store start time for duration calculation
        sessionStorage.setItem(`visit_start_${location.pathname}`, startTime.toString());
        
        const clientInfo = getClientInfo();
        const visitorInfo = await getVisitorInfo();
        
        const visitData = {
          visitor_ip: visitorInfo.ip,
          user_agent: navigator.userAgent.substring(0, 500),
          referrer: document.referrer || null,
          page_path: location.pathname,
          page_title: document.title || null,
          device_type: clientInfo.deviceType,
          browser: clientInfo.browser,
          browser_version: clientInfo.browserVersion,
          os: clientInfo.os,
          os_version: clientInfo.osVersion,
          screen_width: clientInfo.screenWidth,
          screen_height: clientInfo.screenHeight,
          screen_color_depth: clientInfo.screenColorDepth,
          viewport_width: clientInfo.viewportWidth,
          viewport_height: clientInfo.viewportHeight,
          timezone: clientInfo.timezone,
          language: clientInfo.language,
          languages: clientInfo.languages,
          platform: clientInfo.platform,
          cookie_enabled: clientInfo.cookieEnabled,
          online_status: clientInfo.onlineStatus,
          do_not_track: clientInfo.doNotTrack,
          connection_type: clientInfo.connectionType,
          connection_speed: clientInfo.connectionSpeed,
          memory_used: clientInfo.memoryInfo?.used || null,
          memory_total: clientInfo.memoryInfo?.total || null,
          memory_limit: clientInfo.memoryInfo?.limit || null,
          country: visitorInfo.country,
          region: visitorInfo.region,
          city: visitorInfo.city,
          isp: visitorInfo.isp,
          latitude: visitorInfo.latitude,
          longitude: visitorInfo.longitude,
          postal: visitorInfo.postal,
          session_id: sessionId,
          visit_duration: 0
        };

        // Insert visit data
        const { error, data } = await supabase
          .from('website_visits')
          .insert([visitData])
          .select('id')
          .single();

        if (error) {
          console.error('Failed to track visit:', error);
        } else if (data) {
          // Store visit ID for potential duration updates
          sessionStorage.setItem(`visit_id_${location.pathname}`, data.id);
        }

        // Track visit duration on page unload
        const handleBeforeUnload = () => {
          const endTime = Date.now();
          const startTimeStr = sessionStorage.getItem(`visit_start_${location.pathname}`);
          const visitId = sessionStorage.getItem(`visit_id_${location.pathname}`);
          
          if (startTimeStr && visitId) {
            const duration = Math.round((endTime - parseInt(startTimeStr)) / 1000); // Duration in seconds
            
            // Use navigator.sendBeacon for better reliability on page unload
            const updateData = JSON.stringify({ visit_duration: duration });
            navigator.sendBeacon(
              `https://eqehmuklqhcdzilrjjxm.supabase.co/rest/v1/website_visits?id=eq.${visitId}`,
              updateData
            );
          }
        };

        // Add event listeners for tracking duration
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handleBeforeUnload);

        // Cleanup function
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.removeEventListener('pagehide', handleBeforeUnload);
        };

      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Track visit immediately but with a small delay to ensure location is stable
    const timeoutId = setTimeout(trackVisit, 500);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]); // Also track query parameters changes
};
const { error, data } = await supabase
  .from('website_visits')
  .insert([visitData])
  .select('id')
  .single();

if (error) {
  console.error('❌ فشل الإدراج:', error.message, error.details);
} else {
  console.log('✅ إدراج ناجح:', data);
}


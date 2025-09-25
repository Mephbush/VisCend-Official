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

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const clientInfo = getClientInfo();
        const visitorInfo = await getVisitorInfo();
        
        const visitData = {
          visitor_ip: visitorInfo.ip,
          user_agent: navigator.userAgent.substring(0, 255), // Limit length
          referrer: document.referrer || null,
          page_path: location.pathname,
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
          postal: visitorInfo.postal
        };

        const { error } = await supabase
          .from('website_visits')
          .insert([visitData]);

        if (error) {
          console.error('Failed to track visit:', error);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Track visit after a small delay to avoid affecting page load
    const timeoutId = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};

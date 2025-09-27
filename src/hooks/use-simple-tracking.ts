import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DeviceDetector from 'device-detector-js';

// تحليل شامل للجهاز
const getClientInfo = () => {
  const ua = navigator.userAgent;
  const detector = new DeviceDetector();
  const parsed = detector.parse(ua);

  // تحليل يدوي إضافي للمتصفح والنظام
  let browser = parsed.client?.name || 'Unknown';
  let browserVersion = parsed.client?.version || 'Unknown';
  let os = parsed.os?.name || 'Unknown';
  let osVersion = parsed.os?.version || 'Unknown';

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

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionType = connection?.effectiveType || 'unknown';
  const connectionSpeed = connection?.downlink || null;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const memory = (performance as any).memory;
  const memoryInfo = memory ? {
    used: Math.round(memory.usedJSHeapSize / 1048576),
    total: Math.round(memory.totalJSHeapSize / 1048576),
    limit: Math.round(memory.jsHeapSizeLimit / 1048576)
  } : null;

  return {
    deviceType: parsed.device?.type || 'unknown',
    deviceBrand: parsed.device?.brand || 'unknown',
    deviceModel: parsed.device?.model || 'unknown',
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

// مصادر متعددة للحصول على IP وموقع الزائر
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
          user_agent: navigator.userAgent.substring(0, 255),
          referrer: document.referrer || null,
          page_path: location.pathname,
          device_type: clientInfo.deviceType,
          device_brand: clientInfo.deviceBrand,
          device_model: clientInfo.deviceModel,
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

        const { error } = await supabase.from('website_visits').insert([visitData]);
        if (error) {
          console.error('Failed to track visit:', error);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    const timeoutId = setTimeout(trackVisit, 1000);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};

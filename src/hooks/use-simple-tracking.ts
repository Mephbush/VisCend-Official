import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { TablesInsert } from '@/integrations/supabase/types';
// Lightweight client info collector (keeps only what we store)
const getClientInfo = () => {
  const ua = navigator.userAgent;

  // Device type
  const deviceType = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    ? 'mobile'
    : /Tablet|iPad/i.test(ua)
    ? 'tablet'
    : 'desktop';

  // Browser + version
  let browser = 'Unknown';
  let browserVersion = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
    browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
  }

  // OS + version
  let os = 'Unknown';
  let osVersion = 'Unknown';
  if (ua.includes('Windows NT')) {
    os = 'Windows';
    osVersion = ua.match(/Windows NT (\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS';
    osVersion = (ua.match(/Mac OS X (\d+[._]\d+)/)?.[1] || 'Unknown').replace('_', '.');
  } else if (ua.includes('Android')) {
    os = 'Android';
    osVersion = ua.match(/Android (\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('iPhone OS') || ua.includes('iOS')) {
    os = 'iOS';
    osVersion = (ua.match(/OS (\d+_\d+)/)?.[1] || 'Unknown').replace('_', '.');
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const memory = (performance as any).memory;

  return {
    deviceType,
    browser,
    browserVersion,
    os,
    osVersion,
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    languages: navigator.languages?.join(',') || navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    doNotTrack: navigator.doNotTrack || 'unspecified',
    connectionType: connection?.effectiveType || 'unknown',
    connectionSpeed: connection?.downlink || null,
    memoryInfo: memory
      ? {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          total: Math.round(memory.totalJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576),
        }
      : null,
  } as const;
};

const getIpInfo = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('ipapi failed');
    return await res.json();
  } catch (e) {
    console.warn('IP lookup failed', e);
    return null;
  }
};

export const useVisitLogger = () => {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        const [ipInfo] = await Promise.all([getIpInfo()]);
        const c = getClientInfo();

        const visitData: TablesInsert<'website_visits'> = {
          page_path: location.pathname,
          visitor_ip: (ipInfo as any)?.ip ?? null,
          user_agent: navigator.userAgent.slice(0, 255),
          referrer: document.referrer || null,
          device_type: c.deviceType,
          browser: c.browser,
          browser_version: c.browserVersion,
          os: c.os,
          os_version: c.osVersion,
          screen_width: c.screenWidth,
          screen_height: c.screenHeight,
          screen_color_depth: c.screenColorDepth,
          viewport_width: c.viewportWidth,
          viewport_height: c.viewportHeight,
          timezone: c.timezone,
          language: c.language,
          languages: c.languages,
          platform: c.platform,
          cookie_enabled: c.cookieEnabled,
          online_status: c.onlineStatus,
          do_not_track: c.doNotTrack,
          connection_type: c.connectionType,
          connection_speed: c.connectionSpeed as any,
          memory_used: (c.memoryInfo?.used as any) ?? null,
          memory_total: (c.memoryInfo?.total as any) ?? null,
          memory_limit: (c.memoryInfo?.limit as any) ?? null,
          country: (ipInfo as any)?.country_name || (ipInfo as any)?.country || null,
          region: (ipInfo as any)?.region || null,
          city: (ipInfo as any)?.city || null,
          isp: (ipInfo as any)?.org || null,
          latitude: (ipInfo as any)?.latitude ?? null,
          longitude: (ipInfo as any)?.longitude ?? null,
          postal: (ipInfo as any)?.postal ?? null,
          // session_duration defaults to 0 in DB, no need to set
        };

        const { error } = await supabase.from('website_visits').insert([visitData]);
        if (error) {
          console.error('Failed to log visit:', error);
        }
      } catch (e) {
        console.error('Unexpected error logging visit:', e);
      }
    };

    const t = setTimeout(logVisit, 500);
    return () => clearTimeout(t);
  }, [location.pathname]);
};

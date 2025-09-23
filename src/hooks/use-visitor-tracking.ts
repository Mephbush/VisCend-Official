import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorData {
  ip_address?: string;
  user_agent?: string;
  screen_resolution?: string;
  timezone?: string;
  language?: string;
  referrer?: string;
  page_path?: string;
  session_id?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  visit_duration?: number;
}

// Generate session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

// Get device info
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let device_type = 'Desktop';
  let browser = 'Unknown';
  let os = 'Unknown';

  // Detect device type
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device_type = 'Tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
    device_type = 'Mobile';
  }

  // Detect browser
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';

  // Detect OS
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  return { device_type, browser, os };
};

// Get IP address (using multiple services for better reliability)
const getIPAddress = async (): Promise<string> => {
  const services = [
    'https://api.ipify.org?format=json',
    'https://ipapi.co/ip/',
    'https://ipinfo.io/ip'
  ];

  for (const service of services) {
    try {
      const response = await fetch(service);
      if (service.includes('ipify')) {
        const data = await response.json();
        return data.ip;
      } else {
        const ip = await response.text();
        return ip.trim();
      }
    } catch (error) {
      console.log(`Failed to get IP from ${service}`);
    }
  }
  
  // Fallback: try to get IP from WebRTC
  try {
    return new Promise((resolve) => {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      pc.onicecandidate = (ice) => {
        if (ice.candidate) {
          const candidate = ice.candidate.candidate;
          const ipMatch = candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
          if (ipMatch) {
            pc.close();
            resolve(ipMatch[1]);
          }
        }
      };
      pc.createOffer().then(offer => pc.setLocalDescription(offer));
      
      // Timeout after 3 seconds
      setTimeout(() => {
        pc.close();
        resolve('غير محدد');
      }, 3000);
    });
  } catch (error) {
    return 'غير محدد';
  }
};

// Get geolocation info
const getLocationInfo = async (ip: string) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown'
    };
  } catch (error) {
    return {
      country: 'Unknown',
      city: 'Unknown'
    };
  }
};

// Format visit duration in Arabic
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  let result = '';
  if (hours > 0) result += `${hours} ساعة `;
  if (minutes > 0) result += `${minutes} دقيقة `;
  if (secs > 0 || result === '') result += `${secs} ثانية`;
  
  return result.trim();
};

export const useVisitorTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
    let isTracked = false;
    let lastPath = window.location.pathname;

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
          page_path: window.location.pathname,
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

    // Track page navigation
    const trackPageNavigation = async (newPath: string) => {
      if (newPath !== lastPath) {
        console.log(`تنقل من ${lastPath} إلى ${newPath}`);
        
        // Track new page visit
        try {
          const sessionId = getSessionId();
          const deviceInfo = getDeviceInfo();
          const ip_address = await getIPAddress();
          const locationInfo = await getLocationInfo(ip_address);

          const visitorData = {
            session_id: sessionId,
            ip_address,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            referrer: lastPath,
            page_path: newPath,
            page_title: document.title,
            country: locationInfo.country,
            city: locationInfo.city,
            device_type: deviceInfo.device_type,
            browser: deviceInfo.browser,
            operating_system: deviceInfo.os,
            is_returning_visitor: localStorage.getItem('has_visited') === 'true'
          };

          await supabase.from('site_visits').insert([visitorData]);
          console.log(`تم تسجيل زيارة جديدة للصفحة: ${newPath} - IP: ${ip_address}`);
        } catch (error) {
          console.log('خطأ في تتبع تنقل الصفحة:', error);
        }
        
        lastPath = newPath;
      }
    };

    // Track page duration on beforeunload
    const handleBeforeUnload = async () => {
      const visit_duration = Math.round((Date.now() - startTime) / 1000);
      const durationFormatted = formatDuration(visit_duration);
      
      try {
        const sessionId = getSessionId();
        console.log(`مدة الزيارة: ${durationFormatted} للجلسة: ${sessionId}`);
        
        // Update database with visit duration
        try {
          await supabase.from('site_visits')
            .update({ 
              visit_duration,
              ended_at: new Date().toISOString()
            })
            .eq('session_id', sessionId)
            .eq('page_path', window.location.pathname);
        } catch (error) {
          console.log('Error updating visit duration:', error);
        }
      } catch (error) {
        console.log('Duration tracking error:', error);
      }
    };

    // Monitor URL changes for page navigation tracking
    const handleUrlChange = () => {
      trackPageNavigation(window.location.pathname);
    };

    // Track immediately
    trackVisitor();

    // Track duration on page leave
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    
    // Track navigation changes (for SPA routing)
    window.addEventListener('popstate', handleUrlChange);
    
    // Intercept link clicks to track page navigation
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.href.startsWith('http') && !link.href.includes('#')) {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin) {
          setTimeout(() => trackPageNavigation(url.pathname), 100);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      window.removeEventListener('popstate', handleUrlChange);
      document.removeEventListener('click', handleLinkClick);
      handleBeforeUnload(); // Track duration on component unmount
    };
  }, []);
};
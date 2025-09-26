import { useEffect } from 'react';

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

// Get IP address (using a public service)
const getIPAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.log('Could not get IP address');
    return 'Unknown';
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

export const useVisitorTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
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
          page_path: window.location.pathname,
          country: locationInfo.country,
          city: locationInfo.city,
          ...deviceInfo
        };

        // Store visitor data (will be implemented once database table is created)
        console.log('Visitor data collected:', visitorData);
        
        // TODO: Implement database storage once site_visitors table is created
        // await supabase.from('site_visitors').insert([{
        //   ...visitorData,
        //   visit_timestamp: new Date().toISOString()
        // }]);

      } catch (error) {
        console.log('Visitor tracking error:', error);
      }
    };

    // Track page duration on beforeunload
    const handleBeforeUnload = async () => {
      const visit_duration = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      try {
        const sessionId = getSessionId();
        console.log('Visit duration:', visit_duration, 'seconds for session:', sessionId);
        
        // TODO: Update database with visit duration once table is created
        // await supabase.from('site_visitors')
        //   .update({ visit_duration })
        //   .eq('session_id', sessionId)
        //   .eq('page_path', window.location.pathname);
      } catch (error) {
        console.log('Duration tracking error:', error);
      }
    };

    // Track immediately
    trackVisitor();

    // Track duration on page leave
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      handleBeforeUnload(); // Track duration on component unmount
    };
  }, []);
};
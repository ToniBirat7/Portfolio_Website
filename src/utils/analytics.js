const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const ANALYTICS_DEBUG = import.meta.env.VITE_ANALYTICS_DEBUG === 'true';

let initialized = false;

function ensureDataLayer() {
  if (typeof window === 'undefined') return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function initializeAnalytics() {
  if (initialized || typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return false;
  }

  const existing = document.querySelector(
    `script[data-ga-id="${GA_MEASUREMENT_ID}"]`,
  );
  if (!existing) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.setAttribute('data-ga-id', GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  const dataLayer = ensureDataLayer();
  if (!dataLayer) return false;

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  initialized = true;
  return true;
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return false;
  ensureDataLayer();

  window.__analyticsEvents = window.__analyticsEvents || [];
  window.__analyticsEvents.push({
    name: eventName,
    params,
    timestamp: Date.now(),
  });
  if (window.__analyticsEvents.length > 80) {
    window.__analyticsEvents.shift();
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    return true;
  }

  if (ANALYTICS_DEBUG) {
    window.dataLayer.push({ debug_event: eventName, debug_params: params });
  }
  window.dataLayer.push(['event', eventName, params]);
  return false;
}

export function trackPageView(pagePath, pageTitle) {
  if (typeof window === 'undefined') return;

  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  });
}

export function trackScrollDepth(depth) {
  trackEvent('scroll_depth', {
    depth,
  });
}

export function getAnalyticsStatus() {
  return {
    measurementId: GA_MEASUREMENT_ID,
    enabled: Boolean(GA_MEASUREMENT_ID),
    initialized,
  };
}

export function isAnalyticsDebugEnabled() {
  return ANALYTICS_DEBUG;
}

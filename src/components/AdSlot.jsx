import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from '../utils/analytics';
import './AdSlot.css';

/**
 * CLS-safe ad slot component for AdSense integration.
 * Pre-reserves space and tracks ad rendering/viewing events.
 */
export default function AdSlot({
  placement,
  width = '300px',
  height = '250px',
}) {
  const slotRef = useRef(null);
  const impressionTracked = useRef(false);

  useEffect(() => {
    if (!slotRef.current) return;

    // Track ad slot render
    trackEvent('ad_slot_rendered', {
      placement: placement,
      width: width,
      height: height,
      timestamp: new Date().toISOString(),
    });

    // Track ad view (impression) when slot becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTracked.current) {
            impressionTracked.current = true;

            trackEvent('ad_slot_viewed', {
              placement: placement,
              visible_time: Date.now(),
              viewport_height: window.innerHeight,
              viewport_width: window.innerWidth,
            });

            // Load ads script if not already loaded (for AdSense)
            if (!window.adsbygoogle) {
              window.adsbygoogle = window.adsbygoogle || [];
              const script = document.createElement('script');
              script.src =
                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
              script.async = true;
              script.crossOrigin = 'anonymous';
              document.head.appendChild(script);
            }

            // Push ad to AdSense queue when ids are configured
            if (
              window.adsbygoogle &&
              import.meta.env.VITE_ADSENSE_CLIENT_ID &&
              import.meta.env.VITE_ADSENSE_BLOG_SLOT_ID
            ) {
              try {
                window.adsbygoogle.push({});
              } catch (e) {
                // AdSense push failed silently
              }
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(slotRef.current);

    return () => observer.disconnect();
  }, [placement, width, height]);

  // CSS class for responsive sizing
  const aspectRatio =
    width === '728px' && height === '90px'
      ? 'leaderboard'
      : width === '300px' && height === '250px'
        ? 'medium-rectangle'
        : 'responsive';

  return (
    <div
      ref={slotRef}
      className={`ad-slot ad-slot-${placement} ${aspectRatio}`}
      style={{
        minHeight: height,
        maxWidth: width,
        margin: '20px auto',
        clear: 'both',
      }}
    >
      {/* Google AdSense Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || ''}
        data-ad-slot={import.meta.env.VITE_ADSENSE_BLOG_SLOT_ID || ''}
      />
    </div>
  );
}

AdSlot.propTypes = {
  placement: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

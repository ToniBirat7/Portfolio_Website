import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from '../utils/analytics';
import {
  ADSENSE_BLOG_SLOT_ID,
  ADSENSE_CLIENT_ID,
  hasBlogAdSlot,
} from '../utils/adsense';
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

            // Script is loaded once in index.html; queue ads only when configured.
            if (hasBlogAdSlot) {
              try {
                window.adsbygoogle = window.adsbygoogle || [];
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
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={ADSENSE_BLOG_SLOT_ID}
      />
    </div>
  );
}

AdSlot.propTypes = {
  placement: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

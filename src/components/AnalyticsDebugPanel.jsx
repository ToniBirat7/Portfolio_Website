import { useEffect, useMemo, useState } from 'react';
import {
  getAnalyticsStatus,
  isAnalyticsDebugEnabled,
} from '../utils/analytics.js';

const MAX_ITEMS = 8;

const AnalyticsDebugPanel = () => {
  const enabled = useMemo(
    () => import.meta.env.DEV && isAnalyticsDebugEnabled(),
    [],
  );
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const tick = () => {
      const history = window.__analyticsEvents || [];
      setEvents(history.slice(-MAX_ITEMS).reverse());
    };

    tick();
    const interval = window.setInterval(tick, 700);
    return () => window.clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  const status = getAnalyticsStatus();

  return (
    <aside
      style={{
        position: 'fixed',
        right: '14px',
        bottom: '14px',
        width: open ? '340px' : 'auto',
        zIndex: 2100,
        background: 'rgba(8, 19, 36, 0.95)',
        color: '#e6f1ff',
        border: '1px solid rgba(100, 255, 218, 0.25)',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        padding: '0.65rem',
        fontFamily: 'Space Mono, monospace',
      }}
      aria-label="Analytics debug panel"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          border: 'none',
          background: 'transparent',
          color: '#64ffda',
          cursor: 'pointer',
          fontSize: '0.75rem',
          letterSpacing: '0.6px',
        }}
      >
        analytics {open ? 'hide' : 'show'}
      </button>

      {open && (
        <div
          style={{ marginTop: '0.55rem', fontSize: '0.68rem', lineHeight: 1.4 }}
        >
          <p style={{ margin: '0 0 0.4rem' }}>
            enabled: {status.enabled ? 'yes' : 'no'} | initialized:{' '}
            {status.initialized ? 'yes' : 'no'}
          </p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              maxHeight: '220px',
              overflow: 'auto',
            }}
          >
            {events.length === 0 && (
              <li style={{ opacity: 0.75 }}>no events yet</li>
            )}
            {events.map((item, idx) => (
              <li
                key={`${item.timestamp}-${item.name}-${idx}`}
                style={{
                  borderTop: '1px solid rgba(100, 255, 218, 0.1)',
                  paddingTop: '0.3rem',
                  marginTop: '0.3rem',
                }}
              >
                <strong style={{ color: '#64ffda' }}>{item.name}</strong>
                <br />
                <span style={{ opacity: 0.8 }}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default AnalyticsDebugPanel;

import { useRef, useState, useEffect, useCallback } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView({ threshold = 0.1, rootMargin = '0px', once = true } = {}) {
  const [isInView, setIsInView] = useState(prefersReducedMotion);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const ref = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (prefersReducedMotion) return;

      if (node) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (once) observerRef.current?.disconnect();
            } else if (!once) {
              setIsInView(false);
            }
          },
          { threshold, rootMargin }
        );
        observerRef.current.observe(node);
        elementRef.current = node;
      }
    },
    [threshold, rootMargin, once]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return [ref, isInView];
}

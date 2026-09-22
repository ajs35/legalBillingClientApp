import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Mirrors the original app's syncFloatingHeaderOffsets(): the floating header's rendered
 * height isn't a fixed number (it depends on real font metrics), so measure it and push the
 * sibling .scroll's padding-top down by exactly that much (plus the fade's 44px overshoot and
 * a 16px gap) instead of hardcoding a px estimate that drifts from the real layout.
 */
export function useFloatingHeaderOffset<T extends HTMLElement>() {
  const headerRef = useRef<T | null>(null);
  const [paddingTop, setPaddingTop] = useState(230);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setPaddingTop(el.offsetHeight + 44 + 16);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return { headerRef, paddingTop };
}

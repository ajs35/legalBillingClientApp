import { useRef, useState } from 'react';

const REVEAL = 196;

/**
 * Pointer-driven swipe-to-reveal for schedule cards: swiping right drags the card off the
 * reveal row underneath (notes/reschedule/remove); swiping left drags it back closed. The
 * drag continues from wherever the card currently sits (open or closed) rather than always
 * measuring from the touch-down point, so a swipe left from an already-open row slides it
 * shut instead of snapping. A vertical drag falls through to normal scrolling, and a plain
 * tap (no movement) opens the item's details when closed, or closes it when open — matching
 * the original app's attachSwipe() behavior.
 */
export function useSwipeReveal(onTap: () => void) {
  const [open, setOpen] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const state = useRef({ x0: 0, y0: 0, startOffset: 0, mode: null as 'h' | 'v' | null, dragging: false });

  const onPointerDown = (e: React.PointerEvent) => {
    state.current = { x0: e.clientX, y0: e.clientY, startOffset: open ? REVEAL : 0, mode: null, dragging: true };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const ddx = e.clientX - s.x0;
    const ddy = e.clientY - s.y0;
    if (!s.mode && (Math.abs(ddx) > 8 || Math.abs(ddy) > 8)) {
      s.mode = Math.abs(ddx) > Math.abs(ddy) ? 'h' : 'v';
    }
    if (s.mode === 'h') {
      setDragX(Math.max(0, Math.min(REVEAL, s.startOffset + ddx)));
    }
  };
  const onPointerUp = () => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (s.mode === 'h') {
      const dx = dragX ?? s.startOffset;
      setOpen(dx > REVEAL / 2);
      setDragX(null);
    } else if (s.mode === null) {
      if (open) setOpen(false);
      else onTap();
    } else {
      setDragX(null);
    }
  };

  const transform = dragX !== null ? dragX : open ? REVEAL : 0;

  return {
    open,
    setOpen,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
    style: { transform: `translateX(${transform}px)`, transition: dragX !== null ? 'none' : undefined },
  };
}

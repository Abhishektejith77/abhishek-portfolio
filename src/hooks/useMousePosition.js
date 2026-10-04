/**
 * useMousePosition.js
 * Returns the live cursor position as a ref (no re-renders).
 * Both mouse and touch coordinates are tracked.
 */

import { useEffect, useRef } from "react";

export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      isTouch.current = false;
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e) => {
      isTouch.current = true;
      if (e.touches[0]) {
        pos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return { pos, isTouch };
}

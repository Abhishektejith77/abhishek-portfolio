/**
 * CustomCursor.jsx
 * Bare minimum precision dot cursor.
 * Stays out of the way, completely silent, disabled on touch/coarse devices.
 * No trailing labels, no floating pills.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const { cursorState } = useCursor();
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointerFine(mq.matches);

    const handler = (e) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine || !dotRef.current) return;

    // Use GSAP quickTo for zero overhead mouse tracking
    const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power2.out" });

    gsap.set(dotRef.current, { x: -20, y: -20, opacity: 0 });

    let hasEntered = false;
    const onMove = (e) => {
      if (!hasEntered) {
        gsap.to(dotRef.current, { opacity: 0.85, duration: 0.2 });
        hasEntered = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onLeave = () => {
      gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
      hasEntered = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isPointerFine]);

  useEffect(() => {
    if (!isPointerFine || !dotRef.current) return;

    if (cursorState === "hover" || cursorState === "project") {
      gsap.to(dotRef.current, {
        scale: 2.2,
        backgroundColor: "var(--color-black)",
        opacity: 0.4,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: "var(--color-black)",
        opacity: 0.85,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [cursorState, isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: "var(--color-black)",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

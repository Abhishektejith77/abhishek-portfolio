/**
 * useLenis.js
 * Initialises Lenis smooth scroll and syncs it with GSAP ScrollTrigger & ticker.
 * Returns the lenis instance ref.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll updates with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis with GSAP ticker for seamless frame timing
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

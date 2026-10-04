/**
 * motion.js
 * Centralized motion presets and text reveal animations using GSAP & ScrollTrigger.
 *
 * Rules:
 *   - Fast choreography (0.8s - 1.2s max)
 *   - Uses transforms and opacity (no layout-inducing properties)
 *   - Reusable reveal behaviors:
 *       1. subtleFadeUp(elements, options)
 *       2. maskedLineReveal(elements, options)
 *       3. groupedStagger(elements, options)
 */

import { gsap } from "@/hooks/useGSAP";

export const ease = {
  out:    "expo.out",
  smooth: "power2.out",
  snappy: "power3.out",
  inOut:  "power2.inOut",
};

export const dur = {
  micro: 0.2,
  ui:    0.35,
  text:  0.8,
  hero:  1.0,
};

/**
 * Reusable reveal: Subtle Fade Up
 */
export function subtleFadeUp(elements, trigger, vars = {}) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: dur.text,
      ease: ease.out,
      stagger: vars.stagger ?? 0.08,
      scrollTrigger: trigger
        ? {
            trigger,
            start: vars.start ?? "top 82%",
            once: true,
          }
        : undefined,
      ...vars,
    }
  );
}

/**
 * Reusable reveal: Grouped Stagger
 */
export function groupedStagger(elements, trigger, vars = {}) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: ease.smooth,
      stagger: vars.stagger ?? 0.06,
      scrollTrigger: trigger
        ? {
            trigger,
            start: vars.start ?? "top 84%",
            once: true,
          }
        : undefined,
      ...vars,
    }
  );
}

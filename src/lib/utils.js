/**
 * utils.js
 * Shared utility functions.
 */

/**
 * Conditionally join class names.
 * Usage: cn("base", condition && "conditional", "always")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Pad a number with a leading zero: 1 -> "01"
 */
export function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation.
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

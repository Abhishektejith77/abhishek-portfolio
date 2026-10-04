/**
 * useGSAP.js
 * Re-exports GSAP core + ScrollTrigger with the plugin registered.
 * Import gsap and ScrollTrigger from here everywhere in the project.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

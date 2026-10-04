/**
 * CaseStudySlide.jsx
 * Presentation/deck-style visual canvas for individual case study slides.
 *
 * Requirements:
 * - Full browser width presentation canvas (no card, no border, no radius, no shadow)
 * - 16:9 aspect ratio desktop canvas, responsive on mobile
 * - Configurable object-fit mode (default: 'contain' to preserve deck composition & typography)
 * - Neutral presentation background canvas (#0F1112)
 * - Lazy loading with subtle opacity reveal
 * - No visible 'Slide 01' label in the final design (uses accessible aria-label)
 */

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export default function CaseStudySlide({
  src = null,
  alt = "Project presentation slide",
  slideNumber = 1,
  fit = "contain",
  aspectRatio = "16/9",
  bg = "#0E1012",
}) {
  const slideRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slideRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, slideRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={slideRef}
      role="region"
      aria-label={`Presentation slide ${slideNumber}`}
      style={{
        width: "100%",
        maxWidth: "100vw",
        aspectRatio,
        backgroundColor: bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform, opacity",
      }}
      className="case-study-slide-canvas"
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
            display: "block",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      ) : (
        /* Subtle neutral presentation canvas surface (ready for user's real presentation slide) */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          {/* Subtle minimalist canvas marker — visible only as an ultra-restrained tone */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .case-study-slide-canvas {
            aspect-ratio: 16 / 10 !important;
          }
        }
      `}</style>
    </div>
  );
}

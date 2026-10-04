/**
 * CaseStudyHero.jsx
 * Main project hero visual presentation thumbnail.
 *
 * Requirements:
 * - Visually dominant
 * - Full-width / wide viewport container
 * - 16:9 desktop aspect ratio, responsive on mobile
 * - No border, no rounded corners, no shadow, no fake UI
 * - Image uses object-fit: cover
 * - Clean neutral placeholder treatment when image is null
 * - Lazy loading with smooth opacity reveal
 * - Subtle GSAP entrance on viewport entry
 */

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export default function CaseStudyHero({
  image = null,
  alt = "Project Hero Visual",
  aspectRatio = "16/9",
}) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Project Hero Visual"
      style={{
        width: "100%",
        paddingInline: "var(--gutter)",
        marginInline: "auto",
        marginBottom: "clamp(56px, 8vw, 104px)",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio,
          backgroundColor: "#E9EFEF",
          overflow: "hidden",
          position: "relative",
          willChange: "transform, opacity",
        }}
        className="case-study-hero-canvas"
      >
        {image ? (
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.45s ease",
            }}
          />
        ) : (
          /* Subtle neutral placeholder canvas — pure editorial surface without fake UI */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E8EEEE",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "rgba(0, 0, 0, 0.28)",
                textTransform: "uppercase",
              }}
            >
              HERO VISUAL
            </span>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-study-hero-canvas {
            aspectRatio: 16 / 10 !important;
          }
        }
      `}</style>
    </section>
  );
}

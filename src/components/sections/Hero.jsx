/**
 * Hero.jsx
 *
 * Strict Visual Direction (Refined Editorial Opening Statement):
 * - Hero Height: 100vh / 100svh minimum height (no forced fixed pixel height)
 * - Hero Visual: Full-bleed natural photograph (no white overlay, no artificial dark tint)
 *     Desktop: Subject preserved on the right, calm area on the left for typography
 * - Copy Position: Bottom-left anchored with exact site gutter alignment
 *     Desktop width: 40–50% viewport width
 * - Headline:
 *     "Good Design Starts Before The Design."
 *     Funnel Display, 64–76px desktop (clamp), font-weight 600, line-height 0.90–0.96
 * - Supporting Copy:
 *     "I'm A Visual Designer Working Across Brand, UX And Digital. I Start With The Problem, Find What Matters, And Build From There."
 *     Funnel Display, 16–18px desktop (clamp), font-weight 400–500, line-height 1.35–1.45
 *     Restrained spacing beneath headline
 * - Entrance: Controlled editorial GSAP reveal (opacity + subtle translateY + soft blur resolution)
 * - Scroll Exit: Copy fades out smoothly and moves upward ~30–40px on scroll; image remains visible and does NOT fade
 * - Responsive: Cinematic on desktop, spacious on tablet, perfectly framed on mobile with zero horizontal overflow
 * - Zero buttons, metadata, scroll indicators, labels, CTAs, cards, gradients, or overlays
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";

export default function Hero() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const contentRef = useRef(null);
  const parallaxRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const { setCursor } = useCursor();

  // Controlled editorial GSAP entrance reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Natural full-bleed image establishes calmly
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.2 }
      )
        // 2. Headline line 1 resolves with masked progression
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 28, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          "-=0.7"
        )
        // 3. Headline line 2 resolves smoothly
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
          "-=0.6"
        )
        // 4. Supporting copy resolves beneath
        .fromTo(
          line3Ref.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.55"
        );

      // Hero copy scroll exit: copy fades out and moves upward ~30–40px
      // Reverses smoothly on scroll back. Image does NOT fade.
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -36,
        ease: "power1.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "55% top",
          scrub: 0.5,
        },
      });

      // Subtle background image scale (image remains 100% visible throughout)
      gsap.to(visualRef.current, {
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Subtle desktop mouse parallax (restrained 4–8px movement)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(visualRef.current, {
        x: -nx * 8,
        y: -ny * 6,
        duration: 1.6,
        ease: "power2.out",
        overwrite: "auto",
      });
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          x: nx * 5,
          y: ny * 3,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="intro"
      aria-label="Introduction"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "100svh",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* ── 01. Full-Bleed Natural Visual Background (Edge to Edge, Top to Bottom) ── */}
      <div
        ref={visualRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-24px",
          zIndex: 1,
          opacity: 0,
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      >
        <picture
          className="hero-visual-picture"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Mobile Hero Visual (viewport <= 768px) */}
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero-mobile.png"
          />
          {/* Desktop & Tablet Hero Visual (viewport > 768px) */}
          <source
            media="(min-width: 769px)"
            srcSet="/images/hero-desktop.png"
          />
          <img
            src="/images/hero-desktop.png"
            alt=""
            role="presentation"
            fetchPriority="high"
            decoding="async"
            className="hero-visual-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              userSelect: "none",
            }}
          />
        </picture>
      </div>

      {/* ── 02. Foreground Text Layer (Bottom-Left Anchored, Pure White #F7FDFD) ── */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(64px, 8.5vh, 108px)",
          zIndex: 2,
          width: "100%",
          pointerEvents: "auto",
          willChange: "transform, opacity",
        }}
        className="site-container hero-content-container"
      >
        <div
          ref={parallaxRef}
          style={{
            width: "100%",
            maxWidth: "min(620px, 48vw)",
            willChange: "transform",
          }}
          className="hero-text-block"
        >
          {/* Headline (Funnel Display, prominent clamp, connected 2-line editorial wrapping) */}
          <h1
            className="hero-headline"
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              fontFamily: "var(--font-family)",
              fontSize: "clamp(2.35rem, 3.9vw, 66px)",
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              color: "#F7FDFD",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.6)",
            }}
          >
            <span
              ref={line1Ref}
              className="hero-headline-line"
              style={{
                display: "block",
                lineHeight: 0.94,
                fontWeight: 600,
                color: "#F7FDFD",
              }}
            >
              Good Design Starts
            </span>
            <span
              ref={line2Ref}
              className="hero-headline-line"
              style={{
                display: "block",
                lineHeight: 0.94,
                fontWeight: 600,
                color: "#F7FDFD",
              }}
            >
              Before The Design.
            </span>
          </h1>

          {/* Supporting Copy (Funnel Display, 16–18px desktop, line-height 1.40) */}
          <p
            ref={line3Ref}
            style={{
              display: "block",
              fontFamily: "var(--font-family)",
              fontWeight: 450,
              color: "#F7FDFD",
              fontSize: "clamp(0.95rem, 1.15vw, 1.125rem)",
              lineHeight: 1.40,
              marginTop: "20px",
              maxWidth: "38ch",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.6)",
            }}
          >
            I'm A Visual Designer Working Across Brand, UX And Digital. I Start With The Problem, Find What Matters, And Build From There.
          </p>
        </div>
      </div>

      <style>{`
        .hero-visual-picture {
          display: block;
          width: 100%;
          height: 100%;
        }

        .hero-visual-img {
          object-position: 78% center;
        }

        .hero-text-block {
          width: 100%;
          max-width: min(620px, 48vw);
        }

        @media (max-width: 1024px) {
          .hero-visual-img {
            object-position: 80% center;
          }
          .hero-content-container {
            bottom: clamp(52px, 7.5vh, 88px) !important;
          }
          .hero-text-block {
            max-width: min(580px, 60vw) !important;
          }
        }

        @media (max-width: 768px) {
          .hero-content-container {
            bottom: clamp(36px, 6.5vh, 56px) !important;
          }
          .hero-text-block {
            max-width: 100% !important;
          }
          .hero-visual-img {
            object-position: center center;
          }
          .hero-headline {
            font-size: clamp(2rem, 7.5vw, 2.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * About.jsx
 *
 * Implements Reference Set 03 strictly according to design.md Section 01, 25 & 26:
 * - Reference principle: ONE STRONG PARAGRAPH + ONE SMALL IMAGE.
 * - Minimal composition with generous whitespace.
 * - No cards. No statistics. No timeline. No skills grid. No résumé-style dump.
 * - Paragraph on left, small portrait/image placeholder on right (subtle crop, supporting the paragraph).
 * - Naturally communicates: Visual Designer with strong UX background, architecture background,
 *   brand + digital, Hyderabad location, interest in clarity and visual systems.
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Abhishek"
      style={{
        paddingBlock: "clamp(64px, 12vw, 128px)",
        borderTop: "1px solid var(--color-hairline)",
      }}
      className="site-container"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.85fr",
          gap: "clamp(32px, 6vw, 80px)",
          alignItems: "center",
        }}
        className="about-ref-grid"
      >
        {/* ── Left Column: ONE STRONG PARAGRAPH ONLY (Section 06) ── */}
        <div ref={textRef} style={{ opacity: 0 }}>
          <span className="type-meta" style={{ color: "var(--color-black)", opacity: 0.5, display: "block", marginBottom: "20px" }}>
            04 &middot; About
          </span>

          <p
            className="type-lead"
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.85rem)",
              fontWeight: 500,
              lineHeight: 1.55,
              color: "var(--color-black)",
              margin: 0,
              maxWidth: "48ch",
              letterSpacing: "-0.015em",
            }}
          >
            I'm Abhishek, a Visual Designer with a background in architecture. I work across brand, UX and digital, moving between the bigger problem and the details that make a solution work. I like making things clear, useful and considered, without adding more than they need.
          </p>
        </div>

        {/* ── Right Column: ONE SMALL SUPPORTING PORTRAIT / IMAGE ── */}
        <div
          ref={imgRef}
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "280px",
              aspectRatio: "4/5",
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-divider)",
              borderRadius: "0px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Art-Directed Architectural Monogram Silhouette */}
            <svg
              viewBox="0 0 280 350"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <rect width="280" height="350" fill="var(--color-white)" />
              {/* Subtle architectural elevation lines */}
              <line x1="24" y1="50" x2="256" y2="50" stroke="var(--color-divider)" strokeWidth="0.75" />
              <line x1="24" y1="175" x2="256" y2="175" stroke="var(--color-divider)" strokeWidth="0.75" />
              <line x1="24" y1="300" x2="256" y2="300" stroke="var(--color-divider)" strokeWidth="0.75" />
              <line x1="140" y1="30" x2="140" y2="320" stroke="var(--color-divider)" strokeWidth="0.75" strokeDasharray="3 4" />

              {/* Minimal geometric silhouette */}
              <circle cx="140" cy="140" r="50" fill="none" stroke="var(--color-black)" strokeWidth="1" opacity="0.6" />
              <circle cx="140" cy="140" r="24" fill="var(--color-black)" opacity="0.06" />
              <path d="M 90 260 Q 140 210 190 260" fill="none" stroke="var(--color-black)" strokeWidth="1" opacity="0.5" />

              {/* Sparse metadata corner stamp */}
              <text x="24" y="330" fontFamily="var(--font-family)" fontSize="9" fill="var(--color-black)" opacity="0.45" letterSpacing="2">
                PORTRAIT / REF &middot; ABHISHEK
              </text>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .about-ref-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-ref-grid > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}

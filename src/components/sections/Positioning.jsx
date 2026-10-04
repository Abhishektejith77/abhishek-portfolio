/**
 * Positioning.jsx
 * Personal Positioning & Philosophy.
 * 8-Point Grid alignment (padding, margins, gaps in multiples of 8px).
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export default function Positioning() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      id="positioning"
      aria-label="Design Positioning"
      style={{
        paddingBlock: "clamp(64px, 12vw, 128px)",
        borderTop: "1px solid var(--color-divider)",
      }}
      className="site-container"
    >
      <div
        ref={textRef}
        style={{
          display: "grid",
          gridTemplateColumns: "0.35fr 0.65fr",
          gap: "clamp(24px, 5vw, 64px)",
          alignItems: "baseline",
        }}
        className="positioning-grid"
      >
        <div>
          <span className="type-meta" style={{ color: "var(--color-black)", opacity: 0.5 }}>
            01 &middot; Perspective
          </span>
        </div>

        <div>
          <p
            className="type-lead"
            style={{
              color: "var(--color-black)",
              marginBottom: "32px",
              maxWidth: "48ch",
            }}
          >
            I work across brand, digital and UX, moving between the big idea and the details that make it work.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              paddingTop: "32px",
              borderTop: "1px solid var(--color-divider)",
            }}
            className="positioning-subgrid"
          >
            <div>
              <span className="type-ui" style={{ color: "var(--color-black)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                Brand &amp; Visual Identity
              </span>
              <p className="type-body" style={{ margin: 0, opacity: 0.85 }}>
                I build identities that give brands a clear point of view, from the first mark to the system that carries it forward.
              </p>
            </div>

            <div>
              <span className="type-ui" style={{ color: "var(--color-black)", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                UX &amp; Digital Experiences
              </span>
              <p className="type-body" style={{ margin: 0, opacity: 0.85 }}>
                I design digital experiences around real behaviour, not just screens, making them easier to understand, use and remember.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .positioning-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .positioning-subgrid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

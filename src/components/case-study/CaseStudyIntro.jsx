/**
 * CaseStudyIntro.jsx
 * Editorial top introduction for internal project case studies.
 *
 * Requirements:
 * - Wide responsive content container (site-container)
 * - Restrained typography-led layout (Funnel Display only)
 * - Generous, deliberate negative space
 * - Semantic hierarchy:
 *     - Project Name (h1, strong authority)
 *     - Short project description
 *     - CONTRIBUTIONS (concise list of actual completed disciplines)
 * - Subtle GSAP entrance animation (fade + upward movement)
 */

import { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGSAP";

export default function CaseStudyIntro({ project }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const contribRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          contribRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [project.id]);

  return (
    <section
      ref={containerRef}
      aria-label={`${project.title} Introduction`}
      className="site-container case-study-intro-section"
      style={{
        paddingTop: "clamp(120px, 15vh, 180px)",
        paddingBottom: "clamp(56px, 8vw, 96px)",
      }}
    >
      <div className="case-study-intro-grid">
        {/* Project Title (h1) */}
        <div>
          <h1
            ref={titleRef}
            className="case-study-title"
            style={{
              margin: 0,
              fontFamily: "var(--font-family)",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              fontWeight: 600,
              color: "#000000",
              letterSpacing: "-0.03em",
              lineHeight: 0.96,
              willChange: "transform, opacity",
            }}
          >
            {project.title}
          </h1>
        </div>

        {/* Editorial Narrative & Contributions Column */}
        <div className="case-study-details-col">
          {/* Short Project Description */}
          <div ref={descRef} style={{ willChange: "transform, opacity" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-family)",
                fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                fontWeight: 450,
                color: "#000000",
                lineHeight: 1.38,
                letterSpacing: "-0.015em",
                maxWidth: "44ch",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* CONTRIBUTIONS Area */}
          <div
            ref={contribRef}
            style={{
              paddingTop: "clamp(28px, 4vw, 44px)",
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
              willChange: "transform, opacity",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-family)",
                fontSize: "0.74rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(0, 0, 0, 0.44)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              CONTRIBUTIONS
            </span>

            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {project.disciplines.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "0.96rem",
                    fontWeight: 500,
                    color: "#000000",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .case-study-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 6vw, 96px);
          align-items: start;
        }

        .case-study-details-col {
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 40px);
          padding-top: clamp(8px, 1.5vw, 20px);
        }

        @media (max-width: 900px) {
          .case-study-intro-grid {
            grid-template-columns: 1fr;
            gap: clamp(28px, 5vw, 48px);
          }
          .case-study-details-col {
            padding-top: 0;
          }
        }
      `}</style>
    </section>
  );
}

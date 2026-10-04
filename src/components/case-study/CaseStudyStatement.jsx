/**
 * CaseStudyStatement.jsx
 * Concise editorial project statement acting as a deliberate pause
 * between the hero visual and the 9-slide visual case-study sequence.
 *
 * Requirements:
 * - Generous negative space above and below
 * - Editorial typography in Funnel Display
 * - Restrained, authentic statement defining the project
 * - No strategic fluff, fake claims, or cards
 */

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

export default function CaseStudyStatement({ statement }) {
  const statementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, statementRef);

    return () => ctx.revert();
  }, [statement]);

  return (
    <section
      aria-label="Project Statement"
      className="site-container"
      style={{
        paddingBlock: "clamp(88px, 12vw, 156px)",
      }}
    >
      <div
        ref={statementRef}
        style={{
          maxWidth: "48ch",
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
            marginBottom: "16px",
          }}
        >
          PROJECT STATEMENT
        </span>

        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-family)",
            fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)",
            fontWeight: 450,
            color: "#000000",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
          }}
        >
          {statement}
        </p>
      </div>
    </section>
  );
}

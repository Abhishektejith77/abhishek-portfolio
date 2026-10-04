/**
 * CaseStudyProjectNavigation.jsx
 * Bottom project navigation allowing movement between projects and back to work.
 *
 * Requirements for Bombel:
 * - Previous: No previous project -> restrained "← Back To Selected Projects" (routes to /#work)
 * - Next: "NEXT PROJECT" / "Ipso →" (routes to /work/ipso)
 * - Restrained typography-led layout (Funnel Display)
 * - Simple directional arrows
 * - No cards, no pills, no shadows, no large buttons
 * - Generous spacing
 * - Hover transition on next project title to #C03B1D
 */

import { useState } from "react";
import { useRouter } from "@/context/RouterContext";
import { useCursor } from "@/context/CursorContext";

export default function CaseStudyProjectNavigation({
  prev = null,
  next = { slug: "ipso", title: "Ipso", path: "/work/ipso" },
}) {
  const { navigate } = useRouter();
  const { setCursor } = useCursor();
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  const handleBackToWork = (e) => {
    e.preventDefault();
    navigate("/#work");
  };

  const handleNextProject = (e) => {
    e.preventDefault();
    if (next?.path) {
      navigate(next.path);
    }
  };

  return (
    <section
      aria-label="Project Navigation"
      className="site-container"
      style={{
        paddingBlock: "clamp(96px, 12vw, 160px)",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="case-study-nav-grid">
        {/* Previous / Return Column */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {prev ? (
            <a
              href={prev.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(prev.path);
              }}
              className="link-bare"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "8px",
                textDecoration: "none",
              }}
              onMouseEnter={() => {
                setIsPrevHovered(true);
                setCursor("hover");
              }}
              onMouseLeave={() => {
                setIsPrevHovered(false);
                setCursor("default");
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(0, 0, 0, 0.44)",
                  textTransform: "uppercase",
                }}
              >
                PREVIOUS PROJECT
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 600,
                  color: isPrevHovered ? "#C03B1D" : "#000000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: "10px",
                  transition: "color 0.22s ease",
                }}
              >
                <span style={{ fontSize: "0.85em", lineHeight: 1 }}>&larr;</span>
                <span>{prev.title}</span>
              </span>
            </a>
          ) : (
            /* For Bombel: Clean restrained return to Selected Projects */
            <a
              href="/#work"
              onClick={handleBackToWork}
              className="link-bare"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 0",
                fontFamily: "var(--font-family)",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                fontWeight: 500,
                color: isBackHovered ? "#C03B1D" : "#000000",
                letterSpacing: "-0.01em",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={() => {
                setIsBackHovered(true);
                setCursor("hover");
              }}
              onMouseLeave={() => {
                setIsBackHovered(false);
                setCursor("default");
              }}
            >
              <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>&larr;</span>
              <span>Back To Selected Projects</span>
            </a>
          )}
        </div>

        {/* Next Project Column */}
        {next && (
          <div className="case-study-next-col">
            <a
              href={next.path}
              onClick={handleNextProject}
              className="link-bare"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
                textDecoration: "none",
              }}
              onMouseEnter={() => {
                setIsNextHovered(true);
                setCursor("hover");
              }}
              onMouseLeave={() => {
                setIsNextHovered(false);
                setCursor("default");
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(0, 0, 0, 0.44)",
                  textTransform: "uppercase",
                }}
              >
                NEXT PROJECT
              </span>

              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                  fontWeight: 600,
                  color: isNextHovered ? "#C03B1D" : "#000000",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: "12px",
                  transition: "color 0.22s ease",
                }}
              >
                <span>{next.title}</span>
                <span style={{ fontSize: "0.85em", lineHeight: 1 }}>&rarr;</span>
              </span>
            </a>
          </div>
        )}
      </div>

      <style>{`
        .case-study-nav-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .case-study-nav-grid {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 48px;
          }

          .case-study-next-col {
            width: 100%;
          }

          .case-study-next-col a {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * WorkContinuedPage.jsx
 * Curated secondary work collection page (/work/continued).
 *
 * Strict Design Requirements:
 * - Funnel Display typography only
 * - #F7FDFD background, #000000 text
 * - 8px spacing system
 * - Spacious editorial introduction:
 *     Heading: "Work, Continued." (~72px desktop, responsive with clamp)
 *     Supporting copy: "A few more projects across brand, campaign and digital."
 * - Restrained 2-column editorial grid (collapses to 1-column on mobile)
 * - Fifth project sits naturally in first column according to grid rhythm
 * - No cards, no rounded corners, no shadows, no card borders, no pills, no gradients
 * - Clean neutral image placeholders (aspectRatio: 16/10) with immediate support for project.image
 * - Prominent project name (28–36px) + discipline (14–16px)
 * - Subtle hover interaction: image scales 1 to 1.015, subtle "View On Behance →" reveal
 * - Data-driven Behance links (behanceUrl: null prepared for external link)
 * - Reuses existing portfolio footer
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";
import { continuedProjects } from "@/data/continuedProjects";
import Footer from "@/components/sections/Footer";

export default function WorkContinuedPage() {
  const introRef = useRef(null);
  const gridRef = useRef(null);

  // Set document title and reset scroll position on mount
  useEffect(() => {
    document.title = "Work, Continued. — Abhishek Tejith Kumar";
    window.scrollTo(0, 0);

    return () => {
      document.title = "Abhishek Tejith Kumar — Visual Designer";
    };
  }, []);

  // GSAP entrance motion
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro reveal
      if (introRef.current) {
        gsap.fromTo(
          introRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
          }
        );
      }

      // Grid items reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "expo.out",
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <article
      className="work-continued-page"
      style={{
        backgroundColor: "#F7FDFD",
        color: "#000000",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <div className="site-container" style={{ paddingBottom: "clamp(80px, 12vw, 140px)" }}>
        {/* ── 1. Spacious Editorial Introduction ── */}
        <header
          ref={introRef}
          style={{
            paddingTop: "clamp(120px, 15vw, 180px)",
            paddingBottom: "clamp(48px, 7vw, 80px)",
            borderBottom: "1px solid var(--color-divider)",
            marginBottom: "clamp(48px, 7vw, 80px)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(2.75rem, 5.8vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#000000",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Work, Continued.
          </h1>

          <p
            className="type-lead"
            style={{
              margin: 0,
              color: "rgba(0, 0, 0, 0.65)",
              maxWidth: "46ch",
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            A few more projects across brand, campaign and digital.
          </p>
        </header>

        {/* ── 2. Project Collection Editorial Grid ── */}
        <section aria-label="Continued Projects Collection">
          <div
            ref={gridRef}
            className="continued-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: "clamp(32px, 5vw, 64px)",
              rowGap: "clamp(56px, 8vw, 96px)",
            }}
          >
            {continuedProjects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>

      {/* ── 3. Portfolio Closing Footer ── */}
      <Footer />

      {/* Responsive Grid Collapse */}
      <style>{`
        @media (max-width: 820px) {
          .continued-projects-grid {
            grid-template-columns: 1fr !important;
            row-gap: clamp(40px, 6vw, 64px) !important;
          }
        }
      `}</style>
    </article>
  );
}

function ProjectItem({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor } = useCursor();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursor("hover");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursor("default");
  };

  const hasBehanceLink = Boolean(project.behanceUrl);

  const content = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: hasBehanceLink ? "pointer" : "default",
      }}
    >
      {/* ── Visual Frame / Placeholder ── */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          backgroundColor: "#EBF1F1",
          overflow: "hidden",
          position: "relative",
          borderRadius: "0px",
          border: "none",
          boxShadow: "none",
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: isHovered ? "scale(1.015)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "clamp(16px, 2.5vw, 24px)",
              transform: isHovered ? "scale(1.015)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              backgroundColor: isHovered ? "#E5EDED" : "#EBF1F1",
            }}
          >
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.22)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              {project.number}
            </span>
          </div>
        )}
      </div>

      {/* ── Project Typography Underneath Visual ── */}
      <div
        style={{
          marginTop: "clamp(16px, 2.2vw, 24px)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* Project Name (28–36px) */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(1.5rem, 2.3vw, 2.15rem)",
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.18,
              margin: 0,
              color: "#000000",
              transition: "opacity 0.2s ease",
              opacity: isHovered ? 1 : 0.92,
            }}
          >
            {project.title}
          </h2>

          {/* Subtle Hover Reveal: View On Behance → */}
          <span
            className="type-ui"
            style={{
              fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
              color: "#007AFD",
              fontWeight: 500,
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(-6px)",
              transition: "opacity 0.24s ease, transform 0.24s ease",
            }}
          >
            View On Behance &rarr;
          </span>
        </div>

        {/* Discipline (14–16px) */}
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
            fontWeight: 400,
            color: "rgba(0, 0, 0, 0.55)",
            lineHeight: 1.4,
          }}
        >
          {project.discipline}
        </span>
      </div>
    </div>
  );

  // If a Behance URL exists in the future, render as a clean external anchor
  if (hasBehanceLink) {
    return (
      <a
        href={project.behanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-bare"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
        aria-label={`${project.title} — ${project.discipline} on Behance`}
      >
        {content}
      </a>
    );
  }

  return content;
}

/**
 * Work.jsx
 *
 * STRICT REPLICATION OF SUPPLIED SELECTED PROJECTS REFERENCE:
 * - Section Heading: "Selected Projects" (Funnel Display, 72px desktop, font-weight 600, #000000)
 * - Row Structure:
 *     Column 1: Project title (Large: clamp(2.85rem, 4.2vw, 64px), Title Case) + Sparse metadata drawer
 *     Column 2: Jump To Project → (Strict rectangular CTA, black border, #F7FDFD bg, black text, no pill, no shadow)
 *     Column 3 (Far Right): Contextual visual preview on active (clamp(320px, 26vw, 400px) × clamp(220px, 16vw, 265px))
 *     Thin horizontal divider below each row
 * - Row Rhythm:
 *     Inactive: spacious editorial rhythm, minHeight clamp(88px, 9vw, 112px), title 0.60 opacity black
 *     Hover: title becomes #C03B1D, opacity 1
 *     Active: expands to ~280–320px vertical space, image reveals with clip-path & subtle scale (0.97 -> 1)
 *     When hover leaves section: activeId resets to null
 * - Interaction:
 *     Initial state: activeId = null (NO active project on load)
 *     Hovering a project title activates ONLY that project
 *     Only ONE project active at a time
 *     Mobile/tablet: scroll/visibility-based activation, only one active
 * - Click CTA / Image: Triggers Case Study modal
 */

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { projects } from "@/data/projects";
import { useCursor } from "@/context/CursorContext";
import { useRouter } from "@/context/RouterContext";
import CaseStudyModal from "@/components/work/CaseStudyModal";

export default function Work() {
  const { navigate } = useRouter();
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  // Requirement 4: Critical — NO project active on initial load (activeId = null)
  const [activeId, setActiveId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    navigate(`/work/${project.slug}`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Requirement 8: Mobile only — ScrollTrigger determines active project on touch/mobile
      const isTouchOrMobile = window.matchMedia("(hover: none), (max-width: 860px)").matches;
      if (isTouchOrMobile) {
        projects.forEach((p) => {
          const el = document.getElementById(`project-row-${p.id}`);
          if (!el) return;

          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setActiveId(p.id),
            onEnterBack: () => setActiveId(p.id),
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Requirement 4: When cursor leaves the entire Selected Projects section, reset activeId to null
  const handleSectionMouseLeave = () => {
    setActiveId(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        aria-label="Selected Projects"
        onMouseLeave={handleSectionMouseLeave}
        style={{
          paddingTop: "clamp(80px, 12vw, 160px)",
          paddingBottom: 0,
          borderTop: "1px solid var(--color-divider)",
          backgroundColor: "var(--color-white)",
          color: "var(--color-black)",
        }}
        className="site-container"
      >
        {/* ── Section Heading (Requirement 1: 72px desktop, 600 weight, black, Funnel Display) ── */}
        <div
          ref={headRef}
          style={{
            marginBottom: "clamp(56px, 7vw, 96px)",
            opacity: 0,
          }}
        >
          <h2
            className="type-heading"
            style={{
              margin: 0,
              fontSize: "clamp(2.75rem, 5.5vw, 72px)",
              fontWeight: 600,
              color: "#000000",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
            }}
          >
            Selected Projects
          </h2>
        </div>

        {/* ── Editorial Horizontal Project Rows (Requirement 4: resets activeId on leave) ── */}
        <div
          onMouseLeave={() => setActiveId(null)}
          style={{ borderTop: "1px solid var(--color-divider)" }}
        >
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isActive={activeId === project.id}
              onActivate={() => setActiveId(project.id)}
              onSelect={() => handleSelectProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Case study overlay if project selected */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

function ProjectRow({ project, index, isActive, onActivate, onSelect }) {
  const rowRef = useRef(null);
  const titleRef = useRef(null);
  const metaDrawerRef = useRef(null);
  const visualSlotRef = useRef(null);
  const visualInnerRef = useRef(null);
  const isFirstMount = useRef(true);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor } = useCursor();

  // Entrance animation for row on section scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  // Synchronized GSAP state transition for active/inactive state
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Requirement 4: Initial load — all rows are compact, quiet, no image, no metadata
      if (isActive) {
        gsap.set(rowRef.current, { paddingTop: 36, paddingBottom: 36 });
        gsap.set(titleRef.current, { opacity: 1 });
        gsap.set(metaDrawerRef.current, { height: "auto", opacity: 1, marginTop: 32 });
        gsap.set(visualSlotRef.current, { height: "auto", opacity: 1 });
        gsap.set(visualInnerRef.current, { scale: 1, opacity: 1, clipPath: "inset(0 0 0 0%)" });
      } else {
        gsap.set(rowRef.current, { paddingTop: 22, paddingBottom: 22 });
        gsap.set(titleRef.current, { opacity: 0.60 });
        gsap.set(metaDrawerRef.current, { height: 0, opacity: 0, marginTop: 0 });
        gsap.set(visualSlotRef.current, { height: 0, opacity: 0 });
        gsap.set(visualInnerRef.current, { scale: 0.97, opacity: 0, clipPath: "inset(0 0 0 100%)" });
      }
      return;
    }

    if (isActive) {
      // Requirement 3: Active row expands (~280–320px vertical space)
      gsap.to(rowRef.current, {
        paddingTop: 36,
        paddingBottom: 36,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(titleRef.current, {
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(metaDrawerRef.current, {
        height: "auto",
        opacity: 1,
        marginTop: 32,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(visualSlotRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      // Requirement 5: Image reveal (opacity + clip-path + scale 0.97 to 1 in 250–350ms)
      gsap.fromTo(
        visualInnerRef.current,
        { scale: 0.97, opacity: 0, clipPath: "inset(0 0 0 100%)" },
        {
          scale: 1,
          opacity: 1,
          clipPath: "inset(0 0 0 0%)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    } else {
      // Requirement 3: Inactive rows return to spacious editorial state (~88–112px min height)
      gsap.to(rowRef.current, {
        paddingTop: 22,
        paddingBottom: 22,
        duration: 0.26,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      gsap.to(titleRef.current, {
        opacity: 0.60,
        duration: 0.22,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      gsap.to(metaDrawerRef.current, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.24,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      gsap.to(visualSlotRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.24,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      gsap.to(visualInnerRef.current, {
        scale: 0.97,
        opacity: 0,
        clipPath: "inset(0 0 0 100%)",
        duration: 0.22,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onActivate();
    setCursor("project");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursor("default");
  };

  return (
    <div
      ref={rowRef}
      id={`project-row-${project.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onActivate}
      style={{
        borderBottom: "1px solid var(--color-divider)",
        minHeight: "clamp(88px, 9vw, 112px)",
        paddingTop: isActive ? "36px" : "22px",
        paddingBottom: isActive ? "36px" : "22px",
        transition: "background-color 0.2s ease",
        backgroundColor: isActive ? "rgba(0, 0, 0, 0.015)" : "transparent",
        paddingInline: "16px",
        marginInline: "-16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      className="project-ref-row"
    >
      {/* ── Desktop Composition (Requirements 2, 3, 5, 6, 7) ── */}
      <div className="project-desktop-grid">
        {/* Column 1: Title (Top) + Sparse Metadata Drawer (Lower-Left / Middle) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            ref={titleRef}
            className="type-project"
            style={{
              margin: 0,
              fontSize: "clamp(2.85rem, 4.2vw, 64px)",
              fontWeight: isActive ? 600 : 500,
              color: isHovered ? "#C03B1D" : "#000000",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              opacity: isHovered || isActive ? 1 : 0.60,
              transition: "color 0.22s ease, opacity 0.22s ease",
            }}
          >
            {project.title}
          </h3>

          {/* Requirement 6: Metadata Drawer (sits toward the lower portion of the active row) */}
          <div
            ref={metaDrawerRef}
            style={{
              overflow: "hidden",
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
              marginTop: isActive ? "32px" : 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1.6fr 0.8fr",
                gap: "24px",
                paddingTop: "20px",
                borderTop: "1px solid var(--color-divider-subtle)",
              }}
            >
              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  ROLE
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.92rem", fontWeight: 500, color: "var(--color-black)" }}>
                  {project.role}
                </span>
              </div>

              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  DISCIPLINE
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.92rem", fontWeight: 500, color: "var(--color-black)" }}>
                  {project.disciplines.join(" · ")}
                </span>
              </div>

              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  YEAR
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.92rem", fontWeight: 500, color: "var(--color-black)" }}>
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Exact Reference CTA Button (Requirement 7: Jump To Project →) */}
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: "12px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`btn-jump-project ${isActive ? "active" : "inactive"}`}
            aria-label={`Jump To Project: ${project.title}`}
          >
            <span>Jump To Project</span>
            <span style={{ fontSize: "1rem" }}>&rarr;</span>
          </button>
        </div>

        {/* Column 3: Dedicated Large Preview Image Slot (Requirement 5: Anchored Far Right) */}
        <div
          ref={visualSlotRef}
          style={{
            overflow: "hidden",
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
          }}
        >
          <div
            ref={visualInnerRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            style={{
              width: "100%",
              height: "clamp(220px, 16vw, 265px)",
              overflow: "hidden",
              border: "1px solid var(--color-divider)",
              backgroundColor: project.palette.bg,
              cursor: "pointer",
            }}
          >
            <ProjectVisual project={project} />
          </div>
        </div>
      </div>

      {/* ── Mobile Layout (Requirement 8: Screens <= 860px) ── */}
      <div className="project-mobile-stack">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 6vw, 2.75rem)",
              fontWeight: isActive ? 600 : 500,
              color: isHovered ? "#C03B1D" : "#000000",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              opacity: isActive ? 1 : 0.60,
              transition: "color 0.2s ease, opacity 0.22s ease",
            }}
          >
            {project.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`btn-jump-project ${isActive ? "active" : "inactive"}`}
            style={{ padding: "8px 16px", fontSize: "0.78rem" }}
          >
            <span>Jump To Project</span>
            <span style={{ fontSize: "0.9rem" }}>&rarr;</span>
          </button>
        </div>

        {/* Mobile Expanded Composition */}
        {isActive && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              style={{
                width: "100%",
                aspectRatio: "16/10.5",
                overflow: "hidden",
                border: "1px solid var(--color-divider)",
                backgroundColor: project.palette.bg,
              }}
            >
              <ProjectVisual project={project} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr 0.8fr",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid var(--color-divider-subtle)",
              }}
            >
              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  ROLE
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {project.role}
                </span>
              </div>
              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  DISCIPLINE
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {project.disciplines.join(" · ")}
                </span>
              </div>
              <div>
                <span className="type-meta" style={{ display: "block", color: "rgba(0, 0, 0, 0.48)", marginBottom: "4px" }}>
                  YEAR
                </span>
                <span style={{ fontFamily: "var(--font-family)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .project-desktop-grid {
          display: grid;
          grid-template-columns: 1fr auto clamp(320px, 26vw, 400px);
          align-items: start;
          gap: clamp(24px, 4vw, 56px);
        }
        .project-mobile-stack {
          display: none;
        }
        @media (max-width: 860px) {
          .project-desktop-grid {
            display: none !important;
          }
          .project-mobile-stack {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

function ProjectVisual({ project }) {
  const { id, palette } = project;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {id === "bombel"         && <BombelComp p={palette} />}
      {id === "ipso"           && <IpsoComp p={palette} />}
      {id === "vanzscape"      && <VanzComp p={palette} />}
      {id === "meru-schools"   && <MeruComp p={palette} />}
      {id === "world-of-katty" && <KattyComp p={palette} />}
    </svg>
  );
}

function BombelComp({ p }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      <rect x="240" y="60" width="320" height="380" rx="2" fill="none" stroke={p.fg} strokeWidth="0.75" opacity="0.35" />
      <circle cx="400" cy="230" r="85" fill="none" stroke={p.fg} strokeWidth="1" opacity="0.5" />
      <circle cx="400" cy="230" r="32" fill={p.accent} opacity="0.25" />
      <text x="400" y="236" fontFamily="var(--font-family)" fontSize="18" fontWeight="600" fill={p.fg} textAnchor="middle" letterSpacing="4">
        Bombel
      </text>
      <line x1="290" y1="340" x2="510" y2="340" stroke={p.fg} strokeWidth="0.75" opacity="0.25" />
      <text x="400" y="370" fontFamily="var(--font-family)" fontSize="11" fill={p.fg} opacity="0.5" textAnchor="middle" letterSpacing="2">
        PACKAGING SYSTEM &amp; ORDERING WORKFLOW
      </text>
    </>
  );
}

function IpsoComp({ p }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      {[1, 2, 3, 4].map((i) => (
        <line key={`v${i}`} x1={`${i * 160}`} y1="0" x2={`${i * 160}`} y2="500" stroke={p.accent} strokeWidth="0.5" opacity="0.2" />
      ))}
      {[1, 2].map((i) => (
        <line key={`h${i}`} x1="0" y1={`${i * 165}`} x2="800" y2={`${i * 165}`} stroke={p.accent} strokeWidth="0.5" opacity="0.2" />
      ))}
      <rect x="280" y="110" width="360" height="280" fill={p.accent} opacity="0.08" stroke={p.accent} strokeWidth="0.75" />
      <text x="320" y="230" fontFamily="var(--font-family)" fontSize="26" fontWeight="600" fill={p.fg} letterSpacing="3">
        Ipso
      </text>
      <text x="320" y="295" fontFamily="var(--font-family)" fontSize="11" fill={p.fg} opacity="0.5" letterSpacing="2">
        BRAND IDENTITY &amp; DIGITAL SYSTEMS
      </text>
    </>
  );
}

function VanzComp({ p }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" y1={80 + i * 85} x2="800" y2={80 + i * 85} stroke={p.fg} strokeWidth="0.5" opacity={0.12 + i * 0.02} />
      ))}
      <rect x="180" y="120" width="180" height="260" fill={p.fg} opacity="0.05" stroke={p.fg} strokeWidth="0.75" />
      <rect x="420" y="160" width="220" height="220" fill={p.fg} opacity="0.07" stroke={p.fg} strokeWidth="0.75" />
      <text x="180" y="420" fontFamily="var(--font-family)" fontSize="15" fontWeight="600" fill={p.fg} letterSpacing="3">
        Vanzscape
      </text>
    </>
  );
}

function MeruComp({ p }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={c * 80 + 80} cy={r * 75 + 100} r="1.5" fill={p.fg} opacity="0.2" />
        ))
      )}
      <rect x="180" y="100" width="440" height="300" rx="3" fill="none" stroke={p.fg} strokeWidth="0.75" opacity="0.25" />
      <rect x="180" y="100" width="440" height="38" fill={p.fg} opacity="0.06" />
      <rect x="220" y="170" width="160" height="190" rx="2" fill={p.fg} opacity="0.04" />
      <rect x="410" y="170" width="170" height="90" rx="2" fill={p.fg} opacity="0.04" />
      <rect x="410" y="275" width="170" height="85" rx="2" fill={p.accent} opacity="0.12" />
      <text x="220" y="440" fontFamily="var(--font-family)" fontSize="11" fill={p.fg} opacity="0.65" letterSpacing="2">
        Meru Schools
      </text>
    </>
  );
}

function KattyComp({ p }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      <radialGradient id="katty-ref-ambient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={p.fg} stopOpacity="0.2" />
        <stop offset="50%" stopColor={p.accent} stopOpacity="0.06" />
        <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
      </radialGradient>
      <ellipse cx="400" cy="250" rx="300" ry="200" fill="url(#katty-ref-ambient)" />
      {[60, 110, 160, 220].map((r, i) => (
        <circle key={r} cx="400" cy="250" r={r} fill="none" stroke={p.fg} strokeWidth="0.5" opacity={0.22 - i * 0.04} />
      ))}
      <circle cx="400" cy="250" r="14" fill={p.fg} opacity="0.3" />
      <text x="400" y="340" fontFamily="var(--font-family)" fontSize="14" fontWeight="600" fill={p.fg} textAnchor="middle" letterSpacing="4">
        World of Katty
      </text>
    </>
  );
}

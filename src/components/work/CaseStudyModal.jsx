/**
 * CaseStudyModal.jsx
 * Clean, minimal placeholder case study viewer for individual projects.
 * Handles /work/:id routing seamlessly with back navigation.
 */

import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";

export default function CaseStudyModal({ project, onClose }) {
  const modalRef = useRef(null);
  const { setCursor } = useCursor();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }
    );

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Case Study: ${project.title}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        backgroundColor: "var(--color-white)",
        color: "var(--color-black)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(247, 253, 253, 0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-divider)",
          padding: "16px var(--gutter)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={onClose}
          className="link-bare type-ui"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "1px solid var(--color-black)",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: 500,
          }}
          onMouseEnter={() => setCursor("hover")}
          onMouseLeave={() => setCursor("default")}
        >
          <span>&larr; Back to Selected Projects</span>
        </button>

        <span className="type-meta" style={{ color: "var(--color-black)" }}>
          {project.index} &middot; {project.title} ({project.year})
        </span>
      </div>

      {/* Case Study Content Placeholder */}
      <div
        style={{
          flex: 1,
          padding: "clamp(48px, 8vw, 96px) var(--gutter)",
          maxWidth: "1000px",
          marginInline: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        <div>
          <span className="type-meta" style={{ display: "block", marginBottom: "16px" }}>
            {project.disciplines.join(" &middot; ")}
          </span>
          <h1 className="type-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: 0, marginBottom: "24px" }}>
            {project.title}
          </h1>
          <p className="type-lead" style={{ maxWidth: "60ch", margin: 0 }}>
            {project.description}
          </p>
        </div>

        {/* Visual Hero Block */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: project.palette.bg,
            border: "1px solid var(--color-divider)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="type-meta" style={{ color: project.palette.fg, letterSpacing: "0.2em" }}>
            {project.title.toUpperCase()} &middot; ARCHIVE PREVIEW
          </span>
        </div>

        <div style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "32px" }}>
          <p className="type-body" style={{ margin: 0, maxWidth: "56ch" }}>
            Full case study documentation, interactive prototypes, and production assets for {project.title} are currently being assembled for the 2026 archive.
          </p>
        </div>
      </div>
    </div>
  );
}

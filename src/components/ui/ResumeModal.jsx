/**
 * ResumeModal.jsx
 *
 * Dedicated Minimal PDF Viewer for Abhishek Tehith Kumar's Resume:
 * - Opens cleanly over the portfolio upon clicking RESUME in navbar
 * - Does NOT download directly
 * - Does NOT navigate away
 * - Does NOT generate fake HTML resume content
 * - Displays the ACTUAL PDF file directly via clean embedded viewer
 * - Minimal palette: #F7FDFD, #000000, subtle backdrop
 * - Accessible, fixed close control ('Close ×')
 * - Closes and returns to the EXACT scroll position seamlessly
 * - Mobile responsive: scales to viewport with natural scrolling
 */

import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGSAP";
import { useResume } from "@/context/ResumeContext";
import { useCursor } from "@/context/CursorContext";

// Configurable path to the actual PDF file in public/
const RESUME_PDF_PATH = "/Abhishek-Tehith-Kumar-Resume.pdf";

export default function ResumeModal() {
  const { isOpen, closeResume } = useResume();
  const { setCursor } = useCursor();
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // Record exact current scroll position before opening viewer
    scrollPosRef.current = window.scrollY;
    const originalOverflow = document.body.style.overflow;

    // Prevent background page scrolling while viewer is open
    document.body.style.overflow = "hidden";

    // Handle ESC key to dismiss viewer
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeResume();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 16, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "expo.out" }
      );
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      // Guarantee returning to the EXACT scroll position
      window.scrollTo(0, scrollPosRef.current);
      ctx.revert();
    };
  }, [isOpen, closeResume]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Resume of Abhishek Tehith Kumar"
      onClick={closeResume}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 40px)",
      }}
    >
      {/* ── Centered PDF Viewer Container ── */}
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "960px",
          height: "min(92vh, 980px)",
          backgroundColor: "#F7FDFD",
          color: "#000000",
          border: "1px solid #000000",
          borderRadius: "0px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ── Viewer Header Bar with Accessible Close Control ── */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F7FDFD",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "-0.01em",
                color: "#000000",
              }}
            >
              ABHISHEK TEHITH KUMAR©
            </span>
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              RESUME
            </span>
          </div>

          {/* Minimal, Clear Close Control */}
          <button
            onClick={closeResume}
            aria-label="Close Resume Viewer"
            className="link-bare"
            style={{
              background: "none",
              border: "1px solid #000000",
              padding: "6px 14px",
              borderRadius: "0px",
              cursor: "pointer",
              fontFamily: "var(--font-family)",
              fontWeight: 500,
              fontSize: "0.82rem",
              letterSpacing: "0.04em",
              color: "#000000",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000000";
              e.currentTarget.style.color = "#F7FDFD";
              setCursor("hover");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#000000";
              setCursor("default");
            }}
          >
            <span>Close</span>
            <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>&times;</span>
          </button>
        </div>

        {/* ── Actual Embedded PDF Canvas (Untouched PDF Source) ── */}
        <div
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "#F7FDFD",
            position: "relative",
            overflow: "hidden",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <object
            data={RESUME_PDF_PATH}
            type="application/pdf"
            title="Resume of Abhishek Tehith Kumar"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          >
            <iframe
              src={RESUME_PDF_PATH}
              title="Resume of Abhishek Tehith Kumar"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />
          </object>
        </div>
      </div>
    </div>
  );
}

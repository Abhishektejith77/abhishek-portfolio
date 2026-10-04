/**
 * Footer.jsx
 * Minimal, quiet closing bar aligned to 8-Point Grid.
 * Identity: ABHISHEK TEJITH KUMAR
 */

import { useCursor } from "@/context/CursorContext";

export default function Footer() {
  const { setCursor } = useCursor();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      style={{
        paddingBlock: "clamp(24px, 4vw, 36px)",
        borderTop: "1px solid var(--color-divider)",
      }}
      className="site-container"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span className="type-ui" style={{ color: "var(--color-black)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            ABHISHEK TEJITH KUMAR © 2026
          </span>
        </div>

        <div>
          <button
            onClick={handleBackToTop}
            aria-label="Return to top of page"
            className="link-bare type-ui"
            style={{
              background: "none",
              border: "none",
              color: "var(--color-black)",
              cursor: "pointer",
              padding: "4px 0",
              borderBottom: "1px solid var(--color-black)",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}

/**
 * WorkContinuedEntry.jsx
 * Understated editorial entry point after Selected Projects on the Home page.
 *
 * Requirements:
 * - Simple editorial transition after Selected Projects
 * - Heading: "Work, Continued."
 * - Supporting copy: "A few more projects across brand, campaign and digital."
 * - Simple text link: "Explore More Work →" navigating to /work/continued
 * - Visually restrained (no thumbnails, no cards, no intrusive UI)
 * - 8px spacing system, Funnel Display typography
 */

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { useRouter } from "@/context/RouterContext";
import { useCursor } from "@/context/CursorContext";

export default function WorkContinuedEntry() {
  const { navigate } = useRouter();
  const { setCursor } = useCursor();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.children ?? [],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/work/continued");
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Secondary Work Transition"
      style={{
        paddingTop: "clamp(48px, 6vw, 64px)",
        paddingBottom: "clamp(64px, 9vw, 112px)",
        borderTop: "none",
        backgroundColor: "var(--color-white)",
        color: "var(--color-black)",
      }}
    >
      <div className="site-container">
        <div
          ref={containerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "clamp(24px, 4vw, 48px)",
          }}
        >
          {/* Editorial Heading + Supporting Copy */}
          <div style={{ maxWidth: "560px" }}>
            <h2
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: 0,
                marginBottom: "12px",
                color: "var(--color-black)",
              }}
            >
              Work, Continued.
            </h2>
            <p
              className="type-body"
              style={{
                margin: 0,
                color: "rgba(0, 0, 0, 0.65)",
                fontSize: "clamp(1rem, 1.35vw, 1.15rem)",
                lineHeight: 1.5,
              }}
            >
              A few more projects across brand, campaign and digital.
            </p>
          </div>

          {/* Simple Text Link */}
          <div>
            <a
              href="/work/continued"
              onClick={handleClick}
              className="link-bare"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-family)",
                fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                fontWeight: 500,
                color: "#000000",
                paddingBottom: "4px",
                borderBottom: "1px solid #000000",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={() => setCursor("hover")}
              onMouseLeave={() => setCursor("default")}
            >
              Explore More Work &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

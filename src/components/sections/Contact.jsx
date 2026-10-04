/**
 * Contact.jsx
 *
 * Requirements:
 * - Headline:
 *     HAVE A GOOD PROBLEM?
 *     LET''S MAKE SOMETHING OUT OF IT.
 * - Channels: EMAIL, INSTAGRAM, BEHANCE, PHONE
 * - Real contact details provided:
 *     Email: tejith26601@gmail.com
 *     Instagram display: Abhishek Tejith Kumar (ready for profile URL)
 *     Phone: 6305164703 (tel:+916305164703)
 *     Behance: Abhishek Tejith Kumar (ready for profile URL)
 * - 8-Point Grid alignment (8, 16, 24, 32, 48, 64, 80, 128px).
 * - Subtle GSAP entrance + link hover feedback (no giant buttons).
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";

const CONTACT_DETAILS = {
  email: "tejith26601@gmail.com",
  instagramName: "abhishek_tejith_kumar",
  instagramUrl: "https://instagram.com/abhishek_tejith_kumar",
  behanceName: "Abhishek Tejith Kumar Pilli",
  behanceUrl: "https://behance.net",
  phone: "+91 630 5160 470",
  phoneTel: "+916305160470",
};

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { setCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      id="contact"
      aria-label="Contact Abhishek"
      style={{
        paddingBlock: "clamp(80px, 14vw, 160px)",
        borderTop: "1px solid var(--color-divider)",
      }}
      className="site-container"
    >
      <div
        ref={contentRef}
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "clamp(48px, 8vw, 112px)",
          alignItems: "start",
        }}
        className="contact-editorial-grid"
      >
        {/* ── LEFT / PRIMARY AREA: Dominant Statement + Whitespace ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className="type-meta"
            style={{
              color: "var(--color-black)",
              opacity: 0.5,
              display: "block",
              marginBottom: "clamp(24px, 4vw, 36px)",
              fontWeight: 500,
            }}
          >
            05 &middot; Contact
          </span>

          <h2
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--color-black)",
              margin: 0,
              marginBottom: "28px",
              maxWidth: "14ch",
            }}
          >
            Have A Problem Worth Solving?
          </h2>

          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "var(--color-black)",
              opacity: 0.85,
              margin: 0,
              maxWidth: "34ch",
            }}
          >
            I'm Open To Thoughtful Design Work, Interesting Products And Teams That Care About Doing Things Well.
          </p>
        </div>

        {/* ── RIGHT / SECONDARY AREA: Clean Editorial Contact Index ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid var(--color-divider)",
            width: "100%",
            marginTop: "clamp(0px, 3vw, 44px)",
          }}
        >
          {/* 1. EMAIL */}
          <a
            href={`mailto:${CONTACT_DETAILS.email}`}
            className="link-bare contact-editorial-item"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBlock: "24px",
              borderBottom: "1px solid var(--color-divider)",
            }}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              EMAIL
            </span>
            <span
              className="contact-link-val"
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                color: "#007AFD",
                transition: "opacity 0.2s ease",
              }}
            >
              {CONTACT_DETAILS.email}
            </span>
          </a>

          {/* 2. INSTAGRAM */}
          <a
            href={CONTACT_DETAILS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-bare contact-editorial-item"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBlock: "24px",
              borderBottom: "1px solid var(--color-divider)",
            }}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              INSTAGRAM
            </span>
            <span
              className="contact-link-val"
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                color: "#007AFD",
                transition: "opacity 0.2s ease",
              }}
            >
              {CONTACT_DETAILS.instagramName}
            </span>
          </a>

          {/* 3. BEHANCE */}
          <a
            href={CONTACT_DETAILS.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-bare contact-editorial-item"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBlock: "24px",
              borderBottom: "1px solid var(--color-divider)",
            }}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              BEHANCE
            </span>
            <span
              className="contact-link-val"
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                color: "#007AFD",
                transition: "opacity 0.2s ease",
              }}
            >
              {CONTACT_DETAILS.behanceName}
            </span>
          </a>

          {/* 4. PHONE */}
          <a
            href={`tel:${CONTACT_DETAILS.phoneTel}`}
            className="link-bare contact-editorial-item"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBlock: "24px",
              borderBottom: "1px solid var(--color-divider)",
            }}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            <span
              className="type-meta"
              style={{
                color: "rgba(0, 0, 0, 0.45)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
              }}
            >
              PHONE
            </span>
            <span
              className="contact-link-val"
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontSize: "clamp(1.05rem, 1.5vw, 1.28rem)",
                color: "#007AFD",
                transition: "opacity 0.2s ease",
              }}
            >
              {CONTACT_DETAILS.phone}
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .contact-editorial-item:hover .contact-link-val {
          text-decoration: underline;
          opacity: 0.85;
        }
        @media (max-width: 900px) {
          .contact-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

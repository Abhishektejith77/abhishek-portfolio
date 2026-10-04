/**
 * Process.jsx
 *
 * Strict Requirements (Section 22):
 * - Dark section (#000000 background, #F7FDFD text)
 * - Exact editorial structure from Reference Set 02:
 *     NUMBER → LARGE TITLE → SHORT EXPLANATION (Right-side)
 * - Separated by clean horizontal divider lines
 * - Conversational thoughts:
 *     01 I look at the problem first.
 *     02 I try to find the clearest idea.
 *     03 Then I build the visual system around it.
 *     04 I see how it behaves.
 *     05 Then I remove whatever doesn''t need to be there.
 * - No cards. No icons. No timeline. No generic UX diagram.
 */

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";

const WORKING_STEPS = [
  {
    num: "01",
    title: "Find What Matters.",
    desc: "Before I design anything, I try to understand what is actually getting in the way, for the business and for the person using it.",
  },
  {
    num: "02",
    title: "Make The Idea Clear.",
    desc: "Good ideas don't need much explaining. I reduce the noise until there is something simple enough to understand and strong enough to build around.",
  },
  {
    num: "03",
    title: "Build The System.",
    desc: "A good idea has to survive beyond one screen. I build the visual language, structure and details that make it consistent.",
  },
  {
    num: "04",
    title: "Make It Work.",
    desc: "Then I look at the thing as a real person would. What makes sense? What gets in the way? What can be removed?",
  },
  {
    num: "05",
    title: "Keep What Earns Its Place.",
    desc: "The final pass is usually subtraction. If something doesn't help the idea, the experience or the person using it, it doesn't need to stay.",
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const listRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        listRef.current?.children ?? [],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
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
      id="process"
      aria-label="Working Method"
      style={{
        backgroundColor: "#000000",
        color: "#F7FDFD",
        paddingBlock: "clamp(64px, 12vw, 128px)",
      }}
    >
      <div className="site-container">
        {/* ── Section Header ── */}
        <div
          ref={headRef}
          style={{
            marginBottom: "clamp(48px, 8vw, 80px)",
            opacity: 0,
            maxWidth: "760px",
          }}
        >
          <span
            className="type-meta"
            style={{
              color: "rgba(247, 253, 253, 0.6)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            03 &middot; Working Method
          </span>

          <h2
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#F7FDFD",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Start With The Problem.
            <br className="process-heading-break" />
            Not The Design.
          </h2>

          <p
            className="type-body"
            style={{
              color: "rgba(247, 253, 253, 0.75)",
              margin: 0,
              fontWeight: 400,
              maxWidth: "46ch",
            }}
          >
            The work gets better when the problem is clear. Everything after that has a reason to exist.
          </p>
        </div>

        {/* ── 3-Column Editorial Rows with Horizontal Rules (Section 22) ── */}
        <div
          ref={listRef}
          style={{
            borderTop: "1px solid rgba(247, 253, 253, 0.16)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {WORKING_STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={step.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  borderBottom: "1px solid rgba(247, 253, 253, 0.16)",
                  paddingBlock: "clamp(24px, 4vw, 40px)",
                  display: "grid",
                  gridTemplateColumns: "clamp(40px, 6vw, 64px) 1.25fr 1.75fr",
                  gap: "clamp(24px, 4vw, 48px)",
                  alignItems: "baseline",
                  transition: "background-color 0.2s ease",
                  backgroundColor: isHovered ? "rgba(247, 253, 253, 0.04)" : "transparent",
                  paddingInline: "16px",
                  marginInline: "-16px",
                }}
                className="method-3col-row"
              >
                {/* 1. NUMBER */}
                <span
                  className="type-meta"
                  style={{
                    color: isHovered ? "#F7FDFD" : "rgba(247, 253, 253, 0.45)",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.num}
                </span>

                {/* 2. LARGE TITLE */}
                <h3
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "clamp(1.15rem, 1.9vw, 1.55rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    margin: 0,
                    lineHeight: 1.25,
                    color: isHovered ? "#F7FDFD" : "rgba(247, 253, 253, 0.85)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.title}
                </h3>

                {/* 3. SHORT EXPLANATION */}
                <p
                  className="type-body"
                  style={{
                    color: isHovered ? "#F7FDFD" : "rgba(247, 253, 253, 0.65)",
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    transition: "color 0.2s ease",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-heading-break {
            display: none;
          }
          .method-3col-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}

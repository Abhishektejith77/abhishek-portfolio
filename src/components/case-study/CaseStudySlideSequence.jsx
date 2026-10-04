/**
 * CaseStudySlideSequence.jsx
 * Vertical presentation sequence containing exactly 9 deck-style visual slides.
 *
 * Requirements:
 * - Exactly 9 slides
 * - Full browser width
 * - Subtle gap between slides:
 *     - Desktop: ~16–24px (20px)
 *     - Mobile: ~8–12px (10px)
 * - Continuous visual story unfolding vertically
 * - No cards, no borders, no rounded corners, no shadows
 */

import CaseStudySlide from "./CaseStudySlide";

export default function CaseStudySlideSequence({ slides = [] }) {
  // Ensure exactly 9 slides exist
  const sequenceSlides = Array.from({ length: 9 }, (_, index) => {
    return slides[index] || {
      id: `slide-0${index + 1}`,
      src: null,
      alt: `Project presentation slide ${index + 1}`,
    };
  });

  return (
    <section
      aria-label="Case Study Presentation Sequence"
      className="case-study-slide-sequence"
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBlock: "clamp(32px, 5vw, 64px)",
      }}
    >
      {sequenceSlides.map((slide, i) => (
        <CaseStudySlide
          key={slide.id || i}
          src={slide.src}
          alt={slide.alt || `Presentation slide ${i + 1}`}
          slideNumber={i + 1}
          fit={slide.fit || "contain"}
          aspectRatio={slide.aspectRatio || "16/9"}
          bg={slide.bg || "#0E1012"}
        />
      ))}

      <style>{`
        @media (max-width: 768px) {
          .case-study-slide-sequence {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * CaseStudyPage.jsx
 * Internal Case Study Page View.
 *
 * Sequence of Experience:
 *   1. CaseStudyIntro (Title, description, CONTRIBUTIONS list)
 *   2. CaseStudyHero (16:9 responsive dominant hero canvas)
 *   3. CaseStudyStatement (Concise defining project statement)
 *   4. CaseStudySlideSequence (Exactly 9 presentation canvases)
 *   5. CaseStudyProjectNavigation (Back To Selected Projects & Next Project: Ipso)
 *   6. CaseStudyFooter (Locked portfolio footer)
 *
 * Visual Language:
 *   - Background: #F7FDFD
 *   - Primary Text: #000000
 *   - Hover Accent: #C03B1D
 *   - Funnel Display typography
 *   - 8px spacing rhythm
 *   - Editorial, restrained, quiet, image & typography-led
 */

import { useEffect } from "react";
import CaseStudyIntro from "./CaseStudyIntro";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyStatement from "./CaseStudyStatement";
import CaseStudySlideSequence from "./CaseStudySlideSequence";
import CaseStudyProjectNavigation from "./CaseStudyProjectNavigation";
import CaseStudyFooter from "./CaseStudyFooter";

export default function CaseStudyPage({ project }) {
  // Ensure title updates and scroll resets cleanly to top on entry
  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} — Abhishek Tehith Kumar`;
    }
    window.scrollTo(0, 0);

    return () => {
      document.title = "Abhishek Tehith Kumar — Visual Designer";
    };
  }, [project]);

  if (!project) return null;

  return (
    <article
      className="case-study-page"
      style={{
        backgroundColor: "#F7FDFD",
        color: "#000000",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* 01. Case Study Editorial Intro */}
      <CaseStudyIntro project={project} />

      {/* 02. Dominant Hero Visual Thumbnail */}
      <CaseStudyHero
        image={project.heroImage}
        alt={project.heroAlt || `${project.title} Hero`}
        aspectRatio="16/9"
      />

      {/* 03. Project Statement (Deliberate Editorial Pause) */}
      <CaseStudyStatement statement={project.statement} />

      {/* 04. Exactly 9 Visual Presentation Slides */}
      <CaseStudySlideSequence slides={project.slides} />

      {/* 05. Bottom Project Navigation */}
      <CaseStudyProjectNavigation
        prev={project.navigation?.prev}
        next={project.navigation?.next}
      />

      {/* 06. Portfolio Closing Footer */}
      <CaseStudyFooter />
    </article>
  );
}

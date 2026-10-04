/**
 * CaseStudyHeader.jsx
 * Reusable header wrapper for internal case-study pages.
 * Ensures the existing portfolio navbar component remains stable and active.
 */

import Nav from "@/components/navigation/Nav";

export default function CaseStudyHeader() {
  // Uses the existing locked portfolio navbar
  return <Nav />;
}

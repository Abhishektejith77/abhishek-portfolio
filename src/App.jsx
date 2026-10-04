/**
 * App.jsx
 * Personal Digital Portfolio of ABHISHEK TEHITH KUMAR
 *
 * Routing & Application Structure:
 *   - Route "/" -> Home Page (Hero, Positioning, Work, Process, About, Contact, Footer)
 *   - Route "/work/bombel" -> Bombel Internal Case Study Page
 *
 * Providers:
 *   - RouterProvider (Lightweight pushState & anchor navigation)
 *   - ResumeProvider (Overlay resume viewer without altering scroll position)
 *   - CursorProvider (Minimal precision dot)
 */

import { useEffect } from "react";
import { RouterProvider, useRouter } from "@/context/RouterContext";
import { ResumeProvider } from "@/context/ResumeContext";
import { CursorProvider } from "@/context/CursorContext";
import RootLayout from "@/components/layout/RootLayout";

// Home Page Sections
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Internal Case Study System
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import { caseStudies } from "@/data/caseStudies";

function AppContent() {
  const { path } = useRouter();

  // Anchor scroll synchronisation when landing on Home from a subpage
  useEffect(() => {
    if (path === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [path]);

  // Dynamic Routes: /work/bombel, /work/ipso, /work/vanzscape, /work/meru-schools, /work/world-of-katty
  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "").trim();
    const project = caseStudies[slug];
    if (project) {
      return <CaseStudyPage project={project} />;
    }
  }

  // Default Route: Home Page
  return (
    <>
      <Hero />
      <Positioning />
      <Work />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <ResumeProvider>
        <CursorProvider>
          <RootLayout>
            <AppContent />
          </RootLayout>
        </CursorProvider>
      </ResumeProvider>
    </RouterProvider>
  );
}

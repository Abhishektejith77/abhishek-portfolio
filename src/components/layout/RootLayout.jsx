/**
 * RootLayout.jsx
 * Application layout shell.
 * Includes:
 *   - Lenis smooth scroll
 *   - GrainOverlay (subtle paper noise)
 *   - CustomCursor (lightweight dot, disabled on touch)
 *   - Nav (single clean header)
 *   - ResumeModal (overlay viewer)
 */

import { useLenis } from "@/hooks/useLenis";
import Nav from "@/components/navigation/Nav";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/cursor/CustomCursor";
import ResumeModal from "@/components/ui/ResumeModal";

export default function RootLayout({ children }) {
  useLenis();

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Nav />
      <main id="main-content" role="main" tabIndex={-1}>
        {children}
      </main>
      <ResumeModal />
    </>
  );
}

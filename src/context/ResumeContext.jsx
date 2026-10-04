/**
 * ResumeContext.jsx
 * Controls the visibility of the overlay resume viewer without altering page scroll.
 */

import { createContext, useContext, useState } from "react";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = () => setIsOpen(true);
  const closeResume = () => setIsOpen(false);

  return (
    <ResumeContext.Provider value={{ isOpen, openResume, closeResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}

/**
 * CursorContext.jsx
 * Provides cursor state to the entire component tree.
 * Components call setCursor() to change the cursor visual.
 *
 * States:
 *   "default"     — small dot + ring
 *   "hover"       — ring expands slightly
 *   "project"     — large ring + "View" label
 *   "hide"        — cursor hidden (e.g. over inputs)
 */

import { createContext, useContext, useState, useCallback } from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [cursorState, setCursorStateInner] = useState("default");
  const [cursorLabel, setCursorLabel]      = useState("");

  const setCursor = useCallback((state, label = "") => {
    setCursorStateInner(state);
    setCursorLabel(label);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorState, cursorLabel, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used inside CursorProvider");
  return ctx;
}

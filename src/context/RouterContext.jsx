/**
 * RouterContext.jsx
 * Lightweight, zero-dependency client-side router for the portfolio.
 * Supports:
 *   - PushState navigation without full page reloads
 *   - Browser back / forward buttons (popstate)
 *   - Cross-page anchor navigation (e.g. /work/bombel -> /#work)
 *   - Automatic scroll-to-top on route changes
 *   - Lenis smooth scroll synchronization
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const RouterContext = createContext({
  path: "/",
  hash: "",
  navigate: () => {},
});

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || "/");
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "");

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
      setCurrentHash(window.location.hash || "");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Programmatic navigation
  const navigate = useCallback((to, { replace = false } = {}) => {
    // Parse target url
    const targetUrl = new URL(to, window.location.origin);
    const targetPath = targetUrl.pathname || "/";
    const targetHash = targetUrl.hash || "";

    if (replace) {
      window.history.replaceState(null, "", to);
    } else {
      window.history.pushState(null, "", to);
    }

    setCurrentPath(targetPath);
    setCurrentHash(targetHash);

    if (targetHash) {
      // Allow DOM to settle before smooth-scrolling to anchor target
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
    } else {
      // Page transition: scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <RouterContext.Provider
      value={{
        path: currentPath,
        hash: currentHash,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

/**
 * Nav.jsx
 *
 * Strict Requirements (Section-Aware Dynamic Navbar + Mobile Responsiveness):
 * - Fixed position at top of viewport
 * - Desktop:
 *     - Left: ABHISHEK TEJITH KUMAR©
 *     - Right: WORK · ABOUT · RESUME · CONTACT
 * - Mobile (<= 768px):
 *     - Left: ABHISHEK TEJITH KUMAR©
 *     - Right: Minimal 2-line hamburger button (44px tap target)
 *     - Full-screen mobile navigation overlay (#F7FDFD background, #000000 text)
 *     - Editorial typography in Funnel Display (500–600 weight)
 *     - Staggered GSAP entrance and smooth exit
 *     - Body scroll lock without jumping
 *     - Clean dismissal on close icon, backdrop, or link tap
 *     - Resume link triggers the embedded PDF Resume viewer
 * - 3-State GSAP ScrollTrigger theme switching (Hero, Light, Dark)
 * - Zero layout jump, zero jitter, zero flicker
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGSAP";
import { useCursor } from "@/context/CursorContext";
import { useResume } from "@/context/ResumeContext";
import { useRouter } from "@/context/RouterContext";

const THEMES = {
  hero: {
    bg: "rgba(247, 253, 253, 0)",
    border: "rgba(0, 0, 0, 0)",
    wordmark: "#F7FDFD",
    link: "rgba(247, 253, 253, 0.75)",
    linkActive: "#F7FDFD",
    btnBg: "transparent",
    btnColor: "#F7FDFD",
    btnBorder: "rgba(247, 253, 253, 0.8)",
  },
  light: {
    bg: "#F7FDFD",
    border: "rgba(0, 0, 0, 0.08)",
    wordmark: "#000000",
    link: "rgba(0, 0, 0, 0.65)",
    linkActive: "#000000",
    btnBg: "#000000",
    btnColor: "#F7FDFD",
    btnBorder: "#000000",
  },
  dark: {
    bg: "#000000",
    border: "rgba(247, 253, 253, 0.12)",
    wordmark: "#F7FDFD",
    link: "rgba(247, 253, 253, 0.70)",
    linkActive: "#F7FDFD",
    btnBg: "#F7FDFD",
    btnColor: "#000000",
    btnBorder: "#F7FDFD",
  },
};

export default function Nav() {
  const navRef = useRef(null);
  const wordmarkRef = useRef(null);
  const workLinkRef = useRef(null);
  const aboutLinkRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const contactBtnRef = useRef(null);
  const hamburgerBtnRef = useRef(null);

  const overlayRef = useRef(null);
  const menuListRef = useRef(null);
  const scrollLockPosRef = useRef(0);

  const { path, navigate } = useRouter();
  const isCaseStudy = path.startsWith("/work/");

  const [theme, setTheme] = useState(() => (isCaseStudy ? "light" : "hero"));
  const currentThemeRef = useRef(isCaseStudy ? "light" : "hero");
  const [activeItem, setActiveItem] = useState("");
  const activeItemRef = useRef("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobileMenuOpenRef = useRef(false);

  const { setCursor } = useCursor();
  const { openResume } = useResume();

  // Helper to determine the section currently beneath the fixed navbar
  const resolveTheme = () => {
    if (isCaseStudy) return "light";

    const navMid = 32;
    const introEl = document.getElementById("intro");
    const processEl = document.getElementById("process");

    if (introEl) {
      const introRect = introEl.getBoundingClientRect();
      if (introRect.bottom > navMid) {
        return "hero";
      }
    }

    if (processEl) {
      const procRect = processEl.getBoundingClientRect();
      if (procRect.top <= navMid && procRect.bottom > navMid) {
        return "dark";
      }
    }

    return "light";
  };

  const applyTheme = (targetTheme, duration = 0.35) => {
    currentThemeRef.current = targetTheme;
    setTheme(targetTheme);

    const t = THEMES[targetTheme];
    if (!t || !navRef.current) return;

    // If mobile menu is open, keep navbar items black on the #F7FDFD overlay
    if (isMobileMenuOpenRef.current) return;

    gsap.to(navRef.current, {
      backgroundColor: t.bg,
      borderBottomColor: t.border,
      duration,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (wordmarkRef.current) {
      gsap.to(wordmarkRef.current, {
        color: t.wordmark,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (hamburgerBtnRef.current) {
      gsap.to(hamburgerBtnRef.current, {
        color: t.wordmark,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (workLinkRef.current) {
      gsap.to(workLinkRef.current, {
        color: activeItemRef.current === "work" ? t.linkActive : t.link,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (aboutLinkRef.current) {
      gsap.to(aboutLinkRef.current, {
        color: activeItemRef.current === "about" ? t.linkActive : t.link,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (resumeBtnRef.current) {
      gsap.to(resumeBtnRef.current, {
        color: t.link,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (contactBtnRef.current) {
      gsap.to(contactBtnRef.current, {
        backgroundColor: t.btnBg,
        color: t.btnColor,
        borderColor: t.btnBorder,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  // Keep activeItemRef in sync and refresh link highlight
  useEffect(() => {
    activeItemRef.current = activeItem;
    const t = THEMES[currentThemeRef.current];
    if (!t) return;

    if (workLinkRef.current) {
      gsap.to(workLinkRef.current, {
        color: activeItem === "work" ? t.linkActive : t.link,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (aboutLinkRef.current) {
      gsap.to(aboutLinkRef.current, {
        color: activeItem === "about" ? t.linkActive : t.link,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [activeItem]);

  // GSAP ScrollTrigger dynamic theme observation
  useEffect(() => {
    if (isCaseStudy) {
      applyTheme("light", 0);
      return;
    }

    let ctx;
    let rafId;

    const initTriggers = () => {
      const introEl = document.getElementById("intro");
      const processEl = document.getElementById("process");

      if (!introEl || !processEl) {
        rafId = requestAnimationFrame(initTriggers);
        return;
      }

      ctx = gsap.context(() => {
        const syncTheme = (duration = 0.35) => {
          const target = resolveTheme();
          if (target !== currentThemeRef.current) {
            applyTheme(target, duration);
          }
        };

        // Set initial state immediately with duration 0
        syncTheme(0);

        // 1. Boundary trigger for Hero
        ScrollTrigger.create({
          trigger: introEl,
          start: "top top",
          end: "bottom 32px",
          onEnter: () => syncTheme(0.35),
          onEnterBack: () => syncTheme(0.35),
          onLeave: () => syncTheme(0.35),
          onLeaveBack: () => syncTheme(0.35),
        });

        // 2. Boundary trigger for Process
        ScrollTrigger.create({
          trigger: processEl,
          start: "top 32px",
          end: "bottom 32px",
          onEnter: () => syncTheme(0.35),
          onEnterBack: () => syncTheme(0.35),
          onLeave: () => syncTheme(0.35),
          onLeaveBack: () => syncTheme(0.35),
        });

        // 3. Fallback continuous sync on scroll to handle rapid jumps and anchor clicks
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: () => syncTheme(0.35),
        });

        // 4. Active nav section tracker (WORK, ABOUT)
        const trackedSections = ["work", "about"];
        trackedSections.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveItem(id),
            onEnterBack: () => setActiveItem(id),
            onLeave: (self) => {
              if (self.direction === 1) setActiveItem("");
            },
            onLeaveBack: (self) => {
              if (self.direction === -1) setActiveItem("");
            },
          });
        });
      }, navRef);
    };

    rafId = requestAnimationFrame(initTriggers);

    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, []);

  // Sync ref with state
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  // Mobile Menu open / close animation & scroll lock
  const openMobileMenu = () => {
    scrollLockPosRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    setIsMobileMenuOpen(true);

    // Navbar becomes transparent with black icons over the light overlay
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        borderBottomColor: "rgba(0, 0, 0, 0.08)",
        duration: 0.25,
        overwrite: "auto",
      });
    }
    if (wordmarkRef.current) {
      gsap.to(wordmarkRef.current, { color: "#000000", duration: 0.25, overwrite: "auto" });
    }
    if (hamburgerBtnRef.current) {
      gsap.to(hamburgerBtnRef.current, { color: "#000000", duration: 0.25, overwrite: "auto" });
    }

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, visibility: "visible" },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
    if (menuListRef.current) {
      gsap.fromTo(
        menuListRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }
  };

  const closeMobileMenu = (onClosed) => {
    if (!overlayRef.current) {
      document.body.style.overflow = "";
      setIsMobileMenuOpen(false);
      applyTheme(currentThemeRef.current, 0.25);
      if (onClosed) onClosed();
      return;
    }

    const items = menuListRef.current ? menuListRef.current.children : [];
    gsap.to(items, {
      opacity: 0,
      y: -12,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.out",
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.visibility = "hidden";
        }
        document.body.style.overflow = "";
        setIsMobileMenuOpen(false);
        applyTheme(currentThemeRef.current, 0.3);
        if (onClosed) onClosed();
      },
    });
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // Keyboard escape key dismissal
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Navigation action handlers
  const handleWordmarkClick = (e) => {
    e.preventDefault();
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleWorkClick = (e) => {
    e.preventDefault();
    if (path === "/") {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#work");
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (path === "/") {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#about");
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (path === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  // Mobile Navigation link handler
  const handleMobileNavClick = (targetId) => {
    closeMobileMenu(() => {
      if (targetId === "resume") {
        openResume();
      } else if (path === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${targetId}`);
      }
    });
  };

  // Hover handlers for desktop interactive elements
  const handleContactEnter = () => {
    setCursor("hover");
    const th = currentThemeRef.current;
    if (th === "hero") {
      gsap.to(contactBtnRef.current, {
        backgroundColor: "#F7FDFD",
        color: "#000000",
        borderColor: "#F7FDFD",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else if (th === "light") {
      gsap.to(contactBtnRef.current, {
        backgroundColor: "transparent",
        color: "#000000",
        borderColor: "#000000",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else if (th === "dark") {
      gsap.to(contactBtnRef.current, {
        backgroundColor: "transparent",
        color: "#F7FDFD",
        borderColor: "#F7FDFD",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleContactLeave = () => {
    setCursor("default");
    const t = THEMES[currentThemeRef.current];
    if (!t || !contactBtnRef.current) return;
    gsap.to(contactBtnRef.current, {
      backgroundColor: t.btnBg,
      color: t.btnColor,
      borderColor: t.btnBorder,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLinkEnter = (el) => {
    setCursor("hover");
    const t = THEMES[currentThemeRef.current];
    if (!t || !el) return;
    gsap.to(el, { color: t.linkActive, duration: 0.18, ease: "power2.out", overwrite: "auto" });
  };

  const handleLinkLeave = (el, isActive) => {
    setCursor("default");
    const t = THEMES[currentThemeRef.current];
    if (!t || !el) return;
    gsap.to(el, {
      color: isActive ? t.linkActive : t.link,
      duration: 0.18,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        data-theme={theme}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          height: "var(--nav-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "var(--gutter)",
          backgroundColor: THEMES.hero.bg,
          borderBottom: `1px solid ${THEMES.hero.border}`,
          willChange: "background-color, border-bottom-color",
        }}
      >
        {/* ── Left: Primary Exact Identity Unit with Attached Copyright ── */}
        <a
          href="/"
          onClick={handleWordmarkClick}
          aria-label="Abhishek Tejith Kumar Home"
          className="link-bare"
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
          onMouseEnter={() => setCursor("hover")}
          onMouseLeave={() => setCursor("default")}
        >
          <span
            ref={wordmarkRef}
            style={{
              fontFamily: "var(--font-family)",
              fontWeight: 600,
              color: THEMES.hero.wordmark,
              letterSpacing: "-0.02em",
              fontSize: "clamp(0.78rem, 2.8vw, 0.86rem)",
              lineHeight: 1,
              userSelect: "none",
              willChange: "color",
            }}
          >
            ABHISHEK TEJITH KUMAR©
          </span>
        </a>

        {/* ── Desktop Right-Side Navigation Order: WORK, ABOUT, RESUME, CONTACT ── */}
        <nav aria-label="Primary navigation" className="nav-desktop-links">
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2.4vw, 28px)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            role="list"
          >
            {/* WORK */}
            <li>
              <a
                ref={workLinkRef}
                href={path === "/" ? "#work" : "/#work"}
                onClick={handleWorkClick}
                className="type-ui"
                style={{
                  color: activeItem === "work" ? THEMES.hero.linkActive : THEMES.hero.link,
                  fontWeight: activeItem === "work" ? 600 : 500,
                  textDecoration: "none",
                  willChange: "color",
                }}
                onMouseEnter={() => handleLinkEnter(workLinkRef.current)}
                onMouseLeave={() => handleLinkLeave(workLinkRef.current, activeItem === "work")}
              >
                WORK
              </a>
            </li>

            {/* ABOUT */}
            <li>
              <a
                ref={aboutLinkRef}
                href={path === "/" ? "#about" : "/#about"}
                onClick={handleAboutClick}
                className="type-ui"
                style={{
                  color: activeItem === "about" ? THEMES.hero.linkActive : THEMES.hero.link,
                  fontWeight: activeItem === "about" ? 600 : 500,
                  textDecoration: "none",
                  willChange: "color",
                }}
                onMouseEnter={() => handleLinkEnter(aboutLinkRef.current)}
                onMouseLeave={() => handleLinkLeave(aboutLinkRef.current, activeItem === "about")}
              >
                ABOUT
              </a>
            </li>

            {/* RESUME — Immediately after ABOUT */}
            <li>
              <button
                ref={resumeBtnRef}
                onClick={openResume}
                className="type-ui"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: THEMES.hero.link,
                  fontWeight: 500,
                  willChange: "color",
                }}
                onMouseEnter={() => handleLinkEnter(resumeBtnRef.current)}
                onMouseLeave={() => handleLinkLeave(resumeBtnRef.current, false)}
              >
                RESUME
              </button>
            </li>

            {/* CONTACT — Final Item with Stronger Visual Emphasis */}
            <li>
              <a
                ref={contactBtnRef}
                href={path === "/" ? "#contact" : "/#contact"}
                onClick={handleContactClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  border: `1px solid ${THEMES.hero.btnBorder}`,
                  borderRadius: "0px",
                  backgroundColor: THEMES.hero.btnBg,
                  color: THEMES.hero.btnColor,
                  textDecoration: "none",
                  fontFamily: "var(--font-family)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  willChange: "background-color, color, border-color",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={handleContactEnter}
                onMouseLeave={handleContactLeave}
              >
                <span>CONTACT</span>
                <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>&rarr;</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* ── Mobile Hamburger Toggle (44px min tap target, semantic button) ── */}
        <button
          ref={hamburgerBtnRef}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-overlay"
          className="nav-mobile-toggle"
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            minWidth: "44px",
            minHeight: "44px",
            width: "44px",
            height: "44px",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: THEMES.hero.wordmark,
            zIndex: 510,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
              </>
            ) : (
              <>
                <line x1="2" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
                <line x1="2" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* ── Full-Screen Mobile Navigation Overlay (Clean Editorial Layout) ── */}
      <div
        id="mobile-navigation-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 490,
          backgroundColor: "#F7FDFD",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "calc(var(--nav-h) + 36px)",
          paddingBottom: "clamp(32px, 7vh, 56px)",
          paddingInline: "var(--gutter)",
          opacity: 0,
          visibility: "hidden",
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
      >
        {/* Navigation Item Stack */}
        <nav aria-label="Mobile navigation">
          <ul
            ref={menuListRef}
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(18px, 3.5vh, 28px)",
            }}
            role="list"
          >
            {[
              { label: "WORK", id: "work" },
              { label: "ABOUT", id: "about" },
              { label: "RESUME", id: "resume" },
              { label: "CONTACT", id: "contact" },
            ].map((item, idx) => (
              <li key={item.id} style={{ willChange: "transform, opacity" }}>
                <button
                  onClick={() => handleMobileNavClick(item.id)}
                  className="link-bare"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px 0",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    fontFamily: "var(--font-family)",
                    fontSize: "clamp(2.2rem, 8vw, 3.25rem)",
                    fontWeight: 500,
                    color: "#000000",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    display: "flex",
                    alignItems: "baseline",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.4)",
                      letterSpacing: "0.08em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Editorial Sub-Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.04em",
            }}
          >
            Visual Designer &middot; Hyderabad
          </span>
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.04em",
            }}
          >
            &copy; 2026
          </span>
        </div>
      </div>
    </>
  );
}

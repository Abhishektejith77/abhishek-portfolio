# FRONTEND IMPLEMENTATION RULES

## Architecture
- React 19 + Vite 8 + Tailwind CSS v4.
- Clean separation:
  - `src/components/navigation/Nav.jsx`
  - `src/components/sections/Hero.jsx`
  - `src/components/sections/Positioning.jsx`
  - `src/components/sections/SelectedWork.jsx`
  - `src/components/sections/Process.jsx`
  - `src/components/sections/About.jsx`
  - `src/components/sections/Contact.jsx`
  - `src/components/sections/Footer.jsx`
- No Playground or duplicate experiment code in production bundles.
- Accessible, semantic HTML (headings, aria landmarks, clean keyboard navigation).

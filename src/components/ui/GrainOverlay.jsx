/**
 * GrainOverlay.jsx
 * Extremely subtle film-grain / paper texture.
 * Uses an SVG feTurbulence filter at very low opacity (0.038).
 * Fixed-position, pointer-events:none, z-index above all content.
 * Creates the feeling of a physical paper surface without visual distraction.
 */

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9990,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ display: "block", opacity: 0.038 }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

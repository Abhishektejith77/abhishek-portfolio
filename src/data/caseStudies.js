/**
 * caseStudies.js
 * Central single source of truth for all internal case-study project data.
 *
 * Sequence of projects:
 *   1. Bombel (/work/bombel)
 *   2. Ipso (/work/ipso)
 *   3. Vanzscape (/work/vanzscape)
 *   4. Meru Schools (/work/meru-schools)
 *   5. World of Katty (/work/world-of-katty)
 *
 * Predictable asset structure:
 *   /assets/projects/{slug}/hero.jpg
 *   /assets/projects/{slug}/slide-01.jpg ... slide-09.jpg
 */

export const caseStudies = {
  bombel: {
    id: "bombel",
    slug: "bombel",
    title: "Bombel",
    description: "Brand identity, packaging and digital ordering experience.",
    statement: "A culinary brand identity and packaging system built around tactile materiality and a seamless digital ordering workflow.",
    role: "Brand Identity",
    year: "2026",
    disciplines: [
      "Brand Identity",
      "Packaging",
      "Digital Experience",
    ],
    heroImage: null, // /assets/projects/bombel/hero.jpg
    heroAlt: "Bombel Project Hero Presentation",
    palette: {
      bg: "#2C1810",
      fg: "#E8D5C4",
      accent: "#C9956F",
    },
    slides: Array.from({ length: 9 }, (_, i) => ({
      id: `slide-0${i + 1}`,
      src: null,
      alt: `Bombel presentation slide 0${i + 1}`,
      defaultPath: `/assets/projects/bombel/slide-0${i + 1}.jpg`,
    })),
    navigation: {
      prev: null, // First project in order -> Back To Selected Projects
      next: {
        slug: "ipso",
        title: "Ipso",
        path: "/work/ipso",
      },
    },
  },

  ipso: {
    id: "ipso",
    slug: "ipso",
    title: "Ipso",
    description: "Brand identity and digital presence.",
    statement: "Brand identity and digital systems designed for structural clarity and responsive digital presence.",
    role: "Visual Designer",
    year: "2026",
    disciplines: [
      "Brand Identity",
      "Digital Systems",
    ],
    heroImage: null, // /assets/projects/ipso/hero.jpg
    heroAlt: "Ipso Project Hero Presentation",
    palette: {
      bg: "#0D1117",
      fg: "#E8EAED",
      accent: "#3157FF",
    },
    slides: Array.from({ length: 9 }, (_, i) => ({
      id: `slide-0${i + 1}`,
      src: null,
      alt: `Ipso presentation slide 0${i + 1}`,
      defaultPath: `/assets/projects/ipso/slide-0${i + 1}.jpg`,
    })),
    navigation: {
      prev: {
        slug: "bombel",
        title: "Bombel",
        path: "/work/bombel",
      },
      next: {
        slug: "vanzscape",
        title: "Vanzscape",
        path: "/work/vanzscape",
      },
    },
  },

  vanzscape: {
    id: "vanzscape",
    slug: "vanzscape",
    title: "Vanzscape",
    description: "Digital presence translating architecture, proportion and materiality to screen.",
    statement: "Translating architecture, spatial proportion, and physical materiality into a quiet, restrained digital experience.",
    role: "Visual Designer",
    year: "2026",
    disciplines: [
      "Architectural Identity",
      "Digital Experience",
    ],
    heroImage: null, // /assets/projects/vanzscape/hero.jpg
    heroAlt: "Vanzscape Project Hero Presentation",
    palette: {
      bg: "#1C1B18",
      fg: "#C4BFB4",
      accent: "#8C8880",
    },
    slides: Array.from({ length: 9 }, (_, i) => ({
      id: `slide-0${i + 1}`,
      src: null,
      alt: `Vanzscape presentation slide 0${i + 1}`,
      defaultPath: `/assets/projects/vanzscape/slide-0${i + 1}.jpg`,
    })),
    navigation: {
      prev: {
        slug: "ipso",
        title: "Ipso",
        path: "/work/ipso",
      },
      next: {
        slug: "meru-schools",
        title: "Meru Schools",
        path: "/work/meru-schools",
      },
    },
  },

  "meru-schools": {
    id: "meru-schools",
    slug: "meru-schools",
    title: "Meru Schools",
    description: "Website and UX redesign for an educational institution.",
    statement: "A comprehensive website and UX redesign structured to bring clarity, hierarchy, and intuitive navigation to an educational institution.",
    role: "UX / Visual Designer",
    year: "2026",
    disciplines: [
      "UX Design",
      "Website Redesign",
    ],
    heroImage: null, // /assets/projects/meru-schools/hero.jpg
    heroAlt: "Meru Schools Project Hero Presentation",
    palette: {
      bg: "#0A2430",
      fg: "#7FC4B4",
      accent: "#4BA899",
    },
    slides: Array.from({ length: 9 }, (_, i) => ({
      id: `slide-0${i + 1}`,
      src: null,
      alt: `Meru Schools presentation slide 0${i + 1}`,
      defaultPath: `/assets/projects/meru-schools/slide-0${i + 1}.jpg`,
    })),
    navigation: {
      prev: {
        slug: "vanzscape",
        title: "Vanzscape",
        path: "/work/vanzscape",
      },
      next: {
        slug: "world-of-katty",
        title: "World of Katty",
        path: "/work/world-of-katty",
      },
    },
  },

  "world-of-katty": {
    id: "world-of-katty",
    slug: "world-of-katty",
    title: "World of Katty",
    description: "Brand identity and art direction for an exotic candle brand.",
    statement: "Brand identity and art direction for an exotic candle brand, shaped around tactile warmth, sensory storytelling, and atmospheric visual craft.",
    role: "Visual Designer",
    year: "2026",
    disciplines: [
      "Brand Identity",
      "Art Direction",
    ],
    heroImage: null, // /assets/projects/world-of-katty/hero.jpg
    heroAlt: "World of Katty Project Hero Presentation",
    palette: {
      bg: "#0F0A06",
      fg: "#D4A882",
      accent: "#9C6B40",
    },
    slides: Array.from({ length: 9 }, (_, i) => ({
      id: `slide-0${i + 1}`,
      src: null,
      alt: `World of Katty presentation slide 0${i + 1}`,
      defaultPath: `/assets/projects/world-of-katty/slide-0${i + 1}.jpg`,
    })),
    navigation: {
      prev: {
        slug: "meru-schools",
        title: "Meru Schools",
        path: "/work/meru-schools",
      },
      next: {
        slug: "bombel",
        title: "Bombel",
        path: "/work/bombel",
      },
    },
  },
};

export const getCaseStudyBySlug = (slug) => caseStudies[slug] || null;

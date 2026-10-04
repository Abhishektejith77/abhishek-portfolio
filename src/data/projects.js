/**
 * projects.js — Single source of truth for all project data.
 * Drop real images into each project's `image` field and update
 * `palette` colours when you have the final artwork.
 */

export const projects = [
  {
    id:          "bombel",
    index:       "01",
    title:       "Bombel",
    slug:        "bombel",
    role:        "Brand Identity",
    year:        "2026",
    disciplines: ["Brand", "Packaging", "Digital"],
    description: "Brand identity, packaging and digital ordering experience.",
    image:       null,
    palette: {
      bg:      "#2C1810",
      fg:      "#E8D5C4",
      accent:  "#C9956F",
    },
    layout: "split-right",
    featured: true,
  },
  {
    id:          "ipso",
    index:       "02",
    title:       "Ipso",
    slug:        "ipso",
    role:        "Visual Designer",
    year:        "2026",
    disciplines: ["Brand Identity", "Digital"],
    description: "Brand identity and digital presence.",
    image:       null,
    palette: {
      bg:      "#0D1117",
      fg:      "#E8EAED",
      accent:  "#3157FF",
    },
    layout: "split-left",
    featured: true,
  },
  {
    id:          "vanzscape",
    index:       "03",
    title:       "Vanzscape",
    slug:        "vanzscape",
    role:        "Visual Designer",
    year:        "2026",
    disciplines: ["Architecture", "Digital"],
    description: "Digital presence translating architecture, proportion and materiality to screen.",
    image:       null,
    palette: {
      bg:      "#1C1B18",
      fg:      "#C4BFB4",
      accent:  "#8C8880",
    },
    layout: "full",
    featured: true,
  },
  {
    id:          "meru-schools",
    index:       "04",
    title:       "Meru Schools",
    slug:        "meru-schools",
    role:        "UX / Visual Designer",
    year:        "2026",
    disciplines: ["UX", "Website Redesign"],
    description: "Website and UX redesign for an educational institution.",
    image:       null,
    palette: {
      bg:      "#0A2430",
      fg:      "#7FC4B4",
      accent:  "#4BA899",
    },
    layout: "split-right",
    featured: true,
  },
  {
    id:          "world-of-katty",
    index:       "05",
    title:       "World of Katty",
    slug:        "world-of-katty",
    role:        "Visual Designer",
    year:        "2026",
    disciplines: ["Brand Identity", "Art Direction"],
    description: "Brand identity and art direction for an exotic candle brand.",
    image:       null,
    palette: {
      bg:      "#0F0A06",
      fg:      "#D4A882",
      accent:  "#9C6B40",
    },
    layout: "full",
    featured: false,
  },
];

export const getFeatured = () => projects.filter((p) => p.featured);
export const getBySlug   = (s) => projects.find((p) => p.slug === s);

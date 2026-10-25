import awwwardsPortfolio from "./awwwards-portfolio.json";
import saasLanding from "./saas-landing.json";
import photographerPortfolio from "./photographer-portfolio.json";
import restaurantSite from "./restaurant-site.json";
import onlineStore from "./online-store.json";
import agencySite from "./agency-site.json";
import blogMagazine from "./blog-magazine.json";
import mobileFirstApp from "./mobile-first-app.json";
import { Choices } from "@/lib/share/schema";

export interface PresetMeta {
  id: string;
  title: string;
  category: "portfolio" | "saas" | "commerce" | "editorial" | "app";
  tagline: string;
  target: "website" | "app";
  previewVibe: string;
  data: Choices;
}

export const PRESETS: PresetMeta[] = [
  {
    id: "awwwards-portfolio",
    title: "Awwwards-Style Portfolio",
    category: "portfolio",
    tagline: "Experimental 3D spatial monograph with magnetic interactions and dark luxury typography.",
    target: "website",
    previewVibe: "Dark Luxury • GSAP • Serif",
    data: awwwardsPortfolio as unknown as Choices,
  },
  {
    id: "saas-landing",
    title: "SaaS Enterprise Velocity",
    category: "saas",
    tagline: "High-converting infrastructure landing page with bento grids and crisp slate colors.",
    target: "website",
    previewVibe: "Corporate Clean • Indigo • Modern",
    data: saasLanding as unknown as Choices,
  },
  {
    id: "photographer-portfolio",
    title: "Photographer Portfolio",
    category: "portfolio",
    tagline: "Quiet, monumental gallery architecture designed for high-resolution visual storytelling.",
    target: "website",
    previewVibe: "Minimal • Warm Alabaster • Full Bleed",
    data: photographerPortfolio as unknown as Choices,
  },
  {
    id: "restaurant-site",
    title: "Hearth & Dining Room",
    category: "commerce",
    tagline: "Artisanal culinary experience with warm terracotta tones and handwritten tasting menus.",
    target: "website",
    previewVibe: "Editorial • Tuscan Clay • Tactile",
    data: restaurantSite as unknown as Choices,
  },
  {
    id: "online-store",
    title: "Ceramic & Objects Store",
    category: "commerce",
    tagline: "Mindful e-commerce shop with natural sage botanicals and craft provenance details.",
    target: "website",
    previewVibe: "Minimal • Sage Green • Quiet Shop",
    data: onlineStore as unknown as Choices,
  },
  {
    id: "agency-site",
    title: "Radical Design Engineering",
    category: "editorial",
    tagline: "High-voltage brutalist studio site with technical grids, vermilion accents, and live ticker.",
    target: "website",
    previewVibe: "Brutalist • Safety Vermilion • Monospace",
    data: agencySite as unknown as Choices,
  },
  {
    id: "blog-magazine",
    title: "The Literary Journal",
    category: "editorial",
    tagline: "Long-form editorial essays with margin footnotes, warm book paper, and classical rhythm.",
    target: "website",
    previewVibe: "Editorial • Book Paper • Deep Cobalt",
    data: blogMagazine as unknown as Choices,
  },
  {
    id: "mobile-first-app",
    title: "Habit & Ritual Companion",
    category: "app",
    tagline: "Calm, intimate iOS-inspired app with gesture feedback, tab navigation, and daily cards.",
    target: "app",
    previewVibe: "Mobile App • Minimal Pill • Haptic Feel",
    data: mobileFirstApp as unknown as Choices,
  },
];

export interface StepOption<T = string> {
  id: T;
  label: string;
  description: string;
  previewClass?: string;
  iconName?: string;
  badge?: string;
  thumbnailSvg?: string;
}

export interface StepDefinition {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  category: "Vision" | "Aesthetics" | "Structure" | "Dynamics" | "Technical" | "Export";
  helpText: string;
  compilerSection: string;
  quickMode: boolean; // whether shown in quick mode
  quickModeNote?: string;
}

export const STEPS: StepDefinition[] = [
  {
    id: 1,
    slug: "goal",
    title: "Project Purpose & Core Audience",
    shortTitle: "Goal",
    category: "Vision",
    helpText: "Set the foundational identity, intended users, and emotional resonance for your digital experience.",
    compilerSection: "Overview & Direction",
    quickMode: true,
  },
  {
    id: 2,
    slug: "ui-style",
    title: "Aesthetic Direction & Visual Language",
    shortTitle: "Style",
    category: "Aesthetics",
    helpText: "Choose the high-level art direction. Atelier uses this to calibrate typographic weight, borders, shadows, and materials.",
    compilerSection: "Design System & Style",
    quickMode: true,
  },
  {
    id: 3,
    slug: "color",
    title: "Color Palette & Surface Tones",
    shortTitle: "Color",
    category: "Aesthetics",
    helpText: "Select from curated harmonious palettes or customize individual design tokens. WCAG AA contrast is verified live.",
    compilerSection: "Design System & Color Tokens",
    quickMode: true,
  },
  {
    id: 4,
    slug: "typography",
    title: "Typography Pairings & Scale",
    shortTitle: "Typography",
    category: "Aesthetics",
    helpText: "Pair expressive display type with hyper-legible body fonts. Scale defines editorial hierarchy from compact to dramatic.",
    compilerSection: "Typography System",
    quickMode: true,
  },
  {
    id: 5,
    slug: "background",
    title: "Atmospheric Canvas & Background Treatment",
    shortTitle: "Background",
    category: "Aesthetics",
    helpText: "Define whether surfaces sit on solid stone, procedural noise grain, rich gradients, or animated 3D environments.",
    compilerSection: "Surface & Canvas Treatment",
    quickMode: false,
    quickModeNote: "Auto-calibrated based on selected aesthetic direction",
  },
  {
    id: 6,
    slug: "imagery",
    title: "Foreground Imagery & Visual Assets",
    shortTitle: "Imagery",
    category: "Aesthetics",
    helpText: "Specify asset types, placement treatments, bleed scale, and geometric framing masks.",
    compilerSection: "Imagery & Asset Guidelines",
    quickMode: false,
    quickModeNote: "Auto-set to hero & showcase assets matching target",
  },
  {
    id: 7,
    slug: "layout",
    title: "Grid Architecture, Layout & Navigation",
    shortTitle: "Layout",
    category: "Structure",
    helpText: "Configure column architecture, gutter density, vertical spacing rhythm, and navigation patterns.",
    compilerSection: "Layout, Grid & Navigation",
    quickMode: false, // In quick mode, smart defaults apply
    quickModeNote: "Balanced 12-column grid with floating navigation",
  },
  {
    id: 8,
    slug: "components",
    title: "Component DNA: Buttons, Cards & Controls",
    shortTitle: "Components",
    category: "Structure",
    helpText: "Tune tactile interaction details: button radiuses, hover animations, card elevations, and stroke weights.",
    compilerSection: "Component Specifications",
    quickMode: false, // In quick mode, smart defaults apply
    quickModeNote: "Calibrated to your UI style automatically",
  },
  {
    id: 9,
    slug: "motion",
    title: "Motion Choreography & Easing Physics",
    shortTitle: "Motion",
    category: "Dynamics",
    helpText: "Select the animation engine and define intensity curves across page loads, scroll triggers, and micro-interactions.",
    compilerSection: "Motion & Animation Specs",
    quickMode: true,
  },
  {
    id: 10,
    slug: "behavior",
    title: "Platform Behavior, Offline & Responsiveness",
    shortTitle: "Behavior",
    category: "Technical",
    helpText: "Ensure responsive breakpoints, PWA offline caching capabilities, dark mode toggling, and accessibility.",
    compilerSection: "Platform & Responsive Behavior",
    quickMode: true,
  },
  {
    id: 11,
    slug: "tech",
    title: "Technology Stack & Code Architecture",
    shortTitle: "Tech Stack",
    category: "Technical",
    helpText: "Instruct the AI on the exact framework, styling library, hosting provider, and architecture conventions.",
    compilerSection: "Tech Stack & Implementation Rules",
    quickMode: false,
    quickModeNote: "Standardized on Next.js + Tailwind + Vercel",
  },
  {
    id: 12,
    slug: "content",
    title: "Real Content, Brand Copy & Unique Touches",
    shortTitle: "Content",
    category: "Vision",
    helpText: "Provide real brand names, taglines, copy fragments, and one unexpected design flourish to avoid generic outputs.",
    compilerSection: "Content, Brand & Signature Detail",
    quickMode: false,
    quickModeNote: "Sensible architectural copy preloaded",
  },
  {
    id: 13,
    slug: "review",
    title: "Compiled AI Prompt Review & Export",
    shortTitle: "Review",
    category: "Export",
    helpText: "Review your transparently compiled prompt with section-by-section rationale, conflict validation, and export.",
    compilerSection: "Final Prompt Compilation",
    quickMode: true,
  },
];

export const UI_STYLE_OPTIONS: StepOption[] = [
  {
    id: "minimal",
    label: "Minimal Swiss",
    description: "Stripped of ornament. Pure negative space, rigorous hierarchy, and whisper-thin dividers.",
    previewClass: "bg-[#FAFAFA] text-zinc-900 border-zinc-200",
  },
  {
    id: "editorial",
    label: "Editorial Magazine",
    description: "Rich serif display typography, expansive reading columns, textured cardstock, and literary poise.",
    previewClass: "bg-[#F7F4EE] text-[#241E18] border-[#DFD8CA]",
  },
  {
    id: "dark-luxury",
    label: "Dark Luxury",
    description: "Deep obsidian surfaces, champagne or gold foil accents, low-contrast borders, and cinematic restraint.",
    previewClass: "bg-[#0C0B0E] text-[#F3EFE6] border-[#26242B]",
  },
  {
    id: "brutalist",
    label: "Neo-Brutalist",
    description: "Raw architectural borders, high-contrast monochrome, monospace accents, and zero compromise.",
    previewClass: "bg-white text-black border-black border-2",
  },
  {
    id: "glassmorphism",
    label: "Frosted Glassmorphism",
    description: "Backdrop blur, translucent frosted planes, specular highlight borders, and fluid gradient refraction.",
    previewClass: "bg-white/40 backdrop-blur-md text-zinc-800 border-white/60",
  },
  {
    id: "corporate-clean",
    label: "Corporate Clean",
    description: "Engineered SaaS clarity. Crisp slate cards, refined indigo primary buttons, and confident bento grids.",
    previewClass: "bg-[#F8FAFC] text-slate-900 border-slate-200",
  },
  {
    id: "neo-retro",
    label: "Neo-Retro",
    description: "Warm vintage printing halftones, typewriter typography, warm beige papers, and analog nostalgia.",
    previewClass: "bg-[#F2ECE1] text-[#332C24] border-[#D8CEBF]",
  },
  {
    id: "soft-3d",
    label: "Soft 3D Tactile",
    description: "Subtle inner shadows, pillowing volumes, clay-like softness, and gentle directional diffuse lighting.",
    previewClass: "bg-[#F1F3F6] text-slate-800 border-slate-200 shadow-inner",
  },
  {
    id: "playful",
    label: "Playful & Dynamic",
    description: "Energetic geometry, friendly rounded forms, joyful color accents, and bouncy micro-interactions.",
    previewClass: "bg-[#FFFDF5] text-amber-950 border-amber-200",
  },
];

export interface FontPairing {
  id: string;
  name: string;
  description: string;
  headingFont: string;
  category?: string;
  bodyFont: string;
  monoFont: string;
  googleFontsUrl: string;
  vibe: string;
  headingWeights: number[];
  bodyWeights: number[];
  sampleHeading: string;
  sampleBody: string;
}

export interface TypeScaleConfig {
  id: "compact" | "balanced" | "dramatic";
  name: string;
  description: string;
  h1: string;
  h2: string;
  h3: string;
  body: string;
  small: string;
  lineHeightH1: string;
  lineHeightBody: string;
}

export const TYPE_SCALES: Record<string, TypeScaleConfig> = {
  compact: {
    id: "compact",
    name: "Compact",
    description: "Dense, functional, optimized for dashboard/data-rich interfaces.",
    h1: "2.25rem", // 36px
    h2: "1.75rem", // 28px
    h3: "1.25rem", // 20px
    body: "0.9375rem", // 15px
    small: "0.75rem", // 12px
    lineHeightH1: "1.15",
    lineHeightBody: "1.5",
  },
  balanced: {
    id: "balanced",
    name: "Balanced",
    description: "Editorial rhythm suitable for standard SaaS, portfolios, and magazines.",
    h1: "3.25rem", // 52px
    h2: "2.25rem", // 36px
    h3: "1.5rem", // 24px
    body: "1.0625rem", // 17px
    small: "0.8125rem", // 13px
    lineHeightH1: "1.1",
    lineHeightBody: "1.65",
  },
  dramatic: {
    id: "dramatic",
    name: "Dramatic",
    description: "Heroic editorial scale for luxury, agency, and award-winning showcase sites.",
    h1: "5rem", // 80px
    h2: "3rem", // 48px
    h3: "1.875rem", // 30px
    body: "1.125rem", // 18px
    small: "0.875rem", // 14px
    lineHeightH1: "1.02",
    lineHeightBody: "1.7",
  },
};

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "cormorant-inter",
    name: "Cormorant & Inter",
    description: "Graceful classical Roman serif paired with an engineered, ultra-legible neo-grotesque.",
    headingFont: "Cormorant Garamond",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
    vibe: "High Luxury, Art Gallery, Monograph",
    headingWeights: [400, 600, 700],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Quiet permanence in an age of velocity.",
    sampleBody: "Designed with architectural proportions and disciplined typography, giving digital spaces the weight of physical editorial print.",
  },
  {
    id: "playfair-jakarta",
    name: "Playfair Display & Plus Jakarta Sans",
    description: "High-contrast editorial serif paired with modern geometric clean sans.",
    headingFont: "Playfair Display",
    bodyFont: "Plus Jakarta Sans",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
    vibe: "Modern Hospitality, Fashion, Magazine",
    headingWeights: [600, 700],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Curated moments, crafted without compromise.",
    sampleBody: "Balancing timeless display romance with hyper-crisp interface utility across every modern device breakpoint.",
  },
  {
    id: "syne-spacegrotesk",
    name: "Syne & Space Grotesk",
    category: "brutalist",
    description: "Wide avant-garde display typeface with tech-forward brutalist sans.",
    headingFont: "Syne",
    bodyFont: "Space Grotesk",
    monoFont: "Space Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&display=swap",
    vibe: "Creative Studio, Web3, Avant-Garde",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Radical clarity meets unfiltered form.",
    sampleBody: "Expansive letterforms built for designers rejecting beige uniformity in favor of distinctive geometric character.",
  },
  {
    id: "newsreader-outfit",
    name: "Newsreader & Outfit",
    description: "Refined newspaper editorial serif with smooth contemporary geometric body.",
    headingFont: "Newsreader",
    bodyFont: "Outfit",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap",
    vibe: "Substack, Literary Journalism, Thought Leadership",
    headingWeights: [400, 600],
    bodyWeights: [300, 400, 500, 600],
    sampleHeading: "Long-form thinking for the considered reader.",
    sampleBody: "Crafted for effortless reading immersion, sustained focus, and elevated intellectual posture.",
  },
  {
    id: "cabinet-satoshi",
    name: "Montserrat & Satoshi",
    description: "Bold clean modern display architecture paired with neutral contemporary Swiss curves.",
    headingFont: "Montserrat",
    bodyFont: "DM Sans",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Montserrat:wght@600;700;800&family=JetBrains+Mono:wght@400&display=swap",
    vibe: "Fintech, Next-Gen SaaS, AI Infrastructure",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500, 700],
    sampleHeading: "The infrastructure for what comes next.",
    sampleBody: "High-density precision and mathematical rhythm engineered for rapid cognitive uptake and flawless interaction.",
  },
  {
    id: "fraunces-inter",
    name: "Fraunces & Inter",
    description: "Warm optical serif with delicious vintage ink-traps and razor-sharp modern sans.",
    headingFont: "Fraunces",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600&display=swap",
    vibe: "Artisan Brands, Craft Coffee, Organic Beauty",
    headingWeights: [500, 700],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Authentic materials shaped by human intention.",
    sampleBody: "Infusing human warmth and organic tactility into the digital realm while retaining effortless accessibility.",
  },
  {
    id: "spacemono-dmsans",
    name: "Space Mono & DM Sans",
    description: "Engineering-grade monospace title system with friendly human-centered grotesque.",
    headingFont: "Space Mono",
    bodyFont: "DM Sans",
    monoFont: "Space Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
    vibe: "Developer Tool, Hardware, Minimalist Engineering",
    headingWeights: [400, 700],
    bodyWeights: [400, 500, 700],
    sampleHeading: "UNIX ARCHITECTURE // v2.4",
    sampleBody: "Precise monospace accents anchoring technical authority alongside a warm, human, legible body type.",
  },
  {
    id: "archivo-worksans",
    name: "Archivo & Work Sans",
    description: "Industrial strength grotesque with high x-height workhorse body.",
    headingFont: "Archivo",
    bodyFont: "Work Sans",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Work+Sans:wght@400;500;600&display=swap",
    vibe: "Design Systems, Architecture, Technical Modernism",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Built for structural longevity and clarity.",
    sampleBody: "An unapologetically modern typographic system celebrating geometric precision and robust functional hierarchy.",
  },
  {
    id: "epilogue-publicsans",
    name: "Epilogue & Public Sans",
    description: "Expressive neo-grotesque display with neutral institutional-grade clarity.",
    headingFont: "Epilogue",
    bodyFont: "Public Sans",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700;800&family=Public+Sans:wght@400;500;600&display=swap",
    vibe: "Civic Tech, Foundation, Cultural Non-Profit",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500, 600],
    sampleHeading: "Public trust built through rigorous transparency.",
    sampleBody: "Rooted in civic legibility guidelines while offering contemporary display confidence and authority.",
  },
  {
    id: "inter-inter",
    name: "Inter Precision (Pure Sans)",
    description: "Unified single-family Swiss typography utilizing weight, tracking, and optical scale.",
    headingFont: "Inter",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    vibe: "Productivity, Pure Utility, Minimalist Product",
    headingWeights: [600, 700, 800],
    bodyWeights: [400, 500],
    sampleHeading: "Zero friction between intent and execution.",
    sampleBody: "Subtle weight shifts and generous whitespace form a completely unpretentious, crystal-clear reading experience.",
  },
];

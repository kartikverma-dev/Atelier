import { z } from "zod";

export const UIStyleEnum = z.enum([
  "minimal",
  "editorial",
  "brutalist",
  "glassmorphism",
  "neo-retro",
  "soft-3d",
  "dark-luxury",
  "playful",
  "corporate-clean",
]);
export type UIStyle = z.infer<typeof UIStyleEnum>;

export const TargetEnum = z.enum(["website", "app"]);
export type Target = z.infer<typeof TargetEnum>;

export const WizardModeEnum = z.enum(["quick", "advanced"]);
export type WizardMode = z.infer<typeof WizardModeEnum>;

export const GoalSchema = z.object({
  purpose: z.string().default("Curated portfolio and monograph archive"),
  audience: z.string().default("Creative directors, collectors, and design-conscious clients"),
  feelingWords: z.array(z.string()).min(1).default(["Architectural", "Refined", "Serene"]),
});

export const ColorSchema = z.object({
  paletteId: z.string().default("midnight-executive"),
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#F4F1EA"),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#9C988F"),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#D4AF37"),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#0B0B0F"),
  surface: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#14141A"),
  text: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#F4F1EA"),
  mutedText: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#949087"),
  colorScheme: z.enum(["light", "dark", "both"]).default("dark"),
});

export const TypographySchema = z.object({
  pairingId: z.string().default("cormorant-inter"),
  headingFont: z.string().default("Cormorant Garamond"),
  bodyFont: z.string().default("Inter"),
  monoFont: z.string().default("JetBrains Mono"),
  scale: z.enum(["compact", "balanced", "dramatic"]).default("dramatic"),
  headingWeight: z.string().default("600"),
  bodyWeight: z.string().default("400"),
});

export const LogoSourceEnum = z.enum(["already-have", "design-new", "wordmark-only"]);
export type LogoSource = z.infer<typeof LogoSourceEnum>;

export const LogoTypeEnum = z.enum(["wordmark", "monogram", "symbol-wordmark", "badge"]);
export type LogoType = z.infer<typeof LogoTypeEnum>;

export const LogoSchema = z.object({
  source: LogoSourceEnum.default("design-new"),
  existingFile: z.string().default("/public/brand/logo.svg"),
  hasDarkVersion: z.boolean().default(true),
  logoType: LogoTypeEnum.default("symbol-wordmark"),
  letteringStyle: z.string().default("heading-font"),
  letterCase: z.enum(["normal", "uppercase", "small-caps"]).default("uppercase"),
  tracking: z.enum(["tight", "normal", "wide"]).default("wide"),
  symbolIdea: z.string().default("A minimalist geometric compass arch"),
  symbolStyle: z.enum(["line", "solid", "geometric", "hand-drawn", "abstract"]).default("line"),
  colorUse: z.enum(["single-color", "two-color", "auto-palette"]).default("two-color"),
  placement: z
    .array(z.enum(["navbar-left", "navbar-center", "footer", "hero", "loading-screen"]))
    .default(["navbar-left", "footer"]),
  navbarHeight: z.union([z.literal(24), z.literal(28), z.literal(32), z.literal(40)]).default(28),
  iconsEnabled: z.boolean().default(true),
  iconShape: z.enum(["square", "rounded-square", "circle"]).default("rounded-square"),
  iconSource: z.enum(["monogram", "symbol"]).default("monogram"),
});
export type LogoChoices = z.infer<typeof LogoSchema>;

export const BackgroundSchema = z.object({
  type: z.enum(["solid", "gradient", "noise", "image", "video", "animated-3d", "pattern"]).default("noise"),
  details: z.string().default("Deep matte charcoal with fine 4% monochromatic grain overlay"),
});

export const ImagerySchema = z.object({
  type: z.enum(["none", "hero-image", "product-shots", "illustrations", "icons", "3d-objects"]).default("hero-image"),
  placement: z.array(z.enum(["hero", "cards", "sections"])).default(["hero", "cards"]),
  size: z.enum(["compact", "medium", "full-bleed"]).default("full-bleed"),
  shape: z.enum(["rounded", "sharp", "pill", "organic-mask"]).default("sharp"),
});

export const LayoutSchema = z.object({
  columns: z.union([z.literal(4), z.literal(6), z.literal(12)]).default(12),
  containerWidth: z.enum(["narrow", "default", "wide", "full"]).default("wide"),
  gutter: z.enum(["compact", "default", "relaxed"]).default("relaxed"),
  spacingScale: z.enum(["compact", "comfortable", "generous"]).default("generous"),
  sectionOrder: z.array(z.string()).default(["hero", "featured-works", "editorial-statement", "archive", "contact"]),
  navbarStyle: z.enum(["top", "floating", "sidebar", "hidden"]).default("floating"),
  footerStyle: z.enum(["minimal", "multi-column", "editorial", "centered"]).default("editorial"),
});

export const ComponentsSchema = z.object({
  buttonShape: z.enum(["sharp", "subtle-round", "pill"]).default("sharp"),
  buttonSize: z.enum(["sm", "md", "lg"]).default("md"),
  buttonHover: z.enum(["subtle-lift", "fill-expand", "glow", "invert", "scale"]).default("fill-expand"),
  cardStyle: z.enum(["border-only", "subtle-elevated", "frosted-glass", "tinted-flat", "deep-shadow"]).default("border-only"),
  formStyle: z.enum(["minimal-underline", "enclosed-pill", "crisp-bordered", "floating-label"]).default("crisp-bordered"),
  borderRadiusScale: z.enum(["none", "subtle", "medium", "large", "full"]).default("subtle"),
  shadowStyle: z.enum(["none", "crisp", "soft", "deep"]).default("none"),
  iconStyle: z.enum(["stroke-thin", "stroke-bold", "duotone", "solid"]).default("stroke-thin"),
});

export const MotionSchema = z.object({
  library: z.enum(["none", "css-only", "framer-motion", "gsap", "lenis", "threejs"]).default("framer-motion"),
  pageLoadIntensity: z.enum(["none", "subtle", "moderate", "expressive"]).default("subtle"),
  scrollIntensity: z.enum(["none", "subtle", "moderate", "expressive"]).default("subtle"),
  hoverIntensity: z.enum(["none", "subtle", "moderate", "expressive"]).default("subtle"),
  transitionIntensity: z.enum(["none", "subtle", "moderate", "expressive"]).default("subtle"),
});

export const BehaviorSchema = z.object({
  responsive: z.boolean().default(true),
  breakpoints: z.array(z.string()).default(["375px (Mobile)", "768px (Tablet)", "1280px (Desktop)", "1600px (Wide)"]),
  pwa: z.boolean().default(false),
  darkModeToggle: z.boolean().default(true),
  languageSupport: z.enum(["single", "i18n-ready"]).default("single"),
});

export const TechSchema = z.object({
  framework: z.enum(["nextjs", "html-css-js", "react-vite", "astro"]).default("nextjs"),
  styling: z.enum(["tailwind", "css-modules", "styled-components", "vanilla-css"]).default("tailwind"),
  hosting: z.enum(["vercel", "cloudflare", "netlify", "static-s3"]).default("vercel"),
  mobileEngine: z.enum(["pwa", "react-native", "flutter"]).optional().default("pwa"),
});

export const ContentSchema = z.object({
  brandName: z.string().default("Maison Aurelia"),
  tagline: z.string().default("Architecture & Spatial Monograph 2024—2026"),
  sections: z.array(z.string()).default(["Introduction", "Selected Monographs", "Critical Text", "Colophon & Inquiries"]),
  toneOfVoice: z.string().default("Architectural, restrained, authoritative, poetic precision"),
  realCopy: z.string().default("Every structure is an unspoken dialogue between natural light, enduring minerals, and the passage of human time."),
  unusualDetail: z.string().default("Subtle micro-grid coordinate watermark tracking viewport scroll progress in the bottom corner"),
});

export const ChoicesSchema = z.object({
  schemaVersion: z.number().default(2),
  target: TargetEnum.default("website"),
  mode: WizardModeEnum.default("quick"),
  goal: GoalSchema.default({
    purpose: "Curated portfolio and monograph archive",
    audience: "Creative directors, collectors, and design-conscious clients",
    feelingWords: ["Architectural", "Refined", "Serene"],
  }),
  uiStyle: UIStyleEnum.default("dark-luxury"),
  color: ColorSchema.default({
    paletteId: "midnight-executive",
    primary: "#F4F1EA",
    secondary: "#9C988F",
    accent: "#D4AF37",
    background: "#0B0B0F",
    surface: "#14141A",
    text: "#F4F1EA",
    mutedText: "#949087",
    colorScheme: "dark",
  }),
  typography: TypographySchema.default({
    pairingId: "cormorant-inter",
    headingFont: "Cormorant Garamond",
    bodyFont: "Inter",
    monoFont: "JetBrains Mono",
    scale: "dramatic",
    headingWeight: "600",
    bodyWeight: "400",
  }),
  logo: LogoSchema.default({
    source: "design-new",
    existingFile: "/public/brand/logo.svg",
    hasDarkVersion: true,
    logoType: "symbol-wordmark",
    letteringStyle: "heading-font",
    letterCase: "uppercase",
    tracking: "wide",
    symbolIdea: "A minimalist geometric compass arch",
    symbolStyle: "line",
    colorUse: "two-color",
    placement: ["navbar-left", "footer"],
    navbarHeight: 28,
    iconsEnabled: true,
    iconShape: "rounded-square",
    iconSource: "monogram",
  }),
  background: BackgroundSchema.default({
    type: "noise",
    details: "Deep matte charcoal with fine 4% monochromatic grain overlay",
  }),
  imagery: ImagerySchema.default({
    type: "hero-image",
    placement: ["hero", "cards"],
    size: "full-bleed",
    shape: "sharp",
  }),
  layout: LayoutSchema.default({
    columns: 12,
    containerWidth: "wide",
    gutter: "relaxed",
    spacingScale: "generous",
    sectionOrder: ["hero", "featured-works", "editorial-statement", "archive", "contact"],
    navbarStyle: "floating",
    footerStyle: "editorial",
  }),
  components: ComponentsSchema.default({
    buttonShape: "sharp",
    buttonSize: "md",
    buttonHover: "fill-expand",
    cardStyle: "border-only",
    formStyle: "crisp-bordered",
    borderRadiusScale: "subtle",
    shadowStyle: "none",
    iconStyle: "stroke-thin",
  }),
  motion: MotionSchema.default({
    library: "framer-motion",
    pageLoadIntensity: "subtle",
    scrollIntensity: "subtle",
    hoverIntensity: "subtle",
    transitionIntensity: "subtle",
  }),
  behavior: BehaviorSchema.default({
    responsive: true,
    breakpoints: ["375px (Mobile)", "768px (Tablet)", "1280px (Desktop)", "1600px (Wide)"],
    pwa: false,
    darkModeToggle: true,
    languageSupport: "single",
  }),
  tech: TechSchema.default({
    framework: "nextjs",
    styling: "tailwind",
    hosting: "vercel",
    mobileEngine: "pwa",
  }),
  content: ContentSchema.default({
    brandName: "Maison Aurelia",
    tagline: "Architecture & Spatial Monograph 2024—2026",
    sections: ["Introduction", "Selected Monographs", "Critical Text", "Colophon & Inquiries"],
    toneOfVoice: "Architectural, restrained, authoritative, poetic precision",
    realCopy: "Every structure is an unspoken dialogue between natural light, enduring minerals, and the passage of human time.",
    unusualDetail: "Subtle micro-grid coordinate watermark tracking viewport scroll progress in the bottom corner",
  }),
  uniquenessBoost: z.boolean().default(true),
  seed: z.number().default(42819),
});

export type Choices = z.infer<typeof ChoicesSchema>;

export const DEFAULT_CHOICES: Choices = ChoicesSchema.parse({});

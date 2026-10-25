import { Choices } from "@/lib/share/schema";

export function compileTechTokens(tech: Choices["tech"], target: "website" | "app"): string {
  const frameworkMap = {
    nextjs: "Next.js 14 App Router with TypeScript and static export configuration",
    "html-css-js": "Semantic HTML5, CSS Custom Properties, and ES Modules",
    "react-vite": "React 18 SPA bundled with Vite and TypeScript",
    astro: "Astro static site generator with zero client JavaScript by default",
  };

  const stylingMap = {
    tailwind: "Tailwind CSS configured via tailwind.config.ts",
    "css-modules": "CSS Modules scoped to components with variables in tokens.css",
    "styled-components": "styled-components with unified TypeScript ThemeProvider",
    "vanilla-css": "Bespoke CSS with custom properties declared in globals.css",
  };

  const hostingMap = {
    vercel: "Vercel Edge Network deployment",
    cloudflare: "Cloudflare Pages deployment",
    netlify: "Netlify deployment with atomic git deploys",
    "static-s3": "Amazon S3 with CloudFront CDN distribution",
  };

  const mobileEngineSpec =
    target === "app"
      ? `\n- Mobile Shell Architecture: ${
          tech.mobileEngine === "react-native"
            ? "React Native with Expo SDK 51 and React Navigation"
            : tech.mobileEngine === "flutter"
            ? "Flutter 3 with Riverpod state management"
            : "Progressive Web App with standalone manifest configuration"
        }`
      : "";

  return `
Technology Stack & Code Architecture:
- Core Framework: ${frameworkMap[tech.framework]}
- Styling Engine: ${stylingMap[tech.styling]}
- Target Infrastructure / Hosting: ${hostingMap[tech.hosting]}${mobileEngineSpec}
- TypeScript Standard: Strict TypeScript (noImplicitAny: true, strictNullChecks: true)
- Directory Organization:
  /app for routes and pages
  /components for UI primitives and widgets
  /lib for pure helper functions and business logic
  /styles for design tokens and theme configuration
`.trim();
}

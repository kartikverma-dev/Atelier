import { Choices } from "@/lib/share/schema";

export function compileBehaviorTokens(behavior: Choices["behavior"]): string {
  const pwaSpecs = behavior.pwa
    ? `
Progressive Web App (PWA) Implementation:
- Manifest file: /manifest.json with short_name, name, theme_color, background_color, display: "standalone", and start_url: "/".
- Offline Capability: Register Service Worker (/sw.js) utilizing Cache-First strategy for static assets and Network-First for dynamic endpoints.
- Icons: Provide 192x192 and 512x512 maskable PNG icons.
- Install Prompt: Provide tasteful non-intrusive install banner triggered after user engagement.`
    : `Progressive Web App (PWA): Not required for this deployment.`;

  const darkModeSpecs = behavior.darkModeToggle
    ? `Dark Mode Support: Implement class-based dark mode toggle synced with localStorage and prefers-color-scheme system preference. Prevent flash of unstyled theme (FOUT) with an inline blocking head script.`
    : `Dark Mode Support: Single fixed theme mode enforced. Do not provide theme toggle button.`;

  return `
Platform Behavior & Responsiveness:
- Breakpoint Matrix: ${behavior.breakpoints.join(", ")}
- Mobile Ergonomics: All interactive touch targets must be at least 44x44 CSS pixels. Avoid horizontal scrolling under any viewport down to 360px.
- ${darkModeSpecs}
- Localization: ${behavior.languageSupport === "i18n-ready" ? "i18n ready with dictionary key structure and RTL/LTR layout adaptability." : "Single primary locale (English default)."}
${pwaSpecs}
`.trim();
}

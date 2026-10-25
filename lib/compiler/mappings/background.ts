import { Choices } from "@/lib/share/schema";

export function compileBackgroundTokens(
  background: Choices["background"],
  bgHex: string,
  accentHex: string
): string {
  switch (background.type) {
    case "solid":
      return `Canvas Background: Flat pure matte fill using exact token ${bgHex}. Zero ambient gradients or artificial glare. Maintain clean negative space.`;
    case "noise":
      return `Canvas Background: Base fill ${bgHex} overlaid with monochromatic SVG noise grain texture at 3.5% opacity (mix-blend-mode: overlay; pointer-events: none). Details: "${background.details}".`;
    case "gradient":
      return `Canvas Background: Base fill ${bgHex} featuring directional ambient glow (radial-gradient(circle at 50% 0%, ${accentHex}1F 0%, transparent 70%)). Details: "${background.details}".`;
    case "image":
      return `Canvas Background: Full-viewport background imagery treated with CSS background-size: cover, background-position: center, and protected with a tonal backdrop scrim (${bgHex} at 75% opacity) to guarantee WCAG AA text legibility. Details: "${background.details}".`;
    case "video":
      return `Canvas Background: Silent loop background HTML5 video with playsinline, muted, loop, and autoplay attributes, capped at 1080p WebM/MP4, overlaid with a tinted contrast scrim in ${bgHex}. Respect prefers-reduced-motion by freezing on the poster frame. Details: "${background.details}".`;
    case "animated-3d":
      return `Canvas Background: Interactive Three.js or WebGL canvas mounted behind UI (z-index: 0), rendering subtle geometric mesh responding to mouse movement. Details: "${background.details}". Automatically throttled when tab loses focus or when reduced motion is preferred.`;
    case "pattern":
      return `Canvas Background: Structural geometric vector pattern (24px coordinate grid lines using ${accentHex}14) over base ${bgHex}. Details: "${background.details}".`;
  }
}

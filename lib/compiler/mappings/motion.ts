import { Choices } from "@/lib/share/schema";

export function compileMotionTokens(motion: Choices["motion"]): string {
  if (motion.library === "none") {
    return `
Motion Choreography:
- Animation Library: None (zero JavaScript animation runtime).
- Transitions: Strictly limited to instant CSS color shifts (transition: color 150ms ease, background-color 150ms ease).
- Accessibility: Pre-emptively satisfies prefers-reduced-motion: reduce without degradation.
`.trim();
  }

  const libMap = {
    "css-only": "Pure CSS transitions and keyframes with zero external animation dependencies.",
    "framer-motion": "Framer Motion (v11) declarative orchestrations with layout animations and AnimatePresence.",
    gsap: "GSAP (GreenSock) with ScrollTrigger plugin for synchronized timeline animations.",
    lenis: "Lenis smooth virtual scroll for buttery viewport inertia.",
    threejs: "Three.js WebGL canvas scene with interactive shaders and procedural camera paths.",
  };

  const curveMap = {
    none: "none",
    subtle: "cubic-bezier(0.16, 1, 0.3, 1) over 300ms (calm, precise luxury glide)",
    moderate: "cubic-bezier(0.25, 1, 0.5, 1) over 500ms (authoritative presence)",
    expressive: "cubic-bezier(0.34, 1.56, 0.64, 1) over 700ms with spring damping 18 and stiffness 120",
  };

  return `
Motion Choreography & Easing Physics:
- Primary Engine: ${libMap[motion.library]}
- Page Load Entrance: ${motion.pageLoadIntensity === "none" ? "Instant render" : `Staggered entrance: opacity 0 -> 1, translateY 16px -> 0px, easing: ${curveMap[motion.pageLoadIntensity]}`}
- Scroll-Triggered Reveals: ${motion.scrollIntensity === "none" ? "Standard static layout" : `Intersection-observer reveal: elements enter when 15% visible in viewport with ${curveMap[motion.scrollIntensity]}`}
- Hover Physics: ${motion.hoverIntensity === "none" ? "Static hover" : `Micro-interactions on interactive nodes execute with ${curveMap[motion.hoverIntensity]}`}
- Route / Modal Transitions: ${motion.transitionIntensity === "none" ? "Hard cuts" : `Cross-fade and scale transition executing with ${curveMap[motion.transitionIntensity]}`}
- Accessibility Requirement: You MUST wrap all animations in media query @media (prefers-reduced-motion: reduce) or Framer Motion's useReducedMotion(), collapsing durations to 0.01ms and eliminating all positional translation.
`.trim();
}

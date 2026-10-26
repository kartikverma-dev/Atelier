import { Choices } from "@/lib/share/schema";
import { compileStyleTokens } from "../mappings/style";
import { compileColorTokens } from "../mappings/color";
import { compileTypographyTokens } from "../mappings/typography";
import { compileLogoTokens } from "../mappings/logo";
import { compileBackgroundTokens } from "../mappings/background";
import { compileImageryTokens } from "../mappings/imagery";
import { compileLayoutTokens } from "../mappings/layout";
import { compileComponentTokens } from "../mappings/components";
import { compileMotionTokens } from "../mappings/motion";
import { compileBehaviorTokens } from "../mappings/behavior";
import { compileTechTokens } from "../mappings/tech";
import { getDeterministicUniquenessConstraint } from "../mappings/uniqueness";
import { BRAND } from "@/config/brand";

export interface PromptSection {
  id: string;
  title: string;
  body: string;
  why: string;
}

export interface CompilerOptions {
  stripWhyComments?: boolean;
}

export function compileWebsitePrompt(
  choices: Choices,
  options?: CompilerOptions
): {
  sections: PromptSection[];
  text: string;
} {
  const style = compileStyleTokens(
    choices.uiStyle,
    choices.typography,
    choices.motion,
    choices.color
  );
  const colorData = compileColorTokens(choices.color);
  const typeData = compileTypographyTokens(choices.typography);
  const logoData = compileLogoTokens(
    choices.logo,
    choices.content.brandName,
    choices.color,
    choices.typography,
    choices.behavior.pwa
  );
  const bgData = compileBackgroundTokens(
    choices.background,
    choices.color.background,
    choices.color.accent
  );
  const imgData = compileImageryTokens(choices.imagery);
  // Canonical unified section list between Layout and Content
  const canonicalSections = choices.content.sections;
  const layoutData = compileLayoutTokens(choices.layout, canonicalSections);
  const componentData = compileComponentTokens(choices.components, choices.color.accent);
  const motionData = compileMotionTokens(choices.motion);
  const behaviorData = compileBehaviorTokens(choices.behavior);
  const techData = compileTechTokens(choices.tech, "website");
  const uniquenessConstraint = choices.uniquenessBoost
    ? getDeterministicUniquenessConstraint(choices.seed)
    : "";

  const sections: PromptSection[] = [
    {
      id: "overview",
      title: "1. Overview & Creative Directive",
      why: "Establishes product scope, audience target, and core brand personality so the AI adopts the correct design posture immediately.",
      body: `You are an elite principal product designer and senior front-end engineer building a production-ready website for "${choices.content.brandName}".

Primary Purpose: ${choices.goal.purpose}
Intended Target Audience: ${choices.goal.audience}
Emotional Resonance / Feeling: ${choices.goal.feelingWords.join(" • ")}
Aesthetic Discipline: ${style.aestheticSummary}
${choices.uniquenessBoost ? `Signature Unique Detail (Seed #${choices.seed}): ${uniquenessConstraint}` : ""}
${choices.content.unusualDetail ? `Client Signature Touch: "${choices.content.unusualDetail}"` : ""}`,
    },
    {
      id: "design-system",
      title: "2. Design System & Tokens",
      why: "Gives the AI exact mathematical values (hex codes, fonts, scales) rather than vague adjectives that produce generic outputs.",
      body: `Implement a rigid, deterministic design system based on these exact tokens:

Style Baseline: ${choices.uiStyle} (${style.headingTone})
Materiality: ${style.materiality}

${colorData.tokenBlock}

${typeData.spec}

${bgData}

Elevation & Layering Rules:
- ${style.shadowRule}
- Borders: ${style.borderRule}
- Radii: ${style.borderRadiusRule}
- Spacing Philosophy: ${style.spacingPhilosophy}`,
    },
    {
      id: "brand-logo",
      title: "3. Brand Mark, Logo & Icon Set",
      why: "A logo and icon set is the most recognizable part of a site. Exact sizes, colors and files stop the AI from inventing a generic mark.",
      body: `${logoData}`,
    },
    {
      id: "layout-grid",
      title: "4. Layout & Grid Architecture",
      why: "Prevents awkward layouts, unbalanced containers, and poorly aligned elements across screen sizes.",
      body: `${layoutData}`,
    },
    {
      id: "imagery",
      title: "5. Imagery & Visual Assets",
      why: "Defines concrete rules for aspect ratios, masks, and loading attributes so visuals reinforce rather than compromise the design.",
      body: `${imgData}`,
    },
    {
      id: "components",
      title: "6. Component Specifications & Micro-Interactions",
      why: "Ensures buttons, cards, forms, and icons feel tactile, cohesive, and follow unified hover and active states.",
      body: `${componentData}`,
    },
    {
      id: "motion",
      title: "7. Motion Choreography & Transitions",
      why: "Guarantees smooth, tasteful animations with exact easing curves while enforcing reduced-motion accessibility.",
      body: `${motionData}`,
    },
    {
      id: "responsive-pwa",
      title: "8. Responsive Behavior & Platform Support",
      why: "Enforces proper mobile touch targets, viewport scaling, dark mode mechanics, and offline capabilities.",
      body: `${behaviorData}`,
    },
    {
      id: "tech-stack",
      title: "9. Tech Stack & File Architecture",
      why: "Prevents the AI from inventing unnecessary libraries, using deprecated patterns, or creating chaotic file structures.",
      body: `${techData}`,
    },
    {
      id: "content",
      title: "10. Content, Copy & Tone of Voice",
      why: "Eliminates placeholder lorem ipsum and infuses authentic copy aligned with the brand's tone of voice.",
      body: `Brand Name: ${choices.content.brandName}
Tagline: ${choices.content.tagline}
Tone of Voice: ${choices.content.toneOfVoice}

Key Copy Fragments to Integrate:
"${choices.content.realCopy}"

Primary Content Sections (Unified with Layout Architecture):
${canonicalSections.map((sec, idx) => `${idx + 1}. [${sec}]`).join("\n")}`,
    },
    {
      id: "quality-checklist",
      title: "11. Verification Checklist",
      why: "A required verification pass the AI must execute before considering the code complete.",
      body: `Before delivering your code, you MUST verify each of the following criteria:
[ ] 1. Responsive verification: Test layout at 375px (mobile), 768px (tablet), and 1280px (desktop). Zero horizontal scroll.
[ ] 2. Contrast verification: Body copy text must meet or exceed 4.5:1 WCAG AA contrast ratio against its canvas background.
[ ] 3. Keyboard navigation: All buttons, links, and form fields must possess visible :focus-visible outline indicators.
[ ] 4. Reduced-motion compliance: Every animation must collapse gracefully under @media (prefers-reduced-motion: reduce).
[ ] 5. Performance / CLS: Every image element must define explicit width and height attributes to prevent layout shift.
[ ] 6. Zero console errors or unhandled warnings in developer tools.
[ ] 7. Lighthouse target scores: 95+ on Performance, Accessibility, Best Practices, and SEO.
[ ] 8. Logo contrast verification: Verify logo mark and lettering achieve at least 3:1 contrast against the navbar background in both light and dark themes.
[ ] 9. Logo rendering & CLS: Ensure SVG logo is crisp at 1x and 2x viewports, favicon is legible at 16px and 32px, and navbar logo does not shift layout on load.`,
    },
    {
      id: "do-nots",
      title: "12. Explicit Prohibitions (Do-Nots)",
      why: "Hard constraints that prevent common AI failure modes (lorem ipsum, default styles, bloated packages).",
      body: `DO NOT violate any of the following constraints under any circumstance:
- DO NOT use lorem ipsum, Latin text, or "Lorem ipsum dolor sit amet" under any circumstance. Use contextually relevant, realistic content.
- DO NOT use stock placeholder text like "Click here", "Button label", or "Card title".
- DO NOT fall back to default framework colors or generic gray shades outside the user's palette. Use ONLY the user's design tokens defined above.
- DO NOT inject inline style tags (style="...") when a CSS variable, utility class, or theme token exists.
- DO NOT install or import unused packages or icon sets that bloat the bundle.
- DO NOT ignore mobile ergonomics: touch targets smaller than 44x44px are strictly prohibited.`,
    },
  ];

  const creditSuffix = BRAND.footerCreditUrl ? ` (${BRAND.footerCreditUrl})` : "";
  const footerCredit = `<!-- Generated deterministically by ${BRAND.name}${creditSuffix}. Version ${BRAND.version}, compiler ${BRAND.compilerVersion}. -->`;

  const renderedSections = sections.map((s) => {
    if (options?.stripWhyComments) {
      return `## ${s.title}\n\n${s.body}`;
    }
    return `## ${s.title}\n<!-- Why: ${s.why} -->\n\n${s.body}`;
  });

  const fullPromptText = `# Website Development Specification: ${choices.content.brandName}
Compiled via ${BRAND.name} prompt compiler (${BRAND.compilerVersion}, engine v${BRAND.version})
Seed: #${choices.seed} • Target: Website • Mode: ${choices.mode.toUpperCase()}

${renderedSections.join("\n\n---\n\n")}

---
${footerCredit}`;

  return { sections, text: fullPromptText };
}

import { Choices } from "@/lib/share/schema";
import { compileStyleTokens } from "../mappings/style";
import { compileColorTokens } from "../mappings/color";
import { compileTypographyTokens } from "../mappings/typography";
import { compileComponentTokens } from "../mappings/components";
import { compileMotionTokens } from "../mappings/motion";
import { compileBehaviorTokens } from "../mappings/behavior";
import { compileTechTokens } from "../mappings/tech";
import { getDeterministicUniquenessConstraint } from "../mappings/uniqueness";
import { BRAND } from "@/config/brand";
import { PromptSection, CompilerOptions } from "./website";

export function compileAppPrompt(
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
  const componentData = compileComponentTokens(choices.components, choices.color.accent);
  const motionData = compileMotionTokens(choices.motion);
  const behaviorData = compileBehaviorTokens(choices.behavior);
  const techData = compileTechTokens(choices.tech, "app");
  const uniquenessConstraint = choices.uniquenessBoost
    ? getDeterministicUniquenessConstraint(choices.seed)
    : "";

  const canonicalSections = choices.content.sections;

  const sections: PromptSection[] = [
    {
      id: "overview",
      title: "1. Overview & Application Scope",
      why: "Defines the app purpose, emotional signature, and high-level product intent.",
      body: `You are an expert mobile application architect and design technologist creating a world-class application for "${choices.content.brandName}".

App Purpose: ${choices.goal.purpose}
Primary Audience: ${choices.goal.audience}
Tactile & Emotional Feel: ${choices.goal.feelingWords.join(" • ")}
Design Philosophy: ${style.aestheticSummary}
${choices.uniquenessBoost ? `Signature Interaction Detail (Seed #${choices.seed}): ${uniquenessConstraint}` : ""}
${choices.content.unusualDetail ? `Client Signature Touch: "${choices.content.unusualDetail}"` : ""}`,
    },
    {
      id: "flows",
      title: "2. Users & Core User Journeys",
      why: "Ensures the AI implements complete end-to-end task flows rather than disconnected static screens.",
      body: `Key User Flows:
1. First Launch & Onboarding: Rapid welcome introducing core value in 3 screens with optimistic defaults.
2. Primary Action Loop: Main screen provides instant access to primary task (${canonicalSections[0] || "Dashboard"}), complete in 2 taps.
3. Detail & Deep Inspection: Fluid drill-down to item views with swipe-to-dismiss gesture and state persistence.
4. Settings & Offline Sync: Instant toggle for user preferences, offline storage review, and theme switching.`,
    },
    {
      id: "screens",
      title: "3. Application Screens & Views",
      why: "Specifies exact views so the app feels comprehensive and production-ready.",
      body: `Screen Registry (Unified with Navigation Architecture):
${canonicalSections.map((sec, i) => `Screen ${i + 1} - [${sec}]: Focus on information clarity, contextual actions, and pull-to-refresh.`).join("\n")}
- Global Modal Sheet: Contextual bottom sheet drawer for creation and editing workflows.
- Empty State & Error Views: Graceful empty illustrations, offline indicators, and one-tap retry actions.`,
    },
    {
      id: "navigation",
      title: "4. Mobile Navigation & Shell Architecture",
      why: "Enforces platform-native navigation paradigms (bottom tabs, top app bar, modal gestures) that feel native to iOS and Android.",
      body: `Navigation Architecture:
- Root Shell: Fixed ergonomic bottom tab bar (haptic feedback on tab switch, 48px height, badge indicators for unread items).
- Header Bar: Translucent top navigation bar with back chevron, title text in "${choices.typography.headingFont}", and contextual primary action button.
- Sheet Presentation: Modals presented as draggable bottom sheets with spring physics and backdrop dimming.
- Gestures: Standard edge-swipe gesture to navigate backwards.`,
    },
    {
      id: "state-data",
      title: "5. State Management & Data Architecture",
      why: "Guarantees offline reliability, reactive UI updates, and clean state persistence.",
      body: `State & Persistence Architecture:
- Client State: Zustand with local persistence (IndexedDB for web, AsyncStorage for native).
- Optimistic UI: Apply instant optimistic mutations with background sync and rollback on failure.
- Offline Strategy: Full local cache enabling core reading and editing tasks even without active network connection.`,
    },
    {
      id: "design-system",
      title: "6. Design System & Design Tokens",
      why: "Applies exact tokens to mobile UI components for brand consistency.",
      body: `Mobile Design Tokens:
Style Baseline: ${choices.uiStyle} (${style.headingTone})
Materiality: ${style.materiality}

${colorData.tokenBlock}

${typeData.spec}

Component & Control Specifications:
${componentData}`,
    },
    {
      id: "platform-behavior",
      title: "7. Platform & Offline Behavior",
      why: "Addresses native device features: safe areas, haptics, status bar, and service worker caching.",
      body: `Platform & Device Handling:
${techData}
- Safe Area Insets: Strictly respect env(safe-area-inset-top) and env(safe-area-inset-bottom) for notch and home indicator.
- Haptics: Subtle feedback on key toggles and item completions.
${behaviorData}`,
    },
    {
      id: "auth",
      title: "8. Authentication & Security (If Required)",
      why: "Specifies secure token storage and polite guest-mode exploration.",
      body: `Authentication Guidelines:
- Support frictionless guest mode allowing users to explore value before demanding account creation.
- Biometric and Passkey readiness with encrypted secure storage for credentials.`,
    },
    {
      id: "quality-checklist",
      title: "9. Mobile Verification Checklist",
      why: "Guarantees proper mobile QA before code delivery.",
      body: `Verify before finalizing the application code:
[ ] 1. Safe area compliance: UI elements never clip behind device notch, camera pill, or bottom home bar.
[ ] 2. Touch target compliance: All touchable elements are at least 44x44 points.
[ ] 3. Smooth scrolling: 60fps fluid list scrolling with virtualized lists for collections over 20 items.
[ ] 4. Dark mode compliance: Proper contrast in both light and dark appearances.
[ ] 5. Offline resilience: Core views display cached data without blank screens when disconnected.
[ ] 6. Zero memory leaks during screen push/pop transitions.`,
    },
    {
      id: "do-nots",
      title: "10. Explicit Mobile Prohibitions (Do-Nots)",
      why: "Eliminates anti-patterns common in AI-generated mobile applications.",
      body: `Mobile Prohibitions:
- DO NOT render web-style desktop scrollbars in mobile views.
- DO NOT use alert() or browser prompt() dialogs; use native dialogs or custom modal sheets.
- DO NOT hardcode pixel heights that break on different screen sizes (use flexbox and safe area padding).
- DO NOT use lorem ipsum text or placeholder nonsense.
- DO NOT create unresponsive touch targets that give zero press feedback.`,
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

  const fullPromptText = `# Mobile App Development Specification: ${choices.content.brandName}
Compiled via ${BRAND.name} prompt compiler (${BRAND.compilerVersion}, engine v${BRAND.version})
Seed: #${choices.seed} • Target: App • Mode: ${choices.mode.toUpperCase()}

${renderedSections.join("\n\n---\n\n")}

---
${footerCredit}`;

  return { sections, text: fullPromptText };
}

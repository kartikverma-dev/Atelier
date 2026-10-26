import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Choices, DEFAULT_CHOICES, UIStyle } from "@/lib/share/schema";
import { STEPS } from "@/data/steps";
import { PRESETS } from "@/data/presets";
import { PALETTES } from "@/data/palettes";
import { FONT_PAIRINGS } from "@/data/fonts";

export type DeviceMode = "phone" | "tablet" | "desktop";

export interface WizardStore {
  currentStepIndex: number;
  choices: Choices;
  deviceMode: DeviceMode;
  previewOpenMobile: boolean;

  // Actions
  setCurrentStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStepBySlug: (slug: string) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  setPreviewOpenMobile: (open: boolean) => void;

  updateChoices: (partial: Partial<Choices>) => void;
  updateNestedChoice: <K extends keyof Choices>(key: K, value: Partial<Choices[K]>) => void;
  setTarget: (target: "website" | "app") => void;
  setMode: (mode: "quick" | "advanced") => void;

  applyPreset: (presetId: string) => void;
  applySmartDefaultsForStyle: (style: UIStyle) => void;
  surpriseMe: (customSeed?: number) => void;
  resetAll: () => void;

  // Computed step helpers
  getVisibleSteps: () => typeof STEPS;
  isQuickMode: () => boolean;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      currentStepIndex: 0,
      choices: DEFAULT_CHOICES,
      deviceMode: "desktop",
      previewOpenMobile: false,

      setCurrentStepIndex: (index) => set({ currentStepIndex: index }),

      getVisibleSteps: () => {
        const { choices } = get();
        if (choices.mode === "quick") {
          return STEPS.filter((s) => s.quickMode);
        }
        return STEPS;
      },

      isQuickMode: () => get().choices.mode === "quick",

      nextStep: () => {
        const visible = get().getVisibleSteps();
        const current = get().currentStepIndex;
        if (current < visible.length - 1) {
          set({ currentStepIndex: current + 1 });
        }
      },

      prevStep: () => {
        const current = get().currentStepIndex;
        if (current > 0) {
          set({ currentStepIndex: current - 1 });
        }
      },

      goToStepBySlug: (slug) => {
        const visible = get().getVisibleSteps();
        const idx = visible.findIndex((s) => s.slug === slug);
        if (idx !== -1) {
          set({ currentStepIndex: idx });
        } else {
          // If not in quick mode visible list, switch to advanced mode and find it
          set((state) => ({
            choices: { ...state.choices, mode: "advanced" },
            currentStepIndex: STEPS.findIndex((s) => s.slug === slug) || 0,
          }));
        }
      },

      setDeviceMode: (mode) => set({ deviceMode: mode }),
      setPreviewOpenMobile: (open) => set({ previewOpenMobile: open }),

      updateChoices: (partial) =>
        set((state) => ({
          choices: { ...state.choices, ...partial },
        })),

      updateNestedChoice: (key, value) =>
        set((state) => ({
          choices: {
            ...state.choices,
            [key]: {
              ...(typeof state.choices[key] === "object" ? state.choices[key] : {}),
              ...value,
            },
          },
        })),

      setTarget: (target) =>
        set((state) => ({
          choices: {
            ...state.choices,
            target,
            // Adjust layout columns for app vs website
            layout: {
              ...state.choices.layout,
              columns: target === "app" ? 4 : 12,
              containerWidth: target === "app" ? "narrow" : "wide",
            },
          },
        })),

      setMode: (mode) =>
        set((state) => ({
          choices: { ...state.choices, mode },
          currentStepIndex: 0,
        })),

      applyPreset: (presetId) => {
        const preset = PRESETS.find((p) => p.id === presetId);
        if (preset) {
          set({
            choices: { ...preset.data },
            currentStepIndex: 0,
          });
        }
      },

      applySmartDefaultsForStyle: (style) => {
        set((state) => {
          let paletteId = "atelier-signature";
          let pairingId = "cormorant-inter";
          let buttonShape: "sharp" | "subtle-round" | "pill" = "subtle-round";
          let cardStyle: "border-only" | "subtle-elevated" | "frosted-glass" | "tinted-flat" | "deep-shadow" = "border-only";
          let shadowStyle: "none" | "crisp" | "soft" | "deep" = "soft";
          let borderRadiusScale: "none" | "subtle" | "medium" | "large" | "full" = "subtle";
          let motionLibrary: "none" | "css-only" | "framer-motion" | "gsap" | "lenis" | "threejs" = "framer-motion";
          let bgType: "solid" | "gradient" | "noise" | "image" | "video" | "animated-3d" | "pattern" = "noise";

          let logoType: "wordmark" | "monogram" | "symbol-wordmark" | "badge" = "symbol-wordmark";
          let letteringStyle = "heading-font";
          let letterCase: "normal" | "uppercase" | "small-caps" = "uppercase";
          let tracking: "tight" | "normal" | "wide" = "wide";
          let colorUse: "single-color" | "two-color" | "auto-palette" = "two-color";
          let navbarHeight: 24 | 28 | 32 | 40 = 28;

          switch (style) {
            case "dark-luxury":
              paletteId = "midnight-executive";
              pairingId = "cormorant-inter";
              buttonShape = "sharp";
              cardStyle = "border-only";
              shadowStyle = "none";
              borderRadiusScale = "subtle";
              motionLibrary = "framer-motion";
              bgType = "noise";
              logoType = "symbol-wordmark";
              letteringStyle = "heading-font";
              letterCase = "uppercase";
              tracking = "wide";
              colorUse = "two-color";
              navbarHeight = 28;
              break;
            case "minimal":
              paletteId = "atelier-signature";
              pairingId = "inter-inter";
              buttonShape = "sharp";
              cardStyle = "border-only";
              shadowStyle = "none";
              borderRadiusScale = "none";
              motionLibrary = "css-only";
              bgType = "solid";
              logoType = "wordmark";
              letteringStyle = "heading-font";
              letterCase = "uppercase";
              tracking = "wide";
              colorUse = "single-color";
              navbarHeight = 24;
              break;
            case "editorial":
              paletteId = "editorial-terracotta";
              pairingId = "fraunces-inter";
              buttonShape = "subtle-round";
              cardStyle = "border-only";
              shadowStyle = "soft";
              borderRadiusScale = "subtle";
              motionLibrary = "framer-motion";
              bgType = "noise";
              logoType = "wordmark";
              letteringStyle = "high-contrast-serif";
              letterCase = "uppercase";
              tracking = "wide";
              colorUse = "single-color";
              navbarHeight = 28;
              break;
            case "brutalist":
              paletteId = "brutalist-mono";
              pairingId = "syne-spacegrotesk";
              buttonShape = "sharp";
              cardStyle = "border-only";
              shadowStyle = "crisp";
              borderRadiusScale = "none";
              motionLibrary = "css-only";
              bgType = "pattern";
              logoType = "monogram";
              letteringStyle = "monospace";
              letterCase = "uppercase";
              tracking = "tight";
              colorUse = "single-color";
              navbarHeight = 32;
              break;
            case "glassmorphism":
              paletteId = "frosted-glass-aurora";
              pairingId = "playfair-jakarta";
              buttonShape = "pill";
              cardStyle = "frosted-glass";
              shadowStyle = "soft";
              borderRadiusScale = "large";
              motionLibrary = "framer-motion";
              bgType = "gradient";
              logoType = "symbol-wordmark";
              letteringStyle = "heading-font";
              letterCase = "uppercase";
              tracking = "wide";
              colorUse = "two-color";
              navbarHeight = 28;
              break;
            case "corporate-clean":
              paletteId = "saas-velocity";
              pairingId = "cabinet-satoshi";
              buttonShape = "subtle-round";
              cardStyle = "subtle-elevated";
              shadowStyle = "soft";
              borderRadiusScale = "medium";
              motionLibrary = "framer-motion";
              bgType = "gradient";
              logoType = "symbol-wordmark";
              letteringStyle = "geometric-sans";
              letterCase = "normal";
              tracking = "normal";
              colorUse = "auto-palette";
              navbarHeight = 28;
              break;
            case "playful":
              paletteId = "solar-citrus";
              pairingId = "playfair-jakarta";
              buttonShape = "pill";
              cardStyle = "subtle-elevated";
              shadowStyle = "soft";
              borderRadiusScale = "full";
              motionLibrary = "framer-motion";
              bgType = "gradient";
              logoType = "badge";
              letteringStyle = "humanist-sans";
              letterCase = "normal";
              tracking = "normal";
              colorUse = "two-color";
              navbarHeight = 32;
              break;
            default:
              break;
          }

          const chosenPalette = PALETTES.find((p) => p.id === paletteId) || PALETTES[0];
          const chosenFont = FONT_PAIRINGS.find((f) => f.id === pairingId) || FONT_PAIRINGS[0];

          return {
            choices: {
              ...state.choices,
              uiStyle: style,
              color: {
                ...state.choices.color,
                paletteId: chosenPalette.id,
                primary: chosenPalette.primary,
                secondary: chosenPalette.secondary,
                accent: chosenPalette.accent,
                background: chosenPalette.background,
                surface: chosenPalette.surface,
                text: chosenPalette.text,
                mutedText: chosenPalette.mutedText,
                colorScheme: chosenPalette.theme === "both" ? "both" : chosenPalette.theme,
              },
              typography: {
                ...state.choices.typography,
                pairingId: chosenFont.id,
                headingFont: chosenFont.headingFont,
                bodyFont: chosenFont.bodyFont,
                monoFont: chosenFont.monoFont,
              },
              logo: {
                ...state.choices.logo,
                logoType,
                letteringStyle,
                letterCase,
                tracking,
                colorUse,
                navbarHeight,
              },
              background: {
                ...state.choices.background,
                type: bgType,
              },
              components: {
                ...state.choices.components,
                buttonShape,
                cardStyle,
                shadowStyle,
                borderRadiusScale,
              },
              motion: {
                ...state.choices.motion,
                library: motionLibrary,
              },
            },
          };
        });
      },

      surpriseMe: (customSeed) => {
        const seed = customSeed !== undefined ? customSeed : Math.floor(10000 + Math.random() * 90000);
        // Deterministic pseudo-random based on seed
        const pseudoRand = (offset: number) => {
          const x = Math.sin(seed + offset) * 10000;
          return x - Math.floor(x);
        };

        const styles: UIStyle[] = [
          "minimal",
          "editorial",
          "brutalist",
          "glassmorphism",
          "dark-luxury",
          "corporate-clean",
          "playful",
        ];
        const chosenStyle = styles[Math.floor(pseudoRand(1) * styles.length)];
        const chosenPalette = PALETTES[Math.floor(pseudoRand(2) * PALETTES.length)];
        const chosenFont = FONT_PAIRINGS[Math.floor(pseudoRand(3) * FONT_PAIRINGS.length)];

        set((state) => ({
          choices: {
            ...state.choices,
            seed,
            uiStyle: chosenStyle,
            color: {
              ...state.choices.color,
              paletteId: chosenPalette.id,
              primary: chosenPalette.primary,
              secondary: chosenPalette.secondary,
              accent: chosenPalette.accent,
              background: chosenPalette.background,
              surface: chosenPalette.surface,
              text: chosenPalette.text,
              mutedText: chosenPalette.mutedText,
              colorScheme: chosenPalette.theme === "both" ? "both" : chosenPalette.theme,
            },
            typography: {
              ...state.choices.typography,
              pairingId: chosenFont.id,
              headingFont: chosenFont.headingFont,
              bodyFont: chosenFont.bodyFont,
              monoFont: chosenFont.monoFont,
            },
            uniquenessBoost: true,
          },
        }));
      },

      resetAll: () =>
        set({
          choices: DEFAULT_CHOICES,
          currentStepIndex: 0,
        }),
    }),
    {
      name: "atelier_wizard_store_v1",
      partialize: (state) => ({
        choices: state.choices,
        currentStepIndex: state.currentStepIndex,
        deviceMode: state.deviceMode,
      }),
    }
  )
);

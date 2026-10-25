import { Choices } from "@/lib/share/schema";
import { compileWebsitePrompt, PromptSection, CompilerOptions } from "./templates/website";
import { compileAppPrompt } from "./templates/app";
import { detectConflicts, DesignConflict } from "./conflicts";

export interface CompileResult {
  sections: PromptSection[];
  text: string;
  conflicts: DesignConflict[];
  target: "website" | "app";
  seed: number;
}

/**
 * Pure deterministic template compiler.
 * Same choices in, same prompt out, every time.
 */
export function compile(
  choices: Choices,
  target?: "website" | "app",
  options?: CompilerOptions
): CompileResult {
  const effectiveTarget = target || choices.target || "website";
  const conflicts = detectConflicts(choices);

  const compiled =
    effectiveTarget === "app"
      ? compileAppPrompt(choices, options)
      : compileWebsitePrompt(choices, options);

  return {
    sections: compiled.sections,
    text: compiled.text,
    conflicts,
    target: effectiveTarget,
    seed: choices.seed,
  };
}

export * from "./conflicts";
export * from "./mappings/style";
export * from "./mappings/color";
export * from "./mappings/typography";
export * from "./mappings/layout";
export * from "./mappings/components";
export * from "./mappings/motion";
export * from "./mappings/background";
export * from "./mappings/imagery";
export * from "./mappings/tech";
export * from "./mappings/behavior";
export * from "./mappings/uniqueness";
export type { CompilerOptions, PromptSection };

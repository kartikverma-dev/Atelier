import LZString from "lz-string";
import { Choices, ChoicesSchema, DEFAULT_CHOICES } from "./schema";

export interface DecodeResult {
  success: boolean;
  choices: Choices;
  error?: string;
}

/**
 * Decodes compressed hash data and validates it against the Zod schema.
 * Rejects invalid or corrupted share links gracefully without crashing.
 */
export function decodeHashToChoices(hashString: string): DecodeResult {
  if (!hashString || typeof hashString !== "string") {
    return { success: false, choices: DEFAULT_CHOICES, error: "Empty hash string" };
  }

  // Strip leading '#' or '#data=' or 'data='
  let cleanHash = hashString.startsWith("#") ? hashString.slice(1) : hashString;
  if (cleanHash.startsWith("data=")) {
    cleanHash = cleanHash.slice(5);
  }

  if (!cleanHash) {
    return { success: false, choices: DEFAULT_CHOICES, error: "Empty payload in hash" };
  }

  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(cleanHash);
    if (!decompressed) {
      // Fallback: try raw JSON in case it was not compressed
      try {
        const rawObj = JSON.parse(decodeURIComponent(cleanHash));
        const parsed = ChoicesSchema.safeParse(rawObj);
        if (parsed.success) {
          return { success: true, choices: parsed.data };
        }
      } catch {
        // Not raw JSON
      }
      return { success: false, choices: DEFAULT_CHOICES, error: "Decompression returned empty result" };
    }

    const parsedJson = JSON.parse(decompressed);
    const validationResult = ChoicesSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      return {
        success: false,
        choices: DEFAULT_CHOICES,
        error: `Validation error: ${validationResult.error.issues.map((i) => i.message).join(", ")}`,
      };
    }

    return {
      success: true,
      choices: validationResult.data,
    };
  } catch (err) {
    return {
      success: false,
      choices: DEFAULT_CHOICES,
      error: err instanceof Error ? err.message : "Malformed hash string",
    };
  }
}

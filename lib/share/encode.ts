import LZString from "lz-string";
import { Choices, ChoicesSchema } from "./schema";

/**
 * Encodes choices into a safe, compressed URL hash string.
 */
export function encodeChoicesToHash(choices: Choices): string {
  try {
    const validated = ChoicesSchema.parse(choices);
    const jsonStr = JSON.stringify(validated);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    return compressed;
  } catch (err) {
    console.error("Failed to encode choices:", err);
    return "";
  }
}

/**
 * Builds a complete shareable URL with the choices encoded in the hash.
 */
export function createShareUrl(choices: Choices, baseUrl?: string): string {
  const hash = encodeChoicesToHash(choices);
  const base = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/wizard#data=${hash}`;
}

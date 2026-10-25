import { describe, it, expect } from "vitest";
import { encodeChoicesToHash, createShareUrl } from "@/lib/share/encode";
import { decodeHashToChoices } from "@/lib/share/decode";
import { DEFAULT_CHOICES, Choices } from "@/lib/share/schema";
import { PRESETS } from "@/data/presets";

describe("Atelier Share Link Encoder & Decoder", () => {
  it("encodes and decodes default choices successfully (round-trip)", () => {
    const hash = encodeChoicesToHash(DEFAULT_CHOICES);
    expect(hash.length).toBeGreaterThan(10);

    const result = decodeHashToChoices(hash);
    expect(result.success).toBe(true);
    expect(result.choices.target).toBe(DEFAULT_CHOICES.target);
    expect(result.choices.uiStyle).toBe(DEFAULT_CHOICES.uiStyle);
    expect(result.choices.color.primary).toBe(DEFAULT_CHOICES.color.primary);
    expect(result.choices.typography.headingFont).toBe(DEFAULT_CHOICES.typography.headingFont);
    expect(result.choices.seed).toBe(DEFAULT_CHOICES.seed);
  });

  it("handles URLs containing hash prefixes gracefully", () => {
    const hash = encodeChoicesToHash(DEFAULT_CHOICES);
    const withHash = `#${hash}`;
    const withDataPrefix = `#data=${hash}`;

    expect(decodeHashToChoices(withHash).success).toBe(true);
    expect(decodeHashToChoices(withDataPrefix).success).toBe(true);
  });

  it("round-trips all 8 presets with zero data loss", () => {
    for (const preset of PRESETS) {
      const hash = encodeChoicesToHash(preset.data);
      const res = decodeHashToChoices(hash);
      expect(res.success).toBe(true);
      expect(res.choices.uiStyle).toBe(preset.data.uiStyle);
      expect(res.choices.color.primary).toBe(preset.data.color.primary);
      expect(res.choices.content.brandName).toBe(preset.data.content.brandName);
    }
  });

  it("gracefully rejects corrupted or malformed hash without crashing", () => {
    const corrupt1 = decodeHashToChoices("!invalid-junk-data-XYZ");
    expect(corrupt1.success).toBe(false);
    expect(corrupt1.choices).toBeDefined();

    const corrupt2 = decodeHashToChoices("");
    expect(corrupt2.success).toBe(false);

    const corrupt3 = decodeHashToChoices("#data=completely_broken_payload");
    expect(corrupt3.success).toBe(false);
  });

  it("generates a full share url with origin", () => {
    const url = createShareUrl(DEFAULT_CHOICES, "https://atelier.design");
    expect(url.startsWith("https://atelier.design/wizard#data=")).toBe(true);
  });
});

import React from "react";
import { BRAND } from "@/config/brand";

export interface LogoProps {
  variant?: "horizontal" | "stacked" | "mark";
  tone?: "auto" | "light" | "dark" | "mono";
  weight?: "auto" | "fine" | "sturdy";
  height?: number;
  width?: number;
  className?: string;
  alt?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

export const LOGO_ASPECT_RATIOS = {
  horizontal: 1399 / 319,
  stacked: 792 / 561,
  mark: 1,
};

/**
 * Resolves whether to use "fine" or "sturdy" weight based on rendered size and theme.
 * - Horizontal: sturdy below 48px, fine at/above 48px (below 80px in dark mode).
 * - Stacked: sturdy below 260px wide, fine at/above 260px (below 360px wide in dark mode).
 * - Mark: sturdy below 48px tall, fine at/above 48px.
 */
export function resolveLogoWeight({
  weight = "auto",
  variant = "horizontal",
  height,
  width,
  theme,
}: {
  weight?: "auto" | "fine" | "sturdy";
  variant?: "horizontal" | "stacked" | "mark";
  height: number;
  width: number;
  theme: "light" | "dark";
}): "fine" | "sturdy" {
  if (weight === "fine") return "fine";
  if (weight === "sturdy") return "sturdy";

  if (theme === "dark") {
    if (variant === "horizontal") {
      return height < 80 ? "sturdy" : "fine";
    }
    if (variant === "stacked") {
      return width < 360 ? "sturdy" : "fine";
    }
    if (variant === "mark") {
      return height < 48 ? "sturdy" : "fine";
    }
  }

  // Light theme (or default auto)
  if (variant === "horizontal") {
    return height < 48 ? "sturdy" : "fine";
  }
  if (variant === "stacked") {
    return width < 260 ? "sturdy" : "fine";
  }
  if (variant === "mark") {
    return height < 48 ? "sturdy" : "fine";
  }

  return "fine";
}

function getAssetSrc(
  variant: "horizontal" | "stacked" | "mark",
  toneKey: "light" | "dark" | "monoBlack" | "monoWhite",
  weightResolved: "fine" | "sturdy"
): string {
  const assets = BRAND.logo[variant];
  if (weightResolved === "sturdy" && assets.sturdy) {
    return assets.sturdy[toneKey];
  }
  return assets[toneKey];
}

export function Logo({
  variant = "horizontal",
  tone = "auto",
  weight = "auto",
  height: heightProp,
  width: widthProp,
  className = "",
  alt,
  "aria-hidden": ariaHiddenProp,
}: LogoProps) {
  const aspectRatio = LOGO_ASPECT_RATIOS[variant] || 1;

  let width: number;
  let height: number;

  if (widthProp != null && heightProp != null) {
    width = widthProp;
    height = heightProp;
  } else if (widthProp != null) {
    width = widthProp;
    height = Math.round(widthProp / aspectRatio);
  } else {
    height = heightProp ?? 28;
    width = Math.round(height * aspectRatio);
  }

  const isAriaHidden = ariaHiddenProp === true || ariaHiddenProp === "true" || alt === "";
  const resolvedAlt = isAriaHidden ? "" : (alt ?? BRAND.name);

  // Common image styling to prevent stroke thinning and visual artifacts
  const imgStyle: React.CSSProperties = {
    width,
    height,
    imageRendering: "auto",
    // @ts-ignore
    shapeRendering: "geometricPrecision",
  };

  if (tone === "light") {
    const resolvedWeight = resolveLogoWeight({ weight, variant, height, width, theme: "light" });
    const src = getAssetSrc(variant, "light", resolvedWeight);

    return (
      <div
        className={`logo inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={src}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block object-contain"
          style={imgStyle}
          loading="eager"
        />
      </div>
    );
  }

  if (tone === "dark") {
    const resolvedWeight = resolveLogoWeight({ weight, variant, height, width, theme: "dark" });
    const src = getAssetSrc(variant, "dark", resolvedWeight);

    return (
      <div
        className={`logo inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={src}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block object-contain"
          style={imgStyle}
          loading="eager"
        />
      </div>
    );
  }

  if (tone === "mono") {
    const lightWeight = resolveLogoWeight({ weight, variant, height, width, theme: "light" });
    const darkWeight = resolveLogoWeight({ weight, variant, height, width, theme: "dark" });
    const lightSrc = getAssetSrc(variant, "monoBlack", lightWeight);
    const darkSrc = getAssetSrc(variant, "monoWhite", darkWeight);

    return (
      <div
        className={`logo inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={lightSrc}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block dark:hidden object-contain"
          style={imgStyle}
          loading="eager"
        />
        <img
          src={darkSrc}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="hidden dark:block object-contain"
          style={imgStyle}
          loading="eager"
        />
      </div>
    );
  }

  // tone === "auto" (default)
  const lightWeight = resolveLogoWeight({ weight, variant, height, width, theme: "light" });
  const darkWeight = resolveLogoWeight({ weight, variant, height, width, theme: "dark" });
  const lightSrc = getAssetSrc(variant, "light", lightWeight);
  const darkSrc = getAssetSrc(variant, "dark", darkWeight);

  return (
    <div
      className={`logo inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width, height }}
    >
      <img
        src={lightSrc}
        alt={resolvedAlt}
        aria-hidden={isAriaHidden ? "true" : undefined}
        width={width}
        height={height}
        className="block dark:hidden object-contain"
        style={imgStyle}
        loading="eager"
      />
      <img
        src={darkSrc}
        alt={resolvedAlt}
        aria-hidden={isAriaHidden ? "true" : undefined}
        width={width}
        height={height}
        className="hidden dark:block object-contain"
        style={imgStyle}
        loading="eager"
      />
    </div>
  );
}

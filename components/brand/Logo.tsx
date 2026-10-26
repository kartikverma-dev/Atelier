import React from "react";
import { BRAND } from "@/config/brand";

export interface LogoProps {
  variant?: "horizontal" | "stacked" | "mark";
  tone?: "auto" | "light" | "dark" | "mono";
  height?: number;
  className?: string;
  alt?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

const ASPECT_RATIOS = {
  horizontal: 1399 / 319,
  stacked: 792 / 561,
  mark: 1,
};

export function Logo({
  variant = "horizontal",
  tone = "auto",
  height = 28,
  className = "",
  alt,
  "aria-hidden": ariaHiddenProp,
}: LogoProps) {
  const width = Math.round(height * (ASPECT_RATIOS[variant] || 1));
  const isAriaHidden = ariaHiddenProp === true || ariaHiddenProp === "true" || alt === "";
  const resolvedAlt = isAriaHidden ? "" : (alt ?? BRAND.name);

  const assets = BRAND.logo[variant];

  if (tone === "light") {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={assets.light}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block object-contain"
          style={{ width, height }}
          loading="eager"
        />
      </div>
    );
  }

  if (tone === "dark") {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={assets.dark}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block object-contain"
          style={{ width, height }}
          loading="eager"
        />
      </div>
    );
  }

  if (tone === "mono") {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width, height }}
      >
        <img
          src={assets.monoBlack}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="block dark:hidden object-contain"
          style={{ width, height }}
          loading="eager"
        />
        <img
          src={assets.monoWhite}
          alt={resolvedAlt}
          aria-hidden={isAriaHidden ? "true" : undefined}
          width={width}
          height={height}
          className="hidden dark:block object-contain"
          style={{ width, height }}
          loading="eager"
        />
      </div>
    );
  }

  // tone === "auto" (default)
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width, height }}
    >
      <img
        src={assets.light}
        alt={resolvedAlt}
        aria-hidden={isAriaHidden ? "true" : undefined}
        width={width}
        height={height}
        className="block dark:hidden object-contain"
        style={{ width, height }}
        loading="eager"
      />
      <img
        src={assets.dark}
        alt={resolvedAlt}
        aria-hidden={isAriaHidden ? "true" : undefined}
        width={width}
        height={height}
        className="hidden dark:block object-contain"
        style={{ width, height }}
        loading="eager"
      />
    </div>
  );
}

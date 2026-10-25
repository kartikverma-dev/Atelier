"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atelier-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

  const variants = {
    primary:
      "bg-atelier-text text-atelier-bg hover:opacity-90 shadow-sm border border-transparent",
    secondary:
      "bg-atelier-card text-atelier-text hover:bg-atelier-border/50 border border-atelier-border",
    outline:
      "bg-transparent text-atelier-text border border-atelier-border hover:border-atelier-text hover:bg-atelier-text/5",
    ghost:
      "bg-transparent text-atelier-muted hover:text-atelier-text hover:bg-atelier-text/5 border border-transparent",
    accent:
      "bg-atelier-accent text-atelier-ink font-semibold hover:bg-atelier-accent-hover shadow-soft border border-transparent",
  };

  const sizes = {
    sm: "h-9 px-3.5 text-xs rounded-sm tracking-wide gap-1.5",
    md: "h-11 px-5 text-sm rounded-sm tracking-wide gap-2",
    lg: "h-13 px-7 text-base rounded-sm tracking-wide gap-2.5",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}

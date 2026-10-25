"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("atelier_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("atelier_theme", "light");
    }
  };

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-atelier-border/50" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full border border-atelier-border hover:border-atelier-text/30 bg-atelier-surface transition-colors duration-200 text-atelier-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atelier-accent ${className || ""}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-atelier-accent" />
      ) : (
        <Moon className="w-4 h-4 text-atelier-muted hover:text-atelier-text" />
      )}
    </button>
  );
}

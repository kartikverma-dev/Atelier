import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: "var(--atelier-bg)",
          surface: "var(--atelier-surface)",
          card: "var(--atelier-card)",
          border: "var(--atelier-border)",
          subtle: "var(--atelier-subtle)",
          text: "var(--atelier-text)",
          muted: "var(--atelier-muted)",
          accent: "var(--atelier-accent)",
          "accent-hover": "var(--atelier-accent-hover)",
          gold: "#C8A97E",
          "gold-light": "#E2CEB0",
          "gold-dark": "#9E7B45",
          sand: "#F5F2EB",
          stone: "#EAE5D9",
          ink: "#11100F",
          charcoal: "#1A1918",
          darkborder: "#282624",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.02)",
        elevated: "0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        float: "0 20px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      letterSpacing: {
        editorial: "0.18em",
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};

export default config;

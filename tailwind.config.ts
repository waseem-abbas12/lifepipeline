import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        indigo: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          500: "#6366F1",
          600: "#4F46E5", // Electric Indigo primary accent
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        surface: {
          base: "#0B0F19",       // Deep Midnight Charcoal Base
          card: "#111827",       // Charcoal Card Surface
          elevated: "#1F2937",   // Elevated surface
          border: "#1F2937",     // Subtle border
          silver: "#F3F4F6",     // Clean White / Soft Silver Gray
          muted: "#9CA3AF",      // Muted silver text
        },
        traffic: {
          green: "#10B981",
          yellow: "#F59E0B",
          red: "#EF4444",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8b5000",
        "primary-container": "#ff9800",
        "on-primary-container": "#653900",
        secondary: "#5f5e5e",
        "tertiary-container": "#e0a800",
        "on-tertiary-container": "#584000",
        background: "#f9f9fa",
        surface: "#f9f9fa",
        "on-surface": "#1a1c1d",
        "on-surface-variant": "#554434",
        "surface-container-low": "#f3f3f4",
        "surface-container": "#eeeeef",
        "surface-container-high": "#e8e8e9",
        "outline-variant": "#dbc2ad",
        error: "#ba1a1a",
        darkSide: "#1e1e1e"
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      spacing: {
        gutter: "24px",
        sidebar: "280px"
      },
      boxShadow: {
        'industrial': '12px 12px 0px #4a0e1c',
      }
    },
  },
  plugins: [],
};
export default config;

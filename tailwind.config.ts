import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        church: {
          background: "#F2EFE6",
          surface: "#FFF8EC",
          surfaceWarm: "#E8D8C4",
          text: "#1A2F3A",
          muted: "#526873",
          border: "#C9BBA8",
          accent: "#1C6F8A",
          accentHover: "#154F64",
          accentSoft: "#D8EEF2",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

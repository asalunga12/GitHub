import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sprout: {
          green: "#00C853",
          dark: "#1A1A2E",
          blue: "#0066CC",
        },
      },
    },
  },
  plugins: [],
};

export default config;

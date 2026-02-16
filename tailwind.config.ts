import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36adf6",
          500: "#0c93e7",
          600: "#0074c5",
          700: "#015c9f",
          800: "#064e83",
          900: "#0a416d",
          950: "#072a49",
        },
        gold: {
          400: "#d4a54a",
          500: "#c4942a",
          600: "#a87a1e",
        },
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

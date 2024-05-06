import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jua: ["var(--jua-font)"],
        doHyeon: ["var(--doHyeon-font)"],
        notoKr: ["var(--notoKr-font)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
    nextui(),
  ],
};
export default config;

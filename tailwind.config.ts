import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [require("@tailwindcss/forms")],
};
export default config;

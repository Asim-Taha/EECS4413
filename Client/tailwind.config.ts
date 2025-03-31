import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#CE2225",
        logo:"#151D48",
        customred:"#bc1c2b",
        orange:"#FFA500",
        customyellow:"#FFFF00",
        customgreen:"#008000",
        blue:"#0000FF",
        indigo:"#4B0082",
        violet:"#EE82EE",
      },
    },
  },
  plugins: [],
} satisfies Config;

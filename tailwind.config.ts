import daisyui from "daisyui";
import flowbite from "flowbite-react/tailwind";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["pixelfont", "Helvetica Neue", "Helvetica", "Arial", "sans"],
        "msb-bold": [
          "alleyfont",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "nav-dropdown": "#141414",
        "card-bg": "#111217",
        "button-bg": "#23232b",
        "button-bg-hover": "#35373e",
        "tertiary-white": "hsla(0, 0%, 100%, .05)",
        "secondary-white": "hsla(0, 0%, 100%, .1)",
        "primary-white": "#4e4c4d",
        "light-grey": "#929292",
        "button-grey": "#333939",
        "button-grey-light": "#999999",
      },
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [daisyui, flowbite.plugin()],
};
export default config;

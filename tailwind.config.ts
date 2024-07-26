import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";



const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'hoodie': "url('/images/hoodie.png')",
        'bag': "url('/images/bag.png')",
        'accesories': "url('/images/accesories.png')",
        'painting': "url('/images/painting.png')",
        'notebooks': "url('/images/notebooks.png')",
        'tshirt': "url('/images/t-shirt.png')",

      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;


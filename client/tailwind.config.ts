/** @type {import('tailwindcss').Config} */
import { COLORS, FONTS } from "./theme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bowlby: FONTS.bowlby,
        chelsea: FONTS.chelsea,
      },
      backgroundColor: {
        b1: COLORS.b1,
        b2: COLORS.b2,
      },
      boxShadow: {
        // custom: "10px 10px 0px -1px rgba(0,0,0,1)",
        custom: "10px 10px 0px -1px white",
      },
    },
  },
  plugins: [],
};

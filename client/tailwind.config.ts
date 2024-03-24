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
    },
  },
  plugins: [],
};

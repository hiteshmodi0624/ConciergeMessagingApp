import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary:"#02366d",
        secondary:"#15182c"
      }
    },
  },
  plugins: [],
} satisfies Config;

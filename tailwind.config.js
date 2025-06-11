/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: { 
    "colors": {
      "blued": {
        50: "#E0E9FF",
        100: "#C2D3FF",
        200: "#80A4FF",
        300: "#4278FF",
        400: "#0048FF",
        500: "#0037C1",
        600: "#002B99",
        700: "#002175",
        800: "#00164D",
        900: "#000C29",
        950: "#000614"
      }
  }},
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"
   ],
  theme: {
    extend: {
      colors: {
        "col-red": "#FC4747",
        "col-dark": "#10141E",
        "col-icons": "#5A698F",
        "col-light": "#161D2F",

      },
    },
  },
  fontFamily: {
    outfit: ["Outfit", "sans-serif"],
  },
  plugins: [
  ],
};

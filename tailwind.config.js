const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        midnightBlue: "#0A139B",

        darkBlue: "#1A2557",
        regBlue: "#2415CD",
        champagne: "#F2E3CB",
        royalRed: "#AE3028",
        kingsGold: "#DFC640",

        background: "#FCF9F5",
        white: "#FFFEFB",
        accent: "#F8F4F0",
        darkAccent: "#AEAEC1",
        subtleText: "#656792",
      },

      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["Lora", "serif"],
      },

      // gridTemplateColumns: {
      //   // Simple 16 column grid
      //   16: "repeat(16, minmax(0, 1fr))",
      // },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["checked"],
      borderColor: ["checked"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

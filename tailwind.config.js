/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        wave: "url('/assets/svg/wave.svg')",
        "wave-top": "url('/assets/svg/wavetop.svg')",
      },
      animation: {
        wiggle: "wiggle 0.2s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

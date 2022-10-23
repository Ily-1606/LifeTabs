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
    },
  },
  plugins: [],
};

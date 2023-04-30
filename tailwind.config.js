/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/stdf/src/**/*.svelte"
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0B24FB",
        yellow: "#FFC043",
        primary: "#0B24FB", //同 blue
        dark: "#FFC043", //同 yellow
        purple: "#7356BF",
        green: "#05944F",
        orange: "#FF6937",
        black: "#09101D",
        gray1: "#23262B",
        gray2: "#2A2B2F",
        gray3: "#303239",
        gray4: "#373940",
        gray5: "#414249",
        gray6: "#747B84",
        gray7: "#DADEE3",
        gray8: "#EBEEF2",
        gray9: "#F4F6F9",
        gray10: "#FAFAFB",
        success: "#11BB8D",
        warning: "#B95000",
        error: "#DA1414",
        info: "#2E5AAC",
        current: "currentColor",
        transparent: "transparent"
      }
    }
  },
  plugins: [],
}

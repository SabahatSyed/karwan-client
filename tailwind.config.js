module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E72DB",
        primaryD: "#2862bf",
        primaryL: "#609FFF",
        secondary: "#262A41",
        tertiary: "#9D9FA0",
        background:"#171717",
        boxes1:"#1e3a8a",
        boxes2:"#34d399"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/Productivity/**/*.{js,ts,jsx,tsx}",
    "./src/components/landingPage/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      h1: { raw: "(min-height: 400px)" },
      h2: { raw: "(min-height: 600px)" },
      h3: { raw: "(min-height: 800px)" },
      h4: { raw: "(min-height: 900px)" },
    },

    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
      Roboto: ["Roboto, sans-serif"],
      Rubik: ["Rubik,sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
  prefix: "tw-",
};

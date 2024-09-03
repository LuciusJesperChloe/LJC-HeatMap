/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fadeIn: {
        "0%": {
          opacity: "0",
          transform: "translateY(-20px)",
          visibility: "hidden",
        },
        "1%": {
          visibility: "visible",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
          visibility: "visible",
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

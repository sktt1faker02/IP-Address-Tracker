/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* Colors */
      colors: {
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      fontWeight: {
        "fw-400": 400,
        "fw-500": 500,
        "fw-700": 700,
      },
    },
  },
  plugins: [],
};

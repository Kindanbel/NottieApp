/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nottieOrange: "#F5761a",
        nottieGray1: "#dbdbdb",
        nottieGray2: "#d2d2d2",
        nottieChocolate: "#714423",
        nottiePurple1: "#663399",
        nottieBlack: "#3d3d3d",
        nottieLightWhite: "#ffffff09"
      }
    },
  },
  plugins: [],
}


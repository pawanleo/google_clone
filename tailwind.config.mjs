/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGray: 'rgb(248, 249, 250)',
        whiteTransparent: 'rgba(255, 255, 255, 0.2)',
        slateGray:"rgb(32,33,36)",
        white:"#fff"
        
      },
      fontFamily: {
        googleSans: ['"Google Sans"', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'hover': '0 4px 14px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightGray: 'rgb(248, 249, 250)',
        whiteTransparent: 'rgba(255, 255, 255, 0.2)',
        slateGray:"rgb(32,33,36)",
        textGray:"rgb(95,99,104)",
        white:"#fff",
        linkBlue:"rgb(26,115,232)",
        audioText:"rgb(154, 160, 166)"
        
      },
      fontFamily: {
        googleSans: ['"Google Sans"', 'Roboto', 'Arial', 'sans-serif'],
        roboto:['"Roboto"', 'Arial', 'sans-serif'],
        arial:['"Arial"','sans-serif']
      },
    },
  },
  plugins: [],
};


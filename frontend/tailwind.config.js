/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#ffffff',
        primary: '#dc2626',
        quaternary: '#1f2937',
      }
    },
  },
  plugins: [],
}

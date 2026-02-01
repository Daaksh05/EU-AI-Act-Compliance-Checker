/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eu-blue": "#003399",
        "eu-light-blue": "#E7F0FF",
        "eu-gold": "#FFD700",
        "compliance": {
          "minimal": "#10B981",
          "limited": "#F59E0B",
          "high": "#EF4444",
          "prohibited": "#7C2D12",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'iam-dark': '#071426',
        'iam-blue': '#00BFFF',
        'iam-black': '#000000',
        'iam-gray': '#AAB2BD',
        'iam-white': '#FFFFFF',
        'iam-neon': '#00BFFF',
        'iam-gradient-start': '#071426',
        'iam-gradient-end': '#0a1f3a',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 191, 255, 0.3)',
        'neon-lg': '0 0 40px rgba(0, 191, 255, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 191, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 191, 255, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

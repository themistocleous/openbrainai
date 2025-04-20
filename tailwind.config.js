/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#6C63FF', // Custom primary color
            700: '#5A52D9', // Custom primary dark
            800: '#4338ca',
            900: '#3730a3',
          },
          secondary: {
            DEFAULT: '#FF6584', // Custom secondary color
          },
          accent: {
            DEFAULT: '#43D1AA', // Custom accent color
          },
        },
        boxShadow: {
          'custom-sm': '0 2px 10px rgba(0, 0, 0, 0.05)',
          'custom-md': '0 5px 20px rgba(0, 0, 0, 0.08)',
          'custom-lg': '0 10px 30px rgba(108, 99, 255, 0.15)',
        },
        borderRadius: {
          'custom-sm': '8px',
          'custom-md': '12px',
          'custom-lg': '20px',
        },
        animation: {
          'fade-in': 'fadeIn 0.8s ease forwards',
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          float: {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '50%': { transform: 'translate(15px, 15px) rotate(5deg)' },
            '100%': { transform: 'translate(0, 0) rotate(0deg)' },
          },
        },
      },
    },
    plugins: [],
  }
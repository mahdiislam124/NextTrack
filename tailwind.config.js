/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#138585', // Teal
          light: '#1a9e9e',
          dark: '#0f6b6b',
        },
        background: '#E0F8F8', // Very light cyan
        accent: '#77B5FE', // Soft sky blue
        surface: '#ffffff',
        text: {
          primary: '#1a202c',
          secondary: '#4a5568',
        }
      },
      fontFamily: {
        'sans': ['PT Sans', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(19, 133, 133, 0.1)',
        'medium': '0 4px 16px rgba(19, 133, 133, 0.15)',
      }
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-dark': '#2563EB',
        'primary-light': '#DBEAFE',
        secondary: '#1E3A8A',
        success: '#22C55E',
        warning: '#FACC15',
        error: '#EF4444',
        accent: '#DBEAFE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hover': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
      },
    },
  },
  plugins: [],
};
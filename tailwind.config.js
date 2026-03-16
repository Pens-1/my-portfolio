/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FBFF48',
        'neo-pink': '#FF70A6',
        'neo-green': '#33FF57',
        'neo-blue': '#3B82F6',
        'neo-purple': '#A855F7',
        'neo-orange': '#FF9F1C',
        'neo-black': '#0f0f0f',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

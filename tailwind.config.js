/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
      },
      fontFamily: {
        sans: ['Zen Kaku Gothic New', 'Archivo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Archivo', 'Zen Kaku Gothic New', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 日本語ディスプレイは負でなく「正の字間」+ ウェイト900 が強い（受賞サイト調査より）
        'display-2xl': ['clamp(2.15rem, 6.5vw, 6rem)', { lineHeight: '1.12', letterSpacing: '0.01em', fontWeight: '900' }],
        'display-xl': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '0.02em', fontWeight: '900' }],
        'display-lg': ['clamp(2.5rem, 5.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0.04em', fontWeight: '800' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '0.03em', fontWeight: '700' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zalo: {
          blue: '#0068ff',
          'blue-dark': '#0052cc',
          'blue-light': '#e8f4ff',
        },
        // ── Go Media Vietnam Brand Colors ─────────────────────────
        gomedia: {
          mint:   '#e4f3f3',   // nền nhạt / bg light
          navy:   '#0c2a72',   // xanh đậm chủ đạo
          purple: '#6025e1',   // tím accent
          peach:  '#ffc0a5',   // cam nhạt / highlight
          orange: '#fe5f01',   // cam đậm / CTA
        },
        sidebar: 'var(--color-sidebar)',
        'sidebar-hover': 'var(--color-sidebar-hover)',
        // ── CSS var aliases ───────────────────────────────────────
        brand:        'var(--color-brand)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-light':'var(--color-brand-light)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


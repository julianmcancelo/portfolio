/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel:   ['"Press Start 2P"', 'monospace'],
        vt:      ['"VT323"', 'monospace'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        neon:    '#C8FF00',
        cyan:    '#00FFFF',
        magenta: '#FF00C8',
        dim:     '#0A0A14',
      },
    },
  },
  plugins: [],
}

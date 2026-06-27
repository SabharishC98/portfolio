/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#050505',
        'bg-card': 'rgba(255,255,255,0.02)',
        'accent-purple': '#ffffff',
        'accent-cyan': '#777777',
        'text-primary': '#ffffff',
        'text-secondary': '#7f7f7f',
        'border-glow': 'rgba(255,255,255,0.1)',
        'card-border': 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'condensed': ['Bebas Neue', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 47, 190, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(123, 47, 190, 0.8), 0 0 60px rgba(0, 245, 255, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: [
    'bg-brand-500', 'bg-accent-500', 'bg-emerald-500', 'bg-rose-500', 'bg-violet-500', 'bg-amber-500',
    'bg-brand-50', 'bg-accent-50', 'bg-emerald-50', 'bg-rose-50', 'bg-violet-50', 'bg-amber-50',
    'text-brand-700', 'text-accent-700', 'text-emerald-700', 'text-rose-700', 'text-violet-700', 'text-amber-700',
    'text-brand-300', 'text-accent-300', 'text-emerald-300', 'text-rose-300', 'text-violet-300', 'text-amber-300',
    'text-brand-400', 'text-accent-400', 'text-emerald-400', 'text-rose-400', 'text-violet-400', 'text-amber-400',
    'text-brand-600', 'text-accent-600', 'text-emerald-600', 'text-rose-600', 'text-violet-600', 'text-amber-600',
    'bg-brand-500/10', 'bg-accent-500/10', 'bg-emerald-500/10', 'bg-rose-500/10', 'bg-violet-500/10', 'bg-amber-500/10',
    'border-brand-300', 'border-accent-300', 'border-emerald-300', 'border-rose-300', 'border-violet-300', 'border-amber-300',
    'border-brand-700', 'border-accent-700', 'border-emerald-700', 'border-rose-700', 'border-violet-700', 'border-amber-700',
    'from-brand-500', 'from-accent-500', 'from-emerald-500', 'from-rose-500', 'from-violet-500', 'from-amber-500',
    'to-brand-500', 'to-accent-500', 'to-emerald-500', 'to-rose-500', 'to-violet-500', 'to-amber-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdeff',
          300: '#8ec8ff',
          400: '#59a8ff',
          500: '#3385ff',
          600: '#1d66f5',
          700: '#1551e1',
          800: '#1843b6',
          900: '#1a3c8f',
          950: '#142657',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c8',
          400: '#8591a8',
          500: '#66738f',
          600: '#515c75',
          700: '#434b60',
          800: '#3a4152',
          900: '#1f2330',
          950: '#13161f',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(16,24,40,0.08), 0 8px 24px -4px rgba(16,24,40,0.06)',
        glow: '0 0 0 1px rgba(51,133,255,0.12), 0 8px 32px -8px rgba(51,133,255,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        scanline: {
          '0%, 100%': { top: '10%' },
          '50%': { top: '90%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

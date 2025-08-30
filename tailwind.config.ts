import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1200px',
        '2xl': '1320px'
      }
    },
    extend: {
      colors: {
        brand: {
          gold: '#d1a442'
        },
        slate: {
          soft: '#94A3B8'
        },
        'off-white': '#E2E8F0'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(1200px 600px at 50% -20%, rgba(199, 152, 51, 0.4), transparent 60%)',
        'grid-lines': 'linear-gradient(rgba(226,232,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.05) 1px, transparent 1px)',
        'noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`
      },
      keyframes: {
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(1%, -1%)' },
          '30%': { transform: 'translate(-2%, 1%)' },
          '40%': { transform: 'translate(3%, 2%)' },
          '50%': { transform: 'translate(2%, 0)' },
          '60%': { transform: 'translate(-3%, 1%)' },
          '70%': { transform: 'translate(2%, 3%)' },
          '80%': { transform: 'translate(-1%, -2%)' },
          '90%': { transform: 'translate(1%, 2%)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        timelineProgress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' }
        }
      },
      animation: {
        grain: 'grain 12s steps(10) infinite',
        marquee: 'marquee 30s linear infinite',
        'timeline-progress': 'timelineProgress 8s ease-in-out infinite'
      }
    }
  },
  plugins: []
}

export default config
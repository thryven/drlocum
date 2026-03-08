import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { screens } from '@/lib/breakpoints';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens,
    extend: {
      fontFamily: {
        body: ['"PT Sans"', 'sans-serif'],
        headline: ['"PT Sans"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        // Fluid Typography
        '.text-fluid-xs': { fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' },
        '.text-fluid-sm': { fontSize: 'clamp(0.8rem, 0.95vw, 0.95rem)' },
        '.text-fluid-base': { fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)' },
        '.text-fluid-lg': { fontSize: 'clamp(1rem, 1.2vw, 1.2rem)' },
        '.text-fluid-xl': { fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)' },
        '.text-fluid-input-label': { fontSize: 'clamp(0.8rem, 1vw, 1.2rem)' },
        '.text-fluid-input-value': { fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)' },
        '.text-fluid-unit': { fontSize: 'clamp(0.8rem, 1vw, 1rem)' },
        '.text-fluid-filter-label': { fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)' },
        '.text-fluid-filter-btn': { fontSize: 'clamp(0.8rem, 0.95vw, 0.95rem)' },
        '.text-fluid-clear-btn': { fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' },
        '.text-fluid-drug-name': { fontSize: 'clamp(0.8rem, 1vw, 1rem)' },
        '.text-fluid-drug-details': { fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)' },
        '.text-fluid-drug-badge': { fontSize: 'clamp(0.8rem, 1vw, 1rem)' },

        // Fluid Sizing
        '.h-fluid-input': { height: 'clamp(2.5rem, 3.5vw, 3rem)' },
        '.h-fluid-btn': { height: 'clamp(2.25rem, 3.2vw, 2.6rem)' },
        '.h-fluid-sm-btn': { height: 'clamp(2rem, 3vw, 2.25rem)' },
        '.w-fluid-toggle-btn': { minWidth: 'clamp(5rem, 7vw, 6rem)' },
        '.size-fluid-input-icon': { width: 'clamp(0.9rem, 1.2vw, 1.35rem)', height: 'clamp(0.9rem, 1.2vw, 1.35rem)' },
        '.size-fluid-icon-lg': { width: 'clamp(0.95rem, 1.3vw, 1.4rem)', height: 'clamp(0.95rem, 1.3vw, 1.4rem)' },
        '.size-fluid-filter-icon': { width: 'clamp(0.9rem, 1.2vw, 1rem)', height: 'clamp(0.9rem, 1.2vw, 1rem)' },
        '.size-fluid-clear-icon': { width: 'clamp(0.7rem, 1vw, 0.85rem)', height: 'clamp(0.7rem, 1vw, 0.85rem)' },
        '.size-fluid-drug-icon': { width: 'clamp(0.75rem, 1.2vw, 1rem)', height: 'clamp(0.75rem, 1.2vw, 1rem)' },
        
        // Fluid Spacing
        '.gap-fluid-sm': { gap: 'clamp(0.3rem, 0.6vw, 0.45rem)' },
        '.gap-fluid-base': { gap: 'clamp(0.35rem, 0.7vw, 0.6rem)' },
        '.gap-fluid-lg': { gap: 'clamp(0.35rem, 0.8vw, 0.6rem)' },
        '.space-y-fluid-input-field': { 'space-y': 'clamp(0.35rem, 0.6vw, 0.6rem)' },
        '.px-fluid-input': { paddingLeft: 'clamp(0.6rem, 1vw, 0.9rem)', paddingRight: 'clamp(0.6rem, 1vw, 0.9rem)' },
        '.pr-fluid-input-unit': { paddingRight: 'clamp(2.5rem, 4vw, 3.5rem)' },
        '.right-fluid-unit': { right: 'clamp(0.7rem, 1vw, 1rem)' },
        '.px-fluid-btn': { paddingLeft: 'clamp(0.6rem, 1.1vw, 0.9rem)', paddingRight: 'clamp(0.6rem, 1.1vw, 0.9rem)' },
        '.px-fluid-clear-btn': { paddingLeft: 'clamp(0.4rem, 0.8vw, 0.6rem)', paddingRight: 'clamp(0.4rem, 0.8vw, 0.6rem)' },
        '.mr-fluid-xs': { marginRight: 'clamp(0.2rem, 0.5vw, 0.35rem)' },
        '.px-fluid-drug-badge': { paddingLeft: 'clamp(0.75rem, 1.5vw, 1rem)', paddingRight: 'clamp(0.75rem, 1.5vw, 1rem)' },
        '.py-fluid-drug-badge': { paddingTop: 'clamp(0.25rem, 0.5vw, 0.375rem)', paddingBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' },

        // Page Layout
        '.p-fluid-page': { padding: 'clamp(1rem, 5vh, 1.5rem) clamp(0.75rem, 4vw, 1rem)' },
        '.gap-fluid-page': { gap: 'clamp(1rem, 4vw, 1.5rem)' },
        '.mb-fluid-grid': { marginBottom: 'clamp(1rem, 4vw, 1.5rem)' },
        '.p-fluid-page-card': { padding: 'clamp(0.5rem, 2vw, 1.5rem)' },
        '.p-fluid-card-content': { padding: 'clamp(1rem, 3vw, 1.5rem)' },
      });
    }),
  ],
} satisfies Config;

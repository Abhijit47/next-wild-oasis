import tailwindForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'class', 'media', 'false'
  // theme: {
  //   extend: {
  //     colors: {
  //       background: 'var(--background)',
  //       foreground: 'var(--foreground)',
  //     },
  //   },
  // },
  theme: {
    extend: {
      background: 'var(--color-grey-700)',
      foreground: 'var(--color-grey-50)',
      fontFamily: {
        primary: '--font-poppins',
        secondary: '--font-sono',
      },
      colors: {
        grey: {
          0: '#fff',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        blue: {
          100: '#e0f2fe',
          700: '#0369a1',
        },
        green: {
          100: '#dcfce7',
          700: '#15803d',
        },
        yellow: {
          100: '#fef9c3',
          700: '#a16207',
        },
        silver: {
          100: '#e5e7eb',
          700: '#374151',
        },
        indigo: {
          100: '#e0e7ff',
          700: '#4338ca',
        },
        red: {
          100: '#fee2e2',
          700: '#b91c1c',
          800: '#991b1b',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        primary: {
          50: '#E1E8EF',
          100: '#D4DEE7',
          200: '#B7C7D7',
          300: '#99B0C7',
          400: '#7C99B6',
          500: '#5E82A6',
          600: '#4C6B8A',
          700: '#3C546C',
          800: '#2C3D4F',
          900: '#1B2631',
          950: '#141C24',
        },
        accent: {
          50: '#FAF5F0',
          100: '#F4ECE1',
          200: '#E8D6BF',
          300: '#DDC2A2',
          400: '#D2AF84',
          500: '#C69963',
          600: '#B78343',
          700: '#926835',
          800: '#6C4D28',
          900: '#4B351B',
          950: '#382814',
        },
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        tiny: '3px',
        sm: '5px',
        md: '7px',
        lg: '9px',
      },
      backdropColor: {
        default: 'rgba(255, 255, 255, 0.1)',
      },
      grayscale: {
        0: '0',
        10: '10%',
      },
      opacity: {
        100: '100%',
        90: '90%',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      boxShadow: ['dark'],
      grayscale: ['dark'],
      opacity: ['dark'],
    },
  },
  plugins: [tailwindForms],
} satisfies Config;

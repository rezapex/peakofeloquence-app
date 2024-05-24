import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: '#f2d5b0',
          100: '#e0b28f',
          200: '#c9896c',
          300: '#b2644a',
          400: '#9c422a',
          500: '#842000',
          600: '#6a1a00',
          700: '#501300',
          800: '#370c00',
          900: '#1e0500',
        },
        secondary: {
          50: '#e8e8ea',
          100: '#c5c6c9',
          200: '#a1a2a5',
          300: '#7c7e82',
          400: '#595c60',
          500: '#36383f',
          600: '#2b2d32',
          700: '#202225',
          800: '#151617',
          900: '#0a0b0b',
        },
        gray: {
          50: '#f9fafb',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d2d6dc',
          400: '#9fa6b2',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        gold: {
          light: '#EEC89F',
          DEFAULT: '#694730',
          dark: '#4b3622',
        },
      },
    }
  }
}

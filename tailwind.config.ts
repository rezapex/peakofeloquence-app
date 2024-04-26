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
          50: '#f3f2ff',
          100: '#e8e5ff',
          200: '#c8bfff',
          300: '#a89aff',
          400: '#6952ff',
          500: '#2a09ff',
          600: '#2508e6',
          700: '#1c06b4',
          800: '#150583',
          900: '#0f0463'
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
          900: '#111827'
        }
      },
    }
  }
}

import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,js,tsx,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        ironnest: {
          'color-scheme': 'dark',
          'primary': '#f59e0b',
          'primary-content': '#1a1005',
          'secondary': '#3b82f6',
          'secondary-content': '#eaf1ff',
          'accent': '#ef4444',
          'accent-content': '#fff1f0',
          'neutral': '#1e2430',
          'neutral-content': '#c9d1de',
          'base-100': '#12161c',
          'base-200': '#191f28',
          'base-300': '#232a35',
          'base-content': '#e6eaf1',
          'info': '#38bdf8',
          'success': '#22c55e',
          'warning': '#f59e0b',
          'error': '#ef4444',
        },
      },
      {
        'ironnest-light': {
          'color-scheme': 'light',
          'primary': '#d97706',
          'primary-content': '#fff7ed',
          'secondary': '#2563eb',
          'secondary-content': '#eff6ff',
          'accent': '#dc2626',
          'accent-content': '#fef2f2',
          'neutral': '#e2e8f0',
          'neutral-content': '#1f2937',
          'base-100': '#ffffff',
          'base-200': '#f3f4f6',
          'base-300': '#e5e7eb',
          'base-content': '#1f2937',
          'info': '#0284c7',
          'success': '#16a34a',
          'warning': '#d97706',
          'error': '#dc2626',
        },
      },
    ],
  },
} satisfies Config

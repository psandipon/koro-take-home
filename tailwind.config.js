/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
        'error-color': 'var(--error-color)',
        'error-light-color': 'var(--error-light-color)',
        'success-color': 'var(--success-color)',
        'success-light-color': 'var(--success-light-color)',
        'contrast-color': 'var(--contrast-color)',
        'shadow-color': 'var(--shadow-color)'
      }
    }
  },
  plugins: []
}

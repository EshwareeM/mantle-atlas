/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mantle: {
          blue: '#2563EB',
          'blue-dark': '#1e40af',
          'blue-light': '#dbeafe',
        },
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280',
        'border-default': '#e5e7eb',
        'bg-gray-50': '#f9fafb',
        'bg-gray-100': '#f3f4f6',
      },
    },
  },
  plugins: [],
}
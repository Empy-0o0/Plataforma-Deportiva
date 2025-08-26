/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005baa',
        secondary: '#e63946',
        accent: '#f9dc5c',
        background: '#f1faee',
        text: '#1d3557',
        success: '#2a9d8f',
        warning: '#e9c46a',
        danger: '#e63946',
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'custom': '8px',
      },
    },
  },
  plugins: [],
}

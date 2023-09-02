/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E7DDCB'
      },
      backgroundColor: {
        btn: 'linear-gradient(145deg, #f7ecd9, #d0c7b7)',
        btnHover: '#E7DDCB'
      },
      boxShadow: {
        btn: '10px 10px 20px #d0c7b7,-10px -10px 20px #fef3df',
        btnHover: 'inset 10px 10px 20px #d0c7b7,inset -10px -10px 20px #fef3df'
      },
      animation: {
        rotateAnimation: 'rotate 1s infinite'
      },
      keyframes: {
        rotate: {
          '0%': {
            transform: 'rotateY(0)',
            opacity: '0'
          },
          '10%': {
            transform: 'rotateY(0)',
            opacity: '1'
          },
          '90%': {
            transform: 'rotateY(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'rotateY(180deg)',
            opacity: '0'
          }
        }
      }
    }
  },
  plugins: []
}

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // ← for app directory
    './pages/**/*.{js,ts,jsx,tsx}', // ← if you're using pages dir
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        softBlue: '#A7C7E7',
        pastelGreen: '#B8E4C9',
        lavender: '#E6E6FA',
        lightGray: '#F5F5F5',
      },
    },
  },
  plugins: [],
}

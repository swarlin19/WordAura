/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: '#ffd6ec',
        pastelMint: '#cde9db',
        pastelCream: '#fff0f6',
        accent: '#7a1f47',
        muted: '#fef6fb',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
};

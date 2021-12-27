module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
    borderWidth: {
      'DEFAULT': '1',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    }
  },
  plugins: [],
}

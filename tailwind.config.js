/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js',
  ],
  theme: {
      extend: {
        colors: {
          beige: '#f7ecd8',
          cream: '#c9aea6',
          secondary: '#815238',
          grey: '#4f4e4e',
          roseLight1: '#f4edeb',
          roseLight2: '#dcceb7',
          roseLight3: '#f4edeb',
          roseLight4: '#c9aea6',
          roseMedium1: '#ad8985',
          roseMedium2: '#87635a',
          'roseDark-100': '#412b1a'
        },
      }
  },
  plugins: [require('preline/plugin'),
  ],
}

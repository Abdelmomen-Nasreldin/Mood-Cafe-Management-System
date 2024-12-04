/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js',
  ],
  theme: {
      extend: {
        colors: {
        // Core Palette
        beige: '#f7ecd8', // Backgrounds
        cream: '#c9aea6', // Subtle Highlights
        secondary: '#815238', // Primary Accent
        grey: '#4f4e4e', // Neutral Text

        // Rose Shades
        roseLight1: '#f4edeb', // Light Rose (Backgrounds)
        roseLight2: '#dcceb7',
        roseLight3: '#f4edeb',
        roseLight4: '#c9aea6',
        roseMedium1: '#ad8985', // Medium Rose (Borders/Accents)
        roseMedium2: '#87635a',
        'roseDark-100': '#412b1a', // Dark Rose (Primary Text)
        },
      }
  },
  plugins: [require('preline/plugin'),
  ],
}

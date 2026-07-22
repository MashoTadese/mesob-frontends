/** @type {import('tailwindcss').Config} */
// ============================================================
// MESOB Color Palette — Official MESOB Brand (from id.gov.et)
//
//  primary → Royal Blue   #1E3578  (MESOB deep blue background)
//  gold    → Bright Gold  #F5C400  (MESOB yellow accent / active links)
//  dark    → Dark text    #0F1F5C
//  light   → Off-white    #F4F6FF
// ============================================================
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3578',
          50:  '#EEF1FB',
          100: '#D4DAF4',
          200: '#A9B5E9',
          300: '#7D90DE',
          400: '#526BD3',
          500: '#1E3578',
          600: '#192D67',
          700: '#142456',
          800: '#0F1B44',
          900: '#0A1233',
        },
        gold: {
          DEFAULT: '#F5C400',
          50:  '#FFFBE6',
          100: '#FFF4B3',
          200: '#FFED80',
          300: '#FFE54D',
          400: '#FFDE1A',
          500: '#F5C400',
          600: '#CCA300',
          700: '#A38200',
          800: '#7A6200',
          900: '#524100',
        },
        dark:  '#0F1F5C',
        light: '#F4F6FF',
      },
      fontFamily: {
        sans:    ['Inter', 'Noto Sans Ethiopic', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:         '0 4px 20px rgba(30, 53, 120, 0.08)',
        'card-hover': '0 8px 32px rgba(30, 53, 120, 0.18)',
        glass:        '0 8px 32px rgba(30, 53, 120, 0.12)',
        gold:         '0 4px 20px rgba(245, 196, 0, 0.40)',
      },
      backgroundImage: {
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':   'fadeIn 0.6s ease-out',
        'slide-up':  'slideUp 0.6s ease-out',
        'slide-down':'slideDown 0.3s ease-out',
        'pulse-slow':'pulse 3s infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                              '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(30px)' },'100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)'},'100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

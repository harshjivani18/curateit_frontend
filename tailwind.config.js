/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'gradient-blue': '11px 10px 197px 4px rgba(16,95,211,0.59)',
      },
      colors:{
        'dark-blue': '#0F2F64',
        'light-blue': '#1E9CFD',
        'lighter-blue': '#F5FCFF',
        'lightest-blue': '#F0F2F8',
        'custom-black': '#1A1A1A',
        'custom-gray': '#D1E3EB',
        'custom-pink': "#BC5BF6",
        'custom-lighter': '#74778B',
        'light-gray': '#F9F9FA',
        'black': '#000000',
        'white': '#FFFFFF',
        'dark-blue': '#082F49',
        'light-grey': '#F7F8FA',
        'dark-grey': '#111827',
        'medium-grey': '#9CA3AF',
        'primary': {
            'lighterblue-100': '#E5F0FF',
            'blue-200': '#B8D4FE',
            'new-blue-400': '#5690E7',
            'lighter-blue': '#E5F0FF',
            'light-blue': '#3b82F6',
            'blue-bg': '#F8FBFF',
            'medium-blue': '#235197',
            'blue': '#347AE2',
            'dark-blue': '#3665B3',
        },
        'grey': {
            'light': '#4B4F5D',
            'medium': '#292B38',
            'border': '#ABB7C9'
        }
      },
      dropShadow: {
        'grey': '0 5px 5px rgba(189, 195, 199, 1)',
        'sm': '0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        'lg': '0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
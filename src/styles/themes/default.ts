export const defaultTheme = {
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-300': '#F75A68',
  'red-500': '#AB222E',
  'red-700': '#7A1921',

  fontSize: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xg: 24,
    '2xl': 32,
  },
  colors: {
    'transparent': 'transparent',

    'black': '#000',
    'white': '#FFF',
    'red': '#F75A68',
    'red_dark': '#AA2834',

    gray: {
      900: '#121214',
      800: '#202024',
      400: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },

    cyan: {
      500: '#81D8F7',
      300: '#ACE9FF',
    }
  },
  extend: {
    fontFamily: {
      sans: 'Inter, sans-serif'
    },
  },
} as const
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'nanum-gothic': ['"Nanum Gothic"', 'sans-serif'],
        'noto-sans-kr': ['"Noto Sans KR Variable"', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'underline',
              textUnderlinePosition: 'under',
              color: theme('colors.cyan.700'),
            },
            'a:hover': { textDecorationThickness: '2px' },
            'ol > li::marker': {
              color: theme('colors.gray.700'),
            },
            'ul > li::marker': {
              color: theme('colors.gray.500'),
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: theme('colors.gray.400'),
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: "'Noto Sans KR Variable', sans-serif",
            },
            img: {
              margin: '0 auto',
              borderRadius: '4px',
            },
            code: {
              fontFamily:
                "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              color: 'inherit',
              fontWeight: 'inherit',
              backgroundColor: theme('colors.gray.200'),
              padding: '2px 5px',
              borderRadius: '3px',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
        sm: {
          css: {
            code: {
              fontSize: '14px',
            },
          },
        },
        base: {
          css: {
            fontSize: '17px',
            code: {
              fontSize: '17px',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.cyan.500'),
            },
            'ol > li::marker': {
              color: theme('colors.gray.400'),
            },
            'ul > li::marker': {
              color: theme('colors.gray.500'),
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.600'),
            },
            code: {
              backgroundColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

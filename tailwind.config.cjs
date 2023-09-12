/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'nanum-gothic': ['"Nanum Gothic"', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'underline',
              textUnderlinePosition: 'under',
              color: theme('colors.cyan.700'),
            },
            'a:hover': { textDecoration: 'initial' },
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
            img: {
              margin: '0 auto',
              borderRadius: '8px',
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
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

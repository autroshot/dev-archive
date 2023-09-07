/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
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
            code: {
              fontFamily:
                "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              color: 'inherit',
              fontWeight: 'inherit',
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

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroExpressiveCode, { pluginFramesTexts } from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { addClassName } from '/src/plugins';

pluginFramesTexts.addLocale('ko', {
  copyButtonCopied: '복사됨!',
  copyButtonTooltip: '클립보드에 복사하기',
  terminalWindowFallbackTitle: '터미널 윈도우',
});

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  themes: ['github-dark'],
  frames: {
    showCopyToClipboardButton: true,
  },
  styleOverrides: {
    codeFontSize: 'var(--code-font-size)',
    codeFontFamily: 'var(--code-font-family)',
    frames: {
      tooltipSuccessBackground: 'var(--code-tooltip-success-background)',
    }
  },
  defaultLocale: 'ko',
  plugins: [addClassName('not-prose')],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dev-archive.com/',
  integrations: [
    sitemap(),
    astroExpressiveCode(astroExpressiveCodeOptions),
    tailwind(),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
  },
});

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import astroExpressiveCode, { pluginFramesTexts } from 'astro-expressive-code';

pluginFramesTexts.addLocale('ko', {
  copyButtonCopied: '복사됨!',
  copyButtonTooltip: '클립보드에 복사하기',
  terminalWindowFallbackTitle: '터미널 윈도우',
});

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  styleOverrides: {
    codeFontSize: '16px',
    codeLineHeight: '1.5em',
  },
  defaultLocale: 'ko',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), astroExpressiveCode(astroExpressiveCodeOptions)],
});

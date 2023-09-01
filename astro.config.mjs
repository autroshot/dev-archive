import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), astroExpressiveCode()],
});

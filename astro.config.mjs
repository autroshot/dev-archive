import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode, { pluginFramesTexts } from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

pluginFramesTexts.addLocale("ko", {
  copyButtonCopied: "복사됨!",
  copyButtonTooltip: "클립보드에 복사하기",
  terminalWindowFallbackTitle: "터미널 윈도우",
});

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  frames: {
    showCopyToClipboardButton: true,
    styleOverrides: {
      tooltipSuccessBackground: "var(--code-tooltip-success-background)",
    },
  },
  styleOverrides: {
    codeFontSize: "var(--code-font-size)",
    codeFontFamily: "var(--code-font-family)",
  },
  defaultLocale: "ko",
};

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    sitemap(),
    astroExpressiveCode(astroExpressiveCodeOptions),
    tailwind(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
});

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
import image from "@astrojs/image";
import { SITE } from './src/setup.mjs';
import { remarkReadingTime } from './src/utils/frontmatter.js';
// import mdx from "@astrojs/mdx";
import mdx from "@astrojs/mdx";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  output: 'static',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })
  // mdx(),

  /* Disable this integration if you don't use Google Analytics (or other external script). */
  // partytown({
  // 	config: { forward: ['dataLayer.push'] },
  // }),
  , mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
});
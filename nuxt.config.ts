// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Plugins (if needed, uncomment)
  // plugins: [
  //   '~/plugins/vue-spline',
  //   '~/plugins/vue-spline-viewer',
  // ],
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
    'nuxt-icon'
  ],
  hooks: {
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName));
      globals.forEach(c => c.global = true);
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  routeRules: {
    '/api/search.json': { prerender: true }
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  sitemap: {
    hostname: 'https://www.peakofeloquence.org',
    gzip: true,
    routes: [
      '/',
      '/about',
      '/courses',
      '/contact',
      '/blog'
    ],
    exclude: [
      '/node_modules/**'
    ],
  }
});

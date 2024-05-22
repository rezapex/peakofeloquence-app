// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // plugins
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
    '@nuxtjs/sitemap'
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  //  '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => {
  //       return tag === 'spline-viewer';
  //     }
  //   }
  // },
})
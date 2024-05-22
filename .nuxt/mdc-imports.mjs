import _Highlight from '/Users/rezajafar/peakofeloquence-app/node_modules/.pnpm/@nuxtjs+mdc@0.6.1_rollup@4.17.2/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":{"light":"material-theme-lighter","default":"material-theme","dark":"material-theme-palenight"}}
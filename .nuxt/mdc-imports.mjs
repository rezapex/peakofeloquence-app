import _Highlight from '/Users/rezajafar/Desktop/Development/peakofeloquence-app/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":{"light":"material-theme-lighter","default":"material-theme","dark":"material-theme-palenight"}}
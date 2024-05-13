
import { updateAppConfig } from '#app/config'
import { defuFn } from 'defu'

const inlineConfig = {
  "nuxt": {
    "buildId": "dev"
  },
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ],
    "strategy": "merge"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/Users/rezajafar/peakofeloquence-app/app.config.ts"
import cfg1 from "/Users/rezajafar/peakofeloquence-app/node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/app.config.ts"

export default /*@__PURE__*/ defuFn(cfg0, cfg1, inlineConfig)

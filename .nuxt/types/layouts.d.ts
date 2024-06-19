import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth" | "default"
declare module "../../../node_modules/.pnpm/nuxt@3.12.1_@opentelemetry+api@1.9.0_@parcel+watcher@2.4.1_@types+node@20.14.2_@unocss+reset@_trvaz5tmsdjeaqqwqdbsquuv4u/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
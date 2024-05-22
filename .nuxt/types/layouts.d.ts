import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_@types+node@20.12.11_@unocss+reset_pcbn3nkzqk5yqkhdkkijdjtl5a/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
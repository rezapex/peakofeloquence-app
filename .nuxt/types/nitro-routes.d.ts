// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/search.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/search.json.get').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_@types+node@20.12.11_@unocss+reset_pcbn3nkzqk5yqkhdkkijdjtl5a/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_mdc/highlight': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxtjs+mdc@0.6.1_rollup@4.17.2/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/event-handler').default>>>>
    }
    '/__studio.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxthq+studio@1.0.16-1714491665.18719f4_rollup@4.17.2/node_modules/@nuxthq/studio/dist/runtime/server/routes/studio').default>>>>
    }
    '/api/component-meta': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt-component-meta@0.6.4_rollup@4.17.2/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/api/component-meta.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt-component-meta@0.6.4_rollup@4.17.2/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/api/component-meta/:component?': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt-component-meta@0.6.4_rollup@4.17.2/node_modules/nuxt-component-meta/dist/runtime/server/api/component-meta.get').default>>>>
    }
    '/__og-image__/font/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt-og-image@3.0.0-rc.53_@lezer+common@1.2.1_@nuxt+devtools@1.3.1_@unocss+reset@0.60.0_float_gel263vjvnhlhdktixsjz3tham/node_modules/nuxt-og-image/dist/runtime/nitro/routes/font').default>>>>
    }
    '/__og-image__/image/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt-og-image@3.0.0-rc.53_@lezer+common@1.2.1_@nuxt+devtools@1.3.1_@unocss+reset@0.60.0_float_gel263vjvnhlhdktixsjz3tham/node_modules/nuxt-og-image/dist/runtime/nitro/routes/image').default>>>>
    }
    '/api/_content/query/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/query': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/query').default>>>>
    }
    '/api/_content/cache.1716240076348.json': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/cache').default>>>>
    }
    '/api/_content/navigation/:qid/**:params': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation/:qid': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/api/_content/navigation': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+content@2.12.1_ioredis@5.4.1_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4.1_r5k6n7pgousrgqlopd3expp3zq/node_modules/@nuxt/content/dist/runtime/server/api/navigation').default>>>>
    }
    '/_ipx/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+image@1.7.0_ioredis@5.4.1_rollup@4.17.2/node_modules/@nuxt/image/dist/runtime/ipx').default>>>>
    }
  }
}
export {}
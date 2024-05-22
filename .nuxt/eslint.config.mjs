// ESLint config generated by Nuxt
/// <reference path="./eslint-typegen.d.ts" />

import { composer } from '../node_modules/.pnpm/eslint-flat-config-utils@0.2.4/node_modules/eslint-flat-config-utils/dist/index.mjs';
import typegen from '../node_modules/.pnpm/eslint-typegen@0.2.4_eslint@9.2.0/node_modules/eslint-typegen/dist/index.mjs';
import { createConfigForNuxt, defineFlatConfigs, resolveOptions } from '../node_modules/.pnpm/@nuxt+eslint-config@0.3.12_eslint@9.2.0_typescript@5.4.5/node_modules/@nuxt/eslint-config/dist/flat.mjs';

export { defineFlatConfigs }

export const configs = composer()

export const options = resolveOptions({
  "features": {
    "standalone": true
  },
  "dirs": {
    "pages": [
      "pages",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/pages"
    ],
    "composables": [
      "composables",
      "utils",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/composables",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/utils"
    ],
    "components": [
      "components",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/#ui-pro/components"
    ],
    "componentsPrefixed": [
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/#ui-pro/components"
    ],
    "layouts": [
      "layouts",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/layouts"
    ],
    "plugins": [
      "plugins",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/plugins"
    ],
    "middleware": [
      "middleware",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/middleware"
    ],
    "modules": [
      "modules",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro/modules"
    ],
    "servers": [],
    "root": [
      "/Users/rezajafar/peakofeloquence-app"
    ],
    "src": [
      "",
      "node_modules/.pnpm/@nuxt+ui-pro@1.2.0_focus-trap@7.5.4_nuxt@3.11.2_@opentelemetry+api@1.8.0_@parcel+watcher@2.4._vkhnqkaultie3oz27x7miifqb4/node_modules/@nuxt/ui-pro"
    ]
  }
})

configs.append(
// Nuxt Configs
createConfigForNuxt(options),

// Set globals from imports registry
{"name":"nuxt/import-globals","languageOptions":{"globals":{"isVue2":"readonly","isVue3":"readonly","defineNuxtLink":"readonly","useNuxtApp":"readonly","tryUseNuxtApp":"readonly","defineNuxtPlugin":"readonly","definePayloadPlugin":"readonly","useRuntimeConfig":"readonly","defineAppConfig":"readonly","requestIdleCallback":"readonly","cancelIdleCallback":"readonly","setInterval":"readonly","useAppConfig":"readonly","updateAppConfig":"readonly","defineNuxtComponent":"readonly","useAsyncData":"readonly","useLazyAsyncData":"readonly","useNuxtData":"readonly","refreshNuxtData":"readonly","clearNuxtData":"readonly","useHydration":"readonly","callOnce":"readonly","useState":"readonly","clearNuxtState":"readonly","clearError":"readonly","createError":"readonly","isNuxtError":"readonly","showError":"readonly","useError":"readonly","useFetch":"readonly","useLazyFetch":"readonly","useCookie":"readonly","refreshCookie":"readonly","prerenderRoutes":"readonly","useRequestHeader":"readonly","useRequestHeaders":"readonly","useRequestEvent":"readonly","useRequestFetch":"readonly","setResponseStatus":"readonly","onNuxtReady":"readonly","preloadComponents":"readonly","prefetchComponents":"readonly","preloadRouteComponents":"readonly","abortNavigation":"readonly","addRouteMiddleware":"readonly","defineNuxtRouteMiddleware":"readonly","setPageLayout":"readonly","navigateTo":"readonly","useRoute":"readonly","useRouter":"readonly","isPrerendered":"readonly","loadPayload":"readonly","preloadPayload":"readonly","definePayloadReducer":"readonly","definePayloadReviver":"readonly","useLoadingIndicator":"readonly","getAppManifest":"readonly","getRouteRules":"readonly","reloadNuxtApp":"readonly","useRequestURL":"readonly","usePreviewMode":"readonly","useId":"readonly","onBeforeRouteLeave":"readonly","onBeforeRouteUpdate":"readonly","withCtx":"readonly","withDirectives":"readonly","withKeys":"readonly","withMemo":"readonly","withModifiers":"readonly","withScopeId":"readonly","onActivated":"readonly","onBeforeMount":"readonly","onBeforeUnmount":"readonly","onBeforeUpdate":"readonly","onDeactivated":"readonly","onErrorCaptured":"readonly","onMounted":"readonly","onRenderTracked":"readonly","onRenderTriggered":"readonly","onServerPrefetch":"readonly","onUnmounted":"readonly","onUpdated":"readonly","computed":"readonly","customRef":"readonly","isProxy":"readonly","isReactive":"readonly","isReadonly":"readonly","isRef":"readonly","markRaw":"readonly","proxyRefs":"readonly","reactive":"readonly","readonly":"readonly","ref":"readonly","shallowReactive":"readonly","shallowReadonly":"readonly","shallowRef":"readonly","toRaw":"readonly","toRef":"readonly","toRefs":"readonly","triggerRef":"readonly","unref":"readonly","watch":"readonly","watchEffect":"readonly","watchPostEffect":"readonly","watchSyncEffect":"readonly","isShallow":"readonly","effect":"readonly","effectScope":"readonly","getCurrentScope":"readonly","onScopeDispose":"readonly","defineComponent":"readonly","defineAsyncComponent":"readonly","resolveComponent":"readonly","getCurrentInstance":"readonly","h":"readonly","inject":"readonly","hasInjectionContext":"readonly","nextTick":"readonly","provide":"readonly","defineModel":"readonly","defineOptions":"readonly","defineSlots":"readonly","mergeModels":"readonly","toValue":"readonly","useModel":"readonly","useAttrs":"readonly","useCssModule":"readonly","useCssVars":"readonly","useSlots":"readonly","useTransitionState":"readonly","Component":"readonly","ComponentPublicInstance":"readonly","ComputedRef":"readonly","ExtractPropTypes":"readonly","ExtractPublicPropTypes":"readonly","InjectionKey":"readonly","PropType":"readonly","Ref":"readonly","MaybeRef":"readonly","MaybeRefOrGetter":"readonly","VNode":"readonly","injectHead":"readonly","useHead":"readonly","useSeoMeta":"readonly","useHeadSafe":"readonly","useServerHead":"readonly","useServerSeoMeta":"readonly","useServerHeadSafe":"readonly","useResizable":"readonly","useScrollspy":"readonly","useSharedMouse":"readonly","useSharedMouseInElement":"readonly","useUIState":"readonly","mapContentNavigation":"readonly","findPageHeadline":"readonly","findPageBreadcrumb":"readonly","defineShortcuts":"readonly","useProvideButtonGroup":"readonly","useInjectButtonGroup":"readonly","useCarouselScroll":"readonly","useCopyToClipboard":"readonly","useFormGroup":"readonly","modalInjectionKey":"readonly","useModal":"readonly","createPopper":"readonly","usePopper":"readonly","_useShortcuts":"readonly","useShortcuts":"readonly","slidOverInjectionKey":"readonly","useSlideover":"readonly","useTimer":"readonly","useToast":"readonly","useUI":"readonly","__getComponentMeta":"readonly","useComponentMeta":"readonly","updateSiteConfig":"readonly","useNitroOrigin":"readonly","useSiteConfig":"readonly","createSitePathResolver":"readonly","withSiteTrailingSlash":"readonly","withSiteUrl":"readonly","queryContent":"readonly","useContentHelpers":"readonly","useContentHead":"readonly","useContentPreview":"readonly","withContentBase":"readonly","useUnwrap":"readonly","fetchContentNavigation":"readonly","useContentState":"readonly","useContent":"readonly","unwrapSlot":"readonly","parseMarkdown":"readonly","useImage":"readonly","useColorMode":"readonly","defineOgImage":"readonly","defineOgImageComponent":"readonly","defineOgImageScreenshot":"readonly","definePageMeta":"readonly","useLink":"readonly"}}}
)

export function withNuxt(...customs) {
  return configs
    .clone()
    .append(...customs)
    .onResolved(configs => typegen(configs, { dtsPath: new URL("./eslint-typegen.d.ts", import.meta.url), augmentFlatConfigUtils: true }))
}

export default withNuxt
import { e as useAsyncData, ag as fetchContentNavigation, ar as useLazyFetch, as as _sfc_main$c, at as _sfc_main$b, au as _sfc_main$2, av as __nuxt_component_3 } from './server.mjs';
import { defineComponent, withAsyncContext, provide, withCtx, renderSlot, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer3.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/devalue/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/ssr/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-raw/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ipx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: navigation } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("navigation", () => fetchContentNavigation(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
    useLazyFetch("/api/search.json", { default: () => [], server: false }, "$i9bCpVDU6M");
    provide("navigation", navigation);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$c;
      const _component_UMain = _sfc_main$b;
      const _component_Footer = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(ssrRenderComponent(_component_UMain, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-47dfRxWi.mjs.map

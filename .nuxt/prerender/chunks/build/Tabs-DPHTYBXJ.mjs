import { o as useUI, j as __nuxt_component_1$2 } from './server.mjs';
import { defineComponent, useSlots, toRef, ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderVNode } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
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
  ...{
    inheritAttrs: false
  },
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    selectedIndex: {
      type: Number,
      default: 0
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    }
  },
  setup(__props) {
    const config = {
      wrapper: "relative my-5 space-y-6",
      header: "flex items-center relative",
      border: "absolute bottom-0 inset-x-0 w-full h-px bg-gray-200 dark:bg-gray-800",
      tab: {
        base: "px-4 py-2.5 font-semibold text-sm/6 flex items-center gap-1.5 border-b z-[1] focus-visible:outline-primary",
        active: "text-primary border-primary",
        inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:border-gray-300 dark:hover:border-gray-700",
        icon: {
          base: "w-5 h-5 flex-shrink-0"
        }
      }
    };
    const props = __props;
    const slots = useSlots();
    const { ui, attrs } = useUI("content.tabs", void 0, config, toRef(props, "class"), true);
    const selectedIndex = ref(props.selectedIndex || 0);
    const rerenderCounter = ref(1);
    const tabs = computed(() => {
      var _a;
      rerenderCounter.value;
      return ((_a = slots.default) == null ? void 0 : _a.call(slots).map((slot, index) => {
        var _a2, _b;
        return {
          index,
          label: ((_a2 = slot.props) == null ? void 0 : _a2.label) || `${index}`,
          icon: (_b = slot.props) == null ? void 0 : _b.icon,
          component: slot
        };
      })) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}><div class="${ssrRenderClass(unref(ui).header)}"><div class="${ssrRenderClass(unref(ui).border)}"></div><!--[-->`);
      ssrRenderList(unref(tabs), (tab, index) => {
        _push(`<button class="${ssrRenderClass([unref(ui).tab.base, unref(selectedIndex) === index ? unref(ui).tab.active : unref(ui).tab.inactive])}">`);
        if (tab.icon) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: tab.icon,
            class: unref(ui).tab.icon.base
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(tab.label)}</span></button>`);
      });
      _push(`<!--]--></div><!--[-->`);
      ssrRenderList(unref(tabs), (tab, index) => {
        _push(`<div style="${ssrRenderStyle(unref(selectedIndex) === index ? null : { display: "none" })}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.component), null, null), _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Tabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Tabs-DPHTYBXJ.mjs.map

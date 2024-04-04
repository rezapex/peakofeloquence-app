import { a0 as mapContentNavigation, u as useUI, s as __nuxt_component_0$8, r as _sfc_main$3, a1 as _sfc_main$d, $ as _sfc_main$n } from './server.mjs';
import { useSSRContext, defineComponent, inject, withCtx, unref, createVNode, renderSlot, toRef, mergeProps } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/cookie-es/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-raw/index.js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Aside",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const config = {
      wrapper: "hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4",
      top: {
        wrapper: "sticky -top-8 -mt-8 pointer-events-none z-[1]",
        header: "h-8 bg-background -mx-4 px-4",
        body: "bg-background relative pointer-events-auto flex -mx-4 px-4",
        footer: "h-8 bg-gradient-to-b from-background -mx-4 px-4"
      }
    };
    const props = __props;
    const { ui, attrs } = useUI("aside", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAsideLinks = _sfc_main$n;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}><div class="relative">`);
      if (_ctx.$slots.top) {
        _push(`<div class="${ssrRenderClass(unref(ui).top.wrapper)}"><div class="${ssrRenderClass(unref(ui).top.header)}"></div><div class="${ssrRenderClass(unref(ui).top.body)}">`);
        ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
        _push(`</div><div class="${ssrRenderClass(unref(ui).top.footer)}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "links", {}, () => {
        _push(ssrRenderComponent(_component_UAsideLinks, { links: __props.links }, null, _parent));
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</div></aside>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/aside/Aside.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "docs",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = inject("navigation");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$8;
      const _component_UPage = _sfc_main$3;
      const _component_UAside = _sfc_main$1;
      const _component_UNavigationTree = _sfc_main$d;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UPage, null, {
              left: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UAside, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UNavigationTree, {
                          links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(navigation))
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UNavigationTree, {
                            links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(navigation))
                          }, null, 8, ["links"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UAside, null, {
                      default: withCtx(() => [
                        createVNode(_component_UNavigationTree, {
                          links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(navigation))
                        }, null, 8, ["links"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UPage, null, {
                left: withCtx(() => [
                  createVNode(_component_UAside, null, {
                    default: withCtx(() => [
                      createVNode(_component_UNavigationTree, {
                        links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(navigation))
                      }, null, 8, ["links"])
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=docs-D32xyIPU.mjs.map

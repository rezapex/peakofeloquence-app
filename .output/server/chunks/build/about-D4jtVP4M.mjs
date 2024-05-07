import { m as mapContentNavigation, _ as __nuxt_component_0$2, a as _sfc_main$a, b as _sfc_main$d, d as __nuxt_component_5$1 } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './ContentSearchButton-CuWKy7B6.mjs';
import { defineComponent, inject, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'shiki/core';
import '@shikijs/transformers';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'tailwind-merge';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './useShortcuts-BYJSYjPe.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = inject("navigation", ref([]));
    const links = computed(
      () => {
        var _a2;
        var _a;
        return (_a2 = (_a = navigation.value.find((item) => item._path === "/about")) == null ? void 0 : _a.children) != null ? _a2 : [];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UPage = _sfc_main$a;
      const _component_UAside = _sfc_main$1;
      const _component_UContentSearchButton = _sfc_main$2;
      const _component_UNavigationTree = _sfc_main$d;
      const _component_NuxtPage = __nuxt_component_5$1;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UPage, null, {
              left: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UAside, null, {
                    top: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UContentSearchButton, {
                          class: "rounded-md",
                          size: "sm"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UContentSearchButton, {
                            class: "rounded-md",
                            size: "sm"
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UNavigationTree, {
                          links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(links))
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UNavigationTree, {
                            links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(links))
                          }, null, 8, ["links"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UAside, null, {
                      top: withCtx(() => [
                        createVNode(_component_UContentSearchButton, {
                          class: "rounded-md",
                          size: "sm"
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_UNavigationTree, {
                          links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(links))
                        }, null, 8, ["links"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UPage, null, {
                left: withCtx(() => [
                  createVNode(_component_UAside, null, {
                    top: withCtx(() => [
                      createVNode(_component_UContentSearchButton, {
                        class: "rounded-md",
                        size: "sm"
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_UNavigationTree, {
                        links: ("mapContentNavigation" in _ctx ? _ctx.mapContentNavigation : unref(mapContentNavigation))(unref(links))
                      }, null, 8, ["links"])
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-D4jtVP4M.mjs.map

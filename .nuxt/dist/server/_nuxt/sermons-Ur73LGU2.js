import { m as mapContentNavigation, _ as __nuxt_component_0, a as _sfc_main$1, b as _sfc_main$4, d as __nuxt_component_5 } from "../server.mjs";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./ContentSearchButton-CuWKy7B6.js";
import { defineComponent, inject, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "ufo";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "klona";
import "devalue";
import "tailwind-merge";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ohash";
import "scule";
import "destr";
import "cookie-es";
import "./useShortcuts-BYJSYjPe.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sermons",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = inject("navigation", ref([]));
    const links = computed(
      () => {
        var _a;
        return ((_a = navigation.value.find((item) => item._path === "/sermons")) == null ? void 0 : _a.children) ?? [];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0;
      const _component_UPage = _sfc_main$1;
      const _component_UAside = _sfc_main$2;
      const _component_UContentSearchButton = _sfc_main$3;
      const _component_UNavigationTree = _sfc_main$4;
      const _component_NuxtPage = __nuxt_component_5;
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sermons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sermons-Ur73LGU2.js.map

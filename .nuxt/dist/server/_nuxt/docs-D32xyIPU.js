import { u as useUI, $ as _sfc_main$2, a0 as mapContentNavigation, s as __nuxt_component_0, r as _sfc_main$3, a1 as _sfc_main$4 } from "../server.mjs";
import { defineComponent, toRef, mergeProps, unref, useSSRContext, inject, withCtx, createVNode, renderSlot } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import "#internal/nitro";
import "ofetch";
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
import "@vueuse/core";
import "tailwind-merge";
import "ohash";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "scule";
import "destr";
import "cookie-es";
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
      const _component_UAsideLinks = _sfc_main$2;
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
      const _component_UContainer = __nuxt_component_0;
      const _component_UPage = _sfc_main$3;
      const _component_UAside = _sfc_main$1;
      const _component_UNavigationTree = _sfc_main$4;
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
export {
  _sfc_main as default
};
//# sourceMappingURL=docs-D32xyIPU.js.map

import { P as useAppConfig, o as useUI, i as __nuxt_component_0, j as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, renderSlot, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseH4",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const appConfig = useAppConfig();
    const config = computed(() => ({
      wrapper: "scroll-mt-[calc(48px+24px+var(--header-height))] lg:scroll-mt-[calc(24px+var(--header-height))]",
      icon: {
        wrapper: "-ml-6 pr-2 py-1 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute",
        base: "w-4 h-4 text-primary",
        name: appConfig.ui.icons.hash
      }
    }));
    const { ui } = useUI("content.prose.h4", void 0, config, void 0, true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1;
      _push(`<h4${ssrRenderAttrs(mergeProps({
        id: __props.id,
        class: unref(ui).wrapper
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: `#${__props.id}`,
        class: "group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: unref(ui).icon.name,
              class: unref(ui).icon.base
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", {
                class: unref(ui).icon.wrapper
              }, [
                createVNode(_component_UIcon, {
                  name: unref(ui).icon.name,
                  class: unref(ui).icon.base
                }, null, 8, ["name", "class"])
              ], 2),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</h4>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseH4.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ProseH4-DQ27dbOW.js.map

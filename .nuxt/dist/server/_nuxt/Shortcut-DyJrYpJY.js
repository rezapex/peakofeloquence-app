import { u as useShortcuts, _ as __nuxt_component_0 } from "./useShortcuts-BkaS1469.js";
import { k as useUI } from "../server.mjs";
import { defineComponent, toRef, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "tailwind-merge";
import "./index-D1eMPiNF.js";
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
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ohash";
import "scule";
import "destr";
import "cookie-es";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Shortcut",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String,
      required: true
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    }
  },
  setup(__props) {
    const config = {
      wrapper: "!my-0 align-text-top"
    };
    const props = __props;
    const { metaSymbol } = useShortcuts();
    const { ui, attrs } = useUI("content.shortcut", void 0, config, toRef(props, "class"), true);
    const shortcut = computed(() => props.value === "meta" ? metaSymbol.value : props.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UKbd = __nuxt_component_0;
      _push(ssrRenderComponent(_component_UKbd, mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(shortcut))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(shortcut)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Shortcut.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Shortcut-DyJrYpJY.js.map

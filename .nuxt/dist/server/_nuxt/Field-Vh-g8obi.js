import { n as useUI } from "../server.mjs";
import { defineComponent, toRef, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
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
  ...{
    inheritAttrs: false
  },
  __name: "Field",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: void 0
    },
    type: {
      type: String,
      default: void 0
    },
    required: {
      type: Boolean,
      default: false
    },
    default: {
      type: String,
      default: void 0
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    }
  },
  setup(__props) {
    const config = {
      wrapper: "mt-5",
      container: "flex items-start gap-x-2.5 font-mono text-sm",
      name: "rounded-md font-semibold text-primary",
      required: "text-gray-500 dark:text-gray-400",
      type: "text-right",
      label: "flex flex-1 gap-x-2.5",
      description: "mt-3 mb-0 text-gray-600 dark:text-gray-300 text-sm space-y-3"
    };
    const props = __props;
    const { ui, attrs } = useUI("content.field", void 0, config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}><div class="${ssrRenderClass(unref(ui).container)}"><div class="${ssrRenderClass(unref(ui).label)}"><span class="${ssrRenderClass(unref(ui).name)}">${ssrInterpolate(__props.name)}</span>`);
      if (__props.required) {
        _push(`<span class="${ssrRenderClass(unref(ui).required)}">required</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.type) {
        _push(`<div class="${ssrRenderClass(unref(ui).type)}">${ssrInterpolate(__props.type)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.$slots.default || __props.description) {
        _push(`<div class="${ssrRenderClass(unref(ui).description)}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.description)}`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Field.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Field-Vh-g8obi.js.map

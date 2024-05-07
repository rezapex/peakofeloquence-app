import { h as _export_sfc, _ as __nuxt_component_0 } from "../server.mjs";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
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
const _sfc_main = {
  // If there's any specific logic, it would go here.
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UContainer = __nuxt_component_0;
  _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "donation-container" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<iframe id="kofiframe" src="https://ko-fi.com/peakofeloquence/?hidefeed=true&amp;widget=true&amp;embed=true&amp;preview=true" class="donation-iframe" title="peakofeloquence"${_scopeId}></iframe>`);
      } else {
        return [
          createVNode("iframe", {
            id: "kofiframe",
            src: "https://ko-fi.com/peakofeloquence/?hidefeed=true&widget=true&embed=true&preview=true",
            class: "donation-iframe",
            title: "peakofeloquence"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/donate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const donate = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  donate as default
};
//# sourceMappingURL=donate-lzzSLFBs.js.map

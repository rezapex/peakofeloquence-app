import { defineComponent, mergeProps, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "OgImageDocs",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full flex flex-col justify-center text-center bg-slate-900 p-8" }, _attrs))}><div class="relative"><h1 class="text-8xl mb-4 text-white">${ssrInterpolate(__props.title)}</h1><p class="text-5xl text-gray-200 leading-tight">${ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OgImage/OgImageDocs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=OgImageDocs-4d7bJNVJ.mjs.map

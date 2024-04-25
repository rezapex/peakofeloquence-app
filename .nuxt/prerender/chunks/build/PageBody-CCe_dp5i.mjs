import { k as useUI, z as __nuxt_component_1$2, i as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, toRef, mergeProps, unref, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageHeader",
  __ssrInlineRender: true,
  props: {
    headline: {
      type: String,
      default: void 0
    },
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
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
      wrapper: "relative border-b border-gray-200 dark:border-gray-800 py-8",
      container: "flex flex-col lg:flex-row lg:items-center lg:justify-between",
      headline: "mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5",
      title: "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight",
      description: "mt-4 text-lg text-gray-500 dark:text-gray-400",
      icon: {
        wrapper: "flex",
        base: "w-10 h-10 flex-shrink-0 text-primary"
      },
      links: "flex flex-wrap items-center gap-1.5 mt-4 lg:mt-0"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.header", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (__props.headline || _ctx.$slots.headline) {
        _push(`<div class="${ssrRenderClass(unref(ui).headline)}">`);
        ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
          _push(`${ssrInterpolate(__props.headline)}`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col lg:flex-row items-start gap-6">`);
      if (__props.icon || _ctx.$slots.icon) {
        _push(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
          _push(ssrRenderComponent(_component_UIcon, {
            name: __props.icon,
            class: unref(ui).icon.base
          }, null, _parent));
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1"><div class="${ssrRenderClass(unref(ui).container)}"><h1 class="${ssrRenderClass(unref(ui).title)}">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(`${ssrInterpolate(__props.title)}`);
      }, _push, _parent);
      _push(`</h1>`);
      if (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links) {
        _push(`<div class="${ssrRenderClass(unref(ui).links)}">`);
        ssrRenderSlot(_ctx.$slots, "links", {}, () => {
          _push(`<!--[-->`);
          ssrRenderList(__props.links, (link, index) => {
            _push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, { ...link, target: link.target || "_blank", color: link.color || "white" }, {
              onClick: link.click
            }), null, _parent));
          });
          _push(`<!--]-->`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.description || _ctx.$slots.description) {
        _push(`<p class="${ssrRenderClass(unref(ui).description)}">`);
        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
          _push(`${ssrInterpolate(__props.description)}`);
        }, _push, _parent);
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageBody",
  __ssrInlineRender: true,
  props: {
    prose: {
      type: Boolean,
      default: false
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
      wrapper: "mt-8 pb-24",
      prose: "prose prose-primary dark:prose-invert max-w-none"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.body", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(ui).wrapper, __props.prose && unref(ui).prose]
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageBody.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=PageBody-CCe_dp5i.mjs.map

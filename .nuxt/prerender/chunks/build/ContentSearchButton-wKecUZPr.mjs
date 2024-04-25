import { k as useUI, P as useAppConfig, S as useUIState, R as _sfc_main$j, i as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, toRef, mergeProps, unref, useSSRContext, createSlots, withCtx, createTextVNode, toDisplayString, createVNode } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderComponent, ssrInterpolate } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';
import { u as useShortcuts, _ as __nuxt_component_0 } from './useShortcuts-BkaS1469.mjs';

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
      const _component_UAsideLinks = _sfc_main$j;
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
  __name: "ContentSearchButton",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: "Search..."
    }
  },
  setup(__props) {
    const appConfig = useAppConfig();
    const { toggleContentSearch } = useUIState();
    const { metaSymbol } = useShortcuts();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UButton = __nuxt_component_0$4;
      const _component_UKbd = __nuxt_component_0;
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        icon: unref(appConfig).ui.icons.search,
        label: __props.label,
        truncate: ""
      }, !!__props.label ? (_b = (_a = _ctx.$ui) == null ? void 0 : _a.button) == null ? void 0 : _b.input : (_d = (_c = _ctx.$ui) == null ? void 0 : _c.button) == null ? void 0 : _d.secondary, {
        "aria-label": "Search",
        class: [!!__props.label && "flex-1"],
        onClick: unref(toggleContentSearch)
      }, _attrs), createSlots({ _: 2 }, [
        !!__props.label ? {
          name: "trailing",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UKbd, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(metaSymbol))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(metaSymbol)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UKbd, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` K `);
                  } else {
                    return [
                      createTextVNode(" K ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0" }, [
                  createVNode(_component_UKbd, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(metaSymbol)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UKbd, null, {
                    default: withCtx(() => [
                      createTextVNode(" K ")
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentSearchButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=ContentSearchButton-wKecUZPr.mjs.map

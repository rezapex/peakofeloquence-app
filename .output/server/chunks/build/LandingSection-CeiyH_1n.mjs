import { R as useAppConfig, n as useUI, _ as __nuxt_component_0$2, B as __nuxt_component_1$2, k as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, computed, toRef, mergeProps, unref, withCtx, openBlock, createBlock, renderSlot, createVNode, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { twJoin, twMerge } from 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingSection",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: void 0
    },
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
    features: {
      type: Array,
      default: () => []
    },
    links: {
      type: Array,
      default: () => []
    },
    slot: {
      type: String,
      default: void 0
    },
    align: {
      type: String,
      default: "center"
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
    const appConfig = useAppConfig();
    const props = __props;
    const config = computed(() => {
      const container = twJoin(
        "gap-16 sm:gap-y-24",
        props.align === "center" ? "flex flex-col" : "grid lg:grid-cols-2 lg:items-center"
      );
      const base = twJoin(
        "",
        props.align === "center" && "text-center flex flex-col items-center",
        props.align === "right" && "lg:order-last"
      );
      return {
        wrapper: "py-24 sm:py-32",
        container,
        base,
        icon: {
          wrapper: "flex mb-6",
          base: "w-10 h-10 flex-shrink-0 text-primary"
        },
        headline: "mb-2 text-base/7 font-semibold text-primary",
        title: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl",
        description: "mt-6 text-lg/8 text-gray-600 dark:text-gray-300",
        links: "mt-8 flex flex-wrap gap-x-3 gap-y-1.5",
        features: {
          wrapper: {
            base: "mt-6 leading-7",
            list: "space-y-4",
            grid: "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
          },
          base: "relative pl-8",
          name: "font-semibold text-gray-900 dark:text-white",
          description: "text-gray-500 dark:text-gray-400 leading-6",
          icon: {
            base: "absolute left-0 top-1 h-5 w-5 text-primary",
            name: appConfig.ui.icons.check
          }
        }
      };
    });
    const { ui, attrs } = useUI("landing.section", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_UContainer, {
        class: unref(ui).container
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            if (__props.icon || _ctx.$slots.icon || (__props.headline || _ctx.$slots.headline) || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description) || (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links)) {
              _push2(`<div class="${ssrRenderClass(unref(ui).base)}"${_scopeId}>`);
              if (__props.icon || _ctx.$slots.icon) {
                _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: __props.icon,
                    class: unref(ui).icon.base
                  }, null, _parent2, _scopeId));
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else if (__props.headline || _ctx.$slots.headline) {
                _push2(`<div class="${ssrRenderClass(unref(ui).headline)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
                  _push2(`${ssrInterpolate(__props.headline)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.title || _ctx.$slots.title) {
                _push2(`<h2 class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                  _push2(`${ssrInterpolate(__props.title)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</h2>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || _ctx.$slots.description) {
                _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.align !== "center" && ((_b = __props.features) == null ? void 0 : _b.length)) {
                _push2(`<dl class="${ssrRenderClass([unref(ui).features.wrapper.base, unref(ui).features.wrapper.list])}"${_scopeId}><!--[-->`);
                ssrRenderList(__props.features, (feature) => {
                  _push2(`<div class="${ssrRenderClass(unref(ui).features.base)}"${_scopeId}><dt class="${ssrRenderClass(unref(ui).features.name)}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: feature.icon || unref(ui).features.icon.name,
                    class: unref(ui).features.icon.base,
                    "aria-hidden": "true"
                  }, null, _parent2, _scopeId));
                  if (feature.name) {
                    _push2(`<span${_scopeId}>${ssrInterpolate(feature.name)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</dt>`);
                  if (feature.description) {
                    _push2(`<dd class="${ssrRenderClass(unref(ui).features.description)}"${_scopeId}>${ssrInterpolate(feature.description)}</dd>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></dl>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.align !== "center" && (((_c = __props.links) == null ? void 0 : _c.length) || _ctx.$slots.links)) {
                _push2(`<div class="${ssrRenderClass(unref(ui).links)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.links, (link, index) => {
                    _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link, {
                      onClick: link.click
                    }), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$slots[__props.slot || "default"]) {
              ssrRenderSlot(_ctx.$slots, __props.slot || "default", {}, null, _push2, _parent2, _scopeId);
            } else if (__props.align === "right") {
              _push2(`<div${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.align === "center" && ((_d = __props.features) == null ? void 0 : _d.length)) {
              _push2(`<dl class="${ssrRenderClass([unref(ui).features.wrapper.base, unref(ui).features.wrapper.grid])}"${_scopeId}><!--[-->`);
              ssrRenderList(__props.features, (feature) => {
                _push2(`<div class="${ssrRenderClass(unref(ui).features.base)}"${_scopeId}><dt class="${ssrRenderClass(unref(ui).features.name)}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: feature.icon || unref(ui).features.icon.name,
                  class: unref(ui).features.icon.base,
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                if (feature.name) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(feature.name)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</dt>`);
                if (feature.description) {
                  _push2(`<dd class="${ssrRenderClass(unref(ui).features.description)}"${_scopeId}>${ssrInterpolate(feature.description)}</dd>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></dl>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.align === "center" && (((_e = __props.links) == null ? void 0 : _e.length) || _ctx.$slots.links)) {
              _push2(`<div class="${ssrRenderClass(unref(twMerge)(unref(ui).links, "mt-0 justify-center"))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.links, (link, index) => {
                  _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link, {
                    onClick: link.click
                  }), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.icon || _ctx.$slots.icon || (__props.headline || _ctx.$slots.headline) || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description) || (((_f = __props.links) == null ? void 0 : _f.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                key: 0,
                class: unref(ui).base
              }, [
                __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: unref(ui).icon.wrapper
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(_component_UIcon, {
                      name: __props.icon,
                      class: unref(ui).icon.base
                    }, null, 8, ["name", "class"])
                  ])
                ], 2)) : __props.headline || _ctx.$slots.headline ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: unref(ui).headline
                }, [
                  renderSlot(_ctx.$slots, "headline", {}, () => [
                    createTextVNode(toDisplayString(__props.headline), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.title || _ctx.$slots.title ? (openBlock(), createBlock("h2", {
                  key: 2,
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.align !== "center" && ((_g = __props.features) == null ? void 0 : _g.length) ? (openBlock(), createBlock("dl", {
                  key: 4,
                  class: [unref(ui).features.wrapper.base, unref(ui).features.wrapper.list]
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (feature) => {
                    return openBlock(), createBlock("div", {
                      key: feature.name,
                      class: unref(ui).features.base
                    }, [
                      createVNode("dt", {
                        class: unref(ui).features.name
                      }, [
                        createVNode(_component_UIcon, {
                          name: feature.icon || unref(ui).features.icon.name,
                          class: unref(ui).features.icon.base,
                          "aria-hidden": "true"
                        }, null, 8, ["name", "class"]),
                        feature.name ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(feature.name), 1)) : createCommentVNode("", true)
                      ], 2),
                      feature.description ? (openBlock(), createBlock("dd", {
                        key: 0,
                        class: unref(ui).features.description
                      }, toDisplayString(feature.description), 3)) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ], 2)) : createCommentVNode("", true),
                __props.align !== "center" && (((_h = __props.links) == null ? void 0 : _h.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: unref(ui).links
                }, [
                  renderSlot(_ctx.$slots, "links", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({ key: index }, link, {
                        onClick: link.click
                      }), null, 16, ["onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true),
              _ctx.$slots[__props.slot || "default"] ? renderSlot(_ctx.$slots, __props.slot || "default", { key: 1 }) : __props.align === "right" ? (openBlock(), createBlock("div", { key: 2 })) : createCommentVNode("", true),
              __props.align === "center" && ((_i = __props.features) == null ? void 0 : _i.length) ? (openBlock(), createBlock("dl", {
                key: 3,
                class: [unref(ui).features.wrapper.base, unref(ui).features.wrapper.grid]
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (feature) => {
                  return openBlock(), createBlock("div", {
                    key: feature.name,
                    class: unref(ui).features.base
                  }, [
                    createVNode("dt", {
                      class: unref(ui).features.name
                    }, [
                      createVNode(_component_UIcon, {
                        name: feature.icon || unref(ui).features.icon.name,
                        class: unref(ui).features.icon.base,
                        "aria-hidden": "true"
                      }, null, 8, ["name", "class"]),
                      feature.name ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(feature.name), 1)) : createCommentVNode("", true)
                    ], 2),
                    feature.description ? (openBlock(), createBlock("dd", {
                      key: 0,
                      class: unref(ui).features.description
                    }, toDisplayString(feature.description), 3)) : createCommentVNode("", true)
                  ], 2);
                }), 128))
              ], 2)) : createCommentVNode("", true),
              __props.align === "center" && (((_j = __props.links) == null ? void 0 : _j.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                key: 4,
                class: unref(twMerge)(unref(ui).links, "mt-0 justify-center")
              }, [
                renderSlot(_ctx.$slots, "links", {}, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index) => {
                    return openBlock(), createBlock(_component_UButton, mergeProps({ key: index }, link, {
                      onClick: link.click
                    }), null, 16, ["onClick"]);
                  }), 128))
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LandingSection-CeiyH_1n.mjs.map

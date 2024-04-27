import { s as nuxtLinkProps, y as config$a, l as useUI, t as getNuxtLinkProps, v as getSlotChildrenText, h as _export_sfc, w as __nuxt_component_0$6, z as __nuxt_component_1$2, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, _ as __nuxt_component_0$2, j as __nuxt_component_0$4, x as createSharedComposable, k as __nuxt_component_1$1, i as __nuxt_component_1 } from './server.mjs';
import { useSSRContext, defineComponent, computed, ref, useSlots, toRef, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, renderSlot, createTextVNode, toDisplayString, Fragment, renderList, withAsyncContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { twJoin } from 'tailwind-merge';
import { _ as _sfc_main$8 } from './LandingSection-CftQmrqB.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-img--_9dupMN.mjs';
import { _ as __nuxt_component_0 } from './Card-VYYpAeUB.mjs';
import { a as useMouse } from './index-Dwm5YEgk.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'shiki/core';
import '@shikijs/transformers';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingHero",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    links: {
      type: Array,
      default: () => []
    },
    orientation: {
      type: String,
      default: "vertical"
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
    const props = __props;
    const config2 = computed(() => {
      const container = twJoin(
        "gap-16 sm:gap-y-24",
        props.orientation === "vertical" && "flex flex-col",
        props.orientation === "horizontal" && "grid lg:grid-cols-2 lg:items-center"
      );
      const base = props.orientation === "vertical" ? "text-center" : "";
      const links = twJoin(
        "mt-10 flex flex-wrap gap-x-6 gap-y-3",
        props.orientation === "vertical" && "justify-center"
      );
      return {
        wrapper: "py-24 sm:py-32 md:py-40 relative",
        container,
        base,
        headline: "mb-10",
        title: "text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl",
        description: "mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300",
        links
      };
    });
    const { ui, attrs } = useUI("landing.hero", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UButton = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_UContainer, {
        class: unref(ui).container
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).base)}"${_scopeId}>`);
            if (_ctx.$slots.headline) {
              _push2(`<div class="${ssrRenderClass(unref(ui).headline)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "headline", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, () => {
              _push2(`${ssrInterpolate(__props.title)}`);
            }, _push2, _parent2, _scopeId);
            _push2(`</h1>`);
            if (__props.description || _ctx.$slots.description) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links) {
              _push2(`<div class="${ssrRenderClass(unref(ui).links)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.links, (link, index2) => {
                  _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index2 }, link, {
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
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", {
                class: unref(ui).base
              }, [
                _ctx.$slots.headline ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: unref(ui).headline
                }, [
                  renderSlot(_ctx.$slots, "headline")
                ], 2)) : createCommentVNode("", true),
                createVNode("h1", {
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                ((_b = __props.links) == null ? void 0 : _b.length) || _ctx.$slots.links ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: unref(ui).links
                }, [
                  renderSlot(_ctx.$slots, "links", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index2) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({ key: index2 }, link, {
                        onClick: link.click
                      }), null, 16, ["onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              renderSlot(_ctx.$slots, "default")
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingHero.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-900/5 dark:bg-white/5 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 rounded-xl lg:-m-4 p-4" }, _attrs))}><div class="aspect-w-16 aspect-h-9 rounded-lg relative overflow-hidden border border-dashed border-gray-900/10 dark:border-white/10">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    width: "1792",
    height: "1024",
    src: "/landing.webp",
    class: "absolute inset-0 h-full w-full object-cover rounded-lg"
  }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Placeholder.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageGrid",
  __ssrInlineRender: true,
  props: {
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
    const config2 = {
      wrapper: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.grid", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageGrid.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const useSharedMouse = createSharedComposable(useMouse);
function useSharedMouseInElement(target, options = {}) {
  const { x, y } = useSharedMouse(options);
  ref(target != null ? target : void 0);
  const elementX = ref(0);
  const elementY = ref(0);
  return {
    x,
    y,
    elementX,
    elementY
  };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingCard",
  __ssrInlineRender: true,
  props: {
    ...nuxtLinkProps,
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
    color: {
      type: String,
      default: "primary"
    },
    orientation: {
      type: String,
      default: "vertical"
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
    const props = __props;
    const colorLight = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config$a[props.color]) == null ? void 0 : _a["500"]) || config$a[props.color] || props.color;
    });
    const colorDark = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config$a[props.color]) == null ? void 0 : _a["400"]) || config$a[props.color] || props.color;
    });
    const config$1 = computed(() => {
      const base = twJoin(
        "gap-x-8 gap-y-4 rounded-xl flex-1",
        props.orientation === "vertical" && "flex flex-col",
        !!slots.default && props.orientation === "horizontal" && "grid lg:grid-cols-2 lg:items-center"
      );
      return {
        wrapper: "relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow",
        to: "hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow duration-200",
        base: "flex-1 flex flex-col overflow-hidden",
        container: "",
        body: {
          base
        },
        background: "bg-white dark:bg-gray-900 hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-[background-opacity]",
        ring: "",
        rounded: "rounded-xl",
        shadow: "",
        icon: {
          wrapper: "mb-2 pointer-events-none",
          base: "w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
        },
        title: "text-gray-900 dark:text-white text-base font-bold truncate",
        description: "text-[15px] text-gray-500 dark:text-gray-400 mt-1"
      };
    });
    const el = ref();
    const slots = useSlots();
    const { elementX, elementY } = useSharedMouseInElement(el);
    const { ui, attrs } = useUI("landing.card", toRef(props, "ui"), config$1, toRef(props, "class"), true);
    const nuxtLinkBind = computed(() => getNuxtLinkProps(props));
    const ariaLabel = computed(() => (props.title || slots.title && getSlotChildrenText(slots.title()) || "Card link").trim());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UIcon = __nuxt_component_1$2;
      const _cssVars = { style: {
        "--fb9dae28": unref(colorLight),
        "--674828e0": unref(colorDark)
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        style: {
          "--x": `${unref(elementX)}px`,
          "--y": `${unref(elementY)}px`
        },
        class: [unref(ui).wrapper, _ctx.to && unref(ui).to]
      }, unref(attrs), _attrs, _cssVars))} data-v-53db7729>`);
      _push(ssrRenderComponent(_component_UCard, { ui: unref(ui) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).container)}" data-v-53db7729${_scopeId}>`);
            if (_ctx.to) {
              _push2(ssrRenderComponent(_component_NuxtLink, mergeProps({ "aria-label": unref(ariaLabel) }, unref(nuxtLinkBind), {
                class: "focus:outline-none",
                tabindex: "-1"
              }), {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="absolute inset-0" aria-hidden="true" data-v-53db7729${_scopeId2}></span>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: "absolute inset-0",
                        "aria-hidden": "true"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.icon || _ctx.$slots.icon) {
              _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: __props.icon,
                  class: unref(ui).icon.base
                }, null, _parent2, _scopeId));
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.title || _ctx.$slots.title) {
              _push2(`<p class="${ssrRenderClass(unref(ui).title)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || _ctx.$slots.description) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "container", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (_ctx.$slots.default) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: unref(ui).container
              }, [
                _ctx.to ? (openBlock(), createBlock(_component_NuxtLink, mergeProps({
                  key: 0,
                  "aria-label": unref(ariaLabel)
                }, unref(nuxtLinkBind), {
                  class: "focus:outline-none",
                  tabindex: "-1"
                }), {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: "absolute inset-0",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 16, ["aria-label"])) : createCommentVNode("", true),
                __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: unref(ui).icon.wrapper
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(_component_UIcon, {
                      name: __props.icon,
                      class: unref(ui).icon.base
                    }, null, 8, ["name", "class"])
                  ], true)
                ], 2)) : createCommentVNode("", true),
                __props.title || _ctx.$slots.title ? (openBlock(), createBlock("p", {
                  key: 2,
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ], true)
                ], 2)) : createCommentVNode("", true),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ], true)
                ], 2)) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "container", {}, void 0, true)
              ], 2),
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-53db7729"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageColumns",
  __ssrInlineRender: true,
  props: {
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
    const config2 = {
      wrapper: "column-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.columns", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageColumns.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingTestimonial",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: void 0
    },
    quote: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      default: void 0
    },
    card: {
      type: Boolean,
      default: true
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
    const props = __props;
    const config2 = computed(() => {
      const card = {};
      if (!props.card) {
        card.ring = "";
        card.rounded = "";
        card.background = "";
        card.shadow = "";
        card.divide = "";
      }
      const padding = props.card ? void 0 : "";
      return {
        ...card,
        body: {
          base: "flex flex-col",
          padding
        },
        wrapper: "relative",
        quote: "text-gray-600 dark:text-gray-300",
        icon: {
          wrapper: "mb-6 flex",
          base: "w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
        },
        author: {
          wrapper: "flex items-center gap-3 mt-6 relative",
          name: "font-semibold text-gray-900 dark:text-white text-sm",
          description: "text-gray-500 dark:text-gray-400 text-sm",
          avatar: {
            base: "",
            size: "md"
          }
        }
      };
    });
    const { ui, attrs } = useUI("landing.testimonial", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UAvatar = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), { ui: unref(ui) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (__props.icon || _ctx.$slots.icon) {
              _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: __props.icon,
                  class: unref(ui).icon.base
                }, null, _parent2, _scopeId));
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.quote || _ctx.$slots.quote) {
              _push2(`<q class="${ssrRenderClass(unref(ui).quote)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "quote", {}, () => {
                _push2(`${ssrInterpolate(__props.quote)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</q>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.author) {
              _push2(`<div class="${ssrRenderClass(unref(ui).author.wrapper)}"${_scopeId}>`);
              if (__props.author.avatar) {
                _push2(ssrRenderComponent(_component_UAvatar, mergeProps({
                  alt: __props.author.name
                }, { size: unref(ui).author.avatar.size, ...__props.author.avatar }, {
                  class: unref(ui).author.avatar.base
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}>`);
              if (__props.author.to) {
                _push2(ssrRenderComponent(unref(__nuxt_component_0$6), mergeProps({
                  "aria-label": __props.author.name
                }, unref(getNuxtLinkProps)(__props.author), {
                  class: "focus:outline-none",
                  tabindex: "-1"
                }), {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="absolute inset-0" aria-hidden="true"${_scopeId2}></span>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: "absolute inset-0",
                          "aria-hidden": "true"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="${ssrRenderClass(unref(ui).author.name)}"${_scopeId}>${ssrInterpolate(__props.author.name)}</p><p class="${ssrRenderClass(unref(ui).author.description)}"${_scopeId}>${ssrInterpolate(__props.author.description)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
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
                ], 2)) : createCommentVNode("", true),
                __props.quote || _ctx.$slots.quote ? (openBlock(), createBlock("q", {
                  key: 1,
                  class: unref(ui).quote
                }, [
                  renderSlot(_ctx.$slots, "quote", {}, () => [
                    createTextVNode(toDisplayString(__props.quote), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.author ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: unref(ui).author.wrapper
                }, [
                  __props.author.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                    key: 0,
                    alt: __props.author.name
                  }, { size: unref(ui).author.avatar.size, ...__props.author.avatar }, {
                    class: unref(ui).author.avatar.base
                  }), null, 16, ["alt", "class"])) : createCommentVNode("", true),
                  createVNode("div", null, [
                    __props.author.to ? (openBlock(), createBlock(unref(__nuxt_component_0$6), mergeProps({
                      key: 0,
                      "aria-label": __props.author.name
                    }, unref(getNuxtLinkProps)(__props.author), {
                      class: "focus:outline-none",
                      tabindex: "-1"
                    }), {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "absolute inset-0",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    }, 16, ["aria-label"])) : createCommentVNode("", true),
                    createVNode("p", {
                      class: unref(ui).author.name
                    }, toDisplayString(__props.author.name), 3),
                    createVNode("p", {
                      class: unref(ui).author.description
                    }, toDisplayString(__props.author.description), 3)
                  ])
                ], 2)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingTestimonial.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingCTA",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    card: {
      type: Boolean,
      default: true
    },
    links: {
      type: Array,
      default: () => []
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
    const props = __props;
    const config2 = computed(() => {
      const card = {};
      if (props.card) {
        card.rounded = "rounded-xl";
      } else {
        card.ring = "";
        card.rounded = "";
        card.background = "";
        card.shadow = "";
        card.divide = "";
      }
      const container = twJoin(
        "",
        props.align === "center" && "text-center",
        props.align === "right" && "lg:order-last"
      );
      const base = twJoin(
        "flex flex-col",
        props.align !== "center" && "lg:grid lg:grid-cols-2 lg:items-center",
        "gap-16 sm:gap-y-24"
      );
      const padding = props.card ? "py-24 sm:py-32 sm:px-16" : "py-24 sm:py-32 px-6 lg:px-8";
      const links = twJoin(
        "mt-10 flex items-center gap-x-6",
        props.align === "center" && "justify-center"
      );
      return {
        ...card,
        wrapper: "relative",
        container,
        body: {
          base,
          padding
        },
        title: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl",
        description: "mt-6 text-lg/8 text-gray-600 dark:text-gray-300",
        links
      };
    });
    const { ui, attrs } = useUI("landing.cta", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_UButton = __nuxt_component_0$4;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), { ui: unref(ui) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).container)}"${_scopeId}>`);
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
            if (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links) {
              _push2(`<div class="${ssrRenderClass(unref(ui).links)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.links, (link, index2) => {
                  _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index2 }, link, {
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
            if (_ctx.$slots.default) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else if (__props.align === "right") {
              _push2(`<div${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: unref(ui).container
              }, [
                __props.title || _ctx.$slots.title ? (openBlock(), createBlock("h2", {
                  key: 0,
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                ((_b = __props.links) == null ? void 0 : _b.length) || _ctx.$slots.links ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: unref(ui).links
                }, [
                  renderSlot(_ctx.$slots, "links", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index2) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({ key: index2 }, link, {
                        onClick: link.click
                      }), null, 16, ["onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : __props.align === "right" ? (openBlock(), createBlock("div", { key: 1 })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingCTA.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("index", () => queryContent("/").findOne())), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    useSeoMeta({
      titleTemplate: "PeakofEloquence.org",
      title: page.value.title,
      ogTitle: page.value.title,
      description: page.value.description,
      ogDescription: page.value.description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULandingHero = _sfc_main$7;
      const _component_UBadge = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_ULandingSection = _sfc_main$8;
      const _component_Placeholder = __nuxt_component_5;
      const _component_UPageGrid = _sfc_main$5;
      const _component_ULandingCard = __nuxt_component_7;
      const _component_UPageColumns = _sfc_main$3;
      const _component_ULandingTestimonial = _sfc_main$2;
      const _component_ULandingCTA = _sfc_main$1;
      if (unref(page)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-24ca66b4>`);
        _push(ssrRenderComponent(_component_ULandingHero, {
          title: unref(page).hero.title,
          description: unref(page).hero.description,
          links: unref(page).hero.links
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 class="font-serif font-light" data-v-24ca66b4${_scopeId}>${ssrInterpolate(unref(page).hero.title)}</h1>`);
            } else {
              return [
                createVNode("h1", { class: "font-serif font-light" }, toDisplayString(unref(page).hero.title), 1)
              ];
            }
          }),
          headline: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(page).hero.headline) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  variant: "subtle",
                  size: "lg",
                  class: "relative rounded-full font-semibold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: unref(page).hero.headline.to,
                        target: "_blank",
                        class: "focus:outline-none",
                        tabindex: "-1"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="absolute inset-0" aria-hidden="true" data-v-24ca66b4${_scopeId3}></span>`);
                          } else {
                            return [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(unref(page).hero.headline.label)} `);
                      if (unref(page).hero.headline.icon) {
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: unref(page).hero.headline.icon,
                          class: "ml-1 w-4 h-4 pointer-events-none"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: unref(page).hero.headline.to,
                          target: "_blank",
                          class: "focus:outline-none",
                          tabindex: "-1"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: "absolute inset-0",
                              "aria-hidden": "true"
                            })
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createTextVNode(" " + toDisplayString(unref(page).hero.headline.label) + " ", 1),
                        unref(page).hero.headline.icon ? (openBlock(), createBlock(_component_UIcon, {
                          key: 0,
                          name: unref(page).hero.headline.icon,
                          class: "ml-1 w-4 h-4 pointer-events-none"
                        }, null, 8, ["name"])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(page).hero.headline ? (openBlock(), createBlock(_component_UBadge, {
                  key: 0,
                  variant: "subtle",
                  size: "lg",
                  class: "relative rounded-full font-semibold"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, {
                      to: unref(page).hero.headline.to,
                      target: "_blank",
                      class: "focus:outline-none",
                      tabindex: "-1"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "absolute inset-0",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    }, 8, ["to"]),
                    createTextVNode(" " + toDisplayString(unref(page).hero.headline.label) + " ", 1),
                    unref(page).hero.headline.icon ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: unref(page).hero.headline.icon,
                      class: "ml-1 w-4 h-4 pointer-events-none"
                    }, null, 8, ["name"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" data-v-24ca66b4${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, { class: "!pt-0 font-serif" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Placeholder, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Placeholder)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--[-->`);
        ssrRenderList(unref(page).sections, (section, index2) => {
          _push(ssrRenderComponent(_component_ULandingSection, {
            key: index2,
            title: section.title,
            description: section.description,
            align: section.align,
            features: section.features
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Placeholder, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Placeholder)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_ULandingSection, {
          title: unref(page).features.title,
          description: unref(page).features.description
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageGrid, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).features.items, (item, index2) => {
                      _push3(ssrRenderComponent(_component_ULandingCard, mergeProps({ key: index2 }, item), null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index2) => {
                        return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index2 }, item), null, 16);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageGrid, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index2) => {
                      return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index2 }, item), null, 16);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, {
          headline: unref(page).testimonials.headline,
          title: unref(page).testimonials.title,
          description: unref(page).testimonials.description
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageColumns, { class: "xl:columns-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).testimonials.items, (testimonial, index2) => {
                      _push3(`<div class="break-inside-avoid" data-v-24ca66b4${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).testimonials.items, (testimonial, index2) => {
                        return openBlock(), createBlock("div", {
                          key: index2,
                          class: "break-inside-avoid"
                        }, [
                          createVNode(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageColumns, { class: "xl:columns-4" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).testimonials.items, (testimonial, index2) => {
                      return openBlock(), createBlock("div", {
                        key: index2,
                        class: "break-inside-avoid"
                      }, [
                        createVNode(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ULandingCTA, mergeProps(unref(page).cta, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ULandingCTA, mergeProps(unref(page).cta, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-24ca66b4"]]);

export { index as default };
//# sourceMappingURL=index-6wBbjOpl.mjs.map

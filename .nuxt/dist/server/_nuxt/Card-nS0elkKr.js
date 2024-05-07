import { _ as __nuxt_component_0 } from "./Card-ru04_bD8.js";
import { Q as useAppConfig, n as useUI, z as config, x as __nuxt_component_0$1, A as __nuxt_component_1 } from "../server.mjs";
import "./MDCSlot-9evsqLEJ.js";
import { defineComponent, computed, toRef, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { s as ssrRenderSlot } from "./ssrSlot-BkEai9bA.js";
import { r as renderSlot } from "./slot-DnKL8kmw.js";
import "tailwind-merge";
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
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: void 0
    },
    color: {
      type: String,
      default: "primary"
    },
    to: {
      type: String,
      default: void 0
    },
    target: {
      type: String,
      default: void 0
    },
    title: {
      type: String,
      default: void 0
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
    const config$1 = computed(() => ({
      wrapper: "relative group overflow-hidden flex items-center rounded-lg",
      to: "hover:ring-1 hover:ring-[--color-light] dark:hover:ring-[--color-dark] hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
      icon: {
        base: "w-6 h-6 mb-4 inline-flex items-center text-[--color-light] dark:text-[--color-dark] pointer-events-none"
      },
      body: {
        base: "flex-1"
      },
      externalIcon: {
        name: appConfig.ui.icons.external,
        base: "w-4 h-4 absolute right-2 top-2 text-gray-400 dark:text-gray-500 group-hover:text-[--color-light] dark:group-hover:text-[--color-dark]"
      },
      title: "text-gray-900 dark:text-white font-semibold text-base my-0",
      description: "text-[15px] text-gray-500 dark:text-gray-400 mt-1 mb-0"
    }));
    const props = __props;
    const { ui, attrs } = useUI("content.card", toRef(props, "ui"), config$1, toRef(props, "class"), true);
    const colorLight = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config[props.color]) == null ? void 0 : _a["500"]) || config[props.color] || props.color;
    });
    const colorDark = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config[props.color]) == null ? void 0 : _a["400"]) || config[props.color] || props.color;
    });
    const target = computed(() => props.target || (props.to && props.to.startsWith("http") ? "_blank" : void 0));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        class: [unref(ui).wrapper, __props.to && unref(ui).to]
      }, unref(attrs), {
        ui: unref(ui),
        style: { "--color-light": unref(colorLight), "--color-dark": unref(colorDark) }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.to) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: __props.to,
                target: unref(target),
                class: "focus:outline-none",
                tabindex: "-1"
              }, {
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
            if (__props.icon) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: __props.icon,
                class: unref(ui).icon.base
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!!__props.to && unref(target) === "_blank") {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(ui).externalIcon.name,
                class: unref(ui).externalIcon.base
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>${ssrInterpolate(__props.title)}</p>`);
            if (_ctx.$slots.default) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", { unwrap: "p" }, null, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.to ? (openBlock(), createBlock(_component_NuxtLink, {
                key: 0,
                to: __props.to,
                target: unref(target),
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
              }, 8, ["to", "target"])) : createCommentVNode("", true),
              __props.icon ? (openBlock(), createBlock(_component_UIcon, {
                key: 1,
                name: __props.icon,
                class: unref(ui).icon.base
              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
              !!__props.to && unref(target) === "_blank" ? (openBlock(), createBlock(_component_UIcon, {
                key: 2,
                name: unref(ui).externalIcon.name,
                class: unref(ui).externalIcon.base
              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
              createVNode("p", {
                class: unref(ui).title
              }, toDisplayString(__props.title), 3),
              _ctx.$slots.default ? (openBlock(), createBlock("p", {
                key: 3,
                class: unref(ui).description
              }, [
                renderSlot(_ctx.$slots, "default", { unwrap: "p" })
              ], 2)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Card-nS0elkKr.js.map

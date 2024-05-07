import { I as I$1, G as A$2, H as k$1, J as s$3, K as o$2, L as f$1, M as E$2, N as u$3, T as T$2, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, O as o$1, n as useUI, P as l$3, Q as useId, R as useAppConfig, _ as __nuxt_component_0$2, B as __nuxt_component_1$2, k as __nuxt_component_0$4, j as __nuxt_component_1, S as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, onMounted, onUnmounted, unref, ref, computed, provide, inject, watch, h, Fragment, useSSRContext, withAsyncContext, withCtx, isRef, createVNode, mergeProps, openBlock, createBlock, renderList, toRef, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createSlots } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';
import { twJoin } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import { _ as __nuxt_component_0 } from './Card-ru04_bD8.mjs';
import { _ as __nuxt_component_2 } from './Divider-BDQDqPx6.mjs';
import { _ as _sfc_main$7 } from './LandingSection-CeiyH_1n.mjs';
import { d as defineOgImage } from './defineOgImage-DSkpf_RL.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer3.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/devalue/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/ssr/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-raw/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ipx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/cookie-es/dist/index.mjs';

function d$1(u2, e, r) {
  let i = ref(r == null ? void 0 : r.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i.value), function(t) {
    return f2.value || (i.value = t), e == null ? void 0 : e(t);
  }];
}
function p(i) {
  var t, r;
  let s2 = (t = i == null ? void 0 : i.form) != null ? t : i.closest("form");
  if (s2) {
    for (let n of s2.elements)
      if (n !== i && (n.tagName === "INPUT" && n.type === "submit" || n.tagName === "BUTTON" && n.type === "submit" || n.nodeName === "INPUT" && n.type === "image")) {
        n.click();
        return;
      }
    (r = s2.requestSubmit) == null || r.call(s2);
  }
}
let a = Symbol("LabelContext");
function d() {
  let t = inject(a, null);
  if (t === null) {
    let n = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, d), n;
  }
  return t;
}
function E({ slot: t = {}, name: n = "Label", props: i = {} } = {}) {
  let e = ref([]);
  function o2(r) {
    return e.value.push(r), () => {
      let l2 = e.value.indexOf(r);
      l2 !== -1 && e.value.splice(l2, 1);
    };
  }
  return provide(a, { register: o2, slot: t, name: n, props: i }), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
defineComponent({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(t, { slots: n, attrs: i }) {
  var r;
  let e = (r = t.id) != null ? r : `headlessui-label-${I$1()}`, o2 = d();
  return onMounted(() => onUnmounted(o2.register(e))), () => {
    let { name: l2 = "Label", slot: p2 = {}, props: c = {} } = o2, { passive: f2, ...s2 } = t, u2 = { ...Object.entries(c).reduce((b, [g, m]) => Object.assign(b, { [g]: unref(m) }), {}), id: e };
    return f2 && (delete u2.onClick, delete u2.htmlFor, delete s2.onClick), A$2({ ourProps: u2, theirProps: s2, slot: p2, attrs: i, slots: n, name: l2 });
  };
} });
let C = Symbol("GroupContext");
defineComponent({ name: "SwitchGroup", props: { as: { type: [Object, String], default: "template" } }, setup(l2, { slots: c, attrs: i }) {
  let r = ref(null), f2 = E({ name: "SwitchLabel", props: { htmlFor: computed(() => {
    var t;
    return (t = r.value) == null ? void 0 : t.id;
  }), onClick(t) {
    r.value && (t.currentTarget.tagName === "LABEL" && t.preventDefault(), r.value.click(), r.value.focus({ preventScroll: true }));
  } } }), p2 = k$1({ name: "SwitchDescription" });
  return provide(C, { switchRef: r, labelledby: f2, describedby: p2 }), () => A$2({ theirProps: l2, ourProps: {}, slot: {}, slots: c, attrs: i, name: "SwitchGroup" });
} });
let ue = defineComponent({ name: "Switch", emits: { "update:modelValue": (l2) => true }, props: { as: { type: [Object, String], default: "button" }, modelValue: { type: Boolean, default: void 0 }, defaultChecked: { type: Boolean, optional: true }, form: { type: String, optional: true }, name: { type: String, optional: true }, value: { type: String, optional: true }, id: { type: String, default: null }, disabled: { type: Boolean, default: false }, tabIndex: { type: Number, default: 0 } }, inheritAttrs: false, setup(l2, { emit: c, attrs: i, slots: r, expose: f$1$1 }) {
  var h$1;
  let p$1 = (h$1 = l2.id) != null ? h$1 : `headlessui-switch-${I$1()}`, n = inject(C, null), [t, s$1] = d$1(computed(() => l2.modelValue), (e) => c("update:modelValue", e), computed(() => l2.defaultChecked));
  function m() {
    s$1(!t.value);
  }
  let E2 = ref(null), o$2$1 = n === null ? E2 : n.switchRef, L = s$3(computed(() => ({ as: l2.as, type: i.type })), o$2$1);
  f$1$1({ el: o$2$1, $el: o$2$1 });
  function D(e) {
    e.preventDefault(), m();
  }
  function R(e) {
    e.key === o$1.Space ? (e.preventDefault(), m()) : e.key === o$1.Enter && p(e.currentTarget);
  }
  function x(e) {
    e.preventDefault();
  }
  let d2 = computed(() => {
    var e, a2;
    return (a2 = (e = o$2(o$2$1)) == null ? void 0 : e.closest) == null ? void 0 : a2.call(e, "form");
  });
  return onMounted(() => {
    watch([d2], () => {
      if (!d2.value || l2.defaultChecked === void 0)
        return;
      function e() {
        s$1(l2.defaultChecked);
      }
      return d2.value.addEventListener("reset", e), () => {
        var a2;
        (a2 = d2.value) == null || a2.removeEventListener("reset", e);
      };
    }, { immediate: true });
  }), () => {
    let { name: e, value: a2, form: K, tabIndex: y, ...b } = l2, T$1 = { checked: t.value }, B = { id: p$1, ref: o$2$1, role: "switch", type: L.value, tabIndex: y === -1 ? 0 : y, "aria-checked": t.value, "aria-labelledby": n == null ? void 0 : n.labelledby.value, "aria-describedby": n == null ? void 0 : n.describedby.value, onClick: D, onKeyup: R, onKeypress: x };
    return h(Fragment, [e != null && t.value != null ? h(f$1, E$2({ features: u$3.Hidden, as: "input", type: "checkbox", hidden: true, readOnly: true, checked: t.value, form: K, disabled: b.disabled, name: e, value: a2 })) : null, A$2({ ourProps: B, theirProps: { ...i, ...T$2(b, ["modelValue", "defaultChecked"]) }, slot: T$1, attrs: i, slots: r, name: "Switch" })]);
  };
} });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageHero",
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
    icon: {
      type: String,
      default: void 0
    },
    links: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: "left"
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
    const config = computed(() => {
      const container = twJoin(
        "gap-8 sm:gap-y-16",
        props.align === "center" ? "flex flex-col" : "grid lg:grid-cols-2 lg:items-center"
      );
      const base = twJoin(
        "",
        props.align === "center" && "text-center flex flex-col items-center",
        props.align === "right" && "lg:order-last"
      );
      const links = twJoin(
        "mt-8 flex flex-wrap gap-x-3 gap-y-1.5",
        props.align === "center" && "justify-center"
      );
      return {
        wrapper: "py-8 sm:py-16",
        container,
        base,
        icon: {
          wrapper: "flex mb-4",
          base: "w-10 h-10 flex-shrink-0 text-primary"
        },
        title: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl",
        description: "mt-4 text-lg text-gray-500 dark:text-gray-400",
        links
      };
    });
    const { ui, attrs } = useUI("page.hero", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}><div class="${ssrRenderClass(unref(ui).container)}">`);
      if (__props.icon || _ctx.$slots.icon || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description) || (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links)) {
        _push(`<div class="${ssrRenderClass(unref(ui).base)}">`);
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
        _push(`<h1 class="${ssrRenderClass(unref(ui).title)}">`);
        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
          _push(`${ssrInterpolate(__props.title)}`);
        }, _push, _parent);
        _push(`</h1>`);
        if (__props.description || _ctx.$slots.description) {
          _push(`<p class="${ssrRenderClass(unref(ui).description)}">`);
          ssrRenderSlot(_ctx.$slots, "description", {}, () => {
            _push(`${ssrInterpolate(__props.description)}`);
          }, _push, _parent);
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        if (((_b = __props.links) == null ? void 0 : _b.length) || _ctx.$slots.links) {
          _push(`<div class="${ssrRenderClass(unref(ui).links)}">`);
          ssrRenderSlot(_ctx.$slots, "links", {}, () => {
            _push(`<!--[-->`);
            ssrRenderList(__props.links, (link, index) => {
              _push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link, {
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
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$slots.default) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else if (__props.align === "right") {
        _push(`<div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageHero.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PricingToggle",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    left: {
      type: String,
      default: "Monthly"
    },
    right: {
      type: String,
      default: "Yearly"
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
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const config = {
      wrapper: "ring-1 ring-gray-300 dark:ring-gray-700 flex items-center relative h-8 w-auto flex-shrink-0 cursor-pointer rounded-full p-1 w-full focus:outline-none",
      marker: "w-1/2 text-white dark:text-gray-900 pointer-events-none inline-block h-6 transform rounded-full bg-gray-900 dark:bg-white shadow transition duration-200 ease-in-out z-0 relative",
      active: "text-white dark:text-gray-900",
      inactive: "text-gray-500 dark:text-gray-400",
      base: "absolute inset-y-0 w-1/2 flex items-center justify-center pointer-events-none z-[1] transition-colors duration-200 select-none text-xs font-semibold flex-shrink-0",
      left: "left-0",
      right: "right-0"
    };
    const isYearly = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const { ui, attrs } = useUI("pricing.toggle", toRef(props, "ui"), config, toRef(props, "class"), true);
    l$3(() => useId("$qibiFAg981"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ue), mergeProps({
        modelValue: unref(isYearly),
        "onUpdate:modelValue": ($event) => isRef(isYearly) ? isYearly.value = $event : null,
        "aria-label": "pricing toggle",
        class: unref(ui).wrapper
      }, unref(attrs), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.left || _ctx.$slots.left) {
              _push2(`<span aria-hidden="true" class="${ssrRenderClass([unref(ui).base, unref(ui).left, unref(isYearly) ? unref(ui).inactive : unref(ui).active])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "left", {}, () => {
                _push2(`${ssrInterpolate(__props.left)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.right || _ctx.$slots.right) {
              _push2(`<span aria-hidden="true" class="${ssrRenderClass([unref(ui).base, unref(ui).right, unref(isYearly) ? unref(ui).active : unref(ui).inactive])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "right", {}, () => {
                _push2(`${ssrInterpolate(__props.right)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span aria-hidden="true" class="${ssrRenderClass([unref(isYearly) ? "translate-x-full" : "translate-x-0", unref(ui).marker])}"${_scopeId}></span>`);
          } else {
            return [
              __props.left || _ctx.$slots.left ? (openBlock(), createBlock("span", {
                key: 0,
                "aria-hidden": "true",
                class: [unref(ui).base, unref(ui).left, unref(isYearly) ? unref(ui).inactive : unref(ui).active]
              }, [
                renderSlot(_ctx.$slots, "left", {}, () => [
                  createTextVNode(toDisplayString(__props.left), 1)
                ])
              ], 2)) : createCommentVNode("", true),
              __props.right || _ctx.$slots.right ? (openBlock(), createBlock("span", {
                key: 1,
                "aria-hidden": "true",
                class: [unref(ui).base, unref(ui).right, unref(isYearly) ? unref(ui).active : unref(ui).inactive]
              }, [
                renderSlot(_ctx.$slots, "right", {}, () => [
                  createTextVNode(toDisplayString(__props.right), 1)
                ])
              ], 2)) : createCommentVNode("", true),
              createVNode("span", {
                "aria-hidden": "true",
                class: [unref(isYearly) ? "translate-x-full" : "translate-x-0", unref(ui).marker]
              }, null, 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/pricing/PricingToggle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PricingGrid",
  __ssrInlineRender: true,
  props: {
    compact: {
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
    const props = __props;
    const config = {
      wrapper: "flex flex-col lg:grid lg:grid-cols-3 w-full justify-center items-center gap-8"
    };
    const { ui, attrs } = useUI("pricing.grid", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(ui).wrapper, __props.compact && "gap-x-0"]
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/pricing/PricingGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PricingCard",
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
    orientation: {
      type: String,
      default: "vertical"
    },
    align: {
      type: String,
      default: "bottom"
    },
    highlight: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Boolean,
      default: false
    },
    features: {
      type: Array,
      default: () => []
    },
    badge: {
      type: Object,
      default: void 0
    },
    button: {
      type: Object,
      default: void 0
    },
    price: {
      type: String,
      default: void 0
    },
    discount: {
      type: String,
      default: void 0
    },
    cycle: {
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
    const props = __props;
    const appConfig = useAppConfig();
    const config = computed(() => {
      const base = twJoin(
        "flex-1 gap-6 lg:gap-x-8 xl:gap-x-10 flex flex-col",
        props.orientation === "horizontal" ? "lg:grid lg:grid-cols-10" : ""
      );
      const left = props.orientation === "horizontal" ? "lg:col-span-7" : "";
      const right = props.orientation === "horizontal" ? "flex flex-col lg:items-center justify-center gap-y-6 lg:col-span-3 border-t lg:border-l lg:border-t-0 border-gray-200 dark:border-gray-800 pt-6 lg:pt-0 lg:pl-8 xl:pl-10" : "";
      return {
        wrapper: "relative flex flex-col self-stretch w-full",
        highlight: "ring-2 ring-primary dark:ring-primary",
        scale: "lg:scale-[1.1] lg:z-10",
        rounded: "rounded-xl",
        header: {
          padding: "p-6 lg:px-8 xl:px-10"
        },
        body: {
          base,
          padding: "p-6 lg:p-8 xl:p-10"
        },
        footer: {
          padding: "p-6 lg:px-8 xl:px-10"
        },
        inner: "flex items-center gap-3",
        title: "text-2xl text-gray-900 dark:text-white sm:text-3xl font-semibold truncate",
        description: "text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2",
        amount: {
          base: "flex flex-row items-baseline gap-x-1",
          discount: "text-gray-500 dark:text-gray-400 line-through text-xl sm:text-2xl font-medium",
          price: "text-gray-900 dark:text-white text-2xl sm:text-4xl font-semibold",
          cycle: "text-gray-500 dark:text-gray-400 text-sm/6 font-medium truncate"
        },
        features: {
          vertical: "space-y-3 text-sm",
          horizontal: "grid lg:grid-cols-2 text-sm gap-3",
          item: {
            base: "flex items-center gap-x-3 min-w-0",
            label: "text-gray-600 dark:text-gray-400 truncate",
            icon: {
              base: "w-5 h-5 flex-shrink-0 text-primary",
              name: appConfig.ui.icons.check
            }
          }
        },
        divider: "my-6 lg:my-8",
        left,
        right
      };
    });
    const { ui, attrs } = useUI("pricing.card", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_UBadge = __nuxt_component_1;
      const _component_UDivider = __nuxt_component_2;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UButton = __nuxt_component_0$4;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        class: [unref(ui).wrapper, __props.highlight && unref(ui).highlight, __props.scale && unref(ui).scale]
      }, unref(attrs), { ui: unref(ui) }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).left)}"${_scopeId}><div class="${ssrRenderClass(unref(ui).inner)}"${_scopeId}>`);
            if (__props.title || _ctx.$slots.title) {
              _push2(`<p class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.badge) {
              _push2(ssrRenderComponent(_component_UBadge, { variant: "subtle", ...__props.badge }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.description || _ctx.$slots.description) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "horizontal") {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_UDivider, {
                class: unref(ui).divider
              }, null, _parent2, _scopeId));
              if (((_a = __props.features) == null ? void 0 : _a.length) || _ctx.$slots.features) {
                _push2(`<div class="flex-1"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "features", {}, () => {
                  var _a2;
                  if ((_a2 = __props.features) == null ? void 0 : _a2.length) {
                    _push2(`<ul class="${ssrRenderClass(unref(ui).features.horizontal)}"${_scopeId}><!--[-->`);
                    ssrRenderList(__props.features, (offer, index) => {
                      _push2(`<li class="${ssrRenderClass(unref(ui).features.item.base)}"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_UIcon, {
                        name: unref(ui).features.item.icon.name,
                        class: unref(ui).features.item.icon.base
                      }, null, _parent2, _scopeId));
                      _push2(`<span class="${ssrRenderClass(unref(ui).features.item.label)}"${_scopeId}>${ssrInterpolate(offer)}</span></li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orientation === "vertical") {
              _push2(`<!--[--><div class="${ssrRenderClass(unref(ui).amount.base)}"${_scopeId}>`);
              if (__props.discount && __props.price) {
                _push2(`<p class="${ssrRenderClass(unref(ui).amount.discount)}"${_scopeId}>${ssrInterpolate(__props.price)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="${ssrRenderClass(unref(ui).amount.price)}"${_scopeId}>${ssrInterpolate(__props.discount || __props.price || "\xA0")}</p>`);
              if (__props.cycle) {
                _push2(`<p class="${ssrRenderClass(unref(ui).amount.cycle)}"${_scopeId}>${ssrInterpolate(__props.cycle)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (((_b = __props.features) == null ? void 0 : _b.length) || _ctx.$slots.features) {
                _push2(`<div class="${ssrRenderClass([__props.align === "top" && "order-last", "flex-1"])}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "features", {}, () => {
                  var _a2;
                  if ((_a2 = __props.features) == null ? void 0 : _a2.length) {
                    _push2(`<ul class="${ssrRenderClass(unref(ui).features.vertical)}"${_scopeId}><!--[-->`);
                    ssrRenderList(__props.features, (offer, index) => {
                      _push2(`<li class="${ssrRenderClass(unref(ui).features.item.base)}"${_scopeId}>`);
                      _push2(ssrRenderComponent(_component_UIcon, {
                        name: unref(ui).features.item.icon.name,
                        class: unref(ui).features.item.icon.base
                      }, null, _parent2, _scopeId));
                      _push2(`<span class="${ssrRenderClass(unref(ui).features.item.label)}"${_scopeId}>${ssrInterpolate(offer)}</span></li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass(unref(ui).right)}"${_scopeId}>`);
            if (__props.orientation === "horizontal") {
              _push2(`<div class="${ssrRenderClass([unref(ui).amount.base, __props.align === "top" && "order-last"])}"${_scopeId}>`);
              if (__props.discount && __props.price) {
                _push2(`<p class="${ssrRenderClass(unref(ui).amount.discount)}"${_scopeId}>${ssrInterpolate(__props.price)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="${ssrRenderClass(unref(ui).amount.price)}"${_scopeId}>${ssrInterpolate(__props.discount || __props.price || "\xA0")}</p>`);
              if (__props.cycle) {
                _push2(`<p class="${ssrRenderClass(unref(ui).amount.cycle)}"${_scopeId}>${ssrInterpolate(__props.cycle)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.button) {
              _push2(ssrRenderComponent(_component_UButton, mergeProps({ block: true, size: "lg", ...__props.button }, {
                onClick: __props.button.click
              }), null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "horizontal") {
              ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.orientation === "vertical") {
              ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: unref(ui).left
              }, [
                createVNode("div", {
                  class: unref(ui).inner
                }, [
                  __props.title || _ctx.$slots.title ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: unref(ui).title
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(__props.title), 1)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  __props.badge ? (openBlock(), createBlock(_component_UBadge, mergeProps({ key: 1 }, { variant: "subtle", ...__props.badge }), null, 16)) : createCommentVNode("", true)
                ], 2),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.orientation === "horizontal" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_component_UDivider, {
                    class: unref(ui).divider
                  }, null, 8, ["class"]),
                  ((_c = __props.features) == null ? void 0 : _c.length) || _ctx.$slots.features ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex-1"
                  }, [
                    renderSlot(_ctx.$slots, "features", {}, () => {
                      var _a2;
                      return [
                        ((_a2 = __props.features) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("ul", {
                          key: 0,
                          class: unref(ui).features.horizontal
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (offer, index) => {
                            return openBlock(), createBlock("li", {
                              key: index,
                              class: unref(ui).features.item.base
                            }, [
                              createVNode(_component_UIcon, {
                                name: unref(ui).features.item.icon.name,
                                class: unref(ui).features.item.icon.base
                              }, null, 8, ["name", "class"]),
                              createVNode("span", {
                                class: unref(ui).features.item.label
                              }, toDisplayString(offer), 3)
                            ], 2);
                          }), 128))
                        ], 2)) : createCommentVNode("", true)
                      ];
                    })
                  ])) : createCommentVNode("", true)
                ], 64)) : createCommentVNode("", true)
              ], 2),
              __props.orientation === "vertical" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", {
                  class: unref(ui).amount.base
                }, [
                  __props.discount && __props.price ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: unref(ui).amount.discount
                  }, toDisplayString(__props.price), 3)) : createCommentVNode("", true),
                  createVNode("p", {
                    class: unref(ui).amount.price
                  }, toDisplayString(__props.discount || __props.price || "\xA0"), 3),
                  __props.cycle ? (openBlock(), createBlock("p", {
                    key: 1,
                    class: unref(ui).amount.cycle
                  }, toDisplayString(__props.cycle), 3)) : createCommentVNode("", true)
                ], 2),
                ((_d = __props.features) == null ? void 0 : _d.length) || _ctx.$slots.features ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [__props.align === "top" && "order-last", "flex-1"]
                }, [
                  renderSlot(_ctx.$slots, "features", {}, () => {
                    var _a2;
                    return [
                      ((_a2 = __props.features) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: unref(ui).features.vertical
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (offer, index) => {
                          return openBlock(), createBlock("li", {
                            key: index,
                            class: unref(ui).features.item.base
                          }, [
                            createVNode(_component_UIcon, {
                              name: unref(ui).features.item.icon.name,
                              class: unref(ui).features.item.icon.base
                            }, null, 8, ["name", "class"]),
                            createVNode("span", {
                              class: unref(ui).features.item.label
                            }, toDisplayString(offer), 3)
                          ], 2);
                        }), 128))
                      ], 2)) : createCommentVNode("", true)
                    ];
                  })
                ], 2)) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              createVNode("div", {
                class: unref(ui).right
              }, [
                __props.orientation === "horizontal" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [unref(ui).amount.base, __props.align === "top" && "order-last"]
                }, [
                  __props.discount && __props.price ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: unref(ui).amount.discount
                  }, toDisplayString(__props.price), 3)) : createCommentVNode("", true),
                  createVNode("p", {
                    class: unref(ui).amount.price
                  }, toDisplayString(__props.discount || __props.price || "\xA0"), 3),
                  __props.cycle ? (openBlock(), createBlock("p", {
                    key: 1,
                    class: unref(ui).amount.cycle
                  }, toDisplayString(__props.cycle), 3)) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                __props.button ? (openBlock(), createBlock(_component_UButton, mergeProps({ key: 1 }, { block: true, size: "lg", ...__props.button }, {
                  onClick: __props.button.click
                }), null, 16, ["onClick"])) : createCommentVNode("", true),
                __props.orientation === "horizontal" ? renderSlot(_ctx.$slots, "bottom", { key: 2 }) : createCommentVNode("", true)
              ], 2),
              __props.orientation === "vertical" ? renderSlot(_ctx.$slots, "bottom", { key: 1 }) : createCommentVNode("", true)
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.header ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "header")
              ];
            }
          }),
          key: "0"
        } : void 0,
        _ctx.$slots.footer ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "footer")
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/pricing/PricingCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingLogos",
  __ssrInlineRender: true,
  props: {
    title: {
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
    const props = __props;
    const config = computed(() => {
      const wrapper = {
        center: "text-center",
        right: "text-right",
        left: "text-left"
      }[props.align];
      return {
        wrapper,
        title: "text-lg font-semibold leading-8 text-gray-900 dark:text-white",
        images: "mx-auto mt-10 flex flex-wrap items-center justify-between gap-8"
      };
    });
    const { ui, attrs } = useUI("landing.logos", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (__props.title) {
        _push(`<h2 class="${ssrRenderClass(unref(ui).title)}">${ssrInterpolate(__props.title)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(ui).images)}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingLogos.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingFAQ",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    multiple: {
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
    const appConfig = useAppConfig();
    const config = computed(() => ({
      wrapper: "divide-y divide-gray-200 dark:divide-gray-800 -mt-6",
      container: "divide-y divide-gray-200 dark:divide-gray-800",
      item: {
        size: "text-base",
        padding: "py-6"
      },
      button: {
        base: "text-left text-lg py-6 w-full",
        label: "text-gray-900 dark:text-white",
        trailingIcon: {
          name: appConfig.ui.icons.chevron,
          base: "w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5",
          active: "",
          inactive: "-rotate-90"
        }
      }
    }));
    const props = __props;
    const { ui, attrs } = useUI("landing.faq", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = __nuxt_component_0$1;
      const _component_UButton = __nuxt_component_0$4;
      const _component_UIcon = __nuxt_component_1$2;
      _push(ssrRenderComponent(_component_UAccordion, mergeProps({
        class: unref(ui).wrapper,
        items: __props.items,
        multiple: __props.multiple
      }, unref(attrs), {
        ui: { item: unref(ui).item, container: unref(ui).container }
      }, _attrs), {
        default: withCtx(({ item, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "link",
              ui: { rounded: "rounded-none", color: { gray: { link: "hover:no-underline" } } },
              padded: false,
              class: unref(ui).button.base
            }, {
              trailing: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: unref(ui).button.trailingIcon.name,
                    class: [unref(ui).button.trailingIcon.base, open ? unref(ui).button.trailingIcon.active : unref(ui).button.trailingIcon.inactive]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: unref(ui).button.trailingIcon.name,
                      class: [unref(ui).button.trailingIcon.base, open ? unref(ui).button.trailingIcon.active : unref(ui).button.trailingIcon.inactive]
                    }, null, 8, ["name", "class"])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass(unref(ui).button.label)}"${_scopeId2}>${ssrInterpolate(item.label)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: unref(ui).button.label
                    }, toDisplayString(item.label), 3)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "gray",
                variant: "link",
                ui: { rounded: "rounded-none", color: { gray: { link: "hover:no-underline" } } },
                padded: false,
                class: unref(ui).button.base
              }, {
                trailing: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: unref(ui).button.trailingIcon.name,
                    class: [unref(ui).button.trailingIcon.base, open ? unref(ui).button.trailingIcon.active : unref(ui).button.trailingIcon.inactive]
                  }, null, 8, ["name", "class"])
                ]),
                default: withCtx(() => [
                  createVNode("span", {
                    class: unref(ui).button.label
                  }, toDisplayString(item.label), 3)
                ]),
                _: 2
              }, 1032, ["class"])
            ];
          }
        }),
        item: withCtx((scope, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "item", scope, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "item", scope)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingFAQ.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pricing",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("pricing", () => queryContent("/pricing").findOne())), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    useSeoMeta({
      title: page.value.title,
      ogTitle: page.value.title,
      description: page.value.description,
      ogDescription: page.value.description
    });
    defineOgImage({
      component: "Saas",
      title: page.value.title,
      description: page.value.description
    });
    const isYearly = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPageHero = _sfc_main$6;
      const _component_UPricingToggle = _sfc_main$5;
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UPricingGrid = _sfc_main$4;
      const _component_UPricingCard = _sfc_main$3;
      const _component_ULandingSection = _sfc_main$7;
      const _component_ULandingLogos = _sfc_main$2;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_ULandingFAQ = _sfc_main$1;
      if (unref(page)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_UPageHero, unref(page).hero, {
          links: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPricingToggle, {
                modelValue: unref(isYearly),
                "onUpdate:modelValue": ($event) => isRef(isYearly) ? isYearly.value = $event : null,
                class: "w-48"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPricingToggle, {
                  modelValue: unref(isYearly),
                  "onUpdate:modelValue": ($event) => isRef(isYearly) ? isYearly.value = $event : null,
                  class: "w-48"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UContainer, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPricingGrid, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).plans, (plan, index) => {
                      _push3(ssrRenderComponent(_component_UPricingCard, mergeProps({ key: index }, plan, {
                        price: unref(isYearly) ? plan.price.year : plan.price.month,
                        cycle: unref(isYearly) ? "/year" : "/month"
                      }), null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).plans, (plan, index) => {
                        return openBlock(), createBlock(_component_UPricingCard, mergeProps({ key: index }, plan, {
                          price: unref(isYearly) ? plan.price.year : plan.price.month,
                          cycle: unref(isYearly) ? "/year" : "/month"
                        }), null, 16, ["price", "cycle"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPricingGrid, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).plans, (plan, index) => {
                      return openBlock(), createBlock(_component_UPricingCard, mergeProps({ key: index }, plan, {
                        price: unref(isYearly) ? plan.price.year : plan.price.month,
                        cycle: unref(isYearly) ? "/year" : "/month"
                      }), null, 16, ["price", "cycle"]);
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
              _push2(ssrRenderComponent(_component_ULandingLogos, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).logos.icons, (icon) => {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        key: icon,
                        name: icon,
                        class: "w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).logos.icons, (icon) => {
                        return openBlock(), createBlock(_component_UIcon, {
                          key: icon,
                          name: icon,
                          class: "w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
                        }, null, 8, ["name"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ULandingLogos, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).logos.icons, (icon) => {
                      return openBlock(), createBlock(_component_UIcon, {
                        key: icon,
                        name: icon,
                        class: "w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400"
                      }, null, 8, ["name"]);
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
          title: unref(page).faq.title,
          description: unref(page).faq.description
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ULandingFAQ, {
                items: unref(page).faq.items,
                multiple: "",
                "default-open": "",
                class: "max-w-4xl mx-auto"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ULandingFAQ, {
                  items: unref(page).faq.items,
                  multiple: "",
                  "default-open": "",
                  class: "max-w-4xl mx-auto"
                }, null, 8, ["items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pricing-B9tiauVr.mjs.map

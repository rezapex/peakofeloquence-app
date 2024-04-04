import { m as mergeConfig, h as appConfig, _ as __nuxt_component_1$1, i as __nuxt_component_2, u as useUI, l as useRoute, f as useAppConfig, n as useAsyncData, q as queryContent, c as createError, o as useSeoMeta, p as findPageHeadline, d as useRouter, j as getULinkProps, r as _sfc_main$3$1, a as __nuxt_component_0$3, b as __nuxt_component_0$7, e as useNuxtApp, g as _export_sfc, k as __nuxt_component_0$5 } from './server.mjs';
import { useSSRContext, defineComponent, toRef, computed, withAsyncContext, createSlots, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, mergeProps, toDisplayString, ref, createTextVNode, watch } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import _sfc_main$9 from './ContentRenderer-eaAAF609.mjs';
import { twMerge, twJoin } from 'tailwind-merge';
import { d as defineOgImage } from './defineOgImage-_NAs6BPa.mjs';
import { w as withoutTrailingSlash } from '../runtime.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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
import './ContentRendererMarkdown-yGM1WHyg.mjs';
import './MDCRenderer-CqRMB_ub.mjs';
import 'property-information';
import './useSiteConfig-KML5ykE2.mjs';

const divider = {
  wrapper: {
    base: "flex items-center align-center text-center w-full",
    horizontal: "flex-row",
    vertical: "flex-col"
  },
  container: {
    base: "font-medium text-gray-700 dark:text-gray-200 flex",
    horizontal: "mx-3 whitespace-nowrap",
    vertical: "my-2"
  },
  border: {
    base: "flex border-gray-200 dark:border-gray-800",
    horizontal: "w-full",
    vertical: "h-full",
    size: {
      horizontal: {
        "2xs": "border-t",
        xs: "border-t-[2px]",
        sm: "border-t-[3px]",
        md: "border-t-[4px]",
        lg: "border-t-[5px]",
        xl: "border-t-[6px]"
      },
      vertical: {
        "2xs": "border-s",
        xs: "border-s-[2px]",
        sm: "border-s-[3px]",
        md: "border-s-[4px]",
        lg: "border-s-[5px]",
        xl: "border-s-[6px]"
      }
    },
    type: {
      solid: "border-solid",
      dotted: "border-dotted",
      dashed: "border-dashed"
    }
  },
  icon: {
    base: "flex-shrink-0 w-5 h-5"
  },
  avatar: {
    base: "flex-shrink-0",
    size: "2xs"
  },
  label: "text-sm",
  default: {
    size: "2xs"
  }
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
    const config2 = {
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
    const { ui, attrs } = useUI("page.header", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UIcon = __nuxt_component_1$1;
      const _component_UButton = __nuxt_component_0$3;
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageHeader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    const config2 = {
      wrapper: "mt-8 pb-24",
      prose: "prose prose-primary dark:prose-invert max-w-none"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.body", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(ui).wrapper, __props.prose && unref(ui).prose]
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageBody.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContentSurroundLink",
  __ssrInlineRender: true,
  props: {
    link: {
      type: Object,
      required: true
    },
    icon: {
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
    const config2 = {
      wrapper: "block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group",
      icon: {
        wrapper: "inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50",
        base: "w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary"
      },
      title: "font-medium text-gray-900 dark:text-white text-[15px] mb-1",
      description: "text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2"
    };
    const props = __props;
    const { ui, attrs } = useUI("content.surround.link", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$7;
      const _component_UIcon = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.link._path,
        class: unref(ui).wrapper
      }, unref(attrs), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.icon || __props.link.icon) {
              _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: __props.icon || __props.link.icon,
                class: unref(ui).icon.base
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>${ssrInterpolate(__props.link.title)}</p><p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>${ssrInterpolate(__props.link.description)}</p>`);
          } else {
            return [
              __props.icon || __props.link.icon ? (openBlock(), createBlock("div", {
                key: 0,
                class: unref(ui).icon.wrapper
              }, [
                createVNode(_component_UIcon, {
                  name: __props.icon || __props.link.icon,
                  class: unref(ui).icon.base
                }, null, 8, ["name", "class"])
              ], 2)) : createCommentVNode("", true),
              createVNode("p", {
                class: unref(ui).title
              }, toDisplayString(__props.link.title), 3),
              createVNode("p", {
                class: unref(ui).description
              }, toDisplayString(__props.link.description), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentSurroundLink.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContentSurround",
  __ssrInlineRender: true,
  props: {
    surround: {
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
    const config2 = {
      wrapper: "grid gap-8 sm:grid-cols-2",
      icon: {
        prev: "i-heroicons-arrow-left-20-solid",
        next: "i-heroicons-arrow-right-20-solid"
      },
      link: {}
    };
    const props = __props;
    const { ui, attrs } = useUI("content.surround", toRef(props, "ui"), config2, toRef(props, "class"), true);
    const [prev, next] = props.surround || [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContentSurroundLink = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (unref(prev)) {
        _push(ssrRenderComponent(_component_UContentSurroundLink, {
          link: unref(prev),
          ui: unref(ui).link,
          icon: unref(ui).icon.prev
        }, null, _parent));
      } else {
        _push(`<span class="hidden sm:block">\xA0</span>`);
      }
      if (unref(next)) {
        _push(ssrRenderComponent(_component_UContentSurroundLink, {
          link: unref(next),
          ui: unref(ui).link,
          icon: unref(ui).icon.next,
          class: "text-right"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentSurround.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const useScrollspy = () => {
  const observer = ref();
  const visibleHeadings = ref([]);
  const activeHeadings = ref([]);
  const updateHeadings = (headings) => {
    headings.forEach((heading) => {
      if (!observer.value) {
        return;
      }
      observer.value.observe(heading);
    });
  };
  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal;
    } else {
      activeHeadings.value = val;
    }
  });
  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings
  };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContentTocLinks",
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
  emits: ["move"],
  setup(__props, { emit: __emit }) {
    const config2 = {
      wrapper: "space-y-1",
      base: "block text-sm/6 truncate",
      active: "text-primary",
      inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
      depth: "ml-3"
    };
    const props = __props;
    useRouter();
    const nuxtApp = useNuxtApp();
    const { activeHeadings, updateHeadings } = useScrollspy();
    const { ui, attrs } = useUI("content.toc.links", toRef(props, "ui"), config2, toRef(props, "class"), true);
    nuxtApp.hooks.hookOnce("page:finish", () => {
      updateHeadings([
        ...(void 0).querySelectorAll("h2"),
        ...(void 0).querySelectorAll("h3")
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UContentTocLinks = _sfc_main$4;
      if ((_a = __props.links) == null ? void 0 : _a.length) {
        _push(`<ul${ssrRenderAttrs(mergeProps({
          class: unref(ui).wrapper
        }, unref(attrs), _attrs))}><!--[-->`);
        ssrRenderList(__props.links, (link) => {
          _push(`<li class="${ssrRenderClass([unref(ui).wrapper, link.depth === 3 && unref(ui).depth])}"><a${ssrRenderAttr("href", `#${link.id}`)} class="${ssrRenderClass([unref(ui).base, unref(activeHeadings).includes(link.id) ? unref(ui).active : unref(ui).inactive])}">${ssrInterpolate(link.text)}</a>`);
          if (link.children) {
            _push(ssrRenderComponent(_component_UContentTocLinks, {
              links: link.children
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentTocLinks.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "ContentToc",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Table of Contents"
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
    const appConfig2 = useAppConfig();
    const config2 = computed(() => ({
      wrapper: "sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]",
      container: {
        base: "py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3",
        empty: "lg:py-8 space-y-3"
      },
      button: {
        base: "flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group",
        label: "font-semibold text-sm/6 truncate",
        trailingIcon: {
          name: appConfig2.ui.icons.chevron,
          base: "w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5",
          active: "text-gray-700 dark:text-gray-200",
          inactive: "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90"
        }
      },
      links: {}
    }));
    const props = __props;
    const { ui, attrs } = useUI("content.toc", toRef(props, "ui"), config2, toRef(props, "class"), true);
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UIcon = __nuxt_component_1$1;
      const _component_UContentTocLinks = _sfc_main$4;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}><div class="${ssrRenderClass([((_a = __props.links) == null ? void 0 : _a.length) ? unref(ui).container.base : unref(ui).container.empty])}">`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      if ((_b = __props.links) == null ? void 0 : _b.length) {
        _push(`<button class="${ssrRenderClass(unref(ui).button.base)}" tabindex="-1"><span class="${ssrRenderClass(unref(ui).button.label)}">${ssrInterpolate(__props.title)}</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: unref(ui).button.trailingIcon.name,
          class: ["lg:!hidden", [unref(ui).button.trailingIcon.base, unref(open) ? unref(ui).button.trailingIcon.active : unref(ui).button.trailingIcon.inactive]]
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UContentTocLinks, {
        links: __props.links,
        ui: unref(ui).links,
        class: [unref(open) ? "lg:block" : "hidden lg:block"]
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentToc.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.divider, divider);
const _sfc_main$2 = defineComponent({
  components: {
    UIcon: __nuxt_component_1$1,
    UAvatar: __nuxt_component_2
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    avatar: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: () => config.default.size,
      validator(value) {
        return Object.keys(config.border.size.horizontal).includes(value) || Object.keys(config.border.size.vertical).includes(value);
      }
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    type: {
      type: String,
      default: "solid",
      validator: (value) => ["solid", "dotted", "dashed"].includes(value)
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("divider", toRef(props, "ui"), config);
    const wrapperClass = computed(() => {
      return twMerge(twJoin(
        ui.value.wrapper.base,
        ui.value.wrapper[props.orientation]
      ), props.class);
    });
    const containerClass = computed(() => {
      return twJoin(
        ui.value.container.base,
        ui.value.container[props.orientation]
      );
    });
    const borderClass = computed(() => {
      return twJoin(
        ui.value.border.base,
        ui.value.border[props.orientation],
        ui.value.border.size[props.orientation][props.size],
        ui.value.border.type[props.type]
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      wrapperClass,
      containerClass,
      borderClass
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_1$1;
  const _component_UAvatar = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.borderClass)}"></div>`);
  if (_ctx.label || _ctx.icon || _ctx.avatar || _ctx.$slots.default) {
    _push(`<!--[--><div class="${ssrRenderClass(_ctx.containerClass)}">`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      if (_ctx.label) {
        _push(`<span class="${ssrRenderClass(_ctx.ui.label)}">${ssrInterpolate(_ctx.label)}</span>`);
      } else if (_ctx.icon) {
        _push(ssrRenderComponent(_component_UIcon, {
          name: _ctx.icon,
          class: _ctx.ui.icon.base
        }, null, _parent));
      } else if (_ctx.avatar) {
        _push(ssrRenderComponent(_component_UAvatar, mergeProps({ size: _ctx.ui.avatar.size, ..._ctx.avatar }, {
          class: _ctx.ui.avatar.base
        }), null, _parent));
      } else {
        _push(`<!---->`);
      }
    }, _push, _parent);
    _push(`</div><div class="${ssrRenderClass(_ctx.borderClass)}"></div><!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Divider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageLinks",
  __ssrInlineRender: true,
  props: {
    title: {
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
    const appConfig2 = useAppConfig();
    const config2 = computed(() => ({
      wrapper: "space-y-3",
      title: "text-sm/6 font-semibold flex items-center gap-1.5",
      container: "space-y-3 lg:space-y-1.5",
      base: "flex items-center gap-1.5",
      active: "text-primary",
      inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
      icon: {
        base: "w-5 h-5 flex-shrink-0"
      },
      avatar: {
        base: "self-center",
        size: "2xs"
      },
      externalIcon: {
        name: appConfig2.ui.icons.external,
        base: "w-3 h-3 absolute top-0.5 -right-3.5 text-gray-400 dark:text-gray-500"
      },
      label: "text-sm/6 font-medium relative"
    }));
    const props = __props;
    const { ui, attrs } = useUI("page.links", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULink = __nuxt_component_0$5;
      const _component_UIcon = __nuxt_component_1$1;
      const _component_UAvatar = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (__props.title || _ctx.$slots.title) {
        _push(`<p class="${ssrRenderClass(unref(ui).title)}">`);
        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
          _push(`${ssrInterpolate(__props.title)}`);
        }, _push, _parent);
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(ui).container)}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<!--[-->`);
        ssrRenderList(__props.links, (link, index) => {
          _push(ssrRenderComponent(_component_ULink, mergeProps({ key: index }, unref(getULinkProps)(link), {
            class: unref(ui).base,
            "active-class": unref(ui).active,
            "inactive-class": unref(ui).inactive,
            onClick: link.click
          }), {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (link.icon) {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: link.icon,
                    class: unref(twMerge)(unref(ui).icon.base, link.iconClass)
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (link.avatar) {
                  _push2(ssrRenderComponent(_component_UAvatar, mergeProps({ size: unref(ui).avatar.size, ...link.avatar }, {
                    class: unref(twMerge)(unref(ui).avatar.base, link.avatarClass)
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="${ssrRenderClass(unref(ui).label)}"${_scopeId}>${ssrInterpolate(link.label)} `);
                if (link.target === "_blank") {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: unref(ui).externalIcon.name,
                    class: unref(ui).externalIcon.base
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                return [
                  link.icon ? (openBlock(), createBlock(_component_UIcon, {
                    key: 0,
                    name: link.icon,
                    class: unref(twMerge)(unref(ui).icon.base, link.iconClass)
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                  link.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({ key: 1 }, { size: unref(ui).avatar.size, ...link.avatar }, {
                    class: unref(twMerge)(unref(ui).avatar.base, link.avatarClass)
                  }), null, 16, ["class"])) : createCommentVNode("", true),
                  createVNode("span", {
                    class: unref(ui).label
                  }, [
                    createTextVNode(toDisplayString(link.label) + " ", 1),
                    link.target === "_blank" ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: unref(ui).externalIcon.name,
                      class: unref(ui).externalIcon.base
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ], 2)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageLinks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { toc, seo } = useAppConfig();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => queryContent(route.path).findOne(), "$aROEKgqrzL")), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const { data: surround } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `${route.path}-surround`,
      () => queryContent().where({ _extension: "md", navigation: { $ne: false } }).only(["title", "description", "_path"]).findSurround(withoutTrailingSlash(route.path))
    )), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: page.value.title,
      ogTitle: `${page.value.title} - ${seo == null ? void 0 : seo.siteName}`,
      description: page.value.description,
      ogDescription: page.value.description
    });
    defineOgImage({
      component: "Docs",
      title: page.value.title,
      description: page.value.description
    });
    const headline = computed(() => findPageHeadline(page.value));
    const links = computed(() => {
      var _a, _b, _c;
      return [((_a = toc == null ? void 0 : toc.bottom) == null ? void 0 : _a.edit) && {
        icon: "i-heroicons-pencil-square",
        label: "Edit this page",
        to: `${toc.bottom.edit}/${(_b = page == null ? void 0 : page.value) == null ? void 0 : _b._file}`,
        target: "_blank"
      }, ...((_c = toc == null ? void 0 : toc.bottom) == null ? void 0 : _c.links) || []].filter(Boolean);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPage = _sfc_main$3$1;
      const _component_UPageHeader = _sfc_main$8;
      const _component_UPageBody = _sfc_main$7;
      const _component_ContentRenderer = _sfc_main$9;
      const _component_UContentSurround = _sfc_main$5;
      const _component_UContentToc = _sfc_main$3;
      const _component_UDivider = __nuxt_component_6;
      const _component_UPageLinks = _sfc_main$1;
      _push(ssrRenderComponent(_component_UPage, _attrs, createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UPageHeader, {
              title: unref(page).title,
              description: unref(page).description,
              links: unref(page).links,
              headline: unref(headline)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPageBody, { prose: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  if (unref(page).body) {
                    _push3(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if ((_a = unref(surround)) == null ? void 0 : _a.length) {
                    _push3(`<hr${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UContentSurround, { surround: unref(surround) }, null, _parent3, _scopeId2));
                } else {
                  return [
                    unref(page).body ? (openBlock(), createBlock(_component_ContentRenderer, {
                      key: 0,
                      value: unref(page)
                    }, null, 8, ["value"])) : createCommentVNode("", true),
                    ((_b = unref(surround)) == null ? void 0 : _b.length) ? (openBlock(), createBlock("hr", { key: 1 })) : createCommentVNode("", true),
                    createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UPageHeader, {
                title: unref(page).title,
                description: unref(page).description,
                links: unref(page).links,
                headline: unref(headline)
              }, null, 8, ["title", "description", "links", "headline"]),
              createVNode(_component_UPageBody, { prose: "" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    unref(page).body ? (openBlock(), createBlock(_component_ContentRenderer, {
                      key: 0,
                      value: unref(page)
                    }, null, 8, ["value"])) : createCommentVNode("", true),
                    ((_a = unref(surround)) == null ? void 0 : _a.length) ? (openBlock(), createBlock("hr", { key: 1 })) : createCommentVNode("", true),
                    createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                  ];
                }),
                _: 1
              })
            ];
          }
        }),
        _: 2
      }, [
        unref(page).toc !== false ? {
          name: "right",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(ssrRenderComponent(_component_UContentToc, {
                title: (_a = unref(toc)) == null ? void 0 : _a.title,
                links: (_c = (_b = unref(page).body) == null ? void 0 : _b.toc) == null ? void 0 : _c.links
              }, createSlots({ _: 2 }, [
                ((_d = unref(toc)) == null ? void 0 : _d.bottom) ? {
                  name: "bottom",
                  fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j, _k, _l;
                    if (_push3) {
                      _push3(`<div class="${ssrRenderClass([{ "!mt-6": (_c2 = (_b2 = (_a2 = unref(page).body) == null ? void 0 : _a2.toc) == null ? void 0 : _b2.links) == null ? void 0 : _c2.length }, "hidden lg:block space-y-6"])}"${_scopeId2}>`);
                      if ((_f2 = (_e2 = (_d2 = unref(page).body) == null ? void 0 : _d2.toc) == null ? void 0 : _e2.links) == null ? void 0 : _f2.length) {
                        _push3(ssrRenderComponent(_component_UDivider, { type: "dashed" }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(_component_UPageLinks, {
                        title: unref(toc).bottom.title,
                        links: unref(links)
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ["hidden lg:block space-y-6", { "!mt-6": (_i = (_h2 = (_g2 = unref(page).body) == null ? void 0 : _g2.toc) == null ? void 0 : _h2.links) == null ? void 0 : _i.length }]
                        }, [
                          ((_l = (_k = (_j = unref(page).body) == null ? void 0 : _j.toc) == null ? void 0 : _k.links) == null ? void 0 : _l.length) ? (openBlock(), createBlock(_component_UDivider, {
                            key: 0,
                            type: "dashed"
                          })) : createCommentVNode("", true),
                          createVNode(_component_UPageLinks, {
                            title: unref(toc).bottom.title,
                            links: unref(links)
                          }, null, 8, ["title", "links"])
                        ], 2)
                      ];
                    }
                  }),
                  key: "0"
                } : void 0
              ]), _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UContentToc, {
                  title: (_e = unref(toc)) == null ? void 0 : _e.title,
                  links: (_g = (_f = unref(page).body) == null ? void 0 : _f.toc) == null ? void 0 : _g.links
                }, createSlots({ _: 2 }, [
                  ((_h = unref(toc)) == null ? void 0 : _h.bottom) ? {
                    name: "bottom",
                    fn: withCtx(() => {
                      var _a2, _b2, _c2, _d2, _e2, _f2;
                      return [
                        createVNode("div", {
                          class: ["hidden lg:block space-y-6", { "!mt-6": (_c2 = (_b2 = (_a2 = unref(page).body) == null ? void 0 : _a2.toc) == null ? void 0 : _b2.links) == null ? void 0 : _c2.length }]
                        }, [
                          ((_f2 = (_e2 = (_d2 = unref(page).body) == null ? void 0 : _d2.toc) == null ? void 0 : _e2.links) == null ? void 0 : _f2.length) ? (openBlock(), createBlock(_component_UDivider, {
                            key: 0,
                            type: "dashed"
                          })) : createCommentVNode("", true),
                          createVNode(_component_UPageLinks, {
                            title: unref(toc).bottom.title,
                            links: unref(links)
                          }, null, 8, ["title", "links"])
                        ], 2)
                      ];
                    }),
                    key: "0"
                  } : void 0
                ]), 1032, ["title", "links"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-MdzfdNrU.mjs.map

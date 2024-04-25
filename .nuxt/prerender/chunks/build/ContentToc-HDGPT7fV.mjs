import { k as useUI, P as useAppConfig, $ as useRouter, z as __nuxt_component_1$2, v as __nuxt_component_0$6, C as useNuxtApp } from './server.mjs';
import { useSSRContext, defineComponent, toRef, mergeProps, unref, computed, ref, withCtx, openBlock, createBlock, createVNode, createCommentVNode, toDisplayString, watch } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    const config = {
      wrapper: "block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group",
      icon: {
        wrapper: "inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50",
        base: "w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary"
      },
      title: "font-medium text-gray-900 dark:text-white text-[15px] mb-1",
      description: "text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2"
    };
    const props = __props;
    const { ui, attrs } = useUI("content.surround.link", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UIcon = __nuxt_component_1$2;
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentSurroundLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
    const config = {
      wrapper: "grid gap-8 sm:grid-cols-2",
      icon: {
        prev: "i-heroicons-arrow-left-20-solid",
        next: "i-heroicons-arrow-right-20-solid"
      },
      link: {}
    };
    const props = __props;
    const { ui, attrs } = useUI("content.surround", toRef(props, "ui"), config, toRef(props, "class"), true);
    const [prev, next] = props.surround || [];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContentSurroundLink = _sfc_main$3;
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentSurround.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
    const config = {
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
    const { ui, attrs } = useUI("content.toc.links", toRef(props, "ui"), config, toRef(props, "class"), true);
    nuxtApp.hooks.hookOnce("page:finish", () => {
      updateHeadings([
        ...(void 0).querySelectorAll("h2"),
        ...(void 0).querySelectorAll("h3")
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UContentTocLinks = _sfc_main$1;
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentTocLinks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const appConfig = useAppConfig();
    const config = computed(() => ({
      wrapper: "sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]",
      container: {
        base: "py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3",
        empty: "lg:py-8 space-y-3"
      },
      button: {
        base: "flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group",
        label: "font-semibold text-sm/6 truncate",
        trailingIcon: {
          name: appConfig.ui.icons.chevron,
          base: "w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5",
          active: "text-gray-700 dark:text-gray-200",
          inactive: "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90"
        }
      },
      links: {}
    }));
    const props = __props;
    const { ui, attrs } = useUI("content.toc", toRef(props, "ui"), config, toRef(props, "class"), true);
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_UContentTocLinks = _sfc_main$1;
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/content/ContentToc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main as a };
//# sourceMappingURL=ContentToc-HDGPT7fV.mjs.map

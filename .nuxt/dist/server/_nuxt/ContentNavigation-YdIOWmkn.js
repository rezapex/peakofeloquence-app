import { aa as useState, ab as useContentDisabled, e as useAsyncData, ac as fetchContentNavigation, i as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, toRefs, computed, useSlots, useSSRContext, h } from "vue";
import { hash } from "ohash";
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
import "vue/server-renderer";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "scule";
import "destr";
import "cookie-es";
const ContentNavigation = defineComponent({
  name: "ContentNavigation",
  props: {
    /**
     * A query to be passed to `fetchContentNavigation()`.
     */
    query: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  async setup(props) {
    const {
      query
    } = toRefs(props);
    const queryBuilder = computed(() => {
      var _a;
      if (typeof ((_a = query.value) == null ? void 0 : _a.params) === "function") {
        return query.value.params();
      }
      return query.value;
    });
    if (!queryBuilder.value && useState("dd-navigation").value) {
      const { navigation: navigation2 } = useContentDisabled();
      return { navigation: navigation2 };
    }
    const { data: navigation } = await useAsyncData(
      `content-navigation-${hash(queryBuilder.value)}`,
      () => fetchContentNavigation(queryBuilder.value)
    );
    return { navigation };
  },
  /**
   * Navigation empty fallback
   * @slot empty
   */
  render(ctx) {
    const slots = useSlots();
    const { navigation } = ctx;
    const renderLink = (link) => h(__nuxt_component_0, { to: link._path }, () => link.title);
    const renderLinks = (data, level) => h(
      "ul",
      level ? { "data-level": level } : null,
      data.map((link) => {
        if (link.children) {
          return h("li", null, [renderLink(link), renderLinks(link.children, level + 1)]);
        }
        return h("li", null, renderLink(link));
      })
    );
    const defaultNode = (data) => renderLinks(data, 0);
    return (slots == null ? void 0 : slots.default) ? slots.default({ navigation, ...this.$attrs }) : defaultNode(navigation);
  }
});
const _sfc_main = ContentNavigation;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/content/dist/runtime/components/ContentNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ContentNavigation-YdIOWmkn.js.map
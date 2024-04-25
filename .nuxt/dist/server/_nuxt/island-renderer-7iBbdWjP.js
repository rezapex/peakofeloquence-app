import { defineAsyncComponent, defineComponent, onErrorCaptured, createVNode } from "vue";
import { c as createError } from "../server.mjs";
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
import "ohash";
import "scule";
import "destr";
import "cookie-es";
const islandComponents = {
  "OgImageSaas": defineAsyncComponent(() => import(
    "./OgImageSaas-CPjxRPGz.js"
    /* webpackChunkName: "components/og-image-saas" */
  ).then((c) => c.default || c)),
  "OgImageTemplateFallback": defineAsyncComponent(() => import(
    "./Fallback-BaROMDYN.js"
    /* webpackChunkName: "components/og-image-template-fallback" */
  ).then((c) => c.default || c))
};
const islandRenderer = defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const component = islandComponents[props.context.name];
    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${props.context.name}`
      });
    }
    onErrorCaptured((e) => {
      console.log(e);
    });
    return () => createVNode(component || "span", { ...props.context.props, "data-island-uid": "" });
  }
});
export {
  islandRenderer as default
};
//# sourceMappingURL=island-renderer-7iBbdWjP.js.map

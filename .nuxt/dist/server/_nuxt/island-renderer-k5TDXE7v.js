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
  "BrandedLogo": defineAsyncComponent(() => import(
    "./BrandedLogo-DJaHntjk.js"
    /* webpackChunkName: "components/branded-logo-server" */
  ).then((c) => c.default || c)),
  "Frame": defineAsyncComponent(() => import(
    "./Frame-HBl0jAJB.js"
    /* webpackChunkName: "components/frame-server" */
  ).then((c) => c.default || c)),
  "Nuxt": defineAsyncComponent(() => import(
    "./Nuxt-DzArWBIO.js"
    /* webpackChunkName: "components/nuxt-server" */
  ).then((c) => c.default || c)),
  "NuxtSeo": defineAsyncComponent(() => import(
    "./NuxtSeo-D1jmJNq8.js"
    /* webpackChunkName: "components/nuxt-seo-server" */
  ).then((c) => c.default || c)),
  "Pergel": defineAsyncComponent(() => import(
    "./Pergel-1vdfK46m.js"
    /* webpackChunkName: "components/pergel-server" */
  ).then((c) => c.default || c)),
  "SimpleBlog": defineAsyncComponent(() => import(
    "./SimpleBlog-CxMMSRt6.js"
    /* webpackChunkName: "components/simple-blog-server" */
  ).then((c) => c.default || c)),
  "UnJs": defineAsyncComponent(() => import(
    "./UnJs-C2T8pG7u.js"
    /* webpackChunkName: "components/un-js-server" */
  ).then((c) => c.default || c)),
  "Wave": defineAsyncComponent(() => import(
    "./Wave-DkmQ0nuL.js"
    /* webpackChunkName: "components/wave-server" */
  ).then((c) => c.default || c)),
  "WithEmoji": defineAsyncComponent(() => import(
    "./WithEmoji-CdhPpvLx.js"
    /* webpackChunkName: "components/with-emoji-server" */
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
//# sourceMappingURL=island-renderer-k5TDXE7v.js.map

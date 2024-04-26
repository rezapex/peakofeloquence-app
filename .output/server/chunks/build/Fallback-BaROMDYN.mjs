import { as as __nuxt_component_0$7 } from './server.mjs';
import { u as useSiteConfig } from './useSiteConfig-CRotISqA.mjs';
import { defineComponent, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
import 'tailwind-merge';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Fallback",
  __ssrInlineRender: true,
  props: {
    path: String,
    title: {
      type: String,
      default: "Og Image Template"
    },
    description: {
      type: String,
      default: "Set a description to change me."
    },
    color: {
      type: String
    },
    padding: {
      type: String,
      default: "0 100px"
    },
    titleFontSize: {
      type: String,
      default: "75px"
    },
    descriptionFontSize: {
      type: String,
      default: "35px"
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    siteName: {
      type: String,
      required: false
    },
    siteLogo: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const backgroundAttrs = computed(() => {
      return {
        style: {
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(5, 5, 5,1)"
        }
      };
    });
    const backgroundFlareAttrs = computed(() => {
      return {
        style: {
          display: "flex",
          position: "absolute",
          right: "-100%",
          top: "10%",
          width: "200%",
          height: "200%",
          backgroundImage: "radial-gradient(circle, rgba(0,220,130, 0.5) 0%,  rgba(5, 5, 5,0.3) 50%, rgba(5, 5, 5,0) 70%)"
        }
      };
    });
    const containerAttrs = computed(() => {
      var _a;
      const isColorTw = (_a = props.color) == null ? void 0 : _a.startsWith("text-");
      const classes = [
        "w-full",
        "h-full",
        "flex",
        "text-gray-100",
        "relative",
        "items-center",
        "justify-center"
      ];
      const styles = {
        padding: props.padding
      };
      if (isColorTw)
        classes.push(props.color);
      else
        styles.color = props.color;
      return { class: classes, style: styles };
    });
    const titleAttrs = computed(() => {
      const classes = [];
      const styles = {
        fontWeight: "bold",
        marginBottom: "50px",
        fontSize: props.titleFontSize
      };
      return { class: classes, style: styles };
    });
    const descriptionAttrs = computed(() => {
      const classes = [];
      const styles = {
        fontSize: props.descriptionFontSize,
        lineHeight: `${props.descriptionFontSize.replace("px", "") * 1.5}px`,
        opacity: "0.8"
      };
      return { class: classes, style: styles };
    });
    const siteConfig = useSiteConfig();
    const siteName = computed(() => {
      return props.siteName || siteConfig.name;
    });
    const siteLogo = computed(() => {
      return props.siteLogo || siteConfig.logo;
    });
    const MaybeIconComponent = __nuxt_component_0$7;
    if (typeof props.icon === "string" && typeof MaybeIconComponent === "string" && false) {
      console.warn("Please install `nuxt-icon` to use icons with the fallback OG Image component.");
      console.log("npm add -D nuxt-icon");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div${ssrRenderAttrs(backgroundAttrs.value)}></div><div${ssrRenderAttrs(backgroundFlareAttrs.value)}></div><div${ssrRenderAttrs(containerAttrs.value)}><div class="flex flex-row justify-between items-center" style="${ssrRenderStyle({ "margin-bottom": "100px" })}"><div class="flex flex-col w-full" style="${ssrRenderStyle(__props.icon ? { width: "65%" } : {})}"><div${ssrRenderAttrs(titleAttrs.value)}>${ssrInterpolate(__props.title || "Null Title")}</div>`);
      if (__props.description) {
        _push(`<div${ssrRenderAttrs(descriptionAttrs.value)}>${ssrInterpolate(__props.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (typeof __props.icon === "string" && typeof unref(MaybeIconComponent) !== "string") {
        _push(`<div style="${ssrRenderStyle({ "width": "30%" })}" class="flex justify-end">`);
        _push(ssrRenderComponent(unref(MaybeIconComponent), {
          name: __props.icon,
          size: "250px",
          style: { "margin": "0 auto 0 100px", "opacity": "0.9" }
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-row absolute bottom-10 text-left items-start">`);
      if (siteLogo.value) {
        _push(`<img${ssrRenderAttr("src", siteLogo.value)} height="30">`);
      } else if (siteName.value) {
        _push(`<div style="${ssrRenderStyle({ "font-size": "25px" })}" class="font-bold">${ssrInterpolate(siteName.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-og-image/dist/runtime/components/OgImageTemplate/Fallback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Fallback-BaROMDYN.mjs.map

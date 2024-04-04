import { u as useUI, _ as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, computed, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "#internal/nitro";
import "ofetch";
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
import "@vueuse/core";
import "tailwind-merge";
import "ohash";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "scule";
import "destr";
import "cookie-es";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseCodeIcon",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: void 0
    },
    filename: {
      type: String,
      default: void 0
    }
  },
  setup(__props) {
    const props = __props;
    const config = {
      "package.json": "vscode-icons:file-type-node",
      "tsconfig.json": "vscode-icons:file-type-tsconfig",
      ".npmrc": "vscode-icons:file-type-npm",
      ".editorconfig": "vscode-icons:file-type-editorconfig",
      ".eslintrc": "vscode-icons:file-type-eslint",
      ".eslintrc.cjs": "vscode-icons:file-type-eslint",
      ".eslintignore": "vscode-icons:file-type-eslint",
      "eslint.config.js": "vscode-icons:file-type-eslint",
      "eslint.config.mjs": "vscode-icons:file-type-eslint",
      "eslint.config.cjs": "vscode-icons:file-type-eslint",
      ".gitignore": "vscode-icons:file-type-git",
      "yarn.lock": "vscode-icons:file-type-yarn",
      ".env": "vscode-icons:file-type-dotenv",
      ".env.example": "vscode-icons:file-type-dotenv",
      ".vscode/settings.json": "vscode-icons:file-type-vscode",
      "nuxt": "vscode-icons:file-type-nuxt",
      ".nuxtrc": "vscode-icons:file-type-nuxt",
      ".nuxtignore": "vscode-icons:file-type-nuxt",
      "nuxt.config.js": "vscode-icons:file-type-nuxt",
      "nuxt.config.ts": "vscode-icons:file-type-nuxt",
      "nuxt.schema.ts": "vscode-icons:file-type-nuxt",
      "tailwind.config.js": "vscode-icons:file-type-tailwind",
      "tailwind.config.ts": "vscode-icons:file-type-tailwind",
      vue: "vscode-icons:file-type-vue",
      ts: "vscode-icons:file-type-typescript",
      tsx: "vscode-icons:file-type-typescript",
      mjs: "vscode-icons:file-type-js",
      cjs: "vscode-icons:file-type-js",
      js: "vscode-icons:file-type-js",
      jsx: "vscode-icons:file-type-js",
      md: "vscode-icons:file-type-markdown",
      py: "vscode-icons:file-type-python",
      ico: "vscode-icons:file-type-favicon",
      npm: "vscode-icons:file-type-npm",
      pnpm: "vscode-icons:file-type-pnpm",
      npx: "vscode-icons:file-type-npm",
      yarn: "vscode-icons:file-type-yarn",
      bun: "vscode-icons:file-type-bun",
      yml: "vscode-icons:file-type-yaml",
      terminal: "i-heroicons-command-line"
    };
    const { ui } = useUI("content.prose.code.icon", void 0, config, void 0, true);
    const extension = computed(() => {
      var _a;
      return (((_a = props.filename) == null ? void 0 : _a.split(".").pop()) || "").toLowerCase();
    });
    const hasIcon = computed(() => props.icon || ui.value[extension.value] || props.filename.includes("."));
    const icon = computed(() => props.icon ?? (props.filename && (ui.value[props.filename.split("/").pop()] ?? ui.value[extension.value] ?? `vscode-icons:file-type-${extension.value}`)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1;
      if (unref(hasIcon)) {
        _push(ssrRenderComponent(_component_UIcon, mergeProps({
          name: unref(icon).split(" ").pop(),
          dynamic: ""
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ProseCodeIcon-x2TRaTNU.js.map

import { u as useUI, _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, unref, mergeProps, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/cookie-es/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-raw/index.js';

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
    const icon = computed(() => {
      var _a, _b, _c;
      return (_c = props.icon) != null ? _c : props.filename && ((_b = (_a = ui.value[props.filename.split("/").pop()]) != null ? _a : ui.value[extension.value]) != null ? _b : `vscode-icons:file-type-${extension.value}`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1$1;
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

export { _sfc_main as default };
//# sourceMappingURL=ProseCodeIcon-x2TRaTNU.mjs.map

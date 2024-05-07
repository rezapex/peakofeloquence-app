import { n as useUI, ad as useToast, k as __nuxt_component_0$4 } from './server.mjs';
import { c as useClipboard } from './index-Df99oxY9.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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

function useCopyToClipboard(options = {}) {
  const { copy: copyToClipboard, isSupported } = useClipboard();
  const toast = useToast();
  function copy(text, success = {}, failure = {}) {
    if (!isSupported) {
      return;
    }
    copyToClipboard(text).then(() => {
      if (!success.title && !success.description) {
        return;
      }
      toast.add({ ...success, ...options });
    }, function(e) {
      toast.add({
        ...failure,
        description: failure.description || e.message,
        ...options
      });
    });
  }
  return {
    copy
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseCodeButton",
  __ssrInlineRender: true,
  props: {
    code: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const config = {
      icon: {
        copy: "i-heroicons-clipboard-document",
        copied: "i-heroicons-clipboard-document-check"
      }
    };
    const { ui } = useUI("content.prose.code.button", void 0, config, void 0, true);
    const clipboard = useCopyToClipboard({ timeout: 2e3 });
    const icon = ref(ui.value.icon.copy);
    function copy() {
      clipboard.copy(props.code, { title: "Copied to clipboard!" });
      icon.value = ui.value.icon.copied;
      setTimeout(() => {
        icon.value = ui.value.icon.copy;
      }, 2e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_0$4;
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        icon: unref(icon),
        color: "gray",
        variant: "link",
        size: "xs",
        "aria-label": "Copy code to clipboard",
        tabindex: "-1",
        onClick: copy
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/modules/pro/runtime/components/global/prose/ProseCodeButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseCodeButton-B3zIHJoO.mjs.map

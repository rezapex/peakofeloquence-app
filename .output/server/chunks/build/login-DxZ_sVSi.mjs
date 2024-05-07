import { _ as __nuxt_component_0 } from './Card-ru04_bD8.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, withModifiers, createTextVNode, useSSRContext } from 'vue';
import { f as useSeoMeta } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'tailwind-merge';
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
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Login"
    });
    function onNetlifySubmit(event) {
      event.preventDefault();
      console.log("Netlify form submission handled");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, { class: "max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur mb-8" }, null, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form name="login-form" method="POST" data-netlify="true"${_scopeId}><p${_scopeId}><label${_scopeId}>Email: <input type="email" name="email"${_scopeId}></label></p><p${_scopeId}><label${_scopeId}>Password: <input type="password" name="password"${_scopeId}></label></p><p${_scopeId}><button type="submit"${_scopeId}>Log In</button></p></form>`);
          } else {
            return [
              createVNode("form", {
                name: "login-form",
                method: "POST",
                "data-netlify": "true",
                onSubmit: withModifiers(onNetlifySubmit, ["prevent"])
              }, [
                createVNode("p", null, [
                  createVNode("label", null, [
                    createTextVNode("Email: "),
                    createVNode("input", {
                      type: "email",
                      name: "email"
                    })
                  ])
                ]),
                createVNode("p", null, [
                  createVNode("label", null, [
                    createTextVNode("Password: "),
                    createVNode("input", {
                      type: "password",
                      name: "password"
                    })
                  ])
                ]),
                createVNode("p", null, [
                  createVNode("button", { type: "submit" }, "Log In")
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DxZ_sVSi.mjs.map

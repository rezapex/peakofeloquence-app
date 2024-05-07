import { u as useRoute, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, g as findPageHeadline, a as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './PageBody-BLLjqBdu.mjs';
import _sfc_main$3 from './ContentRenderer-CU-6GHfd.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$4 } from './ContentToc-B1Kll_kw.mjs';
import { d as defineOgImage } from './defineOgImage-CUX459Xc.mjs';
import { defineComponent, withAsyncContext, computed, unref, createSlots, withCtx, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { y as withoutTrailingSlash } from '../runtime.mjs';
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
import './ContentRendererMarkdown-nk5K2-Er.mjs';
import 'property-information';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => queryContent(route.path).findOne(), "$UMOUItaw9R")), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const { data: surround } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `${route.path}-surround`,
      () => queryContent("/docs").where({ _extension: "md", navigation: { $ne: false } }).only(["title", "description", "_path"]).findSurround(withoutTrailingSlash(route.path)),
      { default: () => [] }
    )), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: page.value.title,
      ogTitle: page.value.title,
      description: page.value.description,
      ogDescription: page.value.description
    });
    defineOgImage({
      component: "Saas",
      title: page.value.title,
      description: page.value.description
    });
    const headline = computed(() => findPageHeadline(page.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPage = _sfc_main$a;
      const _component_UPageHeader = _sfc_main$1;
      const _component_UPageBody = _sfc_main$2;
      const _component_ContentRenderer = _sfc_main$3;
      const _component_UContentSurround = _sfc_main$2$1;
      const _component_UContentToc = _sfc_main$4;
      if (unref(page)) {
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
              var _a, _b, _c, _d;
              if (_push2) {
                _push2(ssrRenderComponent(_component_UContentToc, {
                  links: (_b = (_a = unref(page).body) == null ? void 0 : _a.toc) == null ? void 0 : _b.links
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UContentToc, {
                    links: (_d = (_c = unref(page).body) == null ? void 0 : _c.toc) == null ? void 0 : _d.links
                  }, null, 8, ["links"])
                ];
              }
            }),
            key: "0"
          } : void 0
        ]), _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sermons/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-CsCH523S.mjs.map

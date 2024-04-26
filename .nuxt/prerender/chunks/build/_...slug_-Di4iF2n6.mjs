import { u as useRoute, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, g as findPageHeadline, a as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './PageBody-Dx8_Mp0S.mjs';
import _sfc_main$3 from './ContentRenderer-DZQYPm-a.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$4 } from './ContentToc-Biys1i44.mjs';
import { d as defineOgImage } from './defineOgImage-C7x_EntE.mjs';
import { defineComponent, withAsyncContext, computed, unref, createSlots, withCtx, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';
import { withoutTrailingSlash } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/devalue/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/ssr/dist/index.mjs';
import '../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/rehype-raw/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ipx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/cookie-es/dist/index.mjs';
import './ContentRendererMarkdown-C2oaFUwm.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/property-information/index.js';
import './useSiteConfig-CRotISqA.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => queryContent(route.path).findOne(), "$8JKhlg7hJ9")), __temp = await __temp, __restore(), __temp);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sayings/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-Di4iF2n6.mjs.map

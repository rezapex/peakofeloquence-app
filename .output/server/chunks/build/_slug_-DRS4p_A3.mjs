import { u as useRoute, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, i as useSiteConfig, _ as __nuxt_component_0$2, j as __nuxt_component_1, k as __nuxt_component_0$4, l as __nuxt_component_1$1, a as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './PageBody-Cqm_-HOG.mjs';
import _sfc_main$3 from './ContentRenderer-CU-6GHfd.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$4 } from './ContentToc-DbpkDU3I.mjs';
import { d as defineOgImage } from './defineOgImage-DSkpf_RL.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, mergeProps, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { y as withoutTrailingSlash, P as joinURL } from '../runtime.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c;
    let __temp, __restore;
    const route = useRoute();
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => queryContent(route.path).findOne(), "$LEmP2wQsop")), __temp = await __temp, __restore(), __temp);
    if (!post.value) {
      throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
    }
    const { data: surround } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `${route.path}-surround`,
      () => queryContent("/blog").where({ _extension: "md" }).without(["body", "excerpt"]).sort({ date: -1 }).findSurround(withoutTrailingSlash(route.path)),
      { default: () => [] }
    )), __temp = await __temp, __restore(), __temp);
    const title = ((_a = post.value.head) == null ? void 0 : _a.title) || post.value.title;
    const description = ((_b = post.value.head) == null ? void 0 : _b.description) || post.value.description;
    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description
    });
    if ((_c = post.value.image) == null ? void 0 : _c.src) {
      const site = useSiteConfig();
      useSeoMeta({
        ogImage: joinURL(site.url, post.value.image.src),
        twitterImage: joinURL(site.url, post.value.image.src)
      });
    } else {
      defineOgImage({
        component: "Saas",
        title,
        description,
        headline: "Blog"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UPageHeader = _sfc_main$1;
      const _component_UBadge = __nuxt_component_1;
      const _component_UButton = __nuxt_component_0$4;
      const _component_UAvatar = __nuxt_component_1$1;
      const _component_UPage = _sfc_main$a;
      const _component_UPageBody = _sfc_main$2;
      const _component_ContentRenderer = _sfc_main$3;
      const _component_UContentSurround = _sfc_main$2$1;
      const _component_UContentToc = _sfc_main$4;
      if (unref(post)) {
        _push(ssrRenderComponent(_component_UContainer, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageHeader, {
                title: unref(post).title,
                description: unref(post).description
              }, {
                headline: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UBadge, mergeProps(unref(post).badge, { variant: "subtle" }), null, _parent3, _scopeId2));
                    _push3(`<span class="text-gray-500 dark:text-gray-400"${_scopeId2}>\xB7</span><time class="text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(new Date(unref(post).date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }))}</time>`);
                  } else {
                    return [
                      createVNode(_component_UBadge, mergeProps(unref(post).badge, { variant: "subtle" }), null, 16),
                      createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "\xB7"),
                      createVNode("time", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(new Date(unref(post).date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })), 1)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-wrap items-center gap-3 mt-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(post).authors, (author, index) => {
                      _push3(ssrRenderComponent(_component_UButton, {
                        key: index,
                        to: author.to,
                        color: "white",
                        target: "_blank",
                        size: "sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UAvatar, mergeProps(author.avatar, {
                              alt: author.name,
                              size: "2xs"
                            }), null, _parent4, _scopeId3));
                            _push4(` ${ssrInterpolate(author.name)}`);
                          } else {
                            return [
                              createVNode(_component_UAvatar, mergeProps(author.avatar, {
                                alt: author.name,
                                size: "2xs"
                              }), null, 16, ["alt"]),
                              createTextVNode(" " + toDisplayString(author.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-wrap items-center gap-3 mt-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(post).authors, (author, index) => {
                          return openBlock(), createBlock(_component_UButton, {
                            key: index,
                            to: author.to,
                            color: "white",
                            target: "_blank",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UAvatar, mergeProps(author.avatar, {
                                alt: author.name,
                                size: "2xs"
                              }), null, 16, ["alt"]),
                              createTextVNode(" " + toDisplayString(author.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UPage, null, {
                right: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(post).body && unref(post).body.toc) {
                      _push3(ssrRenderComponent(_component_UContentToc, {
                        links: unref(post).body.toc.links
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(post).body && unref(post).body.toc ? (openBlock(), createBlock(_component_UContentToc, {
                        key: 0,
                        links: unref(post).body.toc.links
                      }, null, 8, ["links"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UPageBody, { prose: "" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2;
                        if (_push4) {
                          if (unref(post) && unref(post).body) {
                            _push4(ssrRenderComponent(_component_ContentRenderer, { value: unref(post) }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if ((_a2 = unref(surround)) == null ? void 0 : _a2.length) {
                            _push4(`<hr${_scopeId3}>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(_component_UContentSurround, { surround: unref(surround) }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            unref(post) && unref(post).body ? (openBlock(), createBlock(_component_ContentRenderer, {
                              key: 0,
                              value: unref(post)
                            }, null, 8, ["value"])) : createCommentVNode("", true),
                            ((_b2 = unref(surround)) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("hr", { key: 1 })) : createCommentVNode("", true),
                            createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UPageBody, { prose: "" }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            unref(post) && unref(post).body ? (openBlock(), createBlock(_component_ContentRenderer, {
                              key: 0,
                              value: unref(post)
                            }, null, 8, ["value"])) : createCommentVNode("", true),
                            ((_a2 = unref(surround)) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("hr", { key: 1 })) : createCommentVNode("", true),
                            createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                          ];
                        }),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageHeader, {
                  title: unref(post).title,
                  description: unref(post).description
                }, {
                  headline: withCtx(() => [
                    createVNode(_component_UBadge, mergeProps(unref(post).badge, { variant: "subtle" }), null, 16),
                    createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "\xB7"),
                    createVNode("time", { class: "text-gray-500 dark:text-gray-400" }, toDisplayString(new Date(unref(post).date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })), 1)
                  ]),
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-wrap items-center gap-3 mt-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(post).authors, (author, index) => {
                        return openBlock(), createBlock(_component_UButton, {
                          key: index,
                          to: author.to,
                          color: "white",
                          target: "_blank",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UAvatar, mergeProps(author.avatar, {
                              alt: author.name,
                              size: "2xs"
                            }), null, 16, ["alt"]),
                            createTextVNode(" " + toDisplayString(author.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "description"]),
                createVNode(_component_UPage, null, {
                  right: withCtx(() => [
                    unref(post).body && unref(post).body.toc ? (openBlock(), createBlock(_component_UContentToc, {
                      key: 0,
                      links: unref(post).body.toc.links
                    }, null, 8, ["links"])) : createCommentVNode("", true)
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_UPageBody, { prose: "" }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          unref(post) && unref(post).body ? (openBlock(), createBlock(_component_ContentRenderer, {
                            key: 0,
                            value: unref(post)
                          }, null, 8, ["value"])) : createCommentVNode("", true),
                          ((_a2 = unref(surround)) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("hr", { key: 1 })) : createCommentVNode("", true),
                          createVNode(_component_UContentSurround, { surround: unref(surround) }, null, 8, ["surround"])
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-DRS4p_A3.mjs.map

import { _ as _sfc_main$6, a as __nuxt_component_5, b as _sfc_main$4, c as __nuxt_component_7, d as _sfc_main$2, e as _sfc_main$1$1, f as _sfc_main$3 } from './LandingCTA-D0_5zxVv.mjs';
import { k as _export_sfc, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, h as __nuxt_component_1, i as __nuxt_component_0$6, j as __nuxt_component_1$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './LandingSection-OIZw2o1h.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, mergeProps, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'tailwind-merge';
import './nuxt-img--_9dupMN.mjs';
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
import './Card-DfnufoHP.mjs';
import './index-D1eMPiNF.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("index", () => queryContent("/").findOne())), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    useSeoMeta({
      titleTemplate: "PeakofEloquence.org",
      title: page.value.title,
      ogTitle: page.value.title,
      description: page.value.description,
      ogDescription: page.value.description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULandingHero = _sfc_main$6;
      const _component_UBadge = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UIcon = __nuxt_component_1$2;
      const _component_ULandingSection = _sfc_main$1;
      const _component_Placeholder = __nuxt_component_5;
      const _component_UPageGrid = _sfc_main$4;
      const _component_ULandingCard = __nuxt_component_7;
      const _component_UPageColumns = _sfc_main$2;
      const _component_ULandingTestimonial = _sfc_main$1$1;
      const _component_ULandingCTA = _sfc_main$3;
      if (unref(page)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-dfc34404>`);
        _push(ssrRenderComponent(_component_ULandingHero, {
          title: unref(page).hero.title,
          description: unref(page).hero.description,
          links: unref(page).hero.links
        }, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 class="font-serif font-light" data-v-dfc34404${_scopeId}>${ssrInterpolate(unref(page).hero.title)}</h1>`);
            } else {
              return [
                createVNode("h1", { class: "font-serif font-light" }, toDisplayString(unref(page).hero.title), 1)
              ];
            }
          }),
          headline: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(page).hero.headline) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  variant: "subtle",
                  size: "lg",
                  class: "relative rounded-full font-semibold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: unref(page).hero.headline.to,
                        target: "_blank",
                        class: "focus:outline-none",
                        tabindex: "-1"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span class="absolute inset-0" aria-hidden="true" data-v-dfc34404${_scopeId3}></span>`);
                          } else {
                            return [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(unref(page).hero.headline.label)} `);
                      if (unref(page).hero.headline.icon) {
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: unref(page).hero.headline.icon,
                          class: "ml-1 w-4 h-4 pointer-events-none"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: unref(page).hero.headline.to,
                          target: "_blank",
                          class: "focus:outline-none",
                          tabindex: "-1"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", {
                              class: "absolute inset-0",
                              "aria-hidden": "true"
                            })
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createTextVNode(" " + toDisplayString(unref(page).hero.headline.label) + " ", 1),
                        unref(page).hero.headline.icon ? (openBlock(), createBlock(_component_UIcon, {
                          key: 0,
                          name: unref(page).hero.headline.icon,
                          class: "ml-1 w-4 h-4 pointer-events-none"
                        }, null, 8, ["name"])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(page).hero.headline ? (openBlock(), createBlock(_component_UBadge, {
                  key: 0,
                  variant: "subtle",
                  size: "lg",
                  class: "relative rounded-full font-semibold"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, {
                      to: unref(page).hero.headline.to,
                      target: "_blank",
                      class: "focus:outline-none",
                      tabindex: "-1"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          class: "absolute inset-0",
                          "aria-hidden": "true"
                        })
                      ]),
                      _: 1
                    }, 8, ["to"]),
                    createTextVNode(" " + toDisplayString(unref(page).hero.headline.label) + " ", 1),
                    unref(page).hero.headline.icon ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: unref(page).hero.headline.icon,
                      class: "ml-1 w-4 h-4 pointer-events-none"
                    }, null, 8, ["name"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" data-v-dfc34404${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "absolute inset-0 landing-grid z-[-1] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, { class: "!pt-0 font-serif" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Placeholder, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Placeholder)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--[-->`);
        ssrRenderList(unref(page).sections, (section, index2) => {
          _push(ssrRenderComponent(_component_ULandingSection, {
            key: index2,
            title: section.title,
            description: section.description,
            align: section.align,
            features: section.features
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Placeholder, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Placeholder)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_ULandingSection, {
          title: unref(page).features.title,
          description: unref(page).features.description
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageGrid, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).features.items, (item, index2) => {
                      _push3(ssrRenderComponent(_component_ULandingCard, mergeProps({ key: index2 }, item), null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index2) => {
                        return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index2 }, item), null, 16);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageGrid, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index2) => {
                      return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index2 }, item), null, 16);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, {
          headline: unref(page).testimonials.headline,
          title: unref(page).testimonials.title,
          description: unref(page).testimonials.description
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UPageColumns, { class: "xl:columns-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(page).testimonials.items, (testimonial, index2) => {
                      _push3(`<div class="break-inside-avoid" data-v-dfc34404${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(page).testimonials.items, (testimonial, index2) => {
                        return openBlock(), createBlock("div", {
                          key: index2,
                          class: "break-inside-avoid"
                        }, [
                          createVNode(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UPageColumns, { class: "xl:columns-4" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).testimonials.items, (testimonial, index2) => {
                      return openBlock(), createBlock("div", {
                        key: index2,
                        class: "break-inside-avoid"
                      }, [
                        createVNode(_component_ULandingTestimonial, mergeProps(testimonial, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_ULandingSection, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ULandingCTA, mergeProps(unref(page).cta, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ULandingCTA, mergeProps(unref(page).cta, { class: "bg-gray-100/50 dark:bg-gray-800/50" }), null, 16)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dfc34404"]]);

export { index as default };
//# sourceMappingURL=index-DyMabWfR.mjs.map

import { n as mergeConfig, o as avatar, p as appConfig, l as useUI, r as getSlotsChildren, k as __nuxt_component_1$1, s as nuxtLinkProps, t as getNuxtLinkProps, v as getSlotChildrenText, e as useAsyncData, q as queryContent, c as createError, f as useSeoMeta, w as __nuxt_component_0$6, i as __nuxt_component_1, _ as __nuxt_component_0$2 } from './server.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './PageBody-CpZ2euS4.mjs';
import { useSSRContext, defineComponent, toRef, computed, cloneVNode, h, useSlots, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withAsyncContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-img--_9dupMN.mjs';
import { twMerge, twJoin } from 'tailwind-merge';
import { d as defineOgImage } from './defineOgImage-Ck-6ooTU.mjs';
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
import './useSiteConfig-CRotISqA.mjs';

const avatarGroup = {
  wrapper: "inline-flex flex-row-reverse justify-end",
  ring: "ring-2 ring-white dark:ring-gray-900",
  margin: "-me-1.5 first:me-0"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BlogList",
  __ssrInlineRender: true,
  props: {
    orientation: {
      type: String,
      default: "horizontal"
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const config = computed(() => {
      const wrapper = {
        horizontal: "flex flex-col lg:grid lg:grid-cols-3 gap-x-8 gap-y-16",
        vertical: "flex flex-col gap-y-16 w-full"
      }[props.orientation];
      return {
        wrapper
      };
    });
    const { ui, attrs } = useUI("blog.list", toRef(props, "ui"), config, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/blog/BlogList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const avatarConfig = mergeConfig(appConfig.ui.strategy, appConfig.ui.avatar, avatar);
const avatarGroupConfig = mergeConfig(appConfig.ui.strategy, appConfig.ui.avatarGroup, avatarGroup);
const __nuxt_component_3 = defineComponent({
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(avatarConfig.size).includes(value);
      }
    },
    max: {
      type: Number,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const { ui, attrs } = useUI("avatarGroup", toRef(props, "ui"), avatarGroupConfig, toRef(props, "class"));
    const children = computed(() => getSlotsChildren(slots));
    const max = computed(() => typeof props.max === "string" ? parseInt(props.max, 10) : props.max);
    const clones = computed(() => children.value.map((node, index) => {
      const vProps = {};
      if (!props.max || max.value && index < max.value) {
        if (props.size) {
          vProps.size = props.size;
        }
        vProps.class = node.props.class || "";
        vProps.class = twMerge(twJoin(vProps.class, ui.value.ring, ui.value.margin), vProps.class);
        return cloneVNode(node, vProps);
      }
      if (max.value !== void 0 && index === max.value) {
        return h(__nuxt_component_1$1, {
          size: props.size || avatarConfig.default.size,
          text: `+${children.value.length - max.value}`,
          class: twJoin(ui.value.ring, ui.value.margin)
        });
      }
      return null;
    }).filter(Boolean).reverse());
    return () => h("div", { class: ui.value.wrapper, ...attrs.value }, clones.value);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BlogPost",
  __ssrInlineRender: true,
  props: {
    ...nuxtLinkProps,
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    date: {
      type: [String, Date],
      default: void 0
    },
    image: {
      type: [String, Object],
      default: void 0
    },
    badge: {
      type: Object,
      default: void 0
    },
    authors: {
      type: Array,
      default: void 0
    },
    orientation: {
      type: String,
      default: "vertical"
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const slots = useSlots();
    const props = __props;
    const config = computed(() => {
      const wrapper = twJoin(
        "relative group flex flex-col w-full gap-y-6",
        props.orientation === "horizontal" && (!!props.image || !!slots.image) ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center" : void 0
      );
      return {
        wrapper,
        image: {
          wrapper: "ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden aspect-[16/9] w-full rounded-lg pointer-events-none",
          base: "object-cover object-top w-full h-full transform transition-transform duration-200 group-hover:scale-105"
        },
        container: "flex flex-col justify-between flex-1",
        inner: "flex-1",
        badge: {
          wrapper: "mb-3",
          base: ""
        },
        title: "text-gray-900 dark:text-white text-xl font-semibold truncate group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200",
        description: "text-base text-gray-500 dark:text-gray-400 mt-1",
        date: "text-sm text-gray-500 dark:text-gray-400 font-medium pointer-events-none",
        authors: {
          wrapper: "relative flex items-center gap-x-3 mt-4",
          avatar: {
            base: "relative ring-1 lg:hover:scale-105 lg:hover:ring-primary-500 dark:lg:hover:ring-primary-400 transition-transform",
            size: "xs"
          }
        }
      };
    });
    const { ui, attrs } = useUI("blog.post", toRef(props, "ui"), config, toRef(props, "class"), true);
    const nuxtLinkBind = computed(() => getNuxtLinkProps(props));
    const ariaLabel = computed(() => (props.title || slots.title && getSlotChildrenText(slots.title()) || "Post link").trim());
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtImg = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$6;
      const _component_UBadge = __nuxt_component_1;
      const _component_UAvatarGroup = __nuxt_component_3;
      const _component_UAvatar = __nuxt_component_1$1;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      if (__props.image || _ctx.$slots.image) {
        _push(`<div class="${ssrRenderClass(unref(ui).image.wrapper)}">`);
        ssrRenderSlot(_ctx.$slots, "image", {}, () => {
          _push(ssrRenderComponent(_component_NuxtImg, mergeProps(typeof __props.image === "string" ? { src: __props.image, alt: __props.title } : { alt: __props.title, ...__props.image }, {
            class: unref(ui).image.base
          }), null, _parent));
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(ui).container)}"><div class="${ssrRenderClass(unref(ui).inner)}">`);
      if (_ctx.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({ "aria-label": unref(ariaLabel) }, unref(nuxtLinkBind), {
          class: "focus:outline-none",
          tabindex: "-1"
        }), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="absolute inset-0" aria-hidden="true"${_scopeId}></span>`);
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.badge || _ctx.$slots.badge) {
        _push(`<div class="${ssrRenderClass(unref(ui).badge.wrapper)}">`);
        ssrRenderSlot(_ctx.$slots, "badge", {}, () => {
          if (__props.badge) {
            _push(ssrRenderComponent(_component_UBadge, mergeProps({ variant: "subtle", ...__props.badge }, {
              class: unref(ui).badge.base
            }), null, _parent));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.title || _ctx.$slots.title) {
        _push(`<h2 class="${ssrRenderClass(unref(ui).title)}">`);
        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
          _push(`${ssrInterpolate(__props.title)}`);
        }, _push, _parent);
        _push(`</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.description || _ctx.$slots.description) {
        _push(`<p class="${ssrRenderClass(unref(ui).description)}">`);
        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
          _push(`${ssrInterpolate(__props.description)}`);
        }, _push, _parent);
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (((_a = __props.authors) == null ? void 0 : _a.length) || __props.date) {
        _push(`<div class="${ssrRenderClass(unref(ui).authors.wrapper)}">`);
        ssrRenderSlot(_ctx.$slots, "authors", {}, () => {
          var _a2;
          if ((_a2 = __props.authors) == null ? void 0 : _a2.length) {
            _push(ssrRenderComponent(_component_UAvatarGroup, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.authors, (author, index) => {
                    _push2(ssrRenderComponent(_component_UAvatar, mergeProps({
                      key: index,
                      alt: author.name,
                      class: unref(ui).authors.avatar.base
                    }, { size: unref(ui).authors.avatar.size, ...author.avatar }), {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          if (author.to) {
                            _push3(ssrRenderComponent(_component_NuxtLink, mergeProps({ target: "_blank", ...unref(getNuxtLinkProps)(author) }, {
                              class: "focus:outline-none",
                              tabindex: "-1"
                            }), {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(`<span class="absolute inset-0" aria-hidden="true"${_scopeId3}></span>`);
                                } else {
                                  return [
                                    createVNode("span", {
                                      class: "absolute inset-0",
                                      "aria-hidden": "true"
                                    })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                          } else {
                            _push3(`<!---->`);
                          }
                        } else {
                          return [
                            author.to ? (openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: 0 }, { target: "_blank", ...unref(getNuxtLinkProps)(author) }, {
                              class: "focus:outline-none",
                              tabindex: "-1"
                            }), {
                              default: withCtx(() => [
                                createVNode("span", {
                                  class: "absolute inset-0",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 2
                            }, 1040)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.authors, (author, index) => {
                      return openBlock(), createBlock(_component_UAvatar, mergeProps({
                        key: index,
                        alt: author.name,
                        class: unref(ui).authors.avatar.base
                      }, { size: unref(ui).authors.avatar.size, ...author.avatar }), {
                        default: withCtx(() => [
                          author.to ? (openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: 0 }, { target: "_blank", ...unref(getNuxtLinkProps)(author) }, {
                            class: "focus:outline-none",
                            tabindex: "-1"
                          }), {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              })
                            ]),
                            _: 2
                          }, 1040)) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1040, ["alt", "class"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        ssrRenderSlot(_ctx.$slots, "date", {}, () => {
          if (__props.date) {
            _push(`<time${ssrRenderAttr("datetime", new Date(__props.date).toISOString())} class="${ssrRenderClass(unref(ui).date)}">${ssrInterpolate(__props.date)}</time>`);
          } else {
            _push(`<!---->`);
          }
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/blog/BlogPost.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("blog", () => queryContent("/blog").findOne())), __temp = await __temp, __restore(), __temp);
    if (!page.value) {
      throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
    }
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("posts", () => queryContent("/blog").where({ _extension: "md" }).sort({ date: -1 }).find())), __temp = await __temp, __restore(), __temp);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$2;
      const _component_UPageHeader = _sfc_main$1$1;
      const _component_UPageBody = _sfc_main$3;
      const _component_UBlogList = _sfc_main$2;
      const _component_UBlogPost = _sfc_main$1;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UPageHeader, mergeProps(unref(page), { class: "py-[50px]" }), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UPageBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UBlogList, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(posts), (post, index) => {
                          _push4(ssrRenderComponent(_component_UBlogPost, {
                            key: index,
                            to: post._path,
                            title: post.title,
                            description: post.description,
                            image: post.image,
                            date: new Date(post.date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }),
                            authors: post.authors,
                            badge: post.badge,
                            orientation: index === 0 ? "horizontal" : "vertical",
                            class: [index === 0 && "col-span-full"],
                            ui: {
                              description: "line-clamp-2"
                            }
                          }, null, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post, index) => {
                            return openBlock(), createBlock(_component_UBlogPost, {
                              key: index,
                              to: post._path,
                              title: post.title,
                              description: post.description,
                              image: post.image,
                              date: new Date(post.date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }),
                              authors: post.authors,
                              badge: post.badge,
                              orientation: index === 0 ? "horizontal" : "vertical",
                              class: [index === 0 && "col-span-full"],
                              ui: {
                                description: "line-clamp-2"
                              }
                            }, null, 8, ["to", "title", "description", "image", "date", "authors", "badge", "orientation", "class"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UBlogList, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post, index) => {
                          return openBlock(), createBlock(_component_UBlogPost, {
                            key: index,
                            to: post._path,
                            title: post.title,
                            description: post.description,
                            image: post.image,
                            date: new Date(post.date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }),
                            authors: post.authors,
                            badge: post.badge,
                            orientation: index === 0 ? "horizontal" : "vertical",
                            class: [index === 0 && "col-span-full"],
                            ui: {
                              description: "line-clamp-2"
                            }
                          }, null, 8, ["to", "title", "description", "image", "date", "authors", "badge", "orientation", "class"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UPageHeader, mergeProps(unref(page), { class: "py-[50px]" }), null, 16),
              createVNode(_component_UPageBody, null, {
                default: withCtx(() => [
                  createVNode(_component_UBlogList, null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post, index) => {
                        return openBlock(), createBlock(_component_UBlogPost, {
                          key: index,
                          to: post._path,
                          title: post.title,
                          description: post.description,
                          image: post.image,
                          date: new Date(post.date).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }),
                          authors: post.authors,
                          badge: post.badge,
                          orientation: index === 0 ? "horizontal" : "vertical",
                          class: [index === 0 && "col-span-full"],
                          ui: {
                            description: "line-clamp-2"
                          }
                        }, null, 8, ["to", "title", "description", "image", "date", "authors", "badge", "orientation", "class"]);
                      }), 128))
                    ]),
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B4VxjfKf.mjs.map

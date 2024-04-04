import { t as nuxtLinkProps, v as config$9, u as useUI, w as getNuxtLinkProps, x as getSlotChildrenText, n as useAsyncData, q as queryContent, o as useSeoMeta, f as useAppConfig, b as __nuxt_component_0$7, _ as __nuxt_component_1$1, y as __nuxt_component_1, s as __nuxt_component_0$8, a as __nuxt_component_0$3, g as _export_sfc } from './server.mjs';
import { useSSRContext, defineComponent, computed, ref, useSlots, toRef, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, renderSlot, createTextVNode, toDisplayString, withAsyncContext, Fragment, renderList, watch } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/server-renderer/index.mjs';
import { twJoin, twMerge } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import { _ as _sfc_main$6, h as htmlTags } from './MDCRenderer-CqRMB_ub.mjs';
import { hash } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ohash/dist/index.mjs';
import { defu } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/defu/dist/defu.mjs';
import { unified } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unified/index.js';
import remarkParse from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-parse/index.js';
import remark2rehype from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-rehype/index.js';
import remarkMDC, { parseFrontMatter } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-mdc/dist/index.mjs';
import { toString } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hast-util-to-string/index.js';
import Slugger from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/github-slugger/index.js';
import { detab } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/detab/index.js';
import { kebabCase } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/scule/dist/index.mjs';
import { normalizeUri } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-sanitize-uri/index.js';
import remarkEmoji from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-emoji/index.js';
import remarkGFM from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-gfm/index.js';
import rehypeExternalLinks from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-external-links/index.js';
import rehypeSortAttributeValues from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attribute-values/index.js';
import rehypeSortAttributes from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attributes/index.js';
import rehypeRaw from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-raw/index.js';
import { n as nodeTextContent } from './node-B5VQLu6X.mjs';
import { _ as __nuxt_component_0 } from './Card-CYpkgoc7.mjs';
import { createSharedComposable, useMouse, defaultWindow, watchThrottled, unrefElement } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unctx/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/h3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unhead/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@iconify/vue/dist/iconify.mjs';
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
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/property-information/index.js';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingHero",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    links: {
      type: Array,
      default: () => []
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
    const props = __props;
    const config2 = computed(() => {
      const container = twJoin(
        "gap-16 sm:gap-y-24",
        props.orientation === "vertical" && "flex flex-col",
        props.orientation === "horizontal" && "grid lg:grid-cols-2 lg:items-center"
      );
      const base = props.orientation === "vertical" ? "text-center" : "";
      const links = twJoin(
        "mt-10 flex flex-wrap gap-x-6 gap-y-3",
        props.orientation === "vertical" && "justify-center"
      );
      return {
        wrapper: "py-24 sm:py-32 md:py-40 relative",
        container,
        base,
        headline: "mb-10",
        title: "text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl",
        description: "mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300",
        links
      };
    });
    const { ui, attrs } = useUI("landing.hero", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$8;
      const _component_UButton = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_UContainer, {
        class: unref(ui).container
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).base)}"${_scopeId}>`);
            if (_ctx.$slots.headline) {
              _push2(`<div class="${ssrRenderClass(unref(ui).headline)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "headline", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, () => {
              _push2(`${ssrInterpolate(__props.title)}`);
            }, _push2, _parent2, _scopeId);
            _push2(`</h1>`);
            if (__props.description || _ctx.$slots.description) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links) {
              _push2(`<div class="${ssrRenderClass(unref(ui).links)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.links, (link2, index) => {
                  _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link2, {
                    onClick: link2.click
                  }), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", {
                class: unref(ui).base
              }, [
                _ctx.$slots.headline ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: unref(ui).headline
                }, [
                  renderSlot(_ctx.$slots, "headline")
                ], 2)) : createCommentVNode("", true),
                createVNode("h1", {
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                ((_b = __props.links) == null ? void 0 : _b.length) || _ctx.$slots.links ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: unref(ui).links
                }, [
                  renderSlot(_ctx.$slots, "links", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link2, index) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({ key: index }, link2, {
                        onClick: link2.click
                      }), null, 16, ["onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingHero.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const useProcessorPlugins = async (processor, plugins = {}) => {
  const toUse = Object.entries(plugins).filter((p) => p[1] !== false);
  for (const plugin of toUse) {
    const instance = plugin[1].instance || await import(
      /* @vite-ignore */
      plugin[0]
    ).then((m) => m.default || m);
    processor.use(instance, plugin[1].options);
  }
};
const unsafeLinkPrefix = [
  "javascript:",
  "data:text/html",
  "vbscript:",
  "data:text/javascript",
  "data:text/vbscript",
  "data:text/css",
  "data:text/plain",
  "data:text/xml"
];
const validateProp = (attribute, value) => {
  if (attribute.startsWith("on")) {
    return false;
  }
  if (attribute === "href" || attribute === "src") {
    return !unsafeLinkPrefix.some((prefix) => value.toLowerCase().startsWith(prefix));
  }
  return true;
};
const validateProps = (type, props) => {
  if (!props) {
    return {};
  }
  props = Object.fromEntries(
    Object.entries(props).filter(([name, value]) => {
      const isValid = validateProp(name, value);
      if (!isValid) {
        console.warn(`[@nuxtjs/mdc] removing unsafe attribute: ${name}="${value}"`);
      }
      return isValid;
    })
  );
  if (type === "pre") {
    if (typeof props.highlights === "string") {
      props.highlights = props.highlights.split(" ").map((i) => parseInt(i));
    }
  }
  return props;
};
function compileHast(options = {}) {
  const slugs = new Slugger();
  function compileToJSON(node, parent) {
    var _a, _b, _c, _d, _e;
    if (node.type === "root") {
      return {
        type: "root",
        children: node.children.map((child) => compileToJSON(child, node)).filter(Boolean)
      };
    }
    if (node.type === "element") {
      if (node.tagName === "p" && node.children.every((child) => child.type === "text" && /^\s*$/.test(child.value))) {
        return null;
      }
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = (_a = node.children) == null ? void 0 : _a.flatMap((child) => {
          if (child.type === "element" && child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {},
                children: []
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if ((_b = node.tagName) == null ? void 0 : _b.match(/^h\d$/)) {
        node.properties = node.properties || {};
        node.properties.id = String(((_c = node.properties) == null ? void 0 : _c.id) || slugs.slug(toString(node))).replace(/-+/g, "-").replace(/^-|-$/g, "").replace(/^(\d)/, "_$1");
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      const children = (node.tagName === "template" && ((_d = node.content) == null ? void 0 : _d.children.length) ? node.content.children : node.children).map((child) => compileToJSON(child, node)).filter(Boolean);
      return {
        type: "element",
        tag: node.tagName,
        props: validateProps(node.tagName, node.properties),
        children
      };
    }
    if (node.type === "text") {
      if (node.value !== "\n" || ((_e = parent == null ? void 0 : parent.properties) == null ? void 0 : _e.emptyLinePlaceholder)) {
        return {
          type: "text",
          value: node.value
        };
      }
    }
    if (options.keepComments && node.type === "comment") {
      return {
        type: "comment",
        value: node.value
      };
    }
    return null;
  }
  this.Compiler = (tree) => {
    const body = compileToJSON(tree);
    let excerpt = void 0;
    const excerptIndex = tree.children.findIndex((node) => {
      var _a;
      return node.type === "comment" && ((_a = node.value) == null ? void 0 : _a.trim()) === "more";
    });
    if (excerptIndex !== -1) {
      excerpt = compileToJSON({
        type: "root",
        children: tree.children.slice(0, excerptIndex)
      });
      if (excerpt.children.find((node) => node.type === "element" && node.tag === "pre")) {
        const lastChild = body.children[body.children.length - 1];
        if (lastChild.type === "element" && lastChild.tag === "style") {
          excerpt.children.push(lastChild);
        }
      }
    }
    return {
      body,
      excerpt
    };
  };
}
function emphasis(state, node) {
  const result = {
    type: "element",
    tagName: "em",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function parseThematicBlock(lang) {
  var _a, _b, _c;
  if (!(lang == null ? void 0 : lang.trim())) {
    return {
      language: void 0,
      highlights: void 0,
      filename: void 0,
      meta: void 0
    };
  }
  const languageMatches = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokensMatches = lang.match(/{([^}]*)}/);
  const filenameMatches = lang.match(/\[((\\]|[^\]])*)\]/);
  const meta = lang.replace((_a = languageMatches == null ? void 0 : languageMatches[0]) != null ? _a : "", "").replace((_b = highlightTokensMatches == null ? void 0 : highlightTokensMatches[0]) != null ? _b : "", "").replace((_c = filenameMatches == null ? void 0 : filenameMatches[0]) != null ? _c : "", "").trim();
  return {
    language: (languageMatches == null ? void 0 : languageMatches[0]) || void 0,
    highlights: parseHighlightedLines((highlightTokensMatches == null ? void 0 : highlightTokensMatches[1]) || void 0),
    // https://github.com/nuxt/content/pull/2169
    filename: (filenameMatches == null ? void 0 : filenameMatches[1].replace(/\\]/g, "]")) || void 0,
    meta
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
const code = (state, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename, meta } = parseThematicBlock(lang);
  const value = node.value ? detab(node.value + "\n") : "";
  let result = {
    type: "element",
    tagName: "code",
    properties: { __ignoreMap: "" },
    children: [{ type: "text", value }]
  };
  if (meta) {
    result.data = {
      // @ts-ignore
      meta
    };
  }
  state.patch(node, result);
  result = state.applyData(node, result);
  const properties = {
    language,
    filename,
    highlights,
    meta,
    code: value
  };
  if (language) {
    properties.className = ["language-" + language];
  }
  result = { type: "element", tagName: "pre", properties, children: [result] };
  state.patch(node, result);
  return result;
};
function html(state, node) {
  var _a;
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (state.dangerous || ((_a = state.options) == null ? void 0 : _a.allowDangerousHtml)) {
    const result = { type: "raw", value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }
  return void 0;
}
function link(state, node) {
  const properties = {
    ...node.attributes || {},
    href: normalizeUri(node.url)
  };
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function list(state, node) {
  const properties = {};
  const results = state.all(node);
  let index = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    properties.start = node.start;
  }
  while (++index < results.length) {
    const child = results[index];
    if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
      properties.className = ["contains-task-list"];
      break;
    }
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    properties.className = ["contains-task-list"];
  }
  const result = {
    type: "element",
    tagName: node.ordered ? "ol" : "ul",
    properties,
    children: state.wrap(results, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function paragraph(state, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return state.all(node);
    }
  }
  const result = {
    type: "element",
    tagName: "p",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function image(state, node) {
  const properties = { ...node.attributes, src: normalizeUri(node.url) };
  if (node.alt !== null && node.alt !== void 0) {
    properties.alt = node.alt;
  }
  if (node.title !== null && node.title !== void 0) {
    properties.title = node.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}
function strong(state, node) {
  const result = {
    type: "element",
    tagName: "strong",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}
function inlineCode(state, node) {
  var _a, _b;
  const language = ((_a = node.attributes) == null ? void 0 : _a.language) || ((_b = node.attributes) == null ? void 0 : _b.lang);
  const text = { type: "text", value: node.value.replace(/\r?\n|\r/g, " ") };
  state.patch(node, text);
  const result = {
    type: "element",
    tagName: "code",
    properties: node.attributes || {},
    children: [text]
  };
  const classes = (result.properties.class || "").split(" ");
  delete result.properties.class;
  if (language) {
    result.properties.language = language;
    delete result.properties.lang;
    classes.push("language-" + language);
  }
  result.properties.className = classes.join(" ");
  state.patch(node, result);
  return state.applyData(node, result);
}
function containerComponent(state, node) {
  var _a;
  const result = {
    type: "element",
    tagName: node.name,
    properties: {
      ...node.attributes,
      ...(_a = node.data) == null ? void 0 : _a.hProperties
    },
    children: state.all(node)
  };
  state.patch(node, result);
  result.attributes = node.attributes;
  result.fmAttributes = node.fmAttributes;
  return result;
}
const handlers = {
  emphasis,
  code,
  link,
  paragraph,
  html,
  list,
  image,
  strong,
  inlineCode,
  containerComponent
};
const defaults = {
  remark: {
    plugins: {
      "remark-mdc": {
        instance: remarkMDC
      },
      "remark-emoji": {
        instance: remarkEmoji
      },
      "remark-gfm": {
        instance: remarkGFM
      }
    }
  },
  rehype: {
    options: {
      // @ts-ignore
      handlers,
      allowDangerousHtml: true
    },
    plugins: {
      "rehype-external-links": {
        instance: rehypeExternalLinks
      },
      "rehype-sort-attribute-values": {
        instance: rehypeSortAttributeValues
      },
      "rehype-sort-attributes": {
        instance: rehypeSortAttributes
      },
      "rehype-raw": {
        instance: rehypeRaw,
        options: {
          passThrough: ["element"]
        }
      }
    }
  },
  highlight: false,
  toc: {
    searchDepth: 2,
    depth: 2
  }
};
function flattenNodeText(node) {
  if (node.type === "comment") {
    return "";
  }
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}
const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    var _a;
    if ((_a = header.children) == null ? void 0 : _a.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => {
    var _a;
    return {
      id: (_a = node.props) == null ? void 0 : _a.id,
      depth: getHeaderDepth(node),
      text: flattenNodeText(node)
    };
  });
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}
let moduleOptions;
let generatedMdcConfigs;
const createMarkdownParser = async (inlineOptions = {}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  if (!moduleOptions) {
    moduleOptions = await import(
      './mdc-imports-D-rHrtv2.mjs'
      /* @vite-ignore */
    ).catch(() => ({}));
  }
  if (!generatedMdcConfigs) {
    generatedMdcConfigs = await import(
      './mdc-configs-D-mPnyQ5.mjs'
      /* @vite-ignore */
    ).then((r) => r.getMdcConfigs()).catch(() => []);
  }
  const mdcConfigs = [
    ...generatedMdcConfigs || [],
    ...inlineOptions.configs || []
  ];
  if (inlineOptions.highlight != null && inlineOptions.highlight != false && inlineOptions.highlight.highlighter !== void 0 && typeof inlineOptions.highlight.highlighter !== "function") {
    inlineOptions = {
      ...inlineOptions,
      highlight: {
        ...inlineOptions.highlight
      }
    };
    delete inlineOptions.highlight.highlighter;
  }
  const options = defu(inlineOptions, {
    remark: { plugins: moduleOptions == null ? void 0 : moduleOptions.remarkPlugins },
    rehype: { plugins: moduleOptions == null ? void 0 : moduleOptions.rehypePlugins },
    highlight: moduleOptions == null ? void 0 : moduleOptions.highlight
  }, defaults);
  if ((_b = (_a = options.rehype) == null ? void 0 : _a.plugins) == null ? void 0 : _b.highlight) {
    options.rehype.plugins.highlight.options = {
      ...options.rehype.plugins.highlight.options || {},
      ...options.highlight || {}
    };
  }
  let processor = unified();
  for (const config2 of mdcConfigs) {
    processor = await ((_d = (_c = config2.unified) == null ? void 0 : _c.pre) == null ? void 0 : _d.call(_c, processor)) || processor;
  }
  processor.use(remarkParse);
  for (const config2 of mdcConfigs) {
    processor = await ((_f = (_e = config2.unified) == null ? void 0 : _e.remark) == null ? void 0 : _f.call(_e, processor)) || processor;
  }
  await useProcessorPlugins(processor, (_g = options.remark) == null ? void 0 : _g.plugins);
  processor.use(remark2rehype, (_h = options.rehype) == null ? void 0 : _h.options);
  for (const config2 of mdcConfigs) {
    processor = await ((_j = (_i = config2.unified) == null ? void 0 : _i.rehype) == null ? void 0 : _j.call(_i, processor)) || processor;
  }
  await useProcessorPlugins(processor, (_k = options.rehype) == null ? void 0 : _k.plugins);
  processor.use(compileHast, options);
  for (const config2 of mdcConfigs) {
    processor = await ((_m = (_l = config2.unified) == null ? void 0 : _l.post) == null ? void 0 : _m.call(_l, processor)) || processor;
  }
  return async (md) => {
    const { content, data: frontmatter } = await parseFrontMatter(md);
    const processedFile = await processor.process({ value: content, data: frontmatter });
    const result = processedFile.result;
    const data = Object.assign(
      contentHeading(result.body),
      frontmatter,
      (processedFile == null ? void 0 : processedFile.data) || {}
    );
    let toc;
    if (data.toc !== false) {
      const tocOption = defu(data.toc || {}, options.toc);
      toc = generateToc(result.body, tocOption);
    }
    return {
      data,
      body: result.body,
      excerpt: result.excerpt,
      toc
    };
  };
};
const parseMarkdown = async (md, inlineOptions = {}) => {
  const parser = await createMarkdownParser(inlineOptions);
  return parser(md);
};
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type === "element" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MDC",
  __ssrInlineRender: true,
  props: {
    tag: {
      type: [String, Boolean],
      default: "div"
    },
    /**
     * Raw markdown string or parsed markdown object from `parseMarkdown`
     */
    value: {
      type: [String, Object],
      required: true
    },
    /**
     * Render only the excerpt
     */
    excerpt: {
      type: Boolean,
      default: false
    },
    /**
     * Options for `parseMarkdown`
     */
    parserOptions: {
      type: Object,
      default: () => ({})
    },
    /**
     * Class to be applied to the root element
     */
    class: {
      type: [String, Array, Object],
      default: ""
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const key = computed(() => hash(props.value));
    const { data, refresh, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(key.value, async () => {
      if (typeof props.value !== "string") {
        return props.value;
      }
      return await parseMarkdown(props.value, props.parserOptions);
    }, "$c2vlHSrNA1")), __temp = await __temp, __restore(), __temp);
    const body = computed(() => {
      var _a, _b;
      return props.excerpt ? (_a = data.value) == null ? void 0 : _a.excerpt : (_b = data.value) == null ? void 0 : _b.body;
    });
    watch(() => props.value, () => {
      refresh();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_MDCRenderer = _sfc_main$6;
      ssrRenderSlot(_ctx.$slots, "default", {
        data: (_a = unref(data)) == null ? void 0 : _a.data,
        body: (_b = unref(data)) == null ? void 0 : _b.body,
        toc: (_c = unref(data)) == null ? void 0 : _c.toc,
        excerpt: (_d = unref(data)) == null ? void 0 : _d.excerpt,
        error: unref(error)
      }, () => {
        var _a2;
        if (body.value) {
          _push(ssrRenderComponent(_component_MDCRenderer, {
            tag: __props.tag,
            class: props.class,
            body: body.value,
            data: (_a2 = unref(data)) == null ? void 0 : _a2.data
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingSection",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: void 0
    },
    headline: {
      type: String,
      default: void 0
    },
    title: {
      type: String,
      default: void 0
    },
    description: {
      type: String,
      default: void 0
    },
    features: {
      type: Array,
      default: () => []
    },
    links: {
      type: Array,
      default: () => []
    },
    slot: {
      type: String,
      default: void 0
    },
    align: {
      type: String,
      default: "center"
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
    const appConfig = useAppConfig();
    const props = __props;
    const config2 = computed(() => {
      const container = twJoin(
        "gap-16 sm:gap-y-24",
        props.align === "center" ? "flex flex-col" : "grid lg:grid-cols-2 lg:items-center"
      );
      const base = twJoin(
        "",
        props.align === "center" && "text-center flex flex-col items-center",
        props.align === "right" && "lg:order-last"
      );
      return {
        wrapper: "py-24 sm:py-32",
        container,
        base,
        icon: {
          wrapper: "flex mb-6",
          base: "w-10 h-10 flex-shrink-0 text-primary"
        },
        headline: "mb-2 text-base/7 font-semibold text-primary",
        title: "text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl",
        description: "mt-6 text-lg/8 text-gray-600 dark:text-gray-300",
        links: "mt-8 flex flex-wrap gap-x-3 gap-y-1.5",
        features: {
          wrapper: {
            base: "mt-6 leading-7",
            list: "space-y-4",
            grid: "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
          },
          base: "relative pl-8",
          name: "font-semibold text-gray-900 dark:text-white",
          description: "text-gray-500 dark:text-gray-400 leading-6",
          icon: {
            base: "absolute left-0 top-1 h-5 w-5 text-primary",
            name: appConfig.ui.icons.check
          }
        }
      };
    });
    const { ui, attrs } = useUI("landing.section", toRef(props, "ui"), config2, toRef(props, "class"), true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0$8;
      const _component_UIcon = __nuxt_component_1$1;
      const _component_UButton = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(ui).wrapper
      }, unref(attrs), _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_UContainer, {
        class: unref(ui).container
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            if (__props.icon || _ctx.$slots.icon || (__props.headline || _ctx.$slots.headline) || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description) || (((_a = __props.links) == null ? void 0 : _a.length) || _ctx.$slots.links)) {
              _push2(`<div class="${ssrRenderClass(unref(ui).base)}"${_scopeId}>`);
              if (__props.icon || _ctx.$slots.icon) {
                _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: __props.icon,
                    class: unref(ui).icon.base
                  }, null, _parent2, _scopeId));
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else if (__props.headline || _ctx.$slots.headline) {
                _push2(`<div class="${ssrRenderClass(unref(ui).headline)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
                  _push2(`${ssrInterpolate(__props.headline)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.title || _ctx.$slots.title) {
                _push2(`<h2 class="${ssrRenderClass(unref(ui).title)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                  _push2(`${ssrInterpolate(__props.title)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</h2>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || _ctx.$slots.description) {
                _push2(`<p class="${ssrRenderClass(unref(ui).description)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.align !== "center" && ((_b = __props.features) == null ? void 0 : _b.length)) {
                _push2(`<dl class="${ssrRenderClass([unref(ui).features.wrapper.base, unref(ui).features.wrapper.list])}"${_scopeId}><!--[-->`);
                ssrRenderList(__props.features, (feature) => {
                  _push2(`<div class="${ssrRenderClass(unref(ui).features.base)}"${_scopeId}><dt class="${ssrRenderClass(unref(ui).features.name)}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: feature.icon || unref(ui).features.icon.name,
                    class: unref(ui).features.icon.base,
                    "aria-hidden": "true"
                  }, null, _parent2, _scopeId));
                  if (feature.name) {
                    _push2(`<span${_scopeId}>${ssrInterpolate(feature.name)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</dt>`);
                  if (feature.description) {
                    _push2(`<dd class="${ssrRenderClass(unref(ui).features.description)}"${_scopeId}>${ssrInterpolate(feature.description)}</dd>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></dl>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.align !== "center" && (((_c = __props.links) == null ? void 0 : _c.length) || _ctx.$slots.links)) {
                _push2(`<div class="${ssrRenderClass(unref(ui).links)}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.links, (link2, index) => {
                    _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link2, {
                      onClick: link2.click
                    }), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$slots[__props.slot || "default"]) {
              ssrRenderSlot(_ctx.$slots, __props.slot || "default", {}, null, _push2, _parent2, _scopeId);
            } else if (__props.align === "right") {
              _push2(`<div${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.align === "center" && ((_d = __props.features) == null ? void 0 : _d.length)) {
              _push2(`<dl class="${ssrRenderClass([unref(ui).features.wrapper.base, unref(ui).features.wrapper.grid])}"${_scopeId}><!--[-->`);
              ssrRenderList(__props.features, (feature) => {
                _push2(`<div class="${ssrRenderClass(unref(ui).features.base)}"${_scopeId}><dt class="${ssrRenderClass(unref(ui).features.name)}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: feature.icon || unref(ui).features.icon.name,
                  class: unref(ui).features.icon.base,
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
                if (feature.name) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(feature.name)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</dt>`);
                if (feature.description) {
                  _push2(`<dd class="${ssrRenderClass(unref(ui).features.description)}"${_scopeId}>${ssrInterpolate(feature.description)}</dd>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></dl>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.align === "center" && (((_e = __props.links) == null ? void 0 : _e.length) || _ctx.$slots.links)) {
              _push2(`<div class="${ssrRenderClass(unref(twMerge)(unref(ui).links, "mt-0 justify-center"))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.links, (link2, index) => {
                  _push2(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, link2, {
                    onClick: link2.click
                  }), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.icon || _ctx.$slots.icon || (__props.headline || _ctx.$slots.headline) || (__props.title || _ctx.$slots.title) || (__props.description || _ctx.$slots.description) || (((_f = __props.links) == null ? void 0 : _f.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                key: 0,
                class: unref(ui).base
              }, [
                __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: unref(ui).icon.wrapper
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(_component_UIcon, {
                      name: __props.icon,
                      class: unref(ui).icon.base
                    }, null, 8, ["name", "class"])
                  ])
                ], 2)) : __props.headline || _ctx.$slots.headline ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: unref(ui).headline
                }, [
                  renderSlot(_ctx.$slots, "headline", {}, () => [
                    createTextVNode(toDisplayString(__props.headline), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.title || _ctx.$slots.title ? (openBlock(), createBlock("h2", {
                  key: 2,
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.align !== "center" && ((_g = __props.features) == null ? void 0 : _g.length) ? (openBlock(), createBlock("dl", {
                  key: 4,
                  class: [unref(ui).features.wrapper.base, unref(ui).features.wrapper.list]
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (feature) => {
                    return openBlock(), createBlock("div", {
                      key: feature.name,
                      class: unref(ui).features.base
                    }, [
                      createVNode("dt", {
                        class: unref(ui).features.name
                      }, [
                        createVNode(_component_UIcon, {
                          name: feature.icon || unref(ui).features.icon.name,
                          class: unref(ui).features.icon.base,
                          "aria-hidden": "true"
                        }, null, 8, ["name", "class"]),
                        feature.name ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(feature.name), 1)) : createCommentVNode("", true)
                      ], 2),
                      feature.description ? (openBlock(), createBlock("dd", {
                        key: 0,
                        class: unref(ui).features.description
                      }, toDisplayString(feature.description), 3)) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ], 2)) : createCommentVNode("", true),
                __props.align !== "center" && (((_h = __props.links) == null ? void 0 : _h.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: unref(ui).links
                }, [
                  renderSlot(_ctx.$slots, "links", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link2, index) => {
                      return openBlock(), createBlock(_component_UButton, mergeProps({ key: index }, link2, {
                        onClick: link2.click
                      }), null, 16, ["onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true),
              _ctx.$slots[__props.slot || "default"] ? renderSlot(_ctx.$slots, __props.slot || "default", { key: 1 }) : __props.align === "right" ? (openBlock(), createBlock("div", { key: 2 })) : createCommentVNode("", true),
              __props.align === "center" && ((_i = __props.features) == null ? void 0 : _i.length) ? (openBlock(), createBlock("dl", {
                key: 3,
                class: [unref(ui).features.wrapper.base, unref(ui).features.wrapper.grid]
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.features, (feature) => {
                  return openBlock(), createBlock("div", {
                    key: feature.name,
                    class: unref(ui).features.base
                  }, [
                    createVNode("dt", {
                      class: unref(ui).features.name
                    }, [
                      createVNode(_component_UIcon, {
                        name: feature.icon || unref(ui).features.icon.name,
                        class: unref(ui).features.icon.base,
                        "aria-hidden": "true"
                      }, null, 8, ["name", "class"]),
                      feature.name ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(feature.name), 1)) : createCommentVNode("", true)
                    ], 2),
                    feature.description ? (openBlock(), createBlock("dd", {
                      key: 0,
                      class: unref(ui).features.description
                    }, toDisplayString(feature.description), 3)) : createCommentVNode("", true)
                  ], 2);
                }), 128))
              ], 2)) : createCommentVNode("", true),
              __props.align === "center" && (((_j = __props.links) == null ? void 0 : _j.length) || _ctx.$slots.links) ? (openBlock(), createBlock("div", {
                key: 4,
                class: unref(twMerge)(unref(ui).links, "mt-0 justify-center")
              }, [
                renderSlot(_ctx.$slots, "links", {}, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link2, index) => {
                    return openBlock(), createBlock(_component_UButton, mergeProps({ key: index }, link2, {
                      onClick: link2.click
                    }), null, 16, ["onClick"]);
                  }), 128))
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "PageGrid",
  __ssrInlineRender: true,
  props: {
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
    const config2 = {
      wrapper: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
    };
    const props = __props;
    const { ui, attrs } = useUI("page.grid", toRef(props, "ui"), config2, toRef(props, "class"), true);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/page/PageGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useSharedMouse = createSharedComposable(useMouse);
function useSharedMouseInElement(target, options = {}) {
  const { x, y } = useSharedMouse(options);
  const targetRef = ref(target != null ? target : void 0);
  const elementX = ref(0);
  const elementY = ref(0);
  if (defaultWindow) {
    watchThrottled(
      [targetRef, x, y],
      () => {
        const el = unrefElement(targetRef);
        if (!el) {
          return;
        }
        const { left, top } = el.getBoundingClientRect();
        const eX = x.value - (left + defaultWindow.scrollX);
        const eY = y.value - (top + defaultWindow.scrollY);
        if (Math.abs(eX) > 1500 || Math.abs(eY) > 1500 || defaultWindow.screen.width <= 800) {
          return;
        }
        elementX.value = eX;
        elementY.value = eY;
      },
      { immediate: true, throttle: 50 }
    );
  }
  return {
    x,
    y,
    elementX,
    elementY
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "LandingCard",
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
    icon: {
      type: String,
      default: void 0
    },
    color: {
      type: String,
      default: "primary"
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
    const props = __props;
    const colorLight = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config$9[props.color]) == null ? void 0 : _a["500"]) || config$9[props.color] || props.color;
    });
    const colorDark = computed(() => {
      var _a;
      if (props.color === "primary") {
        return "rgb(var(--color-primary-DEFAULT))";
      }
      return ((_a = config$9[props.color]) == null ? void 0 : _a["400"]) || config$9[props.color] || props.color;
    });
    const config$1 = computed(() => {
      const base = twJoin(
        "gap-x-8 gap-y-4 rounded-xl flex-1",
        props.orientation === "vertical" && "flex flex-col",
        !!slots.default && props.orientation === "horizontal" && "grid lg:grid-cols-2 lg:items-center"
      );
      return {
        wrapper: "relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow",
        to: "hover:ring-primary-500 dark:hover:ring-primary-400 transition-shadow duration-200",
        base: "flex-1 flex flex-col overflow-hidden",
        container: "",
        body: {
          base
        },
        background: "bg-white dark:bg-gray-900 hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-[background-opacity]",
        ring: "",
        rounded: "rounded-xl",
        shadow: "",
        icon: {
          wrapper: "mb-2 pointer-events-none",
          base: "w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
        },
        title: "text-gray-900 dark:text-white text-base font-bold truncate",
        description: "text-[15px] text-gray-500 dark:text-gray-400 mt-1"
      };
    });
    const el = ref();
    const slots = useSlots();
    const { elementX, elementY } = useSharedMouseInElement(el);
    const { ui, attrs } = useUI("landing.card", toRef(props, "ui"), config$1, toRef(props, "class"), true);
    const nuxtLinkBind = computed(() => getNuxtLinkProps(props));
    const ariaLabel = computed(() => (props.title || slots.title && getSlotChildrenText(slots.title()) || "Card link").trim());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$7;
      const _component_UIcon = __nuxt_component_1$1;
      const _cssVars = { style: {
        "--fb9dae28": unref(colorLight),
        "--674828e0": unref(colorDark)
      } };
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        style: {
          "--x": `${unref(elementX)}px`,
          "--y": `${unref(elementY)}px`
        },
        class: [unref(ui).wrapper, _ctx.to && unref(ui).to]
      }, unref(attrs), _attrs, _cssVars))} data-v-53db7729>`);
      _push(ssrRenderComponent(_component_UCard, { ui: unref(ui) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(ui).container)}" data-v-53db7729${_scopeId}>`);
            if (_ctx.to) {
              _push2(ssrRenderComponent(_component_NuxtLink, mergeProps({ "aria-label": unref(ariaLabel) }, unref(nuxtLinkBind), {
                class: "focus:outline-none",
                tabindex: "-1"
              }), {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="absolute inset-0" aria-hidden="true" data-v-53db7729${_scopeId2}></span>`);
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
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.icon || _ctx.$slots.icon) {
              _push2(`<div class="${ssrRenderClass(unref(ui).icon.wrapper)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: __props.icon,
                  class: unref(ui).icon.base
                }, null, _parent2, _scopeId));
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.title || _ctx.$slots.title) {
              _push2(`<p class="${ssrRenderClass(unref(ui).title)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || _ctx.$slots.description) {
              _push2(`<p class="${ssrRenderClass(unref(ui).description)}" data-v-53db7729${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "container", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (_ctx.$slots.default) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: unref(ui).container
              }, [
                _ctx.to ? (openBlock(), createBlock(_component_NuxtLink, mergeProps({
                  key: 0,
                  "aria-label": unref(ariaLabel)
                }, unref(nuxtLinkBind), {
                  class: "focus:outline-none",
                  tabindex: "-1"
                }), {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: "absolute inset-0",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 16, ["aria-label"])) : createCommentVNode("", true),
                __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: unref(ui).icon.wrapper
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(_component_UIcon, {
                      name: __props.icon,
                      class: unref(ui).icon.base
                    }, null, 8, ["name", "class"])
                  ], true)
                ], 2)) : createCommentVNode("", true),
                __props.title || _ctx.$slots.title ? (openBlock(), createBlock("p", {
                  key: 2,
                  class: unref(ui).title
                }, [
                  renderSlot(_ctx.$slots, "title", {}, () => [
                    createTextVNode(toDisplayString(__props.title), 1)
                  ], true)
                ], 2)) : createCommentVNode("", true),
                __props.description || _ctx.$slots.description ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: unref(ui).description
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(__props.description), 1)
                  ], true)
                ], 2)) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "container", {}, void 0, true)
              ], 2),
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-pro/components/landing/LandingCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-53db7729"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("index", () => queryContent("/").findOne())), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      titleTemplate: "",
      title: page.value.title,
      ogTitle: page.value.title,
      description: page.value.description,
      ogDescription: page.value.description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULandingHero = _sfc_main$5;
      const _component_UBadge = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$7;
      const _component_UIcon = __nuxt_component_1$1;
      const _component_MDC = _sfc_main$4;
      const _component_ULandingSection = _sfc_main$3;
      const _component_UPageGrid = _sfc_main$2;
      const _component_ULandingCard = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(page).hero) {
        _push(ssrRenderComponent(_component_ULandingHero, unref(page).hero, {
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
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MDC, {
                value: unref(page).hero.title
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_MDC, {
                  value: unref(page).hero.title
                }, null, 8, ["value"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MDC, {
                value: unref(page).hero.code,
                tag: "pre",
                class: "prose prose-primary dark:prose-invert mx-auto"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_MDC, {
                  value: unref(page).hero.code,
                  tag: "pre",
                  class: "prose prose-primary dark:prose-invert mx-auto"
                }, null, 8, ["value"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ULandingSection, {
        title: unref(page).features.title,
        links: unref(page).features.links
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UPageGrid, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(page).features.items, (item, index) => {
                    _push3(ssrRenderComponent(_component_ULandingCard, mergeProps({ key: index }, item), null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index) => {
                      return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index }, item), null, 16);
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
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(page).features.items, (item, index) => {
                    return openBlock(), createBlock(_component_ULandingCard, mergeProps({ key: index }, item), null, 16);
                  }), 128))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BhVKTvOx.mjs.map

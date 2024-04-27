import { withBase } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ufo/dist/index.mjs';
import { renderSSRHead } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/@unhead/ssr/dist/index.mjs';
import { defineEventHandler, getQuery, sendRedirect, createError } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/h3/dist/index.mjs';
import { hash } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ohash/dist/index.mjs';
import twemoji from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/twemoji/dist/twemoji.npm.js';
import { createDefu } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/defu/dist/defu.mjs';
import { f as fetchOptionsCached } from '../../_/utils.mjs';
import { inline } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/css-inline/css_inline.js';
import { u as useRuntimeConfig, b as useNitroOrigin } from '../../runtime.mjs';
import { createHeadCore } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unhead/dist/index.mjs';
import 'node:fs';
import 'node:buffer';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/image-size/dist/index.js';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/index.mjs';
import 'node:url';
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

function nodeFn(html, options) {
  return inline(html, {
    ...options,
    load_remote_stylesheets: false,
    keep_style_tags: false
  });
}
nodeFn.__mock = false;

function loadCSSInline() {
 return nodeFn
}

const html = defineEventHandler(async (e) => {
  const { fonts, satoriOptions } = useRuntimeConfig()["nuxt-og-image"];
  const query = getQuery(e);
  const path = withBase(query.path || "/", useRuntimeConfig().app.baseURL);
  const scale = query.scale;
  const mode = query.mode || "light";
  const nitroOrigin = useNitroOrigin(e);
  let queryOptions;
  if (query.options) {
    try {
      queryOptions = JSON.parse(query.options);
    } catch {
    }
  }
  let options = await fetchOptionsCached(e, path);
  const merger = createDefu((object, key, value) => {
    if (Array.isArray(value))
      return value;
  });
  if (queryOptions)
    options = merger(queryOptions, options);
  if (options.provider === "browser" && options.component === "PageScreenshot") {
    const pathWithoutBase = path.replace(new RegExp(`^${useRuntimeConfig().app.baseURL}`), "");
    return sendRedirect(e, withBase(pathWithoutBase, nitroOrigin));
  }
  if (!options.component) {
    throw createError({
      statusCode: 500,
      statusMessage: `Nuxt OG Image trying to render an invalid component. Received options ${JSON.stringify(options)}`
    });
  }
  const hashId = hash([options.component, options]);
  const island = await $fetch(`/__nuxt_island/${options.component}_${hashId}`, {
    params: {
      props: JSON.stringify(options)
    }
  });
  const head = createHeadCore();
  head.push(island.head);
  let defaultFontFamily = "sans-serif";
  const firstFont = fonts[0];
  if (firstFont)
    defaultFontFamily = firstFont.name;
  let html = island.html;
  try {
    html = twemoji.parse(html, {
      folder: "svg",
      ext: ".svg"
    });
  } catch (e2) {
  }
  const googleFonts = {};
  fonts.filter((font) => !font.path).forEach((font) => {
    if (!googleFonts[font.name])
      googleFonts[font.name] = [];
    googleFonts[font.name].push(font);
  });
  head.push({
    style: [
      {
        // default font is the first font family
        innerHTML: `body { font-family: '${defaultFontFamily.replace("+", " ")}', sans-serif;  }`
      },
      {
        innerHTML: `body {
    transform: scale(${scale || 1});
    transform-origin: top left;
    max-height: 100vh;
    position: relative;
    width: ${options.width}px;
    height: ${options.height}px;
    overflow: hidden;
    background-color: ${mode === "dark" ? "#1b1b1b" : "#fff"};
}
img.emoji {
   height: 1em;
   width: 1em;
   margin: 0 .05em 0 .1em;
   vertical-align: -0.1em;
}`
      },
      ...fonts.filter((font) => font.path).map((font) => {
        return `
          @font-face {
            font-family: '${font.name}';
            font-style: normal;
            font-weight: ${font.weight};
            src: url('${font.path}') format('truetype');
          }
          `;
      })
    ],
    meta: [
      {
        charset: "utf-8"
      }
    ],
    script: [
      {
        src: "https://cdn.tailwindcss.com"
      },
      {
        innerHTML: `tailwind.config = {
  corePlugins: {
    preflight: false,
  },
  theme: ${JSON.stringify(satoriOptions?.tailwindConfig?.theme || {})}
}`
      }
    ],
    link: [
      {
        // reset css to match svg output
        href: "https://cdn.jsdelivr.net/npm/gardevoir",
        rel: "stylesheet"
      },
      // have to add each weight as their own stylesheet
      ...Object.entries(googleFonts).map(([name, fonts2]) => {
        return {
          href: `https://fonts.googleapis.com/css2?family=${name}:wght@${fonts2.map((f) => f.weight).join(";")}&display=swap`,
          rel: "stylesheet"
        };
      })
    ]
  });
  html = html.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  const headChunk = await renderSSRHead(head);
  let htmlTemplate = `<!DOCTYPE html>
<html ${headChunk.htmlAttrs}>
<head>${headChunk.headTags}</head>
<body ${headChunk.bodyAttrs}>${headChunk.bodyTagsOpen}<div style="position: relative; display: flex; margin: 0 auto; width: ${options.width}px; height: ${options.height}px; overflow: hidden;">${html}</div>${headChunk.bodyTags}</body>
</html>`;
  const cssInline = loadCSSInline();
  if (!cssInline.__mock) {
    let hasInlineStyles = false;
    const stylesheets = htmlTemplate.match(/<link rel="stylesheet" href=".*?">/g);
    if (stylesheets) {
      for (const stylesheet of stylesheets) {
        if (!stylesheet.includes(`${options.component.replace("OgImageTemplate", "").replace("OgImage", "")}.vue`)) {
          htmlTemplate = htmlTemplate.replace(stylesheet, "");
        } else {
          const href = stylesheet.match(/href="(.*?)"/)[1];
          try {
            let css = await (await $fetch(href, {
              baseURL: nitroOrigin
            })).text();
            if (css.includes("const __vite__css =")) {
              css = css.match(/const __vite__css = "(.*)"/)[1].replace(/\\n/g, "\n");
            }
            css = css.replace(/\/\*# sourceMappingURL=.*?\*\//g, "").replaceAll("! important", "").replaceAll("!important");
            htmlTemplate = htmlTemplate.replace(stylesheet, `<style>${css}</style>`);
            hasInlineStyles = true;
          } catch {
          }
        }
      }
    }
    if (hasInlineStyles) {
      try {
        htmlTemplate = await cssInline(htmlTemplate, {
          url: nitroOrigin
        });
      } catch {
      }
    }
  }
  return htmlTemplate;
});

export { html as default };
//# sourceMappingURL=html.mjs.map

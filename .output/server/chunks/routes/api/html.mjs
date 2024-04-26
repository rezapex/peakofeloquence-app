import { o as defineEventHandler, f as useRuntimeConfig, h as getQuery, z as withBase, v as useNitroOrigin, q as sendRedirect, i as createError, l as hash, A as createDefu } from '../../runtime.mjs';
import { renderSSRHead } from '@unhead/ssr';
import twemoji from 'twemoji';
import { f as fetchOptionsCached } from '../../_/utils.mjs';
import { inline } from 'css-inline';
import { createHeadCore } from 'unhead';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
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
import 'node:buffer';
import 'image-size';

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

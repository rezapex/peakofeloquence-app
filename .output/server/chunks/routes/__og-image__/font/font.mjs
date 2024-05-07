import { o as defineEventHandler, p as parseURL, q as useOgImageRuntimeConfig, h as getQuery, i as createError, t as proxyRequest, v as sendRedirect } from '../../../runtime.mjs';
import { n as normaliseFontInput } from '../../../_/pure.mjs';
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

const font = defineEventHandler(async (e) => {
  const path = parseURL(e.path).pathname;
  const [_name, _weight] = path.split("/font/")[1].split(".")[0].split("/");
  if (!_name || !_weight)
    return "Provide a font name and weight";
  const name = _name[0].toUpperCase() + _name.slice(1);
  const weight = Math.round(Number.parseInt(_weight) / 100) * 100;
  const config = useOgImageRuntimeConfig();
  const normalisedFonts = normaliseFontInput(config.fonts);
  let font;
  if (typeof getQuery(e).font === "string")
    font = JSON.parse(getQuery(e).font);
  if (!font) {
    font = normalisedFonts.find((font2) => {
      return font2.name.toLowerCase() === name.toLowerCase() && weight === Number(font2.weight);
    });
  }
  if (!font) {
    return createError({
      statusCode: 404,
      statusMessage: `[Nuxt OG Image] Font ${name}:${weight} not found`
    });
  }
  const css = await globalThis.$fetch(`https://fonts.googleapis.com/css2?family=${name}:wght@${weight}`, {
    headers: {
      // Make sure it returns TTF.
      "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    }
  });
  if (!css) {
    return createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Invalid Google Font ${name}:${weight}`
    });
  }
  const ttfResource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (ttfResource?.[1])
    return proxyRequest(e, ttfResource[1], {});
  const woff2Resource = css.match(/src: url\((.+)\) format\('woff2'\)/);
  if (woff2Resource?.[1])
    return sendRedirect(e, woff2Resource[1]);
  return createError({
    statusCode: 500,
    statusMessage: `[Nuxt OG Image] Malformed Google Font CSS ${css}`
  });
});

export { font as default };
//# sourceMappingURL=font.mjs.map

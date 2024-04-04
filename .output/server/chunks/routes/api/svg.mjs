import { o as defineEventHandler, h as getQuery, y as withBase, f as useRuntimeConfig, x as setHeader, i as createError } from '../../runtime.mjs';
import { f as fetchOptionsCached } from '../../_/utils.mjs';
import { u as useProvider } from '../../virtual/provider.mjs';
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
import 'node:buffer';
import 'image-size';
import 'satori-html';
import '../../_/utils-pure.mjs';
import '@resvg/resvg-js';
import 'satori';

const svg = defineEventHandler(async (e) => {
  const query = getQuery(e);
  const path = withBase(query.path || "/", useRuntimeConfig().app.baseURL);
  const options = await fetchOptionsCached(e, path);
  setHeader(e, "Content-Type", "image/svg+xml");
  const provider = await useProvider(options.provider);
  if (!provider) {
    throw createError({
      statusCode: 500,
      statusMessage: `Provider ${options.provider} is missing.`
    });
  }
  return provider.createSvg(options);
});

export { svg as default };
//# sourceMappingURL=svg.mjs.map

import { Buffer } from 'node:buffer';
import { defineEventHandler, createError, setHeader } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/h3/dist/index.mjs';
import { parseURL, withoutTrailingSlash, withoutLeadingSlash } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ufo/dist/index.mjs';
import { hash } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ohash/dist/index.mjs';
import { f as fetchOptionsCached } from './utils.mjs';
import { u as useRuntimeConfig, a as useNitroCache } from '../runtime.mjs';
import { u as useProvider } from '../virtual/provider.mjs';
import 'node:fs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/image-size/dist/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/shiki/dist/core.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@shikijs/transformers/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unified/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-character/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/slugify/slugify.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-parse/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-rehype/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hast-util-to-string/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/github-slugger/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/detab/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-emoji/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/remark-gfm/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-external-links/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/rehype-raw/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/satori-html/dist/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/@resvg/resvg-js/index.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/satori/dist/index.js';

const og_png = defineEventHandler(async (e) => {
  useRuntimeConfig()["nuxt-og-image"];
  const path = parseURL(e.path).pathname;
  if (!path.endsWith("__og_image__/og.png"))
    return;
  const basePath = withoutTrailingSlash(
    path.replace("__og_image__/og.png", "")
  );
  const options = await fetchOptionsCached(e, basePath);
  const provider = await useProvider(options.provider);
  if (!provider) {
    throw createError({
      statusCode: 500,
      statusMessage: `Provider ${options.provider} is missing.`
    });
  }
  const key = [
    withoutLeadingSlash(options.path === "/" || !options.path ? "index" : options.path).replaceAll("/", "-"),
    `og-${hash(options)}`
  ].join(":");
  const { enabled: cacheEnabled, cachedItem, update } = await useNitroCache(e, "nuxt-og-image", {
    key,
    cacheTtl: options.cacheTtl || 0,
    cache: options.cache,
    headers: true
  });
  let png;
  if (cachedItem)
    png = Buffer.from(cachedItem, "base64");
  if (!png) {
    try {
      png = await provider.createPng(options);
      if (png) {
        const base64png = Buffer.from(png).toString("base64");
        await update(base64png);
      }
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create og image: ${err.message}`
      });
    }
  }
  if (png) {
    if (cacheEnabled && options.cacheTtl) {
      setHeader(e, "Cache-Control", `public, max-age=${Math.round(options.cacheTtl / 1e3)}`);
    } else {
      setHeader(e, "Cache-Control", "no-cache, no-store, must-revalidate");
      setHeader(e, "Pragma", "no-cache");
      setHeader(e, "Expires", "0");
    }
    setHeader(e, "Content-Type", "image/png");
    return png;
  }
  throw createError({
    statusCode: 500,
    statusMessage: "Failed to create og image, unknown error."
  });
});

export { og_png as default };
//# sourceMappingURL=og.png.mjs.map

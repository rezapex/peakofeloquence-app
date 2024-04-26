import { Buffer } from 'node:buffer';
import { o as defineEventHandler, f as useRuntimeConfig, p as parseURL, w as withoutTrailingSlash, q as sendRedirect, t as joinURL, v as useNitroOrigin, i as createError, x as withoutLeadingSlash, l as hash, y as setHeader } from '../runtime.mjs';
import { f as fetchOptionsCached, u as useNitroCache } from './utils.mjs';
import { u as useProvider } from '../virtual/provider.mjs';
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
import 'image-size';
import 'satori-html';
import './utils-pure.mjs';
import '@resvg/resvg-js';
import 'satori';

const og_png = defineEventHandler(async (e) => {
  const { runtimeBrowser } = useRuntimeConfig()["nuxt-og-image"];
  const path = parseURL(e.path).pathname;
  if (!path.endsWith("__og_image__/og.png"))
    return;
  const basePath = withoutTrailingSlash(
    path.replace("__og_image__/og.png", "")
  );
  const options = await fetchOptionsCached(e, basePath);
  if (!runtimeBrowser && options.provider === "browser")
    return sendRedirect(e, joinURL(useNitroOrigin(e), "__nuxt_og_image__/browser-provider-not-supported.png"));
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

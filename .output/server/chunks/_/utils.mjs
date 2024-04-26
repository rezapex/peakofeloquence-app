import { existsSync, promises } from 'node:fs';
import { Buffer } from 'node:buffer';
import { f as useRuntimeConfig, D as prefixStorage, C as useStorage, h as getQuery, y as setHeader, x as withoutLeadingSlash, E as defu, v as useNitroOrigin, F as join } from '../runtime.mjs';
import sizeOf from 'image-size';

async function useNitroCache(e, module, options) {
  const { runtimeCacheStorage, version } = useRuntimeConfig()[module];
  const enabled = options.cache && runtimeCacheStorage && options.cacheTtl && options.cacheTtl > 0;
  const baseCacheKey = runtimeCacheStorage === "default" ? `/cache/${module}@${version}` : `/${module}@${version}`;
  const cache = prefixStorage(useStorage(), `${baseCacheKey}/`);
  const key = options.key;
  let xCacheHeader = "DISABLED";
  let xCacheExpires = 0;
  const newExpires = Date.now() + (options.cacheTtl || 0);
  const purge = typeof getQuery(e).purge !== "undefined";
  let cachedItem = false;
  if (!options.skipRestore && enabled && await cache.hasItem(key).catch(() => false)) {
    const { value, expiresAt } = await cache.getItem(key).catch(() => ({ value: null, expiresAt: Date.now() }));
    if (purge) {
      xCacheHeader = "PURGE";
      xCacheExpires = newExpires;
      await cache.removeItem(key).catch(() => {
      });
    } else if (expiresAt > Date.now()) {
      xCacheHeader = "HIT";
      xCacheExpires = newExpires;
      cachedItem = value;
    } else {
      xCacheHeader = "MISS";
      xCacheExpires = expiresAt;
      await cache.removeItem(key).catch(() => {
      });
    }
  }
  if (options.headers) {
    setHeader(e, `x-${module}-cache`, xCacheHeader);
    setHeader(e, `x-${module}-expires`, xCacheExpires.toString());
  }
  return {
    enabled,
    cachedItem,
    async update(item) {
      enabled && await cache.setItem(key, { value: item, expiresAt: Date.now() + (options.cacheTtl || 0) });
    }
  };
}

async function fetchOptionsCached(e, path) {
  const key = [
    withoutLeadingSlash(path === "/" || !path ? "index" : path).replaceAll("/", "-"),
    "options"
  ].join(":");
  const { cachedItem, update } = await useNitroCache(e, "nuxt-og-image", {
    key,
    // allow internal requests to be cached for 5 seconds
    cacheTtl: 5 * 1e3,
    cache: !false,
    headers: false
  });
  if (cachedItem)
    return cachedItem;
  const options = await fetchOptions(e, path);
  await update(options);
  return options;
}
async function fetchOptions(e, path) {
  const options = await globalThis.$fetch("/api/og-image-options", {
    query: {
      path
    },
    responseType: "json"
  });
  return defu(
    { requestOrigin: useNitroOrigin(e) },
    options,
    // use query data
    getQuery(e)
  );
}
function base64ToArrayBuffer(base64) {
  const buffer = Buffer.from(base64, "base64");
  return new Uint8Array(buffer).buffer;
}
function r(base, key) {
  return join(base, key.replace(/:/g, "/"));
}
async function readPublicAsset(file, encoding) {
  const { assetDirs } = useRuntimeConfig()["nuxt-og-image"];
  for (const assetDir of assetDirs) {
    const path = r(assetDir, file);
    if (existsSync(path))
      return await promises.readFile(path, { encoding });
  }
}
async function readPublicAssetBase64(file) {
  const base64 = await readPublicAsset(file, "base64");
  if (base64) {
    const dimensions = await sizeOf(Buffer.from(base64, "base64"));
    return {
      src: toBase64Image(file, base64),
      ...dimensions
    };
  }
}
function toBase64Image(fileName, data) {
  const base64 = typeof data === "string" ? data : Buffer.from(data).toString("base64");
  let type = "image/jpeg";
  const ext = fileName.split(".").pop();
  if (ext === "svg")
    type = "image/svg+xml";
  else if (ext === "png")
    type = "image/png";
  return `data:${type};base64,${base64}`;
}

export { readPublicAssetBase64 as a, base64ToArrayBuffer as b, fetchOptionsCached as f, readPublicAsset as r, toBase64Image as t, useNitroCache as u };
//# sourceMappingURL=utils.mjs.map

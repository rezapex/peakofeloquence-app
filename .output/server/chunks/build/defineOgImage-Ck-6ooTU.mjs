import { U as useRouter, B as useRuntimeConfig, a1 as useServerHead, a0 as resolveSitePath, A as useRequestEvent } from './server.mjs';
import { computed, unref } from 'vue';
import { E as defu, t as joinURL, a2 as getRequestHost, a3 as getRequestProtocol } from '../runtime.mjs';
import { u as useSiteConfig } from './useSiteConfig-CRotISqA.mjs';

function useNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    const cert = process.env.NITRO_SSL_CERT;
    const key = process.env.NITRO_SSL_KEY;
    let host = process.env.NITRO_HOST || process.env.HOST || false;
    let port;
    let protocol = cert && key || true ? "https" : "http";
    if (!e) ; else {
      host = getRequestHost(e, { xForwardedHost: true }) || host;
      protocol = getRequestProtocol(e, { xForwardedProto: true }) || protocol;
    }
    if (typeof host === "string" && host.includes(":")) {
      port = host.split(":").pop();
      host = host.split(":")[0];
    }
    port = port ? `:${port}` : "";
    return `${protocol}://${host}${port}/`;
  }
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = useRuntimeConfig().app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
const componentNames = [{ "hash": "xN09LzlvZ8", "pascalName": "OgImageSaas", "kebabName": "og-image-saas" }, { "hash": "eInRfPPznm", "pascalName": "OgImageTemplateFallback", "kebabName": "og-image-template-fallback" }];
function normaliseOgImageOptions(_options) {
  const options = { ...unref(_options) };
  if (options.static)
    options.cache = options.cache || options.static;
  if (!options.provider)
    options.provider = "satori";
  const { runtimeSatori } = useRuntimeConfig()["nuxt-og-image"];
  if (options.provider === "satori" && !runtimeSatori)
    options.provider = "browser";
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        options.componentHash = component.hash;
        break;
      }
    }
  }
  return options;
}
function defineOgImageScreenshot(options = {}) {
  var _a;
  const router = useRouter();
  const route = ((_a = router.currentRoute.value) == null ? void 0 : _a.path) || "";
  return defineOgImage({
    alt: `Web page screenshot${route ? ` of ${route}` : ""}.`,
    provider: "browser",
    component: "PageScreenshot",
    // this is an alias
    cache: true,
    ...options
  });
}
function defineOgImageCached(options = {}) {
  const { defaults } = useRuntimeConfig()["nuxt-og-image"];
  if (!defaults.cacheTtl && !options.cacheTtl)
    options.cacheTtl = 60 * 60 * 24 * 1e3 * 7;
  return defineOgImage({
    cache: true,
    ...options
  });
}
function defineOgImageWithoutCache(options = {}) {
  return defineOgImage({
    ...options,
    cache: false,
    cacheTtl: 0
  });
}
async function defineOgImage(_options = {}) {
  var _a;
  {
    if (_options.url) {
      const type = _options.url.endsWith(".png") ? "image/png" : "image/jpeg";
      const meta2 = [
        { property: "og:image", content: _options.url },
        { property: "og:image:type", content: type },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image:src", content: _options.url }
      ];
      if (_options.width) {
        meta2.push({ property: "og:image:width", content: _options.width });
        meta2.push({ name: "twitter:image:width", content: _options.width });
      }
      if (_options.height) {
        meta2.push({ property: "og:image:height", content: _options.height });
        meta2.push({ name: "twitter:image:height", content: _options.height });
      }
      if (_options.alt) {
        meta2.push({ property: "og:image:alt", content: _options.alt });
        meta2.push({ name: "twitter:image:alt", content: _options.alt });
      }
      useServerHead({ meta: meta2 }, {
        // after async scripts when capo.js is enabled
        tagPriority: 35
      });
      return;
    }
    const { defaults } = useRuntimeConfig()["nuxt-og-image"];
    const options = normaliseOgImageOptions(_options);
    const optionsWithDefault = defu(options, defaults);
    const src = withSiteUrl(joinURL(((_a = useRouter().currentRoute.value) == null ? void 0 : _a.path) || "", "/__og_image__/og.png"));
    const meta = [
      { property: "og:image", content: src },
      { property: "og:image:width", content: optionsWithDefault.width },
      { property: "og:image:height", content: optionsWithDefault.height },
      { property: "og:image:type", content: "image/png" }
    ];
    if (options.alt)
      meta.push({ property: "og:image:alt", content: optionsWithDefault.alt });
    meta.push(...[
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image:src", content: src },
      { name: "twitter:image:width", content: optionsWithDefault.width },
      { name: "twitter:image:height", content: optionsWithDefault.height }
    ]);
    if (options.alt)
      meta.push({ name: "twitter:image:alt", content: optionsWithDefault.alt });
    useServerHead({
      meta,
      script: [
        {
          id: "nuxt-og-image-options",
          type: "application/json",
          processTemplateParams: true,
          innerHTML: () => {
            const payload = {
              title: "%s"
            };
            Object.entries(options).forEach(([key, val]) => {
              payload[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = val;
            });
            return payload;
          },
          // we want this to be last in our head
          tagPosition: "bodyClose"
        }
      ]
    }, {
      // after async scripts when capo.js is enabled
      tagPriority: 35
    });
  }
}

export { defineOgImageCached as a, defineOgImageWithoutCache as b, defineOgImageScreenshot as c, defineOgImage as d };
//# sourceMappingURL=defineOgImage-Ck-6ooTU.mjs.map

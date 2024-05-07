import { C as useRuntimeConfig, u as useRoute, W as normaliseOptions, X as useOgImageRuntimeConfig, Y as separateProps, Z as createOgImageMeta, $ as getOgImagePath, B as useRequestEvent, D as useNuxtApp } from "../server.mjs";
import { defu } from "defu";
import { appendHeader } from "h3";
import { toRouteMatcher, createRouter } from "radix3";
import { withoutTrailingSlash, withoutBase } from "ufo";
function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries((nitro == null ? void 0 : nitro.routeRules) || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu({}, ..._routeRulesMatcher.matchAll(
      // radix3 does not support trailing slashes
      withoutBase(withoutTrailingSlash(withoutQuery(path)), app.baseURL)
    ).reverse());
  };
}
function defineOgImage(_options = {}) {
  var _a, _b, _c;
  const nuxtApp = useNuxtApp();
  const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
  const route = useRoute();
  const basePath = route.path || "/";
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const routeRules = routeRuleMatcher(basePath).ogImage;
  if (!_options || ((_c = (_b = (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event.context._nitro) == null ? void 0 : _b.routeRules) == null ? void 0 : _c.ogImage) === false || typeof routeRules !== "undefined" && routeRules === false) {
    ogImageInstances.forEach((e) => {
      e.dispose();
    });
    nuxtApp.ssrContext._ogImageInstances = void 0;
    return;
  }
  const options = normaliseOptions({
    ..._options
  });
  if (route.query)
    options._query = route.query;
  const { defaults } = useOgImageRuntimeConfig();
  const resolvedOptions = normaliseOptions(defu(separateProps(_options), separateProps(routeRules), defaults));
  if (_options.url) {
    createOgImageMeta(null, options, resolvedOptions, nuxtApp.ssrContext);
  } else {
    const path = getOgImagePath(basePath, resolvedOptions);
    if (import.meta.prerender)
      appendHeader(useRequestEvent(), "x-nitro-prerender", path);
    createOgImageMeta(path, options, resolvedOptions, nuxtApp.ssrContext);
  }
}
export {
  defineOgImage as d
};
//# sourceMappingURL=defineOgImage-CUX459Xc.js.map

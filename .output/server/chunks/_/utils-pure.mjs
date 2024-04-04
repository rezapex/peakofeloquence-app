import { D as defu } from '../runtime.mjs';

function decodeHtml(html) {
  return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&cent;/g, "\xA2").replace(/&pound;/g, "\xA3").replace(/&yen;/g, "\xA5").replace(/&euro;/g, "\u20AC").replace(/&copy;/g, "\xA9").replace(/&reg;/g, "\xAE").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/&#([0-9]+);/g, (full, int) => {
    return String.fromCharCode(Number.parseInt(int));
  });
}
function decodeObjectHtmlEntities(obj) {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string")
      obj[key] = decodeHtml(value);
  });
  return obj;
}
function extractAndNormaliseOgImageOptions(path, html, routeRules, defaults) {
  const htmlPayload = html.match(/<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/)?.[1];
  if (!htmlPayload)
    return false;
  let options;
  try {
    const payload = JSON.parse(htmlPayload);
    Object.entries(payload).forEach(([key, value]) => {
      if (!value)
        delete payload[key];
    });
    options = defu(payload, routeRules);
  } catch (e) {
    options = routeRules;
  }
  if (!options)
    return false;
  if (!options.description) {
    const description = html.match(/<meta property="og:description" content="(.*?)">/)?.[1];
    if (description)
      options.description = description;
    else
      options.description = html.match(/<meta name="description" content="(.*?)">/)?.[1];
  }
  const decoded = decodeObjectHtmlEntities(options);
  return defu(
    decoded,
    // runtime options
    { path },
    defaults
  );
}

export { decodeHtml as d, extractAndNormaliseOgImageOptions as e };
//# sourceMappingURL=utils-pure.mjs.map

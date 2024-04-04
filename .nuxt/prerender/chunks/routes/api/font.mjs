import { getQuery } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/h3/dist/index.mjs';
import { f as cachedEventHandler } from '../../runtime.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/rezajafar/peakofeloquence-site/node_modules/pathe/dist/index.mjs';
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

const font = cachedEventHandler(async (e) => {
  const { name, weight } = getQuery(e);
  if (!name || !weight)
    return "Provide a font name and weight";
  const css = await await globalThis.$fetch(`https://fonts.googleapis.com/css2?family=${name}:wght@${weight}`, {
    headers: {
      // Make sure it returns TTF.
      "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    }
  });
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource)
    return;
  return resource[1];
}, {
  getKey: (e) => {
    const query = getQuery(e);
    return `nuxt-og-image:font-url:${query.name}:${query.weight}`;
  }
});

export { font as default };
//# sourceMappingURL=font.mjs.map

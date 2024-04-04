import { toValue } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';
import { F as useRequestEvent } from './server.mjs';

function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(options);
  Object.entries(stack).forEach(([k, v]) => {
    stack[k] = toValue(v);
  });
  return stack;
}

export { useSiteConfig as u };
//# sourceMappingURL=useSiteConfig-KML5ykE2.mjs.map

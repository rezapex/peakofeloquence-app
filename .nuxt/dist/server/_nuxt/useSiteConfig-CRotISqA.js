import { toValue } from "vue";
import "hookable";
import { A as useRequestEvent } from "../server.mjs";
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(options);
  Object.entries(stack).forEach(([k, v]) => {
    stack[k] = toValue(v);
  });
  return stack;
}
export {
  useSiteConfig as u
};
//# sourceMappingURL=useSiteConfig-CRotISqA.js.map

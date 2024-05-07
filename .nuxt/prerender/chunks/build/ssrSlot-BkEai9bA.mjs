import { f as flatUnwrap } from './MDCSlot-9evsqLEJ.mjs';
import { ssrRenderSlot as ssrRenderSlot$1 } from 'file:///Users/rezajafar/peakofeloquence-app/node_modules/vue/server-renderer/index.mjs';

const ssrRenderSlot = (slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId) => {
  if (slots[name]) {
    return ssrRenderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props == null ? void 0 : props.unwrap) }, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
  }
  return ssrRenderSlot$1(slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
};

export { ssrRenderSlot as s };
//# sourceMappingURL=ssrSlot-BkEai9bA.mjs.map

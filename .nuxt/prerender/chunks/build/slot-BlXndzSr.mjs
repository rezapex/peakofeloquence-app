import { f as flatUnwrap } from './node-B5VQLu6X.mjs';
import { renderSlot as renderSlot$1 } from 'file:///Users/rezajafar/peakofeloquence-site/node_modules/vue/index.mjs';

const renderSlot = (slots, name, props, ...rest) => {
  if (slots[name]) {
    return renderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props == null ? void 0 : props.unwrap) }, name, props, ...rest);
  }
  return renderSlot$1(slots, name, props, ...rest);
};

export { renderSlot as r };
//# sourceMappingURL=slot-BlXndzSr.mjs.map

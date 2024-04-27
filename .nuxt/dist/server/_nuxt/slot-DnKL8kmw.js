import { f as flatUnwrap } from "./MDCSlot-9evsqLEJ.js";
import { renderSlot as renderSlot$1 } from "vue";
const renderSlot = (slots, name, props, ...rest) => {
  if (slots[name]) {
    return renderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props == null ? void 0 : props.unwrap) }, name, props, ...rest);
  }
  return renderSlot$1(slots, name, props, ...rest);
};
export {
  renderSlot as r
};
//# sourceMappingURL=slot-DnKL8kmw.js.map

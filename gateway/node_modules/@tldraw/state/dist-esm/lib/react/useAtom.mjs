import { useState } from "react";
import { atom } from "../core/index.mjs";
function useAtom(name, valueOrInitialiser, options) {
  return useState(() => {
    const initialValue = typeof valueOrInitialiser === "function" ? valueOrInitialiser() : valueOrInitialiser;
    return atom(`useAtom(${name})`, initialValue, options);
  })[0];
}
export {
  useAtom
};
//# sourceMappingURL=useAtom.mjs.map

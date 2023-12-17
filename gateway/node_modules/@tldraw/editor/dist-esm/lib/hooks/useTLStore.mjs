import { useEffect, useRef, useState } from "react";
import { createTLStore } from "../config/createTLStore.mjs";
function useTLStore(opts) {
  const [store, setStore] = useState(() => {
    const store2 = createTLStore(opts);
    if (opts.snapshot) {
      store2.loadSnapshot(opts.snapshot);
    }
    return store2;
  });
  const ref = useRef(opts);
  useEffect(() => void (ref.current = opts));
  if (
    // shallow equality check
    Object.keys(ref.current).some(
      (key) => ref.current[key] !== opts[key]
    )
  ) {
    const newStore = createTLStore(opts);
    if (opts.snapshot) {
      newStore.loadSnapshot(opts.snapshot);
    }
    setStore(newStore);
    return newStore;
  }
  return store;
}
export {
  useTLStore
};
//# sourceMappingURL=useTLStore.mjs.map

import { assert } from "@tldraw/utils";
import { useCallback, useDebugValue, useLayoutEffect, useRef } from "react";
function useEvent(handler) {
  const handlerRef = useRef();
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useDebugValue(handler);
  return useCallback((...args) => {
    const fn = handlerRef.current;
    assert(fn, "fn does not exist");
    return fn(...args);
  }, []);
}
export {
  useEvent
};
//# sourceMappingURL=useEvent.mjs.map

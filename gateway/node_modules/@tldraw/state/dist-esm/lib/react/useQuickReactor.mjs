import { useEffect } from "react";
import { EMPTY_ARRAY, EffectScheduler } from "../core/index.mjs";
function useQuickReactor(name, reactFn, deps = EMPTY_ARRAY) {
  useEffect(() => {
    const scheduler = new EffectScheduler(name, reactFn);
    scheduler.attach();
    scheduler.execute();
    return () => {
      scheduler.detach();
    };
  }, deps);
}
export {
  useQuickReactor
};
//# sourceMappingURL=useQuickReactor.mjs.map

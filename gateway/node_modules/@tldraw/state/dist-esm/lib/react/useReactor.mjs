import { useEffect, useMemo } from "react";
import { EffectScheduler } from "../core/index.mjs";
function useReactor(name, reactFn, deps = []) {
  const scheduler = useMemo(
    () => new EffectScheduler(name, reactFn, { scheduleEffect: (cb) => requestAnimationFrame(cb) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  useEffect(() => {
    scheduler.attach();
    scheduler.execute();
    return () => {
      scheduler.detach();
    };
  }, [scheduler]);
}
export {
  useReactor
};
//# sourceMappingURL=useReactor.mjs.map

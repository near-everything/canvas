"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useReactor_exports = {};
__export(useReactor_exports, {
  useReactor: () => useReactor
});
module.exports = __toCommonJS(useReactor_exports);
var import_react = require("react");
var import_core = require("../core");
function useReactor(name, reactFn, deps = []) {
  const scheduler = (0, import_react.useMemo)(
    () => new import_core.EffectScheduler(name, reactFn, { scheduleEffect: (cb) => requestAnimationFrame(cb) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
  (0, import_react.useEffect)(() => {
    scheduler.attach();
    scheduler.execute();
    return () => {
      scheduler.detach();
    };
  }, [scheduler]);
}
//# sourceMappingURL=useReactor.js.map

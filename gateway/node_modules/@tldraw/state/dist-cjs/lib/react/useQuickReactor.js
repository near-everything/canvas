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
var useQuickReactor_exports = {};
__export(useQuickReactor_exports, {
  useQuickReactor: () => useQuickReactor
});
module.exports = __toCommonJS(useQuickReactor_exports);
var import_react = require("react");
var import_core = require("../core");
function useQuickReactor(name, reactFn, deps = import_core.EMPTY_ARRAY) {
  (0, import_react.useEffect)(() => {
    const scheduler = new import_core.EffectScheduler(name, reactFn);
    scheduler.attach();
    scheduler.execute();
    return () => {
      scheduler.detach();
    };
  }, deps);
}
//# sourceMappingURL=useQuickReactor.js.map

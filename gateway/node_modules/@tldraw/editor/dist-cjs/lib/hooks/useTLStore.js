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
var useTLStore_exports = {};
__export(useTLStore_exports, {
  useTLStore: () => useTLStore
});
module.exports = __toCommonJS(useTLStore_exports);
var import_react = require("react");
var import_createTLStore = require("../config/createTLStore");
function useTLStore(opts) {
  const [store, setStore] = (0, import_react.useState)(() => {
    const store2 = (0, import_createTLStore.createTLStore)(opts);
    if (opts.snapshot) {
      store2.loadSnapshot(opts.snapshot);
    }
    return store2;
  });
  const ref = (0, import_react.useRef)(opts);
  (0, import_react.useEffect)(() => void (ref.current = opts));
  if (
    // shallow equality check
    Object.keys(ref.current).some(
      (key) => ref.current[key] !== opts[key]
    )
  ) {
    const newStore = (0, import_createTLStore.createTLStore)(opts);
    if (opts.snapshot) {
      newStore.loadSnapshot(opts.snapshot);
    }
    setStore(newStore);
    return newStore;
  }
  return store;
}
//# sourceMappingURL=useTLStore.js.map

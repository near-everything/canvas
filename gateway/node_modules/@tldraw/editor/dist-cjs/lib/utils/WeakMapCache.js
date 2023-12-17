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
var WeakMapCache_exports = {};
__export(WeakMapCache_exports, {
  WeakMapCache: () => WeakMapCache
});
module.exports = __toCommonJS(WeakMapCache_exports);
class WeakMapCache {
  items = /* @__PURE__ */ new WeakMap();
  get(item, cb) {
    if (!this.items.has(item)) {
      this.items.set(item, cb(item));
    }
    return this.items.get(item);
  }
  access(item) {
    return this.items.get(item);
  }
  set(item, value) {
    this.items.set(item, value);
  }
  has(item) {
    return this.items.has(item);
  }
  invalidate(item) {
    this.items.delete(item);
  }
  bust() {
    this.items = /* @__PURE__ */ new WeakMap();
  }
}
//# sourceMappingURL=WeakMapCache.js.map

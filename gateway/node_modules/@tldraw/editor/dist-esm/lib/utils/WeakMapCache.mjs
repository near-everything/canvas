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
export {
  WeakMapCache
};
//# sourceMappingURL=WeakMapCache.mjs.map

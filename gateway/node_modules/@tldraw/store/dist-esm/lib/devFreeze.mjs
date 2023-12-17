function devFreeze(object) {
  if (process.env.NODE_ENV === "production") {
    return object;
  }
  const proto = Object.getPrototypeOf(object);
  if (proto && !(proto === Array.prototype || proto === Object.prototype)) {
    console.error("cannot include non-js data in a record", object);
    throw new Error("cannot include non-js data in a record");
  }
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      devFreeze(value);
    }
  }
  return Object.freeze(object);
}
export {
  devFreeze
};
//# sourceMappingURL=devFreeze.mjs.map

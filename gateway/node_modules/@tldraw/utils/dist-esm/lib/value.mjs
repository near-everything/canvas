function isDefined(value) {
  return value !== void 0;
}
function isNonNull(value) {
  return value !== null;
}
function isNonNullish(value) {
  return value !== null && value !== void 0;
}
const structuredClone = typeof window !== "undefined" && window.structuredClone ? window.structuredClone : (i) => i ? JSON.parse(JSON.stringify(i)) : i;
export {
  isDefined,
  isNonNull,
  isNonNullish,
  structuredClone
};
//# sourceMappingURL=value.mjs.map

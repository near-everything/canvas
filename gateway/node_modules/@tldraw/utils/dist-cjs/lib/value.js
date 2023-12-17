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
var value_exports = {};
__export(value_exports, {
  isDefined: () => isDefined,
  isNonNull: () => isNonNull,
  isNonNullish: () => isNonNullish,
  structuredClone: () => structuredClone
});
module.exports = __toCommonJS(value_exports);
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
//# sourceMappingURL=value.js.map

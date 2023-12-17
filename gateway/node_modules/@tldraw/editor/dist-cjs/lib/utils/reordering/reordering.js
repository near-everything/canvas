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
var reordering_exports = {};
__export(reordering_exports, {
  getIndexAbove: () => getIndexAbove,
  getIndexBelow: () => getIndexBelow,
  getIndexBetween: () => getIndexBetween,
  getIndices: () => getIndices,
  getIndicesAbove: () => getIndicesAbove,
  getIndicesBelow: () => getIndicesBelow,
  getIndicesBetween: () => getIndicesBetween,
  sortByIndex: () => sortByIndex
});
module.exports = __toCommonJS(reordering_exports);
var import_dgreensp = require("./dgreensp");
function getIndicesBetween(below, above, n) {
  return (0, import_dgreensp.generateNKeysBetween)(below, above, n);
}
function getIndicesAbove(below, n) {
  return (0, import_dgreensp.generateNKeysBetween)(below, void 0, n);
}
function getIndicesBelow(above, n) {
  return (0, import_dgreensp.generateNKeysBetween)(void 0, above, n);
}
function getIndexBetween(below, above) {
  return (0, import_dgreensp.generateNKeysBetween)(below, above, 1)[0];
}
function getIndexAbove(below) {
  return (0, import_dgreensp.generateNKeysBetween)(below, void 0, 1)[0];
}
function getIndexBelow(above) {
  return (0, import_dgreensp.generateNKeysBetween)(void 0, above, 1)[0];
}
function getIndices(n, start = "a1") {
  return [start, ...(0, import_dgreensp.generateNKeysBetween)(start, void 0, n)];
}
function sortByIndex(a, b) {
  if (a.index < b.index) {
    return -1;
  } else if (a.index > b.index) {
    return 1;
  }
  return 0;
}
//# sourceMappingURL=reordering.js.map

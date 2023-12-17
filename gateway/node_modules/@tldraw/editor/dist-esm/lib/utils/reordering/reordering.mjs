import { generateNKeysBetween } from "./dgreensp/index.mjs";
function getIndicesBetween(below, above, n) {
  return generateNKeysBetween(below, above, n);
}
function getIndicesAbove(below, n) {
  return generateNKeysBetween(below, void 0, n);
}
function getIndicesBelow(above, n) {
  return generateNKeysBetween(void 0, above, n);
}
function getIndexBetween(below, above) {
  return generateNKeysBetween(below, above, 1)[0];
}
function getIndexAbove(below) {
  return generateNKeysBetween(below, void 0, 1)[0];
}
function getIndexBelow(above) {
  return generateNKeysBetween(void 0, above, 1)[0];
}
function getIndices(n, start = "a1") {
  return [start, ...generateNKeysBetween(start, void 0, n)];
}
function sortByIndex(a, b) {
  if (a.index < b.index) {
    return -1;
  } else if (a.index > b.index) {
    return 1;
  }
  return 0;
}
export {
  getIndexAbove,
  getIndexBelow,
  getIndexBetween,
  getIndices,
  getIndicesAbove,
  getIndicesBelow,
  getIndicesBetween,
  sortByIndex
};
//# sourceMappingURL=reordering.mjs.map

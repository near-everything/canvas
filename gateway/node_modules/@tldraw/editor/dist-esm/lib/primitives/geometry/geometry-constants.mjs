const SPACING = 20;
const MIN_COUNT = 8;
function getVerticesCountForLength(length, spacing = SPACING) {
  return Math.max(MIN_COUNT, Math.ceil(length / spacing));
}
export {
  MIN_COUNT,
  SPACING,
  getVerticesCountForLength
};
//# sourceMappingURL=geometry-constants.mjs.map

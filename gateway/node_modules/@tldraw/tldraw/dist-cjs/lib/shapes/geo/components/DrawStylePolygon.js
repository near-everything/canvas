"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DrawStylePolygon_exports = {};
__export(DrawStylePolygon_exports, {
  DrawStylePolygon: () => DrawStylePolygon,
  DrawStylePolygonSvg: () => DrawStylePolygonSvg
});
module.exports = __toCommonJS(DrawStylePolygon_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_polygon_helpers = require("../../shared/polygon-helpers");
const DrawStylePolygon = React.memo(function DrawStylePolygon2({
  id,
  outline,
  lines,
  fill,
  color,
  strokeWidth
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const polygonPoints = (0, import_polygon_helpers.getRoundedPolygonPoints)(id, outline, strokeWidth / 3, strokeWidth * 2, 2);
  let strokePathData = (0, import_polygon_helpers.getRoundedInkyPolygonPath)(polygonPoints);
  if (lines) {
    for (const [A, B] of lines) {
      strokePathData += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  const innerPolygonPoints = (0, import_polygon_helpers.getRoundedPolygonPoints)(id, outline, 0, strokeWidth * 2, 1);
  const innerPathData = (0, import_polygon_helpers.getRoundedInkyPolygonPath)(innerPolygonPoints);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d: innerPathData, fill, color, theme }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: strokePathData, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function DrawStylePolygonSvg({
  id,
  outline,
  lines,
  fill,
  color,
  theme,
  strokeWidth
}) {
  const polygonPoints = (0, import_polygon_helpers.getRoundedPolygonPoints)(id, outline, strokeWidth / 3, strokeWidth * 2, 2);
  let strokePathData = (0, import_polygon_helpers.getRoundedInkyPolygonPath)(polygonPoints);
  if (lines) {
    for (const [A, B] of lines) {
      strokePathData += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  const innerPolygonPoints = (0, import_polygon_helpers.getRoundedPolygonPoints)(id, outline, 0, strokeWidth * 2, 1);
  const innerPathData = (0, import_polygon_helpers.getRoundedInkyPolygonPath)(innerPolygonPoints);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", strokePathData);
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d: innerPathData,
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
//# sourceMappingURL=DrawStylePolygon.js.map

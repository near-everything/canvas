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
var SolidStyleCloud_exports = {};
__export(SolidStyleCloud_exports, {
  SolidStyleCloud: () => SolidStyleCloud,
  SolidStyleCloudSvg: () => SolidStyleCloudSvg
});
module.exports = __toCommonJS(SolidStyleCloud_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_cloudOutline = require("../cloudOutline");
const SolidStyleCloud = React.memo(function SolidStyleCloud2({
  fill,
  color,
  strokeWidth,
  w,
  h,
  id,
  size
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const path = (0, import_cloudOutline.cloudSvgPath)(w, h, id, size);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: path, fill, color }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function SolidStyleCloudSvg({
  fill,
  color,
  strokeWidth,
  theme,
  w,
  h,
  id,
  size
}) {
  const pathData = (0, import_cloudOutline.cloudSvgPath)(w, h, id, size);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", pathData);
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d: pathData,
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
//# sourceMappingURL=SolidStyleCloud.js.map

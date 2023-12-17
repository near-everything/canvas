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
var SolidStyleOval_exports = {};
__export(SolidStyleOval_exports, {
  SolidStyleOval: () => SolidStyleOval,
  SolidStyleOvalSvg: () => SolidStyleOvalSvg,
  getOvalIndicatorPath: () => getOvalIndicatorPath
});
module.exports = __toCommonJS(SolidStyleOval_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
const SolidStyleOval = React.memo(function SolidStyleOval2({
  w,
  h,
  strokeWidth: sw,
  fill,
  color
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const d = getOvalIndicatorPath(w, h);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { d, color, fill, theme }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d, stroke: theme[color].solid, strokeWidth: sw, fill: "none" })
  ] });
});
function SolidStyleOvalSvg({
  w,
  h,
  strokeWidth: sw,
  fill,
  color,
  theme
}) {
  const d = getOvalIndicatorPath(w, h);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", d);
  strokeElement.setAttribute("stroke-width", sw.toString());
  strokeElement.setAttribute("width", w.toString());
  strokeElement.setAttribute("height", h.toString());
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d,
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
function getOvalIndicatorPath(w, h) {
  let d;
  if (h > w) {
    const offset = w / 2;
    d = `
    M0,${offset}
    a${offset},${offset},0,1,1,${offset * 2},0
    L${w},${h - offset}
    a${offset},${offset},0,1,1,-${offset * 2},0
    Z`;
  } else {
    const offset = h / 2;
    d = `
    M${offset},0
    L${w - offset},0
    a${offset},${offset},0,1,1,0,${offset * 2}
    L${offset},${h}
    a${offset},${offset},0,1,1,0,${-offset * 2}
    Z`;
  }
  return d;
}
//# sourceMappingURL=SolidStyleOval.js.map

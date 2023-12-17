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
var DashStyleOval_exports = {};
__export(DashStyleOval_exports, {
  DashStyleOval: () => DashStyleOval,
  DashStyleOvalSvg: () => DashStyleOvalSvg
});
module.exports = __toCommonJS(DashStyleOval_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_getPerfectDashProps = require("../../shared/getPerfectDashProps");
var import_helpers = require("../helpers");
const DashStyleOval = React.memo(function DashStyleOval2({
  w,
  h,
  strokeWidth: sw,
  dash,
  color,
  fill
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const d = (0, import_helpers.getOvalSolidPath)(w, h);
  const perimeter = (0, import_helpers.getOvalPerimeter)(w, h);
  const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
    perimeter < 64 ? perimeter * 2 : perimeter,
    sw,
    {
      style: dash,
      snap: 4,
      start: "outset",
      end: "outset",
      closed: true
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d, color, fill }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d,
        strokeWidth: sw,
        width: (0, import_editor.toDomPrecision)(w),
        height: (0, import_editor.toDomPrecision)(h),
        fill: "none",
        stroke: theme[color].solid,
        strokeDasharray,
        strokeDashoffset,
        pointerEvents: "all"
      }
    )
  ] });
});
function DashStyleOvalSvg({
  w,
  h,
  strokeWidth: sw,
  dash,
  color,
  theme,
  fill
}) {
  const d = (0, import_helpers.getOvalSolidPath)(w, h);
  const perimeter = (0, import_helpers.getOvalPerimeter)(w, h);
  const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(
    perimeter < 64 ? perimeter * 2 : perimeter,
    sw,
    {
      style: dash,
      snap: 4,
      closed: true
    }
  );
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", d);
  strokeElement.setAttribute("stroke-width", sw.toString());
  strokeElement.setAttribute("width", w.toString());
  strokeElement.setAttribute("height", h.toString());
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("stroke-dasharray", strokeDasharray);
  strokeElement.setAttribute("stroke-dashoffset", strokeDashoffset);
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d,
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
//# sourceMappingURL=DashStyleOval.js.map

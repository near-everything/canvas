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
var DashStylePolygon_exports = {};
__export(DashStylePolygon_exports, {
  DashStylePolygon: () => DashStylePolygon,
  DashStylePolygonSvg: () => DashStylePolygonSvg
});
module.exports = __toCommonJS(DashStylePolygon_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_getPerfectDashProps = require("../../shared/getPerfectDashProps");
const DashStylePolygon = React.memo(function DashStylePolygon2({
  dash,
  fill,
  color,
  strokeWidth,
  outline,
  lines
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const innerPath = "M" + outline[0] + "L" + outline.slice(1) + "Z";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: innerPath, fill, color }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { strokeWidth, stroke: theme[color].solid, fill: "none", pointerEvents: "all", children: [
      Array.from(Array(outline.length)).map((_, i) => {
        const A = outline[i];
        const B = outline[(i + 1) % outline.length];
        const dist = import_editor.Vec2d.Dist(A, B);
        const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(dist, strokeWidth, {
          style: dash,
          start: "outset",
          end: "outset"
        });
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "line",
          {
            x1: A.x,
            y1: A.y,
            x2: B.x,
            y2: B.y,
            strokeDasharray,
            strokeDashoffset
          },
          i
        );
      }),
      lines && lines.map(([A, B], i) => {
        const dist = import_editor.Vec2d.Dist(A, B);
        const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(dist, strokeWidth, {
          style: dash,
          start: "skip",
          end: "outset",
          snap: dash === "dotted" ? 4 : void 0
        });
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            d: `M${A.x},${A.y}L${B.x},${B.y}`,
            stroke: theme[color].solid,
            strokeWidth,
            fill: "none",
            strokeDasharray,
            strokeDashoffset
          },
          `line_fg_${i}`
        );
      })
    ] })
  ] });
});
function DashStylePolygonSvg({
  dash,
  fill,
  color,
  theme,
  strokeWidth,
  outline,
  lines
}) {
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  Array.from(Array(outline.length)).forEach((_, i) => {
    const A = outline[i];
    const B = outline[(i + 1) % outline.length];
    const dist = import_editor.Vec2d.Dist(A, B);
    const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(dist, strokeWidth, {
      style: dash
    });
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", A.x.toString());
    line.setAttribute("y1", A.y.toString());
    line.setAttribute("x2", B.x.toString());
    line.setAttribute("y2", B.y.toString());
    line.setAttribute("stroke-dasharray", strokeDasharray.toString());
    line.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
    strokeElement.appendChild(line);
  });
  if (lines) {
    for (const [A, B] of lines) {
      const dist = import_editor.Vec2d.Dist(A, B);
      const { strokeDasharray, strokeDashoffset } = (0, import_getPerfectDashProps.getPerfectDashProps)(dist, strokeWidth, {
        style: dash,
        start: "skip",
        end: "skip",
        snap: dash === "dotted" ? 4 : 2
      });
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", A.x.toString());
      line.setAttribute("y1", A.y.toString());
      line.setAttribute("x2", B.x.toString());
      line.setAttribute("y2", B.y.toString());
      line.setAttribute("stroke-dasharray", strokeDasharray.toString());
      line.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
      strokeElement.appendChild(line);
    }
  }
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d: "M" + outline[0] + "L" + outline.slice(1) + "Z",
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
}
//# sourceMappingURL=DashStylePolygon.js.map

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
var svg_exports = {};
__export(svg_exports, {
  getSvgPathForBezierCurve: () => getSvgPathForBezierCurve,
  getSvgPathForCubicSpline: () => getSvgPathForCubicSpline,
  getSvgPathForEdge: () => getSvgPathForEdge,
  getSvgPathForLineGeometry: () => getSvgPathForLineGeometry,
  getSvgPathForPolylineSpline: () => getSvgPathForPolylineSpline
});
module.exports = __toCommonJS(svg_exports);
var import_editor = require("@tldraw/editor");
function getSvgPathForEdge(edge, first) {
  const { start, end } = edge;
  if (first) {
    return `M${(0, import_editor.toDomPrecision)(start.x)},${(0, import_editor.toDomPrecision)(start.y)} L${(0, import_editor.toDomPrecision)(
      end.x
    )},${(0, import_editor.toDomPrecision)(end.y)} `;
  }
  return `${(0, import_editor.toDomPrecision)(end.x)},${(0, import_editor.toDomPrecision)(end.y)} `;
}
function getSvgPathForBezierCurve(curve, first) {
  const { a, b, c, d } = curve;
  if (import_editor.Vec2d.Equals(a, d))
    return "";
  return `${first ? `M${(0, import_editor.toDomPrecision)(a.x)},${(0, import_editor.toDomPrecision)(a.y)}` : ``}C${(0, import_editor.toDomPrecision)(
    b.x
  )},${(0, import_editor.toDomPrecision)(b.y)} ${(0, import_editor.toDomPrecision)(c.x)},${(0, import_editor.toDomPrecision)(c.y)} ${(0, import_editor.toDomPrecision)(
    d.x
  )},${(0, import_editor.toDomPrecision)(d.y)}`;
}
function getSvgPathForCubicSpline(spline, isClosed) {
  let d = spline.segments.reduce((d2, segment, i) => {
    return d2 + getSvgPathForBezierCurve(segment, i === 0);
  }, "");
  if (isClosed) {
    d += "Z";
  }
  return d;
}
function getSvgPathForPolylineSpline(spline, isClosed) {
  let d = spline.segments.reduce((d2, segment, i) => {
    return d2 + getSvgPathForEdge(segment, i === 0);
  }, "");
  if (isClosed) {
    d += "Z";
  }
  return d;
}
function getSvgPathForLineGeometry(spline, isClosed = false) {
  if (spline instanceof import_editor.Polyline2d) {
    return getSvgPathForPolylineSpline(spline, isClosed);
  } else {
    return getSvgPathForCubicSpline(spline, isClosed);
  }
}
//# sourceMappingURL=svg.js.map

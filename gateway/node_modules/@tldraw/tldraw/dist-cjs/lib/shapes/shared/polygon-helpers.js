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
var polygon_helpers_exports = {};
__export(polygon_helpers_exports, {
  getDrawLinePathData: () => getDrawLinePathData,
  getRoundedInkyPolygonPath: () => getRoundedInkyPolygonPath,
  getRoundedPolygonPoints: () => getRoundedPolygonPoints
});
module.exports = __toCommonJS(polygon_helpers_exports);
var import_editor = require("@tldraw/editor");
function precise(A) {
  return `${(0, import_editor.toDomPrecision)(A.x)},${(0, import_editor.toDomPrecision)(A.y)} `;
}
function rng(seed = "") {
  let x = 0;
  let y = 0;
  let z = 0;
  let w = 0;
  function next() {
    const t = x ^ x << 11;
    x = y;
    y = z;
    z = w;
    w ^= (w >>> 19 ^ t ^ t >>> 8) >>> 0;
    return w / 4294967296 * 2;
  }
  for (let k = 0; k < seed.length + 64; k++) {
    x ^= seed.charCodeAt(k) | 0;
    next();
  }
  return next;
}
function getRoundedInkyPolygonPath(points) {
  let polylineA = `M`;
  const len = points.length;
  let p0;
  let p1;
  let p2;
  for (let i = 0, n = len; i < n; i += 3) {
    p0 = points[i];
    p1 = points[i + 1];
    p2 = points[i + 2];
    polylineA += `${precise(p0)}L${precise(p1)}Q${precise(p2)}`;
  }
  polylineA += `${precise(points[0])}`;
  return polylineA;
}
function getRoundedPolygonPoints(id, outline, offset, roundness, passes) {
  const results = [];
  const random = rng(id);
  let p0 = outline[0];
  let p1;
  const len = outline.length;
  for (let i = 0, n = len * passes; i < n; i++) {
    p1 = import_editor.Vec2d.AddXY(outline[(i + 1) % len], random() * offset, random() * offset);
    const delta = import_editor.Vec2d.Sub(p1, p0);
    const distance = import_editor.Vec2d.Len(delta);
    const vector = import_editor.Vec2d.Div(delta, distance).mul(Math.min(distance / 4, roundness));
    results.push(import_editor.Vec2d.Add(p0, vector), import_editor.Vec2d.Add(p1, vector.neg()), p1);
    p0 = p1;
  }
  return results;
}
function getDrawLinePathData(id, outline, strokeWidth) {
  let innerPathData = `M ${precise(outline[0])}L`;
  let outerPathData2 = `M ${precise(outline[0])}L`;
  const offset = strokeWidth / 3;
  const roundness = strokeWidth * 2;
  const random = rng(id);
  let p0 = outline[0];
  let p1;
  let s0 = outline[0];
  let s1;
  const len = outline.length;
  for (let i = 0, n = len - 1; i < n; i++) {
    p1 = outline[i + 1];
    s1 = import_editor.Vec2d.AddXY(outline[i + 1], random() * offset, random() * offset);
    const delta = import_editor.Vec2d.Sub(p1, p0);
    const distance = import_editor.Vec2d.Len(delta);
    const vector = import_editor.Vec2d.Div(delta, distance).mul(Math.min(distance / 4, roundness));
    const q0 = import_editor.Vec2d.Add(p0, vector);
    const q1 = import_editor.Vec2d.Add(p1, vector.neg());
    const sDelta = import_editor.Vec2d.Sub(s1, s0);
    const sDistance = import_editor.Vec2d.Len(sDelta);
    const sVector = import_editor.Vec2d.Div(sDelta, sDistance).mul(Math.min(sDistance / 4, roundness));
    const sq0 = import_editor.Vec2d.Add(s0, sVector);
    const sq1 = import_editor.Vec2d.Add(s1, sVector.neg());
    if (i === n - 1) {
      innerPathData += `${precise(q0)}L ${precise(p1)}`;
      outerPathData2 += `${precise(sq0)}L ${precise(s1)}`;
    } else {
      innerPathData += `${precise(q0)}L ${precise(q1)}Q ${precise(p1)}`;
      outerPathData2 += `${precise(sq0)}L ${precise(sq1)}Q ${precise(s1)}`;
      p0 = p1;
      s0 = s1;
    }
  }
  return [innerPathData, innerPathData + outerPathData2];
}
//# sourceMappingURL=polygon-helpers.js.map

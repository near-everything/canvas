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
var CubicBezier2d_exports = {};
__export(CubicBezier2d_exports, {
  CubicBezier2d: () => CubicBezier2d
});
module.exports = __toCommonJS(CubicBezier2d_exports);
var import_Vec2d = require("../Vec2d");
var import_Polyline2d = require("./Polyline2d");
class CubicBezier2d extends import_Polyline2d.Polyline2d {
  a;
  b;
  c;
  d;
  constructor(config) {
    const { start: a, cp1: b, cp2: c, end: d } = config;
    super({ ...config, points: [a, d] });
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }
  getVertices() {
    const vertices = [];
    const { a, b, c, d } = this;
    for (let i = 0, n = 10; i <= n; i++) {
      const t = i / n;
      vertices.push(
        new import_Vec2d.Vec2d(
          (1 - t) * (1 - t) * (1 - t) * a.x + 3 * ((1 - t) * (1 - t)) * t * b.x + 3 * (1 - t) * (t * t) * c.x + t * t * t * d.x,
          (1 - t) * (1 - t) * (1 - t) * a.y + 3 * ((1 - t) * (1 - t)) * t * b.y + 3 * (1 - t) * (t * t) * c.y + t * t * t * d.y
        )
      );
    }
    return vertices;
  }
  midPoint() {
    return getAtT(this, 0.5);
  }
  nearestPoint(A) {
    let nearest;
    let dist = Infinity;
    for (const edge of this.segments) {
      const p = edge.nearestPoint(A);
      const d = p.dist(A);
      if (d < dist) {
        nearest = p;
        dist = d;
      }
    }
    if (!nearest)
      throw Error("nearest point not found");
    return nearest;
  }
}
function getAtT(segment, t) {
  const { a, b, c, d } = segment;
  return new import_Vec2d.Vec2d(
    (1 - t) * (1 - t) * (1 - t) * a.x + 3 * ((1 - t) * (1 - t)) * t * b.x + 3 * (1 - t) * (t * t) * c.x + t * t * t * d.x,
    (1 - t) * (1 - t) * (1 - t) * a.y + 3 * ((1 - t) * (1 - t)) * t * b.y + 3 * (1 - t) * (t * t) * c.y + t * t * t * d.y
  );
}
//# sourceMappingURL=CubicBezier2d.js.map

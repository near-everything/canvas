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
var Arc2d_exports = {};
__export(Arc2d_exports, {
  Arc2d: () => Arc2d
});
module.exports = __toCommonJS(Arc2d_exports);
var import_Vec2d = require("../Vec2d");
var import_intersect = require("../intersect");
var import_utils = require("../utils");
var import_Geometry2d = require("./Geometry2d");
var import_geometry_constants = require("./geometry-constants");
class Arc2d extends import_Geometry2d.Geometry2d {
  _center;
  radius;
  start;
  end;
  measure;
  length;
  angleStart;
  angleEnd;
  constructor(config) {
    super({ ...config, isFilled: false, isClosed: false });
    const { center, radius, sweepFlag, largeArcFlag, start, end } = config;
    if (start.equals(end))
      throw Error(`Arc must have different start and end points.`);
    this.angleStart = import_Vec2d.Vec2d.Angle(center, start);
    this.angleEnd = import_Vec2d.Vec2d.Angle(center, end);
    this.measure = getArcMeasure(this.angleStart, this.angleEnd, sweepFlag, largeArcFlag);
    this.length = this.measure * radius;
    this.start = start;
    this.end = end;
    this._center = center;
    this.radius = radius;
  }
  nearestPoint(point) {
    const { _center, measure, radius, angleEnd, angleStart, start: A, end: B } = this;
    const t = getPointInArcT(measure, angleStart, angleEnd, _center.angle(point));
    if (t <= 0)
      return A;
    if (t >= 1)
      return B;
    const P = _center.clone().add(point.clone().sub(_center).uni().mul(radius));
    let distance = Infinity;
    let nearest;
    for (const pt of [A, B, P]) {
      if (point.dist(pt) < distance) {
        nearest = pt;
        distance = point.dist(pt);
      }
    }
    if (!nearest)
      throw Error("nearest point not found");
    return nearest;
  }
  hitTestLineSegment(A, B, _zoom) {
    const { _center, radius, measure, angleStart, angleEnd } = this;
    const intersection = (0, import_intersect.intersectLineSegmentCircle)(A, B, _center, radius);
    if (intersection === null)
      return false;
    return intersection.some((p) => {
      const result = getPointInArcT(measure, angleStart, angleEnd, _center.angle(p));
      return result >= 0 && result <= 1;
    });
  }
  getVertices() {
    const { _center, measure, length, radius, angleStart } = this;
    const vertices = [];
    for (let i = 0, n = (0, import_geometry_constants.getVerticesCountForLength)(Math.abs(length)); i < n + 1; i++) {
      const t = i / n * measure;
      const angle = angleStart + t;
      vertices.push(_center.clone().add(new import_Vec2d.Vec2d(Math.cos(angle), Math.sin(angle)).mul(radius)));
    }
    return vertices;
  }
}
function getPointInArcT(mAB, A, B, P) {
  let mAP;
  if (Math.abs(mAB) > import_utils.PI) {
    mAP = (0, import_utils.shortAngleDist)(A, P);
    const mPB = (0, import_utils.shortAngleDist)(P, B);
    if (Math.abs(mAP) < Math.abs(mPB)) {
      return mAP / mAB;
    } else {
      return (mAB - mPB) / mAB;
    }
  } else {
    mAP = (0, import_utils.shortAngleDist)(A, P);
    return mAP / mAB;
  }
}
function getArcMeasure(A, B, sweepFlag, largeArcFlag) {
  const m = 2 * ((B - A) % import_utils.PI2) % import_utils.PI2 - (B - A) % import_utils.PI2;
  if (!largeArcFlag)
    return m;
  return (import_utils.PI2 - Math.abs(m)) * (sweepFlag ? 1 : -1);
}
//# sourceMappingURL=Arc2d.js.map

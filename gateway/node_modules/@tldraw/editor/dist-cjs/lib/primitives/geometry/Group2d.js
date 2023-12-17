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
var Group2d_exports = {};
__export(Group2d_exports, {
  Group2d: () => Group2d
});
module.exports = __toCommonJS(Group2d_exports);
var import_Box2d = require("../Box2d");
var import_Geometry2d = require("./Geometry2d");
class Group2d extends import_Geometry2d.Geometry2d {
  children;
  constructor(config) {
    super({ ...config, isClosed: true, isFilled: false });
    const { children } = config;
    if (children.length === 0)
      throw Error("Group2d must have at least one child");
    this.children = children;
  }
  getVertices() {
    return this.children.filter((c) => !c.isLabel).flatMap((c) => c.vertices);
  }
  nearestPoint(point) {
    let d = Infinity;
    let p;
    const { children } = this;
    if (children.length === 0) {
      throw Error("no children");
    }
    for (const child of children) {
      const nearest = child.nearestPoint(point);
      const dist = nearest.dist(point);
      if (dist < d) {
        d = dist;
        p = nearest;
      }
    }
    if (!p)
      throw Error("nearest point not found");
    return p;
  }
  distanceToPoint(point, hitInside = false) {
    return Math.min(...this.children.map((c, i) => c.distanceToPoint(point, hitInside || i > 0)));
  }
  hitTestPoint(point, margin, hitInside) {
    return !!this.children.filter((c) => !c.isLabel).find((c) => c.hitTestPoint(point, margin, hitInside));
  }
  hitTestLineSegment(A, B, zoom) {
    return !!this.children.filter((c) => !c.isLabel).find((c) => c.hitTestLineSegment(A, B, zoom));
  }
  getArea() {
    return this.children[0].area;
  }
  toSimpleSvgPath() {
    let path = "";
    for (const child of this.children) {
      path += child.toSimpleSvgPath();
    }
    const corners = import_Box2d.Box2d.FromPoints(this.vertices).corners;
    for (let i = 0, n = corners.length; i < n; i++) {
      const corner = corners[i];
      const prevCorner = corners[(i - 1 + n) % n];
      const prevDist = corner.dist(prevCorner);
      const nextCorner = corners[(i + 1) % n];
      const nextDist = corner.dist(nextCorner);
      const A = corner.clone().lrp(prevCorner, 4 / prevDist);
      const B = corner;
      const C = corner.clone().lrp(nextCorner, 4 / nextDist);
      path += `M${A.x},${A.y} L${B.x},${B.y} L${C.x},${C.y} `;
    }
    return path;
  }
}
//# sourceMappingURL=Group2d.js.map

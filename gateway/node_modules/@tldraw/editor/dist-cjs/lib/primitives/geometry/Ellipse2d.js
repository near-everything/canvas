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
var Ellipse2d_exports = {};
__export(Ellipse2d_exports, {
  Ellipse2d: () => Ellipse2d
});
module.exports = __toCommonJS(Ellipse2d_exports);
var import_Box2d = require("../Box2d");
var import_Vec2d = require("../Vec2d");
var import_utils = require("../utils");
var import_Edge2d = require("./Edge2d");
var import_Geometry2d = require("./Geometry2d");
var import_geometry_constants = require("./geometry-constants");
class Ellipse2d extends import_Geometry2d.Geometry2d {
  constructor(config) {
    super({ ...config, isClosed: true });
    this.config = config;
    const { width, height } = config;
    this.w = width;
    this.h = height;
  }
  w;
  h;
  _edges;
  get edges() {
    if (!this._edges) {
      const { vertices } = this;
      this._edges = [];
      for (let i = 0, n = vertices.length; i < n; i++) {
        const start = vertices[i];
        const end = vertices[(i + 1) % n];
        this._edges.push(new import_Edge2d.Edge2d({ start, end }));
      }
    }
    return this._edges;
  }
  getVertices() {
    const w = Math.max(1, this.w);
    const h = Math.max(1, this.h);
    const cx = w / 2;
    const cy = h / 2;
    const q = Math.pow(cx - cy, 2) / Math.pow(cx + cy, 2);
    const p = import_utils.PI * (cx + cy) * (1 + 3 * q / (10 + Math.sqrt(4 - 3 * q)));
    const len = (0, import_geometry_constants.getVerticesCountForLength)(p);
    const step = import_utils.PI2 / len;
    const a = Math.cos(step);
    const b = Math.sin(step);
    let sin = 0;
    let cos = 1;
    let ts = 0;
    let tc = 1;
    const vertices = Array(len);
    for (let i = 0; i < len; i++) {
      vertices[i] = new import_Vec2d.Vec2d(cx + cx * cos, cy + cy * sin);
      ts = b * cos + a * sin;
      tc = a * cos - b * sin;
      sin = ts;
      cos = tc;
    }
    return vertices;
  }
  nearestPoint(A) {
    let nearest;
    let dist = Infinity;
    for (const edge of this.edges) {
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
  hitTestLineSegment(A, B, zoom) {
    return this.edges.some((edge) => edge.hitTestLineSegment(A, B, zoom));
  }
  getBounds() {
    return new import_Box2d.Box2d(0, 0, this.w, this.h);
  }
}
//# sourceMappingURL=Ellipse2d.js.map

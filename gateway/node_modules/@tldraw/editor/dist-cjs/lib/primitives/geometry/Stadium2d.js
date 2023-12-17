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
var Stadium2d_exports = {};
__export(Stadium2d_exports, {
  Stadium2d: () => Stadium2d
});
module.exports = __toCommonJS(Stadium2d_exports);
var import_Vec2d = require("../Vec2d");
var import_utils = require("../utils");
var import_Ellipse2d = require("./Ellipse2d");
class Stadium2d extends import_Ellipse2d.Ellipse2d {
  constructor(config) {
    super({ ...config });
    this.config = config;
  }
  getVertices() {
    const w = Math.max(1, this.w);
    const h = Math.max(1, this.h);
    const cx = w / 2;
    const cy = h / 2;
    const len = 10;
    const points = Array(len * 2 - 2);
    if (h > w) {
      for (let i = 0; i < len - 1; i++) {
        const t1 = -import_utils.PI + import_utils.PI * i / (len - 2);
        const t2 = import_utils.PI * i / (len - 2);
        points[i] = new import_Vec2d.Vec2d(cx + cx * Math.cos(t1), cx + cx * Math.sin(t1));
        points[i + (len - 1)] = new import_Vec2d.Vec2d(cx + cx * Math.cos(t2), h - cx + cx * Math.sin(t2));
      }
    } else {
      for (let i = 0; i < len - 1; i++) {
        const t1 = -import_utils.TAU + import_utils.PI * i / (len - 2);
        const t2 = import_utils.TAU + import_utils.PI * -i / (len - 2);
        points[i] = new import_Vec2d.Vec2d(w - cy + cy * Math.cos(t1), h - cy + cy * Math.sin(t1));
        points[i + (len - 1)] = new import_Vec2d.Vec2d(cy - cy * Math.cos(t2), h - cy + cy * Math.sin(t2));
      }
    }
    return points;
  }
}
//# sourceMappingURL=Stadium2d.js.map

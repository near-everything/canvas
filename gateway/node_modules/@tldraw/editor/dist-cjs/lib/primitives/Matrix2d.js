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
var Matrix2d_exports = {};
__export(Matrix2d_exports, {
  Matrix2d: () => Matrix2d,
  decomposeMatrix2d: () => decomposeMatrix2d
});
module.exports = __toCommonJS(Matrix2d_exports);
var import_Box2d = require("./Box2d");
var import_utils = require("./utils");
var import_Vec2d = require("./Vec2d");
class Matrix2d {
  constructor(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  a = 1;
  b = 0;
  c = 0;
  d = 1;
  e = 0;
  f = 0;
  equals(m) {
    return this.a === m.a && this.b === m.b && this.c === m.c && this.d === m.d && this.e === m.e && this.f === m.f;
  }
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
  }
  multiply(m) {
    const m2 = m;
    const { a, b, c, d, e, f } = this;
    this.a = a * m2.a + c * m2.b;
    this.c = a * m2.c + c * m2.d;
    this.e = a * m2.e + c * m2.f + e;
    this.b = b * m2.a + d * m2.b;
    this.d = b * m2.c + d * m2.d;
    this.f = b * m2.e + d * m2.f + f;
    return this;
  }
  rotate(r, cx, cy) {
    if (r === 0)
      return this;
    if (cx === void 0)
      return this.multiply(Matrix2d.Rotate(r));
    return this.translate(cx, cy).multiply(Matrix2d.Rotate(r)).translate(-cx, -cy);
  }
  translate(x, y) {
    return this.multiply(Matrix2d.Translate(x, y));
  }
  scale(x, y) {
    return this.multiply(Matrix2d.Scale(x, y));
  }
  invert() {
    const { a, b, c, d, e, f } = this;
    const denom = a * d - b * c;
    this.a = d / denom;
    this.b = b / -denom;
    this.c = c / -denom;
    this.d = a / denom;
    this.e = (d * e - c * f) / -denom;
    this.f = (b * e - a * f) / denom;
    return this;
  }
  applyToPoint(point) {
    return Matrix2d.applyToPoint(this, point);
  }
  applyToPoints(points) {
    return Matrix2d.applyToPoints(this, points);
  }
  rotation() {
    return Matrix2d.Rotation(this);
  }
  point() {
    return Matrix2d.Point(this);
  }
  decomposed() {
    return Matrix2d.Decompose(this);
  }
  toCssString() {
    return Matrix2d.toCssString(this);
  }
  setTo(model) {
    Object.assign(this, model);
    return this;
  }
  decompose() {
    return Matrix2d.Decompose(this);
  }
  clone() {
    return new Matrix2d(this.a, this.b, this.c, this.d, this.e, this.f);
  }
  /* --------------------- Static --------------------- */
  static Identity() {
    return new Matrix2d(1, 0, 0, 1, 0, 0);
  }
  static Translate(x, y) {
    return new Matrix2d(1, 0, 0, 1, x, y);
  }
  static Rotate(r, cx, cy) {
    if (r === 0)
      return Matrix2d.Identity();
    const cosAngle = Math.cos(r);
    const sinAngle = Math.sin(r);
    const rotationMatrix2d = new Matrix2d(cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0);
    if (cx === void 0)
      return rotationMatrix2d;
    return Matrix2d.Compose(
      Matrix2d.Translate(cx, cy),
      rotationMatrix2d,
      Matrix2d.Translate(-cx, -cy)
    );
  }
  static Scale = (x, y, cx, cy) => {
    const scaleMatrix2d = new Matrix2d(x, 0, 0, 0, y, 0);
    if (cx === void 0)
      return scaleMatrix2d;
    return Matrix2d.Compose(
      Matrix2d.Translate(cx, cy),
      scaleMatrix2d,
      Matrix2d.Translate(-cx, -cy)
    );
  };
  static Multiply(m1, m2) {
    return {
      a: m1.a * m2.a + m1.c * m2.b,
      c: m1.a * m2.c + m1.c * m2.d,
      e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b,
      d: m1.b * m2.c + m1.d * m2.d,
      f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  }
  static Inverse(m) {
    const denom = m.a * m.d - m.b * m.c;
    return {
      a: m.d / denom,
      b: m.b / -denom,
      c: m.c / -denom,
      d: m.a / denom,
      e: (m.d * m.e - m.c * m.f) / -denom,
      f: (m.b * m.e - m.a * m.f) / denom
    };
  }
  static Absolute(m) {
    const denom = m.a * m.d - m.b * m.c;
    return {
      a: m.d / denom,
      b: m.b / -denom,
      c: m.c / -denom,
      d: m.a / denom,
      e: (m.d * m.e - m.c * m.f) / denom,
      f: (m.b * m.e - m.a * m.f) / -denom
    };
  }
  static Compose(...matrices) {
    const matrix = Matrix2d.Identity();
    for (let i = 0, n = matrices.length; i < n; i++) {
      matrix.multiply(matrices[i]);
    }
    return matrix;
  }
  static Point(m) {
    return new import_Vec2d.Vec2d(m.e, m.f);
  }
  static Rotation(m) {
    let rotation;
    if (m.a !== 0 || m.c !== 0) {
      const hypotAc = Math.hypot(m.a, m.c);
      rotation = Math.acos(m.a / hypotAc) * (m.c > 0 ? -1 : 1);
    } else if (m.b !== 0 || m.d !== 0) {
      const hypotBd = Math.hypot(m.b, m.d);
      rotation = import_utils.TAU + Math.acos(m.b / hypotBd) * (m.d > 0 ? -1 : 1);
    } else {
      rotation = 0;
    }
    return (0, import_utils.clampRadians)(rotation);
  }
  static Decompose(m) {
    let scaleX, scaleY, rotation;
    if (m.a !== 0 || m.c !== 0) {
      const hypotAc = Math.hypot(m.a, m.c);
      scaleX = hypotAc;
      scaleY = (m.a * m.d - m.b * m.c) / hypotAc;
      rotation = Math.acos(m.a / hypotAc) * (m.c > 0 ? -1 : 1);
    } else if (m.b !== 0 || m.d !== 0) {
      const hypotBd = Math.hypot(m.b, m.d);
      scaleX = (m.a * m.d - m.b * m.c) / hypotBd;
      scaleY = hypotBd;
      rotation = import_utils.TAU + Math.acos(m.b / hypotBd) * (m.d > 0 ? -1 : 1);
    } else {
      scaleX = 0;
      scaleY = 0;
      rotation = 0;
    }
    return {
      x: m.e,
      y: m.f,
      scaleX,
      scaleY,
      rotation: (0, import_utils.clampRadians)(rotation)
    };
  }
  static Smooth(m, precision = 1e10) {
    m.a = Math.round(m.a * precision) / precision;
    m.b = Math.round(m.b * precision) / precision;
    m.c = Math.round(m.c * precision) / precision;
    m.d = Math.round(m.d * precision) / precision;
    m.e = Math.round(m.e * precision) / precision;
    m.f = Math.round(m.f * precision) / precision;
    return m;
  }
  static toCssString(m) {
    return `matrix(${(0, import_utils.toDomPrecision)(m.a)}, ${(0, import_utils.toDomPrecision)(m.b)}, ${(0, import_utils.toDomPrecision)(
      m.c
    )}, ${(0, import_utils.toDomPrecision)(m.d)}, ${(0, import_utils.toDomPrecision)(m.e)}, ${(0, import_utils.toDomPrecision)(m.f)})`;
  }
  static applyToPoint(m, point) {
    return new import_Vec2d.Vec2d(
      m.a * point.x + m.c * point.y + m.e,
      m.b * point.x + m.d * point.y + m.f,
      point.z
    );
  }
  static applyToXY(m, x, y) {
    return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
  }
  static applyToPoints(m, points) {
    return points.map(
      (point) => new import_Vec2d.Vec2d(m.a * point.x + m.c * point.y + m.e, m.b * point.x + m.d * point.y + m.f, point.z)
    );
  }
  static applyToBounds(m, box) {
    return new import_Box2d.Box2d(m.e + box.minX, m.f + box.minY, box.width, box.height);
  }
  static From(m) {
    return new Matrix2d(m.a, m.b, m.c, m.d, m.e, m.f);
  }
  static Cast(m) {
    return m instanceof Matrix2d ? m : Matrix2d.From(m);
  }
}
function decomposeMatrix2d(m) {
  return {
    x: m.e,
    y: m.f,
    scaleX: Math.sqrt(m.a * m.a + m.b * m.b),
    scaleY: Math.sqrt(m.c * m.c + m.d * m.d),
    rotation: Math.atan2(m.b, m.a)
  };
}
//# sourceMappingURL=Matrix2d.js.map

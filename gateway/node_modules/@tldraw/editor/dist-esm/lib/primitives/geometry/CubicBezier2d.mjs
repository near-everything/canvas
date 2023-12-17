import { Vec2d } from "../Vec2d.mjs";
import { Polyline2d } from "./Polyline2d.mjs";
class CubicBezier2d extends Polyline2d {
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
        new Vec2d(
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
  return new Vec2d(
    (1 - t) * (1 - t) * (1 - t) * a.x + 3 * ((1 - t) * (1 - t)) * t * b.x + 3 * (1 - t) * (t * t) * c.x + t * t * t * d.x,
    (1 - t) * (1 - t) * (1 - t) * a.y + 3 * ((1 - t) * (1 - t)) * t * b.y + 3 * (1 - t) * (t * t) * c.y + t * t * t * d.y
  );
}
export {
  CubicBezier2d
};
//# sourceMappingURL=CubicBezier2d.mjs.map

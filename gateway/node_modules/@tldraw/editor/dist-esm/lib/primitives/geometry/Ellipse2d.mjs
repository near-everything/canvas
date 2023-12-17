import { Box2d } from "../Box2d.mjs";
import { Vec2d } from "../Vec2d.mjs";
import { PI, PI2 } from "../utils.mjs";
import { Edge2d } from "./Edge2d.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
import { getVerticesCountForLength } from "./geometry-constants.mjs";
class Ellipse2d extends Geometry2d {
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
        this._edges.push(new Edge2d({ start, end }));
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
    const p = PI * (cx + cy) * (1 + 3 * q / (10 + Math.sqrt(4 - 3 * q)));
    const len = getVerticesCountForLength(p);
    const step = PI2 / len;
    const a = Math.cos(step);
    const b = Math.sin(step);
    let sin = 0;
    let cos = 1;
    let ts = 0;
    let tc = 1;
    const vertices = Array(len);
    for (let i = 0; i < len; i++) {
      vertices[i] = new Vec2d(cx + cx * cos, cy + cy * sin);
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
    return new Box2d(0, 0, this.w, this.h);
  }
}
export {
  Ellipse2d
};
//# sourceMappingURL=Ellipse2d.mjs.map

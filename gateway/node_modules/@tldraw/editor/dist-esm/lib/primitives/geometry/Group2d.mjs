import { Box2d } from "../Box2d.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
class Group2d extends Geometry2d {
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
    const corners = Box2d.FromPoints(this.vertices).corners;
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
export {
  Group2d
};
//# sourceMappingURL=Group2d.mjs.map

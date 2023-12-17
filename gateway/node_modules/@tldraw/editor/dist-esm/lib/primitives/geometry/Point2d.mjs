import { Vec2d } from "../Vec2d.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
class Point2d extends Geometry2d {
  point;
  constructor(config) {
    super({ ...config, isClosed: true, isFilled: true });
    const { point } = config;
    this.point = point;
  }
  getVertices() {
    return [this.point];
  }
  nearestPoint() {
    return this.point;
  }
  hitTestLineSegment(A, B, margin) {
    return Vec2d.DistanceToLineSegment(A, B, this.point) < margin;
  }
}
export {
  Point2d
};
//# sourceMappingURL=Point2d.mjs.map

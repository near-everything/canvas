import { Vec2d } from "../Vec2d.mjs";
import { intersectLineSegmentCircle } from "../intersect.mjs";
import { PI, PI2, shortAngleDist } from "../utils.mjs";
import { Geometry2d } from "./Geometry2d.mjs";
import { getVerticesCountForLength } from "./geometry-constants.mjs";
class Arc2d extends Geometry2d {
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
    this.angleStart = Vec2d.Angle(center, start);
    this.angleEnd = Vec2d.Angle(center, end);
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
    const intersection = intersectLineSegmentCircle(A, B, _center, radius);
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
    for (let i = 0, n = getVerticesCountForLength(Math.abs(length)); i < n + 1; i++) {
      const t = i / n * measure;
      const angle = angleStart + t;
      vertices.push(_center.clone().add(new Vec2d(Math.cos(angle), Math.sin(angle)).mul(radius)));
    }
    return vertices;
  }
}
function getPointInArcT(mAB, A, B, P) {
  let mAP;
  if (Math.abs(mAB) > PI) {
    mAP = shortAngleDist(A, P);
    const mPB = shortAngleDist(P, B);
    if (Math.abs(mAP) < Math.abs(mPB)) {
      return mAP / mAB;
    } else {
      return (mAB - mPB) / mAB;
    }
  } else {
    mAP = shortAngleDist(A, P);
    return mAP / mAB;
  }
}
function getArcMeasure(A, B, sweepFlag, largeArcFlag) {
  const m = 2 * ((B - A) % PI2) % PI2 - (B - A) % PI2;
  if (!largeArcFlag)
    return m;
  return (PI2 - Math.abs(m)) * (sweepFlag ? 1 : -1);
}
export {
  Arc2d
};
//# sourceMappingURL=Arc2d.mjs.map

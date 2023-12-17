import { Vec2d } from "@tldraw/editor";
const { PI } = Math;
const FIXED_PI = PI + 1e-4;
function getStrokeOutlinePoints(strokePoints, options = {}) {
  const { size = 16, smoothing = 0.5, start = {}, end = {}, last: isComplete = false } = options;
  const { cap: capStart = true } = start;
  const { cap: capEnd = true } = end;
  if (strokePoints.length === 0 || size <= 0) {
    return [];
  }
  const firstStrokePoint = strokePoints[0];
  const lastStrokePoint = strokePoints[strokePoints.length - 1];
  const totalLength = lastStrokePoint.runningLength;
  const taperStart = start.taper === false ? 0 : start.taper === true ? Math.max(size, totalLength) : start.taper;
  const taperEnd = end.taper === false ? 0 : end.taper === true ? Math.max(size, totalLength) : end.taper;
  const minDistance = Math.pow(size * smoothing, 2);
  const leftPts = [];
  const rightPts = [];
  let prevVector = strokePoints[0].vector;
  let pl = strokePoints[0].point;
  let pr = pl;
  let tl = pl;
  let tr = pr;
  let isPrevPointSharpCorner = false;
  let strokePoint;
  for (let i = 0; i < strokePoints.length; i++) {
    strokePoint = strokePoints[i];
    const { point, vector } = strokePoints[i];
    const prevDpr = strokePoint.vector.dpr(prevVector);
    const nextVector = (i < strokePoints.length - 1 ? strokePoints[i + 1] : strokePoints[i]).vector;
    const nextDpr = i < strokePoints.length - 1 ? nextVector.dpr(strokePoint.vector) : 1;
    const isPointSharpCorner = prevDpr < 0 && !isPrevPointSharpCorner;
    const isNextPointSharpCorner = nextDpr !== null && nextDpr < 0.2;
    if (isPointSharpCorner || isNextPointSharpCorner) {
      if (nextDpr > -0.62 && totalLength - strokePoint.runningLength > strokePoint.radius) {
        const offset2 = prevVector.clone().mul(strokePoint.radius);
        const cpr = prevVector.clone().cpr(nextVector);
        if (cpr < 0) {
          tl = Vec2d.Add(point, offset2);
          tr = Vec2d.Sub(point, offset2);
        } else {
          tl = Vec2d.Sub(point, offset2);
          tr = Vec2d.Add(point, offset2);
        }
        leftPts.push(tl);
        rightPts.push(tr);
      } else {
        const offset2 = prevVector.clone().mul(strokePoint.radius).per();
        const start2 = Vec2d.Sub(strokePoint.input, offset2);
        for (let step = 1 / 13, t = 0; t < 1; t += step) {
          tl = Vec2d.RotWith(start2, strokePoint.input, FIXED_PI * t);
          leftPts.push(tl);
          tr = Vec2d.RotWith(start2, strokePoint.input, FIXED_PI + FIXED_PI * -t);
          rightPts.push(tr);
        }
      }
      pl = tl;
      pr = tr;
      if (isNextPointSharpCorner) {
        isPrevPointSharpCorner = true;
      }
      continue;
    }
    isPrevPointSharpCorner = false;
    if (strokePoint === firstStrokePoint || strokePoint === lastStrokePoint) {
      const offset2 = Vec2d.Per(vector).mul(strokePoint.radius);
      leftPts.push(Vec2d.Sub(point, offset2));
      rightPts.push(Vec2d.Add(point, offset2));
      continue;
    }
    const offset = Vec2d.Lrp(nextVector, vector, nextDpr).per().mul(strokePoint.radius);
    tl = Vec2d.Sub(point, offset);
    if (i <= 1 || Vec2d.Dist2(pl, tl) > minDistance) {
      leftPts.push(tl);
      pl = tl;
    }
    tr = Vec2d.Add(point, offset);
    if (i <= 1 || Vec2d.Dist2(pr, tr) > minDistance) {
      rightPts.push(tr);
      pr = tr;
    }
    prevVector = vector;
    continue;
  }
  const firstPoint = firstStrokePoint.point;
  const lastPoint = strokePoints.length > 1 ? strokePoints[strokePoints.length - 1].point : Vec2d.AddXY(firstStrokePoint.point, 1, 1);
  if (strokePoints.length === 1) {
    if (!(taperStart || taperEnd) || isComplete) {
      const start2 = Vec2d.Add(
        firstPoint,
        Vec2d.Sub(firstPoint, lastPoint).uni().per().mul(-firstStrokePoint.radius)
      );
      const dotPts = [];
      for (let step = 1 / 13, t = step; t <= 1; t += step) {
        dotPts.push(Vec2d.RotWith(start2, firstPoint, FIXED_PI * 2 * t));
      }
      return dotPts;
    }
  }
  const startCap = [];
  if (taperStart || taperEnd && strokePoints.length === 1) {
  } else if (capStart) {
    for (let step = 1 / 8, t = step; t <= 1; t += step) {
      const pt = Vec2d.RotWith(rightPts[0], firstPoint, FIXED_PI * t);
      startCap.push(pt);
    }
  } else {
    const cornersVector = Vec2d.Sub(leftPts[0], rightPts[0]);
    const offsetA = Vec2d.Mul(cornersVector, 0.5);
    const offsetB = Vec2d.Mul(cornersVector, 0.51);
    startCap.push(
      Vec2d.Sub(firstPoint, offsetA),
      Vec2d.Sub(firstPoint, offsetB),
      Vec2d.Add(firstPoint, offsetB),
      Vec2d.Add(firstPoint, offsetA)
    );
  }
  const endCap = [];
  const direction = lastStrokePoint.vector.clone().per().neg();
  if (taperEnd || taperStart && strokePoints.length === 1) {
    endCap.push(lastPoint);
  } else if (capEnd) {
    const start2 = Vec2d.Add(lastPoint, Vec2d.Mul(direction, lastStrokePoint.radius));
    for (let step = 1 / 29, t = step; t < 1; t += step) {
      endCap.push(Vec2d.RotWith(start2, lastPoint, FIXED_PI * 3 * t));
    }
  } else {
    endCap.push(
      Vec2d.Add(lastPoint, Vec2d.Mul(direction, lastStrokePoint.radius)),
      Vec2d.Add(lastPoint, Vec2d.Mul(direction, lastStrokePoint.radius * 0.99)),
      Vec2d.Sub(lastPoint, Vec2d.Mul(direction, lastStrokePoint.radius * 0.99)),
      Vec2d.Sub(lastPoint, Vec2d.Mul(direction, lastStrokePoint.radius))
    );
  }
  return leftPts.concat(endCap, rightPts.reverse(), startCap);
}
export {
  getStrokeOutlinePoints
};
//# sourceMappingURL=getStrokeOutlinePoints.mjs.map

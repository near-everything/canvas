import {
  Polyline2d,
  Vec2d,
  toDomPrecision
} from "@tldraw/editor";
function getSvgPathForEdge(edge, first) {
  const { start, end } = edge;
  if (first) {
    return `M${toDomPrecision(start.x)},${toDomPrecision(start.y)} L${toDomPrecision(
      end.x
    )},${toDomPrecision(end.y)} `;
  }
  return `${toDomPrecision(end.x)},${toDomPrecision(end.y)} `;
}
function getSvgPathForBezierCurve(curve, first) {
  const { a, b, c, d } = curve;
  if (Vec2d.Equals(a, d))
    return "";
  return `${first ? `M${toDomPrecision(a.x)},${toDomPrecision(a.y)}` : ``}C${toDomPrecision(
    b.x
  )},${toDomPrecision(b.y)} ${toDomPrecision(c.x)},${toDomPrecision(c.y)} ${toDomPrecision(
    d.x
  )},${toDomPrecision(d.y)}`;
}
function getSvgPathForCubicSpline(spline, isClosed) {
  let d = spline.segments.reduce((d2, segment, i) => {
    return d2 + getSvgPathForBezierCurve(segment, i === 0);
  }, "");
  if (isClosed) {
    d += "Z";
  }
  return d;
}
function getSvgPathForPolylineSpline(spline, isClosed) {
  let d = spline.segments.reduce((d2, segment, i) => {
    return d2 + getSvgPathForEdge(segment, i === 0);
  }, "");
  if (isClosed) {
    d += "Z";
  }
  return d;
}
function getSvgPathForLineGeometry(spline, isClosed = false) {
  if (spline instanceof Polyline2d) {
    return getSvgPathForPolylineSpline(spline, isClosed);
  } else {
    return getSvgPathForCubicSpline(spline, isClosed);
  }
}
export {
  getSvgPathForBezierCurve,
  getSvgPathForCubicSpline,
  getSvgPathForEdge,
  getSvgPathForLineGeometry,
  getSvgPathForPolylineSpline
};
//# sourceMappingURL=svg.mjs.map

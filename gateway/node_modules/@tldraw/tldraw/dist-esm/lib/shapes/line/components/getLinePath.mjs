import { getSvgPathFromPoints } from "@tldraw/editor";
import { getStrokeOutlinePoints } from "../../shared/freehand/getStrokeOutlinePoints.mjs";
import { getStrokePoints } from "../../shared/freehand/getStrokePoints.mjs";
import { setStrokePointRadii } from "../../shared/freehand/setStrokePointRadii.mjs";
import { getSvgPathFromStrokePoints } from "../../shared/freehand/svg.mjs";
import { getSvgPathForLineGeometry } from "./svg.mjs";
function getLineDrawFreehandOptions(strokeWidth) {
  return {
    size: strokeWidth,
    thinning: 0.4,
    streamline: 0,
    smoothing: 0.5,
    simulatePressure: true,
    last: true
  };
}
function getLineSolidFreehandOptions(strokeWidth) {
  return {
    size: strokeWidth,
    thinning: 0,
    streamline: 0,
    smoothing: 0.5,
    simulatePressure: false,
    last: true
  };
}
function getLineStrokePoints(shape, spline, strokeWidth) {
  const points = spline.vertices;
  const options = getLineDrawFreehandOptions(strokeWidth);
  return getStrokePoints(points, options);
}
function getLineDrawStrokeOutlinePoints(shape, spline, strokeWidth) {
  const options = getLineDrawFreehandOptions(strokeWidth);
  return getStrokeOutlinePoints(
    setStrokePointRadii(getLineStrokePoints(shape, spline, strokeWidth), options),
    options
  );
}
function getLineSolidStrokeOutlinePoints(shape, spline, strokeWidth) {
  const options = getLineSolidFreehandOptions(strokeWidth);
  return getStrokeOutlinePoints(getLineStrokePoints(shape, spline, strokeWidth), options);
}
function getLineDrawPath(shape, spline, strokeWidth) {
  const stroke = getLineDrawStrokeOutlinePoints(shape, spline, strokeWidth);
  return getSvgPathFromPoints(stroke);
}
function getLineSolidPath(shape, spline, strokeWidth) {
  const outlinePoints = getLineSolidStrokeOutlinePoints(shape, spline, strokeWidth);
  return getSvgPathFromPoints(outlinePoints);
}
function getLineIndicatorPath(shape, spline, strokeWidth) {
  if (shape.props.dash === "draw") {
    const strokePoints = getLineStrokePoints(shape, spline, strokeWidth);
    return getSvgPathFromStrokePoints(strokePoints);
  }
  return getSvgPathForLineGeometry(spline);
}
export {
  getLineDrawFreehandOptions,
  getLineDrawPath,
  getLineDrawStrokeOutlinePoints,
  getLineIndicatorPath,
  getLineSolidFreehandOptions,
  getLineSolidPath,
  getLineSolidStrokeOutlinePoints,
  getLineStrokePoints
};
//# sourceMappingURL=getLinePath.mjs.map

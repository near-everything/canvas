import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  EASINGS,
  PI2,
  TAU,
  Vec2d,
  getSvgPathFromPoints,
  perimeterOfEllipse,
  rng
} from "@tldraw/editor";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { getStrokeOutlinePoints } from "../../shared/freehand/getStrokeOutlinePoints.mjs";
import { getStrokePoints } from "../../shared/freehand/getStrokePoints.mjs";
import { setStrokePointRadii } from "../../shared/freehand/setStrokePointRadii.mjs";
import { getSvgPathFromStrokePoints } from "../../shared/freehand/svg.mjs";
const DrawStyleEllipse = React.memo(function DrawStyleEllipse2({
  id,
  w,
  h,
  strokeWidth: sw,
  fill,
  color
}) {
  const theme = useDefaultColorTheme();
  const innerPath = getEllipseIndicatorPath(id, w, h, sw);
  const outerPath = getEllipsePath(id, w, h, sw);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d: innerPath, color, fill }),
    /* @__PURE__ */ jsx("path", { d: outerPath, fill: theme[color].solid, strokeWidth: 0, pointerEvents: "all" })
  ] });
});
function DrawStyleEllipseSvg({
  id,
  w,
  h,
  strokeWidth: sw,
  fill,
  color,
  theme
}) {
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", getEllipsePath(id, w, h, sw));
  strokeElement.setAttribute("fill", theme[color].solid);
  const fillElement = getShapeFillSvg({
    d: getEllipseIndicatorPath(id, w, h, sw),
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
function getEllipseStrokeOptions(strokeWidth) {
  return {
    size: 1 + strokeWidth,
    thinning: 0.25,
    end: { taper: strokeWidth },
    start: { taper: strokeWidth },
    streamline: 0,
    smoothing: 1,
    simulatePressure: false
  };
}
function getEllipseStrokePoints(id, width, height, strokeWidth) {
  const getRandom = rng(id);
  const rx = width / 2;
  const ry = height / 2;
  const perimeter = perimeterOfEllipse(rx, ry);
  const points = [];
  const start = PI2 * getRandom();
  const length = PI2 + TAU / 2 + Math.abs(getRandom()) * TAU;
  const count = Math.max(16, perimeter / 10);
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const r = start + t * length;
    const c = Math.cos(r);
    const s = Math.sin(r);
    points.push(
      new Vec2d(
        rx * c + width * 0.5 + 0.05 * getRandom(),
        ry * s + height / 2 + 0.05 * getRandom(),
        Math.min(
          1,
          0.5 + Math.abs(0.5 - (getRandom() > 0 ? EASINGS.easeInOutSine(t) : EASINGS.easeInExpo(t))) / 2
        )
      )
    );
  }
  return getStrokePoints(points, getEllipseStrokeOptions(strokeWidth));
}
function getEllipsePath(id, width, height, strokeWidth) {
  const options = getEllipseStrokeOptions(strokeWidth);
  return getSvgPathFromPoints(
    getStrokeOutlinePoints(
      setStrokePointRadii(getEllipseStrokePoints(id, width, height, strokeWidth), options),
      options
    )
  );
}
function getEllipseIndicatorPath(id, width, height, strokeWidth) {
  return getSvgPathFromStrokePoints(getEllipseStrokePoints(id, width, height, strokeWidth));
}
export {
  DrawStyleEllipse,
  DrawStyleEllipseSvg,
  getEllipseIndicatorPath,
  getEllipsePath,
  getEllipseStrokeOptions,
  getEllipseStrokePoints
};
//# sourceMappingURL=DrawStyleEllipse.mjs.map

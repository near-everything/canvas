import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { getRoundedInkyPolygonPath, getRoundedPolygonPoints } from "../../shared/polygon-helpers.mjs";
const DrawStylePolygon = React.memo(function DrawStylePolygon2({
  id,
  outline,
  lines,
  fill,
  color,
  strokeWidth
}) {
  const theme = useDefaultColorTheme();
  const polygonPoints = getRoundedPolygonPoints(id, outline, strokeWidth / 3, strokeWidth * 2, 2);
  let strokePathData = getRoundedInkyPolygonPath(polygonPoints);
  if (lines) {
    for (const [A, B] of lines) {
      strokePathData += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  const innerPolygonPoints = getRoundedPolygonPoints(id, outline, 0, strokeWidth * 2, 1);
  const innerPathData = getRoundedInkyPolygonPath(innerPolygonPoints);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { d: innerPathData, fill, color, theme }),
    /* @__PURE__ */ jsx("path", { d: strokePathData, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function DrawStylePolygonSvg({
  id,
  outline,
  lines,
  fill,
  color,
  theme,
  strokeWidth
}) {
  const polygonPoints = getRoundedPolygonPoints(id, outline, strokeWidth / 3, strokeWidth * 2, 2);
  let strokePathData = getRoundedInkyPolygonPath(polygonPoints);
  if (lines) {
    for (const [A, B] of lines) {
      strokePathData += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  const innerPolygonPoints = getRoundedPolygonPoints(id, outline, 0, strokeWidth * 2, 1);
  const innerPathData = getRoundedInkyPolygonPath(innerPolygonPoints);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", strokePathData);
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  const fillElement = getShapeFillSvg({
    d: innerPathData,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  DrawStylePolygon,
  DrawStylePolygonSvg
};
//# sourceMappingURL=DrawStylePolygon.mjs.map

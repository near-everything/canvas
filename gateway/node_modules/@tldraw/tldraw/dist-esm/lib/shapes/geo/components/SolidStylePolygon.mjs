import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
const SolidStylePolygon = React.memo(function SolidStylePolygon2({
  outline,
  lines,
  fill,
  color,
  strokeWidth
}) {
  const theme = useDefaultColorTheme();
  let path = "M" + outline[0] + "L" + outline.slice(1) + "Z";
  if (lines) {
    for (const [A, B] of lines) {
      path += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { d: path, fill, color, theme }),
    /* @__PURE__ */ jsx("path", { d: path, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function SolidStylePolygonSvg({
  outline,
  lines,
  fill,
  color,
  strokeWidth,
  theme
}) {
  const pathData = "M" + outline[0] + "L" + outline.slice(1) + "Z";
  const fillPathData = pathData;
  let strokePathData = pathData;
  if (lines) {
    for (const [A, B] of lines) {
      strokePathData += `M${A.x},${A.y}L${B.x},${B.y}`;
    }
  }
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", strokePathData);
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  const fillElement = getShapeFillSvg({
    d: fillPathData,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  SolidStylePolygon,
  SolidStylePolygonSvg
};
//# sourceMappingURL=SolidStylePolygon.mjs.map

import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Vec2d } from "@tldraw/editor";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { getPerfectDashProps } from "../../shared/getPerfectDashProps.mjs";
const DashStylePolygon = React.memo(function DashStylePolygon2({
  dash,
  fill,
  color,
  strokeWidth,
  outline,
  lines
}) {
  const theme = useDefaultColorTheme();
  const innerPath = "M" + outline[0] + "L" + outline.slice(1) + "Z";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d: innerPath, fill, color }),
    /* @__PURE__ */ jsxs("g", { strokeWidth, stroke: theme[color].solid, fill: "none", pointerEvents: "all", children: [
      Array.from(Array(outline.length)).map((_, i) => {
        const A = outline[i];
        const B = outline[(i + 1) % outline.length];
        const dist = Vec2d.Dist(A, B);
        const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(dist, strokeWidth, {
          style: dash,
          start: "outset",
          end: "outset"
        });
        return /* @__PURE__ */ jsx(
          "line",
          {
            x1: A.x,
            y1: A.y,
            x2: B.x,
            y2: B.y,
            strokeDasharray,
            strokeDashoffset
          },
          i
        );
      }),
      lines && lines.map(([A, B], i) => {
        const dist = Vec2d.Dist(A, B);
        const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(dist, strokeWidth, {
          style: dash,
          start: "skip",
          end: "outset",
          snap: dash === "dotted" ? 4 : void 0
        });
        return /* @__PURE__ */ jsx(
          "path",
          {
            d: `M${A.x},${A.y}L${B.x},${B.y}`,
            stroke: theme[color].solid,
            strokeWidth,
            fill: "none",
            strokeDasharray,
            strokeDashoffset
          },
          `line_fg_${i}`
        );
      })
    ] })
  ] });
});
function DashStylePolygonSvg({
  dash,
  fill,
  color,
  theme,
  strokeWidth,
  outline,
  lines
}) {
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  Array.from(Array(outline.length)).forEach((_, i) => {
    const A = outline[i];
    const B = outline[(i + 1) % outline.length];
    const dist = Vec2d.Dist(A, B);
    const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(dist, strokeWidth, {
      style: dash
    });
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", A.x.toString());
    line.setAttribute("y1", A.y.toString());
    line.setAttribute("x2", B.x.toString());
    line.setAttribute("y2", B.y.toString());
    line.setAttribute("stroke-dasharray", strokeDasharray.toString());
    line.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
    strokeElement.appendChild(line);
  });
  if (lines) {
    for (const [A, B] of lines) {
      const dist = Vec2d.Dist(A, B);
      const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(dist, strokeWidth, {
        style: dash,
        start: "skip",
        end: "skip",
        snap: dash === "dotted" ? 4 : 2
      });
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", A.x.toString());
      line.setAttribute("y1", A.y.toString());
      line.setAttribute("x2", B.x.toString());
      line.setAttribute("y2", B.y.toString());
      line.setAttribute("stroke-dasharray", strokeDasharray.toString());
      line.setAttribute("stroke-dashoffset", strokeDashoffset.toString());
      strokeElement.appendChild(line);
    }
  }
  const fillElement = getShapeFillSvg({
    d: "M" + outline[0] + "L" + outline.slice(1) + "Z",
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  DashStylePolygon,
  DashStylePolygonSvg
};
//# sourceMappingURL=DashStylePolygon.mjs.map

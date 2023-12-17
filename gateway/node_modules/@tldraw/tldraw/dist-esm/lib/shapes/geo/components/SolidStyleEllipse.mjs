import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
const SolidStyleEllipse = React.memo(function SolidStyleEllipse2({
  w,
  h,
  strokeWidth: sw,
  fill,
  color
}) {
  const theme = useDefaultColorTheme();
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.max(0, cx);
  const ry = Math.max(0, cy);
  const d = `M${cx - rx},${cy}a${rx},${ry},0,1,1,${rx * 2},0a${rx},${ry},0,1,1,-${rx * 2},0`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { d, color, fill, theme }),
    /* @__PURE__ */ jsx("path", { d, stroke: theme[color].solid, strokeWidth: sw, fill: "none" })
  ] });
});
function SolidStyleEllipseSvg({
  w,
  h,
  strokeWidth: sw,
  fill,
  color,
  theme
}) {
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.max(0, cx);
  const ry = Math.max(0, cy);
  const d = `M${cx - rx},${cy}a${rx},${ry},0,1,1,${rx * 2},0a${rx},${ry},0,1,1,-${rx * 2},0`;
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", d);
  strokeElement.setAttribute("stroke-width", sw.toString());
  strokeElement.setAttribute("width", w.toString());
  strokeElement.setAttribute("height", h.toString());
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  const fillElement = getShapeFillSvg({
    d,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  SolidStyleEllipse,
  SolidStyleEllipseSvg
};
//# sourceMappingURL=SolidStyleEllipse.mjs.map

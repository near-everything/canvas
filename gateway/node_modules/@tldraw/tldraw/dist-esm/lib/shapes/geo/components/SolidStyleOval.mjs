import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
const SolidStyleOval = React.memo(function SolidStyleOval2({
  w,
  h,
  strokeWidth: sw,
  fill,
  color
}) {
  const theme = useDefaultColorTheme();
  const d = getOvalIndicatorPath(w, h);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { d, color, fill, theme }),
    /* @__PURE__ */ jsx("path", { d, stroke: theme[color].solid, strokeWidth: sw, fill: "none" })
  ] });
});
function SolidStyleOvalSvg({
  w,
  h,
  strokeWidth: sw,
  fill,
  color,
  theme
}) {
  const d = getOvalIndicatorPath(w, h);
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
function getOvalIndicatorPath(w, h) {
  let d;
  if (h > w) {
    const offset = w / 2;
    d = `
    M0,${offset}
    a${offset},${offset},0,1,1,${offset * 2},0
    L${w},${h - offset}
    a${offset},${offset},0,1,1,-${offset * 2},0
    Z`;
  } else {
    const offset = h / 2;
    d = `
    M${offset},0
    L${w - offset},0
    a${offset},${offset},0,1,1,0,${offset * 2}
    L${offset},${h}
    a${offset},${offset},0,1,1,0,${-offset * 2}
    Z`;
  }
  return d;
}
export {
  SolidStyleOval,
  SolidStyleOvalSvg,
  getOvalIndicatorPath
};
//# sourceMappingURL=SolidStyleOval.mjs.map

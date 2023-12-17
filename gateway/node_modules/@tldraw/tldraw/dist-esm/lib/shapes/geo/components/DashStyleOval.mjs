import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toDomPrecision } from "@tldraw/editor";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { getPerfectDashProps } from "../../shared/getPerfectDashProps.mjs";
import { getOvalPerimeter, getOvalSolidPath } from "../helpers.mjs";
const DashStyleOval = React.memo(function DashStyleOval2({
  w,
  h,
  strokeWidth: sw,
  dash,
  color,
  fill
}) {
  const theme = useDefaultColorTheme();
  const d = getOvalSolidPath(w, h);
  const perimeter = getOvalPerimeter(w, h);
  const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
    perimeter < 64 ? perimeter * 2 : perimeter,
    sw,
    {
      style: dash,
      snap: 4,
      start: "outset",
      end: "outset",
      closed: true
    }
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d, color, fill }),
    /* @__PURE__ */ jsx(
      "path",
      {
        d,
        strokeWidth: sw,
        width: toDomPrecision(w),
        height: toDomPrecision(h),
        fill: "none",
        stroke: theme[color].solid,
        strokeDasharray,
        strokeDashoffset,
        pointerEvents: "all"
      }
    )
  ] });
});
function DashStyleOvalSvg({
  w,
  h,
  strokeWidth: sw,
  dash,
  color,
  theme,
  fill
}) {
  const d = getOvalSolidPath(w, h);
  const perimeter = getOvalPerimeter(w, h);
  const { strokeDasharray, strokeDashoffset } = getPerfectDashProps(
    perimeter < 64 ? perimeter * 2 : perimeter,
    sw,
    {
      style: dash,
      snap: 4,
      closed: true
    }
  );
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", d);
  strokeElement.setAttribute("stroke-width", sw.toString());
  strokeElement.setAttribute("width", w.toString());
  strokeElement.setAttribute("height", h.toString());
  strokeElement.setAttribute("fill", "none");
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("stroke-dasharray", strokeDasharray);
  strokeElement.setAttribute("stroke-dashoffset", strokeDashoffset);
  const fillElement = getShapeFillSvg({
    d,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  DashStyleOval,
  DashStyleOvalSvg
};
//# sourceMappingURL=DashStyleOval.mjs.map

import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { cloudSvgPath } from "../cloudOutline.mjs";
const SolidStyleCloud = React.memo(function SolidStyleCloud2({
  fill,
  color,
  strokeWidth,
  w,
  h,
  id,
  size
}) {
  const theme = useDefaultColorTheme();
  const path = cloudSvgPath(w, h, id, size);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d: path, fill, color }),
    /* @__PURE__ */ jsx("path", { d: path, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function SolidStyleCloudSvg({
  fill,
  color,
  strokeWidth,
  theme,
  w,
  h,
  id,
  size
}) {
  const pathData = cloudSvgPath(w, h, id, size);
  const strokeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  strokeElement.setAttribute("d", pathData);
  strokeElement.setAttribute("stroke-width", strokeWidth.toString());
  strokeElement.setAttribute("stroke", theme[color].solid);
  strokeElement.setAttribute("fill", "none");
  const fillElement = getShapeFillSvg({
    d: pathData,
    fill,
    color,
    theme
  });
  return getSvgWithShapeFill(strokeElement, fillElement);
}
export {
  SolidStyleCloud,
  SolidStyleCloudSvg
};
//# sourceMappingURL=SolidStyleCloud.mjs.map

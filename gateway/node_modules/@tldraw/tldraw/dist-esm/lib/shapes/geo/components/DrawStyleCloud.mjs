import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import {
  ShapeFill,
  getShapeFillSvg,
  getSvgWithShapeFill,
  useDefaultColorTheme
} from "../../shared/ShapeFill.mjs";
import { inkyCloudSvgPath } from "../cloudOutline.mjs";
const DrawStyleCloud = React.memo(function StyleCloud({
  fill,
  color,
  strokeWidth,
  w,
  h,
  id,
  size
}) {
  const theme = useDefaultColorTheme();
  const path = inkyCloudSvgPath(w, h, id, size);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ShapeFill, { theme, d: path, fill, color }),
    /* @__PURE__ */ jsx("path", { d: path, stroke: theme[color].solid, strokeWidth, fill: "none" })
  ] });
});
function DrawStyleCloudSvg({
  fill,
  color,
  strokeWidth,
  theme,
  w,
  h,
  id,
  size
}) {
  const pathData = inkyCloudSvgPath(w, h, id, size);
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
  DrawStyleCloud,
  DrawStyleCloudSvg
};
//# sourceMappingURL=DrawStyleCloud.mjs.map

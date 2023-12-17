"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DrawStyleEllipse_exports = {};
__export(DrawStyleEllipse_exports, {
  DrawStyleEllipse: () => DrawStyleEllipse,
  DrawStyleEllipseSvg: () => DrawStyleEllipseSvg,
  getEllipseIndicatorPath: () => getEllipseIndicatorPath,
  getEllipsePath: () => getEllipsePath,
  getEllipseStrokeOptions: () => getEllipseStrokeOptions,
  getEllipseStrokePoints: () => getEllipseStrokePoints
});
module.exports = __toCommonJS(DrawStyleEllipse_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var React = __toESM(require("react"));
var import_ShapeFill = require("../../shared/ShapeFill");
var import_getStrokeOutlinePoints = require("../../shared/freehand/getStrokeOutlinePoints");
var import_getStrokePoints = require("../../shared/freehand/getStrokePoints");
var import_setStrokePointRadii = require("../../shared/freehand/setStrokePointRadii");
var import_svg = require("../../shared/freehand/svg");
const DrawStyleEllipse = React.memo(function DrawStyleEllipse2({
  id,
  w,
  h,
  strokeWidth: sw,
  fill,
  color
}) {
  const theme = (0, import_ShapeFill.useDefaultColorTheme)();
  const innerPath = getEllipseIndicatorPath(id, w, h, sw);
  const outerPath = getEllipsePath(id, w, h, sw);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ShapeFill.ShapeFill, { theme, d: innerPath, color, fill }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: outerPath, fill: theme[color].solid, strokeWidth: 0, pointerEvents: "all" })
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
  const fillElement = (0, import_ShapeFill.getShapeFillSvg)({
    d: getEllipseIndicatorPath(id, w, h, sw),
    fill,
    color,
    theme
  });
  return (0, import_ShapeFill.getSvgWithShapeFill)(strokeElement, fillElement);
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
  const getRandom = (0, import_editor.rng)(id);
  const rx = width / 2;
  const ry = height / 2;
  const perimeter = (0, import_editor.perimeterOfEllipse)(rx, ry);
  const points = [];
  const start = import_editor.PI2 * getRandom();
  const length = import_editor.PI2 + import_editor.TAU / 2 + Math.abs(getRandom()) * import_editor.TAU;
  const count = Math.max(16, perimeter / 10);
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const r = start + t * length;
    const c = Math.cos(r);
    const s = Math.sin(r);
    points.push(
      new import_editor.Vec2d(
        rx * c + width * 0.5 + 0.05 * getRandom(),
        ry * s + height / 2 + 0.05 * getRandom(),
        Math.min(
          1,
          0.5 + Math.abs(0.5 - (getRandom() > 0 ? import_editor.EASINGS.easeInOutSine(t) : import_editor.EASINGS.easeInExpo(t))) / 2
        )
      )
    );
  }
  return (0, import_getStrokePoints.getStrokePoints)(points, getEllipseStrokeOptions(strokeWidth));
}
function getEllipsePath(id, width, height, strokeWidth) {
  const options = getEllipseStrokeOptions(strokeWidth);
  return (0, import_editor.getSvgPathFromPoints)(
    (0, import_getStrokeOutlinePoints.getStrokeOutlinePoints)(
      (0, import_setStrokePointRadii.setStrokePointRadii)(getEllipseStrokePoints(id, width, height, strokeWidth), options),
      options
    )
  );
}
function getEllipseIndicatorPath(id, width, height, strokeWidth) {
  return (0, import_svg.getSvgPathFromStrokePoints)(getEllipseStrokePoints(id, width, height, strokeWidth));
}
//# sourceMappingURL=DrawStyleEllipse.js.map

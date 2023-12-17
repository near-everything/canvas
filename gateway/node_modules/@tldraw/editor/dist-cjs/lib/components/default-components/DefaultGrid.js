"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var DefaultGrid_exports = {};
__export(DefaultGrid_exports, {
  DefaultGrid: () => DefaultGrid
});
module.exports = __toCommonJS(DefaultGrid_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_utils = require("@tldraw/utils");
var import_constants = require("../../constants");
const DefaultGrid = ({ x, y, z, size }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "tl-grid", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: import_constants.GRID_STEPS.map(({ min, mid, step }, i) => {
      const s = step * size * z;
      const xo = 0.5 + x * z;
      const yo = 0.5 + y * z;
      const gxo = xo > 0 ? xo % s : s + xo % s;
      const gyo = yo > 0 ? yo % s : s + yo % s;
      const opacity = z < mid ? (0, import_utils.modulate)(z, [min, mid], [0, 1]) : 1;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "pattern",
        {
          id: `grid-${step}`,
          width: s,
          height: s,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "tl-grid-dot", cx: gxo, cy: gyo, r: 1, opacity })
        },
        `grid-pattern-${i}`
      );
    }) }),
    import_constants.GRID_STEPS.map(({ step }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100%", height: "100%", fill: `url(#grid-${step})` }, `grid-rect-${i}`))
  ] });
};
//# sourceMappingURL=DefaultGrid.js.map

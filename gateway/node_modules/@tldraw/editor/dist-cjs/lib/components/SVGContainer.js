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
var SVGContainer_exports = {};
__export(SVGContainer_exports, {
  SVGContainer: () => SVGContainer
});
module.exports = __toCommonJS(SVGContainer_exports);
var import_jsx_runtime = require("react/jsx-runtime");
function SVGContainer({ children, className = "", ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...rest, className: `tl-svg-container ${className}`, children });
}
//# sourceMappingURL=SVGContainer.js.map

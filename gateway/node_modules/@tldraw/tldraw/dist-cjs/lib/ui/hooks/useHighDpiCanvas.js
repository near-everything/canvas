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
var useHighDpiCanvas_exports = {};
__export(useHighDpiCanvas_exports, {
  useHighDpiCanvas: () => useHighDpiCanvas
});
module.exports = __toCommonJS(useHighDpiCanvas_exports);
var import_react = require("react");
function useHighDpiCanvas(ref, dpr) {
  (0, import_react.useLayoutEffect)(() => {
    const canvas = ref.current;
    if (!canvas)
      return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }, [ref, dpr]);
}
//# sourceMappingURL=useHighDpiCanvas.js.map

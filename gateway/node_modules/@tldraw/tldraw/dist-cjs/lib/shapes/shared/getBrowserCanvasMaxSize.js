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
var getBrowserCanvasMaxSize_exports = {};
__export(getBrowserCanvasMaxSize_exports, {
  getBrowserCanvasMaxSize: () => getBrowserCanvasMaxSize
});
module.exports = __toCommonJS(getBrowserCanvasMaxSize_exports);
var import_canvas_size = __toESM(require("canvas-size"));
let maxSizePromise = null;
function getBrowserCanvasMaxSize() {
  if (!maxSizePromise) {
    maxSizePromise = calculateBrowserCanvasMaxSize();
  }
  return maxSizePromise;
}
async function calculateBrowserCanvasMaxSize() {
  const maxWidth = await import_canvas_size.default.maxWidth({ usePromise: true });
  const maxHeight = await import_canvas_size.default.maxHeight({ usePromise: true });
  const maxArea = await import_canvas_size.default.maxArea({ usePromise: true });
  return {
    maxWidth: maxWidth.width,
    maxHeight: maxHeight.height,
    maxArea: maxArea.width * maxArea.height
  };
}
//# sourceMappingURL=getBrowserCanvasMaxSize.js.map

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
var helpers_exports = {};
__export(helpers_exports, {
  getOvalPerimeter: () => getOvalPerimeter,
  getOvalSolidPath: () => getOvalSolidPath
});
module.exports = __toCommonJS(helpers_exports);
var import_editor = require("@tldraw/editor");
function getOvalSolidPath(w, h) {
  if (h > w) {
    const offset2 = w / 2;
    return `
    M0,${offset2}
    a${offset2},${offset2},0,1,1,${offset2 * 2},0
    L${w},${h - offset2}
    a${offset2},${offset2},0,1,1,-${offset2 * 2},0
    Z`;
  }
  const offset = h / 2;
  return `
    M${offset},0
    L${w - offset},0
    a${offset},${offset},0,1,1,0,${offset * 2}
    L${offset},${h}
    a${offset},${offset},0,1,1,0,${-offset * 2}
    Z`;
}
function getOvalPerimeter(h, w) {
  if (h > w) {
    const offset2 = w / 2;
    return (0, import_editor.perimeterOfEllipse)(offset2, offset2) + (h - offset2 * 2) * 2;
  }
  const offset = h / 2;
  return (0, import_editor.perimeterOfEllipse)(offset, offset) + (w - offset * 2) * 2;
}
//# sourceMappingURL=helpers.js.map

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
var TLHighlightShape_exports = {};
__export(TLHighlightShape_exports, {
  highlightShapeMigrations: () => highlightShapeMigrations,
  highlightShapeProps: () => highlightShapeProps
});
module.exports = __toCommonJS(TLHighlightShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
var import_TLDrawShape = require("./TLDrawShape");
const highlightShapeProps = {
  color: import_TLColorStyle.DefaultColorStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  segments: import_validate.T.arrayOf(import_TLDrawShape.DrawShapeSegment),
  isComplete: import_validate.T.boolean,
  isPen: import_validate.T.boolean
};
const highlightShapeMigrations = (0, import_store.defineMigrations)({});
//# sourceMappingURL=TLHighlightShape.js.map

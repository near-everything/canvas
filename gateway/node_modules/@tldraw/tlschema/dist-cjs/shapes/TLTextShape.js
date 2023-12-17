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
var TLTextShape_exports = {};
__export(TLTextShape_exports, {
  textShapeMigrations: () => textShapeMigrations,
  textShapeProps: () => textShapeProps
});
module.exports = __toCommonJS(TLTextShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLFontStyle = require("../styles/TLFontStyle");
var import_TLHorizontalAlignStyle = require("../styles/TLHorizontalAlignStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
const textShapeProps = {
  color: import_TLColorStyle.DefaultColorStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  font: import_TLFontStyle.DefaultFontStyle,
  align: import_TLHorizontalAlignStyle.DefaultHorizontalAlignStyle,
  w: import_validate.T.nonZeroNumber,
  text: import_validate.T.string,
  scale: import_validate.T.nonZeroNumber,
  autoSize: import_validate.T.boolean
};
const Versions = {
  RemoveJustify: 1
};
const textShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.RemoveJustify,
  migrators: {
    [Versions.RemoveJustify]: {
      up: (shape) => {
        let newAlign = shape.props.align;
        if (newAlign === "justify") {
          newAlign = "start";
        }
        return {
          ...shape,
          props: {
            ...shape.props,
            align: newAlign
          }
        };
      },
      down: (shape) => {
        return { ...shape };
      }
    }
  }
});
//# sourceMappingURL=TLTextShape.js.map

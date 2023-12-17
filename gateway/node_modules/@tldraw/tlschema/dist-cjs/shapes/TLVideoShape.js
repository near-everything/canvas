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
var TLVideoShape_exports = {};
__export(TLVideoShape_exports, {
  videoShapeMigrations: () => videoShapeMigrations,
  videoShapeProps: () => videoShapeProps
});
module.exports = __toCommonJS(TLVideoShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLBaseAsset = require("../assets/TLBaseAsset");
const videoShapeProps = {
  w: import_validate.T.nonZeroNumber,
  h: import_validate.T.nonZeroNumber,
  time: import_validate.T.number,
  playing: import_validate.T.boolean,
  url: import_validate.T.string,
  assetId: import_TLBaseAsset.assetIdValidator.nullable()
};
const Versions = {
  AddUrlProp: 1
};
const videoShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddUrlProp,
  migrators: {
    [Versions.AddUrlProp]: {
      up: (shape) => {
        return { ...shape, props: { ...shape.props, url: "" } };
      },
      down: (shape) => {
        const { url: _, ...props } = shape.props;
        return { ...shape, props };
      }
    }
  }
});
//# sourceMappingURL=TLVideoShape.js.map

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
var TLBookmarkShape_exports = {};
__export(TLBookmarkShape_exports, {
  bookmarkShapeMigrations: () => bookmarkShapeMigrations,
  bookmarkShapeProps: () => bookmarkShapeProps
});
module.exports = __toCommonJS(TLBookmarkShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLBaseAsset = require("../assets/TLBaseAsset");
const bookmarkShapeProps = {
  w: import_validate.T.nonZeroNumber,
  h: import_validate.T.nonZeroNumber,
  assetId: import_TLBaseAsset.assetIdValidator.nullable(),
  url: import_validate.T.string
};
const Versions = {
  NullAssetId: 1
};
const bookmarkShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.NullAssetId,
  migrators: {
    [Versions.NullAssetId]: {
      up: (shape) => {
        if (shape.props.assetId === void 0) {
          return { ...shape, props: { ...shape.props, assetId: null } };
        }
        return shape;
      },
      down: (shape) => {
        if (shape.props.assetId === null) {
          const { assetId: _, ...props } = shape.props;
          return { ...shape, props };
        }
        return shape;
      }
    }
  }
});
//# sourceMappingURL=TLBookmarkShape.js.map

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
var TLImageShape_exports = {};
__export(TLImageShape_exports, {
  ImageShapeCrop: () => ImageShapeCrop,
  imageShapeMigrations: () => imageShapeMigrations,
  imageShapeProps: () => imageShapeProps
});
module.exports = __toCommonJS(TLImageShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLBaseAsset = require("../assets/TLBaseAsset");
var import_geometry_types = require("../misc/geometry-types");
const ImageShapeCrop = import_validate.T.object({
  topLeft: import_geometry_types.vec2dModelValidator,
  bottomRight: import_geometry_types.vec2dModelValidator
});
const imageShapeProps = {
  w: import_validate.T.nonZeroNumber,
  h: import_validate.T.nonZeroNumber,
  playing: import_validate.T.boolean,
  url: import_validate.T.string,
  assetId: import_TLBaseAsset.assetIdValidator.nullable(),
  crop: ImageShapeCrop.nullable()
};
const Versions = {
  AddUrlProp: 1,
  AddCropProp: 2
};
const imageShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddCropProp,
  migrators: {
    [Versions.AddUrlProp]: {
      up: (shape) => {
        return { ...shape, props: { ...shape.props, url: "" } };
      },
      down: (shape) => {
        const { url: _, ...props } = shape.props;
        return { ...shape, props };
      }
    },
    [Versions.AddCropProp]: {
      up: (shape) => {
        return { ...shape, props: { ...shape.props, crop: null } };
      },
      down: (shape) => {
        const { crop: _, ...props } = shape.props;
        return { ...shape, props };
      }
    }
  }
});
//# sourceMappingURL=TLImageShape.js.map

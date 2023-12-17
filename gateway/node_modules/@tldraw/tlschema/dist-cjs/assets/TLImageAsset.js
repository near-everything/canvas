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
var TLImageAsset_exports = {};
__export(TLImageAsset_exports, {
  imageAssetMigrations: () => imageAssetMigrations,
  imageAssetValidator: () => imageAssetValidator
});
module.exports = __toCommonJS(TLImageAsset_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLBaseAsset = require("./TLBaseAsset");
const imageAssetValidator = (0, import_TLBaseAsset.createAssetValidator)(
  "image",
  import_validate.T.object({
    w: import_validate.T.number,
    h: import_validate.T.number,
    name: import_validate.T.string,
    isAnimated: import_validate.T.boolean,
    mimeType: import_validate.T.string.nullable(),
    src: import_validate.T.string.nullable()
  })
);
const Versions = {
  AddIsAnimated: 1,
  RenameWidthHeight: 2
};
const imageAssetMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.RenameWidthHeight,
  migrators: {
    [Versions.AddIsAnimated]: {
      up: (asset) => {
        return {
          ...asset,
          props: {
            ...asset.props,
            isAnimated: false
          }
        };
      },
      down: (asset) => {
        const { isAnimated, ...rest } = asset.props;
        return {
          ...asset,
          props: rest
        };
      }
    },
    [Versions.RenameWidthHeight]: {
      up: (asset) => {
        const { width, height, ...others } = asset.props;
        return { ...asset, props: { w: width, h: height, ...others } };
      },
      down: (asset) => {
        const { w, h, ...others } = asset.props;
        return { ...asset, props: { width: w, height: h, ...others } };
      }
    }
  }
});
//# sourceMappingURL=TLImageAsset.js.map

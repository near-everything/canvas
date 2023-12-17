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
var TLLineShape_exports = {};
__export(TLLineShape_exports, {
  LineShapeSplineStyle: () => LineShapeSplineStyle,
  lineShapeMigrations: () => lineShapeMigrations,
  lineShapeProps: () => lineShapeProps,
  lineShapeVersions: () => lineShapeVersions
});
module.exports = __toCommonJS(TLLineShape_exports);
var import_store = require("@tldraw/store");
var import_utils = require("@tldraw/utils");
var import_validate = require("@tldraw/validate");
var import_TLHandle = require("../misc/TLHandle");
var import_StyleProp = require("../styles/StyleProp");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLDashStyle = require("../styles/TLDashStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
const LineShapeSplineStyle = import_StyleProp.StyleProp.defineEnum("tldraw:spline", {
  defaultValue: "line",
  values: ["cubic", "line"]
});
const lineShapeProps = {
  color: import_TLColorStyle.DefaultColorStyle,
  dash: import_TLDashStyle.DefaultDashStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  spline: LineShapeSplineStyle,
  handles: import_validate.T.dict(import_validate.T.string, import_TLHandle.handleValidator)
};
const lineShapeVersions = {
  AddSnapHandles: 1
};
const lineShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: lineShapeVersions.AddSnapHandles,
  migrators: {
    [lineShapeVersions.AddSnapHandles]: {
      up: (record) => {
        const handles = (0, import_utils.deepCopy)(record.props.handles);
        for (const id in handles) {
          handles[id].canSnap = true;
        }
        return { ...record, props: { ...record.props, handles } };
      },
      down: (record) => {
        const handles = (0, import_utils.deepCopy)(record.props.handles);
        for (const id in handles) {
          delete handles[id].canSnap;
        }
        return { ...record, props: { ...record.props, handles } };
      }
    }
  }
});
//# sourceMappingURL=TLLineShape.js.map

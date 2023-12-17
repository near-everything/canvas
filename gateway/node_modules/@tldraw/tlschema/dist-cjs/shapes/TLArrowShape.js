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
var TLArrowShape_exports = {};
__export(TLArrowShape_exports, {
  ArrowShapeArrowheadEndStyle: () => ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle: () => ArrowShapeArrowheadStartStyle,
  arrowShapeMigrations: () => arrowShapeMigrations,
  arrowShapeProps: () => arrowShapeProps
});
module.exports = __toCommonJS(TLArrowShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_geometry_types = require("../misc/geometry-types");
var import_StyleProp = require("../styles/StyleProp");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLDashStyle = require("../styles/TLDashStyle");
var import_TLFillStyle = require("../styles/TLFillStyle");
var import_TLFontStyle = require("../styles/TLFontStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
var import_TLBaseShape = require("./TLBaseShape");
const arrowheadTypes = [
  "arrow",
  "triangle",
  "square",
  "dot",
  "pipe",
  "diamond",
  "inverted",
  "bar",
  "none"
];
const ArrowShapeArrowheadStartStyle = import_StyleProp.StyleProp.defineEnum("tldraw:arrowheadStart", {
  defaultValue: "none",
  values: arrowheadTypes
});
const ArrowShapeArrowheadEndStyle = import_StyleProp.StyleProp.defineEnum("tldraw:arrowheadEnd", {
  defaultValue: "arrow",
  values: arrowheadTypes
});
const ArrowShapeTerminal = import_validate.T.union("type", {
  binding: import_validate.T.object({
    type: import_validate.T.literal("binding"),
    boundShapeId: import_TLBaseShape.shapeIdValidator,
    normalizedAnchor: import_geometry_types.vec2dModelValidator,
    isExact: import_validate.T.boolean
  }),
  point: import_validate.T.object({
    type: import_validate.T.literal("point"),
    x: import_validate.T.number,
    y: import_validate.T.number
  })
});
const arrowShapeProps = {
  labelColor: import_TLColorStyle.DefaultLabelColorStyle,
  color: import_TLColorStyle.DefaultColorStyle,
  fill: import_TLFillStyle.DefaultFillStyle,
  dash: import_TLDashStyle.DefaultDashStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  arrowheadStart: ArrowShapeArrowheadStartStyle,
  arrowheadEnd: ArrowShapeArrowheadEndStyle,
  font: import_TLFontStyle.DefaultFontStyle,
  start: ArrowShapeTerminal,
  end: ArrowShapeTerminal,
  bend: import_validate.T.number,
  text: import_validate.T.string
};
const Versions = {
  AddLabelColor: 1
};
const arrowShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddLabelColor,
  migrators: {
    [Versions.AddLabelColor]: {
      up: (record) => {
        return {
          ...record,
          props: {
            ...record.props,
            labelColor: "black"
          }
        };
      },
      down: (record) => {
        const { labelColor: _, ...props } = record.props;
        return {
          ...record,
          props
        };
      }
    }
  }
});
//# sourceMappingURL=TLArrowShape.js.map

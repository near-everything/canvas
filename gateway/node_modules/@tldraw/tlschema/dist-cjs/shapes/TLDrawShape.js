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
var TLDrawShape_exports = {};
__export(TLDrawShape_exports, {
  DrawShapeSegment: () => DrawShapeSegment,
  drawShapeMigrations: () => drawShapeMigrations,
  drawShapeProps: () => drawShapeProps
});
module.exports = __toCommonJS(TLDrawShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_geometry_types = require("../misc/geometry-types");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLDashStyle = require("../styles/TLDashStyle");
var import_TLFillStyle = require("../styles/TLFillStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
const DrawShapeSegment = import_validate.T.object({
  type: import_validate.T.literalEnum("free", "straight"),
  points: import_validate.T.arrayOf(import_geometry_types.vec2dModelValidator)
});
const drawShapeProps = {
  color: import_TLColorStyle.DefaultColorStyle,
  fill: import_TLFillStyle.DefaultFillStyle,
  dash: import_TLDashStyle.DefaultDashStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  segments: import_validate.T.arrayOf(DrawShapeSegment),
  isComplete: import_validate.T.boolean,
  isClosed: import_validate.T.boolean,
  isPen: import_validate.T.boolean
};
const Versions = {
  AddInPen: 1
};
const drawShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddInPen,
  migrators: {
    [Versions.AddInPen]: {
      up: (shape) => {
        const { points } = shape.props.segments[0];
        if (points.length === 0) {
          return {
            ...shape,
            props: {
              ...shape.props,
              isPen: false
            }
          };
        }
        let isPen = !(points[0].z === 0 || points[0].z === 0.5);
        if (points[1]) {
          isPen = isPen && !(points[1].z === 0 || points[1].z === 0.5);
        }
        return {
          ...shape,
          props: {
            ...shape.props,
            isPen
          }
        };
      },
      down: (shape) => {
        const { isPen: _isPen, ...propsWithOutIsPen } = shape.props;
        return {
          ...shape,
          props: {
            ...propsWithOutIsPen
          }
        };
      }
    }
  }
});
//# sourceMappingURL=TLDrawShape.js.map

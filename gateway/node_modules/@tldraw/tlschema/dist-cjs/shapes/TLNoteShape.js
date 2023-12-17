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
var TLNoteShape_exports = {};
__export(TLNoteShape_exports, {
  noteShapeMigrations: () => noteShapeMigrations,
  noteShapeProps: () => noteShapeProps
});
module.exports = __toCommonJS(TLNoteShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLFontStyle = require("../styles/TLFontStyle");
var import_TLHorizontalAlignStyle = require("../styles/TLHorizontalAlignStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
var import_TLVerticalAlignStyle = require("../styles/TLVerticalAlignStyle");
const noteShapeProps = {
  color: import_TLColorStyle.DefaultColorStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  font: import_TLFontStyle.DefaultFontStyle,
  align: import_TLHorizontalAlignStyle.DefaultHorizontalAlignStyle,
  verticalAlign: import_TLVerticalAlignStyle.DefaultVerticalAlignStyle,
  growY: import_validate.T.positiveNumber,
  url: import_validate.T.string,
  text: import_validate.T.string
};
const Versions = {
  AddUrlProp: 1,
  RemoveJustify: 2,
  MigrateLegacyAlign: 3,
  AddVerticalAlign: 4
};
const noteShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddVerticalAlign,
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
    },
    [Versions.MigrateLegacyAlign]: {
      up: (shape) => {
        let newAlign;
        switch (shape.props.align) {
          case "start":
            newAlign = "start-legacy";
            break;
          case "end":
            newAlign = "end-legacy";
            break;
          default:
            newAlign = "middle-legacy";
            break;
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
        let oldAlign;
        switch (shape.props.align) {
          case "start-legacy":
            oldAlign = "start";
            break;
          case "end-legacy":
            oldAlign = "end";
            break;
          case "middle-legacy":
            oldAlign = "middle";
            break;
          default:
            oldAlign = shape.props.align;
        }
        return {
          ...shape,
          props: {
            ...shape.props,
            align: oldAlign
          }
        };
      }
    },
    [Versions.AddVerticalAlign]: {
      up: (shape) => {
        return {
          ...shape,
          props: {
            ...shape.props,
            verticalAlign: "middle"
          }
        };
      },
      down: (shape) => {
        const { verticalAlign: _, ...props } = shape.props;
        return {
          ...shape,
          props
        };
      }
    }
  }
});
//# sourceMappingURL=TLNoteShape.js.map

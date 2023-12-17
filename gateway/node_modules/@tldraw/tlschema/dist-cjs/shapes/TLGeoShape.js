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
var TLGeoShape_exports = {};
__export(TLGeoShape_exports, {
  GeoShapeGeoStyle: () => GeoShapeGeoStyle,
  GeoShapeVersions: () => Versions,
  geoShapeMigrations: () => geoShapeMigrations,
  geoShapeProps: () => geoShapeProps
});
module.exports = __toCommonJS(TLGeoShape_exports);
var import_store = require("@tldraw/store");
var import_validate = require("@tldraw/validate");
var import_StyleProp = require("../styles/StyleProp");
var import_TLColorStyle = require("../styles/TLColorStyle");
var import_TLDashStyle = require("../styles/TLDashStyle");
var import_TLFillStyle = require("../styles/TLFillStyle");
var import_TLFontStyle = require("../styles/TLFontStyle");
var import_TLHorizontalAlignStyle = require("../styles/TLHorizontalAlignStyle");
var import_TLSizeStyle = require("../styles/TLSizeStyle");
var import_TLVerticalAlignStyle = require("../styles/TLVerticalAlignStyle");
const GeoShapeGeoStyle = import_StyleProp.StyleProp.defineEnum("tldraw:geo", {
  defaultValue: "rectangle",
  values: [
    "cloud",
    "rectangle",
    "ellipse",
    "triangle",
    "diamond",
    "pentagon",
    "hexagon",
    "octagon",
    "star",
    "rhombus",
    "rhombus-2",
    "oval",
    "trapezoid",
    "arrow-right",
    "arrow-left",
    "arrow-up",
    "arrow-down",
    "x-box",
    "check-box"
  ]
});
const geoShapeProps = {
  geo: GeoShapeGeoStyle,
  labelColor: import_TLColorStyle.DefaultLabelColorStyle,
  color: import_TLColorStyle.DefaultColorStyle,
  fill: import_TLFillStyle.DefaultFillStyle,
  dash: import_TLDashStyle.DefaultDashStyle,
  size: import_TLSizeStyle.DefaultSizeStyle,
  font: import_TLFontStyle.DefaultFontStyle,
  align: import_TLHorizontalAlignStyle.DefaultHorizontalAlignStyle,
  verticalAlign: import_TLVerticalAlignStyle.DefaultVerticalAlignStyle,
  url: import_validate.T.string,
  w: import_validate.T.nonZeroNumber,
  h: import_validate.T.nonZeroNumber,
  growY: import_validate.T.positiveNumber,
  text: import_validate.T.string
};
const Versions = {
  AddUrlProp: 1,
  AddLabelColor: 2,
  RemoveJustify: 3,
  AddCheckBox: 4,
  AddVerticalAlign: 5,
  MigrateLegacyAlign: 6,
  AddCloud: 7
};
const geoShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: Versions.AddCloud,
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
    [Versions.AddCheckBox]: {
      up: (shape) => {
        return { ...shape };
      },
      down: (shape) => {
        return {
          ...shape,
          props: {
            ...shape.props,
            geo: shape.props.geo === "check-box" ? "rectangle" : shape.props.geo
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
    [Versions.AddCloud]: {
      up: (shape) => {
        return shape;
      },
      down: (shape) => {
        if (shape.props.geo === "cloud") {
          return {
            ...shape,
            props: {
              ...shape.props,
              geo: "rectangle"
            }
          };
        }
      }
    }
  }
});
//# sourceMappingURL=TLGeoShape.js.map

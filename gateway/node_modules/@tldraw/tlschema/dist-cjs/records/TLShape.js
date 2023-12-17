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
var TLShape_exports = {};
__export(TLShape_exports, {
  createShapeId: () => createShapeId,
  createShapeRecordType: () => createShapeRecordType,
  getShapePropKeysByStyle: () => getShapePropKeysByStyle,
  isShape: () => isShape,
  isShapeId: () => isShapeId,
  rootShapeMigrations: () => rootShapeMigrations,
  rootShapeVersions: () => rootShapeVersions
});
module.exports = __toCommonJS(TLShape_exports);
var import_store = require("@tldraw/store");
var import_utils = require("@tldraw/utils");
var import_validate = require("@tldraw/validate");
var import_nanoid = require("nanoid");
var import_TLBaseShape = require("../shapes/TLBaseShape");
var import_StyleProp = require("../styles/StyleProp");
const rootShapeVersions = {
  AddIsLocked: 1,
  HoistOpacity: 2,
  AddMeta: 3
};
const rootShapeMigrations = (0, import_store.defineMigrations)({
  currentVersion: rootShapeVersions.AddMeta,
  migrators: {
    [rootShapeVersions.AddIsLocked]: {
      up: (record) => {
        return {
          ...record,
          isLocked: false
        };
      },
      down: (record) => {
        const { isLocked: _, ...rest } = record;
        return {
          ...rest
        };
      }
    },
    [rootShapeVersions.HoistOpacity]: {
      up: ({ props: { opacity, ...props }, ...record }) => {
        return {
          ...record,
          opacity: Number(opacity ?? "1"),
          props
        };
      },
      down: ({ opacity, ...record }) => {
        return {
          ...record,
          props: {
            ...record.props,
            opacity: opacity < 0.175 ? "0.1" : opacity < 0.375 ? "0.25" : opacity < 0.625 ? "0.5" : opacity < 0.875 ? "0.75" : "1"
          }
        };
      }
    },
    [rootShapeVersions.AddMeta]: {
      up: (record) => {
        return {
          ...record,
          meta: {}
        };
      },
      down: ({ meta: _, ...record }) => {
        return {
          ...record
        };
      }
    }
  }
});
function isShape(record) {
  if (!record)
    return false;
  return record.typeName === "shape";
}
function isShapeId(id) {
  if (!id)
    return false;
  return id.startsWith("shape:");
}
function createShapeId(id) {
  return `shape:${id ?? (0, import_nanoid.nanoid)()}`;
}
function getShapePropKeysByStyle(props) {
  const propKeysByStyle = /* @__PURE__ */ new Map();
  for (const [key, prop] of Object.entries(props)) {
    if (prop instanceof import_StyleProp.StyleProp) {
      if (propKeysByStyle.has(prop)) {
        throw new Error(
          `Duplicate style prop ${prop.id}. Each style prop can only be used once within a shape.`
        );
      }
      propKeysByStyle.set(prop, key);
    }
  }
  return propKeysByStyle;
}
function createShapeRecordType(shapes) {
  return (0, import_store.createRecordType)("shape", {
    migrations: (0, import_store.defineMigrations)({
      currentVersion: rootShapeMigrations.currentVersion,
      firstVersion: rootShapeMigrations.firstVersion,
      migrators: rootShapeMigrations.migrators,
      subTypeKey: "type",
      subTypeMigrations: (0, import_utils.mapObjectMapValues)(shapes, (_, v) => v.migrations ?? (0, import_store.defineMigrations)({}))
    }),
    scope: "document",
    validator: import_validate.T.model(
      "shape",
      import_validate.T.union(
        "type",
        (0, import_utils.mapObjectMapValues)(
          shapes,
          (type, { props, meta }) => (0, import_TLBaseShape.createShapeValidator)(type, props, meta)
        )
      )
    )
  }).withDefaultProperties(() => ({
    x: 0,
    y: 0,
    rotation: 0,
    isLocked: false,
    opacity: 1,
    meta: {}
  }));
}
//# sourceMappingURL=TLShape.js.map

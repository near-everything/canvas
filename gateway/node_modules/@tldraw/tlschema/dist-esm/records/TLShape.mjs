import { createRecordType, defineMigrations } from "@tldraw/store";
import { mapObjectMapValues } from "@tldraw/utils";
import { T } from "@tldraw/validate";
import { nanoid } from "nanoid";
import { createShapeValidator } from "../shapes/TLBaseShape.mjs";
import { StyleProp } from "../styles/StyleProp.mjs";
const rootShapeVersions = {
  AddIsLocked: 1,
  HoistOpacity: 2,
  AddMeta: 3
};
const rootShapeMigrations = defineMigrations({
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
  return `shape:${id ?? nanoid()}`;
}
function getShapePropKeysByStyle(props) {
  const propKeysByStyle = /* @__PURE__ */ new Map();
  for (const [key, prop] of Object.entries(props)) {
    if (prop instanceof StyleProp) {
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
  return createRecordType("shape", {
    migrations: defineMigrations({
      currentVersion: rootShapeMigrations.currentVersion,
      firstVersion: rootShapeMigrations.firstVersion,
      migrators: rootShapeMigrations.migrators,
      subTypeKey: "type",
      subTypeMigrations: mapObjectMapValues(shapes, (_, v) => v.migrations ?? defineMigrations({}))
    }),
    scope: "document",
    validator: T.model(
      "shape",
      T.union(
        "type",
        mapObjectMapValues(
          shapes,
          (type, { props, meta }) => createShapeValidator(type, props, meta)
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
export {
  createShapeId,
  createShapeRecordType,
  getShapePropKeysByStyle,
  isShape,
  isShapeId,
  rootShapeMigrations,
  rootShapeVersions
};
//# sourceMappingURL=TLShape.mjs.map

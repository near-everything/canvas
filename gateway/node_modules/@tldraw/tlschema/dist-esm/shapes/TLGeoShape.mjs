import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { StyleProp } from "../styles/StyleProp.mjs";
import { DefaultColorStyle, DefaultLabelColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultDashStyle } from "../styles/TLDashStyle.mjs";
import { DefaultFillStyle } from "../styles/TLFillStyle.mjs";
import { DefaultFontStyle } from "../styles/TLFontStyle.mjs";
import {
  DefaultHorizontalAlignStyle
} from "../styles/TLHorizontalAlignStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
import { DefaultVerticalAlignStyle } from "../styles/TLVerticalAlignStyle.mjs";
const GeoShapeGeoStyle = StyleProp.defineEnum("tldraw:geo", {
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
  labelColor: DefaultLabelColorStyle,
  color: DefaultColorStyle,
  fill: DefaultFillStyle,
  dash: DefaultDashStyle,
  size: DefaultSizeStyle,
  font: DefaultFontStyle,
  align: DefaultHorizontalAlignStyle,
  verticalAlign: DefaultVerticalAlignStyle,
  url: T.string,
  w: T.nonZeroNumber,
  h: T.nonZeroNumber,
  growY: T.positiveNumber,
  text: T.string
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
const geoShapeMigrations = defineMigrations({
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
export {
  GeoShapeGeoStyle,
  Versions as GeoShapeVersions,
  geoShapeMigrations,
  geoShapeProps
};
//# sourceMappingURL=TLGeoShape.mjs.map

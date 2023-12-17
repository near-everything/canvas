import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { vec2dModelValidator } from "../misc/geometry-types.mjs";
import { StyleProp } from "../styles/StyleProp.mjs";
import { DefaultColorStyle, DefaultLabelColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultDashStyle } from "../styles/TLDashStyle.mjs";
import { DefaultFillStyle } from "../styles/TLFillStyle.mjs";
import { DefaultFontStyle } from "../styles/TLFontStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
import { shapeIdValidator } from "./TLBaseShape.mjs";
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
const ArrowShapeArrowheadStartStyle = StyleProp.defineEnum("tldraw:arrowheadStart", {
  defaultValue: "none",
  values: arrowheadTypes
});
const ArrowShapeArrowheadEndStyle = StyleProp.defineEnum("tldraw:arrowheadEnd", {
  defaultValue: "arrow",
  values: arrowheadTypes
});
const ArrowShapeTerminal = T.union("type", {
  binding: T.object({
    type: T.literal("binding"),
    boundShapeId: shapeIdValidator,
    normalizedAnchor: vec2dModelValidator,
    isExact: T.boolean
  }),
  point: T.object({
    type: T.literal("point"),
    x: T.number,
    y: T.number
  })
});
const arrowShapeProps = {
  labelColor: DefaultLabelColorStyle,
  color: DefaultColorStyle,
  fill: DefaultFillStyle,
  dash: DefaultDashStyle,
  size: DefaultSizeStyle,
  arrowheadStart: ArrowShapeArrowheadStartStyle,
  arrowheadEnd: ArrowShapeArrowheadEndStyle,
  font: DefaultFontStyle,
  start: ArrowShapeTerminal,
  end: ArrowShapeTerminal,
  bend: T.number,
  text: T.string
};
const Versions = {
  AddLabelColor: 1
};
const arrowShapeMigrations = defineMigrations({
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
export {
  ArrowShapeArrowheadEndStyle,
  ArrowShapeArrowheadStartStyle,
  arrowShapeMigrations,
  arrowShapeProps
};
//# sourceMappingURL=TLArrowShape.mjs.map

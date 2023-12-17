import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { vec2dModelValidator } from "../misc/geometry-types.mjs";
import { DefaultColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultDashStyle } from "../styles/TLDashStyle.mjs";
import { DefaultFillStyle } from "../styles/TLFillStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
const DrawShapeSegment = T.object({
  type: T.literalEnum("free", "straight"),
  points: T.arrayOf(vec2dModelValidator)
});
const drawShapeProps = {
  color: DefaultColorStyle,
  fill: DefaultFillStyle,
  dash: DefaultDashStyle,
  size: DefaultSizeStyle,
  segments: T.arrayOf(DrawShapeSegment),
  isComplete: T.boolean,
  isClosed: T.boolean,
  isPen: T.boolean
};
const Versions = {
  AddInPen: 1
};
const drawShapeMigrations = defineMigrations({
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
export {
  DrawShapeSegment,
  drawShapeMigrations,
  drawShapeProps
};
//# sourceMappingURL=TLDrawShape.mjs.map

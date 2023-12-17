import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { DefaultColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultFontStyle } from "../styles/TLFontStyle.mjs";
import { DefaultHorizontalAlignStyle } from "../styles/TLHorizontalAlignStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
const textShapeProps = {
  color: DefaultColorStyle,
  size: DefaultSizeStyle,
  font: DefaultFontStyle,
  align: DefaultHorizontalAlignStyle,
  w: T.nonZeroNumber,
  text: T.string,
  scale: T.nonZeroNumber,
  autoSize: T.boolean
};
const Versions = {
  RemoveJustify: 1
};
const textShapeMigrations = defineMigrations({
  currentVersion: Versions.RemoveJustify,
  migrators: {
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
    }
  }
});
export {
  textShapeMigrations,
  textShapeProps
};
//# sourceMappingURL=TLTextShape.mjs.map

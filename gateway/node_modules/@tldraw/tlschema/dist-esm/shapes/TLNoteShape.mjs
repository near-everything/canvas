import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { DefaultColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultFontStyle } from "../styles/TLFontStyle.mjs";
import {
  DefaultHorizontalAlignStyle
} from "../styles/TLHorizontalAlignStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
import { DefaultVerticalAlignStyle } from "../styles/TLVerticalAlignStyle.mjs";
const noteShapeProps = {
  color: DefaultColorStyle,
  size: DefaultSizeStyle,
  font: DefaultFontStyle,
  align: DefaultHorizontalAlignStyle,
  verticalAlign: DefaultVerticalAlignStyle,
  growY: T.positiveNumber,
  url: T.string,
  text: T.string
};
const Versions = {
  AddUrlProp: 1,
  RemoveJustify: 2,
  MigrateLegacyAlign: 3,
  AddVerticalAlign: 4
};
const noteShapeMigrations = defineMigrations({
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
export {
  noteShapeMigrations,
  noteShapeProps
};
//# sourceMappingURL=TLNoteShape.mjs.map

import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { DefaultColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
import { DrawShapeSegment } from "./TLDrawShape.mjs";
const highlightShapeProps = {
  color: DefaultColorStyle,
  size: DefaultSizeStyle,
  segments: T.arrayOf(DrawShapeSegment),
  isComplete: T.boolean,
  isPen: T.boolean
};
const highlightShapeMigrations = defineMigrations({});
export {
  highlightShapeMigrations,
  highlightShapeProps
};
//# sourceMappingURL=TLHighlightShape.mjs.map

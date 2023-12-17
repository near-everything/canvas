import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
const frameShapeProps = {
  w: T.nonZeroNumber,
  h: T.nonZeroNumber,
  name: T.string
};
const frameShapeMigrations = defineMigrations({});
export {
  frameShapeMigrations,
  frameShapeProps
};
//# sourceMappingURL=TLFrameShape.mjs.map

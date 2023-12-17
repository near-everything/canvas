import { defineMigrations } from "@tldraw/store";
import { deepCopy } from "@tldraw/utils";
import { T } from "@tldraw/validate";
import { handleValidator } from "../misc/TLHandle.mjs";
import { StyleProp } from "../styles/StyleProp.mjs";
import { DefaultColorStyle } from "../styles/TLColorStyle.mjs";
import { DefaultDashStyle } from "../styles/TLDashStyle.mjs";
import { DefaultSizeStyle } from "../styles/TLSizeStyle.mjs";
const LineShapeSplineStyle = StyleProp.defineEnum("tldraw:spline", {
  defaultValue: "line",
  values: ["cubic", "line"]
});
const lineShapeProps = {
  color: DefaultColorStyle,
  dash: DefaultDashStyle,
  size: DefaultSizeStyle,
  spline: LineShapeSplineStyle,
  handles: T.dict(T.string, handleValidator)
};
const lineShapeVersions = {
  AddSnapHandles: 1
};
const lineShapeMigrations = defineMigrations({
  currentVersion: lineShapeVersions.AddSnapHandles,
  migrators: {
    [lineShapeVersions.AddSnapHandles]: {
      up: (record) => {
        const handles = deepCopy(record.props.handles);
        for (const id in handles) {
          handles[id].canSnap = true;
        }
        return { ...record, props: { ...record.props, handles } };
      },
      down: (record) => {
        const handles = deepCopy(record.props.handles);
        for (const id in handles) {
          delete handles[id].canSnap;
        }
        return { ...record, props: { ...record.props, handles } };
      }
    }
  }
});
export {
  LineShapeSplineStyle,
  lineShapeMigrations,
  lineShapeProps,
  lineShapeVersions
};
//# sourceMappingURL=TLLineShape.mjs.map

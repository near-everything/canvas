import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { assetIdValidator } from "../assets/TLBaseAsset.mjs";
const videoShapeProps = {
  w: T.nonZeroNumber,
  h: T.nonZeroNumber,
  time: T.number,
  playing: T.boolean,
  url: T.string,
  assetId: assetIdValidator.nullable()
};
const Versions = {
  AddUrlProp: 1
};
const videoShapeMigrations = defineMigrations({
  currentVersion: Versions.AddUrlProp,
  migrators: {
    [Versions.AddUrlProp]: {
      up: (shape) => {
        return { ...shape, props: { ...shape.props, url: "" } };
      },
      down: (shape) => {
        const { url: _, ...props } = shape.props;
        return { ...shape, props };
      }
    }
  }
});
export {
  videoShapeMigrations,
  videoShapeProps
};
//# sourceMappingURL=TLVideoShape.mjs.map

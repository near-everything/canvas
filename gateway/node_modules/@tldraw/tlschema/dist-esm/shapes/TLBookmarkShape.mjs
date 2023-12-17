import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { assetIdValidator } from "../assets/TLBaseAsset.mjs";
const bookmarkShapeProps = {
  w: T.nonZeroNumber,
  h: T.nonZeroNumber,
  assetId: assetIdValidator.nullable(),
  url: T.string
};
const Versions = {
  NullAssetId: 1
};
const bookmarkShapeMigrations = defineMigrations({
  currentVersion: Versions.NullAssetId,
  migrators: {
    [Versions.NullAssetId]: {
      up: (shape) => {
        if (shape.props.assetId === void 0) {
          return { ...shape, props: { ...shape.props, assetId: null } };
        }
        return shape;
      },
      down: (shape) => {
        if (shape.props.assetId === null) {
          const { assetId: _, ...props } = shape.props;
          return { ...shape, props };
        }
        return shape;
      }
    }
  }
});
export {
  bookmarkShapeMigrations,
  bookmarkShapeProps
};
//# sourceMappingURL=TLBookmarkShape.mjs.map

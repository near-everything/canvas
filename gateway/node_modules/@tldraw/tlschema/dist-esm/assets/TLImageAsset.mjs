import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { createAssetValidator } from "./TLBaseAsset.mjs";
const imageAssetValidator = createAssetValidator(
  "image",
  T.object({
    w: T.number,
    h: T.number,
    name: T.string,
    isAnimated: T.boolean,
    mimeType: T.string.nullable(),
    src: T.string.nullable()
  })
);
const Versions = {
  AddIsAnimated: 1,
  RenameWidthHeight: 2
};
const imageAssetMigrations = defineMigrations({
  currentVersion: Versions.RenameWidthHeight,
  migrators: {
    [Versions.AddIsAnimated]: {
      up: (asset) => {
        return {
          ...asset,
          props: {
            ...asset.props,
            isAnimated: false
          }
        };
      },
      down: (asset) => {
        const { isAnimated, ...rest } = asset.props;
        return {
          ...asset,
          props: rest
        };
      }
    },
    [Versions.RenameWidthHeight]: {
      up: (asset) => {
        const { width, height, ...others } = asset.props;
        return { ...asset, props: { w: width, h: height, ...others } };
      },
      down: (asset) => {
        const { w, h, ...others } = asset.props;
        return { ...asset, props: { width: w, height: h, ...others } };
      }
    }
  }
});
export {
  imageAssetMigrations,
  imageAssetValidator
};
//# sourceMappingURL=TLImageAsset.mjs.map

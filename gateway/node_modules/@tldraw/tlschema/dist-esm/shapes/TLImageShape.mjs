import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { assetIdValidator } from "../assets/TLBaseAsset.mjs";
import { vec2dModelValidator } from "../misc/geometry-types.mjs";
const ImageShapeCrop = T.object({
  topLeft: vec2dModelValidator,
  bottomRight: vec2dModelValidator
});
const imageShapeProps = {
  w: T.nonZeroNumber,
  h: T.nonZeroNumber,
  playing: T.boolean,
  url: T.string,
  assetId: assetIdValidator.nullable(),
  crop: ImageShapeCrop.nullable()
};
const Versions = {
  AddUrlProp: 1,
  AddCropProp: 2
};
const imageShapeMigrations = defineMigrations({
  currentVersion: Versions.AddCropProp,
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
    [Versions.AddCropProp]: {
      up: (shape) => {
        return { ...shape, props: { ...shape.props, crop: null } };
      },
      down: (shape) => {
        const { crop: _, ...props } = shape.props;
        return { ...shape, props };
      }
    }
  }
});
export {
  ImageShapeCrop,
  imageShapeMigrations,
  imageShapeProps
};
//# sourceMappingURL=TLImageShape.mjs.map

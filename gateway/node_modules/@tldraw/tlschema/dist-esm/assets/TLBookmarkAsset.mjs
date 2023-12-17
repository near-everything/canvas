import { defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { createAssetValidator } from "./TLBaseAsset.mjs";
const bookmarkAssetValidator = createAssetValidator(
  "bookmark",
  T.object({
    title: T.string,
    description: T.string,
    image: T.string,
    src: T.string.nullable()
  })
);
const bookmarkAssetMigrations = defineMigrations({});
export {
  bookmarkAssetMigrations,
  bookmarkAssetValidator
};
//# sourceMappingURL=TLBookmarkAsset.mjs.map

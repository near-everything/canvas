import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import {
  bookmarkAssetMigrations,
  bookmarkAssetValidator
} from "../assets/TLBookmarkAsset.mjs";
import { imageAssetMigrations, imageAssetValidator } from "../assets/TLImageAsset.mjs";
import { videoAssetMigrations, videoAssetValidator } from "../assets/TLVideoAsset.mjs";
const assetValidator = T.model(
  "asset",
  T.union("type", {
    image: imageAssetValidator,
    video: videoAssetValidator,
    bookmark: bookmarkAssetValidator
  })
);
const assetVersions = {
  AddMeta: 1
};
const assetMigrations = defineMigrations({
  subTypeKey: "type",
  subTypeMigrations: {
    image: imageAssetMigrations,
    video: videoAssetMigrations,
    bookmark: bookmarkAssetMigrations
  },
  currentVersion: assetVersions.AddMeta,
  migrators: {
    [assetVersions.AddMeta]: {
      up: (record) => {
        return {
          ...record,
          meta: {}
        };
      },
      down: ({ meta: _, ...record }) => {
        return {
          ...record
        };
      }
    }
  }
});
const AssetRecordType = createRecordType("asset", {
  migrations: assetMigrations,
  validator: assetValidator,
  scope: "document"
}).withDefaultProperties(() => ({
  meta: {}
}));
export {
  AssetRecordType,
  assetMigrations,
  assetValidator,
  assetVersions
};
//# sourceMappingURL=TLAsset.mjs.map

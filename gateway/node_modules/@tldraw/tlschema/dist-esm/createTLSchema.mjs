import { StoreSchema } from "@tldraw/store";
import { objectMapValues } from "@tldraw/utils";
import { createIntegrityChecker, onValidationFailure } from "./TLStore.mjs";
import { AssetRecordType } from "./records/TLAsset.mjs";
import { CameraRecordType } from "./records/TLCamera.mjs";
import { DocumentRecordType } from "./records/TLDocument.mjs";
import { createInstanceRecordType } from "./records/TLInstance.mjs";
import { PageRecordType } from "./records/TLPage.mjs";
import { InstancePageStateRecordType } from "./records/TLPageState.mjs";
import { PointerRecordType } from "./records/TLPointer.mjs";
import { InstancePresenceRecordType } from "./records/TLPresence.mjs";
import { createShapeRecordType, getShapePropKeysByStyle } from "./records/TLShape.mjs";
import { storeMigrations } from "./store-migrations.mjs";
function createTLSchema({ shapes }) {
  const stylesById = /* @__PURE__ */ new Map();
  for (const shape of objectMapValues(shapes)) {
    for (const style of getShapePropKeysByStyle(shape.props ?? {}).keys()) {
      if (stylesById.has(style.id) && stylesById.get(style.id) !== style) {
        throw new Error(`Multiple StyleProp instances with the same id: ${style.id}`);
      }
      stylesById.set(style.id, style);
    }
  }
  const ShapeRecordType = createShapeRecordType(shapes);
  const InstanceRecordType = createInstanceRecordType(stylesById);
  return StoreSchema.create(
    {
      asset: AssetRecordType,
      camera: CameraRecordType,
      document: DocumentRecordType,
      instance: InstanceRecordType,
      instance_page_state: InstancePageStateRecordType,
      page: PageRecordType,
      shape: ShapeRecordType,
      instance_presence: InstancePresenceRecordType,
      pointer: PointerRecordType
    },
    {
      snapshotMigrations: storeMigrations,
      onValidationFailure,
      createIntegrityChecker
    }
  );
}
export {
  createTLSchema
};
//# sourceMappingURL=createTLSchema.mjs.map

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var createTLSchema_exports = {};
__export(createTLSchema_exports, {
  createTLSchema: () => createTLSchema
});
module.exports = __toCommonJS(createTLSchema_exports);
var import_store = require("@tldraw/store");
var import_utils = require("@tldraw/utils");
var import_TLStore = require("./TLStore");
var import_TLAsset = require("./records/TLAsset");
var import_TLCamera = require("./records/TLCamera");
var import_TLDocument = require("./records/TLDocument");
var import_TLInstance = require("./records/TLInstance");
var import_TLPage = require("./records/TLPage");
var import_TLPageState = require("./records/TLPageState");
var import_TLPointer = require("./records/TLPointer");
var import_TLPresence = require("./records/TLPresence");
var import_TLShape = require("./records/TLShape");
var import_store_migrations = require("./store-migrations");
function createTLSchema({ shapes }) {
  const stylesById = /* @__PURE__ */ new Map();
  for (const shape of (0, import_utils.objectMapValues)(shapes)) {
    for (const style of (0, import_TLShape.getShapePropKeysByStyle)(shape.props ?? {}).keys()) {
      if (stylesById.has(style.id) && stylesById.get(style.id) !== style) {
        throw new Error(`Multiple StyleProp instances with the same id: ${style.id}`);
      }
      stylesById.set(style.id, style);
    }
  }
  const ShapeRecordType = (0, import_TLShape.createShapeRecordType)(shapes);
  const InstanceRecordType = (0, import_TLInstance.createInstanceRecordType)(stylesById);
  return import_store.StoreSchema.create(
    {
      asset: import_TLAsset.AssetRecordType,
      camera: import_TLCamera.CameraRecordType,
      document: import_TLDocument.DocumentRecordType,
      instance: InstanceRecordType,
      instance_page_state: import_TLPageState.InstancePageStateRecordType,
      page: import_TLPage.PageRecordType,
      shape: ShapeRecordType,
      instance_presence: import_TLPresence.InstancePresenceRecordType,
      pointer: import_TLPointer.PointerRecordType
    },
    {
      snapshotMigrations: import_store_migrations.storeMigrations,
      onValidationFailure: import_TLStore.onValidationFailure,
      createIntegrityChecker: import_TLStore.createIntegrityChecker
    }
  );
}
//# sourceMappingURL=createTLSchema.js.map

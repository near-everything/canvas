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
var src_exports = {};
__export(src_exports, {
  IncrementalSetConstructor: () => import_IncrementalSetConstructor.IncrementalSetConstructor,
  MigrationFailureReason: () => import_migrate.MigrationFailureReason,
  RecordType: () => import_RecordType.RecordType,
  Store: () => import_Store.Store,
  StoreSchema: () => import_StoreSchema.StoreSchema,
  assertIdType: () => import_RecordType.assertIdType,
  compareRecordVersions: () => import_migrate.compareRecordVersions,
  compareSchemas: () => import_compareSchemas.compareSchemas,
  createRecordType: () => import_RecordType.createRecordType,
  defineMigrations: () => import_migrate.defineMigrations,
  devFreeze: () => import_devFreeze.devFreeze,
  getRecordVersion: () => import_migrate.getRecordVersion,
  migrate: () => import_migrate.migrate,
  migrateRecord: () => import_migrate.migrateRecord,
  reverseRecordsDiff: () => import_Store.reverseRecordsDiff,
  squashRecordDiffs: () => import_Store.squashRecordDiffs
});
module.exports = __toCommonJS(src_exports);
var import_IncrementalSetConstructor = require("./lib/IncrementalSetConstructor");
var import_RecordType = require("./lib/RecordType");
var import_Store = require("./lib/Store");
var import_StoreSchema = require("./lib/StoreSchema");
var import_compareSchemas = require("./lib/compareSchemas");
var import_devFreeze = require("./lib/devFreeze");
var import_migrate = require("./lib/migrate");
//# sourceMappingURL=index.js.map

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
var StoreSchema_exports = {};
__export(StoreSchema_exports, {
  StoreSchema: () => StoreSchema
});
module.exports = __toCommonJS(StoreSchema_exports);
var import_utils = require("@tldraw/utils");
var import_migrate = require("./migrate");
class StoreSchema {
  constructor(types, options) {
    this.types = types;
    this.options = options;
  }
  static create(types, options) {
    return new StoreSchema(types, options ?? {});
  }
  get currentStoreVersion() {
    return this.options.snapshotMigrations?.currentVersion ?? 0;
  }
  validateRecord(store, record, phase, recordBefore) {
    try {
      const recordType = (0, import_utils.getOwnProperty)(this.types, record.typeName);
      if (!recordType) {
        throw new Error(`Missing definition for record type ${record.typeName}`);
      }
      return recordType.validate(record);
    } catch (error) {
      if (this.options.onValidationFailure) {
        return this.options.onValidationFailure({
          store,
          record,
          phase,
          recordBefore,
          error
        });
      } else {
        throw error;
      }
    }
  }
  migratePersistedRecord(record, persistedSchema, direction = "up") {
    const ourType = (0, import_utils.getOwnProperty)(this.types, record.typeName);
    const persistedType = persistedSchema.recordVersions[record.typeName];
    if (!persistedType || !ourType) {
      return { type: "error", reason: import_migrate.MigrationFailureReason.UnknownType };
    }
    const ourVersion = ourType.migrations.currentVersion;
    const persistedVersion = persistedType.version;
    if (ourVersion !== persistedVersion) {
      const result2 = direction === "up" ? (0, import_migrate.migrateRecord)({
        record,
        migrations: ourType.migrations,
        fromVersion: persistedVersion,
        toVersion: ourVersion
      }) : (0, import_migrate.migrateRecord)({
        record,
        migrations: ourType.migrations,
        fromVersion: ourVersion,
        toVersion: persistedVersion
      });
      if (result2.type === "error") {
        return result2;
      }
      record = result2.value;
    }
    if (!ourType.migrations.subTypeKey) {
      return { type: "success", value: record };
    }
    const ourSubTypeMigrations = ourType.migrations.subTypeMigrations?.[record[ourType.migrations.subTypeKey]];
    const persistedSubTypeVersion = "subTypeVersions" in persistedType ? persistedType.subTypeVersions[record[ourType.migrations.subTypeKey]] : void 0;
    if (ourSubTypeMigrations === void 0) {
      return { type: "error", reason: import_migrate.MigrationFailureReason.UnrecognizedSubtype };
    }
    if (persistedSubTypeVersion === void 0) {
      return { type: "error", reason: import_migrate.MigrationFailureReason.IncompatibleSubtype };
    }
    const result = direction === "up" ? (0, import_migrate.migrateRecord)({
      record,
      migrations: ourSubTypeMigrations,
      fromVersion: persistedSubTypeVersion,
      toVersion: ourSubTypeMigrations.currentVersion
    }) : (0, import_migrate.migrateRecord)({
      record,
      migrations: ourSubTypeMigrations,
      fromVersion: ourSubTypeMigrations.currentVersion,
      toVersion: persistedSubTypeVersion
    });
    if (result.type === "error") {
      return result;
    }
    return { type: "success", value: result.value };
  }
  migrateStoreSnapshot(snapshot) {
    let { store } = snapshot;
    const migrations = this.options.snapshotMigrations;
    if (!migrations) {
      return { type: "success", value: store };
    }
    const ourStoreVersion = migrations.currentVersion;
    const persistedStoreVersion = snapshot.schema.storeVersion ?? 0;
    if (ourStoreVersion < persistedStoreVersion) {
      return { type: "error", reason: import_migrate.MigrationFailureReason.TargetVersionTooOld };
    }
    if (ourStoreVersion > persistedStoreVersion) {
      const result = (0, import_migrate.migrate)({
        value: store,
        migrations,
        fromVersion: persistedStoreVersion,
        toVersion: ourStoreVersion
      });
      if (result.type === "error") {
        return result;
      }
      store = result.value;
    }
    const updated = [];
    for (const r of (0, import_utils.objectMapValues)(store)) {
      const result = this.migratePersistedRecord(r, snapshot.schema);
      if (result.type === "error") {
        return result;
      } else if (result.value && result.value !== r) {
        updated.push(result.value);
      }
    }
    if (updated.length) {
      store = { ...store };
      for (const r of updated) {
        store[r.id] = r;
      }
    }
    return { type: "success", value: store };
  }
  /** @internal */
  createIntegrityChecker(store) {
    return this.options.createIntegrityChecker?.(store) ?? void 0;
  }
  serialize() {
    return {
      schemaVersion: 1,
      storeVersion: this.options.snapshotMigrations?.currentVersion ?? 0,
      recordVersions: Object.fromEntries(
        (0, import_utils.objectMapValues)(this.types).map((type) => [
          type.typeName,
          type.migrations.subTypeKey && type.migrations.subTypeMigrations ? {
            version: type.migrations.currentVersion,
            subTypeKey: type.migrations.subTypeKey,
            subTypeVersions: type.migrations.subTypeMigrations ? Object.fromEntries(
              Object.entries(type.migrations.subTypeMigrations).map(([k, v]) => [
                k,
                v.currentVersion
              ])
            ) : void 0
          } : {
            version: type.migrations.currentVersion
          }
        ])
      )
    };
  }
  serializeEarliestVersion() {
    return {
      schemaVersion: 1,
      storeVersion: this.options.snapshotMigrations?.firstVersion ?? 0,
      recordVersions: Object.fromEntries(
        (0, import_utils.objectMapValues)(this.types).map((type) => [
          type.typeName,
          type.migrations.subTypeKey && type.migrations.subTypeMigrations ? {
            version: type.migrations.firstVersion,
            subTypeKey: type.migrations.subTypeKey,
            subTypeVersions: type.migrations.subTypeMigrations ? Object.fromEntries(
              Object.entries(type.migrations.subTypeMigrations).map(([k, v]) => [
                k,
                v.firstVersion
              ])
            ) : void 0
          } : {
            version: type.migrations.firstVersion
          }
        ])
      )
    };
  }
}
//# sourceMappingURL=StoreSchema.js.map

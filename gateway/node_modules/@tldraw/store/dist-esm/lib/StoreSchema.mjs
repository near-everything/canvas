import { getOwnProperty, objectMapValues } from "@tldraw/utils";
import {
  MigrationFailureReason,
  migrate,
  migrateRecord
} from "./migrate.mjs";
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
      const recordType = getOwnProperty(this.types, record.typeName);
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
    const ourType = getOwnProperty(this.types, record.typeName);
    const persistedType = persistedSchema.recordVersions[record.typeName];
    if (!persistedType || !ourType) {
      return { type: "error", reason: MigrationFailureReason.UnknownType };
    }
    const ourVersion = ourType.migrations.currentVersion;
    const persistedVersion = persistedType.version;
    if (ourVersion !== persistedVersion) {
      const result2 = direction === "up" ? migrateRecord({
        record,
        migrations: ourType.migrations,
        fromVersion: persistedVersion,
        toVersion: ourVersion
      }) : migrateRecord({
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
      return { type: "error", reason: MigrationFailureReason.UnrecognizedSubtype };
    }
    if (persistedSubTypeVersion === void 0) {
      return { type: "error", reason: MigrationFailureReason.IncompatibleSubtype };
    }
    const result = direction === "up" ? migrateRecord({
      record,
      migrations: ourSubTypeMigrations,
      fromVersion: persistedSubTypeVersion,
      toVersion: ourSubTypeMigrations.currentVersion
    }) : migrateRecord({
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
      return { type: "error", reason: MigrationFailureReason.TargetVersionTooOld };
    }
    if (ourStoreVersion > persistedStoreVersion) {
      const result = migrate({
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
    for (const r of objectMapValues(store)) {
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
        objectMapValues(this.types).map((type) => [
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
        objectMapValues(this.types).map((type) => [
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
export {
  StoreSchema
};
//# sourceMappingURL=StoreSchema.mjs.map

import { IncrementalSetConstructor } from "./lib/IncrementalSetConstructor.mjs";
import { RecordType, assertIdType, createRecordType } from "./lib/RecordType.mjs";
import { Store, reverseRecordsDiff, squashRecordDiffs } from "./lib/Store.mjs";
import { StoreSchema } from "./lib/StoreSchema.mjs";
import { compareSchemas } from "./lib/compareSchemas.mjs";
import { devFreeze } from "./lib/devFreeze.mjs";
import {
  MigrationFailureReason,
  compareRecordVersions,
  defineMigrations,
  getRecordVersion,
  migrate,
  migrateRecord
} from "./lib/migrate.mjs";
export {
  IncrementalSetConstructor,
  MigrationFailureReason,
  RecordType,
  Store,
  StoreSchema,
  assertIdType,
  compareRecordVersions,
  compareSchemas,
  createRecordType,
  defineMigrations,
  devFreeze,
  getRecordVersion,
  migrate,
  migrateRecord,
  reverseRecordsDiff,
  squashRecordDiffs
};
//# sourceMappingURL=index.mjs.map

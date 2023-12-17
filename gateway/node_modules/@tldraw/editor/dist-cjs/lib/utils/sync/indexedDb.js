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
var indexedDb_exports = {};
__export(indexedDb_exports, {
  getAllIndexDbNames: () => getAllIndexDbNames,
  loadDataFromStore: () => loadDataFromStore,
  storeChangesInIndexedDb: () => storeChangesInIndexedDb,
  storeSnapshotInIndexedDb: () => storeSnapshotInIndexedDb
});
module.exports = __toCommonJS(indexedDb_exports);
var import_idb = require("idb");
const STORE_PREFIX = "TLDRAW_DOCUMENT_v2";
const dbNameIndexKey = "TLDRAW_DB_NAME_INDEX_v2";
const Table = {
  Records: "records",
  Schema: "schema",
  SessionState: "session_state"
};
async function withDb(storeId, cb) {
  addDbName(storeId);
  const db = await (0, import_idb.openDB)(storeId, 3, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(Table.Records)) {
        database.createObjectStore(Table.Records);
      }
      if (!database.objectStoreNames.contains(Table.Schema)) {
        database.createObjectStore(Table.Schema);
      }
      if (!database.objectStoreNames.contains(Table.SessionState)) {
        database.createObjectStore(Table.SessionState);
      }
    }
  });
  try {
    return await cb(db);
  } finally {
    db.close();
  }
}
async function loadDataFromStore({
  persistenceKey,
  sessionId,
  didCancel
}) {
  const storeId = STORE_PREFIX + persistenceKey;
  if (!getAllIndexDbNames().includes(storeId))
    return void 0;
  await pruneSessionState({ persistenceKey, didCancel });
  return await withDb(storeId, async (db) => {
    if (didCancel?.())
      return void 0;
    const tx = db.transaction([Table.Records, Table.Schema, Table.SessionState], "readonly");
    const recordsStore = tx.objectStore(Table.Records);
    const schemaStore = tx.objectStore(Table.Schema);
    const sessionStateStore = tx.objectStore(Table.SessionState);
    let sessionStateSnapshot = sessionId ? (await sessionStateStore.get(sessionId))?.snapshot : null;
    if (!sessionStateSnapshot) {
      const all = await sessionStateStore.getAll();
      sessionStateSnapshot = all.sort((a, b) => a.updatedAt - b.updatedAt).pop()?.snapshot;
    }
    const result = {
      records: await recordsStore.getAll(),
      schema: await schemaStore.get(Table.Schema),
      sessionStateSnapshot
    };
    if (didCancel?.()) {
      tx.abort();
      return void 0;
    }
    await tx.done;
    return result;
  });
}
async function storeChangesInIndexedDb({
  persistenceKey,
  schema,
  changes,
  sessionId,
  sessionStateSnapshot,
  didCancel
}) {
  const storeId = STORE_PREFIX + persistenceKey;
  await withDb(storeId, async (db) => {
    const tx = db.transaction([Table.Records, Table.Schema, Table.SessionState], "readwrite");
    const recordsStore = tx.objectStore(Table.Records);
    const schemaStore = tx.objectStore(Table.Schema);
    const sessionStateStore = tx.objectStore(Table.SessionState);
    for (const [id, record] of Object.entries(changes.added)) {
      await recordsStore.put(record, id);
    }
    for (const [_prev, updated] of Object.values(changes.updated)) {
      await recordsStore.put(updated, updated.id);
    }
    for (const id of Object.keys(changes.removed)) {
      await recordsStore.delete(id);
    }
    schemaStore.put(schema.serialize(), Table.Schema);
    if (sessionStateSnapshot && sessionId) {
      sessionStateStore.put(
        {
          snapshot: sessionStateSnapshot,
          updatedAt: Date.now(),
          id: sessionId
        },
        sessionId
      );
    } else if (sessionStateSnapshot || sessionId) {
      console.error("sessionStateSnapshot and instanceId must be provided together");
    }
    if (didCancel?.())
      return tx.abort();
    await tx.done;
  });
}
async function storeSnapshotInIndexedDb({
  persistenceKey,
  schema,
  snapshot,
  sessionId,
  sessionStateSnapshot,
  didCancel
}) {
  const storeId = STORE_PREFIX + persistenceKey;
  await withDb(storeId, async (db) => {
    const tx = db.transaction([Table.Records, Table.Schema, Table.SessionState], "readwrite");
    const recordsStore = tx.objectStore(Table.Records);
    const schemaStore = tx.objectStore(Table.Schema);
    const sessionStateStore = tx.objectStore(Table.SessionState);
    await recordsStore.clear();
    for (const [id, record] of Object.entries(snapshot)) {
      await recordsStore.put(record, id);
    }
    schemaStore.put(schema.serialize(), Table.Schema);
    if (sessionStateSnapshot && sessionId) {
      sessionStateStore.put(
        {
          snapshot: sessionStateSnapshot,
          updatedAt: Date.now(),
          id: sessionId
        },
        sessionId
      );
    } else if (sessionStateSnapshot || sessionId) {
      console.error("sessionStateSnapshot and instanceId must be provided together");
    }
    if (didCancel?.())
      return tx.abort();
    await tx.done;
  });
}
async function pruneSessionState({
  persistenceKey,
  didCancel
}) {
  await withDb(STORE_PREFIX + persistenceKey, async (db) => {
    const tx = db.transaction([Table.SessionState], "readwrite");
    const sessionStateStore = tx.objectStore(Table.SessionState);
    const all = (await sessionStateStore.getAll()).sort((a, b) => a.updatedAt - b.updatedAt);
    if (all.length < 10) {
      await tx.done;
      return;
    }
    const toDelete = all.slice(0, all.length - 10);
    for (const { id } of toDelete) {
      await sessionStateStore.delete(id);
    }
    if (didCancel?.())
      return tx.abort();
    await tx.done;
  });
}
function getAllIndexDbNames() {
  const result = JSON.parse(window?.localStorage.getItem(dbNameIndexKey) || "[]") ?? [];
  if (!Array.isArray(result)) {
    return [];
  }
  return result;
}
function addDbName(name) {
  const all = new Set(getAllIndexDbNames());
  all.add(name);
  window?.localStorage.setItem(dbNameIndexKey, JSON.stringify([...all]));
}
//# sourceMappingURL=indexedDb.js.map

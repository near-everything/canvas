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
var useLocalStore_exports = {};
__export(useLocalStore_exports, {
  useLocalStore: () => useLocalStore
});
module.exports = __toCommonJS(useLocalStore_exports);
var import_react = require("react");
var import_TLLocalSyncClient = require("../utils/sync/TLLocalSyncClient");
var import_uniqueId = require("../utils/uniqueId");
var import_useTLStore = require("./useTLStore");
function useLocalStore({
  persistenceKey,
  sessionId,
  ...rest
}) {
  const [state, setState] = (0, import_react.useState)(
    null
  );
  const store = (0, import_useTLStore.useTLStore)(rest);
  (0, import_react.useEffect)(() => {
    const id = (0, import_uniqueId.uniqueId)();
    if (!persistenceKey) {
      setState({
        id,
        storeWithStatus: { status: "not-synced", store }
      });
      return;
    }
    setState({
      id,
      storeWithStatus: { status: "loading" }
    });
    const setStoreWithStatus = (storeWithStatus) => {
      setState((prev) => {
        if (prev?.id === id) {
          return { id, storeWithStatus };
        }
        return prev;
      });
    };
    const client = new import_TLLocalSyncClient.TLLocalSyncClient(store, {
      sessionId,
      persistenceKey,
      onLoad() {
        setStoreWithStatus({ store, status: "synced-local" });
      },
      onLoadError(err) {
        setStoreWithStatus({ status: "error", error: err });
      }
    });
    return () => {
      setState((prevState) => prevState?.id === id ? null : prevState);
      client.close();
    };
  }, [persistenceKey, store, sessionId]);
  return state?.storeWithStatus ?? { status: "loading" };
}
//# sourceMappingURL=useLocalStore.js.map
